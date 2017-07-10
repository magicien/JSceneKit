'use strict'


/**
 * Modes for antialiased rendering of the view’s scene, used by the SCNView property.
 * @typedef {Object} SCNAntialiasingMode
 * @property {number} none - Disables antialiased rendering.
 * @property {number} multisampling2X - Enables multisample antialiasing, with two samples per screen pixel.
 * @property {number} multisampling4X - Enables multisample antialiasing, with four samples per screen pixel.
 * @property {number} multisampling8X - Enables multisample antialiasing, with eight samples per screen pixel.
 * @property {number} multisampling16X - Enables multisample antialiasing, with sixteen samples per screen pixel.
 * @see https://developer.apple.com/documentation/scenekit/scnantialiasingmode
 */
const SCNAntialiasingMode = {
  none: 0,
  multisampling2X: 1,
  multisampling4X: 2,
  multisampling8X: 3,
  multisampling16X: 4
}

export default SCNAntialiasingMode
