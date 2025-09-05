# A tree-sitter parser for the grug modding language

Example config for neovim
```lua
vim.api.nvim_create_autocmd("BufEnter", {
    pattern = "*.grug",
    callback = function()
        vim.cmd("set filetype=grug")
        vim.cmd("TSEnable highlight")
    end,
})

local parser_config = require "nvim-treesitter.parsers".get_parser_configs()
parser_config.grug = {
  install_info = {
    url = "<directory-where-the-parser-is>",
    files = {"src/parser.c"},
    branch = "main",
  },
  filetype = "grug",
}
```

