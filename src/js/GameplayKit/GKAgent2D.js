'use strict'

import CGPoint from '../CoreGraphics/CGPoint'
import GKAgent from './GKAgent'

/**
 * An agent that operates in a two-dimensional space. 
 * @access public
 * @extends {GKAgent}
 * @see https://developer.apple.com/documentation/gameplaykit/gkagent2d
 */
export default class GKAgent2D extends GKAgent {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Managing an Agent’s Position and Orientation

    /**
     * The current position of the agent in 2D space.
     * @type {CGPoint}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent2d/1501043-position
     */
    this.position = new CGPoint(0, 0)

    /**
     * The rotation of the agent around the z-axis.
     * @type {number}
     * @see https://developer.apple.com/documentation/gameplaykit/gkagent2d/1501045-rotation
     */
    this.rotation = 0


    // Running the Agent Simulation

    /**
     * @access private
     * @type {CGPoint}
     */
    this._velocity = new CGPoint()
  }

  // Running the Agent Simulation

  /**
   * Causes the agent to evaluate its goals and update its position, rotation, and velocity accordingly.
   * @access public
   * @param {number} seconds - 
   * @returns {void}
   * @desc You call this method directly on an individual agent, or on all the agents in your game through a GKComponentSystem object, whenever you want to run a step of the agent simulation. Typically, a game updates its agent simulation whenever it prepares to draw a new frame—for example, in the update(_:) method of a SpriteKit SKScene object.
   * @see https://developer.apple.com/documentation/gameplaykit/gkagent2d/1501242-update
   */
  updateDeltaTime(seconds) {
  }

  /**
   * The current velocity of the agent in 2D space.
   * @type {CGPoint}
   * @desc An agent’s velocity is a calculated property—the velocity vector is determined by an agent’s facing direction (its rotation property) and its speed property.
   * @see https://developer.apple.com/documentation/gameplaykit/gkagent2d/1501186-velocity
   */
  get velocity() {
    return this._velocity
  }
}
