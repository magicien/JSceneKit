'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A right circular cylinder geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scncylinder
 */
export default class SCNCylinder extends SCNGeometry {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Adjusting a Cylinder’s Dimensions

    /**
     * The radius of the cylinder’s circular cross section. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncylinder/1522674-radius
     */
    this.radius = 0

    /**
     * The extent of the cylinder along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncylinder/1523678-height
     */
    this.height = 0


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the circumference of the cylinder. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncylinder/1524002-radialsegmentcount
     */
    this.radialSegmentCount = 0

    /**
     * The number of subdivisions in the sides of the cylinder along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncylinder/1523330-heightsegmentcount
     */
    this.heightSegmentCount = 0

  }

  // Creating a Cylinder

  /**
   * Creates a cylinder geometry with the specified radius and height.
   * @access public
   * @param {number} radius - The radius of the cylinder’s circular cross section in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} height - The height of the cylinder along the y-axis of its local coordinate space.
   * @returns {void}
   * @desc The cylinder is centered in its local coordinate system. For example, if you create a cylinder whose radius is 5.0 and height is 10.0, its circular cross section extends from -5.0 to 5.0 along the x- and z-axes, and the y-coordinates of its base and top are -5.0 and 5.0, respectively.
   * @see https://developer.apple.com/reference/scenekit/scncylinder/1523685-init
   */
  init(radius, height) {
  }
}
