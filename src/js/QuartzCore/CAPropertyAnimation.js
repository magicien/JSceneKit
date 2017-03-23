'use strict'

import CAAnimation from './CAAnimation'
import CGPoint from '../CoreGraphics/CGPoint'
import CGSize from '../CoreGraphics/CGSize'
import CGRect from '../CoreGraphics/CGRect'
import SCNMatrix4 from '../SceneKit/SCNMatrix4'
import SCNQuaternion from '../SceneKit/SCNQuaternion'
import SCNVector4 from '../SceneKit/SCNVector4'
import SCNVector3 from '../SceneKit/SCNVector3'

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
    console.log(`CAPropertyAnimation: obj: ${obj.name}, time: ${time}, keyPath: ${this.keyPath}, value: ${value}`)
    this._applyValue(obj, value)
  }

  _applyValue(obj, value) {
    //console.log('CAPropertyAnimation._applyValue: ' + obj + ', ' + value)
    /*
    const paths = this.keyPath.split('.')
    if(obj instanceof SCNMatrix4){
      switch(this.keyPath){
        case 'rotation.x':
          
          break
        case 'rotation.y':
          break
        case 'rotation.z':
        case 'rotation':
          break
        case 'quaternion':
          break
        case 'scale.x':
          break
        case 'scale.y':
          break
        case 'scale.z':
          break
        case 'scale':
          break
        case 'translation.x':
          break
        case 'translation.y':
          break
        case 'translation.z':
          break
        case 'translation':
          break
        default:
          break
      }
    
    }else if(obj instanceof CGPoint){
      switch(this.keyPath){
        case 'x':
        case 'y':
        default:
      }
    }else if(obj instanceof CGSize){
      switch(this.keyPath){
        case 'width':
        case 'height':
        default:
      }
    }else if(obj instanceof CGRect){
      switch(this.keyPath){
        case 'origin':
        case 'origin.x':
        case 'origin.y':
        case 'size':
        case 'size.width':
        case 'size.height':
      }
    }
    */

    /*
    if(obj._isPresentationInstance || obj._presentation === null){
      console.log('obj._isPresentationInstance')
      console.log('func: ' + obj.setValueForKeyPath)
      obj.setValueForKeyPath(value, this.keyPath)
    }else{
      console.log('obj._presentation')
      console.log('setValueForKeyPath: ' + obj._presentation.setValueForKeyPath)
      obj._presentation.setValueForKeyPath(value, this.keyPath)
    }
    */
    obj.setValueForKeyPath(value, this.keyPath)
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
