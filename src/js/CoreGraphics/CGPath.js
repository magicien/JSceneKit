'use strict'

import CGRect from './CGRect'
import CGLineCap from './CGLineCap'
import CGLineJoin from './CGLineJoin'
import CGMutablePath from './CGMutablePath'
import CGPoint from './CGPoint'
import CGPathFillRule from './CGPathFillRule'
import CGPathApplierFunction from './CGPathApplierFunction'

let _typeID = null

/**
 * An immutable graphics path: a mathematical description of shapes or lines to be drawn in a graphics context.
 * @access public
 * @see https://developer.apple.com/reference/coregraphics/cgpath
 */
export default class CGPath {

  // Creating Graphics Paths

  /**
   * Create an immutable path of a rectangle.
   * @access public
   * @param {CGRect} rect - The rectangle to add.
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to the rectangle before it is added to the path.
   * @returns {void}
   * @desc This is a convenience function that creates a path of an rectangle. Using this convenience function is more efficient than creating a mutable path and adding an rectangle to it.Calling this function is equivalent to using minX and related functions to find the corners of the rectangle, then using the moveTo(_:x:y:), addLineTo(_:x:y:), and closeSubpath() functions to draw the rectangle. 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411155-init
   */
  init(rect, transform) {

    // Examining a Graphics Path

    this._boundingBox = null
    this._boundingBoxOfPath = null
    this._currentPoint = null
    this._isEmpty = false
  }

  /**
   * Create an immutable path of an ellipse.
   * @access public
   * @param {CGRect} rect - The rectangle that bounds the ellipse.
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to the ellipse before it is added to the path.
   * @returns {void}
   * @desc This is a convenience function that creates a path of an ellipse. Using this convenience function is more efficient than creating a mutable path and adding an ellipse to it.The ellipse is approximated by a sequence of Bézier curves. Its center is the midpoint of the rectangle defined by the rect parameter. If the rectangle is square, then the ellipse is circular with a radius equal to one-half the width (or height) of the rectangle. If the rect parameter specifies a rectangular shape, then the major and minor axes of the ellipse are defined by the width and height of the rectangle. The ellipse forms a complete subpath of the path—that is, the ellipse drawing starts with a move-to operation and ends with a close-subpath operation, with all moves oriented in the clockwise direction. If you supply an affine transform, then the constructed Bézier curves that define the ellipse are transformed before they are added to the path.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411177-init
   */
  initEllipseIn(rect, transform) {

    // Examining a Graphics Path

    this._boundingBox = null
    this._boundingBoxOfPath = null
    this._currentPoint = null
    this._isEmpty = false
  }

  /**
   * Create an immutable path of a rounded rectangle.
   * @access public
   * @param {CGRect} rect - The rectangle to add.
   * @param {number} cornerWidth - The width of the rounded corner sections.
   * @param {number} cornerHeight - The height of the rounded corner sections.
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to the rectangle before it is added to the path.
   * @returns {void}
   * @desc This is a convenience function that creates a path of an rounded rectangle. Using this convenience function is more efficient than creating a mutable path and adding an rectangle to it.Each corner of the rounded rectangle is one-quarter of an ellipse with axes equal to the cornerWidth and cornerHeight parameters. The rounded rectangle forms a complete subpath and is oriented in the clockwise direction.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411218-init
   */
  initRoundedRect(rect, cornerWidth, cornerHeight, transform) {

    // Examining a Graphics Path

    this._boundingBox = null
    this._boundingBoxOfPath = null
    this._currentPoint = null
    this._isEmpty = false
  }

  // Copying a Graphics Path

  /**
   * Creates an immutable copy of a graphics path.
   * @access public
   * @returns {?CGPath} - 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411211-copy
   */
  copy() {
    return null
  }

  /**
   * Creates an immutable copy of a graphics path transformed by a transformation matrix.
   * @access public
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to all elements of the new path.
   * @returns {?CGPath} - 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411161-copy
   */
  copyUsing(transform) {
    return null
  }

