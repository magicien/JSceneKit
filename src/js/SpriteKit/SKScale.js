'use strict'

import SKAction from './SKAction'
import SKActionTimingMode from './SKActionTimingMode'
import SKNode from './SKNode'
import CGSize from '../CoreGraphics/CGSize'

export default class SKScale extends SKAction {
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

    this._scaleXTo = null
    this._scaleXBy = null
    this._scaleWidthTo = null
    this._scaleYTo = null
    this._scaleYBy = null
    this._scaleHeightTo = null
  }

  /**
   * Creates an action that changes the x and y scale values of a node by a relative value.
   * @access public
   * @param {number} scale - The amount to add to the node’s x and y scale values.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s xScale and yScale properties are animated to the new value.This action is reversible; the reverse is created as if the following code is executed:let action = SKAction.scale(by: -scale, duration: sec)
let action = SKAction.scale(by: -scale, duration: sec)

   * @see https://developer.apple.com/documentation/spritekit/skaction/1417741-scale
   */
  static scaleByDuration(scale, sec) {
    const action = new SKScale()
    action._scaleXBy = scale
    action._scaleYBy = scale
    action._duration = sec
    return action
  }

  /**
   * Creates an action that changes the x and y scale values of a node to achieve 
   * @access public
   * @param {number|CGSize} size - The new size of the node.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s xScale and yScale properties are animated to achieve the specified size in its parent's coordinate space. This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1643619-scale
   */
  static scaleToDuration(size, sec) {
    const action = new SKScale()
    if(size instanceof CGSize){
      action._scaleWidthTo = size.width
      action._scaleHeightTo = size.height
    }else if(typeof size === 'number'){
      action._scaleXTo = size
      action._scaleYTo = size
    }else{
      throw new Error('unsupported format')
    }
    action._duration = sec
    return action
  }

  /**
   * Creates an action that adds relative values to the x and y scale values of a node.
   * @access public
   * @param {number} xScale - The amount to add to the node’s x scale value.
   * @param {number} yScale - The amount to add to the node’s y scale value.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s xScale and yScale properties are animated to the new value.This action is reversible; the reverse is created as if the following code is executed:let action = SKAction.scaleX(by: -scaleX, y: -scaleY, duration: sec)
let action = SKAction.scaleX(by: -scaleX, y: -scaleY, duration: sec)

   * @see https://developer.apple.com/documentation/spritekit/skaction/1417796-scalex
   */
  static scaleXByYDuration(xScale, yScale, sec) {
    const action = new SKScale()
    action._scaleXBy = xScale
    action._scaleYBy = yScale
    action._duration = sec
    return action
  }

  /**
   * Creates an action that changes the x and y scale values of a node.
   * @access public
   * @param {number} xScale - The new value for the node’s x scale value.
   * @param {number} yScale - The new value for the node’s y scale value.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s xScale and yScale properties are animated to the new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417728-scalex
   */
  static scaleXToYDuration(xScale, yScale, sec) {
    const action = new SKScale()
    action._scaleXTo = xScale
    action._scaleYTo = yScale
    action._duration = sec
    return action
  }

  /**
   * Creates an action that changes the x scale value of a node to a new value.
   * @access public
   * @param {number} scale - The new value for the node’s x scale value.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s xScale property animates to the new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417699-scalex
   */
  static scaleXToDuration(scale, sec) {
    const action = new SKScale()
    action._scaleXTo = scale
    action._duration = sec
    return action
  }

  /**
   * Creates an action that changes the y scale value of a node to a new value.
   * @access public
   * @param {number} scale - The new value for the node’s y scale value.
   * @param {number} sec - The duration of the animation.
   * @returns {SKAction} - 
   * @desc When the action executes, the node’s yScale property animates to the new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417708-scaley
   */
  static scaleYToDuration(scale, sec) {
    const action = new SKScale()
    action._scaleYTo = scale
    action._duration = sec
    return action
  }

  /**
   * @access public
   * @returns {SCNActionFade} -
   */
  copy() {
    const action = super.copy()

    action._scaleXTo = this._scaleXTo
    action._scaleXBy = this._scaleXBy
    action._scaleWidthTo = this._scaleWidthTo
    action._scaleYTo = this._scaleYTo
    action._scaleYBy = this._scaleYBy
    action._scaleHeightTo = this._scaleHeightTo

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
      throw new Error(`unsupported class for SKSequence: ${obj.constructor.name}`)
    }

    const baseXValue = obj.xScale
    let toXValue = null
    if(this._scaleXTo !== null){
      toXValue = this._scaleXTo
    }else if(this._scaleXBy !== null){
      toXValue = baseXValue + this._scaleXBy
    }else if(this._scaleWidthTo !== null){
      toXValue = this._scaleWidthTo / this._frame.size.width
    }

    const baseYValue = obj.yScale
    let toYValue = null
    if(this._scaleYTo !== null){
      toYValue = this._scaleYTo
    }else if(this._scaleYBy !== null){
      toYValue = baseYValue + this._scaleYBy
    }else if(this._scaleHeightTo !== null){
      toYValue = this._scaleHeightTo / this._frame.size.height
    }

    if(toXValue === null && toYValue === null){
      throw new Error('both toXValue and toYValue are null')
    }

    if(toXValue !== null){
      const xValue = this._lerp(baseXValue, toXValue, t)
      obj._presentation.xScale = xValue
    }
    if(toYValue !== null){
      const yValue = this._lerp(baseYValue, toYValue, t)
      obj._presentation.yScale = yValue
    }

    if(this._finished){
      if(toXValue !== null){
        obj.xScale = toXValue
      }
      if(toYValue !== null){
        obj.yScale = toYValue
      }
    }
  }
}

SKAction.scaleByDuration = SKScale.scaleByDuration
SKAction.scaleToDuration = SKScale.scaleToDuration
SKAction.scaleXByYDuration = SKScale.scaleXByYDuration
SKAction.scaleXToYDuration = SKScale.scaleXToYDuration
SKAction.scaleXToDuration = SKScale.scaleXToDuration
SKAction.scaleYToDuration = SKScale.scaleYToDuration

