---
layout: post
mathjax: true
title: The Lorenz Attractor 
---

<center>
<figure> 
  <img src="https://github.com/aymenhafeez/blog/blob/master/assets/images/lorenz-anim.gif?raw=true" /> 
</figure>
</center>

Above is an animation of a solution to the Lorenz equations, which are:

$$\frac{dx}{dt}=\sigma(y-x)$$ 

$$\frac{dy}{dt}=x(\rho-z)-y$$ 

$$\frac{dz}{dt}=xy-\beta z$$

The animation shows the solution for $\sigma=10,$ $\ \rho=28$ and $\beta=\frac{8}{3}$ and initial conditions of $x_0=0$, $y_0=1$ and $z_0=20$.

The code for the animation can be found <a href="https://github.com/aymenhafeez/animplotlib/tree/master/examples">here</a>
