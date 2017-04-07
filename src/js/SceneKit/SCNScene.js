'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNNode from './SCNNode'
import SCNMaterialProperty from './SCNMaterialProperty'
import SCNSceneExportDelegate from './SCNSceneExportDelegate'
import SCNSceneExportProgressHandler from './SCNSceneExportProgressHandler'
import SCNPhysicsWorld from './SCNPhysicsWorld'
import SCNParticleSystem from './SCNParticleSystem'
import SCNMatrix4 from './SCNMatrix4'

const _Attribute = {
  endTime: 'kSceneEndTimeAttributeKey',
  frameRate: 'kSceneFrameRateAttributeKey',
  startTime: 'kSceneStartTimeAttributeKey',
  upAxis: 'kSceneUpAxisAttributeKey'
}


/**
 * A scene graph—a hierarchy of nodes with attached geometries, lights, cameras and other attributes that together form a displayable 3D scene.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scnscene
 */
export default class SCNScene extends NSObject {
  static get _propTypes() {
    return {
      paused: ['boolean', 'isPaused'],
      rootNode: ['SCNNode', '_rootNode'],
      upAxis: ['SCNVector3', null],
      fogStartDistance: 'double',
      fogDensityExponent: 'double',
      physicsWorld: ['SCNPhysicsWorld', '_physicsWorld'],
      background: ['SCNMaterialProperty', '_background'],
      endTime: ['double', null],
      frameRate: ['double', null],
      fogEndDistance: 'double',
      startTime: ['double', null],
      fogColor: 'plist'
    }
  }

  /**
   * Loads a scene from the specified URL.
   * @access public
   * @constructor
   * @param {string} url - The URL to the scene file to load.
   * @param {?Map<SCNSceneSource.LoadingOption, Object>} [options = null] - A dictionary of options affecting scene loading, or nil for default options. For available keys, see Scene Loading Options.
   * @throws {Error}
   * @desc This method provides a convenient way to load a complete scene from a file at an arbitrary URL. For more detailed options or to load only part of a file’s scene graph, use the SCNSceneSource class.Handling Errors in Swift:
In Swift, this method returns a nonoptional result and is marked with the throws keyword to indicate that it throws an error in cases of failure.
You call this method in a try expression and handle any errors in the catch clauses of a do statement, as described in Error Handling in The Swift Programming Language (Swift 3.1) and Error Handling in Using Swift with Cocoa and Objective-C (Swift 3.1).

   * @see https://developer.apple.com/reference/scenekit/scnscene/1522660-init
   */
  constructor(url, options = null) {
    super()

    // Managing Animated Effects in a Scene

    /**
     * A Boolean value that determines whether to run actions, animations, particle systems, and physics simulations in the scene graph.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnscene/1523604-ispaused
     */
    this.isPaused = false


    // Accessing Scene Contents

    this._rootNode = new SCNNode()
    this._background = null
    this._lightingEnvironment = null

    // Adding Fog to a Scene

    /**
     * The distance from a point of view at which the scene’s contents begin to be obscured by fog. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnscene/1522790-fogstartdistance
     */
    this.fogStartDistance = 0

    /**
     * The distance from a point of view at which the scene’s contents are completely obscured by fog. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnscene/1523836-fogenddistance
     */
    this.fogEndDistance = 0

    /**
     * The transition curve for the fog’s intensity between its start and end distances. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnscene/1523776-fogdensityexponent
     */
    this.fogDensityExponent = 0

    /**
     * The color of the fog effect to be rendered with the scene. Animatable.
     * @type {Object}
     * @see https://developer.apple.com/reference/scenekit/scnscene/1522774-fogcolor
     */
    this.fogColor = null


    // Working With Physics in the Scene

    this._physicsWorld = null

    // Working with Particle Systems in the Scene

    this._particleSystems = null
  }

  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {SCNScene}
   */
   /*
  static initWithCoder(coder) {
    const instance = new SCNScene()
    instance._setValueWithCoder(coder)
    return instance
  }
  */

  /**
   * @access private
   * @param {NSCoder} coder -
   */
   /*
  _setValueWithCoder(coder) {
    this.isPaused = coder.decodeBoolForKey('paused')
    this._rootNode = coder.decodeObjectForKey('rootNode')
    const upAxis = coder.decodeBytesForKeyReturnedLength('upAxis', null)
    this.fogStartDistance = coder.decodeFloatForKey('fogStartDistance')
    this.fogDensityExponent = coder.decodeFloatForKey('fogDensityExponent')
    this._physicsWorld = coder.decodeObjectForKey('physicsWorld')
    this._background = coder.decodeObjectForKey('background')
    // TODO: check if Integer is a proper type
    const endTime = coder.decodeIntegerForKey('endTime')
    const frameRate = coder.decodeIntegerForKey('frameRate')
    this.fogEndDistance = coder.decodeFloatForKey('fogEndDistance')
    const startTime = coder.decodeIntegerForKey('startTime')
    this.fogColor = coder.decodeObjectForKey('fogColor') // NSMutableData...
  }
  */

