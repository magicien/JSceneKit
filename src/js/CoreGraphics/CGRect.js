'use strict'

import CGPoint from './CGPoint'
import CGSize from './CGSize'

/**
 * A structure that contains the location and dimensions of a rectangle.
 * @access public
 * @see https://developer.apple.com/documentation/coregraphics/cgrect
 */
export default class CGRect {
  // Creating Rectangle Values

  /**
   * Creates a rectangle with the specified origin and size.
   * @access public
   * @constructor
   * @param {CGPoint} origin - 
   * @param {CGSize} size - 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454856-init
   */
  constructor(origin, size) {

    // Basic Geometric Properties
    this.origin = origin.copy()
    this.size = size.copy()
  }

  // Special Values

  /**
   * The rectangle whose origin and size are both zero.
   * @type {CGRect}
   * @desc The zero rectangle is equivalent to one created by calling CGRect(x: 0, y: 0, width: 0, height: 0).
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455437-zero
   */
  static get zero() {
    return new CGRect(new CGPoint(0, 0), new CGSize(0, 0))
  }

  // Basic Geometric Properties

  // Calculated Geometric Properties
  /**
   * Returns the height of a rectangle.
   * @type {number}
   * @desc Regardless of whether the height is stored in the CGRect data structure as a positive or negative number, this function returns the height as if the rectangle were standardized. That is, the result is never a negative number.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455645-height
   */
  get height() {
    if(this.isNull){
      return 0
    }
    return Math.abs(this.size.height)
  }
  /**
   * Returns the width of a rectangle.
   * @type {number}
   * @desc Regardless of whether the width is stored in the CGRect data structure as a positive or negative number, this function returns the width as if the rectangle were standardized.  That is, the result is never a negative number.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454758-width
   */
  get width() {
    if(this.isNull){
      return 0
    }
    return Math.abs(this.size.width)
  }

  /**
   * Returns the smallest value for the x-coordinate of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455948-minx
   */
  get minX() {
    if(this.size.width < 0){
      return this.origin.x + this.size.width
    }
    return this.origin.x
  }

  /**
   * Returns the x- coordinate that establishes the center of a rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1456175-midx
   */
  get midX() {
    return this.origin.x + this.size.width * 0.5
  }

  /**
   * Returns the largest value of the x-coordinate for the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454334-maxx
   */
  get maxX() {
    if(this.size.width > 0){
      return this.origin.x + this.size.width
    }
    return this.origin.x
  }

  /**
   * Returns the smallest value for the y-coordinate of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454832-miny
   */
  get minY() {
    if(this.size.height < 0){
      return this.origin.y + this.size.height
    }
    return this.origin.y
  }

  /**
   * Returns the y-coordinate that establishes the center of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1456550-midy
   */
  get midY() {
    return this.origin.y + this.size.height * 0.5
  }

  /**
   * Returns the largest value for the y-coordinate of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454060-maxy
   */
  get maxY() {
    if(this.size.height > 0){
      return this.origin.y + this.size.height
    }
    return this.origin.y
  }

  // Creating Derived Rectangles

  /**
   * Applies an affine transform to a rectangle.
   * @access public
   * @param {CGAffineTransform} t - The affine transform to apply to the rect parameter.
   * @returns {CGRect} - 
   * @desc Because affine transforms do not preserve rectangles in general, this function returns the smallest rectangle that contains the transformed corner points of the rect parameter. If the affine transform t consists solely of scaling and translation operations, then the returned rectangle coincides with the rectangle constructed from the four transformed corners.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455875-applying
   */
  applying(t) {
    return null
  }

  /**
   * Returns a rectangle that is smaller or larger than the source rectangle, with the same center point.
   * @access public
   * @param {number} dx - The x-coordinate value to use for adjusting the source rectangle. To create an inset rectangle, specify a positive value. To create a larger, encompassing rectangle, specify a negative value.
   * @param {number} dy - The y-coordinate value to use for adjusting the source rectangle. To create an inset rectangle, specify a positive value. To create a larger, encompassing rectangle, specify a negative value.
   * @returns {CGRect} - 
   * @desc The rectangle is standardized and then the inset parameters are applied. If the resulting rectangle would have a negative height or width, a null rectangle is returned.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454218-insetby
   */
  insetBy(dx, dy) {
    const newX = this.minX + dx
    const newY = this.minY + dy
    const newWidth = this.size.width - dx * 2
    const newHeight = this.size.height - dy * 2
    return new CGRect(new CGPoint(newX, newY), new CGSize(newWidth, newHeight))
  }

