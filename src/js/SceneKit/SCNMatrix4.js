'use strict'

import SCNVector3 from './SCNVector3'

/**
 * A representation of a 4 x 4 matrix.
 * @access public
 * @see https://developer.apple.com/reference/scenekit/scnmatrix4
 */
export default class SCNMatrix4 {

  // Initializers

  /**
   * 
   * @access public
   * @param {number[][]} [m = null] - 
   * @returns {void}
   * @see https://developer.apple.com/reference/quartzcore/catransform3d/1524036-init
   */
  init(m = null) {
    // Instance Properties

    /** @type {number} */
    this.m11 = 1
    /** @type {number} */
    this.m12 = 0
    /** @type {number} */
    this.m13 = 0
    /** @type {number} */
    this.m14 = 0
    /** @type {number} */
    this.m21 = 0
    /** @type {number} */
    this.m22 = 1
    /** @type {number} */
    this.m23 = 0
    /** @type {number} */
    this.m24 = 0
    /** @type {number} */
    this.m31 = 0
    /** @type {number} */
    this.m32 = 0
    /** @type {number} */
    this.m33 = 1
    /** @type {number} */
    this.m34 = 0
    /** @type {number} */
    this.m41 = 0
    /** @type {number} */
    this.m42 = 0
    /** @type {number} */
    this.m43 = 0
    /** @type {number} */
    this.m44 = 1

    if(m instanceof SCNMatrix4){
      this.m11 = m.m11
      this.m12 = m.m12
      this.m13 = m.m13
      this.m14 = m.m14
      this.m21 = m.m21
      this.m22 = m.m22
      this.m23 = m.m23
      this.m24 = m.m24
      this.m31 = m.m31
      this.m32 = m.m32
      this.m33 = m.m33
      this.m34 = m.m34
      this.m41 = m.m41
      this.m42 = m.m42
      this.m43 = m.m43
      this.m44 = m.m44
    }else if(m !== null){
      // TODO: type check
      this.m11 = m[0][0]
      this.m12 = m[0][1]
      this.m13 = m[0][2]
      this.m14 = m[0][3]
      this.m21 = m[1][0]
      this.m22 = m[1][1]
      this.m23 = m[1][2]
      this.m24 = m[1][3]
      this.m31 = m[2][0]
      this.m32 = m[2][1]
      this.m33 = m[2][2]
      this.m34 = m[2][3]
      this.m41 = m[3][0]
      this.m42 = m[3][1]
      this.m43 = m[3][2]
      this.m44 = m[3][3]
    }
  }
}
