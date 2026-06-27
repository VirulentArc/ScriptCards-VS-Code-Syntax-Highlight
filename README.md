# ScriptCards VS Code Syntax Highlight

A Visual Studio Code extension for editing Roll20 ScriptCards files.

## Features

- Syntax highlighting for common ScriptCards statement types, including comments, parameters, string variables, roll variables, arrays, hashes, loops, conditionals, labels, GOSUB calls, GOTO branches, output lines, storage commands, object commands, and API-related commands. Object command property keys such as `name`, `attack_type`, and `!swfxtype` are highlighted separately from their plain-text values.
- Highlighting for ScriptCards references, including string variables, roll variables, token references, selected/source/target references, arrays, hashes, repeating-section references, and raw value references.
- Highlighting for inline formatting and card HTML-style tags such as `[t]`, `[tr]`, `[td]`, `[b]`, `[i]`, `[c]`, `[r]`, `[F:...]`, `[img ...]`, and matching closing tags.
- Highlighting for ScriptCards button syntax, including `[button]`, `[rbutton]`, `[sheetbutton]`, button labels, target labels, and button arguments.
- Packaged token colors for readable ScriptCards files across common VS Code themes.

## Supported file types

- `.scard`
- `.scard.txt`
- `.scriptcard`
- `.scriptcards`

## Usage

Install the `.vsix` file in Visual Studio Code, then open a ScriptCards file. Supported file extensions should automatically use the **Roll20 ScriptCards** language mode.

If a file is not detected automatically, use **Change Language Mode** and select **Roll20 ScriptCards**.

## Commands

- `ScriptCards: Apply Token Colors`
- `ScriptCards: Use Dark Token Colors`
- `ScriptCards: Use Light Token Colors`
- `ScriptCards: Use High Contrast Dark Token Colors`
- `ScriptCards: Use High Contrast Light Token Colors`

## Version

2.0.0