  // Creating or Loading a Scene

  /**
   * Loads a scene from a file with the specified name in the app’s main bundle.
   * @access public
   * @param {string} name - The name of a scene file in the app bundle’s resources directory.
   * @returns {void}
   * @desc This method provides a convenient way to load a complete scene from a file in the app’s main bundle. Calling this method is equivalent to using the Bundle class to locate the scene file and passing the resulting URL to the init(url:options:) method, specifying no options and no error handling.For more detailed options or to load only part of a file’s scene graph, use the SCNSceneSource class.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1523355-init
   */
  static sceneNamed(name) {
  }

  /**
   * Loads a scene from a file with the specified name in a specific subdirectory of the app’s main bundle.
   * @access public
   * @param {string} name - The name of a scene file in the app bundle.
   * @param {?string} directory - The path to the subdirectory of the bundle’s resources directory containing the scene file.
   * @param {?Map<SCNSceneSource.LoadingOption, Object>} [options = null] - A dictionary of options affecting scene loading, or nil for default options. For available keys, see Scene Loading Options.
   * @returns {void}
   * @desc This method provides a convenient way to load a complete scene from a file in the app’s main bundle. Calling this method is equivalent to using the Bundle class to locate the scene file and passing the resulting URL to the init(url:options:) method.For more detailed options or to load only part of a file’s scene graph, use the SCNSceneSource class.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1522851-init
   */
  static sceneNamedInDirectory(name, directory, options = null) {
  }

  /**
   * Loads a scene from the specified URL.
   * @access public
   * @param {string} url - The URL to the scene file to load.
   * @param {?Map<SCNSceneSource.LoadingOption, Object>} [options = null] - A dictionary of options affecting scene loading, or nil for default options. For available keys, see Scene Loading Options.
   * @returns {void}
   * @throws {Error}
   * @desc This method provides a convenient way to load a complete scene from a file at an arbitrary URL. For more detailed options or to load only part of a file’s scene graph, use the SCNSceneSource class.Handling Errors in Swift:
In Swift, this method returns a nonoptional result and is marked with the throws keyword to indicate that it throws an error in cases of failure.
You call this method in a try expression and handle any errors in the catch clauses of a do statement, as described in Error Handling in The Swift Programming Language (Swift 3.1) and Error Handling in Using Swift with Cocoa and Objective-C (Swift 3.1).

   * @see https://developer.apple.com/reference/scenekit/scnscene/1522660-init
   */
  static scene(url, options = null) {
    return new SCNScene(url, options)
  }

  // Accessing Scene Contents
  /**
   * The root node of the scene graph.
   * @type {SCNNode}
   * @desc All scene content—nodes, geometries and their materials, lights, cameras, and related objects—is organized in a node hierarchy with a single common root node.Some scene files created using external tools may describe node hierarchies containing multiple root nodes. When SceneKit imports such files, their separate root nodes will be made children of a new, unique root node.Each child node’s coordinate system is defined relative to the transformation of its parent node. You should not modify the transform property of the root node.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1524029-rootnode
   */
  get rootNode() {
    return this._rootNode
  }
  /**
   * A background to be rendered before the rest of the scene.
   * @type {SCNMaterialProperty}
   * @desc If the material property’s contents object is nil, SceneKit does not draw any background before drawing the rest of the scene. (If the scene is presented in an SCNView instance, the view’s background color is visible behind the contents of the scene.)If you specify a cube map texture for the material property (see the discussion of the contents property), SceneKit renders the background as a skybox.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1523665-background
   */
  get background() {
    return this._background
  }
  /**
   * A cube map texture that depicts the environment surrounding the scene’s contents, used for advanced lighting effects.
   * @type {SCNMaterialProperty}
   * @desc When rendering materials with the physicallyBased lighting model, SceneKit illuminates surfaces differently according to the environment that surrounds them. For example, with physically based shading, even a diffuse surface takes on some color from the sky above it and the ground below it.TipFor realistic results, reuse the same contents for both the lighting environment and the background property.For information about defining cube maps, see the discussion of the contents property.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1639532-lightingenvironment
   */
  get lightingEnvironment() {
    return this._lightingEnvironment
  }

  // Managing Scene Attributes

  /**
   * Returns the scene attribute for the specified key.
   * @access public
   * @param {string} key - One of the constants described in Scene Attributes that identifies the attribute to be read.
   * @returns {?Object} - 
   * @see https://developer.apple.com/reference/scenekit/scnscene/1522858-attribute
   */
  attributeForKey(key) {
    return null
  }

