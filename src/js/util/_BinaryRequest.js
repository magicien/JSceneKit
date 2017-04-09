'use strict'

import {AjaxRequest} from './_AjaxRequest'

/**
 * BinaryRequest class
 * @access public
 */
export class BinaryRequest extends AjaxRequest {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()
    this.defaultOptions.mimeType = 'text/plain; charset=x-user-defined'
  }
}

export default new BinaryRequest()

