'use strict'

//import SCNScene from './SCNScene'

/**
 * A Core Animation layer that renders a SceneKit scene as its content.
 * @access public
 * @see https://developer.apple.com/documentation/scenekit/scnlayer
 */
export default class SCNLayer {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {

    // Specifying a Scene

    /**
     * The scene to be displayed in the layer.
     * @type {?SCNScene}
     * @see https://developer.apple.com/documentation/scenekit/scnlayer/1393188-scene
     */
    this.scene = null

  }
}
