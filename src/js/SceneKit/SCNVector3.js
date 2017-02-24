'use strict'

/**
 * A representation of a three-component vector.
 * @access public
 * @see https://developer.apple.com/reference/scenekit/scnvector3
 */
export default class SCNVector3 {

  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {number} x - 
   * @param {number} y - 
   * @param {number} z - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnvector3/1522904-init
   */
  constructor(x, y, z) {
    // Instance Properties
    this.x = x
    this.y = y
    this.z = z
  }
}
