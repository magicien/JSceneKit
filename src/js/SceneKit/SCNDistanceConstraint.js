'use strict'

import SCNConstraint from './SCNConstraint'
import SCNNode from './SCNNode'


/**
 * 
 * @access public
 * @extends {SCNConstraint}
 * @see https://developer.apple.com/documentation/scenekit/scndistanceconstraint
 */
export default class SCNDistanceConstraint extends SCNConstraint {

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
     * @see https://developer.apple.com/documentation/scenekit/scndistanceconstraint/2873358-maximumdistance
     */
    this.maximumDistance = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scndistanceconstraint/2873385-minimumdistance
     */
    this.minimumDistance = 0

    /**
     * 
     * @type {?SCNNode}
     * @see https://developer.apple.com/documentation/scenekit/scndistanceconstraint/2873381-target
     */
    this.target = null

  }

  // Initializers

  /**
   * 
   * @access public
   * @param {?SCNNode} target - 
   * @returns {SCNDistanceConstraint}
   * @see https://developer.apple.com/documentation/scenekit/scndistanceconstraint/2873360-init
   */
  static constraintWithTarget(target) {
    const constraint = new SCNDistanceConstraint()
    // TODO: implement
    return constraint
  }
}
