'use strict'

import CGPoint from '../CoreGraphics/CGPoint'
import CGSize from '../CoreGraphics/CGSize'
import SKColor from './SKColor'
import SKEffectNode from './SKEffectNode'
import SKSceneScaleMode from './SKSceneScaleMode'
//import SKCameraNode from './SKCameraNode'
//import SKView from './SKView'
//import SKSceneDelegate from './SKSceneDelegate'
//import SKPhysicsWorld from './SKPhysicsWorld'
//import SKNode from './SKNode'


/**
 * The root node for all Sprite Kit objects displayed in a view. 
 * @access public
 * @extends {SKEffectNode}
 * @see https://developer.apple.com/reference/spritekit/skscene
 */
export default class SKScene extends SKEffectNode {

  // Initializing a Scene

  /**
   * Initializes a new scene object.
   * @access public
   * @constructor
   * @param {CGSize} size - The size of the scene in points.
   * @desc This is the class’s designated initializer method.
   * @see https://developer.apple.com/reference/spritekit/skscene/1520435-init
   */
  constructor(size) {
    super()

    // Determining What Portion of the Scene Is Visible in the View

    /**
     * The camera node in the scene that determines what part of the scene’s coordinate space is visible in the view.
     * @type {?SKCameraNode}
     * @see https://developer.apple.com/reference/spritekit/skscene/1519696-camera
     */
    this.camera = null

    /**
     * The point in the view’s frame that corresponds to the scene’s origin.
     * @type {CGPoint}
     * @see https://developer.apple.com/reference/spritekit/skscene/1519864-anchorpoint
     */
    this.anchorPoint = new CGPoint(0, 0)

    /**
     * The dimensions of the scene in points.
     * @type {CGSize}
     * @see https://developer.apple.com/reference/spritekit/skscene/1519831-size
     */
    this.size = size | new CGSize(1, 1)

    /**
     * Defines how the scene is mapped to the view that presents it.
     * @type {SKSceneScaleMode}
     * @see https://developer.apple.com/reference/spritekit/skscene/1519562-scalemode
     */
    this.scaleMode = SKSceneScaleMode.fill


    // Setting the Background Color of a Scene

    /**
     * The background color of the scene.
     * @type {SKColor}
     * @see https://developer.apple.com/reference/spritekit/skscene/1520278-backgroundcolor
     */
    this.backgroundColor = new SKColor(0.15, 0.15, 0.15, 1.0)


    // Presenting a Scene

    this._view = null

    // Executing the Animation Loop

    /**
     * A delegate to be called during the animation loop. 
     * @type {?SKSceneDelegate}
     * @see https://developer.apple.com/reference/spritekit/skscene/1520213-delegate
     */
    this.delegate = null


    // Working with Physics in the Scene

    //this._physicsWorld = new SKPhysicsWorld()
    this._physicsWorld = null

    // Working with Audio in the Scene

    /**
     * A node used to determine the position of the listener for positional audio in the scene.
     * @type {?SKNode}
     * @see https://developer.apple.com/reference/spritekit/skscene/1520363-listener
     */
    this.listener = null

    //this._audioEngine = null
  }

  // Determining What Portion of the Scene Is Visible in the View

  /**
   * Called whenever the scene’s size changes.
   * @access public
   * @param {CGSize} oldSize - The old size of the scene, in points.
   * @returns {void}
   * @desc This method is intended to be overridden in a subclass. Typically, you use this method to adjust the positions of nodes in the scene.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519545-didchangesize
   */
  didChangeSize(oldSize) {
  }

  // Converting Between View and Scene Coordinates

  /**
   * Converts a point from view coordinates to scene coordinates.
   * @access public
   * @param {CGPoint} point - A point in view coordinates.
   * @returns {CGPoint} - 
   * @desc The scene must be presented in a view before calling this method.
   * @see https://developer.apple.com/reference/spritekit/skscene/1520395-convertpoint
   */
  convertPointFromView(point) {
    return null
  }

  /**
   * Converts a point from scene coordinates to view coordinates.
   * @access public
   * @param {CGPoint} point - A point in scene coordinates.
   * @returns {CGPoint} - 
   * @desc The scene must be presented in a view before calling this method.
   * @see https://developer.apple.com/reference/spritekit/skscene/1520082-convertpoint
   */
  convertPointToView(point) {
    return null
  }

  // Presenting a Scene

  /**
   * Called immediately after the scene has been initialized or decoded.
   * @access public
   * @returns {void}
   * @desc This method is intended to be overridden in a subclass. You can use this method to implement any custom behavior after it has been initialized or decoded.
   * @see https://developer.apple.com/reference/spritekit/skscene/1645216-scenedidload
   */
  sceneDidLoad() {
  }

