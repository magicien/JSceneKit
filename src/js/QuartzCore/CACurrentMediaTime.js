'use strict'

/**
 * Returns the current absolute time, in seconds.
 * @access public
 * @returns {number} - 
 * @see https://developer.apple.com/documentation/quartzcore/1395996-cacurrentmediatime
 */
const CACurrentMediaTime = function() {
  return Date.now() * 0.001
}

export default CACurrentMediaTime
