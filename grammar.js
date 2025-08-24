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
      $.function_declaration,
      $.function_call
    ),

    variable_declaration: $ => seq(
      $.identifier,
      ":",
      $.type,
      "=",
      $._expression,
    ),
    function_declaration: $ => seq(
      $.identifier,
      "(",
      repeat(seq($.function_parameter, ",")),
      optional($.function_parameter),
      ")",
      $.body
    ),

    function_parameter: $ => seq(
      $.identifier,
      ":",
      $.type
    ),

    body: $ => seq(
      "{",
      repeat($._statement),
      "}"
    ),

    identifier: $ => /[a-zA-Z_]+/,
    number: $ => /\d+(\.\d*)?/,
    string: $ => /\"(.*?)\"/,

    type: $ => choice(
      "i32",
      "f32",
      "string",
      "id",
    ),

    _expression: $ => choice(
      $.identifier,
      $.number,
      $.string,
      $.function_call
    ),

    function_call: $ => seq(
      $.identifier,
      "(",
      seq(repeat(seq($._expression, ",")), optional($._expression)),
      ")"
    ),
  }
});
