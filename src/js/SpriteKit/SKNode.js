'use strict'

import NSObject from '../ObjectiveC/NSObject'
import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import CGSize from '../CoreGraphics/CGSize'
//import UIFocusItem from '../undefined/UIFocusItem'
//import SKScene from './SKScene'
//import SKAction from './SKAction'
//import SKPhysicsBody from './SKPhysicsBody'
//import GKPolygonObstacle from '../undefined/GKPolygonObstacle'
//import GKEntity from '../undefined/GKEntity'
//import NSMutableDictionary from '../undefined/NSMutableDictionary'
//import SKConstraint from './SKConstraint'
//import SKReachConstraints from './SKReachConstraints'
//import NSCoder from '../undefined/NSCoder'
//import SKAttributeValue from './SKAttributeValue'


/**
 * The SKNode class is the fundamental building block of most SpriteKit content. 
 * @access public
 * @extends {NSObject}
 * @implements {UIFocusItem}
 * @see https://developer.apple.com/reference/spritekit/sknode
 */
export default class SKNode extends NSObject {
  // Initializers

  /**
   * 
   * @access public
   * @constructor
   * @see https://developer.apple.com/reference/spritekit/sknode/1483097-init
   */
  constructor() {
    super()

    // Inspecting the Node’s Position

    /**
     * The position of the node in its parent's coordinate system.
     * @type {CGPoint}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483101-position
     */
    this.position = new CGPoint(0, 0)

    /**
     * The height of the node relative to its parent.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483107-zposition
     */
    this.zPosition = 0.0

    this._frame = new CGRect(new CGPoint(0, 0), new CGSize(0, 0))

    // Setting a Node’s Scaling and Rotation

    /**
     * A scaling factor that multiplies the width of a node and its children.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483087-xscale
     */
    this.xScale = 1.0

    /**
     * A scaling factor that multiplies the height of a node and its children.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483046-yscale
     */
    this.yScale = 1.0

    /**
     * The Euler rotation about the z axis (in radians).
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483089-zrotation
     */
    this.zRotation = 0.0


    // Inspecting a Node’s Visibility

    /**
     * The transparency value applied to the node’s contents.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483023-alpha
     */
    this.alpha = 1.0

    /**
     * A Boolean value that determines whether a node and its descendants are rendered.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483048-ishidden
     */
    this.isHidden = false


    // Determining Whether a Node Supports User Interaction

    /**
     * A Boolean value that indicates whether the node receives touch events.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483109-isuserinteractionenabled
     */
    this.isUserInteractionEnabled = false


    // Working with Node Trees

    this._children = []
    this._parent = null
    this._scene = null

    // Naming Nodes

    /**
     * The node’s assignable name.
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483136-name
     */
    this.name = null


    // Running Actions

    /**
     * A speed modifier applied to all actions executed by a node and its descendants.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483036-speed
     */
    this.speed = 1.0

    /**
     * A Boolean value that determines whether actions on the node and its descendants are processed.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483113-ispaused
     */
    this.isPaused = false

    /**
     * @access private
     * @type {Map}
     */
    this._actions = new Map()

    // Adding Physics to a Node

    /**
     * The physics body associated with the node.
     * @type {?SKPhysicsBody}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483117-physicsbody
     */
    this.physicsBody = null


    // Working with GameplayKit Entities

    /**
     * The GameplayKit entity this node represents.
     * @type {?GKEntity}
     * @see https://developer.apple.com/reference/spritekit/sknode/1640688-entity
     */
    //this.entity = null


    // Storing Custom Node Data

    /**
     * A dictionary containing arbitrary data.
     * @type {?NSMutableDictionary}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483121-userdata
     */
    this.userData = null


    // Constraining a Node’s Behavior Relative to Other Nodes

    /**
     * Specifies the list of constraints to apply to the node.
     * @type {?SKConstraint[]}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483124-constraints
     */
    this.constraints = null

    /**
     * Specifies the reach constraints to apply to the node when executing a reach action.
     * @type {?SKReachConstraints}
     * @see https://developer.apple.com/reference/spritekit/sknode/1483019-reachconstraints
     */
    this.reachConstraints = null


    // Instance Properties

    /**
     * 
     * @type {?Object[]}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645045-accessibilitychildren
     */
    this.accessibilityChildren = []

    /**
     * 
     * @type {CGRect}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645044-accessibilityframe
     */
    this.accessibilityFrame = new CGRect(new CGPoint(0, 0), new CGSize(0, 0))

    /**
     * 
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645041-accessibilityhelp
     */
    this.accessibilityHelp = null

    /**
     * 
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645039-accessibilitylabel
     */
    this.accessibilityLabel = null

    /**
     * 
     * @type {?Object}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645042-accessibilityparent
     */
    this.accessibilityParent = null

    /**
     * 
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645036-accessibilityrole
     */
    this.accessibilityRole = 'AXImage'

    /**
     * 
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645035-accessibilityroledescription
     */
    this.accessibilityRoleDescription = 'SKNode'

    /**
     * 
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645043-accessibilitysubrole
     */
    this.accessibilitySubrole = null

    /**
     * The values of each attribute associated with the node's attached shader. 
     * @type {Map<string, SKAttributeValue>}
     * @see https://developer.apple.com/reference/spritekit/sknode/1644181-attributevalues
     */
    this.attributeValues = new Map()

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645038-isaccessibilityelement
     */
    this.isAccessibilityElement = false

    /**
     * 
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/sknode/1645037-isaccessibilityenabled
     */
    this.isAccessibilityEnabled = false

    /**
     * @type {SKNode}
     * @access private
     */
    this.__presentation = null

    this._isPresentationInstance = false
    this._worldPosition = new CGPoint(0, 0)
    this._worldZPosition = 0
    this._worldXScale = 1
    this._worldYScale = 1
    this._worldZRotation = 0
  }

