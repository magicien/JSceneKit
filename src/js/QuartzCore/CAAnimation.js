'use strict'

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
     * For animations attached to SceneKit objects, the duration for transitioning into the animation’s effect as it begins.
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
}
