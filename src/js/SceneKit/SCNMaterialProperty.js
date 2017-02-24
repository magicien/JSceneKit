'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNMatrix4 from './SCNMatrix4'
import SCNWrapMode from './SCNWrapMode'
import SCNFilterMode from './SCNFilterMode'


/**
 * A container for the color or texture of one of a material’s visual properties. 
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty
 */
export default class SCNMaterialProperty extends NSObject {

  // Creating a Material Property

  /**
   * Creates a new material property object with the specified contents.
   * @access public
   * @param {Object} contents - The visual contents of the material property—a color, image, or source of animated content. For details, see the discussion of the  contents property.
   * @returns {SCNMaterialProperty}
   * @desc Newly created SCNMaterial objects contain SCNMaterialProperty instances for all of their visual properties. To change a material’s visual properties, you modify those instances rather than creating new material property objects.You create new SCNMaterialProperty instances to provide textures for use with custom GLSL shaders—for details, see SCNShadable.
   * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395386-init
   */
  constructor(contents) {
    super()

    //if(typeof contents !== 'object'){
    //  throw 'SCNMaterialProperty(contents): contents must be Object type: ' + (typeof contents)
    //}

    // Working with Material Property Contents

    /**
     * The visual contents of the material property—a color, image, or source of animated content. Animatable.
     * @type {?Object}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395372-contents
     */
    this.contents = contents

    /**
     * A number between 0.0 and 1.0 that modulates the effect of the material property. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395407-intensity
     */
    this.intensity = 0


    // Configuring Texture Mapping Attributes

    /**
     * The transformation applied to the material property’s visual contents. Animatable.
     * @type {SCNMatrix4}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395388-contentstransform
     */
    this.contentsTransform = new SCNMatrix4()

    /**
     * The wrapping behavior for the S texture coordinate.
     * @type {SCNWrapMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395384-wraps
     */
    this.wrapS = SCNWrapMode.clamp

    /**
     * The wrapping behavior for the T texture coordinate.
     * @type {SCNWrapMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395382-wrapt
     */
    this.wrapT = SCNWrapMode.clamp

    /**
     * Texture filtering for rendering the material property’s image contents at a size smaller than that of the original image.
     * @type {SCNFilterMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395390-minificationfilter
     */
    this.minificationFilter = SCNFilterMode.linear

    /**
     * Texture filtering for rendering the material property’s image contents at a size larger than that of the original image.
     * @type {SCNFilterMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395378-magnificationfilter
     */
    this.magnificationFilter = SCNFilterMode.linear

    /**
     * Texture filtering for using mipmaps to render the material property’s image contents at a size smaller than that of the original image.
     * @type {SCNFilterMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395398-mipfilter
     */
    this.mipFilter = SCNFilterMode.nearest

    /**
     * The amount of anisotropic texture filtering to be used when rendering the material property’s image contents.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395402-maxanisotropy
     */
    this.maxAnisotropy = 0

    /**
     * The source of texture coordinates for mapping the material property’s image contents.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395405-mappingchannel
     */
    this.mappingChannel = 0

    /**
     * A color used to fill in areas of a material’s surface not covered by the material property’s image contents.
     * @type {?Object}
     * @deprecated
     * @see https://developer.apple.com/reference/scenekit/scnmaterialproperty/1395376-bordercolor
     */
    this.borderColor = null
  }
}

