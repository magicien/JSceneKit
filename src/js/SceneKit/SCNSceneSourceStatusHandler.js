'use strict'

import SCNSceneSourceStatus from './SCNSceneSourceStatus'

/**
 * The signature for the block that SceneKit calls periodically to report progress while loading a scene.
 * @type {function(totalProgress: number, status: SCNSceneSourceStatus, error: ?Error, stopLoading: UnsafeMutablePointer<ObjCBool>): void}
 * @param {number} totalProgress - A floating-point number between 0.0 and 1.0 indicating the overall progress of loading the scene. A value of 0.0 indicates that the loading process has just begun, and a value of 1.0 indicates that the process has completed.
 * @param {SCNSceneSourceStatus} status - A constant identifying one of the distinct phases of SceneKit’s loading procedure. See SCNSceneSourceStatus for possible values.
 * @param {?Error} error - An error object describing any error that has occurred during scene loading, or nil if no errors has been encountered.
 * @param {UnsafeMutablePointer<ObjCBool>} stopLoading - A reference to a Boolean value. Set *stop to true within the block to abort further processing of the scene source’s contents.
 * @returns {void}
 * @see https://developer.apple.com/reference/scenekit/scnscenesourcestatushandler
 */
const SCNSceneSourceStatusHandler = (totalProgress, status, error, stopLoading) => {}

export default SCNSceneSourceStatusHandler