  /**
   * 
   * @access public
   * @param {NSCoder} aDecoder - 
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483142-init
   */
  //initWithCoder(aDecoder) {
  //}


  // Creating a New Node

  /**
   * Creates a new node by loading an archive file from the game’s main bundle.
   * @access public
   * @param {string} filename - The name of the file, without a file extension. The file must be in the app’s main bundle and have a .sks filename extension.
   * @returns {void}
   * @desc If you call this method on a subclass of the SKScene class and the object in the archive is an SKScene object, the returned object is initialized as if it is a member of the subclass. You use this behavior to create scene layouts in the Xcode Editor and provide custom behaviors in your subclass. 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483083-init
   */
  static nodeWithFileNamed(filename) {
    const node = new SKNode()
    return node
  }

  // Inspecting the Node’s Position

  /**
   * Calculates a rectangle in the parent’s coordinate system that contains the content of the node and all of its descendants. 
   * @access public
   * @returns {CGRect} - 
   * @desc The frame takes into the account the cumulative effect of the xScale, yScale, and zRotation properties of each node in the subtree.Listing 1 shows how calculateAccumulatedFrame() can be used display the bounding box of a shape node. The child node, although smaller than its parent, is rotated by 30° so that its bounds extend beyond its parent's bounds. After childNode has been added to parentNode, a further shape node, boundingBoxNode, is created with its size based on the accumulated frame of parentNode.Listing 1 Displaying the accumulated frame of a shape nodelet parentNode = SKShapeNode(rectOf: CGSize(width: 500, height: 500))
parentNode.lineWidth = 2
parentNode.strokeColor = .blue
parentNode.fillColor = .clear
     
let childNode = SKShapeNode(rectOf: CGSize(width: 400, height: 400))
childNode.strokeColor = .red
childNode.fillColor = .clear
childNode.zRotation = -CGFloat.pi / 6 // pi / 6 = 30°
     
parentNode.addChild(childNode)
     
let boundingBoxNode = SKShapeNode(rectOf: parentNode.calculateAccumulatedFrame().size)
boundingBoxNode.lineWidth = 1
boundingBoxNode.strokeColor = .black
boundingBoxNode.fillColor = .clear
boundingBoxNode.path = boundingBoxNode.path?.copy(dashingWithPhase: 0,
                                                  lengths: [10,10])
     
parentNode.addChild(boundingBoxNode)
Figure 1 shows the result of Listing 1 with parentNode rendered in blue, childNode rendered in red and the boundingBoxNode rendered with a dashed line. Figure 1 Displaying the accumulated frame of a shape nodeDisplaying the accumulated frame of a shape nodelet parentNode = SKShapeNode(rectOf: CGSize(width: 500, height: 500))
parentNode.lineWidth = 2
parentNode.strokeColor = .blue
parentNode.fillColor = .clear
     
let childNode = SKShapeNode(rectOf: CGSize(width: 400, height: 400))
childNode.strokeColor = .red
childNode.fillColor = .clear
childNode.zRotation = -CGFloat.pi / 6 // pi / 6 = 30°
     
parentNode.addChild(childNode)
     
let boundingBoxNode = SKShapeNode(rectOf: parentNode.calculateAccumulatedFrame().size)
boundingBoxNode.lineWidth = 1
boundingBoxNode.strokeColor = .black
boundingBoxNode.fillColor = .clear
boundingBoxNode.path = boundingBoxNode.path?.copy(dashingWithPhase: 0,
                                                  lengths: [10,10])
     
parentNode.addChild(boundingBoxNode)
Displaying the accumulated frame of a shape node
   * @see https://developer.apple.com/reference/spritekit/sknode/1483066-calculateaccumulatedframe
   */
  calculateAccumulatedFrame() {
    let r = this._frame.copy()
    for(const child of this._children){
      r = r.union(child.calculateAccumulatedFrame())
    }
    return r
  }

