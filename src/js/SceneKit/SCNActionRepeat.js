'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'

export default class SCNActionRepeat extends SCNAction {
  static get _propTypes() {
    return {
      _timesToRepeat: 'float',
      _finished: 'boolean',
      _duration: 'float',
      _timingMode: 'integer',
      _beginTime: 'float',
      _isRunning: 'boolean',
      _repeatedAction: 'SCNAction',
      _forever: 'boolean',
      _timesRepeated: 'integer',
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

    this._timesToRepeat = 0
    this._repeatedAction = null
    this._forever = false
    this._timesRepeated = 0
    this._finished = false
    this._duration = 0
    this._timingMode = SCNActionTimingMode.linear
    this._beginTime = 0
    this._isRunning = false
    this._pausedTime = 0
  }

  /**
   * Creates an action that repeats another action a specified number of times.
   * @access public
   * @param {SCNAction} action - The action to be executed.
   * @param {number} count - The number of times to execute the action.
   * @returns {SCNAction} - 
   * @desc When the action executes, the associated action runs to completion and then repeats, until the count is reached.This action is reversible; it creates a new action that is the reverse of the specified action and then repeats it the same number of times.
   * @see https://developer.apple.com/reference/scenekit/scnaction/1522764-repeat
   */
  static repeat(action, count) {
    const _action = new SCNActionRepeat()
    _action._repeatedAction = action
    _action._duration = action.duration
    _action._timesToRepeat = count
    _action._forever = (count === Infinity)
    return _action
  }

  /**
   * Creates an action that repeats another action forever.
   * @access public
   * @param {SCNAction} action - The action to execute.
   * @returns {SCNAction} - 
   * @desc When the action executes, the associated action runs to completion and then repeats.This action is reversible; it creates a new action that is the reverse of the specified action and then repeats it forever.NoteThe action to be repeated must have a non-instantaneous duration.
   * @see https://developer.apple.com/reference/scenekit/scnaction/1522908-repeatforever
   */
  static repeatForever(action) {
    return this.repeat(action, Infinity)
  }

  /**
   * @access public
   * @returns {SCNActionRepeat} -
   */
  copy() {
    const action = super.copy()

    action._timesToRepeat = this._timesToRepeat
    action._repeatedAction = this._repeatedAction.copy()
    action._forever = this._forever
    action._timesRepeated = this._timesRepeated

    return action
  }

  _getTime(time, needTimeConversion) {
    if(!needTimeConversion){
      return time
    }

    const baseTime = this._basetimeFromTime(time)
    if(this.timingFunction === null){
      return baseTime
    }

    const n = Math.floor(baseTime)
    const t = this.timingFunction._getValueAtTime(baseTime - n)
    return n + t
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
    const dt = this._getTime(time, needTimeConversion)
    const timesRepeated = Math.floor(dt)
    while(timesRepeated > this._timesRepeated){
      this._timesRepeated += 1
      this._repeatedAction._applyAction(obj, 1.0, false)
      if(!this._forever && this._timesRepeated >= this._timesToRepeat){
        this._finished = true
        return
      }
      this._repeatedAction._resetFinished()
    }
    let t = dt - this._timesRepeated
    this._repeatedAction._applyAction(obj, t, false)
    this._finished = false
  }

  get duration() {
    if(this._forever){
      return Infinity
    }
    return this._repeatedAction.duration * this._timesToRepeat
  }

  _resetFinished() {
    this._repeatedAction._resetFinished()
    this._timesRepeated = 0
    this._finished = false
  }
}

SCNAction.repeat = SCNActionRepeat.repeat
SCNAction.repeatForever = SCNActionRepeat.repeatForever
