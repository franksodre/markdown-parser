const ORDERED_LIST_PATTERN = /^\d+\.\s/; // /(?<=\s)\d+\.\s/

class Lexer {
  constructor(text) {
    this.text = text;
    this.currentIndex = 0;
    this.LastChar = " ";
    this.tokens = [];
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

  eachToken() {
    let LINES = this.text.split("\n");
    let LINE = "";
    for (let i = 0; i < LINES.length; i++) {
      LINE = LINES[i].trim();
      LINE.startsWith("- ")
        ? this.tokens.push({
            type: "UNORDERED_LIST",
            value: { type: "BULLET_LIST", value: LINE.slice(2).trim() },
          })
        : this.tokens.push({ type: "NORMAL_TEXT", value: LINE.trim() });
    }

    return this.tokens;
  }
}
/*
if (HEADING_LEVELS_PATTERN["LEVEL_1"].test(LINE)) {
  this.tokens.push({
    type: "HEADING_1",
    value: LINE.slice(2).trim(),
  });
}
if (HEADING_LEVELS_PATTERN["LEVEL_2"].test(LINE)) {
  this.tokens.push({
    type: "HEADING_2",
    value: LINE.slice(2).trim(),
  });
}
*/
