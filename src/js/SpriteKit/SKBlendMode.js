'use strict'


/**
 * The modes that describe how the source and destination pixel colors are used to calculate the new destination color.
 * @typedef {Object} SKBlendMode
 * @property {number} alpha - The source and destination colors are blended by multiplying the source alpha value.
 * @property {number} add - The source and destination colors are added together.
 * @property {number} subtract - The source color is subtracted from the destination color.
 * @property {number} multiply - The source color is multiplied by the destination color.
 * @property {number} multiplyX2 - The source color is multiplied by the destination color and then doubled.
 * @property {number} screen - The source color is added to the destination color times the inverted source color.
 * @property {number} replace - The source color replaces the destination color.
 * @see https://developer.apple.com/reference/spritekit/skblendmode
 */
const SKBlendMode = {
  alpha: 0,
  add: 1,
  subtract: 2,
  multiply: 3,
  multiplyX2: 4,
  screen: 5,
  replace: 6
}

export default SKBlendMode
