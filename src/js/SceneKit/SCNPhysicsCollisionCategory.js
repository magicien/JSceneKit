'use strict'



/**
 * Default values for a physics body’s categoryBitMask and collisionBitMask properties.
 * @access public
 * @see https://developer.apple.com/documentation/scenekit/scnphysicscollisioncategory
 */
export default class SCNPhysicsCollisionCategory {

  // Constants
  /**
   * The default categoryBitMask value for dynamic and kinematic bodies.
   * @type {SCNPhysicsCollisionCategory}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscollisioncategory/1514799-default
   */
  get default() {
    return this._default
  }
  /**
   * The default categoryBitMask value for static bodies.
   * @type {SCNPhysicsCollisionCategory}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscollisioncategory/1514778-static
   */
  get static() {
    return this._static
  }
  /**
   * This is the default value for a physics body’s collisionBitMask property.
   * @type {SCNPhysicsCollisionCategory}
   * @desc With this collision mask, a physics body can collide with all other physics bodies.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscollisioncategory/1514784-all
   */
  get all() {
    return this._all
  }

  // Initializers

  /**
   * 
   * @access public
   * @param {number} rawValue - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscollisioncategory/1523649-init
   */
  init(rawValue) {

    // Constants

    this._default = null
    this._static = null
    this._all = null
  }
}
