'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNActionable from './SCNActionable'
import SCNAnimatable from './SCNAnimatable'
import SCNBoundingVolume from './SCNBoundingVolume'
import SCNGeometry from './SCNGeometry'
import SCNLight from './SCNLight'
import SCNCamera from './SCNCamera'
import SCNMorpher from './SCNMorpher'
import SCNSkinner from './SCNSkinner'
import SCNMatrix4 from './SCNMatrix4'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNQuaternion from './SCNQuaternion'
import SCNConstraint from './SCNConstraint'
import SCNMovabilityHint from './SCNMovabilityHint'
import SCNNodeRendererDelegate from './SCNNodeRendererDelegate'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNPhysicsField from './SCNPhysicsField'
import SCNParticleSystem from './SCNParticleSystem'
import SCNAudioPlayer from './SCNAudioPlayer'
import SCNHitTestResult from './SCNHitTestResult'


/**
 * A structural element of a scene graph, representing a position and transform in a 3D coordinate space, to which you can attach geometry, lights, cameras, or other displayable content.
 * @access public
 * @extends {NSObject}
 * @implements {SCNActionable}
 * @implements {SCNAnimatable}
 * @implements {SCNBoundingVolume}
 * @see https://developer.apple.com/reference/scenekit/scnnode
 */
export default class SCNNode extends NSObject {

  // Creating a Node

