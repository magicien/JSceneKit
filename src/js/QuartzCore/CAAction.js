'use strict'



/**
 * An interface that allows objects to respond to actions triggered by a CALayer.
 * @interface
 * @see https://developer.apple.com/reference/quartzcore/caaction
 */
export default class CAAction {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Responding to an action

  /**
   * Required. Called to trigger the action specified by the identifier.
   * @access public
   * @param {string} event - 
   * @param {Object} anObject - The layer on which the action should occur.
   * @param {?Map<AnyHashable, Object>} dict - A dictionary containing parameters associated with this event. May be nil.
   * @returns {void}
   * @see https://developer.apple.com/reference/quartzcore/caaction/1410806-run
   */
  runForKeyObjectArguments(event, anObject, dict) {
  }
}
