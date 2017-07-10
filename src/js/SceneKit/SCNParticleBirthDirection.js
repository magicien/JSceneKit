'use strict'


/**
 * Options for the initial direction of each emitted particle, used by the birthDirection property.
 * @typedef {Object} SCNParticleBirthDirection
 * @property {number} constant - The emitting direction is the same for all particles.
 * @property {number} surfaceNormal - The emitting direction for each particle is along the surface normal vector at the point where the particle is emitted.
 * @property {number} random - SceneKit randomizes the emitting direction for each particle.
 * @see https://developer.apple.com/documentation/scenekit/scnparticlebirthdirection
 */
const SCNParticleBirthDirection = {
  constant: 0,
  surfaceNormal: 1,
  random: 2
}

export default SCNParticleBirthDirection
