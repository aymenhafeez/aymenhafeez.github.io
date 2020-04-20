---
layout: post
mathjax: true
title: Generating pi with the prime the numbers
---

At first glance the prime numbers seem randomly distributed along the
numberline. Even at the second, third and fourth glance it would be difficult to
say that there is some obvious pattern there. However, working with the Riemann
zeta function shows that this is far from true. One of my favourite results
stemming from the Riemann zeta function is deriving an expression to generate
$\pi$ using the prime numbers. This is a pretty astounding result considering
the various equations and models in which $\pi$ shows up. At the core of this
derivation is Euler's product formula which relates the Riemann zeta function to
the prime numbers:
$\newcommand{\dd}{\mathrm{d}}$

  $$\zeta(s)=\sum_{n=1}^{\infty} \frac{1}{n^s} = \prod_{p \ \text{prime}} \frac{1}{1-p^{-s}}$$ 

This is one of the most beautiful formulas I have ever encountered and I plan on doing a separate post dedicated to Euler which will include his proof of this formula.

We can show this result using the general expression for the Riemann zeta function over the even positive integers:

  $$\zeta(2k)=\frac{(-1)^{k+1}(2\pi)^{2k}\beta_{2k}}{2(2k)!}$$

$\beta_{2k}$ are the even valued Bernoulli numbers. The majority of this post will probably be spent on outlining the derivation of this formula. The derivation isn't completely required to appreciate the result at the end, so it can be skipped. Though, I recommend going through it because it's fun.

We start by expressing the function $\frac{\sin(\pi x)}{\pi x}$ in its infinite product form:

  $$\frac{\sin(\pi x)}{\pi x}=\prod_{n=1}^{\infty}\left(1-\frac{x^2}{n^2}\right)$$
 
A way of understanding this representation is by realising that $\frac{\sin(\pi x)}{\pi x}$ can be expressed as a product of linear factors, as you would with any other polynomial. Let us consider a second degree polynomial as an example:  

  $$f(x)=x^2+7x+12$$ 

We know that it can be expressed as a product of its linear factors:  

  $$f(x)=(x+4)(x+3)$$

However, it can also be expressed as  

  $$f(x)=\left(1+\frac{x}{4}\right)\left(1+\frac{x}{3}\right)$$

This can be verified by seeing that $f(-4)$ and $f(-3)=0$. However, look into the Weierstrass factorisation theorem for a more rigorous explanation on expressing functions in this form.
  
<center> <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/sincpi.png" width="700" height="350" > </center>
  
$\frac{\sin(\pi x)}{\pi x}$ has roots at $x=n$ for $n \in \mathbb{Z}$ and $n \neq 0$, and so, expressing it as a product of its linear factors in a similar way gives
  
  $$\frac{\sin(\pi x)}{\pi x}=\left(1-x\right)\left(1+x\right)\left(1-\frac{x}{2}\right)\left(1+\frac{x}{2}\right)\left(1-\frac{x}{3}\right)\left(1+\frac{x}{3}\right)\cdots$$
  
Making the observation that pairing terms gives the difference of two squares we get the infinite product form:

  $$\frac{\sin(\pi x)}{\pi x}=\left(1-x^2\right)\left(1-\frac{x^2}{4}\right)\left(1-\frac{x^2}{9}\right)\cdots$$
  
We can now begin deriving the equation we set out to find. The first step is to manipulate the product of $\frac{sin(\pi x)}{\pi x}$ to a point where we recognise something of the sort we are trying to derive. Firstly, we take the natural logarithm of both sides:
  
  $$\log{\frac{\sin(\pi x)}{\pi x}}=\log\left(\prod_{n=1}^{\infty}\left(1-\frac{x^2}{n^2}\right)\right)$$

Making use of the property that the logarithm of a product is equivalent to the sum of the individual logarithms gives

  $$\log{\frac{\sin(\pi x)}{\pi x}}=\sum_{n=1}^{\infty}\log{\left(1-\frac{x^2}{n^2}\right)}$$  
  
  $$\log{(\sin(\pi x))}=\log{(\pi x)}+\sum_{n=1}^{\infty}\log{\left(1-\frac{x^2}{n^2}\right)}$$  

Taking the derivative of both sides:

  $$\frac{\dd}{\dd x}\left[\log{(\sin(\pi x))}\right]=\frac{\dd}{\dd x}\left[\log{(\pi x)}+\sum_{n=1}^{\infty}\log{\left(1-\frac{x^2}{n^2}\right)}\right]$$  
  
  $$\frac{\pi \cos(\pi x)}{\sin(\pi x)}=\frac{1}{x}-\sum_{n=1}^{\infty}\left(\frac{2x}{n^2}\right)\left(\frac{1}{1-\frac{x^2}{n^2}}\right)$$  
  
  $$\pi x \cot(\pi x)=1-2\sum_{n=1}^{\infty}\left(\frac{x^2}{n^2}\right)\left(\frac{1}{1-\frac{x^2}{n^2}}\right)$$  

