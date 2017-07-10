'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNProgramDelegate from './SCNProgramDelegate'
import SCNBufferFrequency from './SCNBufferFrequency'
import SCNBufferBindingBlock from './SCNBufferBindingBlock'


/**
 * A complete Metal or OpenGL shader program that replaces SceneKit's rendering of a geometry or material.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnprogram
 */
export default class SCNProgram extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Working with OpenGL Shader Source Code

    /**
     * GLSL source code for the program’s vertex shader.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1522891-vertexshader
     */
    this.vertexShader = null

    /**
     * GLSL source code for the program’s fragment shader.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1523135-fragmentshader
     */
    this.fragmentShader = null

    /**
     * GLSL source code for the program’s optional geometry shader.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1524049-geometryshader
     */
    this.geometryShader = null

    /**
     * GLSL source code for the program’s optional tessellation control shader.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1523852-tessellationcontrolshader
     */
    this.tessellationControlShader = null

    /**
     * GLSL source code for the program’s optional tessellation evaluation shader.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1523760-tessellationevaluationshader
     */
    this.tessellationEvaluationShader = null


    // Providing a Delegate Object

    /**
     * The delegate of the program object.
     * @type {?SCNProgramDelegate}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1522611-delegate
     */
    this.delegate = null


    // Managing Opacity

    /**
     * A Boolean value that indicates whether fragments rendered by the program are fully opaque.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1522844-isopaque
     */
    this.isOpaque = false


    // Working With Metal Shaders

    /**
     * The name of the vertex shader function to load from a Metal shader library.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1522799-vertexfunctionname
     */
    this.vertexFunctionName = null

    /**
     * The name of the fragment shader function to load from a Metal shader library.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1524012-fragmentfunctionname
     */
    this.fragmentFunctionName = null

    /**
     * The Metal shader library containing shader functions to be used by this program.
     * @type {?MTLLibrary}
     * @see https://developer.apple.com/documentation/scenekit/scnprogram/1522934-library
     */
    this.library = null

    /**
     * @access private
     * @type {WebGLProgram}
     */
    this._glProgram = null

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this._dummyTexture = null

    /**
     * @access private
     * @type {WebGLTexture}
     */
    this._dummyCubeMapTexture = null
  }

  // Mapping GLSL Symbols to SceneKit Semantics

  /**
   * Associates a SceneKit semantic identifier with the specified GLSL vertex attribute or uniform variable.
   * @access public
   * @param {?string} semantic - A SceneKit semantic identifier. See Geometry Semantic Identifiers and Rendering Transform Keys for possible values.
   * @param {string} symbol - The name declared in the program’s GLSL source code for the vertex attribute or uniform variable to be associated with the semantic.
   * @param {?Map<string, Object>} [options = null] - A dictionary of options affecting the semantic. See Program Semantic Options for applicable keys and values.
   * @returns {void}
   * @desc Use this method to provide inputs managed by SceneKit to your GLSL program.To use vertex attributes provided by SCNGeometry objects, use the constants listed in Geometry Semantic Identifiers.To use the coordinate transformations defined by the scene’s node hierarchy and point-of-view camera, use the constants listed in Rendering Transform Keys.
   * @see https://developer.apple.com/documentation/scenekit/scnprogram/1522730-setsemantic
   */
  setSemanticForSymbol(semantic, symbol, options = null) {
  }

  /**
   * Returns the SceneKit semantic identifiers associated with the specified GLSL vertex attribute or uniform variable.
   * @access public
   * @param {string} symbol - The name declared in the program’s GLSL source code for a vertex attribute or uniform variable semantic.
   * @returns {?string} - 
   * @see https://developer.apple.com/documentation/scenekit/scnprogram/1523350-semantic
   */
  semanticForSymbol(symbol) {
    return null
  }

  // Providing Input for Metal Shaders

  /**
   * Registers a block for SceneKit to call at render time for binding a Metal buffer to the shader program.
   * @access public
   * @param {string} name - The name identifying the buffer in Metal shader source code.
   * @param {SCNBufferFrequency} frequency - An option specifying whether SceneKit calls the block only once per rendered frame or more frequently (for example, once for each object to be rendered).
   * @param {SCNBufferBindingBlock} block - A block to be run when SceneKit prepares for rendering with the Metal shader.
   * @returns {void}
   * @desc Use this method to associate a block with a Metal shader program to handle setup of a buffer used in that shader. SceneKit calls your block before rendering any objects whose program property is set to this SCNProgram object. In the block, use the writeBytes(_:count:) method to provide data for the buffer.  

   * @see https://developer.apple.com/documentation/scenekit/scnprogram/1524047-handlebinding
   */
  handleBindingOfBufferNamedHandler(name, frequency, block) {
  }

  _setDummyTextureForContext(context) {
    const gl = context
    this._createDummyTextureForContext(gl)

    const texNames = [
      gl.TEXTURE0,
      gl.TEXTURE1,
      gl.TEXTURE2,
      gl.TEXTURE3,
      gl.TEXTURE4,
      gl.TEXTURE5,
      gl.TEXTURE6,
      gl.TEXTURE7
    ]
    const texSymbols = [
      'u_emissionTexture',
      'u_ambientTexture',
      'u_diffuseTexture',
      'u_specularTexture',
      'u_reflectiveTexture',
      'u_transparentTexture',
      'u_multiplyTexture',
      'u_normalTexture'
    ]
    const isCubeMap = [
      false, false, false, false, true, false, false, false
    ]
    for(let i=0; i<texNames.length; i++){
      const texName = texNames[i]
      const symbol = texSymbols[i]
      const loc = gl.getUniformLocation(this._glProgram, symbol)
      if(loc !== null){
        gl.uniform1i(loc, i)
        gl.activeTexture(texName)
        if(isCubeMap[i]){
          gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._dummyCubeMapTexture)
        }else{
          gl.bindTexture(gl.TEXTURE_2D, this._dummyTexture)
        }
      }
    }
  }

  _createDummyTextureForContext(context) {
    if(this._dummyTexture !== null){
      return
    }
    const gl = context
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    const c = canvas.getContext('2d')
    c.fillStyle = 'rgba(255, 255, 255, 1.0)'
    c.fillRect(0, 0, 1, 1)

    this._dummyTexture = gl.createTexture()

    gl.bindTexture(gl.TEXTURE_2D, this._dummyTexture)
    // texImage2D(target, level, internalformat, width, height, border, format, type, source)
    // Safari complains that 'source' is not ArrayBufferView type, but WebGL2 should accept HTMLCanvasElement.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    gl.bindTexture(gl.TEXTURE_2D, null)

    this._dummyCubeMapTexture = gl.createTexture()

    const targets = [
      gl.TEXTURE_CUBE_MAP_POSITIVE_Z,
      gl.TEXTURE_CUBE_MAP_POSITIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Z,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_X,
      gl.TEXTURE_CUBE_MAP_NEGATIVE_Y,
      gl.TEXTURE_CUBE_MAP_POSITIVE_Y
    ]

    gl.bindTexture(gl.TEXTURE_CUBE_MAP, this._dummyCubeMapTexture)
    for(let i=0; i<6; i++){
      gl.texImage2D(targets[i], 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    }
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)
  }
}
