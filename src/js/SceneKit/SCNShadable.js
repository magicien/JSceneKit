'use strict'

//import SCNProgram from './SCNProgram'
//import SCNShaderModifierEntryPoint from './SCNShaderModifierEntryPoint'
//import SCNBindingBlock from './SCNBindingBlock'


/**
 * Methods for customizing SceneKit's rendering of geometry and materials using Metal or OpenGL shader programs.
 * @interface
 * @see https://developer.apple.com/documentation/scenekit/scnshadable
 */
export default class SCNShadable {

  /**
   * constructor
   * @access public
   * @returns {void}
   */
  init() {

    // Assigning a Custom Shader Program

    /**
     * A program used when rendering the object.
     * @type {?SCNProgram}
     * @see https://developer.apple.com/documentation/scenekit/scnshadable/1523689-program
     */
    this.program = null


    // Customizing SceneKit’s Shader Programs

    /**
     * A dictionary of GLSL source code snippets for customizing the shader programs provided by SceneKit.
     * @type {?Map<SCNShaderModifierEntryPoint, string>}
     * @see https://developer.apple.com/documentation/scenekit/scnshadable/1523348-shadermodifiers
     */
    this.shaderModifiers = null

  }

  // Handling Parameters in Custom OpenGL Shader Programs

  /**
   * Specifies a block to be called before rendering with programs with the specified GLSL uniform variable or attribute name.
   * @access public
   * @param {string} symbol - A GLSL uniform variable or attribute name.
   * @param {?SCNBindingBlock} [block = null] - A block to be called by SceneKit.
   * @returns {void}
   * @desc Use this method to associate a block with a SceneKit object (geometry or material) to handle setup of an attribute or uniform variable in a custom SCNProgram shader associated with that object. SceneKit calls your block before rendering the object. In the block, you can execute any OpenGL commands or other code necessary for preparing your custom shader. For example, the following block updates the time uniform variable in a custom fragment shader for producing animated effects:CFTimeInterval startTime = CFAbsoluteTimeGetCurrent();
[myNode.geometry.firstMaterial handleBindingOfSymbol:@"time" usingBlock:
    ^(unsigned int programID, unsigned int location, SCNNode *renderedNode, SCNRenderer *renderer) {
        glUniform1f(location, CFAbsoluteTimeGetCurrent() - startTime);
    }];
This method is for OpenGL shader programs only. To bind custom variable data for Metal shader programs, use the handleBinding(ofBufferNamed:frequency:handler:) method.CFTimeInterval startTime = CFAbsoluteTimeGetCurrent();
[myNode.geometry.firstMaterial handleBindingOfSymbol:@"time" usingBlock:
    ^(unsigned int programID, unsigned int location, SCNNode *renderedNode, SCNRenderer *renderer) {
        glUniform1f(location, CFAbsoluteTimeGetCurrent() - startTime);
    }];

   * @see https://developer.apple.com/documentation/scenekit/scnshadable/1523063-handlebinding
   */
  handleBindingOfSymbolHandler(symbol, block = null) {
  }

  /**
   * Specifies a block to be called after rendering with programs with the specified GLSL uniform variable or attribute name.
   * @access public
   * @param {string} symbol - A GLSL uniform variable or attribute name.
   * @param {?SCNBindingBlock} [block = null] - A block to be called by SceneKit.
   * @returns {void}
   * @desc Use this method to associate a block with a SceneKit object (geometry or material) to handle cleanup related to an attribute or uniform variable in a custom SCNProgram shader associated with that object. SceneKit will call your block after rendering the object. In the block, you can execute any OpenGL commands or other code necessary for post-rendering tasks.This method is for OpenGL shader programs only. To bind custom variable data for Metal shader programs, use the handleBinding(ofBufferNamed:frequency:handler:) method.
   * @see https://developer.apple.com/documentation/scenekit/scnshadable/1522783-handleunbinding
   */
  handleUnbindingOfSymbolHandler(symbol, block = null) {
  }
}
