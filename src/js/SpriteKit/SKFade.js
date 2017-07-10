'use strict'

import SKAction from './SKAction'
import SKActionTimingMode from './SKActionTimingMode'
import SKNode from './SKNode'

export default class SKFade extends SKAction {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._actions = []
    this._finished = false
    this._duration = 0
    this._timingMode = SKActionTimingMode.linear
    this._beginTime = 0
    this._isRunning = false
    this._pausedTime = 0

    this._toValue = null
    this._byValue = null
  }

  /**
   * Creates an action that changes the alpha value of the node to 1.0.
   * @access public
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s alpha property animates from its current value to 1.0.This action is reversible; the reverse is created as if the following code is executed:let action = SKAction.fadeOut(withDuration: sec)
let action = SKAction.fadeOut(withDuration: sec)

   * @see https://developer.apple.com/documentation/spritekit/skaction/1417818-fadein
   */
  static fadeInWithDuration(sec) {
    const action = new SKFade()
    action._toValue = 1
    action._duration = sec
    return action
  }

  /**
   * Creates an action that changes the alpha value of the node to 0.0.
   * @access public
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s alpha property animates from its current value to 0.0. This causes the node to disappear.This action is reversible; the reverse is created as if the following code is executed:let action = SKAction.fadeIn(withDuration: sec)
let action = SKAction.fadeIn(withDuration: sec)

   * @see https://developer.apple.com/documentation/spritekit/skaction/1417738-fadeout
   */
  static fadeOutWithDuration(sec) {
    const action = new SKFade()
    action._toValue = 0
    action._duration = sec
    return action
  }

  /**
   * Creates an action that adjusts the alpha value of a node by a relative value.
   * @access public
   * @param {number} factor - The amount to add to the node’s alpha value.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s alpha property animates to its new value.This action is reversible; the reverse is created as if the following code is executed:let action = SKAction.fadeAlpha(by: -factor, duration: sec)
let action = SKAction.fadeAlpha(by: -factor, duration: sec)

   * @see https://developer.apple.com/documentation/spritekit/skaction/1417716-fadealpha
   */
  static fadeAlphaByDuration(factor, sec) {
    const action = new SKFade()
    action._byValue = factor
    action._duration = sec
    return action
  }

  /**
   * Creates an action that adjusts the alpha value of a node to a new value.
   * @access public
   * @param {number} alpha - The new value of the node’s alpha.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s alpha property animates to its new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417673-fadealpha
   */
  static fadeAlphaToDuration(alpha, sec) {
    const action = new SKFade()
    action._toValue = alpha
    action._duration = sec
    return action
  }

  /**
   * @access public
   * @returns {SCNActionFade} -
   */
  copy() {
    const action = super.copy()

    action._toValue = this._toValue
    action._byValue = this._byValue
    action._duration = this._duration

    return action
  }

  /**
   * apply action to the given node.
   * @access private
   * @param {Object} obj - target object to apply this action.
   * @param {number} time - active time
   * @param {boolean} [needTimeConversion = true] -
   * @returns {void}
   */
  _applyAction(obj, time, needTimeConversion = true) {
    const t = this._getTime(time, needTimeConversion)
    if(!(obj instanceof SKNode)){
      throw new Error(`unsupported class for SKFade: ${obj.constructor.name}`)
    }

    const baseValue = obj.alpha
    let toValue = 0
    if(this._toValue !== null){
      toValue = this._toValue
    }else if(this._byValue !== null){
      toValue = baseValue + this._byValue
    }else{
      throw new Error('both toValue and byValue are null')
    }

    const value = this._lerp(baseValue, toValue, t)
    obj._presentation.alpha = value

    if(this._finished){
      obj.alpha = toValue
    }
  }
}

SKAction.fadeInWithDuration = SKFade.fadeInWithDuration
SKAction.fadeOutWithDuration = SKFade.fadeOutWithDuration
SKAction.fadeAlphaByDuration = SKFade.fadeAlphaByDuration
SKAction.fadeAlphaToDuration = SKFade.fadeAlphaToDuration

