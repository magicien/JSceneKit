'use strict'

/**
 * A representation of a three-component vector.
 * @access public
 * @see https://developer.apple.com/reference/scenekit/scnvector3
 */
export default class SCNVector3 {

  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @param {number} x - 
   * @param {number} y - 
   * @param {number} z - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnvector3/1522904-init
   */
  constructor(x = 0, y = 0, z = 0) {
    // Instance Properties
    /** @type {number} */
    this.x = x
    /** @type {number} */
    this.y = y
    /** @type {number} */
    this.z = z
  }

  /**
   * @access private
   * @param {Buffer} data -
   * @param {number} [offset = 0] -
   * @param {boolean} [bigEndian = false] -
   * @returns {SCNVector3}
   */
  static _initWithData(data, offset = 0, bigEndian = false) {
    const instance = new SCNVector3()
    if(bigEndian){
      instance.x = data.readFloatBE(offset + 0)
      instance.y = data.readFloatBE(offset + 4)
      instance.z = data.readFloatBE(offset + 8)
    }else{
      instance.x = data.readFloatLE(offset + 0)
      instance.y = data.readFloatLE(offset + 4)
      instance.z = data.readFloatLE(offset + 8)
    }
    return instance
  }

  _copy() {
    return new SCNVector3(this.x, this.y, this.z)
  }

  // extensions

  /**
   * @access public
   * @param {SCNVector3} v -
   * @returns {SCNVector3} -
   */
  add(v) {
    const r = new SCNVector3()
    r.x = this.x + v.x
    r.y = this.y + v.y
    r.z = this.z + v.z
    return r
  }

  /**
   * @access public
   * @param {SCNVector3} v -
   * @returns {SCNVector3} -
   */
  sub(v) {
    const r = new SCNVector3()
    r.x = this.x - v.x
    r.y = this.y - v.y
    r.z = this.z - v.z
    return r
  }

  /**
   * @access public
   * @param {number} n -
   * @returns {SCNVector3} -
   */
  mul(n) {
    const r = new SCNVector3()
    r.x = this.x * n
    r.y = this.y * n
    r.z = this.z * n
    return r
  }

  /**
   * @access public
   * @param {SCNVector3} v -
   * @returns {number} -
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  /**
   * @access public
   * @param {SCNVecor3} v -
   * @returns {SCNVector3} -
   */
  cross(v) {
    const r = new SCNVector3()
    r.x = this.y * v.z - this.z * v.y
    r.y = this.z * v.x - this.x * v.z
    r.z = this.x * v.y - this.y * v.x
    return r
  }

  /**
   * @access public
   * @param {SCNVector3} v -
   * @param {number} rate -
   * @returns {SCNVector3} -
   */
  lerp(v, rate) {
    const r = new SCNVector3()
    r.x = this.x + rate * (v.x - this.x)
    r.y = this.y + rate * (v.y - this.y)
    r.z = this.z + rate * (v.z - this.z)
    return r
  }

  /**
   * @access public
   * @returns {SCNVector3} -
   */
  normalize() {
    const len = this.length()
    const r = new SCNVector3()
    if(len === 0){
      return r
    }
    const sqr = 1.0 / len
    r.x = this.x * sqr
    r.y = this.y * sqr
    r.z = this.z * sqr

    return r
  }

  /**
   * @access public
   * @returns {number} -
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  /**
   * @access public
   * @param {SCNMatrix4} m -
   * @returns {SCNVector3} -
   */
  transform(m) {
    const r = new SCNVector3()
    const w = this.x * m.m14 + this.y * m.m24 + this.z * m.m34 + m.m44
    const iw = 1.0 / w
    r.x = (this.x * m.m11 + this.y * m.m21 + this.z * m.m31 + m.m41) * iw
    r.y = (this.x * m.m12 + this.y * m.m22 + this.z * m.m32 + m.m42) * iw
    r.z = (this.x * m.m13 + this.y * m.m23 + this.z * m.m33 + m.m43) * iw
    return r
  }

  /**
   * @access public
   * @param {SCNMatrix4} m -
   * @returns {SCNVector3} -
   */
  rotate(m) {
    const r = new SCNVector3()
    r.x = this.x * m.m11 + this.y * m.m21 + this.z * m.m31
    r.y = this.x * m.m12 + this.y * m.m22 + this.z * m.m32
    r.z = this.x * m.m13 + this.y * m.m23 + this.z * m.m33
    return r
  }

  /**
   * @access public
   * @param {SCNVector4} q -
   * @returns {SCNVector3} -
   */
  rotateWithQuaternion(q) {
    return this.rotate(q.rotMatrix())
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    return new Float32Array([this.x, this.y, this.z])
  }
}

