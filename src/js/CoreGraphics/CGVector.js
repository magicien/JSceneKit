'use strict'



/**
 * A structure that contains a two-dimensional vector.
 * @access public
 * @see https://developer.apple.com/documentation/coregraphics/cgvector
 */
export default class CGVector {

  // Initializers

  /**
   * Creates a vector with components specified as integer values.
   * @access public
   * @constructor
   * @param {number} dx - 
   * @param {number} dy - 
   * @see https://developer.apple.com/documentation/coregraphics/cgvector/1456249-init
   */
  constructor(dx = 0, dy = 0) {
    // Geometric Properties
    this._dx = dx
    this._dy = dy
  }

  // Special Values

  /**
   * The vector whose components are both zero.
   * @type {CGVector}
   * @desc 
   * @see https://developer.apple.com/documentation/coregraphics/cgvector/1454067-zero
   */
  get zero() {
    return new CGVector()
  }
}
