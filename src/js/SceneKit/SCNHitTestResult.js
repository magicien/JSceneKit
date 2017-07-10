'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNNode from './SCNNode'
import SCNVector3 from './SCNVector3'
import SCNMatrix4 from './SCNMatrix4'
import CGPoint from '../CoreGraphics/CGPoint'


/**
 * Detailed information about a result from searching for elements of a scene located at a specified point, or along a specified line segment (or ray).
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnhittestresult
 */
export default class SCNHitTestResult extends NSObject {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Retrieving Information About a Hit-Test Result

    this._node = null
    this._geometryIndex = 0
    this._faceIndex = 0
    this._localCoordinates = null
    this._worldCoordinates = null
    this._localNormal = null
    this._worldNormal = null
    this._modelTransform = null

    // Instance Properties

    this._boneNode = null
  }

  // Retrieving Information About a Hit-Test Result

  /**
   * Returns the texture coordinates at the point of intersection for the specified texture mapping channel.
   * @access public
   * @param {number} channel - The index of the mapping channel in which to look up texture coordinates.
   * @returns {CGPoint} - 
   * @desc An SCNGeometry object can contain multiple sources of texture coordinates, or texture mapping channels. (With multiple channels, you can map texture images for different material properties in different ways.) To use the texture coordinates of a hit-test result, specify which texture coordinate source to look up coordinates in. For example, to add “scorch marks” to a game character hit by a laser, you might modify a texture image mapped to the multiply property of the geometry’s material. Use the mappingChannel index from that material property as the channel parameter when calling textureCoordinates(withMappingChannel:) to ensure that you modify the correct location in the texture image.
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1522771-texturecoordinates
   */
  textureCoordinatesWithMappingChannel(channel) {
    return null
  }

  /**
   * The node whose geometry intersects the search ray.
   * @type {SCNNode}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1523256-node
   */
  get node() {
    return this._node
  }

  /**
   * The index of the geometry element whose surface the search ray intersects.
   * @type {number}
   * @desc Every SCNGeometry object contains one or more SCNGeometryElement objects that define how its vertices connect to form a surface. This property provides the index of the geometry element intersecting the search ray. For more information about that geometry element, use the geometry’s geometryElement(at:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1522625-geometryindex
   */
  get geometryIndex() {
    return this._geometryIndex
  }

  /**
   * The index of the primitive in the geomety element intersected by the search ray.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1522888-faceindex
   */
  get faceIndex() {
    return this._faceIndex
  }

  /**
   * The point of intersection between the geometry and the search ray, in the local coordinate system of the node containing the geometry.
   * @type {SCNVector3}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1523032-localcoordinates
   */
  get localCoordinates() {
    return this._localCoordinates
  }

  /**
   * The point of intersection between the geometry and the search ray, in the scene’s world coordinate system.
   * @type {SCNVector3}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1523058-worldcoordinates
   */
  get worldCoordinates() {
    return this._worldCoordinates
  }

  /**
   * The surface normal vector at the point of intersection, in the local coordinate system of the node containing the geometry intersected by the search ray.
   * @type {SCNVector3}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1523953-localnormal
   */
  get localNormal() {
    return this._localNormal
  }

  /**
   * The surface normal vector at the point of intersection, in the scene’s world coordinate system.
   * @type {SCNVector3}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1524066-worldnormal
   */
  get worldNormal() {
    return this._worldNormal
  }

  /**
   * The world transform matrix of the node containing the intersection.
   * @type {SCNMatrix4}
   * @desc Use this matrix to transform vectors from the local coordinate space of the node whose geometry is intersected by the search ray to the scene’s world coordinate system.
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1523496-modeltransform
   */
  get modelTransform() {
    return this._modelTransform
  }

  // Instance Properties

  /**
   * 
   * @type {SCNNode}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnhittestresult/1823463-bonenode
   */
  get boneNode() {
    return this._boneNode
  }
}
