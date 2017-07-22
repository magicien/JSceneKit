'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import GKSceneRootNodeType from './GKSceneRootNodeType'
//import GKEntity from './GKEntity'
//import GKGraph from './GKGraph'

/**
 * A container for associating GameplayKit objects with a SpriteKit scene.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gameplaykit/gkscene
 */
export default class GKScene extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Accessing the SpriteKit Scene

    /**
     * The SpriteKit scene managed by this GKScene object.
     * @type {?GKSceneRootNodeType}
     * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640947-rootnode
     */
    this.rootNode = null


    // Managing Entities and Components

    this._entities = []

    // Managing Pathfinding Graphs

    this._graphs = {}
  }

  // Loading a Scene File

  /**
   * Loads the specified SpriteKit scene file, creating a GKScene object containing the SpriteKit scene and associated GameplayKit objects.
   * @access public
   * @param {string} filename - The name of a scene file in your app’s main bundle.
   * @returns {void}
   * @desc Use this initializer to load SpriteKit scenes (.sks files) created in the Xcode SpriteKit scene editor that contain associated GameplayKit entities, components, and pathfinding graphs.
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640935-init
   */
  static sceneWithFileNamed(filename) {
    const scene = new GKScene()
    // TODO: implement
    return scene
  }

  // Managing Entities and Components

  /**
   * Adds a GameplayKit entity to the list of entities managed by the scene.
   * @access public
   * @param {GKEntity} entity - The entity to be added to the scene.
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640954-addentity
   */
  addEntity(entity) {
    if(this._entities.indexOf(entity) < 0){
      this._entities.push(entity)
    }
  }

  /**
   * Removes a GameplayKit entity from the list of entities managed by the scene.
   * @access public
   * @param {GKEntity} entity - The entity to be removed from the scene.
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640686-removeentity
   */
  removeEntity(entity) {
    const index = this._entities.indexOf(entity)
    this._entities.splice(index, 1)
  }

  /**
   * The list of GameplayKit entities managed by the scene.
   * @type {GKEntity[]}
   * @desc When you add entities (and their components) to a scene in the Xcode SpriteKit scene editor, Xcode automatically adds them to this array.
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640795-entities
   */
  get entities() {
    return this._entities.slice()
  }

  // Managing Pathfinding Graphs

  /**
   * Removes a pathfinding graph from the list of graphs managed by the scene.
   * @access public
   * @param {string} name - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640663-removegraph
   */
  removeGraph(name) {
    if(this._graphs[name]){
      delete this._graphs[name]
    }
  }

  /**
   * The list of pathfinding graph objects managed by the scene.
   * @type {Map<string, GKGraph>}
   * @desc When you define pathfinding graphs in the Xcode SpriteKit scene editor, Xcode automatically adds them to this array.
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/1640940-graphs
   */
  get graphs() {
    return this._graphs
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @param {GKGraph} graph - 
   * @param {string} name - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/gameplaykit/gkscene/2143063-addgraph
   */
  addGraph(graph, name) {
    this._graphs[name] = graph
  }
}
