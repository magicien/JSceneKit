'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * An infinite plane that can optionally display a reflection of the scene above it.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnfloor
 */
export default class SCNFloor extends SCNGeometry {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Adding Reflections to a Floor

    /**
     * The intensity of the scene’s reflection on the floor. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1524175-reflectivity
     */
    this.reflectivity = 0

    /**
     * The distance from the floor at which scene contents are no longer reflected. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1522781-reflectionfalloffend
     */
    this.reflectionFalloffEnd = 0

    /**
     * The distance from the floor at which scene contents are reflected at full intensity. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1524237-reflectionfalloffstart
     */
    this.reflectionFalloffStart = 0

    /**
     * The resolution scale factor of the offscreen buffer that SceneKit uses to render reflections.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1522809-reflectionresolutionscalefactor
     */
    this.reflectionResolutionScaleFactor = 0


    // Instance Properties

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/2091890-length
     */
    this.length = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1845281-reflectioncategorybitmask
     */
    this.reflectionCategoryBitMask = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1845280-width
     */
    this.width = 0

  }
}
