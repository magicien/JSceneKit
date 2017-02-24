'use strict'

import CAAnimation from './CAAnimation'


/**
 * An object that allows multiple animations to be grouped and run concurrently. 
 * @access public
 * @extends {CAAnimation}
 * @see https://developer.apple.com/reference/quartzcore/caanimationgroup
 */
export default class CAAnimationGroup extends CAAnimation {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Grouped animations

    /**
     * An array of CAAnimation objects to be evaluated in the time space of the receiver.
     * @type {?CAAnimation[]}
     * @see https://developer.apple.com/reference/quartzcore/caanimationgroup/1412516-animations
     */
    this.animations = []
  }
}
