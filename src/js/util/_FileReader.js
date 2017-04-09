'use strict'

import _File from './_File'
import fs from 'fs'

const EMPTY = 0
const LOADING = 1
const DONE = 2

export default class FileReader {
  /**
   * @access public
   * @constructor
   */
  constructor() {
    this.onabort = null
    this.onerror = null
    this.onload = null
    this.onloadstart = null

    /**
     * @type {function}
     */
    this.onloadend = null

    this.onprogress = null

    this._error = null
    this._readyState = EMPTY
    this._result = null
  }

  get error() {
    return this._error
  }

  get readyState() {
    return this._readyState
  }

  /**
   * @type {Blob|string}
   */
  get result() {
    return this._result
  }

  abort() {
  }

  /**
   * @access public
   * @param {Blob|File} blob -
   * @returns {void}
   */
  readAsArrayBuffer(blob) {
    this._read(blob, 'ArrayBuffer')
  }

  /**
   * @access public
   * @param {Blob|File} blob -
   * @returns {void}
   */
  readAsBinaryString(blob) {
    this._read(blob, 'BinaryString')
  }

  /**
   * @access public
   * @param {Blob|File} blob -
   * @param {string} [encoding = 'utf8'] -
   * @returns {void}
   */
  readAsText(blob, encoding = 'utf8') {
    this._read(blob, 'Text', encoding)
  }

  /**
   * @access public
   * @param {Blob|File} blob -
   * @returns {void}
   */
  readAsDataURL(blob) {
    this._read(blob, 'DataURL')
  }

  _read(blob, type, encoding = null){
    if(this._readyState === LOADING){
      throw new Error('InvalidStateError')
    }
    this._readyState = LOADING

    if(blob instanceof _File){
      fs.readFile(blob.name, encoding, (err, data) => {
        if(err){
          this._error = err
          if(this.onerror !== null){
            this.onerror()
          }
          if(this.onloadend !== null){
            this.onloadend()
          }
          return
        }

        this._readyState = DONE

        switch(type){
          case 'ArrayBuffer':
            this._result = data
            break
          case 'BinaryString':
            this._result = data
            break
          case 'Text':
            this._result = data
            break
          case 'DataURL':
            this._result = data
            break
          default:
            throw new Error('unknown return type')
        }

        if(this._readyState !== LOADING){
          if(this.onload !== null){
            this.onload()
          }
          if(this.onloadend !== null){
            this.onloadend()
          }
        }
      })
    }
  }
}

