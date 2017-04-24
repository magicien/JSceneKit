'use strict'

/**
 * Options for the rendering order of particles, used by the sortingMode property.
 * @typedef {Object} SCNParticleSortingMode
 * @property {number} none - Particles are not sorted; they may be rendered in any order.
 * @property {number} projectedDepth - Particles farther from the point of view (as measured using projected depth) are rendered before closer particles.
 * @property {number} distance - Particles farther from the point of view (as measured using distance from the camera in scene space) are rendered before closer particles.
 * @property {number} oldestFirst - Particles emitted earlier are rendered before particles emitted more recently.
 * @property {number} youngestFirst - Particles emitted more recently are rendered before particles emitted earlier.
 * @see https://developer.apple.com/reference/scenekit/scnparticlesortingmode
 */
const SCNParticleSortingMode = {
  none: 0,
  projectedDepth: 1,
  distance: 2,
  oldestFirst: 3,
  youngestFirst: 4
}

export default SCNParticleSortingMode