  /**
   * A rectangle in the parent’s coordinate system that contains the node’s content, ignoring the node’s children.
   * @type {CGRect}
   * @desc The frame is the smallest rectangle that contains the node’s content, taking into account the node’s xScale, yScale, and zRotation properties. Not all nodes contain content of their own.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483026-frame
   */
  get frame() {
    return this._frame
  }

  // Setting a Node’s Scaling and Rotation

  /**
   * Sets the xScale and yScale properties of the node.
   * @access public
   * @param {number} scale - The new value to use for the node’s xScale and yScale properties.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483126-setscale
   */
  setScale(scale) {
    this.xScale = scale
    this.yScale = scale
  }

  // Working with Node Trees

  /**
   * Adds a node to the end of the receiver’s list of child nodes.
   * @access public
   * @param {SKNode} node - The node to add. The node must not already have a parent.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483054-addchild
   */
  addChild(node) {
    if(this._children.indexOf(node) >= 0){
      return
    }
    node.removeFromParent()
    this._children.push(node)
    node._parent = this
  }

  /**
   * Inserts a child into a specific position in the receiver’s list of child nodes.
   * @access public
   * @param {SKNode} node - The node to add. The node must not already have a parent.
   * @param {number} index - The position in the array to insert the node.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483062-insertchild
   */
  insertChildAt(node, index) {
    if(this._children.indexOf(node) >= 0){
      return
    }
    node.removeFromParent()
    this._insertObjectInChildrenAtIndex(node, index)
    this._parent = this
  }

  /**
   * Compares the parameter node to the receiving node.
   * @access public
   * @param {SKNode} node - The node to compare to the receiving node.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483078-isequal
   */
  isEqualTo(node) {
    return false
  }

  /**
   * Moves the node to a new parent node in the scene. 
   * @access public
   * @param {SKNode} parent - An SKNode object to move the receiver to. This node must be in the same scene as the node’s current parent.
   * @returns {void}
   * @desc The node maintains its current position in scene coordinates.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483021-move
   */
  moveToParent(parent) {
    parent.addChild(this)
  }

  /**
   * Removes the receiving node from its parent.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483119-removefromparent
   */
  removeFromParent() {
    const parentNode = this._parent
    if(parentNode === null){
      return
    }
    const index = parentNode._children.indexOf(this)
    if(index < 0){
      return
    }
    parentNode._removeObjectFromChildrenAtIndex(index)
  }

  /**
   * Removes all of the node’s children.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483040-removeallchildren
   */
  removeAllChildren() {
    for(const child of this._children){
      child.removeFromParent()
    }
  }

