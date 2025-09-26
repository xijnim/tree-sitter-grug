(type) @type
"{" @punctuation.bracket
"}" @punctuation.bracket
"me" @variable.builtin
"if" @keyword
"or" @keyword
"and" @keyword
"else" @keyword
"while" @keyword
(identifier) @variable
(comment) @comment
(function_declaration name: (on_identifier) @function.builtin)
(function_declaration name: (helper_identifier) @function)
(function_call name: (helper_identifier) @function)
(function_call name: (identifier) @function)
(number) @number
(string) @string
