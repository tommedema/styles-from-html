/* global describe, it */
require('should')

const stylesFromHtml = require('../src')
const fs = require('fs')
const getHtml = (file) => fs.readFileSync(`${__dirname}/input/${file}.html`, 'utf8')
const getOutCss = (file) => fs.readFileSync(`${__dirname}/input/${file}-out.css`, 'utf8').trim()
const getOutHtml = (file) => fs.readFileSync(`${__dirname}/input/${file}-out.html`, 'utf8')

describe('styles-from-html', () => {
  it('should always return properties css and html', () => {
    const html = getHtml('no-style-tags')
    const styles = stylesFromHtml(html)
    styles.should.have.properties(['html', 'css'])
  })
  it('css should return an empty string if no style tags are found', () => {
    const html = getHtml('no-style-tags')
    const styles = stylesFromHtml(html)
    styles.css.should.have.length(0)
  })
  it('css should return an empty string if only empty style tags are found', () => {
    const html = getHtml('empty-style-tags')
    const styles = stylesFromHtml(html)
    styles.css.should.have.length(0)
  })
  it('should work with a single style tag', () => {
    const html = getHtml('single-style')
    const css = getOutCss('single-style')
    const styles = stylesFromHtml(html)
    styles.css.should.equal(css)
  })
  it('should concatenate rules with multiple style tags', () => {
    const html = getHtml('multiple-style')
    const css = getOutCss('multiple-style')
    const styles = stylesFromHtml(html)
    styles.css.should.equal(css)
  })
  it('should work no matter which attributes style tags have', () => {
    const html = getHtml('single-style-attr')
    const css = getOutCss('single-style')
    const styles = stylesFromHtml(html)
    styles.css.should.equal(css)
  })
  it('should return resulting html without style tags', () => {
    const html = getHtml('multiple-style')
    const outHtml = getOutHtml('multiple-style')
    const styles = stylesFromHtml(html)
    styles.html.should.equal(outHtml)
  })
  it('should return resulting html with newlines as-is', () => {
    const html = getHtml('newlines')
    const outHtml = getOutHtml('newlines')
    const styles = stylesFromHtml(html)
    styles.html.should.equal(outHtml)
  })
})
