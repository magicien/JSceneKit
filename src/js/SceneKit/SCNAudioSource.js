'use strict'

import _AjaxRequest from '../util/_AjaxRequest'
import NSObject from '../ObjectiveC/NSObject'

/*global AudioContextr*/
let _AudioContext = () => {}
if(typeof AudioContext !== 'undefined'){
  _AudioContext = AudioContext
}else{
  console.error('error: AudioContext is not supported')
}
const _context = new _AudioContext()

/**
 * A simple, reusable audio source—music or sound effects loaded from a file—for use in positional audio playback.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnaudiosource
 */
export default class SCNAudioSource extends NSObject {

  // Creating an Audio Source

  /**
   * Returns the audio source associated with the specified filename.
   * @access public
   * @param {string} fileName - The name of an audio file. If this filename has not been previously requested, the method looks for an audio file with the specified name in the application’s main bundle.
   * @returns {void}
   * @desc This method looks in the system caches for an audio source with the specified name and returns that object if it exists. If a matching audio source is not already in the cache, this method locates the audio file with the specified name in the application’s main bundle, then creates a new audio source and caches it for reuse.
   * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524138-init
   */
  initNamed(fileName) {
  }

  /**
   * Initializes an audio source from an audio file in the application’s main bundle.
   * @access public
   * @param {string} name - The name of an audio file in the application’s main bundle.
   * @returns {void}
   * @desc Calling this method is equivalent to using the Bundle class to locate an audio file in the application’s main bundle and then passing the resulting URL to the init(url:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524225-init
   */
  initFileNamed(name) {
  }

  /**
   * Initializes an audio source from the specified audio file.
   * @access public
   * @constructor
   * @param {string} url - A URL locating an audio file.
   * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1523264-init
   */
  constructor(url) {
    super()

    // Controlling 3D Audio Spatialization

    /**
     * A Boolean value that determines whether audio from this source uses 3D positional mixing.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524185-ispositional
     */
    this.isPositional = false


    // Setting Default Playback Parameters

    /**
     * The default playback volume for the audio source.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524106-volume
     */
    //this.volume = 0

    /**
     * The default playback rate for the audio source.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524189-rate
     */
    this.rate = 0

    /**
     * The default blend of blend of unmodified and reverb-processed (also called dry and wet) audio for playback of the audio source.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1523450-reverbblend
     */
    this.reverbBlend = 0

    /**
     * A Boolean value that determines whether the audio source should play repeatedly.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524183-loops
     */
    //this.loops = false

    /**
     * A Boolean value that determines whether the audio source should stream content from its source URL when playing.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1523475-shouldstream
     */
    this.shouldStream = false

    this._loading = false
    this._loadedPromise = new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
    this._url = url
    this._buffer = null
    this._gainNode = _context.createGain()
    this._loops = false
    this._source = null
    //this._source = _context.createBufferSource()
    //this._source.connect(this._gainNode)
    //this._gainNode.connect(_context.destination)
  }

  /**
   * The default playback volume for the audio source.
   * @type {number}
   * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524106-volume
   */
  get volume() {
    return this._gainNode.gain.value
  }
  set volume(newValue) {
    this._gainNode.gain.value = newValue
  }

  /**
   * A Boolean value that determines whether the audio source should play repeatedly.
   * @type {boolean}
   * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1524183-loops
   */
  get loops() {
    return this._loops
  }
  set loops(newValue) {
    this._loops = newValue
    if(this._source !== null){
      this._source.loop = newValue
    }
  }

  // Preloading Audio Data

  /**
   * Loads audio data from the source and prepares it for playing.
   * @access public
   * @returns {void}
   * @desc This method reads audio data from the source file (specified when initializing the audio source) and performs any decompression necessary to prepare for playing audio. Use this method to control when your app or game incurs the run-time performance cost of such work—for example, you can load all audio source before starting a game level, instead of suffering a frame rate drop upon playing a new audio source during gameplay.This method has no effect if the shouldStream property’s value is true.
   * @see https://developer.apple.com/documentation/scenekit/scnaudiosource/1523399-load
   */
  load() {
    if(this._loading){
      return
    }
    this._loading = true

    const promise = _AjaxRequest.get(this._url, {responseType: 'arraybuffer'})
    .then((data) => {
      _context.decodeAudioData(data, (buffer) => {
        this._buffer = buffer
        this._resolve()
      })
    })
  }

  _play(when = 0) {
    this.load()
    this._loadedPromise.then(() => {
      this._source = _context.createBufferSource()
      this._source.buffer = this._buffer
      this._source.connect(this._gainNode)
      this._gainNode.connect(_context.destination)
      this._source.loop = this._loops
      this._source.start(when)
    })
  }

  _stop(when = 0) {
    if(this._source){
      this._source.stop(when)
      this._source = null
    }
  }

  get _duration() {
    if(this._buffer){
      return this._buffer.duration
    }
    return null
  }

  /**
   * @access private
   * @returns {Promise} -
   */
  _getLoadedPromise() {
    if(this._loadedPromise){
      return this._loadedPromise
    }
    
    return Promise.resolve()
  }
}
