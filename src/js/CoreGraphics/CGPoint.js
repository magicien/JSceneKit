'use strict'

/**
 * A structure that contains a point in a two-dimensional coordinate system.
 * @access public
 * @see https://developer.apple.com/documentation/coregraphics/cgpoint
 */
export default class CGPoint {
  // Creating Point Values

  /**
   * Creates a point with coordinates specified as integer values.   
   * @access public
   * @constructor
   * @param {number} x - 
   * @param {number} y - 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1455965-init
   */
  constructor(x, y) {
    // Geometric Properties
    this.x = x
    this.y = y
  }

  // Special Values

  /**
   * The point with location (0,0).
   * @type {CGPoint}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1454433-zero
   */
  static get zero() {
    return new CGPoint(0, 0)
  }

  // Geometric Properties

  // Transforming Points

  /**
   * Returns the point resulting from an affine transformation of an existing point.
   * @access public
   * @param {CGAffineTransform} t - The affine transform to apply. 
   * @returns {CGPoint} - 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1454251-applying
   */
  applying(t) {
    return null
  }

  // Alternate Representations

  /**
   * Creates a point from a canonical dictionary representation.
   * @access public
   * @param {Map} dict - A dictionary containing x and y values for the point to create, in the format used by the dictionaryRepresentation property.
   * @returns {void}
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/2427118-init
   */
  static pointWithDictionaryRepresentation(dict) {
    return new CGPoint(dict.get('x'), dict.get('y'))
  }

  /**
   * Returns a dictionary representation of the specified point.
   * @type {Map}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1455382-dictionaryrepresentation
   */
  get dictionaryRepresentation() {
    const map = new Map()
    map.set('x', this.x)
    map.set('y', this.y)
    return map
  }

  /**
   * A textual representation of the point's coordinate values. 
   * @type {string}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1645825-debugdescription
   */
  get debugDescription() {
    return `{x: ${this.x}, y: ${this.y}}`
  }

  /**
   * A representation of the point's structure and display style for use in debugging.
   * @type {Mirror}
   * @desc Mirrors are used by playgrounds and the debugger.
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1645834-custommirror
   */
  get customMirror() {
    return null
  }

  /**
   * A representation of the point for use in Playgrounds.
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1645835-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return null
  }

  // Comparing Points

  /**
   * Returns whether two points are equal. 
   * @access public
   * @param {CGPoint} point2 - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/coregraphics/cgpoint/1456179-equalto
   */
  equalTo(point2) {
    const epsilon = 0.00001
    return Math.abs(this.x - point2.x) < epsilon
        && Math.abs(this.y - point2.y) < epsilon
  }

  /**
   * @access public
   * @returns {CGPoint} -
   */
  copy() {
    return new CGPoint(this.x, this.y)
  }

  zero() {
    return new CGPoint(0, 0)
  }

  /**
   * @access public
   * @param {CGPoint} p -
   * @returns {CGPoint} -
   */
  add(p) {
    const r = new CGPoint()
    r.x = this.x + p.x
    r.y = this.y + p.y
    return r
  }

  /**
   * @access public
   * @param {CGPoint} p -
   * @returns {CGPoint} -
   */
  sub(p) {
    const r = new CGPoint()
    r.x = this.x - p.x
    r.y = this.y - p.y
    return r
  }

  /**
   * @access public
   * @param {number} n -
   * @returns {CGPoint} -
   */
  mul(n) {
    const r = new CGPoint()
    r.x = this.x * n
    r.y = this.y * n
    return r
  }

  /**
   * @access public
   * @param {CGPoint} p -
   * @returns {number} -
   */
  dot(p) {
    return this.x * p.x + this.y * p.y
  }

  /**
   * @access public
   * @param {CGPoint} p -
   * @param {number} rate -
   * @returns {CGPoint} -
   */
  lerp(p, rate) {
    const r = new CGPoint()
    r.x = this.x + rate * (p.x - this.x)
    r.y = this.y + rate * (p.y - this.y)
    return r
  }

  /**
   * @access public
   * @returns {CGPoint} -
   */
  normalize() {
    const len = this.length()
    const r = new CGPoint()
    if(len === 0){
      return r
    }
    const sqr = 1.0 / len
    r.x = this.x * sqr
    r.y = this.y * sqr
    return r
  }

  /**
   * @access public
   * @returns {number} -
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray() {
    return [this.x, this.y]
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    return new Float32Array([this.x, this.y])
  }

}
