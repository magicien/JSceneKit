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
   * @param {number} width - 
   * @param {number} height - 
   * @returns {void}
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1454915-init
   */
  init(width, height) {

    // Geometric Properties

    this._width = 0
    this._height = 0

    // Special Values

    this._zero = null

    // Alternate Representations

    this._dictionaryRepresentation = null
    this._debugDescription = ''
    this._customMirror = null
    this._customPlaygroundQuickLook = null
  }

  // Geometric Properties

  // Special Values
  /**
   * The size whose width and height are both zero.
   * @type {CGSize}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1455512-zero
   */
  get zero() {
    return this._zero
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
  initDictionaryRepresentation(dict) {

    // Geometric Properties

    this._width = 0
    this._height = 0

    // Special Values

    this._zero = null

    // Alternate Representations

    this._dictionaryRepresentation = null
    this._debugDescription = ''
    this._customMirror = null
    this._customPlaygroundQuickLook = null
  }
  /**
   * Returns a dictionary representation of the specified size.
   * @type {Map}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1455274-dictionaryrepresentation
   */
  get dictionaryRepresentation() {
    return this._dictionaryRepresentation
  }
  /**
   * A textual representation of the size's dimensions.  
   * @type {string}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1645822-debugdescription
   */
  get debugDescription() {
    return this._debugDescription
  }
  /**
   * A representation of the size's structure and display style for use in debugging. 
   * @type {Mirror}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1645828-custommirror
   */
  get customMirror() {
    return this._customMirror
  }
  /**
   * A representation of the size for use in Playgrounds. 
   * @type {PlaygroundQuickLook}
   * @desc 
   * @see https://developer.apple.com/reference/coregraphics/cgsize/1645830-customplaygroundquicklook
   */
  get customPlaygroundQuickLook() {
    return this._customPlaygroundQuickLook
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
    return false
  }
}
