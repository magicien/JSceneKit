'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import SCNNode from './SCNNode'
//import SCNVector3 from './SCNVector3'

/**
 * Detailed information about a contact between two physics bodies in a scene’s physics simulation. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact
 */
export default class SCNPhysicsContact extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Inspecting the Contact Properties

    this._nodeA = null
    this._nodeB = null
    this._contactPoint = null
    this._contactNormal = null
    this._collisionImpulse = 0
    this._penetrationDistance = 0
  }

  // Inspecting the Contact Properties

  /**
   * The node containing the first body in the contact.
   * @type {SCNNode}
   * @desc Use the node’s physicsBody property to examine physics characteristics of the node.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact/1523445-nodea
   */
  get nodeA() {
    return this._nodeA
  }

  /**
   * The node containing the second body in the contact.
   * @type {SCNNode}
   * @desc Use the node’s physicsBody property to examine physics characteristics of the node.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact/1524232-nodeb
   */
  get nodeB() {
    return this._nodeB
  }

  /**
   * The contact point between the two physics bodies, in scene coordinates.
   * @type {SCNVector3}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact/1523810-contactpoint
   */
  get contactPoint() {
    return this._contactPoint
  }

  /**
   * The normal vector at the contact point between the two physics bodies, in scene coordinates.
   * @type {SCNVector3}
   * @desc This vector tells you which direction the bodies were moving relative to one another at the time of the collision. For example, in a game you can examine this vector to have enemy characters take damage when struck from above by the player character but damage the player character instead when they collide side-to-side.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact/1522833-contactnormal
   */
  get contactNormal() {
    return this._contactNormal
  }

  /**
   * The force over time of the collision, in newton-seconds.
   * @type {number}
   * @desc This property’s value tells you how hard the bodies struck each other in a collision. For example, in a game you might allow a character to proceed unhindered after a minor collision, but take damage when struck with sufficient force.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact/1523944-collisionimpulse
   */
  get collisionImpulse() {
    return this._collisionImpulse
  }

  /**
   * The distance of overlap, in units of scene coordinate space, between the two physics bodies.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontact/1522870-penetrationdistance
   */
  get penetrationDistance() {
    return this._penetrationDistance
  }
}
