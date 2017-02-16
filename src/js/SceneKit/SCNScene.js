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
   * @param {MDLAsset} asset - A Model I/O asset object.
   * @returns {SCNScene} - A new scene object.
   * 
   */
  static sceneWithMDLAsset(asset) {
    // TODO: implement
  }

  static sceneWithURLOptionsError(url, options, error) {
    // TODO: implement
  }

  static sceneNamedInDirectoryOptions(name, directory, options) {
    // TODO: implement
  }

  static sceneNamed(name) {
    // TODO: implement
  }

  static scene() {
    return new SCNScene()
  }

  valueForKeyPath(path) {
    // TODO: implement
  }

  valueForKey(key) {
    // TODO: implement
  }

  setValueForKey(value, key) {
    // TODO: implement
  }

  setValueForKeyPath(value, keyPath) {
    // TODO: implement
  }

  writeToURLOptionsDelegateProgressHandler(url, options, delegate, progressHandler) {
    // TODO: implement
  }

  setAttributeForKey(attribute, key) {
    // TODO: implement
  }

  attributeForKey(key) {
    // TODO: implement
  }

  removeParticleSystem(particleSystem) {
    // TODO: implement
  }

  removeAllParticleSystems() {
    // TODO: implement
  }

  addParticleSystemWithTransform(particleSystem, transform) {
    // TODO: implement
  }
}