  /**
   * Creates and returns a node object with the specified geometry attached.
   * @access public
   * @constructor
   * @param {?SCNGeometry} [geometry = null] - The geometry to be attached.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408020-init
   */
  constructor(geometry = null) {
    super()

    // Managing Node Attributes

    /**
     * A name associated with the node.
     * @type {?string}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408014-name
     */
    this.name = null

    /**
     * The light attached to the node.
     * @type {?SCNLight}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408004-light
     */
    this.light = null

    /**
     * The camera attached to the node.
     * @type {?SCNCamera}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407976-camera
     */
    this.camera = null

    /**
     * The geometry attached to the node.
     * @type {?SCNGeometry}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407966-geometry
     */
    this.geometry = geometry

    /**
     * The morpher object responsible for blending the node’s geometry.
     * @type {?SCNMorpher}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408022-morpher
     */
    this.morpher = null

    /**
     * The skinner object responsible for skeletal animations of node’s contents.
     * @type {?SCNSkinner}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407953-skinner
     */
    this.skinner = null

    /**
     * A mask that defines which categories the node belongs to.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407994-categorybitmask
     */
    this.categoryBitMask = 0


    // Working With Node Animation

    /**
     * A Boolean value that determines whether to run actions and animations attached to the node and its child nodes.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407962-ispaused
     */
    this.isPaused = false

    /**
     * A node object representing the state of the node as it currently appears onscreen.
     * @type {SCNNode}
     * @access private
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408030-presentation
     */
    this._presentation = null

    /**
     * 
     * @type {boolean}
     * @access private
     */
    this._isPresentationInstance = false


    // Managing the Node’s Transformation

    /**
     * The transformation applied to the node relative to its parent. Animatable.
     * @type {SCNMatrix4}
     * @access private
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407964-transform
     */
    this._transform = new SCNMatrix4()

    /**
     * 
     * @type {boolean}
     * @access private
     */
    this._transformUpToDate = false

    /**
     * The translation applied to the node. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408026-position
     */
    this._position = new SCNVector3()

    /**
     * The node’s orientation, expressed as a rotation angle about an axis. Animatable.
     * @type {SCNVector4}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408034-rotation
     */
    this.rotation = null

    /**
     * The node’s orientation, expressed as pitch, yaw, and roll angles, each in radians. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407980-eulerangles
     */
    this.eulerAngles = null

    /**
     * The node’s orientation, expressed as a quaternion. Animatable.
     * @type {SCNQuaternion}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408048-orientation
     */
    this.orientation = null

    /**
     * The scale factor applied to the node. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408050-scale
     */
    this.scale = null

    /**
     * The pivot point for the node’s position, rotation, and scale. Animatable.
     * @type {SCNMatrix4}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408044-pivot
     */
    this.pivot = null

    /**
     * A list of constraints affecting the node’s transformation.
     * @type {?SCNConstraint[]}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408016-constraints
     */
    this.constraints = null

    //this._worldTransform = null

    // Modifying the Node Visibility

    /**
     * A Boolean value that determines the visibility of the node’s contents. Animatable.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407967-ishidden
     */
    this.isHidden = false

    /**
     * The opacity value of the node. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408010-opacity
     */
    this.opacity = 0

    /**
     * The order the node’s content is drawn in relative to that of other nodes.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407978-renderingorder
     */
    this.renderingOrder = 0

    /**
     * A Boolean value that determines whether SceneKit renders the node’s contents into shadow maps.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407955-castsshadow
     */
    this.castsShadow = false

    /**
     * A value that indicates how SceneKit should handle the node when rendering movement-related effects.
     * @type {SCNMovabilityHint}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1690499-movabilityhint
     */
    this.movabilityHint = null


    // Managing the Node Hierarchy

    /**
     * The node’s parent in the scene graph hierarchy.
     * @type {?SCNNode}
     * @access private
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407968-parent
     */
    this._parent = null

    /**
     * An array of the node’s children in the scene graph hierarchy.
     * @type {SCNNode[]}
     * @access private
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407984-childnodes
     */
    this._childNodes = []

    // Customizing Node Rendering

    /**
     * An array of Core Image filters to be applied to the rendered contents of the node.
     * @type {?CIFilter[]}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407949-filters
     */
    this.filters = null

    /**
     * An object responsible for rendering custom contents for the node using Metal or OpenGL.
     * @type {?SCNNodeRendererDelegate}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408012-rendererdelegate
     */
    this.rendererDelegate = null


    // Adding Physics to a Node

    /**
     * The physics body associated with the node.
     * @type {?SCNPhysicsBody}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407988-physicsbody
     */
    this.physicsBody = null

    /**
     * The physics field associated with the node.
     * @type {?SCNPhysicsField}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408006-physicsfield
     */
    this.physicsField = null


    // Working With Particle Systems

    this._particleSystems = null

    // Working With Positional Audio

    this._audioPlayers = null

    ///////////////////
    // SCNActionable //
    ///////////////////

    // Inspecting a Node’s Running Actions
    this._hasActions = false
    this._actionKeys = null


    ///////////////////
    // SCNAnimatable //
    ///////////////////

    // Managing Animations

    this._animationKeys = null

    ///////////////////////
    // SCNBoundingVolume //
    ///////////////////////

    // Working with Bounding Volumes

    /**
     * The minimum and maximum corner points of the object’s bounding box.
     * @type {{min: SCNVector3, max: SCNVector3}}
     * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034705-boundingbox
     */
    this.boundingBox = null

    this._boundingSphere = null
  }

  /**
   * Constructor for JSExport compatibility
   * @access public
   * @constructor
   * @returns {SCNNode}
   */
  static node() {
    return new SCNNode()
  }

  /**
   * Constructor for JSExport compatibility
   * @access public
   * @constructor
   * @param {?SCNGeometry} [geometry] - The geometry to be attached.
   * @returns {SCNNode}
   */
  static nodeWithGeometry(geometry) {
    return new SCNNode(geometry)
  }

  // Working With Node Animation

  /**
   * A node object representing the state of the node as it currently appears onscreen.
   * @type {SCNNode}
   * @desc When you use implicit animation (see SCNTransaction) to change a node’s properties, those node properties are set immediately to their target values, even though the animated node content appears to transition from the old property values to the new. During the animation SceneKit maintains a copy of the node, called the presentation node, whose properties reflect the transitory values determined by any in-flight animations currently affecting the node. The presentation node’s properties provide a close approximation to the version of the node that is currently displayed. SceneKit also uses the presentation node when computing the results of explicit animations, physics, and constraints.Do not modify the properties of the presentation node. (Attempting to do so results in undefined behavior.) Instead, you use the presentation node to read current animation values—for example, to create a new animation starting at those values. The presentation node has no parent or child nodes. To access animated properties of related nodes, use the node’s own parent and childNodes properties and the presentation property of each related node.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408030-presentation
   */
  get presentation() {
    return this._presentation
  }

