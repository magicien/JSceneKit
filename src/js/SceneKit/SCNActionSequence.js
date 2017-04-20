'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'

export default class SCNActionSequence extends SCNAction {
  static get _propTypes() {
    return {
      _actions: 'NSArray',
      _finished: 'boolean',
      '_mycaction->_animIndex': ['integer', '_animIndex'],
      _duration: 'float',
      _timingMode: 'integer',
      _beginTime: 'float',
      _isRunning: 'boolean',
      _pausedTime: 'float'
    }
  }

  /**
   * Creates an action that runs a collection of actions sequentially.
   * @access public
   * @constructor
   * @param {SCNAction[]} actions - An array of SCNAction objects.
   * @desc When the action executes, the first action in the sequence starts and runs to completion. Subsequent actions in the sequence run in a similar fashion until all of the actions in the sequence have executed. The duration of the sequence action is the sum of the durations of the actions in the sequence.This action is reversible; it creates a new sequence action that reverses the order of the actions. Each action in the reversed sequence is itself reversed. For example, the actions reverseSequence and sequenceReverse in the code example below are equivalent:SCNAction *sequence = [SCNAction sequence:@[ actionA, actionB, actionC ]];
SCNAction *reverseSequence = [SCNAction sequence:@[ [actionC reversedAction],
                                                    [actionB reversedAction],
                                                    [actionA reversedAction] ]];
SCNAction *sequenceReverse = [sequence reversedAction];
SCNAction *sequence = [SCNAction sequence:@[ actionA, actionB, actionC ]];
SCNAction *reverseSequence = [SCNAction sequence:@[ [actionC reversedAction],
                                                    [actionB reversedAction],
                                                    [actionA reversedAction] ]];
SCNAction *sequenceReverse = [sequence reversedAction];

   * @see https://developer.apple.com/reference/scenekit/scnaction/1522793-sequence
   */
  constructor() {
    super()

    this._actions = []
    this._finished = false
    this._animIndex = 0
    this._duration = 0
    this._timingMode = SCNActionTimingMode.linear
    this._beginTime = 0
    this._isRunning = false
    this._pausedTime = 0
  }

  /**
   * Creates an action that runs a collection of actions sequentially.
   * @access public
   * @param {SCNAction[]} actions - An array of SCNAction objects.
   * @returns {SCNAction} - 
   * @desc When the action executes, the first action in the sequence starts and runs to completion. Subsequent actions in the sequence run in a similar fashion until all of the actions in the sequence have executed. The duration of the sequence action is the sum of the durations of the actions in the sequence.This action is reversible; it creates a new sequence action that reverses the order of the actions. Each action in the reversed sequence is itself reversed. For example, the actions reverseSequence and sequenceReverse in the code example below are equivalent:SCNAction *sequence = [SCNAction sequence:@[ actionA, actionB, actionC ]];
SCNAction *reverseSequence = [SCNAction sequence:@[ [actionC reversedAction],
                                                    [actionB reversedAction],
                                                    [actionA reversedAction] ]];
SCNAction *sequenceReverse = [sequence reversedAction];
SCNAction *sequence = [SCNAction sequence:@[ actionA, actionB, actionC ]];
SCNAction *reverseSequence = [SCNAction sequence:@[ [actionC reversedAction],
                                                    [actionB reversedAction],
                                                    [actionA reversedAction] ]];
SCNAction *sequenceReverse = [sequence reversedAction];

   * @see https://developer.apple.com/reference/scenekit/scnaction/1522793-sequence
   */
  static sequence(actions) {
    const action =  new SCNActionSequence()
    action._actions = actions
    action._duration = 0
    //actions.forEach((act) => {
    //  action._duration += act.duration / act.speed
    //})
    return action
  }

  get duration() {
    let d = 0
    this._actions.forEach((act) => {
      d += act.duration
    })
    return d
  }

  /**
   * @access public
   * @returns {SCNActionSequence} -
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
    //const dt = this._getTime(time, needTimeConversion) * this._duration
    let duration = this._activetimeFromTime(time)

    for(let i=0; i<this._animIndex; i++){
      duration -= this._actions[i].duration / this._actions[i].speed
    }
    for(; this._animIndex<this._actions.length; this._animIndex++){
      const action = this._actions[this._animIndex]
      action._applyAction(obj, duration, needTimeConversion)
      duration -= action.duration / action.speed
      if(duration < 0){
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

SCNAction.sequence = SCNActionSequence.sequence

