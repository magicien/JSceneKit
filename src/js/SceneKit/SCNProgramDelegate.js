'use strict'

import SCNProgram from './SCNProgram'
import SCNRenderer from './SCNRenderer'


/**
 * The interface for tracking errors that occur when compiling shader source code.
 * @interface
 * @see https://developer.apple.com/reference/scenekit/scnprogramdelegate
 */
export default class SCNProgramDelegate {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {
  }

  // Handling Shader Compilation Errors

  /**
   * Tells the delegate that an error occurred when compiling GLSL source code.
   * @access public
   * @param {SCNProgram} program - The program that generated the compilation error.
   * @param {Error} error - The compilation error that was raised.
   * @returns {void}
   * @desc Examine the error parameter for details of the compilation error provided by the GLSL compiler.
   * @see https://developer.apple.com/reference/scenekit/scnprogramdelegate/1523007-program
   */
  programHandleError(program, error) {
  }

  // Finding Fragment Opaqueness

  /**
   * Asks the delegate whether fragments rendered by a program are opaque.
   * @deprecated
   * @access public
   * @param {SCNProgram} program - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/reference/scenekit/scnprogramdelegate/1523068-programisopaque
   */
  programIsOpaque(program) {
    return false
  }

  // Binding and Unbinding Values

  /**
   * Invoked on the delegate to let it bind program values and/or associated graphics resources (such as textures) for symbols.
   * @deprecated
   * @access public
   * @param {SCNProgram} program - The SCNProgram object to bind values for.
   * @param {string} symbol - The name of the symbol to bind a value for.
   * @param {number} location - The location of the symbol within the program object to be modified.
   * @param {number} programID - The underlying OpenGL program object in which the binding is made.
   * @param {SCNRenderer} renderer - The renderer that is currently rendering the scene.
   * @returns {boolean} - 
   * @desc If you use the handleBinding(ofSymbol:handler:) method to associate a handler block with a SceneKit object for a symbol, SceneKit will not call the delegate’s program(_:bindValueForSymbol:atLocation:programID:renderer:) method for that symbol when rendering that object.
   * @see https://developer.apple.com/reference/scenekit/scnprogramdelegate/1524155-program
   */
  programBindValueForSymbolAtLocation(program, symbol, location, programID, renderer) {
    return false
  }

  /**
   * Invoked on the delegate to let it unbind program values and/or also unbind associated graphic resources (such as textures).
   * @deprecated
   * @access public
   * @param {SCNProgram} program - The SCNProgram object to unbind values for.
   * @param {string} symbol - The name of the symbol to unbind a value for.
   * @param {number} location - The location of the symbol within the program object to be modified.
   * @param {number} programID - The underlying OpenGL program object in which the unbinding is done.
   * @param {SCNRenderer} renderer - The renderer that is currently rendering the scene.

   * @returns {void}
   * @desc If you use the handleUnbinding(ofSymbol:handler:) method to associate a handler block with a SceneKit object for a symbol, SceneKit will not call the delegate’s program(_:unbindValueForSymbol:atLocation:programID:renderer:) method for that symbol when rendering that object.
   * @see https://developer.apple.com/reference/scenekit/scnprogramdelegate/1523857-program
   */
  programUnbindValueForSymbolAtLocation(program, symbol, location, programID, renderer) {
  }
}
