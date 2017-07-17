'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNBox from './SCNBox'
import SCNCapsule from './SCNCapsule'
import SCNGeometry from './SCNGeometry'
import SCNNode from './SCNNode'
import SCNSphere from './SCNSphere'
import SCNVector3 from './SCNVector3'

const _Option = {
  collisionMargin: 'SCNPhysicsShapeCollisionMarginKey',
  keepAsCompound: 'SCNPhysicsShapeKeepAsCompoundKey',
  scale: 'SCNPhysicsShapeScaleKey',
  type: 'SCNPhysicsShapeTypeKey'
}

const _ShapeType = {
  boundingBox: 'boundingBox',
  concavePolyhedron: 'concaveMesh',
  convexHull: 'convexHull'
}


/**
 * An abstraction of a physics body’s solid volume for use in tuning or optimizing collision detection.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape
 */
export default class SCNPhysicsShape extends NSObject {
  static get _propTypes() {
    return {
      $constructor: (propNames, propValues) => {
        return new SCNPhysicsShape(propValues.referenceObject, propValues.options)
      },
      options: ['NSArray', null],
      referenceObject: ['NSObject', null]
    }
  }

  // Creating Physics Shapes

  /**
   * Creates a physics shape based on a geometry object.
   * @access public
   * @constructor
   * @param {SCNGeometry} geometry - A geometry object.
   * @param {?Map<SCNPhysicsShape.Option, Object>} [options = null] - A dictionary of options affecting the level of detail of the physics shape, or nil to use default options. For applicable keys and their possible values, see Shape Creation Options Keys.
   * @desc If you create a physics shape using one of the basic geometry classes (SCNBox, SCNSphere, SCNPyramid, SCNCone, SCNCylinder, or SCNCapsule), SceneKit uses an idealized form of that geometry for the physics shape instead of using the geometry’s vertex data to simulate collisions. For example, if you create a physics shape from an SCNSphere object, SceneKit simulates collisions for any object that passes within the sphere’s radius. Because the idealized forms of simple geometries are computationally much simpler than the vertex data needed for displaying them, using basic geometries for physics shapes (or compound shapes created from basic geometries with the init(shapes:transforms:) method) often provides the best balance between simulation accuracy and performance. To use the newly created physics shape, create a physics body with the the init(type:shape:) method, or assign the shape to the physicsShape property of an existing body.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape/1508897-init
   */
  constructor(geometry, options = null) {
    super()

    let _options = options
    if(Array.isArray(options)){
      _options = {}
      for(const arr of options){
        _options[arr[0]] = arr[1]
      }
    }

    /**
     * @type {SCNGeometry}
     */
    this._sourceGeometry = null

    /**
     * @type {Object}
     */
    this._options = _options

    /**
     * @type {SCNMatrix4}
     */
    this._transforms = null

    /**
     * @type {SCNGeometry}
     */
    this._shape = null

    /**
     * @type {SCNVector3}
     */
    this._center = new SCNVector3(0, 0, 0)

    // Getting Information About a Shape
    this._sourceObject = null
    
    this._setSourceObject(geometry)
    this._createShape()
  }

  _setSourceObject(obj) {
    this._sourceObject = obj
    if(this._sourceObject instanceof SCNGeometry){
      this._sourceGeometry = this._sourceObject
    }else if(this._sourceObject instanceof SCNNode && this._sourceObject.geometry){
      // TODO: get geometries recursively
      this._sourceGeometry = this._sourceObject.geometry
    }else{
      //throw new Error(`can't use it for source object: ${geometry.className}`)
    }
    if(!this._sourceGeometry){
      //throw new Error('source geometry is null')
    }
  }

  _createShape() {
    if(!this._sourceGeometry){
      //throw new Error('SCNPhysicsShape: must have a geometry')
      return
    }

    //if(this._options && this._options.get(_Option.type) === _ShapeType.boundingBox){
    if(this._options && this._options[_Option.type] === _ShapeType.boundingBox){
      this._createShapeAsBoundingBox()
    }else if(this._sourceGeometry instanceof SCNCapsule){
      // FIXME: do not convert to SCNBox
      this._createShapeAsBoundingBox()
    }else if(this._sourceGeometry instanceof SCNBox){
      this._createShapeAsBox()
    }else if(this._sourceGeometry instanceof SCNSphere){
      this._createShapeAsSphere()
    //}else if(this._options && this._options.get(_Option.type) === _ShapeType.convecHull){
    }else if(this._options && this._options[_Option.type] === _ShapeType.concavePolyhedron){
      // give up making a simple shape
      this._shape = this._sourceGeometry
    }else{
      this._createShapeAsSphere()
    }
  }

