'use strict'

import NSObject from '../ObjectiveC/NSObject'

export default class SCNShadableHelper extends NSObject {
  static get _propTypes() {
    return {
      owner: ['SCNGeometry', '_owner'],
      shaderModifiers: ['NSDictionary', '_shaderModifiers']
    }
  }

  constructor() {
    super()

    this._owner = null
    this._shaderModifiers = null
  }
}
