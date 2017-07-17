'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import SCNFieldForceEvaluator from './SCNFieldForceEvaluator'
//import SCNVector3 from './SCNVector3'
//import SCNPhysicsFieldScope from './SCNPhysicsFieldScope'

/**
 * An object that applies forces, such as gravitation, electromagnetism, and turbulence, to physics bodies within a certain area of effect. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield
 */
export default class SCNPhysicsField extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Specifying a Field’s Area of Effect

    /**
     * A location marking the end of the field’s area of effect.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388138-halfextent
     */
    this.halfExtent = null

    /**
     * The area affected by the field, either inside or outside its region.
     * @type {SCNPhysicsFieldScope}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388136-scope
     */
    this.scope = null

    /**
     * A Boolean value that determines whether the field’s area of effect is shaped like a box or ellipsoid.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388158-usesellipsoidalextent
     */
    this.usesEllipsoidalExtent = false

    /**
     * The offset of the field’s center within its area of effect.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388154-offset
     */
    this.offset = null

    /**
     * The field’s directional axis.
     * @type {SCNVector3}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388128-direction
     */
    this.direction = null


    // Specifying a Field’s Behavior

    /**
     * A multiplier for the force that the field applies to objects in its area of effect.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388132-strength
     */
    this.strength = 0

    /**
     * An exponent that determines how the field’s strength diminishes with distance.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388146-falloffexponent
     */
    this.falloffExponent = 0

    /**
     * The minimum value for distance-based effects.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388148-minimumdistance
     */
    this.minimumDistance = 0

    /**
     * A Boolean value that determines whether the field’s effect is enabled.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388117-isactive
     */
    this.isActive = false

    /**
     * A Boolean value that determines whether the field overrides other fields whose areas of effect it overlaps.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388126-isexclusive
     */
    this.isExclusive = false


    // Choosing Physics Bodies to Be Affected by the Field

    /**
     * A mask that defines which categories this physics field belongs to.
     * @type {number}
     * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388119-categorybitmask
     */
    this.categoryBitMask = 0

  }

  // Creating Physics Fields

  /**
   * Creates a field that slows any object in its area of effect with a force proportional to the object’s velocity.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc Like the damping and angularDamping properties of a physics body, drag fields can simulate effects such as fluid friction or air resistance. Unlike those properties, drag fields can simulate different intensities of fluid friction in different areas of your scene. For example, you can use a drag field to represent underwater areas.The default falloffExponent value for a drag field is 0.0, indicating that the field’s effect is constant throughout its area of effect.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388164-drag
   */
  static drag() {
    return null
  }

  /**
   * Creates a field whose forces circulate around an axis.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc The force on an object in a vortex field is tangential to the line from the object’s position to the field’s axis and proportional to the object’s mass. (The field’s axis is a line that is parallel to its direction vector and that passes through its center. For details, see the offset property.) For example, when a vortex field’s area of effect contains many objects, the resulting scene resembles a tornado: The objects simultaneously revolve around and fly away from the field’s center.By default, a vortex circulates counterclockwise relative to its direction vector. To make it circulate clockwise, set the field’s strength property to a negative value.The default falloffExponent value for a vortex field is 0.0, indicating that the field’s effect is constant throughout its area of effect.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388160-vortex
   */
  static vortex() {
    return null
  }

  /**
   * Creates a field that accelerates objects toward its center.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc Because the force of gravity on an object is proportional to the object’s mass, this force accelerates all objects at the same distance from the field’s center by the same amount. The field’s strength property measures this acceleration in meters per second per second.By default, a radial gravity field attracts objects toward its center. To make it repel objects instead, set the field’s strength property to a negative value.The default falloffExponent value for a radial gravity field is 2.0, indicating that the field’s effect diminishes with the square of distance from its center.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388115-radialgravity
   */
  static radialGravity() {
    return null
  }

  /**
   * Creates a field that accelerates objects in a specific direction.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc Because the force of gravity on an object is proportional to the object’s mass, this force accelerates all objects in the field’s area of affect by the same amount. The field’s strength property measures this acceleration in meters per second per second.By default, a linear gravity field accelerates objects in along its direction vector. To make it accelerate objects in the opposite direction, set the field’s strength property to a negative value.The default falloffExponent value for a linear gravity field is 0.0, indicating that the field’s effect is constant throughout its area of effect.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388130-lineargravity
   */
  static linearGravity() {
    return null
  }

  /**
   * Creates a field that applies random forces to objects in its area of effect.
   * @access public
   * @param {number} smoothness - The amount of randomness in the field. A value of 0.0 specifies maximum noise, and a value of 1.0 specifies no noise at all.
   * @param {number} speed - The field’s variation over time. Specify 0.0 for a static field.
   * @returns {SCNPhysicsField} - 
   * @desc Use this field type to simulate effects involving random motion, such as fireflies or gently falling snow.In calculating the direction and strength of the field’s effect on an object, SceneKit uses a Perlin simplex noise function. This function produces a velocity field that varies over time.The default falloffExponent value for a noise field is 0.0, indicating that the field’s effect is constant throughout its area of effect. This field type ignores the field’s direction property.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388150-noisefield
   */
  static noiseFieldAnimationSpeed(smoothness, speed) {
    return null
  }

  /**
   * Creates a field that applies random forces to objects in its area of effect, with magnitudes proportional to those objects’ velocities.
   * @access public
   * @param {number} smoothness - The amount of randomness in the field. A value of 0.0 specifies maximum noise, and a value of 1.0 specifies no noise at all.
   * @param {number} speed - The field’s variation over time. Specify 0.0 for a static field.
   * @returns {SCNPhysicsField} - 
   * @desc Like a noise field, a turbulence field applies forces in random directions to the objects that it affects. Unlike a noise field, a turbulence field applies a force whose magnitude is proportional to the speed of each affected object. For example, an object passing through a noise field shakes as it travels through the field, but an object passing through a turbulence field shakes more violently the faster it travels. The field’s strength property scales the magnitude of the turbulence effect.The default falloffExponent value for a turbulence field is 0.0, indicating that the field’s effect is constant throughout its area of effect.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388162-turbulencefield
   */
  static turbulenceFieldAnimationSpeed(smoothness, speed) {
    return null
  }

  /**
   * Creates a field that pulls objects toward its center with a spring-like force.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc The force a spring field applies to objects in its area of effect is linearly proportional to the distance from the object to the center of the field. (That is, the field behaves according to Hooke’s Law of real-world spring forces.) An object placed at the center of the field and moved away will oscillate around the center, with a period of oscillation that is proportional to the object’s mass. The field’s strength property scales the magnitude of the spring effect—a larger strength simulates a stiffer spring.The default falloffExponent value for a spring field is 1.0, indicating that the field’s effect diminishes linearly with distance from its center.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388134-spring
   */
  static spring() {
    return null
  }

  /**
   * Creates a field that attracts or repels objects based on their electrical charge and on their distance from the field’s center.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc Use this field type to make objects behave differently from one another when they enter a region, or to make an object's behavior different from its mass-based behavior. An electric field behaves according to the first part of the Lorentz force equation modeling real-world electromagnetic forces—the field applies a force whose magnitude is proportional to electric charge and distance.By default, physics bodies and particle systems have no electric charge, so they are unaffected by electric and magnetic fields. Use the charge property of a physics body or the particleCharge property of a particle system to add charge-based behavior.When the field’s strength value is positive (the default), it attracts bodies whose charge is negative and repels bodies whose charge is positive. To reverse this behavior, set the field’s strength property to a negative value.The default falloffExponent value for an electric field is 2.0, indicating that the field’s effect diminishes with the square of its distance from its center.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388152-electric
   */
  static electric() {
    return null
  }

  /**
   * Creates a field that attracts or repels objects based on their electrical charge, velocity, and distance from the field’s axis.
   * @access public
   * @returns {SCNPhysicsField} - 
   * @desc Use this field type to make objects behave differently from one another when they enter a region, or to make an object's behavior different from its mass based behavior. A magnetic field behaves according to the second part of the Lorentz force equation modeling real-world electromagnetic forces—the field applies a force determined by the cross product of an object’s velocity vector and the magnetic field vector at the object’s location, with magnitude proportional to the object’s electric charge. By default, physics bodies and particle systems have no electric charge, so they are unaffected by electric and magnetic fields. Use the charge property of a physics body or the particleCharge property of a particle system to add charge-based behavior.When the field’s strength value is positive (the default), the magnetic field vectors circulate counterclockwise relative to the field’s direction vector. (That is, the magnetic field models a real-world magnetic field created by current in a wire oriented in the field’s direction.) To make field vectors circulate clockwise, set the field’s strength property to a negative value.NoteThis SCNPhysicsField option models the real-world physics effect of magnetic fields on moving, electrically charged bodies, not the behavior of permanent magnets or electromagnets. To make objects in your scene simply attract or repel one another, use a different field type. For example, a field created by the radialGravity() method attracts or repels all dynamic bodies near it according to its strength property, and a field created by the electric() method selectively attracts or repels bodies according to their electric charge.The default falloffExponent value for a magnetic field is 2.0, indicating that the field’s effect diminishes with the square of distance from its center.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388168-magnetic
   */
  static magnetic() {
    return null
  }

  // Creating Custom Physics Fields

  /**
   * Creates a field that runs the specified block to determine the force a field applies to each object in its area of effect.
   * @access public
   * @param {SCNFieldForceEvaluator} block - A block that SceneKit runs for each object in the field’s area of effect. See SCNFieldForceEvaluator. 
   * @returns {SCNPhysicsField} - 
   * @desc For custom physics fields, SceneKit ignores the direction, strength, falloffExponent, and minimumDistance properties. Instead, SceneKit calls your block to determine the direction and magnitude of force to apply to each physics body or particle in the field’s area of effect.
   * @see https://developer.apple.com/documentation/scenekit/scnphysicsfield/1388140-customfield
   */
  static customFieldEvaluationBlock(block) {
    return null
  }
}
