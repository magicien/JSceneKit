'use strict'


/**
 * Constants identifying phases of SceneKit’s scene loading process, used in a SCNSceneSourceStatusHandler block.
 * @typedef {Object} SCNSceneSourceStatus
 * @property {Symbol} error - An error occurred when SceneKit attempted to load the scene.
 * @property {Symbol} parsing - SceneKit has begun deserializing the source file.
 * @property {Symbol} validating - SceneKit has begun validating the scene file’s format.
 * @property {Symbol} processing - SceneKit has begun generating scene graph objects from the scene file’s contents.
 * @property {Symbol} complete - SceneKit has successfully finished loading the scene file’s contents.
 * @see https://developer.apple.com/reference/scenekit/scnscenesourcestatus
 */
const SCNSceneSourceStatus = {
  error: Symbol(),
  parsing: Symbol(),
  validating: Symbol(),
  processing: Symbol(),
  complete: Symbol()
}

export default SCNSceneSourceStatus