  /**
   * Returns a rectangle with an origin that is offset from that of the source rectangle.
   * @access public
   * @param {number} dx - The offset value for the x-coordinate.
   * @param {number} dy - The offset value for the  y-coordinate.
   * @returns {CGRect} - 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454841-offsetby
   */
  offsetBy(dx, dy) {
    return new CGRect(new CGPoint(this.origin.x + dx, this.origin.y + dy), this.size)
  }

  /**
   * Returns the smallest rectangle that contains the two source rectangles.
   * @access public
   * @param {CGRect} r2 - Another rectangle to be combined with this rectangle.
   * @returns {CGRect} - 
   * @desc Both rectangles are standardized prior to calculating the union. If either of the rectangles is a null rectangle, a copy of the other rectangle is returned (resulting in a null rectangle if both rectangles are null). Otherwise a rectangle that completely contains the source rectangles is returned.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455837-union
   */
  union(r2) {
    if(this.isNull && r2.isNull){
      return new CGRect(new CGPoint(0, 0), null)
    }else if(this.isNull){
      return r2.copy()
    }else if(r2.isNull){
      return this.copy()
    }

    const minX = this.minX < r2.minX ? this.minX : r2.minX
    const maxX = this.maxX > r2.maxX ? this.maxX : r2.maxX
    const minY = this.minY < r2.minY ? this.minY : r2.minY
    const maxY = this.maxY > r2.maxY ? this.maxY : r2.maxY
    const width = maxX - minX
    const height = maxY - minY
    return new CGRect(new CGPoint(minX, minY), new CGSize(width, height))
  }

  /**
   * Returns the intersection of two rectangles.
   * @access public
   * @param {CGRect} r2 - Another rectangle to intersect with this rectangle.
   * @returns {CGRect} - 
   * @desc Both rectangles are standardized prior to calculating the intersection.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455346-intersection
   */
  intersection(r2) {
    if(this.isNull || r2.isNull){
      return new CGRect(new CGPoint(0, 0), null)
    }
    const minX = this.minX > r2.minX ? this.minX : r2.minX
    const maxX = this.maxX < r2.maxX ? this.maxX : r2.maxX
    const minY = this.minY > r2.minY ? this.minY : r2.minY
    const maxY = this.maxY < r2.maxY ? this.maxY : r2.maxY
    const width = maxX - minX
    const height = maxY - minY
    if(width < 0 || height < 0){
      return new CGRect(new CGPoint(0, 0), null)
    }
    return new CGRect(new CGPoint(minX, minY), new CGSize(width, height))
  }

  /**
   * Creates two rectangles by dividing the original rectangle. 
   * @access public
   * @param {number} atDistance - A distance from the rectangle side specified in the fromEdge parameter, defining the line along which to divide the rectangle.
   * @param {CGRectEdge} fromEdge - The side of the rectangle from which to measure the atDistance parameter, defining the line along which to divide the rectangle.
   * @returns {{slice: CGRect, remainder: CGRect}} - 
   * @desc Together the fromEdge and atDistance parameters define a line (parallel to the specified edge of the rectangle and at the specified distance from that edge) that divides the rectangle into two component rectangles.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/2299988-divided
   */
  dividedFrom(atDistance, fromEdge) {
    return null
  }
  /**
   * Returns a rectangle with a positive width and height.
   * @type {CGRect}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1456432-standardized
   */
  get standardized() {
    const r = this.copy()
    if(this.isNull){
      return CGRect.zero
    }
    if(this.width < 0){
      r.origin.x = this.origin.x + this.width
      r.size.width = -this.width
    }
    if(this.height < 0){
      r.origin.y = this.origin.y + this.height
      r.size.height = -this.height
    }
    return r
  }

  /**
   * Returns the smallest rectangle that results from converting the source rectangle values to integers.
   * @type {CGRect}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1456348-integral
   */
  get integral() {
    return null
  }

  // Checking Characteristics

  /**
   * Returns whether two rectangles intersect.
   * @access public
   * @param {CGRect} rect2 - The rectangle to test for intersection with this rectangle.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454747-intersects
   */
  intersects(rect2) {
    const r = this.intersection(rect2)
    return (this.width > 0 && this.height > 0)
  }

