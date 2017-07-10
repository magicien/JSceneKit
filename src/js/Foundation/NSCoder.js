'use strict'

import NSObject from '../ObjectiveC/NSObject'
import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
import CGVector from '../CoreGraphics/CGVector'

const _DecodingFailurePolicy = {
  raiseException: Symbol('raiseException'),
  setErrorAndReturn: Symbol('setErrorAndReturn')
}

/**
 * The NSCoder abstract class declares the interface used by concrete subclasses to transfer objects and other values between memory and some other format. This capability provides the basis for archiving (where objects and data items are stored on disk) and distribution (where objects and data items are copied between different processes or threads). The concrete subclasses provided by Foundation for these purposes are NSArchiver, NSUnarchiver, NSKeyedArchiver, NSKeyedUnarchiver, and NSPortCoder. Concrete subclasses of NSCoder are referred to in general as coder classes, and instances of these classes as coder objects (or simply coders). A coder object that can only encode values is referred to as an encoder object, and one that can only decode values as a decoder object.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/foundation/nscoder
 */
export default class NSCoder extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Inspecting a Coder

    this._allowsKeyedCoding = false

    // Secure Coding

    this._requiresSecureCoding = false
    this._allowedClasses = null

    // Getting Version Information

    this._systemVersion = 0

    // Instance Properties

    this._decodingFailurePolicy = null
    this._error = null
  }

  static get DecodingFailurePolicy() {
    return _DecodingFailurePolicy
  }

  // Inspecting a Coder

  /**
   * Returns a Boolean value that indicates whether an encoded value is available for a string.
   * @access public
   * @param {string} key - 
   * @returns {boolean} - 
   * @desc Subclasses must override this method if they perform keyed coding. The string is passed as key.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1416125-containsvalue
   */
  containsValueForKey(key) {
    return false
  }
  /**
   * A Boolean value that indicates whether the receiver supports keyed coding of objects.
   * @type {boolean}
   * @desc false by default. Concrete subclasses that support keyed coding, such as NSKeyedArchiver, need to override this property to return true.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1417541-allowskeyedcoding
   */
  get allowsKeyedCoding() {
    return this._allowsKeyedCoding
  }

  // Encoding General Data

  /**
   * Encodes an array of count items, whose Objective-C type is given by itemType.
   * @access public
   * @param {UnsafePointer<Int8>} type - 
   * @param {number} count - 
   * @param {UnsafeRawPointer} array - 
   * @returns {void}
   * @desc The values are encoded from the buffer beginning at address. itemType must contain exactly one type code. NSCoder’s implementation invokes encodeValue(ofObjCType:at:) to encode the entire array of items. Subclasses that implement the encodeValue(ofObjCType:at:) method do not need to override this method.This method must be matched by a subsequent decodeArray(ofObjCType:count:at:) message.For information on creating an Objective-C type code suitable for itemType, see Type Encodings.Special ConsiderationsYou should not use this method to encode C arrays of Objective-C objects. See decodeArray(ofObjCType:count:at:) for more details.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1417865-encodearray
   */
  encodeArrayOfObjCTypeAt(type, count, array) {
  }

  /**
   * Encodes the object objv and associates it with the string key.
   * @access public
   * @param {?Object} objv - 
   * @param {string} key - 
   * @returns {void}
   * @desc Subclasses must override this method to identify multiple encodings of objv and encode a reference to objv instead. For example, NSKeyedArchiver detects duplicate objects and encodes a reference to the original object rather than encode the same object twice.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1411568-encode
   */
  encodeForKey(objv, key) {
  }

  /**
   * Can be overridden by subclasses to encode object so that a copy, rather than a proxy, is created upon decoding.
   * @access public
   * @param {?Object} anObject - 
   * @returns {void}
   * @desc NSCoder’s implementation simply invokes encode(_:).This method must be matched by a corresponding decodeObject() message.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1418225-encodebycopyobject
   */
  encodeBycopyObject(anObject) {
  }

  /**
   * Can be overridden by subclasses to encode object so that a proxy, rather than a copy, is created upon decoding.
   * @access public
   * @param {?Object} anObject - 
   * @returns {void}
   * @desc NSCoder’s implementation simply invokes encode(_:).This method must be matched by a corresponding decodeObject() message.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1416279-encodebyrefobject
   */
  encodeByrefObject(anObject) {
  }

  /**
   * Encodes a buffer of data whose types are unspecified.
   * @access public
   * @param {?UnsafeRawPointer} byteaddr - 
   * @param {number} length - 
   * @returns {void}
   * @desc The buffer to be encoded begins at address, and its length in bytes is given by numBytes.This method must be matched by a corresponding decodeBytes(withReturnedLength:) message.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1411664-encodebytes
   */
  encodeBytes(byteaddr, length) {
  }

  /**
   * Encodes a buffer of data, bytesp, whose length is specified by lenv, and associates it with the string key.
   * @access public
   * @param {?UnsafePointer<UInt8>} bytesp - 
   * @param {number} lenv - 
   * @param {string} key - 
   * @returns {void}
   * @desc Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1413078-encodebytes
   */
  encodeBytesLengthForKey(bytesp, lenv, key) {
  }

  /**
   * Can be overridden by subclasses to conditionally encode object, preserving common references to that object.
   * @access public
   * @param {?Object} object - 
   * @returns {void}
   * @desc In the overriding method, object should be encoded only if it’s unconditionally encoded elsewhere (with any other encode...Object: method).This method must be matched by a subsequent decodeObject() message. Upon decoding, if object was never encoded unconditionally, decodeObject returns nil in place of object. However, if object was encoded unconditionally, all references to object must be resolved.NSCoder’s implementation simply invokes encode(_:). 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1415196-encodeconditionalobject
   */
  encodeConditionalObject(object) {
  }

  /**
   * Conditionally encodes a reference to objv and associates it with the string key only if objv has been unconditionally encoded with encode(_:forKey:).
   * @access public
   * @param {?Object} objv - 
   * @param {string} key - 
   * @returns {void}
   * @desc Subclasses must override this method if they support keyed coding.The encoded object is decoded with the decodeObject(forKey:) method. If objv was never encoded unconditionally, decodeObject(forKey:) returns nil in place of objv.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1413918-encodeconditionalobject
   */
  encodeConditionalObjectForKey(objv, key) {
  }

  /**
   * Encodes size.
   * @access public
   * @param {CGSize} size - 
   * @returns {void}
   * @desc NSCoder’s implementation invokes encodeValue(ofObjCType:at:) to encode size.This method must be matched by a subsequent decodeSize() message.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391291-encode
   */
  encode(size) {
  }

  /**
   * Encodes intv and associates it with the string key.
   * @access public
   * @param {number} intv - 
   * @param {string} key - 
   * @returns {void}
   * @desc Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1413906-encodecint
   */
  encodeCIntForKey(intv, key) {
  }

  /**
   * Encodes the property list aPropertyList.
   * @access public
   * @param {Object} aPropertyList - 
   * @returns {void}
   * @desc NSCoder’s implementation invokes encodeValue(ofObjCType:at:) to encode aPropertyList.This method must be matched by a subsequent decodePropertyList() message.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1410643-encodepropertylist
   */
  encodePropertyList(aPropertyList) {
  }

  /**
   * Can be overridden by subclasses to encode an interconnected group of Objective-C objects, starting with rootObject.
   * @access public
   * @param {Object} rootObject - 
   * @returns {void}
   * @desc NSCoder’s implementation simply invokes encode(_:).This method must be matched by a subsequent decodeObject() message.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1409439-encoderootobject
   */
  encodeRootObject(rootObject) {
  }

  /**
   * Must be overridden by subclasses to encode a single value residing at address, whose Objective-C type is given by valueType.
   * @access public
   * @param {UnsafePointer<Int8>} type - 
   * @param {UnsafeRawPointer} addr - 
   * @returns {void}
   * @desc  valueType must contain exactly one type code.This method must be matched by a subsequent decodeValue(ofObjCType:at:) message.For information on creating an Objective-C type code suitable for valueType, see Type Encodings.Special ConsiderationsYou should not use this method to encode of Objective-C objects. See decodeArray(ofObjCType:count:at:) for more details.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1414648-encodevalue
   */
  encodeValueOfObjCTypeAt(type, addr) {
  }

  // Decoding General Data

  /**
   * Decodes an array of count items, whose Objective-C type is given by itemType.
   * @access public
   * @param {UnsafePointer<Int8>} itemType - 
   * @param {number} count - 
   * @param {Object} array - 
   * @returns {void}
   * @desc The items are decoded into the buffer beginning at address, which must be large enough to contain them all. itemType must contain exactly one type code. NSCoder’s implementation invokes decodeValue(ofObjCType:at:) to decode the entire array of items.This method matches an encodeArray(ofObjCType:count:at:) message used during encoding.For information on creating an Objective-C type code suitable for itemType, see Type Encodings.Special ConsiderationsYou should not use this method to decode C arrays of Objective-C objects. For historical reasons, returned objects will have an additional ownership reference which you can only relinquish using CFRelease.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1408354-decodearray
   */
  decodeArrayOfObjCTypeAt(itemType, count, array) {
  }

  /**
   * Decodes and returns a boolean value that was previously encoded with encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {boolean} - 
   * @desc Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1409293-decodebool
   */
  decodeBoolForKey(key) {
    return false
  }

  /**
   * Decodes a buffer of data that was previously encoded with encodeBytes(_:length:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @param {?UnsafeMutablePointer<Int>} lengthp - 
   * @returns {?UnsafePointer<UInt8>} - 
   * @desc  The buffer’s length is returned by reference in lengthp. The returned bytes are immutable. Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1411987-decodebytes
   */
  decodeBytesForKeyReturnedLength(key, lengthp) {
    return null
  }

  /**
   * Decodes a buffer of data whose types are unspecified.
   * @access public
   * @param {UnsafeMutablePointer<Int>} lengthp - 
   * @returns {?Object} - 
   * @desc NSCoder’s implementation invokes decodeValue(ofObjCType:at:) to decode the data as a series of bytes, which this method then places into a buffer and returns. The buffer’s length is returned by reference in numBytes. If you need the bytes beyond the scope of the current @autoreleasepool block, you must copy them.This method matches an encodeBytes(_:length:) message used during encoding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1415441-decodebytes
   */
  decodeBytesWithReturnedLength(lengthp) {
    return null
  }

  /**
   * Decodes and returns an NSData object that was previously encoded with encode(_:). Subclasses must override this method.
   * @access public
   * @returns {?Data} - 
   * @desc The implementation of your overriding method must match the implementation of your encode(_:) method. For example, a typical encode(_:) method encodes the number of bytes of data followed by the bytes themselves. Your override of this method must read the number of bytes, create an NSData object of the appropriate size, and decode the bytes into the new NSData object. 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1409876-decodedata
   */
  decodeData() {
    return null
  }

  /**
   * Decodes and returns a double value that was previously encoded with either encode(_:forKey:) or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {number} - 
   * @desc Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1409374-decodedouble
   */
  decodeDoubleForKey(key) {
    return 0
  }

  /**
   * Decodes and returns a float value that was previously encoded with encode(_:forKey:) or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {number} - 
   * @desc If the value was encoded as a double, the extra precision is lost. If the encoded real value does not fit into a float, the method raises an NSRangeException. Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1408104-decodefloat
   */
  decodeFloatForKey(key) {
    return 0
  }

  /**
   * Decodes and returns an int value that was previously encoded with encodeCInt(_:forKey:), encode(_:forKey:), encode(_:forKey:), or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {number} - 
   * @desc If the encoded integer does not fit into the default integer size, the method raises an NSRangeException. Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1411168-decodecint
   */
  decodeCIntForKey(key) {
    return 0
  }

  /**
   * Decodes and returns an NSInteger value that was previously encoded with encodeCInt(_:forKey:), encode(_:forKey:), encode(_:forKey:), or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {number} - 
   * @desc If the encoded integer does not fit into the NSInteger size, the method raises an NSRangeException. Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1409246-decodeinteger
   */
  decodeIntegerForKey(key) {
    return 0
  }

  /**
   * Decodes and returns a 32-bit integer value that was previously encoded with encodeCInt(_:forKey:), encode(_:forKey:), encode(_:forKey:), or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {number} - 
   * @desc If the encoded integer does not fit into a 32-bit integer, the method raises an NSRangeException. Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1408918-decodeint32
   */
  decodeInt32ForKey(key) {
    return 0
  }

  /**
   * Decodes and returns a 64-bit integer value that was previously encoded with encodeCInt(_:forKey:), encode(_:forKey:), encode(_:forKey:), or encode(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {Int64} - 
   * @desc Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1407878-decodeint64
   */
  decodeInt64ForKey(key) {
    return null
  }

  /**
   * Decodes an Objective-C object that was previously encoded with any of the encode...Object: methods.
   * @access public
   * @returns {?Object} - 
   * @desc NSCoder’s implementation invokes decodeValue(ofObjCType:at:) to decode the object data.Subclasses may need to override this method if they override any of the corresponding encode...Object: methods. For example, if an object was encoded conditionally using the encodeConditionalObject(_:) method, this method needs to check whether the object had actually been encoded.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1414478-decodeobject
   */
  decodeObject() {
    return null
  }

  /**
   * Decodes and returns an Objective-C object that was previously encoded with encode(_:forKey:) or encodeConditionalObject(_:forKey:) and associated with the string key.
   * @access public
   * @param {string} key - 
   * @returns {?Object} - 
   * @desc Subclasses must override this method if they perform keyed coding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1418185-decodeobject
   */
  decodeObjectForKey(key) {
    return null
  }

  /**
   * Decodes and returns an NSPoint structure that was previously encoded with encode(_:).
   * @access public
   * @returns {CGPoint} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391189-decodepoint
   */
  decodePoint() {
    return null
  }

  /**
   * Decodes and returns an NSPoint structure that was previously encoded with encode(_:forKey:).
   * @access public
   * @param {string} key - 
   * @returns {CGPoint} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391214-decodepoint
   */
  decodePointForKey(key) {
    return null
  }

  /**
   * Decodes a property list that was previously encoded with encodePropertyList(_:).
   * @access public
   * @returns {?Object} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1411916-decodepropertylist
   */
  decodePropertyList() {
    return null
  }

  /**
   * Decodes and returns an NSRect structure that was previously encoded with encode(_:).
   * @access public
   * @returns {CGRect} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391269-decoderect
   */
  decodeRect() {
    return null
  }

  /**
   * Decodes and returns an NSRect structure that was previously encoded with encode(_:forKey:).
   * @access public
   * @param {string} key - 
   * @returns {CGRect} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391116-decoderect
   */
  decodeRectForKey(key) {
    return null
  }

  /**
   * Decodes and returns an NSSize structure that was previously encoded with encode(_:).
   * @access public
   * @returns {CGSize} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391144-decodesize
   */
  decodeSize() {
    return null
  }

  /**
   * Decodes and returns an NSSize structure that was previously encoded with encode(_:forKey:).
   * @access public
   * @param {string} key - 
   * @returns {CGSize} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1391253-decodesize
   */
  decodeSizeForKey(key) {
    return null
  }

  /**
   * Decodes a single value, whose Objective-C type is given by valueType.
   * @access public
   * @param {UnsafePointer<Int8>} type - 
   * @param {Object} data - 
   * @returns {void}
   * @desc  valueType must contain exactly one type code, and the buffer specified by data must be large enough to hold the value corresponding to that type code. For information on creating an Objective-C type code suitable for valueType, see Type Encodings.Subclasses must override this method and provide an implementation to decode the value. In your overriding implementation, decode the value into the buffer beginning at data.This method matches an encodeValue(ofObjCType:at:) message used during encoding.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1417159-decodevalue
   */
  decodeValueOfObjCTypeAt(type, data) {
  }

  /**
   * Returns a decoded property list for the specified key.
   * @access public
   * @param {string} key - The coder key.
   * @returns {?Object} - 
   * @desc This method calls decodeObjectOfClasses:forKey: with a set allowing only property list types.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1416284-decodepropertylist
   */
  decodePropertyListForKey(key) {
    return null
  }

  // Decoding Geometry-Based Data

  /**
   * Decodes and returns the CGPoint structure associated with the specified key in the receiver’s archive. 
   * @access public
   * @param {string} key - The key that identifies the point.
   * @returns {CGPoint} - 
   * @desc Use this method to decode a point that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624523-decodecgpoint
   */
  decodeCGPointForKey(key) {
    return null
  }

  /**
   * Decodes and returns the CGRect structure associated with the specified key in the receiver’s archive. 
   * @access public
   * @param {string} key - The key that identifies the rectangle.
   * @returns {CGRect} - 
   * @desc Use this method to decode a rectangle that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624522-decodecgrect
   */
  decodeCGRectForKey(key) {
    return null
  }

  /**
   * Decodes and returns the CGSize structure associated with the specified key in the receiver’s archive. 
   * @access public
   * @param {string} key - The key that identifies the size information.
   * @returns {CGSize} - 
   * @desc Use this method to decode size information that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624519-decodecgsize
   */
  decodeCGSizeForKey(key) {
    return null
  }

  /**
   * Decodes and returns the CGAffineTransform structure associated with the specified key in the receiver’s archive. 
   * @access public
   * @param {string} key - The key that identifies the affine transform.
   * @returns {CGAffineTransform} - 
   * @desc Use this method to decode size information that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624478-decodecgaffinetransform
   */
  decodeCGAffineTransformForKey(key) {
    return null
  }

  /**
   * Decodes and returns the UIEdgeInsets structure associated with the specified key in the receiver’s archive. 
   * @access public
   * @param {string} key - The key that identifies the edge insets.
   * @returns {UIEdgeInsets} - 
   * @desc Use this method to decode size information that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624492-decodeuiedgeinsets
   */
  decodeUIEdgeInsetsForKey(key) {
    return null
  }

  /**
   * Decodes and returns the UIOffset structure associated with the specified key in the receiver’s archive. 
   * @access public
   * @param {string} key - The key that identifies the offset.
   * @returns {UIOffset} - 
   * @desc Use this method to decode offset information that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624507-decodeuioffset
   */
  decodeUIOffsetForKey(key) {
    return null
  }

  /**
   * Decodes and returns the CGVector data associated with the specified key in the coder’s archive.
   * @access public
   * @param {string} key - The key that identifies the vector.
   * @returns {CGVector} - 
   * @desc Use this method to decode vector information that was previously encoded using the encode(_:forKey:) method.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1624488-decodecgvector
   */
  decodeCGVectorForKey(key) {
    return null
  }

  // Decoding Core Media Time Structures

  /**
   * Returns the CMTime structure associated with a given key.
   * @access public
   * @param {string} key - The key for a CMTime structure encoded in the receiver.
   * @returns {CMTime} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1389544-decodetime
   */
  decodeTimeForKey(key) {
    return null
  }

  /**
   * Returns the CMTimeRange structure associated with a given key.
   * @access public
   * @param {string} key - The key for a CMTimeRange structure encoded in the receiver.
   * @returns {CMTimeRange} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1385718-decodetimerange
   */
  decodeTimeRangeForKey(key) {
    return null
  }

  /**
   * Returns the CMTimeMapping structure associated with a given key.
   * @access public
   * @param {string} key - The key for a CMTimeMapping structure encoded in the receiver.
   * @returns {CMTimeMapping} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1389860-decodetimemapping
   */
  decodeTimeMappingForKey(key) {
    return null
  }

  // Secure Coding
  /**
   * Boolean value that indicates whether the coder requires secure coding.
   * @type {boolean}
   * @desc true if this coder requires secure coding; false otherwise.Secure coders check a set of allowed classes before decoding objects, and all objects must implement the NSSecureCoding protocol.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1409845-requiressecurecoding
   */
  get requiresSecureCoding() {
    return this._requiresSecureCoding
  }
  /**
   * The set of coded classes allowed for secure coding.
   * @type {?Set<AnyHashable>}
   * @desc Secure coders check this set of allowed classes before decoding objects, and all objects must implement the NSSecureCoding protocol.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1412486-allowedclasses
   */
  get allowedClasses() {
    return this._allowedClasses
  }

  // Getting Version Information

  /**
   * This method is present for historical reasons and is not used with keyed archivers.
   * @access public
   * @param {string} className - 
   * @returns {number} - 
   * @desc The version number does apply not to NSKeyedArchiver/NSKeyedUnarchiver.  A keyed archiver does not encode class version numbers.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1417703-version
   */
  versionForClassName(className) {
    return 0
  }
  /**
   * The system version in effect for the archive.
   * @type {number}
   * @desc During encoding, the current version. During decoding, the version that was in effect when the data was encoded.Subclasses that implement decoding must override this property to return the system version of the data being decoded.
   * @see https://developer.apple.com/documentation/foundation/nscoder/1413205-systemversion
   */
  get systemVersion() {
    return this._systemVersion
  }

  // Instance Properties
  /**
   * 
   * @type {NSCoder.DecodingFailurePolicy}
   * @desc 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1642984-decodingfailurepolicy
   */
  get decodingFailurePolicy() {
    return this._decodingFailurePolicy
  }

  /**
   * 
   * @type {?Error}
   * @desc 
   * @see https://developer.apple.com/documentation/foundation/nscoder/1643263-error
   */
  get error() {
    return this._error
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @param {DecodedObjectType.Type} cls - 
   * @param {string} key - 
   * @returns {NSCoding} - 
   * @see https://developer.apple.com/documentation/foundation/nscoder/2292924-decodeobject
   */
  decodeObjectOfClassForKey(cls, key) {
    return null
  }

  /**
   * 
   * @access public
   * @returns {void}
   * @throws {Error}
   * @see https://developer.apple.com/documentation/foundation/nscoder/1407699-decodetoplevelobject
   */
  decodeTopLevelObject() {
  }

  /**
   * 
   * @access public
   * @param {string} key - 
   * @returns {void}
   * @throws {Error}
   * @see https://developer.apple.com/documentation/foundation/nscoder/2293311-decodetoplevelobject
   */
  decodeTopLevelObjectForKey(key) {
  }

  /**
   * 
   * @access public
   * @param {?Object[]} classes - 
   * @param {string} key - 
   * @returns {void}
   * @throws {Error}
   * @see https://developer.apple.com/documentation/foundation/nscoder/2293221-decodetoplevelobject
   */
  decodeTopLevelObjectOfForKey(classes, key) {
  }

  /**
   * 
   * @access public
   * @param {Error} error - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nscoder/1411455-failwitherror
   */
  failWithError(error) {
  }
}
