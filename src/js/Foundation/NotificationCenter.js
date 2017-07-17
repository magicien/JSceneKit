'use strict'

import NSObject from '../ObjectiveC/NSObject'
import NSNotification from './NSNotification'
import GCController from '../GameController/GCController'

let _default = null

/**
 * A notification dispatch mechanism that enables the broadcast of information to registered observers.
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/foundation/notificationcenter
 */
export default class NotificationCenter extends NSObject {

  /**
   * constructor
   * @access public
   * @constructor
   */
  //constructor() {
  //  super()
  //}

  // Getting the Notification Center

  /**
   * Returns the process’s default notification center.
   * @type {NotificationCenter}
   * @desc 
   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1414169-default
   */
  static get default() {
    if(_default === null){
      _default = new NotificationCenter()
    }
    return _default
  }

  // Managing Notification Observers

  /**
   * Adds an entry to the receiver’s dispatch table with a notification queue and a block to add to the queue, and optional criteria: notification name and sender.
   * @access public
   * @param {?NSNotification.Name} name - The name of the notification for which to register the observer; that is, only notifications with this name are used to add the block to the operation queue.If you pass nil, the notification center doesn’t use a notification’s name to decide whether to add the block to the operation queue.
   * @param {?Object} obj - The object whose notifications the observer wants to receive; that is, only notifications sent by this sender are delivered to the observer.If you pass nil, the notification center doesn’t use a notification’s sender to decide whether to deliver it to the observer.
   * @param {?OperationQueue} queue - The operation queue to which block should be added.If you pass nil, the block is run synchronously on the posting thread.
   * @param {function(arg1: Notification): void} block - The block to be executed when the notification is received.The block is copied by the notification center and (the copy) held until the observer registration is removed. The block takes one argument:notificationThe notification.
   * @returns {NSObjectProtocol} - 
   * @desc If a given notification triggers more than one observer block, the blocks may all be executed concurrently with respect to one another (but on their given queue or on the current thread).The following example shows how you can register to receive locale change notifications.let center = NSNotificationCenter.defaultCenter()
let mainQueue = NSOperationQueue.mainQueue()
self.localeChangeObserver = center.addObserverForName(NSCurrentLocaleDidChangeNotification, object: nil, queue: mainQueue) { (note) in
    print("The user's locale changed to: \(NSLocale.currentLocale().localeIdentifier)")
}
To unregister observations, you pass the object returned by this method to removeObserver(_:). You must invoke removeObserver(_:) or removeObserver(_:name:object:) before any object specified by addObserverForName:object:queue:usingBlock: is deallocated.let center = NSNotificationCenter.defaultCenter()
center.removeObserver(self.localeChangeObserver)
Another common pattern is to create a one-time notification by removing the observer from within the observation block, as in the following example.let center = NSNotificationCenter.defaultCenter()
let mainQueue = NSOperationQueue.mainQueue()
var token: NSObjectProtocol?
token = center.addObserverForName("OneTimeNotification", object: nil, queue: mainQueue) { (note) in
    print("Received the notification!")
    center.removeObserver(token!)
}
let center = NSNotificationCenter.defaultCenter()
let mainQueue = NSOperationQueue.mainQueue()
self.localeChangeObserver = center.addObserverForName(NSCurrentLocaleDidChangeNotification, object: nil, queue: mainQueue) { (note) in
    print("The user's locale changed to: \(NSLocale.currentLocale().localeIdentifier)")
}
let center = NSNotificationCenter.defaultCenter()
center.removeObserver(self.localeChangeObserver)
let center = NSNotificationCenter.defaultCenter()
let mainQueue = NSOperationQueue.mainQueue()
var token: NSObjectProtocol?
token = center.addObserverForName("OneTimeNotification", object: nil, queue: mainQueue) { (note) in
    print("Received the notification!")
    center.removeObserver(token!)
}

   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1411723-addobserver
   */
  addObserverForNameObjectUsing(name, obj, queue, block) {
    return null
  }

