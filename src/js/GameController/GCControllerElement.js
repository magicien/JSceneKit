'use strict'

import NSObject from '../ObjectiveC/NSObject'

/**
 * An input associated with a physical control, such as a button or thumbstick.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerelement
 */
export default class GCControllerElement extends NSObject {

  /**
   * constructor
   * @access public
   */
  constructor() {
    super()

    // Inspecting Element Properties

    this._isAnalog = false
    this._collection = null
  }

  // Inspecting Element Properties

  /**
   * Returns a Boolean value that indicates whether the element provides analog data.
   * @type {boolean}
   * @desc If the value is true, then the value properties defined by the element subclass can return a range (from minimum to maximum) of possible values. For example, this element might be a pressure-sensitive button or an axis of a thumb stick that allows for a range of physical movement. If the value is false, then the element’s value properties only provides discrete values, typically 0 if the element is off, and 1 if the element is on. 
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerelement/1522581-isanalog
   */
  get isAnalog() {
    return this._isAnalog
  }

  /**
   * Returns the element that this element is part of.
   * @type {?GCControllerElement}
   * @desc If the element is part of another element, this property holds the parent element. Otherwise, it holds nil.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontrollerelement/1522575-collection
   */
  get collection() {
    return this._collection
  }
}