Expressing $\frac{1}{1-\frac{x^2}{n^2}}$ as its series expansion gives

  $$\pi x \cot(\pi x)=1-2\sum_{n=1}^{\infty}\sum_{k=0}^{\infty}\left(\frac{x^2}{n^2}\right)\left(\frac{x^2}{n^2}\right)^k$$
  
  $$\pi x \cot(\pi x)=1-2\sum_{n=1}^{\infty}\sum_{k=0}^{\infty}\left(\frac{x^2}{n^2}\right)^{k+1}$$

The lower limit of the inner summation can be changed to $k=1$ if we also change the exponent of the term being summed:

  $$\pi x \cot(\pi x)=1-2\sum_{n=1}^{\infty}\sum_{k=1}^{\infty}\frac{x^{2k}}{n^{2k}}$$

  $$\pi x \cot(\pi x)=1-2\sum_{k=1}^{\infty}\zeta(2k)x^{2k}$$

And so, we see that we have some sort of expression with $\zeta(2k)$ on the right-hand side. Let's now take a closer look at the cotangent function on the left-hand side.
  
The cotangent can be expressed as the ratio of cosine to sine. Expressing the cosine and sine in their exponential function form gives

  $$
    \begin{aligned}
        \pi x \cot(\pi x)&=\pi x\frac{\cos(\pi x)}{\sin(\pi x)} \\
        &=\pi x \frac{e^{i\pi x}+e^{-i\pi x}}{2}\frac{2i}{e^{i\pi x}-e^{-i\pi x}} \\
        &=i\pi x \frac{e^{i\pi x}+e^{-i\pi x}}{e^{i\pi x}-e^{-i\pi x}}
    \end{aligned}
  $$

The next step requires a couple of neat tricks. Multiplying the right-hand by $\frac{e^{i\pi x}}{e^{i\pi x}}$:

  $$
    \begin{aligned}  
      \pi x \cot(\pi x)&=i\pi x \frac{e^{i\pi x}+e^{-i\pi x}}{e^{i\pi x}-e^{-i\pi x}} \cdot \frac{e^{i\pi x}}{e^{i\pi x}} \\
      &=i\pi x \frac{e^{2i\pi x}+1}{e^{2i\pi x}-1}
    \end{aligned}
  $$

And now, splitting the numerator, we get

  $$
    \begin{aligned}
      \pi x \cot(\pi x)&=i\pi x \frac{e^{2i\pi x}-1+2}{e^{2i\pi x}-1} \\
      &=i\pi x \left(1+\frac{2}{e^{2i\pi x}-1}\right) \\
      &=i\pi x+\frac{2i\pi x}{e^{2i\pi x}-1} \\
    \end{aligned}
  $$

Those last couple of steps may have seemed counterintuitive, however, they served the purpose of getting the expression into a specific form, namely so that we can get the Bernoulli numbers involved. We can do this by making use of the following relation:

  $$\frac{x}{e^x-1}=\sum_{k=0}^{\infty}\frac{\beta_k}{k!}x^k$$
 
 Substituting this into our second cotangent expression gives
 
   $$\pi x \cot(\pi x)=i\pi x+\sum_{k=0}^{\infty}\frac{\beta_k}{k!}(2i\pi x)^k$$
 
You may notice that this looks quite similar in form to the first cotangent equation we derived. Manipulating the above equation into a similar form to the one we derived earlier will allow the $x^{2k}$ coefficients to be equated, which will give the expression for $\zeta({2k})$.

We begin by expanding out the first two terms of the summation:

  $$\pi x \cot(\pi x)=i\pi x+\frac{\beta_0}{0!}+\frac{\beta_1}{1!}(2i \pi x)+\sum_{k=2}^{\infty}\frac{\beta_k}{k!}(2i\pi x)^k$$

$\beta_0=1$ and $\beta_1=-\frac{1}{2}$, and so we get

  $$
    \begin{aligned}
      \pi x \cot(\pi x)&=i\pi x+1-\frac{1}{2}(2i \pi x)+\sum_{k=2}^{\infty}\frac{\beta_k}{k!}(2i\pi x)^k \\
      &=1+\sum_{k=2}^{\infty}\frac{\beta_k}{k!}(2i\pi x)^k
    \end{aligned}
  $$

We can see that we are getting very close to our desired result. At this point it is just a case of manipulating the expression to get it into the desired form.

  $$\pi x \cot(\pi x)=1-2\sum_{k=2}^{\infty}\frac{\beta_k}{k!}\frac{(2i\pi x)^k}{-2}$$
  
We can alter the lower summation limit by correcting the exponent:

  $$
    \begin{aligned}
      \pi x \cot(\pi x)&=1-2\sum_{k=1}^{\infty}\frac{\beta_{2k}}{2k!}\frac{(2i\pi x)^{2k}}{-2}x^{2k} \\
      &=1-2\sum_{k=1}^{\infty}\frac{i^{2k}(2\pi)^{2k}\beta_{2k}}{-2(2k)!}x^{2k} \\
      &=1-2\sum_{k=1}^{\infty}\frac{(-1)^{k}(2\pi)^{2k}\beta_{2k}}{-2(2k)!}x^{2k}
    \end{aligned}
    $$

