'use strict'

import NSObject from '../ObjectiveC/NSObject'
import CAAnimation from '../QuartzCore/CAAnimation'
import SCNParticleInputMode from './SCNParticleInputMode'
import SCNNode from './SCNNode'

/**
 * An animation for a single property of the individual particles rendered by a particle system.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller
 */
export default class SCNParticlePropertyController extends NSObject {
  static get _propTypes() {
    return {
      animation: ['NSMutableDictionary', (obj, anim) => {
        obj.animation = SCNNode._loadAnimationData(anim, null)
      }],
      inputMode: 'integer',
      inputBias: 'float',
      inputScale: 'float',
      inputOrigin: 'SCNNode'
      // inputProperty: 'string' ?
    }
  }

  // Creating a Property Controller

  /**
   * Creates a particle property controller with the specified Core Animation animation.
   * @access public
   * @constructor
   * @param {CAAnimation} animation - A Core Animation object specifying the behavior of the property animation. Must not be nil.You can use different CAAnimation subclasses to animate effects in different ways. For example, a CABasicAnimation instance transitions a property from one value to another, and a CAKeyframeAnimation instance transitions a property through a series of values. You use properties of the animation object to define its timing curve, repeat mode, and other options.SceneKit ignores the keyPath, duration, and repeatCount properties of this animation object.
   * @desc To set up a particle property animation:Create a CAAnimation object defining how a property of each particle in the system changes over time.Create a particle property controller using the init(animation:) method.Attach the property controller to a particle system using the propertyControllers dictionary, choosing a key listed in Particle Property Keys to identify the particle property it animates.For example, the following code sets up a controller to animate particle sizes:// 1. Create and configure an animation object.
CAKeyframeAnimation *animation = [CAKeyframeAnimation animation];
animation.values = @[ @0.1, @1.0, @3.0, @0.5 ];
 
// 2. Create a property controller from the animation object.
SCNParticlePropertyController *controller =
    [SCNParticlePropertyController controllerWithAnimation:animation];
 
// 3. Assign the controller to a particle system, associating it with a particle property.
particleSystem.propertyControllers = @{ SCNParticlePropertySize: controller };
// 1. Create and configure an animation object.
CAKeyframeAnimation *animation = [CAKeyframeAnimation animation];
animation.values = @[ @0.1, @1.0, @3.0, @0.5 ];
 
// 2. Create a property controller from the animation object.
SCNParticlePropertyController *controller =
    [SCNParticlePropertyController controllerWithAnimation:animation];
 
// 3. Assign the controller to a particle system, associating it with a particle property.
particleSystem.propertyControllers = @{ SCNParticlePropertySize: controller };

   * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1523579-init
   */
  constructor(animation) {
    super()

    // Managing the Controller’s Animation

    /**
     * The Core Animation object defining the behavior of the property animation.
     * @type {CAAnimation}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1523707-animation
     */
    this.animation = animation

    /**
     * The mode that determines input values for the property controller’s animation.
     * @type {SCNParticleInputMode}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1522852-inputmode
     */
    this.inputMode = null

    /**
     * An offset to add to the input value of the controller’s animation.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1523994-inputbias
     */
    this.inputBias = 0

    /**
     * A factor for multiplying the input value of the controller’s animation. 
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1522903-inputscale
     */
    this.inputScale = 0

    /**
     * A node whose distance to each particle provides input values for the controller’s animation.
     * @type {?SCNNode}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1522895-inputorigin
     */
    this.inputOrigin = null

    /**
     * A particle property that provides input values for this property controller’s animation.
     * @type {?SCNParticleSystem.ParticleProperty}
     * @see https://developer.apple.com/documentation/scenekit/scnparticlepropertycontroller/1522973-inputproperty
     */
    this.inputProperty = null
  }
}
