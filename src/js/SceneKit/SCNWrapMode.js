'use strict'


/**
 * Modes to apply to texture wrapping, used by the wrapT and wrapS properties.
 * @typedef {Object} SCNWrapMode
 * @property {number} clamp - Texture coordinates are clamped to the range from 0.0 to 1.0, inclusive.
 * @property {number} repeat - Texture sampling uses only the fractional part of texture coordinates, passing through the range from 0.0 to (but not including) 1.0.
 * @property {number} clampToBorder - Texture sampling uses texture colors for coordinates in the range from 0.0 to 1.0 (inclusive) and the material property’s borderColor value otherwise.
 * @property {number} mirror - Texture sampling of texture coordinates outside range from 0.0 to 1.0 should behave as if the range reverses before repeating.
 * @see https://developer.apple.com/documentation/scenekit/scnwrapmode
 */
const SCNWrapMode = {
  clamp: 1,
  repeat: 2,
  clampToBorder: 3,
  mirror: 4
}

export default SCNWrapMode
