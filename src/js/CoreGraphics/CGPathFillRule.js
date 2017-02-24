'use strict'


/**
 * Rules for determining which regions are interior to a path, used by the fillPath(using:) and clip(using:) methods.
 * @typedef {Object} CGPathFillRule
 * @property {Symbol} evenOdd - A rule that considers a region to be interior to a path based on the number of times it is enclosed by path elements.
 * @property {Symbol} winding - A rule that considers a region to be interior to a path if the winding number for that region is nonzero.
 * @see https://developer.apple.com/reference/coregraphics/cgpathfillrule
 */
const CGPathFillRule = {
  evenOdd: Symbol(),
  winding: Symbol()
}

export default CGPathFillRule