  /**
   * Removes a list of children from the receiving node.
   * @access public
   * @param {SKNode[]} nodes - An array of SKNode objects that are all children of the receiving node.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483091-removechildren
   */
  removeChildrenIn(nodes) {
    for(const node of nodes){
      if(this._children.indexOf(node) >= 0){
        node.removeFromParent()
      }
    }
  }

  /**
   *
   * @access private
   * @param {number} index -
   * @returns {void}
   */
  _removeObjectFromChildrenAtIndex(index) {
    const arr = this._children.splice(index, 1)
    if(arr.length === 0){
      return
    }
    const obj = arr[0]

    obj._parent = null
  }

  /**
   *
   * @access private
   * @param {SCNNode} object -
   * @param {number} index -
   * @returns {void}
   */
  _insertObjectInChildrenAtIndex(object, index) {
    const length = this._children.length
    if(index > length){
      throw new Error(`SKNode.children out of index: ${index} > ${length}`)
    }
    this._children.splice(index, 0, object)
  }

  /**
   * Returns a Boolean value that indicates whether the node is a descendant of the target node.
   * @access public
   * @param {SKNode} parent - An SKNode object to test against.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483111-inparenthierarchy
   */
  inParentHierarchy(parent) {
    return false
  }
  /**
   * The node’s children.
   * @type {SKNode[]}
   * @desc The objects in this array are all SKNode objects.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483028-children
   */
  get children() {
    return this._children.slice(0)
  }
  /**
   * The node’s parent node.
   * @type {?SKNode}
   * @desc If the node is not in a node tree, the value is nil.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483080-parent
   */
  get parent() {
    return this._parent
  }

  /**
   * The scene node that contains the node.
   * @type {?SKScene}
   * @desc If the node is not embedded in a scene, the value is nil.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483064-scene
   */
  get scene() {
    return this._scene
  }

  // Naming Nodes

  /**
   * Searches the children of the receiving node for a node with a specific name.
   * @access public
   * @param {string} name - The name to search for. This may be either the literal name of the node or a customized search string. See Searching the Node Tree.
   * @returns {?SKNode} - 
   * @desc If more than one child share the same name, the first node discovered is returned.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483060-childnode
   */
  childNodeWithName(name) {
    for(const child of this._children){
      if(child.name === name){
        return child
      }
    }
    return null
  }

  /**
   * Search the children of the receiving node to perform processing for nodes which share a name.
   * @access public
   * @param {string} name - The name to search for. This may be either the literal name of the node or a customized search string. See Searching the Node Tree.
   * @param {function(arg1: SKNode, arg2: UnsafeMutablePointer<ObjCBool>): void} block - A block to execute on nodes that match the name parameter. The block has the signature (node: SKNode, stop: UnsafeMutablePointer<ObjCBool>).
   * @returns {void}
   * @desc This method enumerates the child array in order, searching for nodes whose names match the search parameter. The block is called once for each node that matches the name parameter.The following code shows how you could enumerate through the child nodes of a scene with a name containing the string yellow. Each matching node is hidden until the enumeration finds a node that also contains the string triangle. When this node is reached, stop is set to true and the processing stops.Listing 1 Enumerating child nodesscene.enumerateChildNodes(withName: "*yellow*") {
    (node, stop) in
    
    node.run(SKAction.hide())
    
    if let name = node.name, name.contains("triangle") {
        stop.initialize(to: true)
    }
}
You can also search by class name using enumerateChildNodes(withName:using:). However, for custom classes, you need to specify the fully annotated class name (i.e. the project name followed by the class name). The following code shows a custom class, SpaceshipNode, based on SKSpriteNode, and created in a project named SpaceGame. The first search fails to return an instance of  SpaceshipNode added as a child of parentNode:Listing 2 Enumerating child nodesclass SpaceshipNode: SKSpriteNode {
}
     
let parentNode = SKNode()
let childNode = SpaceshipNode()
parentNode.addChild(childNode)
     
parentNode.enumerateChildNodes(withName: "SpaceshipNode") {
    node, _ in
    // Unannotated name, returns no results 
}
     
parentNode.enumerateChildNodes(withName: "SpaceGame.SpaceshipNode") {
    node, _ in
    // Annotated name, successfully returns `childNode` 
}
     
parentNode.enumerateChildNodes(withName: "SKSpriteNode") {
    node, _ in
    // Superclass name, successfully returns `childNode` 
}
Enumerating child nodesscene.enumerateChildNodes(withName: "*yellow*") {
    (node, stop) in
    
    node.run(SKAction.hide())
    
    if let name = node.name, name.contains("triangle") {
        stop.initialize(to: true)
    }
}
Enumerating child nodesclass SpaceshipNode: SKSpriteNode {
}
     
let parentNode = SKNode()
let childNode = SpaceshipNode()
parentNode.addChild(childNode)
     
parentNode.enumerateChildNodes(withName: "SpaceshipNode") {
    node, _ in
    // Unannotated name, returns no results 
}
     
parentNode.enumerateChildNodes(withName: "SpaceGame.SpaceshipNode") {
    node, _ in
    // Annotated name, successfully returns `childNode` 
}
     
parentNode.enumerateChildNodes(withName: "SKSpriteNode") {
    node, _ in
    // Superclass name, successfully returns `childNode` 
}

   * @see https://developer.apple.com/reference/spritekit/sknode/1483024-enumeratechildnodes
   */
  enumerateChildNodesWithNameUsing(name, block) {
  }

