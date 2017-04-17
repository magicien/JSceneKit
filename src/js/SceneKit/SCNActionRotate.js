'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'
import SCNVector4 from './SCNVector4'

export default class SCNActionRotate extends SCNAction {
  static get _propTypes() {
    return {
      _rotX: 'float',
      _rotY: 'float',
      _rotZ: 'float',
      _lastRotX: 'float',
      _lastRotY: 'float',
      _lastRotZ: 'float',
      _axisRot: 'SCNVector4',
      _isRelative: 'boolean',
      _isReversed: 'boolean',
      _isUnitArc: 'boolean',
      _isAxisAngle: 'boolean',
      _isRunning: 'boolean',
      _finished: 'boolean',
      _duration: 'float',
      _pausedTime: 'float',
      _timingMode: 'integer',
      _beginTime: 'float',
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._rotX = 0
    this._rotY = 0
    this._rotZ = 0
    this._lastRotX = 0
    this._lastRotY = 0
    this._lastRotZ = 0
    this._axisRot = new SCNVector4()
    this._isRelative = false
    this._isReversed = false
    this._isUnitArc = false
    this._isAxisAngle = false
    this._isRunning = false
    this._finished = false
    this._duration = 0
    this._pausedTime = 0
    this._timingMode = SCNActionTimingMode.linear
    this._beginTime = 0
  }
}

