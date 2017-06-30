'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometrySource from './SCNGeometrySource'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'

/**
 * A rectangular, one-sided plane geometry of specified width and height.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnplane
 */
export default class SCNPlane extends SCNGeometry {
  static get _propTypes() {
    return {
      materials: 'NSArray',
      width: 'float',
      height: 'float',
      widthSegmentCount: 'integer',
      heightSegmentCount: 'integer',
      cornerRadius: 'float',
      cornerSegmentCount: 'integer',

      name: 'string',
      primitiveType: ['integer', null],
      subdivisionLevel: 'integer',
      subdivisionSettings: ['bytes', null]
    }
  }

  // Creating a Plane

  /**
   * Creates a plane geometry with the specified width and height.
   * @access public
   * @constructor
   * @param {number} width - The width of the plane along the x-axis of its local coordinate space.
   * @param {number} height - The height of the plane along the y-axis of its local coordinate space.
   * @desc The plane is centered in its local coordinate system. For example, if you create a plane whose width and height are both 10.0, it extends from -5.0 to 5.0 along both the x- and y-axes, and the z-coordinate of all points in the plane is zero.
   * @see https://developer.apple.com/reference/scenekit/scnplane/1523631-init
   */
  constructor(width = 1.0, height = 1.0) {
    super([], [])

    // Adjusting a Plane’s Dimensions

    /**
     * The extent of the plane along its horizontal axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1523782-width
     */
    this.width = width

    /**
     * The extent of the plane along its vertical axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1522837-height
     */
    this.height = height


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions in the plane’s surface along its horizontal axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1523991-widthsegmentcount
     */
    this.widthSegmentCount = 1

    /**
     * The number of subdivisions in the plane’s surface along its vertical axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1522889-heightsegmentcount
     */
    this.heightSegmentCount = 1


    // Adding Rounded Corners

    /**
     * The radius of curvature for the plane’s corners. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1523005-cornerradius
     */
    this.cornerRadius = 0

    /**
     * The number of line segments used to create each rounded corner of the plane. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnplane/1524234-cornersegmentcount
     */
    this.cornerSegmentCount = 10

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []
    const indexData = []

    // TODO: chamfer
    const wStep = 1.0 / this.widthSegmentCount
    for(let i=0; i<=this.heightSegmentCount; i++){
      const ty = i / this.heightSegmentCount
      const y = (-0.5 + ty) * this.height
      for(let j=0; j<=this.widthSegmentCount; j++){
        const tx = j / this.widthSegmentCount
        const x = (-0.5 + tx) * this.width

        sourceData.push(x, y, 0.0) // position
        sourceData.push(0.0, 0.0, 1.0) // normal
        sourceData.push(tx, ty) // texcoord
      }
    }

    const numSegments = this.widthSegmentCount * this.heightSegmentCount
    for(let i=0; i<numSegments; i++){
      const index = i * 4
      indexData.push(index, index + 3, index + 1)
      indexData.push(index, index + 2, index + 3)
    }

    const vectorCount = (this.widthSegmentCount + 1) * (this.heightSegmentCount + 1)

    const vertexSource = new SCNGeometrySource(
      sourceData, // data
      SCNGeometrySource.Semantic.vertex, // semantic
      vectorCount, // vectorCount
      true, // floatComponents
      3, // componentsPerVector
      4, // bytesPerComponent
      0, // offset
      32 // sride
    )

    const normalSource = new SCNGeometrySource(
      sourceData, // data
      SCNGeometrySource.Semantic.normal, // semantic
      vectorCount, // vectorCount
      true, // floatComponents
      3, // componentsPerVector
      4, // bytesPerComponent
      12, // offset
      32 // stride
    )

    const texcoordSource = new SCNGeometrySource(
      sourceData, // data
      SCNGeometrySource.Semantic.texcoord, // semantic
      vectorCount, // vectorCount
      true, // floatComponents
      2, // componentsPerVector
      4, // bytesPerComponent
      24, // offset
      32 // stride
    )

    const element = new SCNGeometryElement(indexData, SCNGeometryPrimitiveType.triangles)

    this._geometryElements = [element]
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(-0.5 * this.width, -0.5 * this.height, 0.0),
      max: new SCNVector3(0.5 * this.width, 0.5 * this.height, 0.0)
    }
  }
}
