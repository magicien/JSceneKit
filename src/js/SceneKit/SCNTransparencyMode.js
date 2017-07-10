'use strict'


/**
 * The modes SceneKit uses to calculate the opacity of pixels rendered with a material, used by the transparencyMode property.
 * @typedef {Object} SCNTransparencyMode
 * @property {number} aOne - SceneKit derives transparency information from the alpha channel of colors. The value 1.0 is opaque.
 * @property {number} rgbZero - SceneKit derives transparency information from the luminance of colors. The value 0.0 is opaque.
 * @see https://developer.apple.com/documentation/scenekit/scntransparencymode
 */
const SCNTransparencyMode = {
  aOne: 0,
  rgbZero: 1
}

export default SCNTransparencyMode
