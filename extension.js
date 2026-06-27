const vscode = require('vscode');

const RULE_PREFIX = 'ScriptCards Forced';

const SCOPES = {
  comments: '_comment.identifier.scriptcards, comment.line.scriptcards, meta.line.comment.roll20-scriptcards',
  doubledash: 'doubledash.scriptcards',
  conditionQuestion: 'constant.character.escape.conditional-question.scriptcards, meta.identifier.condition.scriptcards constant.character.escape.conditional-question.scriptcards',
  condition: 'meta.identifier.condition.scriptcards, meta.line.condition.roll20-scriptcards',
  strings: '_string.identifier.scriptcards, _string.tag.scriptcards, _string.reference.scriptcards, variable.other.info.variable.scriptcards, conditionliteral.scriptcards',
  rolls: 'rollidentifier.scriptcards, rolltag.scriptcards, roll.identifier.scriptcards, roll.tag.scriptcards, variable.other.roll.reference.scriptcards, variable.other.calculation.reference.scriptcards',
  parameters: 'parameter.identifier.scriptcards, parameter.tag.scriptcards, parameter.reference.scriptcards',
  objectPropertyKeys: 'support.type.object-property.key.scriptcards',
  loopMarker: 'loop.identifier.scriptcards, keyword.control.loop.identifier.scriptcards',
  loopName: 'support.variable.property.loopname.scriptcards, variable.other.readwrite.loopname.scriptcards, variable.other.loop.name.scriptcards, entity.name.type.loop.scriptcards',
  loopMethod: 'keyword.control.loop.scriptcards',
  loopSource: 'variable.other.array.source.loop.scriptcards',
  loopRange: 'constant.numeric.loop.range.scriptcards',
  functionCategory: 'keyword.other.function.category.scriptcards, meta.function.scriptcards keyword.other.function.category.scriptcards',
  functionMethod: 'keyword.other.function.method.scriptcards, meta.function.scriptcards keyword.other.function.method.scriptcards, keyword.other.repeating.method.scriptcards, keyword.other.info.request-type.scriptcards',
  functionResult: 'variable.other.function.result.scriptcards',
  arrayNames: 'variable.other.definition.array.scriptcards',
  arrayValues: 'constant.other.array.value.scriptcards, constant.other.repeating.argument.scriptcards, string.unquoted.info.prompt.scriptcards',
  arrays: 'variable.other.array.reference.scriptcards, meta.function.array.scriptcards, meta.function.array.define.scriptcards',
  hashtables: 'hashtable.identifier.scriptcards, hashtable.tag.scriptcards, entity.name.type.hashtable.scriptcards, variable.other.hashtable.reference.scriptcards, string.quoted.hashtable.key.scriptcards, storage.type.hashtable.identifier.scriptcards, punctuation.definition.hashtable.scriptcards',
  hashTableNames: 'entity.name.type.hashtable.definition.scriptcards',
  hashTableKeys: 'variable.other.hashtable.key.scriptcards',
  objects: 'variable.other.object.reference.scriptcards, variable.other.object.reference.source-token.scriptcards, variable.other.object.reference.target-token.scriptcards, variable.other.object.reference.repeating-attribute.scriptcards, variable.other.object.reference.repeating-value.scriptcards, variable.other.object.reference.campaign.scriptcards, variable.other.object.reference.page.scriptcards, roll20.attribute.reference.scriptcards, roll20.query.reference.scriptcards, table.reference.scriptcards',
  labels: 'branchlabel.identifier.scriptcards, branchlabel.tag.scriptcards, punctuation.definition.branchlabel.scriptcards, entity.name.function.gosub.identifier.scriptcards, punctuation.definition.gosub.scriptcards, keyword.control.goto.identifier.scriptcards, punctuation.definition.goto.scriptcards, proccall.identifier.scriptcards, proccall.tag.scriptcards, branchto.identifier.scriptcards, branchto.tag.scriptcards, string.other.branch.target.scriptcards, branchlabel.statement.scriptcards, meta.line.branchlabel.roll20-scriptcards branchlabel.statement.scriptcards, meta.line.proccall.roll20-scriptcards branchlabel.statement.scriptcards, meta.line.branchto.roll20-scriptcards branchlabel.statement.scriptcards',
  operators: 'operator.scriptcards, keyword.operator.comparison.scriptcards, equalto.operator.scriptcards, equaltocaseinsensitive.operator.scriptcards, notequalto.operator.scriptcards, notequaltocaseinsensitive.operator.scriptcards, greaterthan.operator.scriptcards, greaterthanorequalto.operator.scriptcards, lessthan.operator.scriptcards, lessthanorequalto.operator.scriptcards, includes.operator.scriptcards, notincludes.operator.scriptcards, casesensitiveincludes.operator.scriptcards, casesensitivenotincludes.operator.scriptcards, logicaland.operator.scriptcards, logicalor.operator.scriptcards, matches.operator.scriptcards, caselessmatches.operator.scriptcards',
  conditionLiterals: 'constant.language.undefined.scriptcards, condition.tag.scriptcards constant.language.undefined.scriptcards, condition.tag.scriptcards conditionliteral.scriptcards, meta.line.condition.roll20-scriptcards conditionliteral.scriptcards',
  separators: 'separator.pipe.scriptcards, separatorpipe.scriptcards, punctuation.separator.semicolon.scriptcards, punctuation.section.parens.begin.scriptcards, punctuation.section.parens.end.scriptcards, punctuation.separator.button-target.scriptcards, punctuation.separator.key-value.css.scriptcards, punctuation.separator.key-value.scriptcards',
  builtins: 'builtin.identifier.scriptcards, builtin.tag.scriptcards, support.function.builtin.identifier.scriptcards, support.function.console.identifier.scriptcards, support.function.pointer.identifier.scriptcards, support.function.repeating.identifier.scriptcards, support.function.wait.identifier.scriptcards, support.function.zorder.identifier.scriptcards',
  storage: 'storestorage.identifier.scriptcards, storestorage.tag.scriptcards, loadstorage.identifier.scriptcards, loadstorage.tag.scriptcards, data.identifier.scriptcards, data.tag.scriptcards, storage.type.data.identifier.scriptcards',
  api: 'api.identifier.scriptcards, api.tag.scriptcards, objectmod.identifier.scriptcards, objectmod.tag.scriptcards, pointer.identifier.scriptcards, pointer.tag.scriptcards, repeating.identifier.scriptcards, repeating.tag.scriptcards, visualeffect.identifier.scriptcards, visualeffect.tag.scriptcards, audioeffect.identifier.scriptcards, audioeffect.tag.scriptcards, zorder.identifier.scriptcards, zorder.tag.scriptcards, wait.identifier.scriptcards, wait.tag.scriptcards',
  output: 'output.identifier.scriptcards, output.tag.scriptcards, echo.identifier.scriptcards, echo.tag.scriptcards, entity.name.type.echo.speaker.scriptcards, string.unquoted.echo.content.scriptcards, gmwhisper.identifier.scriptcards, gmwhisper.tag.scriptcards, info.identifier.scriptcards, info.tag.scriptcards, info.prompt.title.scriptcards, info.button.text.scriptcards, string.unquoted.button.label.scriptcards, consolelog.identifier.scriptcards, consolelog.tag.scriptcards',
  buttonTags: 'markup.inline.button.tag.scriptcards',
  htmlTags: 'markup.inline.scriptcards-html-tag.scriptcards, markup.inline-formatting.scriptcards',
  exit: 'exit.identifier.scriptcards, exit.tag.scriptcards, procreturn.identifier.scriptcards, procreturn.tag.scriptcards',
  inline: 'support.type.property-name.css.scriptcards, string.unquoted.scriptcards, constant.character.entity.html.scriptcards, constant.other.color.reference.scriptcards, constant.character.escape.scriptcards, library.include.scriptcards, macro.wrapper.begin.scriptcards, macro.wrapper.end.scriptcards, literal.block.scriptcards',
};

