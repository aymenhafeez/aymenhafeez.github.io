---
layout: post
mathjax: true
title: Neutron diffusion part 2
---

Solving the neutron diffusion equation.

---

<!-- $ \newcommand{\text{d}}{\mathrm{d}} $ -->

The main reason I was interested in solving this was due to the presence of
non-constant coefficients, which was not a general form I had come across.
Solving second order ODE's of this form can be done using the Frobenius method,
which produces an infinite series solution. We begin by defining an expression in
the form which we want the solution to be:

$$
\begin{equation*}
\begin{aligned}
    \phi = \sum_{n=0}^{\infty}a_nr^{n+k}
\end{aligned}
\end{equation*}
$$

The first and second derivatives are, therefore,

$$
\begin{equation*}
\begin{aligned}
    \frac{\text{d} \phi}{\text{d} r} = \sum_{n=0}^{\infty}(n + k)a_n r^{n+k-1}
\end{aligned}
\end{equation*}
$$

$$
\begin{equation*}
\begin{aligned}
    \frac{\text{d}^2 \phi}{\text{d} r^2} = \sum_{n=0}^{\infty}(n+k-1)(n + k)a_n r^{n+k-2}
\end{aligned}
\end{equation*}
$$

Substituting the derivatives back into the ordinal expression gives

$$
\begin{equation*}
\begin{aligned}
    \sum_{n=0}^{\infty}(n+k-1)(n+k)a_nr^{n+k-2} + \frac{1}{r}\sum_{n=0}^{\infty}(n + k)a_n r^{n+k-1} + B^2\sum_{n=0}^{\infty}a_nr^{n+k} = 0 \\
\end{aligned}
\end{equation*}
$$

Ideally we would want each $r$ term to be raised to same power. Expanding out
the first two terms of the $r^{n+k}$ expression, followed by some manipulation,
gives:

$$
\begin{equation*}
\begin{aligned}
    \sum_{n=0}^{\infty}(n+k-1)(n+k)a_nr^{n+k-2} +
    \frac{1}{r}\sum_{n=0}^{\infty}(n + k)a_n r^{n+k-1} +
    B^2\sum_{n=2}^{\infty}a_nr^{n+k-2} = 0 \\
\end{aligned}
\end{equation*}
$$

$$
\begin{equation*}
\begin{aligned}
    \sum_{n=2}^{\infty} (n+k-1)(n+k)a_{n}r^{n+k-2} +
    \frac{1}{r}\sum_{n=2}^{\infty} (n+k)a_{n}r^{n+k-1} +
    B^{2}\sum_{n=2}^{\infty} a_{n-2}r^{n+k-2} \\
    + k(k-1)a_{0}r^{k-2} + k(k+1)a_{1}r^{k-1} + \frac{1}{r}\left(
    ka_{0}r^{k-1}+(k+1)a_{1}r^{k} \right) = 0 \nonumber
\end{aligned}
\end{equation*}
$$

$$
\begin{equation*}
\begin{aligned}
    \sum_{n=2}^{\infty} (n+k-1)(n+k)a_{n}r^{n+k-2} +
    \frac{1}{r}\sum_{n=2}^{\infty} (n+k)a_{n}r^{n+k-1} +
    B^{2}\sum_{n=2}^{\infty} a_{n-2}r^{n+k-2} \\
    + k(k-1)a_{0}r^{k-2} + k(k-1)a_{1}r^{k-1} + ka_{0}r^{k-2} + (k+1)a_{1}r^{k-1} = 0
\end{aligned}
\end{equation*}
$$

We can equate the coefficients on the right side of the equation to zero. For
the $r^{k-2}$ terms we get

$$
\begin{equation*}
\begin{aligned}
  k(k - 1)a_{0} + k a_{0} = 0 \\
  a_{0}\left[ k(k - 1) + k \right] = 0 \\
  \implies k = 0 \ \therefore \ a_{0} = 0
\end{aligned}
\end{equation*}
$$

Doing the same with the $r^{k-1}$ terms:

