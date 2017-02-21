'use strict'



/**
 * Methods that model a hierarchical timing system, allowing objects to map time between their parent and local time. 
 * @interface
 * @see https://developer.apple.com/reference/quartzcore/camediatiming
 */
export default class CAMediaTiming {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

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
    this.speed = 0


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
    this.fillMode = ''

  }
}