  /**
   * Returns a new path equivalent to the results of drawing the path with a dashed stroke.
   * @access public
   * @param {number} phase - A value that specifies how far into the dash pattern the line starts, in units of the user space. For example, a value of 0 draws a line starting with the beginning of a dash pattern, and a value of 3 means the line is drawn with the dash pattern starting at three units from its beginning. 
   * @param {number[]} lengths - An array of values that specify the lengths, in user space coordinates, of the painted and unpainted segments  of the dash pattern.For example, the array [2,3] sets a dash pattern that alternates between a 2-unit-long painted segment and a 3-unit-long unpainted segment. The array [1,3,4,2] sets the pattern to a 1-unit painted segment, a 3-unit unpainted segment, a 4-unit painted segment, and a 2-unit unpainted segment.Pass an empty array to clear the dash pattern so that all stroke drawing in the context uses solid lines.
   * @param {CGAffineTransform} transform - An affine transform to apply to the path before dashing. Defaults to the identity transform if not specified.
   * @returns {CGPath} - 
   * @desc The new path is created so that filling the new path draws the same pixels as stroking the original path with the specified dash parameters.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/2427137-copy
   */
  copyDashingWithPhase(phase, lengths, transform) {
    return null
  }

  /**
   * Returns a new path equivalent to the results of drawing the path with a solid stroke. 
   * @access public
   * @param {number} lineWidth - The line width to use, in user space units. The value must be greater than 0.
   * @param {CGLineCap} lineCap - The line cap style to render. (For equivalent CGContext drawing methods, the default style is butt.) 
   * @param {CGLineJoin} lineJoin - The line join style to render. (For equivalent CGContext drawing methods, the default style is miter.) 
   * @param {number} miterLimit - A value that limits how sharp individual corners in the path can be when using the miter line join style. When the ratio of a the length required for a mitered corner to the line width exceeds this value, that corner uses the bevel style instead.
   * @param {CGAffineTransform} transform - An affine transform to apply to the path before dashing. Defaults to the identity transform if not specified.
   * @returns {CGPath} - 
   * @desc The new path is created so that filling the new path draws the same pixels as stroking the original path with the specified line style.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/2427133-copy
   */
  copyStrokingWithWidth(lineWidth, lineCap, lineJoin, miterLimit, transform) {
    return null
  }

  /**
   * Creates a mutable copy of an existing graphics path.
   * @access public
   * @returns {?CGMutablePath} - 
   * @desc You can modify a mutable graphics path by calling the various path geometry functions, such as addArc(_:x:y:radius:startAngle:endAngle:clockwise:), addLineTo(_:x:y:), and moveTo(_:x:y:).
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411196-mutablecopy
   */
  mutableCopy() {
    return null
  }

  /**
   * Creates a mutable copy of a graphics path transformed by a transformation matrix.
   * @access public
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to all elements of the new path.
   * @returns {?CGMutablePath} - 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411150-mutablecopy
   */
  mutableCopyUsing(transform) {
    return null
  }

  // Examining a Graphics Path

  /**
   * Returns whether the specified point is interior to the path.
   * @access public
   * @param {CGPoint} point - The point to check.
   * @param {CGPathFillRule} rule - The rule for determining which areas to treat as the interior of the path. Defaults to the winding rule if not specified.
   * @param {CGAffineTransform} transform - An affine transform to apply to the point before checking for containment in the path. Defaults to the identity transform if not specified.
   * @returns {boolean} - 
   * @desc A point is contained in a path if it would be inside the painted region when the path is filled.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/2427117-contains
   */
  containsUsing(point, rule, transform) {
    return false
  }

  /**
   * Indicates whether or not a graphics path represents a rectangle.
   * @access public
   * @param {?UnsafeMutablePointer<CGRect>} rect - On input, a pointer to an uninitialized rectangle. If the specified path represents a rectangle, on return contains a copy of the rectangle. 
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411163-isrect
   */
  isRect(rect) {
    return false
  }
  /**
   * Returns the bounding box containing all points in a graphics path.
   * @type {CGRect}
   * @desc The bounding box is the smallest rectangle completely enclosing all points in the path, including control points for Bézier and quadratic curves. 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411165-boundingbox
   */
  get boundingBox() {
    return this._boundingBox
  }
  /**
   * Returns the bounding box of a graphics path.
   * @type {CGRect}
   * @desc The path bounding box is the smallest rectangle completely enclosing all points in the path but not including control points for Bézier and quadratic curves. 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411200-boundingboxofpath
   */
  get boundingBoxOfPath() {
    return this._boundingBoxOfPath
  }
  /**
   * Returns the current point in a graphics path.
   * @type {CGPoint}
   * @desc If the path is empty—that is, if it has no elements—this function returns CGPointZero (see CGGeometry). To determine whether a path is empty, use isEmpty.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411132-currentpoint
   */
  get currentPoint() {
    return this._currentPoint
  }
  /**
   * Indicates whether or not a graphics path is empty.
   * @type {boolean}
   * @desc An empty path contains no elements.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411149-isempty
   */
  get isEmpty() {
    return this._isEmpty
  }

