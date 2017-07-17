'use strict'

import SCNGeometry from './SCNGeometry'
//import SCNChamferMode from './SCNChamferMode'

/**
 * A geometry based on a two-dimensional path, optionally extruded to create a three-dimensional object.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/documentation/scenekit/scnshape
 */
export default class SCNShape extends SCNGeometry {
  // Creating a Shape

  /**
   * Creates a shape geometry with the specified path and extrusion depth.
   * @access public
   * @constructor
   * @param {?UIBezierPath} path - The two-dimensional path forming the basis of the shape.
   * @param {number} extrusionDepth - The thickness of the extruded shape along the z-axis.
   * @desc SceneKit determines the filled area of the path using the even-odd winding rule (see Winding Rules in Cocoa Drawing Guide) and extrudes this area to create a three-dimensional geometry. The result of extruding a self-intersecting path is undefined.The extruded shape is centered at the zero point of its z-axis. For example, an extrusion depth of 1.0 creates a shape that extends from -0.5 to 0.5 along the z-axis. An extrusion depth of zero creates a flat, one-sided shape.The path’s flatness (see flatness in NSBezierPath) determines the level of detail SceneKit uses in building a three-dimensional shape from the path. A larger flatness value results in fewer polygons to render, increasing performance, and a smaller flatness value increases the smoothness of curves at a cost to performance.
   * @see https://developer.apple.com/documentation/scenekit/scnshape/1523432-init
   */
  constructor(path, extrusionDepth) {
    super()

    // Modifying a Shape

    /**
     * The thickness of the extruded shape along the z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnshape/1523365-extrusiondepth
     */
    this.extrusionDepth = 0

    /**
     * The two-dimensional path forming the basis of the shape.
     * @type {?UIBezierPath}
     * @see https://developer.apple.com/documentation/scenekit/scnshape/1523434-path
     */
    this.path = null


    // Chamfering a Shape

    /**
     * A constant specifying which ends of the extruded shape’s profile are chamfered.
     * @type {SCNChamferMode}
     * @see https://developer.apple.com/documentation/scenekit/scnshape/1523989-chamfermode
     */
    this.chamferMode = null

    /**
     * A path that determines the cross-sectional contour of each chamfered edge.
     * @type {?UIBezierPath}
     * @see https://developer.apple.com/documentation/scenekit/scnshape/1522865-chamferprofile
     */
    this.chamferProfile = null

    /**
     * The width or depth of each chamfered edge. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnshape/1524145-chamferradius
     */
    this.chamferRadius = 0
  }
}
