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
    return coder.decodeBytesForKeyReturnedLength('NS.data', null)
  }
}
