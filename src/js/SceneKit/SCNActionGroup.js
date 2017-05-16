'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'

export default class SCNActionGroup extends SCNAction {
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
  }

  /**
   * Creates an action that runs a collection of actions in parallel.
   * @access public
   * @param {SCNAction[]} actions - An array of SCNAction objects.
   * @returns {SCNAction} - 
   * @desc When the action executes, the actions that make up the group all start immediately and run in parallel. The duration of the group action is the longest duration among the collection of actions. If an action in the group has a duration less than the group’s duration, the action completes and then idles until the group completes the remaining actions. This matters most when creating a repeating action that repeats a group.This action is reversible; it creates a new group action that contains the reverse of each action specified in the group. 
   * @see https://developer.apple.com/reference/scenekit/scnaction/1522779-group
   */
  static group(actions) {
    const action = new SCNActionGroup()
    action._actions = actions
    return action
  }

  /**
   * @access public
   * @returns {SCNActionGroup} -
   */
  copy() {
    const action = super.copy()

    action._actions = []
    this._actions.forEach((act) => {
      action._actions.push(act.copy())
    })

    return action
  }

  get duration() {
    let d = 0
    this._actions.forEach((act) => {
      if(d < act.duration){
        d = act.duration
      }
    })
    return d
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
    //const dt = this._getTime(time, needTimeConversion) * this.duration
    //this._actions.forEach((action) => {
    //  if(!action._finished){
    //    action._applyAction(obj, dt, false)
    //  }
    //})
    const duration = this._activetimeFromTime(time)

    let finished = true
    this._actions.forEach((action) => {
      if(!action._finished){
        action._applyAction(obj, duration, needTimeConversion)
        if(!action._finished){
          finished = false
        }
      }
    })
    this._finished = finished
  }

  _resetFinished() {
    this._actions.forEach((action) => {
      action._resetFinished()
    })
    this._finished = false
  }
}

SCNAction.group = SCNActionGroup.group
