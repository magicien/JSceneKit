'use strict'

import CAAnimation from './CAAnimation'
import CGPoint from '../CoreGraphics/CGPoint'
import CGSize from '../CoreGraphics/CGSize'
import CGRect from '../CoreGraphics/CGRect'
import SCNMatrix4 from '../SceneKit/SCNMatrix4'
import SCNQuaternion from '../SceneKit/SCNQuaternion'
import SCNVector4 from '../SceneKit/SCNVector4'
import SCNVector3 from '../SceneKit/SCNVector3'
import SKColor from '../SpriteKit/SKColor'

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

    this._isMultiplicative = false
  }

  /**
   * @access public
   * @returns {CAPropertyAnimation} -
   */
  copy() {
    const anim = super.copy()
    //anim._copyValue(this)
    anim.keyPath = this.keyPath
    anim.isCumulative = this.isCumulative
    anim.isAdditive = this.isAdditive
    anim.valueFunction = this.valueFunction
    anim._isMultiplicative = this._isMultiplicative

    return anim
  }

  /*
  _copyValue(src) {
    console.log('CAPropertyAnimation._copyValue: ' + src.keyPath)
    this.keyPath = src.keyPath
    this.isCumulative = src.isCumulative
    this.isAdditive = src.isAdditive
    this.valueFunction = src.valueFunction
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
    }

    let value = t
    if(this.valueFunction !== null){
      value = this.valueFunction._getValueAtTime(t)
    }
    value = this._calculateWithBaseValue(obj, value)
    //console.log(`CAPropertyAnimation: obj: ${obj.name}, time: ${time}, keyPath: ${this.keyPath}, value: ${value}`)
    this._applyValue(obj, value)
    this._handleEvents(obj, t)
  }

  _calculateWithBaseValue(obj, value) {
    if(this.isAdditive){
      const baseValue = obj.valueForKeyPath(this.keyPath)
      return this._addValues(baseValue, value)
    }else if(this._isMultiplicative){
      const baseValue = obj.valueForKeyPath(this.keyPath)
      return this._mulValues(baseValue, value)
    }
    return value
  }

  _applyValue(obj, value) {
    obj.setValueForKeyPath(value, this.keyPath)
  }

  _addValues(v1, v2) {
    if(v1 instanceof Object){
      return v1.add(v2)
    }
    return v1 + v2
  }

  _mulValues(v1, v2) {
    if(v1 instanceof Object){
      return v1.mul(v2)
    }
    return v1 * v2
  }

  _lerp(from, to, t) {
    if(t === null){
      // the animation is over.
      return to
    }
    if(from instanceof SCNVector4){
      // TODO: slerp for Quaternion
      return from.lerp(to, t)
    }else if(from instanceof SCNVector3){
      return from.lerp(to, t)
    }else if(from instanceof SCNMatrix4){
      return from.lerp(to, t)
    }else if(from instanceof CGSize){
      // TODO: implement
    }else if(from instanceof CGPoint){
      // TODO: implement
    }else if(from instanceof CGRect){
      // TODO: implement
    }else if(from instanceof SKColor){
      return from._lerp(to, t)
    }
    return from + (to - from) * t
  }

  _slerp(from, to, t) {
    if(!(from instanceof SCNVector4)){
      throw new Error('CABasicAnimation._slerp: object is not SCNVector4')
    }
    return from.slerp(to, t)
  }
}
