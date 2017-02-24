'use strict'


/**
 * Options for the input value of the property controller’s animation, used by the inputMode property.
 * @typedef {Object} SCNParticleInputMode
 * @property {Symbol} overLife - The controller’s effect on a particle property is a function of the time since the particle’s birth.
 * @property {Symbol} overDistance - The controller’s effect on a particle property is a function of the particle’s distance from the position of a specified node.
 * @property {Symbol} overOtherProperty - The controller’s effect on a particle property is a function of another of the particle’s properties.
 * @see https://developer.apple.com/reference/scenekit/scnparticleinputmode
 */
const SCNParticleInputMode = {
  overLife: Symbol(),
  overDistance: Symbol(),
  overOtherProperty: Symbol()
}

export default SCNParticleInputMode
