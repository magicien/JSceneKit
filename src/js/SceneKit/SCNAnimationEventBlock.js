'use strict'

//import CAAnimation from '../QuartzCore/CAAnimation'

/**
 * Signature for the block called when an animation event triggers.
 * @type {function(animation: CAAnimation, animatedObject: Object, playingBackward: boolean): void}
 * @param {CAAnimation} animation - The animation triggering the animation event.
 * @param {Object} animatedObject - The Scene Kit object affected by the animation.
 * @param {boolean} playingBackward - true if the animation is playing in reverse; otherwise, false.
 * @returns {void}
 * @see https://developer.apple.com/documentation/scenekit/scnanimationeventblock
 */
const SCNAnimationEventBlock = (animation, animatedObject, playingBackward) => {}

export default SCNAnimationEventBlock