const FONT_STYLES = { comments: 'italic' };

const PALETTES = {
  dark: { comments: '#6B6B6B', doubledash: '#616166', conditionQuestion: '#FF7043', condition: '#FF7043', strings: '#66BB6A', rolls: '#FFF176', parameters: '#AB47BC', objectPropertyKeys: '#FF8A65', loopMarker: '#B388FF', loopName: '#B388FF', loopMethod: '#FFA726', loopSource: '#4DD0E1', loopRange: '#90A4AE', functionCategory: '#29B6F6', functionMethod: '#FFA726', functionResult: '#F48FB1', arrayNames: '#4DD0E1', arrayValues: '#90A4AE', arrays: '#4DD0E1', hashtables: '#BA68C8', hashTableNames: '#BA68C8', hashTableKeys: '#CE93D8', objects: '#64B5F6', labels: '#EF5350', operators: '#EF5350', conditionLiterals: '#C5E1A5', separators: '#9E9E9E', builtins: '#80CBC4', storage: '#FFD54F', api: '#DCE775', output: '#90CAF9', buttonTags: '#26A69A', htmlTags: '#FFB74D', exit: '#F06292', inline: '#BDBDBD' },
  light: { comments: '#8A8A8A', doubledash: '#777777', conditionQuestion: '#D84315', condition: '#D84315', strings: '#0B7A28', rolls: '#795E00', parameters: '#7B1FA2', objectPropertyKeys: '#BF360C', loopMarker: '#5E35B1', loopName: '#5E35B1', loopMethod: '#A15C00', loopSource: '#00838F', loopRange: '#607D8B', functionCategory: '#006CB5', functionMethod: '#A15C00', functionResult: '#C2185B', arrayNames: '#00838F', arrayValues: '#607D8B', arrays: '#00838F', hashtables: '#6A1B9A', hashTableNames: '#6A1B9A', hashTableKeys: '#AD1457', objects: '#1565C0', labels: '#C62828', operators: '#C62828', conditionLiterals: '#2E7D32', separators: '#666666', builtins: '#00695C', storage: '#8A6D00', api: '#4E6E00', output: '#0D47A1', buttonTags: '#00796B', htmlTags: '#C77700', exit: '#AD1457', inline: '#555555' },
  highContrastDark: { comments: '#A0A0A0', doubledash: '#A0A0A0', conditionQuestion: '#FFB000', condition: '#FFB000', strings: '#00FF66', rolls: '#FFFF00', parameters: '#FF66FF', objectPropertyKeys: '#FF8A65', loopMarker: '#CC99FF', loopName: '#CC99FF', loopMethod: '#FFB000', loopSource: '#00FFFF', loopRange: '#E0E0E0', functionCategory: '#66CCFF', functionMethod: '#FFB000', functionResult: '#FF80AB', arrayNames: '#00FFFF', arrayValues: '#E0E0E0', arrays: '#00FFFF', hashtables: '#FF66FF', hashTableNames: '#FF66FF', hashTableKeys: '#FF99CC', objects: '#66CCFF', labels: '#FF6666', operators: '#FF6666', conditionLiterals: '#00FF66', separators: '#C0C0C0', builtins: '#00FFCC', storage: '#FFFF00', api: '#CCFF00', output: '#99CCFF', buttonTags: '#00E5C7', htmlTags: '#FFD700', exit: '#FF99CC', inline: '#FFFFFF' },
  highContrastLight: { comments: '#606060', doubledash: '#000000', conditionQuestion: '#B00000', condition: '#B00000', strings: '#006B00', rolls: '#5A3B00', parameters: '#5A007A', objectPropertyKeys: '#8A2A00', loopMarker: '#4A148C', loopName: '#4A148C', loopMethod: '#7A3F00', loopSource: '#006B75', loopRange: '#505050', functionCategory: '#004F9E', functionMethod: '#7A3F00', functionResult: '#AD005F', arrayNames: '#006B75', arrayValues: '#505050', arrays: '#006B75', hashtables: '#5A007A', hashTableNames: '#5A007A', hashTableKeys: '#8A003F', objects: '#003E8A', labels: '#B00000', operators: '#B00000', conditionLiterals: '#006B00', separators: '#000000', builtins: '#005A4F', storage: '#665000', api: '#3F5A00', output: '#003E8A', buttonTags: '#00695C', htmlTags: '#9A5B00', exit: '#8A003F', inline: '#202020' }
};