  /**
   * Sets a scene attribute for the specified key.
   * @access public
   * @param {?Object} attribute - An object that specifies the value of the attribute to be written.
   * @param {string} key - One of the constants described in Scene Attributes that identifies the attribute to be written.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnscene/1524229-setattribute
   */
  setAttributeForKey(attribute, key) {
  }

  // Exporting a Scene File

  /**
   * Exports the scene and its contents to a file at the specified URL.
   * @access public
   * @param {string} url - The URL to write the scene file to. This URL must use the file scheme.
   * @param {?Map<string, Object>} [options = null] - A dictionary of options affecting scene loading, or nil for default options. For available keys, see Scene Loading Options.
   * @param {?SCNSceneExportDelegate} delegate - A delegate object to customize export of external resources used by the scene. Pass nil for default export of external resources.
   * @param {?SCNSceneExportProgressHandler} [progressHandler = null] - A block that SceneKit calls repeatedly to report progress of the export operation.
   * @returns {boolean} - 
   * @desc SceneKit creates and writes a file containing the scene graph in the Digital Asset Exchange (DAE) format. The format of the file created depends on OS version and on the filename extension you specify:In iOS 10.0, tvOS 10.0, watchOS 3.0, OS X v10.11, and later versions, specify the .scn extension to save a file in SceneKit’s native format. This format supports all features of SceneKit (including physics, constraints, and particle systems), and reading files in this format is faster than importing from other scene file formats.In macOS only, specify the .dae extension to export in Digital Asset Exchange (DAE) format for use by other apps. Exported DAE files do not contain scene elements specific to SceneKit, such as physics bodies and fields, constraints, and particle systems.If the scene references external resources, such as image files used in material properties, SceneKit exports these files to a nearby location and references their URLs in the exported scene file. To override SceneKit’s exporting of external resources, provide an object implementing the SCNSceneExportDelegate protocol in the delegate parameter.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1523577-write
   */
  writeTo(url, options = null, delegate, progressHandler = null) {
    return false
  }

  // Working With Physics in the Scene
  /**
   * The physics simulation associated with the scene.
   * @type {SCNPhysicsWorld}
   * @desc Every scene automatically creates a physics world object to simulate physics on nodes in the scene. You use this property to access the scene’s global physics properties, such as gravity, and to manage physics interactions between nodes. To make a node in the scene participate in the physics simulation, use either or both of its physicsBody and physicsField properties.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1522643-physicsworld
   */
  get physicsWorld() {
    return this._physicsWorld
  }

  // Working with Particle Systems in the Scene

  /**
   * Attaches a particle system to the scene, using the specified transform.
   * @access public
   * @param {SCNParticleSystem} system - A particle system.
   * @param {SCNMatrix4} transform - A transformation matrix that positions and orients the particle system relative to the world coordinate space of the scene.
   * @returns {void}
   * @desc A particle system directly attached to a scene is not related to the coordinate space of any node in the scene. To attach a particle system whose emitter location follows the movement of a node within the scene, use the corresponding SCNNode method.For details on particle systems, see SCNParticleSystem.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1523359-addparticlesystem
   */
  addParticleSystem(system, transform) {
  }

  /**
   * Removes a particle system attached to the scene.
   * @access public
   * @param {SCNParticleSystem} system - A particle system.
   * @returns {void}
   * @desc This method has no effect if the system parameter does not reference a particle system directly attached to the scene.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1523498-removeparticlesystem
   */
  removeParticleSystem(system) {
  }

  /**
   * Removes any particle systems directly attached to the scene.
   * @access public
   * @returns {void}
   * @desc Calling this method does not remove particle systems attached to nodes within the scene.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1522786-removeallparticlesystems
   */
  removeAllParticleSystems() {
  }

  /**
   * The particle systems attached to the scene.
   * @type {?SCNParticleSystem[]}
   * @desc An array of SCNParticleSystem objects directly attached to the scene. This array does not include particle systems attached to nodes within the scene.For details on particle systems, see SCNParticleSystem.
   * @see https://developer.apple.com/reference/scenekit/scnscene/1522787-particlesystems
   */
  get particleSystems() {
    return this._particleSystems
  }

  // Structures

  /**
   * @type {Object} Attribute
   * @property {string} endTime A floating-point value (in an NSNumber object) for the end time of the scene.
   * @property {string} frameRate A floating-point value (in an NSNumber object) for the frame rate of the scene.
   * @property {string} startTime A floating-point value (in an NSNumber object) for the start time of the scene.
   * @property {string} upAxis An SCNVector3 structure (in an NSValue object) specifying the orientation of the scene.
   * @see https://developer.apple.com/reference/scenekit/scnscene.attribute
   */
  static get Attribute() {
    return _Attribute
  }

}
