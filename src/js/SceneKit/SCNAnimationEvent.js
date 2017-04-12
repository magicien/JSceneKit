'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import SCNAnimationEventBlock from './SCNAnimationEventBlock'

/**
 * A container for a closure to be executed at a specific time during playback of an animation.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scnanimationevent
 */
export default class SCNAnimationEvent extends NSObject {

  // Creating an Animation Event

  /**
   * Creates an animation event.
   * @access public
   * @param {number} time - A number between 0.0 and 1.0 specifying the relative time for triggering the event.
   * @param {SCNAnimationEventBlock} eventBlock - A block to call at the specified time.
   * @constructor
   * @desc The time parameter is relative to the duration of the animation the event is attached to. For example, an event with a time of 0.5 triggers when the animation is halfway complete, and an event with a time of 1.0 triggers when the animation ends.
   * @see https://developer.apple.com/reference/scenekit/scnanimationevent/1524004-init
   */
  constructor(time, eventBlock) {
    super()
    this._time = time
    this._eventBlock = eventBlock
  }

  static eventWithTimeEventBlock(time, eventBlock) {
    return new SCNAnimationEvent(time, eventBlock)
  }
}