  /**
   * Returns whether a rectangle contains a specified point.
   * @access public
   * @param {CGPoint} point - The point to examine. 
   * @returns {boolean} - 
   * @desc A point is considered inside the rectangle if its coordinates lie inside the rectangle or on the minimum X or minimum Y edge.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1456316-contains
   */
  contains(point) {
    return point.x >= this.minX
        && point.x <= this.maxX
        && point.y >= this.minY
        && point.y <= this.maxY
  }

  /**
   * Returns whether a rectangle has zero width or height, or is a null rectangle.
   * @type {boolean}
   * @desc An empty rectangle is either a null rectangle or a valid rectangle with zero height or width.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1454917-isempty
   */
  get isEmpty() {
    return this.isNull || this.size.height === 0 || this.size.width === 0
  }

  /**
   * Returns whether a rectangle is infinite.
   * @type {boolean}
   * @desc An infinite rectangle is one that has no defined bounds. Infinite rectangles can be created as output from a tiling filter. For example, the Core Image framework perspective tile filter creates an image whose extent is described by an infinite rectangle.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455008-isinfinite
   */
  get isInfinite() {
    return this.size.width === Infinity && this.size.height === Infinity
  }

  /**
   * Returns whether the rectangle is equal to the null rectangle.
   * @type {boolean}
   * @desc A null rectangle is the equivalent of an empty set. For example, the result of intersecting two disjoint rectangles is a null rectangle. A null rectangle cannot be drawn and interacts with other rectangles in special ways.
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455471-isnull
   */
  get isNull() {
    return this.size === null
  }

  // Alternate Representations

  /**
   * Creates a rectangle from a canonical dictionary representation. 
   * @access public
   * @param {Map} dict - A dictionary containing x, y, width, and height values for the rectangle to create, in the format used by the dictionaryRepresentation property.
   * @returns {void}
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/2427139-init
   */
  initDictionaryRepresentation(dict) {
    // Basic Geometric Properties
    this.origin = dict.get('origin')
    this.size = dict.get('size')
  }

  /**
   * Returns a dictionary representation of the provided rectangle.
   * @type {Map}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1455760-dictionaryrepresentation
   */
  get dictionaryRepresentation() {
    const map = new Map()
    map.set('origin', this.origin)
    map.set('size', this.size)
    return map
  }

  /**
   * 
   * @type {string}
   * @desc A textual representation of the rectangle's origin and size values. 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1645823-debugdescription
   */
  get debugDescription() {
    if(this.size === null){
      return '{null}'
    }
    const origin = this.origin ? this.origin.debugDescription() : '{null}'
    const size = this.size ? this.size.debugDescription() : '{null}'

    return `{origin:${origin}, size:${size}}`
  }

  /**
   * A representation of the rectangle's structure and display style for use in debugging. 
   * @type {Mirror}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1645833-custommirror
   */
  get customMirror() {
    return null
  }

  /**
   * A representation of the rectangle for use in Playgrounds. 
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1645827-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return null
  }

  // Comparing Rectangles

  /**
   * Returns whether two rectangles are equal in size and position.
   * @access public
   * @param {CGRect} rect2 - The rectangle to compare this rectangle with.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/coregraphics/cgrect/1456516-equalto
   */
  equalTo(rect2) {
    if(this.origin === null || rect2.origin === null){
      return false
    }
    if(this.size === null || rect2.size === null){
      return false
    }

    return this.origin.equalTo(rect2.origin) && this.size.equalTo(rect2.size)
  }

  zero() {
    return new CGRect(new CGPoint(0, 0), new CGRect(0, 0))
  }

  add(rect2) {
    return new CGRect(this.origin.add(rect2.origin), this.size.add(rect2.size))
  }

  sub(rect2) {
    return new CGRect(this.origin.sub(rect2.origin), this.size.sub(rect2.size))
  }

  /**
   * @access public
   * @param {CGRect} r -
   * @param {number} rate -
   * @returns {CGRect} -
   */
  lerp(r, rate) {
    const origin = this.origin.lerp(r.origin, rate)
    const size = this.size.lerp(r.size, rate)
    return new CGRect(origin, size)
  }

  copy() {
    return new CGRect(this.origin, this.size)
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} width -
   * @param {number} height -
   * @returns {CGRect} -
   */
  static rectWithXYWidthHeight(x, y, width, height) {
    const point = new CGPoint(x, y)
    const size = new CGSize(width, height)
    return new CGRect(point, size)
  }
}