  // Managing the Node’s Transformation

  /**
   * The transformation applied to the node relative to its parent. Animatable.
   * @type {SCNMatrix4}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407964-transform
   */
  get transform() {
    // FIXME: it should return copy of _transform,
    //        but you should be able to change value with this statement:
    //          let node = new SCNNode()
    //          node.transform.m41 = 123
    //          console.log(node.transform.m41)   // '123'
    return this._transform
  }

  set transform(newValue) {
    this._transform = newValue


  }

  /**
   * The translation applied to the node. Animatable.
   * @type {SCNVector3}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408026-position
   */
  get position() {
    return new SCNVector3(this._transform.m41, this._transform.m42, this._transform.m43)
  }

  set position(newValue) {
    if(typeof newValue.x !== 'number'
      || typeof newValue.y !== 'number'
      || typeof newValue.z !== 'number'){
      throw 'error: SCNNode.position must have x, y, z value'
    }
    this._transform.m41 = newValue.x
    this._transform.m42 = newValue.y
    this._transform.m43 = newValue.z
  }

  /**
   * The world transform applied to the node.
   * @type {SCNMatrix4}
   * @desc A world transform is the node’s coordinate space transformation relative to the scene’s coordinate space. This transformation is the concatenation of the node’s transform property with that of its parent node, the parent’s parent, and so on up to the rootNode object of the scene.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407970-worldtransform
   */
  get worldTransform() {
    if(this._parent === null){
      return this.transform
    }
    //return SCNMatrix4Mult(this._parent.worldTransform, this._transform)
    return null
  }

  // Managing the Node Hierarchy

  /**
   * Adds a node to the node’s array of children.
   * @access public
   * @param {SCNNode} child - The node to be added.
   * @returns {void}
   * @desc Calling this method appends the node to the end of the childNodes array.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407974-addchildnode
   */
  addChildNode(child) {
    if(this._childNodes.indexOf(child) >= 0){
      return
    }
    child.removeFromParentNode()
    this._childNodes.push(child)
    child._parent = this
  }

  /**
   * Adds a node to the node’s array of children at a specified index.
   * @access public
   * @param {SCNNode} child - The node to be inserted.ImportantRaises an exception (invalidArgumentException) if child is nil.
   * @param {number} index - The position at which to insert the new child node.ImportantRaises an exception (rangeException) if index is greater than the number of elements in the node’s childNodes array.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407958-insertchildnode
   */
  insertChildNodeAt(child, index) {
    if(this._childNodes.indexOf(child) >= 0){
      return
    }
    child.removeFromParentNode()
    this._insertObjectInChildNodesAtIndex(child, index)
    this._parent = this
  }

  /**
   * Removes the node from its parent’s array of child nodes.
   * @access public
   * @returns {void}
   * @desc Removing nodes from the node hierarchy serves two purposes. Nodes own their contents (child nodes or attached lights, geometries, and other objects), so deallocating unneeded nodes can reduce memory usage. Additionally, SceneKit does more work at rendering time with a large, complex node hierarchy, so removing nodes whose contents you don’t need to display can improve rendering performance.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407991-removefromparentnode
   */
  removeFromParentNode() {
    const parentNode = this._parent
    if(parentNode === null){
      return
    }
    const index = parentNode._childNodes.indexOf(this)
    if(index < 0){
      return
    }
    this._removeObjectFromChildNodesAtIndex(index)
  }

  /**
   * Removes a child from the node’s array of children and inserts another node in its place. 
   * @access public
   * @param {SCNNode} oldChild - 
   * @param {SCNNode} newChild - 
   * @returns {void}
   * @desc If both the child and child2 nodes are children of the node, calling this method swaps their positions in the array. Note that removing a node from the node hierarchy may result in it being deallocated.Calling this method results in undefined behavior if the child parameter does not refer to a child of this node.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408002-replacechildnode
   */
  replaceChildNodeWith(oldChild, newChild) {
    const index = this._childNodes.indexOf(oldChild)
    if(index < 0){
      return
    }
    this._removeObjectFromChildNodesAtIndex(index)
    this._insertObjectInChildNodesAtIndex(newChild, index)
  }

