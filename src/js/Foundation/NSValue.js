'use strict'

import NSObject from '../ObjectiveC/NSObject'
import CGPoint from '../CoreGraphics/CGPoint'
import CGVector from '../CoreGraphics/CGVector'
import CGSize from '../CoreGraphics/CGSize'
import CGRect from '../CoreGraphics/CGRect'
import CATransform3D from '../QuartzCore/CATransform3D'
import SCNVector3 from '../SceneKit/SCNVector3'
import SCNVector4 from '../SceneKit/SCNVector4'
import SCNMatrix4 from '../SceneKit/SCNMatrix4'


/**
 * An NSValue object is a simple container for a single C or Objective-C data item. It can hold any of the scalar types such as int, float, and char, as well as pointers, structures, and object id references. Use this class to work with such data types in collections (such as NSArray and NSSet), Key-value coding, and other APIs that require Objective-C objects. NSValue objects are always immutable.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/foundation/nsvalue
 */
export default class NSValue extends NSObject {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {} -
   */
  static initWithCoder(coder) {
    const special = coder._refObj['NS.special']
    
    const size = coder._refObj['NS.sizeval'].obj
    if(size){
      if(size.charAt(0) !== '{' || size.charAt(size.length-1) !== '}'){
        throw new Error(`unknown NSValue size format: ${size}`)
      }
      const values = size.slice(1, -1).split(',').map(parseFloat)
      console.error(`size width: ${values[0]}, height: ${values[1]}`)
      return new CGSize(values[0], values[1])
    }
    throw new Error('unknown NSValue type')
  }

  // Working with Raw Values

  /**
   * Initializes a value object to contain the specified value, interpreted with the specified Objective-C type.
   * @access public
   * @param {UnsafeRawPointer} value - A pointer to data to be stored in the new value object.
   * @param {UnsafePointer<Int8>} type - The Objective-C type of value, as provided by the @encode() compiler directive. Do not hard-code this parameter as a C string. 
   * @returns {void}
   * @desc See Number and Value Programming Topics for other considerations in creating a value object.This is the designated initializer for the NSValue class.
   * @see https://developer.apple.com/reference/foundation/nsvalue/1411621-init
   */
  initBytesObjCType(value, type) {
  }

  /**
   * Creates a value object containing the specified value, interpreted with the specified Objective-C type.
   * @access public
   * @param {UnsafeRawPointer} value - A pointer to data to be stored in the new value object.
   * @param {UnsafePointer<Int8>} type - The Objective-C type of value, as provided by the @encode() compiler directive. Do not hard-code this parameter as a C string. 
   * @returns {void}
   * @desc This method has the same effect as valueWithBytes:objCType: and may be deprecated in a future release. You should use valueWithBytes:objCType: instead.
   * @see https://developer.apple.com/reference/foundation/nsvalue/1417400-init
   */
  initWithObjCType(value, type) {
  }

  /**
   * Copies the value into the specified buffer.
   * @access public
   * @param {Object} value - 
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1415141-getvalue
   */
  getValue(value) {
  }

  /**
   * A C string containing the Objective-C type of the data contained in the value object.
   * @type {UnsafePointer<Int8>}
   * @desc This property provides the same string produced by the @encode() compiler directive.
   * @see https://developer.apple.com/reference/foundation/nsvalue/1412365-objctype
   */
  get objCType() {
    return this._objCType
  }

  // Working with Pointer and Object Values

  /**
   * Creates a value object containing the specified pointer.
   * @access public
   * @constructor
   * @param {?UnsafeRawPointer} pointer - 
   * @desc This method is equivalent to invoking init(_:withObjCType:) in this manner:NSValue *theValue = [NSValue value:&aPointer withObjCType:@encode(void *)];
This method does not copy the contents of aPointer, so you must not to free the memory at the pointer destination while the NSValue object exists. NSData objects may be more suited for arbitrary pointers than NSValue objects.NSValue *theValue = [NSValue value:&aPointer withObjCType:@encode(void *)];

   * @see https://developer.apple.com/reference/foundation/nsvalue/1415975-init
   */
  constructor(pointer) {
    super()

    // Working with Raw Values

    this._objCType = null

    // Working with Pointer and Object Values

    this._pointerValue = null
    this._nonretainedObjectValue = null

    // Working with Range Values

    this._rangeValue = null

    // Working with Foundation Geometry Values

    this._pointValue = null
    this._sizeValue = null
    this._rectValue = null

    // Working with CoreGraphics Geometry Values

    this._cgPointValue = null
    this._cgVectorValue = null
    this._cgSizeValue = null
    this._cgRectValue = null
    this._cgAffineTransformValue = null

    // Working with UIKit Geometry Values

    this._uiEdgeInsetsValue = null
    this._uiOffsetValue = null

    // Working with CoreAnimation Transform Values

    this._caTransform3DValue = null

    // Working with Media Time Values

    this._timeValue = null
    this._timeRangeValue = null
    this._timeMappingValue = null

    // Working with Geographic Coordinate Values

    this._mkCoordinateValue = null
    this._mkCoordinateSpanValue = null

    // Working with SceneKit Vector and Matrix Values

    this._scnVector3Value = null
    this._scnVector4Value = null
    this._scnMatrix4Value = null

    // Instance Properties

    this._edgeInsetsValue = null
  }

