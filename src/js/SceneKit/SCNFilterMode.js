'use strict'


/**
 * Texture filtering modes, used by the the minificationFilter, magnificationFilter, and mipFilter properties.
 * @typedef {Object} SCNFilterMode
 * @property {Symbol} none - No texture filtering is applied.
 * @property {Symbol} nearest - Texture filtering returns the color from only one texel, whose location is nearest to the coordinates being sampled.
 * @property {Symbol} linear - Texture filtering sample texels from the neighborhood of the coordinates being sampled and linearly interpolates their colors.
 * @see https://developer.apple.com/reference/scenekit/scnfiltermode
 */
const SCNFilterMode = {
  none: Symbol(),
  nearest: Symbol(),
  linear: Symbol()
}

export default SCNFilterMode
