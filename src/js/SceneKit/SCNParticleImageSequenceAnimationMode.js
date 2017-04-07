'use strict'


/**
 * Options for animating each particle with a sequence of images, used by the imageSequenceAnimationMode property.
 * @typedef {Object} SCNParticleImageSequenceAnimationMode
 * @property {number} repeat - The animation loops after displaying all of its images.
 * @property {number} clamp - The animation stops after displaying all of its images.
 * @property {number} autoReverse - After the animation displays all of its images, it plays again in reverse order.
 * @see https://developer.apple.com/reference/scenekit/scnparticleimagesequenceanimationmode
 */
const SCNParticleImageSequenceAnimationMode = {
  repeat: 0,
  clamp: 1,
  autoReverse: 2
}

export default SCNParticleImageSequenceAnimationMode