  // Running Actions

  /**
   * Adds an action to the list of actions executed by the node.
   * @access public
   * @param {SKAction} action - The action to perform.
   * @returns {void}
   * @desc The new action is processed the next time the scene’s animation loop is processed.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483093-run
   */
  run(action) {
    this.runWithKey(action, Symbol())
  }

  /**
   * Adds an action to the list of actions executed by the node.
   * @access public
   * @param {SKAction} action - The action to perform.
   * @param {function(): void} block - A completion block called when the action completes.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1483103-run
   */
  runCompletion(action, block) {
    this._runActionForKeyCompletionHandler(action, Symbol(), block)
  }

  /**
   * Adds an identifiable action to the list of actions executed by the node.
   * @access public
   * @param {SKAction} action - The action to perform.
   * @param {string} key - A unique key used to identify the action.
   * @returns {void}
   * @desc This method is identical to run(_:), but the action is stored so that it can be retrieved later. If an action using the same key is already running, it is removed before the new action is added.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483042-run
   */
  runWithKey(action, key) {
    this._runActionForKeyCompletionHandler(action, key, null)
  }

  _runActionForKeyCompletionHandler(action, key, block) {
    if(typeof key === 'undefined' || key === null){
      key = Symbol()
    }
    const act = action.copy()
    // FIXME: use current frame time
    act._actionStartTime = Date.now() * 0.001
    act._completionHandler = block
    this._actions.set(key, act)
  }

  /**
   * Returns an action associated with a specific key.
   * @access public
   * @param {string} key - A string that uniquely identifies an action.
   * @returns {?SKAction} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483138-action
   */
  actionForKey(key) {
    return this._actions.get(key)
  }

  /**
   * Returns a Boolean value that indicates whether the node is executing actions.
   * @access public
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483081-hasactions
   */
  hasActions() {
    return this._actions.size > 0
  }

  /**
   * Ends and removes all actions from the node.
   * @access public
   * @returns {void}
   * @desc When an action is removed from the node, any remaining animation the action would perform is skipped; however, previous changes are not reverted. It is possible that an action may make a final change to the scene when removed; if so, it is documented for the specific action in SKAction.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483030-removeallactions
   */
  removeAllActions() {
    // TODO: stop actions
    this._actions.clear()
  }

  /**
   * Removes an action associated with a specific key.
   * @access public
   * @param {string} key - A string that uniquely identifies an action.
   * @returns {void}
   * @desc If an action is found that matches the key, it is removed from the node.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483076-removeaction
   */
  removeActionForKey(key) {
    // TODO: stop action
    this._actions.delete(key)
  }

  // Converting to and from the Node’s Coordinate System