  /**
   * Adds an entry to the receiver’s dispatch table with an observer, a notification selector and optional criteria: notification name and sender.
   * @access public
   * @param {Object} observer - Object registering as an observer. This value must not be nil.
   * @param {function} aSelector - Selector that specifies the message the receiver sends observer to notify it of the notification posting. The method specified by aSelector must have one and only one argument (an instance of NSNotification).
   * @param {?NSNotification.Name} aName - The name of the notification for which to register the observer; that is, only notifications with this name are delivered to the observer.If you pass nil, the notification center doesn’t use a notification’s name to decide whether to deliver it to the observer.
   * @param {?Object} anObject - The object whose notifications the observer wants to receive; that is, only notifications sent by this sender are delivered to the observer.If you pass nil, the notification center doesn’t use a notification’s sender to decide whether to deliver it to the observer.
   * @returns {void}
   * @desc If your app targets iOS 9.0 and later or macOS 10.11 and later, you don't need to unregister an observer in its deallocation method. If your app targets earlier releases, be sure to invoke removeObserver(_:name:object:) before observer or any object specified in addObserver:selector:name:object: is deallocated.
   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1415360-addobserver
   */
  addObserverSelectorNameObject(observer, aSelector, aName, anObject) {
    const f = aSelector.bind(observer)
    if(aName === NSNotification.Name.GCControllerDidConnect){
      window.addEventListener('gamepadconnected', (e) => {
        const controller = GCController.getController(e.gamepad)
        if(controller){
          f(new NSNotification(aName, controller, anObject))
        }
      })
      window.addEventListener('gamepaddisconnected', (e) => {
        const controller = GCController.getController(e.gamepad)
        if(controller){
          f(new NSNotification(aName, controller, anObject))
        }
      })
    }
  }

  /**
   * Removes all the entries specifying a given observer from the receiver’s dispatch table.
   * @access public
   * @param {Object} observer - The observer to remove. Must not be nil.
   * @returns {void}
   * @desc Be sure to invoke this method (or removeObserver(_:name:object:)) before observer or any object specified in addObserver(_:selector:name:object:) is deallocated.You should not use this method to remove all observers from an object that is going to be long-lived, because your code may not be the only code adding observers that involve the object. The following example illustrates how to unregister someObserver for all notifications for which it had previously registered. This is safe to do in the dealloc method, but should not otherwise be used—use removeObserver(_:name:object:) instead.[[NSNotificationCenter defaultCenter] removeObserver:someObserver];
[[NSNotificationCenter defaultCenter] removeObserver:someObserver];

   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1413994-removeobserver
   */
  removeObserver(observer) {
  }

  /**
   * Removes matching entries from the receiver’s dispatch table.
   * @access public
   * @param {Object} observer - Observer to remove from the dispatch table. Specify an observer to remove only entries for this observer. Must not be nil, or message will have no effect.
   * @param {?NSNotification.Name} aName - Name of the notification to remove from dispatch table. Specify a notification name to remove only entries that specify this notification name. When nil, the receiver does not use notification names as criteria for removal.
   * @param {?Object} anObject - Sender to remove from the dispatch table. Specify a notification sender to remove only entries that specify this sender. When nil, the receiver does not use notification senders as criteria for removal.
   * @returns {void}
   * @desc Be sure to invoke this method (or removeObserver(_:)) before the observer object or any object specified in addObserver(_:selector:name:object:) is deallocated.
   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1407263-removeobserver
   */
  removeObserverNameObject(observer, aName, anObject) {
  }

  // Posting Notifications

  /**
   * Posts a given notification to the receiver.
   * @access public
   * @param {Notification} notification - The notification to post. This value must not be nil.
   * @returns {void}
   * @desc You can create a notification with the NSNotification class method init(name:object:) or notificationWithName:object:userInfo:. An exception is raised if notification is nil.
   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1410472-post
   */
  post(notification) {
  }

  /**
   * Creates a notification with a given name and sender and posts it to the receiver.
   * @access public
   * @param {NSNotification.Name} aName - The name of the notification.
   * @param {?Object} anObject - The object posting the notification.
   * @returns {void}
   * @desc This method invokes post(name:object:userInfo:) with an aUserInfo argument of nil.
   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1415812-post
   */
  postNameObject(aName, anObject) {
  }

  /**
   * Creates a notification with a given name, sender, and information and posts it to the receiver.
   * @access public
   * @param {NSNotification.Name} aName - The name of the notification.
   * @param {?Object} anObject - The object posting the notification.
   * @param {?Map<AnyHashable, Object>} [aUserInfo = null] - Information about the the notification. May be nil.
   * @returns {void}
   * @desc This method is the preferred method for posting notifications.
   * @see https://developer.apple.com/documentation/foundation/notificationcenter/1410608-post
   */
  postNameObjectUserInfo(aName, anObject, aUserInfo = null) {
  }
}

