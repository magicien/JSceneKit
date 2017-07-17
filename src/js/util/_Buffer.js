'use strict'

import BinaryParser from '../third_party/BinaryParser'
import { UnescapeUTF8, UnescapeUTF16LE } from '../third_party/ecl'

const _supportedEncoding = [
  'ascii',
  'utf8',
  'utf16le',
  'ucs2',
  'base64',
  'latin1',
  'binary',
  'hex'
]

/*global Buffer*/
let _Buffer = null
if(typeof Buffer !== 'undefined'){
  _Buffer = Buffer
}else{
  const allowException = true
  const _beParser = new BinaryParser(true, allowException)
  const _leParser = new BinaryParser(false, allowException)

  class Buffer {
    constructor() {
      this._data = null
    }

    static from(array, byteOffset = 0, length = null) {
      const buf = new Buffer()
      if(Array.isArray(array)){
        const ab = new ArrayBuffer(array)
        buf._data = new DataView(ab.buffer, byteOffset, length)
      }else if(array instanceof ArrayBuffer){
        buf._data = new DataView(array, byteOffset, length)
      }else if(array.buffer instanceof ArrayBuffer){
        buf._data = new DataView(array.buffer, byteOffset, length)
      }

      if(buf._data === null){
        throw new Error(`Buffer.from: unsupported data type: ${array}`)
      }

      return buf
    }

    readIntBE(offset, byteLength, noAssert = false) {
      switch(byteLength){
        case 1:
          return this.readInt8(offset, noAssert)
        case 2:
          return this.readInt16BE(offset, noAssert)
        case 4:
          return this.readInt32BE(offset, noAssert)
      }
      const data = this.slice(offset, offset + byteLength)._data
      return _beParser.decodeInt(data, byteLength * 8, true)
    }

    readIntLE(offset, byteLength, noAssert = false) {
      switch(byteLength){
        case 1:
          return this.readInt8(offset, noAssert)
        case 2:
          return this.readInt16LE(offset, noAssert)
        case 4:
          return this.readInt32LE(offset, noAssert)
      }
      const data = this.slice(offset, offset + byteLength)._data
      return _leParser.decodeInt(data, byteLength * 8, true)
    }

    readInt8(offset, noAssert = false) {
      return this._data.getInt8(offset)
    }

    readInt16BE(offset, noAssert = false) {
      return this._data.getInt16(offset, false)
    }

    readInt16LE(offset, noAssert = false) {
      return this._data.getInt16(offset, true)
    }

    readInt32BE(offset, noAssert = false) {
      return this._data.getInt32(offset, false)
    }

    readInt32LE(offset, noAssert = false) {
      return this._data.getInt32(offset, true)
    }

    readUIntBE(offset, byteLength, noAssert = false) {
      switch(byteLength){
        case 1:
          return this.readUInt8(offset, noAssert)
        case 2:
          return this.readUInt16BE(offset, noAssert)
        case 4:
          return this.readUInt32BE(offset, noAssert)
      }
      const data = this.slice(offset, offset + byteLength)._data
      return _beParser.decodeInt(data, byteLength * 8, false)

    }

    readUIntLE(offset, byteLength, noAssert = false) {
      switch(byteLength){
        case 1:
          return this.readUInt8(offset, noAssert)
        case 2:
          return this.readUInt16LE(offset, noAssert)
        case 4:
          return this.readUInt32LE(offset, noAssert)
      }
      const data = this.slice(offset, offset + byteLength)._data
      return _leParser.decodeInt(data, byteLength * 8, false)
    }

    readUInt8(offset, noAssert = false) {
      return this._data.getUint8(offset)
    }

    readUInt16BE(offset, noAssert = false) {
      return this._data.getUint16(offset, false)
    }

    readUInt16LE(offset, noAssert = false) {
      return this._data.getUint16(offset, true)
    }

    readUInt32BE(offset, noAssert = false) {
      return this._data.getUint32(offset, false)
    }

    readUInt32LE(offset, noAssert = false) {
      return this._data.getUint32(offset, true)
    }

    readFloatBE(offset, noAssert = false) {
      return this._data.getFloat32(offset, false)
    }

    readFloatLE(offset, noAssert = false) {
      return this._data.getFloat32(offset, true)
    }

    readDoubleBE(offset, noAssert = false) {
      return this._data.getFloat64(offset, false)
    }

    readDoubleLE(offset, noAssert = false) {
      return this._data.getFloat64(offset, true)
    }

    slice(start, end) {
      return new Buffer(this._data.buffer.slice(start, end))
    }

    toString(encoding, start, end) {
      if(!Buffer.isEncoding(encoding)){
        throw new Error(`unsupported encoding: ${encoding}`)
      }
      const data = new Uint8Array(this._data.buffer)
      if(encoding === 'binary'){
        return String.fromCharCode.apply('', data)
      }else if(encoding === 'ascii' || encoding === 'latin1'){
        const len = data.indexOf(0)
        const _data = data.slice(0, len)
        return String.fromCharCode.apply('', _data)
      }else if(encoding === 'hex'){
        return this._hex(data, false)
      }else if(encoding === 'base64'){
        const str = String.fromCharCode.apply('', data)
        if(typeof atob === 'function'){
          return atob(str)
        }
        throw new Error('needs atob() function to convert to base64')
      }

      const str = this._hex(data, true)
      if(encoding === 'utf8'){
        return UnescapeUTF8(str)
      }else if(encoding === 'utf16le' || encoding === 'ucs2'){
        return UnescapeUTF16LE(str)
      }
      throw new Error(`unsupported encoding: ${encoding}`)
    }

    _hex(data, usePercent) {
      const hexArray = data.map((num) => {
        if(num < 16){
          return '0' + num.toString(16)
        }
        return num.toString(16)
      })
      let pad = ''
      if(usePercent){
        pad = '%'
      }
      return hexArray.join(pad)
    }

    get length() {
      return this._data.byteLength
    }

    static isEncoding(encoding) {
      return _supportedEncoding.indexOf(encoding) >= 0
    }
  }
  _Buffer = Buffer
}

export default _Buffer
