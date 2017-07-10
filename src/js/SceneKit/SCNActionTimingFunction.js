'use strict'

/**
 * The signature for a block that manages animation timing, used by the timingFunction property.
 * @type {function(time: number): number}
 * @param {number} time - A fraction of the action’s The input value for the timing function, as determined by the timingMode property and the action’s current progress.
 * @returns {number} -
 * @desc Your block must return a floating-point value between 0.0 and 1.0, where 0.0 represents the starting state of the action’s animation and 1.0 represents the end state.
 * @see https://developer.apple.com/documentation/scenekit/scnactiontimingfunction
 */
const SCNActionTimingFunction = (time) => {}

export default SCNActionTimingFunction
