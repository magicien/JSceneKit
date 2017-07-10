'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNTechniqueSupport from './SCNTechniqueSupport'
import SCNMaterialProperty from './SCNMaterialProperty'
import SCNMatrix4 from './SCNMatrix4'
import CGSize from '../CoreGraphics/CGSize'
import SKColor from '../SpriteKit/SKColor'
import SCNShadowMode from './SCNShadowMode'

const _LightType = {
  IES: 'ies',
  ambient: 'ambient',
  directional: 'directional',
  omni: 'omni',
  probe: 'probe',
  spot: 'spot'
}

/**
 * A light source that can be attached to a node to illuminate the scene.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @implements {SCNTechniqueSupport}
 * @see https://developer.apple.com/documentation/scenekit/scnlight
 */
export default class SCNLight extends NSObject {
  static get _propTypes() {
    return {
      type: 'string',
      color: 'plist',
      temperature: 'float',
      intensity: 'float',
      name: 'string',
      attenuationStartDistance: 'float',
      attenuationEndDistance: 'float',
      attenuationFalloffExponent: 'float',
      spotInnerAngle: 'float',
      spotOuterAngle: 'float',
      gobo: ['SCNMaterialProperty', '_gobo'],
      castsShadow: 'boolean',
      shadowRadius: 'float',
      shadowColor: 'plist',
      shadowMapSize: 'CGSize',
      shadowSampleCount: 'integer',
      shadowMode: 'integer',
      shadowBias: 'float',
      orthographicScale: 'float',
      zFar: 'float',
      zNear: 'float',
      lightCategoryBitMask: ['integer', 'categoryBitMask'],
      automaticallyAdjustsShadowProjection: 'boolean',
      forcesBackFaceCasters: 'boolean',
      maximumShadowDistance: 'float',
      sampleDistributedShadowMaps: 'boolean',
      shadowCascadeCount: 'integer',
      shadowCascadeSplittingFactor: 'float',

      entityID: ['string', '_entityID'],
      version: ['float', null],
      spotFallOffExponent: ['float', null],
      usesDeferredShadows: ['boolean', null],
      usesModulatedMode: ['boolean', null],
      shouldBakeIndirectLighting: ['boolean', null],
      shouldBakeDirectLighting: ['boolean', null],
      baked: ['boolean', null],
      goboProjectShadows: ['boolean', null],
      shadowSampleCount2: ['integer', null],
      sphericalHarmonics: ['NSMutableData', null],
      autoShadowProjection: ['boolean', null]
    }
  }

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  constructor() {
    super()

    // Modifying a Light’s Appearance

    /**
     * A constant identifying the general behavior of the light.
     * @type {SCNLight.LightType}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522919-type
     */
    this.type = _LightType.omni

    /**
     * The color of the light. Animatable.
     * @type {SKColor}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523627-color
     */
    this.color = new SKColor(1, 1, 1, 1)

    /**
     * The color temperature, in degrees Kelvin, of the light source. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1640545-temperature
     */
    this.temperature = 6500.0

    /**
     * The luminous flux, in lumens, or total brightness of the light. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1640548-intensity
     */
    this.intensity = 1000.0


    // Managing Light Attributes

    /**
     * A name associated with the light.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522839-name
     */
    this.name = null


    // Managing Light Attenuation

    /**
     * The distance from the light at which its intensity begins to diminish. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1524223-attenuationstartdistance
     */
    this.attenuationStartDistance = 0

    /**
     * The distance from the light at which its intensity is completely diminished. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1524140-attenuationenddistance
     */
    this.attenuationEndDistance = 0

    /**
     * The transition curve for the light’s intensity between its attenuation start and end distances. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522879-attenuationfalloffexponent
     */
    this.attenuationFalloffExponent = 0


    // Managing Spotlight Extent

    /**
     * The angle, in degrees, of the area fully lit by a spotlight. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522797-spotinnerangle
     */
    this.spotInnerAngle = 0

    /**
     * The angle, in degrees, of the area partially lit by a spotlight. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523382-spotouterangle
     */
    this.spotOuterAngle = 45.0

    this._gobo = new SCNMaterialProperty()

    // Managing Shadows Cast by the Light

    /**
     * A Boolean value that determines whether the light casts shadows.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523816-castsshadow
     */
    this.castsShadow = false

    /**
     * A number that specifies the amount of blurring around the edges of shadows cast by the light. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523724-shadowradius
     */
    this.shadowRadius = 3.0

    /**
     * The color of shadows cast by the light. Animatable.
     * @type {SKColor}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522864-shadowcolor
     */
    this.shadowColor = new SKColor(0, 0, 0, 1)

    /**
     * The size of the shadow map image that SceneKit renders when creating shadows.
     * @type {CGSize}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1524127-shadowmapsize
     */
    this.shadowMapSize = new CGSize(0, 0)

    /**
     * The number of samples from the shadow map that SceneKit uses to render each pixel.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523300-shadowsamplecount
     */
    this.shadowSampleCount = 0

    /**
     * The mode SceneKit uses to render shadows.
     * @type {SCNShadowMode}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522847-shadowmode
     */
    this.shadowMode = null

    /**
     * The amount of correction to apply to the shadow to prevent rendering artifacts.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522849-shadowbias
     */
    this.shadowBias = 1.0

    /**
     * The orthographic scale SceneKit uses when rendering the shadow map for a directional light.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523951-orthographicscale
     */
    this.orthographicScale = 1.0

    /**
     * The maximum distance between the light and a visible surface for casting shadows.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522845-zfar
     */
    this.zFar = 100.0

    /**
     * The minimum distance between the light and a visible surface for casting shadows. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1522630-znear
     */
    this.zNear = 1.0


    // Choosing Nodes to be Illuminated by the Light

    /**
     * A mask that defines which categories this light belongs to.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1523669-categorybitmask
     */
    this.categoryBitMask = -1


    // Managing Photometric Lights

    /**
     * The URL for a file that contains photometry data describing the intended appearance of the light.
     * @type {?string}
     * @see https://developer.apple.com/documentation/scenekit/scnlight/1640546-iesprofileurl
     */
    this.iesProfileURL = null

    /**
     * @access private
     * @type {?string}
     */
    this._entityID = null

    this._context = null
    this._shadowFrameBuffer = null
    this._shadowDepthBuffer = null
    this._shadowDepthTexture = null
    this._projectionTransform = null


    /**
     * 
     * @type {boolean}
     * @see
     */
    this.automaticallyAdjustsShadowProjection = false

    /**
     * 
     * @type {boolean}
     * @see
     */
    this.forcesBackFaceCasters = false

    /**
     *
     * @type {number}
     * @see
     */
    this.maximumShadowDistance = 0.0

    /**
     *
     * @type {boolean}
     * @see
     */
    this.sampleDistributedShadowMaps = false

    /**
     *
     * @type {number}
     * @see
     */
    this.shadowCascadeCount = 1

    /**
     *
     * @type {number}
     * @see
     */
    this.shadowCascadeSplittingFactor = 1.0
  }

