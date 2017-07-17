'use strict'

import SCNPhysicsNoiseField from './SCNPhysicsNoiseField'

/**
 *
 * @access public
 * @extends {SCNPhysicsField}
 *
 */
export default class SCNPhysicsTurbulenceField extends SCNPhysicsNoiseField {
  static get _propTypes() {
    return {
      halfExtent: 'SCNVector3',
      scope: 'integer', // SCNPhysicsFieldScope
      usesEllipsoidalExtent: 'boolean',
      offset: 'SCNVector3',
      // direction: 'SCNVector3',
      strength: 'float',
      falloffExponent: 'float',
      minimumDistance: 'float',
      active: ['boolean', 'isActive'],
      exclusive: ['boolean', 'isExclusive'],
      // categoryBitMask: 'integer',
      smoothness: ['float', '_smoothness'],
      animationSpeed: ['float', '_animationSpeed']
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  //constructor() {
  //  super()
  //}
}
