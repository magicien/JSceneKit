'use strict'

import NSCoder from './NSCoder'
import NSData from './NSData'
import _File from '../util/_File'
import _FileReader from '../util/_FileReader'
import _BinaryReader from '../util/_BinaryReader'
import _ClassList from '../util/_ClassList'

/*global Buffer*/

const _classForKey = new Map()
const _loadingSymbol = Symbol('loading')

class _UID {
  constructor(unarchiver, value) {
    this._unarchiver = unarchiver
    this._value = value
  }
  get value() {
    return this._value
  }
  get obj() {
    return this._unarchiver._parsedObj.$objects[this._value]
  }
}


/**
 * NSKeyedUnarchiver, a concrete subclass of NSCoder, defines methods for decoding a set of named objects (and scalar values) from a keyed archive. Such archives are produced by instances of the NSKeyedArchiver class.
 * @access public
 * @extends {NSCoder}
 * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver
 */
export default class NSKeyedUnarchiver extends NSCoder {

  // Initializing a Keyed Unarchiver

  /**
   * Initializes the receiver for decoding an archive previously encoded by NSKeyedArchiver.
   * @access public
   * @constructor
   * @param {Data} data - An archive previously encoded by NSKeyedArchiver.
   * @desc When you finish decoding data, you should invoke finishDecoding(). This method throws an exception if data is not a valid archive.
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1410862-init
   */
  constructor(data = null) {
    super()

    // Unarchiving Data

    /**
     * Indicates whether the receiver requires all unarchived classes to conform to NSSecureCoding.
     * @type {boolean}
     * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1410824-requiressecurecoding
     */
    this._requiresSecureCoding = false


    // Managing the Delegate

    /**
     * The receiver’s delegate.
     * @type {?NSKeyedUnarchiverDelegate}
     * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1415688-delegate
     */
    this.delegate = null


    // Instance Properties

    /**
     * 
     * @type {NSCoder.DecodingFailurePolicy}
     * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1643164-decodingfailurepolicy
     */
    this._decodingFailurePolicy = null

    /**
     * @access private
     * @type {?_BinaryReader}
     */
    this._reader = null

    /**
     * @access private
     * @type {number}
     */
    this._offsetSize = 0

    /**
     * @access private
     * @type {number}
     */
    this._objCount = 0

    /**
     * @access private
     * @type {Object[]}
     */
    this._offsetArray = []

    /**
     * @access private
     * @type {Object}
     */
    this._parsedObj = {}

    /**
     * @access private
     * @type {Object[]}
     */
    this._dataObj = []

    this._resolveFunctions = []

    /**
     * @access private
     * @type {string}
     */
    this._filePath = null

    /**
     * @access private
     * @type {?Object}
     */
    this._refObj = null

    /**
     * @access private
     * @type {boolean}
     */
    this._decodingFinished = false

    this._promises = []

    if(data !== null){
      this._reader = new _BinaryReader(data, true, 'utf8')
      this._checkHeader()
      this._parsedObj = this._parseBPlist()
    }
  }

  copy() {
    const coder = new NSKeyedUnarchiver()
    coder._requiresSecureCoding = this._requiresSecureCoding
    coder.delegate = this.delegate
    coder._decodingFailurePolicy = this._decodingFailurePolicy
    coder._reader = this._reader
    coder._offsetSize = this._offsetSize
    coder._objCount = this._objCount
    coder._offsetArray = this._offsetArray
    coder._parsedObj = this._parsedObj
    coder._dataObj = this._dataObj
    coder._resolveFunctions = this._resolveFunctions
    coder._filePath = this._filePath
    coder._refObj = this._refObj
    coder._decodingFinished = this._decodingFinished
    return coder
  }



  // Unarchiving Data

  /**
   * Decodes and returns the object graph previously encoded by NSKeyedArchiver and stored in a given NSData object.
   * @access public
   * @param {Buffer} data - An object graph previously encoded by NSKeyedArchiver.
   * @param {?string} path - 
   * @returns {?Object} - 
   * @desc This method raises an invalidArchiveOperationException if data is not a valid archive.
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1413894-unarchiveobject
   */
  static unarchiveObjectWithData(data, path = null) {
    const unarchiver = new NSKeyedUnarchiver(data)
    unarchiver._filePath = path
    const topObjIndex = unarchiver._parsedObj.$top.root.value
    return unarchiver._parseClassAt(topObjIndex)
  }

  _checkHeader() {
    this._reader.seek(0)
    const header = this._reader.readString(8)
    if(header !== 'bplist00'){
      throw new Error(`unsupported file format: ${header}`)
    }
  }

