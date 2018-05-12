'use strict'

import CACodingProxy from './CACodingProxy'

/**
 * 
 * @access public
 * @extends {CACodingProxy}
 * 
 */
export default class LKNSArrayCodingProxy extends CACodingProxy {
  static get _propTypes() {
    return {
      array: ['NSArray', '_array']
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._array = []
  }
}

