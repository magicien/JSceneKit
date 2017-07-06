'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'

/**
 * An infinite plane that can optionally display a reflection of the scene above it.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/reference/scenekit/scnfloor
 */
export default class SCNFloor extends SCNGeometry {

  /**
   * constructor
   * @constructor
   * @access public
   */
  constructor() {
    super([], [])

    // Adding Reflections to a Floor

    /**
     * The intensity of the scene’s reflection on the floor. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1524175-reflectivity
     */
    this.reflectivity = 0.25

    /**
     * The distance from the floor at which scene contents are no longer reflected. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1522781-reflectionfalloffend
     */
    this.reflectionFalloffEnd = 0.0

    /**
     * The distance from the floor at which scene contents are reflected at full intensity. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1524237-reflectionfalloffstart
     */
    this.reflectionFalloffStart = 0.0

    /**
     * The resolution scale factor of the offscreen buffer that SceneKit uses to render reflections.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1522809-reflectionresolutionscalefactor
     */
    this.reflectionResolutionScaleFactor = 1.0


    // Instance Properties

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/2091890-length
     */
    this.length = 2.0

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1845281-reflectioncategorybitmask
     */
    this.reflectionCategoryBitMask = -1

    /**
     * 
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnfloor/1845280-width
     */
    this.width = 2.0

    this._createGeometry()
    this.materials.push(new SCNMaterial())
  }

  _createGeometry() {
    const sourceData = []
    const indexData = []
    const segmentCount = 10
    const xStep = this.width / segmentCount
    const yStep = -this.length / segmentCount
    const txStep = 1.0 / segmentCount
    const tyStep = -1.0 / segmentCount

    let y = this.length * 0.5
    let ty = 1.0
    for(let h=0; h<=segmentCount; h++){
      let x = -this.width * 0.5
      let tx = 0.0
      for(let w=0; w<=segmentCount; w++){
        // vector
        sourceData.push(x, y, 0)

        // normal
        sourceData.push(0, 0, 1)

        // texcoord
        sourceData.push(tx, ty)

        x += xStep
        tx += txStep
      }
      y += yStep
      ty += tyStep
    }

    const offset = segmentCount + 1
    for(let i=0; i<segmentCount; i++){
      const base0 = i * 11
      for(let j=0; j<segmentCount; j++){
        const base = base0 + j
        const i2 = base + offset
        indexData.push(base, base+1, i2+1)
        indexData.push(base, i2+1, i2)
      }
    }

    const vectorCount = (segmentCount + 1) * (segmentCount + 1)
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
      min: new SCNVector3(-this.width * 0.5, -this.length * 0.5, 0),
      max: new SCNVector3(this.width * 0.5, this.length * 0.5, 0)
    }
  }

}
