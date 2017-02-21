'use strict'

import CGPoint from './CGPoint'
import CGSize from './CGSize'


/**
 * A structure that contains the location and dimensions of a rectangle.
 * @access public
 * @see https://developer.apple.com/reference/coregraphics/cgrect
 */
export default class CGRect {

  // Creating Rectangle Values

  /**
   * Creates a rectangle with the specified origin and size.
   * @access public
   * @param {CGPoint} origin - 
   * @param {CGSize} size - 
   * @returns {void}
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454856-init
   */
  init(origin, size) {

    // Special Values

    this._infinite = null
    this._null = null
    this._zero = null

    // Basic Geometric Properties

    this._origin = null
    this._size = null

    // Calculated Geometric Properties

    this._height = 0
    this._width = 0
    this._minX = 0
    this._midX = 0
    this._maxX = 0
    this._minY = 0
    this._midY = 0
    this._maxY = 0

    // Creating Derived Rectangles

    this._standardized = null
    this._integral = null

    // Checking Characteristics

    this._isEmpty = false
    this._isInfinite = false
    this._isNull = false

    // Alternate Representations

    this._dictionaryRepresentation = null
    this._debugDescription = ''
    this._customMirror = null
    this._customPlaygroundQuickLook = null
  }

  // Special Values
  /**
   * The rectangle whose origin and size are both zero.
   * @type {CGRect}
   * @desc The zero rectangle is equivalent to one created by calling CGRect(x: 0, y: 0, width: 0, height: 0).
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455437-zero
   */
  get zero() {
    return this._zero
  }

  // Basic Geometric Properties

  // Calculated Geometric Properties
  /**
   * Returns the height of a rectangle.
   * @type {number}
   * @desc Regardless of whether the height is stored in the CGRect data structure as a positive or negative number, this function returns the height as if the rectangle were standardized. That is, the result is never a negative number.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455645-height
   */
  get height() {
    return this._height
  }
  /**
   * Returns the width of a rectangle.
   * @type {number}
   * @desc Regardless of whether the width is stored in the CGRect data structure as a positive or negative number, this function returns the width as if the rectangle were standardized.  That is, the result is never a negative number.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454758-width
   */
  get width() {
    return this._width
  }
  /**
   * Returns the smallest value for the x-coordinate of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455948-minx
   */
  get minX() {
    return this._minX
  }
  /**
   * Returns the x- coordinate that establishes the center of a rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1456175-midx
   */
  get midX() {
    return this._midX
  }
  /**
   * Returns the largest value of the x-coordinate for the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454334-maxx
   */
  get maxX() {
    return this._maxX
  }
  /**
   * Returns the smallest value for the y-coordinate of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454832-miny
   */
  get minY() {
    return this._minY
  }
  /**
   * Returns the y-coordinate that establishes the center of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1456550-midy
   */
  get midY() {
    return this._midY
  }
  /**
   * Returns the largest value for the y-coordinate of the rectangle.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454060-maxy
   */
  get maxY() {
    return this._maxY
  }

  // Creating Derived Rectangles

  /**
   * Applies an affine transform to a rectangle.
   * @access public
   * @param {CGAffineTransform} t - The affine transform to apply to the rect parameter.
   * @returns {CGRect} - 
   * @desc Because affine transforms do not preserve rectangles in general, this function returns the smallest rectangle that contains the transformed corner points of the rect parameter. If the affine transform t consists solely of scaling and translation operations, then the returned rectangle coincides with the rectangle constructed from the four transformed corners.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455875-applying
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
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454218-insetby
   */
  insetBy(dx, dy) {
    return null
  }

  /**
   * Returns a rectangle with an origin that is offset from that of the source rectangle.
   * @access public
   * @param {number} dx - The offset value for the x-coordinate.
   * @param {number} dy - The offset value for the  y-coordinate.
   * @returns {CGRect} - 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454841-offsetby
   */
  offsetBy(dx, dy) {
    return null
  }

  /**
   * Returns the smallest rectangle that contains the two source rectangles.
   * @access public
   * @param {CGRect} r2 - Another rectangle to be combined with this rectangle.
   * @returns {CGRect} - 
   * @desc Both rectangles are standardized prior to calculating the union. If either of the rectangles is a null rectangle, a copy of the other rectangle is returned (resulting in a null rectangle if both rectangles are null). Otherwise a rectangle that completely contains the source rectangles is returned.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455837-union
   */
  union(r2) {
    return null
  }

  /**
   * Returns the intersection of two rectangles.
   * @access public
   * @param {CGRect} r2 - Another rectangle to intersect with this rectangle.
   * @returns {CGRect} - 
   * @desc Both rectangles are standardized prior to calculating the intersection.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455346-intersection
   */
  intersection(r2) {
    return null
  }

