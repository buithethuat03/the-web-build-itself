export interface Token {
  type: 'tag' | 'attr' | 'val' | 'comment' | 'punct' | 'text' | 'selector' | 'prop' | 'keyword';
  content: string;
}

export interface HighlightedLine {
  lineNumber: number;
  tokens: Token[];
  raw: string;
}

/**
 * Editorial lightweight syntax tokenizer for HTML, CSS, and JavaScript.
 * Avoids rainbow saturation; focuses on optical rhythm and typographic hierarchy.
 */
export function tokenizeCode(code: string, language: 'html' | 'css' | 'js' = 'html'): HighlightedLine[] {
  const lines = code.split('\n');
  
  return lines.map((lineStr, idx) => {
    const tokens: Token[] = [];
    let i = 0;
    const len = lineStr.length;

    if (len === 0) {
      return { lineNumber: idx + 1, tokens: [{ type: 'text', content: ' ' }], raw: '' };
    }

    if (language === 'html') {
      while (i < len) {
        // Comment: <!-- ... -->
        if (lineStr.slice(i, i + 4) === '<!--') {
          const endIdx = lineStr.indexOf('-->', i);
          if (endIdx !== -1) {
            tokens.push({ type: 'comment', content: lineStr.slice(i, endIdx + 3) });
            i = endIdx + 3;
          } else {
            tokens.push({ type: 'comment', content: lineStr.slice(i) });
            i = len;
          }
          continue;
        }

        // Tags: <tag, </tag, >
        if (lineStr[i] === '<') {
          let j = i + 1;
          if (lineStr[j] === '/') j++;
          if (lineStr.slice(i, i + 9).toLowerCase() === '<!doctype') {
            tokens.push({ type: 'punct', content: '<!' });
            tokens.push({ type: 'tag', content: 'doctype' });
            i += 9;
            continue;
          }
          tokens.push({ type: 'punct', content: lineStr.slice(i, j) });
          i = j;

          // Tag name
          const tagMatch = lineStr.slice(i).match(/^[a-zA-Z0-9\-]+/);
          if (tagMatch) {
            tokens.push({ type: 'tag', content: tagMatch[0] });
            i += tagMatch[0].length;
          }
          continue;
        }

        if (lineStr[i] === '>' || lineStr.slice(i, i + 2) === '/>') {
          const punct = lineStr[i] === '/' ? '/>' : '>';
          tokens.push({ type: 'punct', content: punct });
          i += punct.length;
          continue;
        }

        // Inside tag attributes: name="value"
        if (lineStr[i] === '"' || lineStr[i] === "'") {
          const quote = lineStr[i];
          let j = i + 1;
          while (j < len && lineStr[j] !== quote) {
            if (lineStr[j] === '\\' && j + 1 < len) j += 2;
            else j++;
          }
          if (j < len) j++; // include closing quote
          tokens.push({ type: 'val', content: lineStr.slice(i, j) });
          i = j;
          continue;
        }

        if (lineStr[i] === '=') {
          tokens.push({ type: 'punct', content: '=' });
          i++;
          continue;
        }

        // Attribute name or text
        const wordMatch = lineStr.slice(i).match(/^[a-zA-Z0-9\-:]+/);
        if (wordMatch) {
          // Check if before '='
          const rest = lineStr.slice(i + wordMatch[0].length).trim();
          if (rest.startsWith('=')) {
            tokens.push({ type: 'attr', content: wordMatch[0] });
          } else {
            tokens.push({ type: 'text', content: wordMatch[0] });
          }
          i += wordMatch[0].length;
          continue;
        }

        // Any other characters (whitespace, punctuation)
        tokens.push({ type: 'text', content: lineStr[i] });
        i++;
      }
    } else if (language === 'css') {
      while (i < len) {
        // Comment /* ... */
        if (lineStr.slice(i, i + 2) === '/*') {
          const endIdx = lineStr.indexOf('*/', i);
          if (endIdx !== -1) {
            tokens.push({ type: 'comment', content: lineStr.slice(i, endIdx + 2) });
            i = endIdx + 2;
          } else {
            tokens.push({ type: 'comment', content: lineStr.slice(i) });
            i = len;
          }
          continue;
        }

        // Curly braces, colons, semicolons
        if (['{', '}', ':', ';', ',', '(', ')'].includes(lineStr[i])) {
          tokens.push({ type: 'punct', content: lineStr[i] });
          i++;
          continue;
        }

        // Selector or Property
        const word = lineStr.slice(i).match(/^[a-zA-Z0-9\-#.:_@%]+/);
        if (word) {
          const after = lineStr.slice(i + word[0].length).trim();
          if (lineStr.includes('{') && !lineStr.includes(':')) {
            tokens.push({ type: 'selector', content: word[0] });
          } else if (after.startsWith(':')) {
            tokens.push({ type: 'prop', content: word[0] });
          } else {
            tokens.push({ type: 'val', content: word[0] });
          }
          i += word[0].length;
          continue;
        }

        tokens.push({ type: 'text', content: lineStr[i] });
        i++;
      }
    } else {
      // JS simple tokenizer
      while (i < len) {
        if (lineStr.slice(i, i + 2) === '//') {
          tokens.push({ type: 'comment', content: lineStr.slice(i) });
          i = len;
          continue;
        }

        if (lineStr[i] === '"' || lineStr[i] === "'" || lineStr[i] === '`') {
          const q = lineStr[i];
          let j = i + 1;
          while (j < len && lineStr[j] !== q) {
            if (lineStr[j] === '\\' && j + 1 < len) j += 2;
            else j++;
          }
          if (j < len) j++;
          tokens.push({ type: 'val', content: lineStr.slice(i, j) });
          i = j;
          continue;
        }

        const kwMatch = lineStr.slice(i).match(/^(const|let|var|function|return|document|addEventListener|querySelector|if|else)\b/);
        if (kwMatch) {
          tokens.push({ type: 'keyword', content: kwMatch[0] });
          i += kwMatch[0].length;
          continue;
        }

        tokens.push({ type: 'text', content: lineStr[i] });
        i++;
      }
    }

    return {
      lineNumber: idx + 1,
      tokens,
      raw: lineStr,
    };
  });
}
