'use strict'



/**
 * Options for drawing overlays with SceneKit content that can aid in debugging, used with the debugOptions property.
 * @access public
 * @see https://developer.apple.com/reference/scenekit/scndebugoptions
 */
export default class SCNDebugOptions {

  // Constants
  /**
   * Display the physics shapes for any nodes with attached SCNPhysicsBody objects.
   * @type {SCNDebugOptions}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1522896-showphysicsshapes
   */
  get showPhysicsShapes() {
    return this._showPhysicsShapes
  }
  /**
   * Display the bounding boxes for any nodes with content.
   * @type {SCNDebugOptions}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1523258-showboundingboxes
   */
  get showBoundingBoxes() {
    return this._showBoundingBoxes
  }
  /**
   * Display the locations of each SCNLight object in the scene.
   * @type {SCNDebugOptions}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1522606-showlightinfluences
   */
  get showLightInfluences() {
    return this._showLightInfluences
  }
  /**
   * Display the regions affected by each SCNLight object in the scene.
   * @type {SCNDebugOptions}
   * @desc Only lights whose type is omni or spot have an area of effect; directional and ambient lights affect the entire scene.
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1522894-showlightextents
   */
  get showLightExtents() {
    return this._showLightExtents
  }
  /**
   * Display the regions affected by each SCNPhysicsField object in the scene.
   * @type {SCNDebugOptions}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1523589-showphysicsfields
   */
  get showPhysicsFields() {
    return this._showPhysicsFields
  }
  /**
   * Display geometries in the scene with wireframe rendering.
   * @type {SCNDebugOptions}
   * @desc When this option is enabled, SceneKit still renders scene geometry with all associated materials, then overlays a wireframe rendering of the same geometry. You can use this option, for example, to debug material rendering issues.
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1523384-showwireframe
   */
  get showWireframe() {
    return this._showWireframe
  }

  // Initializers

  /**
   * 
   * @access public
   * @param {number} rawValue - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scndebugoptions/1523870-init
   */
  init(rawValue) {

    // Constants

    this._showPhysicsShapes = null
    this._showBoundingBoxes = null
    this._showLightInfluences = null
    this._showLightExtents = null
    this._showPhysicsFields = null
    this._showWireframe = null
  }
}
