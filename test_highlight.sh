#!/bin/sh

set -xe

tree-sitter generate
tree-sitter highlight example.grug
