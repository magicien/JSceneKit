'use strict'


/**
 * Constants affecting the animation curve of an action, used by the timingMode property.
 * @typedef {Object} SCNActionTimingMode
 * @property {Symbol} linear - Linear pacing. The animation progresses evenly throughout its duration.
 * @property {Symbol} easeIn - Ease-in pacing. The animation begins slowly, and then speeds up as it progresses.
 * @property {Symbol} easeOut - Ease-out pacing. The animation begins quickly, and then slows as it completes.
 * @property {Symbol} easeInEaseOut - Ease-in ease-out pacing. The animation begins slowly, accelerates through the middle of its duration, and then slows again before completing.
 * @see https://developer.apple.com/reference/scenekit/scnactiontimingmode
 */
const SCNActionTimingMode = {
  linear: Symbol(),
  easeIn: Symbol(),
  easeOut: Symbol(),
  easeInEaseOut: Symbol()
}

export default SCNActionTimingMode
