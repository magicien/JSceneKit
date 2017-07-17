'use strict'

import NSObject from '../ObjectiveC/NSObject'
//import AVAudioFormat from './AVAudioFormat'
//import AVAudioNodeBus from './AVAudioNodeBus'
//import AVAudioFrameCount from './AVAudioFrameCount'
//import AVAudioNodeTapBlock from './AVAudioNodeTapBlock'
//import AVAudioTime from './AVAudioTime'
//import AUAudioUnit from './AUAudioUnit'

/**
 * The AVAudioNode class is an abstract class for an audio generation, processing, or I/O block.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/avfoundation/avaudionode
 */
export default class AVAudioNode extends NSObject {
  /**
   * constructor
   * @access public
   * @constructor
   */
  constructor() {
    super()

    // Configuring an Input Format Bus

    this._numberOfInputs = 0

    // Creating and Output Format Bus

    this._numberOfOutputs = 0

    // Getting the Audio Engine for the Node

    this._engine = null

    // Getting the Latest Node Render Time

    this._lastRenderTime = null

    // Instance Properties

    this._auAudioUnit = null
    this._latency = 0
    this._outputPresentationLatency = 0
  }

  // Configuring an Input Format Bus

  /**
   * Returns the input format for the specified bus.
   * @access public
   * @param {AVAudioNodeBus} bus - The bus.
   * @returns {AVAudioFormat} - 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1390147-inputformat
   */
  inputFormatForBus(bus) {
    return null
  }

  /**
   * The name of an input bus.
   * @access public
   * @param {AVAudioNodeBus} bus - The input bus.
   * @returns {?string} - 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1387710-name
   */
  nameForInputBus(bus) {
    return null
  }
  /**
   * The number of input busses for the node.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1390585-numberofinputs
   */
  get numberOfInputs() {
    return this._numberOfInputs
  }

  // Creating and Output Format Bus

  /**
   * Returns the output format for the specified bus.
   * @access public
   * @param {AVAudioNodeBus} bus - The bus.
   * @returns {AVAudioFormat} - 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1389195-outputformat
   */
  outputFormatForBus(bus) {
    return null
  }

  /**
   * The name of the output bus.
   * @access public
   * @param {AVAudioNodeBus} bus - The output bus.
   * @returns {?string} - 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1390811-name
   */
  nameForOutputBus(bus) {
    return null
  }
  /**
   * The number of output busses for the node.
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1385916-numberofoutputs
   */
  get numberOfOutputs() {
    return this._numberOfOutputs
  }

  // Installing and Removing An Audio Tap

  /**
   * Installs an audio tap on the bus to record. monitor, and observe the output of the node
   * @access public
   * @param {AVAudioNodeBus} bus - The node output bus to which to attach the tap.
   * @param {AVAudioFrameCount} bufferSize - The requested size of the incoming buffers. The implementation may choose another size.
   * @param {?AVAudioFormat} format - If non-nil, attempts to apply this as the format of the specified output bus.This should only be done when attaching to an output bus which is not connected to another node; an error will result otherwise. The tap and connection formats (if non-nil) on the specified bus should be identical. Otherwise, the latter operation will override any previously set format.For AVAudioOutputNode, tap format must be specified as nil.
   * @param {AVAudioNodeTapBlock} tapBlock - A block to be called with audio buffers. See AVAudioNodeTapBlock for the block parameters.
   * @returns {void}
   * @desc Only one tap may be installed on any bus. Taps may be safely installed and removed while the engine is running.AVAudioEngine *engine = [[AVAudioEngine alloc] init];
AVAudioInputNode *input = [engine inputNode];
AVAudioFormat *format = [input outputFormatForBus: 0];
[input installTapOnBus: 0 bufferSize: 8192 format: format block: ^(AVAudioPCMBuffer *buf, AVAudioTime *when) {
// ‘buf' contains audio captured from input node at time 'when'
}];
....
// start engine
ImportantThe tapBlock may be invoked on a thread other than the main thread.AVAudioEngine *engine = [[AVAudioEngine alloc] init];
AVAudioInputNode *input = [engine inputNode];
AVAudioFormat *format = [input outputFormatForBus: 0];
[input installTapOnBus: 0 bufferSize: 8192 format: format block: ^(AVAudioPCMBuffer *buf, AVAudioTime *when) {
// ‘buf' contains audio captured from input node at time 'when'
}];
....
// start engine

   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1387122-installtap
   */
  installTapOnBusBlock(bus, bufferSize, format, tapBlock) {
  }

  /**
   * Removes an audio tap on a bus.
   * @access public
   * @param {AVAudioNodeBus} bus - The node output bus whose tap is to be removed.
   * @returns {void}
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1388717-removetap
   */
  removeTapOnBus(bus) {
  }

  // Getting the Audio Engine for the Node
  /**
   * The audio engine of the node.
   * @type {?AVAudioEngine}
   * @desc Returns nil if the node is not attached to an audio engine.
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1386896-engine
   */
  get engine() {
    return this._engine
  }

  // Getting the Latest Node Render Time
  /**
   * The time for which the node most recently rendered.
   * @type {?AVAudioTime}
   * @desc Return nil if the engine is not running or if the node is not connected to an input or output node.
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1385978-lastrendertime
   */
  get lastRenderTime() {
    return this._lastRenderTime
  }

  // Reset the Audio Node

  /**
   * Clear a unit's previous processing state.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/1385976-reset
   */
  reset() {
  }

  // Instance Properties
  /**
   * 
   * @type {AUAudioUnit}
   * @desc 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/2866396-auaudiounit
   */
  get auAudioUnit() {
    return this._auAudioUnit
  }
  /**
   * 
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/2875482-latency
   */
  get latency() {
    return this._latency
  }
  /**
   * 
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/avfoundation/avaudionode/2875483-outputpresentationlatency
   */
  get outputPresentationLatency() {
    return this._outputPresentationLatency
  }
}