  // Creating a Light

  /**
   * Creates a light from the specified Model I/O light object.
   * @access public
   * @param {MDLLight} mdlLight - A Model I/O light object.
   * @returns {void}
   * @desc The Model I/O framework provides universal support for import, export, description, and processing of several 3D asset file formats and related resources. (For details, see Model I/O.) The MDLLight class is a generic description of a light source in a scene, supporting a superset of the attributes described by the SCNLight class.
   * @see https://developer.apple.com/documentation/scenekit/scnlight/1419849-init
   */
  init(mdlLight) {
  }

  // Managing Light Attributes

  /**
   * Returns the value of a lighting attribute.
   * @deprecated
   * @access public
   * @param {string} key - A constant specifying a lighting attribute. See Lighting Attribute Keys for available keys and their possible values.
   * @returns {?Object} - 
   * @desc A light’s type property determines its set of available attributes.You can also get the values of lighting attributes using Key-value coding. The key path for each lighting attribute is listed in Lighting Attribute Keys.
   * @see https://developer.apple.com/documentation/scenekit/scnlight/1523345-attribute
   */
  attributeForKey(key) {
    return null
  }

  /**
   * Sets the value for a lighting attribute.
   * @deprecated
   * @access public
   * @param {?Object} attribute - The value for the lighting attribute.
   * @param {string} key - A constant specifying a lighting attribute. See Lighting Attribute Keys for available keys and their possible values.
   * @returns {void}
   * @desc A light’s type property determines its set of available attributes.You can also set or animate changes to the values of lighting attributes using Key-value coding. The key path for each lighting attribute is listed in Lighting Attribute Keys.
   * @see https://developer.apple.com/documentation/scenekit/scnlight/1523148-setattribute
   */
  setAttributeForKey(attribute, key) {
  }

  // Managing Spotlight Extent
  /**
   * An image or other visual content affecting the shape and color of a light’s illuminated area.
   * @type {?SCNMaterialProperty}
   * @desc In photographic and stage lighting terminology, a gobo (also known as a flag or cookie) is a stencil, gel, or other object placed just in front of a light source, shaping or coloring the beam of light.You alter the appearance of a spotlight by changing the contents property of the object permanently assigned to this property. As with other material properties, you can use a color or image, or a Core Animation layer containing animated content, as a lighting gobo.This property applies only to lights whose type property is spot.
   * @see https://developer.apple.com/documentation/scenekit/scnlight/1523524-gobo
   */
  get gobo() {
    return this._gobo
  }

