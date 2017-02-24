'use strict'


/**
 * Options for combining source and destination pixel colors when compositing particles during rendering, used by the blendMode property.
 * @typedef {Object} SCNParticleBlendMode
 * @property {Symbol} additive - The source and destination colors are added together.
 * @property {Symbol} subtract - The source color is subtracted from the destination color.
 * @property {Symbol} multiply - The source color is multiplied by the destination color.
 * @property {Symbol} screen - The source color is added to the destination color times the inverted source color.
 * @property {Symbol} alpha - The source and destination colors are blended by multiplying the source alpha value.
 * @property {Symbol} replace - The source color replaces the destination color.
 * @see https://developer.apple.com/reference/scenekit/scnparticleblendmode
 */
const SCNParticleBlendMode = {
  additive: Symbol(),
  subtract: Symbol(),
  multiply: Symbol(),
  screen: Symbol(),
  alpha: Symbol(),
  replace: Symbol()
}

export default SCNParticleBlendMode
