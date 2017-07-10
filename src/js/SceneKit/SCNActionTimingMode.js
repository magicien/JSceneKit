'use strict'


/**
 * Constants affecting the animation curve of an action, used by the timingMode property.
 * @typedef {Object} SCNActionTimingMode
 * @property {number} linear - Linear pacing. The animation progresses evenly throughout its duration.
 * @property {number} easeIn - Ease-in pacing. The animation begins slowly, and then speeds up as it progresses.
 * @property {number} easeOut - Ease-out pacing. The animation begins quickly, and then slows as it completes.
 * @property {number} easeInEaseOut - Ease-in ease-out pacing. The animation begins slowly, accelerates through the middle of its duration, and then slows again before completing.
 * @see https://developer.apple.com/documentation/scenekit/scnactiontimingmode
 */
const SCNActionTimingMode = {
  linear: 0,
  easeIn: 1,
  easeOut: 2,
  easeInEaseOut: 3
}

export default SCNActionTimingMode
