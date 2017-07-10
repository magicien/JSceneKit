'use strict'

/**
 * DispatchTimeInterval represents a number of seconds, millisconds, microseconds, or nanoseconds. You use DispatchTimeInterval values to specify the interval at which a DispatchSourceTimer fires or I/O handlers are invoked for a DispatchIO channel, as well as to increment and decrement DispatchTime values.
 * @typedef {Object} DispatchTimeInterval
 * @property {function} seconds - A number of seconds.
 * @property {function} milliseconds - A number of milliseconds.
 * @property {function} microseconds - A number of microseconds.
 * @property {function} nanoseconds - A number of nanoseconds.
 * @see https://developer.apple.com/documentation/dispatch/dispatchtimeinterval
 */
const DispatchTimeInterval = {
  seconds: (value) => {
    return value * 1000.0
  },
  milliseconds: (value) => {
    return value
  },
  microseconds: (value) => {
    return value * 0.001
  },
  nanoseconds: (value) => {
    return value * 0.000001
  }
}

export default DispatchTimeInterval
