'use strict'


/**
 * Stages of SceneKit’s particle simulation process into which you can insert modifier blocks, used by the addModifier(forProperties:at:modifier:) method.
 * @typedef {Object} SCNParticleModifierStage
 * @property {number} preDynamics - The stage before SceneKit simulates the motion of particles.
 * @property {number} postDynamics - The stage after SceneKit simulates the motion of particles.
 * @property {number} preCollision - The stage before SceneKit simulates the results of collisions between particles and scene geometry.
 * @property {number} postCollision - The stage after SceneKit simulates the results of collisions between particles and scene geometry.
 * @see https://developer.apple.com/reference/scenekit/scnparticlemodifierstage
 */
const SCNParticleModifierStage = {
  preDynamics: 0,
  postDynamics: 1,
  preCollision: 2,
  postCollision: 3
}

export default SCNParticleModifierStage
