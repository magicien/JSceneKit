'use strict'

import SCNConstraint from './SCNConstraint'
import SCNNode from './SCNNode'
import SCNMatrix4 from './SCNMatrix4'


/**
 * A constraint that runs a specified closure to compute a new transform (position, rotation, and scale) for each node that the constraint affects.
 * @access public
 * @extends {SCNConstraint}
 * @see https://developer.apple.com/documentation/scenekit/scntransformconstraint
 */
export default class SCNTransformConstraint extends SCNConstraint {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Creating a Transform Constraint

  /**
   * Creates a new transform constraint.
   * @access public
   * @param {boolean} world - true to evaluate the constraint in the scene’s world coordinate space, or false to evaluate it relative to the local coordinate space of each constrained node.
   * @param {function(arg1: SCNNode, arg2: SCNMatrix4): SCNMatrix4} block - A block to be called when Scene Kit evaluates the constraint.The block takes the following parameters:nodeThe constrained node.transformThe constrained node’s current presentation transformation—the value of the transform property of the constrained node’s presentation object. If the node is affected by an in-progress animation, this value reflects the currently visible state of the node during the animation (rather than its target state that will be visible when the animation completes).The block returns a transformation matrix, which Scene Kit then applies to the node. If you return the transform value passed to the block, your constraint has no effect on the node. 
   * @returns {void}
   * @desc The world parameter determines the coordinate space of the transformations passed to and returned by the block parameter.
   * @see https://developer.apple.com/documentation/scenekit/scntransformconstraint/1468679-init
   */
  initInWorldSpaceWith(world, block) {
  }
}
