'use strict'


/**
 * 
 * @typedef {Object} SCNShaderModifierEntryPoint
 * @property {Symbol} fragment - Use this entry point to change the color of a fragment after all other shading has been performed.
 * @property {Symbol} geometry - Use this entry point to deform a geometry’s surface or alter its vertex attributes.
 * @property {Symbol} lightingModel - Use this entry point to provide a custom lighting equation.
 * @property {Symbol} surface - Use this entry point to modify the surface properties of a material before lighting is computed.
 * @see https://developer.apple.com/reference/scenekit/scnshadermodifierentrypoint
 */
const SCNShaderModifierEntryPoint = {
  fragment: Symbol(),
  geometry: Symbol(),
  lightingModel: Symbol(),
  surface: Symbol()
}

export default SCNShaderModifierEntryPoint
