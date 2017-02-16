'use strict'

/**
 * SCNView class
 * A view for displaying 3D SceneKit content.
 * @access public
 */
export default class SCNView {
  /**
   *
   * @access public
   * @constructor
   */
  constructor() {
    this.showsStatistics = false

    this.pointOfView = null

    this.loops = false

    this.isPlaying = false

    this.delegate = null

    this.currentTime = 0

    /**
     * @type {SCNAntialiasingMode}
     * The antialiasing mode used for rendering the view’s scene.
     */
    this.antialiasingMode = 0

    /**
     * @type {number}
     * The animation frame rate that the view uses to render its scene.
     */
    this.preferredFramesPerSecond = 0

    /**
     * @type {boolean}
     * A Boolean value that determines whether the user can manipulate the current point of view that is used to render the scene.
     */
    this.allowsCameraControl = false

    /**
     * @type {Color}
     * The background color of the view.
     */
    this.backgroundColor = null

    /**
     * @type {SCNScene}
     * The scene to be displayed in the view.
     */
    this.scene = null
  }

  /**
   * 
   * @access public
   * @param {Object} sender - a
   * @returns {void}
   */
  stop(sender) {
    // TODO: implement
  }

  /**
   * Pauses playback of the view’s scene.
   * @access public
   * @param {Object} sender - The object requesting the action (used when connecting a control in Interface Builder).  SceneKit ignores this parameter.
   * @returns {void}
   * @desc This method has no effect if the scene is already paused.
   */
  pause(sender) {
  }

  /**
   * Resumes playback of the view’s scene.
   * @access public
   * @param {Object} sender - The object requesting the action (used when connecting a control in Interface Builder). SceneKit ignores this parameter.
   * @returns {void}
   * @desc This method has no effect if the scene is not paused.
   */
  play(sender) {
  }

  /**
   * 
   * @access public
   * @returns {void}
   */
  snapshot() {
  }
}

