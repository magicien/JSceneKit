'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'


/**
 * A container for index data describing how vertices connect to define a three-dimensional object, or geometry.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scngeometryelement
 */
export default class SCNGeometryElement extends NSObject {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Inspecting a Geometry Element

    this._primitiveType = null
    this._primitiveCount = 0
    this._data = null
    this._bytesPerIndex = 0
  }

  // Creating a Geometry Element

  /**
   * Creates a geometry element from the specified array of index values. 
   * @access public
   * @param {IndexType[]} indices - An array of index values, each of which identifies a vertex in a geometry source.
   * @param {SCNGeometryPrimitiveType} primitiveType - The drawing primitive that connects vertices when rendering the geometry element. For possible values, see SCNGeometryPrimitiveType.
   * @returns {void}
   * @desc SceneKit connects the vertices in the order specified by the indices array, arranged according to the primitiveType parameter.This initializer is equivalent to the init(data:primitiveType:primitiveCount:bytesPerIndex:) initializer, but does not require an intermediary Data object; instead, it automatically infers the necessary allocation size and bytesPerIndex values based on the contents of the indices array. To create a custom SCNGeometry object from the geometry element, use the init(sources:elements:) initializer.
   * @see https://developer.apple.com/reference/scenekit/scngeometryelement/1523191-init
   */
  init(indices, primitiveType) {
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
}
