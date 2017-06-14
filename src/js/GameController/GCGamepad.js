'use strict'

import NSObject from '../ObjectiveC/NSObject'
import GCController from './GCController'
//import GCGamepadValueChangedHandler from './GCGamepadValueChangedHandler'
import GCControllerButtonInput from './GCControllerButtonInput'
import GCControllerDirectionPad from './GCControllerDirectionPad'
//import GCGamepadSnapshot from './GCGamepadSnapshot'

const _defaultMapping = {
  A: 0,
  B: 1,
  X: 2,
  Y: 3,
  L1: 4,
  R1: 5,
  UP: 12,
  DOWN: 13,
  LEFT: 14,
  RIGHT: 15
}

if(navigator.userAgent.indexOf('Firefox') !== -1){
  // Is this a bug or something?
  _defaultMapping.A = 1
  _defaultMapping.B = 2
  _defaultMapping.X = 0
  _defaultMapping.Y = 3
  _defaultMapping.UP = 14
  _defaultMapping.DOWN = 15
  _defaultMapping.LEFT = 16
  _defaultMapping.RIGHT = 17
}

/**
 * The standard set of gamepad controls. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad
 */
export default class GCGamepad extends NSObject {

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
     * @type {?GCGamepadValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497421-valuechangedhandler
     */
    this.valueChangedHandler = null

    // Reading Shoulder Button Inputs

    this._leftShoulder = new GCControllerButtonInput()
    this._rightShoulder = new GCControllerButtonInput()

    // Reading Directional Pad Inputs

    /**
     * @type {GCControllerDirectionPad}
     */
    this._dpad = new GCControllerDirectionPad()

    // Reading Face Button Inputs

    this._buttonA = new GCControllerButtonInput()
    this._buttonB = new GCControllerButtonInput()
    this._buttonX = new GCControllerButtonInput()
    this._buttonY = new GCControllerButtonInput()

    this._buttonMapping = new Map([
      [ this._leftShoulder, _defaultMapping.L1 ],
      [ this._rightShoulder, _defaultMapping.R1 ],
      [ this._buttonA, _defaultMapping.A ],
      [ this._buttonB, _defaultMapping.B ],
      [ this._buttonX, _defaultMapping.X ],
      [ this._buttonY, _defaultMapping.Y ]
    ])
    this._dpadMapping = new Map([
      [ this._dpad._up, _defaultMapping.UP ],
      [ this._dpad._down, _defaultMapping.DOWN ],
      [ this._dpad._left, _defaultMapping.LEFT ],
      [ this._dpad._right, _defaultMapping.RIGHT ]
    ])
  }

  _update() {
    this._buttonMapping.forEach((index, c) => {
      c._value = this._controller._state.buttons[index]
      c._isPressed = this._controller._state.pressed[index]
    })
    this._dpadMapping.forEach((index, c) => {
      c._value = this._controller._state.buttons[index]
      c._isPressed = this._controller._state.pressed[index]
    })
    this._dpad._xAxis._value = this._dpad._right._value - this._dpad._left._value
    this._dpad._yAxis._value = this._dpad._down._value - this._dpad._up._value

    this._buttonMapping.forEach((index, c) => {
      if(c.pressedChangedHandler && this._controller._updated.pressed[index]){
        c.pressedChangedHandler(c, c._value, c._isPressed)
      }
      if(this._controller._updated.buttons[index]){
        if(c.valueChangedHandler){
          c.valueChangedHandler(c, c._value, c._isPressed)
        }
        if(this.valueChangedHandler){
          this.valueChangedHandler(this, c)
        }
      }
    })
    let dpadChanged = false
    this._dpadMapping.forEach((index, c) => {
      if(this._controller._updated.pressed[index]){
        dpadChanged = true
        if(c.pressedChangedHandler){
          c.pressedChangedHandler(c, c._value, c._isPressed)
        }
      }
      if(this._controller._updated.buttons[index]){
        dpadChanged = true
        if(c.valueChangedHandler){
          c.valueChangedHandler(c, c._value, c._isPressed)
        }
        if(this.valueChangedHandler){
          this.valueChangedHandler(this, c)
        }
      }
    })
    if(dpadChanged){
      if(this._dpad.valueChangedHandler){
        this._dpad.valueChangedHandler(this._dpad, this._dpad._xAxis.value, this._dpad._yAxis.value)
      }
      if(this.valueChangedHandler){
        this.valueChangedHandler(this, this._dpad)
      }
    }
  }

  _getValue(button) {
    let index = this._buttonMapping.get(button)
    if(typeof index === 'undefined'){
      index = this._dpadMapping.get(button)
    }
    if(typeof index === 'undefined'){
      return null
    }

    return this._controller._state.buttons[index]
  }


  // Determining the Controller That Owns This Profile

  /**
   * The controller this profile is associated with.
   * @type {?GCController}
   * @desc 
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497428-controller
   */
  get controller() {
    return this._controller
  }

  // Reading Shoulder Button Inputs

  /**
   * The left shoulder button element.
   * @type {GCControllerButtonInput}
   * @desc The shoulder buttons in the gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497423-leftshoulder
   */
  get leftShoulder() {
    return this._leftShoulder
  }

  /**
   * The right shoulder button element.
   * @type {GCControllerButtonInput}
   * @desc The shoulder buttons in the gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497429-rightshoulder
   */
  get rightShoulder() {
    return this._rightShoulder
  }

  // Reading Directional Pad Inputs

  /**
   * The D-pad element.
   * @type {GCControllerDirectionPad}
   * @desc The directional pad in the gamepad profile is an analog control.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497425-dpad
   */
  get dpad() {
    return this._dpad
  }

  // Reading Face Button Inputs

  /**
   * The bottom face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497427-buttona
   */
  get buttonA() {
    return this._buttonA
  }

  /**
   * The right face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497418-buttonb
   */
  get buttonB() {
    return this._buttonB
  }

  /**
   * The left face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497417-buttonx
   */
  get buttonX() {
    return this._buttonX
  }

  /**
   * The top face button.
   * @type {GCControllerButtonInput}
   * @desc The face buttons in the gamepad profile are analog buttons.
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497431-buttony
   */
  get buttonY() {
    return this._buttonY
  }

  // Saving a Snapshot

  /**
   * Saves a snapshot of all of the profile’s elements.
   * @access public
   * @returns {GCGamepadSnapshot} - 
   * @see https://developer.apple.com/documentation/gamecontroller/gcgamepad/1497415-savesnapshot
   */
  saveSnapshot() {
    return null
  }
}
