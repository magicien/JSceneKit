'use strict'

//import SCNBufferStream from './SCNBufferStream'
//import SCNNode from './SCNNode'
//import SCNShadable from './SCNShadable'
//import SCNRenderer from './SCNRenderer'

/**
 * A block SceneKit calls at render time for working with buffers in a Metal shader, used by the handleBinding(ofBufferNamed:frequency:handler:) method.
 * @type {function(buffer: SCNBufferStream, node: SCNNode, shadable: SCNShadable, renderer: SCNRenderer): void}
 * @param {SCNBufferStream} buffer - An object that provides write access to the buffer. Use the writeBytes(_:count:) method on this object to write data for use by the shader.
 * @param {SCNNode} node - The node to be rendered using the shader program.
 * @param {SCNShadable} shadable - The material or geometry to be rendered using the shader program.
 * @param {SCNRenderer} renderer - The view (or other SceneKit renderer) responsible for rendering.
 * @returns {void}
 * @see https://developer.apple.com/documentation/scenekit/scnbufferbindingblock
 */
const SCNBufferBindingBlock = (buffer, node, shadable, renderer) => {}

export default SCNBufferBindingBlock
