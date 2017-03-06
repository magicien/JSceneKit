'use strict'

import CAAnimation from './CAAnimation'

/**
 * An abstract subclass of CAAnimation for creating animations that manipulate the value of layer properties. 
 * @access public
 * @extends {CAAnimation}
 * @see https://developer.apple.com/reference/quartzcore/capropertyanimation
 */
export default class CAPropertyAnimation extends CAAnimation {
  // Creating an Animation

  /**
   * Creates and returns an CAPropertyAnimation instance for the specified key path.
   * @access public
   * @constructor
   * @param {?string} path - 
   * @see https://developer.apple.com/reference/quartzcore/capropertyanimation/1412534-init
   */
  constructor(path) {
    super()

    // Animated Key Path

    /**
     * Specifies the key path the receiver animates.
     * @type {?string}
     * @see https://developer.apple.com/reference/quartzcore/capropertyanimation/1412496-keypath
     */
    this.keyPath = path


    // Property Value Calculation Behavior

    /**
     * Determines if the value of the property is the value at the end of the previous repeat cycle, plus the value of the current repeat cycle.
     * @type {boolean}
     * @see https://developer.apple.com/reference/quartzcore/capropertyanimation/1412538-iscumulative
     */
    this.isCumulative = false

    /**
     * Determines if the value specified by the animation is added to the current render tree value to produce the new render tree value.
     * @type {boolean}
     * @see https://developer.apple.com/reference/quartzcore/capropertyanimation/1412493-isadditive
     */
    this.isAdditive = false

    /**
     * An optional value function that is applied to interpolated values.
     * @type {?CAValueFunction}
     * @see https://developer.apple.com/reference/quartzcore/capropertyanimation/1412447-valuefunction
     */
    this.valueFunction = null
  }
}
