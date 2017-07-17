'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import CAAnimation from '../QuartzCore/CAAnimation'
//import SCNTimingFunction from './SCNTimingFunction'

/**
 * 
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimationProtocol}
 * @see https://developer.apple.com/documentation/scenekit/scnanimation
 */
export default class SCNAnimation extends NSObject {

  // Initializers

  /**
   * 
   * @access public
   * @param {CAAnimation} caAnimation - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866056-init
   */
  constructor(caAnimation) {
    super()

    // Instance Properties

    /**
     * 
     * @type {?SCNAnimationDidStartBlock}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866063-animationdidstart
     */
    this.animationDidStart = null

    /**
     * 
     * @type {?SCNAnimationDidStopBlock}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866040-animationdidstop
     */
    this.animationDidStop = null

    /**
     * 
     * @type {?SCNAnimationEvent[]}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866038-animationevents
     */
    this.animationEvents = null

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878140-autoreverses
     */
    this.autoreverses = false

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2881689-blendinduration
     */
    this.blendInDuration = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2881690-blendoutduration
     */
    this.blendOutDuration = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866057-duration
     */
    this.duration = 0

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878138-fillsbackward
     */
    this.fillsBackward = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878132-fillsforward
     */
    this.fillsForward = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866062-isadditive
     */
    this.isAdditive = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878139-isappliedoncompletion
     */
    this.isAppliedOnCompletion = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866047-iscumulative
     */
    this.isCumulative = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878126-isremovedoncompletion
     */
    this.isRemovedOnCompletion = false

    /**
     * 
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878148-keypath
     */
    this.keyPath = null

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878146-repeatcount
     */
    this.repeatCount = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878135-startdelay
     */
    this.startDelay = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878147-timeoffset
     */
    this.timeOffset = 0

    /**
     * 
     * @type {SCNTimingFunction}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878143-timingfunction
     */
    this.timingFunction = null

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnanimation/2878127-usesscenetimebase
     */
    this.usesSceneTimeBase = false

    /**
     * @access private
     * @type {CAAnimation}
     */
    this._animation = caAnimation
  }

  /**
   * 
   * @access public
   * @param {string} animationUrl - 
   * @returns {SCNAnimation} -
   * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866053-init
   */
  static animationWithContentsOf(animationUrl) {
    // TODO: implement
  }

  /**
   * 
   * @access public
   * @param {string} animationName - 
   * @returns {SCNAnimation} -
   * @see https://developer.apple.com/documentation/scenekit/scnanimation/2866042-init
   */
  static animationNamed(animationName) {
    // TODO: implement
  }
}
