'use strict'


/**
 * Modes that describe how SceneKit blends source colors rendered using a material with destination colors already in a rendering target, used by the blendMode property.
 * @typedef {Object} SCNBlendMode
 * @property {Symbol} alpha - Blend by multiplying source and destination color values by their corresponding alpha values.
 * @property {Symbol} add - Blend by adding the source color to the destination color.
 * @property {Symbol} subtract - Blend by subtracting the source color from the destination color.
 * @property {Symbol} multiply - Blend by multiplying the source color with the background color.
 * @property {Symbol} screen - Blend by multiplying the inverse of the source color with the inverse of the destination color.
 * @property {Symbol} replace - Blend by replacing the destination color with the source color, ignoring alpha.
 * @see https://developer.apple.com/reference/scenekit/scnblendmode
 */
const SCNBlendMode = {
  alpha: Symbol(),
  add: Symbol(),
  subtract: Symbol(),
  multiply: Symbol(),
  screen: Symbol(),
  replace: Symbol()
}

export default SCNBlendMode
