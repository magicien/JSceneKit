'use strict'


/**
 * Options for how often SceneKit should execute the binding handler you provide with the handleBinding(ofBufferNamed:frequency:handler:) method.
 * @typedef {Object} SCNBufferFrequency
 * @property {Symbol} perFrame - Execute the binding handler once for each frame to be rendered using the shader.
 * @property {Symbol} perNode - Execute the binding handler once for each frame, for each node to be rendered using the shader.
 * @property {Symbol} perShadable - Execute the binding handler once for each frame, for each node, for each material or geometry to be rendered using the shader.
 * @see https://developer.apple.com/reference/scenekit/scnbufferfrequency
 */
const SCNBufferFrequency = {
  perFrame: Symbol(),
  perNode: Symbol(),
  perShadable: Symbol()
}

export default SCNBufferFrequency
