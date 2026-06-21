# ScriptCards VS Code Syntax Highlight

Maintainer: **Tim Beasley**

Syntax highlighting for [Roll20 ScriptCards](https://github.com/kjaegers/ScriptCards) files in Visual Studio Code, VSCodium, and Code - OSS.

This extension is intended for people writing or maintaining ScriptCards macros outside Roll20, especially larger `.scard` scripts.

## Supported files

The extension recognizes:

```text
.scard
.scard.txt
.scriptcard
.scriptcards
```

## Theme support

This initial release is tuned for **dark VS Code themes**.

Light themes are not officially supported in v1.0.0. Some light themes may work acceptably, but others can produce poor contrast because VS Code themes control the final TextMate token colors.

Colors may vary between dark themes, but the syntax should remain visible in common dark themes.

## Installation from GitHub

1. Download `scriptcards-vscode-syntax-highlight-1.0.0.vsix` from the GitHub release.
2. Open VS Code.
3. Open the Extensions panel with `Ctrl+Shift+X`.
4. Click the `...` menu at the top of the Extensions panel.
5. Choose **Install from VSIX...**.
6. Select the downloaded `.vsix` file.
7. Reload VS Code if prompted.

## What is highlighted

This grammar covers common Roll20 ScriptCards syntax, including but not limited to:

- statement prefixes such as `--#`, `--&`, `--=`, `--+`, `--?`, `--~`, `--%`, `-->`, `--^`, and `--:`
- GOSUB, GOTO, and label targets
- loop names, loop types, and loop parameters
- `--~` function statements
- array references such as `[@ArrayName(index)]`
- hash table references such as `[:HashName("key")]`
- object references such as `[*O:[&SomeID]:character:archived]`
- inline calculations such as `[= ... ]`
- handout/object modification commands such as `--!oh`, `--!h`, and `--!x`
- pointer commands such as `--Pread` and `--Pset`
- literal blocks such as `${ ... $}`

## Notes

This is a syntax-highlighting extension only. It does not run ScriptCards code, validate scripts, or connect to Roll20.
