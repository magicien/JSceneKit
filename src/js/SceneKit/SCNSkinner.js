'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNGeometry from './SCNGeometry'
import SCNNode from './SCNNode'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMatrix4 from './SCNMatrix4'
import SCNMatrix4MakeTranslation from './SCNMatrix4MakeTranslation'
import SCNVector3 from './SCNVector3'


/**
 * An object that manages the relationship between skeletal animations and the nodes and geometries they animate.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnskinner
 */
export default class SCNSkinner extends NSObject {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        const invTransforms = []
        const len = propValues.bones.length
        for(let i=0; i<len; i++){
          const inv = propValues[`baseGeometryBindTransform-${i}`]
          //console.log(`inv ${i} ${inv.float32Array()}`)
          if(typeof inv === 'undefined'){
            throw new Error(`boneInverseBindTransforms ${i} does not exist`)
          }
          invTransforms.push(inv)
        }

        const instance = new SCNSkinner(
          propValues.baseGeometry,
          propValues.bones,
          invTransforms,
          propValues.boneWeights,
          propValues.boneIndices
        )
        instance.skeleton = propValues.skeleton
        instance.baseGeometryBindTransform = propValues.baseGeometryBindTransform
        return instance
      },
      $unknownKey: (key) => {
        //console.warn(`SCNSkinner unknownKey ${key}`)
        const pattern = new RegExp(/^baseGeometryBindTransform-(\d+)$/)
        const result = key.match(pattern)
        if(result !== null){
          return ['SCNMatrix4', null]
        }
        return null
      },
      baseGeometry: ['SCNGeometry', null],
      baseGeometryBindTransform: ['SCNMatrix4', null],
      skeleton: ['SCNNode', null],
      bones: ['NSArray', null],
      boneWeights: ['SCNGeometrySource', null],
      boneIndices: ['SCNGeometrySource', null]
    }
  }

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
   * @see https://developer.apple.com/documentation/scenekit/scnskinner/1523964-init
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
     * @see https://developer.apple.com/documentation/scenekit/scnskinner/1522823-basegeometry
     */
    this.baseGeometry = baseGeometry

    /**
     * The coordinate transformation for the skinner’s geometry in its default state.
     * @type {SCNMatrix4}
     * @see https://developer.apple.com/documentation/scenekit/scnskinner/1523160-basegeometrybindtransform
     */
    this.baseGeometryBindTransform = SCNMatrix4MakeTranslation(0, 0, 0)


    // Working with an Animation Skeleton

    /**
     * The root node of the skinner object’s animation skeleton.
     * @type {?SCNNode}
     * @see https://developer.apple.com/documentation/scenekit/scnskinner/1523048-skeleton
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

    this._useGPU = true

    this._checkUseGPU()
  }

  _checkUseGPU() {
    this._useGPU = true
    if(this._boneWeights && this._boneWeights.componentsPerVector > 4){
      this._useGPU = false
    }
    if(this._boneIndices && this._boneIndices.componentsPerVector > 4){
      this._useGPU = false
    }
  }

  // Working with an Animation Skeleton

  /**
   * The control nodes of the animation skeleton.
   * @type {SCNNode[]}
   * @desc An array of SCNNode objects, each of which represents a control point of the animation skeleton. Moving a node deforms the surface of the skinner’s geometry, based on the skeleton data from which the skinner object was created.
   * @see https://developer.apple.com/documentation/scenekit/scnskinner/1522732-bones
   */
  get bones() {
    return this._bones.slice(0)
  }

  /**
   * The default transforms for the animation skeleton’s bone nodes.
   * @type {?SCNMatrix4[]}
   * @desc An array of NSValue objects containing SCNMatrix4 transforms, each of which corresponds to a node in the bones array. Each value is the inverse matrix (see SCNMatrix4Invert(_:)) of that node’s transform property for the skeleton’s default pose.
   * @see https://developer.apple.com/documentation/scenekit/scnskinner/1523802-boneinversebindtransforms
   */
  get boneInverseBindTransforms() {
    return this._boneInverseBindTransforms.slice(0)
  }

  /**
   * The geometry source that defines the influence of each bone on the positions the geometry’s vertices.
   * @type {SCNGeometrySource}
   * @desc This geometry source’s semantic property must be boneWeights. Its data is an array of floating-point vectors, whose componentsPerVector count is the number of bones influencing each vertex. Each vector corresponds to a vertex in the geometry’s vertex geometry source, and each component in a vector specifies the influence of a bone on that vertex’s position. The boneIndices source determines which nodes in the bones array correspond to each component in the vector. A component value of 0.0 means that the bone has no influence on that vertex; positive or negative values scale the transformation of a bone node before SceneKit applies that transformation to the vertex.NoteSceneKit performs skeletal animation on the GPU only if the componentsPerVector count in this geometry source is 4 or less. Larger vectors result in CPU-based animation and drastically reduced rendering performance.
   * @see https://developer.apple.com/documentation/scenekit/scnskinner/1522986-boneweights
   */
  get boneWeights() {
    return this._boneWeights
  }
  //set boneWeights(newValue) {
  //  this._boneWeights = newValue
  //  this._checkUseGPU()
  //}

  /**
   * The geometry source defining the mapping from bone indices in skeleton data to the skinner’s bones array.
   * @type {SCNGeometrySource}
   * @desc This geometry source’s semantic property must be boneIndices. Its data is an array of integer vectors, each of which corresponds to a weight vector in the boneWeights geometry source. Each component in a vector specifies the index of the node in the bones array for the corresponding bone weight component.
   * @see https://developer.apple.com/documentation/scenekit/scnskinner/1524117-boneindices
   */
  get boneIndices() {
    return this._boneIndices
  }
  //set boneIndices(newValue) {
  //  this._boneIndices = newValue
  //  this._checkUseGPU()
  //}

  /**
   * @access public
   * @returns {number} -
   */
  get numSkinningJoints() {
    return this._boneWeights.componentsPerVector
  }

  /**
   * returns Float32Array of 3x4 matrices
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    const arr = []
    const len = this._bones.length
    for(let i=0; i<len; i++){
      const bone = this._bones[i]
      // TODO: implement appropriate matrix multiplication.
      //       it doesn't consider the rotation of initial pose so far.
      //const mat = this._boneInverseBindTransforms[i].mult(bone._presentation._worldTransform)
      const mat = this.baseGeometryBindTransform.mult(this._boneInverseBindTransforms[i]).mult(bone._presentation._worldTransform)
      //const mat = bone._presentation._worldTransform.mult(this._boneInverseBindTransforms[i])
      //mat = bone.presentation.transform.mult(mat)
      //if(bone._parent !== null){
      //  mat = mat.mult(bone._parent.presentation._worldTransform)
      //  //mat = bone._parent.presentation._worldTransform.mult(mat)
      //}
      //mat = bone.presentation.transform.mult(mat)
      //mat = mat.mult(bone.presentation.transform)
      arr.push(...mat.floatArray3x4f())

      /*
      if(!mat.isIdentity()){
        console.warn(`inverse: ${this._boneInverseBindTransforms[i].floatArray3x4f()}`)
        console.warn(`presentation.worldTransform: ${bone.presentation._worldTransform.floatArray3x4f()}`)
        console.warn(`parent.presentation.world: ${bone._parent.presentation._worldTransform.floatArray3x4f()}`)
        console.warn(`presentation.transform: ${bone.presentation.transform.floatArray3x4f()}`)
        console.warn(`worldTransform: ${bone._worldTransform.floatArray3x4f()}`)
        console.warn(`transfrom: ${bone.transform.floatArray3x4f()}`)
        console.warn(`presentation.position.y: ${bone.presentation.position.y}`)
        console.warn(`position.y: ${bone.position.y}`)
        console.warn(`mat: ${mat.floatArray3x4f()}`)
        throw new Error(`mat ${i} ${bone.name} is not identity`)
      }
      */
    }

    // DEBUG
    /*
    console.log('boneInverseBindTransforms')
    for(let i=0; i<4; i++){
      const mat = this._boneInverseBindTransforms[i]
      console.log(mat.floatArray3x4f())
    }
    console.log('bone._presentation._worldTransform')
    for(let i=0; i<4; i++){
      const mat = this._bones[i]._presentation._worldTransform
      console.log(mat.floatArray3x4f())
    }
    */

    return new Float32Array(arr)
  }

  /**
   * @access private
   * @param {SCNNode} node -
   */
  _update(node) {
    if(this._useGPU){
      return
    }
    const p = node.presentation
    if(node.geometry === null || p === null || p.geometry === null){
      // data is not ready
      return
    }
    // baseGeometryBindTransform
    this.baseGeometryBindTransform
    this._boneInverseBindTransforms
    const boneLen = this._bones.length
    const transforms = []
    for(let i=0; i<boneLen; i++){
      const bone = this._bones[i]
      //transforms.push(this.baseGeometryBindTransform.mult(this._boneInverseBindTransforms[i]).mult(bone._presentation._worldTransform))
      transforms.push(this.baseGeometryBindTransform.mult(this._boneInverseBindTransforms[i]).mult(bone._presentation._worldTransform))
    }

    const baseGeometry = this.baseGeometry
    const baseVertex = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
    const baseNormal = baseGeometry.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.normal)[0]
    // TODO: tangent
    //const pg = baseGeometry.presentation
    const pg = p.geometry
    const vertex = pg.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]
    const normal = pg.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.normal)[0]
    const weights = this._boneWeights
    const indices = this._boneIndices
    const len = weights.vectorCount
    const vlen = weights.componentsPerVector
    if(baseNormal){
      for(let i=0; i<len; i++){
        const bv = baseVertex._scnVectorAt(i)
        const bn = baseNormal._scnVectorAt(i)
        const w = weights._vectorAt(i)
        const ind = indices._vectorAt(i)
        let pos = new SCNVector3(0, 0, 0)
        let nom = new SCNVector3(0, 0, 0)
        for(let j=0; j<vlen; j++){
          if(ind[j] < 0){
            continue
          }
          if(w[j] === 0){
            continue
          }
          const jointMatrix = transforms[ind[j]]
          pos = pos.add(bv.transform(jointMatrix).mul(w[j]))
          nom = nom.add(bn.rotate(jointMatrix).mul(w[j]))
        }
        vertex._setVectorAt(pos, i)
        normal._setVectorAt(nom, i)
      }
    }else{
      // TODO: implement
    }
  }
}
