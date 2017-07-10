'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAudioSource from './SCNAudioSource'
import AVAudioMixerNode from '../AVFoundation/AVAudioMixerNode'


/**
 * A controller for playback of a positional audio source in a SceneKit scene.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer
 */
export default class SCNAudioPlayer extends NSObject {

  // Creating an Audio Player

  /**
   * Initializes an audio player for playing the specified simple audio source.
   * @access public
   * @constructor
   * @param {SCNAudioSource} source - An audio source object.
   * @desc Using this initializer is typically not necessary. Instead, call the audioPlayerWithSource: method, which returns a cached audio player object if one for the specified audio source has already been created and is available for use.
   * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1522736-init
   */
  constructor(source) {
    super()

    // Working with Audio Sources

    this._audioSource = source
    this._audioNode = new AVAudioMixerNode()
    this._audioNode._gainNode = source._gainNode

    // Responding to Playback

    /**
     * A block called by SceneKit when playback of the player’s audio source is about to begin.
     * @type {?function(): void}
     * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1524115-willstartplayback
     */
    this.willStartPlayback = null

    /**
     * A block called by SceneKit when playback of the player’s audio source has completed.
     * @type {?function(): void}
     * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1522818-didfinishplayback
     */
    this.didFinishPlayback = null
  }

  /**
   * Initializes an audio player for playing the specified AVFoundation audio node.
   * @access public
   * @param {AVAudioNode} audioNode - An audio node object.
   * @returns {void}
   * @desc Using this initializer is typically not necessary. Instead, call the audioPlayerWithAVAudioNode: method, which returns a cached audio player object if one for the specified AVAudioNode object has already been created and is available for use.
   * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1523010-init
   */
  initAvAudioNode(audioNode) {

    // Working with Audio Sources

    this._audioSource = null
    this._audioNode = null

    // Responding to Playback

    /**
     * A block called by SceneKit when playback of the player’s audio source is about to begin.
     * @type {?function(): void}
     * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1524115-willstartplayback
     */
    this.willStartPlayback = null

    /**
     * A block called by SceneKit when playback of the player’s audio source has completed.
     * @type {?function(): void}
     * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1522818-didfinishplayback
     */
    this.didFinishPlayback = null

  }

  // Working with Audio Sources

  /**
   * The source of audio played by this player.
   * @type {?SCNAudioSource}
   * @desc An SCNAudioSource object represents a distinct source of audio—for example, a sound file—that can be reused and shared by many player objects. Use a player’s audio source to configure the default values for playback parameters such as volume and reverb. To vary those parameters in real time during playback, use the audioNode property to work with the underlying AVAudioNode object.If the player was created with the audioPlayerWithAVAudioNode: method, this property’s value is nil.
   * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1523059-audiosource
   */
  get audioSource() {
    return this._audioSource
  }

  /**
   * The audio node SceneKit uses for mixing audio from this player.
   * @type {?AVAudioNode}
   * @desc SceneKit uses this AVAudioNode object to perform 3D positional mixing during playback. Use this object to vary parameters such as volume and reverb in real time during playback. To set default values for those parameters, use the audioSource property.
   * @see https://developer.apple.com/documentation/scenekit/scnaudioplayer/1522747-audionode
   */
  get audioNode() {
    return this._audioNode
  }

  _play() {
    this._audioSource._play()
  }

  _stop() {
    this._audioSource._stop()
  }

  /**
   * @access private
   * @returns {Promise} -
   */
  _getLoadedPromise() {
    if(this._audioSource){
      return this._audioSource._getLoadedPromise()
    }
    
    return Promise.resolve()
  }

}
