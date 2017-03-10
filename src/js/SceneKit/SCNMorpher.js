'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNGeometry from './SCNGeometry'
import SCNMorpherCalculationMode from './SCNMorpherCalculationMode'


/**
 * An object that manages smooth transitions between a node's base geometry and one or more target geometries.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/reference/scenekit/scnmorpher
 */
export default class SCNMorpher extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Specifying Morph Targets

    /**
     * The array of target geometries to morph between.
     * @type {SCNGeometry[]}
     * @see https://developer.apple.com/reference/scenekit/scnmorpher/1523572-targets
     */
    this.targets = []

    /**
     * @type {number[]}
     */
    this._weights = []

    // Changing Interpolation Mode

    /**
     * The interpolation formula for blending between target geometries.
     * @type {SCNMorpherCalculationMode}
     * @see https://developer.apple.com/reference/scenekit/scnmorpher/1523754-calculationmode
     */
    this.calculationMode = SCNMorpherCalculationMode.normalized
  }

  // Blending between Morph Targets

  /**
   * Returns the weight value for the specified target index.
   * @access public
   * @param {number} targetIndex - The index of a geometry in the morpher’s targets array.
   * @returns {number} - 
   * @desc Target geometries and their weights determine the current form of the surface produced by the morpher. For example, if a morpher has one target whose weight is 0.5, the form of the resulting surface will be halfway between those of the base geometry and the target geometry.
   * @see https://developer.apple.com/reference/scenekit/scnmorpher/1522940-weight
   */
  weightForTargetAt(targetIndex) {
    return this._weights[targetIndex]
  }

  /**
   * Specifies a weight value at a specified target index.
   * @access public
   * @param {number} weight - A number specifying the contribution of the target geometry to the blended surface, generally between 0.0 and 1.0.
   * @param {number} targetIndex - The index of a geometry in the morpher’s targets array.
   * @returns {void}
   * @desc Target geometries and their weights determine the current form of the surface produced by the morpher. For example, if a morpher has one target whose weight is 0.5, the form of the resulting surface will be halfway between those of the base geometry and the target geometry.You can also animate weights implicitly or explicitly using the keypath weights[index], where index corresponds to the targetIndex parameter of this method.
   * @see https://developer.apple.com/reference/scenekit/scnmorpher/1522886-setweight
   */
  setWeightForTargetAt(weight, targetIndex) {
    this.weights[targetIndex] = weight
  }
}
