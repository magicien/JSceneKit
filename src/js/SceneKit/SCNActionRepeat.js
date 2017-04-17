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
}

