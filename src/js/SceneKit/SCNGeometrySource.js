'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNVector3 from './SCNVector3'
import CGPoint from '../CoreGraphics/CGPoint'

const _Semantic = {
  boneIndices: Symbol(),
  boneWeights: Symbol(),
  color: Symbol(),
  edgeCrease: Symbol(),
  normal: Symbol(),
  tangent: Symbol(),
  texcoord: Symbol(),
  vertex: Symbol(),
  vertexCrease: Symbol()
}


/**
 * A container for vertex data forming part of the definition for a three-dimensional object, or geometry.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scngeometrysource
 */
export default class SCNGeometrySource extends NSObject {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Inspecting a Geometry Source

    this._data = null
    this._semantic = null
    this._vectorCount = 0
    this._usesFloatComponents = false
    this._componentsPerVector = 0
    this._bytesPerComponent = 0
    this._dataOffset = 0
    this._dataStride = 0
  }

  // Creating Geometry Sources

  /**
   * Creates a geometry source from the specified data and options.
   * @access public
   * @param {Data} data - The data for the geometry source.
   * @param {SCNGeometrySource.Semantic} semantic - The semantic value (or attribute) that the geometry source describes for each vertex. See Geometry Semantic Identifiers for available values.
   * @param {number} vectorCount - The number of geometry source vectors.
   * @param {boolean} floatComponents - A Boolean value that indicates whether vector components are floating-point values. Specify true for floating-point values, or false for integer values.
   * @param {number} componentsPerVector - The number of scalar components in each vector.
   * @param {number} bytesPerComponent - The size, in bytes, of each vector component.
   * @param {number} offset - The offset, in bytes, from the beginning of the data to the first vector component to be used in the geometry source.
   * @param {number} stride - The number of bytes from each vector to the next in the data.
   * @returns {void}
   * @desc A geometry source’s data is an array of vectors, each of which represents a particular attribute (or semantic) of a vertex in the geometry. The other parameters determine how SceneKit interprets this data. For example, an array of vertex positions may have three 32-bit floating-point components per vector, but an array of texture coordinates may have two 8-bit integer coponents per vector. You can use the offset and stride parameters together to interleave data for multiple geometry sources in the same array, improving rendering performance. See SCNGeometrySource for details.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1523320-init
   */
  initUsesFloatComponentsDataOffsetDataStride(data, semantic, vectorCount, floatComponents, componentsPerVector, bytesPerComponent, offset, stride) {
  }

  /**
   * Creates a geometry source from an array of vertex positions. 
   * @access public
   * @param {SCNVector3[]} vertices - An array of three-component vectors, each of which represents a vertex position for the geometry source.
   * @returns {void}
   * @desc SceneKit converts this data to its own format to optimize rendering performance. To read the converted data, examine the properties of the created SCNGeometrySource object.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/2034708-init
   */
  init(vertices) {
  }

  /**
   * Creates a geometry source from an array of texture coordinate points.
   * @access public
   * @param {UnsafePointer<CGPoint>} texcoord - An array of points, each of which represents a texture coordinate pair for the geometry source.
   * @param {number} count - The number of texture coordinate points.
   * @returns {void}
   * @desc SceneKit converts this data to its own format to optimize rendering performance. To read the converted data, examine the properties of the created SCNGeometrySource object.To create a custom SCNGeometry object from the geometry source, use the init(sources:elements:) method.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522718-init
   */
  initTextureCoordinates(texcoord, count) {
  }

  // Inspecting a Geometry Source
  /**
   * The data for the geometry source.
   * @type {Data}
   * @desc A geometry source’s data is an array of vectors, each of which represents a particular attribute (or semantic) of a vertex in the geometry. The other properties of the geometry source determine how SceneKit interprets this data. For example, an array of vertex positions may have three 32-bit floating-point components per vector, but an array of texture coordinates may have two 8-bit integer coponents per vector.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource/1522881-data
   */
  get data() {
    return this._data
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
   * @returns {void}
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
  initBufferDataOffsetDataStride(mtlBuffer, vertexFormat, semantic, vertexCount, offset, stride) {
  }

  // Structures
  /**
   * @type {Object} Semantic
   * @property {Symbol} boneIndices The semantic for bone index data, used for skeletal animation of skinned surfaces.
   * @property {Symbol} boneWeights The semantic for bone weight data, used for skeletal animation of skinned surfaces.
   * @property {Symbol} color The semantic for per-vertex color data.
   * @property {Symbol} edgeCrease The semantic for edge crease data, used for subdividing surfaces.
   * @property {Symbol} normal The semantic for surface normal data.
   * @property {Symbol} tangent The semantic for surface tangent vector data.
   * @property {Symbol} texcoord The semantic for texture coordinate data.
   * @property {Symbol} vertex The semantic for vertex position data.
   * @property {Symbol} vertexCrease The semantic for vertex crease data, used for subdividing surfaces.
   * @see https://developer.apple.com/reference/scenekit/scngeometrysource.semantic
   */
  static get Semantic() {
    return _Semantic
  }
}
