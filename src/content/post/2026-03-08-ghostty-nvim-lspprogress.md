---
title: "Nvim LSP Progress bar in Ghostty"
publishDate: "1 March 2026"
description: "Showing Nvim Lsp Progress using ghostty's progress bar"
tags: ["neovim"]
---

In Neovim, having an autocmd which
broadcasts LspProgresss through
[`nvim_echo()`](https://neovim.io/doc/user/api/#nvim_echo()) will emit and print
a progress message from the language server. If using the experimental
[`_core.ui2`](https://neovim.io/doc/user/lua/#ui2), interface the progress
message will get printed in the message window, similar to what
[fidget.nvim](https://github.com/j-hui/fidget.nvim) shows, but done natively.

```lua
vim.api.nvim_create_autocmd("LspProgress", {
  callback = function(ev)
    local value = ev.data.params.value or {}
    local msg = value.message or "done"

    -- rust-analyzer in particular sends extremely long messages
    if #msg > 40 then
      msg = msg:sub(1, 37) .. "..."
    end

    vim.api.nvim_echo({{msg}}, false, {
      id     = "lsp",
      kind   = "progress",
      title  = value.title,
      status = value.kind ~= "end" and "running" or "success",
      percent = value.percentage,
    })
  end,
})
```

[Ghostty](https://ghostty.org/) has a native GUI for showing progress bars
reported by the OSC 9;4 escape sequence. What's cool is that it picks up
progress messages emitted by `nvim_echo()` and integrates it into its progress
bar:

<center>
  <figure>
    <img src="https://raw.githubusercontent.com/aymenhafeez/aymenhafeez.github.io/refs/heads/master/public/images/ghostty.gif" width="650" />
  </figure>
</center>
