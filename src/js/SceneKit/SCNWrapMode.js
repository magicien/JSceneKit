'use strict'


/**
 * Modes to apply to texture wrapping, used by the wrapT and wrapS properties.
 * @typedef {Object} SCNWrapMode
 * @property {Symbol} clamp - Texture coordinates are clamped to the range from 0.0 to 1.0, inclusive.
 * @property {Symbol} repeat - Texture sampling uses only the fractional part of texture coordinates, passing through the range from 0.0 to (but not including) 1.0.
 * @property {Symbol} clampToBorder - Texture sampling uses texture colors for coordinates in the range from 0.0 to 1.0 (inclusive) and the material property’s borderColor value otherwise.
 * @property {Symbol} mirror - Texture sampling of texture coordinates outside range from 0.0 to 1.0 should behave as if the range reverses before repeating.
 * @see https://developer.apple.com/reference/scenekit/scnwrapmode
 */
const SCNWrapMode = {
  clamp: Symbol(),
  repeat: Symbol(),
  clampToBorder: Symbol(),
  mirror: Symbol()
}

export default SCNWrapMode
