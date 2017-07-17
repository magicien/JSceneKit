'use strict'

import SKAction from './SKAction'
import SKActionTimingMode from './SKActionTimingMode'
//import SKNode from './SKNode'

export default class SKSequence extends SKAction {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._actions = []
    this._animIndex = 0

    this._finished = false
    this._duration = 0
    this._timingMode = SKActionTimingMode.linear
    this._beginTime = 0
    this._isRunning = false
    this._pausedTime = 0
  }

  /**
   * Creates an action that runs a collection of actions sequentially.
   * @access public
   * @param {SKAction[]} actions - An array of SKAction objects.
   * @returns {SKAction} - 
   * @desc When the action executes, the first action in the sequence starts and runs to completion. Subsequent actions in the sequence run in a similar fashion until all of the actions in the sequence have executed. The duration of the sequence action is the sum of the durations of the actions in the sequence.This action is reversible; it creates a new sequence action that reverses the order of the actions. Each action in the reversed sequence is itself reversed. For example, if an action sequence is {1,2,3}, the reversed sequence would be {3R,2R,1R}.
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417817-sequence
   */
  static sequence(actions) {
    const action = new SKSequence()
    action._actions = actions
    action._duration = 0
    return action
  }

  get duration() {
    let d = 0
    this._actions.forEach((act) => {
      if(act.speed > 0){
        d += act.duration / act.speed
      }
    })
    return d
  }

  /**
   * @access public
   * @returns {SCNActionFade} -
   */
  copy() {
    const action = super.copy()

    action._actions = this._actions.slice(0)
    action._animIndex = this._animIndex

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
    const total = this.duration
    let duration = 0
    if(total <= 0 || total === Infinity){
      duration = this._activetimeFromTime(time)
    }else{
      duration = this._getTime(time, needTimeConversion) * total
    }

    for(let i=0; i<this._animIndex; i++){
      duration -= this._actions[i].duration / this._actions[i].speed
    }
    for(; this._animIndex<this._actions.length; this._animIndex++){
      const action = this._actions[this._animIndex]
      action._applyAction(obj, duration, true)
      duration -= action.duration / action.speed
      if(duration <= 0 || !action._finished){
        break
      }
    }
    if(this._animIndex >= this._actions.length){
      this._finished = true
    }
  }

  _resetFinished() {
    this._actions.forEach((action) => {
      action._resetFinished()
    })
    this._finished = false
    this._animIndex = 0
  }
}

SKAction.sequence = SKSequence.sequence

