'use strict'

import NSObject from '../ObjectiveC/NSObject'
import CAMediaTimingFunction from '../QuartzCore/CAMediaTimingFunction'
import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
//import SCNAudioSource from './SCNAudioSource'
//import SCNNode from './SCNNode'
import SCNActionTimingMode from './SCNActionTimingMode'
//import SCNActionTimingFunction from './SCNActionTimingFunction'
//import SCNActionRotate from './SCNActionRotate'
//import SCNActionSequence from './SCNActionSequence'
//import SCNActionRepeat from './SCNActionRepeat'
//import SCNActionGroup from './SCNActionGroup'
//import SCNActionFade from './SCNActionFade'
//import SCNActionPlaySound from './SCNActionPlaySound'
//import SCNActionJavaScript from './SCNActionJavaScript'
//import SCNActionRunBlock from './SCNActionRunBlock'
//import SCNActionReference from './SCNActionReference'
//import SCNActionCustom from './SCNActionCustom'
//import SCNActionWait from './SCNActionWait'
//import SCNActionRemove from './SCNActionRemove'
//import SCNActionPerformSelector from './SCNActionPerformSelector'
//import SCNActionScale from './SCNActionScale'
//import SCNActionMove from './SCNActionMove'
//import SCNActionHide from './SCNActionHide'
//import SCNActionRunAction from './SCNActionRunAction'
import SKColor from '../SpriteKit/SKColor'
import * as Constants from '../constants'

/**
 * A simple, reusable animation that changes attributes of any node you attach it to.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnaction
 */
