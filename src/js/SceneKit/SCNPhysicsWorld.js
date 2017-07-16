'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNBox from './SCNBox'
import SCNCapsule from './SCNCapsule'
import SCNGeometryPrimitiveType from './SCNGeometryPrimitiveType'
import SCNGeometrySource from './SCNGeometrySource'
import SCNHitTestResult from './SCNHitTestResult'
import SCNMatrix4 from './SCNMatrix4'
import SCNPhysicsBody from './SCNPhysicsBody'
import SCNPhysicsBodyType from './SCNPhysicsBodyType'
import SCNPhysicsBehavior from './SCNPhysicsBehavior'
import SCNPhysicsContact from './SCNPhysicsContact'
import SCNPhysicsContactDelegate from './SCNPhysicsContactDelegate'
import SCNPhysicsShape from './SCNPhysicsShape'
import SCNSphere from './SCNSphere'
import SCNVector3 from './SCNVector3'
//import _Ammo from '../third_party/ammo'
/*global Ammo*/

const _TestOption = {
  backfaceCulling: 'backfaceCulling',
  collisionBitMask: 'collisionBitMask',
  searchMode: 'results'
}

const _TestSearchMode = {
  all: 'all',
  any: 'any',
  closest: 'closest'
}


/**
 * The global simulation of collisions, gravity, joints, and other physics effects in a scene.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld
 */
