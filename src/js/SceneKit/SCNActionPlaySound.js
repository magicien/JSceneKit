'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'

export default class SCNActionPlaySound extends SCNAction {
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

    this._source = null
    this._wait = false
  }

  /**
   * Creates an action that plays an audio source.
   * @access public
   * @param {SCNAudioSource} source - The audio source to play.
   * @param {boolean} wait - If true, the duration of this action is the same as the length of the audio playback. If false, the action is considered to have completed immediately.
   * @returns {SCNAction} - 
   * @desc When the action executes, SceneKit plays the audio source on the target node—any positional audio effects are based on the node’s position. For more information about positional audio in SceneKit, see SCNAudioPlayer.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/reference/scenekit/scnaction/1523651-playaudio
   */
  static playAudioWaitForCompletion(source, wait) {
    const action = new SCNActionPlaySound()
    action._source = source
    action._wait = wait
    return action
  }

  /**
   * @access public
   * @returns {SCNActionPlaySound} -
   */
  copy() {
    const action = super.copy()

    action._source = this._source
    action._wait = this._wait

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
    if(!this._isRunning){
      this._source._play()
      this._isRunning = true
    }
    if(this._duration <= 0 || this._source._duration > 0){
      this._duration = this._source._duration
    }
    const t = this._getTime(time, needTimeConversion)

    if(!this._wait){
      this._finished = true
    }else if(!this._source.loops && t >= 1){
      this._finished = true
    }else{
      this._finished = false
    }
  }
}

SCNAction.playAudioWaitForCompletion = SCNActionPlaySound.playAudioWaitForCompletion
