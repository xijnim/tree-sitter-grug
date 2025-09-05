"i32" @type
"f32" @type
"string" @type
"id" @type
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
(function_call name: (identifier) @tag)
(number) @number
(string) @string
