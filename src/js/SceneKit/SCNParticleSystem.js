'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNGeometry from './SCNGeometry'
import SCNParticleBirthLocation from './SCNParticleBirthLocation'
import SCNParticleBirthDirection from './SCNParticleBirthDirection'
import SCNVector3 from './SCNVector3'
import SCNVector4 from './SCNVector4'
import SCNParticleImageSequenceAnimationMode from './SCNParticleImageSequenceAnimationMode'
import SCNNode from './SCNNode'
import SCNParticleBlendMode from './SCNParticleBlendMode'
import SCNParticleOrientationMode from './SCNParticleOrientationMode'
import SCNParticleSortingMode from './SCNParticleSortingMode'
import SCNParticleEvent from './SCNParticleEvent'
import SCNParticleEventBlock from './SCNParticleEventBlock'
import SCNParticlePropertyController from './SCNParticlePropertyController'
import SCNParticleModifierStage from './SCNParticleModifierStage'
import SCNParticleModifierBlock from './SCNParticleModifierBlock'

const _ParticleProperty = {
  angle: Symbol(),
  angularVelocity: Symbol(),
  bounce: Symbol(),
  charge: Symbol(),
  color: Symbol(),
  contactNormal: Symbol(),
  contactPoint: Symbol(),
  frame: Symbol(),
  frameRate: Symbol(),
  friction: Symbol(),
  life: Symbol(),
  opacity: Symbol(),
  position: Symbol(),
  rotationAxis: Symbol(),
  size: Symbol(),
  velocity: Symbol()
}


/**
 * Manages the animation and rendering of a system of small image sprites, or particles, using a high-level simulation whose general behavior you specify.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/reference/scenekit/scnparticlesystem
 */
export default class SCNParticleSystem extends NSObject {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Managing Particle Emission Timing

    /**
     * The duration, in seconds, over which the system spawns new particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523998-emissionduration
     */
    this.emissionDuration = 0

    /**
     * The range, in seconds, of randomized emission duration values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523842-emissiondurationvariation
     */
    this.emissionDurationVariation = 0

    /**
     * The duration, in seconds, of periods when the system emits no particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522998-idleduration
     */
    this.idleDuration = 0

    /**
     * The range, in seconds, of randomized idle duration values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523018-idledurationvariation
     */
    this.idleDurationVariation = 0

    /**
     * A Boolean value that determines whether the system repeats its emission and idle periods.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522618-loops
     */
    this.loops = false

    /**
     * The duration, in seconds, for which particles are spawned before the system is first rendered. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522597-warmupduration
     */
    this.warmupDuration = 0

    /**
     * The number of particles spawned during each emission period. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522857-birthrate
     */
    this.birthRate = 0

    /**
     * The range of randomized particle birth rate values. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524147-birthratevariation
     */
    this.birthRateVariation = 0


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
    this.birthLocation = null

    /**
     * The possible initial directions for newly spawned particles, relative to the emitter shape.
     * @type {SCNParticleBirthDirection}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523361-birthdirection
     */
    this.birthDirection = null

    /**
     * The initial direction for newly spawned particles. Animatable.
     * @type {SCNVector3}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523600-emittingdirection
     */
    this.emittingDirection = null

    /**
     * The range, in degrees, of randomized initial particle directions. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522862-spreadingangle
     */
    this.spreadingAngle = 0


    // Managing Particle Motion

    /**
     * The rotation angle, in degrees, of newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523896-particleangle
     */
    this.particleAngle = 0

    /**
     * The range, in degrees of randomized initial particle angles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522828-particleanglevariation
     */
    this.particleAngleVariation = 0

    /**
     * The initial speed, in units per second, for newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523946-particlevelocity
     */
    this.particleVelocity = 0

    /**
     * The range, in units per second, of randomized initial particle speeds. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524157-particlevelocityvariation
     */
    this.particleVelocityVariation = 0

    /**
     * The initial spin rate, in degrees per second, of newly spawned particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522757-particleangularvelocity
     */
    this.particleAngularVelocity = 0

    /**
     * The range, in degrees per second, of randomized initial angular velocities for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523590-particleangularvelocityvariation
     */
    this.particleAngularVelocityVariation = 0

    /**
     * The duration, in seconds, for which each particle is rendered before being removed from the scene. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523575-particlelifespan
     */
    this.particleLifeSpan = 0

    /**
     * The range, in seconds, of randomized particle life spans. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523567-particlelifespanvariation
     */
    this.particleLifeSpanVariation = 0


    // Specifying Particle Appearance

    /**
     * The rendered size, in units of the scene’s world coordinate space, of the particle image. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523508-particlesize
     */
    this.particleSize = 0

    /**
     * The range of randomized particle sizes. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522716-particlesizevariation
     */
    this.particleSizeVariation = 0

    /**
     * The color of newly spawned particles. Animatable.
     * @type {CGColor}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523248-particlecolor
     */
    this.particleColor = null

