'use strict'

import SCNVector3 from './SCNVector3'


/**
 * Properties for measuring an object's location and size, expressed as either a box or a sphere.
 * @interface
 * @see https://developer.apple.com/reference/scenekit/scnboundingvolume
 */
export default class SCNBoundingVolume {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Working with Bounding Volumes

    /**
     * The minimum and maximum corner points of the object’s bounding box.
     * @type {{min: SCNVector3, max: SCNVector3}}
     * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034705-boundingbox
     */
    this.boundingBox = null

    this._boundingSphere = null
  }

  // Working with Bounding Volumes
  /**
   * The center point and radius of the object’s bounding sphere.
   * @type {{center: SCNVector3, radius: number}}
   * @desc Scene Kit defines a bounding sphere in the local coordinate space using a center point and a radius. For example, if a node’s bounding sphere has the center point {3, 1, 4} and radius 2.0, all points in the vertex data of node’s geometry (and any geometry attached to its child nodes) lie within 2.0 units of the center point.The coordinates provided when reading this property are valid only if the object has a volume to be measured. For a geometry containing no vertex data or a node containing no geometry (and whose child nodes, if any, contain no geometry), the values center and radius are both zero.
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034707-boundingsphere
   */
  get boundingSphere() {
    return this._boundingSphere
  }
}
