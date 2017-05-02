'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNGeometry from './SCNGeometry'
import SCNNode from './SCNNode'

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
 * @see https://developer.apple.com/reference/scenekit/scnphysicsshape
 */
export default class SCNPhysicsShape extends NSObject {
  static get _propTypes() {
    return {
      options: ['NSArray', '_options'],
      referenceObject: ['NSObject', '_sourceObject']
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsshape/1508897-init
   */
  constructor(geometry, options = null) {
    super()

    // Getting Information About a Shape
    this._sourceObject = geometry
    this._options = options
    this._transforms = null
  }

  // Getting Information About a Shape

  /**
   * The object that was used to create the shape.
   * @type {Object}
   * @desc This property, along with the transforms and options properties, provides the information that was used to create the shape. You can use this information, for example, to draw editing or debugging UI in your scene.If the shape was created with the init(geometry:options:) method, the source object is an SCNGeometry object, and the options property contains the options affecting the shape’s construction from that geometry.If the shape was created with the init(node:options:) method, the source object is an SCNNode object, and the options property contains the options affecting the shape’s construction from that node.If the shape was created with the init(shapes:transforms:) method, the source object is an array of SCNPhysicsShape objects and the transforms property describes how those shapes combine to form a compound shape.
   * @see https://developer.apple.com/reference/scenekit/scnphysicsshape/1508888-sourceobject
   */
  get sourceObject() {
    return this._sourceObject
  }

  /**
   * The options dictionary that was used to create the shape.
   * @type {?Map<SCNPhysicsShape.Option, Object>}
   * @desc You provide this dictionary in the init(geometry:options:) or init(node:options:) method. Use this dictionary along with the sourceObject property to recover the information that was used to create the shape. If the shape was created with the init(shapes:transforms:) method, this property’s value is nil.
   * @see https://developer.apple.com/reference/scenekit/scnphysicsshape/1508904-options
   */
  get options() {
    return this._options
  }

  /**
   * The array of transforms that was used to create a compound shape.
   * @type {?NSValue[]}
   * @desc You provide this array of NSValue objects, each containing an SCNMatrix4 value, in the init(shapes:transforms:) method to create a compound shape. Use this array along with the sourceObject property to recover the information that was used to create the shape. If the shape was created with the init(geometry:options:) or init(node:options:) method, this property's value is nil.
   * @see https://developer.apple.com/reference/scenekit/scnphysicsshape/1508898-transforms
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsshape.option
   */
  static get Option() {
    return _Option
  }

  /**
   * @type {Object} ShapeType
   * @property {string} boundingBox The physics shape is the smallest box containing the geometry.
   * @property {string} concavePolyhedron The physics shape is a concave polyhedron closely following the surface of the geometry.
   * @property {string} convexHull The physics shape is a convex polyhedron roughly enclosing the geometry.
   * @see https://developer.apple.com/reference/scenekit/scnphysicsshape.shapetype
   */
  static get ShapeType() {
    return _ShapeType
  }

  /**
   * @access private
   * @returns {Ammo.btCollisionShape}
   * @desc call Ammo.destroy(shape) after using it.
   */
  _createBtCollisionShape() {
    if(this._sourceObject === null){
      throw new Error('_sourceObject is null')
    }
    return this._sourceObject._createBtCollisionShape()
  }
}
