'use strict'

import SCNGeometry from './SCNGeometry'
import SCNVector3 from './SCNVector3'
/*global Ammo*/


/**
 * A right circular cylinder geometry whose ends are capped with hemispheres.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scncapsule
 */
export default class SCNCapsule extends SCNGeometry {
  // Creating a Capsule

  /**
   * Creates a capsule geometry with the specified radius and height.
   * @access public
   * @constructor
   * @param {number} capRadius - The radius both of the capsule’s cylindrical body and of its hemispherical ends.
   * @param {number} height - The height of the capsule along the y-axis of its local coordinate space.
   * @desc The capsule is centered in its local coordinate system. For example, if you create a capsule whose cap radius is 5.0 and height is 20.0, it extends from -10.0 to 10.0 in the y-axis, and the circular cross section at the center of its body extends from -5.0 to 5.0 along the x- and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scncapsule/1523790-init
   */
  constructor(capRadius, height) {
    super()

    // Adjusting a Capsule’s Dimensions

    /**
     * The radius both of the capsule’s circular center cross section and of its hemispherical ends. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1523926-capradius
     */
    this.capRadius = capRadius

    /**
     * The extent of the capsule along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncapsule/1522789-height
     */
    this.height = height


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

  /**
   * @access private
   * @returns {Ammo.btCollisionShape}
   * @desc call Ammo.destroy(shape) after using it.
   */
  _createBtCollisionShape() {
    //const height = (this.height - this.capRadius) * 0.5
    //const shape = new Ammo.btCapsuleShape(this.capRadius, height)
    //return shape
  }

  /**
   * The center point and radius of the object’s bounding sphere.
   * @type {Object}
   * @parameter {SCNVector3} _boundingSphere.center -
   * @parameter {number} _boundingSphere.radius -
   * @returns {Object} -
   * @desc Scene Kit defines a bounding sphere in the local coordinate space using a center point and a radius. For example, if a node’s bounding sphere has the center point {3, 1, 4} and radius 2.0, all points in the vertex data of node’s geometry (and any geometry attached to its child nodes) lie within 2.0 units of the center point.The coordinates provided when reading this property are valid only if the object has a volume to be measured. For a geometry containing no vertex data or a node containing no geometry (and whose child nodes, if any, contain no geometry), the values center and radius are both zero.
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034707-boundingsphere
   */
  getBoundingSphere() {
    const c = new SCNVector3(0, 0, 0)
    const r = this.height * 0.5

    return { center: c, radius: r }
  }
}
