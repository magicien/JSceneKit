'use strict'


/**
 * The modes SceneKit uses to determine which polygons to render in a surface, used by the cullMode property.
 * @typedef {Object} SCNCullMode
 * @property {Symbol} back - 
 * @property {Symbol} front - 
 * @see https://developer.apple.com/reference/scenekit/scncullmode
 */
const SCNCullMode = {
  back: Symbol(),
  front: Symbol()
}

export default SCNCullMode
