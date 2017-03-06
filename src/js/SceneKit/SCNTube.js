'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A tube or pipe geometry—a right circular cylinder with a circular hole along its central axis.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scntube
 */
export default class SCNTube extends SCNGeometry {
  // Creating a Tube

  /**
   * Creates a tube geometry with the specified inner radius, outer radius, and height.
   * @access public
   * @constructor
   * @param {number} innerRadius - The radius of the tube’s circular central hole in the x- and z-axes of its local coordinate space.
   * @param {number} outerRadius - The radius of the tube’s circular cross section in the x- and z-axes of its local coordinate space.
   * @param {number} height - The height of the tube along the y-axis of its local coordinate space.
   * @desc The tube is centered in its local coordinate system. For example, if you create a tube whose outer radius is 5.0, inner radius is 1.0, and height is 10.0, its circular cross section extends from -5.0 to 5.0 along the x- and z-axes, the y-coordinates of its base and top are -5.0 and 5.0, and the hole through its center extends from -0.5 to 0.5 along the x- and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scntube/1522843-init
   */
  constructor(innerRadius, outerRadius, height) {
    super()

    // Adjusting a Tube’s Dimensions

    /**
     * The radius of the tube’s outer circular cross section. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntube/1523270-outerradius
     */
    this.outerRadius = 0

    /**
     * The radius of the circular hole through the tube. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntube/1524070-innerradius
     */
    this.innerRadius = 0

    /**
     * The extent of the tube along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntube/1522640-height
     */
    this.height = 0


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the circumference of the tube. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntube/1523619-radialsegmentcount
     */
    this.radialSegmentCount = 0

    /**
     * The number of subdivisions in the inner and outer surfaces of the tube along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntube/1523080-heightsegmentcount
     */
    this.heightSegmentCount = 0

  }
}