  /**
   *
   * @access private
   * @param {number} index
   * @returns {void}
   */
  _removeObjectFromChildNodesAtIndex(index) {
    const arr = this._childNodes.splice(index, 1)
    if(arr.length === 0){
      return
    }
    const obj = arr[0]

    obj._parent = null
    obj._transformUpToDate = false
  }

  /**
   *
   * @access private
   * @param {SCNNode} object
   * @param {number} index
   * @returns {void}
   */
  _insertObjectInChildNodesAtIndex(object, index) {
    const length = this._childNodes.length
    if(index > length){
      throw `SCNNode.childNodes out of index: ${index} > ${length}`
    }
    this._childNodes.splice(index, 0, object)
  }

  /**
   * The node’s parent in the scene graph hierarchy.
   * @type {?SCNNode}
   * @desc For a scene’s rootNode object, the value of this property is nil.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407968-parent
   */
  get parent() {
    return this._parent
  }
  /**
   * An array of the node’s children in the scene graph hierarchy.
   * @type {SCNNode[]}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407984-childnodes
   */
  get childNodes() {
    return this._childNodes.slice(0)
  }

  // Searching the Node Hierarchy

  /**
   * Returns all nodes in the node’s child node subtree that satisfy the test applied by a block.
   * @access public
   * @param {function(child: SCNNode, stop: UnsafeMutablePointer<ObjCBool>): boolean} predicate - The block to apply to the node’s child and descendant nodes .The block takes two parameters:child The child node currently being searched. stop A reference to a Boolean value. Set *stop to true in the block to abort further processing of the child node subtree.The block returns a Boolean value indicating whether to include the child node in the search results array.
   * @returns {SCNNode[]} - 
   * @desc Use this method to search for nodes using a test you specify. For example, you can search for empty nodes using a block that returns YES for nodes whose light, camera, and geometry properties are all nil.SceneKit uses a recursive preorder traversal to search the child node subtree—that is, the block searches a node before it searches each of the node’s children, and it searches all children of a node before searching any of that node’s sibling nodes.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407982-childnodes
   */
  childNodesPassingTest(predicate) {
    let result = []
    return result
  }

  /**
   * Returns the first node in the node’s child node subtree with the specified name.
   * @access public
   * @param {string} name - The name of the node to search for.
   * @param {boolean} [recursively = true] - true to search the entire child node subtree, or false to search only the node’s immediate children.
   * @returns {?SCNNode} - 
   * @desc If the recursive parameter is true, SceneKit uses a preorder traversal to search the child node subtree—that is, the block searches a node before it searches each of the node’s children, and it searches all children of a node before searching any of that node’s sibling nodes. Otherwise, SceneKit searches only those nodes in the node’s childNodes array.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407951-childnode
   */
  childNodeWithNameRecursively(name, recursively = true) {
    for(let i=0; i<this._childNodes.length; i++){
      if(this._childNodes[i].name === name){
        return this._childNodes[i]
      }
      if(recursively){
        const result = this._childNodes[i].childNodeWithName(name, recursively)
        if(result !== null){
          return result
        }
      }
    }

    return null
  }

  /**
   * Returns the first node in the node’s child nodearray with the specified name.
   * @access public
   * @param {string} name - The name of the node to search for.
   * @returns {?SCNNode} - 
   * @desc SceneKit searches only those nodes in the node’s childNodes array.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407951-childnode
   */
  childNodeWithName(name) {
    return this.childNodeWithNameRecursively(name, false)
  }

  /**
   * Executes the specified block for each of the node’s child and descendant nodes.
   * @access public
   * @param {function(child: SCNNode, stop: UnsafeMutablePointer<ObjCBool>): void} block - The block to apply to the node’s child and descendant nodes.The block takes two parameters:childThe child node currently being evaluated.stopA reference to a Boolean value. Set *stop to true in the block to abort further processing of the child node subtree.
   * @returns {void}
   * @desc SceneKit uses a recursive preorder traversal to process the child node subtree—that is, the block runs for a node before it runs for each of the node’s children, and it processes all children of a node before processing any of that node’s sibling nodes.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408032-enumeratechildnodes
   */
  enumerateChildNodes(block) {
  }

