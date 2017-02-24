'use strict'


/**
 * The signature for the block that SceneKit calls during scene export.
 * @type {function(totalProgress: number, error: ?Error, stop: UnsafeMutablePointer<ObjCBool>): void}
 * @param {number} totalProgress - A number between 0.0 and 1.0 that indicates the progress of the export operation, with 0.0 indicating that the operation has just begun and 1.0 indicating the operation has completed.
 * @param {?Error} error - An error encountered during the export process, or nil if no errors have occurred.
 * @param {UnsafeMutablePointer<ObjCBool>} stop - Set *stop to true inside the block to cancel export.
 * @returns {void}
 * @desc stopSet *stop to true inside the block to cancel export.
 * @see https://developer.apple.com/reference/scenekit/scnsceneexportprogresshandler
 */
const SCNSceneExportProgressHandler = (totalProgress, error, stop) => {}

export default SCNSceneExportProgressHandler
