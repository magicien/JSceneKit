'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A right circular cylinder geometry whose ends are capped with hemispheres.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scncapsule
 */
export default class SCNCapsule extends SCNGeometry {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Adjusting a Capsule’s Dimensions

    /**
     * The radius both of the capsule’s circular center cross section and of its hemispherical ends. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1523926-capradius
     */
    this.capRadius = 0

    /**
     * The extent of the capsule along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1522789-height
     */
    this.height = 0


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the lateral circumference of the capsule. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1522735-radialsegmentcount
     */
    this.radialSegmentCount = 0

    /**
     * The number of subdivisions in the height of each hemispherical end of the capsule. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1523561-capsegmentcount
     */
    this.capSegmentCount = 0

    /**
     * The number of subdivisions in the sides of the capsule along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1523697-heightsegmentcount
     */
    this.heightSegmentCount = 0

  }

  // Creating a Capsule

  /**
   * Creates a capsule geometry with the specified radius and height.
   * @access public
   * @param {number} capRadius - The radius both of the capsule’s cylindrical body and of its hemispherical ends.
   * @param {number} height - The height of the capsule along the y-axis of its local coordinate space.
   * @returns {void}
   * @desc The capsule is centered in its local coordinate system. For example, if you create a capsule whose cap radius is 5.0 and height is 20.0, it extends from -10.0 to 10.0 in the y-axis, and the circular cross section at the center of its body extends from -5.0 to 5.0 along the x- and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scncapsule/1523790-init
   */
  init(capRadius, height) {
  }
}
