'use strict'

import CGLineCap from '../CoreGraphics/CGLineCap'
import CGLineJoin from '../CoreGraphics/CGLineJoin'
import SKBlendMode from './SKBlendMode'
import SKColor from './SKColor'
import SKNode from './SKNode'
//import CGPath from '../CoreGraphics/CGPath'
//import CGRect from '../CoreGraphics/CGRect'
//import CGSize from '../CoreGraphics/CGSize'
//import SKTexture from './SKTexture'
//import SKShader from './SKShader'
//import SKAttributeValue from './SKAttributeValue'


/**
 * A node that renders a shape defined by a Core Graphics path.
 * @access public
 * @extends {SKNode}
 * @see https://developer.apple.com/reference/spritekit/skshapenode
 */
export default class SKShapeNode extends SKNode {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Inspecting the Shape Node’s Path

    /**
     * The path that defines the shape.
     * @type {?CGPath}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519741-path
     */
    this.path = null


    // Setting the Fill Properties

    /**
     * The color used to fill the shape.
     * @type {SKColor}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1520154-fillcolor
     */
    this.fillColor = new SKColor(0, 0, 0, 0)

    /**
     * The texture used to fill the shape.
     * @type {?SKTexture}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519956-filltexture
     */
    this.fillTexture = null

    /**
     * A custom shader used to determine the color of the filled portion of the shape node.
     * @type {?SKShader}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519629-fillshader
     */
    this.fillShader = null


    // Setting the Stroke Properties

    /**
     * The width used to stroke the path.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519885-linewidth
     */
    this.lineWidth = 1.0

    /**
     * The glow that extends outward from the stroked line.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1520116-glowwidth
     */
    this.glowWidth = 0

    /**
     * A Boolean value that determines whether the stroked path is smoothed when drawn.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519719-isantialiased
     */
    this.isAntialiased = true

    /**
     * The color used to stroke the shape.
     * @type {SKColor}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519748-strokecolor
     */
    this.strokeColor = new SKColor(1.0, 1.0, 1.0, 1.0)

    /**
     * The texture used to stroke the shape.
     * @type {?SKTexture}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519824-stroketexture
     */
    this.strokeTexture = null

    /**
     * A custom shader used to determine the color of the stroked portion of the shape node.
     * @type {?SKShader}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1519784-strokeshader
     */
    this.strokeShader = null

    /**
     * The style used to render the endpoints of the stroked portion of the shape node.
     * @type {CGLineCap}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1520360-linecap
     */
    this.lineCap = CGLineCap.butt

    /**
     * The junction type used when the stroked portion of the shape node is rendered.
     * @type {CGLineJoin}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1520358-linejoin
     */
    this.lineJoin = CGLineJoin.bevel

    /**
     * The miter limit to use when the line is stroked using a miter join style.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1520240-miterlimit
     */
    this.miterLimit = 0.5


    // Blending the Shape with the Framebuffer

    /**
     * The blend mode used to blend the shape into the parent’s framebuffer.
     * @type {SKBlendMode}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/1520045-blendmode
     */
    this.blendMode = SKBlendMode.alpha


    // Reading the Shape Node’s Properties

    //this._lineLength = 0

    // Working with Custom Shaders

    /**
     * The values of each attribute associated with the node's attached shader.
     * @type {Map<string, SKAttributeValue>}
     * @see https://developer.apple.com/reference/spritekit/skshapenode/2715841-attributevalues
     */
    this.attributeValues = new Map()


    // Instance Properties

    this._customPlaygroundQuickLook = null
  }

  // Creating a Shape Path

  /**
   * Creates a shape node from a Core Graphics path.
   * @access public
   * @param {CGPath} path - The Core Graphics path to use. The path is relative to the node’s origin.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1520022-init
   */
  static node(path) {
  }

  /**
   * Creates a shape node with a rectangular path centered on the node’s origin.
   * @access public
   * @param {CGSize} size - The size of the rectangle.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1520147-init
   */
  static nodeWithRectOf(size) {
  }

  /**
   * Creates a shape node with a circular path centered on the node’s origin.
   * @access public
   * @param {number} radius - The radius of the circle.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1519570-init
   */
  static nodeWithCircleOfRadius(radius) {
  }

  /**
   * Creates a shape node with an elliptical path centered on the node’s origin.
   * @access public
   * @param {CGSize} size - The height and width of the ellipse.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1519980-init
   */
  static nodeWithEllipseOf(size) {
  }

  /**
   * Creates a shape node with an elliptical path that fills the specified rectangle.
   * @access public
   * @param {CGRect} rect - A rectangle, relative to the node’s origin.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1520412-init
   */
  static nodeWithEllipseIn(rect) {
  }

  /**
   * Creates a shape node from a series of points.
   * @access public
   * @param {UnsafeMutablePointer<CGPoint>} points - An array of Core Graphics points. The points are relative to the node’s origin.
   * @param {number} numPoints - The number of points in the array.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1520120-init
   */
  static nodeWithPointsCount(points, numPoints) {
  }

  /**
   * Creates a shape node from a series of spline points.
   * @access public
   * @param {UnsafeMutablePointer<CGPoint>} points - An array of Core Graphics points.
   * @param {number} numPoints - The number of points in the array.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1520140-init
   */
  static nodeWithSplinePointsCount(points, numPoints) {
  }

  // Reading the Shape Node’s Properties
  /**
   * The length of the line defined by the shape node.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1520398-linelength
   */
  get lineLength() {
    //return this._lineLength
    // TODO: implement
    return 0
  }

  // Working with Custom Shaders

  /**
   * Sets an attribute value for an attached shader.
   * @access public
   * @param {SKAttributeValue} value - An attribute value object containing the scalar or vector value to set in the attached shader.
   * @param {string} key - The attribute name.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skshapenode/2715855-setvalue
   */
  setValueForAttribute(value, key) {
  }

  /**
   * The value of a shader attribute.
   * @access public
   * @param {string} key - The attribute name.
   * @returns {?SKAttributeValue} - 
   * @see https://developer.apple.com/reference/spritekit/skshapenode/2715843-value
   */
  valueForAttributeNamed(key) {
    return null
  }

  // Instance Properties
  /**
   * A custom playground quick look for this instance.
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/reference/spritekit/skshapenode/1645784-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return this._customPlaygroundQuickLook
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @returns {void}
   */
  _render(gl) {
  }

}
