'use strict'

import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'


const _epsilon = 0.0000001

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
   * @construtor
   * @param {number[][]} [m = null] - 
   * @see https://developer.apple.com/reference/quartzcore/catransform3d/1524036-init
   */
  constructor(m = null) {
    // Instance Properties

    /** @type {number} */
    this.m11 = 0
    /** @type {number} */
    this.m12 = 0
    /** @type {number} */
    this.m13 = 0
    /** @type {number} */
    this.m14 = 0
    /** @type {number} */
    this.m21 = 0
    /** @type {number} */
    this.m22 = 0
    /** @type {number} */
    this.m23 = 0
    /** @type {number} */
    this.m24 = 0
    /** @type {number} */
    this.m31 = 0
    /** @type {number} */
    this.m32 = 0
    /** @type {number} */
    this.m33 = 0
    /** @type {number} */
    this.m34 = 0
    /** @type {number} */
    this.m41 = 0
    /** @type {number} */
    this.m42 = 0
    /** @type {number} */
    this.m43 = 0
    /** @type {number} */
    this.m44 = 0

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
    }else if(arguments.length >= 16){
      this.m11 = arguments[0]
      this.m12 = arguments[1]
      this.m13 = arguments[2]
      this.m14 = arguments[3]
      this.m21 = arguments[4]
      this.m22 = arguments[5]
      this.m23 = arguments[6]
      this.m24 = arguments[7]
      this.m31 = arguments[8]
      this.m32 = arguments[9]
      this.m33 = arguments[10]
      this.m34 = arguments[11]
      this.m41 = arguments[12]
      this.m42 = arguments[13]
      this.m43 = arguments[14]
      this.m44 = arguments[15]
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

  /**
   * @access private
   * @param {Buffer} data -
   * @param {number} [offset = 0] -
   * @returns {SCNMatrix4}
   */
  static _initWithData(data, offset = 0) {
    const instance = new SCNMatrix4()
    instance.m11 = data.readFloatLE(offset + 0)
    instance.m12 = data.readFloatLE(offset + 4)
    instance.m13 = data.readFloatLE(offset + 8)
    instance.m14 = data.readFloatLE(offset + 12)
    instance.m21 = data.readFloatLE(offset + 16)
    instance.m22 = data.readFloatLE(offset + 20)
    instance.m23 = data.readFloatLE(offset + 24)
    instance.m24 = data.readFloatLE(offset + 28)
    instance.m31 = data.readFloatLE(offset + 32)
    instance.m32 = data.readFloatLE(offset + 36)
    instance.m33 = data.readFloatLE(offset + 40)
    instance.m34 = data.readFloatLE(offset + 44)
    instance.m41 = data.readFloatLE(offset + 48)
    instance.m42 = data.readFloatLE(offset + 52)
    instance.m43 = data.readFloatLE(offset + 56)
    instance.m44 = data.readFloatLE(offset + 60)
    return instance
  }

  _copy() {
    return new SCNMatrix4(this)
  }

  // extensions

  /**
   * @access public
   * @param {SCNMatrix4} m -
   * @returns {SCNMatrix4} - 
   */
  add(m) {
    const r = new SCNMatrix4()
    r.m11 = this.m11 + m.m11
    r.m12 = this.m12 + m.m12
    r.m13 = this.m13 + m.m13
    r.m14 = this.m14 + m.m14
    r.m21 = this.m21 + m.m21
    r.m22 = this.m22 + m.m22
    r.m23 = this.m23 + m.m23
    r.m24 = this.m24 + m.m24
    r.m31 = this.m31 + m.m31
    r.m32 = this.m32 + m.m32
    r.m33 = this.m33 + m.m33
    r.m34 = this.m34 + m.m34
    r.m41 = this.m41 + m.m41
    r.m42 = this.m42 + m.m42
    r.m43 = this.m43 + m.m43
    r.m44 = this.m44 + m.m44
    return r
  }

  /**
   * @access public
   * @param {number} t -
   * @returns {SCNMatrix4} - 
   */
  mul(t) {
    const r = new SCNMatrix4()
    r.m11 = this.m11 * t
    r.m12 = this.mj2 * t
    r.m13 = this.m13 * t
    r.m14 = this.m14 * t
    r.m21 = this.m21 * t
    r.m22 = this.m22 * t
    r.m23 = this.m23 * t
    r.m24 = this.m24 * t
    r.m31 = this.m31 * t
    r.m32 = this.m32 * t
    r.m33 = this.m33 * t
    r.m34 = this.m34 * t
    r.m41 = this.m41 * t
    r.m42 = this.m42 * t
    r.m43 = this.m43 * t
    r.m44 = this.m44 * t
    return r
  }

  /**
   * @access public
   * @param {SCNMatrix4} m -
   * @returns {SCNMatrix4} - 
   */
  mult(m) {
    const r = new SCNMatrix4()
    r.m11 = this.m11 * m.m11 + this.m12 * m.m21 + this.m13 * m.m31 + this.m14 * m.m41
    r.m12 = this.m11 * m.m12 + this.m12 * m.m22 + this.m13 * m.m32 + this.m14 * m.m42
    r.m13 = this.m11 * m.m13 + this.m12 * m.m23 + this.m13 * m.m33 + this.m14 * m.m43
    r.m14 = this.m11 * m.m14 + this.m12 * m.m24 + this.m13 * m.m34 + this.m14 * m.m44
    r.m21 = this.m21 * m.m11 + this.m22 * m.m21 + this.m23 * m.m31 + this.m24 * m.m41
    r.m22 = this.m21 * m.m12 + this.m22 * m.m22 + this.m23 * m.m32 + this.m24 * m.m42
    r.m23 = this.m21 * m.m13 + this.m22 * m.m23 + this.m23 * m.m33 + this.m24 * m.m43
    r.m24 = this.m21 * m.m14 + this.m22 * m.m24 + this.m23 * m.m34 + this.m24 * m.m44
    r.m31 = this.m31 * m.m11 + this.m32 * m.m21 + this.m33 * m.m31 + this.m34 * m.m41
    r.m32 = this.m31 * m.m12 + this.m32 * m.m22 + this.m33 * m.m32 + this.m34 * m.m42
    r.m33 = this.m31 * m.m13 + this.m32 * m.m23 + this.m33 * m.m33 + this.m34 * m.m43
    r.m34 = this.m31 * m.m14 + this.m32 * m.m24 + this.m33 * m.m34 + this.m34 * m.m44
    r.m41 = this.m41 * m.m11 + this.m42 * m.m21 + this.m43 * m.m31 + this.m44 * m.m41
    r.m42 = this.m41 * m.m12 + this.m42 * m.m22 + this.m43 * m.m32 + this.m44 * m.m42
    r.m43 = this.m41 * m.m13 + this.m42 * m.m23 + this.m43 * m.m33 + this.m44 * m.m43
    r.m44 = this.m41 * m.m14 + this.m42 * m.m24 + this.m43 * m.m34 + this.m44 * m.m44
    return r
  }

  /**
   * @access public
   * @param {SCNMatrix4} m -
   * @param {number} rate -
   * @returns {SCNMatrix4} - 
   */
  lerp(m, rate) {
    const r = new SCNMatrix4()
    r.m11 = this.m11 + rate * (this.m11 - m.m11)
    r.m12 = this.m12 + rate * (this.m12 - m.m12)
    r.m13 = this.m13 + rate * (this.m13 - m.m13)
    r.m14 = this.m14 + rate * (this.m14 - m.m14)
    r.m21 = this.m21 + rate * (this.m21 - m.m21)
    r.m22 = this.m22 + rate * (this.m22 - m.m22)
    r.m23 = this.m23 + rate * (this.m23 - m.m23)
    r.m24 = this.m24 + rate * (this.m24 - m.m24)
    r.m31 = this.m31 + rate * (this.m31 - m.m31)
    r.m32 = this.m32 + rate * (this.m32 - m.m32)
    r.m33 = this.m33 + rate * (this.m33 - m.m33)
    r.m34 = this.m34 + rate * (this.m34 - m.m34)
    r.m41 = this.m41 + rate * (this.m41 - m.m41)
    r.m42 = this.m42 + rate * (this.m42 - m.m42)
    r.m43 = this.m43 + rate * (this.m43 - m.m43)
    r.m44 = this.m44 + rate * (this.m44 - m.m44)
    return r
  }

  /**
   * @access public
   * @returns {SCNVector4} -
   */
  quaternion() {
    const r = new SCNVector4()
    r.x = this.m32 - this.m23
    r.y = this.m13 - this.m31
    r.z = this.m21 - this.m12
    r.w = Math.acos((this.m11 + this.m22 + this.m33 - 1)*0.5)
    return r
  }

  /**
   * @access public
   * @returns {SCNMatrix4} -
   */
  invert() {
    const mat = SCNMatrix4._identity()
    const tmp = new SCNMatrix4(this)

    let buf = 0
    let w1 = Math.abs(tmp.m11)
    let w2 = Math.abs(tmp.m21)
    let w3 = Math.abs(tmp.m31)
    let w4 = Math.abs(tmp.m41)
    let max = w1 > w2 ? w1 : w2
    if(max < w3) max = w3

    // 1
    if(max < w4){
      buf = 1.0 / tmp.m41
      w1 = tmp.m11
      w2 = tmp.m12
      w3 = tmp.m13
      w4 = tmp.m14
      tmp.m12 = tmp.m42 * buf
      tmp.m13 = tmp.m43 * buf
      tmp.m14 = tmp.m44 * buf
      tmp.m41 = w1
      tmp.m42 = w2
      tmp.m43 = w3
      tmp.m44 = w4
      mat.m11 = 0.0
      mat.m14 = buf
      mat.m41 = 1.0
      mat.m44 = 0.0
    }else if(max === w1){
      buf = 1.0 / tmp.m11
      tmp.m12 *= buf
      tmp.m13 *= buf
      tmp.m14 *= buf
      mat.m11 = buf
    }else if(max === w2){
      buf = 1.0 / tmp.m21
      w1 = tmp.m11
      w2 = tmp.m12
      w3 = tmp.m13
      w4 = tmp.m14
      tmp.m12 = tmp.m22 * buf
      tmp.m13 = tmp.m23 * buf
      tmp.m14 = tmp.m24 * buf
      tmp.m21 = w1
      tmp.m22 = w2
      tmp.m23 = w3
      tmp.m24 = w4
      mat.m11 = 0.0
      mat.m12 = buf
      mat.m21 = 1.0
      mat.m22 = 0.0
    }else{
      buf = 1.0 / tmp.m31
      w1 = tmp.m11
      w2 = tmp.m12
      w3 = tmp.m13
      w4 = tmp.m14
      tmp.m12 = tmp.m32 * buf
      tmp.m13 = tmp.m33 * buf
      tmp.m14 = tmp.m34 * buf
      tmp.m31 = w1
      tmp.m32 = w2
      tmp.m33 = w3
      tmp.m34 = w4
      mat.m11 = 0.0
      mat.m13 = buf
      mat.m31 = 1.0
      mat.m33 = 0.0
    }

    buf = tmp.m21
    tmp.m22 -= tmp.m12 * buf
    tmp.m23 -= tmp.m13 * buf
    tmp.m24 -= tmp.m14 * buf
    mat.m21 -= mat.m11 * buf
    mat.m22 -= mat.m12 * buf
    mat.m23 -= mat.m13 * buf
    mat.m24 -= mat.m14 * buf

    buf = tmp.m31
    tmp.m32 -= tmp.m12 * buf
    tmp.m33 -= tmp.m13 * buf
    tmp.m34 -= tmp.m14 * buf
    mat.m31 -= mat.m11 * buf
    mat.m32 -= mat.m12 * buf
    mat.m33 -= mat.m13 * buf
    mat.m34 -= mat.m14 * buf

    buf = tmp.m41
    tmp.m42 -= tmp.m12 * buf
    tmp.m43 -= tmp.m13 * buf
    tmp.m44 -= tmp.m14 * buf
    mat.m41 -= mat.m11 * buf
    mat.m42 -= mat.m12 * buf
    mat.m43 -= mat.m13 * buf
    mat.m44 -= mat.m14 * buf

    // 2
    w2 = Math.abs(tmp.m22)
    w3 = Math.abs(tmp.m32)
    w4 = Math.abs(tmp.m42)
    max = w2 > w3 ? w2 : w3
    if(max < w4){
      buf = 1.0 / tmp.m42
      w2 = tmp.m22
      w3 = tmp.m23
      w4 = tmp.m24
      tmp.m23 = tmp.m43 * buf
      tmp.m24 = tmp.m44 * buf
      tmp.m42 = w2
      tmp.m43 = w3
      tmp.m44 = w4
      w1 = mat.m21
      w2 = mat.m22
      w3 = mat.m23
      w4 = mat.m24
      mat.m21 = mat.m41 * buf
      mat.m22 = mat.m42 * buf
      mat.m23 = mat.m43 * buf
      mat.m24 = mat.m44 * buf
      mat.m41 = w1
      mat.m42 = w2
      mat.m43 = w3
      mat.m44 = w4
    }else if(w2 > w3){
      buf = 1.0 / tmp.m22
      tmp.m23 *= buf
      tmp.m24 *= buf
      mat.m21 *= buf
      mat.m22 *= buf
      mat.m23 *= buf
      mat.m24 *= buf
    }else{
      buf = 1.0 / tmp.m32
      w2 = tmp.m22
      w3 = tmp.m23
      w4 = tmp.m24
      tmp.m23 = tmp.m33 * buf
      tmp.m24 = tmp.m34 * buf
      tmp.m32 = w2
      tmp.m33 = w3
      tmp.m34 = w4
      w1 = mat.m21
      w2 = mat.m22
      w3 = mat.m23
      w4 = mat.m24
      mat.m21 = mat.m31 * buf
      mat.m22 = mat.m32 * buf
      mat.m23 = mat.m33 * buf
      mat.m24 = mat.m34 * buf
      mat.m31 = w1
      mat.m32 = w2
      mat.m33 = w3
      mat.m34 = w4
    }

    buf = tmp.m12
    tmp.m13 -= tmp.m23 * buf
    tmp.m14 -= tmp.m24 * buf
    mat.m11 -= mat.m21 * buf
    mat.m12 -= mat.m22 * buf
    mat.m13 -= mat.m23 * buf
    mat.m14 -= mat.m24 * buf

    buf = tmp.m32
    tmp.m33 -= tmp.m23 * buf
    tmp.m34 -= tmp.m24 * buf
    mat.m31 -= mat.m21 * buf
    mat.m32 -= mat.m22 * buf
    mat.m33 -= mat.m23 * buf
    mat.m34 -= mat.m24 * buf

    buf = tmp.m42
    tmp.m43 -= tmp.m23 * buf
    tmp.m44 -= tmp.m24 * buf
    mat.m41 -= mat.m21 * buf
    mat.m42 -= mat.m22 * buf
    mat.m43 -= mat.m23 * buf
    mat.m44 -= mat.m24 * buf

    // 3
    if(Math.abs(tmp.m33) > Math.abs(tmp.m43)){
      buf = 1.0 / tmp.m33
      tmp.m34 *= buf
      mat.m31 *= buf
      mat.m32 *= buf
      mat.m33 *= buf
      mat.m34 *= buf
    }else{
      buf = 1.0 / tmp.m43
      w3 = tmp.m33
      w4 = tmp.m34
      tmp.m34 = tmp.m44 * buf
      tmp.m43 = w3
      tmp.m44 = w4
      w1 = mat.m31
      w2 = mat.m32
      w3 = mat.m33
      w4 = mat.m34
      mat.m31 = mat.m41 * buf
      mat.m32 = mat.m42 * buf
      mat.m33 = mat.m43 * buf
      mat.m34 = mat.m44 * buf
      mat.m41 = w1
      mat.m42 = w2
      mat.m43 = w3
      mat.m44 = w4
    }
    buf = tmp.m13
    tmp.m14 -= tmp.m34 * buf
    mat.m11 -= mat.m31 * buf
    mat.m12 -= mat.m32 * buf
    mat.m13 -= mat.m33 * buf
    mat.m14 -= mat.m34 * buf

    buf = tmp.m23
    tmp.m24 -= tmp.m34 * buf
    mat.m21 -= mat.m31 * buf
    mat.m22 -= mat.m32 * buf
    mat.m23 -= mat.m33 * buf
    mat.m24 -= mat.m34 * buf

    buf = tmp.m43
    tmp.m44 -= tmp.m34 * buf
    mat.m41 -= mat.m31 * buf
    mat.m42 -= mat.m32 * buf
    mat.m43 -= mat.m33 * buf
    mat.m44 -= mat.m34 * buf

    // 4
    buf = 1.0 / tmp.m44
    mat.m41 *= buf
    mat.m42 *= buf
    mat.m43 *= buf
    mat.m44 *= buf

    buf = tmp.m14
    mat.m11 -= mat.m41 * buf
    mat.m12 -= mat.m42 * buf
    mat.m13 -= mat.m43 * buf
    mat.m14 -= mat.m44 * buf

    buf = tmp.m24
    mat.m21 -= mat.m41 * buf
    mat.m22 -= mat.m42 * buf
    mat.m23 -= mat.m43 * buf
    mat.m24 -= mat.m44 * buf

    buf = tmp.m34
    mat.m31 -= mat.m41 * buf
    mat.m32 -= mat.m42 * buf
    mat.m33 -= mat.m43 * buf
    mat.m34 -= mat.m44 * buf

    return mat
  }

  /**
   * @access public
   * @returns {SCNMatrix4} -
   */
  transpose() {
    const r = new SCNMatrix4()
    r.m11 = this.m11
    r.m12 = this.m21
    r.m13 = this.m31
    r.m14 = this.m41
    r.m21 = this.m12
    r.m22 = this.m22
    r.m23 = this.m32
    r.m24 = this.m42
    r.m31 = this.m13
    r.m32 = this.m23
    r.m33 = this.m33
    r.m34 = this.m43
    r.m41 = this.m14
    r.m42 = this.m24
    r.m43 = this.m34
    r.m44 = this.m44
    return r
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} z -
   * @returns {SCNMatrix4} -
   */
  scale(x, y, z) {
    const m = SCNMatrix4.matrixWithScale(x, y, z)
    return this.mult(m)
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} z -
   * @returns {SCNMatrix4} -
   */
  static matrixWithScale(x, y, z) {
    let _x = x
    let _y = y
    let _z = z
    if(x instanceof SCNVector3){
      const v = x
      _x = v.x
      _y = v.y
      _z = v.z
    }

    //const m = new SCNMatrix4()
    const m = SCNMatrix4._identity()
    m.m11 = _x
    m.m22 = _y
    m.m33 = _z
    return m
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} z -
   * @param {number} w -
   * @returns {SCNMatrix4} -
   */
  rotation(x, y, z, w) {
    if(x instanceof SCNVector4){
      const v = x
      x = v.x
      y = v.y
      z = v.z
      w = v.w
    }

    const m = SCNMatrix4.matrixWithRotation(x, y, z, w)
    return this.mult(m)
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} z -
   * @param {number} w -
   * @returns {SCNMatrix4} -
   */
  static matrixWithRotation(x, y, z, w) {
    if(x instanceof SCNVector4){
      const v = x
      x = v.x
      y = v.y
      z = v.z
      w = v.w
    }

    const c = Math.cos(w)
    const s = Math.sin(w)
    const v = (new SCNVector3(x, y, z)).normalize()
    const m = SCNMatrix4._identity()

    const nx = v.x
    const ny = v.y
    const nz = v.z

    m.m11 = nx * nx * (1.0-c) + c
    m.m12 = ny * nx * (1.0-c) + nz * s
    m.m13 = nz * nx * (1.0-c) - ny * s
    m.m14 = 0.0
    m.m21 = nx * ny * (1.0-c) - nz * s
    m.m22 = ny * ny * (1.0-c) + c
    m.m23 = nz * ny * (1.0-c) + nx * s
    m.m24 = 0.0
    m.m31 = nx * nz * (1.0-c) + ny * s
    m.m32 = ny * nz * (1.0-c) - nx * s
    m.m33 = nz * nz * (1.0-c) + c
    m.m34 = 0.0
    m.m41 = 0.0
    m.m42 = 0.0
    m.m43 = 0.0
    m.m44 = 1.0

    return m
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} z -
   * @returns {SCNMatrix4} -
   */
  translation(x, y, z) {
    const m = SCNMatrix4.matrixWithTranslation(x, y, z)
    return this.mult(m)
  }

  /**
   * @access public
   * @param {number} x -
   * @param {number} y -
   * @param {number} z -
   * @returns {SCNMatrix4} -
   */
  static matrixWithTranslation(x, y, z) {
    let _x = x
    let _y = y
    let _z = z
    if(x instanceof SCNVector3){
      const v = x
      _x = v.x
      _y = v.y
      _z = v.z
    }

    //const m = new SCNMatrix4()
    const m = SCNMatrix4._identity()
    m.m41 = _x
    m.m42 = _y
    m.m43 = _z
    return m
  }

  /**
   * Returns a Boolean value that indicates whether the corresponding elements of two matrices are equal.
   * @access public
   * @param {SCNMatrix4} m -
   * @returns {boolean} -
   * @desc This function performs a numeric (not bitwise) comparison of each pair of elements.
   * @see https://developer.apple.com/reference/scenekit/1409665-scnmatrix4equaltomatrix4
   */
  equalTo(m) {
    if(!(m instanceof SCNMatrix4)){
      return false
    }

    return Math.abs(this.m11 - m.m11) < _epsilon
      && Math.abs(this.m12 - m.m12) < _epsilon
      && Math.abs(this.m13 - m.m13) < _epsilon
      && Math.abs(this.m14 - m.m14) < _epsilon
      && Math.abs(this.m21 - m.m21) < _epsilon
      && Math.abs(this.m22 - m.m22) < _epsilon
      && Math.abs(this.m23 - m.m23) < _epsilon
      && Math.abs(this.m24 - m.m24) < _epsilon
      && Math.abs(this.m31 - m.m31) < _epsilon
      && Math.abs(this.m32 - m.m32) < _epsilon
      && Math.abs(this.m33 - m.m33) < _epsilon
      && Math.abs(this.m34 - m.m34) < _epsilon
      && Math.abs(this.m41 - m.m41) < _epsilon
      && Math.abs(this.m42 - m.m42) < _epsilon
      && Math.abs(this.m43 - m.m43) < _epsilon
      && Math.abs(this.m44 - m.m44) < _epsilon
  }

  /**
   * Returns a Boolean value that indicates whether the matrix is equal to the identity matrix.
   * @access public
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/scenekit/1409715-scnmatrix4isidentity
   */
  isIdentity() {
    return this.equalTo(SCNMatrix4._identity())
  }

  /**
   * @access public
   * @returns {SCNVector3} -
   */
  getScale() {
    const sx = new SCNVector3(this.m11, this.m21, this.m31)
    const sy = new SCNVector3(this.m12, this.m22, this.m32)
    const sz = new SCNVector3(this.m13, this.m23, this.m33)
    return new SCNVector3(sx.length(), sy.length(), sz.length())
  }

  /**
   * @access public
   * @returns {SCNVector3} -
   */
  getTranslation() {
    return new SCNVector3(this.m41, this.m42, this.m43)
  }

  /**
   * @access public
   * @returns {SCNVector4} -
   */
  getRotation() {
    // TODO: implement
    throw new Error('SCNMatrix4.getRotation: not implemented')
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray() {
    return [
      this.m11, this.m12, this.m13, this.m14,
      this.m21, this.m22, this.m23, this.m24,
      this.m31, this.m32, this.m33, this.m34,
      this.m41, this.m42, this.m43, this.m44
    ]
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    return new Float32Array([
      this.m11, this.m12, this.m13, this.m14,
      this.m21, this.m22, this.m23, this.m24,
      this.m31, this.m32, this.m33, this.m34,
      this.m41, this.m42, this.m43, this.m44
    ])
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray3x4f() {
    return [
      this.m11, this.m21, this.m31, this.m41,
      this.m12, this.m22, this.m32, this.m42,
      this.m13, this.m23, this.m33, this.m43
    ]
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array3x4f() {
    return new Float32Array([
      this.m11, this.m21, this.m31, this.m41,
      this.m12, this.m22, this.m32, this.m42,
      this.m13, this.m23, this.m33, this.m43
    ])
  }
  
  static _identity() {
    return new SCNMatrix4(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
  }
}

