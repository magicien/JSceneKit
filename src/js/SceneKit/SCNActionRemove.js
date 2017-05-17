'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'
import SCNNode from './SCNNode'

export default class SCNActionRemove extends SCNAction {
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
  }

  /**
   * Creates an action that removes the node from its parent.
   * @access public
   * @returns {SCNAction} - 
   * @desc When the action executes, the node is immediately removed from its parent.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/reference/scenekit/scnaction/1522966-removefromparentnode
   */
  static removeFromParentNode() {
    const action = new SCNActionRemove()
    return action
  }

  /**
   * @access public
   * @returns {SCNActionRotate} -
   */
  copy() {
    const action = super.copy()
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
    if(!(obj instanceof SCNNode)){
      throw new Error(`unsupported class for SCNActionRemove: ${obj.constructor.name}`)
    }
    obj.removeFromParentNode()
    this._finished = true
  }
}

SCNAction.removeFromParentNode = SCNActionRemove.removeFromParentNode
