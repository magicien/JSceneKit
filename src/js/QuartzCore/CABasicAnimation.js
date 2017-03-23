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
   * @param {?string} path -
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
   * @returns {CABasicAnimation} -
   */
  copy() {
    const anim = super.copy()
    //anim._copyValue(this)

    anim.fromValue = this.fromValue
    anim.toValue = this.toValue
    anim.byValue = this.byValue

    return anim
  }

  /*
  _copyValue(src) {
    this.fromValue = src.fromValue
    this.toValue = src.toValue
    this.byValue = src.byValue
  }
  */

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
      if(t < 0){
        t = 0
      }
      if(t > 1){
        t = 1
      }
      //console.log('t = ' + t)
    }

    let value = 0
    const currentValue = obj.valueForKeyPath(this.keyPath)
    if(this.fromValue !== null && this.toValue !== null){
      value = this._lerp(this.fromValue, this.toValue, t)
    }else if(this.fromValue !== null && this.byValue !== null){
      value = this._lerp(this.fromValue, this.fromValue + this.byValue, t)
    }else if(this.byValue !== null && this.toValue !== null){
      value = this._lerp(this.toValue - this.byValue, this.toValue, t)
    }else if(this.fromValue !== null){
      value = this._lerp(this.fromValue, currentValue, t)
    }else if(this.toValue !== null){
      value = this._lerp(currentValue, this.toValue, t)
    }else if(this.byValue !== null){
      value = this._lerp(currentValue, currentValue + this.byValue, t)
    }else{
      // TODO: retain prevValue
      //value = this._lerp(prevValue, currentValue, t)
    }
    //console.log(`CABasicAnimation._applyAnimation: keyPath: ${this.keyPath}, time: ${time}, baseTime: ${baseTime}, t: ${t}, value: ${value}`)
    this._applyValue(obj, value)
  }
}
