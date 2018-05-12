'use strict'

import CACodingProxy from './CACodingProxy'
import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'

/**
 * 
 * @access public
 * @extends {CACodingProxy}
 * 
 */
export default class LKNSValueCodingProxy extends CACodingProxy {

  /**
   *
   */
  static initWithCoder(coder) {
    //console.log('LKNSValueCodingProxy: ' + JSON.stringify(Object.keys(coder._refObj), null, 2))
    const obj = coder._refObj
    const kind = obj.kind

    switch(kind) {
      case 0: { // CGPoint (x, y)
        return new CGPoint(obj.x, obj.y)
      }
      case 1: { // CGSize (width, height)
        return new CGSize(obj.width, obj.height)
      }
      case 2: { // CGRect (x, y, width, height)
        const point = new CGPoint(obj.x, obj.y)
        const size = new CGSize(obj.width, obj.height)
        return new CGRect(point, size)
      }
      case 3: { // CATransform3D (m11, m12, ..., m44)
        break
      }
      case 4: { // CAPoint3D (x, y, z)
        return new CGPoint(obj.x, obj.y)
      }
      case 5: { // CADoublePoint (x, y)
        return new CGPoint(obj.x, obj.y)
      }
      case 6: { // CADoubleSize (width, height)
        return new CGSize(obj.width, obj.height)
      }
      case 7: { // CADoubleRect (x, y, width, height)
        const point = new CGPoint(obj.x, obj.y)
        const size = new CGSize(obj.width, obj.height)
        return new CGRect(point, size)
      }
      case 8: { // CAColorMatrix (m11, ..., m15, m21, ..., m45)
        break
      }
    }
    throw new Error('LKNSValueCodingProxy unsupported type: ' + kind)
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()
  }
}

