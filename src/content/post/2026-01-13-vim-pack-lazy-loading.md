---
title: "Lazy loading plugins with vim.pack"
publishDate: "13 January 2026"
description: "Lazy loading plugins with Neovim's builtin plugin manager"
tags: ["neovim"]
---

Neovim 0.12 will have a built-in plugin manager, allowing for a simple and
effective solution for managing external plugins. This will be a welcome
addition for those who don't need the complexity and extra features that come
with popular plugin managers like
[lazy.nvim](https://github.com/folke/lazy.nvim).

While `vim.pack` doesn't have a built-in mechanism for lazy-loading, Neovim's
native event handling functionality can be used to lazy load plugins. For
example, load `nvim-treesitter` just before a file gets loaded into the buffer:

```lua
vim.api.nvim_create_autocmd("BufReadPre", {
  once = true,
  callback = function()
    vim.pack.add({
      { src = "https://github.com/nvim-treesitter/nvim-treesitter", version = "main" },
    })
  end
})
```

Similarly for plugins which require a `setup()` call, this can also be added to
the `autocmd`:

```lua
vim.api.nvim_create_autocmd("InsertEnter", {
  once = true,
  callback = function()
    vim.pack.add({ "https://github.com/nvim-mini/mini.pairs" })
    require("mini.pairs").setup()
  end
})
```

In this example `mini.pairs` will only be loaded when entering insert mode.

Another approach is to defer loading a plugin to just after startup using
`vim.schedule()`:

```lua
local opts = { ... }

vim.schedule(function()
  vim.pack.add({ "https://github.com/ibhagwan/fzf-lua" })
  require("fzf-lua").setup(opts)
end)
```

For plugins which are only required for certain filetypes, their `vim.pack`
calls can be added to `after/ftplugin/`. For example, I only use custom snippets
in LaTeX, so in `after/ftplugin/tex.lua` I have:

```lua
vim.api.nvim_create_autocmd("InsertEnter", {
  once = true,
  callback = function()
    vim.pack.add({"https://github.com/nvim-mini/mini.snippets"})
    require("mini.snippets").setup {
      snippets = {
        require('mini.snippets').gen_loader.from_lang(),
      },
      mappings = {
        expand = '<C-j>',
        jump_next = '<C-j>',
        jump_prev = '<C-k>',
        stop = '<C-c>',
      },
    }
  end
})
```

**NOTE**: some plugins handle filetype specific loading internally so loading them in
`ftplugin` or `after/ftplugin` may lead to unwanted issues.
