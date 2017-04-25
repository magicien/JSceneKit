'use strict'

//import _HTMLCanvasElement from '../util/HTMLCanvasElement'
import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
import SCNRenderer from './SCNRenderer'
import SCNTechniqueSupport from './SCNTechniqueSupport'
import SCNScene from './SCNScene'
import SCNRenderingAPI from './SCNRenderingAPI'
import SCNAntialiasingMode from './SCNAntialiasingMode'
import SCNNode from './SCNNode'
import SCNCamera from './SCNCamera'
import SCNMatrix4 from './SCNMatrix4'
import SCNMatrix4MakeTranslation from './SCNMatrix4MakeTranslation'
import SCNVector4 from './SCNVector4'
import SKColor from '../SpriteKit/SKColor'
/*global window*/

const _Option = {
  preferLowPowerDevice: 'SCNPreferLowPowerDeviceKey',
  preferredDevice: 'SCNPreferredDeviceKey',
  preferredRenderingAPI: 'SCNPreferredRenderingAPIKey'
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
   * @constructor
   * @param {CGRect} frame - The frame rectangle for the view, measured in points and specified in the coordinate system of its superview.
   * @param {?Map<string, Object>} [options = null] - Rendering options for the view. See SCNView.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnview/1524215-init
   */
  constructor(frame, options = null) {
    //super()

    // Specifying a Scene

    /**
     * The scene to be displayed in the view.
     * @access private
     * @type {?SCNScene}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523904-scene
     */
    this._scene = null


    // Configuring a View

    /**
     * The background color of the view.
     * @type {SKColor}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523088-backgroundcolor
     */
    this._backgroundColor = SKColor.white

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
    this.antialiasingMode = SCNAntialiasingMode.multisampling4X

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
    //this.eaglContext = null


    // Working with a View’s OpenGL Context

    /**
     * The OpenGL context that the view uses to render its contents.
     * @type {?NSOpenGLContext}
     * @see https://developer.apple.com/reference/scenekit/scnview/1522850-openglcontext
     */
    //this.openGLContext = null

    /**
     * @access private
     * @type {WebGL2RenderingContext}
     */
    this._context = null

    /**
     * The view’s OpenGL pixel format.
     * @type {?NSOpenGLPixelFormat}
     * @see https://developer.apple.com/reference/scenekit/scnview/1523612-pixelformat
     */
    this.pixelFormat = null

    ////////////////////////////////////////////////
    // SCNSceneRenderer
    ////////////////////////////////////////////////

    /**
     * Required. The graphics technology SceneKit uses to render the scene.
     * @access private
     * @type {SCNRenderingAPI}
     */
    this._renderingAPI = SCNRenderingAPI.webGL

    // Participating in the Scene Rendering Process

    /**
     * Required. A delegate object that receives messages about SceneKit’s rendering process.
     * @access private
     * @type {?SCNSceneRendererDelegate}
     */
    this._delegate = null

    // Customizing Scene Rendering with Metal

    //this._currentRenderCommandEncoder = null
    this._device = null // MTLIGAccelDevice
    //this._commandQueue = null // MTLIGAccessCommandQueue
    //this._colorPixelFormat = null // MTLPixelFormat
    //this._depthPixelFormat = null // MTLPixelFormat
    //this._stencilPixelFormat = null // MTLPixelFormat

    // Rendering Sprite Kit Content over a Scene

    /**
     * Required. A Sprite Kit scene to be rendered on top of the SceneKit content.
     * @type {?SKScene}
     * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1524051-overlayskscene
     */
    //this.overlaySKScene = null

    // Working With Positional Audio

    /**
     * Required. The node representing the listener’s position in the scene for use with positional audio effects.
     * @type {?SCNNode}
     * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523747-audiolistener
     */
    //this.audioListener = null

    //this._audioEnvironmentNode = null
    //this._audioEngine = null

    // Instance Properties

    /**
     * Required. 
     * @type {number}
     * @deprecated
     * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522854-currenttime
     */
    //this.currentTime = 0


    ////////////////////////////////////////////////
    // SCNTechniqueSupport
    ////////////////////////////////////////////////

    // Specifying a Technique

    /**
     * Required. The technique SceneKit uses when rendering the object.
     * @type {?SCNTechnique}
     * @see https://developer.apple.com/reference/scenekit/scntechniquesupport/1520496-technique
     */
    this.technique = null

    // for JavaScript

    /**
     * @access private
     * @type {CGRect}
     */
    this._frame = frame

    /**
     * @access private
     * @type {HTMLCanvasElement}
     */
    this._canvas = document.createElement('canvas')
    if(typeof frame === 'undefined'){
      frame = CGRect.rectWithXYWidthHeight(0, 0, 300, 300)
    }
    this._canvas.style.width = frame.width
    this._canvas.style.height = frame.height

    /**
     * @access private
     * @type {number}
     */
    this._canvasWidth = 0

    /**
     * @access private
     * @type {number}
     */
    this._canvasHeight = 0

    /**
     * @access private
     * @type {number}
     */
    this._currentSystemTime = 0

    /**
     * @access private
     * @type {number}
     */
    this._lastUpdate = 0

    /**
     * @access private
     * @type {SCNSceneRenderer}
     */
    this._renderer = new SCNRenderer()
    this._renderer.scene = this._scene

    /**
     * @access private
     * @type {function(function(timestamp: number))}
     */
    this._requestAnimationFrame = window.requestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.oRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  ((callback) => { window.setTimeout(callback, 1000 / 60) })

    const preferLowPowerDevice = options ? options[SCNView.Option.preferLowPowerDevice] : null
    const preferredDevice = options ? options[SCNView.Option.preferredDevice] : null
    const preferredRenderingAPI = options ? options[SCNView.Option.preferredRenderingAPI] : null
    const opt = {
      alpha: true,
      depth: true,
      stencil: true,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      preferLowPowerToHighPerformance: Boolean(preferLowPowerDevice),
      failIfMajorPerformanceCaveat: false
    }

    //const contextNames = ['webgl2', 'webgl', 'webkit-3d', 'moz-webgl', 'experimental-webgl']
    const contextNames = ['webgl2']
    for(const name of contextNames){
      try{
        this._context = this._canvas.getContext(name, opt)
      }catch(e){ /* just ignore and try the next name */ }
      if(this._context){
        break
      }
    }
    if(!this._context){
      throw new Error('can\'t create WebGL context')
    }
    this._context.viewport(frame.minX, frame.minY, frame.width, frame.height)

    this._context.clearColor(
      this.backgroundColor.r,
      this.backgroundColor.g,
      this.backgroundColor.b,
      this.backgroundColor.a
    )

    this._renderer._setContext(this._context)
    this._renderer._viewRect = frame

    this._mouseIsDown = false
    this._mouseDownX = 0
    this._mouseDownY = 0

    // add event listeners
    this._canvas.addEventListener('mousedown', (e) => {
      const ev = this._createEvent(e)
      this._mouseIsDown = true
      this._mouseDownX = e.clientX
      this._mouseDownY = e.clientY
      if(this.allowsCameraControl){
        this._baseCameraPosition = this._renderer._getCameraPosition()
        this._baseCameraOrientation = this._renderer._getCameraOrientation()
        this._baseCameraDistance = this._renderer._getCameraDistance()
      }
      this.mouseDownWith(ev)
    })
    this._canvas.addEventListener('mousemove', (e) => {
      const ev = this._createEvent(e)
      this.mouseMovedWith(ev)
      if(this._mouseIsDown){
        if(this.allowsCameraControl){
          const mx = e.clientX
          const my = e.clientY
          const dx = mx - this._mouseDownX
          const dy = my - this._mouseDownY
          const d = Math.sqrt(dx * dx + dy * dy)
          const rotScale = 0.01
          if(d > 0){
            const r = -d * 0.5 * rotScale
            const sinr = Math.sin(r) / d
            const q = new SCNVector4(dy * sinr, dx * sinr, 0, Math.cos(r))
            const orientation = this._baseCameraOrientation.cross(q)
            this._renderer._setDefaultCameraOrientation(orientation)
          }
          this._renderer._switchToDefaultCamera()
        }
        this.mouseDraggedWith(ev)
      }
    })
    document.addEventListener('mouseup', (e) => {
      if(this._mouseIsDown){
        this._mouseIsDown = false
        const ev = this._createEvent(e)
        this.mouseUpWith(ev)
      }
    })
    this._canvas.addEventListener('mouseover', (e) => {
      const ev = this._createEvent(e)
      this.mouseEnteredWith(ev)
    })
    this._canvas.addEventListener('mouseout', (e) => {
      const ev = this._createEvent(e)
      this.mouseExitedWith(ev)
    })
    this._canvas.addEventListener('mousewheel', (e) => {
      const ev = this._createEvent(e)
      this.scrollWheelWith(ev)
    })
    this._canvas.addEventListener('keydown', (e) => {
      const ev = this._createEvent(e)
      this.keyDownWith(ev)
    })
    this._canvas.addEventListener('keyup', (e) => {
      const ev = this._createEvent(e)
      this.keyUpWith(ev)
    })

  }

  connectedCallback() {
  }

  disconnectedCallback() {
  }

  attributeChangedCallback() {
  }

  /**
   * @access private
   * @returns {void}
   */
  _resizeCanvas() {
    const w = this._canvas.clientWidth
    const h = this._canvas.clientHeight
    if(this._frame && this._frame.width === w && this._frame.height === h){
      return
    }
      
    this._frame = CGRect.rectWithXYWidthHeight(0, 0, w, h)
    this._canvas.width = w
    this._canvas.height = h
    this._context.viewport(0, 0, w, h)
    this._renderer._viewRect = this._frame
  }

  /**
   *
   * @access public
   * @param {HTMLElement} element - parent element to append this view
   * @returns {void}
   */
  appendTo(element) {
    element.appendChild(this._canvas)

    // update canvas size
    if(typeof this._frame === 'undefined'){
      this._canvas.style.width = '100%'
      this._canvas.style.height = '100%'
      if(this._canvas.clientHeight <= 0){
        this._canvas.style.height = 300
      }
    }
    this._resizeCanvas()
    if(typeof window !== 'undefined'){
      window.addEventListener('resize', () => {
        this._resizeCanvas()
      })
    }
  }

  get backgroundColor() {
    return this._backgroundColor
  }
  set backgroundColor(newValue) {
    this._backgroundColor = newValue
    this._context.clearColor(newValue.r, newValue.g, newValue.b, newValue.a)
  }

  /**
   * Required. A Boolean value that determines whether the scene is playing.
   * @type {boolean}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523401-isplaying
   */
  get isPlaying() {
    return this._renderer.isPlaying
  }

  /**
   * Required. A Boolean value that determines whether the scene is playing.
   * @type {boolean}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523401-isplaying
   */
  set isPlaying(newValue) {
    if(newValue){
      this.play()
    }else{
      this.pause()
    }
  }

  // Specifying a Scene

  /**
   * The scene to be displayed in the view.
   * @access private
   * @type {?SCNScene}
   * @see https://developer.apple.com/reference/scenekit/scnview/1523904-scene
   */
  get scene() {
    return this._scene
  }

  /**
   * The scene to be displayed in the view.
   * @access private
   * @type {?SCNScene}
   * @see https://developer.apple.com/reference/scenekit/scnview/1523904-scene
   */
  set scene(newValue) {
    // FIXME: it should not be changed while drawing
    this._scene = newValue
    this._renderer.scene = this._scene
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
    if(!this._isPlaying){
      return
    }
    this._isPlaying = false
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
    if(this._isPlaying){
      return
    }
    this._isPlaying = true

    this.__requestAnimationFrame()
  }

  /**
   * Stops playback of the view’s scene and resets the scene time to its start time.
   * @access public
   * @param {?Object} sender - The object requesting the action (used when connecting a control in Interface Builder). SceneKit ignores this parameter.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnview/1524132-stop
   */
  stop(sender) {
    this._isPlaying = false
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
   * @property {string} preferLowPowerDevice An option for whether to select low-power-usage devices for Metal rendering.
   * @property {string} preferredDevice The device to use for Metal rendering.
   * @property {string} preferredRenderingAPI The rendering API to use for rendering the view (for example, Metal or OpenGL).
   * @see https://developer.apple.com/reference/scenekit/scnview.option
   */
  static get Option() {
    return _Option
  }

  ////////////////////////////////////////////////
  // SCNSceneRenderer
  ////////////////////////////////////////////////

  // Presenting a Scene

  /**
   * Required. Displays the specified scene with an animated transition.
   * @access public
   * @param {SCNScene} scene - The new scene to be displayed.
   * @param {SKTransition} transition - An object that specifies the duration and style of the animated transition.
   * @param {?SCNNode} pointOfView - The node to use as the pointOfView property when displaying the new scene.
   * @param {?function(): void} [completionHandler = null] - A block that SceneKit calls after the transition animation has completed.This block takes no parameters and has no return value.
   * @returns {void}
   * @desc Use this method to change the scene displayed in a SceneKit view (or other renderer) with an animated transition. For details on transition styles, see SKTransition.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523028-present
   */
  presentWithIncomingPointOfView(scene, transition, pointOfView, completionHandler = null) {
  }

  // Managing Scene Display

  /**
   * Required. The node from which the scene’s contents are viewed for rendering.
   * @type {?SCNNode}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523982-pointofview
   */
  get pointOfView() {
    return this._renderer.pointOfView
  }

  set pointOfView(newValue) {
    this._renderer.pointOfView = newValue
  }

  /**
   * Required. A Boolean value that determines whether SceneKit automatically adds lights to a scene.
   * @type {boolean}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523812-autoenablesdefaultlighting
   */
  get autoenablesDefaultLighting() {
    return this._renderer.autoenablesDefaultLighting
  }

  set autoenablesDefaultLighting(newValue) {
    this._renderer.autoenablesDefaultLighting = newValue
  }

  /**
   * Required. A Boolean value that determines whether SceneKit applies jittering to reduce aliasing artifacts.
   * @type {boolean}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1524026-isjitteringenabled
   */
  get isJitteringEnabled() {
    return this._renderer.isJitteringEnabled
  }
  
  set isJitteringEnabled(newValue) {
    this._renderer.isJitteringEnabled = newValue
  }

  /**
   * Required. A Boolean value that determines whether SceneKit displays rendering performance statistics in an accessory view.
   * @type {boolean}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522763-showsstatistics
   */
  get showsStatistics() {
    return this._renderer.showsStatistics
  }

  set showsStatistics(newValue) {
    this._renderer.showsStatistics = newValue
  }

  /**
   * Required. Options for drawing overlay content in a scene that can aid debugging.
   * @type {SCNDebugOptions}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523281-debugoptions
   */
  get debugOptions() {
    return this._renderer.debugOptions
  }

  set debugOptions(newValue) {
    this._renderer.debugOptions = newValue
  }

  /**
   * Required. The current scene time.
   * @type {number}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522680-scenetime
   */
  get sceneTime() {
    return this._renderer.sceneTime
  }

  set sceneTime(newValue) {
    this._renderer.sceneTime = newValue
  }

  /**
   * Required. A Boolean value that determines whether SceneKit restarts the scene time after all animations in the scene have played.
   * @type {boolean}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522878-loops
   */
  get loops() {
    return this._renderer.loops
  }

  set loops(newValue) {
    this._renderer.loops = newValue
  }

  /**
   * Required. The graphics technology SceneKit uses to render the scene.
   * @type {SCNRenderingAPI}
   * @desc You choose a graphics technology when initializing a scene renderer:When initializing a SCNView object, use the init(frame:options:) initializer and the preferredRenderingAPI key. Alternatively, create a view in Interface Builder and use the Rendering API control in the inspector. During initialization, the view will attempt to use the preferred API, but will fall back to a different API if the preferred one is not supported on the current hardware.To create a SCNRenderer object that renders into your own OpenGL contect, use the init(context:options:) initializer. To create a renderer for use in your own Metal workflow, use the init(device:options:) initializer.The rendering technology used by a SCNLayer object is determined by Core Animation.After initializing a renderer, this property reflects the rendering technology in use.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522616-renderingapi
   */
  get renderingAPI() {
    return this._renderingAPI
  }

  // Participating in the Scene Rendering Process

  /**
   * Required. A delegate object that receives messages about SceneKit’s rendering process.
   * @type {?SCNSceneRendererDelegate}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522671-delegate
   */
  get delegate() {
    return this._delegate
  }

  /**
   * Required. A delegate object that receives messages about SceneKit’s rendering process.
   * @type {?SCNSceneRendererDelegate}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522671-delegate
   */
  set delegate(newValue) {
    // FIXME: delegate should not be changed while drawing
    this._delegate = newValue
  }

  // Preloading Renderer Resources

  /**
   * Required. Prepares a SceneKit object for rendering.
   * @access public
   * @param {Object} object - An SCNScene, SCNNode, SCNGeometry, or SCNMaterial instance.
   * @param {?function(): boolean} [block = null] - A block that SceneKit calls periodically while preparing the object. The block takes no parameters.Your block should return false to tell SceneKit to continue preparing the object, or true to cancel preparation.Pass nil for this parameter if you do not need an opportunity to cancel preparing the object.
   * @returns {boolean} - 
   * @desc By default, SceneKit lazily loads resources onto the GPU for rendering. This approach uses memory and GPU bandwidth efficiently, but can lead to stutters in an otherwise smooth frame rate when you add large amounts of new content to an animated scene. To avoid such issues, use this method to prepare content for drawing before adding it to the scene. You can call this method on a secondary thread to prepare content asynchronously. SceneKit prepares all content associated with the object parameter you provide. If you provide an SCNMaterial object, SceneKit loads any texture images assigned to its material properties. If you provide an SCNGeometry object, SceneKit loads all materials attached to the geometry, as well as its vertex data. If you provide an SCNNode or SCNScene object, SceneKit loads all geometries and materials associated with the node and all its child nodes, or with the entire node hierarchy of the scene.You can use the block parameter to cancel preparation if content is no longer needed. For example, in a game you might use this method to preload areas of the game world the player is soon to enter, but if the player character dies before entering those areas, you can return true from the block to cancel preloading.You can observe the progress of this operation with the Progress class. For details, see Progress.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522798-prepare
   */
  prepareShouldAbortBlock(object, block = null) {
    return false
  }

  /**
   * Required. Prepares the specified SceneKit objects for rendering, using a background thread.
   * @access public
   * @param {Object[]} objects - An array of containing one or more SCNScene, SCNNode, SCNGeometry, or SCNMaterial instances.
   * @param {?function(arg1: boolean): void} [completionHandler = null] - A block that SceneKit calls when object preparation fails or completes.The block takes the following parameter:successtrue if all content was successfully prepared for rendering; otherwise, false.
   * @returns {void}
   * @desc By default, SceneKit lazily loads resources onto the GPU for rendering. This approach uses memory and GPU bandwidth efficiently, but can lead to stutters in an otherwise smooth frame rate when you add large amounts of new content to an animated scene. To avoid such issues, use this method to prepare content for drawing before adding it to the scene. SceneKit uses a secondary thread to prepare content asynchronously.SceneKit prepares all content associated with the objects you provide. If you provide an SCNMaterial object, SceneKit loads any texture images assigned to its material properties. If you provide an SCNGeometry object, SceneKit loads all materials attached to the geometry, as well as its vertex data. If you provide an SCNNode or SCNScene object, SceneKit loads all geometries and materials associated with the node and all its child nodes, or with the entire node hierarchy of the scene.You can observe the progress of this operation with the Progress class. For details, see Progress.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523375-prepare
   */
  prepare(objects, completionHandler = null) {
  }

  // Working With Projected Scene Contents

  /**
   * Required. Searches the renderer’s scene for objects corresponding to a point in the rendered image.
   * @access public
   * @param {CGPoint} point - 
   * @param {?Map<SCNHitTestOption, Object>} [options = null] - A dictionary of options affecting the search. See Hit Testing Options Keys for acceptable values.
   * @returns {SCNHitTestResult[]} - 
   * @desc A 2D point in the rendered screen coordinate space can refer to any point along a line segment in the 3D scene coordinate space. Hit-testing is the process of finding elements of a scene located along this line segment. For example, you can use this method to find the geometry corresponding to a click event in a SceneKit view.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522929-hittest
   */
  hitTest(point, options = null) {
    const x = (point.x - this._frame.minX) / this._frame.width * 2.0 - 1.0
    const y = (point.y - this._frame.minY) / this._frame.height * 2.0 - 1.0
    return this._renderer.hitTest(new CGPoint(x, -y), options)
  }

  /**
   * Required. Returns a Boolean value indicating whether a node might be visible from a specified point of view.
   * @access public
   * @param {SCNNode} node - The node whose visibility is to be tested.
   * @param {SCNNode} pointOfView - A node defining a point of view, as used by the pointOfView property.
   * @returns {boolean} - 
   * @desc Any node containing a camera or spotlight may serve as a point of view (see the pointOfView property for details). Such a node defines a viewing frustum—a portion of the scene’s coordinate space, shaped like a truncated pyramid, that encloses all points visible from that point of view.Use this method to test whether a node lies within the viewing frustum defined by another node (which may or may not be the scene renderer’s current pointOfView node). For example, in a game scene containing multiple camera nodes, you could use this method to determine which camera is currently best for viewing a moving player character.Note that this method does not perform occlusion testing. That is, it returns true if the tested node lies within the specified viewing frustum regardless of whether that node’s contents are obscured by other geometry.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522647-isnode
   */
  isNodeInsideFrustumOf(node, pointOfView) {
    return false
  }

  /**
   * Required. Returns all nodes that might be visible from a specified point of view.
   * @access public
   * @param {SCNNode} pointOfView - A node defining a point of view, as used by the pointOfView property.
   * @returns {SCNNode[]} - 
   * @desc Any node containing a camera or spotlight may serve as a point of view (see the pointOfView property for details). Such a node defines a viewing frustum—a portion of the scene’s coordinate space, shaped like a truncated pyramid, that encloses all points visible from that point of view.Use this method find all nodes whose content lies within the viewing frustum defined by another node (which may or may not be the scene renderer’s current pointOfView node).Note that this method does not perform occlusion testing. That is, the returned array includes any node that lies within the specified viewing frustum regardless of whether that node’s contents are obscured by other geometry.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522942-nodesinsidefrustum
   */
  nodesInsideFrustumOf(pointOfView) {
    return null
  }

  /**
   * Required. Projects a point from the 3D world coordinate system of the scene to the 2D pixel coordinate system of the renderer.
   * @access public
   * @param {SCNVector3} point - A point in the world coordinate system of the renderer’s scene.
   * @returns {SCNVector3} - 
   * @desc The z-coordinate of the returned point describes the depth of the projected point relative to the near and far clipping planes of the renderer’s viewing frustum (defined by its pointOfView node). Projecting a point on the near clipping plane returns a point whose z-coordinate is 0.0; projecting a point on the far clipping plane returns a point whose z-coordinate is 1.0.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1524089-projectpoint
   */
  projectPoint(point) {
    return null
  }

  /**
   * Required. Unprojects a point from the 2D pixel coordinate system of the renderer to the 3D world coordinate system of the scene.
   * @access public
   * @param {SCNVector3} point - A point in the screen-space (view, layer, or GPU viewport) coordinate system of the scene renderer.
   * @returns {SCNVector3} - 
   * @desc The z-coordinate of the point parameter describes the depth at which to unproject the point relative to the near and far clipping planes of the renderer’s viewing frustum (defined by its pointOfView node). Unprojecting a point whose z-coordinate is 0.0 returns a point on the near clipping plane; unprojecting a point whose z-coordinate is 1.0 returns a point on the far clipping plane.A 2D point in the rendered screen coordinate space can refer to any point along a line segment in the 3D scene coordinate space. To test for scene contents along this line—for example, to find the geometry corresponding to the location of a click event in a view—use the hitTest(_:options:) method.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522631-unprojectpoint
   */
  unprojectPoint(point) {
    return null
  }

  // Customizing Scene Rendering with Metal

  /**
   * Required. The Metal render command encoder in use for the current SceneKit rendering pass.
   * @type {?MTLRenderCommandEncoder}
   * @desc Use this render command encoder to encode additional rendering commands before or after SceneKit draws its own content.This property is valid only during the SceneKit rendering loop—that is, within one of the methods defined in the SCNSceneRendererDelegate protocol. Accessing this property at any other time returns nil.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522609-currentrendercommandencoder
   */
  get currentRenderCommandEncoder() {
    return this._renderer.currentRenderCommandEncoder
  }

  /**
   * Required. The Metal device this renderer uses for rendering.
   * @type {?MTLDevice}
   * @desc Use this property to create or look up other Metal resources that use the same device as your SceneKit renderer.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523935-device
   */
  get device() {
    return this._device
  }

  /**
   * Required. The Metal command queue this renderer uses for rendering.
   * @type {?MTLCommandQueue}
   * @desc Use this property to schedule additional command buffers for the Metal device to execute as part of the render cycle. For example, you can use a compute command encoder to modify the vertex data in a Metal buffer for use by a SCNGeometrySource object.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523974-commandqueue
   */
  get commandQueue() {
    return this._renderer.commandQueue
  }

  /**
   * Required. The Metal pixel format for the renderer’s color output.
   * @type {MTLPixelFormat}
   * @desc Use this property, along with the depthPixelFormat and stencilPixelFormat properties, if you perform custom drawing with Metal (see the SCNSceneRendererDelegate and SCNNodeRendererDelegate classes) and need to create a new MTLRenderPipelineState object to change the GPU state as part of your rendering.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523701-colorpixelformat
   */
  get colorPixelFormat() {
    return this._renderer.colorPixelFormat
  }

  /**
   * Required. The Metal pixel format for the renderer’s depth buffer.
   * @type {MTLPixelFormat}
   * @desc Use this property, along with the colorPixelFormat and stencilPixelFormat properties, if you perform custom drawing with Metal (see the SCNSceneRendererDelegate and SCNNodeRendererDelegate classes) and need to create a new MTLRenderPipelineState object to change the GPU state as part of your rendering.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523780-depthpixelformat
   */
  get depthPixelFormat() {
    return this._renderer.depthPixelFormat
  }

  /**
   * Required. The Metal pixel format for the renderer’s stencil buffer.
   * @type {MTLPixelFormat}
   * @desc Use this property, along with the depthPixelFormat and colorPixelFormat properties, if you perform custom drawing with Metal (see the SCNSceneRendererDelegate and SCNNodeRendererDelegate classes) and need to create a new MTLRenderPipelineState object to change the GPU state as part of your rendering.NoteThis property is valid only for scene renderers whose renderingAPI value is metal. You create a SceneKit view that renders using Metal with the preferredRenderingAPI initialization option or in Interface Builder, or an SCNRenderer that uses Metal with the init(device:options:) method. For OpenGL-based scene renderers, this property’s value is always nil.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523315-stencilpixelformat
   */
  get stencilPixelFormat() {
    return this._renderer._stencilPixelFormat
  }

  // Customizing Scene Rendering with OpenGL

  /**
   * Required. The OpenGL rendering context that SceneKit uses for rendering the scene.
   * @type {?WebGLRenderingContext}
   * @desc In macOS, the value of this property is a Core OpenGL cglContextObj object.In iOS, the value of this property is an EAGLContext object.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522840-context
   */
  get context() {
    return this._renderer.context
  }

  // Rendering Sprite Kit Content over a Scene

  /**
   * Required. A Sprite Kit scene to be rendered on top of the SceneKit content.
   * @type {?SKScene}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1524051-overlayskscene
   */
  get overlaySKScene() {
    return this._renderer.overlaySKScene
  }

  set overlaySKScene(newValue) {
    this._renderer.overlaySKScene = newValue
  }

  // Working With Positional Audio

  /**
   * Required. The node representing the listener’s position in the scene for use with positional audio effects.
   * @type {?SCNNode}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523747-audiolistener
   */
  get audioListener() {
    return this._renderer.audioListener
  }

  set audioListener(newValue) {
    this._renderer.audioListener = newValue
  }

  /**
   * Required. The 3D audio mixing node SceneKit uses for positional audio effects.
   * @type {AVAudioEnvironmentNode}
   * @desc SceneKit uses this audio node to spatialize sounds from SCNAudioPlayer objects attached to nodes in the scene. You can use this object in conjunction with the audioEngine property to rearrange the audio graph to add other, non-spatialized audio sources or mix in audio processing effects.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1523582-audioenvironmentnode
   */
  get audioEnvironmentNode() {
    return this._renderer.audioEnvironmentNode
  }

  /**
   * Required. The audio engine SceneKit uses for playing scene sounds.
   * @type {AVAudioEngine}
   * @desc SceneKit uses this audio engine to play sounds from SCNAudioPlayer objects attached to nodes in the scene. You can use this object directly to add other sound sources not related to scene contents, or to add other sound processing nodes or mixing nodes to the audio engine. To identify the node SceneKit uses for spatializing scene sounds when connecting other nodes, use the audioEnvironmentNode property.
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522686-audioengine
   */
  get audioEngine() {
    return this._renderer.audioEngine
  }

  // Instance Properties

  /**
   * Required. 
   * @type {number}
   * @see https://developer.apple.com/reference/scenekit/scnscenerenderer/1522854-currenttime
   */
  get currentTime() {
    return this._renderer.currentTime
  }

  set currentTime(newValue) {
    this._renderer.currentTime = newValue
  }

  ////////////////////////////////////////////////
  // NSView/UIView
  ////////////////////////////////////////////////
  // TODO: implement NSView/UIView and extend it
  viewDidMoveToWindow() {}
  setFrameSize(newSize) {}

  /**
   * draw one frame
   * @access private
   * @param {number} time - current time
   * @param {WebGLRenderingContext} context - context to draw frame
   * @returns {void}
   */
  _drawAtTimeWithContext(time, context) {
    this._createPresentationNodes()

    this._updateTransform()

    if(this._delegate && this._delegate.rendererUpdateAtTime){
      this._delegate.rendererUpdateAtTime(this._renderer, time)
    }

    ///////////////////////////////
    // runs actions & animations //
    ///////////////////////////////
    this._runActions()
    this._runAnimations()

    this._updateTransform()

    if(this._delegate && this._delegate.rendererDidApplyAnimationsAtTime){
      this._delegate.rendererDidApplyAnimationsAtTime(this._renderer, time)
    }

    this._updateTransform()

    ///////////////////////
    // simulates physics //
    ///////////////////////

    if(this._delegate && this._delegate.rendererDidSimulatePhysicsAtTime){
      this._delegate.rendererDidSimulatePhysicsAtTime(this._renderer, time)
    }

    ///////////////////////////
    // evaluates constraints //
    ///////////////////////////

    if(this._delegate && this._delegate.rendererWillRenderSceneAtTime){
      this._delegate.rendererWillRenderSceneAtTime(this._renderer, this._scene, time)
    }

    ///////////////////////
    // renders the scene //
    ///////////////////////
    this._updateMorph()
    this._updateParticles()
    this._renderer.render()

    if(this._delegate && this._delegate.rendererDidRenderSceneAtTime){
      this._delegate.rendererDidRenderSceneAtTime(this._renderer, time)
    }
  }

  _createPresentationNodes() {
    const arr = [this._scene.rootNode]
    while(arr.length > 0){
      const node = arr.shift()
      let p = node._presentation
      if(p === null){
        p = node.copy()
        p._isPresentationInstance = true
        if(node.geometry !== null){
          p.geometry = node.geometry.copy()
          p.geometry._isPresentationInstance = true
          p.geometry._geometryElements = []
          node.geometry._geometryElements.forEach((element) => {
            p.geometry._geometryElements.push(element.copy())
          })
          p.geometry._geometrySources = []
          node.geometry._geometrySources.forEach((source) => {
            p.geometry._geometrySources.push(source.copy())
          })
          node.geometry._presentation = p.geometry
        }
        node._presentation = p
      }
      node._copyTransformToPresentation()
      //p._position = node._position
      //p._rotation = node._rotation
      //p._scale = node._scale

      
      arr.push(...node.childNodes)
    }
  }

  /**
   * request animation frame repeatedly as long as isPlaying is true
   * @access private
   * @returns {void}
   */
  __requestAnimationFrame() {
    // Reflect.apply(this._requestAnimationFrame, window, () => {
    this._requestAnimationFrame.call(window, () => {
      this._currentSystemTime = Date.now() * 0.001
      this.currentTime = this._currentSystemTime
      this._drawAtTimeWithContext(this.currentTime, this._context)
      //console.log('requestAnimationFrame: time: ' + this.currentTime)

      if(this._isPlaying){
        this.__requestAnimationFrame()
      }
    })
  }

  _updateTransform(node, parentTransform) {
    this._scene.rootNode._updateWorldTransform()
  }

  _updateMorph(node) {
    if(typeof node === 'undefined'){
      this._updateMorph(this._scene.rootNode)
      return
    }
    if(node.morpher !== null){
      node.morpher._morph(node)
    }
    node.childNodes.forEach((child) => {
      this._updateMorph(child)
    })
  }

  _runActions() {
    this._runActionForNode(this._scene.rootNode)
  }

  _runActionForNode(node) {
    this._runActionForObject(node)
    node.childNodes.forEach((child) => this._runActionForNode(child))
  }

  _runActionForObject(obj) {
    const deleteKeys = []
    obj._actions.forEach((action, key) => {
      action._applyAction(obj, this.currentTime)
      if(action._finished){
        if(action._completionHandler){
          action._completionHandler()
        }
        deleteKeys.push(key)
      }
    })
    deleteKeys.forEach((key) => {
      obj._animations.delete(key)
    })
  }

  _runAnimations() {
    this._runAnimationForNode(this._scene.rootNode)
  }

  _runAnimationForNode(node) {
    this._runAnimationForObject(node)
    node.childNodes.forEach((child) => this._runAnimationForNode(child))
    // TODO: implement animations for all animatable objects:
    //         SCNCamera, SCNConstraint, SCNGeometry, SCNLight, SCNMaterial, 
    //         SCNMaterialProperty, SCNMorpher, SCNParticleSystem, SCNTechnique
    if(node.geometry){
      this._runAnimationForObject(node.geometry)
      node.geometry.materials.forEach((material) => {
        this._runAnimationForObject(material)
        const properties = [
          material._diffuse,
          material._ambient,
          material._specular,
          material._normal,
          material._reflective,
          material._emission,
          material._transparent,
          material._multiply,
          material._ambientOcclusion,
          material._selfIllumination,
          material._metalness,
          material._roughness
        ]
        properties.forEach((prop) => {
          this._runAnimationForObject(prop)
        })
      })
    }
  }

  _runAnimationForObject(obj, time) {
    const deleteKeys = []
    obj._animations.forEach((animation, key) => {
      animation._applyAnimation(obj, this.currentTime)
      if(animation._isFinished && animation.isRemovedOnCompletion){
        deleteKeys.push(key)
      }
    })
    deleteKeys.forEach((key) => {
      obj._animations.delete(key)
    })
  }

  _updateParticles() {
    this._updateParticlesForNode(this._scene.rootNode)
  }

  _updateParticlesForNode(node) {
    this._updateParticlesForObject(node)
    node.childNodes.forEach((child) => this._updateParticlesForNode(child))
  }

  _updateParticlesForObject(obj) {
    if(obj.particleSystems === null){
      return
    }
    obj.particleSystems.forEach((system) => {
      system._updateParticles(obj, this.currentTime)
    })
  }


  // NSView

  /**
   * @access private
   * @param {Event} e -
   * @returns {NSEvent} -
   */
  _createEvent(e) {
    // TODO: implement
    e.locationInWindow = new CGPoint(e.clientX, e.clientY)
    return e
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  mouseDownWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  mouseDraggedWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  mouseUpWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  mouseMovedWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  mouseEnteredWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  mouseExitedWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  rightMouseDraggedWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  rightMouseUpWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  otherMouseDownWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  otherMouseDraggedWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  otherMouseUpWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  scrollWheelWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  keyDownWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  keyUpWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  flagsChangedWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  tablePointWith(theEvent) {
  }

  /**
   * @access public
   * @param {NSEvent} theEvent -
   * @returns {void}
   */
  tableProximityWith(theEvent) {
  }

  convertFrom(point, view) {
    let sx = 0
    let sy = 0
    if(view){
      // FIXME: add accessor functions to get the element position
      sx = view._frame.origin.x
      sy = view._frame.origin.y
    }
    // FIXME: add accessor functions to get the element position
    const rect = this._canvas.getBoundingClientRect()
    const dx = rect.left
    const dy = rect.top

    return new CGPoint(point.x + sx - dx, point.y + sy - dy)
  }

  /**
   * @type {CGRect}
   */
  get bounds() {
    const rect = this._canvas.getBoundingClientRect()
    return new CGRect(new CGPoint(rect.left, rect.top), new CGSize(rect.width, rect.height))
  }
}

// TODO: use extension of HTMLElement when it's supported.
//if(customElements){
//  customElements.define('scn-view', SCNView)
//}
