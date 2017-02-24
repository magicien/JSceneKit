'use strict'


/**
 * The modes SceneKit uses to calculate the opacity of pixels rendered with a material, used by the transparencyMode property.
 * @typedef {Object} SCNTransparencyMode
 * @property {Symbol} aOne - SceneKit derives transparency information from the alpha channel of colors. The value 1.0 is opaque.
 * @property {Symbol} rgbZero - SceneKit derives transparency information from the luminance of colors. The value 0.0 is opaque.
 * @see https://developer.apple.com/reference/scenekit/scntransparencymode
 */
const SCNTransparencyMode = {
  aOne: Symbol(),
  rgbZero: Symbol()
}

export default SCNTransparencyMode
