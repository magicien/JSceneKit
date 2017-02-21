'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A right circular cone or frustum geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scncone
 */
export default class SCNCone extends SCNGeometry {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Adjusting a Cone’s Dimensions

    /**
     * The radius of the cone’s circular top. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1524240-topradius
     */
    this.topRadius = 0

    /**
     * The radius of the cone’s circular base. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1523198-bottomradius
     */
    this.bottomRadius = 0

    /**
     * The extent of the cylinder along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1523219-height
     */
    this.height = 0


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the circumference of the cone. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1523942-radialsegmentcount
     */
    this.radialSegmentCount = 0

    /**
     * The number of subdivisions in the sides of the cone along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1524113-heightsegmentcount
     */
    this.heightSegmentCount = 0

  }

  // Creating a Cone

  /**
   * Creates a cone geometry with the given top radius, bottom radius, and height.
   * @access public
   * @param {number} topRadius - The radius of the cone’s top, forming a circle in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} bottomRadius - The radius of the cone’s base, forming a circle in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} height - The height of the cone along the y-axis of its local coordinate space.
   * @returns {void}
   * @desc The cone is centered in its local coordinate system. For example, if you create a cone whose bottom radius is 5.0, top radius is 0.0, and height is 10.0, its apex is at the point {0, 5.0, 0}, and its base lies in the plane whose y-coordinate is -5.0, extending from -5.0 to 5.0 along both the x- and z-axes.Pass zero for topRadius or bottomRadius or parameter to create a cone whose sides taper to a single point, or a different value to create a frustum with a circular top.
   * @see https://developer.apple.com/reference/scenekit/scncone/1522863-init
   */
  init(topRadius, bottomRadius, height) {
  }
}