export default class SCNPhysicsWorld extends NSObject {
  static get _propTypes() {
    return {
      gravity: 'SCNVector3',
      speed: 'double',
      timeStep: 'double',
      scale: ['double', '_scale'],
      // _allBehaviors
      // contactDelegate
      scene: ['SCNScene', '_scene']
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Managing the Physics Simulation

    /**
     * A vector that specifies the gravitational acceleration applied to physics bodies in the physics world.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512855-gravity
     */
    this.gravity = new SCNVector3(0, 0, 0)

    /**
     * The rate at which the simulation executes.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512851-speed
     */
    this.speed = 0

    /**
     * The time interval between updates to the physics simulation.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512881-timestep
     */
    this.timeStep = 0

    /**
     * @access private
     * @type {number}
     */
    this._scale = 1.0

    // Registering Physics Behaviors

    this._allBehaviors = []

    // Detecting Contacts Between Physics Bodies

    /**
     * A delegate that is called when two physics bodies come in contact with each other.
     * @type {?SCNPhysicsContactDelegate}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512843-contactdelegate
     */
    this.contactDelegate = null

    //const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration()
    //const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration)
    //const overlappingPairCache = new Ammo.btDbvtBroadphase()
    //const solver = new Ammo.btSequentialImpulseConstraintSolver()
    //this._world = new Ammo.btDiscreteDynamicsWorld(
    //  dispatcher, overlappingPairCache, solver, collisionConfiguration
    //)

    this._prevTime = null

    /**
     * @access private
     * @type {SCNScene}
     */
    this._scene = null

    // for rayTest
    this._renderer = null
  }

  // Managing the Physics Simulation

  /**
   * Forces the physics engine to reevaluate possible collisions between physics bodies.
   * @access public
   * @returns {void}
   * @desc By default, SceneKit checks for collisions between physics bodies only once per simulation step. If you directly change the positions of any physics bodies outside of a SCNPhysicsContactDelegate method, call the updateCollisionPairs() method before using any of the methods listed in Searching for Physics Bodies Detecting Contacts Between Physics Bodies.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512877-updatecollisionpairs
   */
  updateCollisionPairs() {
  }

  // Registering Physics Behaviors

  /**
   * Adds a behavior to the physics world.
   * @access public
   * @param {SCNPhysicsBehavior} behavior - The behavior to be added.
   * @returns {void}
   * @desc Physics behaviors constrain or modify the effects of the physics simulation on sets of physics bodies. For example, the SCNPhysicsHingeJoint behavior causes two bodies to move as if connected by a hinge that pivots around a specific axis, and the SCNPhysicsVehicle behavior causes a body to roll like a car or other wheeled vehicle.To use a behavior in your scene, follow these steps:Create SCNPhysicsBody objects and attach them to each node that participates in the behavior.Create and configure a behavior object joining the physics bodies. See SCNPhysicsBehavior for a list of behavior classes.Call addBehavior(_:) on your scene’s physics world object to add the behavior to the physics simulation.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512839-addbehavior
   */
  addBehavior(behavior) {
    if(this._allBehaviors.indexOf(behavior) >= 0){
      return
    }
    this._allBehaviors.push(behavior)
  }

  /**
   * Removes a behavior from the physics world.
   * @access public
   * @param {SCNPhysicsBehavior} behavior - The behavior to be removed.
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512870-removebehavior
   */
  removeBehavior(behavior) {
    const index = this._allBehaviors.indexOf(behavior)
    if(index < 0){
      return
    }
    this._allBehaviors.splice(index, 1)
  }

  /**
   * Removes all behaviors affecting bodies in the physics world.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512849-removeallbehaviors
   */
  removeAllBehaviors() {
    this._allBehaviors = []
  }

  /**
   * The list of behaviors affecting bodies in the physics world.
   * @type {SCNPhysicsBehavior[]}
   * @desc 
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512853-allbehaviors
   */
  get allBehaviors() {
    return this._allBehaviors.slice(0)
  }

  // Detecting Contacts Between Physics Bodies

  /**
   * Checks for contacts between two physics bodies.
   * @access public
   * @param {SCNPhysicsBody} bodyA - The first body (to test for contact with the second).
   * @param {SCNPhysicsBody} bodyB - The second body (to test for contact with the first).
   * @param {?Map<SCNPhysicsWorld.TestOption, Object>} [options = null] - A dictionary of options affecting the test, or nil to use default options. For applicable keys and the possible values, see Physics Test Options Keys.
   * @returns {SCNPhysicsContact[]} - 
   * @desc SceneKit sends messages to the physics world’s contactDelegate object only when collisions occur between bodies whose collisionBitMask and categoryBitMask properties overlap, and only for collisions between certain types of bodies. (For details, see SCNPhysicsBodyType.) Use this method to directly test for contacts between any two bodies at a time of your choosing. For example, to implement a game where the player character can pick up an item, you might call this method when the player presses the “pick up” button to see if the player character is in contact with the item to be picked up.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512875-contacttestbetween
   */
  contactTestBetween(bodyA, bodyB, options = null) {
    // FIXME: use physics library
    if((bodyA.categoryBitMask & bodyB.contactTestBitMask) === 0){
      return []
    }
    if(!bodyA.physicsShape || !bodyB.physicsShape){
      return []
    }
    if(bodyA.type === SCNPhysicsBodyType.static && bodyB.type === SCNPhysicsBodyType.static){
      return []
    }
    if(bodyA._position.sub(bodyB._position).length() > bodyA._radius + bodyB._radius){
      return []
    }
    const shapeA = bodyA.physicsShape._shape
    const shapeB = bodyB.physicsShape._shape

    if((shapeA instanceof SCNBox) && (shapeB instanceof SCNBox)){
      return this._contactTestBetweenBoxes(bodyA, bodyB, options)
    }else if((shapeA instanceof SCNBox) && (shapeB instanceof SCNSphere)){
      return this._contactTestBetweenBoxAndSphere(bodyA, bodyB, options)
    }else if((shapeB instanceof SCNBox) && (shapeA instanceof SCNSphere)){
      return this._contactTestBetweenBoxAndSphere(bodyB, bodyA, options, true)
    }else if((shapeA instanceof SCNSphere) && (shapeB instanceof SCNSphere)){
      return this._contactTestBetweenSpheres(bodyA, bodyB, options)
    }
    return []
  }

  _contactTestBetweenBoxes(boxA, boxB, options) {
    const shapeA = boxA.physicsShape._shape
    const shapeB = boxB.physicsShape._shape

    const tb = boxB._transform.mult(boxA._invTransform)
    const nb1 = (new SCNVector3(tb.m11, tb.m12, tb.m13)).normalize()
    const nb2 = (new SCNVector3(tb.m21, tb.m22, tb.m23)).normalize()
    const nb3 = (new SCNVector3(tb.m31, tb.m32, tb.m33)).normalize()
    const b1 = nb1.mul(shapeB.width * 0.5)
    const b2 = nb2.mul(shapeB.height * 0.5)
    const b3 = nb3.mul(shapeB.length * 0.5)
    const d = tb.getTranslation()

    const lax = shapeA.width * 0.5
    const lay = shapeA.height * 0.5
    const laz = shapeA.length * 0.5

    // Ae1
    let rA = lax
    let rB = Math.abs(b1.x) + Math.abs(b2.x) + Math.abs(b3.x)
    let L = Math.abs(d.x)
    if(L > rA + rB){
      return []
    }

    // Ae2
    rA = lay
    rB = Math.abs(b1.y) + Math.abs(b2.y) + Math.abs(b3.y)
    L = Math.abs(d.y)
    if(L > rA + rB){
      return []
    }

    // Ae3
    rA = laz
    rB = Math.abs(b1.z) + Math.abs(b2.z) + Math.abs(b3.z)
    L = Math.abs(d.z)
    if(L > rA + rB){
      return []
    }

    // Be1
    rA = Math.abs(nb1.x * lax) + Math.abs(nb1.y * lay) + Math.abs(nb1.z * laz)
    rB = b1.length()
    L = Math.abs(d.dot(nb1))
    if(L > rA + rB){
      return []
    }

    // Be2
    rA = Math.abs(nb2.x * lax) + Math.abs(nb2.y * lay) + Math.abs(nb2.z * laz)
    rB = b2.length()
    L = Math.abs(d.dot(nb2))
    if(L > rA + rB){
      return []
    }

    // Be3
    rA = Math.abs(nb3.x * lax) + Math.abs(nb3.y * lay) + Math.abs(nb3.z * laz)
    rB = b3.length()
    L = Math.abs(d.dot(nb3))
    if(L > rA + rB){
      return []
    }

    // C11
    let axis = new SCNVector3(0, -nb1.z, nb1.y)
    rA = Math.abs(axis.y * lay) + Math.abs(axis.z * laz)
    rB = Math.abs(axis.dot(b2)) + Math.abs(axis.dot(b3))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C12
    axis = new SCNVector3(0, -nb2.z, nb2.y)
    rA = Math.abs(axis.y * lay) + Math.abs(axis.z * laz)
    rB = Math.abs(axis.dot(b3)) + Math.abs(axis.dot(b1))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C13
    axis = new SCNVector3(0, -nb3.z, nb3.y)
    rA = Math.abs(axis.y * lay) + Math.abs(axis.z * laz)
    rB = Math.abs(axis.dot(b1)) + Math.abs(axis.dot(b2))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C21
    axis = new SCNVector3(nb1.z, 0, -nb1.x)
    rA = Math.abs(axis.x * lax) + Math.abs(axis.z * laz)
    rB = Math.abs(axis.dot(b2)) + Math.abs(axis.dot(b3))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C22
    axis = new SCNVector3(nb2.z, 0, -nb2.x)
    rA = Math.abs(axis.x * lax) + Math.abs(axis.z * laz)
    rB = Math.abs(axis.dot(b3)) + Math.abs(axis.dot(b1))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C23
    axis = new SCNVector3(nb3.z, 0, -nb3.x)
    rA = Math.abs(axis.x * lax) + Math.abs(axis.z * laz)
    rB = Math.abs(axis.dot(b1)) + Math.abs(axis.dot(b2))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C31
    axis = new SCNVector3(-nb1.y, nb1.x, 0)
    rA = Math.abs(axis.x * lax) + Math.abs(axis.y * lay)
    rB = Math.abs(axis.dot(b2)) + Math.abs(axis.dot(b3))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C32
    axis = new SCNVector3(-nb2.y, nb2.x, 0)
    rA = Math.abs(axis.x * lax) + Math.abs(axis.y * lay)
    rB = Math.abs(axis.dot(b3)) + Math.abs(axis.dot(b1))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    // C33
    axis = new SCNVector3(-nb3.y, nb3.x, 0)
    rA = Math.abs(axis.x * lax) + Math.abs(axis.y * lay)
    rB = Math.abs(axis.dot(b1)) + Math.abs(axis.dot(b2))
    L = Math.abs(d.dot(axis))
    if(L > rA + rB){
      return []
    }

    const contact = new SCNPhysicsContact()
    contact._nodeA = boxA._node
    contact._nodeB = boxB._node
    contact._contactPoint = boxA._position.add(d.mul(0.5)) // TODO: implement
    contact._contactNormal = d.normalize() // TODO: implement
    contact._penetrationDistance = 0 // TODO: implement

    return [contact]
  }

  _contactTestBetweenSpheres(sphereA, sphereB, options) {
    const shapeA = sphereA.physicsShape._shape
    const shapeB = sphereB.physicsShape._shape

    const posA = sphereA._position
    const posB = sphereB._position
    const radA = shapeA.radius
    const radB = shapeB.radius
    const vec = posA.sub(posB)
    const l = vec.length()
    if(l > radA + radB){
      return []
    }
    const contact = new SCNPhysicsContact()
    contact._nodeA = sphereA._node
    contact._nodeB = sphereB._node
    contact._contactPoint = posA.add(vec.mul((radA - radB + l) * 0.5))
    contact._contactNormal = vec.mul(-1).normalize()
    contact._penetrationDistance = radA + radB - l
    return [contact]
  }

  _contactTestBetweenBoxAndSphere(box, sphere, reverse = false) {
    const boxShape = box.physicsShape._shape
    const sphereShape = sphere.physicsShape._shape

    const size = new SCNVector3()
    let transform = null
    const spherePos = sphere._position.transform(box._invTransform)
    const v = new SCNVector3()

    const w = boxShape.width * 0.5
    const h = boxShape.height * 0.5
    const l = boxShape.length * 0.5
    if(Math.abs(spherePos.x) - w <= 0){
      v.x = 0
    }else{
      v.x = spherePos.x - w
    }
    if(Math.abs(spherePos.y) - h <= 0){
      v.y = 0
    }else{
      v.y = spherePos.y - h
    }
    if(Math.abs(spherePos.z) - l <= 0){
      v.z = 0
    }else{
      v.z = spherePos.z - l
    }

    const d = v.length()
    if(d > sphereShape.radius){
      return []
    }

    const contact = new SCNPhysicsContact()
    if(reverse){
      contact._nodeA = sphere._node
      contact._nodeB = box._node
    }else{
      contact._nodeA = box._node
      contact._nodeB = sphere._node
    }

    contact._contactPoint = v.transform(box._transform)
    contact._contactNormal = v.rotate(box._transform).normalize()
    if(reverse){
      contact._contactNormal = contact._contactNormal.mul(-1)
    }
    contact._penetrationDistance = d - sphereShape.radius
    return [contact]
  }

  /**
   * Checks for contacts between one physics body and any other bodies in the physics world.
   * @access public
   * @param {SCNPhysicsBody} body - The body to test for contact.
   * @param {?Map<SCNPhysicsWorld.TestOption, Object>} [options = null] - A dictionary of options affecting the test, or nil to use default options. For applicable keys and the possible values, see Physics Test Options Keys.
   * @returns {SCNPhysicsContact[]} - 
   * @desc SceneKit sends messages to the physics world’s contactdelegate object only when collisions occur between bodies whose collisionBitMask and categoryBitMask properties overlap, and only for collisions between certain types of bodies. (For details, see SCNPhysicsBodyType.) Use this method to directly test for all contacts between one body and any other bodies at a time of your choosing. For example, to implement a game with a “wall jump” effect, you could call this method when the player presses the jump button to see if the player character is in contact with any walls.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512841-contacttest
   */
  contactTestWith(body, options = null) {
    return []
  }

  // Searching for Physics Bodies

  /**
   * Searches for physics bodies along a line segment between two points in the physics world.
   * @access public
   * @param {SCNVector3} origin - An endpoint of the line segment to search, specified in the scene’s world coordinate system.
   * @param {SCNVector3} dest - The other endpoint of the line segment to search, specified in the scene’s world coordinate system.
   * @param {?Map<SCNPhysicsWorld.TestOption, Object>} [options = null] - A dictionary of options affecting the test, or nil to use default options. For applicable keys and the possible values, see Physics Test Options Keys.
   * @returns {SCNHitTestResult[]} - 
   * @desc Use this method to implement concepts such as line of sight in your app. For example, in a game you might implement behavior for an enemy character by searching for physics bodies along a line between the enemy character’s position and the player character’s position, as illustrated below:// Options: Look only for the closest object along line of sight,
// and use the collision bitmask to avoid finding the enemy itself.
NSDictionary *options = @{ SCNPhysicsTestSearchModeKey : SCNPhysicsTestSearchModeClosest,
                     SCNPhysicsTestCollisionBitMaskKey : @(kMyCategoryPlayer) };
 
NSArray *results = [physicsWorld rayTestWithSegmentFromPoint:enemy.position
                                                     toPoint:player.position
                                                     options:options];
if (results.firstObject.node == player) {
    // Enemy can see player: begin pursuit.
} else {
    // Enemy cannot see player: remain idle.
}
// Options: Look only for the closest object along line of sight,
// and use the collision bitmask to avoid finding the enemy itself.
NSDictionary *options = @{ SCNPhysicsTestSearchModeKey : SCNPhysicsTestSearchModeClosest,
                     SCNPhysicsTestCollisionBitMaskKey : @(kMyCategoryPlayer) };
 
NSArray *results = [physicsWorld rayTestWithSegmentFromPoint:enemy.position
                                                     toPoint:player.position
                                                     options:options];
if (results.firstObject.node == player) {
    // Enemy can see player: begin pursuit.
} else {
    // Enemy cannot see player: remain idle.
}

   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512857-raytestwithsegment
   */
  rayTestWithSegmentFromTo(origin, dest, options = null) {
    let opt = options
    if(Array.isArray(options)){
      opt = new Map(options)
    }else if(options === null){
      opt = new Map()
    }
    const results = []

    let backfaceCulling = true
    let collisionBitMask = -1
    let searchMode = _TestSearchMode.any
    if(opt.has(_TestOption.backfaceCulling)){
      backfaceCulling = opt.get(_TestOption.backfaceCulling)
    }
    if(opt.has(_TestOption.collisionBitMask)){
      collisionBitMask = opt.get(_TestOption.collisionBitMask)
    }
    if(opt.has(_TestOption.searchMode)){
      searchMode = opt.get(_TestOption.searchMode)
    }
    
    //let originVec = origin._createBtVector3()
    //let destVec = dest._createBtVector3()
    //let rayCallback = null
    //switch(searchMode){
    //  case _TestSearchMode.all:
    //    // TODO: implement
    //    throw new Error('TestSearchMode.all not implemented')
    //  case _TestSearchMode.any:
    //    // TODO: implement
    //    throw new Error('TestSearchMode.any not implemented')
    //  case _TestSearchMode.closest:
    //    rayCallback = new Ammo.ClosestRayResultCallback(originVec, destVec)
    //    break
    //  default:
    //    throw new Error(`unknown search mode: ${searchMode}`)
    //}

    //this._world.rayTest(originVec, destVec, rayCallback)
    //if(rayCallback.hasHit()){
    //  const result = new SCNHitTestResult()
    //  const body = Ammo.btRigidBody.prototype.upcast(rayCallback.get_m_collisionObject())
    //  result._node = null
    //  result._geometryIndex = 0
    //  result._faceIndex = 0
    //  result._worldCoordinates = new SCNVector3(rayCallback.get_m_hitPointWorld())
    //  result._localCoordinates = null
    //  result._worldNormal = new SCNVector3(rayCallback.get_m_hitNormalWorld())
    //  result._localNormal = null
    //  result._modelTransform = null
    //  result._boneNode = null
    //  results.push(result)
    //}

    //Ammo.destroy(originVec)
    //Ammo.destroy(destVec)
    //Ammo.destroy(rayCallback)

    //return results
    const viewProjectionTransform = this._createViewProjectionTransform(origin, dest)
    const from = origin.transform(viewProjectionTransform)
    const to = dest.transform(viewProjectionTransform)
    //console.log('**** rayTestWithSegmentFromTo ****')
    //console.log(`origin: ${origin.floatArray()}`)
    //console.log(`dest: ${dest.floatArray()}`)
    //console.log(`from: ${from.floatArray()}`)
    //console.log(`to: ${to.floatArray()}`)
    
    return this._renderer._physicsHitTestByGPU(viewProjectionTransform, from, to, opt)
  }

  /**
   * @access private
   * @param {SCNVector3} from -
   * @param {SCNVector3} to -
   + @returns {SCNMatrix4} -
   */
  _createViewProjectionTransform(from, to) {
    const vec = to.sub(from)
    const len = vec.length()
    const zNear = 1
    const zFar = zNear + len
    const proj = new SCNMatrix4()
    proj.m11 = 1
    proj.m22 = 1
    proj.m33 = -(zFar + zNear) / len
    proj.m34 = -1
    proj.m43 = -2 * zFar * zNear / len
    // TODO: use an orthographic projection
    //proj.m33 = -2 / len
    //proj.m43 = -(zFar + zNear) / len
    //proj.m44 = 1

    const view = new SCNMatrix4()
    const up = new SCNVector3(0, 1, 0)
    if(vec.x === 0 && vec.z === 0){
      up.y = 0
      up.z = 1
    }
    const f = vec.normalize()
    const s = f.cross(up).normalize()
    const u = s.cross(f).normalize()
    view.m11 = s.x
    view.m21 = s.y
    view.m31 = s.z
    view.m12 = u.x
    view.m22 = u.y
    view.m32 = u.z
    view.m13 = -f.x
    view.m23 = -f.y
    view.m33 = -f.z
    view.m44 = 1
    const eye = from.sub(f.mul(zNear))
    const t = eye.transform(view)
    view.m41 = -t.x
    view.m42 = -t.y
    view.m43 = -t.z

    return view.mult(proj)
  }

  /**
   * Searches for physics bodies in the space formed by moving a convex shape through the physics world.
   * @access public
   * @param {SCNPhysicsShape} shape - A physics shape. This shape must enclose a convex volume. For details on creating shapes that satisfy this requirement, see SCNPhysicsShape.
   * @param {SCNMatrix4} from - A transform matrix representing the initial position and orientation of the shape.
   * @param {SCNMatrix4} to - A transform matrix representing the final position and orientation of the shape.
   * @param {?Map<SCNPhysicsWorld.TestOption, Object>} [options = null] - A dictionary of options affecting the test, or nil to use default options. For applicable keys and the possible values, see Physics Test Options Keys.
   * @returns {SCNPhysicsContact[]} - 
   * @desc Use this method when it’s important to plan for (or avoid) collisions ahead of the physics simulation. For example, in a game you might plan maneuvers for a flying character to fit through the gaps between static bodies in the physics world, as illustrated below:// Look for potential collisions along the spaceship's current path.
SCNMatrix4 current = spaceship.transform;
SCNMatrix4 upAhead = SCNMatrix4Translate(current, 0, 0, LOOK_AHEAD_DISTANCE);
NSArray *contacts = [physicsWorld convexSweepTestWithShape:spaceship.physicsBody.physicsShape
                                             fromTransform:current
                                               toTransform:upAhead
                                                   options:nil];
if (contacts.count == 0) {
    // Flight path looks okay.
} else {
    // Flight path will cause a collision: look for another way around.
}
// Look for potential collisions along the spaceship's current path.
SCNMatrix4 current = spaceship.transform;
SCNMatrix4 upAhead = SCNMatrix4Translate(current, 0, 0, LOOK_AHEAD_DISTANCE);
NSArray *contacts = [physicsWorld convexSweepTestWithShape:spaceship.physicsBody.physicsShape
                                             fromTransform:current
                                               toTransform:upAhead
                                                   options:nil];
if (contacts.count == 0) {
    // Flight path looks okay.
} else {
    // Flight path will cause a collision: look for another way around.
}

   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld/1512859-convexsweeptest
   */
  convexSweepTestWith(shape, from, to, options = null) {
    return null
  }

  // Structures

  /**
   * @type {Object} TestOption
   * @property {string} backfaceCulling The key for choosing whether to ignore back-facing polygons in physics shapes when searching for contacts.
   * @property {string} collisionBitMask The key for selecting which categories of physics bodies that SceneKit should test for contacts.
   * @property {string} searchMode The key for selecting the number and order of contacts to be tested.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld.testoption
   */
  static get TestOption() {
    return _TestOption
  }
  /**
   * @type {Object} TestSearchMode
   * @property {string} all Searches should return all contacts matching the search parameters.
   * @property {string} any Searches should return only the first contact found regardless of its position relative to the search parameters.
   * @property {string} closest Searches should return only the closest contact to the beginning of the search.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsworld.testsearchmode
   */
  static get TestSearchMode() {
    return _TestSearchMode
  }

  _simulate(time) {
    // FIXME: use physics library
    //this._world.stepSimulation(1.0/60.0, 0)
    if(!this._renderer){
      return
    }

    const objects = this._renderer._createRenderingPhysicsNodeArray()
    const contacts = []

    for(const obj of objects){
      const body = obj.physicsBody
      body._prevPosition = body._position
      if(body.type === SCNPhysicsBodyType.kinematic){
        body._resetTransform()
      }else if(body.type === SCNPhysicsBodyType.dynamic){
        // TODO: move physics bodies
      }
      body._positionDiff = body._position.sub(body._prevPosition)
    }

    const staticType = SCNPhysicsBodyType.static
    for(let i=0; i<objects.length; i++){
      const bodyA = objects[i].presentation.physicsBody
      //if(bodyA.type === staticType){
      //  continue
      //}
      if(bodyA.physicsShape._sourceGeometry instanceof SCNCapsule){
        contacts.push(...this._capsuleTestWithObjects(bodyA, objects))
      }
      for(let j=0; j<objects.length; j++){
        if(i === j){
          continue
        }
        const bodyB = objects[j].presentation.physicsBody
        //if(bodyB.physicsShape._sourceGeometry instanceof SCNCapsule){
        //  continue
        //}
        //if(i > j && bodyB.type !== staticType){
        //  continue
        //}
        contacts.push(...this.contactTestBetween(bodyA, bodyB))
      }
    }
    
    if(this.contactDelegate){
      for(const contact of contacts){
        if(this.contactDelegate.physicsWorldDidBegin){
          this.contactDelegate.physicsWorldDidBegin(this, contact)
        }
      }
      // this.contactDelegate.physicsWorldDidUpdate
      // this.contactDelegate.physicsWorldDidEnd
    }

    for(const obj of objects){
      const body = obj.physicsBody
      body._prevPosition = body._position
    }
  }

  _capsuleTestWithObjects(body, objects) {
    const result = []

    const objs = objects.filter((obj) => {
      const bodyB = obj.presentation.physicsBody
      if(bodyB === body){
        return false
      }
      if(bodyB.physicsShape._type !== SCNPhysicsShape.ShapeType.concavePolyhedron){
        return false
      }
      if((body.categoryBitMask & bodyB.contactTestBitMask) !== 0){
        return true
      }
      if((bodyB.categoryBitMask & body.contactTestBitMask) !== 0){
        return true
      }
      return false
    })
    if(objs.length === 0){
      return result
    }

    /*
    const bodyTransform = body._node._worldTransform
    const capsule = body.physicsShape._sourceGeometry
    const origin = (new SCNVector3(0, capsule.height * 0.5, 0)).transform(bodyTransform)
    const dest = (new SCNVector3(0, -capsule.height * 0.5, 0)).transform(bodyTransform)

    const viewProjectionTransform = this._createViewProjectionTransform(origin, dest)
    const from = origin.transform(viewProjectionTransform)
    const to = dest.transform(viewProjectionTransform)
    
    const opt = new Map()
    const opt2 = {
      targets: objs,
      rayRadius: capsule.capRadius
    }

    // TODO: calculate contacts
    const hitResult = this._renderer._physicsHitTestByGPU(viewProjectionTransform, from, to, opt, opt2)
    for(const hit of hitResult){
      const contact = new SCNPhysicsContact()
      contact._nodeA = body._node
      contact._nodeB = hit._node
      contact._contactPoint = hit._worldCoordinates
      contact._contactNormal = hit._worldNormal
      contact._penetrationDistance = 1.0
      result.push(contact)
    }
    return result
    */
    const bodyTransform = body._node._worldTransform
    const capsule = body.physicsShape._sourceGeometry
    //console.warn(`capsule ${body._node.name}`)
    for(const obj of objs){
      if(!this._intersectsBoundingBox(body._node, obj)){
        continue
      }

      //console.warn(`  intersects with ${obj.name}`)

      const contacts = this._contactTestCapsuleAndConcave(body._node, obj)
      result.push(...contacts)
    }
    return result
  }

  _intersectsBoundingBox(node1, node2) {
    const pos1 = node1._worldTranslation
    const pos2 = node2._worldTranslation
    const geo1 = node1.physicsBody.physicsShape._sourceGeometry
    const geo2 = node2.physicsBody.physicsShape._sourceGeometry
    if(!geo1 || !geo2){
      return false
    }
    const box1 = geo1.boundingBox
    const box2 = geo2.boundingBox
    if((box1.min.x + pos1.x > box2.max.x + pos2.x) || (box1.max.x + pos1.x < box2.min.x + pos2.x)){
      return false
    }
    if((box1.min.y + pos1.y > box2.max.y + pos2.y) || (box1.max.y + pos1.y < box2.min.y + pos2.y)){
      return false
    }
    if((box1.min.z + pos1.z > box2.max.z + pos2.z) || (box1.max.z + pos1.z < box2.min.z + pos2.z)){
      return false
    }
    return true
  }

  _contactTestCapsuleAndConcave(capNode, conNode) {
    const result = []
    const capBody = capNode.physicsBody
    const conBody = conNode.physicsBody
    const capsule = capBody.physicsShape._sourceGeometry
    const concave = conBody.physicsShape._sourceGeometry
    const transform = capBody._transform.mult(conBody._invTransform)
    const capSize = capsule.capRadius
    const capHeight = capsule.height * 0.5 - capSize
    const capV = capBody._positionDiff.rotate(transform).normalize()
    const p0 = (new SCNVector3(0, capHeight, 0)).transform(transform)
    const p1 = (new SCNVector3(0, -capHeight, 0)).transform(transform)
    const elems = concave.geometryElements
    const vert = concave.getGeometrySourcesForSemantic(SCNGeometrySource.Semantic.vertex)[0]

    for(const elem of elems){
      if(elem._primitiveType !== SCNGeometryPrimitiveType.triangles){
        continue
      }
      const edata = elem._data
      const elen = elem._primitiveCount
      let ind = 0
      //console.warn(`    elen = ${elen}`)
      for(let i=0; i<elen; i++){
        const v0 = vert._scnVectorAt(edata[ind])
        const v1 = vert._scnVectorAt(edata[ind + 1])
        const v2 = vert._scnVectorAt(edata[ind + 2])
        ind += 3

        //const n = this._normalOfTriangle(v0, v1, v2)
        //if(n.dot(capV) >= 0){
        //  continue
        //}

        const contactInfo = this._capsuleTriangleContact(p0, p1, capSize, v0, v1, v2)
        if(contactInfo){
          const contact = new SCNPhysicsContact()
          contact._nodeA = capNode
          contact._nodeB = conNode
          contact._contactPoint = contactInfo.point
          contact._contactNormal = contactInfo.normal
          contact._penetrationDistance = contactInfo.penetration
          result.push(contact)
        }
      }
    }
    //console.warn(`    result length = ${result.length}`)

    return result
  }

  // http://marupeke296.com/COL_3D_No27_CapsuleCapsule.html

  /**
   * 
   * @access private
   * @param {SCNVector3} p0 - position of an edge of the capsule (in the triangle's coordinate)
   * @param {SCNVector3} p1 - position of another edge of the capsule (in the triangle's coordinate)
   * @param {number} capSize - capsule radius
   * @param {SCNVector3} v0 - vertex position (in the triangle's coordinate)
   * @param {SCNVector3} v1 - vertex position (in the triangle's coordinate)
   * @param {SCNVector3} v2 - vertex position (in the triangle's coordinate)
   * @returns {?Object} -
   *    {SCNVector3} point -
   *    {SCNVector3} normal -
   *    {number} distance -
   */
  _capsuleTriangleContact(p0, p1, capSize, v0, v1, v2) {
    const seg = p1.sub(p0)

    const segTri = this._segmentTriangleIntersection(p0, p1, v0, v1, v2)
    if(segTri.intersection){
      let penetration = 0
      if(segTri.d0 < 0){
        penetration = capSize - segTri.d0
      }else{
        penetration = capSize - segTri.d1
      }
      return {
        point: segTri.intersection,
        normal: segTri.normal,
        distance: 0,
        penetration: penetration
      }
    }

    const d0 = this._segmentSegmentDist(p0, p1, v0, v1)
    let min = d0

    const d1 = this._segmentSegmentDist(p0, p1, v1, v2)
    if(d1.distance < min.distance){
      min = d1
    }

    const d2 = this._segmentSegmentDist(p0, p1, v2, v0)
    if(d2.distance < min.distance){
      min = d2
    }

    const h0 = p0.add(segTri.normal.mul(-segTri.d0))
    if(this._pointIsInsideTriangle(h0, v0, v1, v2)){
      if(Math.abs(segTri.d0) < min.distance){
        min.distance = Math.abs(segTri.d0)
        min.nearestPos1 = h0
      }
    }

    const h1 = p1.add(segTri.normal.mul(-segTri.d1))
    if(this._pointIsInsideTriangle(h1, v0, v1, v2)){
      if(Math.abs(segTri.d1) < min.distance){
        min.distance = Math.abs(segTri.d1)
        min.nearestPos1 = h1
      }
    }

    if(min.distance < capSize){
      return {
        point: min.nearestPos1,
        normal: segTri.normal,
        distance: 0,
        penetration: (capSize - min.distance)
      }
    }

    return null
  }

  /**
   *
   * @access private
   * @param {SCNVector3} p0 - an edge of the segment
   * @param {SCNVector3} p1 - another edge of the segment
   * @param {SCNVector3} v0 - the fist point of the vertex
   * @param {SCNVector3} v1 - the second point of the vertex
   * @param {SCNVector3} v2 - the third point of the vertex
   * @returns {Object} -
   *    {SCNVector3} normal - normal vector of the vertex
   *    {number} d0 - distance between p0 and the plane which contains the vertex
   *    {number} d1 - distance between p1 and the plane which contains the vertex
   *    {?SCNVector3} intersection - intersection point of the segment and the vertex
   */
  _segmentTriangleIntersection(p0, p1, v0, v1, v2) {
    const v0p0 = p0.sub(v0)
    const v0p1 = p1.sub(v0)
    const n = this._normalOfTriangle(v0, v1, v2)
    const d0 = v0p0.dot(n)
    const d1 = v0p1.dot(n)
    const result = { normal: n, d0: d0, d1: d1, intersection: null }
    if(d0 * d1 > 0){
      return result
    }
    const t = d0 / (d0 - d1)
    const h = v0p0.mul(1-t).add(v0p1.mul(t))
    if(!this._pointIsInsideTriangle(h, v0, v1, v2)){
      return result
    }
    result.intersection = h
    return result
  }

  /**
   * 
   * @access private
   * @param {SCNVector3} p0 - the first point of the triangle
   * @param {SCNVector3} p1 - the second point of the triangle
   * @param {SCNVector3} p2 - the third point of the triangle
   * @returns {SCNVector3} - normal vector (normalized)
   */
  _normalOfTriangle(p0, p1, p2) {
    const v1 = p1.sub(p0)
    const v2 = p2.sub(p0)
    return v1.cross(v2).normalize()
  }

  /**
   * 
   * @access private
   * @param {SCNVector3} p - point
   * @param {SCNVector3} p0 - the first point of the triangle
   * @param {SCNVector3} p1 - the second point of the triangle
   * @param {SCNVector3} p2 - the third point of the triangle
   * @returns {boolean} - true if the point is in the triangle.
   */
  _pointIsInsideTriangle(p, p0, p1, p2) {
    const n = this._normalOfTriangle(p0, p1, p2)
    const v0 = p1.sub(p0).cross(n).dot(p.sub(p0))
    const v1 = p2.sub(p1).cross(n).dot(p.sub(p1))
    const v2 = p0.sub(p2).cross(n).dot(p.sub(p2))
    
    if(v0 < 0 && v1 < 0 && v2 < 0){
      return true
    }
    if(v0 > 0 && v1 > 0 && v2 > 0){
      return true
    }
    return false
  }

  /**
   * 
   * @access private
   * @param {SCNVector3} p - point
   * @param {SCNVector3} lp - a point on the line
   * @param {SCNVector3} lv - line vector
   * @returns {Object} -
   *    {number} coeff -
   *    {SCNVector3} nearestPos -
   *    {number} distance -
   */
  _pointLineDist(p, lp, lv) {
    const len2 = lv.length2()
    let t = 0
    if(len2 > 0){
      t = lv.dot(p.sub(lp)) / len2
    }
    const h = lp.add(lv.mul(t))
    const d = h.sub(p).length()
    return {
      coeff: t,
      nearestPos: h,
      distance: d
    }
  }

  /**
   *
   * @access private
   * @param {SCNVector3} p - point
   * @param {SCNVector3} s0 - an edge of the segment
   * @param {SCNVector3} s1 - another edge of the segment
   * @returns {Object} -
   *    {number} coeff -
   *    {SCNVector3} nearestPos -
   *    {number} distance -
   */
  _pointSegmentDist(p, s0, s1) {
    const lv = s1.sub(s0)
    const plDist = this._pointLineDist(p, s0, lv)
    if(plDist.coeff < 0){
      const d = s0.sub(p).length()
      return {
        coeff: plDist.coeff,
        nearestPos: s0,
        distance: d
      }
    }else if(plDist.coeff > 1){
      const d = s1.sub(p).length()
      return {
        coeff: plDist.coeff,
        nearestPos: s1,
        distance: d
      }
    }
    return plDist
  }

  /**
   *
   * @access private
   * @param {SCNVector3} p0 - a point on the first line
   * @param {SCNVector3} v0 - a line vector
   * @param {SCNVector3} p1 - a point on the second line
   * @param {SCNVector3} v1 - a line vector
   * @returns {Object} -
   *    {number} coeff0 -
   *    {SCNVector3} nearestPos0 - 
   *    {number} coeff1 -
   *    {SCNVector3} nearestPos1 -
   *    {number} distance -
   */
  _lineLineDist(p0, v0, p1, v1) {
    if(this._isParallel(v0, v1)){
      const plDist = this._pointLineDist(p0, p1, v1)
      return {
        coeff0: 0,
        nearestPos0: p0,
        coeff1: plDist.coeff,
        nearestPos1: plDist.nearestPos,
        distance: plDist.distance
      }
    }

    const v01 = v0.dot(v1)
    const v00 = v0.dot(v0)
    const v11 = v1.dot(v1)
    const p10 = p0.sub(p1)
    const coeff0 = (v01 * v1.dot(p10) - v11 * v0.dot(p10)) / (v00 * v11 - v01 * v01)
    const np0 = p0.add(v0.mul(coeff0))
    const coeff1 = v1.dot(np0.sub(p1)) / v11
    const np1 = p1.add(v1.mul(coeff1))
    const d = np1.sub(np0).length()

    return {
      coeff0: coeff0,
      nearestPos0: np0,
      coeff1: coeff1,
      nearestPos1: np1,
      distance: d
    }
  }

  /**
   *
   * @access private
   * @param {SCNVector3} v0 - line vector
   * @param {SCNVector3} v1 - line vector
   * @returns {boolean} - true if the lines are parallel
   */
  _isParallel(v0, v1) {
    const l = v0.cross(v1).length2()
    return (l < 0.0000000000001)
  }

  _clamp(val) {
    if(val < 0){
      return 0
    }
    if(val > 1){
      return 1
    }
    return val
  }

  /**
   *
   * @access private
   * @param {SCNVector3} s00 - an edge of the first segment
   * @param {SCNVector3} s01 - another edge of the first segment
   * @param {SCNVector3} s10 - an edge of the second segment
   * @param {SCNVector3} s11 - another edge of the second segment
   * @returns {Object} -
   *    {number} coeff0 -
   *    {SCNVector3} nearestPos0 -
   *    {number} coeff1 -
   *    {SCNVector3} nearestPos1 -
   *    {number} distance -
   */
  _segmentSegmentDist(s00, s01, s10, s11) {
    const v0 = s01.sub(s00)
    const v1 = s11.sub(s10)
    let dist = null
    if(this._isParallel(v0, v1)){
      dist = this._pointSegmentDist(s00, s10, s11)
      if(0.0 <= dist.coeff && dist.coeff <= 1.0){
        return {
          coeff0: 0.0,
          nearestPos0: s00,
          coeff1: dist.coeff,
          nearestPos1: dist.nearestPos,
          distance: dist.distance
        }
      }
      dist.coeff0 = 0.0
      dist.coeff1 = dist.coeff
    }else{
      dist = this._lineLineDist(s00, v0, s10, v1)
      if(0.0 <= dist.coeff0 && dist.coeff0 <= 1.0
        && 0.0 <= dist.coeff1 && dist.coeff1 <= 1.0){
        return dist
      }
    }
    
    let dist2 = dist
    const t0 = this._clamp(dist.coeff0)
    if(t0 !== dist.coeff0){
      const p0 = s00.add(v0.mul(t0))
      dist2 = this._pointSegmentDist(p0, s10, s11)
      if(0.0 <= dist2.coeff && dist2.coeff <= 1.0){
        return {
          coeff0: t0,
          nearestPos0: p0,
          coeff1: dist2.coeff,
          nearestPos1: dist2.nearestPos,
          distance: dist2.distance
        }
      }
      dist2.coeff1 = dist2.coeff
    }

    const t1 = this._clamp(dist2.coeff1)
    const p1 = s10.add(v1.mul(t1))
    const dist3 = this._pointSegmentDist(p1, s00, s01)
    if(0.0 <= dist3.coeff && dist3.coeff <= 1.0){
      return {
        coeff0: dist3.coeff,
        nearestPos0: dist3.nearestPos,
        coeff1: t1,
        nearestPos1: p1,
        distance: dist3.distance
      }
    }

    const t = this._clamp(dist3.coeff)
    const p = s00.add(v0.mul(t))
    const d = p1.sub(p).length()
    return {
      coeff0: t,
      nearestPos0: p,
      coeff1: t1,
      nearestPos1: p1,
      distance: d
    }
  }
}
