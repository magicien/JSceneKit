'use strict'

import AVAudioNode from './AVAudioNode'

export default class AVAudioMixerNode extends AVAudioNode {
  constructor() {
    super()

    this._gainNode = null
  }

  get volume() {
    return this._gainNode.gain.value
  }
  set volume(newValue) {
    this._gainNode.gain.value = newValue
  }
}
