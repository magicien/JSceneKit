'use strict'


/**
 * Options for animating each particle with a sequence of images, used by the imageSequenceAnimationMode property.
 * @typedef {Object} SCNParticleImageSequenceAnimationMode
 * @property {Symbol} repeat - The animation loops after displaying all of its images.
 * @property {Symbol} clamp - The animation stops after displaying all of its images.
 * @property {Symbol} autoReverse - After the animation displays all of its images, it plays again in reverse order.
 * @see https://developer.apple.com/reference/scenekit/scnparticleimagesequenceanimationmode
 */
const SCNParticleImageSequenceAnimationMode = {
  repeat: Symbol(),
  clamp: Symbol(),
  autoReverse: Symbol()
}

export default SCNParticleImageSequenceAnimationMode
