'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'


/**
 * The abstract superclass for objects that automatically adjust the position, rotation, or scale of a node based on rules you define.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/reference/scenekit/scnconstraint
 */
export default class SCNConstraint extends NSObject {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Tuning a Constraint’s Effect on Nodes

    /**
     * The influence of the constraint on the node’s transformation.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnconstraint/1468692-influencefactor
     */
    this.influenceFactor = 0

  }
}
