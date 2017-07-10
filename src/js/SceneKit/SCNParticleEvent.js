'use strict'


/**
 * Significant events in the life spans of simulate particles, used by the handle(_:forProperties:handler:) method.
 * @typedef {Object} SCNParticleEvent
 * @property {number} birth - Occurs when new particles spawn.
 * @property {number} death - Occurs when particles reach the end of their life span.
 * @property {number} collision - Occurs when particles collide with scene geometry.
 * @see https://developer.apple.com/documentation/scenekit/scnparticleevent
 */
const SCNParticleEvent = {
  birth: 0,
  death: 1,
  collision: 2
}

export default SCNParticleEvent
