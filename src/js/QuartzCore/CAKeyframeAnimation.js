'use strict'

import CAPropertyAnimation from './CAPropertyAnimation'
import CGPath from '../CoreGraphics/CGPath'
import CAMediaTimingFunction from './CAMediaTimingFunction'
import * as Constants from '../constants'


/**
 * An object that provides keyframe animation capabilities for a layer object. 
 * @access public
 * @extends {CAPropertyAnimation}
 * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation
 */
export default class CAKeyframeAnimation extends CAPropertyAnimation {
  // Creating an Animation

  /**
   * Creates and returns an CAKeyframeAnimation instance for the specified key path.
   * @access public
   * @constructor
   * @param {?string} path - 
   */
  constructor(path) {
    super(path)

    // Providing keyframe values

    /**
     * An array of objects that specify the keyframe values to use for the animation.
     * @type {?Object[]}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412498-values
     */
    this.values = null

    /**
     * The path for a point-based property to follow.
     * @type {?CGPath}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412474-path
     */
    this.path = null


    // Keyframe timing

    /**
     * An optional array of NSNumber objects that define the time at which to apply a given keyframe segment.
     * @type {?number[]}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412522-keytimes
     */
    this.keyTimes = null

    /**
     * An optional array of CAMediaTimingFunction objects that define the pacing for each keyframe segment.
     * @type {?CAMediaTimingFunction[]}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412465-timingfunctions
     */
    this.timingFunctions = null

    /**
     * Specifies how intermediate keyframe values are calculated by the receiver.
     * @type {string}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412500-calculationmode
     */
    this.calculationMode = Constants.kCAAnimationLinear


    // Rotation Mode Attribute

    /**
     * Determines whether objects animating along the path rotate to match the path tangent.
     * @type {?string}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412454-rotationmode
     */
    this.rotationMode = null


    // Cubic Mode Attributes

    /**
     * An array of NSNumber objects that define the tightness of the curve. 
     * @type {?number[]}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412475-tensionvalues
     */
    this.tensionValues = null

    /**
     * An array of NSNumber objects that define the sharpness of the timing curve’s corners.
     * @type {?number[]}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412491-continuityvalues
     */
    this.continuityValues = null

    /**
     * An array of NSNumber objects that define the position of the curve relative to a control point.
     * @type {?number[]}
     * @see https://developer.apple.com/reference/quartzcore/cakeyframeanimation/1412485-biasvalues
     */
    this.biasValues = null

    /**
     * @access private
     * @type {number}
     */
    this._indexCache = 0
  }

  /**
   * @access public
   * @returns {CAKeyframeAnimation} -
   */
  copy() {
    const anim = super.copy()

    anim.values = this.values ? this.values.slice() : null
    anim.path = this.path
    anim.keyTimes = this.keyTimes ? this.keyTimes.slice() : null
    anim.timingFunctions = this.timingFunctions ? this.timingFunctions.slice() : null
    anim.calculationMode = this.calculationMode
    anim.rotationMode = this.rotationMode
    anim.tensionValues = this.tensionValues ? this.tensionValues.slice() : null
    anim.continuityValues = this.continuityValues ? this.continuityValues.slice() : null
    anim.biasValues = this.biasValues ? this.biasValues.slice() : null

    return anim
  }

  _applyAnimation(obj, time) {
    const baseTime = this._basetimeFromTime(time)
    //console.log(`CAKeyframeAnimation._applyAnimation: ${obj.name} ${this.keyPath}, time: ${time}, baseTime: ${baseTime}`)
    //console.log(`speed: ${this.speed}, duration: ${this.duration}, repeatCount: ${this.repeatCount}: dt: ${time - this.beginTime}`)
    let t = baseTime

    let index = this._indexCache
    let key0 = 0
    let key1 = 0

    if(t > 1){
      throw new Error(`CAKeyframeAnimation._applyAnimation: t ${t} > 1`)
    }

    const len = this.keyTimes.length
    if(index >= len){
      index = len - 1
    }
    //console.log(`keyTimes.length: ${this.keyTimes.length}`)

    // search keyTime linearly
    if(this.keyTimes[index] < t){
      for(; index < len; index++){
        if(this.keyTimes[index] >= t)
          break
      }
      key0 = index - 1
      key1 = index
    }else{
      for(; index >= 0; index--){
        if(this.keyTimes[index] < t)
          break
      }
      key0 = index
      key1 = index + 1
    }
    if(key0 <= 0){
      key0 = 0
    }
    if(key1 >= len){
      key1 = len - 1
    }

    this._indexCache = key0

    const time0 = this.keyTimes[key0]
    const time1 = this.keyTimes[key1]
    const val0 = this.values[key0]
    const val1 = this.values[key1]

    let value = val0
    if(time0 !== time1){
      const dt = (t - time0) / (time1 - time0)
      const r = this.timingFunctions[key0]._getValueAtTime(t)

      switch(this.calculationMode){
        case Constants.kCAAnimationLinear:
          value = this._lerp(val0, val1, r)
          break
        case Constants.kCAAnimationDiscrete:
          // TODO: implement
          throw new Error('kCAAnimationDiscrete not implemented')
        case Constants.kCAAnimationPaced:
          // TODO: implement
          throw new Error('kCAAnimationPaced not implemented')
        case Constants.kCAAnimationCubic:
          // TODO: implement
          throw new Error('kCAAnimationCubic not implemented')
        case Constants.kCAAnimationCubicPaced:
          // TODO: impelement
          throw new Error('kCAAnimationCubicPaced not implemented')
        default:
          throw new Error(`unknown calculation mode: ${this.calculationMode}`)
      }

      //console.log(`t: ${t}, time0: ${time0}, time1: ${time1}, dt: ${dt}, r: ${r}, value: ${value}`)
    }else{
      //console.log(`t: ${t}, time0: ${time0}, time1: ${time1}, value: ${value}`)
    }

    this._applyValue(obj, value)
  }
}
