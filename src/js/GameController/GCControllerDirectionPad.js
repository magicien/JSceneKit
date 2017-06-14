'use strict'

import GCControllerElement from './GCControllerElement'
import GCControllerAxisInput from './GCControllerAxisInput'
import GCControllerButtonInput from './GCControllerButtonInput'
//import GCControllerDirectionPadValueChangedHandler from './GCControllerDirectionPadValueChangedHandler'


/**
 * A control element associated with a directional pad or a thumbstick.
 * @access public
 * @extends {GCControllerElement}
 * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad
 */
export default class GCControllerDirectionPad extends GCControllerElement {

  /**
   * constructor
   * @access public
   */
  constructor() {
    super()

    // Reading the Directional Pad as a Pair of Axes

    this._xAxis = new GCControllerAxisInput()
    this._yAxis = new GCControllerAxisInput()

    // Reading the Directional Pad as a Four Directional Buttons

    this._up = new GCControllerButtonInput()
    this._down = new GCControllerButtonInput()
    this._left = new GCControllerButtonInput()
    this._right = new GCControllerButtonInput()

    // Receiving Notifications When the Directional Pad’s Values Change

    /**
     * A handler to be called when the directional pad element changes values.
     * @type {?GCControllerDirectionPadValueChangedHandler}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462914-valuechangedhandler
     */
    this.valueChangedHandler = null
  }

  // Reading the Directional Pad as a Pair of Axes

  /**
   * The value of the directional pad along the horizontal axis (left and right).
   * @type {GCControllerAxisInput}
   * @desc 
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462930-xaxis
   */
  get xAxis() {
    return this._xAxis
  }

  /**
   * The value of the directional pad along the vertical axis (up and down).
   * @type {GCControllerAxisInput}
   * @desc 
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462926-yaxis
   */
  get yAxis() {
    return this._yAxis
  }

  // Reading the Directional Pad as a Four Directional Buttons

  /**
   * A measurement of how far up the directional pad has been moved.
   * @type {GCControllerButtonInput}
   * @desc The value of the up property is mutually exclusive with the value of the down property. This means that whenever the value of the up property is non-zero, the value of the down property is 0.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462918-up
   */
  get up() {
    return this._up
  }

  /**
   * A measurement of how far down the directional pad has been moved.
   * @type {GCControllerButtonInput}
   * @desc The value of the down property is mutually exclusive with the value of the up property. This means that whenever the value of the down property is non-zero, the value of the up property is 0.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462920-down
   */
  get down() {
    return this._down
  }

  /**
   * A measurement of how far left the directional pad has been moved.
   * @type {GCControllerButtonInput}
   * @desc The value of the left property is mutually exclusive with the value of the right property. This means that whenever the value of the left property is non-zero, the value of the right property is 0.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462924-left
   */
  get left() {
    return this._left
  }

  /**
   * A measurement of how far right the directional pad has been moved.
   * @type {GCControllerButtonInput}
   * @desc The value of the right property is mutually exclusive with the value of the left property. This means that whenever the value of the right property is non-zero, the value of the left property is 0.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerdirectionpad/1462922-right
   */
  get right() {
    return this._right
  }
}
