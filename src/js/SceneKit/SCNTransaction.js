'use strict'

import NSObject from '../ObjectiveC/NSObject'
import CAMediaTimingFunction from '../QuartzCore/CAMediaTimingFunction'

let _animationDuration = 0
let _animationTimingFunction = null
let _disableActions = false
let _completionBlock = null

/**
 * The SCNTransaction class defines SceneKit’s mechanism for batching scene graph modifications into atomic updates. You use SCNTransaction class methods to control the animation that results from changing animatable properties in the scene graph and to combine sets of changes into nested transactions.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/reference/scenekit/scntransaction
 */
export default class SCNTransaction extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()
  }

  // Creating and Committing Transactions

  /**
   * Begins a new transaction for the current thread.
   * @access public
   * @returns {void}
   * @desc The new transaction is nested within the thread’s current transaction, if there is one.The first time you modify the scene graph during a pass through the run loop, SceneKit automatically creates a transaction and makes it the current transaction. (SceneKit commits that transaction when the next iteration of the run loops begins.) If you call this method to create a custom transaction before modifying the scene graph, your custom transaction becomes the current transaction.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1522820-begin
   */
  static begin() {
  }

  /**
   * Commits all changes made during the current transaction.
   * @access public
   * @returns {void}
   * @desc If there is no current transaction, this method has no effect.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523436-commit
   */
  static commit() {
  }

  /**
   * Applies all changes from the current automatic transaction.
   * @access public
   * @returns {void}
   * @desc SceneKit automatically calls this method at the end of each pass through the run loop, regardless of the run loop mode. If your app does not have a run loop, you must call this method explicitly.If the current transaction has any nested transactions that are still animating, SceneKit waits to commit the current transaction’s changes until those transactions complete.NoteIf possible, avoid calling flush() explicitly. By allowing flush() to execute during the run loop, your app achieves better performance, atomic screen updates are preserved, and transactions and animations that work from transaction to transaction continue to function.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1522860-flush
   */
  static flush() {
  }

  // Overriding Animation Duration and Timing

  /**
   * Returns the duration, in seconds, of all animations within the current transaction.
   * @type {number}
   * @desc The default duration is zero for transactions automatically created by SceneKit, and 0.25 for animations you create using the begin() method.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523888-animationduration
   */
  static get animationDuration() {
    return _animationDuration
  }
  
  /**
   * Returns the duration, in seconds, of all animations within the current transaction.
   * @type {number}
   * @desc The default duration is zero for transactions automatically created by SceneKit, and 0.25 for animations you create using the begin() method.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523888-animationduration
   */
  static set animationDuration(newValue) {
    _animationDuration = newValue
  }

  /**
   * Returns the timing function that SceneKit uses for all animations within this transaction group. 
   * @type {?CAMediaTimingFunction}
   * @desc Media timing functions, also known as animation curves, define the relationship between the elapsed time of an animation and its effect on a property. For example, the kCAMediaTimingFunctionEaseInEaseOut function creates an effect that begins slowly, speeds up, and then finishes slowly.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1522614-animationtimingfunction
   */
  static get animationTimingFunction() {
    return _animationTimingFunction
  }

  /**
   * Returns the timing function that SceneKit uses for all animations within this transaction group. 
   * @type {?CAMediaTimingFunction}
   * @desc Media timing functions, also known as animation curves, define the relationship between the elapsed time of an animation and its effect on a property. For example, the kCAMediaTimingFunctionEaseInEaseOut function creates an effect that begins slowly, speeds up, and then finishes slowly.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1522614-animationtimingfunction
   */
  static set animationTimingFunction(newValue) {
    _animationTimingFunction = newValue
  }

  // Temporarily Disabling Property Animations

  /**
   * Returns a Boolean value indicating whether changes to animatable properties during the transaction are implicitly animated.
   * @type {boolean}
   * @desc By default (when this property is false), any changes to animatable properties of objects in the scene graph implicitly create animations. (These animations may not be visible unless you use the animationDuration property to set a nonzero duration for the transaction.) Set this property to true to disable implicit animation during the transaction.Disabling animation applies to all property changes in the current transaction and any nested transactions within it. However, you can use this property again within a nested transaction to enable implicit animation for that transaction.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1524238-disableactions
   */
  static get disableActions() {
    return _disableActions
  }

  /**
   * Returns a Boolean value indicating whether changes to animatable properties during the transaction are implicitly animated.
   * @type {boolean}
   * @desc By default (when this property is false), any changes to animatable properties of objects in the scene graph implicitly create animations. (These animations may not be visible unless you use the animationDuration property to set a nonzero duration for the transaction.) Set this property to true to disable implicit animation during the transaction.Disabling animation applies to all property changes in the current transaction and any nested transactions within it. However, you can use this property again within a nested transaction to enable implicit animation for that transaction.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1524238-disableactions
   */
  static set disableActions(newValue) {
    _disableActions = newValue
  }

  // Getting and Setting Completion Block Objects

  /**
   * Returns the block previously associated with the current transaction.
   * @type {?function(): void}
   * @desc See setCompletionBlock(_:) for a description of the role of the completion block object.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523660-completionblock
   */
  static get completionBlock() {
    return _completionBlock
  }

  /**
   * Returns the block previously associated with the current transaction.
   * @type {?function(): void}
   * @desc See setCompletionBlock(_:) for a description of the role of the completion block object.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523660-completionblock
   */
  static set completionBlock(newValue) {
    _completionBlock = newValue
  }

  // Managing Concurrency

  /**
   * Attempts to acquire a recursive spinlock to ensure the validity of values you retrieve during the transaction.
   * @access public
   * @returns {void}
   * @desc SceneKit’s data model is thread-safe in that it ensures that internal data structures will not be corrupted by concurrent attempts to modify their contents from multiple threads. However, this model does not guarantee the validity of values you read from scene graph objects after returning them.For example, consider the following operation:_node.position = SCNVector3Make(_node.position.x, _node.position.y + 10, _node.position.z);
The intent of this line is to move a node by ten units. But if another thread modifies the node’s position property concurrently, the new position value could be unexpected. If your app modifies the scene graph from multiple threads, use a transaction lock to ensure that your modifications take effect as intended.[SCNTransaction lock];
_node.position = SCNVector3Make(_node.position.x, _node.position.y + 10, _node.position.z);
[SCNTransaction unlock];
If another thread currently holds a lock on the transaction, calling lock() has no effect._node.position = SCNVector3Make(_node.position.x, _node.position.y + 10, _node.position.z);
[SCNTransaction lock];
_node.position = SCNVector3Make(_node.position.x, _node.position.y + 10, _node.position.z);
[SCNTransaction unlock];

   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523078-lock
   */
  static lock() {
  }

  /**
   * Relinquishes a previously acquired transaction lock.
   * @access public
   * @returns {void}
   * @desc See the lock() method for more details on transaction locking.
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523166-unlock
   */
  static unlock() {
  }

  // Getting and Setting Transaction Properties

  /**
   * Associates an arbitrary object with the current transaction using the specified key.
   * @access public
   * @param {?Object} value - 
   * @param {string} key - A unique string identifying the object for later retrieval.
   * @returns {void}
   * @desc Nested transactions have nested data scope. Setting a value for a key associates it with the current transaction (or innermost nested transaction) only, and reading the value for a key searches through nested transactions (starting from the innermost).
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1524124-setvalue
   */
  static setValueForKey(value, key) {
  }

  /**
   * Returns the object previously associated with the current transaction using the specified key.
   * @access public
   * @param {string} key - The unique string identifying an object previously associated with the transaction.
   * @returns {?Object} - 
   * @desc Nested transactions have nested data scope. Setting a value for a key associates it with the current transaction (or innermost nested transaction) only, but reading the value for a key searches through nested transactions (starting from the innermost).
   * @see https://developer.apple.com/reference/scenekit/scntransaction/1523919-value
   */
  static valueForKey(key) {
    return null
  }
}
