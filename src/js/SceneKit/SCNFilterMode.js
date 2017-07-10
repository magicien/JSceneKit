'use strict'


/**
 * Texture filtering modes, used by the the minificationFilter, magnificationFilter, and mipFilter properties.
 * @typedef {Object} SCNFilterMode
 * @property {number} none - No texture filtering is applied.
 * @property {number} nearest - Texture filtering returns the color from only one texel, whose location is nearest to the coordinates being sampled.
 * @property {number} linear - Texture filtering sample texels from the neighborhood of the coordinates being sampled and linearly interpolates their colors.
 * @see https://developer.apple.com/documentation/scenekit/scnfiltermode
 */
const SCNFilterMode = {
  none: 0,
  nearest: 1,
  linear: 2
}

export default SCNFilterMode
