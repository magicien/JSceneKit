'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A torus, or ring-shaped geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scntorus
 */
export default class SCNTorus extends SCNGeometry {
  // Creating a Torus

  /**
   * Creates a torus geometry with the specified ring radius and pipe radius.
   * @access public
   * @constructor
   * @param {number} ringRadius - The major radius of the torus, defining its circular ring in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} pipeRadius - The minor radius of the torus, defining the pipe that encircles the ring.
   * @desc The torus is centered in its local coordinate system. For example, if you create a torus whose ring radius is 5.0 and pipe radius is 1.0, it extends from -6.0 to 6.0 (with a hole through the center from -4.0 to 4.0) in the x- and z-axes and from -1.0 to 1.0 in the y-axis.
   * @see https://developer.apple.com/reference/scenekit/scntorus/1523833-init
   */
  constructor(ringRadius, pipeRadius) {
    super()

    // Adjusting a Torus’ Dimensions

    /**
     * The major radius of the torus, defining a circle in the x- and z-axis dimensions. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1522906-ringradius
     */
    this.ringRadius = 0

    /**
     * The minor radius of the torus, defining the pipe that encircles the torus ring. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1522623-piperadius
     */
    this.pipeRadius = 0


    // Configuring Torus Properties

    /**
     * The number of subdivisions around the torus ring. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1523598-ringsegmentcount
     */
    this.ringSegmentCount = 0

    /**
     * The number of subdivisions around the torus pipe. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1522807-pipesegmentcount
     */
    this.pipeSegmentCount = 0
  }
}
