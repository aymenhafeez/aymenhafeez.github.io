---
layout: post
mathjax: true
title: Neutron diffusion
---

An application of the Bessel function in nuclear reactor theory --- derivation
of the diffusion equation.

---

The most mathematically involved module I took during my masters was a nuclear
reactor engineering module. Part of the module involved deriving an expression
to model how neutrons behave within an ideal nuclear reactor. Much of this post
will be referenced from my lecture notes, which are heavily based on
'Introduction to Nuclear Engineering' by Lamarsh and Baratta, and will focus
primarily on the maths of the derivation. However, see Lamarsh and Baratta for
more detail on the nuclear engineering theory behind the derivation.

The distribution of neutrons in a reactor may be approximated as a diffusion
process. We must, therefore, derive a diffusion equation. This equation is
analogous to expressions used to describe diffusion in other areas of
engineering, such as transport phenomena. This approximation was used to design
early nuclear reactors, and is still employed today for initial design estimates
(Lamarsh & Baratta, 2001). Consider a control volume $V$. The number of neutrons
within $V$ may vary due to a few different processes: neutrons flowing into and
out of $V$, neutrons being absorbed into $V$, or there may be sources present
within $V$ that emit neutrons within the control volume (Lamarsh & Baratta,
2001). Based on this, we can perform a balance over the control volume to
account for the movement of the neutrons over time:

$\newcommand{\dd}{\mathrm{d}}$

$$
    [\text{Rate of change}] \ = \ [\text{Rate of production from diffusion}] -
$$
$$
    \qquad \qquad [\text{Rate of absorption}] -[\text{Rate of loss due to
leakage and diffusion}].
$$

If $n$ is the neutron density at a given point and time in $V$, then the total
number of neutrons in $V$ is

$$
    \int_{V} n \dd V.
$$

The rate of change in the number of neutrons is, therefore,

$$
    \frac{\dd }{\dd t}\int_{V} n \dd V = \int_{V}^{}\frac{\partial n}{\partial
    t} \dd V.
$$

Let $s$ be the neutron emission rate  from sources per unit volume. The rate of
neutron production is

$$
    \int_{V} s \dd V.
$$

Neutron loss due to absorption is given by $\sum_{a}\phi$ cm$^3$ s$^{-1}$, where
$\sum_{a}$ is the _macroscopic cross-section_. This represents the effective
target area of all the nuclei contained in $V$ (Stacey, 2001). $\phi$ is the
neutron flux. The neutron absorption rate is, therefore,

$$
    \int_{V} \Sigma_{a} \phi \dd V.
$$

If $\boldsymbol{J}$ is the neutron current density vector, and $\boldsymbol{n}$
is a unit vector normal to the surface of $V$, then the net number of neutrons
passing out of the $V$ is $\boldsymbol{J} \cdot \boldsymbol{n}$. And so, the
loss of neutrons due to leakage out of $V$ is

$$
    \int_{A} \boldsymbol{J} \ \boldsymbol{n} \dd A.
$$

We can make use of the [divergence
theorem](https://mathworld.wolfram.com/DivergenceTheorem.html), which allows us
to transform the above surface integral to a volume integral over $V$, if we
instead take the integral of the divergence of $\boldsymbol{J}$:

$$
    \int_{V} \text{div} \ \boldsymbol{J} \dd V.
$$

Substituting back into the volume balance gives

$$
    \int_{V} \frac{\partial n}{\partial t} \dd V = \int_{V}^{}s \dd V -
    \int_{V}^{} \Sigma_a \phi \dd V - \int_{V}^{} \text{div} \ \boldsymbol{J} \dd
    V.
$$

As all the integrals are being taken over the same volume the integrands must be
equal. And so, we have

$$
    \frac{\partial n}{\partial t} = s - \Sigma_a\phi - \text{div} \
    \boldsymbol{J}.
$$

If we assume steady state (i.e. the neutron density remains constant over time),
the equation becomes

$$
    \text{div} \ \boldsymbol{J} + \Sigma_a\phi - s = 0.
$$

Recall Fick's law of diffusion:

$$
    \boldsymbol{J} = -D\nabla ^{2}\phi,
$$

where $D$ is diffusivity. Substituting this back into the steady-state equation gives

$$
    -D\nabla^{2}\phi - \Sigma_a\phi + s = 0, \\
    \nabla^{2}\phi + \frac{\Sigma_a\phi}{D} - \frac{s}{D} = 0.
$$

We can define the diffusion length $L$ as

$$
    L^{2} = \frac{D}{\Sigma_a}.
$$

And so, we get

$$
    \nabla^{2}\phi + \frac{1}{L^{2}}\phi = \frac{s}{D}.
$$

The above is the 'one group reactor equation' under steady-state. The neutron
emission rate can be given as

$$
    s = k_{\infty}\Sigma_a\phi,
$$

where $k_{\infty}$ is the infinite multiplication factor. This is defined as the
ratio of the number of neutrons produced by fission in one neutron generation to
the neutrons lost due to absorption in the preceding generation. The equation,
therefore, becomes

$$
    \nabla^{2}\phi + \frac{1}{L^{2}}\phi = \frac{k_{\infty}\Sigma_a\phi}{D} \\
    \nabla^{2}\phi + \frac{1}{L^{2}}\phi = \frac{k_{\infty}\phi}{L^{2}} \\
    \nabla^{s}\phi + \left(\frac{k_{\infty} - 1}{L^{2}}\right)\phi = 0
$$

We can define the buckling constant $B^{2}$ as

$$
    B^{2} = \frac{k_{\infty} - 1}{L^{2}}.
$$

More specifically, here $B$ is the material buckling constant, and it describes the
characteristics of the fuel material in an infinite medium. Our expression,
thus, becomes

$$
    \nabla^{2}\phi + B^{2}\phi = 0.
$$

Again, see 'Introduction to Nuclear Engineering' by Lamarsh and Baratta for more
detail on deriving this expression and where the individual parameters come
from.

In two dimensions the above expression is

$$
    \frac{\dd^2 \phi}{\dd r^2} + \frac{1}{r} \frac{\dd \phi}{\dd r} + B^{2}\phi
    = 0
$$

The main reason I was interested in solving this was because this is not a
general form I had come across. Solving second order ODE's of this form can be
done using the Frobenius method, which produces an infinite series solution. The
solution will be outlined in the second part of this post.

###  References:
Lamarsh, A. J. Baratta, Introduction to Nuclear Engineering, 3d ed.,
Prentice-Hall, 2001, ISBN: 0-201-82498-1.

W. M. Stacey, Nuclear Reactor Physics, John Wiley & Sons, 2001, ISBN: 0-
471-39127-1.

Glasstone, Sesonske. Nuclear Reactor Engineering: Reactor Systems Engineering,
Springer; 4th edition, 1994, ISBN: 978-0412985317
