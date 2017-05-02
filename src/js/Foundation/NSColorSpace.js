'use strict'

import NSObject from '../ObjectiveC/NSObject'

/**
 * dummy class for NSColorSpace
 * @access public
 * @extends {NSObject}
 */
export default class NSColorSpace extends NSObject {
  static get _propTypes() {
    return {
      NSICC: ['NSMutableData', '_icc'],
      NSSpaceID: ['integer', '_spaceID'],
      NSID: ['integer', '_id']
    }
  }

  constructor() {
    super()
    this._icc = null
    this._spaceID = null
    this._id = null
  }
}
