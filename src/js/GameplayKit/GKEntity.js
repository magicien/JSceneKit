'use strict'

import NSObject from '../ObjectiveC/NSObject'
import GKComponent from './GKComponent'
import _InstanceOf from '../util/_InstanceOf'

/**
 * An object relevant to gameplay, with functionality entirely provided by a collection of component objects. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gameplaykit/gkentity
 */
export default class GKEntity extends NSObject {

  // Creating an Entity

  /**
   * Initializes a new entity object.
   * @access public
   * @constructor
   * @desc If you create a GKEntity subclass and define any additional initializers, you must delegate to this initializer. You do not need to subclass GKEntity to use Entity-Component architecture—generally, you should create a custom entity class only when you need a place to store state or resources that are shared by multiple components.
   * @see https://developer.apple.com/documentation/gameplaykit/gkentity/1501143-init
   */
  constructor() {
    super()

    // Managing an Entity’s List of Components

    this._components = []
  }

  // Managing an Entity’s List of Components

  /**
   * Adds a component to the entity.
   * @access public
   * @param {GKComponent} component - An instance of a GKComponent subclass.
   * @returns {void}
   * @desc You create components by subclassing GKEntity to implement reusable behavior. Then, use this method to incorporate the behavior of a component class into that entity. An entity’s components list never has more than one instance of any component class—if the entity already contains a component of the same class as the component parameter, calling this method will replace that component.
   * @see https://developer.apple.com/documentation/gameplaykit/gkentity/1501312-addcomponent
   */
  addComponent(component) {
    if(this._components.indexOf(component) < 0){
      this._components.push(component)
      component._entity = this
      component.didAddToEntity()
    }
  }

  /**
   * The entity’s list of components.
   * @type {GKComponent[]}
   * @desc 
   * @see https://developer.apple.com/documentation/gameplaykit/gkentity/1501182-components
   */
  get components() {
    return this._components.slice()
  }

  // Performing Periodic Updates

  /**
   * Performs periodic updates for each of the entity’s components.
   * @access public
   * @param {number} seconds - The time step to use for any time-dependent actions performed by this method (typically, the elapsed time since the previous call to this method).
   * @returns {void}
   * @desc At runtime, an entity/component-based game needs to dispatch periodic logic—from an update/render loop method such as update(_:) (SpriteKit) or renderer(_:updateAtTime:) (SceneKit), or a CADisplayLink (iOS) or CVDisplayLink (macOS) timer in a custom rendering engine—to each of its components, so that each can perform component-specific update logic.The GKEntity update(deltaTime:) method is one of the two options GameplayKit provides for dispatching updates—this option is easy to implement in games with small numbers of entities and components. Call this method for each entity in your game, and each entity will in turn call the update(deltaTime:) method for each of its components.The other option is to dispatch updates per-component, rather than per-entity, using a GKComponentSystem object. Using a component system allows you to update all components of a specific component class in a deterministic order, without needing to traverse your game’s object graph and update each entity.NoteIf a component owned by an entity is a member of a component system, calling the entity’s update(deltaTime:) method will not update that component.
   * @see https://developer.apple.com/documentation/gameplaykit/gkentity/1501228-update
   */
  updateDeltaTime(seconds) {
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @param {ComponentType.Type} componentClass - 
   * @returns {GKComponent} - 
   * @see https://developer.apple.com/documentation/gameplaykit/gkentity/2300466-component
   */
  componentOfType(componentClass) {
    return this._components.find((component) => _InstanceOf(component, componentClass))
  }

  /**
   * 
   * @access public
   * @param {ComponentType.Type} componentClass - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkentity/2300467-removecomponent
   */
  removeComponentOfType(componentClass) {
    for(const component of this._components){
      if(_InstanceOf(component, componentClass)){
        component.willRemoveFromEntity()

        const index = this._components.indexOf(component)
        if(index >= 0){
          this._components.splice(index)
          component._entity = null
        }
      }
    }
  }
}
