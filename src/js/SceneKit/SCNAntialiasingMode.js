'use strict'


/**
 * Modes for antialiased rendering of the view’s scene, used by the SCNView property.
 * @typedef {Object} SCNAntialiasingMode
 * @property {Symbol} none - Disables antialiased rendering.
 * @property {Symbol} multisampling2X - Enables multisample antialiasing, with two samples per screen pixel.
 * @property {Symbol} multisampling4X - Enables multisample antialiasing, with four samples per screen pixel.
 * @property {Symbol} multisampling8X - Enables multisample antialiasing, with eight samples per screen pixel.
 * @property {Symbol} multisampling16X - Enables multisample antialiasing, with sixteen samples per screen pixel.
 * @see https://developer.apple.com/reference/scenekit/scnantialiasingmode
 */
const SCNAntialiasingMode = {
  none: Symbol(),
  multisampling2X: Symbol(),
  multisampling4X: Symbol(),
  multisampling8X: Symbol(),
  multisampling16X: Symbol()
}

export default SCNAntialiasingMode
