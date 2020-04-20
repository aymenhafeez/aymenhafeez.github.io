---
layout: post
mathjax: true
title: Miscellaneous formulae for pi
---
  
  
### Infinite products

The $\text{sinc}$ function is defined for $x\neq0$ as

  $$\text{sinc}(x)=\frac{\sin(x)}{x}$$

It can also be expressed as an infinite product:

  $$\frac{\sin(x)}{x}=\prod_{n=1}^{\infty}\left(1-\frac{x^2}{\pi^2n^2}\right)$$

The normalised $\text{sinc}$ function is

  $$\frac{\sin(\pi x)}{\pi x}=\prod_{n=1}^{\infty}\left(1-\frac{x^2}{n^2}\right)$$

See <a href="https://aymenhafeez.github.io/blog/pi-prime-numbers">this post</a> on generating $\pi$ using the prime numbers for a short, non-rigorous explanation on expressing functions in this form, or look into the Weierstrass factorisation theorem for a more rigorous explanation on expressing functions in this form. Letting $x=\frac{1}{2}$ gives

  $$ \frac{2}{\pi}=\prod_{n=1}^{\infty}\left(1-\frac{1}{4n^2}\right) =
  \prod_{n=1}^{\infty}\left(\frac{4n^2-1}{4n^2}\right) $$

This is Wallis's formula for $\pi$. And taking the reciprocal:

  $$\frac{\pi}{2}=\prod_{n=1}^{\infty}\left(\frac{4n^2}{4n^2-1}\right)$$

If instead we let $x=\frac{1}{4}$ we get

  $$ \frac{2\sqrt{2}}{\pi}=\prod_{n=1}^{\infty}\left(1-\frac{1}{16n^2}\right)
  =\prod_{n=1}^{\infty}\left(\frac{16n^2-1}{16n^2}\right) $$

Again, taking the reciprocal gives

  $$ \frac{\pi}{2\sqrt{2}}=\prod_{n=1}^{\infty}\left(\frac{16n^2}{16n^2-1}\right) $$

  $$ \frac{\pi\sqrt{2}}{4}=\prod_{n=1}^{\infty}\left(\frac{16n^2}{16n^2-1}\right) $$


These are both quite nice formulae for $\pi$. However, they converge VERY slowly. The first expression approximates $\pi\approx3.1415848$ after ten thousand terms.

### A recursive formula for $\pi$

I came across another expression whilst writing the <a href="https://aymenhafeez.github.io/blog/pi-prime-numbers">$\pi$ and primes post</a>. In that post we showed that

  $$\pi x\cot(\pi x)=1-2\sum_{n=1}^{\infty}\zeta(2n)x^{2n}$$

  $$\frac{\pi x}{2}\cot(\pi x)=\frac{1}{2}-\sum_{n=1}^{\infty}\zeta(2n)x^{2n}$$

Letting $x=\frac{1}{4}$

  $$\frac{\pi}{8}=\frac{1}{2}-\sum_{n=1}^{\infty}\frac{\zeta(2n)}{4^{2n}}$$

We've shown that the Riemann zeta function at even positive integers is given by the following expression:

  $$\zeta(2n)=\frac{(-1)^{k+1}(2\pi)^{2n}\beta_{2n}}{2(2n)!}$$

The first few even valued Bernoulli numbers, $\beta_{2n}$, are

  $$\beta_2=\frac{1}{6}; \ \ \beta_4=-\frac{1}{30}; \ \ \beta_6=\frac{1}{42}; \ \ \beta_8=-\frac{1}{30}$$

And so, $\zeta(2n)$ for the first few values of $n$ is

  $$\zeta(2)=\frac{\pi^2}{6}; \ \ \zeta(4)=\frac{\pi^4}{90}; \ \ \zeta(6)=\frac{\pi^6}{945}; \ \ \zeta(8)=\frac{\pi^8}{9450}$$

Expanding the sum out:

  $$\frac{\pi}{8}=\frac{1}{2}-\frac{\pi^2}{6\cdot4^2}-\frac{\pi^4}{90\cdot4^4}-\frac{\pi^6}{945\cdot4^6}-\frac{\pi^8}{9450\cdot4^8}-.\ .\ .$$

I find this really beautiful! We can simplify it visually by defining a constant $a_n$:

  $$a_n=\frac{(-1)^{n+1}4^n\beta_{2n}}{2(2n)!}$$

So the expression becomes

  $$\frac{\pi}{8}=\frac{1}{2}-a_1\frac{\pi^2}{4^2}-a_2\frac{\pi^4}{4^4}-a_3\frac{\pi^6}{4^6}-a_4\frac{\pi^8}{4^8}-.\ .\ .$$

