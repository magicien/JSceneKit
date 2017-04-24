'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
//import SCNGeometry from './SCNGeometry'
import SCNMatrix4 from './SCNMatrix4'
import SCNParticleBirthLocation from './SCNParticleBirthLocation'
import SCNParticleBirthDirection from './SCNParticleBirthDirection'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNParticleImageSequenceAnimationMode from './SCNParticleImageSequenceAnimationMode'
//import SCNNode from './SCNNode'
import SCNParticleBlendMode from './SCNParticleBlendMode'
import SCNParticleOrientationMode from './SCNParticleOrientationMode'
import SCNParticleSortingMode from './SCNParticleSortingMode'
import SCNParticleEvent from './SCNParticleEvent'
import SCNParticleEventBlock from './SCNParticleEventBlock'
import SCNParticlePropertyController from './SCNParticlePropertyController'
import SCNParticleModifierStage from './SCNParticleModifierStage'
import SCNParticleModifierBlock from './SCNParticleModifierBlock'
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
     * @type {number}
     */
    this.angle = 0
    
    /**
     * @type {number}
     */
    this.size = 1

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
  }

  /**
   * @access public
   * @returns {number[]} -
   */
  floatArray() {
    const baseArray = [
      ...this.position.floatArray(), this.angle,
      ...this.color.floatArray(),
      this.size
      //this.size, this.life
    ]
    return [
      ...baseArray, -1, -1,
      ...baseArray,  1, -1,
      ...baseArray, -1,  1,
      ...baseArray,  1,  1,
    ]
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
 * @see https://developer.apple.com/reference/scenekit/scnparticlesystem
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
      birthRate: 'float',
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
      particleColorVariation: 'SKColor',
      particleImage: ['NSMutableDictionary', (obj, dict, key, coder) => {
        let path = ''
        if(typeof dict.path !== 'undefined'){
          path = coder._directoryPath + dict.path
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
          }
        })
        obj.propertyControllers = dict
      }],

      seed: ['integer', null],
      softParticlesEnabled: ['boolean', null],
      fixedTimeStep: ['float', null],
      renderingMode: ['integer', null],
      physicsCollisionsEnabled: ['boolean', null]
    }
  }

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Managing Particle Emission Timing

    /**
     * The duration, in seconds, over which the system spawns new particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523998-emissionduration
     */
    this.emissionDuration = 1.0

    /**
     * The range, in seconds, of randomized emission duration values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523842-emissiondurationvariation
     */
    this.emissionDurationVariation = 0.0

    /**
     * The duration, in seconds, of periods when the system emits no particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522998-idleduration
     */
    this.idleDuration = 0.0

    /**
     * The range, in seconds, of randomized idle duration values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523018-idledurationvariation
     */
    this.idleDurationVariation = 0.0

    /**
     * A Boolean value that determines whether the system repeats its emission and idle periods.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522618-loops
     */
    this.loops = true

    /**
     * The duration, in seconds, for which particles are spawned before the system is first rendered. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522597-warmupduration
     */
    this.warmupDuration = 0.0

    /**
     * The number of particles spawned during each emission period. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522857-birthrate
     */
    this.birthRate = 0.0

    /**
     * The range of randomized particle birth rate values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524147-birthratevariation
     */
    this.birthRateVariation = 0.0


    // Managing Particle Emission Locations

    /**
     * The shape of the region of space where the system spawns new particles.
     * @type {?SCNGeometry}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522737-emittershape
     */
    this.emitterShape = null

    /**
     * The possible locations for newly spawned particles, relative to the emitter shape.
     * @type {SCNParticleBirthLocation}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522899-birthlocation
     */
    this.birthLocation = SCNParticleBirthLocation.surface

    /**
     * The possible initial directions for newly spawned particles, relative to the emitter shape.
     * @type {SCNParticleBirthDirection}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523361-birthdirection
     */
    this.birthDirection = SCNParticleBirthDirection.constant

    /**
     * The initial direction for newly spawned particles. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523600-emittingdirection
     */
    this.emittingDirection = new SCNVector3(0, 1, 0)

    /**
     * The range, in degrees, of randomized initial particle directions. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522862-spreadingangle
     */
    this.spreadingAngle = 0.0


    // Managing Particle Motion

    /**
     * The rotation angle, in degrees, of newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523896-particleangle
     */
    this.particleAngle = 0.0

    /**
     * The range, in degrees of randomized initial particle angles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522828-particleanglevariation
     */
    this.particleAngleVariation = 0.0

    /**
     * The initial speed, in units per second, for newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523946-particlevelocity
     */
    this.particleVelocity = 0.0

    /**
     * The range, in units per second, of randomized initial particle speeds. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524157-particlevelocityvariation
     */
    this.particleVelocityVariation = 0.0

    /**
     * The initial spin rate, in degrees per second, of newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522757-particleangularvelocity
     */
    this.particleAngularVelocity = 0.0

    /**
     * The range, in degrees per second, of randomized initial angular velocities for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523590-particleangularvelocityvariation
     */
    this.particleAngularVelocityVariation = 0.0

    /**
     * The duration, in seconds, for which each particle is rendered before being removed from the scene. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523575-particlelifespan
     */
    this.particleLifeSpan = 1.0

    /**
     * The range, in seconds, of randomized particle life spans. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523567-particlelifespanvariation
     */
    this.particleLifeSpanVariation = 0.0


    // Specifying Particle Appearance

    /**
     * The rendered size, in units of the scene’s world coordinate space, of the particle image. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523508-particlesize
     */
    this.particleSize = 1.0

    /**
     * The range of randomized particle sizes. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522716-particlesizevariation
     */
    this.particleSizeVariation = 0.0

    /**
     * The color of newly spawned particles. Animatable.
     * @type {SKColor}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523248-particlecolor
     */
    this.particleColor = SKColor.white

    /**
     * The ranges of randomized particle color components. Animatable.
     * @type {SCNVector4}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523639-particlecolorvariation
     */
    this.particleColorVariation = new SCNVector4(0, 0, 0, 0)

    /**
     * The texture image SceneKit uses to render each particle.
     * @type {?Object}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524153-particleimage
     */
    this.particleImage = null

    /**
     * The reflectivity exponent SceneKit uses when rendering the particle’s image as a cube map. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523317-fresnelexponent
     */
    this.fresnelExponent = 0.0

    /**
     * A multiplier for stretching particle images along their direction of motion. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523338-stretchfactor
     */
    this.stretchFactor = 0.0


    // Animating Particle Images

    /**
     * The number of rows for treating the particle image as a grid of animation frames.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523340-imagesequencerowcount
     */
    this.imageSequenceRowCount = 1

    /**
     * The number of columns for treating the particle image as a grid of animation frames.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523462-imagesequencecolumncount
     */
    this.imageSequenceColumnCount = 1

    /**
     * The index of the first frame in a particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523511-imagesequenceinitialframe
     */
    this.imageSequenceInitialFrame = 0.0

    /**
     * The range of randomized initial frames for particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523821-imagesequenceinitialframevariati
     */
    this.imageSequenceInitialFrameVariation = 0.0

    /**
     * The rate, in frames per second, of particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524075-imagesequenceframerate
     */
    this.imageSequenceFrameRate = 0.0

    /**
     * The range, in frames per second, of randomized frame rates for particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523667-imagesequenceframeratevariation
     */
    this.imageSequenceFrameRateVariation = 0.0

    /**
     * The animation mode for particle image animation.
     * @type {SCNParticleImageSequenceAnimationMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522816-imagesequenceanimationmode
     */
    this.imageSequenceAnimationMode = SCNParticleImageSequenceAnimationMode.repeat


    // Simulating Physics for Particles

    /**
     * A Boolean value that determines whether gravity, as defined by the scene’s physics simulation, affects the motion of particles.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523452-isaffectedbygravity
     */
    this.isAffectedByGravity = false

    /**
     * A Boolean value that determines whether physics fields in the scene affect the motion of particles.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523353-isaffectedbyphysicsfields
     */
    this.isAffectedByPhysicsFields = false

    /**
     * The nodes whose geometry the system’s particles can collide with.
     * @type {?SCNNode[]}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523516-collidernodes
     */
    this.colliderNodes = null

    /**
     * A Boolean value that determines whether particles are removed from the scene upon colliding with another object.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523357-particlediesoncollision
     */
    this.particleDiesOnCollision = false

    /**
     * The constant acceleration vector, in units per second per second, applied to all particles in the system. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522766-acceleration
     */
    this.acceleration = new SCNVector3(0, 0, 0)

    /**
     * A factor that slows particles relative to their velocity. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522931-dampingfactor
     */
    this.dampingFactor = 0.0

    /**
     * The mass, in kilograms, of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522607-particlemass
     */
    this.particleMass = 1.0

    /**
     * The range, in kilograms, of randomized particle masses. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523408-particlemassvariation
     */
    this.particleMassVariation = 0.0

    /**
     * The electric charge, in coulombs, of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523156-particlecharge
     */
    this.particleCharge = 0.0

    /**
     * The range, in coulombs, of randomized particle charges. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523377-particlechargevariation
     */
    this.particleChargeVariation = 0.0

    /**
     * The restitution coefficient of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522637-particlebounce
     */
    this.particleBounce = 0.7

    /**
     * The range of randomized restitution coefficients for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522662-particlebouncevariation
     */
    this.particleBounceVariation = 0.0

    /**
     * The friction coefficient of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524010-particlefriction
     */
    this.particleFriction = 1.0

    /**
     * The range of randomized friction coefficients for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522868-particlefrictionvariation
     */
    this.particleFrictionVariation = 0.0


    // Spawning Additional Particle Systems

    /**
     * Another particle system to be added to the scene when a particle collides with scene geometry.
     * @type {?SCNParticleSystem}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524068-systemspawnedoncollision
     */
    this.systemSpawnedOnCollision = null

    /**
     * Another particle system to be added to the scene when a particle dies.
     * @type {?SCNParticleSystem}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524091-systemspawnedondying
     */
    this.systemSpawnedOnDying = null

    /**
     * Another particle system to be added to the scene for each living particle in the system.
     * @type {?SCNParticleSystem}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522751-systemspawnedonliving
     */
    this.systemSpawnedOnLiving = null


    // Managing Particle Rendering

    /**
     * The blending mode for compositing particle images into the rendered scene.
     * @type {SCNParticleBlendMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523728-blendmode
     */
    this.blendMode = SCNParticleBlendMode.additive

    /**
     * The mode defining whether and how particles may rotate.
     * @type {SCNParticleOrientationMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523131-orientationmode
     */
    this.orientationMode = SCNParticleOrientationMode.billboardScreenAligned

    /**
     * The mode defining the order in which SceneKit renders the system’s particles.
     * @type {SCNParticleSortingMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522795-sortingmode
     */
    this.sortingMode = SCNParticleSortingMode.none

    /**
     * A Boolean value that determines whether SceneKit applies lighting to particle images when rendering.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522794-islightingenabled
     */
    this.isLightingEnabled = false

    /**
     * A Boolean value that determines whether SceneKit renders particles in black before rendering the particle image.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523901-isblackpassenabled
     */
    this.isBlackPassEnabled = false


    // Controlling Particle Simulation

    /**
     * A Boolean value that specifies whether the particle simulation runs in the local coordinate space of the node containing it.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522855-islocal
     */
    this.isLocal = false

    /**
     * A multiplier for the speed at which SceneKit runs the particle simulation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522988-speedfactor
     */
    this.speedFactor = 1.0


    // Modifying Particles Over Time

    /**
     * A dictionary that optionally associates particle properties with objects that animate a property’s value for each particle.
     * @type {?Map<SCNParticleSystem.ParticleProperty, SCNParticlePropertyController>}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522775-propertycontrollers
     */
    this.propertyControllers = null

    this._program = null
    this._vertexArray = null
    this._vertexBuffer = null
    this._indexBuffer = null
    this._particles = []
    this._glIndexSize = null
    this._particleTexture = null

    this._prevTime = 0
    this._nextBirthTime = 0
  }

  // Creating a Particle System

  /**
   * Loads a particle system from a file in the app’s bundle resources.
   * @access public
   * @param {string} name - The name of a particle system file in the app’s bundle resources directory, with or without the .scnp extension.
   * @param {?string} directory - The subdirectory path in the app’s bundle resources directory.
   * @returns {void}
   * @desc A SceneKit particle file created by Xcode contains an archived SCNParticleSystem instance, so you can also use the NSKeyedArchiver and NSKeyedUnarchiver classes to write and read particle files.
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522772-init
   */
  initNamedInDirectory(name, directory) {
  }

  // Controlling Particle Simulation

  /**
   * Returns the particle system to its initial state.
   * @access public
   * @returns {void}
   * @desc Calling this method removes all currently live particles from the scene.
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522968-reset
   */
  reset() {
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

   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523251-handle
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
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522635-addmodifier
   */
  addModifierForPropertiesAtModifier(properties, stage, block) {
  }

  /**
   * Removes particle modifier blocks for the specified stage of the particle simulation.
   * @access public
   * @param {SCNParticleModifierStage} stage - The stage of SceneKit’s particle simulation during which to call the block. See SCNParticleModifierStage for allowed values.
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524077-removemodifiers
   */
  removeModifiersAt(stage) {
  }

  /**
   * Removes all particle modifier blocks associated with the particle system.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523614-removeallmodifiers
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
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem.particleproperty
   */
  static get ParticleProperty() {
    return _ParticleProperty
  }

  /**
   * @access private
   * @param {string} path -
   * @returns {Image} -
   */
  _loadParticleImage(path, directoryPath) {
    //console.warn(`image.path: ${path}`)
    const image = new Image()
    if(path.indexOf('file:///') === 0){
      const paths = path.slice(8).split('/')
      let pathCount = 1
      let _path = directoryPath + paths.slice(-pathCount).join('/')
      image.onload = () => {
        //console.info(`image ${_path} onload`)
        this.particleImage = image
      }
      image.onerror = () => {
        pathCount += 1
        if(pathCount > paths.length){
          //console.info(`image ${path} load error. pathCount > paths.length`)
        }else{
          //console.info(`image ${_path} load error.`)
          _path = directoryPath + paths.slice(-pathCount).join('/')
          //console.info(`try ${_path}`)
          image.src = _path
        }
      }
      image.src = _path
    }else{
      image.onload = () => {
        //console.info(`image ${path} onload`)
        this.particleImage = image
      }
      image.src = path
    }
    return image
  }

  _initializeVAO(gl, node, program) {
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
    const colorLoc = gl.getAttribLocation(program, 'color')
    const sizeLoc = gl.getAttribLocation(program, 'size')
    //const lifeLoc = gl.getAttribLocation(program, 'life')
    const cornerLoc = gl.getAttribLocation(program, 'corner')

    // vertexAttribPointer(ulong idx, long size, ulong type, bool norm, long stride, ulong offset)
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 44, 0)
    gl.enableVertexAttribArray(colorLoc)
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 44, 16)
    gl.enableVertexAttribArray(sizeLoc)
    gl.vertexAttribPointer(sizeLoc, 1, gl.FLOAT, false, 44, 32)
    //gl.enableVertexAttribArray(lifeLoc)
    //gl.vertexAttribPointer(lifeLoc, 1, gl.FLOAT, false, 48, 36)
    gl.enableVertexAttribArray(cornerLoc)
    gl.vertexAttribPointer(cornerLoc, 2, gl.FLOAT, false, 44, 36)

    /*
    const arr = []
    this._particles.forEach((particle) => {
      arr.push(...particle.floatArray())
    })
    const particleData = new Float32Array(arr)
    gl.bufferData(gl.ARRAY_BUFFER, particleData, gl.DYNAMIC_DRAW)
    */

    const len = this._maxParticles
    const indexData = []
    let index=0
    for(let i=0; i<len; i++){
      indexData.push(index + 0)
      indexData.push(index + 3)
      indexData.push(index + 2)
      indexData.push(index + 0)
      indexData.push(index + 1)
      indexData.push(index + 3)
      index += 4
    }
    let glIndexData = null
    if(len < 256){
      glIndexData = new Uint8Array(indexData)
      this._glIndexSize = gl.UNSIGNED_BYTE
    }else if(len < 65536){
      glIndexData = new Uint16Array(indexData)
      this._glIndexSize = gl.UNSIGNED_SHORT
    }else{
      glIndexData = new Uint32Array(indexData)
      this._glIndexSize = gl.UNSIGNED_INT
    }

    this._indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, glIndexData, gl.STATIC_DRAW)
  }

  /**
   * @access private
   * @param {number} birthTime -
   * @param {SCNVector3} position -
   * @param {SCNVector4} orientation -
   * @returns {_Particle} -
   */
  _createParticle(birthTime, position, orientation) {
    const p = new _Particle()
    // emitterShape, birthLocation, emittingDirection, spreadingAngle, particleAngle/Variation, particleVelocity
    p.position = position
    p.angle = (this.particleAngle + this.particleAngleVariation * (Math.random() - 0.5)) / 180.0 * Math.PI
    p.size = this.particleSize + this.particleSizeVariation * (Math.random() - 0.5)
    p.color = this.particleColor._copy()
    const velocity = this.particleVelocity + this.particleVelocityVariation * (Math.random() - 0.5)
    const spreadingAngle = this.spreadingAngle / 180.0 * Math.PI * Math.random()
    const spreadingAngleRot = 2.0 * Math.PI * Math.random()
    //p.velocity = this.particleVelocity + this.particleVelocityVariation * (Math.random() - 0.5)
    const angleMat = SCNMatrix4.matrixWithRotation(this._normal.x, this._normal.y, this._normal.z, spreadingAngle)
    const rotMat = SCNMatrix4.matrixWithRotation(this._direction.x, this._direction.y, this._direction.z, spreadingAngleRot)
    p.velocity = this._direction.rotate(angleMat).rotate(rotMat).rotateWithQuaternion(orientation).mul(velocity)
    p.angularVelocity = this.particleAngularVelocity + this.particleAngularVelocityVariation * (Math.random() - 0.5)
    p.acceleration = this.acceleration._copy()
    p.birthTime = birthTime
    p.lifeSpan = this.particleLifeSpan + this.particleLifeSpanVariation * (Math.random() - 0.5)

    return p
  }

  /**
   * @access private
   * @param {SCNNode} node -
   * @param {number} elapsedTime -
   * @returns {void}
   */
  _updateParticles(node, currentTime) {
    if(this._prevTime <= 0){
      this._prevTime = currentTime
      this._nextBirthTime = currentTime

      this._direction = this.emittingDirection.normalize()
      const u = new SCNVector3(this._direction.z, this._direction.x, this._direction.y)
      this._normal = this._direction.cross(u)
    }
    while(this._nextBirthTime <= currentTime){
      const p = this._createParticle(this._nextBirthTime, node._presentationWorldTranslation, node._presentationWorldOrientation)
      this._particles.push(p)
      let rate = this.birthRate + this.birthRateVariation * (Math.random() - 0.5)
      if(rate < 0.0000001){
        rate = 0.0000001
      }
      this._nextBirthTime += 1.0 / rate
    }

    const dt = currentTime - this._prevTime
    this._particles.forEach((p) => {
      const t = (currentTime - p.birthTime) / p.lifeSpan
      p.life = t
      if(t > 1){
        return
      }
      p.position.x += (0.5 * p.acceleration.x * dt + p.velocity.x) * dt
      p.position.y += (0.5 * p.acceleration.y * dt + p.velocity.y) * dt
      p.position.z += (0.5 * p.acceleration.z * dt + p.velocity.z) * dt
      p.angle += p.angularVelocity * dt
      p.velocity.x += p.acceleration.x * dt
      p.velocity.y += p.acceleration.y * dt
      p.velocity.z += p.acceleration.z * dt
      if(this.propertyControllers !== null){
        Object.keys(this.propertyControllers).forEach((key) => {
          this.propertyControllers[key].animation._applyAnimation(p, t, false) // should I use p.life instead of t?
        })
      }
    })
    this._particles = this._particles.filter((p) => { return p.life <= 1 })
    this._prevTime = currentTime
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

    // buffer particle data
    gl.bindBuffer(gl.ARRAY_BUFFER, this._vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, this._particleData, gl.DYNAMIC_DRAW)
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

  get _particleData() {
    const arr = []
    this._particles.forEach((particle) => {
      arr.push(...particle.floatArray())
    })
    return new Float32Array(arr)
  }

  get _maxParticles() {
    const maxRate = this.birthRate + this.birthRateVariation * 0.5
    const maxLifeSpan = this.particleLifeSpan + this.particleLifeSpanVariation * 0.5
    return Math.ceil(maxRate * maxLifeSpan)
  }
}
