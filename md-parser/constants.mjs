export const EMPHASYSIS_PATTERN =
  /(\*\*\*[^*]+\*\*\*)|(\*\*(?=\S)[^*]+(?<=\S)\*\*)|(\*(?=\S)[^*]+(?<=\S)\*)/g;

export const BOLD_TEXT_PATTERN = /(?:\*\*|__)([^*__]+?)(?:\*\*|__)/g;

export const LIST_PATTERN = /^\d+\.\s/;

export const BOLD_ITALIC_TEXT_PATTERN =
  /(?:\*\*\*|___)([^*__]+?)(?:\*\*\*|___)/g;

export const ITALIC_TEXT_PATTERN =
  /(?<!\*)\*(?![*\s])(?:[^*]*[^*\s])?\*(?!\*)/gim;

export const HEADING_PATTERN = /^#/;

export const HEADING_LEVELS_PATTERN = {
  LEVEL_1: { pattern: /^# /, type: "HEADING_1" },
  LEVEL_2: { pattern: /^## /, type: "HEADING_2" },
  LEVEL_3: { pattern: /^### /, type: "HEADING_3" },
  LEVEL_4: { pattern: /^#### /, type: "HEADING_4" },
  LEVEL_5: { pattern: /^##### /, type: "HEADING_5" },
  LEVEL_6: { pattern: /^###### /, type: "HEADING_6" },
};

// older -> /\*\*(.*?)\*\*/g |
// newer -> /\*\*(?!\*)(.+?)(?<!\*)\*\*/g |
//  better -> /\*\*(?!\*)([^*]+?)\*\*(?!\*)/g
