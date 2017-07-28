'use strict'

import SCNNode from './SCNNode'
import SCNReferenceLoadingPolicy from './SCNReferenceLoadingPolicy'
import SCNScene from './SCNScene'

/**
 * A scene graph node that serves as a placeholder for content to be loaded from a separate scene file. 
 * @access public
 * @extends {SCNNode}
 * @see https://developer.apple.com/documentation/scenekit/scnreferencenode
 */
export default class SCNReferenceNode extends SCNNode {
  static get _propTypes() {
    return {
      paused: ['boolean', 'isPaused'],
      scale: ['SCNVector3', '_scale'],
      rotation: ['SCNVector4', '_rotation'],
      orientation: ['SCNVector4', (obj, value) => {
        obj.orientation = value
      }],
      position: ['SCNVector3', '_position'],
      loadingPolicy: 'integer',
      referenceURL: ['NSURL', (obj, value) => {
        obj.referenceURL = value
        obj.load()
      }],
      opacity: ['float', '_opacity'],
      castsShadow: 'boolean',
      categoryBitMask: 'integer',
      hidden: ['boolean', 'isHidden'],
      name: 'string',
      renderingOrder: 'integer',
      movabilityHint: 'integer',

      clientAttributes: ['NSMutableDictionary', null],
      overrides: ['NSObject', null] // what is this?
    }
  }

  // Creating a Reference Node

  /**
   * Initializes a node whose content is to be loaded from the referenced URL.
   * @access public
   * @constructor
   * @param {string} referenceURL - The URL to a scene file from which to load the node’s content.
   * @desc Using this initializer does not load the node’s content. To load content from the referenced URL, use the load() method.
   * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1523967-init
   */
  constructor(referenceURL) {
    super()

    /**
     * @access private
     * @type {boolean}
     */
    this._isLoading = false

    /**
     * @access private
     * @type {boolean}
     */
    this._isLoaded = false

    // Loading and Unloading a Reference Node’s Content

    /**
     * An option for whether to load the node’s content automatically.
     * @type {SCNReferenceLoadingPolicy}
     * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1522996-loadingpolicy
     */
    this.loadingPolicy = null

    /**
     * The URL to a scene file from which to load content for the reference node.
     * @type {string}
     * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1522733-referenceurl
     */
    this._referenceURL = referenceURL

    this._scene = null

    if(referenceURL){
      this.load()
    }

    /**
     * @access private
     * @type {Promise}
     */
    this._loadedPromise = null
  }

  // Loading and Unloading a Reference Node’s Content

  /**
   * Loads content into the node from its referenced external scene file.
   * @access public
   * @returns {void}
   * @desc When SceneKit loads the referenced scene file, all children of the scene file’s root node become children of the reference node.If the node has already been loaded (either automatically, according to the loadingPolicy property, or through a previous call to this method), calling this method has no effect.
   * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1523204-load
   */
  load() {
    if(this._isLoaded || this._isLoading){
      return
    }
    if(!this._referenceURL){
      return
    }
    this._isLoading = true

    const promise = new Promise((resolve, reject) => {
      const scene = new SCNScene(this._referenceURL, null)
      scene.didLoad.then(() => {
        scene.rootNode.name = 'referenceRoot'
        super.addChildNode(scene.rootNode)
        this._scene = scene

        this._isLoaded = true
        this._isLoading = false
        resolve()
      }).catch(() => {
        reject()
      })
    })
    this._loadedPromise = promise.then(() => this._scene.didLoad)
  }

  /**
   * Removes the node’s children and marks the node as not loaded.
   * @access public
   * @returns {void}
   * @desc Calling this method does not necessarily unload any content associated with the node’s child nodes from memory—it merely removes them from the scene graph. The unlinked nodes and their content are then subject to normal object memory management rules. Under ARC, those objects are deallocated if and only if they are not referenced from elsewhere in your program.
   * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1523566-unload
   */
  unload() {
    if(!this._isLoaded){
      return
    }
    this.childNodes.forEach((child) => {
      child.removeFromParentNode()
    })
    this._isLoaded = false
    this._loadedPromise = null
  }

  /**
   * A Boolean value that indicates whether the reference node has already loaded its content.
   * @type {boolean}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1523906-isloaded
   */
  get isLoaded() {
    return this._isLoaded
  }

  // Initializers

  /**
   * 
   * @access public
   * @param {NSCoder} aDecoder - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnreferencenode/1524061-init
   */
  initCoder(aDecoder) {
  }

  get referenceURL() {
    return this._referenceURL
  }

  set referenceURL(newValue) {
    this.unload()
    this._referenceURL = newValue
    if(this.loadingPolicy === SCNReferenceLoadingPolicy.immediate){
      this.load()
    }
  }

  addChildNode(child) {
    throw new Error('cannot add a child node to SCNReferenceNode')
  }

  insertChildNodeAt(child, index) {
    throw new Error('cannot add a child node to SCNReferenceNode')
  }

  replaceChildNodeWith(oldChild, newChild) {
    throw new Error('cannot add a child node to SCNReferenceNode')
  }

  get childNodes() {
    // FIXME: needs synchronous loading
    if(!this._isLoaded){
      this.load()
    }
    return this._childNodes.slice(0)
  }

  /**
   * @access private
   * @returns {Promise} -
   */
  _getLoadedPromise() {
    if(this._loadedPromise){
      return this._loadedPromise
    }
    this.load()
    return this._loadedPromise
  }

  /**
   * @access public
   * @type {Promise} -
   */
  get didLoad() {
    return this._getLoadedPromise()
  }
}
