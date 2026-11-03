---
title: "LSODA and RK4 comparison"
publishDate: "1 November 2026"
description: "Comparing integration methods for solving strange attractors"
tags: ["maths", "python"]
---

One of the main features of the [mathematical exploration
tool](https://github.com/aymenhafeez/strange-attractors-qt) I've been building is
interacting with ODE systems through parameter sliders. On each slider tick the system
gets solved for tens of thousands of points so integration needs to be fast. In this
post I'll talk about how I optimised solve speeds to try and make the interactive aspect
of the app as smooth as possible.

SciPy’s `odeint` was a good starting point, as it let me write a function defining a
system’s equations, supply initial conditions and a time array, and receive the points
describing its trajectory. However, because it's an adaptive solver that chooses its own
step size and every derivative evaluation passes through Python, it left little room for
optimisation. Since strange attractors are chaotic no solver can give an exact long term
trajectory. But what I cared about most was representing the overall shape of the
attractor. This led me to instead considering a fixed step RK4 integrator, which would
be accurate _enough_ for my needs, and compiling it with `numba` would allow me to more
directly optimise the solve path and make the sliders feel more responsive.

We'll start by looking at what each method does under the hood. Throughout the post
we'll use the Lorenz attractor whenever making a comparison between solve times:

$$
\begin{aligned}
\frac{\text{d}x}{\text{d}t} &= \sigma(y-x),\\
\frac{\text{d}y}{\text{d}t} &= x(\rho-z)-y,\\
\frac{\text{d}z}{\text{d}t} &= xy-\beta z.
\end{aligned}
$$

## `odeint` and LSODA

Suppose we know the state $u$ and its derivative $f(t, u)$. To see how the system
changes over time we could follow the derivative for a short time $h$:

$$
u(t+h) \approx u(t) + h f(t,u(t)).
$$

This is known as an Euler step. Geometrically, this follows a tangent rather than the
curve. This works well over a small time interval, however, the direction will change as
we move along the solution, so this method of approximation quickly become insufficient.
What's cool is that integration methods find ways to account for the changing direction
without having to make each step extremely small.

`odeint` uses LSODA, a Fortran solver from ODEPACK[[1]](#ref1). For a non-stiff
problem[^1] it uses an Adams method[^2] which, unlike Euler's method, uses information
from multiple previous steps to predict the next state. It then corrects the prediction
and estimates the local error, adjusting the step size and method order to keep the
error within the specified tolerances. LSODA uses a tolerance test based on a scale of
approximately:

$$
\text{atol} + \text{rtol}\,|u_i|.
$$

For example with $\text{atol} = 1\times 10^{-6}$ and $\text{rtol} = 1\times 10^{-3}$ a coordinate with a value
of 100 would have an error scale of approximately 0.1, whereas a value of 0.01 would
have an error of around 0.000011. And so as the coordinate approaches zero the relative
error becomes negligible and $\text{atol}$ determines the error scale. LSODA compares
the estimated error against these scales to decide whether to accept a step or retry
with a smaller step size. It should be noted that this only controls the error estimated
for _individual steps_, not how far the computed trajectory might eventually drift from
the exact solution. By default `odeint` uses $1.49012\times 10^{-8}$ for both $\text{rtol}$ and
$\text{atol}$[[1]](#ref1).

>**NOTE:** LSODA also detects when a system becomes stiff and switches from Adam's method to
>a backwards differential (BDF) method[[1]](#ref1).

The fact that `odeint` can adjust step size and integration method based on how the
system behaves makes it a really good general purpose solver. However, even though
`odeint` itself runs in compiled Fortran, each evaluation of the derivative function
requires a call back into Python. The system definition functions were being compiled
with numba's `@njit` but this only sped up the calculations rather than eliminating the
overhead of calling them.

For my particular application I was more interested in  generating trajectories and
updating plots as fast as possible, even if this meant giving up some of the accuracy
control that LSODA provided. By implementing an RK4 integrator and compiling it with
Numba I could keep both the integration loop and the derivative calculations in compiled
code, avoiding, repetitive Python calls.

## Runge–Kutta (RK4)

RK4 is the most widely used of the family of Runge-Kutta methods. It's a fourth order
method and can be written as:

$$
\begin{aligned}
k_1 &= f(t_n, y_n) \\
k_2 &= f(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_1) \\
k_3 &= f(t_n + \frac{h}{2}, y_n + \frac{h}{2}k_2) \\
k_4 &= f(t_n + h, y_n + hk_3)
\end{aligned}
$$

with the solution being expressed as

$$
y_{n + 1} = y_n + \frac{h}{6}(k_1 + 2k_2 + 2k_3 + k_4)
$$

[[2]](#ref2) Here, $h$ is the step size, and $y_n$ and $k_1,\dots, k_4$ are vectors
representing the current state and the four slope estimates for each coordinate
respectively. $k_2$ and $k_3$ give evaluations at the midpoint using different estimates
of where the solution will be. The four slopes are then combined as a weighted average
to advance the solution. Unlike LSODA, RK4 uses a _fixed step_ and doesn't estimate the
error at each stage. Each step requires four evaluations of the systems equations, so a
trajectory of $n$ steps requires exactly $4n$ evaluations making the computational cost
predictable.

Defining RK4 programmatically:

```python
k1 = eq(state, t, params)
k2 = eq(state + 0.5 * h * k1, t + 0.5 * h, params)
k3 = eq(state + 0.5 * h * k2, t + 0.5 * h, params)
k4 = eq(state + h * k3, t + h, params)

next_state = state + (h / 6) * (k1 + 2*k2 + 2*k3 + k4)
```

And fitting this around the attractor solving structure:

```python
@numba.njit(nogil=True)
def rk4_step(state, dt, params, eq):
    k1 = eq(state, 0.0, params)
    k2 = eq(state + 0.5 * dt * k1, 0.0, params)
    k3 = eq(state + 0.5 * dt * k2, 0.0, params)
    k4 = eq(state + dt * k3, 0.0, params)

    return state + (dt / 6.0) * (k1 + 2 * k2 + 2 * k3 + k4)


@numba.njit(nogil=True)
def solve_rk4(eq, y0, t_min, t_max, n, params):
    state = y0.copy()
    dt = (t_max - t_min) / n
    traj = np.empty((n, y0.shape[0]), dtype=np.float64)

    for i in range(n):
        state = rk4_step(state, dt, params, eq)
        traj[i] = state

    return traj
```

where `eq` is the system definition function, which looks something like

```python
@numba.njit(nogil=True)
def lorenz(state, t, params):
    x, y, z = state
    a, b, c = params

    dx_dt = a * (y - x)
    dy_dt = x * (b - z) - y
    dz_dt = x * y - c * z

    return np.array([dx_dt, dy_dt, dz_dt])
```

The first RK4 implementation was quicker for a $20,000$ point Lorenz trajectory with
around $5.5$ ms against $10.6$ ms for `odeint`. But at $100,000$ points it took about
$27.6$ ms, while `odeint` took $13.7$ ms. This makes sense given what we discussed above
about how each method operates. Solving for five times as many points requires RK4 to
perform five times as many equation evaluations. But because `odeint` chooses it's own
internal step sizes independently of the requested output points, it only needed
$14,703$ equation evaluations, with the remaining output points being obtained through
interpolation.

At this point I still considered this a step in the right direction. However, if we look
more closely at the RK4 solve function, we can see that it still creates temporary NumPy
arrays throughout the integration. In the loop

```python
for i in range(n):
    state = _rk4_step(state, dt, params, eq)
    traj[i] = state
```

each evaluation of the system's equations returns a new array containing the
derivatives. Moreover, calculating the intermediate states for RK4 also involved array
operations that could allocate additional memory. See [here](/examples/rk4_initial.py) for the full first version
and [here](/examples/rk4_optim.py) for second.

This can be avoided by allocating a set of buffers once before entering the integration
loop and reusing them for every step:

```python
k1 = np.empty(m)
k2 = np.empty(m)
k3 = np.empty(m)
k4 = np.empty(m)
```

The derivatives could then be written directly into the existing `k1`, `k2`, `k3` and
`k4` arrays. With this implementation the calculation and number of equation evaluations
remains the same, but we're avoiding repeatedly allocating memory for intermediate
results. The same can be applied to how the system functions are defined. Rather than
returning a newly allocated array with each evaluation we can have the derivatives write
directly to an existing buffer:

```python
@numba.njit(nogil=True)
def _lorenz(state, params, out):
    x, y, z = state
    a, b, c = params

    out[0] = a * (y - x)
    out[1] = x * (b - z) - y
    out[2] = x * y - c * z
```

In order to get a quantitative measure between the methods a benchmark was run to fairly
compare their solve times. The benchmark involved running eleven batches of repeated
solves, shuffling the order each time and taking the median timings. The initial
compilation was intentionally left out since the solver would already be compiled by the
time a slider is moved. The time spent allocating and filling the trajectory arrays was
included but the time spent generating the output grid wasn't so that the timings
focused on the integration itself.


## Results

The table and figure below show benchmark results for solve times for each integration
method. The Lorenz attractor was used for all methods over an interval of `t=[0,50]`,
with $x_0 = 0, y_0=1.5, z_0=15$ for the initial conditions, and parameter values of
$\sigma = 10$, $\rho = 28$ and $\beta = 8/3$.

| Method                 | 20,000 points (ms) | 100,000 points (ms) |
| ---                    | ---:               | ---:                |
| `odeint`               | 10.57              | 13.68               |
| RK4, allocating arrays | 5.503              | 27.56               |
| RK4, reusing buffers   | 0.461              | 2.304               |

<br>

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="/examples/solver_performance_figs/solve_times_dark.png"
  >
  <img
    src="/examples/solver_performance_figs/solve_times.png" alt="Description"
    style="display: block; margin-inline: auto;"
  >
</picture>

The RK4 solver with buffers being reused was now around $12$ $\times$ faster than the
initial implementation at both point counts. And comparing with `odeint` showed a
roughly $23\times$ speed increase at $20,000$ points and $6\times$ increase at $100,000$
points.

## Speed vs accuracy

While the benchmark showed the RK4 implementation improved speed considerably I wanted
to look into what this was doing in terms of the accuracy of the solution.

For this the solvers were compared over the first two time units of the Lorenz system,
using 100 common output times. SciPy's `DOP853`[^3] method with tight tolerances was
used as a reference point[[3]](#ref3). Tightening the tolerances further and halving the
maximum step size changed the reference by less than $3\times 10^{-14}$.

<picture>
  <source
    media="(prefers-color-scheme: dark)"
    srcset="/examples/solver_performance_figs/work_precision_dark.png"
  >
  <img
    src="/examples/solver_performance_figs/work_precision.png" alt="Description"
    style="display: block; margin-inline: auto;"
  >
</picture>

The figure shows that for both RK4 implementations reducing step size improves accuracy
at the cost of longer solve times. We can also see that at a step size of $h = 0.0025$
both produced an error of $\approx 1.24\times 10^{-6}$, but the buffer optimised version was
around ten times faster. For comparison, `odeint` with its default tolerances had an
error of $\approx 8.86\times 10^{-6}$. Increasing the RK4 step size to $0.02$ reduced its solve
time further but the error rose to around $0.018$. And so, thought larger steps improves
performance in terms of solve speed, it reaches a point where the loss in accuracy
becomes hard to justify.

We should be careful drawing too much from this result since it's only representative of
a short section of the trajectory. The earlier $20,000$ point benchmark used the same
step of $h = 0.0025$ but a small error over two time units isn't indicative that the
trajectory will remain close to the reference over the full time interval. One of the
main things that make strange attractors interesting is that they're chaotic, so even a
minute numerical difference will eventually make the trajectories separate. However,
over longer intervals comparing the overall properties of the system becomes more useful
than comparing individual points for my particular use case.

## Conclusion

The biggest improvement didn't come from changing integration method but actually from
changing how it was implemented. Reusing buffers and avoiding unnecessary array
allocations made RK4 considerably faster. And it's because the flexibility of being able
to tightly control _how_ the integration actually happens within the app that makes RK4
a good choice here. However, this doesn't make RK4 a better solver than LSODA, which
offers things like adaptive step size, error control and better handling of stiff
systems. But since these come with a computational cost, the fixed step RK4 integrator
provides a good balance between speed and accuracy where the primary goal is smooth
responsiveness between the system being solved and it's plot being updated.

## References

<a id="ref1"></a>[1] _SciPy documentation_,`scipy.integrate.odeint`,
[https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.LSODA.html](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.LSODA.html)
(accessed September, 2026)

<a id="ref2"></a>[2] _A First Course in Computational Physics_, Paul L. Devries, p.215-217
(accessed September, 2026)

<a id="ref3"></a>[3] _SciPy documentation_,`scipy.integrate.DOP853`,
[https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.DOP853.html](https://docs.scipy.org/doc/scipy/reference/generated/scipy.integrate.DOP853.html)
(accessed September, 2026)


[^1]: Solution changes on a comparable time scale so step size is limited by accuracy
    rather than stability. Methods like RK4 work well here as the error shrinks fast as
    the step gets smaller
[^2]: Multi step methods which reuse derivative values from previous steps to
    extrapolate the next, requiring roughly one new evaluation per step
[^3]: Adaptive eighth order Runge-Kutta solver. Has a much smaller truncation error than
    that being compared for the RK4 methods
