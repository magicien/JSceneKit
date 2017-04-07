'use strict'


/**
 * Compositing operations for images.
 * @typedef {Object} CGBlendMode
 * @property {number} normal - Paints the source image samples over the background image samples.
 * @property {number} multiply - Multiplies the source image samples with the background image samples. This results in colors that are at least as dark as either of the two contributing sample colors.
 * @property {number} screen - Multiplies  the inverse of the source image samples with the inverse of the background image samples. This results in colors that are at least as light as either of the two contributing sample colors.
 * @property {number} overlay - 
 * @property {number} darken - 
 * @property {number} lighten - 
 * @property {number} colorDodge - Brightens the background image samples to reflect the source image samples. Source image sample values that specify black do not produce a change.
 * @property {number} colorBurn - Darkens the background image samples to reflect the source image samples. Source image sample values that specify white do not produce a change.
 * @property {number} softLight - 
 * @property {number} hardLight - 
 * @property {number} difference - 
 * @property {number} exclusion - Produces an effect similar to that produced by difference, but with lower contrast. Source image sample values that are black don’t produce a change; white inverts the background color values.
 * @property {number} hue - Uses the luminance and saturation values of the background with the hue of the source image.
 * @property {number} saturation - Uses the luminance and hue values of the background with the saturation of the source image. Areas of the background that have no saturation (that is, pure gray areas) don’t produce a change.
 * @property {number} color - Uses the luminance values of the background with the hue and saturation values of the source image. This mode preserves the gray levels in the image. You can use this mode to color monochrome images or to tint color images.
 * @property {number} luminosity - Uses the hue and saturation of the background with the luminance of the source image. This mode creates an effect that is inverse to the effect created by color.
 * @property {number} clear - R = 0
 * @property {number} copy - R = S
 * @property {number} sourceIn - R = S*Da
 * @property {number} sourceOut - R = S*(1 - Da)
 * @property {number} sourceAtop - R = S*Da + D*(1 - Sa)
 * @property {number} destinationOver - R = S*(1 - Da) + D
 * @property {number} destinationIn - R = D*Sa
 * @property {number} destinationOut - R = D*(1 - Sa)
 * @property {number} destinationAtop - R = S*(1 - Da) + D*Sa
 * @property {number} xor - R = S*(1 - Da) + D*(1 - Sa). This XOR mode is only nominally related to the classical bitmap XOR operation, which is not supported by Core Graphics
 * @property {number} plusDarker - R = MAX(0, 1 - ((1 - D) + (1 - S)))
 * @property {number} plusLighter - R = MIN(1, S + D)
 * @see https://developer.apple.com/reference/coregraphics/cgblendmode
 */
const CGBlendMode = {
  normal: 0,
  multiply: 1,
  screen: 2,
  overlay: 3,
  darken: 4,
  lighten: 5,
  colorDodge: 6,
  colorBurn: 7,
  softLight: 8,
  hardLight: 9,
  difference: 10,
  exclusion: 11,
  hue: 12,
  saturation: 13,
  color: 14,
  luminosity: 15,
  clear: 16,
  copy: 17,
  sourceIn: 18,
  sourceOut: 19,
  sourceAtop: 20,
  destinationOver: 21,
  destinationIn: 22,
  destinationOut: 23,
  destinationAtop: 24,
  xor: 25,
  plusDarker: 26,
  plusLighter: 27
}

export default CGBlendMode
