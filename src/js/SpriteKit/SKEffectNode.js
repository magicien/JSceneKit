'use strict'

import SKNode from './SKNode'
//import SKWarpable from './SKWarpable'
import SKBlendMode from './SKBlendMode'
//import SKShader from './SKShader'
//import SKAttributeValue from './SKAttributeValue'


/**
 * A node that can apply Core Image filters or SKWarpGeometry distortions to its children.
 * @access public
 * @extends {SKNode}
 * @implements {SKWarpable}
 * @see https://developer.apple.com/reference/spritekit/skeffectnode
 */
export default class SKEffectNode extends SKNode {

  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Enabling Filter Effects

    /**
     * A Boolean value that determines whether the effect node applies the filter to its children as they are drawn.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/1459385-shouldenableeffects
     */
    this.shouldEnableEffects = true


    // Configuring the Filter

    /**
     * The Core Image filter to apply.
     * @type {?CIFilter}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/1459392-filter
     */
    this.filter = null

    /**
     * A Boolean value that determines whether the effect node automatically sets the filter’s image center.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/1459390-shouldcenterfilter
     */
    this.shouldCenterFilter = true


    // Blending the Results to the Framebuffer

    /**
     * The blend mode used to draw the filtered image into the parent’s framebuffer.
     * @type {SKBlendMode}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/1459386-blendmode
     */
    this.blendMode = SKBlendMode.alpha


    // Working with Custom Shaders

    /**
     * A custom shader that is called when the effect node is blended into the parent’s framebuffer.
     * @type {?SKShader}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/1459388-shader
     */
    this.shader = null

    /**
     * The values of each attribute associated with the node's attached shader.
     * @type {Map<string, SKAttributeValue>}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/2715848-attributevalues
     */
    this.attributeValues = new Map()


    // Caching the Filter Results

    /**
     * A Boolean value that indicates whether the results of rendering the child nodes should be cached.
     * @type {boolean}
     * @see https://developer.apple.com/reference/spritekit/skeffectnode/1459381-shouldrasterize
     */
    this.shouldRasterize = false

  }

  // Working with Custom Shaders

  /**
   * Sets an attribute value for an attached shader.
   * @access public
   * @param {SKAttributeValue} value - An attribute value object containing the scalar or vector value to set in the attached shader.
   * @param {string} key - The attribute name.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/skeffectnode/2715853-setvalue
   */
  //setValueForAttribute(value, key) {
  //}

  /**
   * The value of a shader attribute.
   * @access public
   * @param {string} key - The attribute name.
   * @returns {?SKAttributeValue} - 
   * @see https://developer.apple.com/reference/spritekit/skeffectnode/2715844-value
   */
  //valueForAttributeNamed(key) {
  //  return null
  //}
}
