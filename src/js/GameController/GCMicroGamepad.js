'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import GCController from './GCController'
//import GCMicroGamepadValueChangedHandler from './GCMicroGamepadValueChangedHandler'
//import GCControllerDirectionPad from './GCControllerDirectionPad'
//import GCControllerButtonInput from './GCControllerButtonInput'
//import GCMicroGamepadSnapshot from './GCMicroGamepadSnapshot'


/**
 * The controls provided by the Siri Remote.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad
 */
export default class GCMicroGamepad extends NSObject {

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
     * A block called when any element in the profile changes.
     * @type {?GCMicroGamepadValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627758-valuechangedhandler
     */
    this.valueChangedHandler = null


    // Reading Directional Pad Inputs

    /**
     * A Boolean value that indicates whether the D-pad reports absolute or relative values.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627757-reportsabsolutedpadvalues
     */
    this.reportsAbsoluteDpadValues = false

    /**
     * A Boolean value that indicates whether the D-pad’s values are calculated relative to its current orientation.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627755-allowsrotation
     */
    this.allowsRotation = false

    this._dpad = null

    // Reading Face Button Inputs

    this._buttonA = null
    this._buttonX = null
  }

  // Determining the Controller That Owns This Profile
  /**
   * The controller this profile is associated with.
   * @type {?GCController}
   * @desc 
   * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627756-controller
   */
  get controller() {
    return this._controller
  }

  // Reading Directional Pad Inputs
  /**
   * The D-pad element.
   * @type {GCControllerDirectionPad}
   * @desc The directional pad in the micro gamepad profile reports analog directional information.
   * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627763-dpad
   */
  get dpad() {
    return this._dpad
  }

  // Reading Face Button Inputs
  /**
   * The first button.
   * @type {GCControllerButtonInput}
   * @desc Button A is usually activated by a harder press on the touchpad. The button is always digital.
   * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627762-buttona
   */
  get buttonA() {
    return this._buttonA
  }
  /**
   * The secondary button.
   * @type {GCControllerButtonInput}
   * @desc The secondary button is always digital.
   * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627759-buttonx
   */
  get buttonX() {
    return this._buttonX
  }

  // Saving a Snapshot

  /**
   * Saves a snapshot of all of the profile’s elements.
   * @access public
   * @returns {GCMicroGamepadSnapshot} - 
   * @see https://developer.apple.com/documentation/gamecontroller/gcmicrogamepad/1627754-savesnapshot
   */
  saveSnapshot() {
    return null
  }
}
