---
layout: post
mathjax: true
title: The Lorenz Attractor 
---

<center>
<figure> 
  <img src="https://raw.githubusercontent.com/aymenhafeez/aymenhafeez.github.io/master/images/lorenz-anim.gif" /> 
</figure>
</center>

$\newcommand{\dd}{\mathrm{d}}$

Above is an animation of a solution to the Lorenz equations, which are:

$$\frac{\dd x}{\dd t}=\sigma(y-x)$$ 

$$\frac{\dd y}{\dd t}=x(\rho-z)-y$$ 

$$\frac{\dd z}{\dd t}=xy-\beta z$$

The animation shows the solution for $\sigma=10,$ $\ \rho=28$ and $\beta=\frac{8}{3}$ and initial conditions of $x_0=0$, $y_0=1$ and $z_0=20$.

The code for the animation can be found <a href="https://github.com/aymenhafeez/animplotlib/tree/master/examples">here</a>