  /**
   * Creates two rectangles by dividing the original rectangle. 
   * @access public
   * @param {number} atDistance - A distance from the rectangle side specified in the fromEdge parameter, defining the line along which to divide the rectangle.
   * @param {CGRectEdge} fromEdge - The side of the rectangle from which to measure the atDistance parameter, defining the line along which to divide the rectangle.
   * @returns {{slice: CGRect, remainder: CGRect}} - 
   * @desc Together the fromEdge and atDistance parameters define a line (parallel to the specified edge of the rectangle and at the specified distance from that edge) that divides the rectangle into two component rectangles.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/2299988-divided
   */
  dividedFrom(atDistance, fromEdge) {
    return null
  }
  /**
   * Returns a rectangle with a positive width and height.
   * @type {CGRect}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1456432-standardized
   */
  get standardized() {
    return this._standardized
  }
  /**
   * Returns the smallest rectangle that results from converting the source rectangle values to integers.
   * @type {CGRect}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1456348-integral
   */
  get integral() {
    return this._integral
  }

  // Checking Characteristics

  /**
   * Returns whether two rectangles intersect.
   * @access public
   * @param {CGRect} rect2 - The rectangle to test for intersection with this rectangle.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454747-intersects
   */
  intersects(rect2) {
    return false
  }

  /**
   * Returns whether a rectangle contains a specified point.
   * @access public
   * @param {CGPoint} point - The point to examine. 
   * @returns {boolean} - 
   * @desc A point is considered inside the rectangle if its coordinates lie inside the rectangle or on the minimum X or minimum Y edge.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1456316-contains
   */
  contains(point) {
    return false
  }
  /**
   * Returns whether a rectangle has zero width or height, or is a null rectangle.
   * @type {boolean}
   * @desc An empty rectangle is either a null rectangle or a valid rectangle with zero height or width.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1454917-isempty
   */
  get isEmpty() {
    return this._isEmpty
  }
  /**
   * Returns whether a rectangle is infinite.
   * @type {boolean}
   * @desc An infinite rectangle is one that has no defined bounds. Infinite rectangles can be created as output from a tiling filter. For example, the Core Image framework perspective tile filter creates an image whose extent is described by an infinite rectangle.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455008-isinfinite
   */
  get isInfinite() {
    return this._isInfinite
  }
  /**
   * Returns whether the rectangle is equal to the null rectangle.
   * @type {boolean}
   * @desc A null rectangle is the equivalent of an empty set. For example, the result of intersecting two disjoint rectangles is a null rectangle. A null rectangle cannot be drawn and interacts with other rectangles in special ways.
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455471-isnull
   */
  get isNull() {
    return this._isNull
  }

  // Alternate Representations

  /**
   * Creates a rectangle from a canonical dictionary representation. 
   * @access public
   * @param {Map} dict - A dictionary containing x, y, width, and height values for the rectangle to create, in the format used by the dictionaryRepresentation property.
   * @returns {void}
   * @see https://developer.apple.com/reference/coregraphics/cgrect/2427139-init
   */
  initDictionaryRepresentation(dict) {

    // Special Values

    this._infinite = null
    this._null = null
    this._zero = null

    // Basic Geometric Properties

    this._origin = null
    this._size = null

    // Calculated Geometric Properties

    this._height = 0
    this._width = 0
    this._minX = 0
    this._midX = 0
    this._maxX = 0
    this._minY = 0
    this._midY = 0
    this._maxY = 0

    // Creating Derived Rectangles

    this._standardized = null
    this._integral = null

    // Checking Characteristics

    this._isEmpty = false
    this._isInfinite = false
    this._isNull = false

    // Alternate Representations

    this._dictionaryRepresentation = null
    this._debugDescription = ''
    this._customMirror = null
    this._customPlaygroundQuickLook = null
  }
  /**
   * Returns a dictionary representation of the provided rectangle.
   * @type {Map}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1455760-dictionaryrepresentation
   */
  get dictionaryRepresentation() {
    return this._dictionaryRepresentation
  }
  /**
   * 
   * @type {string}
   * @desc A textual representation of the rectangle's origin and size values. 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1645823-debugdescription
   */
  get debugDescription() {
    return this._debugDescription
  }
  /**
   * A representation of the rectangle's structure and display style for use in debugging. 
   * @type {Mirror}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1645833-custommirror
   */
  get customMirror() {
    return this._customMirror
  }
  /**
   * A representation of the rectangle for use in Playgrounds. 
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1645827-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return this._customPlaygroundQuickLook
  }

  // Comparing Rectangles

  /**
   * Returns whether two rectangles are equal in size and position.
   * @access public
   * @param {CGRect} rect2 - The rectangle to compare this rectangle with.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/coregraphics/cgrect/1456516-equalto
   */
  equalTo(rect2) {
    return false
  }
}
