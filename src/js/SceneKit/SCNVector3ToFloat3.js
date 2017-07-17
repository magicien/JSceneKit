'use strict'

//import SCNVector3 from './SCNVector3'

/**
 * 
 * @access public
 * @param {SCNVector3} v - 
 * @returns {number[]} - 
 * @see https://developer.apple.com/documentation/scenekit/1523448-scnvector3tofloat3
 */
const SCNVector3ToFloat3 = function(v) {
  return [v.x, v.y, v.z]
}

export default SCNVector3ToFloat3
