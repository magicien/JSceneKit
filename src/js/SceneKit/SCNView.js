'use strict'

import SCNSceneRenderer from './SCNSceneRenderer'
import SCNTechniqueSupport from './SCNTechniqueSupport'
import CGRect from '../CoreGraphics/CGRect'
import SCNScene from './SCNScene'
import SCNAntialiasingMode from './SCNAntialiasingMode'

const _Option = {
  preferLowPowerDevice: Symbol(),
  preferredDevice: Symbol(),
  preferredRenderingAPI: Symbol()
}


/**
 * A view for displaying 3D SceneKit content.
 * @access public
 * @implements {SCNSceneRenderer}
 * @implements {SCNTechniqueSupport}
 * @see https://developer.apple.com/reference/scenekit/scnview
 */
export default class SCNView {

  // Initializing a SceneKit View

  /**
   * Initializes and returns a newly allocated SceneKit view object with the specified frame rectangle and options.
   * @access public
   * @param {CGRect} frame - The frame rectangle for the view, measured in points and specified in the coordinate system of its superview.
   * @param {?Map<string, Object>} [options = null] - Rendering options for the view. See SCNView.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnview/1524215-init
   */
  init(frame, options = null) {

    // Specifying a Scene

    /**
     * The scene to be displayed in the view.
     * @type {?SCNScene}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523904-scene
     */
    this.scene = null


    // Configuring a View

    /**
     * The background color of the view.
     * @type {CGColor}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523088-backgroundcolor
     */
    this.backgroundColor = null

    /**
     * A Boolean value that determines whether the user can manipulate the current point of view that is used to render the scene. 
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523171-allowscameracontrol
     */
    this.allowsCameraControl = false

    /**
     * The antialiasing mode used for rendering the view’s scene.
     * @type {SCNAntialiasingMode}
     * @see https://developer.apple.com/reference/scenekit/scnview/1524085-antialiasingmode
     */
    this.antialiasingMode = null

    /**
     * The animation frame rate that the view uses to render its scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnview/1621205-preferredframespersecond
     */
    this.preferredFramesPerSecond = 0


    // Working with a View’s OpenGL ES Context

    /**
     * The OpenGL ES context that the view uses to render its contents.
     * @type {?EAGLContext}
     * @see https://developer.apple.com/reference/scenekit/scnview/1621072-eaglcontext
     */
    this.eaglContext = null


    // Working with a View’s OpenGL Context

    /**
     * The OpenGL context that the view uses to render its contents.
     * @type {?NSOpenGLContext}
     * @see https://developer.apple.com/reference/scenekit/scnview/1522850-openglcontext
     */
    this.openGLContext = null

    /**
     * The view’s OpenGL pixel format.
     * @type {?NSOpenGLPixelFormat}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523612-pixelformat
     */
    this.pixelFormat = null

  }

  // Playing Action and Animation in a View’s Scene

  /**
   * Pauses playback of the view’s scene.
   * @access public
   * @param {?Object} sender - The object requesting the action (used when connecting a control in Interface Builder). SceneKit ignores this parameter.
   * @returns {void}
   * @desc This method has no effect if the scene is already paused.
   * @see https://developer.apple.com/reference/scenekit/scnview/1522825-pause
   */
  pause(sender) {
  }

  /**
   * Resumes playback of the view’s scene.
   * @access public
   * @param {?Object} sender - The object requesting the action (used when connecting a control in Interface Builder). SceneKit ignores this parameter.
   * @returns {void}
   * @desc This method has no effect if the scene is not paused.
   * @see https://developer.apple.com/reference/scenekit/scnview/1523699-play
   */
  play(sender) {
  }

  /**
   * Stops playback of the view’s scene and resets the scene time to its start time.
   * @access public
   * @param {?Object} sender - The object requesting the action (used when connecting a control in Interface Builder). SceneKit ignores this parameter.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnview/1524132-stop
   */
  stop(sender) {
  }

  // Capturing a View Snapshot

  /**
   * Renders the view’s scene into a new image object.
   * @access public
   * @returns {Image} - 
   * @desc This method is thread-safe and may be called at any time.
   * @see https://developer.apple.com/reference/scenekit/scnview/1524031-snapshot
   */
  snapshot() {
    return null
  }

  // Structures
  /**
   * @type {Object} Option
   * @property {Symbol} preferLowPowerDevice An option for whether to select low-power-usage devices for Metal rendering.
   * @property {Symbol} preferredDevice The device to use for Metal rendering.
   * @property {Symbol} preferredRenderingAPI The rendering API to use for rendering the view (for example, Metal or OpenGL).
   * @see https://developer.apple.com/reference/scenekit/scnview.option
   */
  static get Option() {
    return _Option
  }
}
