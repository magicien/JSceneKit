'use strict'

import SCNVector4 from './SCNVector4'

/**
 * 
 * @access public
 * @param {SCNVector4} v - 
 * @returns {number[]} - 
 * @see https://developer.apple.com/reference/scenekit/1523001-scnvector4tofloat4
 */
const SCNVector4ToFloat4 = function(v) {
  return [v.x, v.y, v.z, v.w]
}

export default SCNVector4ToFloat4
