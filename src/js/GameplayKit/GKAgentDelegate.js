'use strict'

import GKAgent from './GKAgent'


/**
 * Implement this protocol to synchronize the state of an agent with its visual representation in your game.
 * @interface
 * @see https://developer.apple.com/documentation/gameplaykit/gkagentdelegate
 */
export default class GKAgentDelegate {

  /**
   * constructor
   * @access public
   * @constructor
   */
  //constructor() {
  //}

  // Synchronizing with Agents

  /**
   * Tells the delegate that an agent is about to perform its next simulation step.
   * @access public
   * @param {GKAgent} agent - The agent object that will perform its next simulation step.
   * @returns {void}
   * @desc Implement this method when you want to update the agent simulation with data from an external source, such as node position and orientation information updated by the SceneKit or SpriteKit physics engine. Set the position and rotation properties of the agent (as a GKAgent2D or GKAgent3D object) so that the next simulation step will take your changes to those properties into account.
   * @see https://developer.apple.com/documentation/gameplaykit/gkagentdelegate/1501232-agentwillupdate
   */
  agentWillUpdate(agent) {
  }

  /**
   * Tells the delegate that an agent has just performed a simulation step.
   * @access public
   * @param {GKAgent} agent - The agent object that has just performed a simulation step.
   * @returns {void}
   * @desc Implement this method when you want to update a display based on the latest data from the agent simulation. Read the position and rotation properties of the agent (as a GKAgent2D or GKAgent3D object), then set the corresponding attributes of the object that provides the agent’s visual representation.
   * @see https://developer.apple.com/documentation/gameplaykit/gkagentdelegate/1501131-agentdidupdate
   */
  agentDidUpdate(agent) {
  }
}
