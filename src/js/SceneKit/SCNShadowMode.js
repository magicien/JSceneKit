'use strict'


/**
 * Options for SceneKit’s rendering of shadows cast by a light, used by the shadowMode property.
 * @typedef {Object} SCNShadowMode
 * @property {number} forward - SceneKit renders shadows during lighting computations.
 * @property {number} deferred - SceneKit renders shadows in a postprocessing pass.
 * @property {number} modulated - SceneKit renders shadows by projecting the light’s gobo image. The light does not illuminate the scene.
 * @see https://developer.apple.com/reference/scenekit/scnshadowmode
 */
const SCNShadowMode = {
  forward: 0,
  deferred: 1,
  modulated: 2
}

export default SCNShadowMode
