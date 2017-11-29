'use strict'

import CGPoint from '../CoreGraphics/CGPoint'
import SCNGeometry from './SCNGeometry'
import SCNGeometryElement from './SCNGeometryElement'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNMaterial from './SCNMaterial'
import SCNNode from './SCNNode'
import SCNScene from './SCNScene'
import SCNVector3 from './SCNVector3'
import _SCNMtlLoader from './_SCNMtlLoader'
import _BinaryRequest from '../util/_BinaryRequest'
import _File from '../util/_File'
import _FileReader from '../util/_FileReader'
import _TextReader from '../util/_TextReader'

/*global Buffer*/

export default class _SCNObjLoader {
  constructor(data = null, url = null) {

    /**
     * @access private
     * @type {?string}
     */
    this._filePath = url

    /**
     * @access private
     * @type {?_TextReader}
     */
    this._reader = null

    if(data !== null){
      this._reader = new _TextReader(data, 'utf-8')
    }

    this._node = null
    this._currentNode = null

    const funcs = {
      '#': this._Comment,
      'v': this._GeometricVertices,
      'vt': this._TextureVertices,
      'vn': this._VertexNormals,
      'vp': this._ParameterSpaceVertices,
      'cstype': this._CurveSurfaceType,
      'deg': this._Degree,
      'bmat': this._BasisMatrix,
      'step': this._StepSize,
      'p': this._Point,
      'l': this._Line,
      'f': this._Face,
      'curv': this._Curve,
      'curv2': this._2DCurve,
      'surf': this._Surface,
      'parm': this._ParameterValues,
      'trim': this._OuterTrimmingLoop,
      'hole': this._InnerTrimmingLoop,
      'scrv': this._SpecialCurve,
      'sp': this._SpecialPoint,
      'end': this._EndStatement,
      'con': this._Connect,
      'g': this._GroupName,
      's': this._SmoothingGroup,
      'mg': this._MergingGroup,
      'o': this._ObjectName,
      'bevel': this._BevelInterpolation,
      'c_interp': this._ColorInterpolation,
      'd_interp': this._DissolveInterpolation,
      'lod': this._LevelOfDetail,
      'usemtl': this._MaterialName,
      'mtllib': this._MaterialLibrary,
      'shadow_obj': this._ShadowCasting,
      'trace_obj': this._RayTracing,
      'ctech': this._CurveApproximationTechnique,
      'stech': this._SurfaceApproximationTechnique
    }
    this._funcs = {}
    Object.keys(funcs).forEach((key) => {
      this._funcs[key] = funcs[key].bind(this)
    })
  }

  /**
   * @access public
   * @param {Buffer} data -
   * @param {?string} [path = null] -
   * @returns {SCNScene} -
   */
  static unarchiveObjectWithData(data, path = null) {
    const unarchiver = new _SCNObjLoader(data)
    unarchiver._filePath = path
    return unarchiver._loadObjFile()
  }

  /**
   * @access public
   * @param {?string} [path = null] -
   * @returns {Promise} -
   */
  static unarchiveObjectWithFile(path) {
    const promise = _SCNObjLoader._getBufferOfFile(path)
      .then((data) => {
        return _SCNObjLoader.unarchiveObjectWithData(data, path)
      })

    return promise
  }