  /**
   * Executes the specified block for each of the node’s child and descendant nodes, as well as for the node itself.
   * @access public
   * @param {function(arg1: SCNNode, arg2: UnsafeMutablePointer<ObjCBool>): void} block - The block to apply to the node’s child and descendant nodes.The block takes two parameters:childThe child node currently being evaluated.stopA reference to a Boolean value. Set *stop to true in the block to abort further processing of the child node subtree.
   * @returns {void}
   * @desc SceneKit uses a recursive preorder traversal to process the child node subtree—that is, the block runs for a node before it runs for each of the node’s children, and it processes all children of a node before processing any of that node’s sibling nodes.This method is equivalent to the enumerateChildNodes(_:) method, but unlike that method it also runs the block to process the node itself, not just its child nodes.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1642248-enumeratehierarchy
   */
  enumerateHierarchy(block) {
  }

  // Working With Particle Systems

  /**
   * Attaches a particle system to the node.
   * @access public
   * @param {SCNParticleSystem} system - A particle system.
   * @returns {void}
   * @desc When attached to a node, a particle system’s emitter location follows that node as it moves through the scene. To instead attach a particle system to a location in the scene’s world coordinate space, use the corresponding method on SCNScene.For details on particle systems, see SCNParticleSystem.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1523123-addparticlesystem
   */
  addParticleSystem(system) {
  }

  /**
   * Removes a particle system attached to the node.
   * @access public
   * @param {SCNParticleSystem} system - A particle system.
   * @returns {void}
   * @desc This method has no effect if the system parameter does not reference a particle system directly attached to the node.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1524014-removeparticlesystem
   */
  removeParticleSystem(system) {
  }

  /**
   * Removes any particle systems directly attached to the node.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1522801-removeallparticlesystems
   */
  removeAllParticleSystems() {
  }
  /**
   * The particle systems attached to the node.
   * @type {?SCNParticleSystem[]}
   * @desc An array of SCNParticleSystem objects directly attached to the node. This array does not include particle systems attached to the node’s child nodes.For details on particle systems, see SCNParticleSystem.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1522705-particlesystems
   */
  get particleSystems() {
    return this._particleSystems
  }

  // Working With Positional Audio

  /**
   * Adds the specified auto player to the node and begins playback.
   * @access public
   * @param {SCNAudioPlayer} player - An audio player object.
   * @returns {void}
   * @desc Positional audio effects from a player attached to a node are based on that node’s position relative to the audioListener position in the scene.After playback has completed, SceneKit automatically removes the audio player from the node.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1523464-addaudioplayer
   */
  addAudioPlayer(player) {
  }

  /**
   * Removes the specified audio player from the node, stopping playback.
   * @access public
   * @param {SCNAudioPlayer} player - An audio player attached to the node.
   * @returns {void}
   * @desc This method has no effect if the player parameter does not reference an audio player directly attached to the node.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1522767-removeaudioplayer
   */
  removeAudioPlayer(player) {
  }

  /**
   * Removes all audio players attached to the node, stopping playback.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1523570-removeallaudioplayers
   */
  removeAllAudioPlayers() {
  }
  /**
   * The audio players currently attached to the node.
   * @type {SCNAudioPlayer[]}
   * @desc Positional audio effects from a player attached to a node are based on that node’s position relative to the audioListener position in the scene.After an audio player completes playback, SceneKit automatically removes it from the node. Therefore, this array always contains audio players that are currently playing back audio.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1523244-audioplayers
   */
  get audioPlayers() {
    return this._audioPlayers
  }

  // Copying a Node

