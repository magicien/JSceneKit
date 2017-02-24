'use strict'


/**
 * Compositing operations for images.
 * @typedef {Object} CGBlendMode
 * @property {Symbol} normal - Paints the source image samples over the background image samples.
 * @property {Symbol} multiply - Multiplies the source image samples with the background image samples. This results in colors that are at least as dark as either of the two contributing sample colors.
 * @property {Symbol} screen - Multiplies  the inverse of the source image samples with the inverse of the background image samples. This results in colors that are at least as light as either of the two contributing sample colors.
 * @property {Symbol} overlay - 
 * @property {Symbol} darken - 
 * @property {Symbol} lighten - 
 * @property {Symbol} colorDodge - Brightens the background image samples to reflect the source image samples. Source image sample values that specify black do not produce a change.
 * @property {Symbol} colorBurn - Darkens the background image samples to reflect the source image samples. Source image sample values that specify white do not produce a change.
 * @property {Symbol} softLight - 
 * @property {Symbol} hardLight - 
 * @property {Symbol} difference - 
 * @property {Symbol} exclusion - Produces an effect similar to that produced by difference, but with lower contrast. Source image sample values that are black don’t produce a change; white inverts the background color values.
 * @property {Symbol} hue - Uses the luminance and saturation values of the background with the hue of the source image.
 * @property {Symbol} saturation - Uses the luminance and hue values of the background with the saturation of the source image. Areas of the background that have no saturation (that is, pure gray areas) don’t produce a change.
 * @property {Symbol} color - Uses the luminance values of the background with the hue and saturation values of the source image. This mode preserves the gray levels in the image. You can use this mode to color monochrome images or to tint color images.
 * @property {Symbol} luminosity - Uses the hue and saturation of the background with the luminance of the source image. This mode creates an effect that is inverse to the effect created by color.
 * @property {Symbol} clear - R = 0
 * @property {Symbol} copy - R = S
 * @property {Symbol} sourceIn - R = S*Da
 * @property {Symbol} sourceOut - R = S*(1 - Da)
 * @property {Symbol} sourceAtop - R = S*Da + D*(1 - Sa)
 * @property {Symbol} destinationOver - R = S*(1 - Da) + D
 * @property {Symbol} destinationIn - R = D*Sa
 * @property {Symbol} destinationOut - R = D*(1 - Sa)
 * @property {Symbol} destinationAtop - R = S*(1 - Da) + D*Sa
 * @property {Symbol} xor - R = S*(1 - Da) + D*(1 - Sa). This XOR mode is only nominally related to the classical bitmap XOR operation, which is not supported by Core Graphics
 * @property {Symbol} plusDarker - R = MAX(0, 1 - ((1 - D) + (1 - S)))
 * @property {Symbol} plusLighter - R = MIN(1, S + D)
 * @see https://developer.apple.com/reference/coregraphics/cgblendmode
 */
const CGBlendMode = {
  normal: Symbol(),
  multiply: Symbol(),
  screen: Symbol(),
  overlay: Symbol(),
  darken: Symbol(),
  lighten: Symbol(),
  colorDodge: Symbol(),
  colorBurn: Symbol(),
  softLight: Symbol(),
  hardLight: Symbol(),
  difference: Symbol(),
  exclusion: Symbol(),
  hue: Symbol(),
  saturation: Symbol(),
  color: Symbol(),
  luminosity: Symbol(),
  clear: Symbol(),
  copy: Symbol(),
  sourceIn: Symbol(),
  sourceOut: Symbol(),
  sourceAtop: Symbol(),
  destinationOver: Symbol(),
  destinationIn: Symbol(),
  destinationOut: Symbol(),
  destinationAtop: Symbol(),
  xor: Symbol(),
  plusDarker: Symbol(),
  plusLighter: Symbol()
}

export default CGBlendMode
