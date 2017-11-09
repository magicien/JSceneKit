'use strict'

import TGAImage from 'tgaimage'
import SCNMaterial from './SCNMaterial'
import SKColor from '../SpriteKit/SKColor'
import _File from '../util/_File'
import _FileReader from '../util/_FileReader'
import _TextReader from '../util/_TextReader'

/*global Buffer*/

export default class _SCNMtlLoader {

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

    const funcs = {
      '#': this._Comment,
      'newmtl': this._Material,
      
      'Ka': this._Ambient,
      'Kd': this._Diffuse,
      'Ks': this._Specular,
      'Tf': this._TransmissionFilter,
      'illum': this._Illumination,
      'd': this._Dissolve,
      'Ns': this._Exponent,
      'sharpness': this._Sharpness,
      'Ni': this._Density,

      'map_Ka': this._AmbientTexture,
      'map_Kd': this._DiffuseTexture,
      'map_Ks': this._SpecularTexture,
      'map_Ns': this._ExponentTexture,
      'map_d': this._DissolveTexture,
      'map_aat': this._AntiAliasingTexture,
      'decal': this._Decal,
      'disp': this._Roughness,
      'bump': this._Bump,

      'refl': this._Reflection,

      'Ke': this._Emission,
      'map_Ke': this._EmissionTexture
    }
    this._funcs = {}
    Object.keys(funcs).forEach((key) => {
      this._funcs[key] = funcs[key].bind(this)
    })
  }

  static unarchiveObjectWithData(data, path = null) {
    const unarchiver = new _SCNMtlLoader(data)
    unarchiver._filePath = path
    return unarchiver._loadMtlFile()
  }

  static unarchiveObjectWithFile(path) {
    const promise = _SCNMtlLoader._getBufferOfFile(path)
      .then((data) => {
        return _SCNMtlLoader.unarchiveObjectWithData(data, path)
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

  /**
   * @access private
   * @param {string} path -
   * @returns {Promise} -
   */
  _loadTexture(path) {
    const promise = new Promise((resolve, reject) => {
      const fileName = this._filePath + path
      console.log('obj texture path: ' + fileName)
      if(fileName.endsWith('tga')){
        const tga = TGAImage.imageWithURL(fileName)
        tga.didLoad.then(() => {
          resolve(tga.image)
        })
      }else{
        const image = new Image()
        // TODO: check option if it allows cross-domain.
        image.crossOrigin = 'anonymous'
        image.onload = () => {
          resolve(image)
        }
        image.onerror = () => {
          reject(new Error(`image ${fileName} load error`))
        }
        image.src = fileName
      }
    })

    return promise
  }


  _loadMtlFile() {
    console.warn('_loadMtlFile')

    this._materials = {}
    this._workingMaterial = null
    this._promises = []

    let line = this._reader.readLine()
    this._break = false
    while(!this._break && line !== null){
      const tokens = this._getTokens(line)

      if(tokens.lengt === 0){
        line = this._reader.readLine()
        continue
      }

      const func = this._funcs[tokens[0]]
      if(typeof func === 'undefined'){
        throw new Error('_SCNMtlLoader unknown type: ' + tokens[0])
      }
      func(tokens)

      line = this._reader.readLine()
    }

    return this._materials
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Material(tokens) {
    tokens.shift()
    const materialName = tokens.join(' ')
    const material = new SCNMaterial()
    this._materials[materialName] = material
    this._workingMaterial = material
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
  _Comment(tokens) {
    return
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Ambient(tokens) {
    if(tokens[1] === 'spectral'){
      // TODO: implement
    }else if(tokens[1] === 'xyz'){
      // TODO: implement
    }else{
      const r = parseFloat(tokens[1])
      const g = parseFloat(tokens[2])
      const b = parseFloat(tokens[3])
      const a = 1.0
      this._workingMaterial.ambient.contents = new SKColor(r, g, b, a)
    }
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Diffuse(tokens) {
    const r = parseFloat(tokens[1])
    const g = parseFloat(tokens[2])
    const b = parseFloat(tokens[3])
    const a = 1.0
    this._workingMaterial.diffuse.contents = new SKColor(r, g, b, a)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Specular(tokens) {
    const r = parseFloat(tokens[1])
    const g = parseFloat(tokens[2])
    const b = parseFloat(tokens[3])
    const a = 1.0
    this._workingMaterial.specular.contents = new SKColor(r, g, b, a)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _TransmissionFilter(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Illumination(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Dissolve(tokens) {
    const d = parseFloat(tokens[1])
    this._workingMaterial.multiply.contents = new SKColor(d, d, d, 1.0)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Exponent(tokens) {
    this._workingMaterial.shininess = parseFloat(tokens[1])
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Sharpness(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Density(tokens) {
    // opacity
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _AmbientTexture(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _DiffuseTexture(tokens) {
    const material = this._workingMaterial
    this._loadTexture(tokens[1]).then((image) => {
      material.diffuse.contents = image
    })
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _SpecularTexture(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _ExponentTexture(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _DissolveTexture(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _AntiAliasingTexture(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Decal(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Roughness(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Bump(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Reflection(tokens) {
    
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _Emission(tokens) {
    const r = parseFloat(tokens[1])
    const g = parseFloat(tokens[2])
    const b = parseFloat(tokens[3])
    const a = 1.0
    this._workingMaterial.emission.contents = new SKColor(r, g, b, a)
  }

  /**
   * @access private
   * @param {string[]} tokens - 
   * @returns {void}
   */
  _EmissionTexture(tokens) {
    
  }
}


