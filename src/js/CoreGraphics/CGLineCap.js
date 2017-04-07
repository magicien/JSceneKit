'use strict'


/**
 * Styles for rendering the endpoint of a stroked line.
 * @typedef {Object} CGLineCap
 * @property {number} butt - A line with a squared-off end. Core Graphics draws the line to extend only to the exact endpoint of the path. This is the default.
 * @property {number} round - A line with a rounded end. Core Graphics draws the line to extend beyond the endpoint of the path. The line ends with a semicircular arc with a radius of 1/2 the line’s width, centered on the endpoint.
 * @property {number} square - A line with a squared-off end. Core Graphics extends the line beyond the endpoint of the path for a distance equal to half the line width.
 * @see https://developer.apple.com/reference/coregraphics/cglinecap
 */
const CGLineCap = {
  butt: 0,
  round: 1,
  square: 2
}

export default CGLineCap
