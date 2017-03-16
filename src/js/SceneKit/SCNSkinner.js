'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNGeometry from './SCNGeometry'
import SCNNode from './SCNNode'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMatrix4 from './SCNMatrix4'


/**
 * An object that manages the relationship between skeletal animations and the nodes and geometries they animate.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scnskinner
 */
export default class SCNSkinner extends NSObject {

  // Creating a Skinner Object

  /**
   * Creates a skinner object with the specified visible geometry and skeleton information.
   * @access public
   * @constructor
   * @param {?SCNGeometry} baseGeometry - The geometry whose surface the skinner’s animation skeleton deforms.
   * @param {SCNNode[]} bones - An array of SCNNode objects, each representing a bone or control point for the animation skeleton.
   * @param {?NSValue[]} boneInverseBindTransforms - An array of NSValue objects containing SCNMatrix4 transforms, each of which corresponds to a node in the bones array. Each value is the inverse matrix (see SCNMatrix4Invert(_:)) of that node’s transform property for the skeleton’s default pose.
   * @param {SCNGeometrySource} boneWeights - The geometry source defining the influence of each bone on the positions of vertices in the geometry. For details, see the boneWeights property.
   * @param {SCNGeometrySource} boneIndices - The geometry source defining the mapping from bone indices in skeleton data to the skinner’s bones array. For details, see the boneIndices property.
   * @desc To use the skinner object in a scene, assign it to the skinner property of a node. That node’s geometry property should reference the same SCNGeometry object as the skinner’s baseGeometry property.
   * @see https://developer.apple.com/reference/scenekit/scnskinner/1523964-init
   */
  constructor(baseGeometry, bones, boneInverseBindTransforms, boneWeights, boneIndices) {
    super()

    // data length consistency check
    const boneLen = bones.length
    //const vectorLen = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex).vectorCount
    if(boneInverseBindTransforms.length !== boneLen){
      throw new Error(`SCNSkinner: bones.length (${boneLen}) !== boneInverseBindTransforms.length (${boneInverseBindTransforms.length})`)
    }
    //if(boneWeights.vectorCount !== vectorLen){
    //  throw new Error(`SCNSkinner: vertices.length (${vectorLen}) !== boneWeights.vectorCount (${boneWeights.vectorCount})`)
    //}
    //if(boneIndices.vectorCount !== vectorLen){
    //  throw new Error(`SCNSkinner: vertices.length (${vectorLen}) !== boneIndices.vectorCount (${boneIndices.vectorCount})`)
    //}
    if(boneWeights.componentsPerVector !== boneIndices.componentsPerVector){
      throw new Error(`SCNSkinner: boneWeights.componentsPerVector (${boneWeights.componentsPerVector}) !== boneIndices.componentsPerVector (${boneWeights.componentsPerVector})`)
    }

    // Working with a Skinned Geometry

    /**
     * The geometry whose surface the skinner’s animation skeleton deforms.
     * @type {?SCNGeometry}
     * @see https://developer.apple.com/reference/scenekit/scnskinner/1522823-basegeometry
     */
    this.baseGeometry = baseGeometry

    /**
     * The coordinate transformation for the skinner’s geometry in its default state.
     * @type {SCNMatrix4}
     * @see https://developer.apple.com/reference/scenekit/scnskinner/1523160-basegeometrybindtransform
     */
    this.baseGeometryBindTransform = new SCNMatrix4()


    // Working with an Animation Skeleton

    /**
     * The root node of the skinner object’s animation skeleton.
     * @type {?SCNNode}
     * @see https://developer.apple.com/reference/scenekit/scnskinner/1523048-skeleton
     */
    this.skeleton = null

    /**
     * @access private
     * @type {SCNNode[]}
     */
    this._bones = bones

    /**
     * @access private
     * @type {SCNMatrix4[]}
     */
    this._boneInverseBindTransforms = boneInverseBindTransforms

    /**
     * @access private
     * @type {SCNGeometrySource}
     */
    this._boneWeights = boneWeights

    /**
     * @access private
     * @type {SCNGeometrySource}
     */
    this._boneIndices = boneIndices

    // add geometrySources to baseGeometry
    baseGeometry._geometrySources.push(boneWeights)
    baseGeometry._geometrySources.push(boneIndices)
  }

  // Working with an Animation Skeleton

