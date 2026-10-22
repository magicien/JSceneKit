'use strict'

import AVAudioNode from './AVAudioNode'

export default class AVAudioMixerNode extends AVAudioNode {
  constructor() {
    super()

    this._gainNode = null
    this._volume = 1.0
  }

  get volume() {
    if(this._gainNode){
      return this._gainNode.gain.value
    }
    return this._volume
  }
  set volume(newValue) {
    this._volume = newValue
    if(this._gainNode){
      this._gainNode.gain.value = newValue
    }
  }
}
