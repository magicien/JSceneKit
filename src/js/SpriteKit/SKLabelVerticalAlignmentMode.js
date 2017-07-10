'use strict'

/**
 * Options for aligning text vertically. 
 * @typedef {Object} SKLabelVerticalAlignmentMode
 * @property {number} baseline - Positions the text so that the font’s baseline lies on the node’s origin.
 * @property {number} center - Centers the text vertically on the node’s origin.
 * @property {number} top - Positions the text so that the top of the text is on the node’s origin.
 * @property {number} bottom - Positions the text so that the bottom of the text is on the node’s origin.
 * @see https://developer.apple.com/documentation/spritekit/sklabelverticalalignmentmode
 */
const SKLabelVerticalAlignmentMode = {
  baseline: 0,
  center: 1,
  top: 2,
  bottom: 3
}

export default SKLabelVerticalAlignmentMode
