'use strict'

import SCNPhysicsBehavior from './SCNPhysicsBehavior'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNVector3 from './SCNVector3'


/**
 * A physics behavior that connects two physics bodies and allows them to pivot around each other in any direction.
 * @access public
 * @extends {SCNPhysicsBehavior}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicsballsocketjoint
 */
export default class SCNPhysicsBallSocketJoint extends SCNPhysicsBehavior {
  // Creating a Ball and Socket Joint

  /**
   * Creates a ball and socket joint connecting two physics bodies.
   * @access public
   * @constructor
   * @param {SCNPhysicsBody} bodyA - The first physics body to be connected by the joint.
   * @param {SCNVector3} anchorA - The point at which the joint connects, relative to the node containing the first body.
   * @param {SCNPhysicsBody} bodyB - The second physics body to be connected by the joint.
   * @param {SCNVector3} anchorB - The point at which the joint connects, relative to the node containing the second body.
   * @desc For a behavior to take effect, add it to the physics simulation by calling the addBehavior(_:) method on your scene’s SCNPhysicsWorld object. The physics bodies constrained by the joint must be attached to nodes in the scene.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsballsocketjoint/1387926-init
   */
  constructor(bodyA, anchorA, bodyB, anchorB) {
    super()

    // Managing the Characteristics of a Ball and Socket Joint

    /**
     * The point at which the joint connects, relative to the node containing the first body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsballsocketjoint/1387956-anchora
     */
    this.anchorA = null

    /**
     * The point at which the joint connects, relative to the node containing the second body.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsballsocketjoint/1387965-anchorb
     */
    this.anchorB = null

    this._bodyA = null
    this._bodyB = null
  }

  // Managing the Characteristics of a Ball and Socket Joint

  /**
   * The first physics body connected by the joint.
   * @type {SCNPhysicsBody}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsballsocketjoint/1387981-bodya
   */
  get bodyA() {
    return this._bodyA
  }

  /**
   * The second physics body connected by the joint.
   * @type {?SCNPhysicsBody}
   * @desc This property’s value is nil if the joint was created using the init(body:anchor:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsballsocketjoint/1387902-bodyb
   */
  get bodyB() {
    return this._bodyB
  }
}
