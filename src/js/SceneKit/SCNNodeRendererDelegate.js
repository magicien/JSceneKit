'use strict'

import SCNNode from './SCNNode'
import SCNRenderer from './SCNRenderer'


/**
 * Methods you can implement to use your own custom Metal or OpenGL drawing code to render content for a node. 
 * @interface
 * @see https://developer.apple.com/reference/scenekit/scnnoderendererdelegate
 */
export default class SCNNodeRendererDelegate {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Customizing the Rendering of a Node

  /**
   * Tells the delegate to perform rendering for a node.
   * @access public
   * @param {SCNNode} node - The node to render.
   * @param {SCNRenderer} renderer - The SceneKit object (such as an SCNView instance) responsible for rendering the scene. 
   * @param {Map<string, Object>} _arguments - 
   * @returns {void}
   * @desc Implement this method to perform custom rendering for a node. You should only execute Metal or OpenGL drawing commands (and any setup required to perform them) in this method—the results of modifying SceneKit objects in this method are undefined.To render using Metal, use the renderer parameter to retrieve the scene renderer’s currentRenderCommandEncoder object and encode your own drawing commands. If you need to reference other Metal state, see the properties listed in SCNSceneRenderer.To render using OpenGL, simply call the relevant OpenGL drawing commands—SceneKit automatically makes its OpenGL context the current context before calling this method. If you need to reference the OpenGL context being rendered into, examine the context property of the renderer parameter.You must draw using the appropriate graphics technology for the view currently being rendered. Use the renderingAPI property of the renderer object to determine whether Metal or OpenGL is in use. 
   * @see https://developer.apple.com/reference/scenekit/scnnoderendererdelegate/1407993-rendernode
   */
  renderNode(node, renderer, _arguments) {
  }
}
