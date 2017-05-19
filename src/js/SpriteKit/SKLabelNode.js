'use strict'

import SKColor from './SKColor'
import SKNode from './SKNode'
import SKLabelVerticalAlignmentMode from './SKLabelVerticalAlignmentMode'
import SKLabelHorizontalAlignmentMode from './SKLabelHorizontalAlignmentMode'
import SKBlendMode from './SKBlendMode'

/**
 * @access private
 * @type {string}
 */
const _defaultVertexShader =
 `#version 300 es
  precision mediump float;

  in vec3 position;
  in vec2 texcoord;

  uniform float screenWidth;
  uniform float screenHeight;

  out vec2 v_texcoord;

  void main() {
    vec3 pos = position;
    pos.x = (pos.x * 2.0 / screenWidth) - 1.0;
    pos.y = (pos.y * 2.0 / screenHeight) - 1.0;
    v_texcoord = texcoord;
    gl_Position = vec4(pos, 1.0);
  }
`

/**
 * @access private
 * @type {string}
 */
const _defaultFragmentShader = 
 `#version 300 es
  precision mediump float;

  uniform sampler2D spriteTexture;
  in vec2 v_texcoord;

  out vec4 outColor;

  void main() {
    outColor = texture(spriteTexture, v_texcoord);
  }
`

/**
 * A node that displays a text label.
 * @access public
 * @extends {SKNode}
 * @see https://developer.apple.com/reference/spritekit/sklabelnode
 */
export default class SKLabelNode extends SKNode {

  // Creating a New Label Node

  /**
   * Initializes a new label object with a text string.
   * @access public
   * @constructor
   * @param {?string} text - The text to use to initialize the label node.
   * @desc The label node’s font is set to Helvetica Neue Ultra Light, 32 point.
   * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519612-init
   */
  constructor(text) {
    super()

    // Configuring the Label Message

    /**
     * The string that the label node displays.
     * @access private
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519788-text
     */
    this._text = null


    // Configuring the Label Font

    /**
     * The color of the label.
     * @access private
     * @type {?CGColor}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1520057-fontcolor
     */
    this._fontColor = new SKColor(1.0, 1.0, 1.0, 1.0)

    /**
     * The font used for the text in the label.
     * @access private
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1520129-fontname
     */
    this._fontName = 'HelveticaNeue-UltraLight'

    /**
     * The size of the font used in the label.
     * @access private
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1520208-fontsize
     */
    this._fontSize = 32.0


    // Configuring the Label’s Position

    /**
     * The vertical position of the text within the node.
     * @access private
     * @type {SKLabelVerticalAlignmentMode}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519933-verticalalignmentmode
     */
    this._verticalAlignmentMode = SKLabelVerticalAlignmentMode.baseline

    /**
     * The horizontal position of the text within the node.
     * @access private
     * @type {SKLabelHorizontalAlignmentMode}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519711-horizontalalignmentmode
     */
    this._horizontalAlignmentMode = SKLabelHorizontalAlignmentMode.center


    // Performing Color Blending

    /**
     * The label’s blend color.
     * @type {?CGColor}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519938-color
     */
    this.color = new SKColor(1.0, 1.0, 1.0, 1.0)

    /**
     * A floating-point value that describes how the color is blended with the font color.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519724-colorblendfactor
     */
    this.colorBlendFactor = 0.0


    // Blending the Label into the Framebuffer

    /**
     * The blend mode used to draw the label into the parent’s framebuffer.
     * @type {SKBlendMode}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519598-blendmode
     */
    this.blendMode = SKBlendMode.alpha

    this._canvas = document.createElement('canvas')
    this._context = this._canvas.getContext('2d')
    this._glContext = null
    this._texture = null
    this._textureUpToDate = false

    /**
     * @access private
     * @type {WebGLProgram}
     */
    this._program = null

    this._vertexArrayObject = null
    this._vertexBuffer = null
    this._indexBuffer = null

    this.text = text
  }

