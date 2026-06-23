# Changelog

## 1.0.1

Patch release.

### Changed

- Removed ScriptCards-specific auto-enter insertion rules from `language-configuration.json`.
- The extension no longer automatically inserts `--` or `--%|` lines while editing loops.
- Syntax highlighting and normal bracket/quote pairing remain unchanged.

## 1.0.0

Initial GitHub release.

### Added

- Syntax highlighting for Roll20 ScriptCards files.
- Support for `.scard`, `.scard.txt`, `.scriptcard`, and `.scriptcards` files.
- Highlighting for modern ScriptCards structures including arrays, hash tables, object references, pointer commands, handout commands, GOSUB/GOTO labels, loops, and `--~` function statements.
- Dark-theme-focused token colors and scopes.

### Notes

- Light themes are not officially supported in this initial release.
- The extension intentionally does not claim all `.txt` files.

