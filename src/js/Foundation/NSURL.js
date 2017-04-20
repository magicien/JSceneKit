'use strict'

import NSObject from '../ObjectiveC/NSObject'

/**
 * dummy class for NSURL
 * @access public
 * @extends {NSObject}
 */
export default class NSURL extends NSObject {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {string} -
   */
  static initWithCoder(coder) {
    const base = coder._refObj['NS.base'].obj
    const relative = coder._refObj['NS.relative'].obj
    let url = relative // Should I add the base url?

    if(url.indexOf(':') < 0){
      url = coder._directoryPath + url
    }
    console.error(`NSURL: ${url}`)

    return url
  }
}