function paletteNameForThemeKind(kind) {
  if (kind === vscode.ColorThemeKind.Light) return 'light';
  if (kind === vscode.ColorThemeKind.HighContrast) return 'highContrastDark';
  if (kind === vscode.ColorThemeKind.HighContrastLight) return 'highContrastLight';
  return 'dark';
}

function buildRules(paletteName) {
  const palette = PALETTES[paletteName] || PALETTES.dark;
  const order = Object.keys(SCOPES);
  return order.map((key) => ({
    name: `${RULE_PREFIX}: ${paletteName}: ${key}`,
    scope: SCOPES[key],
    settings: { foreground: palette[key] || PALETTES.dark[key], ...(FONT_STYLES[key] ? { fontStyle: FONT_STYLES[key] } : {}) }
  }));
}

function isOldScriptCardsRule(rule) {
  if (!rule || typeof rule !== 'object') return false;
  const name = typeof rule.name === 'string' ? rule.name : '';
  const scope = typeof rule.scope === 'string' ? rule.scope : Array.isArray(rule.scope) ? rule.scope.join(',') : '';
  return name.startsWith('ScriptCards Forced') || name.startsWith('ScriptCards Packaged') || scope.includes('.scriptcards') || scope.includes('roll20-scriptcards') || scope.includes('scriptcardsHtmlTag');
}

async function writeSemanticPalette(paletteName) {
  const palette = PALETTES[paletteName] || PALETTES.dark;
  const cfg = vscode.workspace.getConfiguration('editor');
  await cfg.update('semanticHighlighting.enabled', true, vscode.ConfigurationTarget.Global);
  const existing = cfg.get('semanticTokenColorCustomizations') || {};
  const rules = { ...(existing.rules && typeof existing.rules === 'object' ? existing.rules : {}) };
  rules.scriptcardsHtmlTag = { foreground: palette.htmlTags || PALETTES.dark.htmlTags };
  await cfg.update('semanticTokenColorCustomizations', { ...existing, enabled: true, rules }, vscode.ConfigurationTarget.Global);
}

async function writePalette(paletteName, showMessage = false, force = false) {
  const enabled = vscode.workspace.getConfiguration('scriptcards').get('forceTokenColors', true);
  if (!enabled && !force) {
    refreshHtmlTagDecorations();
    return;
  }
  const cfg = vscode.workspace.getConfiguration('editor');
  const existing = cfg.get('tokenColorCustomizations') || {};
  const existingRules = Array.isArray(existing.textMateRules) ? existing.textMateRules : [];
  const next = { ...existing, textMateRules: [ ...existingRules.filter((rule) => !isOldScriptCardsRule(rule)), ...buildRules(paletteName) ] };
  await cfg.update('tokenColorCustomizations', next, vscode.ConfigurationTarget.Global);
  await writeSemanticPalette(paletteName);
  if (showMessage) {
    await forceActiveEditorToScriptCardsLanguage();
    const decorationCount = refreshHtmlTagDecorations();
    const debugInfo = getHtmlTagDebugInfo();
    vscode.window.showInformationMessage(`ScriptCards token colors applied: ${paletteName}; decoration ranges: ${decorationCount}.`);
  }
}

