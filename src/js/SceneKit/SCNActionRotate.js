'use strict'

import SCNAction from './SCNAction'
import SCNActionTimingMode from './SCNActionTimingMode'
import SCNNode from './SCNNode'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import _InstanceOf from '../util/_InstanceOf'

export default class SCNActionRotate extends SCNAction {
  static get _propTypes() {
    return {
      _rotX: 'float',
      _rotY: 'float',
      _rotZ: 'float',
      _lastRotX: 'float',
      _lastRotY: 'float',
      _lastRotZ: 'float',
      _axisRot: 'SCNVector4',
      _isRelative: 'boolean',
      _isReversed: 'boolean',
      _isUnitArc: 'boolean',
      _isAxisAngle: 'boolean',
      _isRunning: 'boolean',
      _finished: 'boolean',
      _duration: 'float',
      _pausedTime: 'float',
      _timingMode: 'integer',
      _beginTime: 'float',

      name: ['string', null]
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._rotX = 0
    this._rotY = 0
    this._rotZ = 0
    this._lastRotX = 0
    this._lastRotY = 0
    this._lastRotZ = 0
    this._axisRot = new SCNVector4()
    this._isRelative = false
    this._isReversed = false
    this._isUnitArc = false
    this._isAxisAngle = false
    this._isRunning = false
    this._finished = false
    this._duration = 0
    this._pausedTime = 0
    this._timingMode = SCNActionTimingMode.linear
    this._beginTime = 0
  }

  /**
   * Creates an action that rotates the node in each of the three principal axes by angles relative to its current orientation.
   * @access public
   * @param {number} xAngle - The amount to rotate the node counterclockwise around the x-axis of its local coordinate space, in radians.
   * @param {number} yAngle - The amount to rotate the node counterclockwise around the y-axis of its local coordinate space, in radians.
   * @param {number} zAngle - The amount to rotate the node counterclockwise around the z-axis of its local coordinate space, in radians.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s rotation property animates to the new angle.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction rotateByX: -xAngle y: -yAngle z: -zAngle duration: duration];
[SCNAction rotateByX: -xAngle y: -yAngle z: -zAngle duration: duration];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523522-rotateby
   */
  static rotateByXYZ(xAngle, yAngle, zAngle, duration) {
    const action = new SCNActionRotate()
    // TODO: Do research the reason why I need to turn around X and Y axes.
    action._rotX = -xAngle
    action._rotY = -yAngle
    action._rotZ = zAngle
    action._duration = duration
    action._isRelative = true
    return action
  }

  /**
   * Creates an action that rotates the node to absolute angles in each of the three principal axes.
   * @access public
   * @param {number} xAngle - The amount to rotate the node counterclockwise around the x-axis of its local coordinate space, in radians.
   * @param {number} yAngle - The amount to rotate the node counterclockwise around the y-axis of its local coordinate space, in radians.
   * @param {number} zAngle - The amount to rotate the node counterclockwise around the z-axis of its local coordinate space, in radians.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s rotation property animates to the new angle. Calling this method is equivalent to calling rotateTo(x:y:z:duration:usesShortestUnitArc:) and passing false for the shortestUnitArc parameter.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1524044-rotateto
   */
  static rotateToXYZ(xAngle, yAngle, zAngle, duration) {
    const action = new SCNActionRotate()
    action._rotX = xAngle
    action._rotY = yAngle
    action._rotZ = zAngle
    action._duration = duration
    return action
  }

  /**
   * Creates an action that rotates the node to absolute angles in each of the three principal axes.
   * @access public
   * @param {number} xAngle - The amount to rotate the node counterclockwise around the x-axis of its local coordinate space, in radians.
   * @param {number} yAngle - The amount to rotate the node counterclockwise around the y-axis of its local coordinate space, in radians.
   * @param {number} zAngle - The amount to rotate the node counterclockwise around the z-axis of its local coordinate space, in radians.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @param {boolean} shortestUnitArc - If false (the default), the animation interpolates each component of the node’s rotation between its current value and the new value. If true, the animation makes the most direct rotation possible from the node’s current orientation to the new orientation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s rotation property animates to the new angle.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522808-rotateto
   */
  static rotateToXYZUsesShortestUnitArc(xAngle, yAngle, zAngle, duration, shortestUnitArc) {
    const action = new SCNActionRotate()
    action._rotX = xAngle
    action._rotY = yAngle
    action._rotZ = zAngle
    action._duration = duration
    action._isUnitArc = shortestUnitArc
    return action
  }

  /**
   * Creates an action that rotates the node by an angle around a specified axis.
   * @access public
   * @param {number} angle - The amount to rotate the node counterclockwise around the specified axis, in radians.
   * @param {SCNVector3} axis - A vector in the node’s local coordinate space whose direction specifies the axis of rotation.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s rotation property animates to the new angle.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction rotateByAngle: -angle aroundAxis: axis duration: sec];
[SCNAction rotateByAngle: -angle aroundAxis: axis duration: sec];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523805-rotate
   */
  static rotateByAround(angle, axis, duration) {
    const action = new SCNActionRotate()
    action._axisRot.w = angle
    action._axisRot.x = axis.x
    action._axisRot.y = axis.y
    action._axisRot.z = axis.z
    action._duration = duration
    action._isRelative = true
    action._isAxisAngle = true
    return action
  }

  /**
   * Creates an action that rotates the node to an absolute angle around a specified axis.
   * @access public
   * @param {SCNVector4} axisAngle - A four-component vector whose first three components are a vector in the node’s local coordinate space specifying an axis and whose fourth component is the amount to rotate the node counterclockwise around that axis, in radians.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s rotation property animates to the new angle.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1524191-rotate
   */
  static rotateToAxisAngle(axisAngle, duration) {
    const action = new SCNActionRotate()
    action._axisRot = axisAngle
    action._duration = duration
    action._isAxisAngle = true
    return action
  }

  /**
   * @access public
   * @returns {SCNActionRotate} -
   */
  copy() {
    const action = super.copy()

    action._rotX = this._rotX
    action._rotY = this._rotY
    action._rotZ = this._rotZ
    action._lastRotX = this._lastRotX
    action._lastRotY = this._lastRotY
    action._lastRotZ = this._lastRotZ
    action._axisRot = this._axisRot
    action._isRelative = this._isRelative
    action._isReveresed = this._isReversed
    action._isUnitArc = this._isUnitArc
    action._isAxisAngle = this._isAxisAngle
    action._isRunning = this._isRunning
    action._finished = this._finished
    action._duration = this._duration
    action._pausedTime = this._pausedTime
    action._timingMode = this._timingMode

    return action
  }

  /**
   * apply action to the given node.
   * @access private
   * @param {Object} obj - target object to apply this action.
   * @param {number} time - active time
   * @param {boolean} [needTimeConversion = true] -
   * @returns {void}
   */
  _applyAction(obj, time, needTimeConversion = true) {
    if(!_InstanceOf(obj, SCNNode)){
      throw new Error(`unsupported class for SCNActionRotate: ${obj.constructor.name}`)
    }
    const t = this._getTime(time, needTimeConversion)
    //console.warn(`SCNActionRotate._applyAction t: ${t}`)

    if(this._isAxisAngle){
      // rotation
      const baseValue = obj.rotation
      let toValue = this._axisRot
      if(this._isRelative){
        const baseQuat = baseValue.rotationToQuat
        const byQuat = this._axisRot.rotationToQuat
        toValue = baseQuat.cross(byQuat).quatToRotation
      }
      if(this._isUnitArc){
        const value = this._slerp(baseValue.rotationToQuat(), toValue.rotationToQuat(), t)
        obj.presentation.orientation = value
      }else{
        const value = this._lerp(baseValue, toValue, t)
        obj.presentation.rotation = value
      }
      if(this._finished){
        obj.rotation = toValue
      }
    }else{
      // eulerAngles
      let toValue = new SCNVector3(this._rotX, this._rotY, this._rotZ)
      let value = null
      if(this._isRelative){
        const baseValue = obj.orientation
        value = baseValue.cross(toValue.mul(t).eulerAnglesToQuat())
        obj.presentation.orientation = value
      }else if(this._isUnitArc){
        const baseValue = obj.orientation
        value = this._slerp(baseValue, toValue.eulerAnglesToQuat(), t)
        obj.presentation.orientation = value
      }else{
        const baseValue = obj.eulerAngles
        value = this._lerp(baseValue, toValue, t)
        obj.presentation.eulerAngles = value
      }

      //obj.presentation.eulerAngles = value
      if(this._finished){
        if(this._isRelative){
          toValue = obj.orientation.cross(toValue.eulerAnglesToQuat())
          obj.orientation = toValue
        }else{
          obj.eulerAngles = toValue
        }
      }
    }
  }
}

SCNAction.rotateByXYZ = SCNActionRotate.rotateByXYZ
SCNAction.rotateToXYZ = SCNActionRotate.rotateToXYZ
SCNAction.rotateToXYZUsesShortestUnitArc = SCNActionRotate.rotateToXYZUsesShortestUnitArc
SCNAction.rotateByAround = SCNActionRotate.rotateByAround
SCNAction.rotateToAxisAngle = SCNActionRotate.rotateToAxisAngle

