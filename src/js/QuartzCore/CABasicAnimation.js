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

    this._baseValue = null
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
    }

    let isObject = false
    if(this._baseValue === null){
      this._baseValue = obj.valueForKeyPath(this.keyPath)
      if(typeof this._baseValue !== 'number' && this._baseValue !== null){
        this._baseValue = this._baseValue._copy()
        isObject = true
      }
    }

    let fromValue = 0
    let toValue = 0
    if(this.fromValue !== null && this.toValue !== null){
      fromValue = this.fromValue
      toValue = this.toValue
    }else if(this.fromValue !== null && this.byValue !== null){
      fromValue = this.fromValue
      if(isObject){
        toValue = this.fromValue.add(this.byValue)
      }else{
        toValue = this.fromValue + this.byValue
      }
    }else if(this.byValue !== null && this.toValue !== null){
      if(isObject){
        fromValue = this.toValue.sub(this.byValue)
      }else{
        fromValue = this.toValue - this.byValue
      }
      toValue = toValue
    }else if(this.fromValue !== null){
      fromValue = this.fromValue
      toValue = this._baseValue
    }else if(this.toValue !== null){
      fromValue = this._baseValue
      toValue = this.toValue
    }else if(this.byValue !== null){
      fromValue = this._baseValue
      if(isObject){
        toValue = this._baseValue.add(this.byValue)
      }else{
        toValue = this._baseValue + this.byValue
      }
    }else{
      // TODO: retain prevValue
      //value = this._lerp(prevValue, currentValue, t)
    }
    const value = this._lerp(fromValue, toValue, t)

    //console.log(`CABasicAnimation._applyAnimation: keyPath: ${this.keyPath}, time: ${time}, baseTime: ${baseTime}, t: ${t}, value: ${value}`)
    this._applyValue(obj, value)
    this._handleEvents(obj, t)
  }
}