And so, we get

  $$\pi x \cot(\pi x)=1-2\sum_{k=1}^{\infty}\frac{(-1)^{k+1}(2\pi)^{2k}\beta_{2k}}{2(2k)!}x^{2k}$$

Finally, we can equate the right-hand side of the above equation to that of the first cotangent equation to get

  $$\zeta(2k)=\frac{(-1)^{k+1}(2\pi)^{2k}\beta_{2k}}{2(2k)!}$$

This was quite a dense proof, but the ultimate goal was to relate $\pi$ to the prime numbers. Plugging the above equation into Euler's product formula gives the following:

  $$\zeta(2k)=\frac{(-1)^{k+1}(2\pi)^{2k}\beta_{2k}}{2(2k)!}=\prod_{p \ \text{prime}} \frac{1}{1-p^{-2k}}$$

Let us consider the case for $k=1$. We get

  $$\zeta(2)=\frac{(-1)^2(2\pi)^2\beta_2}{2(2)}=\prod_{p \ \text{prime}} \frac{1}{1-p^{-2}}$$
  
  $$\frac{\pi^2}{6}=\prod_{p \ \text{prime}} \frac{1}{1-p^{-2}}$$

And so, rearranging for $\pi$ gives

  $$\pi=\sqrt{6}\prod_{p \ \text{prime}} \left({1-p^{-2}}\right)^{-\frac{1}{2}}$$

This is really beautiful. As $k$ can take an infinite number of values there are an infinite number of relations which can be made! The general expression can be given as

  $$\pi=\frac{1}{2}\sqrt[2k]{\frac{2(2k)!}{(-1)^{k+1}\beta_{2k}}}\prod_{p \ \text{prime}} \left(1-p^{-2k}\right)^{-\frac{1}{2k}}$$

I know this looks messy, but let's put some more values of $k$ into the above equation and look at the convergence:

* $k=2 \rightarrow \pi=\sqrt[4]{90} \ \prod_{p} \left(1-p^{-4}\right)^{-\frac{1}{4}}$
* $k=3 \rightarrow \pi=\sqrt[6]{945} \ \prod_{p} \left(1-p^{-6}\right)^{-\frac{1}{6}}$
* $k=4 \rightarrow \pi=\sqrt[8]{9450} \ \prod_{p} \left(1-p^{-8}\right)^{-\frac{1}{8}}$

<center>
<figure> 
  <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/prime.png" width="650" height="365"/> 
  <figcaption>$k=1$</figcaption> 
</figure>

<figure> 
  <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/prime2.png" width="650" height="365"/> 
  <figcaption>$k=2$</figcaption> 
</figure>

<figure> 
  <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/prime3.png" width="650" height="365"/> 
  <figcaption>$k=3$</figcaption> 
</figure> 

<figure> 
  <img src="https://raw.githubusercontent.com/aymenhafeez/blog/master/assets/images/prime4.png" width="650" height="365"/> 
  <figcaption>$k=4$</figcaption> 
</figure> 
</center>

The plots show that as $k$ increases the expression converges faster. Let us take another look at the exression for $\pi$ for $k=1$:

  $$\pi=\sqrt{6}\prod_{p \ \text{prime}} \left(1-p^{-2}\right)^{-\frac{1}{2}}$$

We see that the constant $\sqrt{6}\simeq2.449$. This does not seem like a particularly special number. However, let us do the same for $k=2$:
  
  $$\pi=\sqrt[4]{90}\prod_{p \ \text{prime}} \left(1-p^{-4}\right)^{-\frac{1}{4}}$$

The constant in this case, $\sqrt[4]{90}\simeq3.080$. Still perhaps nothing really noteworthy, but bear with me. Again, for $k=3$ and $k=4$ the constants are $\sqrt[6]{945}\simeq3.133$ and $\sqrt[8]{9450}\simeq3.140$. They seem to be approaching $\pi$. We can see from the general expression for $\pi$ that we defined above that these constants, which we shall call $p_k$, have the general form

  $$p_k=\frac{1}{2}\sqrt[2k]{\frac{2(2k)!}{(-1)^{k+1}\beta_{2k}}}$$

And for $k=5$ and $k=10$,  $p_5\simeq3.14128$ and $p_{10}\simeq3.141592504$. This is pretty interesting. It would seem that

  $$\lim_{k\to\infty} \frac{1}{2}\sqrt[2k]{\frac{2(2k)!}{(-1)^{k+1}\beta_{2k}}}=\pi$$

and

  $$\lim_{k\to\infty} {\prod_{p\ \text{prime}} \frac{1}{1-p^{-2k}}}=1$$

Intuitively, this sort of makes sense. As $k$ increases the $p^{-2k}$ term is going to get smaller and smaller, and approach $0$. And so, the prime product has less of an effect on the overall expression.

This was a bit of a messy derivation but I think the end result was worth it. The fact that such an expression can be derived, let alone that it even exists, is what makes me love maths. <a href="https://www.youtube.com/watch?v=NaL_Cb42WyY">This</a> is a really good video by 3Blue1Brown (who's channel I could not recommend enough) where he talks about another such relation between $\pi$ and the primes.
