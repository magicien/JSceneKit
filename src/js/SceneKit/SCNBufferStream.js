'use strict'



/**
 * An object that manages a Metal buffer used by a custom shader program. 
 * @interface
 * @see https://developer.apple.com/documentation/scenekit/scnbufferstream
 */
export default class SCNBufferStream {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Writing Data to a Buffer

  /**
   * Required. Copies the specified data bytes into the underlying Metal buffer for use by a shader.
   * @access public
   * @param {Object} bytes - The memory address from which to copy data.
   * @param {number} length - The number of bytes to copy into the Metal buffer.
   * @returns {void}
   * @see https://developer.apple.com/documentation/scenekit/scnbufferstream/1523175-writebytes
   */
  writeBytesCount(bytes, length) {
  }
}
