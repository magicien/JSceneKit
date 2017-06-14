'use strict'

import GCControllerElement from './GCControllerElement'
//import GCControllerAxisValueChangedHandler from '../undefined/GCControllerAxisValueChangedHandler'

/**
 * A control element measuring movement along a particular axis.
 * @access public
 * @extends {GCControllerElement}
 * @see https://developer.apple.com/documentation/gamecontroller/gccontrolleraxisinput
 */
export default class GCControllerAxisInput extends GCControllerElement {

  /**
   * constructor
   * @access public
   */
  constructor() {
    super()

    // Polling the Axis’ Value

    this._value = 0

    // Receiving Notifications When the Axis’ Value Changes

    /**
     * A handler to be called when the axis changes value.
     * @type {?GCControllerAxisValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontrolleraxisinput/1500221-valuechangedhandler
     */
    this.valueChangedHandler = null
  }

  // Polling the Axis’ Value

  /**
   * The current value of the axis.
   * @type {number}
   * @desc On a physical controller, it is common for a portion of the physical control’s moment to be ignored near its neutral position. This part of the control is known as its deadzone. The GCControllerAxisInput element handles the deadzone and other physical constraints of the hardware control and computes a normalized value. The value is in a range from -1 to 1.   If the value is 0, then the movement is in the deadzone. A non-zero value indicates the moment is outside of the deadzone. The value is normalized so that no values are lost because of the deadzone.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrolleraxisinput/1500224-value
   */
  get value() {
    return this._value
  }
}
