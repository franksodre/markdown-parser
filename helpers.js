class Helper {
  constructor() {}

  /**
   *@param {string} complexText
   * removes all markdown patterns and returns clean text
   */

  simpleText(complexText) {}

  /**
   *
   * @param {string} word
   * @param {string} compareStr
   */

  sayTrue(word, compareStr) {
    if (word.startsWith(compareStr) && word.endsWith(compareStr)) {
      return {
        test: true,
        length: compareStr.length,
      };
    }

    return false;
  }
}

export default Helper;
