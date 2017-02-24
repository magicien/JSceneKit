'use strict'


/**
 * Options for restricting the orientation of particles, used by the orientationMode property.
 * @typedef {Object} SCNParticleOrientationMode
 * @property {Symbol} billboardScreenAligned - Each particle’s orientation is always fixed with respect to the point of view camera.
 * @property {Symbol} billboardViewAligned - Each particle always faces the point of view camera (but may rotate about an axis parallel to the view direction).
 * @property {Symbol} free - Particle orientations are not restricted; they may rotate freely in all axes.
 * @property {Symbol} billboardYAligned - The y-axis direction of each particle is always fixed with respect to the point of view camera.
 * @see https://developer.apple.com/reference/scenekit/scnparticleorientationmode
 */
const SCNParticleOrientationMode = {
  billboardScreenAligned: Symbol(),
  billboardViewAligned: Symbol(),
  free: Symbol(),
  billboardYAligned: Symbol()
}

export default SCNParticleOrientationMode
