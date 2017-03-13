'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A right rectangular pyramid geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnpyramid
 */
export default class SCNPyramid extends SCNGeometry {
  // Creating a Pyramid

  /**
   * Creates a pyramid geometry with the specified width, height, and length.
   * @access public
   * @constructor
   * @param {number} width - The width of the pyramid along the x-axis of its local coordinate space.
   * @param {number} height - The height of the pyramid along the y-axis of its local coordinate space.
   * @param {number} length - The length of the pyramid along the z-axis of its local coordinate space.
   * @desc The pyramid’s base is centered in its local coordinate system. For example, if you create a pyramid whose width, height and length are all 10.0, its apex is at the point {0, 10.0, 0}, and its base lies in the plane whose y-coordinate is 0.0, extending from -5.0 to 5.0 along both the x- and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scnpyramid/1523254-init
   */
  constructor(width, height, length) {
    super()

    // Adjusting a Pyramid’s Dimensions

    /**
     * The extent of the pyramid along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1522613-width
     */
    this.width = 0

    /**
     * The extent of the pyramid along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1522805-height
     */
    this.height = 0

    /**
     * The extent of the pyramid along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1524203-length
     */
    this.length = 0


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions in each face of the pyramid along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1523083-widthsegmentcount
     */
    this.widthSegmentCount = 0

    /**
     * The number of subdivisions in each face of the pyramid along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1524059-heightsegmentcount
     */
    this.heightSegmentCount = 0

    /**
     * The number of subdivisions in each face of the pyramid along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1524227-lengthsegmentcount
     */
    this.lengthSegmentCount = 0

  }
}
