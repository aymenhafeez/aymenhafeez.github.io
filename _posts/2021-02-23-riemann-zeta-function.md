---
layout: post
mathjax: true
title: Relating the gamma function and the Riemann zeta function
---

$\newcommand{\dd}{\mathrm{d}}$

The [Mellin transform][1] of a function $f$ is given by

  $$
    \begin{aligned}
        \left\{\mathscr{M}f\right\}(s)=\phi(s)=\int_0^{\infty}x^{s-1}f(x)\dd x
    \end{aligned}
  $$

For the function

  $$
    \begin{aligned}
      f(x)=\frac{1}{e^x - 1}
    \end{aligned}
  $$

we have

  $$
    \begin{aligned}
      \phi(s)&=\int_0^{\infty}\frac{x^{s-1}}{e^x - 1}\dd x \\
            &=\sum_{n \geq1}\int_{0}^{\infty}x^{s-1}e^{-nx}\dd x
    \end{aligned}
  $$

Making the substitution $u=nx$ gives

  $$
    \begin{aligned}
        \phi(s)&=\sum_{n \geq1}\frac{1}{n^s}\int_{0}^{\infty}u^{s-1}e^{-u}\dd u \\
              &=\zeta(s)\Gamma(s)
    \end{aligned}
  $$

Equating this to the above integral gives the desired result:

  $$
    \begin{aligned}
        \zeta(s)\Gamma(s)&=\int_{0}^{\infty}\frac{x^{s-1}}{e^x - 1}\dd x \\
                        \zeta(s)&=\frac{1}{\Gamma(s)}\int_{0}^{\infty}\frac{x^{s-1}}{e^x - 1}\dd x
    \end{aligned}
  $$


