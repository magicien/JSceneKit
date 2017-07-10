'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNNode from './SCNNode'
import SCNVector3 from './SCNVector3'


/**
 * The appearance and physical characteristics of an individual wheel associated with an physics vehicle behavior.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel
 */
export default class SCNPhysicsVehicleWheel extends NSObject {
  // Creating a Wheel

  /**
   * Creates a wheel object.
   * @access public
   * @constructor
   * @param {SCNNode} node - The node whose contents provide the wheel’s visual representation.
   * @desc The node representing a wheel must be a child of the node whose physics body serves as the chassis of the SCNPhysicsVehicle behavior the wheel is attached to. Each wheel object must reference a unique node. To use the wheel, add it to the vehicle behavior using the addWheel: method.SceneKit uses the node’s bounding box to determine the wheel’s initial size, and it uses the node’s position to determine the where the wheel connects to the vehicle’s chassis. You can change attributes using the radius and connectionPosition properties.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387989-init
   */
  constructor(node) {
    super()

    // Managing a Wheel’s Connection to a Vehicle

    /**
     * The position of the wheel’s connection to the vehicle’s chassis.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387959-connectionposition
     */
    this.connectionPosition = null

    /**
     * The direction of the axis that the wheel spins around to move the vehicle.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387969-axle
     */
    this.axle = null

    /**
     * The direction of the axis that the wheel pivots around to steer the vehicle.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387882-steeringaxis
     */
    this.steeringAxis = null


    // Simulating Wheel Size

    /**
     * The radius of the wheel.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387991-radius
     */
    this.radius = 0


    // Simulating Traction

    /**
     * The traction between the wheel and any surface in contact with it.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387904-frictionslip
     */
    this.frictionSlip = 0


    // Simulating Suspension

    /**
     * The spring coefficient of the suspension between the vehicle and the wheel.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387983-suspensionstiffness
     */
    this.suspensionStiffness = 0

    /**
     * The coefficient that limits the speed of the suspension returning to its rest length when compressed.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387971-suspensioncompression
     */
    this.suspensionCompression = 0

    /**
     * The damping ratio that limits oscillation in the vehicle’s suspension.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387886-suspensiondamping
     */
    this.suspensionDamping = 0

    /**
     * The maximum distance that the wheel is allowed to move up or down relative to its connection point, in centimeters.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387928-maximumsuspensiontravel
     */
    this.maximumSuspensionTravel = 0

    /**
     * The maximum force of the suspension between the vehicle and the wheel, in newtons.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387934-maximumsuspensionforce
     */
    this.maximumSuspensionForce = 0

    /**
     * The resting length of the suspension, in meters.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387880-suspensionrestlength
     */
    this.suspensionRestLength = 0


    // Inspecting the Wheel Node

    this._node = null
  }

  // Inspecting the Wheel Node

  /**
   * The node providing the wheel’s visual representation.
   * @type {SCNNode}
   * @desc SceneKit automatically rotates and repositions this node in response to the physics simulation.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehiclewheel/1387892-node
   */
  get node() {
    return this._node
  }
}
