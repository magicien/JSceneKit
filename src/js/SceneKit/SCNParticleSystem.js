'use strict'

import _BinaryRequest from '../util/_BinaryRequest'
import NSKeyedUnarchiver from '../Foundation/NSKeyedUnarchiver'
import NSObject from '../ObjectiveC/NSObject'
//import SCNAnimatable from './SCNAnimatable'
//import SCNGeometry from './SCNGeometry'
import SCNMatrix4 from './SCNMatrix4'
import SCNParticleBirthLocation from './SCNParticleBirthLocation'
import SCNParticleBirthDirection from './SCNParticleBirthDirection'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNOrderedDictionary from './SCNOrderedDictionary'
import SCNParticleImageSequenceAnimationMode from './SCNParticleImageSequenceAnimationMode'
//import SCNNode from './SCNNode'
import SCNParticleBlendMode from './SCNParticleBlendMode'
import SCNParticleOrientationMode from './SCNParticleOrientationMode'
import SCNParticleSortingMode from './SCNParticleSortingMode'
//import SCNParticleEvent from './SCNParticleEvent'
//import SCNParticleEventBlock from './SCNParticleEventBlock'
//import SCNParticlePropertyController from './SCNParticlePropertyController'
//import SCNParticleModifierStage from './SCNParticleModifierStage'
//import SCNParticleModifierBlock from './SCNParticleModifierBlock'
import SCNTransaction from './SCNTransaction'
import SKColor from '../SpriteKit/SKColor'

const _ParticleProperty = {
  angle: 'Angle',
  angularVelocity: 'AngularVelocity',
  bounce: 'Bounce',
  charge: 'Charge',
  color: 'Color',
  contactNormal: 'ContactNormal',
  contactPoint: 'ContactPoint',
  frame: 'Frame',
  frameRate: 'FrameRate',
  friction: 'Friction',
  life: 'Life',
  opacity: 'Opacity',
  position: 'Position',
  rotationAxis: 'RotationAxis',
  size: 'Size',
  velocity: 'Velocity'
}

