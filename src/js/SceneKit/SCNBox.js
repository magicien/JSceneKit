'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometrySource from './SCNGeometrySource'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'

/**
 * A six-sided polyhedron geometry whose faces are all rectangles, optionally with rounded edges and corners.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnbox
 */
export default class SCNBox extends SCNGeometry {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        const box = new SCNBox(
          propValues.boxwidth,
          propValues.boxheight,
          propValues.boxlength,
          propValues.boxchamferRadius
        )
        box.widthSegmentCount = propValues.boxwidthSegmentCount
        box.heightSegmentCount = propValues.boxheightSegmentCount
        box.lengthSegmentCount = propValues.boxlengthSegmentCount
        box.chamferSegmentCount = propValues.boxchamferSegmentCount
        // propValues.boxPrimitiveType
        box.materials = propValues.materials
        box.subdivisionLevel = propValues.subdivisionLevel
        return box
      },
      name: 'string',
      boxwidth: ['float', null],
      boxheight: ['float', null],
      boxlength: ['float', null],
      boxwidthSegmentCount: ['integer', null],
      boxheightSegmentCount: ['integer', null],
      boxlengthSegmentCount: ['integer', null],
      boxchamferRadius: ['float', null],
      boxchamferSegmentCount: ['integer', null],
      boxprimitiveType: ['integer', null],
      materials: ['NSArray', null],
      subdivisionLevel: ['integer', null],
      subdivisionSettings: ['bytes', null]
    }
  }

  /**
   * Creates a box geometry with the specified width, height, length, and chamfer radius.
   * @access public
   * @constructor
   * @param {number} [width = 1.0] - The width of the box along the x-axis of its local coordinate space.
   * @param {number} [height = 1.0] - The height of the box along the y-axis of its local coordinate space.
   * @param {number} [length = 1.0] - The length of the box along the z-axis of its local coordinate space.
   * @param {number} [chamferRadius = 0.0] - The radius of curvature for the edges and corners of the box.
   * @desc The box is centered in its local coordinate system. For example, if you create a box whose width, height and length are all 10.0, it extends from -5.0 to 5.0 along in each of the x-, y-, and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scnbox/1522620-init
   */
  constructor(width = 1.0, height = 1.0, length = 1.0, chamferRadius = 0.0) {
    super([], [])


    // Adjusting a Box’s Dimensions

    /**
     * The extent of the box along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523898-width
     */
    this.width = width

    /**
     * The extent of the box along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1522901-height
     */
    this.height = height

    /**
     * The extent of the box along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523514-length
     */
    this.length = length


    // Configuring Box Properties

    /**
     * The number of subdivisions in each face of the box along its x-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523559-widthsegmentcount
     */
    this.widthSegmentCount = 1

    /**
     * The number of subdivisions in each face of the box along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1522869-heightsegmentcount
     */
    this.heightSegmentCount = 1

    /**
     * The number of subdivisions in each face of the box along its z-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523721-lengthsegmentcount
     */
    this.lengthSegmentCount = 1


    // Adding Rounded Edges and Corners

    /**
     * The radius of curvature for the edges and corners of the box. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1523302-chamferradius
     */
    this.chamferRadius = chamferRadius

    /**
     * The number of line segments used to create each rounded edge of the box. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnbox/1522976-chamfersegmentcount
     */
    this.chamferSegmentCount = 10

    this._createGeometry()
  }

  _createGeometry() {
    const sourceData = []
    const indexData = []

    const left = -this.width * 0.5
    const right = this.width * 0.5
    const top = this.height * 0.5
    const bottom = -this.height * 0.5
    const front = this.length * 0.5
    const back = -this.length * 0.5

    // front
    /*
    this._createFace(sourceData, indexData,
      new SCNVector3(left, bottom, front),
      new SCNVector3(left, top, front),
      new SCNVector3(right, bottom, front),
      new SCNVector3(right, top, front),
      this.heightSegmentCount,
      this.widthSegmentCount)

    // right
    this._createFace(sourceData, indexData,
      new SCNVector3(right, bottom, front),
      new SCNVector3(right, top, front),
      new SCNVector3(right, bottom, back),
      new SCNVector3(right, top, back),
      this.heightSegmentCount,
      this.lengthSegmentCount)

    // back
    this._createFace(sourceData, indexData,
      new SCNVector3(right, bottom, back),
      new SCNVector3(right, top, back),
      new SCNVector3(left, bottom, back),
      new SCNVector3(left, top, back),
      this.heightSegmentCount,
      this.widthSegmentCount)

    // left
    this._createFace(sourceData, indexData,
      new SCNVector3(left, bottom, back),
      new SCNVector3(left, top, back),
      new SCNVector3(left, bottom, front),
      new SCNVector3(left, top, front),
      this.heightSegmentCount,
      this.lengthSegmentCount)

    // top
    this._createFace(sourceData, indexData,
      new SCNVector3(left, top, front),
      new SCNVector3(left, top, back),
      new SCNVector3(right, top, front),
      new SCNVector3(right, top, back),
      this.lengthSegmentCount,
      this.widthSegmentCount)

    // bottom
    this._createFace(sourceData, indexData,
      new SCNVector3(left, bottom, back),
      new SCNVector3(left, bottom, front),
      new SCNVector3(right, bottom, back),
      new SCNVector3(right, bottom, front),
      this.lengthSegmentCount,
      this.widthSegmentCount)
    */

    // front
    sourceData.push(left, bottom, front) // position
    sourceData.push(0, 0, 1) // normal
    sourceData.push(0, 1) // texcoord
    //sourceData.push(0, -1, -1, -1) // boneIndices
    //sourceData.push(1, 0, 0, 0) // boneWeights

    sourceData.push(left, top, front)
    sourceData.push(0, 0, 1)
    sourceData.push(0, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, bottom, front)
    sourceData.push(0, 0, 1)
    sourceData.push(1, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, top, front)
    sourceData.push(0, 0, 1)
    sourceData.push(1, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    indexData.push(0, 3, 1)
    indexData.push(0, 2, 3)

    // right
    sourceData.push(right, bottom, front)
    sourceData.push(1, 0, 0)
    sourceData.push(0, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, top, front)
    sourceData.push(1, 0, 0)
    sourceData.push(0, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, bottom, back)
    sourceData.push(1, 0, 0)
    sourceData.push(1, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, top, back)
    sourceData.push(1, 0, 0)
    sourceData.push(1, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    indexData.push(4, 7, 5)
    indexData.push(4, 6, 7)

    // back
    sourceData.push(right, bottom, back)
    sourceData.push(0, 0, -1)
    sourceData.push(0, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, top, back)
    sourceData.push(0, 0, -1)
    sourceData.push(0, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, bottom, back)
    sourceData.push(0, 0, -1)
    sourceData.push(1, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, top, back)
    sourceData.push(0, 0, -1)
    sourceData.push(1, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    indexData.push(8, 11, 9)
    indexData.push(8, 10, 11)

    // left
    sourceData.push(left, bottom, back)
    sourceData.push(-1, 0, 0)
    sourceData.push(0, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, top, back)
    sourceData.push(-1, 0, 0)
    sourceData.push(0, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, bottom, front)
    sourceData.push(-1, 0, 0)
    sourceData.push(1, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, top, front)
    sourceData.push(-1, 0, 0)
    sourceData.push(1, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    indexData.push(12, 15, 13)
    indexData.push(12, 14, 15)

    // top
    sourceData.push(left, top, front)
    sourceData.push(0, 1, 0)
    sourceData.push(0, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, top, back)
    sourceData.push(0, 1, 0)
    sourceData.push(0, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, top, front)
    sourceData.push(0, 1, 0)
    sourceData.push(1, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, top, back)
    sourceData.push(0, 1, 0)
    sourceData.push(1, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    indexData.push(16, 19, 17)
    indexData.push(16, 18, 19)

    // bottom
    sourceData.push(left, bottom, back)
    sourceData.push(0, -1, 0)
    sourceData.push(0, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(left, bottom, front)
    sourceData.push(0, -1, 0)
    sourceData.push(0, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, bottom, back)
    sourceData.push(0, -1, 0)
    sourceData.push(1, 1)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    sourceData.push(right, bottom, front)
    sourceData.push(0, -1, 0)
    sourceData.push(1, 0)
    //sourceData.push(0, -1, -1, -1)
    //sourceData.push(1, 0, 0, 0)

    indexData.push(20, 23, 21)
    indexData.push(20, 22, 23)

    const vertexSource = new SCNGeometrySource(
      sourceData, // data
      SCNGeometrySource.Semantic.vertex, // semantic
      24, // vectorCount
      true, // floatComponents
      3, // componentsPerVector
      4, // bytesPerComponent
      0, // offset
      32 // sride
    )

    const normalSource = new SCNGeometrySource(
      sourceData, // data
      SCNGeometrySource.Semantic.normal, // semantic
      24, // vectorCount
      true, // floatComponents
      3, // componentsPerVector
      4, // bytesPerComponent
      12, // offset
      32 // stride
    )

    const texcoordSource = new SCNGeometrySource(
      sourceData, // data
      SCNGeometrySource.Semantic.texcoord, // semantic
      24, // vectorCount
      true, // floatComponents
      2, // componentsPerVector
      4, // bytesPerComponent
      24, // offset
      32 // stride
    )

    const element = new SCNGeometryElement(indexData, SCNGeometryPrimitiveType.triangles)

    this._geometryElements = [element]
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
  }

  /**
   * @access private
   * @param {number[]} sourceData -
   * @param {number[]} indexData -
   * @param {SCNVector3} v1 - position 1
   * @param {SCNVector3} v2 - position 2
   * @param {SCNVector3} v3 - position 3
   * @param {SCNVector3} v4 - position 4
   * @param {number} s1 - segmentCount 1
   * @param {number} s2 - segmentCount 2
   * @returns {void}
   */
  _createFace(sourceData, indexData, v1, v2, v3, v4, s1, s2) {
  }
}
