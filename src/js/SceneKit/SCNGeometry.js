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
  static get _propTypes() {
    const addSources = (obj, sources, key, coder) => { 
      console.log(`addSources source.length: ${sources.length}, key: ${key}`)
      obj._geometrySources.push(...sources) 
    }
    return {
      name: 'string',
      // levelsOfDetail
      materials: 'NSArray',
      subdivisionLevel: 'integer',
      // edgeCreasesSource
      // program
      // shaderModifiers
      elements: ['NSArray', '_geometryElements'],
      kGeometrySourceSemanticVertex: ['NSArray', addSources],
      kGeometrySourceSemanticNormal: ['NSArray', addSources],
      kGeometrySourceSemanticTexcoord: ['NSArray', addSources],
      kGeometrySourceSemanticColor: ['NSArray', addSources],

      entityID: ['string', '_entityID'],
      shadableHelper: ['SCNShadableHelper', null]
    }
  }

  // Creating a Geometry Object

  /**
   * Creates a new geometry built from the specified geometry sources and elements.
   * @access public
   * @constructor
   * @param {SCNGeometrySource[]} sources - An array of SCNGeometrySource objects describing vertices in the geometry and their attributes.
   * @param {?SCNGeometryElement[]} elements - An array of SCNGeometryElement objects describing how to connect the geometry’s vertices.
   * @desc A geometry's visible content comes from the combination of geometry sources, which contain data describing its vertices, with geometry elements, which contain data describing how the vertices connect to form a surface. Each SCNGeometrySource object describes an attribute of all vertices in the geometry (vertex position, surface normal vector, color, or texture mapping coordinates) identified by the source's semantic property. To create a custom geometry you must provide at least one source, for the vertex semantic. Typically, you also provide sources for normals and texture coordinates for use in lighting and shading.Sources for the vertex, normal, and color semantics must be unique-if multiple objects in the sources array have the same semantic, SceneKit uses only the first. A geometry may have multiple sources for the texcoord semantic-the order of texture coordinate sources in the sources array determines the value to use for the mappingChannel property when attaching materials.Each SCNGeometryElement object describes how vertices from the geometry sources are combined into polygons to create the geometry's shape. Creating a custom geometry requires at least one element. If the elements array contains multiple objects, their order determines the arrangement of the geometry's materials-for details, see the discussion of the materials property.
   * @see https://developer.apple.com/reference/scenekit/scngeometry/1522803-init
   */
  constructor(sources = [], elements = []) {
    super()

    if(!Array.isArray(sources)){
      throw new Error('SCNGeometry(sources, elements): sources must be Array')
    }
    if(!Array.isArray(elements)){
      throw new Error('SCNGeometry(sources, elements): elements must be Array')
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
    this._vertexArrayObjects = null
    this._materialBuffer = null
    //this._textureFlagBuffer = null

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


    /////////////////
    // SCNShadable //
    /////////////////
    
    // Assigning a Custom Shader Program

    /**
     * A program used when rendering the object.
     * @type {?SCNProgram}
     * @see https://developer.apple.com/reference/scenekit/scnshadable/1523689-program
     */
    this.program = null

    // Customizing SceneKit’s Shader Programs

    /**
     * A dictionary of GLSL source code snippets for customizing the shader programs provided by SceneKit.
     * @type {?Map<SCNShaderModifierEntryPoint, string>}
     * @see https://developer.apple.com/reference/scenekit/scnshadable/1523348-shadermodifiers
     */
    this.shaderModifiers = null

    ///////////////////
    // SCNAnimatable //
    ///////////////////

    /**
     * @access private
     * @type {Map}
     */
    this._animations = new Map()

    ///////////////////////
    // SCNBoundingVolume //
    ///////////////////////

    // Working with Bounding Volumes

    /**
     * The minimum and maximum corner points of the object’s bounding box.
     * @type {{min: SCNVector3, max: SCNVector3}}
     * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034705-boundingbox
     */
    this.boundingBox = null

    /**
     * The center point and radius of the object’s bounding sphere.
     * @access private
     * @type {Object}
     * @parameter {SCNVector3} _boundingSphere.center
     * @parameter {number} _boundingSphere.radius
     */
    this._boundingSphere = null

    this._vertexBuffer = null
    this._indexBuffer = null

    this._isPresentationInstance = false
    this._presentation = null

    /**
     * @access private
     * @type {?string}
     */
    this._entityID = null
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
    return this._geometrySources.filter((source) => source.semantic === semantic)
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

  get geometryGLSource() {
    return new Float32Array(this._geometrySources[0])
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
   * @type {Object}
   * @parameter {SCNVector3} _boundingSphere.center -
   * @parameter {number} _boundingSphere.radius -
   * @returns {Object} -
   * @desc Scene Kit defines a bounding sphere in the local coordinate space using a center point and a radius. For example, if a node’s bounding sphere has the center point {3, 1, 4} and radius 2.0, all points in the vertex data of node’s geometry (and any geometry attached to its child nodes) lie within 2.0 units of the center point.The coordinates provided when reading this property are valid only if the object has a volume to be measured. For a geometry containing no vertex data or a node containing no geometry (and whose child nodes, if any, contain no geometry), the values center and radius are both zero.
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034707-boundingsphere
   */
  getBoundingSphere() {
    return this._boundingSphere
  }

  /////////////////
  // SCNShadable //
  /////////////////

  // Handling Parameters in Custom OpenGL Shader Programs

  /**
   * Specifies a block to be called before rendering with programs with the specified GLSL uniform variable or attribute name.
   * @access public
   * @param {string} symbol - A GLSL uniform variable or attribute name.
   * @param {?SCNBindingBlock} [block = null] - A block to be called by SceneKit.
   * @returns {void}
   * @desc Use this method to associate a block with a SceneKit object (geometry or material) to handle setup of an attribute or uniform variable in a custom SCNProgram shader associated with that object. SceneKit calls your block before rendering the object. In the block, you can execute any OpenGL commands or other code necessary for preparing your custom shader. For example, the following block updates the time uniform variable in a custom fragment shader for producing animated effects:CFTimeInterval startTime = CFAbsoluteTimeGetCurrent();
[myNode.geometry.firstMaterial handleBindingOfSymbol:@"time" usingBlock:
    ^(unsigned int programID, unsigned int location, SCNNode *renderedNode, SCNRenderer *renderer) {
        glUniform1f(location, CFAbsoluteTimeGetCurrent() - startTime);
    }];
This method is for OpenGL shader programs only. To bind custom variable data for Metal shader programs, use the handleBinding(ofBufferNamed:frequency:handler:) method.CFTimeInterval startTime = CFAbsoluteTimeGetCurrent();
[myNode.geometry.firstMaterial handleBindingOfSymbol:@"time" usingBlock:
    ^(unsigned int programID, unsigned int location, SCNNode *renderedNode, SCNRenderer *renderer) {
        glUniform1f(location, CFAbsoluteTimeGetCurrent() - startTime);
    }];

   * @see https://developer.apple.com/reference/scenekit/scnshadable/1523063-handlebinding
   */
  handleBindingOfSymbolHandler(symbol, block = null) {
  }

  /**
   * Specifies a block to be called after rendering with programs with the specified GLSL uniform variable or attribute name.
   * @access public
   * @param {string} symbol - A GLSL uniform variable or attribute name.
   * @param {?SCNBindingBlock} [block = null] - A block to be called by SceneKit.
   * @returns {void}
   * @desc Use this method to associate a block with a SceneKit object (geometry or material) to handle cleanup related to an attribute or uniform variable in a custom SCNProgram shader associated with that object. SceneKit will call your block after rendering the object. In the block, you can execute any OpenGL commands or other code necessary for post-rendering tasks.This method is for OpenGL shader programs only. To bind custom variable data for Metal shader programs, use the handleBinding(ofBufferNamed:frequency:handler:) method.
   * @see https://developer.apple.com/reference/scenekit/scnshadable/1522783-handleunbinding
   */
  handleUnbindingOfSymbolHandler(symbol, block = null) {
  }

  ///////////////////
  // SCNAnimatable //
  ///////////////////

  // Managing Animations

  /**
   * Required. Adds an animation object for the specified key.
   * @access public
   * @param {CAAnimation} animation - The animation object to be added.
   * @param {?string} key - An string identifying the animation for later retrieval. You may pass nil if you don’t need to reference the animation later.
   * @returns {void}
   * @desc Newly added animations begin executing after the current run loop cycle ends.SceneKit does not define any requirements for the contents of the key parameter—it need only be unique among the keys for other animations you add. If you add an animation with an existing key, this method overwrites the existing animation.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523386-addanimation
   */
  addAnimationForKey(animation, key) {
    if(typeof key === 'undefined' || key === null){
      key = Symbol()
    }
    const anim = animation.copy()
    // FIXME: use current frame time
    anim._animationStartTime = Date.now() * 0.001
    anim._prevTime = anim._animationStartTime - 0.0000001

    this._animations.set(key, anim)
  }

  /**
   * Required. Returns the animation with the specified key.
   * @access public
   * @param {string} key - A string identifying a previously added animation.
   * @returns {?CAAnimation} - 
   * @desc Attempting to modify any properties of the returned object results in undefined behavior.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1524020-animation
   */
  animationForKey(key) {
    return this._animations.get(key)
  }

  /**
   * Required. Removes all the animations currently attached to the object.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522762-removeallanimations
   */
  removeAllAnimations() {
    this._animations.clear()
  }

  /**
   * Required. Removes the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522880-removeanimation
   */
  removeAnimationForKey(key) {
    this._animations.delete(key)
    // TODO: reset values
  }

  /**
   * Required. Removes the animation attached to the object with the specified key, smoothly transitioning out of the animation’s effect.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @param {number} duration - The duration for transitioning out of the animation’s effect before it is removed.
   * @returns {void}
   * @desc Use this method to create smooth transitions between the effects of multiple animations. For example, the geometry loaded from a scene file for a game character may have associated animations for player actions such as walking and jumping. When the player lands from a jump, you remove the jump animation so the character continues walking. If you use the removeAnimation(forKey:) method to remove the jump animation, SceneKit abruptly switches from the current frame of the jump animation to the current frame of the walk animation. If you use the removeAnimation(forKey:fadeOutDuration:) method instead, SceneKit plays both animations at once during that duration and interpolates vertex positions from one animation to the other, creating a smooth transition.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522841-removeanimation
   */
  removeAnimationForKeyFadeOutDuration(key, duration) {
  }

  /**
   * Required. An array containing the keys of all animations currently attached to the object.
   * @type {string[]}
   * @desc This array contains all keys for which animations are attached to the object, or is empty if there are no attached animations. The ordering of animation keys in the array is arbitrary.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523610-animationkeys
   */
  get animationKeys() {
    const keys = []
    for(const key of this._animations.keys()){
      keys.push(key)
    }
    return keys
  }

  // Pausing and Resuming Animations

  /**
   * Required. Pauses the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523592-pauseanimation
   */
  pauseAnimationForKey(key) {
  }

  /**
   * Required. Resumes a previously paused animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key or if the specified animation is not currently paused.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523332-resumeanimation
   */
  resumeAnimationForKey(key) {
  }

  /**
   * Required. Returns a Boolean value indicating whether the animation attached to the object with the specified key is paused.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523703-isanimationpaused
   */
  isAnimationPausedForKey(key) {
    return false
  }

  // Instance Methods

  /**
   * Required. 
   * @access public
   * @param {number} speed - 
   * @param {string} key - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1778343-setanimationspeed
   */
  setAnimationSpeedForKey(speed, key) {
  }

  /**
   * @access private
   * @param {WebGLContext} gl -
   * @param {SCNGeometry} geometry - 
   * @param {boolean} update -
   * @returns {WebGLBuffer} -
   */
  //_createVertexBuffer(gl, baseGeometry, update = false) {
  _createVertexBuffer(gl, node, update = false) {
    const baseGeometry = node.geometry
    const baseSkinner = node.skinner
    const skinner = node.presentation.skinner
    if(this._vertexBuffer === null){
      this._vertexBuffer = gl.createBuffer()
    }else if(!update){
      return this._vertexBuffer
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    const arr = []
    const vertexSource = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
    const normalSource = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.normal)[0]
    const texcoordSource = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.texcoord)[0]
    //const indexSource = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.boneIndices)[0]
    const indexSource = baseSkinner ? baseSkinner._boneIndices : null
    //const weightSource = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.boneWeights)[0]
    const weightSource = baseSkinner ? baseSkinner._boneWeights: null
    const vectorCount = vertexSource.vectorCount

    const pVertexSource = this.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
    const pNormalSource = this.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.normal)[0]
    const pTexcoordSource = this.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.texcoord)[0]
    //const pIndexSource = this.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.boneIndices)[0]
    const pIndexSource = skinner ? skinner._boneIndices : null
    //const pWeightSource = this.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.boneWeights)[0]
    const pWeightSource = skinner ? skinner._boneWeights : null

    if(typeof vertexSource === 'undefined'){
      throw new Error('vertexSource is undefined')
    }
    if(typeof normalSource !== 'undefined' && normalSource.vectorCount !== vectorCount){
      throw new Error('normalSource.vectorCount !== vertexSource.vectorCount')
    }
    if(typeof texcoordSource !== 'undefined' && texcoordSource.vectorCount !== vectorCount){
      throw new Error('texcoordSource.vectorCount !== vertexSource.vectorCount')
    }

    const vertexArray = vertexSource ? vertexSource.data : null
    const vertexComponents = vertexSource ? vertexSource.componentsPerVector : 0
    const normalArray = normalSource ? normalSource.data : null
    const normalComponents = normalSource ? normalSource.componentsPerVector : 0
    const texcoordArray = texcoordSource ? texcoordSource.data : null
    const texcoordComponents = texcoordSource ? texcoordSource.componentsPerVector : 0

    for(let i=0; i<vectorCount; i++){
      if(vertexSource){
        arr.push(...vertexSource._vectorAt(i))
      }
      if(normalSource){
        arr.push(...normalSource._vectorAt(i))
      }
      if(texcoordSource){
        //console.log(`tex ${i} ${texcoordSource._vectorAt(i)}`)
        arr.push(...texcoordSource._vectorAt(i))
      }
    }

    //console.log(`vertex(0): ${vertexSource._vectorAt(0)}`)
    //console.log(`normal(0): ${normalSource._vectorAt(0)}`)
    //console.log(`texcoord(0): ${texcoordSource._vectorAt(0)}`)

    // update geometry sources
    // FIXME: Don't change geometry sources. Use other variables
    const bytesPerComponent = 4
    let offset = 0
    const stride = (vertexComponents + normalComponents + texcoordComponents) * bytesPerComponent
    pVertexSource._bytesPerComponent = bytesPerComponent
    pVertexSource._dataOffset = offset
    pVertexSource._dataStride = stride
    offset += vertexComponents * bytesPerComponent

    if(pNormalSource){
      pNormalSource._bytesPerComponent = bytesPerComponent
      pNormalSource._dataOffset = offset
      pNormalSource._dataStride = stride
      offset += normalComponents * bytesPerComponent
    }
    if(pTexcoordSource){
      pTexcoordSource._bytesPerComponent = bytesPerComponent
      pTexcoordSource._dataOffset = offset
      pTexcoordSource._dataStride = stride
      offset += texcoordComponents * bytesPerComponent
    }

    //console.log(`offset: ${offset}, vectorCount: ${vectorCount}`)
    offset *= vectorCount

    const indexArray = indexSource ? indexSource.data : null
    const indexComponents = indexSource ? indexSource.componentsPerVector : 0
    const weightArray = weightSource ? weightSource.data : null
    const weightComponents = weightSource ? weightSource.componentsPerVector : 0
    const boneStride = (indexComponents + weightComponents) * bytesPerComponent

    for(let i=0; i<vectorCount; i++){
      if(indexSource){
        arr.push(...indexSource._vectorAt(i))
      }
      if(weightSource){
        arr.push(...weightSource._vectorAt(i))
      }
    }

    if(pIndexSource){
      pIndexSource._bytesPerComponent = bytesPerComponent
      pIndexSource._dataOffset = offset
      pIndexSource._dataStride = boneStride
      offset += indexComponents * bytesPerComponent
    }
    if(pWeightSource){
      pWeightSource._bytesPerComponent = bytesPerComponent
      pWeightSource._dataOffset = offset
      pWeightSource._dataStride = boneStride
      offset += weightComponents * bytesPerComponent
    }

    const vertexData = new Float32Array(arr)
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.DYNAMIC_DRAW)

    // set new data
    pVertexSource._data = arr
    if(pNormalSource){
      pNormalSource._data = arr
    }
    if(pTexcoordSource){
      pTexcoordSource._data = arr
    }
    if(pIndexSource){
      pIndexSource._data = arr
    }
    if(pWeightSource){
      pWeightSource._data = arr
    }

    return this._vertexBuffer
  }

  /**
   * @access private
   * @param {WebGLContext} gl -
   * @param {boolean} update -
   * @returns {WebGLBuffer} -
   */
  _createIndexBuffer(gl, update = false) {
    if(this._indexBuffer && !update){
      return this._indexBuffer
    }
    this._indexBuffer = this._geometryElements[0]._createBuffer(gl)
    return this._indexBuffer
  }

  _createIndexBuffer(gl, update = false) {
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @param {SCNGeometry} baseGeometry - 
   * @returns {void}
   */
  _updateVertexBuffer(gl, baseGeometry) {
    //this._createVertexBuffer(gl, baseGeometry, true)
    const pVertexSource = this.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
    const vertexData = new Float32Array(pVertexSource._data)
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.DYNAMIC_DRAW)
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @param {WebGLProgram} program -
   * @param {number} index - material index
   * @returns {void}
   */
  _bufferMaterialData(gl, program, index) {
    // TODO: move this function to SCNProgram
    const material = this.materials[index]
    const materialData = new Float32Array([
      ...material.ambient.float32Array(),
      ...material.diffuse.float32Array(),
      ...material.specular.float32Array(),
      ...material.emission.float32Array(),
      material.shininess * 100.0, 0, 0, 0 // needs padding for 16-byte alignment
    ])
    gl.bindBuffer(gl.UNIFORM_BUFFER, this._materialBuffer)
    gl.bufferData(gl.UNIFORM_BUFFER, materialData, gl.DYNAMIC_DRAW)
    gl.bindBuffer(gl.UNIFORM_BUFFER, null)

    const textureFlags = []
    const textures = [
      { name: 'emission', symbol: 'TEXTURE0' },
      { name: 'ambient', symbol: 'TEXTURE1' },
      { name: 'diffuse', symbol: 'TEXTURE2' },
      { name: 'specular', symbol: 'TEXTURE3' },
      { name: 'reflective', symbol: 'TEXTURE4' },
      { name: 'transparent', symbol: 'TEXTURE5' },
      { name: 'multiply', symbol: 'TEXTURE6' },
      { name: 'normal', symbol: 'TEXTURE7' }
    ]
    textures.forEach((texture) => {
      const m = material[texture.name]
      if(m._contents instanceof Image){
        m._contents = this._createTexture(gl, m._contents)
      }
      if(m._contents instanceof WebGLTexture){
        textureFlags.push(1)
        gl.activeTexture(gl[texture.symbol]) // FIXME: use m._contents.mappingChannel
        gl.bindTexture(gl.TEXTURE_2D, m._contents)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, m._magnificationFilterFor(gl))
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, m._minificationFilterFor(gl))
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, m._wrapSFor(gl))
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, m._wrapTFor(gl))
      }else{
        textureFlags.push(0)
      }
    })
    // TODO: cache uniform location
    gl.uniform1iv(gl.getUniformLocation(program, 'textureFlags'), new Int32Array(textureFlags))
  }

  copy() {
    const geometry = new SCNGeometry()
    geometry.name = this.name
    geometry.levelsOfDetail = this.levelsOfDetail
    geometry.materials = this.materials
    geometry._geometryElements = this._geometryElements.slice(0)
    geometry._geometrySources = this._geometrySources.slice(0)
    geometry._vertexArrayObjects = this._vertexArrayObjects ? this._vertexArrayObjects.slice(0) : null
    geometry.subdivisonLevel = this.subdivisionLevel
    geometry.edgeCreasesElement = this.edgeCreasesElement
    geometry.edgeCreasesSource = this.edgeCreasesSource
    geometry.program = this.program
    geometry.shaderModifiers = this.shaderModifiers
    //geometry._animationKeys = this._animationKeys
    geometry.boundingBox = this.boundingBox
    //geometry._boundingSphere = this._boundingSphere
    geometry._vertexBuffer = this._vertexBuffer
    geometry._indexBuffer = this._indexBuffer

    return geometry
  }

  _createTexture(gl, image) {
    const texture = gl.createTexture()

    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    console.warn(`image size: ${image.naturalWidth} ${image.naturalHeight}`)
    canvas.getContext('2d').drawImage(image, 0, 0)

    gl.bindTexture(gl.TEXTURE_2D, texture)
    // texImage2D(target, level, internalformat, width, height, border, format, type, source)
    // Safari complains that 'source' is not ArrayBufferView type, but WebGL2 should accept HTMLCanvasElement.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindTexture(gl.TEXTURE_2D, null)
    return texture
  }

}
