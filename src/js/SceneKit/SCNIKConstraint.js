'use strict'

import SCNConstraint from './SCNConstraint'
import SCNNode from './SCNNode'
import SCNVector3 from './SCNVector3'


/**
 * A constraint that applies inverse kinematics to make a chain of nodes “reach” toward a target point.
 * @access public
 * @extends {SCNConstraint}
 * @see https://developer.apple.com/reference/scenekit/scnikconstraint
 */
export default class SCNIKConstraint extends SCNConstraint {

  // Creating an Inverse Kinematics Constraint

  /**
   * Initializes an inverse kinematics constraint whose chain of nodes begins with the specified node.
   * @access public
   * @param {SCNNode} chainRootNode - 
   * @returns {void}
   * @desc The root node is the highest node in the hierarchy moved by the constraint. For example, a robot arm may have two arm segments and a hand connected to a body. The upper arm is a child node of the body, the lower arm is a child node of the upper arm, and the hand is a child node of the lower arm. In this case, the upper arm is the chain root node, because the body should not move to follow the hand.The node you apply the constraint to (using that node’s constraints property) is the end effector of the chain—the lowest node in the hierarchy. When you set the constraint’s targetPosition property, SceneKit attempts to move this node toward the target point by rotating it relative to its parent node (and rotating its parent and ancestor nodes, up the chain ending with the chainRoot node). Continuing the above example, the end effector of the robot arm is its hand.
   * @see https://developer.apple.com/reference/scenekit/scnikconstraint/1468694-init
   */
  init(chainRootNode) {

    // Adjusting the Constraint’s Limits of Motion

    this._chainRootNode = null

    // Applying Inverse Kinematics to the Constrained Node

    /**
     * The desired position for the constrained node, in the scene’s world coordinate space. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnikconstraint/1468651-targetposition
     */
    this.targetPosition = null

  }

  /**
   * Creates an inverse kinematics constraint whose chain of nodes begins with the specified node.
   * @access public
   * @param {SCNNode} chainRootNode - 
   * @returns {SCNIKConstraint} - 
   * @desc The root node is the highest node in the hierarchy moved by the constraint. For example, a robot arm may have two arm segments and a hand connected to a body. The upper arm is a child node of the body, the lower arm is a child node of the upper arm, and the hand is a child node of the lower arm. In this case, the upper arm is the chain root node, because the body should not move to follow the hand.The node you apply the constraint to (using that node’s constraints property) is the end effector of the chain—the lowest node in the hierarchy. When you set the constraint’s targetPosition property, SceneKit attempts to move this node toward the target point by rotating it relative to its parent node (and rotating its parent and ancestor nodes, up the chain ending with the chainRoot node). Continuing the above example, the end effector of the robot arm is its hand.
   * @see https://developer.apple.com/reference/scenekit/scnikconstraint/1468653-inversekinematicsconstraint
   */
  static inverseKinematicsConstraint(chainRootNode) {
    return null
  }

  // Adjusting the Constraint’s Limits of Motion

  /**
   * Returns the rotation limit, in degrees, for the specified node.
   * @access public
   * @param {SCNNode} node - A node affected by the constraint—either the node whose constraints property references the constraint or one of that node’s parent or ancestor nodes, up to the node specified by the constraint’s chainRootNode property.
   * @returns {number} - 
   * @desc When SceneKit evaluates the IK constraint, it checks the target orientations of each node in the chain relative to their initial orientations (as of when the constraint was applied to a node). For each node in the chain, SceneKit limits the rotation (in any direction) between the initial and target orientations to the value returned by this method.The default rotation limit for each joint is 180 degrees in either direction, allowing unconstrained rotation.
   * @see https://developer.apple.com/reference/scenekit/scnikconstraint/1468681-maxallowedrotationangle
   */
  maxAllowedRotationAngleForJoint(node) {
    return 0
  }

  /**
   * Sets the rotation limit, in degrees, for the specified node.
   * @access public
   * @param {number} angle - The maximum rotation, in degrees, that SceneKit should apply to the specified node when evaluating the constraint.
   * @param {SCNNode} node - A node affected by the constraint—either the node whose constraints property references the constraint, or one of that node’s parent or ancestor nodes up to the node specified by the constraint’s chainRootNode property.
   * @returns {void}
   * @desc When SceneKit evaluates the IK constraint, it checks the target orientations of each node in the chain relative to their initial orientations (as of when the constraint was applied to a node). For each node in the chain, SceneKit limits the rotation (in any direction) between the initial and target orientations to the angle value specified with this method.The default rotation limit for each joint is 180 degrees in either direction, allowing unconstrained rotation.
   * @see https://developer.apple.com/reference/scenekit/scnikconstraint/1468649-setmaxallowedrotationangle
   */
  setMaxAllowedRotationAngleForJoint(angle, node) {
  }
  /**
   * The parent node of the hierarchy affected by the constraint.
   * @type {SCNNode}
   * @desc The root node is the highest node in the hierarchy moved by the constraint. For example, a robot arm may have two arm segments and a hand connected to a body. The upper arm is a child node of the body, the lower arm is a child node of the upper arm, and the hand is a child node of the lower arm. In this case, the upper arm is the chain root node, because the body should not move to follow the hand.
   * @see https://developer.apple.com/reference/scenekit/scnikconstraint/1468690-chainrootnode
   */
  get chainRootNode() {
    return this._chainRootNode
  }
}