  /**
   * Creates a copy of the node and its children.
   * @access public
   * @returns {SCNNode} - 
   * @desc This method recursively copies the node and its child nodes. For a nonrecursive copy, use the inherited copy() method, which creates a copy of the node without any child nodes.Cloning or copying a node creates a duplicate of the node object, but not the geometries, lights, cameras, and other SceneKit objects attached to it—instead, each copied node shares references to these objects.This behavior means that you can use cloning to, for example, place the same geometry at several locations within a scene without  maintaining multiple copies of the geometry and its materials. However, it also means that changes to the objects attached to one node will affect other nodes that share the same attachments. For example, to render two copies of a node using different materials, you must copy both the node and its geometry before assigning a new material.- (void)duplicateNode:(SCNNode *)node withMaterial:(SCNMaterial *)material
{
    SCNNode *newNode = [node clone];
    newNode.geometry = [node.geometry copy];
    newNode.geometry.firstMaterial = material;
}
Multiple copies of an SCNGeometry object efficiently share the same vertex data, so you can copy geometries without a significant performance penalty.- (void)duplicateNode:(SCNNode *)node withMaterial:(SCNMaterial *)material
{
    SCNNode *newNode = [node clone];
    newNode.geometry = [node.geometry copy];
    newNode.geometry.firstMaterial = material;
}

   * @see https://developer.apple.com/reference/scenekit/scnnode/1408046-clone
   */
  clone() {
    return null
  }

  /**
   * Creates an optimized copy of the node and its children.
   * @access public
   * @returns {SCNNode} - 
   * @desc Rendering complex node hierarchies can incur a performance cost. Each geometry and material requires a separate draw command to be sent to the GPU, and each draw command comes with a performance overhead. If you plan for a portion of your scene’s node hierarchy to remain static (with respect to itself, if not the rest of the scene), use this method to create a single node containing all elements of that node hierarchy that SceneKit can render using fewer draw commands.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407960-flattenedclone
   */
  flattenedClone() {
    return null
  }

  // Hit-Testing

  /**
   * Searches the node’s child node subtree for objects intersecting a line segment between two specified points.
   * @access public
   * @param {SCNVector3} pointA - An endpoint of the line segment to search along, specified in the node’s local coordinate system.
   * @param {SCNVector3} pointB - The other endpoint of the line segment to search along, specified in the node’s local coordinate system.
   * @param {?Map<string, Object>} [options = null] - A dictionary of options affecting the search. See Hit Testing Options Keys for acceptable values.
   * @returns {SCNHitTestResult[]} - 
   * @desc Hit-testing is the process of finding elements of a scene located along a specified line segment in the scene’s coordinate space (or that of a particular node in the scene). For example, you can use this method to determine whether a projectile launched by a game character will hit its target.To search for the scene element corresponding to a two-dimensional point in the rendered image, use the renderer’s hitTest(_:options:) method instead.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407998-hittestwithsegment
   */
  hitTestWithSegmentFromTo(pointA, pointB, options = null) {
    return null
  }

  // Converting Between Node Coordinate Spaces

  /**
   * Converts a position to the node’s coordinate space from that defined by another node.
   * @access public
   * @param {SCNVector3} position - A position in the local coordinate space defined by the other node.
   * @param {?SCNNode} node - Another node in the same scene graph as the node, or nil to convert from the scene’s world coordinate space.
   * @returns {SCNVector3} - 
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408018-convertposition
   */
  convertPositionFrom(position, node) {
    return null
  }

  /**
   * Converts a position from the node’s coordinate space to that defined by another node.
   * @access public
   * @param {SCNVector3} position - A position in the node’s local coordinate space.
   * @param {?SCNNode} node - Another node in the same scene graph as the node, or nil to convert to the scene’s world coordinate space.
   * @returns {SCNVector3} - 
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407990-convertposition
   */
  convertPositionTo(position, node) {
    return null
  }

  /**
   * Converts a transformation to the node’s coordinate space from that defined by another node.
   * @access public
   * @param {SCNMatrix4} transform - A transformation relative to the local coordinate space defined by the other node.
   * @param {?SCNNode} node - Another node in the same scene graph as the node, or nil to convert from the scene’s world coordinate space.
   * @returns {SCNMatrix4} - 
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407996-converttransform
   */
  convertTransformFrom(transform, node) {
    return null
  }

