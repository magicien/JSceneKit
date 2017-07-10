'use strict'

import CAAnimation from './CAAnimation'


/**
 * Methods your app can implement to respond when animations start and stop.
 * @interface
 * @see https://developer.apple.com/documentation/quartzcore/caanimationdelegate
 */
export default class CAAnimationDelegate {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Instance Methods

  /**
   * Tells the delegate the animation has started. 
   * @access public
   * @param {CAAnimation} anim - The CAAnimation object that has started.
   * @returns {void}
   * @see https://developer.apple.com/documentation/quartzcore/caanimationdelegate/2097265-animationdidstart
   */
  animationDidStart(anim) {
  }

  /**
   * Tells the delegate the animation has ended. 
   * @access public
   * @param {CAAnimation} anim - The CAAnimation object that has ended.
   * @param {boolean} flag - A flag indicating whether the animation has completed by reaching the end of its duration.
   * @returns {void}
   * @desc The animation may have ended because it has completed its active duration or because it has been removed from the layer it is attached to. flag is true if the animation reached the end of its duration without being removed.
   * @see https://developer.apple.com/documentation/quartzcore/caanimationdelegate/2097259-animationdidstop
   */
  animationDidStopFinished(anim, flag) {
  }
}
