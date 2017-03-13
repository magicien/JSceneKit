'use strict'

import * as Constants from '../constants'
import NSObject from '../ObjectiveC/NSObject'
import CAAction from './CAAction'
import CAMediaTiming from './CAMediaTiming'
import CAMediaTimingFunction from './CAMediaTimingFunction'
import CAAnimationDelegate from './CAAnimationDelegate'
import SCNAnimationEvent from '../SceneKit/SCNAnimationEvent'


/**
 * The abstract superclass for Core Animation animations. 
 * @access public
 * @extends {NSObject}
 * @implements {CAAction}
 * @implements {CAMediaTiming}
 * @see https://developer.apple.com/reference/quartzcore/caanimation
 */
export default class CAAnimation extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Animation attributes

    /**
     * Determines if the animation is removed from the target layer’s animations upon completion.
     * @type {boolean}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1412458-isremovedoncompletion
     */
    this.isRemovedOnCompletion = false

    /**
     * An optional timing function defining the pacing of the animation.
     * @type {?CAMediaTimingFunction}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1412456-timingfunction
     */
    this.timingFunction = null


    // Getting and setting the delegate

    /**
     * Specifies the receiver’s delegate object.
     * @type {?CAAnimationDelegate}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1412490-delegate
     */
    this.delegate = null


    // Controlling SceneKit Animation Timing

    /**
     * For animations attached to SceneKit objects, a Boolean value that determines whether the animation is evaluated using the scene time or the system time.
     * @type {boolean}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1523819-usesscenetimebase
     */
    this.usesSceneTimeBase = false


    // Fading Between SceneKit Animations

    /**
     * For animations attached to SceneKit objects, the duration for transitioning into the animation’s effect as it beins.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1523370-fadeinduration
     */
    this.fadeInDuration = 0

    /**
     * For animations attached to SceneKit objects, the duration for transitioning out of the animation’s effect as it ends.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1522959-fadeoutduration
     */
    this.fadeOutDuration = 0


    // Attaching SceneKit Animation Events

    /**
     * For animations attached to SceneKit objects, a list of events attached to an animation.
     * @type {?SCNAnimationEvent[]}
     * @see https://developer.apple.com/reference/quartzcore/caanimation/1523940-animationevents
     */
    this.animationEvents = null

    ///////////////////
    // CAMediaTiming //
    ///////////////////

    // Animation Start Time

    /**
     * Required. Specifies the begin time of the receiver in relation to its parent object, if applicable.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427654-begintime
     */
    this.beginTime = 0

    /**
     * Required. Specifies an additional time offset in active local time.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427650-timeoffset
     */
    this.timeOffset = 0


    // Repeating Animations

    /**
     * Required. Determines the number of times the animation will repeat.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427666-repeatcount
     */
    this.repeatCount = 0

    /**
     * Required. Determines how many seconds the animation will repeat for.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427643-repeatduration
     */
    this.repeatDuration = 0


    // Duration and Speed

    /**
     * Required. Specifies the basic duration of the animation, in seconds.
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427652-duration
     */
    this.duration = 0

    /**
     * Required. Specifies how time is mapped to receiver’s time space from the parent time space. 
     * @type {number}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427647-speed
     */
    this.speed = 1


    // Playback Modes

    /**
     * Required. Determines if the receiver plays in the reverse upon completion.
     * @type {boolean}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427645-autoreverses
     */
    this.autoreverses = false

    /**
     * Required. Determines if the receiver’s presentation is frozen or removed once its active duration has completed.
     * @type {string}
     * @see https://developer.apple.com/reference/quartzcore/camediatiming/1427656-fillmode
     */
    this.fillMode = Constants.kCAFillModeRemoved

    this._isFinished = false

    this._prevTime = null
    this._animationStartTime = null
  }

  // Archiving properties

  /**
   * Specifies whether the value of the property for a given key is archived.
   * @access public
   * @param {string} key - The name of one of the receiver’s properties.
   * @returns {boolean} - 
   * @desc Called by the object's implementation of encodeWithCoder:. The object must implement keyed archiving. The default implementation returns true. 
   * @see https://developer.apple.com/reference/quartzcore/caanimation/1412525-shouldarchivevalue
   */
  shouldArchiveValueForKey(key) {
    return false
  }

  // Providing default values for properties

  /**
   * Specifies the default value of the property with the specified key. 
   * @access public
   * @param {string} key - The name of one of the receiver’s properties.
   * @returns {?Object} - 
   * @desc If this method returns nil a suitable “zero” default value for the property is provided, based on the declared type of the key. For example, if key is a CGSize object, a size of (0.0,0.0) is returned. For a CGRect an empty rectangle is returned. For CGAffineTransform and CATransform3D, the appropriate identity matrix is returned. Special ConsiderationsIf key is not a known for property of the class, the result of the method is undefined.
   * @see https://developer.apple.com/reference/quartzcore/caanimation/1412530-defaultvalue
   */
  static defaultValueForKey(key) {
    return null
  }

  /**
   * @access public
   * @returns {CAAnimation} -
   */
  copy() {
    const anim = new CAAnimation()   
    anim._copyValue(this)
    return anim
  }

  _copyValue(src) {
    this.isRemovedOnCompletion = src.isRemovedOnCompletion
    this.timingFunction = src.timingFunction
    this.delegate = src.delegate
    this.usesSceneTimeBase = src.usesSceneTimeBase
    this.fadeInDuration = src.fadeInDuration
    this.fadeOutDuration = src.fadeOutDuration
    this.thisationEvents = src.thisationEvents
    this.beginTime = src.beginTime
    this.timeOffset = src.timeOffset
    this.repeatCount = src.repeatCount
    this.repeatDuration = src.repeatDuration
    this.duration = src.duration
    this.speed = src.speed
    this.autoreverses = src.autoreverses
    this.fillMode = src.fillMode
  }

  /**
   * apply animation to the given node.
   * @access private
   * @param {Object} obj - target object to apply this animation.
   * @param {number} time - active time
   * @returns {void}
   */
  _applyAnimation(obj, time) {
    const activeTime = time - this._animationStartTime
    const baseTime = this._basetimeFromActivetime(activeTime)
    let t = baseTime
    if(this.timingFunction !== null){
      t = this.timingFunction._getValueAtTime(baseTime)
    }
    this._handleEvents(obj, t)
  }

  _handleEvents(obj, time) {
    if(this.animationEvents === null){
      return
    }
    let prevTime = this._prevTime
    if(prevTime === null){
      prevTime = time - 0.0000001
    }
    this.animationEvents.forEach((event) => {
      if(prevTime < event.time && event.time <= time){
        if(event.block){
          // FIXME: set playingBackward
          // SCNAnimationEventBlock(animation, animatedObject, playingBackward)
          event.block(this, obj, false)
        }
      }
    })
  }

  /**
   * convert active time to base time
   * @access private
   * @param {number} time - active time
   * @returns {number} - animation base time for the current frame (0-1 or null).
   */
  _basetimeFromActivetime(time) {
    let dt = time - this.beginTime
    if(dt < 0){
      if(this.fillMode === Constants.kCAFillModeBackwards ||
         this.fillMode === Constants.kCAFillModeBoth){
        dt = 0
      }else{
        return null
      }
    }
    if(this.speed === 0){
      return 0
    }
    let oneLoopDuration = this.duration / Math.abs(this.speed)
    let duration = oneLoopDuration
    if(duration === 0){
      duration = 0.25
    }

    if(this.repeatDuration > 0){
      duration = this.repeatDuration
    }else{
      if(this.repeatCount > 0){
        duration *= this.repeatCount
      }
      if(this.autoreverses){
        oneLoopDuration *= 2.0
        duration *= 2.0
      }
    }

    if(dt > duration){
      // animation is over
      this._isFinished = true
      if(this.fillMode === Constants.kCAFillModeForwards ||
         this.fillMode === Constants.kCAFillModeBoth){
        dt = duration
      }else{
        return null
      }
    }

    let t = ((dt + this.timeOffset) % oneLoopDuration) / oneLoopDuration
    if(t < 0){
      t = 1 + t
    }
    if(this.autoreverses){
      if(t <= 0.5){
        return t * 2.0
      }
      return (1 - t) * 2.0
    }
    return t
  }
}
