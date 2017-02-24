'use strict'


/**
 * Options for the rendering order of particles, used by the sortingMode property.
 * @typedef {Object} SCNParticleSortingMode
 * @property {Symbol} none - Particles are not sorted; they may be rendered in any order.
 * @property {Symbol} projectedDepth - Particles farther from the point of view (as measured using projected depth) are rendered before closer particles.
 * @property {Symbol} distance - Particles farther from the point of view (as measured using distance from the camera in scene space) are rendered before closer particles.
 * @property {Symbol} oldestFirst - Particles emitted earlier are rendered before particles emitted more recently.
 * @property {Symbol} youngestFirst - Particles emitted more recently are rendered before particles emitted earlier.
 * @see https://developer.apple.com/reference/scenekit/scnparticlesortingmode
 */
const SCNParticleSortingMode = {
  none: Symbol(),
  projectedDepth: Symbol(),
  distance: Symbol(),
  oldestFirst: Symbol(),
  youngestFirst: Symbol()
}

export default SCNParticleSortingMode
