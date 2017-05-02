'use strict'

import NSObject from '../ObjectiveC/NSObject'

/**
 * dummy class for NSKeyedArchiver/Unarchiver
 * @access public
 * @extends {NSObject}
 */
export default class NSData extends NSObject {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {_Buffer} -
   */
  static initWithCoder(coder) {
    const data = coder.decodeBytesForKeyReturnedLength('NS.data', null)
    if(typeof data !== 'undefined'){
      return data
    }
    const bytes = coder.decodeBytesForKeyReturnedLength('NS.bytes', null)
    if(typeof bytes !== 'undefined'){
      return bytes
    }
    return null
  }
}
