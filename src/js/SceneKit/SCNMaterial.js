'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNShadable from './SCNShadable'
import SCNMaterialProperty from './SCNMaterialProperty'
import SCNTransparencyMode from './SCNTransparencyMode'
import SCNCullMode from './SCNCullMode'
import SCNBlendMode from './SCNBlendMode'
import SKColor from '../SpriteKit/SKColor'

const _LightingModel = {
  blinn: Symbol(),
  constant: Symbol(),
  lambert: Symbol(),
  phong: Symbol(),
  physicallyBased: Symbol()
}


/**
 * A set of shading attributes that define the appearance of a geometry's surface when rendered.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @implements {SCNShadable}
 * @see https://developer.apple.com/reference/scenekit/scnmaterial
 */
export default class SCNMaterial extends NSObject {

  // Creating a Material

  /**
   * Creates a material from the specified Model I/O material object.
   * @access public
   * @constructor
   * @param {MDLMaterial} mdlMaterial - A Model I/O material object.
   * @desc The Model I/O framework provides universal support for import, export, description, and processing of several 3D asset file formats and related resources. (For details, see Model I/O.) The MDLMaterial class is a generic description of surface rendering to be used in rendering 3D object, supporting a superset of the attributes described by the SCNMaterial class. 
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1419835-init
   */
  constructor(mdlMaterial) {
    super()

    // Configuring a Material’s Visual Properties

    this._diffuse = new SCNMaterialProperty(SKColor.white)
    this._ambient = new SCNMaterialProperty(new SKColor(0.485, 0.485, 0.485, 1.0))
    this._specular = new SCNMaterialProperty(SKColor.black)
    this._normal = new SCNMaterialProperty(SKColor.white)
    this._reflective = new SCNMaterialProperty(SKColor.black)
    this._emission = new SCNMaterialProperty(SKColor.black)
    this._transparent = new SCNMaterialProperty(SKColor.white)
    this._multiply = new SCNMaterialProperty(SKColor.white)
    this._ambientOcclusion = new SCNMaterialProperty(SKColor.white)
    this._selfIllumination = new SCNMaterialProperty(SKColor.black)
    this._metalness = new SCNMaterialProperty(SKColor.black)
    this._roughness = new SCNMaterialProperty(new SKColor(0.485, 0.485, 0.485, 1.0))

    // Customizing a Material

    /**
     * A name associated with the material.
     * @type {?string}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462525-name
     */
    this.name = null

    /**
     * The sharpness of specular highlights. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462533-shininess
     */
    this.shininess = 1.0

    /**
     * A factor affecting the material’s reflectivity. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462587-fresnelexponent
     */
    this.fresnelExponent = 0.0

    /**
     * The uniform transparency of the material. Animatable.
     * @type {number}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462567-transparency
     */
    this.transparency = 1.0

    /**
     * The mode SceneKit uses to calculate transparency for the material.
     * @type {SCNTransparencyMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462549-transparencymode
     */
    this.transparencyMode = SCNTransparencyMode.aOne

    /**
     * The lighting formula that SceneKit uses to render the material.
     * @type {SCNMaterial.LightingModel}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462518-lightingmodel
     */
    this.lightingModel = _LightingModel.blinn

    /**
     * A Boolean value that determines whether SceneKit performs lighting calculations per vertex or per pixel. Animatable.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462580-islitperpixel
     */
    this.isLitPerPixel = true

    /**
     * A Boolean value that determines whether SceneKit should render both front and back faces of a surface. Animatable.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462531-isdoublesided
     */
    this.isDoubleSided = false

    /**
     * The mode determining which faces of a surface SceneKit renders. Animatable.
     * @type {SCNCullMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462571-cullmode
     */
    this.cullMode = SCNCullMode.back

    /**
     * The mode that determines how pixel colors rendered using this material blend with other pixel colors in the rendering target.
     * @type {SCNBlendMode}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462585-blendmode
     */
    this.blendMode = SCNBlendMode.alpha

    /**
     * A Boolean value that determines whether the material responds identically to both ambient and diffuse lighting. Animatable.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462522-locksambientwithdiffuse
     */
    this.locksAmbientWithDiffuse = true

    /**
     * A Boolean value that determines whether SceneKit produces depth information when rendering the material.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462545-writestodepthbuffer
     */
    this.writesToDepthBuffer = true

    /**
     * A Boolean value that determines whether SceneKit uses depth information when rendering the material.
     * @type {boolean}
     * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462562-readsfromdepthbuffer
     */
    this.readsFromDepthBuffer = true
  }

