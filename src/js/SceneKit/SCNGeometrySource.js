'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNMatrix4MakeTranslation from './SCNMatrix4MakeTranslation'
import CGPoint from '../CoreGraphics/CGPoint'
/*global Buffer*/

const _Semantic = {
  boneIndices: 'kGeometrySourceSemanticBoneIndices',
  boneWeights: 'kGeometrySourceSemanticBoneWeights',
  color: 'kGeometrySourceSemanticColor',
  edgeCrease: 'kGeometrySourceSemanticEdgeCrease',
  normal: 'kGeometrySourceSemanticNormal',
  tangent: 'kGeometrySourceSemanticTangent',
  texcoord: 'kGeometrySourceSemanticTexcoord',
  vertex: 'kGeometrySourceSemanticVertex',
  vertexCrease: 'kGeometrySourceSemanticVertexCrease'
}


/**
 * A container for vertex data forming part of the definition for a three-dimensional object, or geometry.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scngeometrysource
 */
export default class SCNGeometrySource extends NSObject {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        return new SCNGeometrySource(
          propValues.data,
          propValues.semantic,
          propValues.vectorCount,
          propValues.floatComponents,
          propValues.componentsPerVector,
          propValues.bytesPerComponent,
          propValues.dataOffset,
          propValues.dataStride
        )
      },
      data: ['NSMutableData', null],
      semantic: ['string', null],
      vectorCount: ['integer', null],
      floatComponents: ['boolean', null],
      componentsPerVector: ['integer', null],
      bytesPerComponent: ['integer', null],
      dataOffset: ['integer', null],
      dataStride: ['integer', null],
      mkSemantic: ['boolean', null] // ?
    }
  }

  /**
   * Creates a geometry source from the specified data and options.
   * @access public
   * @constructor
   * @param {number[]|Buffer} data - The data for the geometry source.
   * @param {SCNGeometrySource.Semantic} semantic - The semantic value (or attribute) that the geometry source describes for each vertex. See Geometry Semantic Identifiers for available values.
   * @param {number} vectorCount - The number of geometry source vectors.
   * @param {boolean} floatComponents - A Boolean value that indicates whether vector components are floating-point values. Specify true for floating-point values, or false for integer values.
   * @param {number} componentsPerVector - The number of scalar components in each vector.
   * @param {number} bytesPerComponent - The size, in bytes, of each vector component.
   * @param {number} offset - The offset, in bytes, from the beginning of the data to the first vector component to be used in the geometry source.
   * @param {number} stride - The number of bytes from each vector to the next in the data.
   * @desc A geometry source’s data is an array of vectors, each of which represents a particular attribute (or semantic) of a vertex in the geometry. The other parameters determine how SceneKit interprets this data. For example, an array of vertex positions may have three 32-bit floating-point components per vector, but an array of texture coordinates may have two 8-bit integer coponents per vector. You can use the offset and stride parameters together to interleave data for multiple geometry sources in the same array, improving rendering performance. See SCNGeometrySource for details.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1523320-init
   */
  constructor(data, semantic, vectorCount, floatComponents, componentsPerVector, bytesPerComponent, offset, stride) {
    super()

    // Inspecting a Geometry Source
    this._data = data
    this._semantic = semantic
    this._vectorCount = vectorCount
    this._usesFloatComponents = floatComponents
    this._componentsPerVector = componentsPerVector
    this._bytesPerComponent = bytesPerComponent
    this._dataOffset = offset
    this._dataStride = stride

    if(data instanceof Buffer){
      let loadFunc = null
      if(floatComponents){
        switch(bytesPerComponent){
          case 4:
            loadFunc = (_offset) => { return data.readFloatLE(_offset) }
            break
          case 8:
            loadFunc = (_offset) => { return data.readDoubleLE(_offset) }
            break
          default:
            throw new Error(`unknown float data size: ${bytesPerComponent}`)
        }
      }else{
        loadFunc = (_offset) => { return data.readIntLE(_offset, bytesPerComponent) }
      }

      const _data = []
      const count = data.length / bytesPerComponent
      let _offset = 0
      for(let i=0; i<count; i++){
        _data.push(loadFunc(_offset))
        _offset += bytesPerComponent
      }
      this._data = _data
    }

    /**
     * @type {TypedArray}
     * @access private
     */
    //this._glData = null
    //if(this._hasTypedArrayData()){
    //  this._glData = this._data
    //}else{
    //  if(floatComponents){
    //    if(bytesPerComponent === 4){
    //      this._glData = new Float32Array(this._data)
    //    }else if(bytesPerComponent === 8){
    //      this._glData = new Float64Array(this._data)
    //    }
    //  }else{
    //    if(bytesPerComponent === 1){
    //      this._glData = new Uint8Array(this._data)
    //    }else if(bytesPerComponent === 2){
    //      this._glData = new Uint16Array(this._data)
    //    }else if(bytesPerComponent === 4){
    //      this._glData = new Uint32Array(this._data)
    //    }
    //  }
    //}

    //if(this._glData === null){
    //  throw new Error(`unknown buffer data type: float: ${floatComponents}, size: ${bytesPerComponent}`)
    //}

    this._buffer = null
  }

  _createBuffer(context) {
    const gl = context
    this._buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer)
    // FIXME: dynamic data
    gl.bufferData(gl.ARRAY_BUFFER, this._glData, gl.STATIC_DRAW)
    return this._buffer
  }

  /**
   * @access private
   * @returns {boolean} -
   */
  _hasTypedArrayData() {
    if(this._usesFloatComponents){
      if(this._bytesPerComponent === 4){
        return this._data instanceof Float32Array
      }else if(this._bytesPerComponent === 8){
        return this._data instanceof Float64Array
      }
    }else{
      if(this._bytesPerComponent === 1){
        return this._data instanceof Uint8Array
      }else if(this._bytesPerComponent === 2){
        return this._data instanceof Uint16Array
      }else if(this._bytesPerComponent === 4){
        return this._data instanceof Uint32Array
      }
    }
    return false
  }

  // Creating Geometry Sources

  /**
   * Creates a geometry source from the specified data and options.
   * @access public
   * @param {number[]} data - The data for the geometry source.
   * @param {SCNGeometrySource.Semantic} semantic - The semantic value (or attribute) that the geometry source describes for each vertex. See Geometry Semantic Identifiers for available values.
   * @param {number} vectorCount - The number of geometry source vectors.
   * @param {boolean} floatComponents - A Boolean value that indicates whether vector components are floating-point values. Specify true for floating-point values, or false for integer values.
   * @param {number} componentsPerVector - The number of scalar components in each vector.
   * @param {number} bytesPerComponent - The size, in bytes, of each vector component.
   * @param {number} dataOffset - The offset, in bytes, from the beginning of the data to the first vector component to be used in the geometry source.
   * @param {number} dataStride - The number of bytes from each vector to the next in the data.
   * @returns {SCNGeometrySource} -
   * @desc A geometry source’s data is an array of vectors, each of which represents a particular attribute (or semantic) of a vertex in the geometry. The other parameters determine how SceneKit interprets this data. For example, an array of vertex positions may have three 32-bit floating-point components per vector, but an array of texture coordinates may have two 8-bit integer coponents per vector. You can use the offset and stride parameters together to interleave data for multiple geometry sources in the same array, improving rendering performance. See SCNGeometrySource for details.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1523320-init
   */
  static geometrySourceWithDataSemanticVectorCountFloatComponentsComponentsPerVectorBytesPerComponentDataOffsetDataStride(data, semantic, vectorCount, floatComponents, componentsPerVector, bytesPerComponent, dataOffset, dataStride) {
    const instance = new SCNGeometrySource(
      data,
      semantic,
      vectorCount,
      floatComponents,
      componentsPerVector,
      bytesPerComponent,
      dataOffset,
      dataStride
    )

    return instance
  }

  /**
   * Creates a geometry source from an array of vertex positions. 
   * @access public
   * @param {SCNVector3[]} vertices - An array of three-component vectors, each of which represents a vertex position for the geometry source.
   * @param {number} count - The number of vertices
   * @returns {SCNGeometrySource} -
   * @desc SceneKit converts this data to its own format to optimize rendering performance. To read the converted data, examine the properties of the created SCNGeometrySource object.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/2034708-init
   */
  static geometrySourceWithVerticesCount(vertices, count) {
    const data = []
    for(let i=0; i<count; i++){
      data.push(vertices[i].x, vertices[i].y, vertices[i].z)
    }

    const instance = new SCNGeometrySource(
      data, // data
      SCNGeometrySource.Semantic.vertex, // semantic
      count, // vectorCount
      true, // floatComponents
      3, // componentsPerVector
      4, // bytesPerComponent
      0, // offset
      12 // stride
    )
    return instance
  }

  /**
   * Creates a geometry source from an array of texture coordinate points.
   * @access public
   * @param {CGPoint[]} texcoord - An array of points, each of which represents a texture coordinate pair for the geometry source.
   * @param {number} count - The number of texture coordinate points.
   * @returns {SCNGeometrySource} -
   * @desc SceneKit converts this data to its own format to optimize rendering performance. To read the converted data, examine the properties of the created SCNGeometrySource object.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522718-init
   */
  static geometrySourceWithTextureCoordinatesCount(texcoord, count) {
    const data = []
    for(let i=0; i<count; i++){
      data.push(texcoord[i].x, texcoord[i].y)
    }

    const instance = new SCNGeometrySource(
      data, // data
      SCNGeometrySource.Semantic.texcoord, // semantic
      count, // vectorCount
      true, // floatComponents
      2, // componentsPerVector
      4, // bytesPerComponent
      0, // offset
      8 // stride
    )
    return instance

  }

  /**
   * Creates a geometry source from an array of normal vertices.
   * @access public
   * @param {SCNVector3[]} normals - An array of vectors, which represents a normal vector for the geometry source.
   * @param {number} count - The number of normals
   * @returns {SCNGeometrySource} -
   */
  static geometrySourceWithNormalsCount(normals, count) {
    const data = []
    for(let i=0; i<count; i++){
      data.push(normals[i].x, normals[i].y, normals[i].z)
    }

    const instance = new SCNGeometrySource(
      data, // data
      SCNGeometrySource.Semantic.normal, // semantic
      count, // vectorCount
      true, // floatComponents
      3, // componentsPerVector
      4, // bytesPerComponent
      0, // offset
      12 // stride
    )
    return instance
  }

  // Inspecting a Geometry Source

  /**
   * The data for the geometry source.
   * @type {Data}
   * @desc A geometry source’s data is an array of vectors, each of which represents a particular attribute (or semantic) of a vertex in the geometry. The other properties of the geometry source determine how SceneKit interprets this data. For example, an array of vertex positions may have three 32-bit floating-point components per vector, but an array of texture coordinates may have two 8-bit integer coponents per vector.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522881-data
   */
  get data() {
    return this._data.slice(0)
  }

  /**
   * The semantic value (or attribute) the geometry source describes for each vertex.
   * @type {SCNGeometrySource.Semantic}
   * @desc A semantic describes an attribute for each vertex, such as position, color, surface normal vector, or texture coordinates.See Geometry Semantic Identifiers for available values.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1523071-semantic
   */
  get semantic() {
    return this._semantic
  }

  /**
   * The number of vectors in the data.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522648-vectorcount
   */
  get vectorCount() {
    return this._vectorCount
  }

  /**
   * A Boolean value that indicates whether vector components are floating-point values.
   * @type {boolean}
   * @desc If true, SceneKit interprets the geometry source’s data as an array of vectors whose components are floating-point values. The type of floating-point value is determined by the SCNGeometrySource property: 4 bytes for float values or 8 bytes for double values. If false, SceneKit interprets the geometry source’s data as an array of vectors whose components are integer values. The type of integer value is determined by the SCNGeometrySource property; for example, 2 bytes for unsigned short values or 4 bytes for unsigned int values.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522920-usesfloatcomponents
   */
  get usesFloatComponents() {
    return this._usesFloatComponents
  }

  /**
   * The number of scalar components in each vector.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522832-componentspervector
   */
  get componentsPerVector() {
    return this._componentsPerVector
  }

  /**
   * The size, in bytes, of each vector component.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522633-bytespercomponent
   */
  get bytesPerComponent() {
    return this._bytesPerComponent
  }

  /**
   * The offset, in bytes, from the beginning of the data to the first vector component to be used in the geometry source.
   * @type {number}
   * @desc You can use the SCNGeometrySource and SCNGeometrySource parameters can together to interleave data for multiple geometry sources in the same array, improving rendering performance. See SCNGeometrySource for details.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522834-dataoffset
   */
  get dataOffset() {
    return this._dataOffset
  }

  /**
   * The number of bytes from a vector to the next one in the data.
   * @type {number}
   * @desc You can use the SCNGeometrySource and SCNGeometrySource parameters can together to interleave data for multiple geometry sources in the same array, improving rendering performance. See SCNGeometrySource for details.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1524197-datastride
   */
  get dataStride() {
    return this._dataStride
  }

  // Creating GPU-Mutable Geometry Sources

  /**
   * Creates a geometry source whose vertex data resides in the specified Metal buffer, allowing modification through a Metal compute shader.
   * @access public
   * @param {MTLBuffer} mtlBuffer - A Metal buffer containing per-vertex data for the geometry source.
   * @param {MTLVertexFormat} vertexFormat - The type of per-vertex data in the buffer. A MTLVertexFormat value defines the number of components for each vector in the geometry source and the data type and size of each component.
   * @param {SCNGeometrySource.Semantic} semantic - The semantic value (or attribute) that the geometry source describes for each vertex. See Geometry Semantic Identifiers for available values.
   * @param {number} vertexCount - The number of vertices in the geometry source.
   * @param {number} offset - The offset, in bytes, from the beginning of the data to the first vector component to be used in the geometry source.
   * @param {number} stride - The number of bytes from each vector to the next in the data.
   * @returns {SCNGeometrySource} -
   * @desc Use this method to create a geometry source whose underlying data can be modified at render time by a Metal compute shader running on the GPU. To create a MTLBuffer object for use with a geometry source, use the device property of the SceneKit view (or other renderer) responsible for drawing your scene.// Create and fill a buffer.
id <MTLDevice> device = self.scnView.device;
self.geometryBuffer = [device newBufferWithBytes:myData length:myLength options:myOptions];
// Create a geometry source from the buffer.
SCNGeometrySource *source = [SCNGeometrySource geometrySourceWithBuffer:buffer
                             vertexFormat:myVertexFormat
                                 semantic:SCNGeometrySourceSemanticVertex
                              vertexCount:myVertexCount
                               dataOffset:0
                               dataStride:0];
Then, to modify the buffer’s contents at render time, implement a scene renderer delegate and schedule a compute command encoder during a render delegate method such as renderer(_:willRenderScene:atTime:).- (void)renderer:(id <SCNSceneRenderer>)aRenderer willRenderScene:(SCNScene *)scene atTime:(NSTimeInterval)time {
     // Get a command buffer and compute encoder from the view (or other renderer).
     id<MTLCommandBuffer> myCommandBuffer = [aRenderer.commandQueue commandBuffer];
     id<MTLComputeCommandEncoder> myComputeEncoder = [myCommandBuffer computeCommandEncoder];
 
     // Configure the compute command encoder.
     // (Note pipeline state is preconfigured outside of the render loop.)
     [myComputeEncoder setComputePipelineState:self.pipelineState];
     [myComputeEncoder setBuffer:self.geometryBuffer offset:0 atIndex:0];
 
     // Schedule the compute command and commit the command buffer.
     [myComputeEncoder dispatchThreadgroups:myThreadgroupCount
                      threadsPerThreadgroup:myThreadCount];
     [myComputeEncoder endEncoding];
     [myCommandBuffer commit];
}
NoteGeometry sources backed by a Metal buffer are available only with SceneKit views (or other renderers) whose renderingAPI property is metal. Metal commands that modify the buffer’s contents must be enqueued from within one of the render loop methods defined in the SCNSceneRendererDelegate protocol. The result of attempting to modify a buffer at any other time is undefined.// Create and fill a buffer.
id <MTLDevice> device = self.scnView.device;
self.geometryBuffer = [device newBufferWithBytes:myData length:myLength options:myOptions];
// Create a geometry source from the buffer.
SCNGeometrySource *source = [SCNGeometrySource geometrySourceWithBuffer:buffer
                             vertexFormat:myVertexFormat
                                 semantic:SCNGeometrySourceSemanticVertex
                              vertexCount:myVertexCount
                               dataOffset:0
                               dataStride:0];
- (void)renderer:(id <SCNSceneRenderer>)aRenderer willRenderScene:(SCNScene *)scene atTime:(NSTimeInterval)time {
     // Get a command buffer and compute encoder from the view (or other renderer).
     id<MTLCommandBuffer> myCommandBuffer = [aRenderer.commandQueue commandBuffer];
     id<MTLComputeCommandEncoder> myComputeEncoder = [myCommandBuffer computeCommandEncoder];
 
     // Configure the compute command encoder.
     // (Note pipeline state is preconfigured outside of the render loop.)
     [myComputeEncoder setComputePipelineState:self.pipelineState];
     [myComputeEncoder setBuffer:self.geometryBuffer offset:0 atIndex:0];
 
     // Schedule the compute command and commit the command buffer.
     [myComputeEncoder dispatchThreadgroups:myThreadgroupCount
                      threadsPerThreadgroup:myThreadCount];
     [myComputeEncoder endEncoding];
     [myCommandBuffer commit];
}

   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522873-init
   */
  static initBufferDataOffsetDataStride(mtlBuffer, vertexFormat, semantic, vertexCount, offset, stride) {
  }

  // Structures

  /**
   * @type {Object} Semantic
   * @property {string} boneIndices The semantic for bone index data, used for skeletal animation of skinned surfaces.
   * @property {string} boneWeights The semantic for bone weight data, used for skeletal animation of skinned surfaces.
   * @property {string} color The semantic for per-vertex color data.
   * @property {string} edgeCrease The semantic for edge crease data, used for subdividing surfaces.
   * @property {string} normal The semantic for surface normal data.
   * @property {string} tangent The semantic for surface tangent vector data.
   * @property {string} texcoord The semantic for texture coordinate data.
   * @property {string} vertex The semantic for vertex position data.
   * @property {string} vertexCrease The semantic for vertex crease data, used for subdividing surfaces.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource.semantic
   */
  static get Semantic() {
    return _Semantic
  }

  /**
   * @access private
   * @param {number} index -
   * @returns {number[]} -
   */
  _vectorAt(index) {
    if(index < 0 || index >= this.vectorCount){
      throw new Error(`index out of range: ${index} (0 - ${this.vectorCount - 1})`)
    }
    const indexStride = this._dataStride / this._bytesPerComponent
    const ind = index * indexStride + this._dataOffset / this._bytesPerComponent
    const arr = []
    for(let i=0; i<this._componentsPerVector; i++){
      arr.push(this._data[ind + i])
    }
    return arr
  }

  /**
   * @access private
   * @param {number} index -
   * @returns {SCNVector3|SCNVector4|number[]} -
   */
  _scnVectorAt(index) {
    const vec = this._vectorAt(index)
    if(vec.length === 2){
      return new CGPoint(vec[0], vec[1])
    }else if(vec.length === 3){
      return new SCNVector3(vec[0], vec[1], vec[2])
    }else if(vec.length === 4){
      return new SCNVector4(vec[0], vec[1], vec[2], vec[3])
    }
    return vec
  }

  /**
   * @access public
   * @param {number[]|SCNVector3|SCNVector4} v -
   * @param {number} index -
   * @returns {void}
   */
  _setVectorAt(v, index) {
    if(index < 0 || index >= this.vectorCount){
      throw new Error(`index out of range: ${index} (0 - ${this.vectorCount - 1})`)
    }
    let data = v
    if(v instanceof SCNVector3){
      data = [v.x, v.y, v.z]
    }else if(v instanceof SCNVector4){
      data = [v.x, v.y, v.z, v.w]
    }
    if(data.length !== this._componentsPerVector){
      throw new Error(`vector size inconsistent: ${data.length} != ${this._componentsPerVector}`)
    }

    const indexStride = this._dataStride / this._bytesPerComponent
    const ind = index * indexStride + this._dataOffset / this._bytesPerComponent
    for(let i=0; i<this._componentsPerVector; i++){
      this._data[ind + i] = v[i]
    }
  }

  /**
   * 
   * @access private
   * @param {SCNMatrix4} transform -
   * @returns {Object}
   */
  _createBoundingBox(transform = null) {
    const t = (transform ? transform : SCNMatrix4MakeTranslation(0, 0, 0))
    const min = new SCNVector3(Infinity, Infinity, Infinity)
    const max = new SCNVector3(-Infinity, -Infinity, -Infinity)
    if(this._componentsPerVector !== 3){
      throw new Error('componentsPerVector !== 3')
    }

    const indexStride = this._dataStride / this._bytesPerComponent
    let ind = this._dataOffset / this._bytesPerComponent
    const len = this._vectorCount
    const arr = []
    for(let i=0; i<len; i++){
      const p = (new SCNVector3(this._data[ind + 0], this._data[ind + 1], this._data[ind + 2])).transform(t)
      //const x = this._data[ind + 0]
      //const y = this._data[ind + 1]
      //const z = this._data[ind + 2]
      if(p.x < min.x){
        min.x = p.x
      }
      if(p.x > max.x){
        max.x = p.x
      }
      if(p.y < min.y){
        min.y = p.y
      }
      if(p.y > max.y){
        max.y = p.y
      }
      if(p.z < min.z){
        min.z = p.z
      }
      if(p.z > max.z){
        max.z = p.z
      }
      ind += indexStride
    }

    return { min: min, max: max }
  }

  /**
   * 
   * @access public
   * @param {number} value -
   * @returns {void}
   */
  fill(value) {
    let index = this._dataOffset / this._bytesPerComponent
    const stride = this._dataStride / this._bytesPerComponent
    for(let i=0; i<this._vectorCount; i++){
      for(let j=0; j<this._componentsPerVector; j++){
        this._data[index + j] = value
      }
      index += stride
    }
  }

  copy() {
    const source = new SCNGeometrySource(
      this._data.slice(0),
      this._semantic,
      this._vectorCount,
      this._usesFloatComponents,
      this._componentsPerVector,
      this._bytesPerComponent,
      this._dataOffset,
      this._dataStride
    )
    return source
  }
}
