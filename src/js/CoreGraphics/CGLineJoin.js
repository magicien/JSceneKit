'use strict'


/**
 * Junction types for stroked lines.
 * @typedef {Object} CGLineJoin
 * @property {Symbol} miter - 
 * @property {Symbol} round - A join with a rounded end. Core Graphics draws the line to extend beyond the endpoint of the path. The line ends with a semicircular arc with a radius of 1/2 the line’s width, centered on the endpoint.
 * @property {Symbol} bevel - A join with a squared-off end. Core Graphics draws the line to extend beyond the endpoint of the path, for a distance of 1/2 the line’s width.
 * @see https://developer.apple.com/reference/coregraphics/cglinejoin
 */
const CGLineJoin = {
  miter: Symbol(),
  round: Symbol(),
  bevel: Symbol()
}

export default CGLineJoin
