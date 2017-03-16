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

  }
}
