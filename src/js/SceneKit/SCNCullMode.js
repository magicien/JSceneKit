'use strict'


/**
 * The modes SceneKit uses to determine which polygons to render in a surface, used by the cullMode property.
 * @typedef {Object} SCNCullMode
 * @property {number} back - 
 * @property {number} front - 
 * @see https://developer.apple.com/reference/scenekit/scncullmode
 */
const SCNCullMode = {
  back: 0,
  front: 1
}

export default SCNCullMode
