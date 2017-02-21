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
   * @param {number} x - 
   * @param {number} y - 
   * @param {number} z - 
   * @param {number} w - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnvector4/1523931-init
   */
  init(x, y, z, w) {

    // Instance Properties

    this._w = 0
    this._x = 0
    this._y = 0
    this._z = 0
  }

  // Instance Properties
}