  /**
   * Converts a transformation from the node’s coordinate space to that defined by another node.
   * @access public
   * @param {SCNMatrix4} transform - A transformation relative to the node’s coordinate space.
   * @param {?SCNNode} node - Another node in the same scene graph as the node, or nil to convert to the scene’s world coordinate space.
   * @returns {SCNMatrix4} - 
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407986-converttransform
   */
  convertTransformTo(transform, node) {
    return null
  }

  ///////////////////
  // SCNActionable //
  ///////////////////

  // Running Actions

  /**
   * Required. Adds an action to the list of actions executed by the node.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @returns {void}
   * @desc SceneKit begins running a newly added action when it prepares to render the next frame.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523164-runaction
   */
  runAction(action) {
  }

  /**
   * Required. Adds an action to the list of actions executed by the node. SceneKit calls the specified block when the action completes.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @param {?function(): void} [block = null] - A completion block that SceneKit calls when the action completes.
   * @returns {void}
   * @desc The new action is processed the next time SceneKit prepares to render a frame.SceneKit calls your block after the action’s duration is complete. For example, in a game you could use this method to show a Game Over message after performing a fade-out action on a node that displays a player character.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1524219-runaction
   */
  runActionCompletionHandler(action, block = null) {
  }

  /**
   * Required. Adds an identifiable action to the list of actions executed by the node.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @param {?string} key - A unique key used to identify the action.
   * @returns {void}
   * @desc This method is identical to runAction(_:), but the action is stored and identified so that you can retrieve or cancel it later. If an action using the same key is already running, SceneKit removes it before adding the new action.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1524222-runaction
   */
  runActionForKey(action, key) {
  }

  /**
   * Required. Adds an identifiable action to the list of actions executed by the node. SceneKit calls the specified block when the action completes.
   * @access public
   * @param {SCNAction} action - The action to be performed.
   * @param {?string} key - A unique key used to identify the action.
   * @param {?function(): void} [block = null] - A completion block called when the action completes.
   * @returns {void}
   * @desc This method is identical to runAction(_:completionHandler:), but the action is stored and identified so that you can retrieve or cancel it later. If an action using the same key is already running, SceneKit removes it before adding the new action.SceneKit calls your block after the action’s duration is complete. For example, you can use this method with a wait action to execute some code after a timed delay. If during the delay period you need to prevent the code from running, use the removeAction(forKey:) method to cancel it.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1522791-runaction
   */
  runActionForKeyCompletionHandler(action, key, block = null) {
  }

  // Inspecting a Node’s Running Actions

  /**
   * Required. Returns an action associated with a specific key.
   * @access public
   * @param {string} key - A string that uniquely identifies a action.
   * @returns {?SCNAction} - 
   * @desc Use this method to retrieve actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523287-action
   */
  actionForKey(key) {
    return null
  }
  /**
   * Required. A Boolean value that indicates whether the node is currently executing any actions.
   * @type {boolean}
   * @desc This value is true if the node has any executing actions; otherwise the value is false.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523794-hasactions
   */
  get hasActions() {
    return this._hasActions
  }
  /**
   * Required. The list of keys for which the node has attached actions.
   * @type {string[]}
   * @desc Use this property to list actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523036-actionkeys
   */
  get actionKeys() {
    return this._actionKeys
  }

  // Canceling a Node’s Running Actions

  /**
   * Required. Removes an action associated with a specific key.
   * @access public
   * @param {string} key - A string that uniquely identifies a action.
   * @returns {void}
   * @desc If the node is currently running an action that matches the key, SceneKit removes that action from the node, skipping any remaining animation it would perform but keeping any changes already made to the node.Use this method to cancel actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523617-removeaction
   */
  removeActionForKey(key) {
  }

  /**
   * Required. Ends and removes all actions from the node.
   * @access public
   * @returns {void}
   * @desc When SceneKit removes an action from a node, it skips any remaining animation the action would perform. However, any changes the action has already made to the node’s state remain in effect.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1524181-removeallactions
   */
  removeAllActions() {
  }

