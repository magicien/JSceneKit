'use strict'

/**
 * The type of the color-space mode constants listed in Color Space Models.
 * @typedef {Object} NSColorSpaceModel
 * @property {number} CMYK - 
 * @property {number} LAB - 
 * @property {number} RGB - 
 * @property {number} deviceN - 
 * @property {number} gray - 
 * @property {number} indexed - 
 * @property {number} patterned - 
 * @property {number} unknown - 
 * @see https://developer.apple.com/documentation/appkit/nscolorspacemodel
 */
const NSColorSpaceModel = {
  gray: 0,
  RGB: 1,
  CMYK: 2,
  LAB: 3,
  deviceN: 4,
  indexed: 5,
  patterned: 6,
  unknown: -1
}

export default NSColorSpaceModel
