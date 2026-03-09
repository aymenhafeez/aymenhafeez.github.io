---
title: "A cool formula for \$\pi/8\$"
publishDate: "12 December 2025"
description: "A cool formula for pi / 8 from the zeta function"
tags: ["mathematics"]
---

I came across this expression whilst writing the <a
href="https://aymenhafeez.github.io/posts/2022-11-28-pi-prime-numbers/">$\pi$
and primes post</a>. In that post we showed that

$$\pi x\cot(\pi x)=1-2\sum_{n=1}^{\infty}\zeta(2n)x^{2n}$$

$$\frac{\pi x}{2}\cot(\pi x)=\frac{1}{2}-\sum_{n=1}^{\infty}\zeta(2n)x^{2n}$$

Letting $x=\frac{1}{4}$

$$\frac{\pi}{8}=\frac{1}{2}-\sum_{n=1}^{\infty}\frac{\zeta(2n)}{4^{2n}}$$

We've shown that the Riemann zeta function at even positive integers is given by
the following expression:

$$\zeta(2n)=\frac{(-1)^{k+1}(2\pi)^{2n}\beta_{2n}}{2(2n)!}$$

The first few even valued Bernoulli numbers, $\beta_{2n}$, are

$$\beta_2=\frac{1}{6}; \ \ \beta_4=-\frac{1}{30}; \ \ \beta_6=\frac{1}{42}; \ \ \beta_8=-\frac{1}{30}$$

And so, $\zeta(2n)$ for the first few values of $n$ is

$$\zeta(2)=\frac{\pi^2}{6}; \ \ \zeta(4)=\frac{\pi^4}{90}; \ \ \zeta(6)=\frac{\pi^6}{945}; \ \ \zeta(8)=\frac{\pi^8}{9450}$$

Expanding the sum out:

$$\frac{\pi}{8}=\frac{1}{2}-\frac{\pi^2}{6\cdot4^2}-\frac{\pi^4}{90\cdot4^4}-\frac{\pi^6}{945\cdot4^6}-\frac{\pi^8}{9450\cdot4^8}-.\ .\ .$$

We can simplify it visually by defining a constant $a_n$:

$$a_n=\frac{(-1)^{n+1}4^n\beta_{2n}}{2(2n)!}$$

So the expression becomes

$$\frac{\pi}{8}=\frac{1}{2}-a_1\frac{\pi^2}{4^2}-a_2\frac{\pi^4}{4^4}-a_3\frac{\pi^6}{4^6}-a_4\frac{\pi^8}{4^8}-.\ .\ .$$

which is just a really nice formula.
