---
layout: post
mathjax: true
title: The prime product formula
---

Intuition behind the Euler product formula for the Riemann zeta function

---

I've written about the Riemann zeta function in other posts and touched briefly
on the product formula representation. Here, I wanted to go through
a derivation of the product formula. Like most maths related subjects I write
about it won't be particularly mathematically rigorous, but will aim more to
convey the intuition behind the product formula representation.

The Riemann zeta function is defined as follows for complex numbers $s$ with
real part greater than $1$:

$$
  \zeta(s) = \sum_{n=1}^{\infty} \frac{1}{n^{s}} = 1 + \frac{1}{2^{s}} + \frac{1}{3^{s}} + \frac{1}{4^{s}} + \frac{1}{5^{s}} + \cdots
$$

The infinite series converges when the real part of $s$ exceeds $1$. The Euler
product formula expresses $\zeta(s)$ as a product of terms involving prime
numbers:

$$
\zeta(s) = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}
$$

To derive this we start with the infinite series representation and writing each
term as its prime factorisation:

$$
  \begin{aligned}
    \frac{1}{2^{s}} &= \left( \frac{1}{2^{s}} \right) \cdot 1 \\
    \frac{1}{3^{s}} &= \left( \frac{1}{3^{s}} \right) \cdot 1 \\
    \frac{1}{4^{s}} &= \left( \frac{1}{2^{s}} \right) \cdot \left( \frac{1}{2^{s}} \right) \\
    \frac{1}{5^{s}} &= \left( \frac{1}{5^{s}} \right) \cdot 1 \\
    \frac{1}{6^{s}} &= \left( \frac{1}{3^{s}} \right) \cdot \left( \frac{1}{2^{s}} \right), \\
  \end{aligned}
$$

and so on. This is just using the [fundamental theorem of arithmetic](https://mathworld.wolfram.com/FundamentalTheoremofArithmetic.html).
Rewriting the series with these terms gives us

$$
  \zeta(s) = (1 \cdot 1) + \left( \frac{1}{2^{s}} \cdot 1 \right) + \left( \frac{1}{3^{s}} \cdot 1 \right) + \left( \frac{1}{2^{s}} \cdot \frac{1}{2^{s}} \right) + \left( \frac{1}{5^{s}} \cdot 1 \right)+ \left( \frac{1}{3^{s}} \cdot \frac{1}{2^{s}} \right) + \cdots
$$

Next, we can group the terms by the prime numbers involved:

$$
  \zeta(s) = \left( 1 + \frac{1}{2^{s}} + \frac{1}{2^{2s}} + \frac{1}{2^{3s}} + \cdots \right) \cdot \left( 1 + \frac{1}{3^{s}} + \frac{1}{3^{2s}} + \frac{1}{3^{3s}} + \cdots \right) \cdot \left( 1 + \frac{1}{5^{s}} + \frac{1}{5^{2s}} + \frac{1}{5^{3s}} + \cdots \right) + \cdots
$$

Here we see that each term being multiplied is a geometric series. Recall that
in general a geometric series can  be written as

{-s}uu$$
  \sum_{n=0}^{\infty} a r^{n} = \frac{a}{1 - r}
$$

And so, each factor of the above product can be simplified:

$$
\begin{aligned}
   1 + \frac{1}{2^{s}} + \frac{1}{2^{2s}} + \frac{1}{2^{3s}} + \cdots &= \frac{1}{1 - \frac{1}{2^{s}}} \\
   1 + \frac{1}{3^{s}} + \frac{1}{3^{2s}} + \frac{1}{3^{3s}} + \cdots &= \frac{1}{1 - \frac{1}{3^{s}}} \\
   1 + \frac{1}{5^{s}} + \frac{1}{5^{2s}} + \frac{1}{5^{3s}} + \cdots &= \frac{1}{1 - \frac{1}{5^{s}}} \\
\end{aligned}
$$

Substituting the simplified terms back into the product we had above gets us the product formula.

$$
\begin{aligned}
  \zeta(s) = \left( \frac{1}{1 - \frac{1}{2^{s}}} \right) \cdot \left( \frac{1}{1 - \frac{1}{3^{s}}} \right) \cdot \left( \frac{1}{1 - \frac{1}{4^{s}}} \right) \cdot \left( \frac{1}{1 - \frac{1}{5^{s}}} \right) \cdots
\end{aligned}
$$           

$$
  \zeta(s) = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}
$$

We can also understood this more simply starting with the Fundamental Theorem of
Arithmetic, which states that any integer $n \geq 1$ can be expressed as

$$
  n = 2^{\epsilon_2}3^{\epsilon_3}5^{\epsilon_5} \cdots,
$$

where $\epsilon_2,\epsilon_3,\epsilon_5 \cdots}$ are non-negative integers. Raising both sides
to the power of $-s$,

$$
  n^{-s} = 2^{-\epsilon_2s}3^{-\epsilon_3s}5^{-\epsilon_5s} \cdots,
$$

and taking the sum,

$$
\begin{aligned}
  \sum n^{-s} &= \sum 2^{-\epsilon_2s}3^{-\epsilon_3s}5^{-\epsilon_5s} \cdots, \\
  \sum n^{-s} &= (1 + 2^{-s} + 2^{-2s} + \cdots)(1 + 3^{-s} + 3^{-2s} + \cdots)(1 + 5^{-s} + 5^{-2s} + \cdots)
\end{aligned}
$$

And so, we see that the terms on the right hand side, for each prime $p$, equate to

$$
1 + p^{-s} + p^{-2s} + \cdots = (1 - p^{-s})^{-1},
$$

giving us

$$
  \sum n^{-s} = \prod_{p \text{ prime}} \frac{1}{1 - p^{-s}}
$$

This is just such a cool result. And again, while this derivation is by no means
mathematically rigorous I think it provides a good high-level overview for the
intuition behind the Euler product for the Riemann zeta function.
