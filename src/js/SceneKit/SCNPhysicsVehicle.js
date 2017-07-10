'use strict'

import SCNPhysicsBehavior from './SCNPhysicsBehavior'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNPhysicsVehicleWheel from './SCNPhysicsVehicleWheel'


/**
 * A physics behavior that modifies a physics body to behave like a car, motorcycle, or other wheeled vehicle.
 * @access public
 * @extends {SCNPhysicsBehavior}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle
 */
export default class SCNPhysicsVehicle extends SCNPhysicsBehavior {
  // Creating a Vehicle

  /**
   * Creates a vehicle behavior.
   * @access public
   * @constructor
   * @param {SCNPhysicsBody} chassisBody - A physics body to serve as the vehicle’s chassis.
   * @param {SCNPhysicsVehicleWheel[]} wheels - An array of SCNPhysicsVehicleWheel objects representing the vehicle’s wheels. A vehicle must have at least one wheel.
   * @desc Each object in the wheels array associates a node with the wheel to serve as its visual representation and defines properties for the wheel’s physical characteristics. Each wheel object must reference a unique node, which should be a child of the node containing the physics body used for the vehicle’s chassis. Typically, you load a node hierarchy representing the vehicle and all of its wheels from a scene file and then designate which nodes serve as the body and wheels.For a behavior to take effect, you must add it to the physics simulation by calling the addBehavior(_:) method on your scene’s SCNPhysicsWorld object.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387943-init
   */
  constructor(chassisBody, wheels) {
    super()

    // Working with a Vehicle’s Physical Characteristics

    this._chassisBody = null
    this._wheels = null

    // Driving a Vehicle

    this._speedInKilometersPerHour = 0
  }

  // Working with a Vehicle’s Physical Characteristics

  /**
   * The physics body representing the vehicle’s chassis.
   * @type {SCNPhysicsBody}
   * @desc The vehicle’s chassis must be a dynamic body.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387985-chassisbody
   */
  get chassisBody() {
    return this._chassisBody
  }

  /**
   * An array of SCNPhysicsVehicleWheel objects representing the vehicle’s wheels.
   * @type {SCNPhysicsVehicleWheel[]}
   * @desc You can dynamically change the suspension and traction properties of a wheel connected to the vehicle by using the corresponding SCNPhysicsVehicleWheel object or by using Key-value coding with a keypath of the form wheels[index].propertyName. For example, the following code changes the size of the first wheel attached to the vehicle, simulating a failed tire:SCNPhysicsVehicle *vehicle = [SCNPhysicsVehicle vehicleWithChassisBody:car wheels:wheels];
[vehicle setValue:@0.1 forKeyPath:@"wheels[0].radius"];
SCNPhysicsVehicle *vehicle = [SCNPhysicsVehicle vehicleWithChassisBody:car wheels:wheels];
[vehicle setValue:@0.1 forKeyPath:@"wheels[0].radius"];

   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387906-wheels
   */
  get wheels() {
    return this._wheels
  }

  // Driving a Vehicle

  /**
   * Applies a force between the specified wheel and the ground under the vehicle.
   * @access public
   * @param {number} value - The magnitude of the force, in newtons.
   * @param {number} index - The index of the wheel applying the force.
   * @returns {void}
   * @desc Applying a positive force turns the wheel in a direction that would move the vehicle forward; applying a negative force moves the vehicle in reverse.As with all physical quantities in SceneKit, you need not use realistic force measurements in your app—the effects of the physics simulation depend on the relative differences between forces, not on their absolute values. You may use whatever values produce the behavior or gameplay you’re looking for as long as you use them consistently.Calling this method applies a force for one step (or frame) of the physics simulation. To continuously accelerate a vehicle, call this method again on subequent simulation steps (for example, from your scene renderer delegate’s renderer(_:updateAtTime:) method) until the vehicle reaches your desired speed.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387963-applyengineforce
   */
  applyEngineForceForWheelAt(value, index) {
  }

  /**
   * Applies a force between the specified wheel and the ground under the vehicle.
   * @access public
   * @param {number} value - The magnitude of the torque, in newton-meters.
   * @param {number} index - The index of the wheel applying the force.
   * @returns {void}
   * @desc Applying a braking force causes the wheel to slow down regardless of the direction it’s currently spinning in.As with all physical quantities in SceneKit, you need not use realistic force measurements in your app—the effects of the physics simulation depend on the relative differences between forces, not on their absolute values. You may use whatever values produce the behavior or gameplay you’re looking for as long as you use them consistently.Calling this method applies a braking force for one step (or frame) of the physics simulation. To continuously decelerate a vehicle, call this method again on subequent simulation steps (for example, from your scene renderer delegate’s renderer(_:updateAtTime:) method) until the vehicle stops or reaches your desired speed.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387894-applybrakingforce
   */
  applyBrakingForceForWheelAt(value, index) {
  }

  /**
   * Pivots the specified wheel around its steering axis.
   * @access public
   * @param {number} value - The angle to set the wheel at relative to its steering axis, in radians.
   * @param {number} index - The index, in the vehicle’s wheels array, of the wheel to be pivoted.
   * @returns {void}
   * @desc Steering angles are relative to the wheel’s steeringAxis vector. With the default steering axis of {0.0, -1.0, 0.0}, a steering angle of 0.0 represents neutral steering, positive values steer the vehicle to the right, and negative values steer to the left.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387952-setsteeringangle
   */
  setSteeringAngleForWheelAt(value, index) {
  }

  /**
   * The vehicle’s ground speed, in kilometers per hour.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsvehicle/1387910-speedinkilometersperhour
   */
  get speedInKilometersPerHour() {
    return this._speedInKilometersPerHour
  }
}
