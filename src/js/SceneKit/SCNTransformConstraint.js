'use strict'

import SCNConstraint from './SCNConstraint'
import SCNNode from './SCNNode'
import SCNMatrix4 from './SCNMatrix4'
import SCNQuaternion from './SCNQuaternion'
import SCNVector3 from './SCNVector3'


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
   * @constructor
   */
  //constructor() {
  //  super()
  //}

  // Creating a Transform Constraint

  /**
   * Creates a new transform constraint.
   * @access public
   * @param {boolean} world - true to evaluate the constraint in the scene’s world coordinate space, or false to evaluate it relative to the local coordinate space of each constrained node.
   * @param {function(arg1: SCNNode, arg2: SCNMatrix4): SCNMatrix4} block - A block to be called when Scene Kit evaluates the constraint.The block takes the following parameters:nodeThe constrained node.transformThe constrained node’s current presentation transformation—the value of the transform property of the constrained node’s presentation object. If the node is affected by an in-progress animation, this value reflects the currently visible state of the node during the animation (rather than its target state that will be visible when the animation completes).The block returns a transformation matrix, which Scene Kit then applies to the node. If you return the transform value passed to the block, your constraint has no effect on the node. 
   * @returns {SCNTransformConstraint}
   * @desc The world parameter determines the coordinate space of the transformations passed to and returned by the block parameter.
   * @see https://developer.apple.com/documentation/scenekit/scntransformconstraint/1468679-init
   */
  static constraintInWorldSpaceWith(world, block) {
    const constraint = new SCNTransformConstraint()
    // TODO: implement
    return constraint
  }

  // Type Methods

  /**
   * 
   * @access public
   * @param {boolean} world - 
   * @param {function(arg1: SCNNode, arg2: SCNQuaternion): SCNQuaternion} block - 
   * @returns {SCNTransformConstraint} - 
   * @see https://developer.apple.com/documentation/scenekit/scntransformconstraint/2867503-orientationconstraint
   */
  static orientationConstraintInWorldSpaceWith(world, block) {
    const constraint = new SCNTransformConstraint()
    // TODO: implement
    return constraint
  }

  /**
   * 
   * @access public
   * @param {boolean} world - 
   * @param {function(arg1: SCNNode, arg2: SCNVector3): SCNVector3} block - 
   * @returns {SCNTransformConstraint} - 
   * @see https://developer.apple.com/documentation/scenekit/scntransformconstraint/2867461-positionconstraint
   */
  static positionConstraintInWorldSpaceWith(world, block) {
    const constraint = new SCNTransformConstraint()
    // TODO: implement
    return constraint
  }
}
