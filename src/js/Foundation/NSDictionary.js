'use strict'

import NSObject from '../ObjectiveC/NSObject'

/**
 * dummy class for NSKeyedArchiver/Unarchiver
 * @access public
 * @extends {NSObject}
 */
export default class NSDictionary extends NSObject {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {Object} -
   */
  static initWithCoder(coder) {
    const dict = {}
    if(typeof coder._refObj['NS.objects'] !== 'undefined'){
      const keys = coder._refObj['NS.keys']
      const objects = coder._refObj['NS.objects']
      if(!Array.isArray(keys)){
        throw new Error('NS.keys must be Array')
      }
      if(!Array.isArray(objects)){
        throw new Error('NS.objects must be Array')
      }
      if(keys.length !== objects.length){
        throw new Error('NS.keys.length !== NS.objects.length')
      }

      const keyCoder = coder.copy()
      keyCoder._refObj = keys

      const objCoder = coder.copy()
      objCoder._refObj = objects

      for(let i=0; i<keys.length; i++){
        const key = keyCoder.decodeObjectForKey(i)
        const obj = objCoder.decodeObjectForKey(i)
        dict[key] = obj
      }
    }else{
      for(let i=0; ; i++){
        const objKey = `NS.object.${i}`
        const keyKey = `NS.key.${i}`
        if(typeof coder._refObj[objKey] === 'undefined'){
          break
        }
        const key = coder.decodeObjectForKey(keyKey)
        const obj = coder.decodeObjectForKey(objKey)
        dict[key] = obj
      }
    }

    return dict
  }
}
