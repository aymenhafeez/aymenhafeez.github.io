---
layout: post
mathjax: true
title: Grammar checking in Neovim
---

Setting up grammar checking with Neovim's native LSP client and grammar-guard

---

I use Neovim these days primarily for writing in LaTeX, as well as some light
Python development for hobby projects. The core of my LaTeX workflow is made up
of using [Ultisnips](http://github.com/SirVer/ultisnips) as my snippet engine
and a couple of [janky
mappings](https://github.com/aymenhafeez/dotfiles/blob/master/nvim/after/ftplugin/tex.lua)
to compile and show a PDF preview.

<br>

![Workflow]({{ site.url }}/images/figs/workflow.gif){: .fancy-image }

<br>

Combined with Neovim's native LSP and
[nvim-cmp](http://github.com/hrsh7th/nvim-cmp) for completion suggestions, this
creates a fast and seamless writing environment. Though Neovim has
a built-in spell checker, one thing I was missing was some sort of system to
check grammar while writing. This doesn't seem essential but a quick way of
checking for grammatical errors can be convenient, particularly when writing
important documents or reports. After some research I came across a plug-in
called [grammar-guard](http://github.com/brymer-meneses/grammar-guard.nvim),
which uses the [ltex](http://github.com/valentjn/ltex-ls) language server to
carry out grammar checks and give suggestions. This was exactly what I was
looking for.

Getting it setup is relatively straightforward, as described by the
documentation. The plug-in itself can be installed with whatever plug-in manager
you use, for example with packer.nvim,

```lua
use {
  "brymer-meneses/grammar-guard.nvim",
  requires = {
    "neovim/nvim-lspconfig",
    "williamboman/nvim-lsp-installer"
  }
}
```

nvim-lspconfig provides configurations for Neovim's LSP client and
nvim-lsp-installer allows you to easily manage and install LSP servers. Once
these are installed we need to install the
[ltex-ls](https://github.com/valentjn/ltex-ls) language server. On macOS,
I installed it via homebrew:

```bash
brew install ltex-ls
```

After that, grammar-guard needs to be enabled with the LSP. First, initialising
grammar-guard:

```lua
require("grammar-guard").init()
```

Grammar-guard isn't itself a language sever. But because it uses the ltex
client, it can be configured with `lspconfig` like any other server:

```lua
require("lspconfig").grammar_guard.setup({
  on_attach = handlers.on_attach,
  capabilities = capabilities,
  cmd = { "/usr/local/bin/ltex-ls" },
  settings = {
    ltex = {
      enabled = { "latex", "tex", "bib", "markdown" },
      language = "en-GB",
      diagnosticSeverity = "info",
      checkFrequency = "save",
      setenceCacheSize = 2000,
      additionalRules = {
        enablePickyRules = false,
      },
      trace = { server = "verbose" },
      disabledRules = {
        ["en-GB"] = { "MORFOLOGIK_RULE_EN_GB" },
      },
    },
  },
})
```

Here, `on_attach` is a function which can be used to provide settings and
mappings that can be called specifically when an LSP client attaches to
a buffer. The specifics of this go a bit beyond the scope of this post, so I may
go more into the details in a separate post about how I have LSP and nvim-cmp
setup. I find the spell-checking provided by grammar-guard really annoying as it
marks spelling errors in code blocks, as well as in LaTeX commands. The
`disabledRules` table disables this. Neovim's built-in spellchecker works fine
for me.

![LspInfo]({{ site.url }}/images/figs/lspinfo.png){: .fancy-image }

Now, opening up a tex or markdown file, grammar-guard should be up and running.
And running `:LspInfo` shows information about the servers attached to the current
buffer.

I am slightly in two minds about whether this will be a permanent addition to my
configuration as it can be quite slow to start up, and it still gives some
spelling recommendations. But otherwise, it's a pretty cool tool.

<p align="center">
  <img src="../images/figs/example.png" width="700"/>
</p>
