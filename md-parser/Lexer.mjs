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
      }
      if (HEADING_PATTERN.test(LINE)) {
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
          const { isValidPattern, length, cutter } =
            helper.processAsteriskPattern(word);

          if (isValidPattern && length % 3 == 0) {
            this.tokens.push({
              type: "BOLD_ITALIC_TEXT",
              value: word.slice(cutter, -cutter),
            });
          } else if (isValidPattern && length % 2 == 0) {
            this.tokens.push({
              type: "BOLD_TEXT",
              value: word.slice(cutter, -cutter),
            });
          } else if (isValidPattern && length % 1 == 0) {
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
  # Heading 1

  This is the first paragraph. **It contains bold text** and *italicized text*. Here is a [link](https://www.example.com) for testing purposes.

  ## Heading 2

  The second paragraph includes a list:
  - **Item 1** with *emphasis*
  - *Item 2* with **strong emphasis**
  - A simple item with \`inline code\`

  ### Heading 3

  Here's the third paragraph. You can use \`code blocks\`:
  console.log("Hello, World!");


  #### Heading 4

  The final paragraph includes a blockquote:
  > This is a blockquote.
  > It has **bold** and *italic* text.

  ## Usage Examples

  Here are some common elements in Markdown:
  1. **Headings** are created using hash symbols.
  2. *Lists* can be either ordered or unordered.
  3. \`Code blocks\` are often used to display code snippets.

- test this - *italic*a*  **a** ***b*** ******j******
`);

console.log(md.eachToken());
