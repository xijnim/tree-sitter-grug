#!/bin/sh

set -xe

tree-sitter generate
tree-sitter parse example.grug
