'use strict'

import SCNAction from './SCNAction'


/**
 * Methods for running actions on nodes.
 * @interface
 * @see https://developer.apple.com/documentation/scenekit/scnactionable
 */
export default class SCNActionable {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Inspecting a Node’s Running Actions

    this._hasActions = false
    this._actionKeys = null
  }

  // Running Actions

  /**
   * Required. Adds an action to the list of actions executed by the node.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @returns {void}
   * @desc SceneKit begins running a newly added action when it prepares to render the next frame.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1523164-runaction
   */
  runAction(action) {
  }

  /**
   * Required. Adds an action to the list of actions executed by the node. SceneKit calls the specified block when the action completes.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @param {?function(): void} [block = null] - A completion block that SceneKit calls when the action completes.
   * @returns {void}
   * @desc The new action is processed the next time SceneKit prepares to render a frame.SceneKit calls your block after the action’s duration is complete. For example, in a game you could use this method to show a Game Over message after performing a fade-out action on a node that displays a player character.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1524219-runaction
   */
  runActionCompletionHandler(action, block = null) {
  }

  /**
   * Required. Adds an identifiable action to the list of actions executed by the node.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @param {?string} key - A unique key used to identify the action.
   * @returns {void}
   * @desc This method is identical to runAction(_:), but the action is stored and identified so that you can retrieve or cancel it later. If an action using the same key is already running, SceneKit removes it before adding the new action.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1524222-runaction
   */
  runActionForKey(action, key) {
  }

  /**
   * Required. Adds an identifiable action to the list of actions executed by the node. SceneKit calls the specified block when the action completes.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @param {?string} key - A unique key used to identify the action.
   * @param {?function(): void} [block = null] - A completion block called when the action completes.
   * @returns {void}
   * @desc This method is identical to runAction(_:completionHandler:), but the action is stored and identified so that you can retrieve or cancel it later. If an action using the same key is already running, SceneKit removes it before adding the new action.SceneKit calls your block after the action’s duration is complete. For example, you can use this method with a wait action to execute some code after a timed delay. If during the delay period you need to prevent the code from running, use the removeAction(forKey:) method to cancel it.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1522791-runaction
   */
  runActionForKeyCompletionHandler(action, key, block = null) {
  }

  // Inspecting a Node’s Running Actions

  /**
   * Required. Returns an action associated with a specific key.
   * @access public
   * @param {string} key - A string that uniquely identifies a action.
   * @returns {?SCNAction} - 
   * @desc Use this method to retrieve actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1523287-action
   */
  actionForKey(key) {
    return null
  }
  /**
   * Required. A Boolean value that indicates whether the node is currently executing any actions.
   * @type {boolean}
   * @desc This value is true if the node has any executing actions; otherwise the value is false.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1523794-hasactions
   */
  get hasActions() {
    return this._hasActions
  }
  /**
   * Required. The list of keys for which the node has attached actions.
   * @type {string[]}
   * @desc Use this property to list actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1523036-actionkeys
   */
  get actionKeys() {
    return this._actionKeys
  }

  // Canceling a Node’s Running Actions

  /**
   * Required. Removes an action associated with a specific key.
   * @access public
   * @param {string} key - A string that uniquely identifies a action.
   * @returns {void}
   * @desc If the node is currently running an action that matches the key, SceneKit removes that action from the node, skipping any remaining animation it would perform but keeping any changes already made to the node.Use this method to cancel actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1523617-removeaction
   */
  removeActionForKey(key) {
  }

  /**
   * Required. Ends and removes all actions from the node.
   * @access public
   * @returns {void}
   * @desc When SceneKit removes an action from a node, it skips any remaining animation the action would perform. However, any changes the action has already made to the node’s state remain in effect.
   * @see https://developer.apple.com/documentation/scenekit/scnactionable/1524181-removeallactions
   */
  removeAllActions() {
  }
}
