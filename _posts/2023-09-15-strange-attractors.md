---
layout: post
mathjax: true
title: Strange Attractors
---

Visualising some interesting strange attractors

---

# Lorenz attractor

* The Lorenz attractor was the first chaotic attractor to be found in
three-dimensional continuous autonomous system
* Prompted the emergence of a large number of chaotic systems in various
disciplines

The most well known attractor is the Lorenz attractor. This was discovered by
Edward Lorenz in the 1960s while he was trying to create a mathematical model
to describe the behaviour of convection cells in the Earth's atmosphere. He
developed a system of three non-linear differential equations that represented
the flow of air within a simplified atmospheric model, with the aim of capturing
the complex dynamics of convection.

$$
\left\{
  \begin{array}{ll}
    \frac{dx}{dt}&=&\sigma (-x + y)\\
    \frac{dy}{dt}&=& -x z + \rho x - y \\
    \frac{dz}{dt}&=& x y - \beta z
  \end{array}
\right.
$$

Using early computers he was able to carry out numerical simulations of the
equations. In these simulations he noticed that with smallest of changes to the
initial conditions, the trajectories of the solutions would diverge dramatically
over time. He famously described this as the "butterfly effect", underscoring
the extreme sensitivity of chaotic systems to initial conditions. Lorenz's work
fundamentally changed the understanding of deterministic chaos and influenced
the development of chaos theory and the study of non-linear dynamical systems in
the various scientific disciplines.

The classic butterfly shaped solution curve is achieved when $\rho = 28, \ \sigma
= 10$ and $\beta = 8/3$, and initial conditions such as $[0, 1, 15]$.

<center>
  <figure> 
    <img src="https://raw.githubusercontent.com/aymenhafeez/aymenhafeez.github.io/master/images/lorenz-anim.gif" /> 
  </figure>
</center>

# De Jong attractor

The De Jong attractor can be characterised by the following equations

$$
x_{n+1} = \sin(a y_n) - \cos(b x_n) \\
y_{n+1} = \sin(c x_n) - \cos(d y_n),
$$

Here $a,\ b,\ c$ and $d$ are constants. Generating $(x,y)$ coordinates over
many iterations results in some striking visualisations of the attractor

<center>
  <figure> 
    <img src="https://raw.githubusercontent.com/aymenhafeez/aymenhafeez.github.io/master/images/De_Jong_Attractors.png" width="800" height="640"/> 
  </figure>
</center>


The above plots have the same initial conditions for $x$ and $y$ but show how
changing the values of the parameters $a,\ b,\ c$ and $d$ affects the system.

## Clifford attractor

## Svensson attractor



# Other attractors

* New chaotic systems take on different topological structures i.e. one-scroll,
multi-scroll, butterfly, multi-wing etc.
