'use strict'

import GKComponent from './GKComponent'

/**
 * 
 * @access public
 * @extends {GKComponent}
 * @see https://developer.apple.com/documentation/gameplaykit/gkscnnodecomponent
 */
export default class GKSCNNodeComponent extends GKComponent {

  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {SCNNode} node - 
   * @see https://developer.apple.com/documentation/gameplaykit/gkscnnodecomponent/2873248-init
   */
  constructor(node) {
    super()

    // Instance Properties

    this._node = node
  }

  // Instance Properties

  /**
   * 
   * @type {SCNNode}
   * @desc 
   * @see https://developer.apple.com/documentation/gameplaykit/gkscnnodecomponent/2873245-node
   */
  get node() {
    return this._node
  }
}
