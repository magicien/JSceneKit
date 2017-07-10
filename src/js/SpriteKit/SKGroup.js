'use strict'

import SKAction from './SKAction'
import SKActionTimingMode from './SKActionTimingMode'
import SKNode from './SKNode'

export default class SKGroup extends SKAction {
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
   * @param {SKAction[]} actions - An array of SKAction objects.
   * @returns {SKAction} - 
   * @desc When the action executes, the actions that comprise the group all start immediately and run in parallel. The duration of the group action is the longest duration among the collection of actions. If an action in the group has a duration less than the group’s duration, the action completes, then idles until the group completes the remaining actions. This matters most when creating a repeating action that repeats a group.This action is reversible; it creates a new group action that contains the reverse of each action specified in the group. 
   * @see https://developer.apple.com/documentation/spritekit/skaction/1417688-group
   */
  static group(actions) {
    const action = new SKGroup()
    action._actions = actions
    return action
  }

  /**
   * @access public
   * @returns {SCNActionFade} -
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

SKAction.group = SKGroup.group