  /**
   * Initializes a new label object with a specified font.
   * @access public
   * @param {?string} fontName - The name of the font used by the label.
   * @returns {SKLabelNode} -
   * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519917-init
   */
  static labelWithFontNamed(fontName) {
    const label = new SKLabelNode()
    label.fontName = fontName
    return label
  }

  /**
   * Initializes a new label object with a text string.
   * @access public
   * @param {?string} text - The text to use to initialize the label node.
   * @returns {SKLabelNode} -
   * @desc The label node’s font is set to Helvetica Neue Ultra Light, 32 point.
   * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519612-init
   */
  static labelWithText(text) {
    return new SKLabelNode(text)
  }

  get text() {
    return this._text
  }
  set text(newValue) {
    this._text = newValue
    this._updateCanvas()
  }

  get fontColor() {
    return this._fontColor
  }
  set fontColor(newValue) {
    this._fontColor = newValue
    this._updateCanvas()
  }

  get fontName() {
    return this._fontName
  }
  set fontName(newValue) {
    this._fontName = newValue
    this._updateCanvas()
  }

  get fontSize() {
    return this._fontSize
  }
  set fontSize(newValue) {
    this._fontSize = newValue
    this._updateCanvas()
  }

  get verticalAlignmentMode() {
    return this._verticalAlignmentMode
  }
  set verticalAlignmentMode(newValue) {
    this._verticalAlignmentMode = newValue
    this._updateCanvas()
  }

  get horizontalAlignmentMode() {
    return this._horizontalAlignmentMode
  }
  set horizontalAlignmentMode(newValue) {
    this._horizontalAlignmentMode = newValue
    this._updateCanvas()
  }

