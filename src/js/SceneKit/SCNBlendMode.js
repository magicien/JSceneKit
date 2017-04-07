'use strict'


/**
 * Modes that describe how SceneKit blends source colors rendered using a material with destination colors already in a rendering target, used by the blendMode property.
 * @typedef {Object} SCNBlendMode
 * @property {number} alpha - Blend by multiplying source and destination color values by their corresponding alpha values.
 * @property {number} add - Blend by adding the source color to the destination color.
 * @property {number} subtract - Blend by subtracting the source color from the destination color.
 * @property {number} multiply - Blend by multiplying the source color with the background color.
 * @property {number} screen - Blend by multiplying the inverse of the source color with the inverse of the destination color.
 * @property {number} replace - Blend by replacing the destination color with the source color, ignoring alpha.
 * @see https://developer.apple.com/reference/scenekit/scnblendmode
 */
const SCNBlendMode = {
  alpha: 0,
  add: 1,
  subtract: 2,
  multiply: 3,
  screen: 4,
  replace: 5
}

export default SCNBlendMode
