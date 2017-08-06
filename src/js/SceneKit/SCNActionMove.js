'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'
import SCNNode from './SCNNode'
import SCNVector3 from './SCNVector3'
import _InstanceOf from '../util/_InstanceOf'

export default class SCNActionMove extends SCNAction {
  static get _propTypes() {
    return {
      _actions: 'NSArray',
      _finished: 'boolean',
      _duration: 'float',
      _timingMode: 'integer',
      _beginTime: 'float',
      _isRunning: 'boolean',
      _pausedTime: 'float'
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
   * Creates an action that moves a node relative to its current position.
   * @access public
   * @param {number} deltaX - The distance to move the node in the X direction of its parent node’s local coordinate space.
   * @param {number} deltaY - The distance to move the node in the Y direction of its parent node’s local coordinate space.
   * @param {number} deltaZ - The distance to move the node in the Z direction of its parent node’s local coordinate space.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s position property animates from its current position to its new position.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction moveByX: -deltaX y: -deltaY z: -deltaZ duration: duration];
[SCNAction moveByX: -deltaX y: -deltaY z: -deltaZ duration: duration];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523238-moveby
   */
  static moveByXYZ(deltaX, deltaY, deltaZ, duration) {
    const action = new SCNActionMove()
    action._byValue = new SCNVector3(deltaX, deltaY, deltaZ)
    action._duration = duration
    return action
  }

  /**
   * Creates an action that moves a node relative to its current position.
   * @access public
   * @param {SCNVector3} delta - A vector that describes the change to be applied to the node’s position.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s position property animates from its current position to its new position.This action is reversible; the reverse is created as if the following code had been executed:SCNVector3 reverseDelta = SCNVector3Make(-delta.x, -delta.y, -delta.z);
[SCNAction moveBy: reverseDelta duration: duration];
SCNVector3 reverseDelta = SCNVector3Make(-delta.x, -delta.y, -delta.z);
[SCNAction moveBy: reverseDelta duration: duration];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522605-move
   */
  static moveBy(delta, duration) {
    const action = new SCNActionMove()
    action._byValue = delta._copy()
    action._duration = duration
    return action
  }

  /**
   * Creates an action that moves a node to a new position.
   * @access public
   * @param {SCNVector3} location - The coordinates for the node’s new position in its parent node’s local coordinate space.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s position property animates from its current position to its new position.This action is not reversible; the reverse of this action has the same duration but does not move the node.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522826-move
   */
  static moveTo(location, duration) {
    const action = new SCNActionMove()
    action._toValue = location._copy()
    action._duration = duration
    return action
  }

  // Reversing an Action

  /**
   * Creates an action that reverses the behavior of another action.
   * @access public
   * @returns {SCNAction} - 
   * @desc This method always returns an action object; however, not all actions are reversible. When reversed, some actions return an object that either does nothing or performs the same action as the original action. For details on how an action is reversed, see the description of the class method used to create that action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522815-reversed
   */
  reversed() {
    const action = this.copy()
    if(action._toValue){
      action._toValue = null
      action._byValue = new SCNVector3(0, 0, 0)
    }else if(this._byValue){
      action._byValue = this._byValue.mul(-1)
    }
    return action
  }

  /**
   * @access public
   * @returns {SCNActionMove} -
   */
  copy() {
    const action = super.copy()

    action._toValue = this._toValue ? this._toValue._copy() : null
    action._byValue = this._byValue ? this._byValue._copy() : null

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
    if(!_InstanceOf(obj, SCNNode)){
      throw new Error(`unsupported class for SCNActionMove: ${obj.constructor.name}`)
    }

    const baseValue = obj.position
    let toValue = null
    if(this._toValue !== null){
      toValue = this._toValue
    }else if(this._byValue !== null){
      toValue = baseValue.add(this._byValue)
    }else{
      throw new Error('both toValue and byValue are null')
    }

    const value = this._lerp(baseValue, toValue, t)
    obj.presentation.position = value

    if(this._finished){
      obj.position = toValue
    }
  }
}

SCNAction.moveByXYZ = SCNActionMove.moveByXYZ
SCNAction.moveBy = SCNActionMove.moveBy
SCNAction.moveTo = SCNActionMove.moveTo

