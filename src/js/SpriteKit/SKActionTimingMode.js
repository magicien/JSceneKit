'use strict'


/**
 * The modes that an action can use to adjust the apparent timing of the action.
 * @typedef {Object} SKActionTimingMode
 * @property {number} linear - Specifies linear pacing. Linear pacing causes an animation to occur evenly over its duration.
 * @property {number} easeIn - Specifies ease-in pacing. Ease-in pacing causes the animation to begin slowly and then speed up as it progresses.
 * @property {number} easeOut - Specifies ease-out pacing. Ease-out pacing causes the animation to begin quickly and then slow as it completes.
 * @property {number} easeInEaseOut - Specifies ease-in ease-out pacing. An ease-in ease-out animation begins slowly, accelerates through the middle of its duration, and then slows again before completing.
 * @see https://developer.apple.com/documentation/spritekit/skactiontimingmode
 */
const SKActionTimingMode = {
  linear: 0,
  easeIn: 1,
  easeOut: 2,
  easeInEaseOut: 3
}

export default SKActionTimingMode
