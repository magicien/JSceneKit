'use strict'

import CGPoint from './CGPoint'
import CGRect from './CGRect'
import CGPath from './CGPath'


/**
 * A mutable graphics path: a mathematical description of shapes or lines to be drawn in a graphics context.
 * @access public
 * @see https://developer.apple.com/reference/coregraphics/cgmutablepath
 */
export default class CGMutablePath {

  // Creating Graphics Paths

  /**
   * Creates a mutable graphics path.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/1411209-init
   */
  init() {
  }

  // Copying a Graphics Path

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

  // Constructing a Graphics Path

  /**
   * Begins a new subpath at the specified point.  
   * @access public
   * @param {CGPoint} point - The point, in user space coordinates, at which to start a new subpath.
   * @param {CGAffineTransform} transform - An affine transform to apply to the point before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc The specified point becomes the start point of a new subpath. The current point is set to this start point.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427143-move
   */
  moveTo(point, transform) {
  }

  /**
   * Appends a straight line segment from the current point to the specified point. 
   * @access public
   * @param {CGPoint} point - The location, in user space coordinates, for the end of the new line segment.
   * @param {CGAffineTransform} transform - An affine transform to apply to the point before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc After adding the line segment, the current point is set to the endpoint of the line segment.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427121-addline
   */
  addLineTo(point, transform) {
  }

  /**
   * Adds a sequence of connected straight-line segments to the path. 
   * @access public
   * @param {CGPoint[]} points - An array of values that specify the start and end points of the line segments to draw. Each point in the array specifies a position in user space. The first point in the array specifies the initial starting point.
   * @param {CGAffineTransform} transform - An affine transform to apply to the points before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc Calling this convenience method is equivalent to calling the move(to:transform:) method with the first value in the points array, then calling the addLine(to:transform:) method for each subsequent point until the array is exhausted. After calling this method, the path's current point is the last point in the array.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427154-addlines
   */
  addLinesBetween(points, transform) {
  }

  /**
   * Adds a rectangular subpath to the path. 
   * @access public
   * @param {CGRect} rect - A rectangle, specified in user space coordinates.
   * @param {CGAffineTransform} transform - An affine transform to apply to the rectangle before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc This is a convenience function that adds a rectangle to a path, starting by moving to the bottom left corner and then adding lines counter-clockwise to create a rectangle, closing the subpath.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427119-addrect
   */
  addRect(rect, transform) {
  }

  /**
   * Adds a set of rectangular subpaths to the path. 
   * @access public
   * @param {CGRect[]} rects - An array of rectangles, specified in user space coordinates.
   * @param {CGAffineTransform} transform - An affine transform to apply to the rectangles before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc Calling this convenience method is equivalent to repeatedly calling the addRect(_:transform:) method for each rectangle in the array.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427131-addrects
   */
  addRects(rects, transform) {
  }

  /**
   * Adds an ellipse that fits inside the specified rectangle. 
   * @access public
   * @param {CGRect} rect - A rectangle that defines the area for the ellipse to fit in.
   * @param {CGAffineTransform} transform - An affine transform to apply to the ellipse before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc The ellipse is approximated by a sequence of Bézier curves. Its center is the midpoint of the rectangle defined by the rect parameter. If the rectangle is square, then the ellipse is circular with a radius equal to one-half the width (or height) of the rectangle. If the rect parameter specifies a rectangular shape, then the major and minor axes of the ellipse are defined by the width and height of the rectangle.The ellipse forms a complete subpath of the path—that is, the ellipse drawing starts with a move-to operation and ends with a close-subpath operation, with all moves oriented in the clockwise direction.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427120-addellipse
   */
  addEllipseIn(rect, transform) {
  }

  /**
   *  Adds a subpath to the path, in the shape of a rectangle with rounded corners.
   * @access public
   * @param {CGRect} rect - The rectangle to add, specified in user space coordinates.
   * @param {number} cornerWidth - The horizontal size, in user space coordinates, for rounded corner sections.
   * @param {number} cornerHeight - The vertical size, in user space coordinates, for rounded corner sections.
   * @param {CGAffineTransform} transform - An affine transform to apply to the rectangle before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc This convenience method is equivalent to a move operation to start the subpath followed by a series of arc and line operations that construct the rounded rectangle. Each corner of the rounded rectangle is one-quarter of an ellipse with axes equal to the cornerWidth and cornerHeight parameters. The rounded rectangle forms a closed subpath oriented in the clockwise direction.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427144-addroundedrect
   */
  addRoundedRectIn(rect, cornerWidth, cornerHeight, transform) {
  }

