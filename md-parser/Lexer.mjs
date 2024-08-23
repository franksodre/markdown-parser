import {
  EMPHASYSIS_PATTERN,
  LIST_PATTERN,
  HEADING_PATTERN,
  BOLD_ITALIC_TEXT_PATTERN,
  HEADING_LEVELS_PATTERN,
  BOLD_TEXT_PATTERN,
} from "./constants.mjs";

import Helper from "./helpers.mjs";

class Lexer {
  constructor(text) {
    this.text = text;
    this.currentIndex = 0;
    this.LastChar = " ";
    this.tokens = [];

    this.LINE = this.eachLine();
  }

  eachLine() {
    return this.text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
  }

  EOF() {
    return this.index >= this.text.length;
  }

  hasMoreTokens() {
    return !this.EOF();
  }

  addChar() {
    if (this.hasMoreTokens()) {
      return this.text[this.currentIndex++];
    }

    return null;
  }

  isalNum(char) {
    const pattern = /^[a-zA-Z0-9]+$/;
    return pattern.test(char);
  }

  emphasasis({ pattern, char, type, text }) {
    let match = Array.from(text.match(pattern));
    const matches = match.map((i) => {
      let StartIndex = i.indexOf(char);
      let EndIndex = i.lastIndexOf(char);

      this.tokens.push({
        type,
        value: i.slice(StartIndex + char.length, EndIndex),
      });
    });
  }

  eachToken() {
    let LINES = this.LINE;
    for (const LINE of LINES) {
      if (LINE.startsWith("- ")) {
        this.tokens.push({
          type: "BULLET_LIST",
          metadata: { prefix: "-" },
          value: LINE.slice(2).trim(),
        });
      } else if (LIST_PATTERN.test(LINE)) {
        this.tokens.push({
          type: "BULLET_LIST",
          metadata: { prefix: LINE.match(LIST_PATTERN)[0] },
          value: LINE.slice(2).trim(),
        });
      } else if (HEADING_PATTERN.test(LINE)) {
        for (const [_LEVELS, { pattern, type }] of Object.entries(
          HEADING_LEVELS_PATTERN,
        )) {
          if (pattern.test(LINE)) {
            this.tokens.push({
              type: type,
              value: LINE.slice(pattern.source.length - 1).trim(),
            });
          }
        }
      }
      if (EMPHASYSIS_PATTERN.test(LINE)) {
        const words = LINE.match(EMPHASYSIS_PATTERN);
        for (const word of words) {
          const helper = new Helper();
          const { test: pattern, length, cutter } = helper.sayTrue(word);

          if (pattern && length % 3 == 0) {
            this.tokens.push({
              type: "BOLD_ITALIC_TEXT",
              value: word.slice(cutter, -cutter),
            });
          } else if (pattern && length % 2 == 0) {
            this.tokens.push({
              type: "BOLD_TEXT",
              value: word.slice(cutter, -cutter),
            });
          } else if (pattern && length % 1 == 0) {
            this.tokens.push({
              type: "ITALIC_TEXT",
              value: word.slice(cutter, -cutter),
            });
          }
        }
      }
    }
    return this.tokens;
  }
}

const md = new Lexer(`
# floating point types

em c++ todo numeric literal de ponto flutuante automaticamente possui o tipo double.
para contradizer a este pradrão basta adicionar o **sufixo**
***ok ok ok*** vibe is over or *****not*****
(f, F) ao literal de ponto flutuante, isso ira torna-lo em um valor de ponto flutuante.
==obviamente, você não pode usar o sufixo em valores já assinados commo double==

## Questions about "entendendo c++"

1. why -> ==you cannot change a double variable into a float variable by appending an f. Attempting to do so would change the name of the variable!==
2. Em um numero o que é a mantissa?
3. Porque numeros de tipo ponto flutuante não podem ser *signed* ou *unsigned*

- more subject something something
- test this - *italic*a*  **a** ***b*** ******j******
`);

console.log(md.eachToken());
