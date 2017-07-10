'use strict'

import NSObject from '../ObjectiveC/NSObject'
import SCNAnimatable from './SCNAnimatable'
import SCNBindingBlock from './SCNBindingBlock'


/**
 * A specification for augmenting or postprocessing SceneKit's rendering of a scene using additional drawing passes with custom Metal or OpenGL shaders.
 * @access public
 * @extends {NSObject}
 * @implements {SCNAnimatable}
 * @see https://developer.apple.com/documentation/scenekit/scntechnique
 */
export default class SCNTechnique extends NSObject {

  // Creating a Technique

  /**
   * Creates a technique from a technique definition dictionary.,
   * @access public
   * @param {Map<string, Object>} dictionary - A dictionary defining the series of rendering passes that comprise the technique.
   * @returns {void}
   * @desc See the class overview for details of a technique definition dictionary.
   * @see https://developer.apple.com/documentation/scenekit/scntechnique/1520494-init
   */
  init(dictionary) {

    // Retrieving a Technique’s Definition

    this._dictionaryRepresentation = null
  }

  // Combining Techniques

  /**
   * Creates a new rendering technique that combines a series of techniques.
   * @access public
   * @param {SCNTechnique[]} techniques - An array of SCNTechnique objects.
   * @returns {void}
   * @desc The new technique applies the effects of the techniques in the order specified in the techniques array. Each output of a technique in the array becomes an input to the next technique in the array.
   * @see https://developer.apple.com/documentation/scenekit/scntechnique/1520497-init
   */
  initBySequencingTechniques(techniques) {

    // Retrieving a Technique’s Definition

    this._dictionaryRepresentation = null
  }

  // Retrieving a Technique’s Definition
  /**
   * The dictionary defining the rendering technique.
   * @type {Map<string, Object>}
   * @desc Read this property when you want to save a property list file containing the definition of a technique.See the class overview for details of a technique definition dictionary.
   * @see https://developer.apple.com/documentation/scenekit/scntechnique/1520492-dictionaryrepresentation
   */
  get dictionaryRepresentation() {
    return this._dictionaryRepresentation
  }

  // Handling Parameters for a Technique’s Shader Programs

  /**
   * Specifies a block to be called before rendering using programs with the specified GLSL uniform variable or attribute name.
   * @access public
   * @param {string} symbol - A GLSL uniform variable or attribute name used in one of the technique’s shader programs.
   * @param {?SCNBindingBlock} [block = null] - A block that SceneKit calls.
   * @returns {void}
   * @desc This method associates a block for handling setup of an attribute or uniform variable in the shader programs associated with the technique. SceneKit calls your block before any performing any rendering passes that use that symbol. In the block, you can execute any OpenGL commands or other code necessary for preparing your custom shader.NoteYou must associate a handler block with a technique before assigning that technique to a SceneKit object. The result of calling this method on a technique currently in use is undefined.Use this method when you need to update a value in a shader program every time SceneKit renders a frame. To set a value infrequently, or only once, use the setObject(_:forKeyedSubscript:) or setValue(_:forKey:) method instead.If you associate a block with a symbol using this method, SceneKit ignores values set using the setObject(_:forKeyedSubscript:) method.
   * @see https://developer.apple.com/documentation/scenekit/scntechnique/1520490-handlebinding
   */
  handleBindingOfSymbolUsing(symbol, block = null) {
  }

  /**
   * Sets a value for the specified shader  variable or attribute name, using subscript syntax.
   * @access public
   * @param {?Object} obj - An object containing a new value for the shader symbol.
   * @param {NSCopying} key - A shader variable or attribute name used in one of the technique’s shader programs.
   * @returns {void}
   * @desc The value parameter should be an object appropriate to the type of the shader symbol being set. For example, use an NSNumber object to set the value of a float uniform variable, or use an NSValue object containing an SCNVector3 structure to set the value of a GLSL vec3 uniform variable or a Metal float3 variable.Use this method when you need to set a value infrequently or only once. To update a shader value every time SceneKit renders a frame, use the handleBinding(ofSymbol:using:) method instead.If you use the handleBinding(ofSymbol:using:) method to associate a handler block for a symbol, SceneKit ignores values set for the symbol using the setObject(_:forKeyedSubscript:) method.
   * @see https://developer.apple.com/documentation/scenekit/scntechnique/1520495-setobject
   */
  setObjectForKeyedSubscript(obj, key) {
  }
}
