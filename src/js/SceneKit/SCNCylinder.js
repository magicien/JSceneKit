'use strict'

import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNGeometryTessellator from './SCNGeometryTessellator'
import SCNMaterial from './SCNMaterial'
import SCNVector3 from './SCNVector3'


/**
 * A right circular cylinder geometry.
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/documentation/scenekit/scncylinder
 */
export default class SCNCylinder extends SCNGeometry {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        const cylinder = new SCNCylinder(
          propValues.cylinderradius,
          propValues.cylinderheight
        )
        cylinder.radialSegmentCount = propValues.cylinderradialSegmentCount
        cylinder.heightSegmentCount = propValues.cylinderheightSegmentCount
        cylinder.materials = propValues.materials
        cylinder.tessellator = propValues.tessellator
        cylinder.subdivisionLevel = propValues.subdivisionLevel
        return cylinder
      },
      name: ['string', null],
      cylinderradius: ['float', null],
      cylinderheight: ['float', null],
      cylinderradialSegmentCount: ['integer', null],
      cylinderheightSegmentCount: ['integer', null],
      cylinderradialSpan: ['float', null],
      cylinderprimitiveType: ['integer', null],
      materials: ['NSArray', null],
      tessellator: ['SCNGeometryTessellator', null],
      subdivisionLevel: ['integer', null],

      subdivisionSettings: ['bytes', null],
      wantsAdaptiveSubdivision: ['boolean', null]
    }
  }

 // Creating a Cylinder

  /**
   * Creates a cylinder geometry with the specified radius and height.
   * @access public
   * @constructor
   * @param {number} radius - The radius of the cylinder’s circular cross section in the x- and z-axis dimensions of its local coordinate space.
   * @param {number} height - The height of the cylinder along the y-axis of its local coordinate space.
   * @desc The cylinder is centered in its local coordinate system. For example, if you create a cylinder whose radius is 5.0 and height is 10.0, its circular cross section extends from -5.0 to 5.0 along the x- and z-axes, and the y-coordinates of its base and top are -5.0 and 5.0, respectively.
   * @see https://developer.apple.com/documentation/scenekit/scncylinder/1523685-init
   */
  constructor(radius = 0.5, height = 1.0) {
    super([], [])

    // Adjusting a Cylinder’s Dimensions

    /**
     * The radius of the cylinder’s circular cross section. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scncylinder/1522674-radius
     */
    this.radius = radius

    /**
     * The extent of the cylinder along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scncylinder/1523678-height
     */
    this.height = height


    // Adjusting Geometric Detail

    /**
     * The number of subdivisions around the circumference of the cylinder. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scncylinder/1524002-radialsegmentcount
     */
    this.radialSegmentCount = 48

    /**
     * The number of subdivisions in the sides of the cylinder along its y-axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scncylinder/1523330-heightsegmentcount
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
      const vx = x * this.radius
      const vz = z * this.radius

      // vertex
      sideData.push(vx, bottom, vz)
      topData.push(vx, top, vz)
      bottomData.push(-vx, bottom, vz)

      // normal
      sideData.push(x, 0, z)
      topData.push(0, 1, 0)
      bottomData.push(0, -1, 0)

      // texcoord
      const tx = tStep * i
      sideData.push(tx, 1.0)

      const ttx = (1 + Math.cos(i * rStep)) * 0.5
      const tty = (1 + Math.sin(i * rStep)) * 0.5
      topData.push(ttx, tty)
      bottomData.push(ttx, tty)

      // vertex
      sideData.push(vx, top, vz)
      topData.push(0, top, 0)
      bottomData.push(0, bottom, 0)

      // normal
      sideData.push(x, 0, z)
      topData.push(0, 1, 0)
      bottomData.push(0, -1, 0)

      // texcoord
      sideData.push(tx, 0.0)
      topData.push(0.5, 0.5)
      bottomData.push(0.5, 0.5)
    }
    sourceData.push(...sideData, ...topData, ...bottomData)

    const vectorCount = (this.radialSegmentCount + 1) * 6
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
    const indexData2 = []
    const offset1 = (this.radialSegmentCount + 1) * 2
    const offset2 = (this.radialSegmentCount + 1) * 4
    for(let i=0; i<this.radialSegmentCount; i++){
      const base0 = i * 2
      indexData0.push(base0, base0 + 3, base0 + 1)
      indexData0.push(base0, base0 + 2, base0 + 3)

      const base1 = offset1 + base0
      indexData1.push(base1, base1 + 2, base1 + 3)

      const base2 = offset2 + base0
      indexData2.push(base2, base2 + 2, base2 + 3)
    }
    elements.push(new SCNGeometryElement(indexData0, SCNGeometryPrimitiveType.triangles))
    elements.push(new SCNGeometryElement(indexData1, SCNGeometryPrimitiveType.triangles))
    elements.push(new SCNGeometryElement(indexData2, SCNGeometryPrimitiveType.triangles))

    this._geometryElements = elements
    this._geometrySources = [vertexSource, normalSource, texcoordSource]
    this.boundingBox = {
      min: new SCNVector3(-this.radius, bottom, -this.radius),
      max: new SCNVector3(this.radius, top, this.radius)
    }
  }

  _updateBoundingBoxForSkinner(skinner = null){
    if(skinner === null){
      return this.boundingBox
    }
    return super._updateBoundingBoxForSkinner(skinner)
  }
}
