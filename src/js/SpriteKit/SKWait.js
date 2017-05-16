'use strict'

import SKAction from './SKAction'
import SKActionTimingMode from './SKActionTimingMode'
import SKNode from './SKNode'

export default class SKWait extends SKAction {
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
  }

  /**
   * Creates an action that idles for a specified period of time.
   * @access public
   * @param {number} sec - The amount of time to wait.
   * @returns {SKAction} - 
   * @desc When the action executes, the action waits for the specified amount of time, then ends. This is typically used as part of a sequence of actions to insert a delay between two other actions. You might also use it in conjunction with the run(_:completion:) method to trigger code that needs to run at a later time.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/reference/spritekit/skaction/1417788-wait
   */
  static waitForDuration(sec) {
    const action = new SKWait()
    action._duration = sec
    return action
  }

  /**
   * Creates an action that idles for a randomized period of time.
   * @access public
   * @param {number} sec - The average amount of time to wait.
   * @param {number} durationRange - The range of possible values for the duration.
   * @returns {SKAction} - 
   * @desc When the action executes, the action waits for the specified amount of time, then ends. This is typically used as part of a sequence of actions to insert a delay between two other actions. However, you might also use it in conjunction with the run(_:completion:) method to trigger code that needs to run at a later time.Each time the action is executed, the action computes a new random value for the duration. The duration may vary in either direction by up to half of the value of the durationRange parameter.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/reference/spritekit/skaction/1417760-wait
   */
  static waitForDurationWithRange(sec, durationRange) {
    const duration = Math.max(0, sec + (Math.random() - 0.5) * durationRange)
    const action = new SKWait()
    action._duration = duration
    return action
  }
}

SKAction.waitForDuration = SKWait.waitForDuration
SKAction.waitForDurationWithRange = SKWait.waitForDurationWithRange

