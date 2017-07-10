'use strict'

import SCNPhysicsField from './SCNPhysicsField'

/**
 *
 * @access public
 * @extends {SCNPhysicsField}
 *
 */
export default class SCNPhysicsNoiseField extends SCNPhysicsField {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    this._smoothness = 0.0
    this._animationSpeed = 1.0
  }
}
