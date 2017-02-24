'use strict'

import SCNVector4 from './SCNVector4'

/**
 * A representation of a quaternion.
 * @type {SCNVector4}
 * @desc A quaternion is a mathematical construct useful for describing rotations in three-dimensional space. Although its implementation differs from that of a 4-component vector, you specify a quaternion value using the same fields as an SCNVector4 structure.SceneKit uses unit quaternions (those whose components satisfy the equation x*x + y*y + z*z + w*w == 1) for the orientation property of nodes.
 * @see https://developer.apple.com/reference/scenekit/scnquaternion
 */
const SCNQuaternion = SCNVector4

export default SCNQuaternion
