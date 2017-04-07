'use strict'


/**
 * Constants identifying phases of SceneKit’s scene loading process, used in a SCNSceneSourceStatusHandler block.
 * @typedef {Object} SCNSceneSourceStatus
 * @property {number} error - An error occurred when SceneKit attempted to load the scene.
 * @property {number} parsing - SceneKit has begun deserializing the source file.
 * @property {number} validating - SceneKit has begun validating the scene file’s format.
 * @property {number} processing - SceneKit has begun generating scene graph objects from the scene file’s contents.
 * @property {number} complete - SceneKit has successfully finished loading the scene file’s contents.
 * @see https://developer.apple.com/reference/scenekit/scnscenesourcestatus
 */
const SCNSceneSourceStatus = {
  error: -1,
  parsing: 4,
  validating: 8,
  processing: 12,
  complete: 16
}

export default SCNSceneSourceStatus