$$
\begin{equation*}
\begin{aligned}
  k(k + 1)a_{1} + (k + 1)a_{1} = 0 \\
  a_{1}\left[ k(k + 1) + (k + 1) \right] = 0 \\
  a_{1}(k + 1)(k + 1) = 0 \\
  a_{1} = 0 \\
\end{aligned}
\end{equation*}
$$

The previous expression, therefore, becomes

$$
\begin{equation*}
\begin{aligned}
  \sum_{n=2}^{\infty} (n + k)(n + k - 1)a_{n}r^{n+i-2} + \sum_{n=2}^{\infty}
  (n + k)a_{n}r^{n+k-2} + B^{2}\sum_{n=2}^{\infty} a_{n-2}r^{n+k-2} = 0 \\
  \sum_{n=2}^{\infty} \left\{ \left[ (n + k)(n + k - 1) + (n + k) \right] a_{n} + B^{2}a_{n-2}\right\} r^{n+k-2} = 0
\end{aligned}
\end{equation*}
$$

We can see from this that the coefficients of $r^{n+k-2}$ must equate to 0, and
so, 

$$
\begin{equation*}
\begin{aligned}
  \left[ (n + k)(n + k - 1) + (n + k) \right] a_{n} + B^{2}a_{n-2} = 0
\end{aligned}
\end{equation*}
$$

$$
\begin{equation*}
\begin{aligned}
  a_{n}(k) &= -\frac{B^{2}a_{n-2}}{(n + k)(n + k - 1) + (n + k)} \\
  &= - \frac{B^{2}a_{n-2}}{(n + k)(n + k - 1 + 1)}  \\
  &= - \frac{B^{2}a_{n-2}}{(n + k)^{2}} \\
\end{aligned}
\end{equation*}
$$

If we now let $k = 0$,

$$
  a_{n}(0) = - \frac{B^{2}a_{n-2}}{n^{2}}
$$

We know that $a_{1} = 0$, so we can say that

$$
  a_{1} = a_{3} = a_{5} = a_{2n+1} = 0
$$

For $k = 0$, let $n = 2m$:

$$
  a_{2m}(0 = - \frac{B^{2}a_{2m-2}}{(2m^{2}}
$$

We can see that, for even values of $m$,

$$
  a_{2} = - \frac{B^{2}a_{0}}{2^{2}}
$$

$$
  a_{4} = \frac{-B^{2}a_{2}}{2^{2} \cdot 2^{2}} = \frac{-B^{2}a_{0}}{2^{2}}
  \cdot \frac{-B^{2}}{2^{2}\cdot 2^{2}}
$$

$$
   = \frac{B^{4}a_{0}}{2^{4}\cdot 2^{2}} = \frac{B^{4}a_{0}}{2^{4}(2^{2} \cdot
   1^{2})}
$$

$$
a_{6} = \frac{-B^{2}a_{4}}{2^{2}3^{2}} = \frac{-B^{2}}{2^{2}3^{2}} \cdot \frac{B^{4}a_{0}}{2^{4}(2 \cdot 1)^{2}}
  = \frac{-B^{6}a_{0}}{2^{6}(3 \cdot 2 \cdot 1)^{2}}
$$

$$
  a_{8} = \frac{-B^{2}a_{6}}{2^{2}4^{2}} = \frac{-B^{2}}{2^{2}4^{2}} \cdot \frac{-B^{6}a_{0}}{2^{6}(3 \cdot 2 \cdot 1)^{2}}
  = \frac{B^{8}a_{0}}{2^{8}(4 \cdot 3 \cdot 2 \cdot 1)^{2}}
$$

And so, in general we can say that

$$
  a_{2m} = \frac{(-1)^{m}B^{2m}a_{0}}{2^{2m}(m!)^{2}}
$$

We can put this back into out original expression for $\phi$ to get a solution

$$
  \phi_{1} = a_{0} \sum_{n=0}^{\infty}
  \frac{(-1)^{m}B^{2m}}{2^{2m}(m!)^{2}}r^{2m}
$$

This is known as the _Bessel function of the first kind_ (i.e. for $k = 0$ ).

$$
  \phi_{1} = \mathcal{J}_{0} (Br)
$$