const HTML_TAG_TOKEN_TYPE = 'scriptcardsHtmlTag';
const HTML_TAG_LEGEND = new vscode.SemanticTokensLegend([HTML_TAG_TOKEN_TYPE], []);
const HTML_TAG_RE = /\[\/?(?:roll(?::[A-Za-z])?|img|d20|br|hr|th|tr|td|h[1-6]|[biusclrjftp])(?=[:\s\]])/gi;
const htmlTagSemanticProvider = {
  provideDocumentSemanticTokens(document) {
    const builder = new vscode.SemanticTokensBuilder(HTML_TAG_LEGEND);
    for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex += 1) {
      const text = document.lineAt(lineIndex).text;
      HTML_TAG_RE.lastIndex = 0;
      let match;
      while ((match = HTML_TAG_RE.exec(text)) !== null) builder.push(lineIndex, match.index, match[0].length, 0, 0);
    }
    return builder.build();
  }
};



// Direct editor decorations for ScriptCards inline HTML-style tag structure.
// This intentionally bypasses TextMate scope ordering and user token-color rules.
// It colors only the structural tag opener/name and the outer closing bracket,
// leaving nested ScriptCards references like [&B0] available for normal green coloring.
const HTML_TAG_FULL_REGEX = /\[\/?(?:roll(?::[A-Za-z])?|img|d(?:4|6|8|10|12|20|100)|br|hr|th|tr|td|h[1-6]|[biusclrfjtp])(?:(?:[^\[\]\n])|\[[^\[\]\n]*\])*\]/gi;
const HTML_TAG_OPENER_REGEX = /^\[\/?(?:roll(?::[A-Za-z])?|img|d(?:4|6|8|10|12|20|100)|br|hr|th|tr|td|h[1-6]|[biusclrfjtp])(?=[:\s\]])/i;
const BUTTON_TAG_FULL_REGEX = /\[\/?(?:sheetbutton|rbutton|button)(?:(?:[^\[\]\n])|\[[^\[\]\n]*\])*\]/gi;
const BUTTON_TAG_OPENER_REGEX = /^\[\/?(?:sheetbutton|rbutton|button)(?=[:\s\]])/i;
function isButtonFullTagText(fullTagText) {
  return BUTTON_TAG_OPENER_REGEX.test(fullTagText);
}
const STRING_REFERENCE_DECORATION_REGEX = /\[&[^\]\n]+\]/g;
const BRANCH_LABEL_DECORATION_REGEX = /(?:-->|--:|--\^)([^|\n]+)(\|)/g;
let htmlTagDecorationType;
let buttonTagDecorationType;
let buttonLabelDecorationType;
let buttonTargetDecorationType;
let buttonArgumentDecorationType;
let stringReferenceDecorationType;
let branchLabelDecorationType;
let conditionalBranchTargetDecorationType;
let objectPropertyKeyDecorationType;
let hashTableNameDecorationType;
let hashTableKeyDecorationType;

function isScriptCardsDocument(document) {
  if (!document) return false;
  if (document.languageId === 'roll20-scriptcards') return true;
  const fileName = (document.fileName || '').toLowerCase();
  return fileName.endsWith('.scard') || fileName.endsWith('.scard.txt') || fileName.endsWith('.scriptcard') || fileName.endsWith('.scriptcards');
}

async function forceActiveEditorToScriptCardsLanguage() {
  const editor = vscode.window.activeTextEditor;
  if (!editor || !editor.document) return false;
  if (!isScriptCardsDocument(editor.document)) return false;
  if (editor.document.languageId !== 'roll20-scriptcards') {
    try {
      await vscode.languages.setTextDocumentLanguage(editor.document, 'roll20-scriptcards');
    } catch (error) {
      // Decoration matching still works by filename, so failing to switch language is not fatal.
    }
  }
  return true;
}

function collectHtmlTagDecorationRanges(document) {
  const ranges = [];
  if (!isScriptCardsDocument(document)) return ranges;

  const text = document.getText();
  HTML_TAG_FULL_REGEX.lastIndex = 0;
  let match;
  while ((match = HTML_TAG_FULL_REGEX.exec(text)) !== null) {
    const fullTagText = match[0];
    if (isButtonFullTagText(fullTagText)) continue;
    const opener = fullTagText.match(HTML_TAG_OPENER_REGEX);
    if (opener) {
      const openerStart = document.positionAt(match.index);
      const openerEnd = document.positionAt(match.index + opener[0].length);
      ranges.push(new vscode.Range(openerStart, openerEnd));
    }
    const closingBracketIndex = match.index + fullTagText.length - 1;
    if (fullTagText.endsWith(']') && closingBracketIndex >= match.index) {
      const closeStart = document.positionAt(closingBracketIndex);
      const closeEnd = document.positionAt(closingBracketIndex + 1);
      ranges.push(new vscode.Range(closeStart, closeEnd));
    }
  }
  return ranges;
}

