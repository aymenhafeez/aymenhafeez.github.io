---
layout: post
mathjax: true
title: The gamma function and the Riemann zeta function
---

Deriving a relation between the gamma function and the Riemann zeta function.

---

$\newcommand{\dd}{\mathrm{d}}$

The [Mellin transform](https://mathworld.wolfram.com/MellinTransform.html) of a
function $f$ is given by

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



Another method of deriving this result is by starting with the Gamma function
itself:

$$
\begin{equation*}
\begin{aligned}
  \Gamma(s) = \int_{0}^{\infty} t^{s-1} e^{-t} \dd t
\end{aligned}
\end{equation*}
$$

Making the substitution $t = nu$ with $\dd t = n\dd u$, we have

$$
\begin{equation*}
\begin{aligned}
  \Gamma(s) &= \int_{0}^{\infty} (nu)^{-s-1} e^{-nu} \dd u \\
            &= \int_{0}^{\infty} n^s u^{s-1} e^{-nu} \dd u
\end{aligned}
\end{equation*}
$$

The $n^s$ term can be brought out of the integral, and multiplying both sides by
$\frac{1}{n^s}$ gives,

$$
\begin{equation*}
\begin{aligned}
  \Gamma(s) \frac{1}{n^s} = \int_{n=0}^{\infty} u^{s-1} e^{-nu} \dd u
\end{aligned}
\end{equation*}
$$

Taking the sum over both sides gives the Riemann zeta function on the left,

$$
\begin{equation*}
\begin{aligned}
  \Gamma(s) \sum_{n=1}^{\infty} \frac{1}{n^s} = \sum_{n=1}^{\infty}
  \int_{0}^{\infty} u^{s-1} e^{-nu} \dd u \\
  \Gamma(s) \zeta(s) = \int_{0}^{\infty} u^{s-1} \sum_{n=1}^{\infty} e^{-nu} \dd
  u \\
\end{aligned}
\end{equation*}
$$

Seeing that the $e^{-nu}$ term is just $({e^{-u}})^n$, we can see that it is an
infinite geometric series, and so, it can be rewritten as

$$
\begin{equation*}
\begin{aligned}
  \Gamma(s)\zeta(s) = \int_{0}^{\infty} u^{s-1} \left( \frac{1}{1 - e^{-u}} - 1
  \right) \dd u
\end{aligned}
\end{equation*}
$$

Note that $1$ must be subtracted as the summation starts from $n=1$ rather than
$n=0$. With some rearranging and manipulation we get,

$$
\begin{equation*}
\begin{aligned}
  \Gamma(s) \zeta(s) &= \int_{0}^{\infty} u^{s-1} \left( \frac{1}{1 - e^{-u}} -
  \frac{1 - e^{-u}}{1 - e^{-u}} \right)  \dd u \\
                     &= \int_{0}^{\infty} u^{s-1} \left( \frac{e^{-u}}{1 -
                     e^{-u}} \right)  \dd u \\
                     &= \int_{0}^{\infty} u^{s-1} \left( \frac{1}{e^u - 1}
                     \right) \dd u
\end{aligned}
\end{equation*}
$$

And so, we have the desired result:

$$
\begin{equation*}
\begin{aligned}
  \zeta(s) = \frac{1}{\Gamma(s)} \int_{0}^{\infty} \frac{u^{s-1}}{e^u - 1} \dd u
\end{aligned}
\end{equation*}
$$


