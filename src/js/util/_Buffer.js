'use strict'

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
    }

    readIntBE(offset, byteLength, noAssert = false) {
    }

    readIntLE(offset, byteLength, noAssert = false) {
    }

    readInt8(offset, noAssert = false) {
      return this.readIntBE(offset, 1, noAssert)
    }

    readInt16BE(offset, noAssert = false) {
      return this.readIntBE(offset, 2, noAssert)
    }

    readInt16LE(offset, noAssert = false) {
      return this.readIntLE(offset, 2, noAssert)
    }

    readInt32BE(offset, noAssert = false) {
      return this.readIntBE(offset, 4, noAssert)
    }

    readInt32LE(offset, noAssert = false) {
      return this.readIntLE(offset, 4, noAssert)
    }

    readUIntBE(offset, byteLength, noAssert = false) {
    }

    readUIntLE(offset, byteLength, noAssert = false) {
    }

    readUInt8(offset, noAssert = false) {
      return this.readUIntBE(offset, 1, noAssert)
    }

    readUInt16BE(offset, noAssert = false) {
      return this.readUIntBE(offset, 2, noAssert)
    }

    readUInt16LE(offset, noAssert = false) {
      return this.readUIntLE(offset, 2, noAssert)
    }

    readUInt32BE(offset, noAssert = false) {
      return this.readUIntBE(offset, 4, noAssert)
    }

    readUInt32LE(offset, noAssert = false) {
      return this.readUIntLE(offset, 4, noAssert)
    }

    readFloatBE(offset, noAssert = false) {
    }

    readFloatLE(offset, noAssert = false) {
    }

    readDoubleBE(offset, noAssert = false) {
    }

    readDoubleLE(offset, noAssert = false) {
    }

    slice(start, end) {
      return new Buffer(this._data.buffer.slice(start, end))
    }

    toString(encoding, start, end) {
      if(!Buffer.isEncoding(encoding)){
        throw new Error(`unsupported encoding: ${encoding}`)
      }

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
