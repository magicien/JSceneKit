'use strict'

import CAPropertyAnimation from './CAPropertyAnimation'
import SCNQuaternion from '../SceneKit/SCNQuaternion'
import SCNVector4 from '../SceneKit/SCNVector4'
import SCNVector3 from '../SceneKit/SCNVector3'
import CGSize from '../CoreGraphics/CGSize'
import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'

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
    const anim = new CABasicAnimation(this.keyPath)
    anim._copyValue(this)
    return anim
  }

  _copyValue(src) {
    super._copyValue(src)
    this.fromValue = src.fromValue
    this.toValue = src.toValue
    this.byValue = src.byValue
  }

  _applyAnimation(obj, time) {
    //console.log('CABasicAnimation._applyAnimation: ' + obj + ', ' + time)
    const activeTime = this._basetimeFromActivetime(time)
    let t = activeTime
    if(this.timingFunction !== null){
      t = this.timingFunction._getValueAtTime(activeTime)
    }
    if(t < 0){
      t = 0
    }
    if(t > 1){
      t = 1
    }
    //console.log('t = ' + t)

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
    this._applyValue(obj, value)
  }

  _lerp(from, to, t) {
    //if(from instanceof SCNQuaternion){
    //  return from.slerp(to, t)
    //}else 
    if(from instanceof SCNVector4){
      return from.lerp(to, t)
    }else if(from instanceof SCNVector3){
      return from.lerp(to, t)
    }else if(from instanceof CGSize){
      // TODO: implement
    }else if(from instanceof CGPoint){
      // TODO: implement
    }else if(from instanceof CGRect){
      // TODO: implement
    }
    return from + (to - from) * t
  }

  _slerp(from, to, t) {
    if(!(from instanceof SCNVector4)){
      throw new Error('CABasicAnimation._slerp: object is not SCNVector4')
    }
  }
}
