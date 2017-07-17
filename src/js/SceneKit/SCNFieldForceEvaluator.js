'use strict'

//import SCNVector3 from './SCNVector3'

/**
 * The signature for a block that SceneKit calls to determine the effect of a custom field on an object.
 * @type {function(position: SCNVector3, velocity: SCNVector3, mass: number, charge: number, time: number): SCNVector3}
 * @param {SCNVector3} position - The position of the object affected by the field, in the local coordinate space of the node containing the field.
 * @param {SCNVector3} velocity - The velocity of the object affected by the field, relative to the local coordinate space of the node containing the field.
 * @param {number} mass - The mass of the object affected by the field. (See the mass property for physics bodies and the particleMass property for particle systems.) 
 * @param {number} charge - The electrical charge of the object affected by the field. (See the charge property for physics bodies and the particleCharge property for particle systems.)
 * @param {number} time - The elapsed time, in seconds, since the last simulation step.
 * @returns {SCNVector3} -
 * @desc Your block uses these parameters to compute and return an SCNVector3 force vector, which SceneKit then applies to the object affected by the field.
 * @see https://developer.apple.com/documentation/scenekit/scnfieldforceevaluator
 */
const SCNFieldForceEvaluator = (position, velocity, mass, charge, time) => {}

export default SCNFieldForceEvaluator
