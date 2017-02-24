'use strict'


/**
 * Options for the initial direction of each emitted particle, used by the birthDirection property.
 * @typedef {Object} SCNParticleBirthDirection
 * @property {Symbol} constant - The emitting direction is the same for all particles.
 * @property {Symbol} surfaceNormal - The emitting direction for each particle is along the surface normal vector at the point where the particle is emitted.
 * @property {Symbol} random - SceneKit randomizes the emitting direction for each particle.
 * @see https://developer.apple.com/reference/scenekit/scnparticlebirthdirection
 */
const SCNParticleBirthDirection = {
  constant: Symbol(),
  surfaceNormal: Symbol(),
  random: Symbol()
}

export default SCNParticleBirthDirection
