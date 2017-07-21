'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import GKAgent from './GKAgent'
//import GKObstacle from './GKObstacle'
//import GKPath from './GKPath'

// TODO: check values from NSKeyedArchiver output.
const _GKGoalType = {
  none: 0,
  seekAgent: 1,
  flee: 2,
  reach: 3,
  wander: 4,
  avoid: 5,
  intercept: 6,
  separate: 7,
  align: 8,
  cohere: 9,
  stayOn: 10,
  follow: 11
}

/**
 * An influence that motivates the movement of one or more agents.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gameplaykit/gkgoal
 */
export default class GKGoal extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    /**
     * @access private
     * @type {_GKGoalType}
     */
    this._type = 0

    /**
     * @access private
     * @type {GKPath}
     */
    this._path = null

    /**
     * @access private
     * @type {GKObstacle[]}
     */
    this._obstacles = []

    /**
     * @access private
     * @type {GKAgent[]}
     */
    this._agents = []

    /**
     * @access pricate
     * @type {number}
     */
    this._time = 0

    /**
     * @access pricate
     * @type {number}
     */
    this._angle = 0

    /**
     * @access pricate
     * @type {number}
     */
    this._distance = 0

    /**
     * @access pricate
     * @type {number}
     */
    this._speed = 0

    /**
     * @access pricate
     * @type {boolean}
     */
    this._forward = true
  }

  // Creating Goals for General Movement Behavior

  /**
   * Creates a goal whose effect is to move an agent toward the current position of the specified other agent.
   * @access public
   * @param {GKAgent} agent - An agent whose position affected agents will attempt to move toward.
   * @returns {void}
   * @desc This goal is similar to one produced by the init(toInterceptAgent:maxPredictionTime:) method with a maxPredictionTime parameter of zero. Affected agents will attempt to move toward the target agent, but without taking the target’s movement into account.You can also use this goal when you want an agent to move toward a target point, such as the current mouse or touch location. Create another agent that remains stationary at the target point (that is, has no velocity and no goals), and use that agent as the parameter when creating a goal with this method.
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501217-init
   */
  static goalToSeekAgent(agent) {
  }

  /**
   * Creates a goal whose effect is to move an agent away from the current position of the specified other agent.
   * @access public
   * @param {GKAgent} agent - An agent whose position affected agents will attempt to move away from.
   * @returns {void}
   * @desc This goal is similar to one produced by the init(toAvoid:maxPredictionTime:) method with a single agent and a maxPredictionTime parameter of zero. Affected agents will attempt to move away from the target agent, but without taking the target’s movement into account.You can also use this goal when you want an agent to move away from a target point, such as the current mouse or touch location. Create another agent that remains stationary at the target point (that is, has no velocity and no goals), and use that agent as the parameter when creating a goal with this method.
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501248-init
   */
  static goalToFleeAgent(agent) {
  }

  /**
   * Creates a goal whose effect is to accelerate or decelerate an agent until it reaches the specified speed.
   * @access public
   * @param {number} targetSpeed - The speed for affected agents to reach.
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501070-init
   */
  static goalToReachTargetSpeed(targetSpeed) {
  }

  /**
   * Creates a goal whose effect is to make an agent wander aimlessly, moving forward and turning at random.
   * @access public
   * @param {number} speed - The forward speed for affected agents to maintain while turning at random.
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501052-init
   */
  static goalToWander(speed) {
  }

  // Creating Goals for Avoidance and Interception Behavior

  /**
   * Creates a goal whose effect is to make an agent avoid colliding with the specified static obstacles.
   * @access public
   * @param {GKObstacle[]} obstacles - The static obstacles with which to avoid collisions.
   * @param {number} maxPredictionTime - The amount of time during which to predict collisions.
   * @returns {void}
   * @desc The maxPredictionTime parameter controls how far in the future a predicted collision must be in order for the agent to take action to avoid it. For example, if this parameter has a low value, an agents speeding toward an obstacle will not swerve or slow until a collision is imminent (and depending on the properties of that agent, it might not be able to move quickly enough to avoid colliding). If this parameter has a high value, the agent will change course leisurely, well before colliding.
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501098-init
   */
  static goalToAvoid(obstacles, maxPredictionTime) {
  }

  /**
   * Creates a goal whose effect is to make an agent pursue the specified other agent, taking into account the target’s movement.
   * @access public
   * @param {GKAgent} target - An agent whose position affected agents will attempt to move toward.
   * @param {number} maxPredictionTime - The amount of time for which to predict the target agent’s movement.
   * @returns {void}
   * @desc The maxPredictionTime parameter controls how far in the future the agent will plan to intercept its target. A larger value causes an affected agent to pursue its quarry more efficently, catching up with the target’s motion using fewer course corrections. A smaller value causes an affected agent to more closely follow the target’s current position despite the target’s current speed (and depending on the properties of the affected agent, it might not be able to move quickly enough to catch its target).
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501219-init
   */
  static goalToInterceptAgent(target, maxPredictionTime) {
  }

  // Creating Goals for Flocking Behavior

  /**
   * Creates a goal whose effect is to make an agent maintain the specified distance from other agents in a specified group.
   * @access public
   * @param {GKAgent[]} agents - The agents from whom to maintain distance.
   * @param {number} maxDistance - The maximum distance from other agents required for this goal to take effect.
   * @param {number} maxAngle - The maximum angle, in radians, between an affected agent’s velocity and the direction toward the other agents required for this goal to take effect.
   * @returns {void}
   * @desc The agents array can safely include the agent(s) affected by the goal—an agent pursuing this goal will ignore itself in the array. Therefore, you can use a single goal created with this method to cause an entire group of agents to mutually avoid one another.Changing the maxDistance parameter determines the minimum distance between agents in the group. Changing the maxAngle parameter determines how tightly an agent will turn to maintain separation from the group.You can combine separation, alignment, and cohesion goals to produce “flocking” behaviors in which a group of agents move together.
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501049-init
   */
  static goalToSeparateFrom(agents, maxDistance, maxAngle) {
  }

  /**
   * Creates a goal whose effect is to make an agent align its orientation with that of other agents in a specified group.
   * @access public
   * @param {GKAgent[]} agents - The agents with whom to maintain alignment.
   * @param {number} maxDistance - The maximum distance from other agents required for this goal to take effect.
   * @param {number} maxAngle - The maximum angle, in radians, between an affected agent’s velocity and the direction toward the other agents required for this goal to take effect.
   * @returns {void}
   * @desc The agents array can safely include the agent(s) affected by the goal—an agent pursuing this goal will ignore itself in the array. Therefore, you can use a single goal created with this method to cause an entire group of agents to mutually align with one another.Changing the maxDistance parameter determines the minimum distance between agents in the group. Changing the maxAngle parameter determines how tightly an agent will turn to maintain alignment with the group.You can combine separation, alignment, and cohesion goals to produce “flocking” behaviors in which a group of agents move together.
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501134-init
   */
  static goalToAlignWith(agents, maxDistance, maxAngle) {
  }

  /**
   * Creates a goal whose effect is to make an agent stay near the other agents in a specified group.
   * @access public
   * @param {GKAgent[]} agents - The agents with whom to stay close.
   * @param {number} maxDistance - The maximum distance from other agents required for this goal to take effect.
   * @param {number} maxAngle - The maximum angle, in radians, between an affected agent’s velocity and the direction toward the other agents required for this goal to take effect.
   * @returns {void}
   * @desc The agents array can safely include the agent(s) affected by the goal—an agent pursuing this goal will ignore itself in the array. Therefore, you can use a single goal created with this method to cause an entire group of agents to mutually stay near one another.Changing the maxDistance parameter determines how close to one another agents need to be in order for them to form a group. Changing the maxAngle parameter determines how tightly an agent will turn to maintain cohesion in the group.You can combine separation, alignment, and cohesion goals to produce “flocking” behaviors in which a group of agents move together.
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501170-init
   */
  static goalToCohereWith(agents, maxDistance, maxAngle) {
  }

  // Creating Goals for Path-Following Behavior

  /**
   * Creates a goal whose effect is to maintain an agent’s position within the specified path.
   * @access public
   * @param {GKPath} path - A path object.
   * @param {number} maxPredictionTime - The amount of time for which to predict an affected agent’s movement.
   * @returns {void}
   * @desc This goal uses the shape and the radius property of the specified path to define the boundaries of an area for the agent to stay in. If an affected agent is outside that area, the agent will move into that area; if the agent is already in that area, this goal will not motivate the agent to move further.The maxPredictionTime parameter determines how far ahead of time the agent will predict its own movement to fulfill this goal. For example, with a larger value, an agent moving toward the path will begin to slow gradually so as to stop gently within the path’s radius. With a smaller value, the agent will attempt to stop more abruptly as it reaches the path (and depending on its properties, it might not be able to stop quickly enough to avoid overshooting).
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501166-init
   */
  static goalToStayOn(path, maxPredictionTime) {
  }

  /**
   * Creates a goal whose effect is to both maintain position on and traverse the specified path.
   * @access public
   * @param {GKPath} path - A path object.
   * @param {number} maxPredictionTime - The amount of time for which to predict an affected agent’s movement.
   * @param {boolean} forward - true to traverse in the order the path’s verties are defined; false to traverse the path in the opposite order.
   * @returns {void}
   * @desc This goal uses the shape and the radius property of the specified path to define the agent’s desired movement. The agent first attempts to reach a location near the path’s start point (or end point if the forward parameter is false), to a tolerance determined by the path’s radius. Then, the agent attemps to move toward the next point in the path, again with a tolerance determined by the path’s radius. This sequence continues until the path terminates, or repeats indefinitely if the path’s isCyclical property is true.The maxPredictionTime parameter determines how far ahead of time the agent will predict its own movement to fulfill this goal. For example, with a larger value, an agent moving toward the path will begin to slow gradually so as to stop gently within the path’s radius. With a smaller value, the agent will attempt to stop more abruptly as it reaches the path (and depending on its properties, it might not be able to stop quickly enough to avoid overshooting).
   * @see https://developer.apple.com/documentation/gameplaykit/gkgoal/1501095-init
   */
  static goalToFollow(path, maxPredictionTime, forward) {
  }
}
