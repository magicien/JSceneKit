'use strict'

/**
 * The interpolation formulas for blending between target geometries.
 * @typedef {Object} SCNMorpherCalculationMode
 * @property {number} normalized - Target weights must be in the range between 0.0 and 1.0, and the contribution of the base geometry to the morphed surface is related to the sum of target weights. This is the default mode.
 * @property {number} additive - Target weights may take on any value, and weighted contributions for each target are added to the base geometry,
 * @see https://developer.apple.com/documentation/scenekit/scnmorphercalculationmode
 */
const SCNMorpherCalculationMode = {
  normalized: 0,
  additive: 1
}

export default SCNMorpherCalculationMode
