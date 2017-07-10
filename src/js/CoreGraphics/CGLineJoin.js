'use strict'


/**
 * Junction types for stroked lines.
 * @typedef {Object} CGLineJoin
 * @property {number} miter - 
 * @property {number} round - A join with a rounded end. Core Graphics draws the line to extend beyond the endpoint of the path. The line ends with a semicircular arc with a radius of 1/2 the line’s width, centered on the endpoint.
 * @property {number} bevel - A join with a squared-off end. Core Graphics draws the line to extend beyond the endpoint of the path, for a distance of 1/2 the line’s width.
 * @see https://developer.apple.com/documentation/coregraphics/cglinejoin
 */
const CGLineJoin = {
  miter: 0,
  round: 1,
  bevel: 2
}

export default CGLineJoin
