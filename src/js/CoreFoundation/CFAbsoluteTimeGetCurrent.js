'use strict'

const baseTime = Date.UTC(2001, 0, 1, 0, 0, 0, 0)

/**
 * Returns the current system absolute time.
 * @access public
 * @returns {number} - The current absolute time.
 * @desc Absolute time is measured in seconds relative to the absolute reference date of Jan 1 2001 00:00:00 GMT. A positive value represents a date after the reference date, a negative value represents a date before it. For example, the absolute time -32940326 is equivalent to December 16th, 1999 at 17:54:34. Repeated calls to this function do not guarantee monotonically increasing results. The system time may decrease due to synchronization with external time references or due to an explicit user change of the clock.
 * @see https://developer.apple.com/documentation/corefoundation/1543542-cfabsolutetimegetcurrent
 */
function CFAbsoluteTimeGetCurrent() {
  return (Date.now() - baseTime) * 0.001
}

export default CFAbsoluteTimeGetCurrent

