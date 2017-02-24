'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNBoundingVolume from './SCNBoundingVolume'
import SCNShadable from './SCNShadable'
import SCNGeometrySource from './SCNGeometrySource'
import SCNGeometryElement from './SCNGeometryElement'
import SCNLevelOfDetail from './SCNLevelOfDetail'
import SCNMaterial from './SCNMaterial'


/**
 * A three-dimensional shape (also called a model or mesh) that can be displayed in a scene, with attached materials that define its appearance.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @implements {SCNBoundingVolume}
 * @implements {SCNShadable}
 * @see https://developer.apple.com/reference/scenekit/scngeometry
 */
export default class SCNGeometry extends NSObject {
  // Creating a Geometry Object

  /**
   * Creates a new geometry built from the specified geometry sources and elements.
   * @access public
   * @constructor
   * @param {SCNGeometrySource[]} sources - An array of SCNGeometrySource objects describing vertices in the geometry and their attributes.
   * @param {?SCNGeometryElement[]} elements - An array of SCNGeometryElement objects describing how to connect the geometry’s vertices.
   * @desc A geometry’s visible content comes from the combination of geometry sources, which contain data describing its vertices, with geometry elements, which contain data describing how the vertices connect to form a surface. Each SCNGeometrySource object describes an attribute of all vertices in the geometry (vertex position, surface normal vector, color, or texture mapping coordinates) identified by the source’s semantic property. To create a custom geometry you must provide at least one source, for the vertex semantic. Typically, you also provide sources for normals and texture coordinates for use in lighting and shading.Sources for the vertex, normal, and color semantics must be unique—if multiple objects in the sources array have the same semantic, SceneKit uses only the first. A geometry may have multiple sources for the texcoord semantic—the order of texture coordinate sources in the sources array determines the value to use for the mappingChannel property when attaching materials.Each SCNGeometryElement object describes how vertices from the geometry sources are combined into polygons to create the geometry’s shape. Creating a custom geometry requires at least one element. If the elements array contains multiple objects, their order determines the arrangement of the geometry’s materials—for details, see the discussion of the materials property.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522803-init
   */
  constructor(sources = [], elements = []) {
    super()

    if(!Array.isArray(sources)){
      throw 'SCNGeometry(sources, elements): sources must be Array'
    }
    if(!Array.isArray(elements)){
      throw 'SCNGeometry(sources, elements): elements must be Array'
    }

    // Managing Geometry Attributes

    /**
     * A name associated with the geometry object.
     * @type {?string}
     * @see https://developer.apple.com/reference/scenekit/scngeometry/1522953-name
     */
    this.name = null

    /**
     * An array of SCNLevelOfDetail objects for managing the geometry’s appearance when viewed from far away.
     * @type {?SCNLevelOfDetail[]}
     * @see https://developer.apple.com/reference/scenekit/scngeometry/1523745-levelsofdetail
     */
    this.levelsOfDetail = null


    // Managing a Geometry’s Materials

    /**
     * An array of SCNMaterial objects that determine the geometry’s appearance when rendered.
     * @type {SCNMaterial[]}
     * @see https://developer.apple.com/reference/scenekit/scngeometry/1523472-materials
     */
    this.materials = []

    
    // Managing Geometry Data

    this._geometryElements = elements
    this._geometrySources = sources

    // Working with Subdivision Surfaces

    /**
     * The number of subdivisions SceneKit uses to smooth the geometry’s surface at render time.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scngeometry/1524177-subdivisionlevel
     */
    this.subdivisionLevel = 0

    /**
     * The geometry element identifying which edges of the geometry’s surface should remain sharp after subdivision.
     * @type {?SCNGeometryElement}
     * @see https://developer.apple.com/reference/scenekit/scngeometry/1523246-edgecreaseselement
     */
    this.edgeCreasesElement = null

    /**
     * The geometry source specifying the smoothness or sharpness of edges after surface subdivision.
     * @type {?SCNGeometrySource}
     * @see https://developer.apple.com/reference/scenekit/scngeometry/1523479-edgecreasessource
     */
    this.edgeCreasesSource = null

  }

  // Creating a Geometry Object

  /**
   * Creates a new geometry built from the specified geometry sources and elements.
   * @access public
   * @param {SCNGeometrySource[]} sources - An array of SCNGeometrySource objects describing vertices in the geometry and their attributes.
   * @param {?SCNGeometryElement[]} elements - An array of SCNGeometryElement objects describing how to connect the geometry’s vertices.
   * @returns {void}
   * @desc A geometry’s visible content comes from the combination of geometry sources, which contain data describing its vertices, with geometry elements, which contain data describing how the vertices connect to form a surface. Each SCNGeometrySource object describes an attribute of all vertices in the geometry (vertex position, surface normal vector, color, or texture mapping coordinates) identified by the source’s semantic property. To create a custom geometry you must provide at least one source, for the vertex semantic. Typically, you also provide sources for normals and texture coordinates for use in lighting and shading.Sources for the vertex, normal, and color semantics must be unique—if multiple objects in the sources array have the same semantic, SceneKit uses only the first. A geometry may have multiple sources for the texcoord semantic—the order of texture coordinate sources in the sources array determines the value to use for the mappingChannel property when attaching materials.Each SCNGeometryElement object describes how vertices from the geometry sources are combined into polygons to create the geometry’s shape. Creating a custom geometry requires at least one element. If the elements array contains multiple objects, their order determines the arrangement of the geometry’s materials—for details, see the discussion of the materials property.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522803-init
   */
  init(sources, elements) {
  }

