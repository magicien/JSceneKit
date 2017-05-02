'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNGeometry from './SCNGeometry'

/**
 * An object that defines alternate resolutions for a geometry that SceneKit can automatically substitute to improve rendering performance.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scnlevelofdetail
 */
export default class SCNLevelOfDetail extends NSObject {
  static get _propTypes() {
    return {
      mode: ['integer', null],
      threshold: ['float', null]
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Inspecting a Level of Detail

    this._geometry = null
    this._screenSpaceRadius = 0
    this._worldSpaceDistance = 0
  }

  // Creating a Level of Detail

  /**
   * Creates a level of detail with the specified geometry and threshold pixel radius.
   * @access public
   * @param {?SCNGeometry} geometry - The geometry to render for this level of detail.
   * @param {number} radius - The maximum radius (in pixels) of the geometry’s bounding sphere for this level of detail to appear.
   * @returns {void}
   * @desc When rendering a geometry with associated levels of detail, SceneKit calculates the radius in pixels of the circle covered by a geometry’s bounding sphere, then renders the geometry for the SCNLevelOfDetail object with the largest radius parameter smaller than that circle.If you pass nil for the geometry parameter, SceneKit renders no geometry for the level of detail. Creating a level-of-detail object with no geometry allows you to skip rendering costs entirely for an object when it would appear very far away or very small.
   * @see https://developer.apple.com/reference/scenekit/scnlevelofdetail/1523557-init
   */
  initScreenSpaceRadius(geometry, radius) {
  }

  /**
   * Creates a level of detail with the specified geometry and threshold camera distance.
   * @access public
   * @param {?SCNGeometry} geometry - The geometry to render for this level of detail, or nil if SceneKit should render no geometry at this level of detail.
   * @param {number} distance - The minimum distance from the current point of view for this level of detail to appear.
   * @returns {void}
   * @desc When rendering a geometry with associated levels of detail, SceneKit calculates the distance from the current point of view to the geometry’s parent node, then renders the geometry for the SCNLevelOfDetail object with the smallest distance parameter greater than that distance.If you pass nil for the geometry parameter, SceneKit renders no geometry for the level of detail. Creating a level-of-detail object with no geometry allows you to skip rendering costs entirely for an object when it would appear very far away or very small.
   * @see https://developer.apple.com/reference/scenekit/scnlevelofdetail/1522802-init
   */
  initWorldSpaceDistance(geometry, distance) {
  }

  // Inspecting a Level of Detail
  /**
   * The geometry associated with this level of detail.
   * @type {?SCNGeometry}
   * @desc SceneKit renders this geometry instead of the original geometry when the level of detail is appropriate. Generally, levels of detail with larger worldSpaceDistance values or smaller screenSpaceRadius values should contain less complex geometries.If the value of this property is nil, SceneKit renders no geometry at this level of detail.
   * @see https://developer.apple.com/reference/scenekit/scnlevelofdetail/1522819-geometry
   */
  get geometry() {
    return this._geometry
  }

  /**
   * The maximum radius (in pixels) of the geometry’s bounding sphere for this level of detail to appear.
   * @type {number}
   * @desc When rendering a geometry with associated levels of detail, SceneKit calculates the radius in pixels of the circle covered by a geometry’s bounding sphere, then renders the geometry for the SCNLevelOfDetail object with the smallest radius parameter larger than that circle.
   * @see https://developer.apple.com/reference/scenekit/scnlevelofdetail/1523554-screenspaceradius
   */
  get screenSpaceRadius() {
    return this._screenSpaceRadius
  }

  /**
   * The minimum distance from the current point of view for this level of detail to appear.
   * @type {number}
   * @desc When rendering a geometry with associated levels of detail, SceneKit calculates the distance from the current point of view to the geometry’s parent node, then renders the geometry for the SCNLevelOfDetail object with the largest distance parameter less than that distance.
   * @see https://developer.apple.com/reference/scenekit/scnlevelofdetail/1524159-worldspacedistance
   */
  get worldSpaceDistance() {
    return this._worldSpaceDistance
  }
}