  static _getBufferOfFile(path) {
    // TODO: use 'await' to return Buffer instead of Promise
    const promise = new Promise((resolve, reject) => {
      const file = new _File([], path)
      const reader = new _FileReader()
      reader.onload = () => {
        const data = reader.result
        resolve(data)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsBinaryString(file)
    })
    return promise
  }

  _parseBPlist() {
    const reader = this._reader

    // read basic info
    reader.seek(-26)
    const dataLen = reader.length
    const intSize = reader.readUnsignedByte()
    this._offsetSize = reader.readUnsignedByte()
    this._objCount = reader.readUnsignedLongLong()
    const topIndex = reader.readUnsignedLongLong()
    const tablePos = reader.readUnsignedLongLong()

    //console.log(`dataLen: ${dataLen}`)
    //console.log(`intSize: ${intSize}`)
    //console.log(`offsetSize: ${this._offsetSize}`)
    //console.log(`objCount: ${this._objCount}`)
    //console.log(`topIndex: ${topIndex}`)
    //console.log(`tablePos: ${tablePos}`)

    this._offsetArray = []
    let pos = tablePos
    reader.seek(pos)
    const objCount = this._objCount
    for(let i=0; i<objCount; i++){
      const offset = reader.readInteger(intSize)
      this._offsetArray.push(offset)
    }

    return this._parseObjAtIndex(topIndex)
  }

  _parseObjAtIndex(index) {
    return this._parseObj(this._offsetArray[index])
  }

  _parseObj(offset = null, signed = false) {
    const reader = this._reader
    if(offset !== null){
      reader.seek(offset)
    }
    const type = reader.readUnsignedByte()
    const type1 = type & 0xF0
    const type2 = type & 0x0F
    //console.log(`parseObj: type: ${type1} ${type2}`)
    if(type1 === 0x00){
      // null, boolean
      if(type2 === 0){
        //console.log('   type: null')
        return null
      }else if(type2 === 8){
        //console.log('   type: boolean')
        return false
      }else if(type2 === 9){
        //console.log('   type: boolean')
        return true
      }
    }else if(type1 === 0x10){
      // Int
      const len = Math.pow(2, type2)
      //console.log('   type: integer ' + len)
      return reader.readInteger(len, signed)
    }else if(type1 === 0x20){
      // Float
      const len = Math.pow(2, type2)
      if(len === 4){
        //console.log('   type: float')
        return reader.readFloat()
      }else if(len === 8){
        //console.log('   type: double')
        return reader.readDouble()
      }
      throw new Error(`unsupported float size: ${len}`)
    }else if(type1 === 0x30){
      // Date
      //console.log('   type: Date')
    }else if(type1 === 0x40){
      // Data
      const count = this._getDataSize(type2)
      //console.log(`   type: Data: length: ${count}`)
      return reader.readData(count)
    }else if(type1 === 0x50){
      // ASCII
      const count = this._getDataSize(type2)
      //console.log('   type: ascii ' + count)
      return reader.readString(count, 'ascii')
    }else if(type1 === 0x60){
      // UTF-16
      const count = this._getDataSize(type2)
      //console.log('   type: UTF-16 ' + count)
      return reader.readString(count, 'utf16be') // Big Endian might not be supported...
    }else if(type1 === 0x80){
      // UID
      const uid = reader.readInteger(type2 + 1, false)
      //console.log('   type: UID: ' + uid)
      return new _UID(this, uid)
    }else if(type1 === 0xA0){
      // Array
      const count = this._getDataSize(type2)
      //console.log('   type: array: ' + count)
      const arrIndex = []
      for(let i=0; i<count; i++){
        arrIndex.push(reader.readInteger(this._offsetSize, false))
      }
      const arr = arrIndex.map((index) => this._parseObjAtIndex(index))
      //console.log(`***arr.length: ${arr.length}`)
      return arr
    }else if(type1 === 0xC0){
      // Set
      const count = this._getDataSize(type2)
      const setIndex = []
      for(let i=0; i<count; i++){
        setIndex.push(reader.readInteger(this._offsetSize, false))
      }
      const arr = setIndex.map((index) => this._parseObjAtIndex(index))
      return new Set(arr)
    }else if(type1 === 0xD0){
      // Dictionary
      //console.log('   type: dictionary')
      const count = this._getDataSize(type2)
      const keyIndex = []
      const valueIndex = []
      for(let i=0; i<count; i++){
        keyIndex.push(reader.readInteger(this._offsetSize, false))
      }
      for(let i=0; i<count; i++){
        valueIndex.push(reader.readInteger(this._offsetSize, false))
      }
      const result = {}
      for(let i=0; i<count; i++){
        const key = this._parseObjAtIndex(keyIndex[i])
        //console.log('key: ' + key)
        const val = this._parseObjAtIndex(valueIndex[i])
        //console.log('val: ' + val)
        result[key] = val
      }
      return result
    }

    throw new Error(`unknown data type: ${type}`)
  }

  _getDataSize(type2) {
    let count = 0
    if(type2 !== 0x0F){
      count = type2
    }else{
      count = this._parseObj(null, false)
      if(typeof count !== 'number'){
        throw new Error('data size must be int type')
      }
    }
    return count
  }

  _parseClassAt(index) {
    const obj = this._parsedObj.$objects[index]
    if(this._dataObj[index] === _loadingSymbol){
      // it seems to be a reference loop; return Promise
      return new Promise((resolve, reject) => {
        if(typeof this._resolveFunctions[index] === 'undefined'){
          this._resolveFunctions[index] = []
        }
        this._resolveFunctions[index].push(resolve)
      })
    }else if(typeof this._dataObj[index] !== 'undefined'){
      return this._dataObj[index]
    }
    this._dataObj[index] = _loadingSymbol
    const data = this._parseClass(obj)
    this._dataObj[index] = data
    if(Array.isArray(this._resolveFunctions[index])){
      this._resolveFunctions[index].forEach((resolve) => {
        resolve(data)
      })
      delete(this._resolveFunctions[index])
    }
    return data
  }

  _parseClass(obj) {
    const className = obj.$class.obj.$classname
    //console.log(`parseClass ${className}`)
    const classObj = NSKeyedUnarchiver.classForClassName(className)
    if(classObj){
      const unarchiver = this.copy()
      unarchiver._refObj = obj
      return classObj.initWithCoder(unarchiver)
    }
    return null
  }

  /**
   * @access private
   * @param {Object} obj -
   * @param {Object} classObj -
   * @returns {Object} -
   */
  _parseStruct(obj, classObj) {
    if(typeof classObj._initWithData !== 'function'){
      throw new Error(`${classObj.prototype.constructor.name} class doesn't have _initWithData function`)
    }
    return classObj._initWithData(obj)
  }

  /**
   * Decodes and returns the object graph previously encoded by NSKeyedArchiver written to the file at a given path.
   * @access public
   * @param {string} path - A path to a file that contains an object graph previously encoded by NSKeyedArchiver.
   * @returns {Promise} - 
   * @desc This method raises an invalidArgumentException if the file at path does not contain a valid archive.
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1417153-unarchiveobject
   */
  static unarchiveObjectWithFile(path) {
    const promise = NSKeyedUnarchiver._getBufferOfFile(path)
      .then((data) => {
        return NSKeyedUnarchiver.unarchiveObjectWithData(data, path)
      })

    return promise
  }

  // Decoding Data

  /**
   * Returns a Boolean value that indicates whether the archive contains a value for a given key within the current decoding scope.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1413564-containsvalue
   */
  containsValueForKey(key) {
    return (typeof this._refObj[key] !== 'undefined')
  }

  /**
   * Decodes a Boolean value associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1413260-decodebool
   */
  decodeBoolForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    const value = this._getValueForKey(key)
    return !!value
  }

