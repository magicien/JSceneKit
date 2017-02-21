'use strict'

import SCNNode from './SCNNode'
import SCNReferenceLoadingPolicy from './SCNReferenceLoadingPolicy'


/**
 * A scene graph node that serves as a placeholder for content to be loaded from a separate scene file. 
 * @access public
 * @extends {SCNNode}
 * @see https://developer.apple.com/reference/scenekit/scnreferencenode
 */
export default class SCNReferenceNode extends SCNNode {

  // Creating a Reference Node

  /**
   * Initializes a node whose content is to be loaded from the referenced URL.
   * @access public
   * @param {string} referenceURL - The URL to a scene file from which to load the node’s content.
   * @returns {void}
   * @desc Using this initializer does not load the node’s content. To load content from the referenced URL, use the load() method.
   * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1523967-init
   */
  initUrl(referenceURL) {

    // Loading and Unloading a Reference Node’s Content

    /**
     * The URL to a scene file from which to load content for the reference node.
     * @type {string}
     * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1522733-referenceurl
     */
    this.referenceURL = ''

    /**
     * An option for whether to load the node’s content automatically.
     * @type {SCNReferenceLoadingPolicy}
     * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1522996-loadingpolicy
     */
    this.loadingPolicy = null

    this._isLoaded = false
  }

  // Loading and Unloading a Reference Node’s Content

  /**
   * Loads content into the node from its referenced external scene file.
   * @access public
   * @returns {void}
   * @desc When SceneKit loads the referenced scene file, all children of the scene file’s root node become children of the reference node.If the node has already been loaded (either automatically, according to the loadingPolicy property, or through a previous call to this method), calling this method has no effect.
   * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1523204-load
   */
  load() {
  }

  /**
   * Removes the node’s children and marks the node as not loaded.
   * @access public
   * @returns {void}
   * @desc Calling this method does not necessarily unload any content associated with the node’s child nodes from memory—it merely removes them from the scene graph. The unlinked nodes and their content are then subject to normal object memory management rules. Under ARC, those objects are deallocated if and only if they are not referenced from elsewhere in your program.
   * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1523566-unload
   */
  unload() {
  }
  /**
   * A Boolean value that indicates whether the reference node has already loaded its content.
   * @type {boolean}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1523906-isloaded
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
   * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1524061-init
   */
  initCoder(aDecoder) {

    // Loading and Unloading a Reference Node’s Content

    /**
     * The URL to a scene file from which to load content for the reference node.
     * @type {string}
     * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1522733-referenceurl
     */
    this.referenceURL = ''

    /**
     * An option for whether to load the node’s content automatically.
     * @type {SCNReferenceLoadingPolicy}
     * @see https://developer.apple.com/reference/scenekit/scnreferencenode/1522996-loadingpolicy
     */
    this.loadingPolicy = null

    this._isLoaded = false
  }
}
