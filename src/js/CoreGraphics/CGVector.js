'use strict'



/**
 * A structure that contains a two-dimensional vector.
 * @access public
 * @see https://developer.apple.com/reference/coregraphics/cgvector
 */
export default class CGVector {

  // Initializers

  /**
   * Creates a vector with components specified as integer values.
   * @access public
   * @param {number} dx - 
   * @param {number} dy - 
   * @returns {void}
   * @see https://developer.apple.com/reference/coregraphics/cgvector/1456249-init
   */
  init(dx, dy) {

    // Special Values

    this._zero = null

    // Geometric Properties

    this._dx = 0
    this._dy = 0
  }

  // Special Values
  /**
   * The vector whose components are both zero.
   * @type {CGVector}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgvector/1454067-zero
   */
  get zero() {
    return this._zero
  }

  // Geometric Properties
}
