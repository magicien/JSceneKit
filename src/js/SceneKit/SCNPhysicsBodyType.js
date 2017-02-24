'use strict'


/**
 * Constants that determine how a physics body interacts with forces and other bodies, used by the type property and when creating a physics body.
 * @typedef {Object} SCNPhysicsBodyType
 * @property {Symbol} static - A physics body that is unaffected by forces or collisions and cannot move.
 * @property {Symbol} dynamic - A physics body that can be affected by forces and collisions.
 * @property {Symbol} kinematic - A physics body that is unaffected by forces or collisions but that can cause collisions affecting other bodies when moved.
 * @see https://developer.apple.com/reference/scenekit/scnphysicsbodytype
 */
const SCNPhysicsBodyType = {
  static: Symbol(),
  dynamic: Symbol(),
  kinematic: Symbol()
}

export default SCNPhysicsBodyType
