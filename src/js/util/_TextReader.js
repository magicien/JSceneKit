'use strict'

import {UnescapeSJIS, UnescapeEUCJP, UnescapeJIS7, UnescapeJIS8, 
        UnescapeUnicode, UnescapeUTF7, UnescapeUTF8, UnescapeUTF16LE} from '../third_party/ecl'
/*global Buffer*/

const _integerPattern = new RegExp(/^(-|\+)?\d+;?/)
const _floatPattern = new RegExp(/^(-|\+)?(\d)*\.(\d)*;?/)
const _wordPattern = new RegExp(/^\w+/)
const _linePattern = new RegExp(/^.*\n/)

/**
 * TextReader class
 * @access public
 */
export default class TextReader {
  /**
   * constructor
   * @access public
   * @constructor
   * @param {Buffer|ArrayBuffer} data -
   * @param {string} encoding -
   */
  constructor(data, encoding = 'utf-8') {
    /**
     * @access private
     * @type {number}
     */
    this._pos = 0

    this._partialText = ''
    this._partialOffset = 0
    this._partialStep = 200
    this._partialMinLength = 100

    /**
     * @access private
     * @type {boolean}
     */
    this._eof = true

    /**
     *
     * @access public
     * @type {Buffer}
     */
    this.buffer = null

    if(data instanceof Buffer){
      this.buffer = data
    }else{
      this.buffer = Buffer.from(data)
    }

    /**
     *
     * @access public
     * @type {boolean}
     */
    //this.bigEndian = bigEndian

    /**
     *
     * @access public
     * @type {string}
     */
    this.encoding = encoding

    // prepare buffered text
    this._addPartialText()
  }

  /**
   * @access public
   * @param {number} length - length of data to skip
   * @param {boolean} noAssert -
   * @returns {void}
   */
  skip(length, noAssert = false) {
    this._moveIndex(length)
    if(!noAssert){
      this._check()
    }
  }

  /**
   *
   * @access public
   * @param {number} length - length of data to read
   * @param {?string} [encoding = null] -
   * @returns {string} -
   */
  readString(length, encoding = null) {
    const str = this._partialText.substring(0, length)

    this._moveIndex(str.length)
  }

  /**
   *
   * @access public
   * @param {number} length - 
   * @param {boolean} signed -
   * @returns {number} -
   */
  readInteger(length, signed) {
    const str = this._getString(_integerPattern)
    const val = parseInt(str[0], 10)
    return val
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readUnsignedByte() {
    return this.readInteger(1, false)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readUnsignedShort() {
    return this.readInteger(2, false)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readUnsignedInt() {
    return this.readInteger(4, false)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readInt() {
    return this.readInteger(4, true)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readFloat() {
    const str = this._getString(_floatPattern)
    const val = parseFloat(str[0])
    return val
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readDouble() {
    return this.readFloat()
  }

  /**
   *
   * @access public
   * @param {number} length -
   * @returns {Buffer} -
   */
  readData(length) {
    const start = this._pos
    this._pos += length
    return this.buffer.slice(start, this._pos)
  }

  readWord() {
    const str = this._getString(_wordPattern)
    return (str !== null ? str[0] : null)
  }

  readLine() {
    const str = this._getString(_linePattern)
    return (str !== null ? str[0] : null)
  }

  readPattern(pattern) {
    return this._getString(pattern)
  }

  /**
   *
   * @access private
   * @returns {void}
   */
  _check() {
  }

  /**
   *
   * @access private
   * @param {number[]} data - length of data to convert
   * @param {?string} [encoding = null] -
   * @returns {string} -
   */
  _convert(data, encoding) {
    const length = data.length
    let escapeString = ''
    for(let i=0; i<length; i++){
      const charCode = data.charCodeAt(i)
      if(charCode === 0){
        break
      }
      else if(charCode < 16){
        escapeString += '%0' + charCode.toString(16)
      }else{
        escapeString += '%' + charCode.toString(16)
      }
    }
      
    if(encoding === 'sjis'){
      return UnescapeSJIS(escapeString)
    }else if(encoding === 'euc-jp'){
      return UnescapeEUCJP(escapeString)
    }else if(encoding === 'jis-7'){
      return UnescapeJIS7(escapeString)
    }else if(encoding === 'jis-8'){
      return UnescapeJIS8(escapeString)
    }else if(encoding === 'unicode'){
      return UnescapeUnicode(escapeString)
    }else if(encoding === 'utf7'){
      return UnescapeUTF7(escapeString)
    }else if(encoding === 'utf-8'){
      return UnescapeUTF8(escapeString)
    }else if(encoding === 'utf-16'){
      return UnescapeUTF16LE(escapeString)
    }

    throw new Error(`unsupported encoding: ${encoding}`)
  }

  getAvailableDataLength() {
    return this.buffer.length - this._pos
  }

  /**
   *
   * @access private
   * @param {number} len -
   * @returns {void}
   */
  _moveIndex(len) {
    this._partialText = this._partialText.substring(len)
    if(this._partialText.length < this._partialMinLength){
      this._addPartialText()
    }
  }

  _skipSpace() {
    let i = 0
    let code = this._partialText.charCodeAt(i)

    //  9: Horizontal Tab
    // 10: Line Feed
    // 11: Vertical Tab
    // 12: New Page
    // 13: Carriage Return
    // 32: Space
    while(code === 32 || (9 <= code && code <= 13)){
      i++
      code = this._partialText.charCodeAt(i)

      if(i >= this._partialText.length){
        this._addPartialText()
      }
    }
    if(i>0){
      this._moveIndex(i)
    }
  }

  _addPartialText() {
    if(this._partialOffset >= this.buffer.length){
      return
    }

    let newOffset = this._partialOffset + this._partialStep
    if(newOffset > this.buffer.length){
      newOffset = this.buffer.length
    }

    if(Buffer.isEncoding(this.encoding)){
      this._partialText += this.buffer.toString(this.encoding, this._partialOffset, newOffset)
    }else{
      const data = this.buffer.toString('binary', this._partialOffset, newOffset)
      this._partialText += this._convert(data, this.encoding)
    }
    this._partialOffset = newOffset
  }

  _getString(pattern) {
    this._skipSpace()

    const str = this._partialText.match(pattern)
    if(str === null){
      return null
    }

    this._moveIndex(str[0].length)

    return str
  }
}