  ///////////////////
  // SCNAnimatable //
  ///////////////////

  // Managing Animations

  /**
   * Required. Adds an animation object for the specified key.
   * @access public
   * @param {CAAnimation} animation - The animation object to be added.
   * @param {?string} key - An string identifying the animation for later retrieval. You may pass nil if you don’t need to reference the animation later.
   * @returns {void}
   * @desc Newly added animations begin executing after the current run loop cycle ends.SceneKit does not define any requirements for the contents of the key parameter—it need only be unique among the keys for other animations you add. If you add an animation with an existing key, this method overwrites the existing animation.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523386-addanimation
   */
  addAnimationForKey(animation, key) {
  }

  /**
   * Required. Returns the animation with the specified key.
   * @access public
   * @param {string} key - A string identifying a previously added animation.
   * @returns {?CAAnimation} - 
   * @desc Attempting to modify any properties of the returned object results in undefined behavior.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1524020-animation
   */
  animationForKey(key) {
    return null
  }

  /**
   * Required. Removes all the animations currently attached to the object.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522762-removeallanimations
   */
  removeAllAnimations() {
  }

  /**
   * Required. Removes the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522880-removeanimation
   */
  removeAnimationForKey(key) {
  }

  /**
   * Required. Removes the animation attached to the object with the specified key, smoothly transitioning out of the animation’s effect.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @param {number} duration - The duration for transitioning out of the animation’s effect before it is removed.
   * @returns {void}
   * @desc Use this method to create smooth transitions between the effects of multiple animations. For example, the geometry loaded from a scene file for a game character may have associated animations for player actions such as walking and jumping. When the player lands from a jump, you remove the jump animation so the character continues walking. If you use the removeAnimation(forKey:) method to remove the jump animation, SceneKit abruptly switches from the current frame of the jump animation to the current frame of the walk animation. If you use the removeAnimation(forKey:fadeOutDuration:) method instead, SceneKit plays both animations at once during that duration and interpolates vertex positions from one animation to the other, creating a smooth transition.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522841-removeanimation
   */
   
  removeAnimationForKeyFadeOutDuration(key, duration) {
  }

  /**
   * Required. An array containing the keys of all animations currently attached to the object.
   * @type {string[]}
   * @desc This array contains all keys for which animations are attached to the object, or is empty if there are no attached animations. The ordering of animation keys in the array is arbitrary.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523610-animationkeys
   */
  get animationKeys() {
    return this._animationKeys
  }

  // Pausing and Resuming Animations

  /**
   * Required. Pauses the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523592-pauseanimation
   */
  pauseAnimationForKey(key) {
  }

  /**
   * Required. Resumes a previously paused animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key or if the specified animation is not currently paused.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523332-resumeanimation
   */
  resumeAnimationForKey(key) {
  }

  /**
   * Required. Returns a Boolean value indicating whether the animation attached to the object with the specified key is paused.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523703-isanimationpaused
   */
  isAnimationPausedForKey(key) {
    return false
  }

  // Instance Methods

  /**
   * Required. 
   * @access public
   * @param {number} speed - 
   * @param {string} key - 
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1778343-setanimationspeed
   */
  setAnimationSpeedForKey(speed, key) {
  }

  ///////////////////////
  // SCNBoundingVolume //
  ///////////////////////

  // Working with Bounding Volumes

  /**
   * The center point and radius of the object’s bounding sphere.
   * @type {{center: SCNVector3, radius: number}}
   * @desc Scene Kit defines a bounding sphere in the local coordinate space using a center point and a radius. For example, if a node’s bounding sphere has the center point {3, 1, 4} and radius 2.0, all points in the vertex data of node’s geometry (and any geometry attached to its child nodes) lie within 2.0 units of the center point.The coordinates provided when reading this property are valid only if the object has a volume to be measured. For a geometry containing no vertex data or a node containing no geometry (and whose child nodes, if any, contain no geometry), the values center and radius are both zero.
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034707-boundingsphere
   */
  get boundingSphere() {
    return this._boundingSphere
  }
}
