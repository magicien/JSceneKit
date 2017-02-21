'use strict'



/**
 * Methods you can implement to participate in the process of exporting a scene to a file.
 * @interface
 * @see https://developer.apple.com/reference/scenekit/scnsceneexportdelegate
 */
export default class SCNSceneExportDelegate {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Writing Image Attachments

  /**
   * Tells the delegate to export an image attached to a scene.
   * @access public
   * @param {Image} image - An image attached to the scene being exported.
   * @param {string} documentURL - The URL the scene is being exported to.
   * @param {?string} originalImageURL - The URL the image was originally loaded from, or nil if the image was not previously loaded from a URL.
   * @returns {?string} - 
   * @desc If you implement this method, Scene Kit calls it for each image (for example, a texture) attached to the scene. Your app can then save the image data in a location and format of your choice, returning a URL for the exported image file.If you do not provide a delegate when exporting a scene, or if your delegate returns nil from this method, Scene Kit exports the image in a default format to a default location.
   * @see https://developer.apple.com/reference/scenekit/scnsceneexportdelegate/1524221-write
   */
  writeWithSceneDocumentURL(image, documentURL, originalImageURL) {
    return null
  }
}
