'use strict'

import SCNConstraint from './SCNConstraint'

/**
 * 
 * @access public
 * @extends {SCNConstraint}
 * @see https://developer.apple.com/documentation/scenekit/scnaccelerationconstraint
 */
export default class SCNAccelerationConstraint extends SCNConstraint {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Instance Properties

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaccelerationconstraint/2873359-damping
     */
    this.damping = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaccelerationconstraint/2873367-decelerationdistance
     */
    this.decelerationDistance = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaccelerationconstraint/2873355-maximumlinearacceleration
     */
    this.maximumLinearAcceleration = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaccelerationconstraint/2873384-maximumlinearvelocity
     */
    this.maximumLinearVelocity = 0

  }
}
