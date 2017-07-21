'use strict'

import NSObject from '../ObjectiveC/NSObject'
import GKGoal from './GKGoal'

/**
 * A set of goals that together influence the movement of an agent.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior
 */
export default class GKBehavior extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Managing a Behavior’s Set of Goals

    /**
     * @access private
     * @type {GKGoal[]}
     */
    this._goals = []

    /**
     * @access private
     * @type {number[]}
     */
    this._weights = []
  }

  // Creating a Behavior

  /**
   * Creates a behavior with a single goal.
   * @access public
   * @param {GKGoal} goal - A goal object.
   * @param {number} weight - A weight to be applied to the goal’s influence on an agent’s speed and direction.
   * @returns {GKBehavior}
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388733-init
   */
  static behaviorWithGoalWeight(goal, weight) {
    const behavior = new GKBehavior()
    behavior._goals.push(goal)
    behavior._weights.push(weight)
    return behavior
  }

  /**
   * Creates a behavior with the specified goals and weights.
   * @access public
   * @param {GKGoal[]} goals - An array of goal objects.
   * @param {number[]} weights - An array of numbers, each the weight to be applied to the goal at the corresponding index in the goals array.
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388727-init
   */
  behaviorWithGoalsAndWeights(goals, weights) {
    const behavior = new GKBehavior()
    behavior._goals.push(...goals)
    behavior._weights.push(...weights)
    return behavior
  }

  // Managing a Behavior’s Set of Goals

  /**
   * Sets the weight for the specified goal’s influence on agents, adding that goal to the behavior if not already present.
   * @access public
   * @param {number} weight - A weight to be applied to the goal’s influence on an agent’s speed and direction.
   * @param {GKGoal} goal - A goal object.
   * @returns {void}
   * @desc When an agent evaluates its behavior, it examines each goal and calculates the change in direction and speed necessary to move toward fulfilling that goal (within the limits of the current time step and the agent’s maximum speed and turn rate). The agent then combines these influences to determine the total change in direction and speed for the current time step. To modulate the effects of multiple goals in a behavior, use this method to increase or decrease the relative influence of each.You can use this method to vary the behaviors in your game in response to player actions or other events. For example, an enemy agent’s behavior may combine pursuing the player (init(toInterceptAgent:maxPredictionTime:)) with a bit of wandering (init(toWander:)) to make its movement appear natural. When the enemy has not yet sighted the player, you might reduce the weight of the pursue goal to zero; when the player attacks the enemy, you might increase the weight of the wander goal for a short time to make the enemy act dazed.
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388731-setweight
   */
  setWeightFor(weight, goal) {
    const index = this._goals.indexOf(goal)
    if(index >= 0){
      this._weights[index] = weight
    }
  }

  /**
   * Returns the weight for the specified goal’s influence on agents.
   * @access public
   * @param {GKGoal} goal - A goal already included in the behavior’s set of goals.
   * @returns {number} - 
   * @desc When an agent evaluates its behavior, it examines each goal and calculates the change in direction and speed necessary to move toward fulfilling that goal (within the limits of the current time step and the agent’s maximum speed and turn rate). The agent then combines these influences to determine the total change in direction and speed for the current time step. Weights modulate the effects of multiple goals in a behavior.
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388729-weight
   */
  weightFor(goal) {
    const index = this._goals.indexOf(goal)
    if(index >= 0){
      return this._weights[index]
    }
    return 0
  }

  /**
   * Removes the specified goal from the behavior.
   * @access public
   * @param {GKGoal} goal - A goal object.
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388714-remove
   */
  remove(goal) {
    const index = this._goals.indexOf(goal)
    if(index >= 0){
      this._goals.splice(index, 1)
      this._weights.splice(index, 1)
    }
  }

  /**
   * Removes all goals from the behavior.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388716-removeallgoals
   */
  removeAllGoals() {
    this._goals = []
    this._weights = []
  }

  /**
   * The number of goals in the behavior.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388721-goalcount
   */
  get goalCount() {
    return this._goals.length
  }

  // Working with Goals Using Subscript Syntax

  /**
   * Returns the weight associated with the goal specified by subscript syntax.
   * @access public
   * @param {GKGoal} goal - A goal already included in the behavior’s set of goals.
   * @returns {NSNumber! { get set }} - 
   * @desc This method is equivalent to the weight(for:) method, but allows access using subscript syntax.
   * @see https://developer.apple.com/documentation/gameplaykit/gkbehavior/1388723-subscript
   */
  subscript(goal) {
    return null
  }
}