  // Applying a Function to the Elements of a Path

  /**
   * For each element in a graphics path, calls a custom applier function.
   * @access public
   * @param {?Object} info - A pointer to the user data that Core Graphics will pass to the function being applied, or NULL.
   * @param {CGPathApplierFunction} _function - 
   * @returns {void}
   * @desc For each element in the specified path, Core Graphics calls the applier function, which can examine (but not modify) the element.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411203-apply
   */
  apply(info, _function) {
  }

  // Working with Core Foundation Types
  /**
   * Returns the Core Foundation type identifier for Core Graphics graphics paths.
   * @type {CFTypeID}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411192-typeid
   */
  static get typeID() {
    return _typeID
  }

  // Initializers

  /**
   * Creates a dashed copy of another path.
   * @access public
   * @param {CGPath} path - The path to copy.
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to elements of the converted path before adding them to the new path.
   * @param {number} phase - A value that specifies how far into the dash pattern the line starts, in units of the user space. For example, passing a value of 3 means the line is drawn with the dash pattern starting at three units from its beginning. Passing a value of 0 draws a line starting with the beginning of a dash pattern.
   * @param {?UnsafePointer<CGFloat>} lengths - An array of values that specify the lengths of the painted segments and unpainted segments, respectively, of the dash pattern—or NULL for no dash pattern.For example, passing an array with the values [2,3] sets a dash pattern that alternates between a 2-user-space-unit-long painted segment and a 3-user-space-unit-long unpainted segment. Passing the values [1,3,4,2] sets the pattern to a 1-unit painted segment, a 3-unit unpainted segment, a 4-unit painted segment, and a 2-unit unpainted segment.
   * @param {number} count - If the lengths parameter specifies an array, pass the number of elements in the array. Otherwise, pass 0.
   * @returns {void}
   * @desc The new path is created so that filling the new path draws the same pixels as stroking the original path with the specified dash parameters.
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411134-init
   */
  init__byDashing(path, transform, phase, lengths, count) {

    // Examining a Graphics Path

    this._boundingBox = null
    this._boundingBoxOfPath = null
    this._currentPoint = null
    this._isEmpty = false
  }

  /**
   * Creates a stroked copy of another path.
   * @access public
   * @param {CGPath} path - The path to copy.
   * @param {?UnsafePointer<CGAffineTransform>} transform - A pointer to an affine transformation matrix, or NULL if no transformation is needed. If specified, Core Graphics applies the transformation to elements of the converted path before adding them to the new path.
   * @param {number} lineWidth - The line width to use, in user space units. The value must be greater than 0.
   * @param {CGLineCap} lineCap - A line cap style constant—butt (the default), round, or square. 
   * @param {CGLineJoin} lineJoin - A line join value—miter (the default), round, or bevel. 
   * @param {number} miterLimit - The miter limit to use.
   * @returns {void}
   * @desc The new path is created so that filling the new path draws the same pixels as stroking the original path.If the line join style is set to kCGLineJoinMiter, Core Graphics uses the miter limit to determine whether the lines should be joined with a bevel instead of a miter. Core Graphics divides the length of the miter by the line width. If the result is greater than the miter limit, Core Graphics converts the style to a bevel. 
   * @see https://developer.apple.com/reference/coregraphics/cgpath/1411128-init
   */
  init__byStroking(path, transform, lineWidth, lineCap, lineJoin, miterLimit) {

    // Examining a Graphics Path

    this._boundingBox = null
    this._boundingBoxOfPath = null
    this._currentPoint = null
    this._isEmpty = false
  }
}
