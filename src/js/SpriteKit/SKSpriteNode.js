'use strict'

import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
import SKBlendMode from './SKBlendMode'
import SKColor from './SKColor'
import SKNode from './SKNode'
import SKTexture from './SKTexture'
//import SKWarpable from './SKWarpable'
//import SKShader from './SKShader'
//import SKAttributeValue from './SKAttributeValue'
//import NSCoder from '../undefined/NSCoder'

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

  //out vec3 v_position;
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
  uniform float alpha;
  in vec2 v_texcoord;

  out vec4 outColor;

  void main() {
    outColor = texture(spriteTexture, v_texcoord);
    outColor.a *= alpha;
  }
`

/**
 * A node that draws a rectangular texture, image or color. 
 * @access public
 * @extends {SKNode}
 * @implements {SKWarpable}
 * @see https://developer.apple.com/reference/spritekit/skspritenode
 */
export default class SKSpriteNode extends SKNode {

  // Initializing a New Sprite

  /**
   * Initializes a textured sprite using an image file, optionally adding a normal map to simulate 3D lighting.
   * @access public
   * @constructor
   * @param {string} name - The name of an image file stored in the app bundle.
   * @param {boolean} generateNormalMap - If true, a normal map is generated from the image texture without applying any filter to it (SKTextureNormalMapFilteringTypeNone). If false, no normal map is generated (matching the behavior of the spriteNodeWithImageNamed: class method).
   * @desc The normal map is used only when lighting is enabled in the scene. For more information, see Adding Lighting to a Sprite and SKLightNode.
   * @see https://developer.apple.com/reference/spritekit/skspritenode/1519721-init
   */
  constructor(name = null, generateNormalMap = false) {
    super()

    // Inspecting Physical Properties

    /**
     * The dimensions of the sprite, in points.
     * @type {CGSize}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519668-size
     */
    this.size = new CGSize(0, 0)

    /**
     * Defines the point in the sprite that corresponds to the node’s position.
     * @type {CGPoint}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519877-anchorpoint
     */
    this.anchorPoint = new CGPoint(0.5, 0.5)


    // Inspecting the Sprite’s Texture

    /**
     * The texture used to draw the sprite.
     * @type {?SKTexture}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1520011-texture
     */
    this._texture = null

    /**
     * A property that defines how the texture is applied to the sprite.
     * @type {CGRect}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1520119-centerrect
     */
    this.centerRect = new CGRect(new CGPoint(0, 0), new CGSize(1, 1))

    /**
     * A floating-point value that describes how the color is blended with the sprite’s texture.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519780-colorblendfactor
     */
    this.colorBlendFactor = 0


    // Inspecting Color Properties

    /**
     * The sprite’s color.
     * @type {SKColor}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519639-color
     */
    this.color = new SKColor(1.0, 1.0, 1.0, 0.0)


    // Blending the Sprite with the Framebuffer

    /**
     * The blend mode used to draw the sprite into the parent’s framebuffer.
     * @type {SKBlendMode}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519931-blendmode
     */
    this.blendMode = SKBlendMode.alpha


    // Adding Lighting to a Sprite

    /**
     * A mask that defines how this sprite is lit by light nodes in the scenes.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519637-lightingbitmask
     */
    this.lightingBitMask = 0

    /**
     * A mask that defines which lights add additional shadows to the sprite.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519974-shadowedbitmask
     */
    this.shadowedBitMask = 0

    /**
     * A mask that defines which lights are occluded by this sprite.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1520325-shadowcastbitmask
     */
    this.shadowCastBitMask = 0

    /**
     * A texture that specifies the normal map for the sprite.
     * @type {?SKTexture}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519657-normaltexture
     */
    this.normalTexture = null


    // Working with Custom Shaders

    /**
     * A property that determines whether the sprite is rendered using a custom shader.
     * @type {?SKShader}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/1519714-shader
     */
    this.shader = null

    /**
     * The values of each attribute associated with the node's attached shader.
     * @type {Map<string, SKAttributeValue>}
     * @see https://developer.apple.com/reference/spritekit/skspritenode/2715845-attributevalues
     */
    this.attributeValues = new Map()


    // Instance Properties

    //this._customPlaygroundQuickLook = new PlaygroundQuickLook()
    this._customPlaygroundQuickLook = null

    /**
     * @access private
     * @type {WebGLProgram}
     */
    this._program = null

    this._vertexArrayObject = null
    this._vertexBuffer = null
    this._indexBuffer = null

    this._loadingImagePromise = null

    if(name !== null){
      this.texture = SKTexture.textureWithImageNamed(name)
      //if(generateNormalMap){
      //  this.normalTexture = this.texture.generatingNormalMap()
      //}
    }
  }

  /**
   * Initializes a colored sprite node.
   * @access public
   * @param {CGColor} color - The color for the resulting sprite node.
   * @param {CGSize} size - The size of the sprite node in points.
   * @returns {SKSpriteNode} -
   * @desc Although textured nodes are the most common way to use the SKSpriteNode class, you can also create sprite nodes without a texture. The behavior of the class changes when the node lacks a texture:The sprite node that is returned from this method has its texture property set to nil.There is no texture to stretch, so the centerRect parameter is ignored.There is no colorization step; the color property is used as the sprite’s color.The sprite node's alpha component is used to determine how it is blended into the buffer.Listing 1 shows how to create a red sprite node 100 x 100 points in size.Listing 1 Creating a non-textured sprite nodelet node = SKSpriteNode(color: .red,
                        size: CGSize(width: 100, height: 100))
Creating a non-textured sprite nodelet node = SKSpriteNode(color: .red,
                        size: CGSize(width: 100, height: 100))

   * @see https://developer.apple.com/reference/spritekit/skspritenode/1519762-init
   */
  static nodeWithColorSize(color, size) {
    const node = new SKSpriteNode()
    node.size = size
    node.color = color
    return node
  }

  /**
   * Initializes a textured sprite using an image file.
   * @access public
   * @param {string} name - The name of an image file stored in the app bundle.
   * @returns {SKSpriteNode} -
   * @desc This method creates a new texture object from the image file and assigns that texture to the texture property, the normalTexture properties is set to nil. The size property of the sprite is set to the dimensions of the image. The color property is set to white with an alpha of zero (1.0,1.0,1.0,0.0).
   * @see https://developer.apple.com/reference/spritekit/skspritenode/1520391-init
   */
  static nodeWithImageNamed(name) {
    const node = new SKSpriteNode(name)
    if(!node._loadingImagePromise){
      return null
    }
    const promise = node._loadingImagePromise.then(() => {
      return Promise.resolve(node)
    })
    return promise
  }

  /**
   * Initializes a textured sprite using an image file, optionally adding a normal map to simulate 3D lighting.
   * @access public
   * @param {string} name - The name of an image file stored in the app bundle.
   * @param {boolean} generateNormalMap - If true, a normal map is generated from the image texture without applying any filter to it (SKTextureNormalMapFilteringTypeNone). If false, no normal map is generated (matching the behavior of the spriteNodeWithImageNamed: class method).
   * @returns {SKSpriteNode} -
   * @desc The normal map is used only when lighting is enabled in the scene. For more information, see Adding Lighting to a Sprite and SKLightNode.
   * @see https://developer.apple.com/reference/spritekit/skspritenode/1519721-init
   */
  static nodeWithImageNamedNormalMapped(name, generateNormalMap) {
  }

  // Inspecting Physical Properties

  /**
   * Scales to sprite node to a specified size. 
   * @access public
   * @param {CGSize} size - 
   * @returns {void}
   * @desc This method works by setting the sprite node's xScale and yScale to achieve the specified size in its parent's coordinate space. 
   * @see https://developer.apple.com/reference/spritekit/skspritenode/1645445-scale
   */
  scaleTo(size) {
  }

  // Working with Custom Shaders

  /**
   * Sets an attribute value for an attached shader.
   * @access public
   * @param {SKAttributeValue} value - An attribute value object containing the scalar or vector value to set in the attached shader.
   * @param {string} key - The attribute name.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skspritenode/2715849-setvalue
   */
  setValueForAttribute(value, key) {
  }

  /**
   * The value of a shader attribute.
   * @access public
   * @param {string} key - The attribute name.
   * @returns {?SKAttributeValue} - 
   * @see https://developer.apple.com/reference/spritekit/skspritenode/2715846-value
   */
  valueForAttributeNamed(key) {
    return null
  }

  // Initializers

  /**
   * 
   * @access public
   * @param {NSCoder} aDecoder - 
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skspritenode/1520399-init
   */
  initCoder(aDecoder) {
  }

  // Instance Properties
  /**
   * A custom playground quick look for this instance.
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/reference/spritekit/skspritenode/1645797-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return this._customPlaygroundQuickLook
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @param {CGRect} viewRect -
   * @returns {void}
   */
  _render(gl, viewRect) {
    const p = this.__presentation
    if(this.texture === null){
      return
    }
    if(this.texture._glTexture === null){
      this.texture._createTexture(gl)
      if(this.texture._glTexture === null){
        // the texture is not ready
        return
      }
      this.size = new CGSize(this.texture._image.naturalWidth, this.texture._image.naturalHeight)
      p.size = this.size.copy()
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
    gl.uniform1f(gl.getUniformLocation(program, 'alpha'), p.alpha)

    const data = this._createVertexData()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)

    gl.uniform1i(gl.getUniformLocation(program, 'spriteTexture'), 0)
    gl.activeTexture(gl.TEXTURE0)
    gl.bindTexture(gl.TEXTURE_2D, this.texture._glTexture)
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
    const p = this.__presentation
    const w = p.size.width * p._worldXScale
    const h = p.size.height * p._worldYScale
    const pos = p._worldPosition
    const zPos = p._worldZPosition
    const left =  pos.x - p.anchorPoint.x * w
    const right = pos.x + (1.0 - p.anchorPoint.x) * w
    const top = pos.y + (1.0 - p.anchorPoint.y) * h
    const bottom = pos.y - p.anchorPoint.y * h
    const arr = [
      left, top, zPos, p.centerRect.minX, p.centerRect.minY,
      right, top, zPos, p.centerRect.maxX, p.centerRect.minY,
      left, bottom, zPos, p.centerRect.minX, p.centerRect.maxY,
      right, bottom, zPos, p.centerRect.maxX, p.centerRect.maxY
    ]
    return new Float32Array(arr)
  }

  _copyValue(src) {
    super._copyValue(src)
    this.size = src.size.copy()
    this.anchorPoint = src.anchorPoint.copy()
    this._texture = src._texture ? src._texture : null
    this.centerRect = src.centerRect.copy()
    this.colorBlendFactor = src.colorBlendFactor
    this.color = src.color.copy()
    this.blendMode = src.blendMode
    this.lightingBitMask = src.lightingBitMask
    this.shadowedBitMask = src.shadowedBitMask
    this.shadowCastBitMask = src.shadowCastBitMask
    this.normalTexture = src.normalTexture ? src.normalTexture : null
    this.shader = src.shader
    this.attributeValues = src.attributeValues
    this._customerPlaygroundQuickLook = src._customerPlaygroundQuickLook
    // this._program
    // this._vertexArrayObject
    // this._vertexBuffer
    // this._indexBuffer
  }

  get texture() {
    return this._texture
  }
  set texture(newValue) {
    this._texture = newValue

    this.size = new CGSize(0, 0)
    this._frame = new CGRect(new CGPoint(0, 0), this.size)
    if(this._texture){
      this._loadingImagePromise = this._texture._loadingImagePromise.then((texture) => {
        if(this._texture === texture){
          this.size = this._texture.size()
          const x = -this.size.width * this.anchorPoint.x
          const y = -this.size.height * (1.0 - this.anchorPoint.y)
          this._frame = new CGRect(new CGPoint(x, y), this.size)
        }
      })
    }else{
      this._loadingImagePromise = null
    }
  }
}
