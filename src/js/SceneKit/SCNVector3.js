'use strict'

import SCNVector4 from './SCNVector4'
//import _Ammo from '../third_party/ammo'
/*global Ammo*/

/**
 * A representation of a three-component vector.
 * @access public
 * @see https://developer.apple.com/documentation/scenekit/scnvector3
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
   * @see https://developer.apple.com/documentation/scenekit/scnvector3/1522904-init
   */
  constructor(x = 0, y = 0, z = 0) {
    // Instance Properties
    /** @type {number} */
    this.x = x
    /** @type {number} */
    this.y = y
    /** @type {number} */
    this.z = z

    //if(x instanceof Ammo.btVector3){
    //  this.x = x.x()
    //  this.y = x.y()
    //  this.z = x.z()
    //}
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

  _copyFrom(v) {
    this.x = v.x
    this.y = v.y
    this.z = v.z
  }

  // extensions

  zero() {
    return new SCNVector3()
  }

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
    if(w === 0){
      return r
    }
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
   * @returns {SCNVector4} -
   */
  eulerAnglesToRotation() {
    const rot = new SCNVector4()
    const halfX = this.x * 0.5
    const halfY = this.y * 0.5
    const halfZ = this.z * 0.5
    const cosX = Math.cos(halfX)
    const sinX = Math.sin(halfX)
    const cosY = Math.cos(halfY)
    const sinY = Math.sin(halfY)
    const cosZ = Math.cos(halfZ)
    const sinZ = Math.sin(halfZ)

    const q = new SCNVector4()
    const x = sinX * cosY * cosZ - cosX * sinY * sinZ
    const y = cosX * sinY * cosZ + sinX * cosY * sinZ
    const z = cosX * cosY * sinZ - sinX * sinY * cosZ
    const d = x * x + y * y + z * z
    if(d === 0){
      rot.x = 0
      rot.y = 0
      rot.z = 0
      rot.w = 0
    }else{
      const r = 1.0 / Math.sqrt(d)
      rot.x = x * r
      rot.y = y * r
      rot.z = z * r
      rot.w = 2 * Math.acos(cosX * cosY * cosZ + sinX * sinY * sinZ)
    }

    return rot
  }

  /**
   * @access public
   * @returns {SCNVector4} -
   */
  eulerAnglesToQuat() {
    return this.eulerAnglesToRotation().rotationToQuat()
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray() {
    return [this.x, this.y, this.z]
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    return new Float32Array([this.x, this.y, this.z])
  }

  /**
   * @access private
   * @returns {Ammo.btVector3}
   * @desc call Ammo.destroy(vec) after using it.
   */
  _createBtVector3() {
    //return new Ammo.btVector3(this.x, this.y, this.z)
  }
}

