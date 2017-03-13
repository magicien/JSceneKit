'use strict'

import SCNPhysicsBehavior from './SCNPhysicsBehavior'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNVector3 from './SCNVector3'


/**
 * A physics behavior that connects two bodies and allows them to pivot around each other on a single axis.
 * @access public
 * @extends {SCNPhysicsBehavior}
 * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint
 */
export default class SCNPhysicsHingeJoint extends SCNPhysicsBehavior {
  // Creating a Hinge Joint

  /**
   * Creates a hinge joint connecting two physics bodies.
   * @access public
   * @constructor
   * @param {SCNPhysicsBody} bodyA - The first physics body to be connected by the joint.
   * @param {SCNVector3} axisA - The axis that the hinge pivots around, relative to the node containing the first body.
   * @param {SCNVector3} anchorA - The point at which the hinge connects, relative to the node containing the first body.
   * @param {SCNPhysicsBody} bodyB - The second physics body to be connected by the joint.
   * @param {SCNVector3} axisB - The axis that the hinge pivots around, relative to the node containing the second body.
   * @param {SCNVector3} anchorB - The point at which the hinge connects, relative to the node containing the second body.
   * @desc For a behavior to take effect, add it to the physics simulation by calling the addBehavior(_:) method on your scene’s SCNPhysicsWorld object. The physics bodies constrained by the joint must be attached to nodes in the scene.
   * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387898-init
   */
  constructor(bodyA, axisA, anchorA, bodyB, axisB, anchorB) {
    super()

    // Managing the Characteristics of a Hinge Joint

    /**
     * The axis that the hinge pivots around, relative to the node containing the first body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387888-axisa
     */
    this.axisA = null

    /**
     * The point at which the hinge connects, relative to the node containing the first body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387936-anchora
     */
    this.anchorA = null

    /**
     * The axis that the hinge pivots around, relative to the node containing the second body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387914-axisb
     */
    this.axisB = null

    /**
     * The point at which the hinge connects, relative to the node containing the second body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387979-anchorb
     */
    this.anchorB = null

    this._bodyA = null
    this._bodyB = null
  }

  // Managing the Characteristics of a Hinge Joint

  /**
   * The first physics body connected by the joint.
   * @type {SCNPhysicsBody}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387973-bodya
   */
  get bodyA() {
    return this._bodyA
  }

  /**
   * The second physics body connected by the joint.
   * @type {?SCNPhysicsBody}
   * @desc This property’s value is nil if the joint was created using the init(body:axis:anchor:) method.
   * @see https://developer.apple.com/reference/scenekit/scnphysicshingejoint/1387918-bodyb
   */
  get bodyB() {
    return this._bodyB
  }
}
