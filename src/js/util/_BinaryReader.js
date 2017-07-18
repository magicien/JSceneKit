'use strict'

import {
  UnescapeSJIS, UnescapeEUCJP, UnescapeJIS7, UnescapeJIS8, 
  UnescapeUnicode, UnescapeUTF7, UnescapeUTF8, UnescapeUTF16LE
} from '../third_party/ecl'
/*global Buffer*/

/**
 * BinaryReader class
 * @access public
 */
export default class _BinaryReader {
  /**
   * constructor
   * @param {Buffer|ArrayBuffer} data - 
   * @param {boolean} bigEndian -
   * @param {string} encoding -
   * @constructor
   */
  constructor(data, bigEndian = false, encoding = '') {
    /**
     * @access private
     * @type {number}
     */
    this._pos = 0

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
    }else if(typeof data === 'string'){
      this.buffer = Buffer.from(data, 'binary')
    }else{
      this.buffer = Buffer.from(data)
    }

    /**
     *
     * @access public
     * @type {boolean}
     */
    this.bigEndian = bigEndian

    /**
     *
     * @access public
     * @type {string}
     */
    this.encoding = encoding
  }

  /**
   * @access public
   * @param {number} length - length of data to skip
   * @param {boolean} noAssert -
   * @returns {void}
   */
  skip(length, noAssert = false) {
    this._pos += length
    if(!noAssert){
      this._check()
    }
  }

  /**
   * @access public
   * @param {number} pos -
   * @returns {void}
   */
  seek(pos) {
    if(pos < 0){
      this._pos = this.buffer.length + pos
    }else{
      this._pos = pos
    }

    if(this._pos < 0){
      this._pos = 0
    }else if(this._pos > this.buffer.length){
      this._pos = this.buffer.length
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
    const start = this._pos
    this._pos += length
    const _encoding = encoding || this.encoding || 'sjis'
    //if(_Buffer.isEncoding(_encoding)){
    if(Buffer.isEncoding(_encoding)){
      return this.buffer.toString(_encoding, start, this._pos)
    }

    const data = this.buffer.toString('binary', start, this._pos)
    return this._convert(data, _encoding)
  }

  /**
   *
   * @access public
   * @param {number} length - 
   * @param {boolean} signed -
   * @returns {number} -
   */
  readInteger(length, signed) {
    const start = this._pos
    this._pos += length

    // big endian
    if(this.bigEndian){
      if(signed){
        return this.buffer.readIntBE(start, length)
      }
      return this.buffer.readUIntBE(start, length)
    }

    // little endian
    if(signed){
      return this.buffer.readIntLE(start, length)
    }
    return this.buffer.readUIntLE(start, length)
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
  readUnsignedLongLong() {
    return this.readInteger(8, false)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readByte() {
    return this.readInteger(1, true)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readShort() {
    return this.readInteger(2, true)
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
  readLongLong() {
    return this.readInteger(8, true)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readFloat() {
    const start = this._pos
    this._pos += 4
    if(this.bigEndian){
      return this.buffer.readFloatBE(start)
    }

    return this.buffer.readFloatLE(start)
  }

  /**
   *
   * @access public
   * @returns {number} -
   */
  readDouble() {
    const start = this._pos
    this._pos += 8
    if(this.bigEndian){
      return this.buffer.readDoubleBE(start)
    }

    return this.buffer.readDoubleLE(start)
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

  /**
   *
   * @access private
   * @returns {void}
   */
  _check() {
    if(this._pos >= this.buffer.length){
      throw new Error(`_BinaryReader: buffer out of range (${this._pos} >= ${this.buffer.length})`)
    }
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

  get length() {
    return this.buffer.length
  }
}
