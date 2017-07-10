'use strict'


/**
 * Options for how often SceneKit should execute the binding handler you provide with the handleBinding(ofBufferNamed:frequency:handler:) method.
 * @typedef {Object} SCNBufferFrequency
 * @property {number} perFrame - Execute the binding handler once for each frame to be rendered using the shader.
 * @property {number} perNode - Execute the binding handler once for each frame, for each node to be rendered using the shader.
 * @property {number} perShadable - Execute the binding handler once for each frame, for each node, for each material or geometry to be rendered using the shader.
 * @see https://developer.apple.com/documentation/scenekit/scnbufferfrequency
 */
const SCNBufferFrequency = {
  perFrame: 0,
  perNode: 1,
  perShadable: 2
}

export default SCNBufferFrequency
