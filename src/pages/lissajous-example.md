---
layout: ../layouts/MarkdownPage.astro
title: "Lissajous Knot Example"
description: "Lissajous knot animation example using animplotlib"
---

<div class="prose prose-sm prose-cactus max-w-none">

# Fourier Knot

A Fourier knot is a mathematical knot whose coordinates can be expressed as a finite Fourier series. A particular subset of the Fourier knots are the [Lissajous knots](https://mathworld.wolfram.com/LissajousCurve.html). They're the simplest form of Fourier knots as the Fourier series for each coordinate is given by a single cosine term:

$$x(t) = \cos(n_x t + \phi_x)$$

$$y(t) = \cos(n_y t + \phi_y)$$

$$z(t) = \cos(n_z t + \phi_z)$$

where $n_x$, $n_y$, and $n_z$ are integers that determine the number of oscillations in each coordinate, and $\phi_x$, $\phi_y$, and $\phi_z$ are phase shifts, which determine the starting position and orientation of the knot. A common example of integer frequencies and phase shifts are $n_x=3$, $n_y=5$, $n_z=7$ and $\phi_x=0$, $\phi_y=\pi/4$, $\phi_z=\pi/12$.

A characteristic of the Lissajous knot is that its projection onto any of the three coordinate planes is a Lissajous curve:

![](/images/lissajous_plot.png)

Though animating this in 3D isn't much different to the example outlined in the [quickstart guide](https://github.com/aymenhafeez/animplotlib?tab=readme-ov-file#basic-3d-animation-example), we can use it to see how normal matplotlib functions can be used on top of `animplotlib` to customise the plot.

We can import the necessary libraries as normal and define the Lissajous knot to generate the data being plotted, as well as creating a figure and 3D axes:

```python
import numpy as np
import matplotlib.pyplot as plt
import animplotlib as anim

# Number of frames and period over which to animate
n = 1000
t = np.linspace(0, 2*np.pi, n)
# Defining the Lissajous knot
x = np.cos(3*t)
y = np.cos(5*t + np.pi/4)
z = np.cos(7*t + np.pi/12)

# Creating a figure and 3D axes
plt.style.use("dark_background")
fig = plt.figure()
ax = fig.add_subplot(111, projection='3d')
```

Note that the time parameter `t` is defined over the interval $[0, 2\pi]$ i.e. one full oscillation, after which the animation resets and loops. Next, we create a line and point plot to pass to `animplotlib`, and set the `x`, `y` and `z` limits. We can also remove the axes to make a cleaner looking animation. After that we call the `AnimPlot3D` class:

```python
line, = ax.plot([], [], [], lw=2)
point, = ax.plot([], [], [], 'o', markersize=10)
ax.set_xlim(np.min(x), np.max(x))
ax.set_ylim(np.min(y), np.max(y))
ax.set_zlim(np.min(z), np.max(z))
ax.set_axis_off()

anim.AnimPlot3D(fig, ax, line, point, x, y, z, plot_speed=3,
                rotation_speed=0.36)
```

![](/images/fourier_bad_loop.gif)

> The animation traces the knot over 1000 frames with $t$ going from $0$ to $2\pi$. By setting `rotation_speed=0.36` the plot rotates by $0.36^\circ$ each frame. This ensures that over the 1000 frames the axes completes a full rotation at the same time as the plot finishes, giving a smooth transition into the loop resetting.

While the rotation and the plot are synchronised it would be cool to have the animation loop seamlessly without a noticeable reset. We could achieve this by increasing the interval by multiples of $2\pi$ to make the animation longer and trace over itself, but it would still eventually reset at the end of each cycle. To have a truly seamless loop we can plot a static Lissajous knot and have just the point trace over it and make the animated line invisible.

```python
# Static Lissajous knot
ax.plot(x, y, z, lw=2)
# Setting lw=0 to make the line invisible
line, = ax.plot([], [], [], lw=0)
point, = ax.plot([], [], [], 'o', markersize=10)
ax.set_xlim(np.min(x), np.max(x))
ax.set_ylim(np.min(y), np.max(y))
ax.set_zlim(np.min(z), np.max(z))
ax.set_axis_off()

anim.AnimPlot3D(fig, ax, line, point, x, y, z, plot_speed=3,
                rotation_speed=0.36)
```

![](/images/fourier_trefoil.gif)

This post highlights how `matplotlib`'s standard functionality can be used on top of `animplotlib`. Using the core plotting tools in `matplotlib`, along with `animplotlib`, you can fine tune the appearance and behaviour of animated plots.

<br />

[Back to examples](/posts/animplotlib/)

</div>
