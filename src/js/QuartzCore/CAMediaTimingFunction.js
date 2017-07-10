'use strict'

import NSObject from '../ObjectiveC/NSObject'
import * as Constants from '../constants'

/**
 * A function that defines the pacing of an animation as a timing curve. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/quartzcore/camediatimingfunction
 */
export default class CAMediaTimingFunction extends NSObject {

  // Creating Timing Functions

  /**
   * Returns an initialized timing function modeled as a cubic Bézier curve using the specified control points.
   * @access public
   * @constructor
   * @param {number} c1x - A floating point number representing the x position of the c1 control point.
   * @param {number} c1y - A floating point number representing the y position of the c1 control point.
   * @param {number} c2x - A floating point number representing the x position of the c2 control point.
   * @param {number} c2y - A floating point number representing the y position of the c2 control point.
   * @desc The end points of the Bézier curve are automatically set to (0.0,0.0) and (1.0,1.0). The control points defining the Bézier curve are: [(0.0,0.0), (c1x,c1y), (c2x,c2y), (1.0,1.0)].
   * @see https://developer.apple.com/documentation/quartzcore/camediatimingfunction/1522235-init
   */
  constructor(c1x, c1y, c2x, c2y) {
    super()

    this._c1x = c1x
    this._c1y = c1y
    this._c2x = c2x
    this._c2y = c2y
  }


  /**
   * Creates and returns a new instance of CAMediaTimingFunction configured with the predefined timing function specified by name.
   * @access public
   * @param {string} name - The timing function to use as specified in Predefined Timing Functions. 
   * @returns {CAMediaTimingFunction} -
   * @see https://developer.apple.com/documentation/quartzcore/camediatimingfunction/1521979-init
   */
  static functionWithName(name) {
    switch(name){
      case Constants.kCAMediaTimingFunctionLinear:
        return new CAMediaTimingFunction(0.0, 0.0, 1.0, 1.0)
      case Constants.kCAMediaTimingFunctionEaseIn:
        return new CAMediaTimingFunction(0.42, 0.0, 1.0, 1.0)
      case Constants.kCAMediaTimingFunctionEaseOut:
        return new CAMediaTimingFunction(0.0, 0.0, 0.58, 1.0)
      case Constants.kCAMediaTimingFunctionEaseInEaseOut:
        return new CAMediaTimingFunction(0.42, 0.0, 0.58, 1.0)
      case Constants.kCAMediaTimingFunctionDefault:
        return new CAMediaTimingFunction(0.25, 0.1, 0.25, 1.0)
      default:
        throw new Error(`CAMediaTimingFunction: unknown name: ${name}`)
    }
  }

  /**
   * Returns an initialized timing function modeled as a cubic Bézier curve using the specified control points.
   * @access public
   * @param {number} c1x - A floating point number representing the x position of the c1 control point.
   * @param {number} c1y - A floating point number representing the y position of the c1 control point.
   * @param {number} c2x - A floating point number representing the x position of the c2 control point.
   * @param {number} c2y - A floating point number representing the y position of the c2 control point.
   * @returns {CAMediaTimingFunction} -
   * @desc The end points of the Bézier curve are automatically set to (0.0,0.0) and (1.0,1.0). The control points defining the Bézier curve are: [(0.0,0.0), (c1x,c1y), (c2x,c2y), (1.0,1.0)].
   * @see https://developer.apple.com/documentation/quartzcore/camediatimingfunction/1522235-init
   */
  static functionWithControlPoints(c1x, c1y, c2x, c2y) {
    return new CAMediaTimingFunction(c1x, c1y, c2x, c2y)
  }

  // Accessing the Control Points

  /**
   * Returns the control point for the specified index.
   * @access public
   * @param {number} idx - 
   * @param {!UnsafeMutablePointer<Float>} ptr - A pointer to an array that, upon return, will contain the x and y values of the specified point.
   * @returns {void}
   * @desc The value of index must be between 0 and 3.
   * @see https://developer.apple.com/documentation/quartzcore/camediatimingfunction/1522057-getcontrolpoint
   */
  getControlPointAtValues(idx, ptr) {
  }

  _getValueAtTime(time) {
    let t0 = 0
    let t1 = 1
    let t = 0.5
    let r = 0

    if(time <= 0){
      return 0
    }else if(time >= 1){
      return 1
    }

    for(let i=0; i<8; i++){
      r = 1 - t
      const tval = 3 * t * r * (this._c1x * r + this._c2x * t) + t * t * t
      if(time > tval){
        t0 = t
      }else{
        t1 = t
      }
      t = (t0 + t1) * 0.5
    }
    r = 1 - t
    const val = 3 * t * r * (this._c1y * r + this._c2y * t) + t * t * t

    return val
  }
}
