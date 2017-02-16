'use strict'

/**
 * SCNScene class
 * @access public
 */
export default class SCNScene {
  /**
   *
   * @access public
   * @constructor
   */
  constructor() {
    /**
     * @type {number}
     * 
     */
    this.frameRate = 0

    /**
     * @type {number}
     *
     */
    this.endTime = 0

    /**
     * @type {number}
     *
     */
    this.startTime = 0

    /**
     * @type {boolean}
     *
     */
    this.isPaused = false

    /**
     * @type {Color}
     *
     */
    this.fogColor = null

    /**
     * @type {number}
     *
     */
    this.fogDensityExponent = 0

    /**
     * @type {number}
     *
     */
    this.fogEndDistance = 0

    /**
     * @type {number}
     *
     */
    this.fogStartDistance = 0

    /**
     * @type {SCNMaterialProperty}
     *
     */
    this.lightingEnvironment = null

    /**
     * @type {SCNMaterialProperty}
     *
     */
    this.background = null

    /**
     * @type {SCNPhysicsWorld}
     *
     */
    this.physicsWorld = null

    /**
     * @type {SCNNode}
     *
     */
    this.rootNode = null

    /**
     * @type {array}
     *
     */
    this.particleSystems = null
  }

  /**
   * Creates a scene from the specified Model I/O asset.
   * @access public
   * @param {MDLAsset} mdlAsset - A Model I/O asset object.
   * @returns {SCNScene} - A new scene object.
   * 
   */
  static sceneWithMDLAsset(asset) {
  }

  static sceneWithURLOptionsError(url, options, error) {
  }

  static sceneNamedInDirectoryOptions(name, directory, options) {
  }

  static sceneNamed(name) {
  }

  static scene() {
    return new SCNScene()
  }

  valueForKeyPath(path) {
  }

  valueForKey(key) {
  }

  setValueForKey(value, key) {
  }

  setValueForKeyPath(value, keyPath) {
  }

  writeToURLOptionsDelegateProgressHandler(url, options, delegate, progressHandler) {
  }

  setAttributeForKey(attribute, key) {
  }

  attributeForKey(key) {
  }

  removeParticleSystem(particleSystem) {
  }

  removeAllParticleSystems() {
  }

  addParticleSystemWithTransform(particleSystem, transform) {
  }
}

