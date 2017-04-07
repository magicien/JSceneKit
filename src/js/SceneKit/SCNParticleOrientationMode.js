'use strict'


/**
 * Options for restricting the orientation of particles, used by the orientationMode property.
 * @typedef {Object} SCNParticleOrientationMode
 * @property {number} billboardScreenAligned - Each particle’s orientation is always fixed with respect to the point of view camera.
 * @property {number} billboardViewAligned - Each particle always faces the point of view camera (but may rotate about an axis parallel to the view direction).
 * @property {number} free - Particle orientations are not restricted; they may rotate freely in all axes.
 * @property {number} billboardYAligned - The y-axis direction of each particle is always fixed with respect to the point of view camera.
 * @see https://developer.apple.com/reference/scenekit/scnparticleorientationmode
 */
const SCNParticleOrientationMode = {
  billboardScreenAligned: 0,
  billboardViewAligned: 1,
  free: 2,
  billboardYAligned: 3
}

export default SCNParticleOrientationMode
