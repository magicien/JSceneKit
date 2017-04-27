'use strict'

/**
 * Options for aligning text horizontally.
 * @typedef {Object} SKLabelHorizontalAlignmentMode
 * @property {number} center - Centers the text horizontally on the node’s origin.
 * @property {number} left - Positions the text so that the left side of the text is on the node’s origin.
 * @property {number} right - Positions the text so that the right side of the text is on the node’s origin.
 * @see https://developer.apple.com/reference/spritekit/sklabelhorizontalalignmentmode
 */
const SKLabelHorizontalAlignmentMode = {
  center: 0,
  left: 1,
  right: 2
}

export default SKLabelHorizontalAlignmentMode
