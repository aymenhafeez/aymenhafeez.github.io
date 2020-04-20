---
layout: post
mathjax: true
title: Factorial of non-integer values
---

I recently came across this meme:

<p><img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/lotr-meme.png" alt="Meme" /></p>

Seeing this meme was the first time I came across this result. Proving it is a little tricky but it involves working with the gamma function, which is always fun. There are a couple of bits which may seem difficult to understand, but I have tried to explain them as best as I can and have provided some links at the end which may be useful.

The factorial operator can be defined as the following:

  $$n!=n\cdot(n-1)\cdot(n-2)\cdot(n-3)\cdots3\cdot2\cdot1$$

Or in a more compact form:

  $$n!=\prod_{k=1}^nk$$

However, this is only true for integer values of $n$. In order to prove the given result, the factorial operation must be defined for non-integer values. This can be done using the gamma function. The integral form of the gamma function is

  $$\Gamma(z)=\int_0^\infty x^{z-1}e^{-x}dx$$

In this form it is difficult to see how this could be used to find $(\frac{1}{2})!$. However, it can be equated to a general expression for finding the factorial of any real or complex $z$, with $\Re(z)>0$. This expression can be found inductively. First, we must find $\Gamma(1)$:

  $$
    \begin{aligned}
    \Gamma(1)&=\int_0^{\infty}e^{-x}dx \\
    &=\left[-e^{-x}\right]_0^{\infty} \\
    &=\left(\lim_{x\to\infty}-e^{-x}\right)+e^{-0} \\
    &=1
    \end{aligned}
  $$

Next, we find $\Gamma(z+1)$:

  $$\Gamma(z+1)=\int_0^{\infty}x^ze^{-x}dx$$

This can be evaluated by integrating by parts:

  $$
    \begin{aligned}
    \Gamma(z+1)&=\left[-x^ze^{-x}\right]_0^\infty+z\int_0^{\infty}x^{z-1}e^{-x}dx \\
    &=\left[-x^ze^{-x}\right]_0^\infty+z\Gamma(z) \\
    &=\left(\lim_{x\to\ \infty}-x^ze^{-x}\right)+z\Gamma(z) \\
    &=z\Gamma(z)
    \end{aligned}
  $$

Combining this with $\Gamma(1)=1$ we can see that


