'use strict'

//import SCNPhysicsWorld from './SCNPhysicsWorld'
//import SCNPhysicsContact from './SCNPhysicsContact'

/**
 * Methods you can implement to respond when a contact or collision occurs between two physics bodies in a scene.
 * @interface
 * @see https://developer.apple.com/documentation/scenekit/scnphysicscontactdelegate
 */
export default class SCNPhysicsContactDelegate {

  /**
   * constructor
   * @access public
   * @constructor
   */
  //construtor() {
  //}

  // Responding to Contact Events

  /**
   * Tells the delegate that two bodies have come into contact.
   * @access public
   * @param {SCNPhysicsWorld} world - The physics world that is processing the contact.
   * @param {SCNPhysicsContact} contact - An object that describes the contact.
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontactdelegate/1512835-physicsworld
   */
  physicsWorldDidBegin(world, contact) {
  }

  /**
   * Tells the delegate that new information is available about an ongoing contact.
   * @access public
   * @param {SCNPhysicsWorld} world - The physics world that is processing the contact.
   * @param {SCNPhysicsContact} contact - An object that describes the contact.
   * @returns {void}
   * @desc SceneKit calls this method on each step of the physics simulation (see the timeStep property) if information about the contact changes—for example, if two bodies are sliding against one another.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontactdelegate/1512865-physicsworld
   */
  physicsWorldDidUpdate(world, contact) {
  }

  /**
   * Tells the delegate that a contact has ended.
   * @access public
   * @param {SCNPhysicsWorld} world - The physics world that is processing the contact.
   * @param {SCNPhysicsContact} contact - An object that describes the contact.
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnphysicscontactdelegate/1512883-physicsworld
   */
  physicsWorldDidEnd(world, contact) {
  }
}
