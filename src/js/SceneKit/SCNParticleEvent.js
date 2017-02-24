'use strict'


/**
 * Significant events in the life spans of simulate particles, used by the handle(_:forProperties:handler:) method.
 * @typedef {Object} SCNParticleEvent
 * @property {Symbol} birth - Occurs when new particles spawn.
 * @property {Symbol} death - Occurs when particles reach the end of their life span.
 * @property {Symbol} collision - Occurs when particles collide with scene geometry.
 * @see https://developer.apple.com/reference/scenekit/scnparticleevent
 */
const SCNParticleEvent = {
  birth: Symbol(),
  death: Symbol(),
  collision: Symbol()
}

export default SCNParticleEvent