function findButtonTagEnd(text, startIndex, openerLength) {
  // Walk only the current button tag. This stops at the first outer closing
  // bracket while skipping nested bracket refs like [&TitleBG]. It prevents
  // [rbutton:...][F]Label[/F]::TARGET[/rbutton] from being treated as one
  // giant tag decoration range.
  let i = startIndex + openerLength;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '\n' || ch === '\r') return -1;
    if (ch === '[') {
      const nestedEnd = text.indexOf(']', i + 1);
      if (nestedEnd === -1) return -1;
      i = nestedEnd + 1;
      continue;
    }
    if (ch === ']') return i + 1;
    i++;
  }
  return -1;
}

function collectButtonTagDecorationRanges(document) {
  const ranges = [];
  if (!isScriptCardsDocument(document)) return ranges;

  const text = document.getText();
  const buttonStartRegex = /\[\/?(?:sheetbutton|rbutton|button)(?=[:\s\]])/gi;
  let match;
  while ((match = buttonStartRegex.exec(text)) !== null) {
    const endIndex = findButtonTagEnd(text, match.index, match[0].length);
    if (endIndex === -1) continue;
    ranges.push(new vscode.Range(document.positionAt(match.index), document.positionAt(endIndex)));
    buttonStartRegex.lastIndex = endIndex;
  }
  return ranges;
}


function findMatchingButtonClose(text, startIndex, buttonName) {
  const closeRe = new RegExp(`\\[\\/${buttonName}\\]`, 'i');
  const rest = text.slice(startIndex);
  const match = rest.match(closeRe);
  if (!match || typeof match.index !== 'number') return -1;
  return startIndex + match.index;
}

function findTopLevelToken(text, startIndex, endIndex, token) {
  let i = startIndex;
  while (i < endIndex) {
    const ch = text[i];
    if (ch === '[') {
      const nestedEnd = text.indexOf(']', i + 1);
      if (nestedEnd === -1 || nestedEnd >= endIndex) return -1;
      i = nestedEnd + 1;
      continue;
    }
    if (text.startsWith(token, i)) return i;
    i++;
  }
  return -1;
}

function pushPlainButtonContentRanges(ranges, document, text, startIndex, endIndex) {
  let i = startIndex;
  let plainStart = -1;
  while (i < endIndex) {
    const ch = text[i];
    if (ch === '[') {
      if (plainStart !== -1 && plainStart < i) {
        ranges.push(new vscode.Range(document.positionAt(plainStart), document.positionAt(i)));
        plainStart = -1;
      }
      const nestedEnd = text.indexOf(']', i + 1);
      if (nestedEnd === -1 || nestedEnd >= endIndex) return;
      i = nestedEnd + 1;
      continue;
    }
    if (plainStart === -1) plainStart = i;
    i++;
  }
  if (plainStart !== -1 && plainStart < endIndex) {
    ranges.push(new vscode.Range(document.positionAt(plainStart), document.positionAt(endIndex)));
  }
}

function collectButtonBodyDecorationRanges(document) {
  const result = { labels: [], targets: [], arguments: [] };
  if (!isScriptCardsDocument(document)) return result;

  const text = document.getText();
  const openRe = /\[(sheetbutton|rbutton|button)(?=[:\s\]])/gi;
  let match;
  while ((match = openRe.exec(text)) !== null) {
    const buttonName = match[1].toLowerCase();
    const openEnd = findButtonTagEnd(text, match.index, match[0].length);
    if (openEnd === -1) continue;

    const closeStart = findMatchingButtonClose(text, openEnd, buttonName);
    if (closeStart === -1) {
      openRe.lastIndex = openEnd;
      continue;
    }

    const targetSep = findTopLevelToken(text, openEnd, closeStart, '::');
    if (targetSep !== -1) {
      pushPlainButtonContentRanges(result.labels, document, text, openEnd, targetSep);
      const argSep = findTopLevelToken(text, targetSep + 2, closeStart, ';');
      const targetEnd = argSep === -1 ? closeStart : argSep;
      pushPlainButtonContentRanges(result.targets, document, text, targetSep + 2, targetEnd);
      if (argSep !== -1) {
        pushPlainButtonContentRanges(result.arguments, document, text, argSep + 1, closeStart);
      }
    }

    openRe.lastIndex = closeStart + buttonName.length + 3;
  }

  return result;
}

function collectStringReferenceDecorationRanges(document) {
  const ranges = [];
  if (!isScriptCardsDocument(document)) return ranges;

  const text = document.getText();
  STRING_REFERENCE_DECORATION_REGEX.lastIndex = 0;
  let match;
  while ((match = STRING_REFERENCE_DECORATION_REGEX.exec(text)) !== null) {
    const start = document.positionAt(match.index);
    const end = document.positionAt(match.index + match[0].length);
    ranges.push(new vscode.Range(start, end));
  }
  return ranges;
}



