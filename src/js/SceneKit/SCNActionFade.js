'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'
import SCNNode from './SCNNode'

export default class SCNActionFade extends SCNAction {
  static get _propTypes() {
    return {
      _actions: 'NSArray',
      _finished: 'boolean',
      _duration: 'float',
      _timingMode: 'integer',
      _beginTime: 'float',
      _isRunning: 'boolean',
      _pausedTime: 'float',

      name: ['string', null]
    }
  }

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
    this._timingMode = SCNActionTimingMode.linear
    this._beginTime = 0
    this._isRunning = false
    this._pausedTime = 0

    this._toValue = null
    this._byValue = null
  }

  /**
   * Creates an action that changes the opacity of the node to 1.0.
   * @access public
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates from its current value to 1.0.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction fadeOutWithDuration: sec];
[SCNAction fadeOutWithDuration: sec];

   * @see https://developer.apple.com/reference/scenekit/scnaction/1522777-fadein
   */
  static fadeInDuration(sec) {
    const action = new SCNActionFade()
    action._toValue = 1
    action._duration = sec
    return action
  }

  /**
   * Creates an action that changes the opacity of the node to 0.0.
   * @access public
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates from its current value to 0.0.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction fadeInWithDuration: sec];
[SCNAction fadeInWithDuration: sec];

   * @see https://developer.apple.com/reference/scenekit/scnaction/1523922-fadeout
   */
  static fadeOutDuration(sec) {
    const action = new SCNActionFade()
    action._toValue = 0
    action._duration = sec
    return action
  }

  /**
   * Creates an action that adjusts the opacity of a node by a relative value.
   * @access public
   * @param {number} factor - The amount to change the node’s opacity by.
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates to its new value.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction fadeOpacityBy: -factor duration: sec];
[SCNAction fadeOpacityBy: -factor duration: sec];

   * @see https://developer.apple.com/reference/scenekit/scnaction/1523595-fadeopacity
   */
  static fadeOpacityByDuration(factor, sec) {
    const action = new SCNActionFade()
    action._byValue = factor
    action._duration = sec
    return action
  }

  /**
   * Creates an action that adjusts the opacity of a node to a new value.
   * @access public
   * @param {number} opacity - The new opacity value of the node.
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates to its new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/reference/scenekit/scnaction/1523875-fadeopacity
   */
  static fadeOpacityToDuration(opacity, sec) {
    const action = new SCNActionFade()
    action._toValue = opacity
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
    if(!(obj instanceof SCNNode)){
      throw new Error(`unsupported class for SCNActionRotate: ${obj.constructor.name}`)
    }

    const baseValue = obj.opacity
    let toValue = 0
    if(this._toValue !== null){
      toValue = this._toValue
    }else if(this._byValue !== null){
      toValue = baseValue + this._byValue
    }else{
      throw new Error('both toValue and byValue are null')
    }

    const value = this._lerp(baseValue, toValue, t)
    //console.warn(`opacity time: ${time}, t: ${t}, base: ${baseValue}, to: ${toValue}, val: ${value}`)
    obj.presentation.opacity = value

    if(this._finished){
      obj.opacity = toValue
    }
  }
}

SCNAction.fadeInDuration = SCNActionFade.fadeInDuration
SCNAction.fadeOutDuration = SCNActionFade.fadeOutDuration
SCNAction.fadeOpacityByDuration = SCNActionFade.fadeOpacityByDuration
SCNAction.fadeOpacityToDuration = SCNActionFade.fadeOpacityToDuration

