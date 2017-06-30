'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNBox from './SCNBox'
import SCNCapsule from './SCNCapsule'
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
 * @see https://developer.apple.com/reference/scenekit/scnphysicsworld
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
     * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512855-gravity
     */
    this.gravity = new SCNVector3(0, 0, 0)

    /**
     * The rate at which the simulation executes.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512851-speed
     */
    this.speed = 0

    /**
     * The time interval between updates to the physics simulation.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512881-timestep
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
     * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512843-contactdelegate
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512877-updatecollisionpairs
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512839-addbehavior
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512870-removebehavior
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512849-removeallbehaviors
   */
  removeAllBehaviors() {
    this._allBehaviors = []
  }

  /**
   * The list of behaviors affecting bodies in the physics world.
   * @type {SCNPhysicsBehavior[]}
   * @desc 
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512853-allbehaviors
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512875-contacttestbetween
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512841-contacttest
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

   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512857-raytestwithsegment
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

   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld/1512859-convexsweeptest
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
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld.testoption
   */
  static get TestOption() {
    return _TestOption
  }
  /**
   * @type {Object} TestSearchMode
   * @property {string} all Searches should return all contacts matching the search parameters.
   * @property {string} any Searches should return only the first contact found regardless of its position relative to the search parameters.
   * @property {string} closest Searches should return only the closest contact to the beginning of the search.
   * @see https://developer.apple.com/reference/scenekit/scnphysicsworld.testsearchmode
   */
  static get TestSearchMode() {
    return _TestSearchMode
  }

  _simulate(time) {
    // FIXME: use physics library
    //this._world.stepSimulation(1.0/60.0, 0)

    const objects = this._renderer._createRenderingPhysicsNodeArray()
    const contacts = []

    for(const obj of objects){
      const body = obj.physicsBody
      if(body.type === SCNPhysicsBodyType.kinematic){
        body._resetTransform()
      }
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
        this.contactDelegate.physicsWorldDidBegin(this, contact)
      }
      // this.contactDelegate.physicsWorldDidUpdate
      // this.contactDelegate.physicsWorldDidEnd
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
  }
}
