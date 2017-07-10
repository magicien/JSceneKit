'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimation from './SCNAnimation'

/**
 * 
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer
 */
export default class SCNAnimationPlayer extends NSObject {
  static get _propTypes() {
    return {
      speed: 'float',
      weight: ['float', '_weight'],
      paused: 'boolean'
    }
  }

  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {SCNAnimation} animation - 
   * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2866046-init
   */
  constructor(animation) {
    super()

    // Instance Properties

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2881688-blendfactor
     */
    this.blendFactor = 0

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2866058-paused
     */
    this.paused = false

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2866041-speed
     */
    this.speed = 0

    /**
     * @access private
     * @type {number}
     */
    this._weight = 0

    /**
     * @access private
     * @type {SCNAnimation}
     */
    this._animation = animation
  }

  // Instance Properties
  /**
   * 
   * @type {SCNAnimation}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2866065-animation
   */
  get animation() {
    return this._animation
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2866049-play
   */
  play() {
  }

  /**
   * 
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2866055-stop
   */
  stop() {
  }

  /**
   * 
   * @access public
   * @param {number} duration - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimationplayer/2887037-stop
   */
  stopWithBlendOutDuration(duration) {
  }
}
