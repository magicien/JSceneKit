'use strict'


/**
 * Options for choosing the graphics technology for an SCNView object (or other SceneKit renderer) to use for drawing its contents. Used by the renderingAPI property and the preferredRenderingAPI option when initializing an SCNView object.
 * @typedef {Object} SCNRenderingAPI
 * @property {number} metal - Use the Metal framework for SceneKit rendering.
 * @property {number} openGLES2 - Use the OpenGL ES 2.0 API for SceneKit rendering in iOS.
 * @property {number} openGLLegacy - Use the Legacy OpenGL API for SceneKit rendering in macOS.
 * @property {number} openGLCore32 - Use the OpenGL 3.2 Core Profile API for SceneKit rendering in macOS.
 * @property {number} openGLCore41 - Use the OpenGL 4.1 Core Profile API for SceneKit rendering in macOS.
 * @property {number} webGL - Use the OpenGL 4.1 Core Profile API for SceneKit rendering in macOS.
 * @see https://developer.apple.com/documentation/scenekit/scnrenderingapi
 */
const SCNRenderingAPI = {
  metal: 0,
  openGLLegacy: 1,
  openGLCore32: 2,
  openGLCore41: 3,
  openGLES2: 999,
  webGL: 998
}

export default SCNRenderingAPI
