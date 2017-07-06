'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'

/**
 * A torus, or ring-shaped geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scntorus
 */
export default class SCNTorus extends SCNGeometry {
  // Creating a Torus

  /**
   * Creates a torus geometry with the specified ring radius and pipe radius.
   * @access public
   * @constructor
   * @param {number} ringRadius - The major radius of the torus, defining its circular ring in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} pipeRadius - The minor radius of the torus, defining the pipe that encircles the ring.
   * @desc The torus is centered in its local coordinate system. For example, if you create a torus whose ring radius is 5.0 and pipe radius is 1.0, it extends from -6.0 to 6.0 (with a hole through the center from -4.0 to 4.0) in the x- and z-axes and from -1.0 to 1.0 in the y-axis.
   * @see https://developer.apple.com/reference/scenekit/scntorus/1523833-init
   */
  constructor(ringRadius = 0.5, pipeRadius = 0.25) {
    super([], [])

    // Adjusting a Torus’ Dimensions

    /**
     * The major radius of the torus, defining a circle in the x- and z-axis dimensions. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1522906-ringradius
     */
    this.ringRadius = ringRadius

    /**
     * The minor radius of the torus, defining the pipe that encircles the torus ring. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1522623-piperadius
     */
    this.pipeRadius = pipeRadius


    // Configuring Torus Properties

    /**
     * The number of subdivisions around the torus ring. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1523598-ringsegmentcount
     */
    this.ringSegmentCount = 48

    /**
     * The number of subdivisions around the torus pipe. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scntorus/1522807-pipesegmentcount
     */
    this.pipeSegmentCount = 24

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []
    const indexData = []
    const vectorCount = (this.ringSegmentCount + 1) * (this.pipeSegmentCount + 1)

    for(let ri=0; ri<=this.ringSegmentCount; ri++){
      const r = 2.0 * ri * Math.PI / this.ringSegmentCount
      const sinr = Math.sin(r)
      const cosr = Math.cos(r)
      const cx = -sinr * this.ringRadius
      const cz = -cosr * this.ringRadius
      const tx = ri / this.ringSegmentCount

      for(let pi=0; pi<=this.pipeSegmentCount; pi++){
        const pr = 2.0 * pi * Math.PI / this.pipeSegmentCount
        const sinp = Math.sin(pr)
        const cosp = Math.cos(pr)
        const x = cx + this.pipeRadius * sinr * cosp
        const y = -this.pipeRadius * sinp
        const z = cz + this.pipeRadius * cosr * cosp

        // vertex
        sourceData.push(x, y, z)

        // normal
        sourceData.push(sinr * cosp, -sinp, cosr * cosp)

        // texcoord
        const tz = 1.0 - pi / this.pipeSegmentCount
        sourceData.push(tx, tz)
      }
    }

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

    const indexLen = this.ringSegmentCount * this.pipeSegmentCount
    let base = 0
    for(let i=0; i<indexLen; i++){
      const i2 = base + this.pipeSegmentCount + 1
      indexData.push(base, i2+1, base+1)
      indexData.push(base, i2, i2+1)
      base += 1
      if((i+1) % this.pipeSegmentCount === 0){
        base += 1
      }
    }

    const element = new SCNGeometryElement(indexData, SCNGeometryPrimitiveType.triangles)

    this._geometryElements = [element]
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(-this.radius, -this.radius, -this.radius),
      max: new SCNVector3(this.radius, this.radius, this.radius)
    }
  }
}
