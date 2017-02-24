'use strict'


/**
 * Options for SceneKit’s rendering of shadows cast by a light, used by the shadowMode property.
 * @typedef {Object} SCNShadowMode
 * @property {Symbol} forward - SceneKit renders shadows during lighting computations.
 * @property {Symbol} deferred - SceneKit renders shadows in a postprocessing pass.
 * @property {Symbol} modulated - SceneKit renders shadows by projecting the light’s gobo image. The light does not illuminate the scene.
 * @see https://developer.apple.com/reference/scenekit/scnshadowmode
 */
const SCNShadowMode = {
  forward: Symbol(),
  deferred: Symbol(),
  modulated: Symbol()
}

export default SCNShadowMode
