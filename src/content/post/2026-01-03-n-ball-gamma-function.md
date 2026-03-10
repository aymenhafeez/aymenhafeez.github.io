---
title: "The volume of an n-ball and the gamma function"
publishDate: "3 January 2026"
description: "Relation between the volume of an n-ball and the gamma function"
tags: ["mathematics"]
---

Grant Sanderson recently gave an [amazing
talk](https://www.youtube.com/watch?v=fsLh-NYhOoU) about the volumes of higher
dimensional spheres in which here mentioned that a similar results to that which
he showed in the talk can be derived using the gamma function. Since we've
already looked at the gamma function, it's relation the zeta function, and its
relation to the prime numbers, what if we could by extension relate the volume
of a unit $n$-ball to the prime numbers? In this post we'll first concentrate on
seeing how the volume of a unit $n$-ball relates to the gamma function, and
we'll take this further in future posts.

A unit $n$-ball is defined as the set of all points in $n$-dimensions whose
distance from the origin is 1.

We know that a line segment of radius $1$ has length $2$ (think of this as
a $1$-D sphere), a disk (i.e. a circle) of radius $1$ has an area of $\pi$, and
a sphere of radius $1$ has a volume of $\frac{4}{3}\pi$. So the volume of a unit
ball in $n$ dimensions is obviously

$$
  V_n = \frac{\pi^{n/2}}{\Gamma \left(\frac{n}{2} + 1 \right)}
$$

right? But in all seriousness, getting to this expression is actually
surprisingly intuitive once we know the starting point, which is looking at the
famous Gaussian integral:

$$
  \int_{-\infty}^{\infty} e^{-x^2} \text{d} x = \sqrt{\pi}
$$

Moving up to $n$ dimensions we can define:

$$
  |x^2| = x_1^2 + x_2^2 + \cdots + x^2_n
$$

We then consider the integral the integral over $n$ dimensional space:

$$
  \int_{\mathbb{R}^n} e^{-|x^2|} \text{d} V
$$

Since

$$
  e^{-|x^2|} = e^{-(x^2_1 + x^2_2 + \cdots + x^2_n)}
  = e^{-x^2_1}e^{-x^2_2} \cdots e^{-x^2_n}
$$

the integral splits into a product of one-variable functions. This means the
whole $n$-dimensional integral factors is

$$
  \int_{\mathbb{R}^n} e^{-|x^2|} \text{d} V = \left( \int_{-\infty}^{\infty} e^{-x^2} \text{d} x \right)^n
$$

Then using Gaussian result in $1$D we get:

$$
  \int_{\mathbb{R}^n} e^{-|x^2|} \text{d} V = (\sqrt{\pi})^n = \pi^{n/2}
$$

The next step is the consider this same integral but integrating with respect to
the distance from the origin rather than $x$. We, therefore, convert the integral
from the cartesian coordinates, $(x_1, x_2, \cdots, x_n)$, to polar coordinates,
$(r, \theta)$. In polar coordinates the function $e|^{-x^2}|$ depends on the
distance $r = |x|$, not direction, so points at the same distance from the
origin all contribute the same value.

In $3$D the volume of a thin shell of radius $r$ and thickness $\text{d}r$ is
approximated as

$$
  \text{surface area of a sphere of radius } r \times \text{d}r
$$

This can be extended to $n$ dimensions. If $S_{n-1}$ is the surface are of the
unit sphere in $n$ dimensions, then the surface area of a sphere with radius $r$
is

$$
  \text{d}V_n = S_{n-1}r^{n-1}
$$

So a thin shell of radius $r$ and thickness $\text{d}r$ has volume

$$
  S_{n-1}r^{n-1}\text{d}r
$$

Applying this the volume integral we defined above:

$$
  \int_{\mathbb{R}^n} e^{-|x^2|} \text{d} V = \int_{0}^{\infty}
  e^{-r^2}S_{n-1}r^{n-1} \text{d} r = S_{n-1} \int_{0}^{\infty} e^{-r^2}r^{n-1}
  \text{d} r
$$

Recall that the Gamma function is defined as

$$
  \Gamma(s) = \int_{o}^{\infty} t^{s-1}e^{-t} \text{d}t
  \ \ \ \ \ \ \ \ \ \text{for } s > 0
$$

This isn't far off the radial integral we showed above. If we make the
substitution $t = r^2$, then

$$
  \frac{\text{d}t}{\text{d}r} = 2r \ \ \ \ \ \Rightarrow \ \ \ \ \ dr = \frac{\text{d}t}{2r} \\
  r = t^{1/2}, \ \ \ \ \ r^{n-1} = (t^{1/2})^{n-1} = t^{(n-1)/2}
$$

Substituting everything back into the integral we get

$$
  S_{n-1} \int_{0}^{\infty} e^{-r^2}r^{n-1} \text{d} r = S_{n-1} \int_{0}^{\infty}
  e^{-t}t^{(n-1)/2} \frac{\text{d}t}{2t^{1/2}}
$$

We can simplify this by combining the powers of $t$:

$$
  t^{(n-1)/2} \cdot t^{-1/2} = t^{(n-2)/2} = t^{(n/2) - 1}
$$

With this the radial integral becomes

$$
  S_{n-1} \int_{0}^{\infty} e^{-r^2}r^{n-1} \text{d} r = \frac{S_{n-1}}{2} \int_{0}^{\infty}
  e^{-t} t^{(n/2) - 1} \text{d} t
$$

which we can note is exactly the Gamma function for $s = \frac{n}{2}$:

$$
  S_{n-1} \int_{0}^{\infty} e^{-r^2}r^{n-1} \text{d} r = \frac{S_{n-1}}{2}\Gamma
  \left(\frac{n}{2}\right)
$$

Remember that we had the Gaussian integral in cartesian coordinates as

$$
  \int_{\mathbb{R}^n} e^{-|x^2|} \text{d} V = S_{n-1} \int_{0}^{\infty}
  e^{-r^2}r^{n-1} \text{d} r = \pi^{n/2}
$$

And from the spherical shell calculation we have

$$
  \int_{\mathbb{R}^n} e^{-|x^2|} \text{d} V = \frac{S_{n-1}}{2} \Gamma
  \left(\frac{n}{2}\right)
$$

And so, equating the two gives us

$$
  \pi^{n/2} = \frac{S_{n-1}}{2} \Gamma \left(\frac{n}{2}\right)
$$

Rearranging for $S_{n-1}$:

$$
  S_{n-1} = \frac{2\pi^{n/2}}{\Gamma(n/2)}
$$

which gives us an formula for the surface area of a unit sphere in $n$
dimensions. This itself is a very nice expression, but it can relatively simply
be used to find an expression for volume.

Remember we said that for thin shell of radius $r$ and thickness $\text{d}r$ has
volume

$$
  \text{d}V_n = S_{n-1}r^{n-1}\text{d}r
$$

So for a unit ball, we can integrate both sides from $0$ to $1$ to get the
volume:

$$
V_n = S_{n-1} \int_{0}^{1} r^{n-1} \text{d} r = \frac{S_{n-1}}{n}
$$

Substituting in the expression we had for $S_{n-1}$:

$$
  V_n = \frac{1}{n} \cdot \frac{2\pi^{n/2}}{\Gamma(n/2)}
$$

Recall the identity for the Gamma function:

$$
  \Gamma(z + 1) = z\Gamma(z)
$$

Since we have $\Gamma(n/2)$, $z = \frac{n}{2}$, and so,

$$
  \Gamma\left(\frac{n}{2} + 1\right) = \frac{n}{2} \Gamma
  \left(\frac{n}{2}\right) \\
$$

Notice that in out volume expression we a factor of $\frac{2}{n\Gamma(n/2)}$.
Taking the reciprocal of both sides of the above formula:

$$
  \frac{1}{\Gamma(n/2 + 1)} = \frac{2}{n\Gamma(n/2)}
$$

And so, substituting this back into the volume expression we get:

$$
  \boxed {V_n = \frac{\pi^{n/2}}{\Gamma \left( \frac{n}{2} + 1 \right)}}
$$

which is the general formula for a unit $n$-ball. One of the definitions of the
Gamma function is

$$
  \Gamma (z) = (z-1)!
$$

And so, the volume formula can also be written as

$$
  V_n = \frac{\pi^{n/2}}{(n/2)!}
$$

which is pretty amazing. Just to confirm that this formula works, consider an
$n-$-ball in $1$, $2$ and $3$, dimensions (i.e. a line segment, a circle and
a sphere with radius $1$). In **1D**:

$$
  V_1 = \frac{\pi^{1/2}}{\Gamma(3/2)} \\ \Gamma(3/2)
  = \frac{1}{2}\Gamma\left(\frac{1}{2}\right) = \frac{1}{2}\sqrt{\pi} \\
  \Rightarrow V_1 = \frac{\sqrt{\pi}}{\sqrt{\pi} / 2}
$$

In **2D**:

$$
 V_2 = \frac{\pi}{\Gamma(2)}
$$

Since $\Gamma(2) = (2 - 1)! = 1$:

$$
  V_2 = \pi
$$

In **3D**:

$$
  V_3 = \frac{\pi^{3/2}}{\Gamma(5/2)}
$$

Using the same pattern for $\Gamma(3/2)$:

$$
  \Gamma(5/2) = \frac{3}{2}\Gamma(3/2) = \frac{3}{2} \cdot \frac{1}{2}\sqrt{\pi}
  = \frac{3}{4}\sqrt{\pi} \\
  \Rightarrow V_3 = \frac{\pi^{3/2}}{3\sqrt{\pi}/4} = \frac{4\pi}{3}
$$

Now if we also consider a $4$ dimensional $n$-ball:

$$
  V_4 = \frac{\pi^2}{\Gamma(3)} = \frac{\pi^2}{2!} = \frac{\pi^2}{2}
$$

Recall that the value of $\zeta(s) = \frac{\pi^2}{6}$. And so we have:

$$
  V_4 = 3\zeta(2)
$$

A wild zeta function appears. In a future post we'll look more closely at how
the Riemann zeta function relates to the the volume of an $n$-ball, and by
extension the prime numbers.
