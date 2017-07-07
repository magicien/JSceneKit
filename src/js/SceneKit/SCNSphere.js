'use strict'

import SCNMaterial from './SCNMaterial'
import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNVector3 from './SCNVector3'

/**
 * A sphere (or ball or globe) geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnsphere
 */
export default class SCNSphere extends SCNGeometry {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        const sphere = new SCNSphere(propValues.sphereradius)
        sphere.isGeodesic = propValues.spheregeodesic
        sphere.segmentCount = propValues.spheresegmentCount
        sphere.name = propValues.name
        sphere._sphereRadialSpan = propValues.sphereRadialSpan
        sphere._isHemispheric = propValues.spherehemispheric
        sphere._spherePrimitiveType = propValues.sphereprimitiveType
        sphere.materials = propValues.materials
        sphere.subdivisionLevel = propValues.subdivisionLevel
        sphere._createGeometry()

        return sphere
      },
      sphereradius: ['float', null],
      spheregeodesic: ['boolean', null],
      spheresegmentCount: ['integer', null],
      materials: ['NSArray', null],

      name: ['string', null],
      sphereradialSpan: ['float', null],
      spherehemispheric: ['boolean', null],
      sphereprimitiveType: ['integer', null],
      subdivisionLevel: ['integer', null],
      subdivisionSettings: ['bytes', null]
    }
  }

  // Creating a Sphere

  /**
   * Creates a sphere geometry with the specified radius.
   * @access public
   * @constructor
   * @param {number} radius - The radius of the sphere in its local coordinate space.
   * @desc The sphere is centered in its local coordinate system. For example, if you create a sphere whose radius is 5.0, it extends from -5.0 to 5.0 along each of the the x, y, and z-axes.
   * @see https://developer.apple.com/reference/scenekit/scnsphere/1522601-init
   */
  constructor(radius = 0.5) {
    super([], [])

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
    this.segmentCount = 24

    this._sphereRadialSpan = 0
    this._spherePrimitiveType = 0
    this._isHemispheric = false

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []
    const indexData = []
    const vectorCount = (this.segmentCount + 1) * (this.segmentCount + 1)
    const primitiveCount = (this.segmentCount - 1) * this.segmentCount * 2

    const yNom = []
    const ySin = []
    for(let lat=0; lat<=this.segmentCount; lat++){
      yNom.push(-Math.cos(Math.PI * lat / this.segmentCount))
      ySin.push(Math.sin(Math.PI * lat / this.segmentCount))
    }

    for(let lng=0; lng<=this.segmentCount; lng++){
      const x = -Math.sin(2.0 * Math.PI * lng / this.segmentCount)
      const z = -Math.cos(2.0 * Math.PI * lng / this.segmentCount)
      for(let lat=0; lat<=this.segmentCount; lat++){
        const xNom = x * ySin[lat]
        const zNom = z * ySin[lat]

        // vertex
        sourceData.push(xNom * this.radius, yNom[lat] * this.radius, zNom * this.radius)

        // normal
        sourceData.push(xNom, yNom[lat], zNom)

        // texcoord
        sourceData.push(1.0 * lng / this.segmentCount, 1.0 - 1.0 * lat / this.segmentCount)
      }
    }

    for(let i=0; i<this.segmentCount; i++){
      let index1 = i * (this.segmentCount + 1)
      let index2 = index1 + this.segmentCount + 2

      indexData.push(index1, index2, index1 + 1)
      index1 += 1
      for(let j=0; j<this.segmentCount-2; j++){
        indexData.push(index1, index2 + 1, index1 + 1)
        indexData.push(index1, index2, index2 + 1)
        index1 += 1
        index2 += 1
      }
      indexData.push(index1, index2, index2 + 1)
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

    const element = new SCNGeometryElement(indexData, SCNGeometryPrimitiveType.triangles)

    this._geometryElements = [element]
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(-this.radius, -this.radius, -this.radius),
      max: new SCNVector3(this.radius, this.radius, this.radius)
    }
  }

  _updateBoundingBoxForSkinner(skinner = null){
    if(skinner === null){
      return this.boundingBox
    }
    return super._updateBoundingBoxForSkinner(skinner)
  }
}
