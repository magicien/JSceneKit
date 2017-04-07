'use strict'

import NSObject from '../ObjectiveC/NSObject'

/**
 * dummy class for NSKeyedArchiver/Unarchiver
 * @access public
 * @extends {NSObject}
 */
export default class NSArray extends NSObject {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {Object[]} -
   */
  static initWithCoder(coder) {
    const arr = []
    const objects = coder._refObj['NS.objects']
    if(!Array.isArray(objects)){
      throw new Error('NS.objects must be Array')
    }

    const objCoder = coder.copy()
    objCoder._refObj = objects

    for(let i=0; i<objects.length; i++){
      const obj = objCoder.decodeObjectForKey(i)
      arr.push(obj)
    }

    return arr
  }
}
