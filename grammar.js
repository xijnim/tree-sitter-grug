/**
 * @file A tree sitter parser for grug
 * @author xijnim <xijnin@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check


module.exports = grammar({
  name: "grug",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => repeat($._statement),

    _statement: $ => choice(
      $.variable_declaration,
      $.assignment,
      $.if_statement,
      $.while_statement,
      $.function_declaration,
      $.function_call,
      $.return_statement,
      $.empty_return,
    ),

    variable_declaration: $ => seq(
      field("name", $.identifier),
      ":",
      field("type", $.type),
      optional(
        seq(
          "=",
          field("value", $._expression),
        )
      )
    ),

    function_declaration: $ => prec(2, seq(
      field(
        "name", 
        choice(
          $.on_identifier,
          $.helper_identifier,
        ),
      ),
      "(",
      field(
        "param",
        seq(
          repeat(seq($.function_parameter, ",")),
          optional($.function_parameter),
        )
      ),
      ")",
      optional(field("ret_type", $.type)),
      field("body", $.body)
    )),

    on_identifier: $ => /on_[a-zA-Z_0-9]*/,
    helper_identifier: $ => /helper_[a-zA-Z_0-9]*/,

    comment: $ => /#.*\n/,

    function_parameter: $ => seq(
      field("name", $.identifier),
      ":",
      field("type", $.type)
    ),

    body: $ => seq(
      "{",
      repeat($._statement),
      "}"
    ),

    identifier: $ => /[a-zA-Z_]+[0-9a-zA-Z_]*/,
    number: $ => /\d+(\.\d*)?/,
    string: $ => /\"(.*?)\"/,

    type: $ => choice(
      "i32",
      "f32",
      "string",
      "id",
      "resource",
      $.identifier,
    ),

    if_statement: $ => seq(
      "if",
      field("condition", $._expression),
      field("body", $.body),
      optional( 
        seq(
          "else",
          field("else", choice(
            $.body,
            $.if_statement
          ))
        )
      )
    ),

    while_statement: $ => seq(
      "while",
      field("condition", $._expression),
      field("body", $.body),
    ),

    return_statement: $ => prec.left(2, seq(
      "return",
      field("value", $._expression),
    )),

    empty_return: $ => prec.left(1, "return"),

    assignment: $ => seq(
      field("name", $.identifier),
      "=",
      field(
        "value",
        $._expression,
      ),
    ),

    _expression: $ => choice(
      "me",
      $.unary_expression,
      $.binary_expression,
      $.identifier,
      $.number,
      $.string,
      $.function_call
    ),

    binary_expression: $ => choice(
      ...(
        [
          ["or", 1],
          ['and', 2],
          ['==', 3],
          ['!=', 3],
          ['>=', 4],
          ['>', 4],
          ['<=', 4],
          ['<', 4],
          ['+', 5],
          ['-', 5],
          ['*', 6],
          ['/', 6],
          ['%', 6],
        ].map(([operator, precedence]) => 
          prec.left(
            precedence,
            seq(
              field("left", $._expression),
              field("operator", operator),
              field("right", $._expression),
            )
          )
        )
      )
    ),
    unary_expression: $ => prec.left(
      7,
      seq(
        field("operator", choice("not", "!")),
        field("operand", $._expression),
      )
    ),

    function_call: $ => prec(1, seq(
      field("name", choice($.helper_identifier, $.identifier)),
      "(",
      seq(repeat(seq($.argument, ",")), optional($.argument)),
      ")"
    )),

    argument: $ => $._expression,
  },
  extras: $ => [
    $.comment,
    /[\s\t]/
  ],
  word: $ => $.identifier
});