  // Configuring a Material’s Visual Properties

  /**
   * An object that manages the material’s diffuse response to lighting.
   * @type {SCNMaterialProperty}
   * @desc Diffuse shading describes the amount and color of light reflected equally in all directions from each point on the material’s surface. The diffuse color of a pixel is independent of the point of view, so it can be thought of as a material’s “base” color or texture. By default, the diffuse property’s contents object is a white color. Figure 1 shows the effect of setting the diffuse property’s contents to a texture image on a material whose other properties have default contents.Figure 1 Adding a diffuse texture to a materialThe material’s lightingModel property determines the formula SceneKit uses to combine its diffuse color and other visual properties with lights and other contents in a scene to produce the final color for each rendered pixel in the rendered scene. For details, see Lighting Models.Adding a diffuse texture to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462589-diffuse
   */
  get diffuse() {
    return this._diffuse
  }

  /**
   * An object that manages the material’s response to ambient lighting.
   * @type {SCNMaterialProperty}
   * @desc Ambient shading describes the amount and color of ambient light reflected by the material. Ambient shading is uniform in all directions at all points on a surface. If a scene does not contain lights whose type is ambient, this property has no effect on a material’s appearance. By default, the ambient property’s contents object is a dark gray color. Changing the ambient property’s contents lets you specify a different color or texture for the areas of a surface not directly illuminated by lights in a scene. To make the material respond identically to both ambient and diffuse light, set its locksAmbientWithDiffuse property to true. Figure 1 shows a material (with a texture for its diffuse property) before and after setting the ambient property’s contents to a solid color.Figure 1 Adding an ambient color to a materialThe material’s lightingModel property determines the formula SceneKit uses to combine its ambient color and other visual properties with lights and other contents in a scene to produce the final color for each rendered pixel in the rendered scene. For details, see Lighting Models.This material property does not apply to physically-based materials (see physicallyBased).Adding an ambient color to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462558-ambient
   */
  get ambient() {
    return this._ambient
  }

  /**
   * An object that manages the material’s specular response to lighting.
   * @type {SCNMaterialProperty}
   * @desc Specular shading describes the amount and color of light reflected by the material directly toward the viewer, forming a bright highlight on the surface and simulating a glossy or shiny appearance. You adjust the sharpness of specular highlights using the material’s shininess property.By default, the specular property’s contents object is a black color, causing the material to appear dull or matte. Changing the specular property’s contents to a brighter color causes specular highlights to appear in that color, making the surface appear shiny. When you apply a texture to the specular property, the texture image becomes a specular map—the brightness of each pixel in the image determines the tendency of each point on the material’s surface to create specular highlights when lit. Figure 1 shows a material (with a texture for its diffuse property) before and after providing a specular map image. Notice that the bright specular highlights appear only on portions of the surface where the specular map image is white.Figure 1 Adding a specular map to a materialThe material’s lightingModel property determines the formula SceneKit uses to combine its specularity and other visual properties with lights and other contents in a scene to produce the final color for each rendered pixel in the rendered scene. For details, see Lighting Models.This material property does not apply to physically-based materials (see physicallyBased).Adding a specular map to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462516-specular
   */
  get specular() {
    return this._specular
  }

  /**
   * An object that defines the nominal orientation of the surface at each point for use in lighting.
   * @type {SCNMaterialProperty}
   * @desc Simulating the interaction of lights with a material requires information about the orientation of the surface at each point. Typically, normal vectors provided by a geometry object provide this information. However, this limits the level of detail for surface contours because a geometry can only provide one unique surface normal vector per vertex (and increasing vertex count to model a highly detailed surface exacts a high performance cost).Alternatively, you can use a texture image as a normal map that describes the orientation of a surface for each pixel in the texture. When SceneKit uses an image, it treats the R, G, and B components of each as the X, Y, and Z components of a surface normal vector. Because a normal map texture can store much more detailed surface information than a geometry, you can use a material’s normal property to simulate rough surfaces such as stone or add embossed or engraved designs to an otherwise smooth surface.By default, the normal property’s contents object is a white color. Setting the normal property’s contents to any solid color disables normal mapping, causing SceneKit to shade the material using only the surface normal information provided by its geometry. Setting the normal property’s contents to an image or other texture-mapped content enables normal mapping, which also automatically sets the material’s isLitPerPixel property to true. Figure 1 shows the effect of setting the normal property’s contents to a texture image on a material whose other properties have default contents.Figure 1 Adding a normal map to a materialThe material’s lightingModel property determines the formula SceneKit uses to combine its surface normals and other visual properties with lights and other contents in a scene to produce the final color for each rendered pixel in the rendered scene. For details, see Lighting Models.Adding a normal map to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462542-normal
   */
  get normal() {
    return this._normal
  }

