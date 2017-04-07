'use strict'


/**
 * Rules for determining which regions are interior to a path, used by the fillPath(using:) and clip(using:) methods.
 * @typedef {Object} CGPathFillRule
 * @property {number} evenOdd - A rule that considers a region to be interior to a path based on the number of times it is enclosed by path elements.
 * @property {number} winding - A rule that considers a region to be interior to a path if the winding number for that region is nonzero.
 * @see https://developer.apple.com/reference/coregraphics/cgpathfillrule
 */
const CGPathFillRule = {
  evenOdd: 1,
  winding: 0
}

export default CGPathFillRule
