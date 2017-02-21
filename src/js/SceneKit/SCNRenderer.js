'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNSceneRenderer from './SCNSceneRenderer'
import SCNTechniqueSupport from './SCNTechniqueSupport'
import SCNScene from './SCNScene'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
import SCNAntialiasingMode from './SCNAntialiasingMode'
import SCNNode from './SCNNode'


/**
 * A renderer for displaying SceneKit scene in an an existing Metal workflow or OpenGL context. 
 * @access public
 * @extends {NSObject}
 * @implements {SCNSceneRenderer}
 * @implements {SCNTechniqueSupport}
 * @see https://developer.apple.com/reference/scenekit/scnrenderer
 */
export default class SCNRenderer extends NSObject {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Specifying a Scene

    /**
     * The scene to be rendered.
     * @type {?SCNScene}
     * @see https://developer.apple.com/reference/scenekit/scnrenderer/1518400-scene
     */
    this.scene = null


    // Managing Animation Timing

    this._nextFrameTime = 0
  }

  // Creating a Renderer

  /**
   * Creates a renderer with the specified Metal device.
   * @access public
   * @param {?MTLDevice} device - A Metal device.
   * @param {?Map<AnyHashable, Object>} [options = null] - An optional dictionary for future extensions.
   * @returns {void}
   * @desc Use this initializer to create a SceneKit renderer that draws into the rendering targets your app already uses to draw other content. For the device parameter, pass the MTLDevice object your app uses for drawing. Then, to tell SceneKit to render your content, call the SCNRenderer method, providing a command buffer and render pass descriptor for SceneKit to use in its rendering.
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/1518404-init
   */
  init(device, options = null) {
  }

  // Managing Animation Timing
  /**
   * The timestamp for the next frame to be rendered.
   * @type {number}
   * @desc If the renderer’s scene has any attached actions or animations, use this property to determine how long your app should wait before telling the renderer to draw another frame. If this property’s value matches that of the renderer’s currentTime property, the scene contains a continuous animation—schedule your next render at whatever time best maintains your app’s performance. If the value is infinite, the scene has no running actions or animations.
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/1518410-nextframetime
   */
  get nextFrameTime() {
    return this._nextFrameTime
  }

  // Rendering a Scene Using Metal

  /**
   * Renders the scene’s contents at the specified system time in the specified Metal command buffer.
   * @access public
   * @param {number} time - The timestamp, in seconds, at which to render the scene.
   * @param {CGRect} viewport - The pixel dimensions in which to render.
   * @param {MTLCommandBuffer} commandBuffer - The Metal command buffer in which SceneKit should schedule rendering commands.
   * @param {MTLRenderPassDescriptor} renderPassDescriptor - The Metal render pass descriptor describing the rendering target.
   * @returns {void}
   * @desc This method can be used only with an SCNRenderer object created with the SCNRenderer initializer. Call this method to tell SceneKit to draw the renderer’s scene into the render target described by the renderPassDescriptor parameter, by encoding render commands into the commandBuffer parameter.When you call this method, SceneKit updates its hierarchy of presentation nodes based on the specified timestamp, and then draws the scene using the specified Metal objects. NoteBy default, the playback timing of actions and animations in a scene is based on the system time, not the scene time. Before using this method to control the playback of animations, set the usesSceneTimeBase property of each animation to true, or specify the playUsingSceneTimeBase option when loading a scene file that contains animations.
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/1518401-render
   */
  renderAtTimePassDescriptor(time, viewport, commandBuffer, renderPassDescriptor) {
  }

  // Rendering a Scene Using OpenGL

  /**
   * Renders the scene’s contents in the renderer’s OpenGL context.
   * @deprecated
   * @access public
   * @returns {void}
   * @desc This method can be used only with an SCNRenderer object created with the SCNRenderer initializer. Call this method to tell SceneKit to draw the renderer’s scene into the OpenGL context you created the renderer with.When you call this method, SceneKit updates its hierarchy of presentation nodes based on the current system time, and then draws the scene.
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/1518403-render
   */
  render() {
  }

  /**
   * Renders the scene’s contents at the specified system time in the renderer’s OpenGL context.
   * @access public
   * @param {number} time - The timestamp, in seconds, at which to render the scene.
   * @returns {void}
   * @desc This method can be used only with an SCNRenderer object created with the SCNRenderer initializer. Call this method to tell SceneKit to draw the renderer’s scene into the OpenGL context you created the renderer with.When you call this method, SceneKit updates its hierarchy of presentation nodes based on the specified timestamp, and then draws the scene.NoteBy default, the playback timing of actions and animations in a scene is based on the system time, not the scene time. Before using this method to control the playback of animations, set the usesSceneTimeBase property of each animation to true, or specify the playUsingSceneTimeBase option when loading a scene file that contains animations.
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/1518402-render
   */
  renderAtTime(time) {
  }

  // Capturing a Snapshot

  /**
   * Creates an image by drawing the renderer’s content at the specified system time.
   * @access public
   * @param {number} time - The timestamp, in seconds, at which to render the scene.
   * @param {CGSize} size - The size, in pixels, of the image to create.
   * @param {SCNAntialiasingMode} antialiasingMode - The antialiasing mode to use for the image output.
   * @returns {Image} - 
   * @desc When you call this method, SceneKit updates its hierarchy of presentation nodes based on the specified timestamp, and then draws the scene into a new image object of the specified size.
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/1641767-snapshot
   */
  snapshotAtTimeWith(time, size, antialiasingMode) {
    return null
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @param {SCNNode[]} lightProbes - 
   * @param {number} time - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnrenderer/2097153-updateprobes
   */
  updateProbesAtTime(lightProbes, time) {
  }
}
