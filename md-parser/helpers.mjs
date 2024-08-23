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
   */

  sayTrue(word) {
    let str = word.match(/^\*+/)[0];
    if (word.startsWith(str) && word.endsWith(str)) {
      if (str.length > 3) {
        for (let i = 0; i < str.length; i++) {
          let resto = str.length - 3;
          return {
            test: true,
            length: resto,
            cutter: str.length,
          };
        }
      }
      return { test: true, length: str.length, cutter: str.length };
    }

    return false;
  }
}

export default Helper; // **** *
/*
let str = word.match(/^\*+/)[0].length;
return {
  test: true,
  length: str * 1,
};
*/
