'use strict'


/**
 * Options for when to load the reference node’s content, used by the loadingPolicy property.
 * @typedef {Object} SCNReferenceLoadingPolicy
 * @property {Symbol} immediate - Load the node’s external content immediately when the reference node is unarchived.
 * @property {Symbol} onDemand - Load the node’s external comment only when the load() method is called.
 * @see https://developer.apple.com/reference/scenekit/scnreferenceloadingpolicy
 */
const SCNReferenceLoadingPolicy = {
  immediate: Symbol(),
  onDemand: Symbol()
}

export default SCNReferenceLoadingPolicy
