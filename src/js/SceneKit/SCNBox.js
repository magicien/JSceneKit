'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometrySource from './SCNGeometrySource'
import SCNGeometryElement from './SCNGeometryElement'

/**
 * A six-sided polyhedron geometry whose faces are all rectangles, optionally with rounded edges and corners.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnbox
 */
export default class SCNBox extends SCNGeometry {
  /**
   * Creates a box geometry with the specified width, height, length, and chamfer radius.
   * @access public
   * @constructor
   * @param {number} [width = 1.0] - The width of the box along the x-axis of its local coordinate space.
   * @param {number} [height = 1.0] - The height of the box along the y-axis of its local coordinate space.
   * @param {number} [length = 1.0] - The length of the box along the z-axis of its local coordinate space.
   * @param {number} [chamferRadius = 0.0] - The radius of curvature for the edges and corners of the box.
   * @desc The box is centered in its local coordinate system. For example, if you create a box whose width, height and length are all 10.0, it extends from -5.0 to 5.0 along in each of the x-, y-, and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scnbox/1522620-init
   */
  constructor(width = 1.0, height = 1.0, length = 1.0, chamferRadius = 0.0) {
    const source = new SCNGeometrySource()
    const element = new SCNGeometryElement()

    super([source], [element])


    // Adjusting a Box’s Dimensions

    /**
     * The extent of the box along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523898-width
     */
    this.width = width

    /**
     * The extent of the box along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1522901-height
     */
    this.height = height

    /**
     * The extent of the box along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523514-length
     */
    this.length = length


    // Configuring Box Properties

    /**
     * The number of subdivisions in each face of the box along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523559-widthsegmentcount
     */
    this.widthSegmentCount = 1

    /**
     * The number of subdivisions in each face of the box along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1522869-heightsegmentcount
     */
    this.heightSegmentCount = 1

    /**
     * The number of subdivisions in each face of the box along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523721-lengthsegmentcount
     */
    this.lengthSegmentCount = 1


    // Adding Rounded Edges and Corners

    /**
     * The radius of curvature for the edges and corners of the box. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523302-chamferradius
     */
    this.chamferRadius = chamferRadius

    /**
     * The number of line segments used to create each rounded edge of the box. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1522976-chamfersegmentcount
     */
    this.chamferSegmentCount = 10

    this._createGeometry()
  }

  _createGeometry() {
    // TODO: implement
  }
}
