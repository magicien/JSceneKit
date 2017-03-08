'use strict'

import CAPropertyAnimation from './CAPropertyAnimation'

/**
 * An object that provides basic, single-keyframe animation capabilities for a layer property. 
 * @access public
 * @extends {CAPropertyAnimation}
 * @see https://developer.apple.com/reference/quartzcore/cabasicanimation
 */
export default class CABasicAnimation extends CAPropertyAnimation {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor(path) {
    super(path)

    // Interpolation values

    /**
     * Defines the value the receiver uses to start interpolation.
     * @type {?Object}
     * @see https://developer.apple.com/reference/quartzcore/cabasicanimation/1412519-fromvalue
     */
    this.fromValue = null

    /**
     * Defines the value the receiver uses to end interpolation.
     * @type {?Object}
     * @see https://developer.apple.com/reference/quartzcore/cabasicanimation/1412523-tovalue
     */
    this.toValue = null

    /**
     * Defines the value the receiver uses to perform relative interpolation.
     * @type {?Object}
     * @see https://developer.apple.com/reference/quartzcore/cabasicanimation/1412445-byvalue
     */
    this.byValue = null
  }

  /**
   * @access public
   * @returns {CABasicAnimation}
   */
  copy() {
    const anim = super.copy()
    anim.fromValue = this.fromValue
    anim.toValue = this.toValue
    anim.byValue = this.byValue
    return anim
  }
}