  /**
   * Adds an arc of a circle to the path, specified with a radius and angles. 
   * @access public
   * @param {CGPoint} center - The center of the arc, in user space coordinates.
   * @param {number} radius - The radius of the arc, in user space coordinates.
   * @param {number} startAngle - The angle to the starting point of the arc, measured in radians from the positive x-axis.
   * @param {number} endAngle - The angle to the end point of the arc, measured in radians from the positive x-axis.
   * @param {boolean} clockwise - true to make a clockwise arc; false to make a counterclockwise arc.
   * @param {CGAffineTransform} transform - An affine transform to apply to the arc before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc This method calculates starting and ending points using the radius and angles you specify, uses a sequence of cubic Bézier curves to approximate a segment of a circle between those points, and then appends those curves to the path.The clockwise parameter determines the direction in which the arc is created; the actual direction of the final path is dependent on the transform parameter and the current transform of a context where the path is drawn. In a flipped coordinate system (the default for UIView drawing methods in iOS), specifying a clockwise arc results in a counterclockwise arc after the transformation is applied.If the path already contains a subpath, this method adds a line connecting the current point to the starting point of the arc. If the current path is empty, his method creates a new subpath whose starting point is the starting point of the arc. The ending point of the arc becomes the new current point of the path.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427140-addarc
   */
  addArc(center, radius, startAngle, endAngle, clockwise, transform) {
  }

  /**
   * Adds an arc of a circle to the path, specified with a radius and a difference in angle.  
   * @access public
   * @param {CGPoint} center - The center of the arc, in user space coordinates.
   * @param {number} radius - The radius of the arc, in user space coordinates.
   * @param {number} startAngle - The angle to the starting point of the arc, measured in radians from the positive x-axis.
   * @param {number} delta - The difference, measured in radians, between the starting angle and ending angle of the arc. A positive value creates a counter-clockwise arc (in user space coordinates), and vice versa.
   * @param {CGAffineTransform} transform - An affine transform to apply to the arc before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc This method calculates starting and ending points using the radius and angles you specify, uses a sequence of cubic Bézier curves to approximate a segment of a circle between those points, and then appends those curves to the path.The delta parameter determines both the length of the arc the direction in which the arc is created; the actual direction of the final path is dependent on the transform parameter and the current transform of a context where the path is drawn. In a flipped coordinate system (the default for UIView drawing methods in iOS), specifying a clockwise arc results in a counterclockwise arc after the transformation is applied.If the path already contains a subpath, this method adds a line connecting the current point to the starting point of the arc. If the current path is empty, his method creates a new subpath whose starting point is the starting point of the arc. The ending point of the arc becomes the new current point of the path.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427147-addrelativearc
   */
  addRelativeArc(center, radius, startAngle, delta, transform) {
  }

  /**
   * Adds a cubic Bézier curve to the path, with the specified end point and control points. 
   * @access public
   * @param {CGPoint} end - The point, in user space coordinates, at which to end the curve.
   * @param {CGPoint} control1 - The first control point of the curve, in user space coordinates.
   * @param {CGPoint} control2 - The second control point of the curve, in user space coordinates.
   * @param {CGAffineTransform} transform - An affine transform to apply to the curve before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc This method constructs a curve starting from the path's current point and ending at the specified end point, with curvature defined by the two control points. After this method appends that curve to the current path, the end point of the curve becomes the path's current point.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427158-addcurve
   */
  addCurveTo(end, control1, control2, transform) {
  }

  /**
   * Adds a quadratic Bézier curve to the path, with the specified end point and control point. 
   * @access public
   * @param {CGPoint} end - The point, in user space coordinates, at which to end the curve.
   * @param {CGPoint} control - The control point of the curve, in user space coordinates.
   * @param {CGAffineTransform} transform - An affine transform to apply to the curve before adding to the path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc This method constructs a curve starting from the path's current point and ending at the specified end point, with curvature defined by the control point. After this method appends that curve to the current path, the end point of the curve becomes the path's current point.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427128-addquadcurve
   */
  addQuadCurveTo(end, control, transform) {
  }

  /**
   * Appends another path object to the path. 
   * @access public
   * @param {CGPath} path - The path to add.
   * @param {CGAffineTransform} transform - An affine transform to apply to the path parameter before adding to this path. Defaults to the identity transform if not specified.
   * @returns {void}
   * @desc If the path parameter is a non-empty empty path, its path elements are appended in order to this path. Afterward, the start point and current point of this path are those of the last subpath in the path parameter.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/2427150-addpath
   */
  addPath(path, transform) {
  }

  /**
   * Closes and completes a subpath in a mutable graphics path.
   * @access public
   * @returns {void}
   * @desc Appends a line from the current point to the starting point of the current subpath and ends the subpath. After closing the subpath, your application can begin a new subpath without first calling moveTo(_:x:y:). In this case, a new subpath is implicitly created with a starting and current point equal to the previous subpath’s starting point.
   * @see https://developer.apple.com/reference/coregraphics/cgmutablepath/1411188-closesubpath
   */
  closeSubpath() {
  }
}