  /**
   * The control nodes of the animation skeleton.
   * @type {SCNNode[]}
   * @desc An array of SCNNode objects, each of which represents a control point of the animation skeleton. Moving a node deforms the surface of the skinner’s geometry, based on the skeleton data from which the skinner object was created.
   * @see https://developer.apple.com/reference/scenekit/scnskinner/1522732-bones
   */
  get bones() {
    return this._bones.slice(0)
  }

  /**
   * The default transforms for the animation skeleton’s bone nodes.
   * @type {?SCNMatrix4[]}
   * @desc An array of NSValue objects containing SCNMatrix4 transforms, each of which corresponds to a node in the bones array. Each value is the inverse matrix (see SCNMatrix4Invert(_:)) of that node’s transform property for the skeleton’s default pose.
   * @see https://developer.apple.com/reference/scenekit/scnskinner/1523802-boneinversebindtransforms
   */
  get boneInverseBindTransforms() {
    return this._boneInverseBindTransforms.slice(0)
  }

  /**
   * The geometry source that defines the influence of each bone on the positions the geometry’s vertices.
   * @type {SCNGeometrySource}
   l* @desc This geometry source’s semantic property must be boneWeights. Its data is an array of floating-point vectors, whose componentsPerVector count is the number of bones influencing each vertex. Each vector corresponds to a vertex in the geometry’s vertex geometry source, and each component in a vector specifies the influence of a bone on that vertex’s position. The boneIndices source determines which nodes in the bones array correspond to each component in the vector. A component value of 0.0 means that the bone has no influence on that vertex; positive or negative values scale the transformation of a bone node before SceneKit applies that transformation to the vertex.NoteSceneKit performs skeletal animation on the GPU only if the componentsPerVector count in this geometry source is 4 or less. Larger vectors result in CPU-based animation and drastically reduced rendering performance.
   * @see https://developer.apple.com/reference/scenekit/scnskinner/1522986-boneweights
   */
  get boneWeights() {
    return this._boneWeights
  }

  /**
   * The geometry source defining the mapping from bone indices in skeleton data to the skinner’s bones array.
   * @type {SCNGeometrySource}
   * @desc This geometry source’s semantic property must be boneIndices. Its data is an array of integer vectors, each of which corresponds to a weight vector in the boneWeights geometry source. Each component in a vector specifies the index of the node in the bones array for the corresponding bone weight component.
   * @see https://developer.apple.com/reference/scenekit/scnskinner/1524117-boneindices
   */
  get boneIndices() {
    return this._boneIndices
  }

  /**
   * @access public
   * @returns {number}
   */
  get numSkinningJoints() {
    return this._boneWeights.componentsPerVector
  }

  /**
   * returns Float32Array of 3x4 matrices
   * @access public
   * @returns {Float32Array}
   */
  float32Array() {
    const arr = []
    const len = this._bones.length
    for(let i=0; i<len; i++){
      const bone = this._bones[i]
      let mat = this._boneInverseBindTransforms[i].mult(bone._presentation._worldTransform)
      //mat = bone.presentation.transform.mult(mat)
      //if(bone._parent !== null){
      //  mat = mat.mult(bone._parent.presentation._worldTransform)
      //  //mat = bone._parent.presentation._worldTransform.mult(mat)
      //}
      //mat = bone.presentation.transform.mult(mat)
      //mat = mat.mult(bone.presentation.transform)
      arr.push(...mat.floatArray3x4f())
      // DEBUG
      //const m = new SCNMatrix4()
      //arr.push(...m.floatArray3x4f())

      if(!mat.isIdentity()){
        console.error(`mat ${i} is not identity`)
        console.warn(`inverse: ${this._boneInverseBindTransforms[i].floatArray3x4f()}`)
        console.warn(`presentation.worldTransform: ${bone.presentation._worldTransform.floatArray3x4f()}`)
        console.warn(`parent.presentation.world: ${bone._parent.presentation._worldTransform.floatArray3x4f()}`)
        console.warn(`presentation.transform: ${bone.presentation.transform.floatArray3x4f()}`)
        console.warn(`worldTransform: ${bone._worldTransform.floatArray3x4f()}`)
        console.warn(`transfrom: ${bone.transform.floatArray3x4f()}`)
        console.warn(`presentation.position.y: ${bone.presentation.position.y}`)
        console.warn(`position.y: ${bone.position.y}`)
        console.warn(`mat: ${mat.floatArray3x4f()}`)
        throw new Error('hoge')
      }
    }

    return new Float32Array(arr)
  }
}
