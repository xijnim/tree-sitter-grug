"{" @punctuation.bracket
"}" @punctuation.bracket
"me" @variable.builtin
(boolean) @boolean

"if" @keyword.conditional
"else" @keyword.conditional

"or" @keyword.operator
"and" @keyword.operator
"not" @keyword.operator

"while" @keyword.repeat

"return" @keyword.return

(identifier) @variable
(comment) @comment
(function_declaration name: (on_identifier) @function.builtin)
(function_declaration name: (helper_identifier) @function)
(function_call name: (helper_identifier) @function)
(function_call name: (identifier) @function)
(number) @number
(string) @string
(type) @type
(type (identifier) @type)
(function_parameter (identifier) @parameter)