  _createShapeAsBoundingBox() {
    const boundingBox = this._sourceGeometry._updateBoundingBox()
    const width = boundingBox.max.x - boundingBox.min.x
    const height = boundingBox.max.y - boundingBox.min.y
    const length = boundingBox.max.z - boundingBox.min.z
    const chamferRadius = 0
    const box = new SCNBox(width, height, length, chamferRadius)
    this._shape = box
    this._center = new SCNVector3(
      boundingBox.min.x + width * 0.5,
      boundingBox.min.y + height * 0.5,
      boundingBox.min.z + length * 0.5
    )
  }

  _createShapeAsBox() {
    // TODO: copy the geometry
    this._shape = this._sourceGeometry
    this._center = new SCNVector3(0, 0, 0)
  }

  _createShapeAsSphere() {
    if(this._sourceGeometry instanceof SCNSphere){
      // TODO: copy the geometry
      this._shape = this._sourceGeometry
      this._center = new SCNVector3(0, 0, 0)
      return
    }
    const boundingSphere = this._sourceGeometry.getBoundingSphere()
    const sphere = new SCNSphere(boundingSphere.radius)
    this._shape = sphere
    this._center = boundingSphere.center
  }

  // Getting Information About a Shape

  /**
   * The object that was used to create the shape.
   * @type {Object}
   * @desc This property, along with the transforms and options properties, provides the information that was used to create the shape. You can use this information, for example, to draw editing or debugging UI in your scene.If the shape was created with the init(geometry:options:) method, the source object is an SCNGeometry object, and the options property contains the options affecting the shape’s construction from that geometry.If the shape was created with the init(node:options:) method, the source object is an SCNNode object, and the options property contains the options affecting the shape’s construction from that node.If the shape was created with the init(shapes:transforms:) method, the source object is an array of SCNPhysicsShape objects and the transforms property describes how those shapes combine to form a compound shape.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape/1508888-sourceobject
   */
  get sourceObject() {
    return this._sourceObject
  }

  /**
   * The options dictionary that was used to create the shape.
   * @type {?Map<SCNPhysicsShape.Option, Object>}
   * @desc You provide this dictionary in the init(geometry:options:) or init(node:options:) method. Use this dictionary along with the sourceObject property to recover the information that was used to create the shape. If the shape was created with the init(shapes:transforms:) method, this property’s value is nil.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape/1508904-options
   */
  get options() {
    return this._options
  }

  get _type() {
    if(!this._options){
      return null
    }
    return this._options[_Option.type]
  }

  /**
   * The array of transforms that was used to create a compound shape.
   * @type {?NSValue[]}
   * @desc You provide this array of NSValue objects, each containing an SCNMatrix4 value, in the init(shapes:transforms:) method to create a compound shape. Use this array along with the sourceObject property to recover the information that was used to create the shape. If the shape was created with the init(geometry:options:) or init(node:options:) method, this property's value is nil.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape/1508898-transforms
   */
  get transforms() {
    return this._transforms
  }

  // Structures

  /**
   * @type {Object} Option
   * @property {string} collisionMargin 
   * @property {string} keepAsCompound An option for selecting whether to create a group of independent shapes or combine them into a single shape.
   * @property {string} scale An option for selecting the scale factor of the shape relative to the local coordinate space of the node containing it.
   * @property {string} type An option for selecting the level of detail at which to create shapes from geometry.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape.option
   */
  static get Option() {
    return _Option
  }

  /**
   * @type {Object} ShapeType
   * @property {string} boundingBox The physics shape is the smallest box containing the geometry.
   * @property {string} concavePolyhedron The physics shape is a concave polyhedron closely following the surface of the geometry.
   * @property {string} convexHull The physics shape is a convex polyhedron roughly enclosing the geometry.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsshape.shapetype
   */
  static get ShapeType() {
    return _ShapeType
  }

  /**
   * @access private
   * @returns {Ammo.btCollisionShape} -
   * @desc call Ammo.destroy(shape) after using it.
   */
  _createBtCollisionShape() {
    if(this._sourceObject === null){
      throw new Error('_sourceObject is null')
    }
    return this._sourceObject._createBtCollisionShape()
  }
}