Defining this constant also allows us to simplify the expression for $\zeta(2n)$ into a nice, compact form:

  $$\zeta(2n)=a_n\pi^{2n}$$

### Euler

Euler famously proved that $\zeta(2) = \frac{\pi^{2}}{6}$. He started with the
function  $\frac{\sin x}{x}$, i.e. the $\text{sinc}$ function, which has the
Taylor series expansion

  $$ \text{sinc }x = \frac{\sin x}{x} = \sum_{n=0}^{\infty}
  \frac{(-1)^{n}}{(2n+1)!}x^{2n} = 1 - \frac{x^{2}}{3!} + \frac{x^{4}}{5!} -
  \frac{x^{6}}{7!} + \ldots $$

The $\text{sinc}$ function can also be expressed as the following infinite product:

$$ \text{sinc }x = \prod_{n=1}^{\infty} \left( 1 - \frac{x^{2}}{\pi^{2}n^{2}}
\right) = \left( 1 - \frac{x^{2}}{\pi^{2}} \right) \left( 1 -
\frac{x^{2}}{4\pi^{2}} \right) \left( 1 - \frac{x^{2}}{9\pi^{2}} \right) \ldots $$

$$ = 1 - x^{2} \left( \frac{1}{\pi^{2}} + \frac{1}{4\pi^{2}} +
\frac{1}{9\pi^{2}} + \ldots \right) + \ldots $$

Equating the $x^{2}$ coefficients of the above to the Taylor series expansion
gives the desired result:

$$ -\left( \frac{1}{\pi^{2}} + \frac{1}{4\pi^{2}} + \frac{1}{9\pi^{2}} + \ldots
\right) = - \frac{1}{3!} $$

$$ \zeta(2) = \sum_{n=1}^{\infty} \frac{1}{n^{2}} = \frac{\pi^{2}}{6} $$

A similar result can be derived for the odd squares. Instead of $\text{sinc } x$
we start with $\cos x$. The series expansion for $\cos x$:

$$ \cos x = \sum_{n=0}^{\infty}  \frac{(-1)^{n}}{(2n)!}x^{2n} = 1 -
\frac{x^{2}}{2!} + \frac{x^{4}}{4!} - \frac{x^{6}}{6!} + \ldots $$

$\cos x$ can also be expressed as an infinite product:

$$ \cos x = \prod_{n=1}^{\infty} \left( 1 - \frac{4x^{2}}{\pi^{2}(2n - 1)^{2}}
\right) = 1 - x^{2}\left( \frac{4}{\pi^{2}} + \frac{4}{9\pi^{2}} +
\frac{4}{25\pi^{2}} + \ldots \right) + \ldots $$

And again, equating the $x^{2}$ coefficients:

$$ - \frac{4}{\pi^{2}}\left( 1 + \frac{1}{9} + \frac{1}{25} + \ldots \right) = -
\frac{1}{2!} $$

$$ \sum_{n=1}^{\infty} \frac{1}{(2n - 1)^{2}} = \frac{\pi^{2}}{8} $$

Going back to the infinite product form of $\frac{\sin x}{x}$,

$$ \text{sinc }x = \prod_{n=1}^{\infty} \left( 1 - \frac{x^{2}}{\pi^{2}n^{2}}
\right) = \left( 1 - \frac{x^{2}}{\pi^{2}} \right) \left( 1 -
\frac{x^{2}}{4\pi^{2}} \right) \left( 1 - \frac{x^{2}}{9\pi^{2}} \right) \ldots, $$

and noting that each term is the difference of two squares, we can separate them out:

$$ \sin x = x\left( 1 - \frac{x}{\pi} \right)\left( 1 + \frac{x}{\pi} \right) \left( 1 - \frac{x}{2\pi} \right)\left( 1 + \frac{x}{2\pi} \right) \left( 1 - \frac{x}{3\pi} \right)\left( 1 + \frac{x}{3\pi} \right) \ldots  $$

Taking the $\log$ of both sides:

$$ \log \sin x = \log x + \log \left( 1 - \frac{x}{\pi} \right) + \log \left( 1 +
\frac{x}{\pi} \right) + \log \left( 1 - \frac{x}{2\pi} \right) + \ldots, $$

and then taking the derivative:

$$ \frac{\cos x}{\sin x} = \frac{1}{x} - \frac{1}{\pi - x} + \frac{1}{\pi + x} - \frac{1}{2\pi - x} + \ldots  $$

Letting $x = \frac{\pi}{4}$ gives Leibniz's formula for $\pi$:

$$ \frac{\pi}{4} = 1 - \frac{1}{3} + \frac{1}{5} - \frac{1}{7} + \frac{1}{9} -
\ldots . $$

---

Last updated 04/04/20
