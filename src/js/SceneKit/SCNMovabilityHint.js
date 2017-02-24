'use strict'


/**
 * Values that inform SceneKit’s rendering for movement-related effects, used by the movabilityHint property.
 * @typedef {Object} SCNMovabilityHint
 * @property {Symbol} fixed - The node is not expected to move over time.
 * @property {Symbol} movable - The node is expected to move over time.
 * @see https://developer.apple.com/reference/scenekit/scnmovabilityhint
 */
const SCNMovabilityHint = {
  fixed: Symbol(),
  movable: Symbol()
}

export default SCNMovabilityHint
