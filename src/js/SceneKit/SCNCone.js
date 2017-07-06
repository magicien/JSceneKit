'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'

/**
 * A right circular cone or frustum geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scncone
 */
export default class SCNCone extends SCNGeometry {

  // Creating a Cone

  /**
   * Creates a cone geometry with the given top radius, bottom radius, and height.
   * @constructor
   * @access public
   * @param {number} topRadius - The radius of the cone’s top, forming a circle in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} bottomRadius - The radius of the cone’s base, forming a circle in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} height - The height of the cone along the y-axis of its local coordinate space.
   * @desc The cone is centered in its local coordinate system. For example, if you create a cone whose bottom radius is 5.0, top radius is 0.0, and height is 10.0, its apex is at the point {0, 5.0, 0}, and its base lies in the plane whose y-coordinate is -5.0, extending from -5.0 to 5.0 along both the x- and z-axes.Pass zero for topRadius or bottomRadius or parameter to create a cone whose sides taper to a single point, or a different value to create a frustum with a circular top.
   * @see https://developer.apple.com/reference/scenekit/scncone/1522863-init
   */
  constructor(topRadius = 0.0, bottomRadius = 0.5, height = 1.0) {
    super([], [])

    // Adjusting a Cone’s Dimensions

    /**
     * The radius of the cone’s circular top. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1524240-topradius
     */
    this.topRadius = topRadius

    /**
     * The radius of the cone’s circular base. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1523198-bottomradius
     */
    this.bottomRadius = bottomRadius

    /**
     * The extent of the cylinder along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1523219-height
     */
    this.height = height


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the circumference of the cone. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1523942-radialsegmentcount
     */
    this.radialSegmentCount = 48

    /**
     * The number of subdivisions in the sides of the cone along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncone/1524113-heightsegmentcount
     */
    this.heightSegmentCount = 1

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []

    const top = this.height * 0.5
    const bottom = -this.height * 0.5

    const sideData = []
    const topData = []
    const bottomData = []

    const rStep = 2.0 * Math.PI / this.radialSegmentCount
    const tStep = 1.0 / this.radialSegmentCount
    for(let i=0; i<=this.radialSegmentCount; i++){
      const x = -Math.sin(rStep * i)
      const z = -Math.cos(rStep * i)
      const tvx = x * this.topRadius
      const tvz = z * this.topRadius
      const bvx = x * this.bottomRadius
      const bvz = z * this.bottomRadius

      // vertex
      sideData.push(bvx, bottom, bvz)
      bottomData.push(-bvx, bottom, bvz)

      // normal
      sideData.push(x, 0, z)
      bottomData.push(0, -1, 0)

      // texcoord
      const tx = tStep * i
      sideData.push(tx, 1.0)

      const ttx = (1 + Math.cos(i * rStep)) * 0.5
      const tty = (1 + Math.sin(i * rStep)) * 0.5
      bottomData.push(ttx, tty)

      // vertex
      sideData.push(tvx, top, tvz)
      bottomData.push(0, bottom, 0)

      // normal
      sideData.push(x, 0, z)
      bottomData.push(0, -1, 0)

      // texcoord
      sideData.push(tx, 0.0)
      bottomData.push(0.5, 0.5)
    }
    sourceData.push(...sideData, ...bottomData)

    const vectorCount = (this.radialSegmentCount + 1) * 4 // TODO: use heightSegmentCount
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
    const indexData0 = []
    const indexData1 = []
    const offset1 = (this.radialSegmentCount + 1) * 2
    for(let i=0; i<this.radialSegmentCount; i++){
      const base0 = i * 2
      indexData0.push(base0, base0 + 2, base0 + 3)
      const base1 = offset1 + base0
      indexData1.push(base1, base1 + 2, base1 + 3)
    }
    elements.push(new SCNGeometryElement(indexData0, SCNGeometryPrimitiveType.triangles))
    elements.push(new SCNGeometryElement(indexData1, SCNGeometryPrimitiveType.triangles))

    this._geometryElements = elements
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(-this.radius, bottom, -this.radius),
      max: new SCNVector3(this.radius, top, this.radius)
    }
  }
}
