'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'


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
  constructor(width = 1.0, height = 1.0, length = 1.0) {
    super([], [])

    // Adjusting a Pyramid’s Dimensions

    /**
     * The extent of the pyramid along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1522613-width
     */
    this.width = 1.0

    /**
     * The extent of the pyramid along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1522805-height
     */
    this.height = height

    /**
     * The extent of the pyramid along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1524203-length
     */
    this.length = length // For the original SceneKit, the default value is 0.0, but it should be 1.0.


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions in each face of the pyramid along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1523083-widthsegmentcount
     */
    this.widthSegmentCount = 1

    /**
     * The number of subdivisions in each face of the pyramid along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1524059-heightsegmentcount
     */
    this.heightSegmentCount = 1

    /**
     * The number of subdivisions in each face of the pyramid along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnpyramid/1524227-lengthsegmentcount
     */
    this.lengthSegmentCount = 1

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []

    // TODO: use segment count

    const right = this.width * 0.5
    const left = -right
    const front = this.length * 0.5
    const back = -front
    const top = this.height
    const bottom = 0

    /*
    const nfront = (new SCNVector3(0, front, top)).normalize()
    const nleft = (new SCNVector3(top, left, 0)).normalize()
    const nright = (new SCNVector3(top, right, 0)).normalize()
    const nback = (new SCNVector3(0, back, top)).normalize()
    const tex = [[0.0, 1.0], [0.0, 0.0], [1.0, 1.0], [1.0, 0.0]]
    */

    // front
    sourceData.push(...this._createSideFace(left, front, right, front))

    // right
    sourceData.push(...this._createSideFace(right, front, right, back))

    // back
    sourceData.push(...this._createSideFace(right, back, left, back))

    // left
    sourceData.push(...this._createSideFace(left, back, left, front))

    // bottom
    sourceData.push(left, 0, back)
    sourceData.push(0, -1, 0)
    sourceData.push(0.0, 1.0)

    sourceData.push(right, 0, back)
    sourceData.push(0, -1, 0)
    sourceData.push(1.0, 1.0)

    sourceData.push(left, 0, front)
    sourceData.push(0, -1, 0)
    sourceData.push(0.0, 0.0)

    sourceData.push(right, 0, front)
    sourceData.push(0, -1, 0)
    sourceData.push(1.0, 0.0)

    const vectorCount = 20 // TODO: use segmentCount

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

    const elements = []

    // TODO: use segmentCount
    const indexData = [
      [0, 2, 3],
      [4, 6, 7],
      [8, 10, 11],
      [12, 14, 15],
      [16, 17, 19, 16, 19, 18]
    ]

    for(let i=0; i<5; i++){
      elements.push(new SCNGeometryElement(indexData[i], SCNGeometryPrimitiveType.triangles))
    }

    this._geometryElements = elements
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(left, bottom, back),
      max: new SCNVector3(right, top, front)
    }
  }

  _createSideFace(x0, z0, x1, z1) {
    const top = this.height

    const data = []
    let normal = new SCNVector3()

    if(x0 === x1){
      normal.x = top
      normal.y = x0
      if(x0 < 0){
        normal.x = -normal.x
        normal.y = -normal.y
      }
    }else if(z0 === z1){
      normal.z = top
      normal.y = z0
      if(z0 < 0){
        normal.z = -normal.z
        normal.y = -normal.y
      }
    }else{
      throw new Error('position inconsistent')
    }
    normal = normal.normalize()

    // left bottom
    data.push(x0, 0, z0)
    data.push(normal.x, normal.y, normal.z)
    data.push(0.0, 1.0)

    // top
    data.push(0, this.height, 0)
    data.push(normal.x, normal.y, normal.z)
    data.push(0.0, 0.0)

    // right bottom
    data.push(x1, 0, z1)
    data.push(normal.x, normal.y, normal.z)
    data.push(1.0, 1.0)

    // top again
    data.push(0, this.height, 0)
    data.push(normal.x, normal.y, normal.z)
    data.push(1.0, 0.0)

    return data
  }
}
