'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'

export default class SCNActionRunBlock extends SCNAction {
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
  }

  /**
   * @access public
   * @returns {SCNActionFade} -
   */
  copy() {
    const action = super.copy()

    action._block = this._block

    return action
  }

  /**
   * Creates an action that executes a block.
   * @access public
   * @param {function(arg1: SCNNode): void} block - The block to run. The block takes a single parameter:nodeThe node on which the action is running.
   * @returns {SCNAction} - 
   * @desc When the action executes, SceneKit calls the block. This action takes place instantaneously.This action is not reversible; the reverse action executes the same block.
   * @see https://developer.apple.com/reference/scenekit/scnaction/1523637-run
   */
  static run(block) {
    const action = new SCNActionRunBlock()
    action._block = block
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
    this._block(obj)
    this._finished = true
  }
}

SCNAction.run = SCNActionRunBlock.run
