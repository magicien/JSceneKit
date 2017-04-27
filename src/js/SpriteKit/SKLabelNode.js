'use strict'

import SKColor from './SKColor'
import SKNode from './SKNode'
import SKLabelVerticalAlignmentMode from './SKLabelVerticalAlignmentMode'
import SKLabelHorizontalAlignmentMode from './SKLabelHorizontalAlignmentMode'
import SKBlendMode from './SKBlendMode'

/**
 * A node that displays a text label.
 * @access public
 * @extends {SKNode}
 * @see https://developer.apple.com/reference/spritekit/sklabelnode
 */
export default class SKLabelNode extends SKNode {

  // Creating a New Label Node

  /**
   * Initializes a new label object with a specified font.
   * @access public
   * @param {?string} fontName - The name of the font used by the label.
   * @returns {void}
   * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519917-init
   */
  initFontNamed(fontName) {

    // Configuring the Label Message

    /**
     * The string that the label node displays.
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519788-text
     */
    this.text = null


    // Configuring the Label Font

    /**
     * The color of the label.
     * @type {?CGColor}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1520057-fontcolor
     */
    this.fontColor = new SKColor(1.0, 1.0, 1.0, 1.0)

    /**
     * The font used for the text in the label.
     * @type {?string}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1520129-fontname
     */
    this.fontName = 'HelveticaNeue-UltraLight'

    /**
     * The size of the font used in the label.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1520208-fontsize
     */
    this.fontSize = 32.0


    // Configuring the Label’s Position

    /**
     * The vertical position of the text within the node.
     * @type {SKLabelVerticalAlignmentMode}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519933-verticalalignmentmode
     */
    this.verticalAlignmentMode = SKLabelVerticalAlignmentMode.baseline

    /**
     * The horizontal position of the text within the node.
     * @type {SKLabelHorizontalAlignmentMode}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519711-horizontalalignmentmode
     */
    this.horizontalAlignmentMode = SKLabelHorizontalAlignmentMode.center


    // Performing Color Blending

    /**
     * The label’s blend color.
     * @type {?CGColor}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519938-color
     */
    this.color = new SKColor(1.0, 1.0, 1.0, 1.0)

    /**
     * A floating-point value that describes how the color is blended with the font color.
     * @type {number}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519724-colorblendfactor
     */
    this.colorBlendFactor = 0.0


    // Blending the Label into the Framebuffer

    /**
     * The blend mode used to draw the label into the parent’s framebuffer.
     * @type {SKBlendMode}
     * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519598-blendmode
     */
    this.blendMode = SKBlendMode.alpha

  }

  /**
   * Initializes a new label object with a text string.
   * @access public
   * @param {?string} text - The text to use to initialize the label node.
   * @returns {void}
   * @desc The label node’s font is set to Helvetica Neue Ultra Light, 32 point.
   * @see https://developer.apple.com/reference/spritekit/sklabelnode/1519612-init
   */
  init(text) {
  }

  /**
   * @access private
   * @param {WebGLRenderingContext} gl -
   * @returns {void}
   */
  _render(gl) {
  }

}
