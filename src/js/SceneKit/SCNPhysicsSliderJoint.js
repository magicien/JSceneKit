'use strict'

import SCNPhysicsBehavior from './SCNPhysicsBehavior'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNVector3 from './SCNVector3'


/**
 * A physics behavior that connects two bodies and allows them to slide against each other and rotate around their connecting points.
 * @access public
 * @extends {SCNPhysicsBehavior}
 * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint
 */
export default class SCNPhysicsSliderJoint extends SCNPhysicsBehavior {
  // Creating a Slider Joint

  /**
   * Creates a slider joint connecting two physics bodies.
   * @access public
   * @constructor
   * @param {SCNPhysicsBody} bodyA - The first physics body to be connected by the joint.
   * @param {SCNVector3} axisA - The axis along which the first body can slide, relative to the node containing it.
   * @param {SCNVector3} anchorA - The point at which the joint connects, relative to the node containing the first body.
   * @param {SCNPhysicsBody} bodyB - The second physics body to be connected by the joint.
   * @param {SCNVector3} axisB - The axis along which the second body can slide, relative to the node containing it.
   * @param {SCNVector3} anchorB - The point at which the joint connects, relative to the node containing the second body.
   * @desc This method defines the location where the bodies are pinned together. To define their sliding or rotation motion relative to that point, use the properties listed in Limiting the Motion of a Slider Joint.For a behavior to take effect, add it to the physics simulation by calling the addBehavior(_:) method on your scene’s SCNPhysicsWorld object. The physics bodies constrained by the joint must be attached to nodes in the scene.
   * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387922-init
   */
  constructor(bodyA, axisA, anchorA, bodyB, axisB, anchorB) {
    super()

    // Managing the Characteristics of a Slider Joint

    /**
     * The axis along which the first body can slide, relative to the node containing it.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387900-axisa
     */
    this.axisA = null

    /**
     * The point at which the joint connects, relative to the node containing the first body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387958-anchora
     */
    this.anchorA = null

    /**
     * The axis along which the second body can slide, relative to the node containing it.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387948-axisb
     */
    this.axisB = null

    /**
     * The point at which the joint connects, relative to the node containing the second body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387916-anchorb
     */
    this.anchorB = null

    this._bodyA = null
    this._bodyB = null

    // Limiting the Motion of a Slider Joint

    /**
     * The minimum distance between the anchor points of the two bodies, relative to their initial positions.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387920-minimumlinearlimit
     */
    this.minimumLinearLimit = 0

    /**
     * The maximum distance between the anchor points of the two bodies, relative to their initial positions.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387890-maximumlinearlimit
     */
    this.maximumLinearLimit = 0

    /**
     * The minimum rotation angle between the two bodies, measured in radians relative to their initial orientations.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387967-minimumangularlimit
     */
    this.minimumAngularLimit = 0

    /**
     * The maximum rotation angle between the two bodies, measured in radians relative to their initial orientations.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387924-maximumangularlimit
     */
    this.maximumAngularLimit = 0


    // Applying Forces and Torques

    /**
     * The velocity at which the joint’s connected bodies should slide.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387938-motortargetlinearvelocity
     */
    this.motorTargetLinearVelocity = 0

    /**
     * The maximum linear force that the joint can apply to its connected bodies, in newtons.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387954-motormaximumforce
     */
    this.motorMaximumForce = 0

    /**
     * The angular velocity at which the joint’s connected bodies should rotate around it.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387908-motortargetangularvelocity
     */
    this.motorTargetAngularVelocity = 0

    /**
     * The maximum torque that the joint can apply to its connected bodies, in newton-meters.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387961-motormaximumtorque
     */
    this.motorMaximumTorque = 0

  }

  // Managing the Characteristics of a Slider Joint

  /**
   * The first physics body connected by the joint.
   * @type {SCNPhysicsBody}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387987-bodya
   */
  get bodyA() {
    return this._bodyA
  }

  /**
   * The second physics body connected by the joint.
   * @type {?SCNPhysicsBody}
   * @desc This property’s value is nil if the joint was created using the init(body:axis:anchor:) method.
   * @see https://developer.apple.com/reference/scenekit/scnphysicssliderjoint/1387896-bodyb
   */
  get bodyB() {
    return this._bodyB
  }
}