    /**
     * The ranges of randomized particle color components. Animatable.
     * @type {SCNVector4}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523639-particlecolorvariation
     */
    this.particleColorVariation = null

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
    this.fresnelExponent = 0

    /**
     * A multiplier for stretching particle images along their direction of motion. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523338-stretchfactor
     */
    this.stretchFactor = 0


    // Animating Particle Images

    /**
     * The number of rows for treating the particle image as a grid of animation frames.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523340-imagesequencerowcount
     */
    this.imageSequenceRowCount = 0

    /**
     * The number of columns for treating the particle image as a grid of animation frames.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523462-imagesequencecolumncount
     */
    this.imageSequenceColumnCount = 0

    /**
     * The index of the first frame in a particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523511-imagesequenceinitialframe
     */
    this.imageSequenceInitialFrame = 0

    /**
     * The range of randomized initial frames for particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523821-imagesequenceinitialframevariati
     */
    this.imageSequenceInitialFrameVariation = 0

    /**
     * The rate, in frames per second, of particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524075-imagesequenceframerate
     */
    this.imageSequenceFrameRate = 0

    /**
     * The range, in frames per second, of randomized frame rates for particle image animation. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523667-imagesequenceframeratevariation
     */
    this.imageSequenceFrameRateVariation = 0

    /**
     * The animation mode for particle image animation.
     * @type {SCNParticleImageSequenceAnimationMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522816-imagesequenceanimationmode
     */
    this.imageSequenceAnimationMode = null


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
    this.acceleration = null

    /**
     * A factor that slows particles relative to their velocity. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522931-dampingfactor
     */
    this.dampingFactor = 0

    /**
     * The mass, in kilograms, of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522607-particlemass
     */
    this.particleMass = 0

    /**
     * The range, in kilograms, of randomized particle masses. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523408-particlemassvariation
     */
    this.particleMassVariation = 0

    /**
     * The electric charge, in coulombs, of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523156-particlecharge
     */
    this.particleCharge = 0

    /**
     * The range, in coulombs, of randomized particle charges. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523377-particlechargevariation
     */
    this.particleChargeVariation = 0

    /**
     * The restitution coefficient of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522637-particlebounce
     */
    this.particleBounce = 0

    /**
     * The range of randomized restitution coefficients for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522662-particlebouncevariation
     */
    this.particleBounceVariation = 0

    /**
     * The friction coefficient of each particle in the system. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1524010-particlefriction
     */
    this.particleFriction = 0

    /**
     * The range of randomized friction coefficients for particles. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522868-particlefrictionvariation
     */
    this.particleFrictionVariation = 0


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
    this.blendMode = null

    /**
     * The mode defining whether and how particles may rotate.
     * @type {SCNParticleOrientationMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1523131-orientationmode
     */
    this.orientationMode = null

    /**
     * The mode defining the order in which SceneKit renders the system’s particles.
     * @type {SCNParticleSortingMode}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522795-sortingmode
     */
    this.sortingMode = null

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
    this.speedFactor = 0


    // Modifying Particles Over Time

    /**
     * A dictionary that optionally associates particle properties with objects that animate a property’s value for each particle.
     * @type {?Map<SCNParticleSystem.ParticleProperty, SCNParticlePropertyController>}
     * @see https://developer.apple.com/reference/scenekit/scnparticlesystem/1522775-propertycontrollers
     */
    this.propertyControllers = null

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
   * @property {Symbol} angle The rotation angle, in radians, of the particle about its axis.
   * @property {Symbol} angularVelocity The particle’s angular velocity (or rate of spin), in radians per second.
   * @property {Symbol} bounce The particle’s restitution coefficient.
   * @property {Symbol} charge The particle’s electric charge, in coulombs.
   * @property {Symbol} color The particle’s tint color, as a vector of red, green, blue, and alpha component values.
   * @property {Symbol} contactNormal The normal vector, in scene coordinate space, of a collision between a particle and a geometry in the scene.
   * @property {Symbol} contactPoint The location, in scene coordinate space, of a collision between a particle and a geometry in the scene.
   * @property {Symbol} frame The current frame index of the particle’s image animation.
   * @property {Symbol} frameRate The rate, in frames per second, of the particle’s image animation.
   * @property {Symbol} friction The particle’s friction coefficient.
   * @property {Symbol} life The remaining time in the particle’s life span, in seconds.
   * @property {Symbol} opacity The particle’s opacity (or alpha value).
   * @property {Symbol} position The particle’s position vector in scene coordinate space.
   * @property {Symbol} rotationAxis The particle’s axis of rotation, expressed as a vector in the particle’s local coordinate space.
   * @property {Symbol} size The width and height of the rendered particle image, in units of scene coordinate space.
   * @property {Symbol} velocity The particle’s velocity vector in units (of scene coordinate space) per second.
   * @see https://developer.apple.com/reference/scenekit/scnparticlesystem.particleproperty
   */
  static get ParticleProperty() {
    return _ParticleProperty
  }
}
