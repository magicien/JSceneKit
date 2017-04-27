'use strict'

/**
 * Values that inform SceneKit’s rendering for movement-related effects, used by the movabilityHint property.
 * @typedef {Object} SCNMovabilityHint
 * @property {number} fixed - The node is not expected to move over time.
 * @property {number} movable - The node is expected to move over time.
 * @see https://developer.apple.com/reference/scenekit/scnmovabilityhint
 */
const SCNMovabilityHint = {
  fixed: 0,
  movable: 1
}

export default SCNMovabilityHint
