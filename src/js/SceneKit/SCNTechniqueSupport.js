'use strict'

import SCNTechnique from './SCNTechnique'


/**
 * The common interface for SceneKit objects that support multipass rendering using SCNTechnique objects.
 * @interface
 * @see https://developer.apple.com/reference/scenekit/scntechniquesupport
 */
export default class SCNTechniqueSupport {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Specifying a Technique

    /**
     * Required. The technique SceneKit uses when rendering the object.
     * @type {?SCNTechnique}
     * @see https://developer.apple.com/reference/scenekit/scntechniquesupport/1520496-technique
     */
    this.technique = null

  }
}
