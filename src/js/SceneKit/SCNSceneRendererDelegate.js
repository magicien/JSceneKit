'use strict'

import SCNSceneRenderer from './SCNSceneRenderer'
import SCNScene from './SCNScene'


/**
 * Methods your app can implement to participate in SceneKit’s animation loop or perform additional rendering. 
 * @interface
 * @see https://developer.apple.com/reference/scenekit/scnscenerendererdelegate
 */
export default class SCNSceneRendererDelegate {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Adding Custom Logic to the Rendering Loop

  /**
   * Tells the delegate to perform any updates that need to occur before actions, animations, and physics are evaluated.
   * @access public
   * @param {SCNSceneRenderer} renderer - 
   * @param {number} time - The current system time, in seconds. Use this parameter for any time-based elements of your game logic.
   * @returns {void}
   * @desc SceneKit calls this method exactly once per frame, so long as the SCNView object (or other SCNSceneRenderer object) displaying the scene is not paused. Implement this method to add game logic to the rendering loop. Any changes you make to the scene graph during this method are immediately reflected in the displayed scene. That is, SceneKit immediately updates the hierarchy of presentation nodes it uses to render the scene (instead of using the SCNTransaction class to “batch” your changes).

   * @see https://developer.apple.com/reference/scenekit/scnscenerendererdelegate/1522937-renderer
   */
  rendererUpdateAtTime(renderer, time) {
  }

  /**
   * Tells the delegate to perform any updates that need to occur after actions and animations are evaluated.
   * @access public
   * @param {SCNSceneRenderer} renderer - 
   * @param {number} time - The current system time, in seconds. Use this parameter for any time-based elements of your game logic.
   * @returns {void}
   * @desc SceneKit calls this method exactly once per frame, so long as the SCNView object (or other SCNSceneRenderer object) displaying the scene is not paused. Implement this method to add game logic to the rendering loop. Any changes you make to the scene graph during this method are immediately reflected in the displayed scene. That is, SceneKit immediately updates the hierarchy of presentation nodes it uses to render the scene (instead of using the SCNTransaction class to “batch” your changes).

   * @see https://developer.apple.com/reference/scenekit/scnscenerendererdelegate/1523038-renderer
   */
  rendererDidApplyAnimationsAtTime(renderer, time) {
  }

  /**
   * Tells the delegate to perform any updates that need to occur after physics simulations are performed.
   * @access public
   * @param {SCNSceneRenderer} renderer - 
   * @param {number} time - The current system time, in seconds. Use this parameter for any time-based elements of your game logic.
   * @returns {void}
   * @desc SceneKit calls this method exactly once per frame, so long as the SCNView object (or other SCNSceneRenderer object) displaying the scene is not paused. Implement this method to add game logic to the rendering loop. Any changes you make to the scene graph during this method are immediately reflected in the displayed scene. That is, SceneKit immediately updates the hierarchy of presentation nodes it uses to render the scene (instead of using the SCNTransaction class to “batch” your changes).
This method is the last opportunity SceneKit provides for you to change the scene graph before rendering.
   * @see https://developer.apple.com/reference/scenekit/scnscenerendererdelegate/1522738-renderer
   */
  rendererDidSimulatePhysicsAtTime(renderer, time) {
  }

  // Rendering Custom Scene Content

  /**
   * Tells the delegate that the renderer has cleared the viewport and is about to render the scene.
   * @access public
   * @param {SCNSceneRenderer} renderer - 
   * @param {SCNScene} scene - The SCNScene object to be rendered.
   * @param {number} time - The current system time, in seconds. If your custom rendering involves animation, use this parameter to compute your own animation state.
   * @returns {void}
   * @desc Implement this method to perform custom drawing before SceneKit renders a scene—for example, to draw backdrop content underneath SceneKit content. You should only execute Metal or OpenGL drawing commands (and any setup required to perform them) in this method—the results of modifying SceneKit objects during this method are undefined.To render using Metal, use the renderer parameter to retrieve the scene renderer’s currentRenderCommandEncoder object and encode your own drawing commands. If you need to reference other Metal state, see the properties listed in SCNSceneRenderer.To render using OpenGL, simply call the relevant OpenGL drawing commands—SceneKit automatically makes its OpenGL context the current context before calling this method. If you need to reference the OpenGL context being rendered into, examine the context property of the renderer parameter.You must draw using the appropriate graphics technology for the view currently being rendered. Use the renderingAPI property of the renderer object to determine whether Metal or OpenGL is in use. 
   * @see https://developer.apple.com/reference/scenekit/scnscenerendererdelegate/1523483-renderer
   */
  rendererWillRenderSceneAtTime(renderer, scene, time) {
  }

  /**
   * Tells the delegate that the renderer has rendered the scene.
   * @access public
   * @param {SCNSceneRenderer} renderer - 
   * @param {SCNScene} scene - The scene object that was rendered.
   * @param {number} time - The current system time, in seconds. If your custom rendering involves animation, use this parameter to compute your own animation state.
   * @returns {void}
   * @desc Implement this method to perform custom drawing after SceneKit has rendered a scene—for example, to draw overlay content on top of SceneKit content. You should only execute Metal or OpenGL drawing commands (and any setup required to perform them) in this method—the results of modifying SceneKit objects in this method are undefined.To render using Metal, use the renderer parameter to retrieve the scene renderer’s currentRenderCommandEncoder object and encode your own drawing commands. If you need to reference other Metal state, see the properties listed in SCNSceneRenderer.To render using OpenGL, simply call the relevant OpenGL drawing commands—SceneKit automatically makes its OpenGL context the current context before calling this method. If you need to reference the OpenGL context being rendered into, examine the context property of the renderer parameter.You must draw using the appropriate graphics technology for the view currently being rendered. Use the renderingAPI property of the renderer object to determine whether Metal or OpenGL is in use. 
   * @see https://developer.apple.com/reference/scenekit/scnscenerendererdelegate/1524233-renderer
   */
  rendererDidRenderSceneAtTime(renderer, scene, time) {
  }
}
