'use strict'


/**
 * Options for the initial location of each emitted particle, used by the birthLocation property.
 * @typedef {Object} SCNParticleBirthLocation
 * @property {number} surface - New particles can be created at any location on the surface of the emitter shape.
 * @property {number} volume - New particles can be created at any location within the volume of the emitter shape.
 * @property {number} vertex - New particles can be created at only at the locations of the vertices in the emitter shape.
 * @see https://developer.apple.com/documentation/scenekit/scnparticlebirthlocation
 */
const SCNParticleBirthLocation = {
  surface: 0,
  volume: 1,
  vertex: 2
}

export default SCNParticleBirthLocation
