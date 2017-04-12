'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
/*global Buffer*/

/**
 * A container for index data describing how vertices connect to define a three-dimensional object, or geometry.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scngeometryelement
 */
export default class SCNGeometryElement extends NSObject {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        return new SCNGeometryElement(
          propValues.elementData, 
          propValues.primitiveType, 
          propValues.primitiveCount, 
          propValues.bytesPerIndex
        )
      },
      primitiveType: ['integer', null],
      primitiveCount: ['integer', null],
      elementData: ['NSMutableData', null],
      bytesPerIndex: ['integer', null]
    }
  }

  // Creating a Geometry Element

  /**
   * Creates a geometry element from the specified array of index values. 
   * @access public
   * @constructor
   * @param {number[]|Buffer} indices - An array of index values, each of which identifies a vertex in a geometry source.
   * @param {SCNGeometryPrimitiveType} primitiveType - The drawing primitive that connects vertices when rendering the geometry element. For possible values, see SCNGeometryPrimitiveType.
   * @desc SceneKit connects the vertices in the order specified by the indices array, arranged according to the primitiveType parameter.This initializer is equivalent to the init(data:primitiveType:primitiveCount:bytesPerIndex:) initializer, but does not require an intermediary Data object; instead, it automatically infers the necessary allocation size and bytesPerIndex values based on the contents of the indices array. To create a custom SCNGeometry object from the geometry element, use the init(sources:elements:) initializer.
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1523191-init
   */
  constructor(indices, primitiveType, primitiveCount = null, bytesPerIndex = 2) {
    super()

    // Inspecting a Geometry Element

    this._data = indices
    if(indices instanceof Buffer){
      const _data = []
      const count = indices.length / bytesPerIndex
      let _offset = 0
      for(let i=0; i<count; i++){
        _data.push(indices.readUIntLE(_offset, bytesPerIndex))
        _offset += bytesPerIndex
      }
      this._data = _data
    }

    this._primitiveType = primitiveType
    if(primitiveCount !== null){
      this._primitiveCount = primitiveCount
    }else{
      switch(primitiveType){
        case SCNGeometryPrimitiveType.triangles:
          this._primitiveCount = this._data.length / 3
          break
        case SCNGeometryPrimitiveType.triangleStrip:
          this._primitiveCount = this._data.length - 2
          break
        case SCNGeometryPrimitiveType.line:
          this._primitiveCount = this._data.length / 2
          break
        case SCNGeometryPrimitiveType.point:
          this._primitiveCount = this._data.length
          break
        case SCNGeometryPrimitiveType.polygon:
          this._primitiveCount = this._data.length / 2
          break
      }
    }
    this._bytesPerIndex = bytesPerIndex

    /**
     * @type {TypedArray}
     * @access private
     */
    this._glData = null
    console.log(`SCNGeometryElement: bytesPerIndex: ${bytesPerIndex}`)
    if(bytesPerIndex === 1){
      this._glData = new Uint8Array(this._data)
    }else if(bytesPerIndex === 2){
      this._glData = new Uint16Array(this._data)
    }else if(bytesPerIndex === 4){
      this._glData = new Uint32Array(this._data)
    }else{
      throw new Error(`unknown data size: ${bytesPerIndex}`)
    }
  }

  /**
   * Creates a geometry element from the specified Model I/O submesh object.
   * @access public
   * @param {MDLSubmesh} mdlSubMesh - 
   * @returns {void}
   * @desc The Model I/O framework provides universal support for import, export, description, and processing of several 3D asset file formats and related resources. (For details, see Model I/O.) The MDLSubmesh class is a generic description of an index buffer to be used in rendering a 3D object, along with an assigned material. In SceneKit, materials are assigned to a geometry rather than to its elements, so importing a submesh as a geometry element does not import its material assignment. To import a Model I/O mesh along with its materials, use the SCNGeometry init(mdlMesh:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1419843-init
   */
  initMdlSubmesh(mdlSubMesh) {
  }

  // Inspecting a Geometry Element

  /**
   * The drawing primitive that connects vertices when rendering the geometry element.
   * @type {SCNGeometryPrimitiveType}
   * @desc For possible values, see SCNGeometryPrimitiveType.
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1522917-primitivetype
   */
  get primitiveType() {
    return this._primitiveType
  }

  /**
   * The number of primitives in the element.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1523404-primitivecount
   */
  get primitiveCount() {
    return this._primitiveCount
  }

  /**
   * The data describing the geometry element.
   * @type {Data}
   * @desc An element’s data is an array of index values identifying vertices in a geometry source. SceneKit interprets the data as an array of unsigned integers, whose size is specified by the bytesPerIndex property.
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1523367-data
   */
  get data() {
    return this._data
  }

  /**
   * The number of bytes that represent each index value in the element’s data.
   * @type {number}
   * @desc An element’s data property holds an array of index values identifying vertices in a geometry source. SceneKit interprets the data as an array of unsigned integers, whose size is specified by the bytesPerIndex property.
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1522720-bytesperindex
   */
  get bytesPerIndex() {
    return this._bytesPerIndex
  }

  _createBuffer(context) {
    const gl = context
    this._buffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._buffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this._glData, gl.STATIC_DRAW)

    return this._buffer
  }

  copy() {
    const element = new SCNGeometryElement(
      this._data.slice(0),
      this._primitiveType,
      this._primitiveCount,
      this._bytesPerIndex
    )
    return element
  }

  /**
   * @access private
   * @param {number} index -
   * @returns {number[]} -
   */
  _indexAt(index) {
    if(index < 0 || index >= this.primitiveCount){
      throw new Error(`index out of range: ${index} (0 - ${this.primitiveCount - 1})`)
    }

    const arr = []
    const len = this._primitiveCount
    if(this._primitiveType === SCNGeometryPrimitiveType.triangles){
      const i = index * 3
      return [
        this._data[i+0],
        this._data[i+1],
        this._data[i+2]
      ]
    }else if(this._primitiveType === SCNGeometryPrimitiveType.triangleStrip){
      return [
        this._data[index+0],
        this._data[index+1],
        this._data[index+2]
      ]
    }else if(this._primitiveType === SCNGeometryPrimitiveType.line){
      const i = index * 2
      return [
        this._data[i+0],
        this._data[i+1]
      ]
    }else if(this._primitiveType === SCNGeometryPrimitiveType.point){
      return [this._data[index]]
    }else if(this._primitiveType === SCNGeometryPrimitiveType.polygon){
      return [
        this._data[0],
        this._data[index+1],
        this._data[index+2]
      ]
    }else{
      throw new Error(`unknown primitive type: ${this._primitiveType}`)
    }
  }
}