  /**
   * Converts a point from the coordinate system of another node in the node tree to the coordinate system of this node.
   * @access public
   * @param {CGPoint} point - A point in the other node’s coordinate system.
   * @param {SKNode} node - Another node in the same node tree as this node.
   * @returns {CGPoint} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483058-convert
   */
  convertFrom(point, node) {
    return null
  }

  /**
   * Converts a point in this node’s coordinate system to the coordinate system of another node in the node tree.
   * @access public
   * @param {CGPoint} point - A point in this node’s coordinate system.
   * @param {SKNode} node - Another node in the same node tree as this node.
   * @returns {CGPoint} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483056-convert
   */
  convertTo(point, node) {
    return null
  }

  // Determining If a Point Lies in a Node

  /**
   * Returns a Boolean value that indicates whether a point lies inside the parent’s coordinate system.
   * @access public
   * @param {CGPoint} p - A CGPoint to test against.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1483044-contains
   */
  contains(p) {
    return false
  }

  /**
   * Returns the deepest visible descendant that intersects a point.
   * @access public
   * @param {CGPoint} p - A point in the node’s coordinate system.
   * @returns {SKNode} - 
   * @desc A point is considered to be in a node if it lies inside the rectangle returned by the calculateAccumulatedFrame() method.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483099-atpoint
   */
  atPoint(p) {
    return null
  }

  /**
   * Returns an array of all visible descendants that intersect a point.
   * @access public
   * @param {CGPoint} p - A point in the node’s coordinate system.
   * @returns {SKNode[]} - 
   * @desc A point is considered to be in a node if it lies inside the rectangle returned by the calculateAccumulatedFrame() method.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483072-nodes
   */
  nodesAt(p) {
    return null
  }

  // Performing Node Intersections

  /**
   * Returns a Boolean value that indicates whether this node intersects the specified node.
   * @access public
   * @param {SKNode} node - Another node in the same node tree.
   * @returns {boolean} - 
   * @desc The two nodes are considered to intersect if their frames intersect. The children of both nodes are ignored in this test.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483140-intersects
   */
  intersects(node) {
    return false
  }

  // Creating GameplayKit Obstacles from a Set of Nodes

  /**
   * Converts each node into an obstacle by transforming its bounds into the scene’s coordinate system.
   * @access public
   * @param {SKNode[]} nodes - An array of SKNode objects.
   * @returns {GKPolygonObstacle[]} - 
   * @desc Use the array of obstacles to create an obstacle graph (GKObstacleGraph) in GameplayKit. See GameplayKit and GameplayKit Programming Guide.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483132-obstacles
   */
  static obstaclesFromNodeBounds(nodes) {
    return null
  }

  /**
   * Converts each node into an obstacle by transforming the node’s physics body shape into the scene’s coordinate system.
   * @access public
   * @param {SKNode[]} nodes - An array of SKNode objects.
   * @returns {GKPolygonObstacle[]} - 
   * @desc Use the array of obstacles to create an obstacle graph (GKObstacleGraph) in GameplayKit. See GameplayKit and GameplayKit Programming Guide.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483085-obstacles
   */
  static obstaclesFromNodePhysicsBodies(nodes) {
    return null
  }

  /**
   * Converts each node into an obstacle by first transforming the node’s texture into a physics shape and then converting that shape into the scene’s coordinate system.
   * @access public
   * @param {SKNode[]} sprites - An array of SKNode objects.
   * @param {number} accuracy - A floating point value between 0.001 and 1.0, inclusive. Higher values create a more precise (but more complex) representation of the obstacle.
   * @returns {GKPolygonObstacle[]} - 
   * @desc Use the array of obstacles to create an obstacle graph (GKObstacleGraph) in GameplayKit. See GameplayKit and GameplayKit Programming Guide.
   * @see https://developer.apple.com/reference/spritekit/sknode/1483134-obstacles
   */
  static obstaclesFromSpriteTextures(sprites, accuracy) {
    return null
  }

  // Instance Methods

  /**
   * 
   * @access public
   * @param {CGPoint} point - 
   * @returns {?Object} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1645040-accessibilityhittest
   */
  accessibilityHitTest(point) {
    return null
  }