  /**
   * Called immediately before a scene is removed from a view.
   * @access public
   * @param {SKView} view - The view that is presenting the scene.
   * @returns {void}
   * @desc This method is intended to be overridden in a subclass. You can use this method to implement any custom behavior for your scene when it is about to be removed from the view.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519703-willmove
   */
  willMoveFrom(view) {
  }

  /**
   * Called immediately after a scene is presented by a view.
   * @access public
   * @param {SKView} view - The view that is presenting the scene.
   * @returns {void}
   * @desc This method is intended to be overridden in a subclass. You can use this method to implement any custom behavior for your scene when it is about to be presented by a view. For example, you might use this method to create the scene’s contents.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519607-didmove
   */
  didMoveTo(view) {
  }
  /**
   * The view that is currently presenting the scene.
   * @type {?SKView}
   * @desc To present a scene, you call the presentScene(_:) method or presentScene(_:transition:) method on the SKView class. If the scene is not currently presented, this property holds nil.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519726-view
   */
  get view() {
    return this._view
  }

  // Executing the Animation Loop

  /**
   * Performs any scene-specific updates that need to occur before scene actions are evaluated.
   * @access public
   * @param {number} currentTime - The current system time.
   * @returns {void}
   * @desc Do not call this method directly; it is called exactly once per frame, so long as the scene is presented in a view and is not paused. By default, this method does nothing. Your scene subclass should override this method and perform any necessary updates to the scene.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519802-update
   */
  update(currentTime) {
  }

  /**
   * Performs any scene-specific updates that need to occur after scene actions are evaluated.
   * @access public
   * @returns {void}
   * @desc Do not call this method directly; it is called exactly once per frame, so long as the scene is presented in a view and is not paused. By default, this method does nothing. Your scene subclass should override this method and perform any necessary updates to the scene.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519903-didevaluateactions
   */
  didEvaluateActions() {
  }

  /**
   * Performs any scene-specific updates that need to occur after physics simulations are performed.
   * @access public
   * @returns {void}
   * @desc Do not call this method directly; it is called exactly once per frame, so long as the scene is presented in a view and is not paused. By default, this method does nothing. Your scene subclass should override this method and perform any necessary updates to the scene.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519965-didsimulatephysics
   */
  didSimulatePhysics() {
  }

  /**
   * Performs any scene-specific updates that need to occur after constraints are applied.
   * @access public
   * @returns {void}
   * @desc Do not call this method directly; it is called exactly once per frame, so long as the scene is presented in a view and is not paused. By default, this method does nothing. Your scene subclass should override this method and perform any necessary updates to the scene.
   * @see https://developer.apple.com/reference/spritekit/skscene/1520006-didapplyconstraints
   */
  didApplyConstraints() {
  }

  /**
   * Called after the scene has finished all of the steps required to process animations.
   * @access public
   * @returns {void}
   * @desc Do not call this method directly; it is called exactly once per frame, so long as the scene is presented in a view and is not paused. By default, this method does nothing. Your scene subclass should override this method and perform any necessary updates to the scene. This method is the last method to be called before the scene is rendered.
   * @see https://developer.apple.com/reference/spritekit/skscene/1520269-didfinishupdate
   */
  didFinishUpdate() {
  }

  // Working with Physics in the Scene
  /**
   * The physics simulation associated with the scene.
   * @type {SKPhysicsWorld}
   * @desc Every scene automatically creates a physics world object to simulate physics on nodes in the scene. You use this property to access the scene’s global physics properties, such as gravity. To add physics to a particular node, see physicsBody.
   * @see https://developer.apple.com/reference/spritekit/skscene/1519584-physicsworld
   */
  get physicsWorld() {
    return this._physicsWorld
  }

  // Working with Audio in the Scene
  /**
   * The AV Foundation audio engine used to play audio from audio nodes contained in the scene.
   * @type {AVAudioEngine}
   * @desc An audio engine instance is automatically created for you when the scene is created. You can use methods and properties on a scene’s audio engine for overall control of all of its child audio nodes. The following code shows how a scene’s overall volume can be reduced from its default of 1.0 down to 0.2 and then paused:let scene = SKScene()
scene.audioEngine.mainMixerNode.outputVolume = 0.2
scene.audioEngine.pause()
let scene = SKScene()
scene.audioEngine.mainMixerNode.outputVolume = 0.2
scene.audioEngine.pause()

   * @see https://developer.apple.com/reference/spritekit/skscene/1519644-audioengine
   */
  //get audioEngine() {
  //  return this._audioEngine
  //}
}
