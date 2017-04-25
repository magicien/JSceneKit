'use strict'


/**
 * The modes that determine how the scene’s area is mapped to the view that presents it.
 * @typedef {Object} SKSceneScaleMode
 * @property {number} fill - Each axis of the scene is scaled independently so that each axis in the scene exactly maps to the length of that axis in the view.
 * @property {number} aspectFill - The scaling factor of each dimension is calculated and the larger of the two is chosen. Each axis of the scene is scaled by the same scaling factor. This guarantees that the entire area of the view is filled but may cause parts of the scene to be cropped.
 * @property {number} aspectFit - The scaling factor of each dimension is calculated and the smaller of the two is chosen. Each axis of the scene is scaled by the same scaling factor. This guarantees that the entire scene is visible but may require letterboxing in the view.
 * @property {number} resizeFill - The scene is not scaled to match the view. Instead, the scene is automatically resized so that its dimensions always match those of the view.
 * @see https://developer.apple.com/reference/spritekit/skscenescalemode
 */
const SKSceneScaleMode = {
  fill: 0,
  aspectFill: 1,
  aspectFit: 2,
  resizeFill: 3
}

export default SKSceneScaleMode
