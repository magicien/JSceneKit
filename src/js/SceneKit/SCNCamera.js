'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNTechniqueSupport from './SCNTechniqueSupport'
import SCNMaterialProperty from './SCNMaterialProperty'
import SCNMatrix4 from './SCNMatrix4'


/**
 * A set of camera attributes that can be attached to a node to provide a point of view for displaying the scene.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @implements {SCNTechniqueSupport}
 * @see https://developer.apple.com/reference/scenekit/scncamera
 */
export default class SCNCamera extends NSObject {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Managing Camera Attributes

    /**
     * A name associated with the camera object.
     * @type {?string}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436623-name
     */
    this.name = null


    // Adjusting Camera Perspective

    /**
     * The camera's near depth limit. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436592-znear
     */
    this.zNear = 0

    /**
     * The camera’s far depth limit. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436596-zfar
     */
    this.zFar = 0

    /**
     * The camera’s field of view, in degrees, on the vertical axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436598-yfov
     */
    this.yFov = 0

    /**
     * The camera's field of view, in degrees, on the horizontal axis. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436608-xfov
     */
    this.xFov = 0

    /**
     * A Boolean value that determines whether the camera automatically adjusts its zNear and zFar depth limits.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436610-automaticallyadjustszrange
     */
    this.automaticallyAdjustsZRange = false


    // Managing the Camera Projection

    /**
     * A Boolean value that determines whether the camera uses an orthographic projection.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436621-usesorthographicprojection
     */
    this.usesOrthographicProjection = false

    /**
     * Specifies the camera’s magnification factor when using an orthographic projection.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436612-orthographicscale
     */
    this.orthographicScale = 0


    // Choosing Nodes to Be Visible to the Camera

    /**
     * A mask that defines which categories this camera belongs to.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436625-categorybitmask
     */
    this.categoryBitMask = 0


    // Adding Depth of Field and Blur Effects

    /**
     * The distance from the camera at which objects appear in sharp focus. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436600-focaldistance
     */
    this.focalDistance = 0

    /**
     * The width of the distance range at which objects appear in sharp focus. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436604-focalsize
     */
    this.focalSize = 0

    /**
     * The maximum amount of blurring, in pixels, applied to areas outside the camera’s depth of field. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436606-focalblurradius
     */
    this.focalBlurRadius = 0

    /**
     * A factor that determines the transition between in-focus and out-of-focus areas. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1436594-aperture
     */
    this.aperture = 0

    /**
     * A factor that determines the intensity of motion blur effects. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644099-motionblurintensity
     */
    this.motionBlurIntensity = 0


    // Adding High Dynamic Range Effects

    /**
     * A Boolean value that determines whether SceneKit applies High Dynamic Range (HDR) postprocessing effects to a scene.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644101-wantshdr
     */
    this.wantsHDR = false

    /**
     * A logarithmic bias that adjusts the results of SceneKit’s tone mapping operation, brightening or darkening the visible scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644105-exposureoffset
     */
    this.exposureOffset = 0

    /**
     * The luminance level to use as the midpoint of a tone mapping curve.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644097-averagegray
     */
    this.averageGray = 0

    /**
     * The luminance level to use as the upper end of a tone mapping curve.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644110-whitepoint
     */
    this.whitePoint = 0

    /**
     * The minimum exposure value to use in tone mapping.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644103-minimumexposure
     */
    this.minimumExposure = 0

    /**
     * The minimum exposure value to use in tone mapping.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644120-maximumexposure
     */
    this.maximumExposure = 0


    // Adding Automatic HDR Exposure Adaptation

    /**
     * A Boolean value that determines whether SceneKit automatically adjusts the exposure level.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644117-wantsexposureadaptation
     */
    this.wantsExposureAdaptation = false

    /**
     * The relative duration of automatically animated exposure transitions from dark to bright areas.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644093-exposureadaptationbrighteningspe
     */
    this.exposureAdaptationBrighteningSpeedFactor = 0

    /**
     * The relative duration of automatically animated exposure transitions from bright to dark areas.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644094-exposureadaptationdarkeningspeed
     */
    this.exposureAdaptationDarkeningSpeedFactor = 0


    // Adjusting Rendered Colors

