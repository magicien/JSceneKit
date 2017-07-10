'use strict'



/**
 * Options for locking the orientation of nodes affected by a billboard constraint.
 * @access public
 * @see https://developer.apple.com/reference/scenekit/scnbillboardaxis
 */
export default class SCNBillboardAxis {

  // Constants

  /**
   * Align an affected node such that its x-axis is always parallel to that of the view, leaving it free to rotate otherwise.
   * @type {SCNBillboardAxis}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnbillboardaxis/1468664-x
   */
  get X() {
    return this._X
  }

  /**
   * Align an affected node such that its y-axis is always parallel to that of the view, leaving it free to rotate otherwise.
   * @type {SCNBillboardAxis}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnbillboardaxis/1468668-y
   */
  get Y() {
    return this._Y
  }

  /**
   * Align an affected node such that its z-axis is always perpendicular to the viewing plane, leaving it free to rotate otherwise.
   * @type {SCNBillboardAxis}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnbillboardaxis/1468647-z
   */
  get Z() {
    return this._Z
  }

  /**
   * Align an affected node such that its orientation always matches that of the view.
   * @type {SCNBillboardAxis}
   * @desc This is the default option for newly created billboard constraints.
   * @see https://developer.apple.com/reference/scenekit/scnbillboardaxis/1468666-all
   */
  get all() {
    return this._all
  }

  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {number} rawValue - 
   * @see https://developer.apple.com/reference/scenekit/scnbillboardaxis/1524212-init
   */
  constructor(rawValue) {

    // Constants

    this._X = null
    this._Y = null
    this._Z = null
    this._all = null
  }
}
