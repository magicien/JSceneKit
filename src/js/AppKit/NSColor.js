'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SKColor from '../SpriteKit/SKColor'

/**
 * dummy class for NSKeyedArchiver/Unarchiver
 * @access public
 * @extends {NSObject}
 */
export default class NSColor extends NSObject {
  /**
   * @access public
   * @param {NSCoder} coder -
   * @returns {_Buffer} -
   */
  static initWithCoder(coder) {
    return SKColor.initWithCoder(coder)
  }
} 

