'use strict'

import GCControllerElement from './GCControllerElement'
//import GCControllerButtonValueChangedHandler from '../undefined/GCControllerButtonValueChangedHandler'

/**
 * A control element measuring a button press. 
 * @access public
 * @extends {GCControllerElement}
 * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerbuttoninput
 */
export default class GCControllerButtonInput extends GCControllerElement {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  constructor() {
    super()

    // Reading the Button’s Value

    this._isPressed = false
    this._value = 0

    // Receiving Notifications When the Button’s Value Changes

    /**
     * A handler to be called when the button is pressed or released.
     * @type {?GCControllerButtonValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerbuttoninput/1522556-pressedchangedhandler
     */
    this.pressedChangedHandler = null

    /**
     * A handler to be called when the pressure on a button changes.
     * @type {?GCControllerButtonValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerbuttoninput/1522491-valuechangedhandler
     */
    this.valueChangedHandler = null

  }

  // Reading the Button’s Value

  /**
   * A Boolean value that indicates whether the button is pressed.
   * @type {boolean}
   * @desc 
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerbuttoninput/1522539-ispressed
   */
  get isPressed() {
    return this._isPressed
  }

  /**
   * The level of pressure being applied to the button.
   * @type {number}
   * @desc If pressure is being applied to the button, then the isPressed property is true and this property indicates the amount of pressure being applied to the button. The pressure value is normalized to a number between 0.0 (minimum pressure) and 1.0 (maximum pressure).If no pressure is being applied to the button, then the isPressed property is false and this property holds a value of 0.0.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerbuttoninput/1522580-value
   */
  get value() {
    return this._value
  }
}
