'use strict'


/**
 * 
 * @typedef {Object} SCNHitTestOption
 * @property {Symbol} backFaceCulling - An option to ignore faces not oriented toward the camera.
 * @property {Symbol} boundingBoxOnly - An option to search for objects by bounding box only.
 * @property {Symbol} categoryBitMask - 
 * @property {Symbol} clipToZRange - An option to search for objects only within the depth range of the current point of view.
 * @property {Symbol} firstFoundOnly - An option to return only the first object found.
 * @property {Symbol} ignoreChildNodes - An option to ignore child nodes when searching.
 * @property {Symbol} ignoreHiddenNodes - An option to ignore hidden nodes when searching.
 * @property {Symbol} rootNode - The root of the node hierarchy to be searched.
 * @property {Symbol} sortResults - An option to sort the results of a hit-test.
 * @see https://developer.apple.com/reference/scenekit/scnhittestoption
 */
const SCNHitTestOption = {
  backFaceCulling: Symbol(),
  boundingBoxOnly: Symbol(),
  categoryBitMask: Symbol(),
  clipToZRange: Symbol(),
  firstFoundOnly: Symbol(),
  ignoreChildNodes: Symbol(),
  ignoreHiddenNodes: Symbol(),
  rootNode: Symbol(),
  sortResults: Symbol()
}

export default SCNHitTestOption