  /**
   * An object that defines the reflected color for each point on a surface.
   * @type {SCNMaterialProperty}
   * @desc You can simulate a mirrored or chromed finish on a surface by causing it to reflect its environment. SceneKit does not render real-time reflections of the objects in a scene, but it can use an environment map texture to simulate reflection of a static or animated image. When rendering each pixel on the surface, SceneKit traces the light from that point to a pixel in the environment map as if the surface was reflecting that image.By default, the reflective property’s contents object is a white color, causing the property to have no visible effect. Setting the reflective property’s contents to any solid color adds uniform shading to the material. To create a reflective effect, set the property’s contents to an image or other texture-mapped content.To produce a mirror-finish effect using an environment map, the texture image should take one of two forms:A sphere map, a square image whose content depicts an environment as reflected by a mirrored sphere.A cube map, an array of six square images which together form an imaginary cube enclosing the scene, whose inner surfaces are reflected by the material. You create a cube map by setting the reflective property’s contents object to an NSArray instance containing six images, each corresponding to a direction in the scene’s world coordinate space in the following order: +X, -X, +Y, -Y, +Z, -Z (or Right, Left, Top, Bottom, Near, Far).Figure 1 shows a material (with a texture for its normal property) before and after providing a cube map for the reflective property.Figure 1 Adding a reflective cube map to a materialThis material property does not apply to physically-based materials (see physicallyBased). Instead, such materials reflect environment-based lighting (see the SCNScene lightingEnvironment property) based on their metalness and roughness properties.Adding a reflective cube map to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462520-reflective
   */
  get reflective() {
    return this._reflective
  }

  /**
   * An object that defines the color emitted by each point on a surface.
   * @type {SCNMaterialProperty}
   * @desc You can use an emissive map texture to simulate parts of a surface that glow with their own light. SceneKit does not treat the material as a light source—rather, the emission property determines colors for a material independent of lighting. (To create an object that appears to glow, you may wish to combine a geometry with an emissive map and additional SCNLight objects added to the scene.)By default, the emissive property’s contents object is a black color, causing the property to have no visible effect. Setting the emissive property’s contents to any solid color adds a uniform color to the material independent of lighting. To create a selective glow effect, set the property’s contents to an image or other texture-mapped content whose glowing areas use bright colors and whose other areas use darker colors. In the darker-colored portions of the emissive map (and portions with reduced opacity), the other visual properties of the material contribute to its appearance under scene lighting.Figure 1 shows a material (with a texture for its diffuse property) before and after providing an emissive map image.Figure 1 Adding an emissive map to a materialAdding an emissive map to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462527-emission
   */
  get emission() {
    return this._emission
  }

  /**
   * An object that determines the opacity of each point in a material.
   * @type {SCNMaterialProperty}
   * @desc Use this property to selectively make parts of a material appear transparent. You can uniformly adjust the opacity of a material using its transparency property, or of all the content attached to a node using the node’s opacity property.By default, the transparent property’s contents object is a fully opaque black color, causing the property to have no visible effect. Setting the transparent property’s contents to any solid color uniformly fades the opacity of the material based on that color’s opacity value. To make parts of a material appear transparent, set the property’s contents to an image or other texture-mapped content whose alpha channel defines areas of full or partial opacity.Figure 1 shows a semitransparent material before and after providing a texture image for its transparent property. (To make the transparency effect more visible, a blue sphere is shown behind the transparent material.)Figure 1 Adding a transparent texture to a materialThe transparencyMode property controls how SceneKit interprets color information from the transparent property’s contents.Adding a transparent texture to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462583-transparent
   */
  get transparent() {
    return this._transparent
  }

