'use strict'

import NSObject from '../ObjectiveC/NSObject'
import GCGamepad from './GCGamepad'
import GCExtendedGamepad from './GCExtendedGamepad'
import GCMicroGamepad from './GCMicroGamepad'
//import GCMotion from './GCMotion'
//import GCControllerPlayerIndex from './GCControllerPlayerIndex'

let navigator = {
  getGamepads: () => { return [] }
}
if(typeof window !== 'undefined' && typeof window.navigator !== 'undefined'){
  navigator = window.navigator
}


/**
 * @access private
 * @type {Map<number, GCController>}
 */
const _controllers = new Map()

/**
 * A representation of a physical game controller, connected to the device either physically or through a wireless connection.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/gamecontroller/gccontroller
 */
export default class GCController extends NSObject {

  static getController(gamepad) {
    let pad = gamepad
    if(gamepad.id === ''){
      // needs to refresh gamepad info
      pad = GCController._gamepadObjByIndex(gamepad.index)
      if(pad === null){
        return null
      }
    }

    let controller = _controllers.get(pad.id)
    if(controller){
      return controller
    }

    controller = new GCController()
    if(!pad){
      return controller
    }
    _controllers.set(pad.id, controller)

    controller._gamepadIndex = pad.index
    controller._gamepadId = pad.id
    controller._gamepad = new GCGamepad()
    controller._gamepad._controller = controller
    if(gamepad.mapping === 'standard'){
      controller._extendedGamepad = new GCExtendedGamepad()
      controller._extendedGamepad._controller = controller
    }
    
    return controller
  }

  /**
   * constructor
   * @access public
   */
  constructor() {
    super()

    // Determining Which Profiles Are Supported by a Controller

    /**
     * @type {?GCGamepad}
     */
    this._gamepad = null

    /**
     * @type {?GCExtendedGamepad}
     */
    this._extendedGamepad = null

    /**
     * @type {?GCMicroGamepad}
     */
    this._microGamepad = null

    /**
     * @type {?GCMotion}
     */
    this._motion = null

    // Responding When a Controller Is Paused

    /**
     * A block called when the controller’s pause button is pressed.
     * @type {?function(arg1: GCController): void}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458852-controllerpausedhandler
     */
    this.controllerPausedHandler = null


    // Inspecting a Controller

    this._isAttachedToDevice = false
    this._vendorName = null

    // Assigning a Player Index

    /**
     * The player index assigned to the controller.
     * @type {GCControllerPlayerIndex}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458885-playerindex
     */
    this.playerIndex = null


    // Determining Which Dispatch Queue Notifications are Dispatched On

    /**
     * The dispatch queue to be used when the values of a game controller’s input values change.
     * @type {DispatchQueue}
     * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458869-handlerqueue
     */
    this.handlerQueue = null

    this._gamepadIndex = -1
    this._gamepadId = -1

    this._state = {
      buttons: [],
      pressed: [],
      axes: []
    }
    this._updated = {
      buttons: [],
      pressed: [],
      axes: []
    }
  }

  static _update() {
    _controllers.forEach((c, gamepadId) => {
      const gamepad = GCController._gamepadObjById(gamepadId)
      if(!gamepad){
        _controllers.delete(gamepadId)
        return
      }
      const bLen = gamepad.buttons.length
      for(let i=0; i<bLen; i++){
        const b = gamepad.buttons[i]
        c._updated.buttons[i] = false
        if(c._state.buttons[i] !== b.value){
          c._state.buttons[i] = b.value
          c._updated.buttons[i] = true
        }

        c._updated.pressed[i] = false
        if(c._state.pressed[i] !== b.pressed){
          c._state.pressed[i] = b.pressed
          c._updated.pressed[i] = true
        }
      }

      const aLen = gamepad.axes.length
      for(let i=0; i<aLen; i++){
        const value = gamepad.axes[i]
        c._updated.axes[i] = false
        if(c._state.axes[i] !== value){
          c._state.axes[i] = value
          c._updated.axes[i] = true
        }
      }
    })

    _controllers.forEach((c, gamepadId) => {
      if(c._gamepad){
        c._gamepad._update()
      }
      if(c._extendedGamepad){
        c._extendedGamepad._update()
      }
      if(c._microGamepad){
        c._microGamepad._update()
      }
    })
  }

