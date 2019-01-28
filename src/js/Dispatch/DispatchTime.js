'use strict'

/**
 * DispatchTime represents a point in time relative to the default clock with nanosecond precision. On Apple platforms, the default clock is based on the Mach absolute time unit.
 * @access public
 * @see https://developer.apple.com/documentation/dispatch/dispatchtime
 */
export default class DispatchTime {

  // Initializers

  /**
   * Creates a time relative to the system clock that ticks since boot.
   * @access public
   * @constructor
   * @param {UInt64} uptimeNanoseconds - The number of nanoseconds since boot, excluding any time the system spent asleep.
   * @desc On Apple platforms, this clock is the same as the value returned by mach_absolute_time when converted into nanoseconds.
   * @see https://developer.apple.com/documentation/dispatch/dispatchtime/2300057-init
   */
  constructor(uptimeNanoseconds) {

    // Instance Properties

    this._uptimeNanoseconds = uptimeNanoseconds
  }

  // Instance Properties

  /**
   * Returns the number of nanoseconds since boot, excluding any time the system spent asleep.
   * @type {UInt64}
   * @desc 
   * @see https://developer.apple.com/documentation/dispatch/dispatchtime/2300047-uptimenanoseconds
   */
  get uptimeNanoseconds() {
    throw new Error('uptimeNanoseconds: not implemented')
  }

  // Type Properties

  /**
   * Returns a time in the distant future.
   * @access public
   * @returns {DispatchTime} -
   * @desc You can pass this value to methods that schedule work to have the system wait indefinitely for a particular event to occur or condition to be met.
   * @see https://developer.apple.com/documentation/dispatch/dispatchtime/1780795-distantfuture
   */
  static get distantFuture() {
    return new DispatchTime(Infinity)
  }

  // Type Methods

  /**
   * Returns the current time.
   * @access public
   * @returns {DispatchTime} - 
   * @see https://developer.apple.com/documentation/dispatch/dispatchtime/1780853-now
   */
  static now() {
    return Date.now()
  }
}
