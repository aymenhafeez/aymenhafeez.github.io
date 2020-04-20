---
layout: post
mathjax: true
title: A strange expression for pi from the error function 
---

In my third year at university I was introduced to the error function during a 'Transport Phenomena' class. It came up in the context of deriving expressions to describe heat and mass transfer through various geometries. It was probably some of the most interesting stuff I learnt at university and I may go into more detail about it in another post. While revising for the exam I, with the help of a friend, derived an expression for $\pi$. There isn't anything particularly strange about the derivation or the expression itself. However, it wasn't until recently when I plotted its convergence that I became a little curious about it.

I'll begin by presenting the derivation, which starts with the error function:

  $$\text{erf}(z)=\frac{2}{\sqrt{\pi}}\int_{0}^{z}e^{-x^2}dx$$

Recall that the Maclaurin series of the exponential function, $e^x$, is given by

  $$e^x=\sum_{n=0}^{\infty}\frac{x^n}{n!}$$

And so, we can write the error function as

  $$
    \begin{aligned}
      \text{erf}(z)&=\frac{2}{\sqrt{\pi}}\int_{0}^{z}\sum_{n=0}^{\infty}\frac{(-x^2)^n}{n!}dx \\ 
      &=\frac{2}{\sqrt{\pi}}\int_{0}^{z}\left(1-x^2+\frac{x^4}{2!}-\frac{x^6}{3!}+.\ .\ .\right)dx
    \end{aligned}
  $$

Taking the integral and applying the limits of integration gives
  
  $$
    \begin{aligned}
      \text{erf}(z)&=\frac{2}{\sqrt{\pi}}\left[x-\frac{x^3}{3}+\frac{x^5}{5\cdot2!}-\frac{x^7}{7\cdot3!}+.\: .\: .\right]_0^z \\
      &=\frac{2}{\sqrt{\pi}}\left(z-\frac{z^3}{3}+\frac{z^5}{5\cdot2!}-\frac{z^7}{7\cdot3!}+.\: .\: .\right) \\
      &=\frac{2}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{(-1)^nz^{2n+1}}{n!(2n+1)}
    \end{aligned}
  $$
  
Next, we consider the value of the error function at various values of $z$:

  * $\text{erf}(1)\approx0.8427008$
  * $\text{erf}(2)\approx0.9953223$
  * $\text{erf}(3)\approx0.9999779$
  * $\text{erf}(4)\approx1$

$\text{erf}(4)$ is not exactly equal to $1$, though it is a pretty good approximation. And so, subsituting $z=4$ into Equation (6) gives

  $$1\approx\frac{2}{\sqrt{\pi}}\sum_{n=0}^{\infty}\frac{(-1)^n4^{2n+1}}{n!(2n+1)}$$
  
  $$\frac{\sqrt{\pi}}{2}\approx\sum_{n=0}^{\infty}\frac{(-1)^n4^{2n+1}}{n!(2n+1)}$$

Or more accurately we can say

  $$\lim_{z\to\infty}\sum_{n=0}^{\infty}\frac{(-1)^nz^{2n+1}}{n!(2n+1)}=\frac{\sqrt{\pi}}{2}$$

This is a pretty nice result from the error function, however, if we look at its convergence it's quite interesting.

<center>
  <figure>
    <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/haf-har.gif">
    <figcaption>Convergence at $z=4$</figcaption>
  </figure>
</center>

I'm aware that the error function is heavily applied in probability theory due its relation with the normalised Gaussian function. However, my knowledge and understanding of probability theory are far too limited to be able to make sense of why the expression converges this way. The normalised Gaussian function has the characteristic 'bell' shaped curve, so for now I'll assume that the relation to the Gaussian function is why the expression takes this shape. I'll update this post if I learn more about it in the future, or if anyone reading this has any idea, then please to let me know.

## UPDATE $(28$-$09$-$19)$

After revisiting this post I realised that I had not plotted the convergence of the expression for $\frac{\sqrt{\pi}}{2}$, and had only shown the plot for the rearranged expressing of for $\pi$. Plotting the expression

  $$\frac{\sqrt{\pi}}{2}\approx\sum_{n=0}^{\infty}\frac{(-1)^n4^{2n+1}}{n!(2n+1)}$$

shows that it also converges in an interesting way:

<center>
  <figure>
    <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/haf-har2.gif">
    <figcaption>Convergence of $\frac{\sqrt{\pi}}{2}$</figcaption>
  </figure>
</center>

This also makes a good header for the post. Unfortunately, I still haven't committed enough time to truly understand why this expression behaves the way it does. If anyone who reads this has an idea, or if I'm missing something then let me know!
