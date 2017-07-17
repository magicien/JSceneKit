'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import GCController from './GCController'
//import GCExtendedGamepadValueChangedHandler from './GCExtendedGamepadValueChangedHandler'
import GCControllerButtonInput from './GCControllerButtonInput'
import GCControllerDirectionPad from './GCControllerDirectionPad'
//import GCExtendedGamepadSnapshot from './GCExtendedGamepadSnapshot'

/**
 * The extended set of gamepad controls.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad
 */
export default class GCExtendedGamepad extends NSObject {

  /**
   * constructor
   * @access public
   */
  constructor() {
    super()

    // Determining the Controller That Owns This Profile

    this._controller = null

    // Determining When Any Element in the Profile Changes

    /**
     * A block called when any element in the profile changes values.
     * @type {?GCExtendedGamepadValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522464-valuechangedhandler
     */
    this.valueChangedHandler = null


    // Reading Shoulder Button Inputs

    this._leftShoulder = new GCControllerButtonInput()
    this._rightShoulder = new GCControllerButtonInput()

    // Reading Directional Pad Inputs

    this._dpad = new GCControllerDirectionPad()

    // Reading Face Button Inputs

    this._buttonA = new GCControllerButtonInput()
    this._buttonB = new GCControllerButtonInput()
    this._buttonX = new GCControllerButtonInput()
    this._buttonY = new GCControllerButtonInput()

    // Reading Thumbstick Inputs

    this._leftThumbstick = new GCControllerDirectionPad()
    this._rightThumbstick = new GCControllerDirectionPad()

    // Reading Trigger Inputs

    this._leftTrigger = new GCControllerButtonInput()
    this._rightTrigger = new GCControllerButtonInput()
  }

  _update() {
  }

  // Determining the Controller That Owns This Profile

  /**
   * The controller this profile is associated with.
   * @type {?GCController}
   * @desc 
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522427-controller
   */
  get controller() {
    return this._controller
  }

  // Reading Shoulder Button Inputs

  /**
   * The left shoulder button element.
   * @type {GCControllerButtonInput}
   * @desc The shoulder buttons in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522418-leftshoulder
   */
  get leftShoulder() {
    return this._leftShoulder
  }

  /**
   * The right shoulder button element.
   * @type {GCControllerButtonInput}
   * @desc The shoulder buttons in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522484-rightshoulder
   */
  get rightShoulder() {
    return this._rightShoulder
  }

  // Reading Directional Pad Inputs

  /**
   * The d-pad element.
   * @type {GCControllerDirectionPad}
   * @desc The directional pad in the extended gamepad profile is an analog control.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522422-dpad
   */
  get dpad() {
    return this._dpad
  }

  // Reading Face Button Inputs

  /**
   * The bottom face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522558-buttona
   */
  get buttonA() {
    return this._buttonA
  }
  
  /**
   * The right face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522396-buttonb
   */
  get buttonB() {
    return this._buttonB
  }

  /**
   * The left face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522567-buttonx
   */
  get buttonX() {
    return this._buttonX
  }

  /**
   * The top face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522473-buttony
   */
  get buttonY() {
    return this._buttonY
  }

  // Reading Thumbstick Inputs

  /**
   * The left thumbstick element.
   * @type {GCControllerDirectionPad}
   * @desc The thumbsticks in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522564-leftthumbstick
   */
  get leftThumbstick() {
    return this._leftThumbstick
  }

  /**
   * The right thumbstick element.
   * @type {GCControllerDirectionPad}
   * @desc The thumbsticks in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522437-rightthumbstick
   */
  get rightThumbstick() {
    return this._rightThumbstick
  }

  // Reading Trigger Inputs

  /**
   * The left trigger element.
   * @type {GCControllerButtonInput}
   * @desc The triggers in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522569-lefttrigger
   */
  get leftTrigger() {
    return this._leftTrigger
  }

  /**
   * The right trigger element.
   * @type {GCControllerButtonInput}
   * @desc The triggers in the extended gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522563-righttrigger
   */
  get rightTrigger() {
    return this._rightTrigger
  }

  // Saving a Snapshot

  /**
   * Saves a snapshot of all of the profile’s elements.
   * @access public
   * @returns {GCExtendedGamepadSnapshot} - 
   * @see https://developer.apple.com/documentation/gamecontroller/gcextendedgamepad/1522447-savesnapshot
   */
  saveSnapshot() {
    return null
  }
}