class _Particle extends NSObject {
  /**
   * @access public
   * @constructor
   */
  constructor() {
    super()

    /**
     * @type {SCNVector3}
     */
    this.position = null

    /**
     * @type {SCNVector3}
     */
    this.axis = null

    /**
     * @type {number}
     */
    this.angle = 0
    
    /**
     * @type {number}
     */
    this.size = 1

    this.baseSize = 1

    /**
     * @type {SKColor}
     */
    this.color = null

    /**
     * @type {SCNVector3}
     */
    this.velocity = null

    /**
     * @type {number}
     */
    this.angularVelocity = 0

    /**
     * @type {SCNVector3}
     */
    this.acceleration = null

    /**
     * @type {number}
     */
    this.birthTime = 0

    /**
     * @type {number}
     */
    this.lifeSpan = 0

    /**
     * @type {number}
     */
    this.imageFrameRate = 0

    /**
     * @type {number}
     */
    this.initialImageFrame = 0

    /**
     * @type {number}
     */
    this.texLeft = 0

    /**
     * @type {number}
     */
    this.texRight = 0

    /**
     * @type {number}
     */
    this.texTop = 0

    /**
     * @type {number}
     */
    this.texBottom = 0

    this._maxParticleIndex = 0
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray() {
    const baseArray = [
      ...this.position.floatArray(), 
      ...this.velocity.floatArray(),
      ...this.axis.floatArray(), this.angle,
      ...this.color.floatArray(),
      this.size
    ]
    return [
      ...baseArray, -1.0, -1.0, this.texLeft, this.texTop,
      ...baseArray, 1.0, -1.0, this.texRight, this.texTop,
      ...baseArray, -1.0, 1.0, this.texLeft, this.texBottom,
      ...baseArray, 1.0, 1.0, this.texRight, this.texBottom
    ]
  }

  valueForKeyPath(keyPath) {
    if(keyPath === 'size'){
      return this.baseSize
    }
    return super.valueForKeyPath(keyPath)
  }

  /**
   * @access public
   * @returns {Float32Array} -
   */
  float32Array() {
    return new Float32Array(this.floatArray())
  }
}

/**
 * Manages the animation and rendering of a system of small image sprites, or particles, using a high-level simulation whose general behavior you specify.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem
 */
export default class SCNParticleSystem extends NSObject {
  static get _propTypes() {
    return {
      emissionDuration: 'float',
      emissionDurationVariation: 'float',
      idleDuration: 'float',
      idleDurationVariation: 'float',
      loops: 'boolean',
      warmupDuration: 'float',
      birthRate: ['float', '_birthRate'],
      birthRateVariation: 'float',
      emitterShape: 'SCNGeometry',
      birthLocation: 'integer',
      birthDirection: 'integer',
      emittingDirection: 'SCNVector3',
      spreadingAngle: 'float',
      particleAngle: 'float',
      particleAngleVariation: 'float',
      particleVelocity: 'float',
      particleVelocityVariation: 'float',
      particleAngularVelocity: 'float',
      particleAngularVelocityVariation: 'float',
      particleLifeSpan: 'float',
      particleLifeSpanVariation: 'float',
      particleSize: 'float',
      particleSizeVariation: 'float',
      particleColor: 'plist',
      particleColorVariation: 'SCNVector4',
      particleImage: ['NSMutableDictionary', (obj, dict, key, coder) => {
        let path = ''
        if(typeof dict.path !== 'undefined'){
          path = dict.path
        }else if(typeof dict.URL !== 'undefined'){
          path = dict.URL
        }
        obj._loadParticleImage(path, coder._directoryPath)
      }],
      fresnelExponent: 'float',
      stretchFactor: 'float',
      imageSequenceRowCount: 'integer',
      imageSequenceColumnCount: 'integer',
      imageSequenceInitialFrame: 'float',
      imageSequenceInitialFrameVariation: 'float',
      imageSequenceFrameRate: 'float',
      imageSequenceFrameRateVariation: 'float',
      imageSequenceAnimationMode: 'integer',
      affectedByGravity: ['boolean', 'isAffectedByGravity'],
      affectedByPhysicsFields: ['boolean', 'isAffectedByPhysicsFields'],
      colliderNodes: 'NSArray',
      particleDiesOnCollision: 'boolean',
      acceleration: 'SCNVector3',
      dampingFactor: 'float',
      particleMass: 'float',
      particleMassVariation: 'float',
      particleCharge: 'float',
      particleChargeVariation: 'float',
      particleBounce: 'float',
      particleBounceVariation: 'float',
      particleFriction: 'float',
      particleFrictionVariation: 'float',
      systemSpawnedOnCollision: 'SCNParticleSystem',
      systemSpawnedOnDying: 'SCNParticleSystem',
      systemSpawnedOnLiving: 'SCNParticleSystem',
      blendMode: 'integer',
      orientationMode: 'integer',
      sortingMode: 'integer',
      lightingEnabled: ['boolean', 'isLightingEnabled'],
      blackPassEnabled: ['boolean', 'isBlackPassEnabled'],
      isLocal: 'boolean',
      speedFactor: 'float',
      propertyControllers: ['NSMutableDictionary', (obj, dict) => {
        Object.keys(_ParticleProperty).forEach((key) => {
          const d = dict[_ParticleProperty[key]]
          if(typeof d !== 'undefined'){
            d.animation.keyPath = key
            //console.error(`SCNParticleSystem key: ${key}, ${d.animation.className}`)
            if(key === 'size'){
              d.animation._isMultiplicative = true
            }
          }
        })
        obj.propertyControllers = dict
      }],

      seed: ['integer', null],
      softParticlesEnabled: ['boolean', null],
      fixedTimeStep: ['float', null],
      renderingMode: ['integer', null],
      physicsCollisionsEnabled: ['boolean', null],
      orientationDirection: ['SCNVector3', null],
      particleIntensity: ['float', null],
      particleIntensityVariation: ['float', null]
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   * @param {string} name - The name of a particle system file in the app’s bundle resources directory, with or without the .scnp extension.
   * @param {?string} directory - The subdirectory path in the app’s bundle resources directory.
   */
  constructor(name = null, directory = null) {
    super()

    // Managing Particle Emission Timing

    /**
     * The duration, in seconds, over which the system spawns new particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523998-emissionduration
     */
    this.emissionDuration = 1.0

    /**
     * The range, in seconds, of randomized emission duration values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523842-emissiondurationvariation
     */
    this.emissionDurationVariation = 0.0

    /**
     * The duration, in seconds, of periods when the system emits no particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522998-idleduration
     */
    this.idleDuration = 0.0

    /**
     * The range, in seconds, of randomized idle duration values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523018-idledurationvariation
     */
    this.idleDurationVariation = 0.0

    /**
     * A Boolean value that determines whether the system repeats its emission and idle periods.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522618-loops
     */
    this.loops = true

    /**
     * The duration, in seconds, for which particles are spawned before the system is first rendered. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522597-warmupduration
     */
    this.warmupDuration = 0.0

    /**
     * The number of particles spawned during each emission period. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522857-birthrate
     */
    this._birthRate = 0.0

    /**
     * The range of randomized particle birth rate values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524147-birthratevariation
     */
    this.birthRateVariation = 0.0


    // Managing Particle Emission Locations

    /**
     * The shape of the region of space where the system spawns new particles.
     * @type {?SCNGeometry}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522737-emittershape
     */
    this.emitterShape = null

    /**
     * The possible locations for newly spawned particles, relative to the emitter shape.
     * @type {SCNParticleBirthLocation}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522899-birthlocation
     */
    this.birthLocation = SCNParticleBirthLocation.surface

    /**
     * The possible initial directions for newly spawned particles, relative to the emitter shape.
     * @type {SCNParticleBirthDirection}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523361-birthdirection
     */
    this.birthDirection = SCNParticleBirthDirection.constant

    /**
     * The initial direction for newly spawned particles. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523600-emittingdirection
     */
    this.emittingDirection = new SCNVector3(0, 1, 0)

    /**
     * The range, in degrees, of randomized initial particle directions. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522862-spreadingangle
     */
    this.spreadingAngle = 0.0


    // Managing Particle Motion

    /**
     * The rotation angle, in degrees, of newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523896-particleangle
     */
    this.particleAngle = 0.0

    /**
     * The range, in degrees of randomized initial particle angles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522828-particleanglevariation
     */
    this.particleAngleVariation = 0.0

    /**
     * The initial speed, in units per second, for newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523946-particlevelocity
     */
    this.particleVelocity = 0.0

    /**
     * The range, in units per second, of randomized initial particle speeds. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524157-particlevelocityvariation
     */
    this.particleVelocityVariation = 0.0

    /**
     * The initial spin rate, in degrees per second, of newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522757-particleangularvelocity
     */
    this.particleAngularVelocity = 0.0

    /**
     * The range, in degrees per second, of randomized initial angular velocities for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523590-particleangularvelocityvariation
     */
    this.particleAngularVelocityVariation = 0.0

    /**
     * The duration, in seconds, for which each particle is rendered before being removed from the scene. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523575-particlelifespan
     */
    this.particleLifeSpan = 1.0

    /**
     * The range, in seconds, of randomized particle life spans. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523567-particlelifespanvariation
     */
    this.particleLifeSpanVariation = 0.0


    // Specifying Particle Appearance

    /**
     * The rendered size, in units of the scene’s world coordinate space, of the particle image. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523508-particlesize
     */
    this.particleSize = 1.0

    /**
     * The range of randomized particle sizes. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522716-particlesizevariation
     */
    this.particleSizeVariation = 0.0

    /**
     * The color of newly spawned particles. Animatable.
     * @type {SKColor}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523248-particlecolor
     */
    this.particleColor = SKColor.white

    /**
     * The ranges of randomized particle color components. Animatable.
     * @type {SCNVector4}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523639-particlecolorvariation
     */
    this.particleColorVariation = new SCNVector4(0, 0, 0, 0)

    /**
     * The texture image SceneKit uses to render each particle.
     * @type {?Object}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524153-particleimage
     */
    this.particleImage = null

    /**
     * The reflectivity exponent SceneKit uses when rendering the particle’s image as a cube map. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523317-fresnelexponent
     */
    this.fresnelExponent = 0.0

    /**
     * A multiplier for stretching particle images along their direction of motion. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523338-stretchfactor
     */
    this.stretchFactor = 0.0


    // Animating Particle Images

    /**
     * The number of rows for treating the particle image as a grid of animation frames.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523340-imagesequencerowcount
     */
    this.imageSequenceRowCount = 1

    /**
     * The number of columns for treating the particle image as a grid of animation frames.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523462-imagesequencecolumncount
     */
    this.imageSequenceColumnCount = 1

    /**
     * The index of the first frame in a particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523511-imagesequenceinitialframe
     */
    this.imageSequenceInitialFrame = 0.0

    /**
     * The range of randomized initial frames for particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523821-imagesequenceinitialframevariati
     */
    this.imageSequenceInitialFrameVariation = 0.0

    /**
     * The rate, in frames per second, of particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524075-imagesequenceframerate
     */
    this.imageSequenceFrameRate = 0.0

    /**
     * The range, in frames per second, of randomized frame rates for particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523667-imagesequenceframeratevariation
     */
    this.imageSequenceFrameRateVariation = 0.0

    /**
     * The animation mode for particle image animation.
     * @type {SCNParticleImageSequenceAnimationMode}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522816-imagesequenceanimationmode
     */
    this.imageSequenceAnimationMode = SCNParticleImageSequenceAnimationMode.repeat


    // Simulating Physics for Particles

    /**
     * A Boolean value that determines whether gravity, as defined by the scene’s physics simulation, affects the motion of particles.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523452-isaffectedbygravity
     */
    this.isAffectedByGravity = false

    /**
     * A Boolean value that determines whether physics fields in the scene affect the motion of particles.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523353-isaffectedbyphysicsfields
     */
    this.isAffectedByPhysicsFields = false

    /**
     * The nodes whose geometry the system’s particles can collide with.
     * @type {?SCNNode[]}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523516-collidernodes
     */
    this.colliderNodes = null

    /**
     * A Boolean value that determines whether particles are removed from the scene upon colliding with another object.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523357-particlediesoncollision
     */
    this.particleDiesOnCollision = false

    /**
     * The constant acceleration vector, in units per second per second, applied to all particles in the system. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522766-acceleration
     */
    this.acceleration = new SCNVector3(0, 0, 0)

    /**
     * A factor that slows particles relative to their velocity. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522931-dampingfactor
     */
    this.dampingFactor = 0.0

    /**
     * The mass, in kilograms, of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522607-particlemass
     */
    this.particleMass = 1.0

    /**
     * The range, in kilograms, of randomized particle masses. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523408-particlemassvariation
     */
    this.particleMassVariation = 0.0

    /**
     * The electric charge, in coulombs, of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523156-particlecharge
     */
    this.particleCharge = 0.0

    /**
     * The range, in coulombs, of randomized particle charges. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523377-particlechargevariation
     */
    this.particleChargeVariation = 0.0

    /**
     * The restitution coefficient of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522637-particlebounce
     */
    this.particleBounce = 0.7

    /**
     * The range of randomized restitution coefficients for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522662-particlebouncevariation
     */
    this.particleBounceVariation = 0.0

    /**
     * The friction coefficient of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524010-particlefriction
     */
    this.particleFriction = 1.0

    /**
     * The range of randomized friction coefficients for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522868-particlefrictionvariation
     */
    this.particleFrictionVariation = 0.0


    // Spawning Additional Particle Systems

    /**
     * Another particle system to be added to the scene when a particle collides with scene geometry.
     * @type {?SCNParticleSystem}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524068-systemspawnedoncollision
     */
    this.systemSpawnedOnCollision = null

    /**
     * Another particle system to be added to the scene when a particle dies.
     * @type {?SCNParticleSystem}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524091-systemspawnedondying
     */
    this.systemSpawnedOnDying = null

    /**
     * Another particle system to be added to the scene for each living particle in the system.
     * @type {?SCNParticleSystem}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522751-systemspawnedonliving
     */
    this.systemSpawnedOnLiving = null


    // Managing Particle Rendering

    /**
     * The blending mode for compositing particle images into the rendered scene.
     * @type {SCNParticleBlendMode}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523728-blendmode
     */
    this.blendMode = SCNParticleBlendMode.additive

    /**
     * The mode defining whether and how particles may rotate.
     * @type {SCNParticleOrientationMode}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523131-orientationmode
     */
    this.orientationMode = SCNParticleOrientationMode.billboardScreenAligned

    /**
     * The mode defining the order in which SceneKit renders the system’s particles.
     * @type {SCNParticleSortingMode}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522795-sortingmode
     */
    this.sortingMode = SCNParticleSortingMode.none

    /**
     * A Boolean value that determines whether SceneKit applies lighting to particle images when rendering.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522794-islightingenabled
     */
    this.isLightingEnabled = false

    /**
     * A Boolean value that determines whether SceneKit renders particles in black before rendering the particle image.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523901-isblackpassenabled
     */
    this.isBlackPassEnabled = false


    // Controlling Particle Simulation

    /**
     * A Boolean value that specifies whether the particle simulation runs in the local coordinate space of the node containing it.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522855-islocal
     */
    this.isLocal = false

    /**
     * A multiplier for the speed at which SceneKit runs the particle simulation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522988-speedfactor
     */
    this.speedFactor = 1.0


    // Modifying Particles Over Time

    /**
     * A dictionary that optionally associates particle properties with objects that animate a property’s value for each particle.
     * @type {?Map<SCNParticleSystem.ParticleProperty, SCNParticlePropertyController>}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522775-propertycontrollers
     */
    this.propertyControllers = null

    this._program = null
    this._vertexArray = null
    this._vertexBuffer = null
    this._indexBuffer = null
    this._particles = []
    this._glIndexSize = null
    this._particleTexture = null

    this._finished = false
    this._startTime = null
    this._prevTime = 0
    this._nextBirthTime = 0
    this._emissionEndTime = 0
    this._idleEndTime = 0
    this._numImages = null
    this._imageWidth = null
    this._imageHeight = null

    this.__presentation = null

    ///////////////////
    // SCNAnimatable //
    ///////////////////

    /**
     * @access private
     * @type {SCNOrderedDictionary}
     */
    this._animations = new SCNOrderedDictionary()

    /**
     * @access private
     * @type {Promise}
     */
    this._loadedPromise = null
  }

  // Creating a Particle System

  /**
   * Loads a particle system from a file in the app’s bundle resources.
   * @access public
   * @param {string} name - The name of a particle system file in the app’s bundle resources directory, with or without the .scnp extension.
   * @param {?string} directory - The subdirectory path in the app’s bundle resources directory.
   * @returns {void}
   * @desc A SceneKit particle file created by Xcode contains an archived SCNParticleSystem instance, so you can also use the NSKeyedArchiver and NSKeyedUnarchiver classes to write and read particle files.
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522772-init
   */
  static systemNamedInDirectory(name, directory = null) {
    //const system = new SCNParticleSystem(name, directory)
    if(name !== null){
      let path = name
      if(directory !== null){
        path = `${directory}/${name}`
      }
      return _BinaryRequest.get(path)
        .then((data) => {
          const system = NSKeyedUnarchiver.unarchiveObjectWithData(data, path)
          if(!(system instanceof SCNParticleSystem)){
            throw new Error(`file ${path} is not an instance of SCNParticleSystem`)
          }
          // FIXME: wait for images
          system._loadedPromise = Promise.resolve(system)
          return system
        })
    }
    return null
  }

  // Controlling Particle Simulation

  /**
   * Returns the particle system to its initial state.
   * @access public
   * @returns {void}
   * @desc Calling this method removes all currently live particles from the scene.
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522968-reset
   */
  reset() {
    this._finished = false
    this._startTime = null
    this._prevTime = 0
    this._nextBirthTime = 0
    this._emissionEndTime = 0
    this._idleEndTime = 0

    this._particles = []
  }

  // Modifying Particles in Response to Particle System Events

  /**
   * Adds a block that modifies particle properties, to be executed at a specified event in the lifetimes of particles in the system.
   * @access public
   * @param {SCNParticleEvent} event - The event at which to call the block. See SCNParticleEvent for allowed values.
   * @param {SCNParticleSystem.ParticleProperty[]} properties - An array containing one or more of the constants listed in Particle Property Keys, each of which specifies a property of the appearance or behaviors of particles in the particle system.
   * @param {SCNParticleEventBlock} block - A SCNParticleEventBlock block to be called every time SceneKit renders a frame. In this block you can modify the properties of particles in the system.
   * @returns {void}
   * @desc By associating a block with one or more particle properties, you can run arbitrary code that modifies those properties when a significant event in the particle simulation occurs for one or more particles. For example, you can use the following code with a confetti effect to randomly switch between two distinct colors for each spawned particle:[system handleEvent:SCNParticleEventBirth
      forProperties:@[SCNParticlePropertyColor]
          withBlock:^(void **data, size_t *dataStride, uint32_t *indices , NSInteger count) {
              for (NSInteger i = 0; i < count; ++i) {
                  float *color = (float *)((char *)data[0] + dataStride[0] * i);
                  if (rand() & 0x1) { // Switch the green and red color components.
                      color[0] = color[1];
                      color[1] = 0;
                  }
              }
          }];
[system handleEvent:SCNParticleEventBirth
      forProperties:@[SCNParticlePropertyColor]
          withBlock:^(void **data, size_t *dataStride, uint32_t *indices , NSInteger count) {
              for (NSInteger i = 0; i < count; ++i) {
                  float *color = (float *)((char *)data[0] + dataStride[0] * i);
                  if (rand() & 0x1) { // Switch the green and red color components.
                      color[0] = color[1];
                      color[1] = 0;
                  }
              }
          }];

   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523251-handle
   */
  handleForPropertiesHandler(event, properties, block) {
  }

  // Modifying Particles Over Time

  /**
   * Adds a block that modifies particle properties, to be executed each time SceneKit renders a frame.
   * @access public
   * @param {SCNParticleSystem.ParticleProperty[]} properties - An array containing one or more of the constants listed in Particle Property Keys, each of which specifies a property of the appearance or behaviors of particles in the particle system.
   * @param {SCNParticleModifierStage} stage - The stage of SceneKit’s particle simulation during which to call the block. See SCNParticleModifierStage for allowed values.
   * @param {SCNParticleModifierBlock} block - A SCNParticleModifierBlock block to be called every time SceneKit renders a frame. In this block you can modify the properties of all particles in the system.
   * @returns {void}
   * @desc By associating a block with one or more particle properties, you can run arbitrary code that modifies those properties during each frame of animation. This option provides maximum flexibility for changing the appearance or behavior of particles over time. ImportantRunning your own code to update particle properties every frame can have a severe impact on rendering performance. If the behavior over time that you want for your particle system can be described more declaratively, use the propertyControllers property and SCNParticlePropertyController class instead. If you need to change particle properties only at certain times (rather than continuously), add a handler block for an event using the handle(_:forProperties:handler:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522635-addmodifier
   */
  addModifierForPropertiesAtModifier(properties, stage, block) {
  }

  /**
   * Removes particle modifier blocks for the specified stage of the particle simulation.
   * @access public
   * @param {SCNParticleModifierStage} stage - The stage of SceneKit’s particle simulation during which to call the block. See SCNParticleModifierStage for allowed values.
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1524077-removemodifiers
   */
  removeModifiersAt(stage) {
  }

  /**
   * Removes all particle modifier blocks associated with the particle system.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1523614-removeallmodifiers
   */
  removeAllModifiers() {
  }

  // Structures
  /**
   * @type {Object} ParticleProperty
   * @property {string} angle The rotation angle, in radians, of the particle about its axis.
   * @property {string} angularVelocity The particle’s angular velocity (or rate of spin), in radians per second.
   * @property {string} bounce The particle’s restitution coefficient.
   * @property {string} charge The particle’s electric charge, in coulombs.
   * @property {string} color The particle’s tint color, as a vector of red, green, blue, and alpha component values.
   * @property {string} contactNormal The normal vector, in scene coordinate space, of a collision between a particle and a geometry in the scene.
   * @property {string} contactPoint The location, in scene coordinate space, of a collision between a particle and a geometry in the scene.
   * @property {string} frame The current frame index of the particle’s image animation.
   * @property {string} frameRate The rate, in frames per second, of the particle’s image animation.
   * @property {string} friction The particle’s friction coefficient.
   * @property {string} life The remaining time in the particle’s life span, in seconds.
   * @property {string} opacity The particle’s opacity (or alpha value).
   * @property {string} position The particle’s position vector in scene coordinate space.
   * @property {string} rotationAxis The particle’s axis of rotation, expressed as a vector in the particle’s local coordinate space.
   * @property {string} size The width and height of the rendered particle image, in units of scene coordinate space.
   * @property {string} velocity The particle’s velocity vector in units (of scene coordinate space) per second.
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem.particleproperty
   */
  static get ParticleProperty() {
    return _ParticleProperty
  }

  /**
   * @access private
   * @param {string} path -
   * @param {string} directoryPath -
   * @returns {Image} -
   */
  _loadParticleImage(path, directoryPath) {
    const image = new Image()
    let __path = path
    if(__path.indexOf('file:///') === 0){
      __path = __path.slice(8)
    }
    // TODO: load OpenEXR File
    __path = __path.replace(/\.exr$/, '.png')

    this._loadedPromise = new Promise((resolve, reject) => {
      const paths = __path.split('/')
      let pathCount = 1
      let _path = directoryPath + paths.slice(-pathCount).join('/')
      image.onload = () => {
        this.particleImage = image
        resolve()
      }
      image.onerror = () => {
        pathCount += 1
        if(pathCount > paths.length){
          // try the root path
          image.onerror = () => {
            // give up
            reject()
          }
          image.src = __path
        }else{
          // retry
          _path = directoryPath + paths.slice(-pathCount).join('/')
          image.src = _path
        }
      }
      image.src = _path
    })
    return image
  }

  _initializeVAO(gl, program) {
    if(this._vertexArray !== null){
      return
    }
    this._vertexArray = gl.createVertexArray()
    gl.bindVertexArray(this._vertexArray)

    this._vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)

    // prepare vertex array data
    // TODO: retain attribute locations
    const positionLoc = gl.getAttribLocation(program, 'position')
    const velocityLoc = gl.getAttribLocation(program, 'velocity')
    const rotationLoc = gl.getAttribLocation(program, 'rotation')
    const colorLoc = gl.getAttribLocation(program, 'color')
    const sizeLoc = gl.getAttribLocation(program, 'size')
    //const lifeLoc = gl.getAttribLocation(program, 'life')
    const cornerLoc = gl.getAttribLocation(program, 'corner')
    const texcoordLoc = gl.getAttribLocation(program, 'texcoord')

    // vertexAttribPointer(ulong idx, long size, ulong type, bool norm, long stride, ulong offset)
    const stride = 76
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, stride, 0)
    gl.enableVertexAttribArray(velocityLoc)
    gl.vertexAttribPointer(velocityLoc, 3, gl.FLOAT, false, stride, 12)
    gl.enableVertexAttribArray(rotationLoc)
    gl.vertexAttribPointer(rotationLoc, 4, gl.FLOAT, false, stride, 24)
    gl.enableVertexAttribArray(colorLoc)
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, stride, 40)
    gl.enableVertexAttribArray(sizeLoc)
    gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, stride, 56)
    gl.enableVertexAttribArray(cornerLoc)
    gl.vertexAttribPointer(cornerLoc, 2, gl.FLOAT, false, stride, 60)
    gl.enableVertexAttribArray(texcoordLoc)
    gl.vertexAttribPointer(texcoordLoc, 2, gl.FLOAT, false, stride, 68)

