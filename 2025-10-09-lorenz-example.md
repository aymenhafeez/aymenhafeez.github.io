---
layout: nodatepost
mathjax: true
title: The Lorenz Attractor
---

Animating the Lorenz attractor

---

$\newcommand{\dd}{\mathrm{d}}$

The Lorenz system is a classic example of chaos in dynamical systems. It's
known for its butterfly-shaped attractor and is defined by the following set of
ordinary differential equations:

$$\frac{\dd x}{\dd t}=\sigma(y-x)$$ 

$$\frac{\dd y}{\dd t}=x(\rho-z)-y$$ 

$$\frac{\dd z}{\dd t}=xy-\beta z$$

Because of its striking visual when plotted it'll serve as a good example to
show how the `animplotlib` package can be used for creating a more complex
animation in both 2D and 3D.

---

First ensure the `animplotlib` package is installed:

```bash
pip install animplotlib
```

We'll make use of `scipy.integrate.odeint` to solve the system to generate the
data being plotted. First we import the necessary libraries and define the
attractor:

```python
import matplotlib.pyplot as plt
from scipy.integrate import odeint
import numpy as np
import animplotlib as anim

x0 = [0, 1, 15]
t = np.linspace(0.01, 100, 10000)

# defining the Lorenz system
def lorenz(x_var, t, sigma, rho, beta):
    x, y, z = x_var
    dx_dt = sigma * (y - x)
    dy_dt = x * (rho - z) - y
    dz_dt = x * y - beta * z
    return [dx_dt, dy_dt, dz_dt]

# solving the system
def solve_lorenz(x0, t, sigma, rho, beta):
    return odeint(lorenz, x0, t, args=(sigma, rho, beta))

x_solve = solve_lorenz(x0, t, sigma=10, rho=28, beta=8/3)
x, y, z = x_solve.T
```

## 2D Animation

Let's visualize the Lorenz attractor in three 2D projections: `x vs y`, `x vs
z`, and `y vs z`, each on its own axis within the same figure. The method
parallels the example of making a 2D animation containing a single axis,
however, here we create a list of axes, lines and points and pass them to
AnimPlot the same way.


```python
# creating three subplots
fig, axs = plt.subplots(1, 3, figsize=(15, 5))

# lists to hold lines, points, and data for each subplot
lines = []
points = []
xs = []
ys = []

# x vs y
line1, = axs[0].plot([], [], lw=0.5)
point1, = axs[0].plot([], [], 'ro', markersize=4)
axs[0].set_xlim(np.min(x), np.max(x))
axs[0].set_ylim(np.min(y), np.max(y))
axs[0].set_title('x vs y')
axs[0].set_axis_off()
lines.append(line1)
points.append(point1)
xs.append(x)
ys.append(y)

# x vs z
line2, = axs[1].plot([], [], lw=0.5)
point2, = axs[1].plot([], [], 'ro', markersize=4)
axs[1].set_xlim(np.min(x), np.max(x))
axs[1].set_ylim(np.min(z), np.max(z))
axs[1].set_title('x vs z')
axs[1].set_axis_off()
lines.append(line2)
points.append(point2)
xs.append(x)
ys.append(z)

# y vs z
line3, = axs[2].plot([], [], lw=0.5)
point3, = axs[2].plot([], [], 'ro', markersize=4)
axs[2].set_xlim(np.min(y), np.max(y))
axs[2].set_ylim(np.min(z), np.max(z))
axs[2].set_title('y vs z')
axs[2].set_axis_off()
lines.append(line3)
points.append(point3)
xs.append(y)
ys.append(z)

# call the AnimPlot class
anim.AnimPlot(fig, lines, points, xs, ys, plot_speed=2, l_num=1000)
```

<center>
  <figure> 
    <img src="https://raw.githubusercontent.com/aymenhafeez/aymenhafeez.github.io/refs/heads/master/images/lorenz_project.gif" /> 
  </figure>
</center>

## 3D Animation

To better see how these projections relate to each other we can create an
animation in 3D using the AnimPlot3D class. A standout property of chaotic
systems is that they're very sensitive to changes in their input parameters. We
can visualise this by plotting the Lorenz attractor with various initial
conditions on the same axes.

To do this we solve the Lorenz system for each set of initial conditions and
store the results in separate arrays. We then create a line and a point for
each solution and add them to a list of lines and points to be passed to
AnimPlot3D. Note that when passing the axes to AnimPlot3D we multiply the list
by `len(lines)`. This is because AnimPlot3D expects a list of axes, one for
each line/trajectory we want to animate. Passing just `[ax]` (a single axis)
would result in only the first line/trajectory being animated. By passing
`[ax] * len(lines)`, we create a list with the same axis repeated for each
line, allowing all lines to be animated.

```python
t = np.linspace(0.01, 50, 5000)
# list of initial conditions
x0 = [
    (0., 1., 1.05),
    (15., 10., 20.),
    (-15., -10., 30.),
    (5., -20., 40.)
]
# distinct colors for each trajectory
colors = [
    "#4E79A7",
    "#F28E2B",
    "#46ACB8",
    "#E15759"
]

# definig the Lorenz system
def lorenz(x_var, t, sigma, rho, beta):
    x, y, z = x_var
    dxdt = sigma * (y - x)
    dydt = x * (rho - z) - y
    dzdt = x * y - beta * z
    return [dxdt, dydt, dzdt]

# solving the system
def solve_lorenz(x0, t, sigma, rho, beta):
    return odeint(lorenz, x0, t, args=(sigma, rho, beta))

fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='3d')
ax.set_axis_off()

# lists to hold lines, points, and data for each trajectory
lines = []
points = []
xs, ys, zs = [], [], []

# solve for each set of initial conditions and create a line and point for each
for init_cond, color in zip(x0, colors):
    x_solve = solve_lorenz(init_cond, t, sigma=10, rho=28, beta=8/3)
    x, y, z = x_solve.T
    xs.append(x)
    ys.append(y)
    zs.append(z)
    line, = ax.plot([], [], [], lw=2, color=color)
    point, = ax.plot([], [], [], 'o', color=color, markersize=8)
    lines.append(line)
    points.append(point)

ax.set_xlim(np.min(xs), np.max(xs))
ax.set_ylim(np.min(ys), np.max(ys))
ax.set_zlim(np.min(zs), np.max(zs))

anim.AnimPlot3D(fig, [ax] * len(lines), lines, points, xs, ys, zs, plot_speed=1,
           rotation_speed=0.25, l_num=100, p_num=1)
```

<center>
  <figure> 
    <img src="https://raw.githubusercontent.com/aymenhafeez/aymenhafeez.github.io/refs/heads/master/images/lorenz_colour.gif" width="600" /> 
  </figure>
</center>

<br>
<br>

<a href="/2025-10-09-animplotlib.md">Back to examples</a>

<br>