  /**
   * An object that provides color values that are multiplied with pixels in a material after all other shading is complete.
   * @type {SCNMaterialProperty}
   * @desc After combining a material’s other visual properties with lighting and other information about a scene, Scene kit multiplies the color of each rendered pixel by the color this property provides. You can use this property to darken or tint a surface independent of the effects of lighting and other properties, or to add precomputed lighting to a scene via a shadow map.By default, the multiply property’s contents object is a white color, causing the property to have no visible effect.Figure 1 shows a material (with textures for its diffuse and emission properties) before and after setting the multiply property’s contents to a solid color. Notice that the multiply color modulates even the bright areas added by the emissive map.Figure 1 Adding a multiply color to a materialAdding a multiply color to a material
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462575-multiply
   */
  get multiply() {
    return this._multiply
  }

  /**
   * An object that provides color values to be multiplied with the ambient light affecting the material.
   * @type {SCNMaterialProperty}
   * @desc Use this property to assign an ambient occlusion texture map to a surface. This property has no effect if there is no ambient light in the scene. If this property is not nil, SceneKit ignores the ambient property.When using physically-based shading (see physicallyBased), ambient occlusion approximates large-scale surface details that obscure global illumination.
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462579-ambientocclusion
   */
  get ambientOcclusion() {
    return this._ambientOcclusion
  }

  /**
   * An object that provides color values representing the global illumination of the surface.
   * @type {SCNMaterialProperty}
   * @desc Self-illumination applies to all materials, but is especially useful for those using physically-based shading (see physicallyBased). Physically-based materials work best with environment-based lighting (see the SCNScene property lightingEnvironment), but for some materials it can be useful to let a surface itself define part of its lighting—for example, an object whose position obscures it from the “sky” that provides the main lighting environment. When you assign contents to this property, they override the environmental lighting contribution to diffuse shading, but environmental lighting still contributes to specular effects.
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1462524-selfillumination
   */
  get selfIllumination() {
    return this._selfIllumination
  }

  /**
   * An object that provides color values to determine how metallic the material’s surface appears.
   * @type {SCNMaterialProperty}
   * @desc This property measures only the total intensity of color values; texture contents are best defined in grayscale.This property generally approximates aspects of a physical surface—such as index of refraction, tendency to produce sharp reflections, and tendency to produce Fresnel reflections at grazing angles—that together produce an overall metallic or nonmetallic (also called dielectric) appearance. Lower values (darker colors) cause the material to appear more like a dielectric surface. Higher values (brighter colors) cause the surface to appear more metallic.This property applies only when the material’s lightingModel value is physicallyBased.
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1640554-metalness
   */
  get metalness() {
    return this._metalness
  }

  /**
   * An object that provides color values to determine the apparent smoothness of the surface.
   * @type {SCNMaterialProperty}
   * @desc This property measures only the total intensity of color values; texture contents are best defined in grayscale.This property approximates the level of microscopic detail—for example tiny bumps and cracks—in a surface. By approximating these “microfacets” as a single term, this property helps produce lighting calculations that resemble the energy-conserving laws of real-world physics, resulting in more realistic variation between matte and shiny surfaces. Lower values (darker colors) cause the material to appear shiny, with well-defined specular highlights. Higher values (brighter colors) cause specular highlights to spread out and the diffuse color of the material to become more retroreflective.This property applies only when the material’s lightingModel value is physicallyBased.
   * @see https://developer.apple.com/reference/scenekit/scnmaterial/1640555-roughness
   */
  get roughness() {
    return this._roughness
  }

  // Structures

  /**
   * @type {Object} LightingModel
   * @property {Symbol} blinn Shading that incorporates ambient, diffuse, and specular properties, where specular highlights are calculated using the Blinn-Phong  formula.
   * @property {Symbol} constant Uniform shading that incorporates ambient lighting only.
   * @property {Symbol} lambert Shading that incorporates ambient and diffuse properties only.
   * @property {Symbol} phong Shading that incorporates ambient, diffuse, and specular properties, where specular highlights are calculated using the Phong  formula.
   * @property {Symbol} physicallyBased Shading based on a realistic abstraction of physical lights and materials.
   * @see https://developer.apple.com/reference/scenekit/scnmaterial.lightingmodel
   */
  static get LightingModel() {
    return _LightingModel
  }
}