  // Structures
  /**
   * @type {Object} LightType
   * @property {string} IES A light source whose shape, direction, and intensity of illumination is determined by a photometric profile.
   * @property {string} ambient A light that illuminates all objects in the scene from all directions.
   * @property {string} directional A light source with a uniform direction and constant intensity.
   * @property {string} omni An omnidirectional light, also known as a point light. 
   * @property {string} probe A sample of the environment around a point in a scene to be used in environment-based lighting.
   * @property {string} spot A light source that illuminates a cone-shaped area.
   * @see https://developer.apple.com/documentation/scenekit/scnlight.lighttype
   */
  static get LightType() {
    return _LightType
  }

  get _shadowMapWidth() {
    if(this.shadowMapSize.width > 0){
      return this.shadowMapSize.width
    }
    // FIXME: adjust shadowMapSize
    return 2048
  }

  get _shadowMapHeight() {
    if(this.shadowMapSize.height > 0){
      return this.shadowMapSize.height
    }
    // FIXME: adjust shadowMapSize
    return 2048
  }


  _getDepthBufferForContext(context){
    if(this._shadowFrameBuffer && this._context === context){
      return this._shadowFrameBuffer
    }
    this._context = context

    const gl = context
    const width = this._shadowMapWidth
    const height = this._shadowMapHeight
    this._shadowFrameBuffer = gl.createFramebuffer()
    this._shadowDepthBuffer = gl.createRenderbuffer()
    gl.bindFramebuffer(gl.FRAMEBUFFER, this._shadowFrameBuffer)

    gl.bindRenderbuffer(gl.RENDERBUFFER, this._shadowDepthBuffer)
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height)
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this._shadowDepthBuffer)

    this._shadowDepthTexture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, this._shadowDepthTexture)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.generateMipmap(gl.TEXTURE_2D)

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this._shadowDepthTexture, 0)
    gl.drawBuffers([gl.COLOR_ATTACHMENT0])

gl.bindRenderbuffer(gl.RENDERBUFFER, null)
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)

    return this._shadowFrameBuffer
  }

  /**
   * @access private
   * @param {CGRect} viewRect -
   * @returns {void}
   */
  _updateProjectionTransform() {
    const m = new SCNMatrix4()
    const left = 0
    const right = this._shadowMapWidth
    const top = 0
    const bottom = this._shadowMapHeight
    const aspect = this._shadowMapWidth / this._shadowMapHeight

    if(this.type === _LightType.directional){
      // orthographic
      // FIXME: use orthographicScale, adjust x/y scale automatically
      //m.m11 = 2 / (right - left)
      m.m11 = 0.2
      //m.m11 = 2 / (right - left)
      m.m12 = 0
      m.m13 = 0
      m.m14 = 0
      m.m21 = 0
      //m.m22 = 2 / (top - bottom)
      m.m22 = 0.2
      m.m23 = 0
      m.m24 = 0
      m.m31 = 0
      m.m32 = 0
      m.m33 = -2 / (this.zFar - this.zNear)
      //m.m33 = -1 / (this.zFar - this.zNear)
      m.m34 = 0
      m.m41 = 0
      m.m42 = 0
      m.m43 = -(this.zFar + this.zNear) / (this.zFar - this.zNear)
      //m.m43 = -this.zFar / (this.zFar - this.zNear)
      m.m44 = 1
    }else{
      // perspective
      let m11 = 1
      let m22 = 1
      if(this.yFov <= 0 && this.xFov <= 0){
        const cot = 1.0 / Math.tan(Math.PI / 6.0)
        m11 = cot / aspect
        m22 = cot
      }else if(this.yFov <= 0){
        const cot = 1.0 / Math.tan(this.xFov * Math.PI / 360.0)
        m11 = cot
        m22 = cot * aspect
      }else if(this.xFov <= 0){
        const cot = 1.0 / Math.tan(this.yFov * Math.PI / 360.0)
        m11 = cot / aspect
        m22 = cot
      }else{
        // FIXME: compare xFov to yFov
        const cot = 1.0 / Math.tan(this.yFov * Math.PI / 360.0)
        m11 = cot / aspect
        m22 = cot
      }

      m.m11 = m11
      m.m12 = 0
      m.m13 = 0
      m.m14 = 0
      m.m21 = 0
      m.m22 = m22
      m.m23 = 0
      m.m24 = 0
      m.m31 = 0
      m.m32 = 0
      m.m33 = -(this.zFar + this.zNear) / (this.zFar - this.zNear)
      m.m34 = -1
      m.m41 = 0
      m.m42 = 0
      m.m43 = -2 * this.zFar * this.zNear / (this.zFar - this.zNear)
      m.m44 = 0
    } 
    this._projectionTransform = m
  }
}
