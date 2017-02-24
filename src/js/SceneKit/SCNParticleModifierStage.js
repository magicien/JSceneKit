'use strict'


/**
 * Stages of SceneKit’s particle simulation process into which you can insert modifier blocks, used by the addModifier(forProperties:at:modifier:) method.
 * @typedef {Object} SCNParticleModifierStage
 * @property {Symbol} preDynamics - The stage before SceneKit simulates the motion of particles.
 * @property {Symbol} postDynamics - The stage after SceneKit simulates the motion of particles.
 * @property {Symbol} preCollision - The stage before SceneKit simulates the results of collisions between particles and scene geometry.
 * @property {Symbol} postCollision - The stage after SceneKit simulates the results of collisions between particles and scene geometry.
 * @see https://developer.apple.com/reference/scenekit/scnparticlemodifierstage
 */
const SCNParticleModifierStage = {
  preDynamics: Symbol(),
  postDynamics: Symbol(),
  preCollision: Symbol(),
  postCollision: Symbol()
}

export default SCNParticleModifierStage
