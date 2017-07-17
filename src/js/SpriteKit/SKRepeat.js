'use strict'

import SKAction from './SKAction'
//import SKActionTimingMode from './SKActionTimingMode'
//import SKNode from './SKNode'

export default class SKRepeat extends SKAction {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._timesToRepeat = 0
    this._repeatedAtion = null
    this._forever = false
    this._timesRepeated = 0
  }
  
  /**
   * Creates an action that repeats another action a specified number of times.
   * @access public
   * @param {SKAction} action - The action to execute.
   * @param {number} count - The number of times to execute the action.
   * @returns {SKAction} - 
   * @desc When the action executes, the associated action runs to completion and then repeats, until the count is reached.This action is reversible; it creates a new action that is the reverse of the specified action and then repeats it the same number of times.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417750-repeat
   */
  static repeat(action, count) {
    const _action = new SKRepeat()
    _action._repeatedAction = action
    _action._duration = action.duration
    _action._timesToRepeat = count
    _action._forever = (count === Infinity)
    return _action
  }

  /**
   * Creates an action that repeats another action forever.
   * @access public
   * @param {SKAction} action - The action to execute.
   * @returns {SKAction} - 
   * @desc When the action executes, the associated action runs to completion and then repeats.This action is reversible; it creates a new action that is the reverse of the specified action and then repeats it forever.NoteThe action to be repeated must have a non-instantaneous duration.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417676-repeatforever
   */
  static repeatForever(action) {
    return this.repeat(action, Infinity)
  }

  /**
   * @access public
   * @returns {SCNActionFade} -
   */
  copy() {
    const action = super.copy()

    action._timesToRepeat = this._timesToRepeat
    action._repeatedAction = this._repeatedAction
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
    const t = dt - this._timesRepeated
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

SKAction.repeat = SKRepeat.repeat
SKAction.repeatForever = SKRepeat.repeatForever

