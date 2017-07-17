'use strict'

import SCNGeometry from './SCNGeometry'
//import CGRect from '../CoreGraphics/CGRect'
//import CGSize from '../CoreGraphics/CGSize'

/**
 * A geometry based on a string of text, optionally extruded to create a three-dimensional object. 
 * @access public
 * @extends {SCNGeometry}
 * @see https://developer.apple.com/documentation/scenekit/scntext
 */
export default class SCNText extends SCNGeometry {
  // Creating a Text Geometry

  /**
   * Creates a text geometry from a specified string, extruded with a specified depth.
   * @access public
   * @constructor
   * @param {?Object} string - An NSString or NSAttributedString object containing text from which to create the geometry.
   * @param {number} extrusionDepth - The extent of the text geometry in the Z dimension of its local coordinate space. Specify a depth of 0.0 to create 2D text confined to a plane.
   * @desc In the local coordinate system of the text geometry, the origin corresponds to the lower left corner of the text’s layout rectangle, with the text extending in the x- and y-axis dimensions. (SceneKit computes a layout rectangle automatically, or you can specify one using the containerFrame property.) The geometry is centered along its z-axis. For example, if its extrusionDepth property is 1.0, the geometry extends from -0.5 to 0.5 along the z-axis. An extrusion depth of zero creates a flat, one-sided shape—the geometry is confined to the plane whose z-coordinate is 0.0, and viewable only from its front unless its material’s isDoubleSided property is true.
   * @see https://developer.apple.com/documentation/scenekit/scntext/1522734-init
   */
  constructor(string, extrusionDepth) {
    super()

    // Managing the Geometry’s Text Content

    /**
     * The string object whose text the geometry represents.
     * @type {?Object}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523439-string
     */
    this.string = null

    /**
     * The font that SceneKit uses to create geometry from the text.
     * @type {!UIFont}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523273-font
     */
    this.font = null


    // Managing Text Layout

    /**
     * A rectangle specifying the area in which SceneKit should lay out the text.
     * @type {CGRect}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523654-containerframe
     */
    this.containerFrame = null

    /**
     * A Boolean value that specifies whether SceneKit wraps long lines of text.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523585-iswrapped
     */
    this.isWrapped = false

    /**
     * A constant that specifies how SceneKit horizontally aligns each line of text within its container.
     * @type {string}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523158-alignmentmode
     */
    this.alignmentMode = ''

    /**
     * A constant that specifies how SceneKit truncates text that is too long to fit its container.
     * @type {string}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523414-truncationmode
     */
    this.truncationMode = ''

    this._textSize = null

    // Managing the Text’s 3D Representation

    /**
     * A number that determines the accuracy or smoothness of the text geometry.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1524111-flatness
     */
    this.flatness = 0

    /**
     * The extent of the extruded text in the z-axis direction. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1522604-extrusiondepth
     */
    this.extrusionDepth = 0

    /**
     * The width or depth of each chamfered edge. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1522846-chamferradius
     */
    this.chamferRadius = 0

    /**
     * A path that determines the cross-sectional contour of each chamfered edge.
     * @type {?UIBezierPath}
     * @see https://developer.apple.com/documentation/scenekit/scntext/1523334-chamferprofile
     */
    this.chamferProfile = null
  }

  // Managing Text Layout

  /**
   * The two-dimensional extent of the text after layout.
   * @type {CGSize}
   * @desc This property reports the size of the smallest bounding rectangle containing the text. This size does not necessarily match that of the layout rectangle specified by the containerFrame property. A long body of text may overflow the layout rectangle, depending on the values of the isWrapped and truncationMode properties, and a short string of text may fit in an area smaller than the layout rectangle.
   * @see https://developer.apple.com/documentation/scenekit/scntext/1523680-textsize
   */
  get textSize() {
    return this._textSize
  }
}
