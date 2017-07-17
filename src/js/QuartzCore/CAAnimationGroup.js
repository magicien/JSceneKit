'use strict'

import CAAnimation from './CAAnimation'


/**
 * An object that allows multiple animations to be grouped and run concurrently. 
 * @access public
 * @extends {CAAnimation}
 * @see https://developer.apple.com/documentation/quartzcore/caanimationgroup
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
     * @see https://developer.apple.com/documentation/quartzcore/caanimationgroup/1412516-animations
     */
    this.animations = []
  }

  /**
   * apply animation to the given node.
   * @access private
   * @param {Object} obj - target object to apply this animation.
   * @param {number} time - active time
   * @param {boolean} [needTimeConversion = true] -
   * @returns {void}
   */
  _applyAnimation(obj, time, needTimeConversion = true) {
    let t = time
    if(needTimeConversion){
      const baseTime = this._basetimeFromTime(time)
      t = baseTime
      if(this.timingFunction !== null){
        t = this.timingFunction._getValueAtTime(baseTime)
      }
      //console.log(`time ${time} activeTime ${time - this._animationStartTime} baseTime ${baseTime}`)
    }

    this.animations.forEach((animation) => {
      animation._applyAnimation(obj, t, false)
    })
    this._handleEvents(obj, t)
  }

  /**
   * @access public
   * @returns {CAAnimationGroup} -
   */
  copy() {
    //console.log('CAAnimationGroup.copy')
    const anim = super.copy()

    anim.animations = this.animations.slice()

    return anim
  }

  /*
  _copyValue(src) {
    console.log('CAAnimationGroup._copyValue')
    //super._copyValue(src)
    this.animations = src.animations.slice()
  }
  */

}
