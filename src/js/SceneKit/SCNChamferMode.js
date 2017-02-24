'use strict'


/**
 * Options for which edges of an extruded shape are chamfered, used by the chamferMode property.
 * @typedef {Object} SCNChamferMode
 * @property {Symbol} both - Apply a chamfer to both front and back edges of the extruded shape.
 * @property {Symbol} front - Apply a chamfer to only the front edge of the extruded shape.
 * @property {Symbol} back - Apply a chamfer to only the back edge of the extruded shape.
 * @see https://developer.apple.com/reference/scenekit/scnchamfermode
 */
const SCNChamferMode = {
  both: Symbol(),
  front: Symbol(),
  back: Symbol()
}

export default SCNChamferMode
