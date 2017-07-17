'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import CAMediaTimingFunction from '../QuartzCore/CAMediaTimingFunction'
import CABasicAnimation from '../QuartzCore/CABasicAnimation'
//import SCNAnimationEvent from './SCNAnimationEvent'

const _transactions = []
let _immediateMode = true

class _Transaction {
  constructor() {
    /**
     * @type {Object}
     */
    this._animations = []

    /**
     * @type {number}
     */
    this._animationDuration = 0.0

    /**
     * @type {?CAMediaTimingFunction}
     */
    this._animationTimingFunction = null

    /**
     * @type {boolean}
     */
    this._disableActions = false

    /**
     * @type {?function}
     */
    this._completionBlock = null

    /**
     * @type {Map<string, Object>}
     */
    this._values = new Map()
  }
}

const _automaticTransaction = new _Transaction()

/**
 * The SCNTransaction class defines SceneKit’s mechanism for batching scene graph modifications into atomic updates. You use SCNTransaction class methods to control the animation that results from changing animatable properties in the scene graph and to combine sets of changes into nested transactions.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scntransaction
 */
export default class SCNTransaction extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()
    throw new Error('do not create an instance of SCNTransaction')
  }

  // Creating and Committing Transactions

  /**
   * Begins a new transaction for the current thread.
   * @access public
   * @returns {void}
   * @desc The new transaction is nested within the thread’s current transaction, if there is one.The first time you modify the scene graph during a pass through the run loop, SceneKit automatically creates a transaction and makes it the current transaction. (SceneKit commits that transaction when the next iteration of the run loops begins.) If you call this method to create a custom transaction before modifying the scene graph, your custom transaction becomes the current transaction.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1522820-begin
   */
  static begin() {
    const newTransaction = new _Transaction()
    newTransaction._disableActions = this._currentTransaction._disabledActions
    _transactions.push(newTransaction)
  }

  /**
   * Commits all changes made during the current transaction.
   * @access public
   * @returns {void}
   * @desc If there is no current transaction, this method has no effect.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523436-commit
   */
  static commit() {
    const transaction = _transactions.pop()
    if(transaction){
      this._apply(transaction)
    }
  }

  /**
   * Applies all changes from the current automatic transaction.
   * @access public
   * @returns {void}
   * @desc SceneKit automatically calls this method at the end of each pass through the run loop, regardless of the run loop mode. If your app does not have a run loop, you must call this method explicitly.If the current transaction has any nested transactions that are still animating, SceneKit waits to commit the current transaction’s changes until those transactions complete.NoteIf possible, avoid calling flush() explicitly. By allowing flush() to execute during the run loop, your app achieves better performance, atomic screen updates are preserved, and transactions and animations that work from transaction to transaction continue to function.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1522860-flush
   */
  static flush() {
    // TODO: wait nested transactions
    this._apply(_automaticTransaction)
  }

  static _apply(transaction) {
    if(transaction._disableActions || transaction._animationDuration === 0){
      transaction._animations.forEach((anim) => {
        anim.target.setValueForKeyPath(anim.newValue, anim.keyPath)
      })
      if(transaction._completionBlock){
        transaction._completionBlock()
      }
    }else{
      const promises = []
      transaction._animations.forEach((anim) => {
        const promise = new Promise((resolve, reject) => {
          const animation = new CABasicAnimation(anim.keyPath)
          animation.fromValue = anim.diff
          animation.timingFunction = transaction._animationTimingFunction
          animation.duration = transaction._animationDuration
          animation.isAdditive = true
          animation.isRemovedOnCompletion = true
          animation.delegate = {
            animationDidStop: (_anim, _finished) => {
              if(_finished){
                anim.target.setValueForKeyPath(anim.newValue, anim.keyPath)
                resolve(anim, animation)
              }
            }
          }
          anim.target.addAnimationForKey(animation, null)
        })
        promises.push(promise)
      })
      Promise.all(promises).then(() => {
        if(transaction._completionBlock){
          transaction._completionBlock()
        }
      })
    }
  }

  // Overriding Animation Duration and Timing

  /**
   * Returns the duration, in seconds, of all animations within the current transaction.
   * @type {number}
   * @desc The default duration is zero for transactions automatically created by SceneKit, and 0.25 for animations you create using the begin() method.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523888-animationduration
   */
  static get animationDuration() {
    return this._currentTransaction._animationDuration
  }
  
  /**
   * Returns the duration, in seconds, of all animations within the current transaction.
   * @type {number}
   * @param {number} newValue -
   * @desc The default duration is zero for transactions automatically created by SceneKit, and 0.25 for animations you create using the begin() method.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523888-animationduration
   */
  static set animationDuration(newValue) {
    this._currentTransaction._animationDuration = newValue
  }

  /**
   * Returns the timing function that SceneKit uses for all animations within this transaction group. 
   * @type {?CAMediaTimingFunction}
   * @desc Media timing functions, also known as animation curves, define the relationship between the elapsed time of an animation and its effect on a property. For example, the kCAMediaTimingFunctionEaseInEaseOut function creates an effect that begins slowly, speeds up, and then finishes slowly.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1522614-animationtimingfunction
   */
  static get animationTimingFunction() {
    return this._currentTransaction._animationTimingFunction
  }

  /**
   * Returns the timing function that SceneKit uses for all animations within this transaction group. 
   * @type {?CAMediaTimingFunction}
   * @param {?CAMediaTimingFunction} newValue -
   * @desc Media timing functions, also known as animation curves, define the relationship between the elapsed time of an animation and its effect on a property. For example, the kCAMediaTimingFunctionEaseInEaseOut function creates an effect that begins slowly, speeds up, and then finishes slowly.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1522614-animationtimingfunction
   */
  static set animationTimingFunction(newValue) {
    this._currentTransaction._animationTimingFunction = newValue
  }

  // Temporarily Disabling Property Animations

  /**
   * Returns a Boolean value indicating whether changes to animatable properties during the transaction are implicitly animated.
   * @type {boolean}
   * @desc By default (when this property is false), any changes to animatable properties of objects in the scene graph implicitly create animations. (These animations may not be visible unless you use the animationDuration property to set a nonzero duration for the transaction.) Set this property to true to disable implicit animation during the transaction.Disabling animation applies to all property changes in the current transaction and any nested transactions within it. However, you can use this property again within a nested transaction to enable implicit animation for that transaction.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1524238-disableactions
   */
  static get disableActions() {
    return this._currentTransaction._disableActions
  }

  /**
   * Returns a Boolean value indicating whether changes to animatable properties during the transaction are implicitly animated.
   * @type {boolean}
   * @param {boolean} newValue -
   * @desc By default (when this property is false), any changes to animatable properties of objects in the scene graph implicitly create animations. (These animations may not be visible unless you use the animationDuration property to set a nonzero duration for the transaction.) Set this property to true to disable implicit animation during the transaction.Disabling animation applies to all property changes in the current transaction and any nested transactions within it. However, you can use this property again within a nested transaction to enable implicit animation for that transaction.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1524238-disableactions
   */
  static set disableActions(newValue) {
    this._currentTransaction._disableActions = newValue
  }

  // Getting and Setting Completion Block Objects

  /**
   * Returns the block previously associated with the current transaction.
   * @type {?function(): void}
   * @desc See setCompletionBlock(_:) for a description of the role of the completion block object.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523660-completionblock
   */
  static get completionBlock() {
    return this._currentTransaction._completionBlock
  }

  /**
   * Returns the block previously associated with the current transaction.
   * @type {?function(): void}
   * @param {?function(): void} newValue -
   * @desc See setCompletionBlock(_:) for a description of the role of the completion block object.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523660-completionblock
   */
  static set completionBlock(newValue) {
    this._currentTransaction._completionBlock = newValue
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

   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523078-lock
   */
  static lock() {
    throw new Error('lock() is not implemented')
  }

  /**
   * Relinquishes a previously acquired transaction lock.
   * @access public
   * @returns {void}
   * @desc See the lock() method for more details on transaction locking.
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523166-unlock
   */
  static unlock() {
    throw new Error('unlock() is not implemented')
  }

  // Getting and Setting Transaction Properties

  /**
   * Associates an arbitrary object with the current transaction using the specified key.
   * @access public
   * @param {?Object} value - 
   * @param {string} key - A unique string identifying the object for later retrieval.
   * @returns {void}
   * @desc Nested transactions have nested data scope. Setting a value for a key associates it with the current transaction (or innermost nested transaction) only, and reading the value for a key searches through nested transactions (starting from the innermost).
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1524124-setvalue
   */
  static setValueForKey(value, key) {
    this._currentTransaction._values.set(key, value)
  }

  /**
   * Returns the object previously associated with the current transaction using the specified key.
   * @access public
   * @param {string} key - The unique string identifying an object previously associated with the transaction.
   * @returns {?Object} - 
   * @desc Nested transactions have nested data scope. Setting a value for a key associates it with the current transaction (or innermost nested transaction) only, but reading the value for a key searches through nested transactions (starting from the innermost).
   * @see https://developer.apple.com/documentation/scenekit/scntransaction/1523919-value
   */
  static valueForKey(key) {
    for(let i=_transactions.length-1; i>=0; i--){
      const value = _transactions[i]._values.get(key)
      if(typeof value !== 'undefined'){
        return value
      }
    }
    return _automaticTransaction._values.get(key)
  }

  /**
   * @access private
   * @returns {_Transaction} -
   */
  static get _currentTransaction() {
    if(_transactions.length > 0){
      return _transactions[_transactions.length - 1]
    }
    return _automaticTransaction
  }

  /**
   * @access private
   * @param {Object} target -
   * @param {string} keyPath -
   * @param {Object|number} oldValue -
   * @param {Object|number} newValue -
   * @returns {void}
   */
  static _addChange(target, keyPath, oldValue, newValue) {
    if(this.immediateMode){
      target.setValueForKeyPath(newValue, keyPath)
    }else{
      let diff = null
      if(typeof newValue === 'number'){
        diff = oldValue - newValue
      }else if(typeof newValue.sub !== 'undefined'){
        diff = oldValue.sub(newValue)
      }else{
        throw new Error(`keyPath ${keyPath} does not have sub function`)
      }
      this._currentTransaction._animations.push({
        target: target,
        keyPath: keyPath,
        diff: diff,
        oldValue: oldValue, 
        newValue: newValue
      })
    }
  }

  /**
   * @access public
   * @type {boolean}
   */
  static get immediateMode() {
    if(_transactions.length > 0){
      return false
    }
    return _immediateMode
  }

  /**
   * @access public
   * @type {boolean}
   * @param {boolean} newValue -
   */
  static set immediateMode(newValue) {
    _immediateMode = newValue
  }
}