function collectObjectPropertyKeyDecorationRanges(document) {
  const ranges = [];
  if (!isScriptCardsDocument(document)) return ranges;

  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex += 1) {
    const text = document.lineAt(lineIndex).text;
    const objectCommandRe = /(^|\s)(--!)/g;
    let statementMatch;
    while ((statementMatch = objectCommandRe.exec(text)) !== null) {
      const statementStart = statementMatch.index + statementMatch[1].length;
      const scanStart = statementStart + 3;
      const nextStatement = text.slice(scanStart).search(/\s+--/);
      const statementEnd = nextStatement === -1 ? text.length : scanStart + nextStatement;
      const firstPipe = text.indexOf('|', scanStart);
      if (firstPipe === -1 || firstPipe >= statementEnd) continue;

      const contentStart = firstPipe;
      const contentText = text.slice(contentStart, statementEnd);
      const propertyRe = /(\|)(!?[A-Za-z_][\w-]*)(:)/g;
      let propertyMatch;
      while ((propertyMatch = propertyRe.exec(contentText)) !== null) {
        const pipeIndex = contentStart + propertyMatch.index;
        if (pipeIndex > 0 && text[pipeIndex - 1] === '\\') continue;
        const keyStart = pipeIndex + propertyMatch[1].length;
        const keyEnd = keyStart + propertyMatch[2].length;
        ranges.push(new vscode.Range(lineIndex, keyStart, lineIndex, keyEnd));
      }
      objectCommandRe.lastIndex = statementEnd;
    }
  }
  return ranges;
}


function splitUnescapedSemicolonFields(text, startIndex, endIndex) {
  const fields = [];
  let fieldStart = startIndex;
  let i = startIndex;
  while (i <= endIndex) {
    if (i === endIndex || (text[i] === ';' && (i === 0 || text[i - 1] !== '\\'))) {
      fields.push({ start: fieldStart, end: i, text: text.slice(fieldStart, i) });
      fieldStart = i + 1;
    }
    i += 1;
  }
  return fields;
}

function collectHashSetDecorationRanges(document) {
  const result = { names: [], keys: [] };
  if (!isScriptCardsDocument(document)) return result;

  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex += 1) {
    const text = document.lineAt(lineIndex).text;
    const functionCommandRe = /(^|\s)(--~)/g;
    let statementMatch;
    while ((statementMatch = functionCommandRe.exec(text)) !== null) {
      const statementStart = statementMatch.index + statementMatch[1].length;
      const scanStart = statementStart + 3;
      const nextStatement = text.slice(scanStart).search(/\s+--/);
      const statementEnd = nextStatement === -1 ? text.length : scanStart + nextStatement;
      const firstPipe = text.indexOf('|', scanStart);
      if (firstPipe === -1 || firstPipe >= statementEnd) continue;

      const contentStart = firstPipe + 1;
      const content = text.slice(contentStart, statementEnd);
      const prefixMatch = content.match(/^hash;set;/i);
      if (!prefixMatch) {
        functionCommandRe.lastIndex = statementEnd;
        continue;
      }

      const fieldsStart = contentStart + prefixMatch[0].length;
      const fields = splitUnescapedSemicolonFields(text, fieldsStart, statementEnd);
      if (fields.length > 0) {
        const leading = fields[0].text.search(/\S/);
        if (leading !== -1) {
          const trailing = fields[0].text.length - fields[0].text.trimEnd().length;
          const nameStart = fields[0].start + leading;
          const nameEnd = fields[0].end - trailing;
          if (nameStart < nameEnd) result.names.push(new vscode.Range(lineIndex, nameStart, lineIndex, nameEnd));
        }
      }

      for (let fieldIndex = 1; fieldIndex < fields.length; fieldIndex += 1) {
        const field = fields[fieldIndex];
        const eqIndex = field.text.indexOf('==');
        if (eqIndex <= 0) continue;
        const rawKey = field.text.slice(0, eqIndex);
        const keyLeading = rawKey.search(/\S/);
        if (keyLeading === -1) continue;
        const keyTrailing = rawKey.length - rawKey.trimEnd().length;
        const keyStart = field.start + keyLeading;
        const keyEnd = field.start + eqIndex - keyTrailing;
        if (keyStart < keyEnd) result.keys.push(new vscode.Range(lineIndex, keyStart, lineIndex, keyEnd));
      }
      functionCommandRe.lastIndex = statementEnd;
    }
  }

  return result;
}

function collectBranchLabelDecorationRanges(document) {
  const ranges = [];
  if (!isScriptCardsDocument(document)) return ranges;

  const text = document.getText();
  BRANCH_LABEL_DECORATION_REGEX.lastIndex = 0;
  let match;
  while ((match = BRANCH_LABEL_DECORATION_REGEX.exec(text)) !== null) {
    const labelStartIndex = match.index + match[0].indexOf(match[1]);
    const labelEndIndex = labelStartIndex + match[1].length;
    if (labelStartIndex < labelEndIndex) {
      ranges.push(new vscode.Range(document.positionAt(labelStartIndex), document.positionAt(labelEndIndex)));
    }
  }
  return ranges;
}