  static _getBufferOfFile(path) {
    const promise = new Promise((resolve, reject) => {
      const file = new _File([], path)
      const reader = new _FileReader()
      reader.onload = () => {
        const data = reader.result
        resolve(data)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
      reader.readAsText(file)
    })
    return promise
  }

  /**
   * @access private
   * @param {string} line -
   * @returns {string[]) -
   */
  _getTokens(line) {
    return line.split(' ').filter((str) => (str !== '')).map((str) => str.trim())
  }

  _loadObjFile() {
    console.error('_loadObjFile')
    const defaultGroupName = 'default'
    const defaultMtlName = '_SCNObjLoader.default'

    this._scene = new SCNScene()
    this._node = new SCNNode()
    this._currentNode = new SCNNode()
    this._scene.rootNode.addChildNode(this._node)

    this._vertexArray = [new SCNVector3(0, 0, 0)]
    this._normalArray = [new SCNVector3(0, 0, 0)]
    this._texcoordArray = [new CGPoint(0, 0)]
    this._materialPromise = Promise.resolve()
    this._materialMap = {}
    this._skinArray = []
    this._indexArrayMap = {[defaultMtlName]: []}
    this._currentMtlName = defaultMtlName
    this._currentIndexArray = this._indexArrayMap[defaultMtlName]
    this._currentGroupName = defaultGroupName

    this._vertexSource = null
    this._elementArray = []

    let currentSmoothingGroup = -1
    let currentSmoothingVertices = null
    let smoothingVerticesHash = {}

    let line = this._reader.readLine()
    this._break = false
    while(!this._break && line !== null){
      const tokens = this._getTokens(line)

      if(tokens.length === 0){
        line = this._reader.readLine()
        continue
      }

      const func = this._funcs[tokens[0]]
      if(typeof func === 'undefined'){
        throw new Error('_SCNObjLoader unknown type: ' + tokens[0])
      }
      func(tokens)

      line = this._reader.readLine()
    }
    const promise = this._materialPromise.then((materialArray) => {
      const materialCount = materialArray.length
      for(let i=materialCount-1; i>=0; i--){
        const material = materialArray[i]
        Object.keys(material).forEach((name) => {
          this._materialMap[name] = material[name]
        })
      }
      this._createGeometry()
    })
    this._node._loadedPromise = promise

    return this._scene
  }

  /**
   * @access private
   * @returns {void} -
   */
  _createGeometry() {
    const skinCount = this._skinArray.length
    const vertexData = []
    const texcoordData = []
    const normalData = []

    // vertex data
    for(let i=0; i<skinCount; i++){
      const skin = this._skinArray[i]
      let vertex = null
      let texcoord = null
      let normal = null
      if(skin){
        vertex = this._vertexArray[skin.vertex]
        texcoord = this._texcoordArray[skin.texcoord]
        normal = this._normalArray[skin.normal]
      }

      if(vertex){
        vertexData.push(vertex.x, vertex.y, vertex.z)
      }else{
        vertexData.push(0, 0, 0)
      }

      if(texcoord){
        texcoordData.push(texcoord.x, texcoord.y)
      }else{
        texcoordData.push(0, 0)
      }

      if(normal){
        normalData.push(normal.x, normal.y, normal.z)
      }else{
        normalData.push(0, 0, 0)
      }
    }

    const vertexSource = new SCNGeometrySource(
      vertexData, // data
      SCNGeometrySource.Semantic.vertex, // semantic
      skinCount, // vectorCount
      true, // usesFloatComponents
      3, // componentsPerVector
      4, // bytesPerComponent,
      0, // dataOffset
      12 // dataStride
    )

    const normalSource = new SCNGeometrySource(
      normalData, // data
      SCNGeometrySource.Semantic.normal, // semantic
      skinCount, // vectorCount
      true, // usesFloatComponents
      3, // componentsPerVector
      4, // bytesPerComponent,
      0, // dataOffset
      12 // dataStride
    )

    const texcoordSource = new SCNGeometrySource(
      texcoordData, // data
      SCNGeometrySource.Semantic.texcoord, // semantic
      skinCount, // vectorCount
      true, // usesFloatComponents
      2, // componentsPerVector
      4, // bytesPerComponent
      0, // dataOffset
      8 // dataStride
    )

    const materialNames = Object.keys(this._indexArrayMap)
    const materialArray = []
    materialNames.forEach((materialName) => {
      const indexArray = this._indexArrayMap[materialName]
      const indexCount = indexArray.length / 3
      if(indexCount === 0){
        return
      }
      const material = this._materialMap[materialName] || (new SCNMaterial())

      const element = new SCNGeometryElement(
        indexArray, // data
        SCNGeometryPrimitiveType.triangles, // primitiveType
        indexCount, // primitiveCount
        4 // bytesPerIndex
      )
      materialArray.push(material)
      this._elementArray.push(element)
    })

    const geometry = new SCNGeometry([vertexSource, normalSource, texcoordSource], this._elementArray)
    geometry.materials = materialArray
    geometry.name = 'Geometry'
    
    const geometryNode = new SCNNode(geometry)
    geometryNode.name = 'Geometry'

    this._node.addChildNode(geometryNode)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Comment(tokens) {
    return
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _GeometricVertices(tokens) {
    const pos = new SCNVector3()
    pos.x = parseFloat(tokens[1])
    pos.y = parseFloat(tokens[2])
    pos.z = parseFloat(tokens[3])
    this._vertexArray.push(pos)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _TextureVertices(tokens) {
    const uv = new CGPoint()
    uv.x = parseFloat(tokens[1])
    uv.y = 1.0 - parseFloat(tokens[2])
    this._texcoordArray.push(uv)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _VertexNormals(tokens) {
    const n = new SCNVector3()
    n.x = parseFloat(tokens[1])
    n.y = parseFloat(tokens[2])
    n.z = parseFloat(tokens[3])
    this._normalArray.push(n)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void} -
   */
  _ParameterSpaceVertices(tokens) {
  }

  _CurveSurfaceType(tokens) {
  }

  _Degree(tokens) {
  }

  _BasisMatrix(tokens) {
  }

  _StepSize(tokens) {
  }

  _Point(tokens) {
  }

  _Line(tokens) {
  }

  _Face(tokens) {
    const numFaces = tokens.length - 3
    if(numFaces <= 0){
      throw new Error(`numFaces(${numFaces}) <= 0`)
    }

    let index1 = this._getIndexForData(tokens[1].split('/'))
    let index2 = null
    let index3 = this._getIndexForData(tokens[2].split('/'))
    for(let i=0; i<numFaces; i++){
      index2 = index3
      index3 = this._getIndexForData(tokens[i+3].split('/'))

      this._currentIndexArray.push(index1, index2, index3)

      // TODO: consider smoothingGroup
    }
  }

  /**
   * @access private
   * @param {number[]} data -
   * @returns {void} -
   */
  _getIndexForData(data) {
    const nv = parseInt(data[0])
    const nt = parseInt(data[1]) || 0
    const nn = parseInt(data[2]) || 0

    let skin = this._skinArray[nv]
    if(typeof skin === 'undefined'){
      skin = {
        index: nv,
        vertex: nv,
        texcoord: nt,
        normal: nn,
        next: null
      }
      this._skinArray[nv] = skin
    }

    let lastSkin = skin
    while(skin && (skin.texcoord !== nt || skin.normal !== nn)){
      lastSkin = skin
      skin = skin.next
    }
    if(!skin){
      const newIndex = this._skinArray.length
      skin = {
        index: newIndex,
        vertex: nv,
        texcoord: nt,
        normal: nn,
        next: null
      }
      this._skinArray[newIndex] = skin
      lastSkin.next = skin
    }

    return skin.index
  }

  _Curve(tokens) {
  }

  _2DCurve(tokens) {
  }

  _Surface(tokens) {
  }

  _ParameterValues(tokens) {
  }

  _OuterTrimmingLoop(tokens) {
  }

  _InnerTrimmingLoop(tokens) {
  }

  _SpecialCurve(tokens) {
  }

  _SpecialPoint(tokens) {
  }

  _EndStatement(tokens) {
    this._break = true
  }

  _Connect(tokens) {
  }

  _GroupName(tokens) {
    if(tokens.length <= 1){
      throw new Error('group name format error')
    }else{
      tokens.shift()
      this._currentGroupName = tokens.join(' ')
    }
  }

  _SmoothingGroup(tokens) {
    return
    /*
    if(tokens[1] === 'off' || tokens[1] <= 0){
      currentSmoothingGroup = 0
      currentSmoothingVertices = null
    }else{
      currentSmoothingGroup = tokens[1]
      currentSmoothingVertices = smoothingVerticesHash[currentSmoothingGroup]
      if(!currentSmoothingVertices){
        currentSmoothingVertices = []
        smoothingVerticesHash[currentSmoothingGroup] = currentSmoothingVertices
      }
    }
    */
  }

  _MergingGroup(tokens) {
  }

  _ObjectName(tokens) {
  }

  _BevelInterpolation(tokens) {
  }

  _ColorInterpolation(tokens) {
  }

  _DissolveInterpolation(tokens) {
  }

  _LevelOfDetail(tokens) {
  }

  _MaterialName(tokens) {
    tokens.shift()
    this._currentMtlName = tokens.join(' ')
    this._currentIndexArray = this._indexArrayMap[this._currentMtlName]
    if(typeof this._currentIndexArray === 'undefined'){
      this._currentIndexArray = []
      this._indexArrayMap[this._currentMtlName] = this._currentIndexArray
    }
  }

  _MaterialLibrary(tokens) {
    const promises = []
    for(let i=1; i<tokens.length; i++){
      const path = this._filePath + tokens[i]
      const dir = path.substring(0, path.lastIndexOf('/') + 1)
      const promise = _BinaryRequest.get(path).then((data) => {
        console.log('mtl data: ' + data)
        return _SCNMtlLoader.unarchiveObjectWithData(data, dir)
      })
      promises.push(promise)
    }
    this._materialPromise = Promise.all(promises)
  }

  _ShadowCasting(tokens) {
  }

  _RayTracing(tokens) {
  }

  _CurveApproximationTechnique(tokens) {
  }

  _SurfaceApproximationTechnique(tokens) {
  }
}
