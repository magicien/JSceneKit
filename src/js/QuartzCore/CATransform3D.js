'use strict'

/**
 * Defines the standard transform matrix used throughout Core Animation.
 * @access public
 * @see https://developer.apple.com/reference/quartzcore/catransform3d
 */
export default class CATransform3D {

  // Initializers

  /**
   * 
   * @access public
   * @param {number[][]} m - 
   * @returns {void}
   * @see https://developer.apple.com/reference/quartzcore/catransform3d/1523734-init
   */
  constructor(m) {

    // Instance Properties

    this._m11 = 0
    this._m12 = 0
    this._m13 = 0
    this._m14 = 0
    this._m21 = 0
    this._m22 = 0
    this._m23 = 0
    this._m24 = 0
    this._m31 = 0
    this._m32 = 0
    this._m33 = 0
    this._m34 = 0
    this._m41 = 0
    this._m42 = 0
    this._m43 = 0
    this._m44 = 0
  }

  // Instance Properties
}