function splitTopLevelPipes(text, startIndex, endIndex) {
  const fields = [];
  let fieldStart = startIndex;
  let i = startIndex;
  while (i <= endIndex) {
    if (i === endIndex) {
      fields.push({ start: fieldStart, end: i, text: text.slice(fieldStart, i) });
      break;
    }
    const ch = text[i];
    if (ch === '[') {
      const nestedEnd = text.indexOf(']', i + 1);
      if (nestedEnd === -1 || nestedEnd >= endIndex) break;
      i = nestedEnd + 1;
      continue;
    }
    if (ch === '|' && (i === 0 || text[i - 1] !== '\\')) {
      fields.push({ start: fieldStart, end: i, text: text.slice(fieldStart, i) });
      fieldStart = i + 1;
      i += 1;
      continue;
    }
    i += 1;
  }
  return fields;
}

function collectConditionalBranchTargetDecorationRanges(document) {
  const ranges = [];
  if (!isScriptCardsDocument(document)) return ranges;

  for (let lineIndex = 0; lineIndex < document.lineCount; lineIndex += 1) {
    const text = document.lineAt(lineIndex).text;
    const conditionRe = /(^|\s)(--\?)/g;
    let statementMatch;
    while ((statementMatch = conditionRe.exec(text)) !== null) {
      const statementStart = statementMatch.index + statementMatch[1].length;
      const scanStart = statementStart + 3;
      const nextStatement = text.slice(scanStart).search(/\s+--/);
      const statementEnd = nextStatement === -1 ? text.length : scanStart + nextStatement;
      const firstPipe = text.indexOf('|', scanStart);
      if (firstPipe === -1 || firstPipe >= statementEnd) {
        conditionRe.lastIndex = statementEnd;
        continue;
      }

      const branches = splitTopLevelPipes(text, firstPipe + 1, statementEnd);
      for (const branch of branches) {
        const leading = branch.text.search(/\S/);
        if (leading === -1) continue;
        const trailing = branch.text.length - branch.text.trimEnd().length;
        const targetStart = branch.start + leading;
        const targetEnd = branch.end - trailing;
        if (targetStart >= targetEnd) continue;

        const branchText = text.slice(targetStart, targetEnd);
        // Only bare branch targets are colored here. Inline actions keep their
        // normal statement-specific colors, for example &Var;Value or [ ... ].
        if (!/^[A-Za-z_][A-Za-z0-9_.-]*$/.test(branchText)) continue;
        ranges.push(new vscode.Range(lineIndex, targetStart, lineIndex, targetEnd));
      }
      conditionRe.lastIndex = statementEnd;
    }
  }

  return ranges;
}

function refreshHtmlTagDecorationsForEditor(editor) {
  if (!editor || !htmlTagDecorationType) return 0;
  const ranges = collectHtmlTagDecorationRanges(editor.document);
  editor.setDecorations(htmlTagDecorationType, ranges);
  if (buttonTagDecorationType) {
    editor.setDecorations(buttonTagDecorationType, collectButtonTagDecorationRanges(editor.document));
  }
  const buttonBodyRanges = collectButtonBodyDecorationRanges(editor.document);
  if (buttonLabelDecorationType) {
    editor.setDecorations(buttonLabelDecorationType, buttonBodyRanges.labels);
  }
  if (buttonTargetDecorationType) {
    editor.setDecorations(buttonTargetDecorationType, buttonBodyRanges.targets);
  }
  if (buttonArgumentDecorationType) {
    editor.setDecorations(buttonArgumentDecorationType, buttonBodyRanges.arguments);
  }
  if (stringReferenceDecorationType) {
    editor.setDecorations(stringReferenceDecorationType, collectStringReferenceDecorationRanges(editor.document));
  }
  if (branchLabelDecorationType) {
    editor.setDecorations(branchLabelDecorationType, collectBranchLabelDecorationRanges(editor.document));
  }
  if (conditionalBranchTargetDecorationType) {
    editor.setDecorations(conditionalBranchTargetDecorationType, collectConditionalBranchTargetDecorationRanges(editor.document));
  }
  if (objectPropertyKeyDecorationType) {
    editor.setDecorations(objectPropertyKeyDecorationType, collectObjectPropertyKeyDecorationRanges(editor.document));
  }
  const hashSetRanges = collectHashSetDecorationRanges(editor.document);
  if (hashTableNameDecorationType) {
    editor.setDecorations(hashTableNameDecorationType, hashSetRanges.names);
  }
  if (hashTableKeyDecorationType) {
    editor.setDecorations(hashTableKeyDecorationType, hashSetRanges.keys);
  }
  return ranges.length;
}

function refreshHtmlTagDecorations() {
  let count = 0;
  for (const editor of vscode.window.visibleTextEditors) {
    count += refreshHtmlTagDecorationsForEditor(editor);
  }
  return count;
}