    /*
    const arr = []
    this._particles.forEach((particle) => {
      arr.push(...particle.floatArray())
    })
    const particleData = new Float32Array(arr)
    gl.bufferData(gl.ARRAY_BUFFER, particleData, gl.DYNAMIC_DRAW)
    */

    const len = this._maxParticles + 5
    this._updateIndexBuffer(gl, len)
    
    // initialize parameters
    this._numImages = this.imageSequenceRowCount * this.imageSequenceColumnCount
    this._imageWidth = 1.0 / this.imageSequenceColumnCount
    this._imageHeight = 1.0 / this.imageSequenceRowCount
  }

  _updateIndexBuffer(context, length) {
    const gl = context
    const indexData = []
    let index=0
    for(let i=0; i<length; i++){
      indexData.push(index + 0)
      indexData.push(index + 3)
      indexData.push(index + 2)
      indexData.push(index + 0)
      indexData.push(index + 1)
      indexData.push(index + 3)
      index += 4
    }
    let glIndexData = null
    if(index < 256){
      glIndexData = new Uint8Array(indexData)
      this._glIndexSize = gl.UNSIGNED_BYTE
    }else if(index < 65536){
      glIndexData = new Uint16Array(indexData)
      this._glIndexSize = gl.UNSIGNED_SHORT
    }else{
      glIndexData = new Uint32Array(indexData)
      this._glIndexSize = gl.UNSIGNED_INT
    }

    if(this._indexBuffer === null){
      this._indexBuffer = gl.createBuffer()
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glIndexData, gl.STATIC_DRAW)

    this._maxParticleIndex = length
  }

  /**
   * @access private
   * @param {number} birthTime -
   * @param {SCNVector3} position -
   * @param {SCNVector4} orientation -
   * @returns {_Particle} -
   */
  //_createParticle(birthTime, position, orientation) {
  _createParticle(birthTime, transform) {
    const p = new _Particle()

    const position = transform.getTranslation()
    const velocity = this.particleVelocity + this.particleVelocityVariation * (Math.random() - 0.5)
    const spreadingAngle = this.spreadingAngle / 180.0 * Math.PI * Math.random()
    const spreadingAngleRot = 2.0 * Math.PI * Math.random()
    const angleMat = SCNMatrix4.matrixWithRotation(this._normal.x, this._normal.y, this._normal.z, spreadingAngle)
    const rotMat = SCNMatrix4.matrixWithRotation(this._direction.x, this._direction.y, this._direction.z, spreadingAngleRot)

    // emitterShape, birthLocation, emittingDirection, spreadingAngle, particleAngle/Variation, particleVelocity
    if(this.emitterShape === null){
      p.position = position
      p.velocity = new SCNVector3(0, 0, velocity) // TODO: use spreadingAngle
    }else if(this.birthLocation === SCNParticleBirthLocation.surface){
      let pVec = null
      let vVec = null
      switch(this.emitterShape.className){
        case 'SCNBox': {
          const rnd = Math.random()
          const rnd1 = Math.random() - 0.5
          const rnd2 = Math.random() - 0.5
          const w = this.emitterShape.width
          const h = this.emitterShape.height
          const l = this.emitterShape.length
          const rx = h * l
          const ry = l * w
          const rz = w * h
          const r = 1.0 / (rx + ry + rz)
          const tx = rx * r
          const ty = ry * r
          const tz = rz * r

          // TODO: chamferRadius
          if(rnd < tx * 0.5){
            // right
            pVec = new SCNVector3(w * 0.5, h * rnd1, l * rnd2)
            vVec = new SCNVector3(1, 0, 0)
          }else if(rnd < tx){
            // left
            pVec = new SCNVector3(-w * 0.5, h * rnd1, l * rnd2)
            vVec = new SCNVector3(-1, 0, 0)
          }else if(rnd < tx + ty * 0.5){
            // top
            pVec = new SCNVector3(w * rnd1, h * 0.5, l * rnd2)
            vVec = new SCNVector3(0, 1, 0)
          }else if(rnd < tx + ty){
            // bottom
            pVec = new SCNVector3(w * rnd1, -h * 0.5, l * rnd2)
            vVec = new SCNVector3(0, -1, 0)
          }else if(rnd < tx + ty + tz * 0.5){
            // front
            pVec = new SCNVector3(w * rnd1, h * rnd2, l * 0.5)
            vVec = new SCNVector3(0, 0, 1)
          }else{
            // back
            pVec = new SCNVector3(w * rnd1, h * rnd2, -l * 0.5)
            vVec = new SCNVector3(0, 0, -1)
          }
          break
        }
        case 'SCNSphere': {
          const v = (new SCNVector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)).normalize()
          pVec = v.mul(this.emitterShape.radius)
          vVec = v
          break
        }
        case 'SCNPlane': {
          pVec = new SCNVector3(
            (Math.random() - 0.5) * this.emitterShape.width, 
            (Math.random() - 0.5) * this.emitterShape.height,
            0.0
          )
          vVec = new SCNVector3(0, 0, 1)
          break
        }
        case 'SCNCylinder': {
          const y = (Math.random() - 0.5) * this.emitterShape.height
          const r = Math.random() * Math.PI * 2.0
          const x = Math.sin(r)
          const z = Math.cos(r)
          pVec = new SCNVector3(x * this.emitterShape.radius, y, z * this.emitterShape.radius)
          vVec = new SCNVector3(x, 0, z)
          break
        }
        case 'SCNGeometry': {
          // TODO: implement
          console.warn('surface emitter for SCNGeometry is not implemented. use boundingSphere instead')
          const v = (new SCNVector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)).normalize()
          const r = this.emitterShape.getBoundingSphere().radius
          pVec = v.mul(r)
          vVec = v
          break
        }
        default:
          // TODO: implement
          throw new Error(`surface emitter for ${this.emitterShape.className} is not implemented`)
      }
      pVec = pVec.rotate(transform)
      p.position = position.add(pVec)
      if(this.birthDirection === SCNParticleBirthDirection.surfaceNormal){
        p.velocity = vVec.rotate(transform).normalize().mul(velocity)
      }
    }else if(this.birthLocation === SCNParticleBirthLocation.volume){
      let pVec = null
      switch(this.emitterShape.className){
        case 'SCNBox': {
          const x = (Math.random() - 0.5) * this.emitterShape.width
          const y = (Math.random() - 0.5) * this.emitterShape.height
          const z = (Math.random() - 0.5) * this.emitterShape.length
          pVec = new SCNVector3(x, y, z)
          break
        }
        case 'SCNSphere': {
          const r = Math.random() * this.emitterShape.radius
          const s = Math.random() * Math.PI
          const t = Math.random() * Math.PI * 2.0
          const rsins = r * Math.sin(s)
          const x = rsins * Math.cos(t)
          const y = rsins * Math.sin(t)
          const z = r * Math.cos(s)
          pVec = new SCNVector3(x, y, z)
          break
        }
        default:
          // TODO: implement
          throw new Error(`volume emitter for ${this.emitterShape.className} is not implemented`)
      }
      pVec = pVec.rotate(transform)
      p.position = position.add(pVec)
      if(this.birthDirection === SCNParticleBirthDirection.surfaceNormal){
        throw new Error('combination of birthLocation=volume and birthDirection=surfaceNormal is not implemented.')
      }
    }else{
      // TODO: implement
      throw new Error(`birthLocation ${this.birthLocation} is not implemented.`)
    }

    if(this.orientationMode === SCNParticleOrientationMode.billboardScreenAligned){
      p.axis = new SCNVector3(0, 0, 1)
    }else{
      p.axis = (new SCNVector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)).normalize()
    }
    p.angle = (this.particleAngle + this.particleAngleVariation * (Math.random() - 0.5)) / 180.0 * Math.PI
    p.size = this.particleSize + this.particleSizeVariation * (Math.random() - 0.5)
    p.baseSize = p.size
    p.color = this._createColor()

    switch(this.birthDirection){
      case SCNParticleBirthDirection.constant: {
        p.velocity = this._direction.rotate(angleMat).rotate(rotMat).rotate(transform).mul(velocity)
        break
      }
      case SCNParticleBirthDirection.surfaceNormal: {
        break
      }
      case SCNParticleBirthDirection.random: {
        const rndAngle = 2.0 * Math.PI * Math.random()
        const rndMat = SCNMatrix4.matrixWithRotation(this._normal.x, this._normal.y, this._normal.z, rndAngle)
        p.velocity = this._direction.rotate(rndMat).rotate(rotMat).rotate(transform).mul(velocity)
        break
      }
      default: {
        throw new Error(`unknown birth direction: ${this.birthDirection}`)
      }
    }
    p.angularVelocity = (this.particleAngularVelocity + this.particleAngularVelocityVariation * (Math.random() - 0.5)) / 180.0 * Math.PI
    p.acceleration = this.acceleration._copy()
    p.birthTime = birthTime
    p.lifeSpan = this.particleLifeSpan + this.particleLifeSpanVariation * (Math.random() * 2.0 - 1.0)

    p.imageFrameRate = this.imageSequenceFrameRate + this.imageSequenceFrameRateVariation * (Math.random() - 0.5)
    if(p.imageFrameRate < 0){
      p.imageFrameRate = 0
    }

    const numImages = this.imageSequenceRowCount * this.imageSequenceColumnCount
    p.initialImageFrame = (this.imageSequenceInitialFrame + this.imageSequenceInitialFrameVariation * (Math.random() - 0.5)) % numImages
    if(p.initialImageFrame < 0){
      p.initialImageFrame += numImages
    }

    return p
  }

  /**
   * @access private
   * @param {SCNMatrix4} transform -
   * @param {?SCNVector3} gravity -
   * @param {number} currentTime -
   * @returns {void}
   */
  _updateParticles(transform, gravity, currentTime) {
    if(this._prevTime <= 0){
      this._prevTime = currentTime
      this._nextBirthTime = currentTime
      this._startTime = currentTime

      this._direction = this.emittingDirection.normalize()
      const u = new SCNVector3(this._direction.z, this._direction.x, this._direction.y)
      this._normal = this._direction.cross(u)

      this._updateEndTime()
    }

    // generate particles
    if(this._presentation._birthRate + this.birthRateVariation > 0){
      while(this._nextBirthTime <= currentTime){
        const p = this._createParticle(this._nextBirthTime, transform)
        this._particles.push(p)
        let rate = this._presentation._birthRate + this.birthRateVariation * (Math.random() - 0.5)
        if(rate < 0.0000001){
          rate = 0.0000001
        }
        this._nextBirthTime += 1.0 / rate
        if(this._nextBirthTime > this._emissionEndTime){
          this._nextBirthTime = this._idleEndTime
          if(!this.loops){
            this._finished = true
          }
          this._updateEndTime()
        }
      }
    }

    const dt = (currentTime - this._prevTime) * this.speedFactor
    let damping = 1
    if(this.dampingFactor > 0){
      damping = Math.pow((100 - this.dampingFactor) * 0.01, dt * 60.0)
    }

    this._particles.forEach((p) => {
      let _dt = dt
      const pdt = (currentTime - p.birthTime) * this.speedFactor
      if(p.birthTime > this._prevTime){
        _dt = pdt
      }
      const t = pdt / p.lifeSpan
      p.life = t
      if(t > 1){
        return
      }
      let acceleration = p.acceleration
      if(gravity !== null && this.isAffectedByGravity){
        acceleration = acceleration.add(gravity)
      }
      //p.position.x += (0.5 * acceleration.x * dt + p.velocity.x) * dt
      //p.position.y += (0.5 * acceleration.y * dt + p.velocity.y) * dt
      //p.position.z += (0.5 * acceleration.z * dt + p.velocity.z) * dt
      //p.velocity.x += acceleration.x * dt
      //p.velocity.y += acceleration.y * dt
      //p.velocity.z += acceleration.z * dt
      p.angle += p.angularVelocity * _dt
      p.velocity.x = (p.velocity.x + acceleration.x * _dt) * damping
      p.velocity.y = (p.velocity.y + acceleration.y * _dt) * damping
      p.velocity.z = (p.velocity.z + acceleration.z * _dt) * damping
      p.position.x += p.velocity.x * _dt
      p.position.y += p.velocity.y * _dt
      p.position.z += p.velocity.z * _dt
      if(this.propertyControllers !== null){
        Object.keys(this.propertyControllers).forEach((key) => {
          this.propertyControllers[key].animation._applyAnimation(p, t, false) // should I use p.life instead of t?
        })
      }

      const frame = p.initialImageFrame + p.imageFrameRate * pdt
      let imageFrame = 0
      switch(this.imageSequenceAnimationMode){
        case SCNParticleImageSequenceAnimationMode.repeat: {
          imageFrame = Math.floor(frame % this._numImages)
          break
        }
        case SCNParticleImageSequenceAnimationMode.clamp: {
          let fr = Math.floor(frame % this._numImages)
          if(fr >= this._numImages - 1){
            imageFrame = this._numImages - 1
          }else{
            imageFrame = fr
          }
          break
        }
        case SCNParticleImageSequenceAnimationMode.autoReverse: {
          let fr = Math.floor(frame % (this._numImages * 2 - 2))
          if(fr >= this._numImages){
            fr = (this._numImages * 2 - 2) - fr
          }
          imageFrame = fr
          break
        }
        default:
          throw new Error('unknown SCNParticleImageSequenceAnimationMode: ' + this.imageSequenceAnimationMode)
      }
      const imageY = Math.floor(imageFrame / this.imageSequenceRowCount)
      const imageX = imageFrame % this.imageSequenceColumnCount

      p.texLeft = imageX * this._imageWidth
      p.texTop = (imageY + 1) * this._imageHeight
      p.texRight = (imageX + 1) * this._imageWidth
      p.texBottom = imageY * this._imageHeight
    })
    this._particles = this._particles.filter((p) => { return p.life <= 1 })
    this._prevTime = currentTime
  }

  _updateEndTime() {
    const startTime = (this._idleEndTime === 0 ? this._startTime : this._idleEndTime)
    let emissionDuration = this.emissionDuration + (Math.random() - 0.5) * this.emissionDurationVariation
    if(emissionDuration < 0){
      emissionDuration = 0
    }
    this._emissionEndTime = startTime + emissionDuration

    let idleDuration = this.idleDuration + (Math.random() - 0.5) * this.idleDurationVariation
    if(idleDuration < 0){
      idleDuration = 0
    }
    this._idleEndTime = this._emissionEndTime + idleDuration
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @param {WebGLProgram} program -
   * @returns {void}
   */
  _bufferMaterialData(gl, program) {
    // particleTexture
    if(this._particleTexture === null && this.particleImage !== null){
      this._particleTexture = this._createTexture(gl, this.particleImage)
    }
    if(this._particleTexture !== null){
      gl.activeTexture(gl.TEXTURE0)
      gl.bindTexture(gl.TEXTURE_2D, this._particleTexture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    }

    gl.uniform1i(gl.getUniformLocation(program, 'orientationMode'), this.orientationMode)
    gl.uniform1f(gl.getUniformLocation(program, 'stretchFactor'), this.stretchFactor)

    // buffer particle data
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this._particleData, gl.DYNAMIC_DRAW)

    if(this._particles.length > this._maxParticleIndex){
      this._updateIndexBuffer(gl, this._particles.length + 10)
    }

    const blendFuncSrc = [
      gl.ONE, // additive
      gl.ZERO, // subtract
      gl.ZERO, // multiply
      gl.SRC_ALPHA, // screen
      gl.SRC_ALPHA, // alpha
      gl.ONE // replace
    ]
    const blendFuncDst = [
      gl.ONE, // additive
      gl.ONE_MINUS_SRC_COLOR, // subtract
      gl.SRC_COLOR, // multiply
      gl.ONE, // screen
      gl.ONE_MINUS_SRC_ALPHA, // alpha
      gl.ZERO // replace
    ]
    gl.blendFunc(blendFuncSrc[this.blendMode], blendFuncDst[this.blendMode])
  }

  _createTexture(gl, image) {
    const texture = gl.createTexture()

    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight
    //console.warn(`image size: ${image.naturalWidth} ${image.naturalHeight}`)
    canvas.getContext('2d').drawImage(image, 0, 0)

    gl.bindTexture(gl.TEXTURE_2D, texture)
    // texImage2D(target, level, internalformat, width, height, border, format, type, source)
    // Safari complains that 'source' is not ArrayBufferView type, but WebGL2 should accept HTMLCanvasElement.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, image.width, image.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, canvas)
    gl.generateMipmap(gl.TEXTURE_2D)
    gl.bindTexture(gl.TEXTURE_2D, null)

    return texture
  }

  /**
   * @access private
   * @returns {SKColor} -
   */
  _createColor() {
    const hsb = this._rgb2hsb(this.particleColor)

    // Hue
    //hsb.x = (hsb.x + this.particleColorVariation.x * (Math.random() - 0.5)) % 360.0
    hsb.x = (hsb.x + this.particleColorVariation.x * (Math.random() * 2.0 - 1.0)) % 360.0
    if(hsb.x < 0){
      hsb.x += 360.0
    }

    // Saturation
    hsb.y = Math.max(0, Math.min(1.0, hsb.y + this.particleColorVariation.y * (Math.random() - 0.5)))

    // Brightness
    hsb.z = Math.max(0, Math.min(1.0, hsb.z + this.particleColorVariation.z * (Math.random() - 0.5)))

    // Alpha
    hsb.w = Math.max(0, Math.min(1.0, hsb.w + this.particleColorVariation.w * (Math.random() - 0.5)))

    return this._hsb2rgb(hsb)
  }

  /**
   * @access private
   * @param {SKColor} rgb -
   * @returns {SCNVector4} -
   */
  _rgb2hsb(rgb) {
    const hsb = new SCNVector4()
    const min = Math.min(rgb.red, Math.min(rgb.green, rgb.blue))
    const max = Math.max(rgb.red, Math.max(rgb.green, rgb.blue))
    const delta = max - min
    hsb.w = rgb.alpha
    hsb.z = max

    if(hsb.z === 0){
      hsb.x = 0
      hsb.y = 0
      return hsb
    }

    hsb.y = delta / max
    if(hsb.y === 0){
      hsb.x = 0
      return hsb
    }

    if(max === rgb.red){
      hsb.x = (60.0 * (rgb.green - rgb.blue) / delta + 360.0) % 360.0
    }else if(max === rgb.green){
      hsb.x = 60.0 * (rgb.blue - rgb.red) / delta + 120.0
    }else{
      hsb.x = 60.0 * (rgb.red - rgb.green) / delta + 240.0
    }

    return hsb
  }

  /**
   * @access private
   * @param {SCNVector4} hsb -
   * @returns {SKColor} -
   */
  _hsb2rgb(hsb) {
    //const rgb = new SKColor(0, 0, 0, hsb.w)

    if(hsb.y === 0){
      //rgb.red = hsb.z
      //rgb.green = hsb.z
      //rgb.blue = hsb.z
      return new SKColor(hsb.z, hsb.z, hsb.z, hsb.w)
    }

    const region = Math.floor(hsb.x / 60.0)
    /*
    const c = hsb.z * hsb.y
    const x = c * (region % 2)
    const m = hsb.z - c

    let r = 0
    let g = 0
    let b = 0
    switch(region){
      case 0:
        r = c
        g = x
        break
      case 1:
        r = x
        g = c
        break
      case 2:
        g = c
        b = x
        break
      case 3:
        g = x
        b = c
        break
      case 4:
        r = x
        b = c
        break
      default:
        r = c
        b = x
        break
    }
    rgb.red = r + m
    rgb.green = g + m
    rgb.blue = b + m
    
    return rgb
    */
    const v = hsb.z
    const f = hsb.x / 60.0 - region
    const m = v * (1.0 - hsb.y)
    const n = v * (1.0 - hsb.y * f)
    const k = v * (1.0 - hsb.y * (1.0 - f))
    switch(region){
      case 0:
        return new SKColor(v, k, m, hsb.w)
      case 1:
        return new SKColor(n, v, m, hsb.w)
      case 2:
        return new SKColor(m, v, k, hsb.w)
      case 3:
        return new SKColor(m, n, v, hsb.w)
      case 4:
        return new SKColor(k, m, v, hsb.w)
      default:
        return new SKColor(v, m, n, hsb.w)
    }
  }

  get _particleData() {
    const arr = []
    this._particles.forEach((particle) => {
      arr.push(...particle.floatArray())
    })
    return new Float32Array(arr)
  }

  get _maxParticles() {
    const maxRate = this._birthRate + this.birthRateVariation * 0.5
    const maxLifeSpan = this.particleLifeSpan + this.particleLifeSpanVariation * 0.5
    return Math.ceil(maxRate * maxLifeSpan)
  }

  _copy() {
    const s = new SCNParticleSystem()
    const params = [
      '_birthRate'
      // TODO: add other parameters... 
    ]
    for(const param of params){
      s[param] = this[param]
    }

    return s
  }

  _createPresentation() {
    if(this.__presentation){
      return this.__presentation
    }
    const s = this._copy()
    this.__presentation = s
    return s
  }

  /// Animatable parameters

  /**
   * The number of particles spawned during each emission period. Animatable.
   * @type {number}
   * @see https://developer.apple.com/documentation/scenekit/scnparticlesystem/1522857-birthrate
   */
  get birthRate() {
    return this._birthRate
  }
  set birthRate(newValue) {
    const oldValue = this._birthRate
    this._birthRate = newValue
    SCNTransaction._addChange(this, '_birthRate', oldValue, newValue)
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
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523386-addanimation
   */
  addAnimationForKey(animation, key) {
    if(typeof key === 'undefined' || key === null){
      key = Symbol()
    }
    const anim = animation.copy()
    // FIXME: use current frame time
    anim._animationStartTime = Date.now() * 0.001

    this._animations.set(key, anim)
  }

  /**
   * Required. Returns the animation with the specified key.
   * @access public
   * @param {string} key - A string identifying a previously added animation.
   * @returns {?CAAnimation} - 
   * @desc Attempting to modify any properties of the returned object results in undefined behavior.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1524020-animation
   */
  animationForKey(key) {
    return this._animations.get(key)
  }

  /**
   * Required. Removes all the animations currently attached to the object.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1522762-removeallanimations
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
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1522880-removeanimation
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
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1522841-removeanimation
   */
  removeAnimationForKeyFadeOutDuration(key, duration) {
    // FIXME: use fadeout duration
    this.removeAnimationForKey(key)
  }

  /**
   * Required. An array containing the keys of all animations currently attached to the object.
   * @type {string[]}
   * @desc This array contains all keys for which animations are attached to the object, or is empty if there are no attached animations. The ordering of animation keys in the array is arbitrary.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523610-animationkeys
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
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523592-pauseanimation
   */
  pauseAnimationForKey(key) {
  }

  /**
   * Required. Resumes a previously paused animation attached to the object with the specified key.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {void}
   * @desc This method has no effect if no animation is attached to the object with the specified key or if the specified animation is not currently paused.
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523332-resumeanimation
   */
  resumeAnimationForKey(key) {
  }

  /**
   * Required. Returns a Boolean value indicating whether the animation attached to the object with the specified key is paused.
   * @access public
   * @param {string} key - A string identifying an attached animation.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1523703-isanimationpaused
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
   * @see https://developer.apple.com/documentation/scenekit/scnanimatable/1778343-setanimationspeed
   */
  setAnimationSpeedForKey(speed, key) {
  }

  valueForKeyPath(keyPath, usePresentation = true) {
    const target = (usePresentation && this._presentation) ? this._presentation : this
    const paths = keyPath.split('.')
    const key = paths[0]
    const key2 = paths[1]
    
    if(key === '_birthRate'){
      return target[key]
    }
    return super.valueForKeyPath(keyPath, usePresentation)
  }

  setValueForKeyPath(value, keyPath) {
    const target = this._presentation ? this._presentation : this

    const paths = keyPath.split('.')
    const key = paths.shift()
    const restPath = paths.join('.')

    if(key === '_birthRate'){
      target[key] = value
      return
    }
    super.setValueForKeyPath(value, keyPath)
  }

  get _presentation() {
    return (this.__presentation ? this.__presentation : this)
  }

  /**
   * @access private
   * @returns {Promise} -
   */
  _getLoadedPromise() {
    if(this._loadedPromise){
      return this._loadedPromise
    }
    
    return Promise.resolve()
  }

  /**
   * @access public
   * @returns {Promise} -
   */
  get didLoad() {
    return this._getLoadedPromise()
  }
}
