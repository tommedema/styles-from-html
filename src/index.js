/**
 * The return object containing the retrieved CSS and the HTML document without the CSS.
 * @typedef {Object} ReturnObj
 * @property {string} css - The CSS retrieved from the HTML document.
 * @property {string} html - The original HTML document with the retrieved CSS removed.
 */

/**
 * A function that given HTML, will return an object with two properties:
 * CSS, containing the css rules retrieved from the HTML document; and html, containing the
 * original HTML document but with the retrieved CSS rules removed.
 * @function stylesFromHtml
 * @param {type} html The input HTML document.
 *
 * @returns {ReturnObj} An object containing the retrieved css
 * and the HTML document without the CSS.
 */
module.exports = function stylesFromHtml (html) {
  const re = /<style.*?>([\S\s]*?)<\/style>/gi

  let matches
  let css = ''
  let cleaned = html

  while ((matches = re.exec(html)) !== null) {
    css += matches[1]
    cleaned = cleaned.replace(matches[0], '')
  }

  return {
    css: css.trim(),
    html: cleaned
  }
}
