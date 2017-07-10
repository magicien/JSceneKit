'use strict'

/**
 * Texture filtering modes to use when the texture is drawn in a size other than its native size.
 * @typedef {Object} SKTextureFilteringMode
 * @property {number} nearest - Each pixel is drawn using the nearest point in the texture. This mode is faster, but the results are often pixelated.
 * @property {number} linear - Each pixel is drawn by using a linear filter of multiple texels in the texture. This mode produces higher quality results but may be slower.
 * @see https://developer.apple.com/documentation/spritekit/sktexturefilteringmode
 */
const SKTextureFilteringMode = {
  nearest: 0,
  linear: 1
}

export default SKTextureFilteringMode
