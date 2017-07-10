'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'

/**
 * A tube or pipe geometry—a right circular cylinder with a circular hole along its central axis.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/documentation/scenekit/scntube
 */
export default class SCNTube extends SCNGeometry {
  // Creating a Tube

  /**
   * Creates a tube geometry with the specified inner radius, outer radius, and height.
   * @access public
   * @constructor
   * @param {number} innerRadius - The radius of the tube’s circular central hole in the x- and z-axes of its local coordinate space.
   * @param {number} outerRadius - The radius of the tube’s circular cross section in the x- and z-axes of its local coordinate space.
   * @param {number} height - The height of the tube along the y-axis of its local coordinate space.
   * @desc The tube is centered in its local coordinate system. For example, if you create a tube whose outer radius is 5.0, inner radius is 1.0, and height is 10.0, its circular cross section extends from -5.0 to 5.0 along the x- and z-axes, the y-coordinates of its base and top are -5.0 and 5.0, and the hole through its center extends from -0.5 to 0.5 along the x- and z-axes.
   * @see https://developer.apple.com/documentation/scenekit/scntube/1522843-init
   */
  constructor(innerRadius = 0.25, outerRadius = 0.5, height = 1.0) {
    super()

    // Adjusting a Tube’s Dimensions

    /**
     * The radius of the tube’s outer circular cross section. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntube/1523270-outerradius
     */
    this.outerRadius = outerRadius

    /**
     * The radius of the circular hole through the tube. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntube/1524070-innerradius
     */
    this.innerRadius = innerRadius

    /**
     * The extent of the tube along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntube/1522640-height
     */
    this.height = height


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the circumference of the tube. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntube/1523619-radialsegmentcount
     */
    this.radialSegmentCount = 48

    /**
     * The number of subdivisions in the inner and outer surfaces of the tube along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntube/1523080-heightsegmentcount
     */
    this.heightSegmentCount = 1

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []

    const top = this.height * 0.5
    const bottom = -this.height * 0.5

    const outerData = []
    const innerData = []
    const topData = []
    const bottomData = []

    const rStep = 2.0 * Math.PI / this.radialSegmentCount
    const tStep = 1.0 / this.radialSegmentCount
    for(let i=0; i<=this.radialSegmentCount; i++){
      const x = -Math.sin(rStep * i)
      const z = -Math.cos(rStep * i)
      const ovx = x * this.outerRadius
      const ovz = z * this.outerRadius
      const ivx = x * this.innerRadius
      const ivz = z * this.innerRadius

      // vertex
      outerData.push(ovx, bottom, ovz)
      innerData.push(ivx, top, ivz)
      topData.push(ovx, top, ovz)
      bottomData.push(-ovx, bottom, ovz)

      // normal
      outerData.push(x, 0, z)
      innerData.push(-x, 0, -z)
      topData.push(0, 1, 0)
      bottomData.push(0, -1, 0)

      // texcoord
      const tx = tStep * i
      outerData.push(tx, 1.0)
      innerData.push(1.0 - tx, 0.0)

      const ttx = 0.5 + Math.cos(rStep * i) * 0.5
      const tty = 0.5 + Math.sin(rStep * i) * 0.5
      topData.push(ttx, tty)
      bottomData.push(ttx, tty)

      // vertex
      outerData.push(ovx, top, ovz)
      innerData.push(ivx, bottom, ivz)
      topData.push(ivx, top, ivz)
      bottomData.push(-ivx, bottom, ivz)

      // normal
      outerData.push(x, 0, z)
      innerData.push(-x, 0, -z)
      topData.push(0, 1, 0)
      bottomData.push(0, -1, 0)

      // texcoord
      outerData.push(tx, 0.0)
      innerData.push(1.0 - tx, 1.0)

      const ttx2 = 0.5 + Math.cos(rStep * i) * 0.25
      const tty2 = 0.5 + Math.sin(rStep * i) * 0.25
      topData.push(ttx2, tty2)
      bottomData.push(ttx2, tty2)
    }
    sourceData.push(...outerData, ...innerData, ...topData, ...bottomData)

    const vectorCount = (this.radialSegmentCount + 1) * 8
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
    for(let i=0; i<4; i++){
      const indexData = []
      const offset = (this.radialSegmentCount + 1) * i * 2
      for(let j=0; j<this.radialSegmentCount; j++){
        const base = offset + j * 2
        indexData.push(base, base + 3, base + 1)
        indexData.push(base, base + 2, base + 3)
      }
      elements.push(new SCNGeometryElement(indexData, SCNGeometryPrimitiveType.triangles))
    }

    this._geometryElements = elements
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(-this.outerRadius, bottom, -this.outerRadius),
      max: new SCNVector3(this.outerRadius, top, this.outerRadius)
    }
  }

  _updateBoundingBoxForSkinner(skinner = null){
    if(skinner === null){
      return this.boundingBox
    }
    return super._updateBoundingBoxForSkinner(skinner)
  }

}
