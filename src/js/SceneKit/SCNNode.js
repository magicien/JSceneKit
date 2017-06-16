'use strict'

import CAAnimationGroup from '../QuartzCore/CAAnimationGroup'
import CABasicAnimation from '../QuartzCore/CABasicAnimation'
import CAMediaTimingFunction from '../QuartzCore/CAMediaTimingFunction'
import CAKeyframeAnimation from '../QuartzCore/CAKeyframeAnimation'
import NSObject from '../ObjectiveC/NSObject'
import SCNActionable from './SCNActionable'
import SCNAnimatable from './SCNAnimatable'
import SCNBoundingVolume from './SCNBoundingVolume'
import SCNGeometry from './SCNGeometry'
import SCNGeometrySource from './SCNGeometrySource'
import SCNLight from './SCNLight'
import SCNCamera from './SCNCamera'
import SCNMorpher from './SCNMorpher'
import SCNSkinner from './SCNSkinner'
import SCNMatrix4 from './SCNMatrix4'
import SCNMatrix4MakeScale from './SCNMatrix4MakeScale'
import SCNMatrix4MakeTranslation from './SCNMatrix4MakeTranslation'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNQuaternion from './SCNQuaternion'
import SCNConstraint from './SCNConstraint'
import SCNMovabilityHint from './SCNMovabilityHint'
import SCNNodeRendererDelegate from './SCNNodeRendererDelegate'
import SCNOrderedDictionary from './SCNOrderedDictionary'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNPhysicsField from './SCNPhysicsField'
import SCNParticleSystem from './SCNParticleSystem'
import SCNTransaction from './SCNTransaction'
import SCNAudioPlayer from './SCNAudioPlayer'
import SCNHitTestResult from './SCNHitTestResult'
import SKColor from '../SpriteKit/SKColor'
import * as Constants from '../constants'
/*global Ammo*/


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
  static get _propTypes() {
    return {
      name: 'string',
      light: 'SCNLight',
      camera: 'SCNCamera',
      geometry: ['SCNGeometry', (obj, value) => {
        obj.geometry = value
        obj.boundingBox = value.boundingBox
      }],
      morpher: 'SCNMorpher',
      skinner: 'SCNSkinner',
      categoryBitMask: 'integer',
      paused: ['boolean', 'isPaused'],
      position: ['SCNVector3', '_position'],
      rotation: ['SCNVector4', '_rotation'],
      scale: ['SCNVector3', '_scale'],
      hidden: ['boolean', 'isHidden'],
      opacity: 'float',
      renderingOrder: 'integer',
      castsShadow: 'boolean',
      childNodes: ['NSArray', (obj, childNodes) => {
        childNodes.forEach((child) => {
          obj.addChildNode(child)
        })
      }],
      physicsBody: ['SCNPhysicsBody', (obj, body) => {
        obj.physicsBody = body
      }],
      physicsField: 'SCNPhysicsField',
      particleSystem: ['NSArray', '_particleSystems'],
      'animation-keys': ['NSArray', null],
      animations: ['NSMutableDictionary', (obj, anims) => {
        this._loadAnimationArray(obj, anims)
      }],
      'action-keys': ['NSArray', null],
      actions: ['NSMutableDictionary', (obj, acts) => {
        this._loadActionArray(obj, acts)
      }],
      eulerAngles: ['SCNVector3', (obj, value) => {
        obj.eulerAngles = value
      }],
      movabilityHint: 'integer',

      clientAttributes: ['NSMutableDictionary', null],
      nodeID: ['string', '_nodeID'],
      entityID: ['string', '_entityID']
    }
  }

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
    this._geometry = geometry

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

    this._worldTransform = new SCNMatrix4()

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
    this._position = new SCNVector3(0, 0, 0)

    /**
     * The node’s orientation, expressed as a rotation angle about an axis. Animatable.
     * @type {SCNVector4}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408034-rotation
     */
    this._rotation = new SCNVector4(1, 0, 0, 0)

    /**
     * The node’s orientation, expressed as pitch, yaw, and roll angles, each in radians. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1407980-eulerangles
     */
    //this.eulerAngles = null

    /**
     * The node’s orientation, expressed as a quaternion. Animatable.
     * @type {SCNQuaternion}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408048-orientation
     */
    //this.orientation = null

    /**
     * The scale factor applied to the node. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408050-scale
     */
    this._scale = new SCNVector3(1, 1, 1)

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
    this.opacity = 1

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
    this.movabilityHint = SCNMovabilityHint.fixed


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
    this._physicsBody = null

    /**
     * The physics field associated with the node.
     * @type {?SCNPhysicsField}
     * @see https://developer.apple.com/reference/scenekit/scnnode/1408006-physicsfield
     */
    this.physicsField = null


    // Working With Particle Systems

    this._particleSystems = null

    // Working With Positional Audio

    this._audioPlayers = []

    ///////////////////
    // SCNActionable //
    ///////////////////

    // Inspecting a Node’s Running Action
    //this._hasActions = false

    /**
     * @access private
     * @type {Map}
     */
    this._actions = new Map()


    ///////////////////
    // SCNAnimatable //
    ///////////////////

    /**
     * @access private
     * @type {SCNOrderedDictionary}
     */
    this._animations = new SCNOrderedDictionary()

    ///////////////////////
    // SCNBoundingVolume //
    ///////////////////////

    // Working with Bounding Volumes

    /**
     * The minimum and maximum corner points of the object’s bounding box.
     * @type {{min: SCNVector3, max: SCNVector3}}
     * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034705-boundingbox
     */
    this._boundingBox = null
    this._fixedBoundingBox = null

    //this._boundingSphere = null


    /**
     * @access private
     * @type {?string}
     */
    this._entityID = null

    /**
     * @access private
     * @type {?string}
     */
    this._nodeID = null

    this._updateBoundingBox()

    /**
     * @access private
     * @type {Promise}
     */
    this._loadedPromise = null
  }

  static _loadAnimationArray(node, animations) {
    //console.log('_loadAnimationArray start')
    for(const animName of Object.keys(animations)){
      const data = animations[animName]
      const animation = this._loadAnimationData(data, animName)
      node.addAnimationForKey(animation, animName)
    }
    //console.log('_loadAnimationArray done')
  }

  static _loadAnimationData(data, key) {
    //console.log(`_loadAnimationData ${key} start`)
    if(data.class === 'group'){
      return this._loadAnimationGroup(data)
    }else if(data.class === 'keyframe'){
      return this._loadKeyframeAnimation(data.animation, key)
    }else if(data.class === 'basic'){
      const keyPath = data.keyPath || key
      return this._loadBasicAnimation(data.animation, keyPath)
    }else if(data.type === 'keyframedAnimation'){
      return this._loadKeyframeAnimation(data, key)
    }

    //console.error(`unknown animation class: ${data.class}, type: ${data.type}, key: ${key}`)
    throw new Error(`unknown animation class: ${data.class}, type: ${data.type}, key: ${key}`)
  }

  static _loadAnimationGroup(animation) {
    //console.log('_loadAnimationGroup start')
    const group = new CAAnimationGroup()
    const data = animation.animation
    group.isRemovedOnCompletion = !!animation.removeOnCompletion
    // group.timingFunction
    // group.delegate
    group.usesSceneTimeBase = !!animation.usesSceneTimeBase
    group.fadeInDuration = data.fadeInDuration
    group.fadeOutDuration = data.fadeOutDuration
    group.beginTime = data.beginTime
    group.timeOffset = data.timeOffset
    group.repeatCount = data.repeatCount
    // group.repeatDuration
    group.duration = data.duration
    group.speed = data.speed
    group.autoreverses = data.autoreverses
    const fillMode = [
      Constants.kCAFillModeRemoved,
      Constants.kCAFillModeForwards,
      Constants.kCAFillModeBackwards,
      Constants.kCAFillModeBoth
    ]
    group.fillMode = fillMode[data.fillModeMask]
    // data.cumulative
    // data.additive
    // data.attributes
    data.channels.forEach((channel) => {
      const keyPath = channel.targetPath.join('.')
      //console.error(`SCNNode animation group keyPath: ${keyPath}`)
      const chAnim = this._loadAnimationData(channel.animation, keyPath)
      group.animations.push(chAnim)
    })
    //console.log('_loadAnimationGroup done')

    return group
  }

  static _loadKeyframeAnimation(data, keyPath) {
    //console.log(`_loadKeyframeAnimation ${keyPath} start`)
    const anim = new CAKeyframeAnimation(keyPath)

    anim.isRemovedOnCompletion = !!data.removeOnCompletion
    // anim.timingFunction
    // anim.delegate
    anim.usesSceneTimeBase = !!data.sceneTimeBased
    anim.fadeInDuration = data.fadeInDuration
    anim.fadeOutDuration = data.fadeOutDuration
    anim.beginTime = data.beginTime
    anim.timeOffset = data.timeOffset
    anim.repeatCount = data.repeatCount
    // anim.repeatDuration
    anim.duration = data.duration
    anim.speed = data.speed
    anim.autoreverses = data.autoreverses
    const fillMode = [
      Constants.kCAFillModeRemoved,
      Constants.kCAFillModeForwards,
      Constants.kCAFillModeBackwards,
      Constants.kCAFillModeBoth
    ]
    anim.fillMode = fillMode[data.fillModeMask]
    anim.isCumulative = !!data.cumulative
    anim.isAdditive = !!data.additive
    // data.attributes

    const keyframe = data.keyframeController
    anim.values = this._loadData(keyframe, 'values')
    //anim.path
    anim.keyTimes = this._loadData(keyframe, 'keytimes')
    switch(keyframe.interpolationMode){
      case 0:
      default:
        //anim.timingFunctions =
        break
    }
    anim.keyTimes = anim.keyTimes.map((keyTime) => { return keyTime / anim.duration })

    const calculationModes = [
      Constants.kCAAnimationLinear,
      Constants.kCAAnimationDiscrete,
      Constants.kCAAnimationPaced,
      Constants.kCAAnimationCubic,
      Constants.kCAAnimationCubicPaced
    ]
    anim.calculationMode = calculationModes[keyframe.calculationMode]
    //anim.rotationMode
    //anim.tensionValues
    //anim.continuityValues
    //anim.biasValues

    //console.log(`_loadKeyframeAnimation ${keyPath} done`)

    return anim
  }

  static _loadBasicAnimation(data, keyPath) {
    //console.log(`_loadBasicAnimation ${keyPath} start`)
    const anim = new CABasicAnimation(keyPath)

    anim.isRemovedOnCompletion = !!data.removeOnCompletion
    anim.timingFunction = new CAMediaTimingFunction(
      data.timingFunction.c0,
      data.timingFunction.c1,
      data.timingFunction.c2,
      data.timingFunction.c3
    )
    // anim.delegate
    anim.usesSceneTimeBase = !!data.sceneTimeBased
    anim.fadeInDuration = data.fadeInDuration
    anim.fadeOutDuration = data.fadeOutDuration
    anim.beginTime = data.beginTime
    anim.timeOffset = data.timeOffset
    anim.repeatCount = data.repeatCount
    // anim.repeatDuration
    anim.duration = data.duration
    anim.speed = data.speed
    anim.autoreverses = data.autoreverses
    const fillMode = [
      Constants.kCAFillModeRemoved,
      Constants.kCAFillModeForwards,
      Constants.kCAFillModeBackwards,
      Constants.kCAFillModeBoth
    ]
    anim.fillMode = fillMode[data.fillModeMask]
    anim.isCumulative = !!data.cumulative
    anim.isAdditive = !!data.additive
    // data.attributes
    // data.baseType

    //console.log(`_loadBasicAnimation ${keyPath} done`)

    return anim
  }

  static _loadActionArray(node, actions) {
    //console.log('_loadActionArray start')
    for(const actName of Object.keys(actions)){
      const data = actions[actName]
      //const action = this._loadActionData(data, actName)
      //node.runActionForKey(action, actName)
      node.runActionForKey(data, actName)
    }
    //console.log('_loadAnimationArray done')
  }

  //static _loadActionData(data, key) {
  //  console.log(`_loadActionData ${key} start`)
  //}

  static _loadData(data, key) {
    //console.log(`_loadData ${key} start`)

    const accessor = data[key].accessor
    const components = accessor.componentsPerValue
    const stride = accessor.stride
    const offset = accessor.offset
    const typeId = accessor.sourceTypeID
    const padding = accessor.padding
    const count = accessor.valuesCount

    const sourceKey = `${key}-data`
    const source = data[sourceKey]

    const result = []
    let pos = offset
    if(accessor.componentsType === 1){
      for(let i=0; i<count; i++){
        result.push(source.readFloatBE(pos))
        pos += stride
      }
    }else if(accessor.componentsType === 6){
      for(let i=0; i<count; i++){
        result.push(source.readDoubleBE(pos))
        pos += stride
      }
    }else if(accessor.componentsType === 9){
      for(let i=0; i<count; i++){
        result.push(SCNVector3._initWithData(source, pos, true))
        pos += stride
      }
    }else if(accessor.componentsType === 10){
      for(let i=0; i<count; i++){
        result.push(SCNVector4._initWithData(source, pos, true))
        pos += stride
      }
    }else if(accessor.componentsType === 13){
      for(let i=0; i<count; i++){
        result.push(SKColor._initWithData(source, pos, true))
        pos += stride
      }
    }else{
      console.error(`unknown accessor componentsType: ${accessor.componentsType}`)
    }

    //console.log(`_loadData ${key} done`)

    return result
  }

  /**
   * Constructor for JSExport compatibility
   * @access public
   * @returns {SCNNode} -
   */
  static node() {
    return new SCNNode()
  }

  /**
   * Constructor for JSExport compatibility
   * @access public
   * @param {?SCNGeometry} [geometry] - The geometry to be attached.
   * @returns {SCNNode} -
   */
  static nodeWithGeometry(geometry) {
    return new SCNNode(geometry)
  }

  // Managing Node Attributes
  get geometry() {
    return this._geometry
  }
  set geometry(newValue) {
    this._geometry = newValue
    this._updateBoundingBox()
  }

  // Working With Node Animation

  /**
   * A node object representing the state of the node as it currently appears onscreen.
   * @type {SCNNode}
   * @desc When you use implicit animation (see SCNTransaction) to change a node’s properties, those node properties are set immediately to their target values, even though the animated node content appears to transition from the old property values to the new. During the animation SceneKit maintains a copy of the node, called the presentation node, whose properties reflect the transitory values determined by any in-flight animations currently affecting the node. The presentation node’s properties provide a close approximation to the version of the node that is currently displayed. SceneKit also uses the presentation node when computing the results of explicit animations, physics, and constraints.Do not modify the properties of the presentation node. (Attempting to do so results in undefined behavior.) Instead, you use the presentation node to read current animation values—for example, to create a new animation starting at those values. The presentation node has no parent or child nodes. To access animated properties of related nodes, use the node’s own parent and childNodes properties and the presentation property of each related node.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408030-presentation
   */
  get presentation() {
    if(this._presentation === null){
      return null
    }

    return this._presentation
  }

  // Managing the Node’s Transformation

  /**
   * The transformation applied to the node relative to its parent. Animatable.
   * @type {SCNMatrix4}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407964-transform
   */
  get transform() {
    // FIXME: it should return the copy of _transform,
    //        but you should be able to change value with this statement:
    //          let node = new SCNNode()
    //          node.transform.m14 = 123
    //          console.log(node.transform.m14)   // '123'
    if(!this._transformUpToDate){
      this._updateTransform()
    }
    return this._transform
  }
  set transform(newValue) {
    this._transform = newValue
    // TODO: update position, rotation, scale
    this._position = this._transform.getTranslation()
    this._rotation = this._transform.getRotation()
    this._scale = this._transform.getScale()
    this._transformUpToDate = true
  }

  /**
   * The world transform applied to the node.
   * @type {SCNMatrix4}
   * @desc A world transform is the node’s coordinate space transformation relative to the scene’s coordinate space. This transformation is the concatenation of the node’s transform property with that of its parent node, the parent’s parent, and so on up to the rootNode object of the scene.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407970-worldtransform
   */
  get worldTransform() {
    /*
    if(this._parent === null){
      if(this._isPresentationInstance){
        return this._worldTransform
      }
      return this.transform
    }
    return this.transform.mult(this._parent.worldTransform)
    */
    return this._worldTransform
  }

  _updateWorldTransform() {
    let p = null
    if(this._parent === null){
      p = SCNMatrix4MakeTranslation(0, 0, 0)
    }else{
      p = this._parent._worldTransform
    }
    this._worldTransform = this.transform.mult(p)

    if(this._presentation){
      let pp = null
      if(this._parent === null){
        pp = SCNMatrix4MakeTranslation(0, 0, 0)
      }else if(this._parent._presentation === null){
        pp = this._parent._worldTransform
      }else{
        pp = this._parent._presentation._worldTransform
      }
      this._presentation._updateTransform()
      this._presentation._worldTransform = this._presentation.transform.mult(pp)
    }

    this._childNodes.forEach((child) => {
      child._updateWorldTransform()
    })
  }

  /*
  _updatePresentationTransform() {
    let p = null
    if(this._parent === null){
      p = SCNMatrix4MakeTranslation(0, 0, 0)
    }else{
      p = this._parent._presentation._worldTransform
    }
    
    this._presentation._worldTransform = this._presentation.transform.mult(parentTransform)
    this._childNodes.forEach((child) => {
      child._updatePrsentationTransform(this._presentation._worldTransform)
    })
  }
  */

  /**
   * The translation applied to the node. Animatable.
   * @type {SCNVector3}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408026-position
   */
  get position() {
    return this._position
  }
  set position(newValue) {
    if(typeof newValue.x !== 'number'
      || typeof newValue.y !== 'number'
      || typeof newValue.z !== 'number'){
      throw new Error('error: SCNNode.position must have x, y, z values')
    }
    this._position.x = newValue.x
    this._position.y = newValue.y
    this._position.z = newValue.z
    this._transformUpToDate = false
    this._updateWorldTransform()
  }

  get rotation() {
    return this._rotation
  }
  set rotation(newValue) {
    if(typeof newValue.x !== 'number'
      || typeof newValue.y !== 'number'
      || typeof newValue.z !== 'number'
      || typeof newValue.w !== 'number'){
      throw new Error('error: SCNNode.rotation must have x, y, z, w values')
    }
    const oldValue = this._rotation._copy()
    this._rotation.x = newValue.x
    this._rotation.y = newValue.y
    this._rotation.z = newValue.z
    this._rotation.w = newValue.w
    this._transformUpToDate = false
    this._updateWorldTransform()
    SCNTransaction._addChange(this, 'rotation', oldValue, newValue)
  }

  get scale() {
    return this._scale
  }
  set scale(newValue) {
    if(typeof newValue.x !== 'number'
      || typeof newValue.y !== 'number'
      || typeof newValue.z !== 'number'){
      throw new Error('error: SCNNode.scale must have x, y, z values')
    }
    this._scale.x = newValue.x
    this._scale.y = newValue.y
    this._scale.z = newValue.z
    this._transformUpToDate = false
    this._updateWorldTransform()
  }

  /**
   * The node’s orientation, expressed as pitch, yaw, and roll angles, each in radians. Animatable.
   * @type {SCNVector3}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407980-eulerangles
   */
  get eulerAngles() {
    /*
    const rot = this._rotation
    const euler = new SCNVector3()
    const sinW = Math.sin(rot.w)
    const cosWR = 1.0 - Math.cos(rot.w)
    const len2 = rot.x * rot.x + rot.y * rot.y + rot.z * rot.z
    if(len2 === 0){
      return euler
    }
    const r = 1.0 / Math.sqrt(len2)
    const x = rot.x * r
    const y = rot.y * r
    const z = rot.z * r
    const s = y * sinW - x * z * cosWR

    if(s > 0.998){
      // TODO: check SceneKit implementation
      euler.x = 0
      euler.y = -Math.PI * 0.5
      euler.z = -2.0 * Math.atan2(z * Math.sin(rot.w * 0.5), Math.cos(rot.w * 0.5))
    }else if(s < -0.998){
      // TODO: check SceneKit implementation
      euler.x = 0
      euler.y = Math.PI * 0.5
      euler.z = 2.0 * Math.atan2(z * Math.sin(rot.w * 0.5), Math.cos(rot.w * 0.5))
    }else{
      euler.x = Math.atan2(x * sinW + y * z * cosWR, 1 - (y * y + x * x) * cosWR)
      euler.y = Math.asin(s)
      euler.z = Math.atan2(z * sinW + x * y * cosWR, 1 - (z * z + y * y) * cosWR)
    }

    return euler
    */
    return this._rotation.rotationToEulerAngles()
  }
  set eulerAngles(newValue) {
    /*
    const halfX = newValue.x * 0.5
    const halfY = newValue.y * 0.5
    const halfZ = newValue.z * 0.5
    const cosX = Math.cos(halfX)
    const sinX = Math.sin(halfX)
    const cosY = Math.cos(halfY)
    const sinY = Math.sin(halfY)
    const cosZ = Math.cos(halfZ)
    const sinZ = Math.sin(halfZ)

    const q = new SCNVector4()
    const x = sinX * cosY * cosZ - cosX * sinY * sinZ
    const y = cosX * sinY * cosZ + sinX * cosY * sinZ
    const z = cosX * cosY * sinZ - sinX * sinY * cosZ
    const r = 1.0 / Math.sqrt(x * x + y * y + z * z)
    q.x = x * r
    q.y = y * r
    q.z = z * r
    q.w = 2 * Math.acos(cosX * cosY * cosZ + sinX * sinY * sinZ)
    */
    this._rotation = newValue.eulerAnglesToRotation()
    this._transformUpToDate = false
  }

  /**
   * The node’s orientation, expressed as a quaternion. Animatable.
   * @type {SCNQuaternion}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1408048-orientation
   */
  get orientation() {
    /*
    const quat = new SCNVector4()
    const rot = this._rotation

    if(rot.x === 0 && rot.y === 0 && rot.z === 0){
      quat.x = 0
      quat.y = 0
      quat.z = 0
      quat.w = 1.0
    }else{
      const r = 1.0 / Math.sqrt(rot.x * rot.x + rot.y * rot.y + rot.z * rot.z)
      const cosW = Math.cos(rot.w)
      const sinW = Math.sin(rot.w)
      quat.x = rot.x * sinW
      quat.y = rot.y * sinW
      quat.z = rot.z * sinW
      quat.w = cosW
    }
    return quat
    */
    //console.log(`SCNNode get orientation: ${this._rotation.rotationToQuat()}`)
    return this._rotation.rotationToQuat()
  }
  set orientation(newValue) {
    /*
    const rot = new SCNVector4()

    if(newValue.x === 0 && newValue.y === 0 && newValue.z === 0){
      rot.x = 0
      rot.y = 0
      rot.z = 0
      rot.w = 0
    }else{
      rot.x = newValue.x
      rot.y = newValue.y
      rot.z = newValue.z
      let quatW = newValue.w
      if(quatW > 1){
        quatW = 1.0
      }else if(quatW < -1){
        quatW = -1.0
      }
      const w = Math.acos(quatW)

      if(isNaN(w)){
        rot.w = 0
      }else{
        rot.w = w
      }
    }
        
    this._rotation = rot
    */
    if(!(newValue instanceof SCNVector4)){
      throw new Error(`orientation must be SCNVector4`)
    }

    this._rotation = newValue.quatToRotation()
    //console.log(`SCNNode set orientation: ${this._rotation.float32Array()}`)
    this._transformUpToDate = false
  }

  /**
   * @access private
   * @returns {SCNVector4} -
   */
  get _presentationWorldOrientation() {
    if(this._parent === null){
      return this.presentation.orientation
    }
    return this._parent._presentationWorldOrientation.cross(this.presentation.orientation)
  }

  /**
   * @access private
   * @returns {SCNVector4} -
   */
  get _worldOrientation() {
    if(this._parent === null){
      return this.orientation
    }
    return this._parent._worldOrientation.cross(this.orientation)
  }

  /**
   * @access private
   * @returns {SCNVector4} -
   */
  get _worldRotation() {
    return this._worldOrientation.quatToRotation()
  }

  /**
   * @access private
   * @returns {SCNVector3} -
   */
  get _presentationWorldTranslation() {
    return this.presentation.worldTransform.getTranslation()
  }

  /**
   * @access private
   * @returns {SCNVector3} -
   */
  get _worldTranslation() {
    return this.worldTransform.getTranslation()
  }

  /**
   * @access private
   * @returns {SCNVector3} -
   */
  get _worldScale() {
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
    parentNode._removeObjectFromChildNodesAtIndex(index)
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
   * @param {number} index -
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
   * @param {SCNNode} object -
   * @param {number} index -
   * @returns {void}
   */
  _insertObjectInChildNodesAtIndex(object, index) {
    const length = this._childNodes.length
    if(index > length){
      throw new Error(`SCNNode.childNodes out of index: ${index} > ${length}`)
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
        const result = this._childNodes[i].childNodeWithNameRecursively(name, recursively)
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
   * @access private
   * @param {string} nodeID -
   * @param {boolean} recursively -
   * @returns {?SCNNode} -
   */
  _childNodeWithNodeIDRecursively(nodeID, recursively = true) {
    for(let i=0; i<this._childNodes.length; i++){
      if(this._childNodes[i]._nodeID === nodeID){
        return this._childNodes[i]
      }
      if(recursively){
        const result = this._childNodes[i]._childNodeWithNodeIDRecursively(nodeID, recursively)
        if(result !== null){
          return result
        }
      }
    }

    return null
  }

  /**
   * @access private
   * @param {string} nodeID -
   * @returns {?SCNNode} -
   */
  _childNodeWithNodeID(nodeID) {
    return this._childNodeWithNodeIDRecursively(name, false)
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
    //this._childNodes.some((child) => {
    this.childNodes.some((child) => {
      return this._enumerateChildNodesRecursive(child, block)
    })
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
    this._enumerateChildNodesRecursive(this, block)
  }

  _enumerateChildNodesRecursive(node, block) {
    let stop = block(node)
    if(stop === true){
      return true
    }
    stop = node._childNodes.some((child) => {
      return this._enumerateChildNodesRecursive(child, block)
    })
    return stop
  }

  // Adding Physics to a Node

  get physicsBody() {
    return this._physicsBody
  }
  set physicsBody(newValue) {
    if(this._physicsBody){
      this._physicsBody._node = null
    }
    this._physicsBody = newValue
    this._physicsBody._node = this
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
    if(this._particleSystems === null){
      this._particleSystems = []
    }
    system.reset()
    this._particleSystems.push(system)
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
    if(this._particleSystems === null){
      return
    }
    const index = this._particleSystems.indexOf(system)
    this._particleSystems.splice(index, 1)
  }

  /**
   * Removes any particle systems directly attached to the node.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1522801-removeallparticlesystems
   */
  removeAllParticleSystems() {
    this._particleSystems = []
  }

  /**
   * The particle systems attached to the node.
   * @access public
   * @type {?SCNParticleSystem[]}
   * @desc An array of SCNParticleSystem objects directly attached to the node. This array does not include particle systems attached to the node's child nodes. For details on particle systems, see SCNParticleSystem.
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
    if(this._audioPlayers.indexOf(player) < 0){
      this._audioPlayers.push(player)
      player._play()
    }
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
    const index = this._audioPlayers.indexOf(player)
    if(index >= 0){
      player._stop()
      delete this._audioPlayers[index]
    }
  }

  /**
   * Removes all audio players attached to the node, stopping playback.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnnode/1523570-removeallaudioplayers
   */
  removeAllAudioPlayers() {
    this._audioPlayers.forEach((player) => {
      player._stop()
    })
    this._audioPlayers = []
  }

  /**
   * The audio players currently attached to the node.
   * @type {SCNAudioPlayer[]}
   * @desc Positional audio effects from a player attached to a node are based on that node’s position relative to the audioListener position in the scene.After an audio player completes playback, SceneKit automatically removes it from the node. Therefore, this array always contains audio players that are currently playing back audio.
   * @see https://developer.apple.com/reference/scenekit/scnnode/1523244-audioplayers
   */
  get audioPlayers() {
    return this._audioPlayers.slice(0)
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
    const node = this.copy()
    
    this._childNodes.forEach((child) => {
      node.addChildNode(child.clone())
    })

    return node
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
    if(node === null){
      return position.transform(this._worldTransform.invert())
    }
    return position.transform(node._worldTransform).transform(this._worldTransoform.invert())
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
    if(node === null){
      return position.transform(this._worldTransform)
    }
    return position.transform(this._worldTransform).transform(node._worldTransform.invert())
  }

  /**
   * Converts a transformation to the node’s coordinate space from that defined by another node.
   * @access public
   * @param {SCNMatrix4} transform - A transformation relative to the local coordinate space defined by the other node.
   * @param {?SCNNode} node - Another node in the same scene graph as the node, or nil to convert from the scene’s world coordinate space.
   * @returns {SCNMatrix4} - 
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407996-converttransform
   */
  convertTransformFrom(transform, node = null) {
    if(node === null){
      return transform.mult(this._worldTransform.invert())
    }
    return transform.mult(node._worldTransform).mult(this._worldTransform.invert())
  }

  /**
   * Converts a transformation from the node’s coordinate space to that defined by another node.
   * @access public
   * @param {SCNMatrix4} transform - A transformation relative to the node’s coordinate space.
   * @param {?SCNNode} node - Another node in the same scene graph as the node, or nil to convert to the scene’s world coordinate space.
   * @returns {SCNMatrix4} - 
   * @see https://developer.apple.com/reference/scenekit/scnnode/1407986-converttransform
   */
  convertTransformTo(transform, node = null) {
    if(node === null){
      return transform.mult(this._worldTransform)
    }
    return transform.mult(this._worldTransform).mult(node._worldTransform.invert())
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
    this.runActionForKey(action, Symbol())
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
    this.runActionForKeyCompletionHandler(action, key, null)
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
    if(typeof key === 'undefined' || key === null){
      key = Symbol()
    }
    const act = action.copy()
    // FIXME: use current frame time
    act._actionStartTime = Date.now() * 0.001
    act._completionHandler = block
    this._actions.set(key, act)
    //this._copyTransformToPresentationRecursive()
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
    return this._actions.get(key)
  }

  /**
   * Required. A Boolean value that indicates whether the node is currently executing any actions.
   * @type {boolean}
   * @desc This value is true if the node has any executing actions; otherwise the value is false.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523794-hasactions
   */
  get hasActions() {
    return this._actions.size > 0
  }

  /**
   * Required. The list of keys for which the node has attached actions.
   * @type {string[]}
   * @desc Use this property to list actions you scheduled using the runAction(_:forKey:) or runAction(_:forKey:completionHandler:) method.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1523036-actionkeys
   */
  get actionKeys() {
    const keys = []
    for(const key of this._actions.keys()){
      keys.push(key)
    }
    return keys
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
    // TODO: stop action
    this._actions.delete(key)
  }

  /**
   * Required. Ends and removes all actions from the node.
   * @access public
   * @returns {void}
   * @desc When SceneKit removes an action from a node, it skips any remaining animation the action would perform. However, any changes the action has already made to the node’s state remain in effect.
   * @see https://developer.apple.com/reference/scenekit/scnactionable/1524181-removeallactions
   */
  removeAllActions() {
    // TODO: stop actions
    this._actions.clear()
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
    if(typeof key === 'undefined' || key === null){
      key = Symbol()
    }
    const anim = animation.copy()
    // FIXME: use current frame time
    anim._animationStartTime = Date.now() * 0.001

    this._animations.set(key, anim)
    this._copyTransformToPresentationRecursive()
  }

  /**
   * @access private
   * @param {CAAnimation} animatino -
   * @param {number} time -
   * @returns {void}
   */
  /*
  _setAnimationStartTime(animation, time) {
    animation._animationStartTime = time
    animation._prevTime = time - 0.0000001
    if(animation instanceof CAAnimationGroup){
      animation.animations.forEach((anim) => {
        this._setAnimationStartTime(anim, time)
      })
    }
  }
  */

  /**
   * Required. Returns the animation with the specified key.
   * @access public
   * @param {string} key - A string identifying a previously added animation.
   * @returns {?CAAnimation} - 
   * @desc Attempting to modify any properties of the returned object results in undefined behavior.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1524020-animation
   */
  animationForKey(key) {
    return this._animations.get(key)
  }

  /**
   * Required. Removes all the animations currently attached to the object.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522762-removeallanimations
   */
  removeAllAnimations() {
    // TODO: stop animations
    this._animations.clear()
  }

  /**
   * Required. Removes the animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation to remove.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1522880-removeanimation
   */
  removeAnimationForKey(key) {
    this._animations.delete(key)
    this._copyTransformToPresentationRecursive()
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
    // FIXME: use fadeout duration
    this.removeAnimationForKey(key)
  }

  /**
   * Required. An array containing the keys of all animations currently attached to the object.
   * @type {string[]}
   * @desc This array contains all keys for which animations are attached to the object, or is empty if there are no attached animations. The ordering of animation keys in the array is arbitrary.
   * @see https://developer.apple.com/reference/scenekit/scnanimatable/1523610-animationkeys
   */
  get animationKeys() {
    const keys = []
    for(const key of this._animations.keys()){
      keys.push(key)
    }
    return keys
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
   * The minimum and maximum corner points of the object’s bounding box.
   * @type {{min: SCNVector3, max: SCNVector3}}
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034705-boundingbox
   */
  get boundingBox() {
    if(this._fixedBoundingBox){
      return this._fixedBoundingBox
    }
    //if(!this._boundingBox){
      this._updateBoundingBox()
    //}
    return this._boundingBox
  }
  set boundingBox(newValue) {
    this._fixedBoundingBox = newValue
  }

  /**
   * The center point and radius of the object’s bounding sphere.
   * @type {{center: SCNVector3, radius: number}}
   * @desc Scene Kit defines a bounding sphere in the local coordinate space using a center point and a radius. For example, if a node’s bounding sphere has the center point {3, 1, 4} and radius 2.0, all points in the vertex data of node’s geometry (and any geometry attached to its child nodes) lie within 2.0 units of the center point.The coordinates provided when reading this property are valid only if the object has a volume to be measured. For a geometry containing no vertex data or a node containing no geometry (and whose child nodes, if any, contain no geometry), the values center and radius are both zero.
   * @see https://developer.apple.com/reference/scenekit/scnboundingvolume/2034707-boundingsphere
   */
  get boundingSphere() {
    // TODO: calculate bounding sphere
    return {center: new SCNVector3(), radius: 0}
  }

  _geometryBoundingBox() {
    if(this._geometry === null){
      return {
        min: new SCNVector3(Infinity, Infinity, Infinity),
        max: new SCNVector3(-Infinity, -Infinity, -Infinity)
      }
    }
    return this._geometry.boundingBox
  }

  _updateBoundingBox() {
    // FIXME: use rotation of the node
    let box = this._geometryBoundingBox()
    const p = this.presentation ? this.presentation : this
    if(p.geometry !== null){
      box = this._unionBoundingBox(box, p.geometry.boundingBox)
    }
    const scale = p._scale
    if(scale.x < 0){
      const minX = box.max.x * scale.x
      const maxX = box.min.x * scale.x
      box.min.x = minX
      box.max.x = maxX
    }else{
      box.min.x *= scale.x
      box.max.x *= scale.x
    }
    if(scale.y < 0){
      const minY = box.max.y * scale.y
      const maxY = box.min.y * scale.y
      box.min.y = minY
      box.max.y = maxY
    }else{
      box.min.y *= scale.y
      box.max.y *= scale.y
    }
    if(scale.z < 0){
      const minZ = box.max.z * scale.z
      const maxZ = box.min.z * scale.z
      box.min.z = minZ
      box.max.z = maxZ
    }else{
      box.min.z *= scale.z
      box.max.z *= scale.z
    }

    for(const child of this._childNodes){
      const cbox = child._updateBoundingBox()
      box = this._unionChildBoundingBox(box, cbox)
    }
    this._boundingBox = box
    return box
  }

  _unionBoundingBox(box1, box2) {
    if(box1 === null){
      return box2
    }
    if(box2 === null){
      return box1
    }
    const min = new SCNVector3()
    const max = new SCNVector3()
    min.x = Math.min(box1.min.x, box2.min.x)
    min.y = Math.min(box1.min.y, box2.min.y)
    min.z = Math.min(box1.min.z, box2.min.z)
    max.x = Math.max(box1.max.x, box2.max.x)
    max.y = Math.max(box1.max.y, box2.max.y)
    max.z = Math.max(box1.max.z, box2.max.z)
    return { min: min, max: max }
  }

  _unionChildBoundingBox(box, cbox) {
    let p = this.presentation ? this.presentation : this
    const pos = p._position
    const scale = p._scale
    const min = new SCNVector3(
      (cbox.min.x + pos.x) * scale.x,
      (cbox.min.y + pos.y) * scale.y,
      (cbox.min.z + pos.z) * scale.z
    )
    const max = new SCNVector3(
      (cbox.max.x + pos.x) * scale.x,
      (cbox.max.y + pos.y) * scale.y,
      (cbox.max.z + pos.z) * scale.z
    )
    return this._unionBoundingBox(box, { min: min, max: max })
  }

  _updateTransform() {
    const m1 = SCNMatrix4.matrixWithScale(this._scale)
    const m2 = m1.rotation(this._rotation)
    const m3 = m2.translation(this._position)
    this._transform = m3
    this._transformUpToDate = true
  }

  /**
   *
   * @access public
   * @returns {SCNNode} -
   */
  copy() {
    const node = new SCNNode()
    node.name = this.name
    node.light = this.light
    node.camera = this.camera
    node._geometry = this._geometry
    node.morpher = this.morpher
    node.skinner = this.skinner
    node.categoryBitMask = this.categoryBitMask
    node.isPaused = this.isPaused
    node._presentation = this._presentation ? this._presentation.copy() : null
    node._isPresentationInstance = this._isPresentationInstance
    node.constraints = this.constraints ? this.constraints.slice(0) : null
    node.isHidden = this.isHidden
    node.opacity = this.opacity
    node.renderingOrder = this.renderingOrder
    node.castsShadow = this.castsShadow
    node.movabilityHint = this.movabilityHint
    node.filters = this.filters ? this.filters.slice() : null
    node.rendererDelegate = this.rendererDelegate
    node._physicsBody = this._physicsBody // FIXME: copy
    node.physicsField = this.physicsField
    node._particleSystems = this._particleSystems ? this._particleSystems.slice(0) : null
    node._audioPlayers = this._audioPlayers
    //node._hasActions = this._hasActions
    node._actions = new Map(this._actions)
    node._animations = this._animations.copy()
    node._boundingBox = this._boundingBox
    //node._boundingSphere = this._boundingSphere

    node._position = new SCNVector3(this._position.x, this._position.y, this._position.z)
    node._rotation = new SCNVector4(this._rotation.x, this._rotation.y, this._rotation.z, this._rotation.w)
    node._scale = new SCNVector3(this._scale.x, this._scale.y, this._scale.z)
    node._transformUpToDate = false
    
    return node
  }

  _copyTransformToPresentation() {
    if(this._presentation === null){
      return
    }
    const p = this._presentation
    p._position = this._position._copy()
    p._rotation = this._rotation._copy()
    p._scale = this._scale._copy()
  }

  _copyTransformToPresentationRecursive() {
    const nodes = [this]
    while(nodes.length > 0){
      const node = nodes.shift()
      node._copyTransformToPresentation()
      nodes.push(...node._childNodes)
    }
  }

  _copyMaterialPropertiesToPresentation() {
    if(this._geometry){
      for(const material of this._geometry.materials){
        material._copyPresentationProperties()
      }
    }
  }

  get viewTransform() {
    return this.worldTransform.invert()
  }

  get projectionTransform() {
    if(this.camera === null){
      return null
    }
    return this.camera.projectionTransform
  }

  get viewProjectionTransform() {
    if(this.camera === null){
      return null
    }
    const proj = this.camera.projectionTransform
    const view = this.viewTransform
    return view.mult(proj)
  }

  get lightViewProjectionTransform() {
    if(this.light === null){
      return null
    }
    this.light._updateProjectionTransform()
    const proj = this.light._projectionTransform
    const view = this.viewTransform
    return view.mult(proj)
  }

  get shadowProjectionTransform() {
    if(this.light === null){
      return null
    }
    const vp = this.lightViewProjectionTransform
    const scale = SCNMatrix4MakeTranslation(1.0, 1.0, 0.0).scale(0.5, 0.5, 1.0) // [-1, 1] => [0, 1]
    return vp.mult(scale)
  }

  /**
   * Invoked by value(forKey:) when it finds no property corresponding to a given key.
   * @access public
   * @param {string} key - A string that is not equal to the name of any of the receiver's properties.
   * @returns {?Object} - 
   * @desc Subclasses can override this method to return an alternate value for undefined keys. The default implementation raises an NSUndefinedKeyException.
   * @see https://developer.apple.com/reference/objectivec/nsobject/1413457-value
   */
  valueForUndefinedKey(key) {
    if(key.charAt(0) === '/'){
      const nodeID = key.substr(1)
      if(this._nodeID === nodeID){
        return this
      }
      const node = this._childNodeWithNodeIDRecursively(nodeID)
      if(node){
        return node
      }
    }
    return super.valueForUndefinedKey(key)
  }

  valueForKeyPath(keyPath, usePresentation = true) {
    // FIXME: check flags to decide to use a presentation node
    const target = (usePresentation && this._presentation) ? this._presentation : this
    const paths = keyPath.split('.')
    const key = paths[0]
    const key2 = paths[1]

    if(key === 'position'){
      if(key2){
        return target.position[key2]
      }
      return target.position
    }else if(key === 'rotation'){
      if(key2){
        return target.rotation[key2]
      }
      return target.rotation
    }else if(key === 'scale'){
      if(key2){
        return target.scale[key2]
      }
      return target.scale
    }else if(key === 'eulerAngles'){
      if(key2){
        return target.eulerAngles[key2]
      }
      return target.eulerAngles
    }else if(key === 'orientation'){
      if(key2){
        return target.orientation[key2]
      }
      return target.orientation
    }else if(key === 'transform'){
      if(key2){
        return target.transform[key2]
      }
      return target.transform
    }
    return super.valueForKeyPath(keyPath)
  }

  setValueForKey(value, key) {
    // FIXME: check flags to decide to use a presentation node
    const target = this._presentation ? this._presentation : this

    if(key === 'position'){
      target.position = value
    }else if(key === 'rotation'){
      target.rotation = value
    }else if(key === 'scale'){
      target.scale = value
    }else if(key === 'eulerAngles'){
      target.eulerAngles = value
    }else if(key === 'orientation'){
      target.orientation = value
    }else if(key === 'transform'){
      target.transform = value
    }else{
      super.setValueForKey(value, key)
    }
  }

  setValueForKeyPath(value, keyPath) {
    const target = this._presentation ? this._presentation : this

    const paths = keyPath.split('.')
    const key = paths.shift()
    const restPath = paths.join('.')
    //console.log(`SCNNode setValueForKeyPath ${this.name} ${key} ${restPath}`)
    if(key === 'transform'){
      switch(restPath){
        case 'rotation.x':
          target._rotation.x = value
          target._transformUpToDate = false
          return
        case 'rotation.y':
          target._rotation.y = value
          target._transformUpToDate = false
          return
        case 'rotation.z':
          target._rotation.z = value
          target._transformUpToDate = false
          return
        case 'rotation':
          target._rotation.z = value
          target._transformUpToDate = false
          return
        case 'quaternion':
          target.orientation = value
          target._transformUpToDate = false
          return
        case 'scale.x':
          target._scale.x = value
          target._transformUpToDate = false
          return
        case 'scale.y':
          target._scale.y = value
          target._transformUpToDate = false
          return
        case 'scale.z':
          target._scale.z = value
          target._transformUpToDate = false
          return
        case 'scale': {
          target._scale.x = value.x
          target._scale.y = value.y
          target._scale.z = value.z
          target._transformUpToDate = false
          return
        }
        case 'translation.x':
          target._position.x = value
          target._transformUpToDate = false
          return
        case 'translation.y':
          target._position.y = value
          target._transformUpToDate = false
          return
        case 'translation.z':
          target._position.z = value
          target._transformUpToDate = false
          return
        case 'translation':
          target._position.x = value.x
          target._position.y = value.y
          target._transformUpToDate = false
          return
        default:
          // do nothing
      }
    }else if(key === 'position'){
      if(restPath !== ''){
        target._position[restPath] = value
      }else{
        target._position = value
      }
      return
    }else if(key === 'rotation'){
      if(restPath !== ''){
        target._rotation[restPath] = value
      }else{
        target._rotation = value
      }
      return
    }else if(key === 'orientation'){
      if(restPath !== ''){
        const v = target.orientation
        v[restPath] = value
        target.orientation = v
      }else{
        target.orientation = value
      }
      return
    }else if(key === 'eulerAngles'){
      if(restPath !== ''){
        const v = target.eulerAngles
        v[restPath] = value
        target.eulerAngles = v
      }else{
        target.eulerAngles = value
      }
      return
    }else if(key === 'scale'){
      if(restPath !== ''){
        target._scale[restPath] = value
      }else{
        target._scale = value
      }
      return
    }else if(key === 'morpher'){
      if(target.morpher === null){
        throw new Error('target morpher === null')
      }
      target.morpher.setValueForKeyPath(value, restPath)
      return
    }
    // TODO: add other properties

    super.setValueForKeyPath(value, keyPath)
  }

  
  /**
   * @access private
   * @returns {Ammo.btTransform}
   * @desc call Ammo.destroy(transform) after using it.
   */
  _createBtTransform() {
    //const transform = new Ammo.btTransform()
    //const pos = this.position.createBtVector3()
    //const rot = this.orientation.craeteBtQuaternion()
    //transform.setIdentity()
    //transform.setOrigin(pos)
    //transform.setRotation(rot)
    //Ammo.destroy(pos)
    //Ammo.destroy(rot)
    //return transform
  }

  _createBtCollisionShape() {
    //if(this._geometry === null){
    //  throw new Error('geometry is null')
    //}
    //return this._geometry._createBtCollisionShape()
  }

  destory() {
    //if(this.physicsBody !== null){
    //  this.physicsBody.destory()
    //  this.physicsBody = null
    //}
    //if(this._geometry !== null){
    //  // the geometry might be shared with other nodes...
    //  //this.geometry.destroy()
    //}
  }

  /**
   * @access private
   * @returns {Promise} -
   */
  _getLoadedPromise() {
    if(this._loadedPromise){
      return this._loadedPromise
    }

    const promises = []
    for(const child of this._childNodes){
      promises.push(child._getLoadedPromise())
    }
    if(this._particleSystems){
      for(const system of this._particleSystems){
        promises.push(system._getLoadedPromise())
      }
    }
    if(this._geometry){
      promises.push(this._geometry._getLoadedPromise())
    }
    for(const player of this._audioPlayers){
      promises.push(player._getLoadedPromise())
    }
    this._loadedPromise = Promise.all(promises)
    return this._loadedPromise
  }
}


