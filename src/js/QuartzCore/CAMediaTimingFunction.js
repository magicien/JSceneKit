'use strict'

import NSObject from '../ObjectiveC/NSObject'


/**
 * A function that defines the pacing of an animation as a timing curve. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/quartzcore/camediatimingfunction
 */
export default class CAMediaTimingFunction extends NSObject {

  // Creating Timing Functions

  /**
   * Creates and returns a new instance of CAMediaTimingFunction configured with the predefined timing function specified by name.
   * @access public
   * @param {string} name - The timing function to use as specified in Predefined Timing Functions. 
   * @returns {void}
   * @see https://developer.apple.com/reference/quartzcore/camediatimingfunction/1521979-init
   */
  init(name) {
  }

  /**
   * Returns an initialized timing function modeled as a cubic Bézier curve using the specified control points.
   * @access public
   * @param {number} c1x - A floating point number representing the x position of the c1 control point.
   * @param {number} c1y - A floating point number representing the y position of the c1 control point.
   * @param {number} c2x - A floating point number representing the x position of the c2 control point.
   * @param {number} c2y - A floating point number representing the y position of the c2 control point.
   * @returns {void}
   * @desc The end points of the Bézier curve are automatically set to (0.0,0.0) and (1.0,1.0). The control points defining the Bézier curve are: [(0.0,0.0), (c1x,c1y), (c2x,c2y), (1.0,1.0)].
   * @see https://developer.apple.com/reference/quartzcore/camediatimingfunction/1522235-init
   */
  initControlPoints(c1x, c1y, c2x, c2y) {
  }

  // Accessing the Control Points

  /**
   * Returns the control point for the specified index.
   * @access public
   * @param {number} idx - 
   * @param {!UnsafeMutablePointer<Float>} ptr - A pointer to an array that, upon return, will contain the x and y values of the specified point.
   * @returns {void}
   * @desc The value of index must be between 0 and 3.
   * @see https://developer.apple.com/reference/quartzcore/camediatimingfunction/1522057-getcontrolpoint
   */
  getControlPointAtValues(idx, ptr) {
  }
}