    /**
     * An adjustment factor to apply to the overall visual contrast of the rendered scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644112-contrast
     */
    this.contrast = 0

    /**
     * An adjustment factor to apply to the overall color saturation of the rendered scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644100-saturation
     */
    this.saturation = 0

    this._colorGrading = null

    // Adding Stylistic Visual Effects

    /**
     * The magnitude of bloom effect to apply to highlights in the rendered scene. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644104-bloomintensity
     */
    this.bloomIntensity = 0

    /**
     * The brightness threshold at which to apply a bloom effect to highlights in the rendered scene. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644098-bloomthreshold
     */
    this.bloomThreshold = 0

    /**
     * The radius, in pixels, for the blurring portion of the bloom effect applied to highlights in the rendered scene. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644096-bloomblurradius
     */
    this.bloomBlurRadius = 0

    /**
     * The blend factor for fading the color fringing effect applied to the rendered scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644108-colorfringeintensity
     */
    this.colorFringeIntensity = 0

    /**
     * The magnitude of color fringing effect to apply to the rendered scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644113-colorfringestrength
     */
    this.colorFringeStrength = 0

    /**
     * The magnitude of vignette (darkening around edges) effect to apply to the rendered scene.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644106-vignettingintensity
     */
    this.vignettingIntensity = 0

    /**
     * The amount of the rendered scene to darken with a vignette effect.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1644118-vignettingpower
     */
    this.vignettingPower = 0


    // Instance Properties

    /**
     * 
     * @type {SCNMatrix4}
     * @see https://developer.apple.com/reference/scenekit/scncamera/1690501-projectiontransform
     */
    this.projectionTransform = null

  }

  // Creating a Camera

  /**
   * Creates a camera from the specified Model I/O camera object.
   * @access public
   * @param {MDLCamera} mdlCamera - A Model I/O camera object.
   * @returns {void}
   * @desc The Model I/O framework provides universal support for import, export, description, and processing of several 3D asset file formats and related resources. (For details, see Model I/O.) The MDLCamera class is a generic description of a viewpoint on a scene, supporting a superset of the attributes described by the SCNCamera class.
   * @see https://developer.apple.com/reference/scenekit/scncamera/1419839-init
   */
  init(mdlCamera) {
  }

  // Adjusting Rendered Colors
  /**
   * A texture for applying color grading effects to the entire rendered scene.
   * @type {SCNMaterialProperty}
   * @desc The contents value for this material property must be a 3D color lookup table, or a 2D texture image that represents such a table arranged in a horizontal strip. A lookup table is a cube of color values: the red, green, and blue components of an input color map to the x, y, and z coordinates of a location in that cube, and at that location in the cube is a corresponding output color. You can provide data in this cubic format as a Metal texture with the type3D texture type.The 2D representation of a 3D color cube is an arrangement of slices: for example, a 16 x 16 x 16 color cube becomes a horizontal strip of 16 squares, each 16 x 16 pixels (that is, a 256 x 16 image). Each square contains a gradation of red and green components, and together the 16 squares form a gradation for the blue component. To provide a 2D representation of a color cube, set this material property’s contents value to an image.By using a color table, you can easily create custom color effects that apply to an entire rendered scene:Create a basic color table image such as Figure 1, where the color value for each R, G, and B coordinate in the cube is the corresponding RGB color.Figure 1 Basic color table imageUse an image editor to create the color effect you want using some other image—such as a screenshot of your game. Apply only effects that affect pixel colors without modifying pixel positions. (For example, you can use hue/saturation, color curves, or color matrix filters, but not blur or distort filters.)Figure 2 Creating a color grading effectApply the same color effect you created in step 2 to your basic color table image. You can even perform these steps together: paste the basic color table into your game screenshot, apply an effect to the combined picture, then crop the picture to just the modified color table. Figure 2 shows an example effect.Assign your customized color table image (such as the example in Figure 3) to this property. When rendering, SceneKit looks up the RGB values for each pixel in the rendered scene, and displays the corresponding color values from the color table.Figure 3 Custom color table image for color gradingBasic color table imageCreating a color grading effectCustom color table image for color grading
   * @see https://developer.apple.com/reference/scenekit/scncamera/1644114-colorgrading
   */
  get colorGrading() {
    return this._colorGrading
  }
}