  // Managing a Geometry’s Materials

  /**
   * The first material attached to the geometry.
   * @type {?SCNMaterial}
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1523485-firstmaterial
   */
  get firstMaterial() {
    return this.materials[0]
  }

  set firstMaterial(newValue) {
    this.materials[0] = newValue
  }

  /**
   * Returns the first material attached to the geometry with the specified name.
   * @access public
   * @param {string} name - The name of the material to be retrieved.
   * @returns {?SCNMaterial} - 
   * @desc You can use the name property of each SCNMaterial object to make managing your scene graph easier. Materials loaded from a scene file may have names assigned by an artist using a 3D authoring tool.If a geometry has multiple materials attached with the same name, this method returns the first according to the order of the materials array.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1523789-material
   */
  materialNamed(name) {
    return null
  }

  /**
   * Attaches a material to the geometry at the specified index.
   * @access public
   * @param {SCNMaterial} material - The material to attach.
   * @param {number} index - The location in the geometry’s materials array at which to add the new material.ImportantRaises an exception (rangeException) if index is greater than the number of elements in the materials array.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522876-insertmaterial
   */
  insertMaterialAt(material, index) {
  }

  /**
   * Removes a material attached to the geometry.
   * @access public
   * @param {number} index - The index of the attached material to be removed.ImportantRaises an exception (rangeException) if index is beyond the bounds of the materials array.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522646-removematerial
   */
  removeMaterialAt(index) {
  }

  /**
   * Replaces a material attached to the geometry with another.
   * @access public
   * @param {number} index - The index of the attached material to be replaced.ImportantRaises an exception (rangeException) if index is beyond the bounds of the materials array.
   * @param {SCNMaterial} material - The material with which to replace the attached material.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522714-replacematerial
   */
  replaceMaterialAtIndexWith(index, material) {
  }

  // Managing Geometry Data

  /**
   * Returns the geometry element at a specified index.
   * @access public
   * @param {number} elementIndex - The index of the geometry element.
   * @returns {SCNGeometryElement} - 
   * @desc Each SCNGeometryElement object describes how vertices from the geometry’s sources are combined into polygons to create the geometry’s shape. Visible geometries contain at least one element.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1523266-geometryelement
   */
  geometryElementAtIndex(elementIndex) {
    return this._geometryElements[elementIndex]
  }

  /**
   * Returns the geometry sources for a specified semantic.
   * @access public
   * @param {SCNGeometrySource.Semantic} semantic - A constant identifying a semantic for which to return geometry sources. See Geometry Semantic Identifiers for possible values.
   * @returns {SCNGeometrySource[]} - 
   * @desc Each SCNGeometrySource object describes an attribute of all vertices in the geometry (such as vertex position, surface normal vector, color, or texture mapping coordinates) identified by the source’s semantic property. A geometry always has at least one source, for the vertex semantic, typically has additional sources for use in lighting and shading, and may have other sources for skeletal animation or surface subdivision information.The vertex, normal, and color semantics each refer to at most one source. A geometry may have multiple sources for the texcoord semantic—in this case, indices in the returned array correspond to values for the mappingChannel property used when attaching textures to materials.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522926-getgeometrysources
   */
  getGeometrySourcesForSemantic(semantic) {
    return null
  }
  /**
   * An array of geometry elements that describe the geometry’s shape.
   * @type {SCNGeometryElement[]}
   * @desc Each SCNGeometryElement object describes how vertices from the geometry’s sources are combined into polygons to create the geometry’s shape. Visible geometries contain at least one element.For geometries with multiple elements, you can use the materials property to attach different materials to each element.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1523046-geometryelements
   */
  get geometryElements() {
    return this._geometryElements.slice(0)
  }

  /**
   * An array of geometry sources that provide vertex data for the geometry.
   * @type {SCNGeometrySource[]}
   * @desc Each SCNGeometrySource object describes an attribute of all vertices in the geometry (such as vertex position, surface normal vector, color, or texture mapping coordinates) identified by the source’s semantic property. A geometry always has at least one source (for the vertex semantic), typically has additional sources for use in lighting and shading, and may have other sources for skeletal animation or surface subdivision information.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1523662-geometrysources
   */
  get geometrySources() {
    return this._geometrySources.slice(0)
  }

  /**
   * The number of geometry elements in the geometry.
   * @type {number}
   * @desc Each SCNGeometryElement object describes how vertices from the geometry’s sources are combined into polygons to create the geometry’s shape. Visible geometries contain at least one element.For geometries with multiple elements, you can use the materials property to attach different materials to each element.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1523800-geometryelementcount
   */
  get geometryElementCount() {
    return this._geometryElements.length
  }

  ///////////////////////
  // SCNBoundingVolume //
  ///////////////////////

  // Working with Bounding Volumes
  /**
   * The center point and radius of the object’s bounding sphere.
   * @type {{center: SCNVector3, radius: number}}
   * @desc Scene Kit defines a bounding sphere in the local coordinate space using a center point and a radius. For example, if a node’s bounding sphere has the center point {3, 1, 4} and radius 2.0, all points in the vertex data of node’s geometry (and any geometry attached to its child nodes) lie within 2.0 units of the center point.The coordinates provided when reading this property are valid only if the object has a volume to be measured. For a geometry containing no vertex data or a node containing no geometry (and whose child nodes, if any, contain no geometry), the values center and radius are both zero.
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034707-boundingsphere
   */
  getBoundingSphere() {
    return this._boundingSphere
  }

}
