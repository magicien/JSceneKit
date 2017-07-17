'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
//import GKNoiseMap from '../undefined/GKNoiseMap'
import SKTextureFilteringMode from './SKTextureFilteringMode'


/**
 * A representation of an image for use in SpriteKit.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/spritekit/sktexture
 */
export default class SKTexture extends NSObject {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Inspecting a Texture’s Properties

    /**
     * The filtering mode used when the size of a sprite drawn with the texture is not drawn at the texture’s native size.
     * @type {SKTextureFilteringMode}
     * @see https://developer.apple.com/documentation/spritekit/sktexture/1519659-filteringmode
     */
    this.filteringMode = SKTextureFilteringMode.linear

    /**
     * A Boolean value that indicates whether the texture attempts to generate mipmaps.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/spritekit/sktexture/1519960-usesmipmaps
     */
    this.usesMipmaps = false


    // Instance Properties

    this._customPlaygroundQuickLook = null

    this._image = null
    this._glTexture = null

    this._loadingImagePromise = null
  }

  // Creating New Textures from Images

  /**
   * Create a new texture object from an image file stored in the app bundle.
   * @access public
   * @param {string} name - The name of the image file.
   * @returns {void}
   * @desc The new texture object is initialized with the name of the image file and then control returns immediately to your game. Sprite Kit loads and prepares the texture data when it is needed by your game.When loading the texture data, Sprite Kit searches the app bundle for an image file with the specified filename. If a matching image file cannot be found, Sprite Kit searches for the texture in any texture atlases stored in the app bundle. If the specified image does not exist anywhere in the bundle, Sprite Kit creates a placeholder texture image.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520086-init
   */
  static textureWithImageNamed(name) {
    const texture = new SKTexture()
    texture._loadImage(name)
    return texture
  }

  /**
   * Create a new texture object from an image object.
   * @access public
   * @param {Image} image - An image.
   * @returns {void}
   * @desc The image data is copied before control is returned to your game.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520136-init
   */
  static textureWithImage(image) {
    const texture = new SKTexture()
    texture._image = image
    this._loadingImagePromise = Promise.resolve(this)
    return texture
  }

  /**
   * Create a new texture object from a Quartz 2D image.
   * @access public
   * @param {CGImage} image - A Quartz 2D image (CGImage) object. For more information, see Quartz 2D Programming Guide and CGImage.
   * @returns {void}
   * @desc The image data is copied before control is returned to your game.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519576-init
   */
  static textureWithCgImage(image) {
    const texture = new SKTexture()
    texture._image = image
    this._loadingImagePromise = Promise.resolve(this)
    return texture
  }

  /**
   * Creates a new texture from a subset of an existing texture.
   * @access public
   * @param {CGRect} rect - A rectangle in the unit coordinate space that specifies the portion of the texture to use.
   * @param {SKTexture} texture - The texture to create the new texture from.
   * @returns {void}
   * @desc The returned texture object shares the same texture data as the original texture object, meaning that only one copy of the texture data is kept in memory.If you call this method on a texture that itself was created using this method, the original texture is used as the source instead. That is, the rectangle is considered to be in the source texture’s coordinate system. To do this, you should use the source texture's textureRect() rather than relying on hard coded {(0,0) (1,1)} as the coordinates.  Listing 1 shows how you can use the source texture's textureRect() to calculate the portion of the texture to use.Listing 1 Creating a texture from a portion of another texture.let originalTexture = SKTexture(imageNamed: "sourceImage.png")

let rect = CGRect(origin: originalTexture.textureRect().origin,
                  size: CGSize(width: originalTexture.textureRect().midX,
                               height: originalTexture.textureRect().midY))

let croppedTexture = SKTexture(rect: rect,
                               in: originalTexture)
In the above example, if originalTexture had a size of (348.0, 282.0) and a textureRect() of {(0,0) (1,1)}, croppedTexture will have a size of (174.0, 141.0) and a textureRect() of {(0,0) (1,1)}. croppedTexture will be a copy of the bottom left quadrant of originalTexture.Creating a texture from a portion of another texture.let originalTexture = SKTexture(imageNamed: "sourceImage.png")

let rect = CGRect(origin: originalTexture.textureRect().origin,
                  size: CGSize(width: originalTexture.textureRect().midX,
                               height: originalTexture.textureRect().midY))

let croppedTexture = SKTexture(rect: rect,
                               in: originalTexture)

   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520425-init
   */
  static textureWithRectIn(rect, texture) {
    const texutre = new SKTexture()
    return texture
  }

  /**
   * Creates a new texture by applying a Core Image filter to an existing texture.
   * @access public
   * @param {CIFilter} filter - A Core Image filter that requires a single inputImage parameter and produces an outputImage parameter.
   * @returns {SKTexture} - 
   * @desc The image data is copied before control is returned to your game.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520388-applying
   */
  applying(filter) {
    return null
  }

  /**
   * Returns the texture’s image data as a Quartz 2D image.
   * @access public
   * @returns {CGImage} - 
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519755-cgimage
   */
  cgImage() {
    return this._image
  }

  // Creating Textures from Raw Pixel Data

  /**
   * Creates a new texture from raw pixel data.
   * @access public
   * @param {Data} pixelData - An NSData object that holds the bitmap data. The pixels must be 32 bpp, 8bpc (unsigned integer) RGBA pixel data. The color components should have been already multiplied by the alpha value.
   * @param {CGSize} size - The size of the new texture in points.
   * @returns {void}
   * @desc The image data is copied before control is returned to your game.Creating textures from raw pixel data is useful if you have a CPU based routine for creating imagery. The following code shows how you can use init(data:size:) to create a texture containing random colors and a solid alpha. The bytes array is populated by iterating over the total number of pixels and adding four UInt8 values for the red, green, blue, and alpha channels.let width = 128
let height = 128
let bytes = stride(from: 0, to: width * height, by: 1).flatMap {
    _ in
    return [
        UInt8(drand48() * 255), // red
        UInt8(drand48() * 255), // green
        UInt8(drand48() * 255), // blue
        UInt8(255)              // alpha
    ]
}
let data = Data(bytes: bytes)
let texture = SKTexture(data: data,
                        size: CGSize(width: width, height: height))
let width = 128
let height = 128
let bytes = stride(from: 0, to: width * height, by: 1).flatMap {
    _ in
    return [
        UInt8(drand48() * 255), // red
        UInt8(drand48() * 255), // green
        UInt8(drand48() * 255), // blue
        UInt8(255)              // alpha
    ]
}
let data = Data(bytes: bytes)
let texture = SKTexture(data: data,
                        size: CGSize(width: width, height: height))

   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519962-init
   */
  static textureWithDataSize(pixelData, size) {
  }

  // Creating Normal Map Textures

  /**
   * Creates a normal map texture by analyzing the contents of an existing texture.
   * @access public
   * @returns {SKTexture} - 
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519687-generatingnormalmap
   */
  generatingNormalMap() {
    return null
  }

  /**
   * Creates a normal map texture by analyzing the contents of an existing texture.
   * @access public
   * @param {number} smoothness - A number between 0.0 and 1.0 indicating how much the texture should be smoothed before the normal map is generated. A value of 0.0 means that the texture is not smoothed at all before being processed.
   * @param {number} contrast - A value used to magnify the effect of the generated normal map. A value of 1.0 indicates no magnification is applied.
   * @returns {SKTexture} - 
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520441-generatingnormalmap
   */
  generatingNormalMapWithSmoothness(smoothness, contrast) {
    return null
  }

  // Creating Noise Textures

  /**
   * Creates a new texture whose contents are procedurally generated directional noise data.
   * @access public
   * @param {number} smoothness - A value that indicates how similar neighboring texels will be in the resulting texture. The value should be between 0.0 and 1.0. A value of 1.0 generates a smooth surface.
   * @param {CGSize} size - The size of the new texture in points.
   * @returns {void}
   * @desc The noise texture is tileable with itself. The RGB values stored in the texture can be used as directional (XYZ) data. The alpha values are also randomized and can be used as magnitude data, if desired.The following code creates three sprite nodes with textures generated by init(vectorNoiseWithSmoothness:size:) with smoothness values of 0.0, 0.5 and 1.0.let columWidth = scene.size.width / 3

for i in 0...2 {
    
    let size = CGSize(width: ceil(columWidth),
                      height: 0.5 * scene.size.height)
    
    let smoothness = CGFloat(i) / 2
    
    let vectorTexture = SKTexture(vectorNoiseWithSmoothness: smoothness,
                                  size: size)
    
    let sprite = SKSpriteNode(texture: vectorTexture, size: size)
    
    sprite.position = CGPoint(x: CGFloat(i) * columWidth + (columWidth / 2),
                              y: 
scene.size.height / 2)

    
    scene.addChild(sprite)
}
let columWidth = scene.size.width / 3

for i in 0...2 {
    
    let size = CGSize(width: ceil(columWidth),
                      height: 0.5 * scene.size.height)
    
    let smoothness = CGFloat(i) / 2
    
    let vectorTexture = SKTexture(vectorNoiseWithSmoothness: smoothness,
                                  size: size)
    
    let sprite = SKSpriteNode(texture: vectorTexture, size: size)
    
    sprite.position = CGPoint(x: CGFloat(i) * columWidth + (columWidth / 2),
                              y: 
scene.size.height / 2)

    
    scene.addChild(sprite)
}

   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520393-init
   */
  static textureWithVectorNoiseWithSmoothness(smoothness, size) {
  }

  /**
   * Creates a new texture whose contents are procedurally generated colored noise data.
   * @access public
   * @param {number} smoothness - A value that indicates how similar neighboring texels will be in the resulting texture. The value should be between 0.0 and 1.0. A value of 1.0 generates a smooth surface.
   * @param {CGSize} size - The size of the new texture in points.
   * @param {boolean} grayscale - If true, all four components of each texel will have equal values. If false, all four values are completely randomized.
   * @returns {void}
   * @desc Unlike other textures produced by SpriteKit, the texels are not premultiplied by the alpha value. Your custom shaders should compensate for this as necessary.The following code creates three sprite nodes with textures generated by init(noiseWithSmoothness:size:grayscale:) with smoothness values of 0.0, 0.5 and 1.0.let columWidth = scene.size.width / 3

for i in 0...2 {
    
    let size = CGSize(width: ceil(columWidth),
                      height: 0.5 * scene.size.height)
    
    let smoothness = CGFloat(i) / 2
    
    let noiseTexture = SKTexture(noiseWithSmoothness: smoothness,
                                  size: size,
                                  grayscale: false)
    
    let sprite = SKSpriteNode(texture: noiseTexture, size: size)
    
    sprite.position = CGPoint(x: CGFloat(i) * columWidth + (columWidth / 2),
                              y: scene.size.height / 2)
    
    scene.addChild(sprite)
}
let columWidth = scene.size.width / 3

for i in 0...2 {
    
    let size = CGSize(width: ceil(columWidth),
                      height: 0.5 * scene.size.height)
    
    let smoothness = CGFloat(i) / 2
    
    let noiseTexture = SKTexture(noiseWithSmoothness: smoothness,
                                  size: size,
                                  grayscale: false)
    
    let sprite = SKSpriteNode(texture: noiseTexture, size: size)
    
    sprite.position = CGPoint(x: CGFloat(i) * columWidth + (columWidth / 2),
                              y: scene.size.height / 2)
    
    scene.addChild(sprite)
}

   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519971-init
   */
  static textureWithNoiseWithSmoothness(smoothness, size, grayscale) {
  }

  // Inspecting a Texture’s Properties

  /**
   * The size of the texture.
   * @access public
   * @returns {CGSize} - 
   * @desc If the texture was created using an image file and that image file hasn’t been loaded, calling this method forces the texture data to be loaded from the file.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519772-size
   */
  size() {
    if(this._image === null){
      return new CGSize(0, 0)
    }
    return new CGSize(this._image.naturalWidth, this._image.naturalHeight)
  }

  /**
   * A rectangle that defines the portion of the texture used to render its image.
   * @access public
   * @returns {CGRect} - 
   * @desc The default value is a rectangle that covers the entire texture (0,0) - (1,1). You cannot set this value directly; to use only a portion of a texture, use the init(rect:in:) method to create a new texture.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519707-texturerect
   */
  textureRect() {
    return null
  }

  // Preloading the Texture Data

  /**
   * Load the texture data into memory, calling a completion handler after the task completes.
   * @access public
   * @param {function(): void} completionHandler - A block called after the texture data is loaded.
   * @returns {void}
   * @desc SpriteKit creates a background task to load the texture data from the associated file, then returns control to your game. After the texture data is loaded, your completion handler is called. Typically, you use this method when you want to guarantee that a particular texture is in memory before accessing it.If you need to preload multiple textures at once, use the preload(_:withCompletionHandler:) method instead.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1520172-preload
   */
  preload(completionHandler) {
  }

  /**
   * Load the texture data of multiple textures into memory.
   * @access public
   * @param {SKTexture[]} textures - An array of SKTexture objects.
   * @param {function(): void} completionHandler - A block called after all of the textures are loaded.
   * @returns {void}
   * @desc SpriteKit creates a background task that loads the texture data for all of the textures in the array, then returns control to your game. Your completion handler is called after all of the textures are loaded.
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1519817-preload
   */
  static preloadWithCompletionHandler(textures, completionHandler) {
  }

  // Instance Properties
  /**
   * 
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/documentation/spritekit/sktexture/1645801-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return this._customPlaygroundQuickLook
  }

  _loadImage(path) {
    const image = new Image()
    this._loadingImagePromise = new Promise((resolve, reject) => {
      if(path.indexOf('file:///') === 0){
        const paths = path.slice(8).split('/')
        let pathCount = 1
        let _path = paths.slice(-pathCount).join('/')
        image.onload = () => {
          console.info(`image ${_path} onload`)
          this._image = image
          resolve(this)
        }
        image.onerror = () => {
          pathCount += 1
          if(pathCount > paths.length){
            console.error(`image ${path} load error.`)
            reject(this)
          }else{
            // retry
            console.info(`image ${_path} load error.`)
            _path = paths.slice(-pathCount).join('/')
            console.info(`try ${_path}`)
            image.src = _path
          }
        }
      }else{
        image.onload = () => {
          this._image = image
          resolve(this)
        }
        image.onerror = () => {
          console.info(`image ${path} load error.`)
          reject(this)
        }
        image.src = path
      }
    })
  }

  _createTexture(gl) {
    if(this._image === null){
      return
    }
    const texture = gl.createTexture()

    const canvas = document.createElement('canvas')
    canvas.width = this._image.naturalWidth
    canvas.height = this._image.naturalHeight
    canvas.getContext('2d').drawImage(this._image, 0, 0)

    gl.bindTexture(gl.TEXTURE_2D, texture)
    // texImage2D(target, level, internalformat, width, height, border, format, type, source)
    // Safari complains that 'source' is not ArrayBufferView type, but WebGL2 should accept HTMLCanvasElement.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this._image.width, this._image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindTexture(gl.TEXTURE_2D, null)

    this._glTexture = texture
  }
}
