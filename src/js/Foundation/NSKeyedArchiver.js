'use strict'

import NSCoder from './NSCoder'
//import NSMutableData from './NSMutableData'
//import NSKeyedArchiverDelegate from '../undefined/NSKeyedArchiverDelegate'


/**
 * NSKeyedArchiver, a concrete subclass of NSCoder, provides a way to encode objects (and scalar values) into an architecture-independent format that can be stored in a file. When you archive a set of objects, the class information and instance variables for each object are written to the archive. NSKeyedArchiver’s companion class, NSKeyedUnarchiver, decodes the data in an archive and creates a set of objects equivalent to the original set.
 * @access public
 * @extends {NSCoder}
 * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver
 */
export default class NSKeyedArchiver extends NSCoder {
  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1642790-init
   */
  constructor() {
    super()

    // Archiving Data

    /**
     * The format in which the receiver encodes its data.
     * @type {PropertyListSerialization.PropertyListFormat}
     * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1417520-outputformat
     */
    this.outputFormat = null

    /**
     * Indicates whether the receiver requires all archived classes to conform to NSSecureCoding.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1417084-requiressecurecoding
     */
    this.requiresSecureCoding = false


    // Managing the Delegate

    /**
     * The archiver’s delegate.
     * @type {?NSKeyedArchiverDelegate}
     * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1412809-delegate
     */
    this.delegate = null


    // Instance Properties

    this._encodedData = null
  }

  // Initializing an NSKeyedArchiver Object

  /**
   * Returns the receiver, initialized for encoding an archive into a given a mutable-data object.
   * @access public
   * @param {NSMutableData} data - The mutable-data object into which the archive is written.
   * @returns {NSKeyedArchiver}
   * @desc When you finish encoding data, you must invoke finishEncoding() at which point data is filled. The format of the receiver is NSPropertyListBinaryFormat_v1_0.
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1409579-init
   */
  //initForWritingWith(data) {
  static archiverForWritingWithData(data) {
    const instance = new NSKeyedArchiver()

    // TODO: implement

    return instance
  }

  // Archiving Data

  /**
   * Returns an NSData object containing the encoded form of the object graph whose root object is given.
   * @access public
   * @param {Object} rootObject - 
   * @returns {Data} - 
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1413189-archiveddata
   */
  static archivedDataWithRootObject(rootObject) {
    return null
  }

  /**
   * Archives an object graph rooted at a given object by encoding it into a data object then atomically writes the resulting data object to a file at a given path, and returns a Boolean value that indicates whether the operation was successful.
   * @access public
   * @param {Object} rootObject - 
   * @param {string} path - The path of the file in which to write the archive.
   * @returns {boolean} - 
   * @desc The format of the archive is NSPropertyListBinaryFormat_v1_0.
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1410621-archiverootobject
   */
  static archiveRootObjectToFile(rootObject, path) {
    return false
  }

  /**
   * Instructs the receiver to construct the final data stream.
   * @access public
   * @returns {void}
   * @desc No more values can be encoded after this method is called. You must call this method when finished.
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1413904-finishencoding
   */
  finishEncoding() {
  }

  // Encoding Data and Objects

  /**
   * Encodes a given float value and associates it with a given key.
   * @access public
   * @param {number} realv - The value to encode.
   * @param {string} key - The key with which to associate realv. This value must not be nil.
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1416972-encode
   */
  encodeForKey(realv, key) {
  }

  /**
   * Encodes a given number of bytes from a given C array of bytes and associates them with the a given key.
   * @access public
   * @param {?UnsafePointer<UInt8>} bytesp - A C array of bytes to encode.
   * @param {number} lenv - The number of bytes from bytesp to encode.
   * @param {string} key - The key with which to associate the encoded value. This value must not be nil.
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1417696-encodebytes
   */
  encodeBytesLengthForKey(bytesp, lenv, key) {
  }

  /**
   * Encodes a reference to a given object and associates it with a given key only if it has been unconditionally encoded elsewhere in the archive with encode(_:forKey:).
   * @access public
   * @param {?Object} objv - The object to encode. 
   * @param {string} key - The key with which to associate the encoded value. This value must not be nil.
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1413677-encodeconditionalobject
   */
  encodeConditionalObjectForKey(objv, key) {
  }

  // Managing Classes and Class Names

  /**
   * Adds a class translation mapping to the receiver whereby instances of of a given class are encoded with a given class name instead of their real class names.
   * @access public
   * @param {?string} codedName - 
   * @param {Object} cls - The class for which to set up a translation mapping.
   * @returns {void}
   * @desc When encoding, the receiver’s translation map overrides any translation that may also be present in the class’s map.
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1414746-setclassname
   */
  static setClassNameFor(codedName, cls) {
  }

  /**
   * Returns the class name with which the receiver encodes instances of a given class.
   * @access public
   * @param {Object} cls - The class for which to determine the translation mapping.
   * @returns {?string} - 
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1407245-classname
   */
  static classNameFor(cls) {
    return null
  }

  
  // Instance Properties
  /**
   * Returns the encoded data for the archiver.
   * @type {Data}
   * @desc If encoding has not yet finished, invoking this property calls finishEncoding() and returns the data. If you initialized the keyed archiver with a specific mutable data instance, then that data is returned by the property after finishEncoding() is called.
   * @see https://developer.apple.com/documentation/foundation/nskeyedarchiver/1643042-encodeddata
   */
  get encodedData() {
    return this._encodedData
  }
}
