'use strict'

import DispatchObject from './DispatchObject'
//import __OS_dispatch_queue_attr from './__OS_dispatch_queue_attr'
//import DispatchQoS from '.i/DispatchQoS'
//import DispatchWorkItem from './DispatchWorkItem'
//import DispatchGroup from './DispatchGroup'
//import DispatchWorkItemFlags from './DispatchWorkItemFlags'
//import DispatchTime from './DispatchTime'
//import DispatchWallTime from './DispatchWallTime'
//import DispatchSpecificKey from './DispatchSpecificKey'

const _AutoreleaseFrequency = {
  inherit: 0,
  never: 2,
  workItem: 1
}

/**
 * @deprecated
 */
const _GlobalQueuePriority = {
  background: 3,
  default: 1,
  high: 0,
  low: 2
}

let _main = null

/**
 * DispatchQueue manages the execution of work items. Each work item submitted to a queue is processed on a pool of threads managed by the system.
 * @access public
 * @extends {DispatchObject}
 * @see https://developer.apple.com/reference/dispatch/dispatchqueue
 */
export default class DispatchQueue extends DispatchObject {

  // Initializers

  /**
   * 
   * @access public
   * @param {string} label - 
   * @param {DispatchQoS} qos - 
   * @param {DispatchQueue.Attributes} attributes - 
   * @param {DispatchQueue.AutoreleaseFrequency} autoreleaseFrequency - 
   * @param {?DispatchQueue} target - 
   * @constructor
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2300059-init
   */
  constructor(label, qos, attributes, autoreleaseFrequency, target) {
    super()

    /**
     * @access private
     * @type {string}
     */
    this._label = label

    /**
     * @access private
     * @type {DispatchQoS}
     */
    this._qos = qos

    /**
     * @access private
     * @type {DispatchQueue.Attributes}
     */
    this._attributes = attributes

    /**
     * @access private
     * @type {DispatchQueue.AutoreleaseFrequency}
     */
    this._target = target
  }


  /**
   * Creates a new dispatch queue to which blocks can be submitted.
   * @access public
   * @param {?UnsafePointer<Int8>} label - A string label to attach to the queue to uniquely identify it in debugging tools such as Instruments, sample, stackshots, and crash reports.  Because applications, libraries, and frameworks can all create their own dispatch queues, a reverse-DNS naming style (com.example.myqueue) is recommended.  This parameter is optional and can be NULL.
   * @param {?__OS_dispatch_queue_attr} attr - In macOS 10.7 and later or iOS 4.3 and later, specify DISPATCH_QUEUE_SERIAL (or NULL) to create a serial queue or specify DISPATCH_QUEUE_CONCURRENT to create a concurrent queue. In earlier versions, you must specify NULL for this parameter.
   * @returns {void}
   * @desc Blocks submitted to a serial queue are executed one at a time in FIFO order. Note, however, that blocks submitted to independent queues may be executed concurrently with respect to each other. Blocks submitted to a concurrent queue are dequeued in FIFO order but may run concurrently if resources are available to do so.If your app isn’t using ARC, you should call dispatch_release on a dispatch queue when it’s no longer needed. Any pending blocks submitted to a queue hold a reference to that queue, so the queue is not deallocated until all pending blocks have completed.
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1453030-init
   */
  init__label(label, attr) {

    // Instance Properties

    this._label = ''
    this._qos = null
  }

  /**
   * 
   * @access public
   * @param {?UnsafePointer<Int8>} label - 
   * @param {?__OS_dispatch_queue_attr} attr - 
   * @param {?DispatchQueue} target - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1642205-init
   */
  init__labelQueue(label, attr, target) {

    // Instance Properties

    this._label = ''
    this._qos = null
  }

    // Instance Methods

  /**
   * 
   * @access public
   * @param {DispatchWorkItem} workItem - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1452870-sync
   */
  syncExecute(workItem) {
  }

  /**
   * 
   * @access public
   * @param {DispatchWorkItem} workItem - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2016103-async
   */
  asyncExecute(workItem) {
  }

  /**
   * 
   * @access public
   * @param {DispatchTime} deadline - 
   * @param {DispatchWorkItem} execute - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2300020-asyncafter
   */
  asyncAfter(deadline, execute) {
    const delay = deadline - (Date.now())
    window.setTimeout(() => { execute() }, delay)
  }

  /**
   * 
   * @access public
   * @param {DispatchTime} deadline - 
   * @param {DispatchQoS} qos - 
   * @param {DispatchWorkItemFlags} flags - 
   * @param {function(): void} work - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2300100-asyncafter
   */
  asyncAfterExecute(deadline, qos, flags, work) {
  }

  /**
   * 
   * @access public
   * @param {DispatchSpecificKey<T>} key - 
   * @returns {?T} - 
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1780751-getspecific
   */
  getSpecific(key) {
    return null
  }

  /**
   * 
   * @access public
   * @param {DispatchSpecificKey<T>} key - 
   * @param {T} value - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1780629-setspecific
   */
  setSpecific(key, value) {
  }

  /**
   * 
   * @access public
   * @param {DispatchWorkItemFlags} flags - 
   * @returns {void}
   * @throws {Error}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2016077-sync
   */
  sync(flags) {
  }

  // Instance Properties
  /**
   * 
   * @type {string}
   * @desc 
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1780825-label
   */
  get label() {
    return this._label
  }
  /**
   * 
   * @type {DispatchQoS}
   * @desc 
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1781008-qos
   */
  get qos() {
    return this._qos
  }

  // Type Properties
  /**
   * 
   * @type {DispatchQueue}
   * @desc 
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/1781006-main
   */
  static get main() {
    return _main
  }

  // Type Methods

  /**
   * 
   * @access public
   * @param {number} iterations - 
   * @param {function(arg1: number): void} work - 
   * @returns {void}
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2016088-concurrentperform
   */
  static concurrentPerformExecute(iterations, work) {
  }

  /**
   * 
   * @deprecated
   * @access public
   * @param {DispatchQueue.GlobalQueuePriority} priority - 
   * @returns {DispatchQueue} - 
   * @see https://developer.apple.com/reference/dispatch/dispatchqueue/2300070-global
   */
  static global(priority) {
    return null
  }
}

//_main = new DispatchQueue("com.apple.main-thread", new DispatchQoS(DispatchQoS.userInteractive, 0))
_main = new DispatchQueue("com.apple.main-thread", null)

