'use strict'


/**
 * 
 * @typedef {Object} SCNShaderModifierEntryPoint
 * @property {string} fragment - Use this entry point to change the color of a fragment after all other shading has been performed.
 * @property {string} geometry - Use this entry point to deform a geometry’s surface or alter its vertex attributes.
 * @property {string} lightingModel - Use this entry point to provide a custom lighting equation.
 * @property {string} surface - Use this entry point to modify the surface properties of a material before lighting is computed.
 * @see https://developer.apple.com/reference/scenekit/scnshadermodifierentrypoint
 */
const SCNShaderModifierEntryPoint = {
  fragment: 'SCNShaderModifierEntryPointFragment',
  geometry: 'SCNShaderModifierEntryPointGeometry',
  lightingModel: 'SCNShaderModifierEntryPointLightingModel',
  surface: 'SCNShaderModifierEntryPointSurface'
}

export default SCNShaderModifierEntryPoint
