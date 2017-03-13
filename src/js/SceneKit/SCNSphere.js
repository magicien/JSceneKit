'use strict'

import SCNGeometry from './SCNGeometry'


/**
 * A sphere (or ball or globe) geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnsphere
 */
export default class SCNSphere extends SCNGeometry {
  // Creating a Sphere

  /**
   * Creates a sphere geometry with the specified radius.
   * @access public
   * @constructor
   * @param {number} radius - The radius of the sphere in its local coordinate space.
   * @desc The sphere is centered in its local coordinate system. For example, if you create a sphere whose radius is 5.0, it extends from -5.0 to 5.0 along each of the the x, y, and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scnsphere/1522601-init
   */
  constructor(radius) {
    super()

    // Adjusting a Sphere’s Dimensions

    /**
     * The radius of the sphere. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnsphere/1523787-radius
     */
    this.radius = radius

    // Adjusting Geometric Detail

    /**
     * A Boolean value specifying whether SceneKit uses a geodesic polygon mesh to render the sphere.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnsphere/1523268-isgeodesic
     */
    this.isGeodesic = false

    /**
     * A number determining the detail of the polygon mesh SceneKit uses to render the sphere. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnsphere/1523912-segmentcount
     */
    this.segmentCount = 0
  }
}