  // Discovering Controllers

  /**
   * Starts browsing for nearby controllers.
   * @access public
   * @param {?function(): void} [completionHandler = null] - A block to be called when browsing ends.
   * @returns {void}
   * @desc You should include a user interface in your game to allow the player to determine when controllers are discovered. When the user chooses to search for controllers, call this method. The device searches asynchronously for discoverable wireless controllers as well as controllers that are connected to iOS devices that have been placed in controller-forwarding mode. Whenever a new controller is connected, a GCControllerDidConnect notification is posted. When no more devices can be found or the discovery process times out, the completion handler is called.If this method is called multiple times, only the block associated with the last invocation is called when discovery times out.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458879-startwirelesscontrollerdiscovery
   */
  static startWirelessControllerDiscovery(completionHandler = null) {
  }

  /**
   * Stops browsing for nearby controllers.
   * @access public
   * @returns {void}
   * @desc This method may be called at any time. If a search for new wireless controllers in progress, that search ends and its completion handler is called. 
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458854-stopwirelesscontrollerdiscovery
   */
  static stopWirelessControllerDiscovery() {
  }

  /**
   * The controllers connected to the device.
   * @access public
   * @returns {GCController[]} - 
   * @desc Whenever a controller is connected to or disconnected from the device, the array of controllers is updated and a notification is posted.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458871-controllers
   */
  static controllers() {
    return null
  }

  // Determining Which Profiles Are Supported by a Controller

  /**
   * The gamepad profile.
   * @type {?GCGamepad}
   * @desc If the controller supports the gamepad profile, then this property holds a GCGamepad object. You use this object to access the input elements of the controller. If the controller does not support the gamepad profile, this property holds nil.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458860-gamepad
   */
  get gamepad() {
    return this._gamepad
  }

  /**
   * The extended gamepad profile.
   * @type {?GCExtendedGamepad}
   * @desc If the controller supports the extended gamepad profile, then this property holds a GCExtendedGamepad object. You use this object to access the input elements of the controller. If the controller does not support the extended gamepad profile, this property holds nil.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458883-extendedgamepad
   */
  get extendedGamepad() {
    return this._extendedGamepad
  }

  /**
   * The micro gamepad profile.
   * @type {?GCMicroGamepad}
   * @desc If the controller supports the micro gamepad profile, then this property holds a GCMicroGamepad object. You use this object to access the input elements of the controller. If the controller does not support the micro gamepad profile, this property holds nil.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1627772-microgamepad
   */
  get microGamepad() {
    return this._microGamepad
  }

  /**
   * The motion input profile.
   * @type {?GCMotion}
   * @desc If the controller supports the motion profile, then this property holds a GCMotion object. This profile is typically available when the controller is attached to a device that supports motion. You use this object to access the motion data of the controller. If the controller does not support the motion input profile, this property holds nil.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458884-motion
   */
  get motion() {
    return this._motion
  }

  // Inspecting a Controller

  /**
   * A Boolean property that indicates whether the controller is closely integrated with the device.
   * @type {boolean}
   * @desc If true, then the controller is attached to the device or is close enough to it for the player to interact simultaneously with the controller and the device. If false, then the controller is not guaranteed to be near the device.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458868-isattachedtodevice
   */
  get isAttachedToDevice() {
    return this._isAttachedToDevice
  }

  /**
   * The name of the vendor that manufactured the controller.
   * @type {?string}
   * @desc The value of this property may be nil and is not guaranteed to be unique.
   * @see https://developer.apple.com/documentation/gamecontroller/gccontroller/1458877-vendorname
   */
  get vendorName() {
    return this._vendorName
  }

  get gamepadObj() {
    return GCController._gamepadObjById(this._gamepadId)
  }

  static _gamepadObjByIndexId(index, id) {
    const pad = GCController._gamepadObjByIndex(index)
    if(pad && pad.id === id){
      return pad
    }
    return null
  }

  static _gamepadObjByIndex(index) {
    return navigator.getGamepads()[index]
  }

  static _gamepadObjById(id) {
    const pads = navigator.getGamepads()
    for(const pad of pads){
      if(pad && pad.id === id){
        return pad
      }
    }
    return null
  }
}
