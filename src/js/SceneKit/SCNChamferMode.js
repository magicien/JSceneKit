'use strict'


/**
 * Options for which edges of an extruded shape are chamfered, used by the chamferMode property.
 * @typedef {Object} SCNChamferMode
 * @property {number} both - Apply a chamfer to both front and back edges of the extruded shape.
 * @property {number} front - Apply a chamfer to only the front edge of the extruded shape.
 * @property {number} back - Apply a chamfer to only the back edge of the extruded shape.
 * @see https://developer.apple.com/documentation/scenekit/scnchamfermode
 */
const SCNChamferMode = {
  both: 0,
  front: 1,
  back: 2
}

export default SCNChamferMode
