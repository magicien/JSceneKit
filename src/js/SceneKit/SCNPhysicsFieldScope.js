'use strict'


/**
 * Options for defining the region of space affected by a physics field, used by the scope property.
 * @typedef {Object} SCNPhysicsFieldScope
 * @property {Symbol} insideExtent - The field’s effect applies only to objects within the region of space defined by its position and extent.
 * @property {Symbol} outsideExtent - The field’s effect applies only to objects outside the region of space defined by its position and extent.
 * @see https://developer.apple.com/reference/scenekit/scnphysicsfieldscope
 */
const SCNPhysicsFieldScope = {
  insideExtent: Symbol(),
  outsideExtent: Symbol()
}

export default SCNPhysicsFieldScope
