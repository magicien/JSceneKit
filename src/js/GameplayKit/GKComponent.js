'use strict'

import NSObject from '../ObjectiveC/NSObject'
import GKEntity from './GKEntity'


/**
 * The abstract superclass for creating objects that add specific gameplay functionality to an entity.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gameplaykit/gkcomponent
 */
export default class GKComponent extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Working with Entities

    /**
     * @access private
     * @type {GKEntity}
     */
    this._entity = null
  }

  // Performing Periodic Updates

  /**
   * Performs any custom periodic actions defined by the component subclass.
   * @access public
   * @param {number} seconds - The time step to use for any time-dependent actions performed by this method (typically, the elapsed time since the previous call to this method).
   * @returns {void}
   * @desc Override this method to implement per-frame logic specific to your component class. GameplayKit calls this method when you call the update(deltaTime:) method of the entity owning a component, or when you call the update(deltaTime:) method of a GKComponentSystem object that manages all components of a specific GKComponent subclass. Typically, you call one of those methods in response to a per-frame game loop method such as update(_:) (SpriteKit) or renderer(_:updateAtTime:) (SceneKit).
   * @see https://developer.apple.com/documentation/gameplaykit/gkcomponent/1501218-update
   */
  updateDeltaTime(seconds) {
  }

  // Working with Entities

  /**
   * Notifies the component that it has been assigned to an entity.
   * @access public
   * @returns {void}
   * @desc Override this method in a component subclass if you need to perform game logic when the component is added to an entity. For example, if one component’s behavior depends on the presence of other components in the same entity, you can examine the entity’s components array in this method and take action accordingly.
   * @see https://developer.apple.com/documentation/gameplaykit/gkcomponent/1687601-didaddtoentity
   */
  didAddToEntity() {
  }

  /**
   * Notifies the component that it has been removed from an entity.
   * @access public
   * @returns {void}
   * @desc Override this method in a component subclass if you need to perform game logic when the component is removed from to an entity. For example, if one component’s behavior depends on the presence of other components in the same entity, you can examine the entity’s components array in this method and take action accordingly.
   * @see https://developer.apple.com/documentation/gameplaykit/gkcomponent/1640914-willremovefromentity
   */
  willRemoveFromEntity() {
  }

  /**
   * The entity that owns this component.
   * @type {?GKEntity}
   * @desc Use this property in a component subclass to refer back to the owning entity and its attributes. An entity may be an instance either of the GKEntity class or of a custom subclass. In the latter case, a custom entity class can provide storage for state or resources accessed by multiple components.
   * @see https://developer.apple.com/documentation/gameplaykit/gkcomponent/1501250-entity
   */
  get entity() {
    return this._entity
  }
}

