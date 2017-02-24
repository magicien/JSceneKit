'use strict'


/**
 * Options for choosing the graphics technology for an SCNView object (or other SceneKit renderer) to use for drawing its contents. Used by the renderingAPI property and the preferredRenderingAPI option when initializing an SCNView object.
 * @typedef {Object} SCNRenderingAPI
 * @property {Symbol} metal - Use the Metal framework for SceneKit rendering.
 * @property {Symbol} openGLES2 - Use the OpenGL ES 2.0 API for SceneKit rendering in iOS.
 * @property {Symbol} openGLLegacy - Use the Legacy OpenGL API for SceneKit rendering in macOS.
 * @property {Symbol} openGLCore32 - Use the OpenGL 3.2 Core Profile API for SceneKit rendering in macOS.
 * @property {Symbol} openGLCore41 - Use the OpenGL 4.1 Core Profile API for SceneKit rendering in macOS.
 * @see https://developer.apple.com/reference/scenekit/scnrenderingapi
 */
const SCNRenderingAPI = {
  metal: Symbol(),
  openGLES2: Symbol(),
  openGLLegacy: Symbol(),
  openGLCore32: Symbol(),
  openGLCore41: Symbol(),
  webGL: Symbol()
}

export default SCNRenderingAPI
