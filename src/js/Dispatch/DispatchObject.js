'use strict'

/**
 * DispatchObject is the base class for many dispatch types, including DispatchQueue, DispatchGroup, and DispatchSource. 
 * @access public
 * @see https://developer.apple.com/documentation/dispatch/dispatchobject
 */
export default class DispatchObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    // nothing to do
  }

  // Instance Methods

  /**
   * Activates the dispatch object.
   * @access public
   * @returns {void}
   * @desc Once a dispatch object has been activated, it cannot change its target queue.
   * @see https://developer.apple.com/documentation/dispatch/dispatchobject/1641002-activate
   */
  activate() {
  }

  /**
   * Resume the invocation of block objects on a dispatch object.
   * @access public
   * @returns {void}
   * @desc Calling this function decrements the suspension count of a suspended dispatch queue or dispatch event source object. While the count is greater than zero, the object remains suspended. When the suspension count returns to zero, any blocks submitted to the dispatch queue or any events observed by the dispatch source while suspended are delivered.With one exception, each call to resume() must balance a call to suspend(). New dispatch event source objects returned by dispatch_source_create(_:_:_:_:) have a suspension count of 1 and must be resumed before any events are delivered. This approach allows your application to fully configure the dispatch event source object prior to delivery of the first event. In all other cases, it is undefined to call resume() more times than suspend(), which would result in a negative suspension count.
   * @see https://developer.apple.com/documentation/dispatch/dispatchobject/1452929-resume
   */
  resume() {
  }

  /**
   * Sets the target queue for the given object.
   * @access public
   * @param {?DispatchQueue} queue - The new target queue for the object. The queue is retained, and the previous one, if any, is released. This parameter cannot be NULL.
   * @returns {void}
   * @desc An object's target queue is responsible for processing the object. The target queue determines the queue on which the object's finalizer is invoked. In addition, modifying the target queue of some objects changes their behavior:Dispatch queues:A dispatch queue's priority is inherited from its target queue. Use the dispatch_get_global_queue(_:_:) function to obtain a suitable target queue of the desired priority.If you submit a block to a serial queue, and the serial queue’s target queue is a different serial queue, that block is not invoked concurrently with blocks submitted to the target queue or to any other queue with that same target queue.ImportantIf you modify the target queue for a queue, you must be careful to avoid creating cycles in the queue hierarchy.Dispatch sources:A dispatch source's target queue specifies where its event handler and cancellation handler blocks are submitted.Dispatch I/O channels:A dispatch I/O channel's target queue specifies where its I/O operations are executed. This may affect the priority of the resulting I/O operations. For example, if the channel's target queue's priority is set to DISPATCH_QUEUE_PRIORITY_BACKGROUND, then any I/O operations performed by read(offset:length:queue:ioHandler:) or write(offset:data:queue:ioHandler:) on that queue are throttled when there is I/O contention.
   * @see https://developer.apple.com/documentation/dispatch/dispatchobject/1452989-settarget
   */
  setTarget(queue) {
  }

  /**
   * Suspends the invocation of block objects on a dispatch object.
   * @access public
   * @returns {void}
   * @desc By suspending a dispatch object, your application can temporarily prevent the execution of any blocks associated with that object. The suspension occurs after completion of any blocks running at the time of the call. Calling this function increments the suspension count of the object, and calling resume() decrements it. While the count is greater than zero, the object remains suspended, so you must balance each suspend() call with a matching resume() call.Any blocks submitted to a dispatch queue or events observed by a dispatch source are delivered once the object is resumed. 
   * @see https://developer.apple.com/documentation/dispatch/dispatchobject/1452801-suspend
   */
  suspend() {
  }
}
