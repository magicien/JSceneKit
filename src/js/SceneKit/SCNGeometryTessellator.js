'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNTessellationSmoothingMode from './SCNTessellationSmoothingMode'
import MTLTessellationPartitionMode from '../Metal/MTLTessellationPartitionMode'

/**
 * 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator
 */
export default class SCNGeometryTessellator extends NSObject {

  /**
   * constructor
   * @constructor
   * @access public
   */
  constructor() {
    super()

    // Instance Properties

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889886-edgetessellationfactor
     */
    this.edgeTessellationFactor = 0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889878-insidetessellationfactor
     */
    this.insideTessellationFactor = 0

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889881-isadaptive
     */
    this.isAdaptive = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889879-isscreenspace
     */
    this.isScreenSpace = false

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889888-maximumedgelength
     */
    this.maximumEdgeLength = 0

    /**
     * 
     * @type {SCNTessellationSmoothingMode}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889889-smoothingmode
     */
    this.smoothingMode = SCNTessellationSmoothingMode.none

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889887-tessellationfactorscale
     */
    this.tessellationFactorScale = 0

    /**
     * 
     * @type {MTLTessellationPartitionMode}
     * @see https://developer.apple.com/documentation/scenekit/scngeometrytessellator/2889882-tessellationpartitionmode
     */
    this.tessellationPartitionMode = MTLTessellationPartitionMode.none

  }
}
