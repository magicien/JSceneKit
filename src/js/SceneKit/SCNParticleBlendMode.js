'use strict'


/**
 * Options for combining source and destination pixel colors when compositing particles during rendering, used by the blendMode property.
 * @typedef {Object} SCNParticleBlendMode
 * @property {number} additive - The source and destination colors are added together.
 * @property {number} subtract - The source color is subtracted from the destination color.
 * @property {number} multiply - The source color is multiplied by the destination color.
 * @property {number} screen - The source color is added to the destination color times the inverted source color.
 * @property {number} alpha - The source and destination colors are blended by multiplying the source alpha value.
 * @property {number} replace - The source color replaces the destination color.
 * @see https://developer.apple.com/reference/scenekit/scnparticleblendmode
 */
const SCNParticleBlendMode = {
  additive: 0,
  subtract: 1,
  multiply: 2,
  screen: 3,
  alpha: 4,
  replace: 5
}

export default SCNParticleBlendMode
