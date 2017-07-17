'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import CAMediaTimingFunction from '../QuartzCore/CAMediaTimingFunction'
//import SCNActionTimingMode from './SCNActionTimingMode'

/**
 * 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scntimingfunction
 */
export default class SCNTimingFunction extends NSObject {

  // Initializers

  /**
   * 
   * @access public
   * @param {CAMediaTimingFunction} caTimingFunction - 
   * @returns {SCNTimingFunction} -
   * @see https://developer.apple.com/documentation/scenekit/scntimingfunction/2866052-init
   */
  initCaMediaTimingFunction(caTimingFunction) {
  }

  /**
   * 
   * @access public
   * @constructor
   * @param {SCNActionTimingMode} timingMode - 
   * @see https://developer.apple.com/documentation/scenekit/scntimingfunction/2866061-init
   */
  constructor(timingMode) {
    super()
  }
}
