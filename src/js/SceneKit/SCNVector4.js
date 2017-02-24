'use strict'



/**
 * A representation of a four-component vector.
 * @access public
 * @see https://developer.apple.com/reference/scenekit/scnvector4
 */
export default class SCNVector4 {
  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {number} x - 
   * @param {number} y - 
   * @param {number} z - 
   * @param {number} w - 
   * @see https://developer.apple.com/reference/scenekit/scnvector4/1523931-init
   */
  constructor(x, y, z, w) {
    // Instance Properties
    this._x = x
    this._y = y
    this._z = z
    this._w = w
  }
}
