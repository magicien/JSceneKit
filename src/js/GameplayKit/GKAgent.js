'use strict'

import GKComponent from './GKComponent'
import GKBehavior from './GKBehavior'
import GKAgentDelegate from './GKAgentDelegate'


/**
 * A component that moves a game entity according to a set of goals and realistic constraints.
 * @access public
 * @extends {GKComponent}
 * @see https://developer.apple.com/documentation/gameplaykit/gkagent
 */
export default class GKAgent extends GKComponent {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Defining an Agent’s Behavior

    /**
     * A weighted collection of goals that influence the agent’s movement.
     * @type {?GKBehavior}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501272-behavior
     */
    this.behavior = null


    // Constraining an Agent’s Movement

    /**
     * The resistance of the agent to changes in speed or direction.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501080-mass
     */
    this.mass = 0

    /**
     * The upper limit to changes in the agent’s speed or direction.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501224-maxacceleration
     */
    this.maxAcceleration = 0

    /**
     * The agent’s maximum forward speed, in units per second.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501323-maxspeed
     */
    this.maxSpeed = 0

    /**
     * The agent’s radius.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501066-radius
     */
    this.radius = 0


    // Synchronizing an Agent’s Visual Representation

    /**
     * An object that prepares for or responds to updates in the agent simulation.
     * @type {?GKAgentDelegate}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501215-delegate
     */
    this.delegate = null


    // Managing an Agent’s Attributes

    /**
     * The agent’s current forward speed, in units per second.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent/1501038-speed
     */
    this.speed = 0
  }

  // GKAgentDelegate

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
