---
title: "Higher dimensional spheres and the prime numbers"
publishDate: "10 March 2026"
description: "Relating the volume of higher dimensional spheres to the prime numbers"
tags: ["mathematics"]
---

In a [previous
post](https://aymenhafeez.github.io/posts/2026-01-03-n-ball-gamma-function/) we
showed how to derive an expression for the volume of an $n$-ball:

$$
  V_n = \frac{\pi^{n/2}}{\Gamma\left(\frac{n}{2} + 1\right)}
  = \frac{\pi^{n/2}}{(n/2)!}
$$

In  another post we've also looked at the [Riemann zeta function at even
values](https://aymenhafeez.github.io/posts/2022-11-28-pi-prime-numbers/),

$$
  \zeta(2k) = \frac{(-1)^{k+1}(2\pi)^{2k}\Beta_{2k}}{2(2k)!}
$$

as well how the deriving [Euler's prime product
formula](https://aymenhafeez.github.io/posts/2025-06-21-prime-product/),

$$
  \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^2} = \prod_{p \text{ prime}}
  \frac{1}{1 - p^{-s}}
$$

We've also looked at showing how the [zeta function is related to the Gamma
function](https://aymenhafeez.github.io/posts/2025-02-08-riemann-zeta-function/):

$$
  \zeta(s) = \frac{1}{\Gamma(s)}\int_{o}^{\infty} \frac{u^{s-1}}{e^u - 1}
  \text{d}u
$$

In this post we'll see how all these tie together to give a surprising relation
between the volume of an $n$-ball and the primes.

Recall again that for $4$ dimensional $n$-ball, the volume is

$$
  V_4 = \frac{\pi^2}{\Gamma(3)} = \frac{\pi^2}{2!} = \frac{\pi^2}{2} = 3\zeta(2)
$$

And then substituting in the prime product formula for $s = 4$:

$$
  V_4 = 3\prod_{p} \frac{1}{1 - p^{-2}}
$$

Let's also consider the $8$ dimensional $n$-ball:

$$
  V_8 = \frac{\pi^{8/2}}{(8/2)!} = \frac{\pi^4}{24}
$$

The Riemann zeta function also gives us an expression for $\pi$ raised to fourth
power:

$$
  \zeta(4) = \frac{\pi^4}{90}
$$

Putting these together and then equation to the prime product formula at $s = 4$:

$$
  V_8 = \frac{90}{24}\zeta(4) = \frac{15}{4}\zeta(4)
$$
$$
  V_8 = \frac{15}{4}\prod_{p}\frac{1}{1 - p^{-4}}
$$

We can get a general expression relating $V_n$ to the primes:

$$
  \zeta(2) = \frac{\pi^2}{6} \ \ \ \ \ \Rightarrow \ \ \ \ \ \pi^2 = 6\zeta(2)
$$
$$
  \pi^{n/2} = (\pi^2)^{n/4} = (6\zeta(2))^{n/4}
$$

Substituting this back into the volume formula:

$$
  V_n = \frac{(6\zeta(2))^{n/4}}{(n/2)!}
$$

And then using the prime product formula at $s = 2$:

$$
  V_n = \frac{1}{(n/2)!}\left( 6 \prod_{p} \frac{1}{1 - p^{-2}} \right)^{n/4}
$$

This is a _general formula for a unit $n$-ball in terms of the prime numbers_.
While this isn't as clean as the expression for $n = 4$ it's still a pretty
incredible formula. But because when $n = 4$ we get a single power of the prime
product so the expression simplifies significantly.