export default class SCNAction extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Adjusting an Action’s Animation Properties

    /**
     * The duration required to complete an action.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaction/1524162-duration
     */
    this._duration = 0

    /**
     * A speed factor that modifies how fast an action runs.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnaction/1522811-speed
     */
    this._speed = 1.0

    /**
     * The timing mode used to execute an action.
     * @type {SCNActionTimingMode}
     * @see https://developer.apple.com/documentation/scenekit/scnaction/1524055-timingmode
     */
    this._timingMode = SCNActionTimingMode.linear

    /**
     * A block SceneKit calls to determine the action’s animation timing.
     * @type {?SCNActionTimingFunction}
     * @see https://developer.apple.com/documentation/scenekit/scnaction/1524130-timingfunction
     */
    this._timingFunction = null

    /**
     * @access private
     * @type {boolean}
     */
    this._finished = false

    this._beginTime = 0
    this._isRunning = false
    this._pausedTime = 0
    this._completionHandler = null

    this.__actionStartTime = null
  }

  // Creating Actions That Move a Node

  /**
   * Creates an action that moves a node relative to its current position.
   * @access public
   * @param {number} deltaX - The distance to move the node in the X direction of its parent node’s local coordinate space.
   * @param {number} deltaY - The distance to move the node in the Y direction of its parent node’s local coordinate space.
   * @param {number} deltaZ - The distance to move the node in the Z direction of its parent node’s local coordinate space.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s position property animates from its current position to its new position.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction moveByX: -deltaX y: -deltaY z: -deltaZ duration: duration];
[SCNAction moveByX: -deltaX y: -deltaY z: -deltaZ duration: duration];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523238-moveby
   */
  static moveByXYZ(deltaX, deltaY, deltaZ, duration) {
    //return SCNActionMove.moveByXYZ(deltaX, deltaY, deltaZ, duration)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that moves a node relative to its current position.
   * @access public
   * @param {SCNVector3} delta - A vector that describes the change to be applied to the node’s position.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s position property animates from its current position to its new position.This action is reversible; the reverse is created as if the following code had been executed:SCNVector3 reverseDelta = SCNVector3Make(-delta.x, -delta.y, -delta.z);
[SCNAction moveBy: reverseDelta duration: duration];
SCNVector3 reverseDelta = SCNVector3Make(-delta.x, -delta.y, -delta.z);
[SCNAction moveBy: reverseDelta duration: duration];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522605-move
   */
  static moveBy(delta, duration) {
    //return SCNActionMove.moveBy(delta, duration)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that moves a node to a new position.
   * @access public
   * @param {SCNVector3} location - The coordinates for the node’s new position in its parent node’s local coordinate space.
   * @param {number} duration - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s position property animates from its current position to its new position.This action is not reversible; the reverse of this action has the same duration but does not move the node.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522826-move
   */
  static moveTo(location, duration) {
    //return SCNActionMove.moveTo(location, duration)
    throw new Error('not implemented')
  }

  // Creating Actions That Rotate a Node

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
    //return SCNActionRotate.rotateByXYZ(xAngle, yAngle, zAngle, duration)
    throw new Error('not implemented')
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
    //return SCNActionRotate.rotateToXYZ(xAngle, yAngle, zAngle, duration)
    throw new Error('not implemented')
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
    //return SCNActionRotate.rotateToXYZUsesShortestUnitArc(xAngle, yAngle, zAngle, duration, shortestUnitArc)
    throw new Error('not implemented')
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
    //return SCNActionRotate.rotateByAround(angle, axis, duration)
    throw new Error('not implemented')
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
    //return SCNActionRotate.rotateToAxisAngle(axisAngle, duration)
    throw new Error('not implemented')
  }

  // Creating Actions That Change a Node’s Scale

  /**
   * Creates an action that uniformly changes the scale factor of a node by a relative value.
   * @access public
   * @param {number} scale - The amount of change to make to all three components of the node’s scale.
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s scale property animates to the new value.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction scaleBy: -scale duration: sec];
[SCNAction scaleBy: -scale duration: sec];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523129-scale
   */
  static scaleByDuration(scale, sec) {
    //return SCNActionScale.scaleByDuration(scale, sec)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that uniformly changes the scale factor of a node to an absolute value.
   * @access public
   * @param {number} scale - The new value for all three components of the node’s scale.
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s scale property animates to the new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523322-scale
   */
  static scaleToDuration(scale, sec) {
    //return SCNActionScale.scaleToDuration(scale, sec)
    throw new Error('not implemented')
  }

  // Creating Actions That Change a Node’s Opacity

  /**
   * Creates an action that changes the opacity of the node to 1.0.
   * @access public
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates from its current value to 1.0.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction fadeOutWithDuration: sec];
[SCNAction fadeOutWithDuration: sec];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522777-fadein
   */
  static fadeInDuration(sec) {
    //return SCNActionFade.fadeInDuration(sec)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that changes the opacity of the node to 0.0.
   * @access public
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates from its current value to 0.0.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction fadeInWithDuration: sec];
[SCNAction fadeInWithDuration: sec];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523922-fadeout
   */
  static fadeOutDuration(sec) {
    //return SCNActionFade.fadeOutDuration(sec)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that adjusts the opacity of a node by a relative value.
   * @access public
   * @param {number} factor - The amount to change the node’s opacity by.
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates to its new value.This action is reversible; the reverse is created as if the following code had been executed:[SCNAction fadeOpacityBy: -factor duration: sec];
[SCNAction fadeOpacityBy: -factor duration: sec];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523595-fadeopacity
   */
  static fadeOpacityByDuration(factor, sec) {
    //return SCNActionFade.fadeOpacityByDuration(factor, sec)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that adjusts the opacity of a node to a new value.
   * @access public
   * @param {number} opacity - The new opacity value of the node.
   * @param {number} sec - The duration, in seconds, of the animation.
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s opacity property animates to its new value.This action is not reversible; the reverse of this action has the same duration but does not change anything.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523875-fadeopacity
   */
  static fadeOpacityToDuration(opacity, sec) {
    //return SCNActionFade.fadeOpacityToDuration(opacity, sec)
    throw new Error('not implemented')
  }

  // Creating Actions That Change a Node’s Visibility

  /**
   * Creates an action that hides a node.
   * @access public
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s isHidden property is set to true.This action is reversible; the reverse is equivalent to the unhide() action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523487-hide
   */
  static hide() {
    //return SCNActionHide.hide()
    throw new Error('not implemented')
  }

  /**
   * Creates an action that ensures a node is not hidden.
   * @access public
   * @returns {SCNAction} - 
   * @desc When the action executes, the node’s isHidden property is set to false.This action is reversible; the reverse is equivalent to the hide() action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1524205-unhide
   */
  static unhide() {
    //return SCNActionHide.unhide()
    throw new Error('not implemented')
  }

  // Creating Actions That Remove Nodes from the Scene

  /**
   * Creates an action that removes the node from its parent.
   * @access public
   * @returns {SCNAction} - 
   * @desc When the action executes, the node is immediately removed from its parent.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522966-removefromparentnode
   */
  static removeFromParentNode() {
    //return SCNActionRemove.removeFromParentNode()
    throw new Error('not implemented')
  }

  // Creating Actions That Play Audio

  /**
   * Creates an action that plays an audio source.
   * @access public
   * @param {SCNAudioSource} source - The audio source to play.
   * @param {boolean} wait - If true, the duration of this action is the same as the length of the audio playback. If false, the action is considered to have completed immediately.
   * @returns {SCNAction} - 
   * @desc When the action executes, SceneKit plays the audio source on the target node—any positional audio effects are based on the node’s position. For more information about positional audio in SceneKit, see SCNAudioPlayer.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523651-playaudio
   */
  static playAudioWaitForCompletion(source, wait) {
    //return SCNActionPlaySound.playAudioWaitForCompletion(source, wait)
    throw new Error('not implemented')
  }

  // Creating Actions That Combine or Repeat Other Actions

  /**
   * Creates an action that runs a collection of actions in parallel.
   * @access public
   * @param {SCNAction[]} actions - An array of SCNAction objects.
   * @returns {SCNAction} - 
   * @desc When the action executes, the actions that make up the group all start immediately and run in parallel. The duration of the group action is the longest duration among the collection of actions. If an action in the group has a duration less than the group’s duration, the action completes and then idles until the group completes the remaining actions. This matters most when creating a repeating action that repeats a group.This action is reversible; it creates a new group action that contains the reverse of each action specified in the group. 
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522779-group
   */
  static group(actions) {
    //return SCNActionGroup.group(actions)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that runs a collection of actions sequentially.
   * @access public
   * @param {SCNAction[]} actions - An array of SCNAction objects.
   * @returns {SCNAction} - 
   * @desc When the action executes, the first action in the sequence starts and runs to completion. Subsequent actions in the sequence run in a similar fashion until all of the actions in the sequence have executed. The duration of the sequence action is the sum of the durations of the actions in the sequence.This action is reversible; it creates a new sequence action that reverses the order of the actions. Each action in the reversed sequence is itself reversed. For example, the actions reverseSequence and sequenceReverse in the code example below are equivalent:SCNAction *sequence = [SCNAction sequence:@[ actionA, actionB, actionC ]];
SCNAction *reverseSequence = [SCNAction sequence:@[ [actionC reversedAction],
                                                    [actionB reversedAction],
                                                    [actionA reversedAction] ]];
SCNAction *sequenceReverse = [sequence reversedAction];
SCNAction *sequence = [SCNAction sequence:@[ actionA, actionB, actionC ]];
SCNAction *reverseSequence = [SCNAction sequence:@[ [actionC reversedAction],
                                                    [actionB reversedAction],
                                                    [actionA reversedAction] ]];
SCNAction *sequenceReverse = [sequence reversedAction];

   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522793-sequence
   */
  static sequence(actions) {
    //return SCNActionSequence.sequence(actions)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that repeats another action a specified number of times.
   * @access public
   * @param {SCNAction} action - The action to be executed.
   * @param {number} count - The number of times to execute the action.
   * @returns {SCNAction} - 
   * @desc When the action executes, the associated action runs to completion and then repeats, until the count is reached.This action is reversible; it creates a new action that is the reverse of the specified action and then repeats it the same number of times.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522764-repeat
   */
  static repeat(action, count) {
    //return SCNActionRepeat.repeat(action, count)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that repeats another action forever.
   * @access public
   * @param {SCNAction} action - The action to execute.
   * @returns {SCNAction} - 
   * @desc When the action executes, the associated action runs to completion and then repeats.This action is reversible; it creates a new action that is the reverse of the specified action and then repeats it forever.NoteThe action to be repeated must have a non-instantaneous duration.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522908-repeatforever
   */
  static repeatForever(action) {
    //return SCNActionRepeat.repeatForever(action)
    throw new Error('not implemented')
  }

  // Creating Actions That Add Delays to Action Sequences

  /**
   * Creates an action that idles for a specified period of time.
   * @access public
   * @param {number} sec - The amount of time to wait.
   * @returns {SCNAction} - 
   * @desc When the action executes, the action waits for the specified amount of time and then ends. This is typically used as part of a sequence of actions to insert a delay between two other actions. You might also use it in conjunction with the runAction(_:completionHandler:) method to trigger code that needs to run at a later time.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523915-wait
   */
  static waitDuration(sec) {
    //return SCNActionWait.waitDuration(sec)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that idles for a randomized period of time.
   * @access public
   * @param {number} sec - The average amount of time to wait.
   * @param {number} durationRange - The range of possible values for the duration.
   * @returns {SCNAction} - 
   * @desc When the action executes, the action waits for the specified amount of time and then ends. This is typically used as part of a sequence of actions to insert a delay between two other actions. However, you might also use it in conjunction with the runAction(_:completionHandler:) method to trigger code that needs to run at a later time.Each time the action is executed, the action computes a new random value for the duration. The duration may vary in either direction by up to half of the value of the durationRange parameter.This action is not reversible; the reverse of this action is the same action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523086-wait
   */
  static waitDurationWithRange(sec, durationRange) {
    //return SCNActionWait.waitDurationWithRange(sec, durationRange)
    throw new Error('not implemented')
  }

  // Creating Custom Actions

  /**
   * Creates an action that executes a block.
   * @access public
   * @param {function(arg1: SCNNode): void} block - The block to run. The block takes a single parameter:nodeThe node on which the action is running.
   * @returns {SCNAction} - 
   * @desc When the action executes, SceneKit calls the block. This action takes place instantaneously.This action is not reversible; the reverse action executes the same block.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523637-run
   */
  static run(block) {
    //return SCNActionRunBlock.run(block)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that executes a block periodically over a specified duration.
   * @access public
   * @param {number} seconds - The duration of the action, in seconds.
   * @param {function(arg1: SCNNode, arg2: number): void} block - The block to run. The block takes the following parameters:nodeThe node on which the action is running.elapsedTimeThe amount of time that has passed since the action began executing.
   * @returns {SCNAction} - 
   * @desc When the action executes, SceneKit calls the block repeatedly until the action’s duration expires. For each call, SceneKit computes the elapsed time and passes it to the block.This action is not reversible; the reverse action executes the same block.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523692-customaction
   */
  static customActionDurationAction(seconds, block) {
    //return SCNActionCustom.customActionDurationAction(seconds, block)
    throw new Error('not implemented')
  }

  /**
   * Creates an action that executes a JavaScript script periodically over a specified duration.
   * @access public
   * @param {string} script - A string containing JavaScript source code.
   * @param {number} seconds - The duration of the action, in seconds.
   * @returns {SCNAction} - 
   * @desc SceneKit exposes its classes, methods, and functions in the JavaScript context that runs the script—see the SCNJavaScript.h header file for details.When the action executes, SceneKit runs the script repeatedly until the action’s duration expires. Each time SceneKit runs the script, it computes the elapsed time since the action began executing (as a fraction of the action’s duration between 0.0 and 1.0) and makes it available to the script as a variable named elapsedTime. The script can also reference the SCNNode object running the action as a variable named node.This action is not reversible; the reverse action executes the same script.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1523984-javascriptaction
   */
  static javaScriptActionWithScriptDuration(script, seconds) {
    //return SCNActionJavaScript.javaScriptActionWithScriptDuration(script, seconds)
    throw new Error('not implemented')
  }

  // Reversing an Action

  /**
   * Creates an action that reverses the behavior of another action.
   * @access public
   * @returns {SCNAction} - 
   * @desc This method always returns an action object; however, not all actions are reversible. When reversed, some actions return an object that either does nothing or performs the same action as the original action. For details on how an action is reversed, see the description of the class method used to create that action.
   * @see https://developer.apple.com/documentation/scenekit/scnaction/1522815-reversed
   */
  reversed() {
    return null
  }

  /**
   * @access public
   * @returns {SCNAction} -
   */
  copy() {
    const action = super.copy()

    action._beginTime = this._beginTime
    action._duration = this._duration
    action._speed = this.speed
    action._timingMode = this.timingMode
    action._timingFunction = this.timingFunction
    action._finished = this._finished
    //action._isRunning = this._isRunning
    //action._pausedTime = this._pausedTime
    //action._completionHandler = this._completionHandler

    return action
  }

  get _actionStartTime() {
    return this.__actionStartTime
  }
  set _actionStartTime(newValue) {
    this.__actionStartTime = newValue
  }

  get duration() {
    return this._duration
  }
  set duration(newValue) {
    this._duration = newValue
  }

  get speed() {
    return this._speed
  }
  set speed(newValue) {
    this._speed = newValue
  }

  get timingMode() {
    return this._timingMode
  }
  set timingMode(newValue) {
    this._timingMode = newValue
  }

  get timingFunction() {
    return this._timingFunction
  }
  set timingFunction(newValue) {
    this._timingFunction = newValue
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
    const t = this._getTime(time, needTimeConversion)
    //this._handleEvents(obj, t)
  }

  _getTime(time, needTimeConversion) {
    const t = this.__getTime(time, needTimeConversion)
    if(this._timingMode === SCNActionTimingMode.easeIn){
      return CAMediaTimingFunction.functionWithName(Constants.kCAMediaTimingFunctionEaseIn)._getValueAtTime(t)
    }else if(this._timingMode === SCNActionTimingMode.easeOut){
      return CAMediaTimingFunction.functionWithName(Constants.kCAMediaTimingFunctionEaseOut)._getValueAtTime(t)
    }else if(this._timingMode === SCNActionTimingMode.easeInEaseOut){
      return CAMediaTimingFunction.functionWithName(Constants.kCAMediaTimingFunctionEaseInEaseOut)._getValueAtTime(t)
    }
    return t
  }

  __getTime(time, needTimeConversion) {
    if(!needTimeConversion){
      if(time >= 1.0 && !this._finished){
        this._finished = true
      }
      return time
    }

    const baseTime = this._basetimeFromTime(time)
    if(this.timingFunction === null){
      return baseTime
    }

    return this.timingFunction._getValueAtTime(baseTime)
  }

  /**
   * convert parent time to base time
   * @access private
   * @param {number} time - parent time
   * @returns {number} - animation base time for the current frame (0-1 or null).
   */
  _basetimeFromTime(time) {
    const activeTime = time - this._actionStartTime
    return this._basetimeFromActivetime(activeTime)
  }

  /**
   * convert parent time to active time
   * @access private
   * @param {number} time - parent time
   * @returns {number} - animation active time for the current frame.
   */
  _activetimeFromTime(time) {
    return time - this._actionStartTime
  }

  /**
   * convert active time to base time
   * @access private
   * @param {number} time - active time
   * @returns {number} - animation base time for the current frame (0-1 or null).
   */
  _basetimeFromActivetime(time) {
    const dt = time - this._beginTime
    if(this.speed === 0){
      return 0
    }
    if(this._duration === 0){
      return dt / Math.abs(this.speed)
    }
    let duration = this._duration / Math.abs(this.speed)
    if(duration === 0){
      duration = 0.25
    }

    if(dt >= duration){
      // the action is over.
      if(!this._finished){
        this._finished = true
      }
    }

    return dt / duration
  }

  /**
   * @access private
   * @param {Object} from -
   * @param {Object} to -
   * @param {number} t -
   * @returns {Object} -
   */
  _lerp(from, to, t) {
    if(t === null){
      // the action is over.
      return to
    }
    if(from instanceof SCNVector4){
      // TODO: slerp for Quaternion
      return from.lerp(to, t)
    }else if(from instanceof SCNVector3){
      return from.lerp(to, t)
    }else if(from instanceof CGSize){
      return from.lerp(to, t)
    }else if(from instanceof CGPoint){
      return from.lerp(to, t)
    }else if(from instanceof CGRect){
      return from.lerp(to, t)
    }else if(from instanceof SKColor){
      return from._lerp(to, t)
    }
    return from + (to - from) * t
  }

  /**
   * @access private
   * @param {Object} from -
   * @param {Object} to -
   * @param {number} t -
   * @returns {Object} -
   */
  _slerp(from, to, t) {
    if(!(from instanceof SCNVector4)){
      throw new Error('SCNAction._slerp: object is not SCNVector4')
    }
    return from.slerp(to, t)
  }

  _resetFinished() {
    this._finished = false
  }
}
