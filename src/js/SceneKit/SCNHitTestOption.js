'use strict'


/**
 * 
 * @typedef {Object} SCNHitTestOption
 * @property {string} backFaceCulling - An option to ignore faces not oriented toward the camera.
 * @property {string} boundingBoxOnly - An option to search for objects by bounding box only.
 * @property {string} categoryBitMask - 
 * @property {string} clipToZRange - An option to search for objects only within the depth range of the current point of view.
 * @property {string} firstFoundOnly - An option to return only the first object found.
 * @property {string} ignoreChildNodes - An option to ignore child nodes when searching.
 * @property {string} ignoreHiddenNodes - An option to ignore hidden nodes when searching.
 * @property {string} rootNode - The root of the node hierarchy to be searched.
 * @property {string} sortResults - An option to sort the results of a hit-test.
 * @see https://developer.apple.com/reference/scenekit/scnhittestoption
 */
const SCNHitTestOption = {
  backFaceCulling: 'kHitTestBackFaceCulling',
  boundingBoxOnly: 'kHitTestBoundingBoxOnly',
  categoryBitMask: 'kHitTestCategoryBitMask',
  clipToZRange: 'kHitTestClipToZRange',
  firstFoundOnly: 'kHitTestFirstFoundOnly',
  ignoreChildNodes: 'kHitTestIgnoreChildNodes',
  ignoreHiddenNodes: 'kHitTestSkipHiddenNode',
  rootNode: 'kHitTestRootNode',
  sortResults: 'kHitTestSortResults'
}

export default SCNHitTestOption
