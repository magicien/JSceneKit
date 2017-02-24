'use strict'

import SCNNode from './SCNNode'
import SCNRenderer from './SCNRenderer'

/**
 * The signature for a block called for binding or unbinding a GLSL symbol in a custom program.
 * @type {function(programID: number, location: number, renderedNode: ?SCNNode, renderer: SCNRenderer): void}
 * @param {number} programID - The OpenGL program identifier for the current SCNProgram instance, as used by OpenGL functions such as glValidateProgram.
 * @param {number} location - The OpenGL location index for the symbol to be bound or unbound, as used by OpenGL functions such as glUniform.
 * @param {?SCNNode} renderedNode - The SCNNode object being rendered.
 * @param {SCNRenderer} renderer - The SCNRenderer object responsible for rendering.
 * @returns {void}
 * @desc Call handleBinding(ofSymbol:handler:) or handleUnbinding(ofSymbol:handler:) to associate a handler block with a GLSL symbol for a SceneKit geometry or material.
 * @see https://developer.apple.com/reference/scenekit/scnbindingblock
 */
const SCNBindingBlock = (programID, location, renderedNode, renderer) => {}

export default SCNBindingBlock
