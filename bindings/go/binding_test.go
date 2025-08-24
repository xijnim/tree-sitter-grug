package tree_sitter_grug_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_grug "github.com/xijnim/tree-sitter-grug.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_grug.Language())
	if language == nil {
		t.Errorf("Error loading Grug grammar")
	}
}