  _updateCanvas() {
    this._context.font = `${this._fontSize}px ${this._fontName}`
    const metrics = this._context.measureText(this._text)
    this._canvas.width = metrics.width
    this._canvas.height = this._fontSize * 3

    this._context.font = `${this._fontSize}px ${this._fontName}`
    this._context.fillStyle = this._fontColor.hexColor

    switch(this._verticalAlignmentMode){
      case SKLabelVerticalAlignmentMode.baseline:
        this._context.textBaseline = 'alphabetic'
        break
      case SKLabelVerticalAlignmentMode.center:
        this._context.textBaseline = 'middle'
        break
      case SKLabelVerticalAlignmentMode.top:
        this._context.textBaseline = 'top'
        break
      case SKLabelVerticalAlignmentMode.bottom:
        this._context.textBaseline = 'bottom'
        break
      default:
        throw new Error(`unknown vertical alignment mode: ${this._verticalAlignmentMode}`)
    }

    //switch(this._horizontalAlignmentMode){
    //  case SKLabelHorizontalAlignmentMode.center:
    //    this._context.textAlign = 'center'
    //    break
    //  case SKLabelHorizontalAlignmentMode.left:
    //    this._context.textAlign = 'left'
    //    break
    //  case SKLabelHorizontalAlignmentMode.right:
    //    this._context.textAlign = 'right'
    //    break
    //  default:
    //    throw new Error(`unknown horizontal alignment mode: ${this._horizontalAlignmentMode}`)
    //}
    this._context.textAlign = 'left'

    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    this._context.fillText(this._text, 0, this._canvas.height * 0.5)
    this._textureUpToDate = false
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @returns {void}
   */
  _render(gl, viewRect) {
    if(this._texture === null || this._glContext !== gl){
      this._glContext = gl
      this._texture = gl.createTexture()
      this._textureUpToDate = false
    }
    if(!this._textureUpToDate){
      gl.bindTexture(gl.TEXTURE_2D, this._texture)
      // texImage2D(target, level, internalformat, width, height, border, format, type, source)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._canvas.width, this._canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, this._canvas)
      gl.generateMipmap(gl.TEXTURE_2D)
      gl.bindTexture(gl.TEXTURE_2D, null)

      this._textureUpToDate = true
    }
    if(this._program === null){
      this._program = this._createProgram(gl)
    }
    const program = this._program
    gl.useProgram(program)

    if(this._vertexArrayObject === null){
      this._createVertexArrayObject(gl, program)
    }
    gl.bindVertexArray(this._vertexArrayObject)

    gl.uniform1f(gl.getUniformLocation(program, 'screenWidth'), viewRect.size.width)
    gl.uniform1f(gl.getUniformLocation(program, 'screenHeight'), viewRect.size.height)

    const data = this._createVertexData()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)

    gl.uniform1i(gl.getUniformLocation(program, 'spriteTexture'), 0)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this._texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_BYTE, 0)
  }

  _createProgram(gl) {
    const program = gl.createProgram()
    const vsText = _defaultVertexShader
    const fsText = _defaultFragmentShader

    // initialize vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vertexShader, vsText)
    gl.compileShader(vertexShader)
    if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(vertexShader)
      throw new Error(`SKSpriteNode vertex shader compile error: ${info}`)
    }

    // initialize fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fragmentShader, fsText)
    gl.compileShader(fragmentShader)
    if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
      const info = gl.getShaderInfoLog(fragmentShader)
      throw new Error(`particle fragment shader compile error: ${info}`)
    }

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    // link program object
    gl.linkProgram(program)
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
      const info = gl.getProgramInfoLog(program)
      throw new Error(`program link error: ${info}`)
    }

    //gl.useProgram(program)

    return program
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @param {WebGLProgram} program -
   * @returns {void}
   */
  _createVertexArrayObject(gl, program) {
    this._vertexArrayObject = gl.createVertexArray()
    gl.bindVertexArray(this._vertexArrayObject)

    this._vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)

    const positionLoc = gl.getAttribLocation(program, 'position')
    gl.bindAttribLocation(program, positionLoc, 'position')
    gl.enableVertexAttribArray(positionLoc)
    // idx, size, type, norm, stride, offset
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 20, 0)
    
    const texcoordLoc = gl.getAttribLocation(program, 'texcoord')
    gl.bindAttribLocation(program, texcoordLoc, 'texcoord')
    gl.enableVertexAttribArray(texcoordLoc)
    // idx, size, type, norm, stride, offset
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, 20, 12)

    this._indexBuffer = gl.createBuffer()
    const indexData = new Uint8Array([0, 3, 2, 0, 1, 3])
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indexData, gl.STATIC_DRAW)
  }

  _createVertexData() {
    const p = this.__presentation._worldPosition
    const w = this._canvas.width * this.__presentation.xScale
    const h = this._canvas.height * this.__presentation.yScale
    let left = p.x
    let right = p.x
    let top = p.y + h * 0.5
    let bottom = p.y - h * 0.5
    switch(this.__presentation._horizontalAlignmentMode){
      case SKLabelHorizontalAlignmentMode.center:
        left -= w * 0.5
        right += w * 0.5
        break
      case SKLabelHorizontalAlignmentMode.left:
        right += w
        break
      case SKLabelHorizontalAlignmentMode.right:
        left -= w
        break
    }

    const arr = [
      left, top, this.__presentation._worldZPosition, 0, 0,
      right, top, this.__presentation._worldZPosition, 1, 0,
      left, bottom, this.__presentation._worldZPosition, 0, 1,
      right, bottom, this.__presentation._worldZPosition, 1, 1
    ]
    return new Float32Array(arr)
  }

  copy() {
    const node = new SKLabelNode()
    node._copyValue(this)
    return node
  }

  _copyValue(src) {
    super._copyValue(src)
    this._text = src._text
    this._fontColor = src._fontColor._copy()
    this._fontName = src._fontName
    this._fontSize = src._fontSize
    this._verticalAlignmentMode = src._verticalAlignmentMode
    this._horizontalAlignmentMode = src._horizontalAlignmentMode
    this.color = src.color._copy()
    this.colorBlendFactor = src.colorBlendFactor
    this.blendMode = src.blendMode
    this._canvas = src._canvas
    this._context = src._context
    //this._glContext = src._glContext
    //this._texture = src._texture
    //this._program = src._program
    //this._vertexArrayObject = src._vertexArrayObject
    //this._vertexBuffer = src._vertexBuffer
    //this._indexBuffer = src._indexBuffer
  }
}
