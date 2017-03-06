'use strict'

/**
 * A structure that contains width and height values.
 * @access public
 * @see https://developer.apple.com/reference/coregraphics/cgsize
 */
export default class CGSize {

  // Initializers

  /**
   * Creates a size with dimensions specified as floating-point values.    
   * @access public
   * @constructor
   * @param {number} width - 
   * @param {number} height - 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1454915-init
   */
  constructor(width, height) {
    // Geometric Properties
    this.width = width
    this.height = height
  }

  // Geometric Properties

  // Special Values
  /**
   * The size whose width and height are both zero.
   * @type {CGSize}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1455512-zero
   */
  static get zero() {
    return new CGSize(0, 0)
  }

  // Transforming Sizes

  /**
   * Returns the height and width resulting from a transformation of an existing height and width.
   * @access public
   * @param {CGAffineTransform} t - The affine transform to apply. 
   * @returns {CGSize} - 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1454806-applying
   */
  applying(t) {
    return null
  }

  // Alternate Representations

  /**
   * Creates a size from a canonical dictionary representation. 
   * @access public
   * @param {Map} dict - A dictionary containing width and height values for the size to create, in the format used by the dictionaryRepresentation property.
   * @returns {void}
   * @see https://developer.apple.com/reference/coregraphics/cgsize/2427155-init
   */
  static sizeWithDictionaryRepresentation(dict) {
    return new CGSize(dict.get('width'), dict.get('height'))
  }

  /**
   * Returns a dictionary representation of the specified size.
   * @type {Map}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1455274-dictionaryrepresentation
   */
  get dictionaryRepresentation() {
    const map = new Map()
    map.set('width', this.width)
    map.set('height', this.height)
    return map
  }

  /**
   * A textual representation of the size's dimensions.  
   * @type {string}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1645822-debugdescription
   */
  get debugDescription() {
    return `{width: ${this.width}, height: ${this.height}}`
  }

  /**
   * A representation of the size's structure and display style for use in debugging. 
   * @type {Mirror}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1645828-custommirror
   */
  get customMirror() {
    return null
  }
  /**
   * A representation of the size for use in Playgrounds. 
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1645830-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return null
  }

  // Comparing Sizes

  /**
   * Returns whether two sizes are equal. 
   * @access public
   * @param {CGSize} size2 - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1455176-equalto
   */
  equalTo(size2) {
    const epsilon = 0.00001
    return Math.abs(this.width - size2.width) < epsilon
        && Math.abs(this.height - size2.height) < epsilon
  }

  copy() {
    return new CGSize(this.width, this.height)
  }
}