  /**
   * Creates a value object containing the specified object.
   * @access public
   * @param {?Object} anObject - The value for the new object.
   * @returns {void}
   * @desc  This method is equivalent to invoking init(_:withObjCType:) in this manner:NSValue *theValue = [NSValue value:&anObject withObjCType:@encode(void *)];
This method is useful if you want to add an object to a Collection but don’t want the collection to create a strong reference to it.NSValue *theValue = [NSValue value:&anObject withObjCType:@encode(void *)];

   * @see https://developer.apple.com/reference/foundation/nsvalue/1408098-init
   */
  initNonretainedObject(anObject) {
  }

  /**
   * Returns the value as an untyped pointer.
   * @type {?Object}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1410668-pointervalue
   */
  get pointerValue() {
    return this._pointerValue
  }

  /**
   * The value as a non-retained pointer to an object.
   * @type {?Object}
   * @desc If the value was not created to hold a pointer-sized data item, the result is undefined.
   * @see https://developer.apple.com/reference/foundation/nsvalue/1412287-nonretainedobjectvalue
   */
  get nonretainedObjectValue() {
    return this._nonretainedObjectValue
  }

  // Working with Range Values
  /**
   * The Foundation range structure representation of the value.
   * @type {NSRange}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1413902-rangevalue
   */
  get rangeValue() {
    return this._rangeValue
  }

  // Working with Foundation Geometry Values
  /**
   * The Foundation point structure representation of the value.
   * @type {CGPoint}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1391255-pointvalue
   */
  get pointValue() {
    return this._pointValue
  }

  /**
   * The Foundation size structure representation of the value.
   * @type {CGSize}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1391301-sizevalue
   */
  get sizeValue() {
    return this._sizeValue
  }

  /**
   * The Foundation rectangle structure representation of the value.
   * @type {CGRect}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1391171-rectvalue
   */
  get rectValue() {
    return this._rectValue
  }

  // Working with CoreGraphics Geometry Values

  /**
   * Creates a new value object containing the specified CoreGraphics point structure.
   * @access public
   * @param {CGPoint} point - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624531-init
   */
  initCgPoint(point) {
  }

  /**
   * Creates a new value object containing the specified CoreGraphics vector structure.
   * @access public
   * @param {CGVector} vector - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624493-init
   */
  initCgVector(vector) {
  }

  /**
   * Creates a new value object containing the specified CoreGraphics size structure.
   * @access public
   * @param {CGSize} size - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624511-init
   */
  initCgSize(size) {
  }

  /**
   * Creates a new value object containing the specified CoreGraphics rectangle structure.
   * @access public
   * @param {CGRect} rect - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624529-init
   */
  initCgRect(rect) {
  }

  /**
   * Creates a new value object containing the specified CoreGraphics affine transform structure.
   * @access public
   * @param {CGAffineTransform} transform - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624503-init
   */
  initCgAffineTransform(transform) {
  }

  /**
   * Returns the CoreGraphics point structure representation of the value.
   * @type {CGPoint}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624534-cgpointvalue
   */
  get cgPointValue() {
    return this._cgPointValue
  }

  /**
   * Returns the CoreGraphics vector structure representation of the value.
   * @type {CGVector}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624486-cgvectorvalue
   */
  get cgVectorValue() {
    return this._cgVectorValue
  }

  /**
   * Returns the CoreGraphics size structure representation of the value.
   * @type {CGSize}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624489-cgsizevalue
   */
  get cgSizeValue() {
    return this._cgSizeValue
  }
  /**
   * Returns the CoreGraphics rectangle structure representation of the value.
   * @type {CGRect}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624506-cgrectvalue
   */
  get cgRectValue() {
    return this._cgRectValue
  }

  /**
   * Returns the CoreGraphics affine transform representation of the value.
   * @type {CGAffineTransform}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624512-cgaffinetransformvalue
   */
  get cgAffineTransformValue() {
    return this._cgAffineTransformValue
  }

  // Working with UIKit Geometry Values

  /**
   * Creates a new value object containing the specified UIKit edge insets structure.
   * @access public
   * @param {UIEdgeInsets} insets - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624485-init
   */
  initUiEdgeInsets(insets) {
  }

  /**
   * Creates a new value object containing the specified UIKit offset structure.
   * @access public
   * @param {UIOffset} insets - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624530-init
   */
  initUiOffset(insets) {
  }