  /**
   * Sets an attribute value for an attached shader
   * @deprecated
   * @access public
   * @param {SKAttributeValue} value - An attribute value object containing the scalar or vector value to set in the attached shader. 
   * @param {string} key - The attribute name.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sknode/1644180-setvalue
   */
  setValueForAttribute(value, key) {
    this.attributeValues.set(key, value)
  }

  /**
   * The value of a shader attribute.
   * @deprecated
   * @access public
   * @param {string} key - The attribute name.
   * @returns {?SKAttributeValue} - 
   * @see https://developer.apple.com/reference/spritekit/sknode/1644182-value
   */
  valueForAttributeNamed(key) {
    return this.attributeValues.get(key)
  }

  /**
   * @type {SKNode}
   */
  get _presentation() {
    return this.__presentation
  }

  /**
   *
   * @access public
   * @returns {SKNode} -
   */
  copy() {
    const node = super.copy()
    node._copyValue(this)
    return node
  }

  _copyValue(src) {
    this.position = src.position.copy()
    this.zPosition = src.zPosition
    this._frame = src._frame
    this.xScale = src.xScale
    this.yScale = src.yScale
    this.zRotation = src.zRotation
    this.alpha = src.alpha
    this.isHidden = src.isHidden
    this.isUserInteractionEnabled = src.isUserInteractionEnabled
    this.name = src.name
    this.speed = src.speed
    this.isPaused = src.isPaused
    this._actions = new Map(src._actions)
    this.physicsBody = src.physicsBody
    this.userData = src.userData
    this.constraints = src.constraints
    this.reachConstraints = src.reachConstraints
    this.accessibilityChildren = src.accessibilityChildren
    this.accessibilityFrame = src.accessibilityFrame.copy()
    this.accessibilityHelp = src.accessibilityHelp
    this.accessibilityLabel = src.accessibilityLabel
    this.accessibilityParent = src.accessibilityParent
    this.accessibilityRole = src.accessibilityRole
    this.accessibilityRoleDescription = src.accessibilityRoleDescription
    this.accessibilitySubrole = src.accessibilitySubrole
    this.attributeValues = new Map(src.attributeValues)
    this.isAccessibilityElement = src.isAccessibilityElement
    this.isAccessibilityEnabled = src.isAccessibilityEnabled
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @returns {void}
   */
  _render(gl) {
    // nothing to draw
  }

  _copyTransformToPresentation() {
    if(this.__presentation === null){
      return
    }
    const p = this.__presentation
    p.position = this.position
    p.zPosition = this.zPosition
    p.xScale = this.xScale
    p.yScale = this.yScale
    p.zRotation = this.zRotation
  }

  _updateWorldTransform() {
    let p = null
    let pz = 0
    if(this._parent === null){
      p = new CGPoint(0, 0)
    }else{
      p = this._parent._worldPosition
      pz = this._parent._worldZPosition
    }
    this._worldPosition = this.position.add(p)
    this._worldZPosition = this.zPosition + pz

    if(this._presentation){
      let pp = null
      let ppz = 0
      let pxScale = 1
      let pyScale = 1
      if(this._parent === null){
        pp = new CGPoint(0, 0)
      }else if(this._parent._presentation === null){
        pp = this._parent._worldPosition
        ppz = this._parent._worldZPosition
        pxScale = this._parent._worldXScale
        pyScale = this._parent._worldYScale
      }else{
        pp = this._parent._presentation._worldPosition
        ppz = this._parent._presentation._worldZPosition
        pxScale = this._parent._presentation._worldXScale
        pyScale = this._parent._presentation._worldYScale
      }
      //this._presentation._worldPosition = this._presentation.position.add(pp)
      this._presentation._worldPosition.x = pp.x + this._presentation.position.x * pxScale
      this._presentation._worldPosition.y = pp.y + this._presentation.position.y * pyScale
      this._presentation._worldZPosition = this._presentation.zPosition + ppz
      this._presentation._worldXScale = this._presentation.xScale * pxScale
      this._presentation._worldYScale = this._presentation.yScale * pyScale
    }

    for(const child of this._children){
      child._updateWorldTransform()
    }
  }
}