  /**
   * Decodes a stream of bytes associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @param {?UnsafeMutablePointer<Int>} lengthp - Upon return, contains the number of bytes returned.
   * @returns {?UnsafePointer<UInt8>} - 
   * @desc The returned value is a pointer to a temporary buffer owned by the receiver. The buffer goes away with the unarchiver, not the containing autorelease pool block. You must copy the bytes into your own buffer if you need the data to persist beyond the life of the receiver.
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1418091-decodebytes
   */
  decodeBytesForKeyReturnedLength(key, lengthp) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    return this._getValueForKey(key)
  }

  /**
   * Decodes a double-precision floating-point value associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {number} - 
   * @desc If the archived value was encoded as single-precision, the type is coerced. 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1414963-decodedouble
   */
  decodeDoubleForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    return this._getValueForKey(key)
  }

  /**
   * Decodes a single-precision floating-point value associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {number} - 
   * @desc If the archived value was encoded as double precision, the type is coerced, loosing precision. If the archived value is too large for single precision, the method raises an NSRangeException. 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1412252-decodefloat
   */
  decodeFloatForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    return this._getValueForKey(key)
  }
  
  /**
   * Decodes and returns an int value that was previously encoded with encodeCInt(_:forKey:), encode(_:forKey:), encode(_:forKey:), or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {number} - 
   * @desc If the encoded integer does not fit into the default integer size, the method raises an NSRangeException. Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/reference/foundation/nscoder/1411168-decodecint
   */
  decodeCIntForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    return this._getValueForKey(key)
  }

  /**
   * Decodes a 32-bit integer value associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {number} - 
   * @desc If the archived value was encoded with a different size but is still an integer, the type is coerced. If the archived value is too large to fit into a 32-bit integer, the method raises an NSRangeException. 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1416327-decodeint32
   */
  decodeInt32ForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    return this._getValueForKey(key)
  }

  /**
   * Decodes a 64-bit integer value associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {Int64} - 
   * @desc If the archived value was encoded with a different size but is still an integer, the type is coerced. 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1413288-decodeint64
   */
  decodeInt64ForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    return this._getValueForKey(key)
  }

  /**
   * Decodes and returns an object associated with a given key.
   * @access public
   * @param {string} key - A key in the archive within the current decoding scope. key must not be nil.
   * @returns {?Object} - 
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1409082-decodeobject
   */
  decodeObjectForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    const parsedObj = this._refObj[key]
    if(typeof parsedObj === 'string'){
      return parsedObj
    }else if(parsedObj instanceof _UID){
      const obj = parsedObj.obj
      if(typeof obj.$class !== 'undefined'){
        return this._parseClassAt(parsedObj.value)
      }
      return obj
    }
    throw new Error(`unknown data type for key ${key}: ${parsedObj}`)
  }

  /**
   * Returns a decoded property list for the specified key.
   * @access public
   * @param {string} key - The coder key.
   * @returns {?Object} - 
   * @desc This method calls decodeObjectOfClasses:forKey: with a set allowing only property list types.
   * @see https://developer.apple.com/reference/foundation/nscoder/1416284-decodepropertylist
   */
  decodePropertyListForKey(key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    const parsedObj = this.decodeObjectForKey(key)
    //console.log(`${key}: ${parsedObj.constructor.name}`)
    if(!(parsedObj instanceof Buffer)){
      throw new Error(`propertylist of key ${key} is not Buffer data`)
    }
    //console.log(`***header: ${parsedObj.toString('ascii', 0, 8)}`)
    //console.log(`length: ${parsedObj.length}`)
    //for(let i=0; i<8; i++){
    //  console.log(`${i}: ${parsedObj.readUIntBE(i, 1)}`)
    //}
    return NSKeyedUnarchiver.unarchiveObjectWithData(parsedObj, this._filePath)
  }

  decodeObjectOfTypeForKey(type, key) {
    if(this._decodingFinished){
      throw new Error(`can't decode '${key}' after finishDecoding() is called`)
    }
    const parsedObj = this._refObj[key]
    if(!(parsedObj instanceof Buffer)){
      throw new Error(`value is not Buffer data for key: ${key}`)
    }
    return this._parseStruct(parsedObj, type)
  }

  get _fileName() {
    if(this._filePath === null){
      return null
    }
    const paths = this._filePath.split('/')
    const fileName = paths.pop()
    return fileName
  }

  get _directoryPath() {
    if(this._filePath === null){
      return null
    }
    const paths = this._filePath.split('/')
    const fileName = paths.pop()
    const directoryPath = paths.join('/') + '/'
    return directoryPath
  }

  /**
   * Tells the receiver that you are finished decoding objects.
   * @access public
   * @returns {void}
   * @desc Invoking this method allows the receiver to notify its delegate and to perform any final operations on the archive. Once this method is invoked, the receiver cannot decode any further values.
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1418233-finishdecoding
   */
  finishDecoding() {
    this._decodingFinished = true
  }

  // Managing Class Names

  /**
   * Adds a class translation mapping to the receiver whereby objects encoded with a given class name are decoded as instances of a given class instead.
   * @access public
   * @param {?Object} cls - The class with which to replace instances of the class named codedName.
   * @param {string} codedName - 
   * @returns {void}
   * @desc When decoding, the receiver’s translation map overrides any translation that may also be present in the class’s map (see setClass(_:forClassName:)).
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1414659-setclass
   */
  static setClassForClassName(cls, codedName) {
    _classForKey.set(codedName, cls)
  }

  /**
   * Returns the class from which the receiver instantiates an encoded object with a given class name.
   * @access public
   * @param {string} codedName - 
   * @returns {?Object} - 
   * @desc The class’s separate translation map is not searched.
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1412476-class
   */
  static classForClassName(codedName) {
    const classObj = _classForKey.get(codedName)
    if(classObj){
      return classObj
    }
    return _ClassList.get(codedName)
  }

  // Type Methods

  /**
   * 
   * @access public
   * @param {NSData} data - 
   * @param {string} path -
   * @returns {void}
   * @throws {Error}
   * @see https://developer.apple.com/reference/foundation/nskeyedunarchiver/1413622-unarchivetoplevelobjectwithdata
   */
  static unarchiveTopLevelObjectWithData(data, path = null) {
    // what's different from unarchiveObjectWithData???
    return NSKeyedUnarchiver.unarchiveObjectWithData(data, path)
  }

  _getValueForKey(key) {
    const value = this._refObj[key]
    if(value instanceof _UID){
      return value.obj
    }
    return value
  }
}