  /**
   * Returns the UIKit edge insets structure representation of the value.
   * @type {UIEdgeInsets}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624517-uiedgeinsetsvalue
   */
  get uiEdgeInsetsValue() {
    return this._uiEdgeInsetsValue
  }

  /**
   * Returns the UIKit offset structure representation of the value.
   * @type {UIOffset}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1624526-uioffsetvalue
   */
  get uiOffsetValue() {
    return this._uiOffsetValue
  }

  // Working with CoreAnimation Transform Values

  /**
   * Creates a new value object containing the specified CoreAnimation transform structure.
   * @access public
   * @param {CATransform3D} t - 
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1436556-init
   */
  initCaTransform3D(t) {
  }

  /**
   * The CoreAnimation transform structure representation of the value.
   * @type {CATransform3D}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1436572-catransform3dvalue
   */
  get caTransform3DValue() {
    return this._caTransform3DValue
  }

  // Working with Media Time Values
  /**
   * The CoreMedia time structure representation of the value.
   * @type {CMTime}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1388151-timevalue
   */
  get timeValue() {
    return this._timeValue
  }
  /**
   * The CoreMedia time range structure representation of the value.
   * @type {CMTimeRange}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1385930-timerangevalue
   */
  get timeRangeValue() {
    return this._timeRangeValue
  }
  /**
   * The CoreMedia time mapping structure representation of the value.
   * @type {CMTimeMapping}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1387277-timemappingvalue
   */
  get timeMappingValue() {
    return this._timeMappingValue
  }

  // Working with Geographic Coordinate Values

  /**
   * Creates a new value object containing the specified CoreLocation geographic coordinate structure.
   * @access public
   * @param {CLLocationCoordinate2D} coordinate - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1452193-init
   */
  initMkCoordinate(coordinate) {
  }

  /**
   * Creates a new value object containing the specified MapKit coordinate span structure.
   * @access public
   * @param {MKCoordinateSpan} span - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1452333-init
   */
  initMkCoordinateSpan(span) {
  }

  /**
   * The CoreLocation geographic coordinate structure representation of the value.
   * @type {CLLocationCoordinate2D}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1452495-mkcoordinatevalue
   */
  get mkCoordinateValue() {
    return this._mkCoordinateValue
  }
  /**
   * The MapKit coordinate span structure representation of the value.
   * @type {MKCoordinateSpan}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1452516-mkcoordinatespanvalue
   */
  get mkCoordinateSpanValue() {
    return this._mkCoordinateSpanValue
  }

  // Working with SceneKit Vector and Matrix Values

  /**
   * Creates a value object that contains the specified three-element SceneKit vector.
   * @access public
   * @param {SCNVector3} v - 
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409671-init
   */
  initScnVector3(v) {
  }

  /**
   * Creates a value object that contains the specified four-element SceneKit vector.
   * @access public
   * @param {SCNVector4} v - 
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409688-init
   */
  initScnVector4(v) {
  }

  /**
   * Creates a value object that contains the specified SceneKit 4 x 4 matrix.
   * @access public
   * @param {SCNMatrix4} v - The value for the new object.
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409680-init
   */
  initScnMatrix4(v) {
  }

  /**
   * The three-element Scene Kit vector representation of the value.
   * @type {SCNVector3}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409669-scnvector3value
   */
  get scnVector3Value() {
    return this._scnVector3Value
  }
  /**
   * The four-element Scene Kit vector representation of the value.
   * @type {SCNVector4}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409725-scnvector4value
   */
  get scnVector4Value() {
    return this._scnVector4Value
  }
  /**
   * The Scene Kit 4 x 4 matrix representation of the value.
   * @type {SCNMatrix4}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409684-scnmatrix4value
   */
  get scnMatrix4Value() {
    return this._scnMatrix4Value
  }

  // Comparing Value Objects

  /**
   * Returns a Boolean value that indicates whether the value object and another value object are equal.
   * @access public
   * @param {NSValue} value - 
   * @returns {boolean} - 
   * @desc The NSValue class compares the type and contents of each value object to determine equality.
   * @see https://developer.apple.com/reference/foundation/nsvalue/1409038-isequal
   */
  isEqualTo(value) {
    return false
  }

  // Initializers

  /**
   * 
   * @access public
   * @param {NSCoder} aDecoder - 
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1417896-init
   */
  initCoder(aDecoder) {
  }

  /**
   * 
   * @access public
   * @param {EdgeInsets} insets - 
   * @returns {void}
   * @see https://developer.apple.com/reference/foundation/nsvalue/1391181-init
   */
  initEdgeInsets(insets) {
  }

  // Instance Properties
  /**
   * 
   * @type {EdgeInsets}
   * @desc 
   * @see https://developer.apple.com/reference/foundation/nsvalue/1391123-edgeinsetsvalue
   */
  get edgeInsetsValue() {
    return this._edgeInsetsValue
  }
}