function getHtmlTagDebugInfo() {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return 'ScriptCards HTML tag debug: no active editor.';
  const document = editor.document;
  const ranges = collectHtmlTagDecorationRanges(document);
  const first = ranges.slice(0, 10).map((range) => {
    const text = document.getText(range);
    return `${text}@${range.start.line + 1}:${range.start.character + 1}`;
  }).join(', ');
  const ext = vscode.extensions.all.find(e => e.id.toLowerCase().includes('scriptcards'));
  return [
    'ScriptCards HTML tag debug:',
    `extensionId=${ext ? ext.id : 'unknown'}`,
    `extensionPath=${ext ? ext.extensionPath : 'unknown'}`,
    `activeFile=${document.fileName}`,
    `languageId=${document.languageId}`,
    `isScriptCardsDocument=${isScriptCardsDocument(document)}`,
    `visibleEditors=${vscode.window.visibleTextEditors.length}`,
    `tagRanges=${ranges.length}`,
    `buttonTagRanges=${collectButtonTagDecorationRanges(document).length}`,
    `buttonBodyRanges=${(() => { const b = collectButtonBodyDecorationRanges(document); return b.labels.length + '/' + b.targets.length + '/' + b.arguments.length; })()}`,
    `stringRefRanges=${collectStringReferenceDecorationRanges(document).length}`,
    `branchLabelRanges=${collectBranchLabelDecorationRanges(document).length}`,
    `conditionalBranchTargetRanges=${collectConditionalBranchTargetDecorationRanges(document).length}`,
    `objectPropertyKeyRanges=${collectObjectPropertyKeyDecorationRanges(document).length}`,
    `hashSetRanges=${(() => { const h = collectHashSetDecorationRanges(document); return h.names.length + '/' + h.keys.length; })()}`, 
    `firstMatches=${first || 'none'}`
  ].join(' | ');
}

function activate(context) {
  htmlTagDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#FFB74D',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  buttonTagDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#26A69A',
    textDecoration: 'none; color: #26A69A !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  buttonLabelDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#90CAF9',
    textDecoration: 'none; color: #90CAF9 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  buttonTargetDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#EF5350',
    textDecoration: 'none; color: #EF5350 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  buttonArgumentDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#26A69A',
    textDecoration: 'none; color: #26A69A !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  stringReferenceDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#66BB6A',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  branchLabelDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#EF5350',
    textDecoration: 'none; color: #EF5350 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  conditionalBranchTargetDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#EF5350',
    textDecoration: 'none; color: #EF5350 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  objectPropertyKeyDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#FF8A65',
    textDecoration: 'none; color: #FF8A65 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  hashTableNameDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#BA68C8',
    textDecoration: 'none; color: #BA68C8 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  hashTableKeyDecorationType = vscode.window.createTextEditorDecorationType({
    color: '#CE93D8',
    textDecoration: 'none; color: #CE93D8 !important;',
    rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed
  });
  context.subscriptions.push(htmlTagDecorationType, buttonTagDecorationType, buttonLabelDecorationType, buttonTargetDecorationType, buttonArgumentDecorationType, stringReferenceDecorationType, branchLabelDecorationType, conditionalBranchTargetDecorationType, objectPropertyKeyDecorationType, hashTableNameDecorationType, hashTableKeyDecorationType);
  context.subscriptions.push(
    vscode.window.onDidChangeVisibleTextEditors(refreshHtmlTagDecorations),
    vscode.window.onDidChangeActiveTextEditor(() => refreshHtmlTagDecorations()),
    vscode.workspace.onDidChangeTextDocument(event => {
      for (const editor of vscode.window.visibleTextEditors) {
        if (editor.document === event.document) refreshHtmlTagDecorationsForEditor(editor);
      }
    }),
    vscode.window.onDidChangeTextEditorVisibleRanges(() => refreshHtmlTagDecorations())
  );
  refreshHtmlTagDecorations();


  const applyActive = () => writePalette(paletteNameForThemeKind(vscode.window.activeColorTheme.kind));
  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider({ language: 'roll20-scriptcards' }, htmlTagSemanticProvider, HTML_TAG_LEGEND),
    vscode.commands.registerCommand('scriptcardsHashSetTest.applyForcedTokenColors', () => writePalette(paletteNameForThemeKind(vscode.window.activeColorTheme.kind), true, true)),
    vscode.commands.registerCommand('scriptcardsHashSetTest.forceDarkTokenColors', () => writePalette('dark', true, true)),
    vscode.commands.registerCommand('scriptcardsHashSetTest.forceLightTokenColors', () => writePalette('light', true, true)),
    vscode.commands.registerCommand('scriptcardsHashSetTest.forceHighContrastDarkTokenColors', () => writePalette('highContrastDark', true, true)),
    vscode.commands.registerCommand('scriptcardsHashSetTest.forceHighContrastLightTokenColors', () => writePalette('highContrastLight', true, true)),
    vscode.window.onDidChangeActiveColorTheme(applyActive)
  );
  applyActive();
  setTimeout(applyActive, 1000);
}
function deactivate() {}
module.exports = { activate, deactivate };
