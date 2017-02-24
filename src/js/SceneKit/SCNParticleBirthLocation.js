'use strict'


/**
 * Options for the initial location of each emitted particle, used by the birthLocation property.
 * @typedef {Object} SCNParticleBirthLocation
 * @property {Symbol} surface - New particles can be created at any location on the surface of the emitter shape.
 * @property {Symbol} volume - New particles can be created at any location within the volume of the emitter shape.
 * @property {Symbol} vertex - New particles can be created at only at the locations of the vertices in the emitter shape.
 * @see https://developer.apple.com/reference/scenekit/scnparticlebirthlocation
 */
const SCNParticleBirthLocation = {
  surface: Symbol(),
  volume: Symbol(),
  vertex: Symbol()
}

export default SCNParticleBirthLocation
