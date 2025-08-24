import XCTest
import SwiftTreeSitter
import TreeSitterGrug

final class TreeSitterGrugTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_grug())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Grug grammar")
    }
}
