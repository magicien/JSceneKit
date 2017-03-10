'use strict'

import CAAnimation from './CAAnimation'
import CGPoint from '../CoreGraphics/CGPoint'
import CGSize from '../CoreGraphics/CGSize'
import CGRect from '../CoreGraphics/CGRect'
import SCNMatrix4 from '../SceneKit/SCNMatrix4'

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
   * @returns {CAPropertyAnimation}
   */
  copy() {
    const anim = new CAPropertyAnimation(this.keyPath)
    anim._copyValue(this)
    return anim
  }

  _copyValue(src) {
    super._copyValue(src)
    this.keyPath = src.keyPath
    this.isCumulative = src.isCumulative
    this.isAdditive = src.isAdditive
    this.valueFunction = src.valueFunction
  }

  _applyAnimation(obj, time) {
    const activeTime = this._basetimeFromActivetime(time)
    let t = activeTime
    if(this.timingFunction !== null){
      t = this.timingFunction(activeTime)
    }
    const value = this.valueFunction(t)
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

    if(obj._isPresentationInstance || obj._presentation === null){
      obj.setValueForKeyPath(value, this.keyPath)
    }else{
      //console.log('presentation.setValue')
      obj._presentation.setValueForKeyPath(value, this.keyPath)
    }
  }
}
