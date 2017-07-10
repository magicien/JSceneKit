'use strict'

/**
 * 
 * @access public
 * @typedef {Object} SCNColorMask
 * @property {number} red -
 * @property {number} blue -
 * @property {number} green -
 * @property {number} alpha -
 * @property {number} all -
 * @see https://developer.apple.com/documentation/scenekit/scncolormask
 */
const SCNColorMask = {
  red: 1,
  green: 2,
  blue: 4,
  alpha: 8,
  all: 15
}

export default SCNColorMask
