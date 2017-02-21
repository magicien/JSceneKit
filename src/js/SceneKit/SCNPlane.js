'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A rectangular, one-sided plane geometry of specified width and height.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnplane
 */
export default class SCNPlane extends SCNGeometry {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Adjusting a Plane’s Dimensions

    /**
     * The extent of the plane along its horizontal axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1523782-width
     */
    this.width = 0

    /**
     * The extent of the plane along its vertical axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1522837-height
     */
    this.height = 0


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions in the plane’s surface along its horizontal axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1523991-widthsegmentcount
     */
    this.widthSegmentCount = 0

    /**
     * The number of subdivisions in the plane’s surface along its vertical axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1522889-heightsegmentcount
     */
    this.heightSegmentCount = 0


    // Adding Rounded Corners

    /**
     * The radius of curvature for the plane’s corners. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1523005-cornerradius
     */
    this.cornerRadius = 0

    /**
     * The number of line segments used to create each rounded corner of the plane. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1524234-cornersegmentcount
     */
    this.cornerSegmentCount = 0

  }

  // Creating a Plane

  /**
   * Creates a plane geometry with the specified width and height.
   * @access public
   * @param {number} width - The width of the plane along the x-axis of its local coordinate space.
   * @param {number} height - The height of the plane along the y-axis of its local coordinate space.
   * @returns {void}
   * @desc The plane is centered in its local coordinate system. For example, if you create a plane whose width and height are both 10.0, it extends from -5.0 to 5.0 along both the x- and y-axes, and the z-coordinate of all points in the plane is zero.
   * @see https://developer.apple.com/reference/scenekit/scnplane/1523631-init
   */
  init(width, height) {
  }
}
