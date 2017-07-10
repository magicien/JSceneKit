'use strict'

import CGPoint from '../CoreGraphics/CGPoint'
import CGRect from '../CoreGraphics/CGRect'
import _ClassList from '../util/_ClassList'

/*global Buffer*/

/**
 * The root class of most Objective-C class hierarchies, from which subclasses inherit a basic interface to the runtime system and the ability to behave as Objective-C objects.
 * @access public
 * @see https://developer.apple.com/documentation/objectivec/nsobject
 */
export default class NSObject {
  static get _propTypes() {
    return {}
  }

  // Initializing a Class

  /**
   * Initializes the class before it receives its first message.
   * @access public
   * @returns {void}
   * @desc The runtime sends initialize() to each class in a program just before the class, or any class that inherits from it, is sent its first message from within the program. Superclasses receive this message before their subclasses.The runtime sends the initialize() message to classes in a thread-safe manner. That is, initialize() is run by the first thread to send a message to a class, and any other thread that tries to send a message to that class will block until initialize() completes.The superclass implementation may be called multiple times if subclasses do not implement initialize()—the runtime will call the inherited implementation—or if subclasses explicitly call [super initialize]. If you want to protect yourself from being run multiple times, you can structure your implementation along these lines:+ (void)initialize {
  if (self == [ClassName self]) {
    // ... do the initialization ...
  }
}
Because initialize() is called in a blocking manner, it’s important to limit method implementations to the minimum amount of work necessary possible. Specifically, any code that takes locks that might be required by other classes in their initialize() methods is liable to lead to deadlocks. Therefore, you should not rely on initialize() for complex initialization, and should instead limit it to straightforward, class local initialization.Special Considerationsinitialize() is invoked only once per class. If you want to perform independent initialization for the class and for categories of the class, you should implement load() methods.+ (void)initialize {
  if (self == [ClassName self]) {
    // ... do the initialization ...
  }
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418639-initialize
   */
  static initialize() {
  }

  /**
   * Invoked whenever a class or category is added to the Objective-C runtime; implement this method to perform class-specific behavior upon loading.
   * @access public
   * @returns {void}
   * @desc The load() message is sent to classes and categories that are both dynamically loaded and statically linked, but only if the newly loaded class or category implements a method that can respond.The order of initialization is as follows:All initializers in any framework you link to.All +load methods in your image.All C++ static initializers and C/C++ __attribute__(constructor) functions in your image.All initializers in frameworks that link to you.In addition:A class’s +load method is called after all of its superclasses’ +load methods.A category +load method is called after the class’s own +load method.In a custom implementation of load() you can therefore safely message other unrelated classes from the same image, but any load() methods implemented by those classes may not have run yet.ImportantCustom implementations of the load method for Swift classes bridged to Objective-C are not called automatically.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418815-load
   */
  static load() {
  }

  // Creating, Copying, and Deallocating Objects

  /**
   * Implemented by subclasses to initialize a new object (the receiver) immediately after memory for it has been allocated.
   * @access public
   * @constructor
   * @desc An init() message is coupled with an alloc (or allocWithZone:) message in the same line of code:SomeClass *object = [[SomeClass alloc] init];
An object isn’t ready to be used until it has been initialized.The init() method defined in the NSObject class does no initialization; it simply returns self. In terms of nullability, callers can assume that the NSObject implemetation of init() does not return nil.In a custom implementation of this method, you must invoke super’s Initialization then initialize and return the new object. If the new object can’t be initialized, the method should return nil. For example, a hypothetical BuiltInCamera class might return nil from its init method if run on a device that has no camera.- (instancetype)init {
    self = [super init];
    if (self) {
        // Initialize self
    }
    return self;
}
In some cases, a custom implementation of the init() method might return a substitute object. You must therefore always use the object returned by init(), and not the one returned by alloc or allocWithZone:, in subsequent code.SomeClass *object = [[SomeClass alloc] init];
- (instancetype)init {
    self = [super init];
    if (self) {
        // Initialize self
    }
    return self;
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418641-init
   */
  constructor() {

    // Discardable Content Proxy Support

    this._autoContentAccessingProxy = null

    // Archiving

    this._classForArchiver = null
    this._classForCoder = null
    this._classForKeyedArchiver = null

    // Working with Class Descriptions

    this._attributeKeys = null
    this._classDescription = null
    this._toManyRelationshipKeys = null
    this._toOneRelationshipKeys = null

    // Scripting

    /**
     * An NSString-keyed dictionary of the receiver's scriptable properties.
     * @type {?Map<string, Object>}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1417254-scriptingproperties
     */
    this.scriptingProperties = null

    this._classCode = 0

    // Instance Properties

    /**
     * Returns a pointer that identifies information about all of the observers that are registered with the observed object.
     * @type {?Object}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1414009-observationinfo
     */
    this.observationInfo = null

    /**
     * The activation point for the accessibility element, in screen coordinates.
     * @type {CGPoint}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615179-accessibilityactivationpoint
     */
    this.accessibilityActivationPoint = null

    /**
     * An array of custom actions to display along with the built-in actions.
     * @type {?UIAccessibilityCustomAction[]}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615150-accessibilitycustomactions
     */
    this.accessibilityCustomActions = null

    /**
     * 
     * @type {?UIAccessibilityCustomRotor[]}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1649788-accessibilitycustomrotors
     */
    this.accessibilityCustomRotors = null

    /**
     * An array of the accessibility elements in the container. 
     * @type {?Object[]}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615147-accessibilityelements
     */
    this.accessibilityElements = null

    /**
     * A Boolean value indicating whether the accessibility elements contained within this accessibility element are hidden.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615080-accessibilityelementshidden
     */
    this.accessibilityElementsHidden = false

    /**
     * The frame of the accessibility element, in screen coordinates.
     * @type {CGRect}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615111-accessibilityframe
     */
    this.accessibilityFrame = null

    /**
     * 
     * @type {?Object[]}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1627578-accessibilityheaderelements
     */
    this.accessibilityHeaderElements = null

    /**
     * A brief description of the result of performing an action on the accessibility element, in a localized string.
     * @type {?string}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615093-accessibilityhint
     */
    this.accessibilityHint = null

    /**
     * A succinct label that identifies the accessibility element, in a localized string.
     * @type {?string}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615181-accessibilitylabel
     */
    this.accessibilityLabel = null

    /**
     * The language in which to speak the accessibility element's label, value, and hint.
     * @type {?string}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615192-accessibilitylanguage
     */
    this.accessibilityLanguage = null

    /**
     * The navigation style to apply to the object and its elements.
     * @type {UIAccessibilityNavigationStyle}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615200-accessibilitynavigationstyle
     */
    this.accessibilityNavigationStyle = null

    /**
     * The path of the element, in screen coordinates.
     * @type {?UIBezierPath}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615159-accessibilitypath
     */
    this.accessibilityPath = null

    /**
     * The combination of accessibility traits that best characterize the accessibility element. 
     * @type {UIAccessibilityTraits}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615202-accessibilitytraits
     */
    this.accessibilityTraits = null

    /**
     * The value of the accessibility element, in a localized string.
     * @type {?string}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615117-accessibilityvalue
     */
    this.accessibilityValue = null

    /**
     * A Boolean value indicating whether VoiceOver should ignore the elements within views that are siblings of the receiver.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615089-accessibilityviewismodal
     */
    this.accessibilityViewIsModal = false

    /**
     * A Boolean value indicating whether the receiver is an accessibility element that an assistive application can access.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615141-isaccessibilityelement
     */
    this.isAccessibilityElement = false

    /**
     * A Boolean value indicating whether VoiceOver should group together the elements that are children of the receiver, regardless of their positions on the screen.
     * @type {boolean}
     * @see https://developer.apple.com/documentation/objectivec/nsobject/1615143-shouldgroupaccessibilitychildren
     */
    this.shouldGroupAccessibilityChildren = false

    this._hashValue = 0
    this._accessibilityFocusedUIElement = null
    this._accessibilityNotifiesWhenDestroyed = false
    this._exposedBindings = null
    this._objectForWebScript = null
    this._objectSpecifier = null
    this._webFrame = null
    this._webPlugInContainerSelectionColor = null
    this._isSelectable = false

    /**
     * @access private
     * @type {boolean}
     */
    this._destroyed = false
  }

  /**
   * Returns the object returned by copy(with:).
   * @access public
   * @returns {Object} - 
   * @desc This is a convenience method for classes that adopt the NSCopying protocol. An exception is raised if there is no implementation for copy(with:).NSObject does not itself support the NSCopying protocol. Subclasses must support the protocol and implement the copy(with:) method. A subclass version of the copy(with:) method should send the message to super first, to incorporate its implementation, unless the subclass descends directly from NSObject.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418807-copy
   */
  copy() {
    const obj = new this.constructor()
    // TODO: copy variables
    return obj
  }

  /**
   * Returns the object returned by mutableCopy(with:) where the zone is nil.
   * @access public
   * @returns {Object} - 
   * @desc This is a convenience method for classes that adopt the NSMutableCopying protocol. An exception is raised if there is no implementation for mutableCopy(with:).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418978-mutablecopy
   */
  mutableCopy() {
    return null
  }

  // Identifying Classes

  /**
   * Returns the class object for the receiver’s superclass.
   * @access public
   * @returns {?Object} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418803-superclass
   */
  static superclass() {
    return null
  }

  /**
   * Returns a Boolean value that indicates whether the receiving class is a subclass of, or identical to, a given class.
   * @access public
   * @param {Object} aClass - A class object.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418669-issubclass
   */
  static isSubclassOf(aClass) {
    return false
  }

  // Testing Class Functionality

  /**
   * Returns a Boolean value that indicates whether instances of the receiver are capable of responding to a given selector.
   * @access public
   * @param {!function} aSelector - A Selector.
   * @returns {boolean} - 
   * @desc If aSelector messages are forwarded to other objects, instances of the class are able to receive those messages without error even though this method returns false.To ask the class whether it, rather than its instances, can respond to a particular message, send to the class instead the  NSObject protocol instance method responds(to:).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418555-instancesrespond
   */
  static instancesRespondTo(aSelector) {
    return false
  }

  // Testing Protocol Conformance

  /**
   * Returns a Boolean value that indicates whether the receiver conforms to a given protocol.
   * @access public
   * @param {Object} protocol - 
   * @returns {boolean} - 
   * @desc A class is said to “conform to” a protocol if it adopts the protocol or inherits from another class that adopts it. Protocols are adopted by listing them within angle brackets after the interface declaration. For example, here MyClass adopts the (fictitious) AffiliationRequests and Normalization protocols:@interface MyClass : NSObject <AffiliationRequests, Normalization>
A class also conforms to any protocols that are incorporated in the protocols it adopts or inherits. Protocols incorporate other protocols in the same way classes adopt them. For example, here the AffiliationRequests protocol incorporates the Joining protocol:@protocol AffiliationRequests <Joining>
If a class adopts a protocol that incorporates another protocol, it must also implement all the methods in the incorporated protocol or inherit those methods from a class that adopts it.This method determines conformance solely on the basis of the formal declarations in header files, as illustrated above. It doesn’t check to see whether the methods declared in the protocol are actually implemented—that’s the programmer’s responsibility.The protocol required as this method’s argument can be specified using the @protocol() directive:BOOL canJoin = [MyClass conformsToProtocol:@protocol(Joining)];
@interface MyClass : NSObject <AffiliationRequests, Normalization>
@protocol AffiliationRequests <Joining>
BOOL canJoin = [MyClass conformsToProtocol:@protocol(Joining)];

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418893-conforms
   */
  static conformsTo(protocol) {
    return false
  }

  // Obtaining Information About Methods

  /**
   * Locates and returns the address of the receiver’s implementation of a method so it can be called as a function.
   * @access public
   * @param {!function} aSelector - A Selector that identifies the method for which to return the implementation address. The selector must be a valid and non-NULL. If in doubt, use the responds(to:) method to check before passing the selector to method(for:).
   * @returns {!function} - 
   * @desc If the receiver is an instance, aSelector should refer to an instance method; if the receiver is a class, it should refer to a class method.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418863-method
   */
  methodFor(aSelector) {
    return null
  }

  /**
   * Locates and returns the address of the implementation of the instance method identified by a given selector.
   * @access public
   * @param {!function} aSelector - A Selector that identifies the method for which to return the implementation address. The selector must be non-NULL and valid for the receiver. If in doubt, use the responds(to:) method to check before passing the selector to method(for:).
   * @returns {!function} - 
   * @desc An error is generated if instances of the receiver can’t respond to aSelector messages.Use this method to ask the class object for the implementation of instance methods only. To ask the class for the implementation of a class method, send the method(for:) instance method to the class instead.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418713-instancemethod
   */
  static instanceMethodFor(aSelector) {
    return null
  }

  // Describing Objects

  /**
   * Returns a string that represents the contents of the receiving class.
   * @access public
   * @returns {string} - 
   * @desc The debugger’s print-object command invokes this method to produce a textual description of an object.NSObject's implementation of this method simply prints the name of the class.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418799-description
   */
  static description() {
    return ''
  }

  // Discardable Content Proxy Support
  /**
   * A proxy for the receiving object
   * @type {Object}
   * @desc This property returns a proxy for the receiving object if the receiver adopts the NSDiscardableContent protocol and still has content that has not been discarded.The proxy calls beginContentAccess() on the receiver to keep the content available as long as the proxy lives, and calls endContentAccess() when the proxy is deallocated.The wrapper object is otherwise a subclass of NSProxy and forwards messages to the original receiver object as an NSProxy does.This method can be used to hide an NSDiscardableContent object's content volatility by creating an object that responds to the same messages but holds the contents of the original receiver available as long as the created proxy lives. Thus hidden, the NSDiscardableContent object (by way of the proxy) can be given out to unsuspecting recipients of the object who would otherwise not know they might have to call beginContentAccess() and endContentAccess() around particular usages (specific to each NSDiscardableContent object) of the NSDiscardableContent object.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1409224-autocontentaccessingproxy
   */
  get autoContentAccessingProxy() {
    return this._autoContentAccessingProxy
  }

  // Sending Messages

  /**
   * Invokes a method of the receiver on the current thread using the default mode after a delay.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. The method should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {?Object} anArgument - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument. 
   * @param {number} delay - The minimum time before which the message is sent. Specifying a delay of 0 does not necessarily cause the selector to be performed immediately. The selector is still queued on the thread’s run loop and performed as soon as possible.
   * @returns {void}
   * @desc This method sets up a timer to perform the aSelector message on the current thread’s run loop. The timer is configured to run in the default mode (NSDefaultRunLoopMode). When the timer fires, the thread attempts to dequeue the message from the run loop and perform the selector. It succeeds if the run loop is running and in the default mode; otherwise, the timer waits until the run loop is in the default mode. If you want the message to be dequeued when the run loop is in a mode other than the default mode, use the perform(_:with:afterDelay:inModes:) method instead. If you are not sure whether the current thread is the main thread, you can use the performSelector(onMainThread:with:waitUntilDone:) or performSelector(onMainThread:with:waitUntilDone:modes:) method to guarantee that your selector executes on the main thread. To cancel a queued message, use the cancelPreviousPerformRequests(withTarget:) or cancelPreviousPerformRequests(withTarget:selector:object:) method. Special ConsiderationsThis method registers with the runloop of its current context, and depends on that runloop being run on a regular basis to perform correctly. One common context where you might call this method and end up registering with a runloop that is not automatically run on a regular basis is when being invoked by a dispatch queue. If you need this type of functionality when running on a dispatch queue, you should use dispatch_after(_:_:_:) and related methods to get the behavior you want.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416176-perform
   */
  performWithAfterDelay(aSelector, anArgument, delay) {
  }

  /**
   * Invokes a method of the receiver on the current thread using the specified modes after a delay.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. The method should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {?Object} anArgument - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument. 
   * @param {number} delay - The minimum time before which the message is sent. Specifying a delay of 0 does not necessarily cause the selector to be performed immediately. The selector is still queued on the thread’s run loop and performed as soon as possible.
   * @param {RunLoopMode[]} modes - An array of strings that identify the modes to associate with the timer that performs the selector. This array must contain at least one string. If you specify nil or an empty array for this parameter, this method returns without performing the specified selector. For information about run loop modes, see Run Loops in Threading Programming Guide.
   * @returns {void}
   * @desc This method sets up a timer to perform the aSelector message on the current thread’s run loop. The timer is configured to run in the modes specified by the modes parameter. When the timer fires, the thread attempts to dequeue the message from the run loop and perform the selector. It succeeds if the run loop is running and in one of the specified modes; otherwise, the timer waits until the run loop is in one of those modes. If you want the message to be dequeued when the run loop is in a mode other than the default mode, use the perform(_:with:afterDelay:inModes:) method instead. If you are not sure whether the current thread is the main thread, you can use the performSelector(onMainThread:with:waitUntilDone:) or performSelector(onMainThread:with:waitUntilDone:modes:) method to guarantee that your selector executes on the main thread. To cancel a queued message, use the cancelPreviousPerformRequests(withTarget:) or cancelPreviousPerformRequests(withTarget:selector:object:) method. Special ConsiderationsThis method registers with the runloop of its current context, and depends on that runloop being run on a regular basis to perform correctly. One common context where you might call this method and end up registering with a runloop that is not automatically run on a regular basis is when being invoked by a dispatch queue. If you need this type of functionality when running on a dispatch queue, you should use dispatch_after(_:_:_:) and related methods to get the behavior you want.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415652-perform
   */
  performWithAfterDelayInModes(aSelector, anArgument, delay, modes) {
  }

  /**
   * Invokes a method of the receiver on the main thread using the default mode.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. The method should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {?Object} arg - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument.
   * @param {boolean} wait - A Boolean that specifies whether the current thread blocks until after the specified selector is performed on the receiver on the main thread. Specify true to block this thread; otherwise, specify false to have this method return immediately.If the current thread is also the main thread, and you specify true for this parameter, the message is delivered and processed immediately. 
   * @returns {void}
   * @desc You can use this method to deliver messages to the main thread of your application. The main thread encompasses the application’s main run loop, and is where the NSApplication object receives events. The message in this case is a method of the current object that you want to execute on the thread. This method queues the message on the run loop of the main thread using the common run loop modes—that is, the modes associated with the commonModes constant. As part of its normal run loop processing, the main thread dequeues the message (assuming it is running in one of the common run loop modes) and invokes the desired method. Multiple calls to this method from the same thread cause the corresponding selectors to be queued and performed in the same same order in which the calls were made.You cannot cancel messages queued using this method. If you want the option of canceling a message on the current thread, you must use either the perform(_:with:afterDelay:) or perform(_:with:afterDelay:inModes:) method.Special ConsiderationsThis method registers with the runloop of its current context, and depends on that runloop being run on a regular basis to perform correctly. One common context where you might call this method and end up registering with a runloop that is not automatically run on a regular basis is when being invoked by a dispatch queue. If you need this type of functionality when running on a dispatch queue, you should use dispatch_after(_:_:_:) and related methods to get the behavior you want.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1414900-performselector
   */
  performSelectorOnMainThreadWithWaitUntilDone(aSelector, arg, wait) {
  }

  /**
   * Invokes a method of the receiver on the main thread using the specified modes.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. The method should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {?Object} arg - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument.
   * @param {boolean} wait - A Boolean that specifies whether the current thread blocks until after the specified selector is performed on the receiver on the main thread. Specify true to block this thread; otherwise, specify false to have this method return immediately.If the current thread is also the main thread, and you pass true, the message is performed immediately, otherwise the perform is queued to run the next time through the run loop.
   * @param {?string[]} array - An array of strings that identifies the modes in which it is permissible to perform the specified selector. This array must contain at least one string. If you specify nil or an empty array for this parameter, this method returns without performing the specified selector. For information about run loop modes, see Run Loops in Threading Programming Guide.
   * @returns {void}
   * @desc You can use this method to deliver messages to the main thread of your application. The main thread encompasses the application’s mai run loop, and is where the NSApplication object receives events. The message in this case is a method of the current object that you want to execute on the thread. This method queues the message on the run loop of the main thread using the run loop modes specified in the array parameter. As part of its normal run loop processing, the main thread dequeues the message (assuming it is running in one of the specified modes) and invokes the desired method. Multiple calls to this method from the same thread cause the corresponding selectors to be queued and performed in the same same order in which the calls were made, assuming the associated run loop modes for each selector are the same. If you specify different modes for each selector, any selectors whose associated mode does not match the current run loop mode are skipped until the run loop subsequently executes in that mode.You cannot cancel messages queued using this method. If you want the option of canceling a message on the current thread, you must use either the perform(_:with:afterDelay:) or perform(_:with:afterDelay:inModes:) method.Special ConsiderationsThis method registers with the runloop of its current context, and depends on that runloop being run on a regular basis to perform correctly. One common context where you might call this method and end up registering with a runloop that is not automatically run on a regular basis is when being invoked by a dispatch queue. If you need this type of functionality when running on a dispatch queue, you should use dispatch_after(_:_:_:) and related methods to get the behavior you want.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411637-performselector
   */
  performSelectorOnMainThreadWithWaitUntilDoneModes(aSelector, arg, wait, array) {
  }

  /**
   * Invokes a method of the receiver on the specified thread using the default mode.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. The method should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {Thread} thr - 
   * @param {?Object} arg - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument.
   * @param {boolean} wait - A Boolean that specifies whether the current thread blocks until after the specified selector is performed on the receiver on the specified thread. Specify true to block this thread; otherwise, specify false to have this method return immediately.If the current thread and target thread are the same, and you specify true for this parameter, the selector is performed immediately on the current thread. If you specify false, this method queues the message on the thread’s run loop and returns, just like it does for other threads. The current thread must then dequeue and process the message when it has an opportunity to do so.
   * @returns {void}
   * @desc You can use this method to deliver messages to other threads in your application. The message in this case is a method of the current object that you want to execute on the target thread. This method queues the message on the run loop of the target thread using the default run loop modes—that is, the modes associated with the commonModes constant. As part of its normal run loop processing, the target thread dequeues the message (assuming it is running in one of the default run loop modes) and invokes the desired method.You cannot cancel messages queued using this method. If you want the option of canceling a message on the current thread, you must use either the perform(_:with:afterDelay:) or perform(_:with:afterDelay:inModes:) method.Special ConsiderationsThis method registers with the runloop of its current context, and depends on that runloop being run on a regular basis to perform correctly. One common context where you might call this method and end up registering with a runloop that is not automatically run on a regular basis is when being invoked by a dispatch queue. If you need this type of functionality when running on a dispatch queue, you should use dispatch_after(_:_:_:) and related methods to get the behavior you want.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1414476-perform
   */
  performOnWithWaitUntilDone(aSelector, thr, arg, wait) {
  }

  /**
   * Invokes a method of the receiver on the specified thread using the specified modes.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. It should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {Thread} thr - 
   * @param {?Object} arg - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument.
   * @param {boolean} wait - A Boolean that specifies whether the current thread blocks until after the specified selector is performed on the receiver on the specified thread. Specify true to block this thread; otherwise, specify false to have this method return immediately. If the current thread and target thread are the same, and you specify true for this parameter, the selector is performed immediately. If you specify false, this method queues the message and returns immediately, regardless of whether the threads are the same or different.
   * @param {?string[]} array - An array of strings that identifies the modes in which it is permissible to perform the specified selector. This array must contain at least one string. If you specify nil or an empty array for this parameter, this method returns without performing the specified selector. For information about run loop modes, see Run Loops in Threading Programming Guide.
   * @returns {void}
   * @desc You can use this method to deliver messages to other threads in your application. The message in this case is a method of the current object that you want to execute on the target thread. This method queues the message on the run loop of the target thread using the run loop modes specified in the array parameter. As part of its normal run loop processing, the target thread dequeues the message (assuming it is running in one of the specified modes) and invokes the desired method. You cannot cancel messages queued using this method. If you want the option of canceling a message on the current thread, you must use either the perform(_:with:afterDelay:) or perform(_:with:afterDelay:inModes:) method instead. Special ConsiderationsThis method registers with the runloop of its current context, and depends on that runloop being run on a regular basis to perform correctly. One common context where you might call this method and end up registering with a runloop that is not automatically run on a regular basis is when being invoked by a dispatch queue. If you need this type of functionality when running on a dispatch queue, you should use dispatch_after(_:_:_:) and related methods to get the behavior you want.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1417922-perform
   */
  performOnWithWaitUntilDoneModes(aSelector, thr, arg, wait, array) {
  }

  /**
   * Invokes a method of the receiver on a new background thread.
   * @access public
   * @param {function} aSelector - A Selector that identifies the method to invoke. The method should not have a significant return value and should take a single argument of type id, or no arguments.
   * @param {?Object} arg - The argument to pass to the method when it is invoked. Pass nil if the method does not take an argument.
   * @returns {void}
   * @desc This method creates a new thread in your application, putting your application into multithreaded mode if it was not already. The method represented by aSelector must set up the thread environment just as you would for any other new thread in your program. For more information about how to configure and run threads, see Threading Programming Guide. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1412390-performselector
   */
  performSelectorInBackgroundWith(aSelector, arg) {
  }

  /**
   * Cancels perform requests previously registered with the perform(_:with:afterDelay:) instance method.
   * @access public
   * @param {Object} aTarget - The target for requests previously registered with the perform(_:with:afterDelay:) instance method.
   * @returns {void}
   * @desc All perform requests having the same target aTarget are canceled. This method removes perform requests only in the current run loop, not all run loops.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1417611-cancelpreviousperformrequests
   */
  static cancelPreviousPerformRequestsWithTarget(aTarget) {
  }

  /**
   * Cancels perform requests previously registered with perform(_:with:afterDelay:).
   * @access public
   * @param {Object} aTarget - The target for requests previously registered with the perform(_:with:afterDelay:) instance method
   * @param {function} aSelector - The Selector for requests previously registered with the perform(_:with:afterDelay:) instance method.
   * @param {?Object} anArgument - The argument for requests previously registered with the perform(_:with:afterDelay:) instance method. Argument equality is determined using isEqual(_:), so the value need not be the same object that was passed originally. Pass nil to match a request for nil that was originally passed as the argument.
   * @returns {void}
   * @desc All perform requests are canceled that have the same target as aTarget, argument as anArgument, and selector as aSelector. This method removes perform requests only in the current run loop, not all run loops.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1410849-cancelpreviousperformrequests
   */
  static cancelPreviousPerformRequestsWithTargetSelectorObject(aTarget, aSelector, anArgument) {
  }

  // Forwarding Messages

  /**
   * Returns the object to which unrecognized messages should first be directed.
   * @access public
   * @param {!function} aSelector - A Selector for a method that the receiver does not implement.
   * @returns {?Object} - 
   * @desc If an object implements (or inherits) this method, and returns a non-nil (and non-self) result, that returned object is used as the new receiver object and the message dispatch resumes to that new object. (Obviously if you return self from this method, the code would just fall into an infinite loop.)If you implement this method in a non-root class, if your class has nothing to return for the given selector then you should return the result of invoking super’s implementation. This method gives an object a chance to redirect an unknown message sent to it before the much more expensive forwardInvocation: machinery takes over. This is useful when you simply want to redirect messages to another object and can be an order of magnitude faster than regular forwarding. It is not useful where the goal of the forwarding is to capture the NSInvocation, or manipulate the arguments or return value during the forwarding.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418855-forwardingtarget
   */
  forwardingTargetFor(aSelector) {
    return null
  }

  // Dynamically Resolving Methods

  /**
   * Dynamically provides an implementation for a given selector for a class method.
   * @access public
   * @param {!function} sel - 
   * @returns {boolean} - 
   * @desc This method allows you to dynamically provide an implementation for a given selector. See resolveInstanceMethod(_:) for further discussion.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418889-resolveclassmethod
   */
  static resolveClassMethod(sel) {
    return false
  }

  /**
   * Dynamically provides an implementation for a given selector for an instance method.
   * @access public
   * @param {!function} sel - 
   * @returns {boolean} - 
   * @desc This method and resolveClassMethod(_:) allow you to dynamically provide an implementation for a given selector.An Objective-C method is simply a C function that take at least two arguments—self and _cmd. Using the class_addMethod(_:_:_:_:) function, you can add a function to a class as a method. Given the following function:void dynamicMethodIMP(id self, SEL _cmd)
{
    // implementation ....
}
you can use resolveInstanceMethod: to dynamically add it to a class as a method (called resolveThisMethodDynamically) like this:+ (BOOL) resolveInstanceMethod:(SEL)aSEL
{
    if (aSEL == @selector(resolveThisMethodDynamically))
    {
          class_addMethod([self class], aSEL, (IMP) dynamicMethodIMP, "v@:");
          return YES;
    }
    return [super resolveInstanceMethod:aSel];
}
Special ConsiderationsThis method is called before the Objective-C forwarding mechanism is invoked. If responds(to:) or instancesRespond(to:) is invoked, the dynamic method resolver is given the opportunity to provide an IMP for the given selector first.void dynamicMethodIMP(id self, SEL _cmd)
{
    // implementation ....
}
+ (BOOL) resolveInstanceMethod:(SEL)aSEL
{
    if (aSEL == @selector(resolveThisMethodDynamically))
    {
          class_addMethod([self class], aSEL, (IMP) dynamicMethodIMP, "v@:");
          return YES;
    }
    return [super resolveInstanceMethod:aSel];
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418500-resolveinstancemethod
   */
  static resolveInstanceMethod(sel) {
    return false
  }

  // Error Handling

  /**
   * Handles messages the receiver doesn’t recognize.
   * @access public
   * @param {!function} aSelector - A Selector that identifies a method not implemented or recognized by the receiver.
   * @returns {void}
   * @desc The runtime system invokes this method whenever an object receives an aSelector message it can’t respond to or forward. This method, in turn, raises an NSInvalidArgumentException, and generates an error message. Any doesNotRecognizeSelector(_:) messages are generally sent only by the runtime system. However, they can be used in program code to prevent a method from being inherited. For example, an NSObject subclass might renounce the copy() or init() method by re-implementing it to include a doesNotRecognizeSelector(_:) message as follows:- (id)copy
{
    [self doesNotRecognizeSelector:_cmd];
}
The _cmd variable is a hidden argument passed to every method that is the current selector; in this example, it identifies the selector for the copy method. This code prevents instances of the subclass from responding to copy messages or superclasses from forwarding copy messages—although responds(to:) will still report that the receiver has access to a copy method.If you override this method, you must call super or raise an invalidArgumentException exception at the end of your implementation. In other words, this method must not return normally; it must always result in an exception being thrown. - (id)copy
{
    [self doesNotRecognizeSelector:_cmd];
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418637-doesnotrecognizeselector
   */
  doesNotRecognizeSelector(aSelector) {
  }

  // Archiving

  /**
   * Overridden by subclasses to substitute another object in place of the object that was decoded and subsequently received this message.
   * @access public
   * @param {NSCoder} aDecoder - The decoder used to decode the receiver.
   * @returns {?Object} - 
   * @desc You can use this method to eliminate redundant objects created by the coder. For example, if after decoding an object you discover that an equivalent object already exists, you can return the existing object. If a replacement is returned, your overriding method is responsible for releasing the receiver. This method is invoked by NSCoder. NSObject’s implementation simply returns self.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1417074-awakeafter
   */
  awakeAfterUsing(aDecoder) {
    return null
  }

  /**
   * Overridden to return the names of classes that can be used to decode objects if their class is unavailable.
   * @access public
   * @returns {string[]} - 
   * @desc NSKeyedArchiver calls this method and stores the result inside the archive. If the actual class of an object doesn’t exist at the time of unarchiving, NSKeyedUnarchiver goes through the stored list of classes and uses the first one that does exists as a substitute class for decoding the object. The default implementation of this method returns nil.You can use this method if you introduce a new class into your application to provide some backwards compatibility in case the archive will be read on a system that does not have that class. Sometimes there may be another class which may work nearly as well as a substitute for the new class, and the archive keys and archived state for the new class can be carefully chosen (or compatibility written out) so that the object can be unarchived as the substitute class if necessary.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411048-classfallbacksforkeyedarchiver
   */
  static classFallbacksForKeyedArchiver() {
    return null
  }

  /**
   * Overridden by subclasses to substitute a new class during keyed unarchiving.
   * @access public
   * @returns {Object} - 
   * @desc During keyed unarchiving, instances of the receiver will be decoded as members of the returned class. This method overrides the results of the decoder’s class and instance name to class encoding tables.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1410547-classforkeyedunarchiver
   */
  static classForKeyedUnarchiver() {
    return null
  }

  /**
   * Overridden by subclasses to substitute another object for itself during encoding.
   * @access public
   * @param {NSCoder} aCoder - The coder encoding the receiver.
   * @returns {?Object} - 
   * @desc An object might encode itself into an archive, but encode a proxy for itself if it’s being encoded for distribution. This method is invoked by NSCoder. NSObject’s implementation returns self.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416843-replacementobject
   */
  replacementObjectFor(aCoder) {
    return null
  }

  /**
   * Sets the receiver's version number.
   * @access public
   * @param {number} aVersion - The version number for the receiver.
   * @returns {void}
   * @desc The version number is helpful when instances of the class are to be archived and reused later. The default version is 0.Special ConsiderationsThe version number applies to NSArchiver/NSUnarchiver, but not to NSKeyedArchiver/NSKeyedUnarchiver.  A keyed archiver does not encode class version numbers.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416538-setversion
   */
  static setVersion(aVersion) {
  }

  /**
   * Returns the version number assigned to the class.
   * @access public
   * @returns {number} - 
   * @desc If no version has been set, the default is 0. Version numbers are needed for decoding or unarchiving, so older versions of an object can be detected and decoded correctly.Caution should be taken when obtaining the version from within an NSCoding protocol or other methods. Use the class name explicitly when getting a class version number:version = [MyClass version];
Don’t simply send version to the return value of class—a subclass version number may be returned instead.Special ConsiderationsThe version number applies to NSArchiver/NSUnarchiver, but not to NSKeyedArchiver/NSKeyedUnarchiver.  A keyed archiver does not encode class version numbers.version = [MyClass version];

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415151-version
   */
  static version() {
    return 0
  }
  /**
   * The class to substitute for the receiver's own class during archiving.
   * @type {?Object}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411359-classforarchiver
   */
  get classForArchiver() {
    return this._classForArchiver
  }
  /**
   * Overridden by subclasses to substitute a class other than its own during coding.
   * @type {Object}
   * @desc This method is invoked by NSCoder. NSObject’s implementation returns the receiver’s class. The private subclasses of a class cluster substitute the name of their public superclass when being archived.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411876-classforcoder
   */
  get classForCoder() {
    return this._classForCoder
  }
  /**
   * Subclasses to substitute a new class for instances during keyed archiving.
   * @type {?Object}
   * @desc The object will be encoded as if it were a member of the class. This property is overridden by the encoder class and instance name to class encoding tables. If this property is nil, the result of this property is ignored.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1410512-classforkeyedarchiver
   */
  get classForKeyedArchiver() {
    return this._classForKeyedArchiver
  }

  // Working with Class Descriptions

  /**
   * For a given key that defines the name of the relationship from the receiver’s class to another class, returns the name of the relationship from the other class to the receiver’s class.
   * @access public
   * @param {string} relationshipKey - The name of the relationship from the receiver’s class to another class.
   * @returns {?string} - 
   * @desc NSObject’s implementation of inverseForRelationshipKey: simply invokes [[self classDescription] inverseForRelationshipKey:relationshipKey].  To make use of the default implementation, you must therefore implement and register a suitable class description—see NSClassDescription.For example, suppose an Employee class has a relationship named department to a Department class, and that Department has a relationship called employees to Employee. The statement:employee inverseForRelationshipKey:@"department"];
returns the string employees.employee inverseForRelationshipKey:@"department"];

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411046-inverse
   */
  inverseForRelationshipKey(relationshipKey) {
    return null
  }
  /**
   * An array of NSString objects containing the names of immutable values that instances of the receiver's class contain.
   * @type {string[]}
   * @desc NSObject’s implementation of attributeKeys simply calls [[self classDescription] attributeKeys]. To make use of the default implementation, you must therefore implement and register a suitable class description—see NSClassDescription. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415656-attributekeys
   */
  get attributeKeys() {
    return this._attributeKeys
  }
  /**
   * An object containing information about the attributes and relationships of the receiver’s class.
   * @type {NSClassDescription}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411858-classdescription
   */
  get classDescription() {
    return this._classDescription
  }
  /**
   * An array containing the keys for the to-many relationship properties of the receiver.
   * @type {string[]}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415662-tomanyrelationshipkeys
   */
  get toManyRelationshipKeys() {
    return this._toManyRelationshipKeys
  }
  /**
   * The keys for the to-one relationship properties of the receiver, if any.
   * @type {string[]}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1414814-toonerelationshipkeys
   */
  get toOneRelationshipKeys() {
    return this._toOneRelationshipKeys
  }

  // Scripting

  /**
   * Creates and returns one or more scripting objects to be inserted into the specified relationship by copying the passed-in value and setting the properties in the copied object or objects.
   * @access public
   * @param {Object} value - An object or objects to be copied. The type must match the type of the property identified by key. (See also the Discussion section.)For example, if the property is a to-many relationship, value will always be an array of objects to be copied, and this method must therefore return an array of objects.
   * @param {string} key - A key that identifies the relationship into which to insert the copied object or objects.
   * @param {Map<string, Object>} properties - The properties to be set in the copied object or objects.  Derived from the "with properties" parameter of a duplicate command. (See also the Discussion section.)
   * @returns {?Object} - 
   * @desc You can override the copyScriptingValue method to take more control when your application is sent a duplicate command. This method is invoked on the prospective container of the copied object or objects. The properties are derived from the with properties parameter of the duplicate command. The returned objects or objects are then inserted into the container using key-value coding. When this method is invoked by Cocoa, neither the value nor the properties will have yet been coerced using the NSScriptKeyValueCoding method coerceValue(_:forKey:). For sdef-declared scriptability, however, the types of the passed-in objects reliably match the relevant sdef declarations.The default implementation of this method copies scripting objects by sending copyWithZone: to the object or objects specified by value. You override this method for situations where this is not sufficient, such as in Core Data applications, in which new objects must be initialized with [NSManagedObject initWithEntity:insertIntoManagedObjectContext:].
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1410291-copyscriptingvalue
   */
  copyScriptingValueForKeyWithProperties(value, key, properties) {
    return null
  }

  /**
   * Creates and returns an instance of a scriptable class, setting its contents and properties, for insertion into the relationship identified by the key.
   * @access public
   * @param {Object} objectClass - 
   * @param {string} key - A key that identifies the relationship into which the new class object will be inserted.
   * @param {?Object} contentsValue - Specifies the contents of the object to be created. This may be nil. (See also the Discussion section.)
   * @param {Map<string, Object>} properties - The properties to be set in the new object. (See also the Discussion section.)
   * @returns {?Object} - 
   * @desc You can override the newScriptingObjectOfClass method to take more control when your application is sent a make command. This method is invoked on the prospective container of the new object. The contentsValue and properties are derived from the with contents and with properties parameters of the make command. The returned objects or objects are then inserted into the container using key-value coding.When this method is invoked by Cocoa, neither the contents value nor the properties will have yet been coerced using the NSScriptKeyValueCoding method coerceValue(_:forKey:). For sdef-declared scriptability, however, the types of the passed-in objects reliably match the relevant sdef declarations.The default implementation of this method creates new scripting objects by sending alloc to a class and init to the resulting object. You override this method for situations where this is not sufficient, such as in Core Data applications, in which new objects must be initialized with [NSManagedObject initWithEntity:insertIntoManagedObjectContext:].
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418458-newscriptingobject
   */
  newScriptingObjectOfForValueForKeyWithContentsValue(objectClass, key, contentsValue, properties) {
    return null
  }

  /**
   * Given an object specifier, returns the specified object or objects in the receiving container.
   * @access public
   * @param {NSScriptObjectSpecifier} objectSpecifier - An object specifier to be evaluated.
   * @returns {?Object} - 
   * @desc You can override this method to customize the evaluation of object specifiers without requiring that the scripting container make up indexes for contained objects that don't naturally have indexes (as can be the case if you implement indicesOfObjects(byEvaluatingObjectSpecifier:) instead).Your override of this method doesn't need to also invoke any of the NSScriptCommand error signaling methods, though it can, to record very specific information. The NSUnknownKeySpecifierError and NSInvalidIndexSpecifierError numbers are special, in that Cocoa may continue evaluating an outer specifier if they're encountered, for the convenience of scripters.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1409268-scriptingvalue
   */
  scriptingValueFor(objectSpecifier) {
    return null
  }
  /**
   * The receiver's Apple event type code, as stored in the NSScriptClassDescription object for the object’s class.
   * @type {number}
   * @desc This property is used by Cocoa’s scripting support classes.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1413991-classcode
   */
  get classCode() {
    return this._classCode
  }

  /**
   * A string containing the name of the class.
   * @type {string}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411337-classname
   */
  get className() {
    return this.constructor.name
  }

  /**
   * A string containing the name of the class.
   * @type {string}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411337-classname
   */
  static get className() {
    return this.prototype.constructor.name
  }

  // Deprecated Methods

  /**
   * The garbage collector invokes this method on the receiver before disposing of the memory it uses.
   * @deprecated
   * @access public
   * @returns {void}
   * @desc The garbage collector invokes this method on the receiver before disposing of the memory it uses. When garbage collection is enabled, this method is invoked instead of dealloc.You can override this method to relinquish resources the receiver has obtained, as shown in the following example:- (void)finalize {
    if (log_file != NULL) {
        fclose(log_file);
        log_file = NULL;
    }
    [super finalize];
}
Typically, however, you are encouraged to relinquish resources prior to finalization if at all possible. For more details, see Implementing a finalize Method.Special ConsiderationsIt is an error to store self into a new or existing live object (colloquially known as “resurrection”), which implies that this method will be called only once. However, the receiver may be messaged after finalization by other objects also being finalized at this time, so your override should guard against future use of resources that have been reclaimed, as shown by the log_file = NULL statement in the example. The finalize method itself will never be invoked more than once for a given object.Importantfinalize methods must be thread-safe.- (void)finalize {
    if (log_file != NULL) {
        fclose(log_file);
        log_file = NULL;
    }
    [super finalize];
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418513-finalize
   */
  finalize() {
  }

  // Instance Properties
  /**
   * 
   * @type {number}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418615-hashvalue
   */
  get hashValue() {
    return this._hashValue
  }
  /**
   * The deepest descendant of the accessibility hierarchy that has the focus.
   * @type {?Object}
   * @desc You can assume that the search for the focus has already been narrowed down to the accessibility element. Override this method to do deeper searching by identifying which child element, if any, may have the focus. If a child element does not have the focus, either return self or, if available, invoke the superclass's implementation. The default NSView and NSCell implementations test whether the accessibility element is an ignored element and, if so, return the element’s first unignored parent; otherwise they return self
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1526100-accessibilityfocuseduielement
   */
  get accessibilityFocusedUIElement() {
    return this._accessibilityFocusedUIElement
  }
  /**
   * A Boolean value that indicates whether a custom accessibility object sends a notification when its corresponding UI element is destroyed.
   * @type {boolean}
   * @desc In macOS 10.9 and later, a custom accessibility object that is an NSObject subclass can post accessibility notifications if it meets the following criteria:The lifetime of the custom accessibility object must match the lifetime of the corresponding element in the app's UI.Typically, a custom accessibility object that acts as a proxy for an onscreen UI element gets autoreleased and deallocated immediately after the app responds to an accessibility request. Such an object can’t post accessibility notifications, because all registered observers get removed as soon as the object is deallocated. To correct this, an app must guarantee that a custom accessibility object remains allocated for as long as its corresponding UI element remains visible.The object must post the NSAccessibilityUIElementDestroyedNotification  notification at the appropriate time. The appropriate time is most likely to be when the corresponding UI element is removed from the screen, but it can also be when the object itself is deallocated. The object must implement accessibilityNotifiesWhenDestroyed and return true.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1534050-accessibilitynotifieswhendestroy
   */
  get accessibilityNotifiesWhenDestroyed() {
    return this._accessibilityNotifiesWhenDestroyed
  }
  /**
   * Returns an array containing the bindings exposed by the receiver.
   * @type {string[]}
   * @desc A subclass can override this method to remove bindings that are exposed by a superclass that are not appropriate for the subclass.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458048-exposedbindings
   */
  get exposedBindings() {
    return this._exposedBindings
  }
  /**
   * Returns an object that exposes the plug-in’s scripting interface.
   * @type {!Object}
   * @desc The methods of the object are exposed to the script environment. Messages sent to the returned object will be invoked in the scripting environment. See the WebScripting Protocol Reference informal protocol for more details.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1537612-objectforwebscript
   */
  get objectForWebScript() {
    return this._objectForWebScript
  }
  /**
   * Returns an object specifier for the receiver.
   * @type {?NSScriptObjectSpecifier}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1409884-objectspecifier
   */
  get objectSpecifier() {
    return this._objectSpecifier
  }
  /**
   * Returns the WebFrame that contains the plug-in.
   * @type {!WebFrame}
   * @desc Only implemented by containers that are based on the WebKit’s plug-in architecture.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1537727-webframe
   */
  get webFrame() {
    return this._webFrame
  }
  /**
   * Returns the plug-in selection color.
   * @type {!CGColor}
   * @desc The color should be used for any special drawing when the plug-in is selected.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536394-webplugincontainerselectioncolor
   */
  get webPlugInContainerSelectionColor() {
    return this._webPlugInContainerSelectionColor
  }
  /**
   * Returns a Boolean value that indicates whether the key-value coding methods should access the corresponding instance variable directly on finding no accessor method for a property.
   * @type {boolean}
   * @desc The default returns true. Subclasses can override it to return false, in which case the key-value coding methods won’t access instance variables.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415307-accessinstancevariablesdirectly
   */
  static get accessInstanceVariablesDirectly() {
    return true
  }
  /**
   * 
   * @type {boolean}
   * @desc 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/2369549-isselectable
   */
  get isSelectable() {
    return this._isSelectable
  }

  // Instance Methods

  /**
   * Registers the observer object to receive KVO notifications for the key path relative to the object receiving this message.
   * @access public
   * @param {NSObject} observer - The object to register for KVO notifications. The observer must implement the key-value observing method observeValue(forKeyPath:of:change:context:).
   * @param {string} keyPath - The key path, relative to the object receiving this message, of the property to observe. This value must not be nil.
   * @param {NSKeyValueObservingOptions} [options = []] - A combination of the NSKeyValueObservingOptions values that specifies what is included in observation notifications. For possible values, see NSKeyValueObservingOptions.
   * @param {?Object} context - Arbitrary data that is passed to observer in observeValue(forKeyPath:of:change:context:).
   * @returns {void}
   * @desc Neither the object receiving this message, nor observer, are retained. An object that calls this method must also eventually call either the removeObserver(_:forKeyPath:) or removeObserver(_:forKeyPath:context:) method to unregister the observer when participating in KVO.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1412787-addobserver
   */
  addObserverForKeyPath(observer, keyPath, options = [], context) {
  }

  /**
   * Implemented to attempt a recovery from an error noted in an application-modal dialog.
   * @access public
   * @param {Error} error - An NSError object that describes the error, including error recovery options.
   * @param {number} recoveryOptionIndex - The index of the user selected recovery option in error's localized recovery array.
   * @returns {boolean} - 
   * @desc Invoked when an error alert is been presented to the user in an application-modal dialog, and the user has selected an error recovery option specified by error.  
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416402-attemptrecovery
   */
  attemptRecoveryFromErrorOptionIndex(error, recoveryOptionIndex) {
    return false
  }

  /**
   * Returns a dictionary containing the property values identified by each of the keys in a given array.
   * @access public
   * @param {string[]} keys - An array containing NSString objects that identify properties of the receiver.
   * @returns {Map<string, Object>} - 
   * @desc The default implementation invokes value(forKey:) for each key in keys and substitutes NSNull values in the dictionary for returned nil values.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411319-dictionarywithvalues
   */
  dictionaryWithValuesForKeys(keys) {
    return null
  }

  /**
   * Informs the observed object that the specified change has occurred on the indexes for a specified ordered to-many relationship.
   * @access public
   * @param {NSKeyValueChange} changeKind - 
   * @param {Set} indexes - The indexes of the to-many relationship that were affected by the change.
   * @param {string} key - The name of a property that is an ordered to-many relationship.
   * @returns {void}
   * @desc Use this method when implementing key-value-observing compliance manually.Special ConsiderationsYou rarely need to override this method in subclasses, but if you do, be sure to call super. Calls to this method are always paired with a matching call to willChange(_:valuesAt:forKey:).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415349-didchange
   */
  didChangeValuesAtForKey(changeKind, indexes, key) {
  }

  /**
   * Informs the observed object that the value of a given property has changed.
   * @access public
   * @param {string} key - The name of the property that changed.
   * @returns {void}
   * @desc Use this method when implementing key-value observer compliance manually to inform the observed object that the value at key has just changed. Calls to this method are always paired with a matching call to willChangeValue(forKey:).Special ConsiderationsYou rarely need to override this method in subclasses, but if you do, be sure to call super.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411809-didchangevalue
   */
  didChangeValueForKey(key) {
  }

  /**
   * Informs the observed object that the specified change was made to a specified unordered to-many relationship.
   * @access public
   * @param {string} key - The name of a property that is an unordered to-many relationship
   * @param {NSKeyValueSetMutationKind} mutationKind - The type of change that was made.
   * @param {Set<AnyHashable>} objects - The objects that were involved in the change (see NSKeyValueSetMutationKind).
   * @returns {void}
   * @desc Use this method when implementing key-value observer compliance manually. Calls to this method are always paired with a matching call to willChangeValue(forKey:withSetMutation:using:).Special ConsiderationsYou rarely need to override this method in subclasses, but if you do, be sure to call super.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1410539-didchangevalue
   */
  didChangeValueForKeyWithSetMutationUsing(key, mutationKind, objects) {
  }

  /**
   * An NSFileManager object sends this message to its handler for each error it encounters when copying, moving, removing, or linking files or directories. 
   * @deprecated
   * @access public
   * @param {FileManager} fm - 
   * @param {Map<AnyHashable, Object>} errorInfo - A dictionary that contains two or three pieces of information (all NSString objects) related to the error:KeyValue@"Path"The path related to the error (usually the source path)@"Error"A description of the error@"ToPath" The destination path (not all errors)
   * @returns {boolean} - 
   * @desc An NSFileManager object, manager, sends this message for each error it encounters when copying, moving, removing, or linking files or directories. The return value is passed back to the invoker of copyPath:toPath:handler:, movePath:toPath:handler:, removeFileAtPath:handler:, or linkPath:toPath:handler:. If an error occurs and your handler has not implemented this method, the invoking method automatically returns false.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1557005-filemanager
   */
  fileManagerShouldProceedAfterError(fm, errorInfo) {
    return false
  }

  /**
   * An NSFileManager object sends this message to a handler immediately before attempting to move, copy, rename, or delete, or before attempting to link to a given path.
   * @deprecated
   * @access public
   * @param {FileManager} fm - 
   * @param {string} path - The path or a file or directory that manager is about to attempt to move, copy, rename, delete, or link to.
   * @returns {void}
   * @desc You can implement this method in your handler to monitor file operations.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1557002-filemanager
   */
  fileManagerWillProcessPath(fm, path) {
  }

  /**
   * Returns a mutable array proxy that provides read-write access to an ordered to-many relationship specified by a given key.
   * @access public
   * @param {string} key - The name of an ordered to-many relationship.
   * @returns {Array} - 
   * @desc Objects added to the mutable array become related to the receiver, and objects removed from the mutable array become unrelated. The default implementation recognizes the same simple accessor methods and array accessor methods as value(forKey:), and follows the same direct instance variable access policies, but always returns a mutable collection proxy object instead of the immutable collection that value(forKey:) would return. The search pattern that mutableArrayValueForKey: uses is described in Accessor Search Patterns in Key-Value Coding Programming Guide.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416339-mutablearrayvalue
   */
  mutableArrayValueForKey(key) {
    return null
  }

  /**
   * Returns a mutable array that provides read-write access to the ordered to-many relationship specified by a given key path.
   * @access public
   * @param {string} keyPath - A key path, relative to the receiver, to an ordered to-many relationship.
   * @returns {Array} - 
   * @desc See mutableArrayValue(forKey:) for additional details.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1414937-mutablearrayvalue
   */
  mutableArrayValueForKeyPath(keyPath) {
    return null
  }

  /**
   * Returns a mutable ordered set that provides read-write access to the uniquing ordered to-many relationship specified by a given key.
   * @access public
   * @param {string} key - The name of a uniquing ordered to-many relationship.
   * @returns {Set} - 
   * @desc Objects added to the mutable set proxy become related to the receiver, and objects removed from the mutable set become unrelated. The default implementation recognizes the same simple accessor methods and set accessor methods as value(forKey:), and follows the same direct instance variable access policies, but always returns a mutable collection proxy object instead of the immutable collection that value(forKey:) would return. The search pattern that mutableOrderedSetValueForKey: uses is described in Accessor Search Patterns in Key-Value Coding Programming Guide.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415479-mutableorderedsetvalue
   */
  mutableOrderedSetValueForKey(key) {
    return null
  }

  /**
   * Returns a mutable ordered set that provides read-write access to the uniquing ordered to-many relationship specified by a given key path.
   * @access public
   * @param {string} keyPath - A key path, relative to the receiver, to a uniquing ordered to-many relationship represented by a set.
   * @returns {Set} - 
   * @desc See mutableOrderedSetValue(forKey:) for additional details.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1407188-mutableorderedsetvalue
   */
  mutableOrderedSetValueForKeyPath(keyPath) {
    return null
  }

  /**
   * Returns a mutable set proxy that provides read-write access to the unordered to-many relationship specified by a given key.
   * @access public
   * @param {string} key - The name of an unordered to-many relationship.
   * @returns {Set} - 
   * @desc Objects added to the mutable set proxy become related to the receiver, and objects removed from the mutable set become unrelated. The default implementation recognizes the same simple accessor methods and set accessor methods as value(forKey:), and follows the same direct instance variable access policies, but always returns a mutable collection proxy object instead of the immutable collection that value(forKey:) would return. The search pattern that mutableSetValueForKey: uses is described in Accessor Search Patterns in Key-Value Coding Programming Guide.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415105-mutablesetvalue
   */
  mutableSetValueForKey(key) {
    return null
  }

  /**
   * Returns a mutable set that provides read-write access to the unordered to-many relationship specified by a given key path.
   * @access public
   * @param {string} keyPath - A key path, relative to the receiver, to an unordered to-many relationship.
   * @returns {Set} - 
   * @desc See mutableSetValue(forKey:) for additional details.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1408115-mutablesetvalue
   */
  mutableSetValueForKeyPath(keyPath) {
    return null
  }

  /**
   * Informs the observing object when the value at the specified key path relative to the observed object has changed.
   * @access public
   * @param {?string} keyPath - The key path, relative to object, to the value that has changed.
   * @param {?Object} object - The source object of the key path keyPath. 
   * @param {?Map<NSKeyValueChangeKey, Object>} change - A dictionary that describes the changes that have been made to the value of the property at the key path keyPath relative to object. Entries are described in Change Dictionary Keys.
   * @param {?Object} context - The value that was provided when the observer was registered to receive key-value observation notifications.
   * @returns {void}
   * @desc For an object to begin sending change notification messages for the value at keyPath, you send it an addObserver(_:forKeyPath:options:context:) message, naming the observing object that should receive the messages. When you are done observing, and in particular before the observing object is deallocated, you send the observed object a removeObserver(_:forKeyPath:) or removeObserver(_:forKeyPath:context:) message to unregister the observer, and stop sending change notification messages.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416553-observevalue
   */
  observeValueForKeyPathOf(keyPath, object, change, context) {
  }

  /**
   * Stops the observer object from receiving change notifications for the property specified by the key path relative to the object receiving this message.
   * @access public
   * @param {NSObject} observer - The object to remove as an observer.
   * @param {string} keyPath - A key-path, relative to the object receiving this message, for which observer is registered to receive KVO change notifications.
   * @returns {void}
   * @desc It is an error to call removeObserver(_:forKeyPath:) for an object that has not previously been registered as an observer.Be sure to invoke this method (or removeObserver(_:forKeyPath:context:)) before any object specified in addObserver(_:forKeyPath:options:context:) is deallocated.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1408054-removeobserver
   */
  removeObserverForKeyPath(observer, keyPath) {
  }

  /**
   * Invoked by setValue(_:forKey:) when it’s given a nil value for a scalar value (such as an int or float).
   * @access public
   * @param {string} key - The name of one of the receiver's properties.
   * @returns {void}
   * @desc Subclasses can override this method to handle the request in some other way, such as by substituting 0 or a sentinel value for nil and invoking setValue(_:forKey:) again or setting the variable directly. The default implementation raises an NSInvalidArgumentException. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415174-setnilvalueforkey
   */
  setNilValueForKey(key) {
  }

  /**
   * Sets the property of the receiver specified by a given key to a given value.
   * @access public
   * @param {?Object} value - The value for the property identified by key.
   * @param {string} key - The name of one of the receiver's properties.
   * @returns {void}
   * @desc If key identifies a to-one relationship, relate the object specified by value to the receiver, unrelating the previously related object if there was one. Given a collection object and a key that identifies a to-many relationship, relate the objects contained in the collection to the receiver, unrelating previously related objects if there were any.  The search pattern that setValue:forKey: uses is described in Accessor Search Patterns in Key-Value Coding Programming Guide.In a reference-counted environment, if the instance variable is accessed directly, value is retained.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1415969-setvalue
   */
  setValueForKey(value, key) {
    if(typeof this[key] === 'undefined'){
      this.setValueForUndefinedKey(value, key)
    }else{
      this[key] = value
    }
  }

  /**
   * Sets the value for the property identified by a given key path to a given value.
   * @access public
   * @param {?Object} value - The value for the property identified by keyPath.
   * @param {string} keyPath - A key path of the form relationship.property (with one or more relationships): for example “department.name” or “department.manager.lastName.” 
   * @returns {void}
   * @desc The default implementation of this method gets the destination object for each relationship using value(forKey:), and sends the final object a setValue(_:forKey:) message.Special ConsiderationsWhen using this method, and the destination object does not implement an accessor for the value, the default behavior is for that object to retain value rather than copy or assign value.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418139-setvalue
   */
  setValueForKeyPath(value, keyPath) {
    //console.log('NSObject.setValueForKeyPath: ' + keyPath)
    if(typeof keyPath !== 'string'){
      throw new Error('setValueForKeyPath: keyPath should be string')
    }
    const paths = keyPath.split('.')
    const key = paths.shift()
    if(paths.length === 0){
      this.setValueForKey(value, key)
      return
    }
    const target = this.valueForKey(key)
    if(target === null){
      console.error(`setValueForKeyPath: key ${key} is null.`)
      return
    }
    //console.log(`NSObject.setValueForKeyPath: ${keyPath}: key ${key} target ${target}`)
    target.setValueForKeyPath(value, paths.join('.'))
  }

  /**
   * Invoked by setValue(_:forKey:) when it finds no property for a given key.
   * @access public
   * @param {?Object} value - The value for the key identified by key.
   * @param {string} key - A string that is not equal to the name of any of the receiver's properties.
   * @returns {void}
   * @desc Subclasses can override this method to handle the request in some other way. The default implementation raises an NSUndefinedKeyException.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1413490-setvalue
   */
  setValueForUndefinedKey(value, key) {
    throw new Error(`setValueForKey: undefined key: ${key}`)
  }

  /**
   * Sets properties of the receiver with values from a given dictionary, using its keys to identify the properties.
   * @access public
   * @param {Map<string, Object>} keyedValues - A dictionary whose keys identify properties in the receiver. The values of the properties in the receiver are set to the corresponding values in the dictionary.
   * @returns {void}
   * @desc The default implementation invokes setValue(_:forKey:) for each key-value pair, substituting nil for NSNull values in keyedValues.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1417515-setvaluesforkeys
   */
  setValuesForKeys(keyedValues) {
  }

  /**
   * Returns a Boolean value that indicates whether the value specified by a given pointer is valid for the property identified by a given key.
   * @access public
   * @param {AutoreleasingUnsafeMutablePointer<AnyObject?>} ioValue - A pointer to a new value for the property identified by key. This method may modify or replace the value in order to make it valid.
   * @param {string} inKey - 
   * @returns {void}
   * @throws {Error}
   * @desc The default implementation of this method searches the class of the receiver for a validation method whose name matches the pattern validate<Key>:error:. If such a method is found it is invoked and the result is returned. If no such method is found, true is returned.The sender of the message is never given responsibility for releasing ioValue or outError. See Adding Validation for more information.Handling Errors in Swift:
In Swift, this method returns Void and is marked with the throws keyword to indicate that it throws an error in cases of failure.
You call this method in a try expression and handle any errors in the catch clauses of a do statement, as described in Error Handling in The Swift Programming Language (Swift 3.1) and Error Handling in Using Swift with Cocoa and Objective-C (Swift 3.1).

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416754-validatevalue
   */
  validateValueForKey(ioValue, inKey) {
  }

  /**
   * Returns a Boolean value that indicates whether the value specified by a given pointer is valid for a given key path relative to the receiver. 
   * @access public
   * @param {AutoreleasingUnsafeMutablePointer<AnyObject?>} ioValue - A pointer to a new value for the property identified by keyPath. This method may modify or replace the value in order to make it valid.
   * @param {string} inKeyPath - 
   * @returns {void}
   * @throws {Error}
   * @desc The default implementation gets the destination object for each relationship using value(forKey:) and returns the result of a validateValue(_:forKey:) message to the final object.Handling Errors in Swift:
In Swift, this method returns Void and is marked with the throws keyword to indicate that it throws an error in cases of failure.
You call this method in a try expression and handle any errors in the catch clauses of a do statement, as described in Error Handling in The Swift Programming Language (Swift 3.1) and Error Handling in Using Swift with Cocoa and Objective-C (Swift 3.1).

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416245-validatevalue
   */
  validateValueForKeyPath(ioValue, inKeyPath) {
  }

  /**
   * Returns the value for the property identified by a given key.
   * @access public
   * @param {string} key - The name of one of the receiver's properties.
   * @returns {?Object} - 
   * @desc The search pattern that valueForKey: uses to find the correct value to return is described in Accessor Search Patterns in Key-Value Coding Programming Guide.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1412591-value
   */
  valueForKey(key) {
    if(typeof key !== 'string'){
      throw new Error('error: valueForKey(key): key should be string')
    }
    if(typeof this[key] === 'undefined'){
      //console.log('valueForUndefinedKey func: ' + this.valueForUndefinedKey)
      return this.valueForUndefinedKey(key)
    }
    return this[key]
  }

  /**
   * Returns the value for the derived property identified by a given key path.
   * @access public
   * @param {string} keyPath - A key path of the form relationship.property (with one or more relationships); for example “department.name” or “department.manager.lastName”.
   * @returns {?Object} - 
   * @desc The default implementation gets the destination object for each relationship using value(forKey:) and returns the result of a value(forKey:) message to the final object.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416468-value
   */
  valueForKeyPath(keyPath) {
    if(typeof keyPath !== 'string'){
      throw new Error('valueForKeyPath(keyPath): keyPath should be string')
    }
    const paths = keyPath.split('.')
    const key = paths.shift()
    const value = this.valueForKey(key)
    if(paths.length === 0){
      return value
    }
    if(value === null){
      return null
    }
    return value.valueForKeyPath(paths.join('.'))
  }

  /**
   * Invoked by value(forKey:) when it finds no property corresponding to a given key.
   * @access public
   * @param {string} key - A string that is not equal to the name of any of the receiver's properties.
   * @returns {?Object} - 
   * @desc Subclasses can override this method to return an alternate value for undefined keys. The default implementation raises an NSUndefinedKeyException.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1413457-value
   */
  valueForUndefinedKey(key) {
    throw new Error(`valueForKey: undefined key: ${key}`)
  }

  /**
   * Informs the observed object that the specified change is about to be executed at given indexes for a specified ordered to-many relationship.
   * @access public
   * @param {NSKeyValueChange} changeKind - 
   * @param {Set} indexes - The indexes of the to-many relationship that will be affected by the change.
   * @param {string} key - The name of a property that is an ordered to-many relationship.
   * @returns {void}
   * @desc Use this method when implementing key-value-observing compliance manually.ImportantAfter the values have been changed, a corresponding didChange(_:valuesAt:forKey:) must be invoked with the same parameters.Special ConsiderationsYou rarely need to override this method in subclasses, but if you do, be sure to call super.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1412271-willchange
   */
  willChangeValuesAtForKey(changeKind, indexes, key) {
  }

  /**
   * Informs the observed object that the value of a given property is about to change.
   * @access public
   * @param {string} key - The name of the property that will change.
   * @returns {void}
   * @desc Use this method when implementing key-value observer compliance manually to inform the observed object that the value at key is about to change.The change type of this method is NSKeyValueChangeSetting.ImportantAfter the values have been changed, a corresponding didChangeValue(forKey:) must be invoked with the same parameter. Special ConsiderationsYou rarely need to override this method in subclasses, but if you do, be sure to call super.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416222-willchangevalue
   */
  willChangeValueForKey(key) {
  }

  /**
   * Informs the observed object that the specified change is about to be made to a specified unordered to-many relationship.
   * @access public
   * @param {string} key - The name of a property that is an unordered to-many relationship
   * @param {NSKeyValueSetMutationKind} mutationKind - The type of change that will be made.
   * @param {Set<AnyHashable>} objects - The objects that are involved in the change (see NSKeyValueSetMutationKind).
   * @returns {void}
   * @desc Use this method when implementing key-value observer compliance manually.ImportantAfter the values have been changed, a corresponding didChangeValue(forKey:withSetMutation:using:) must be invoked with the same parameters.Special ConsiderationsYou rarely need to override this method in subclasses, but if you do, be sure to call super.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1412323-willchangevalue
   */
  willChangeValueForKeyWithSetMutationUsing(key, mutationKind, objects) {
  }

  /**
   * 
   * @access public
   * @param {!QLPreviewPanel} panel - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504653-acceptspreviewpanelcontrol
   */
  acceptsPreviewPanelControl(panel) {
    return false
  }

  /**
   * Returns a localized description of the specified action.
   * @deprecated
   * @access public
   * @param {string} action - The action attribute.
   * @returns {?string} - 
   * @desc User interface classes must implement this method to return descriptions for all actions returned from accessibilityActionNames(). A button, for example, might return the string "press” for the NSAccessibilityPressAction action. Subclasses should invoke the superclass's implementation, if it exists, to obtain the descriptions of any inherited actions.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1533500-accessibilityactiondescription
   */
  accessibilityActionDescription(action) {
    return null
  }

  /**
   * Returns an array of action names supported by the accessibility element.
   * @deprecated
   * @access public
   * @returns {Object[]} - 
   * @desc User interface classes must implement this method. Subclasses should invoke the superclass's implementation, if it exists, and append additional action names or remove unsupported actions. See Constants for some common action names.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1527905-accessibilityactionnames
   */
  accessibilityActionNames() {
    return null
  }

  /**
   * Returns the count of the specified accessibility array attribute.
   * @access public
   * @param {string} attribute - The accessibility array attribute.
   * @returns {number} - 
   * @desc If attribute is not an array, an exception is raised.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1527138-accessibilityarrayattributecount
   */
  accessibilityArrayAttributeCount(attribute) {
    return 0
  }

  /**
   * Returns a subarray of values of an accessibility array attribute.
   * @access public
   * @param {string} attribute - The accessibility array attribute.
   * @param {number} index - The starting index.
   * @param {number} maxCount - The maximum desired number of items requested.
   * @returns {Object[]} - 
   * @desc Note that this method does not take a range. The maximum count is the maximum desired number of items requested by an accessibility client. This number may be beyond the bounds of your array.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1535909-accessibilityarrayattributevalue
   */
  accessibilityArrayAttributeValues(attribute, index, maxCount) {
    return null
  }

  /**
   * Returns an array of attribute names supported by the receiver.
   * @deprecated
   * @access public
   * @returns {Object[]} - 
   * @desc User interface classes must implement this method. Subclasses should invoke the superclass's implementation, if it exists, and append additional attributes or remove unsupported attributes. See Constants for lists of attribute names.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1525181-accessibilityattributenames
   */
  accessibilityAttributeNames() {
    return null
  }

  /**
   * Returns the value of the specified attribute in the receiver.
   * @deprecated
   * @access public
   * @param {string} attribute - The name of the attribute. See Constants for lists of attribute names.
   * @returns {?Object} - 
   * @desc User interface classes must implement this method. Subclasses should invoke the superclass's implementation, if it exists, if attribute is not implemented in the subclass.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1532465-accessibilityattributevalue
   */
  accessibilityAttributeValue(attribute) {
    return null
  }

  /**
   * Returns the value of the receiver's parameterized attribute corresponding to the specified attribute name and parameter.
   * @deprecated
   * @access public
   * @param {string} attribute - The name of the attribute. See Constants for lists of attribute names.
   * @param {?Object} parameter - The parameter.
   * @returns {?Object} - 
   * @desc If you implement this method, also implement accessibilityParameterizedAttributeNames().
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1524809-accessibilityattributevalue
   */
  accessibilityAttributeValueForParameter(attribute, parameter) {
    return null
  }

  /**
   * Returns the deepest descendant of the accessibility hierarchy that contains the specified point.
   * @access public
   * @param {CGPoint} point - The point being hit-tested, in lower-left relative screen coordinates.
   * @returns {?Object} - 
   * @desc You can assume that the specified point has already been determined to lie within the accessibility element's frame. Override this method to do deeper hit-testing by identifying which child element, if any, contains the point. NSMatrix, for example, identifies which of its cells contains the point and propagates the hit-test to it. If the specified point is not contained within one of the accessibility element's children, either return self or, if available, invoke the superclass's implementation. The default NSView and NSCell implementations test whether the accessibility element is an ignored element and, if it is, return the receiver's first unignored parent; otherwise they return self.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1526136-accessibilityhittest
   */
  accessibilityHitTest(point) {
    return null
  }

  /**
   * Returns the index of the specified accessibility child in the parent.
   * @access public
   * @param {Object} child - The accessibility child of an object.
   * @returns {number} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1533558-accessibilityindex
   */
  accessibilityIndexOfChild(child) {
    return 0
  }

  /**
   * Returns a Boolean value that indicates whether the value for the specified attribute in the receiver can be set.
   * @deprecated
   * @access public
   * @param {string} attribute - The name of the attribute. See Constants for lists of attribute names.
   * @returns {boolean} - 
   * @desc User interface classes must implement this method. Subclasses should invoke the superclass's implementation, if it exists, if attribute is not implemented in the subclass.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1529207-accessibilityisattributesettable
   */
  accessibilityIsAttributeSettable(attribute) {
    return false
  }

  /**
   * Returns a Boolean value indicating whether the receiver should be ignored in the parent-child accessibility hierarchy.
   * @deprecated
   * @access public
   * @returns {boolean} - 
   * @desc When asking for an object's children, do not include ignored children; instead, replace the ignored children with their own unignored children. The same applies when asking for an object's parent: skip the ignored parent and treat the first unignored ancestor as the real parent.  Likewise, when a hit-test or focus test is satisfied by an ignored element, use the element's first unignored ancestor (or descendant in certain cases, such as single-celled controls) instead.Ignored elements let you provide a simplified version of the view and object ownership hierarchies. Accessibility clients can bypass intermediate objects, letting users access the real user interface objects more quickly. For example, NSControl objects are ignored when they are single-celled; the visible parent-child relationship is between the control's parent (or a higher ancestor if the parent is ignored, too) and the control's cell.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1526439-accessibilityisignored
   */
  accessibilityIsIgnored() {
    return false
  }

  /**
   * Returns a list of parameterized attribute names supported by the receiver.
   * @deprecated
   * @access public
   * @returns {Object[]} - 
   * @desc If you implement this method, also implement accessibilityAttributeValue(_:forParameter:).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1525455-accessibilityparameterizedattrib
   */
  accessibilityParameterizedAttributeNames() {
    return null
  }

  /**
   * Performs the action associated with the specified action.
   * @deprecated
   * @access public
   * @param {string} action - The action to perform.
   * @returns {void}
   * @desc User interface classes must implement this method to handle all the actions returned from accessibilityActionNames(). Subclasses should invoke the superclass's implementation, if it exists, if action is not implemented in the subclass.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1533528-accessibilityperformaction
   */
  accessibilityPerformAction(action) {
  }

  /**
   * Overrides the specified attribute in the receiver or adds it if it does not exist, and sets its value to the specified value.
   * @deprecated
   * @access public
   * @param {?Object} value - The attribute value to be set. 
   * @param {string} attribute - The name of the attribute. See Constants for lists of attribute names.
   * @returns {boolean} - 
   * @desc This method is for changing the set of attributes on an instance, as an alternative to subclassing.This method works only on objects whose class already implements the NSAccessibility protocol. If the specified attribute is already supported by the object, the value specified by this method wins.If the specified attribute does not exist, it is created outside the NSAccessibility protocol, so accessibilityAttributeNames still returns the old list, which does not contain the new attribute. Likewise, accessibilityAttributeValue does not return attributes created by the override process nor does it return their overridden values.The values of overridden attributes are not settable by accessibility clients.If you need to undo the effect of using this method, call it again, passing nil for the value.Ensure that you invoke this method on the actual object that represents the user interface element. For example, for NSButton, use the underlying NSButtonCell object. NSButton itself is ignored by accessibility.This method works only on an object representing a single user interface element. So, for example, you cannot use it when a single object represents multiple user interface elements, as with NSSegmentedCell, which has only a single object but provides user interface elements for each segment.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1535843-accessibilitysetoverridevalue
   */
  accessibilitySetOverrideValueForAttribute(value, attribute) {
    return false
  }

  /**
   * Sets the value of the specified attribute in the receiver to the specified value.
   * @deprecated
   * @access public
   * @param {?Object} value - The attribute value to be set.
   * @param {string} attribute - The name of the attribute. See Constants for lists of attribute names.
   * @returns {void}
   * @desc User interface classes must implement this method if any of its attributes are settable. Subclasses should invoke the superclass's implementation, if it exists, if attribute is not implemented in the subclass.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528477-accessibilitysetvalue
   */
  accessibilitySetValueForAttribute(value, attribute) {
  }

  /**
   * Sent to the delegate to request the property the action applies to.
   * @access public
   * @returns {!string} - 
   * @desc See Table 1The documentation for property-list constants for the properties for person and group records.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411302-actionproperty
   */
  actionProperty() {
    return null
  }

  /**
   * Sent by Cocoa’s built-in scripting support during execution of get or set script commands to find out if the delegate can handle operations on the specified key-value key.
   * @access public
   * @param {NSApplication} sender - The app object associated with the delegate. 
   * @param {string} key - The key to be handled.
   * @returns {boolean} - 
   * @desc The method should return true if the delegate for the app sender handles the key specified by key, which means it can get or set the scriptable property or element that corresponds to that key. The app implements methods for each of the keys that it handles, where the method name matches the key.For example, a scriptable app that doesn’t use Cocoa’s document-based app architecture can implement this method to supply its own document ordering. Such an app might want to do this because the standard app delegate expects to work with a document-based app. The TextEdit app (whose source is distributed with macOS developer tools) provides the following implementation:return [key isEqualToString:@"orderedDocuments"];
TextEdit then implements the orderedDocuments method in its controller class to return an ordered list of documents. An app with its own window ordering might add a test for the key orderedWindows so that its delegate can provide its own version of orderedWindows.ImportantCocoa scripting does not invoke this method for script commands other than get or set. For information on working with other commands, see Script Commands in Cocoa Scripting Guide.return [key isEqualToString:@"orderedDocuments"];

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1494285-application
   */
  applicationDelegateHandlesKey(sender, key) {
    return false
  }

  /**
   * Sent to the delegate to indicate the authorization object has been created or changed. If you have saved a copy of the authorization object for your own purposes, you should discard it and call authorization for a new authorization object.
   * @access public
   * @param {!SFAuthorizationView} view - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411010-authorizationviewcreatedauthoriz
   */
  authorizationViewCreatedAuthorization(view) {
  }

  /**
   * Sent to the delegate to indicate the user was authorized and the authorization view was changed to unlocked.
   * @access public
   * @param {!SFAuthorizationView} view - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411002-authorizationviewdidauthorize
   */
  authorizationViewDidAuthorize(view) {
  }

  /**
   * Sent to the delegate to indicate the user was deauthorized and the authorization view was changed to locked.
   * @access public
   * @param {!SFAuthorizationView} view - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411017-authorizationviewdiddeauthorize
   */
  authorizationViewDidDeauthorize(view) {
  }

  /**
   * Sent to the delegate to indicate that the view’s visibility has changed.
   * @access public
   * @param {!SFAuthorizationView} view - 
   * @returns {void}
   * @desc This delegate method, if present, is called whenever the isHidden method is called to show or hide the view.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411034-authorizationviewdidhide
   */
  authorizationViewDidHide(view) {
  }

  /**
   * Sent to the delegate to indicate that deauthorization is about to occur.
   * @access public
   * @param {!SFAuthorizationView} view - 
   * @returns {void}
   * @desc This method is called after deauthorization has been approved (either you called the deauthorize: method, or the user clicked an open lock icon and the authorizationViewShouldDeauthorize: delegate method did not cancel the operation), and before the user is deauthorized (that is, before the authorizationViewDidDeauthorize: delegate method is called). 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1410992-authorizationviewreleasedauthori
   */
  authorizationViewReleasedAuthorization(view) {
  }

  /**
   * Sent to the delegate when a user clicks the open lock icon.
   * @access public
   * @param {!SFAuthorizationView} view - 
   * @returns {number} - 
   * @desc  The delegate can react to this before deauthorization happens and avoid it by returning false. This delegate method is not called when you call the deauthorize: method.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411006-authorizationviewshoulddeauthori
   */
  authorizationViewShouldDeauthorize(view) {
    return 0
  }

  /**
   * Prepares the receiver for service after it has been loaded from an Interface Builder archive, or nib file.
   * @access public
   * @returns {void}
   * @desc The nib-loading infrastructure sends an awakeFromNib message to each object recreated from a nib archive, but only after all the objects in the archive have been loaded and initialized. When an object receives an awakeFromNib message, it is guaranteed to have all its outlet and action connections already established.You must call the super implementation of awakeFromNib to give parent classes the opportunity to perform any additional initialization they require. Although the default implementation of this method does nothing, many UIKit classes provide non-empty implementations. You may call the super implementation at any point during your own awakeFromNib method.NoteDuring Interface Builder’s test mode, this message is also sent to objects instantiated from loaded Interface Builder plug-ins. Because plug-ins link against the framework containing the object definition code, Interface Builder is able to call their awakeFromNib method when present. The same is not true for custom objects that you create for your Xcode projects. Interface Builder knows only about the defined outlets and actions of those objects; it does not have access to the actual code for them.During the instantiation process, each object in the archive is unarchived and then initialized with the method befitting its type. Objects that conform to the NSCoding protocol (including all subclasses of UIView and UIViewController) are initialized using their initWithCoder: method. All objects that do not conform to the NSCoding protocol are initialized using their init method. After all objects have been instantiated and initialized, the nib-loading code reestablishes the outlet and action connections for all of those objects. It then calls the awakeFromNib method of the objects. For more detailed information about the steps followed during the nib-loading process, see Nib Files in Resource Programming Guide.ImportantBecause the order in which objects are instantiated from an archive is not guaranteed, your initialization methods should not send messages to other objects in the hierarchy. Messages to other objects can be sent safely from within an awakeFromNib method. Typically, you implement awakeFromNib for objects that require additional set up that cannot be done at design time. For example, you might use this method to customize the default configuration of any controls to match user preferences or the values in other controls. You might also use it to restore individual controls to some previous state of your application. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1402907-awakefromnib
   */
  awakeFromNib() {
  }

  /**
   * 
   * @access public
   * @param {!QLPreviewPanel} panel - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504204-beginpreviewpanelcontrol
   */
  beginPreviewPanelControl(panel) {
  }

  /**
   * Establishes a binding between a given property of the receiver and the property of a given object specified by a given key path.
   * @access public
   * @param {string} binding - The key path for a property of the receiver previously exposed using the exposeBinding(_:) method.
   * @param {Object} observable - 
   * @param {string} keyPath - A key path to a property reachable from observableController. The elements in the path must be key-value observing compliant (see Key-Value Observing Programming Guide).
   * @param {?Map<string, Object>} [options = null] - A dictionary containing options for the binding, such as placeholder objects or an NSValueTransformer identifier as described in Constants. This value is optional—pass nil to specify no options.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458185-bind
   */
  bindToWithKeyPath(binding, observable, keyPath, options = null) {
  }

  /**
   * Returns an array of candidates.
   * @access public
   * @param {!Object} sender - The client object requesting the candidates.
   * @returns {!Object[]} - 
   * @desc An input method should look up its currently composed string and return a list of candidate strings that that string might map to.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385360-candidates
   */
  candidates(sender) {
    return null
  }

  /**
   * Implements custom help behavior for the modal panel.
   * @access public
   * @param {!SFCertificatePanel} sender - The certificate panel for which to implement custom help.
   * @returns {number} - 
   * @desc You can use this delegate method to implement custom help if you call the setShowsHelp: method to display a help button in the sheet or panel. If you are not implementing custom help, do not implement this method.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1514145-certificatepanelshowhelp
   */
  certificatePanelShowHelp(sender) {
    return 0
  }

  /**
   * Sent to the first responder when the user selects a color in an NSColorPanel object.
   * @access public
   * @param {?Object} sender - The NSColorPanel sending the message.
   * @returns {void}
   * @desc When the user selects a color in an NSColorPanel object, the panel sends a changeColor(_:) action message to the first responder. You can override this method in any responder that needs to respond to a color change. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1532638-changecolor
   */
  changeColor(sender) {
  }

  /**
   * Informs responders of a font change.
   * @access public
   * @param {?Object} sender - The object that sent the message.
   * @returns {void}
   * @desc Generally this change is because the user changed the font either in the selection of a rich text field or in a whole plain text field. Any object that contains a font the user can change must respond to the changeFont(_:) message by sending a convert(_:) message back to sender (an NSFontManager object) for each font in the selection. For more information, see Responding to Font Changes.Be aware that selectedFont at this point may return unpredictable results. The font in this property may not be the last font selected, or there may be multiple fonts selected at the time changeFont(_:) is called. The use of selectedFont from within changeFont(_:) is strongly discouraged.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1462311-changefont
   */
  changeFont(sender) {
  }

  /**
   * Implements custom help behavior for the modal panel.
   * @access public
   * @param {!SFChooseIdentityPanel} sender - The choose identity panel for which to implement custom help.
   * @returns {number} - 
   * @desc You can use this delegate method to implement custom help if you call the setShowsHelp: method to display a help button in the sheet or panel. If you are not implementing custom help, do not implement this method. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1514140-chooseidentitypanelshowhelp
   */
  chooseIdentityPanelShowHelp(sender) {
    return 0
  }

  /**
   * 
   * @deprecated
   * @access public
   * @param {Object} annotationClass - 
   * @returns {Object} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436089-class
   */
  classForAnnotationClass(annotationClass) {
    return null
  }

  /**
   * 
   * @deprecated
   * @access public
   * @returns {Object} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436049-classforpage
   */
  classForPage() {
    return null
  }

  /**
   * Uses type info from the class description and NSScriptCoercionHandler to attempt to convert value for key to the proper type, if necessary.
   * @access public
   * @param {?Object} value - 
   * @param {string} key - 
   * @returns {?Object} - 
   * @desc  The method coerceValueFor<Key>: is used if it exists.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416527-coercevalue
   */
  coerceValueForKey(value, key) {
    return null
  }

  /**
   * Informs the controller that the composition should be committed.
   * @access public
   * @param {!Object} sender - The client object requesting the input method to commit the composition.
   * @returns {void}
   * @desc If an input method implements this method, it is called when the client wants to end the composition session immediately. A typical response would be to call the insertText method of the client and then clean up any per-session buffers and variables. After receiving this message an input method should consider the given composition session finished.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385539-commitcomposition
   */
  commitComposition(sender) {
  }

  /**
   * Returns whether the receiver was able to commit any pending edits.
   * @access public
   * @returns {boolean} - 
   * @desc A commit is denied if the receiver fails to apply the changes to the model object, perhaps due to a validation error.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458190-commitediting
   */
  commitEditing() {
    return false
  }

  /**
   * Attempt to commit pending edits, returning an error in the case of failure.
   * @access public
   * @returns {void}
   * @throws {Error}
   * @desc During autosaving, commit editing may fail, due to a pending edit. Rather than interrupt the user with an unexpected alert, this method provides the caller with the option to either present the error or fail silently, leaving the pending edit in place and the user's editing uninterrupted. In your implementation of this method, you should attempt to commit editing, but if there is a failure return false and in error an error object to be presented or ignored as appropriate. Handling Errors in Swift:
In Swift, this method returns Void and is marked with the throws keyword to indicate that it throws an error in cases of failure.
You call this method in a try expression and handle any errors in the catch clauses of a do statement, as described in Error Handling in The Swift Programming Language (Swift 3.1) and Error Handling in Using Swift with Cocoa and Objective-C (Swift 3.1).

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458181-commiteditingandreturnerror
   */
  commitEditingAndReturnError() {
  }

  /**
   * Attempt to commit any currently edited results of the receiver.
   * @access public
   * @param {?Object} delegate - 
   * @param {?function} didCommitSelector - 
   * @param {?Object} contextInfo - 
   * @returns {void}
   * @desc The receiver must have been registered as the editor of an object using objectDidBeginEditing:, and has not yet been unregistered by a subsequent invocation of objectDidEndEditing:. When the committing has either succeeded or failed, send the following message to the specified object. The didCommitSelector method must have the following method signature: - (void)editor:(id)editor didCommit:(BOOL)didCommit contextInfo:(void *)contextInfo
If an error occurs while attempting to commit, for example if key-value coding validation fails, an implementation of this method should typically send the NSView in which editing is being done a presentError:modalForWindow:delegate:didRecoverSelector:contextInfo: message, specifying the view's containing window.- (void)editor:(id)editor didCommit:(BOOL)didCommit contextInfo:(void *)contextInfo

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458179-commitediting
   */
  commitEditingWithDelegateDidCommit(delegate, didCommitSelector, contextInfo) {
  }

  /**
   * Return the current composed string.
   * @access public
   * @param {!Object} sender - The client object requesting the string.
   * @returns {!Object} - 
   * @desc  A composed string refers to the buffer that an input method typically maintains to mirror the text contained in the active inline area. It is called the composed string to reflect the fact that the input method composed the string by converting the characters input by the user. In addition, using the term composed string makes it easier to differentiate between an input method  buffer and the text in the active inline area that the user sees. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385416-composedstring
   */
  composedString(sender) {
    return null
  }

  /**
   * Called after an input parameter in the composition parameter view has been edited.
   * @access public
   * @param {!QCCompositionParameterView} parameterView - The composition parameter view in which the parameter changed.
   * @param {!string} portKey - A key for one of the composition parameters, which is provided to you by the Quartz Composer engine.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1505265-compositionparameterview
   */
  compositionParameterViewDidChangeParameterWithKey(parameterView, portKey) {
  }

  /**
   * Allows you to define which composition parameters are visible in the user interface when the composition parameter view refreshes.  
   * @access public
   * @param {!QCCompositionParameterView} parameterView - The composition parameter view in which the selection changed.
   * @param {!string} portKey - A key for one of the composition parameters, which is provided to you by the Quartz Composer engine.
   * @param {!Map<AnyHashable, Object>} [portAttributes = new Map()] - A dictionary of the attributes that you want to display in the user interface.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503523-compositionparameterview
   */
  compositionParameterViewShouldDisplayParameterWithKeyAttributes(parameterView, portKey, portAttributes = new Map()) {
    return false
  }

  /**
   * Performs custom tasks when the selected composition in the composition picker view changes. 
   * @access public
   * @param {!QCCompositionPickerView} pickerView - The composition picker view in which the selection changed.
   * @param {!QCComposition} composition - The selected composition or nil if the previously selected composition is no longer selected.
   * @returns {void}
   * @desc Quartz Composer invokes this method when the selected composition in the composition picker view changes. Implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1447352-compositionpickerview
   */
  compositionPickerViewDidSelect(pickerView, composition) {
  }

  /**
   * Performs custom tasks when the composition picker view starts animating a composition.
   * @access public
   * @param {!QCCompositionPickerView} pickerView - The composition picker view in which the composition started animating.
   * @returns {void}
   * @desc Quartz Composer invokes  this method when  the composition picker view starts animating a composition. Implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1447342-compositionpickerviewdidstartani
   */
  compositionPickerViewDidStartAnimating(pickerView) {
  }

  /**
   * Performs custom tasks when the composition picker view stops animating a composition.
   * @access public
   * @param {!QCCompositionPickerView} pickerView - The composition picker view in which the composition stopped animating.
   * @returns {void}
   * @desc Quartz Composer invokes  this method whenever the composition picker view stops animating a composition. Implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1447348-compositionpickerviewwillstopani
   */
  compositionPickerViewWillStopAnimating(pickerView) {
  }

  /**
   * Sent when a control with editable text begins an editing session.
   * @access public
   * @param {Notification} obj - 
   * @returns {void}
   * @desc This method is invoked when the user begins editing text in a control such as a text field or a form field. The control posts a NSControlTextDidBeginEditing notification, and if the control’s delegate implements this method, it is automatically registered to receive the notification. Use the key @"NSFieldEditor" to obtain the field editor from the userInfo dictionary of the notification object.  See controlTextDidEndEditing(_:) for an explanation of why you may not always get one invocation of controlTextDidBeginEditing(_:) for each invocation of controlTextDidEndEditing(_:).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1428934-controltextdidbeginediting
   */
  controlTextDidBeginEditing(obj) {
  }

  /**
   * Sent when the text in the receiving control changes. 
   * @access public
   * @param {Notification} obj - 
   * @returns {void}
   * @desc This method is invoked when text in a control such as a text field or form changes. The control posts a NSControlTextDidChange notification, and if the control’s delegate implements this method, it is automatically registered to receive the notification. Use the key @"NSFieldEditor" to obtain the field editor from the userInfo dictionary of the notification object.  
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1428982-controltextdidchange
   */
  controlTextDidChange(obj) {
  }

  /**
   * Sent when a control with editable text ends an editing session.
   * @access public
   * @param {Notification} obj - 
   * @returns {void}
   * @desc This method is invoked when the user stops editing text in a control such as a text field or form. The control posts a NSControlTextDidEndEditing notification, and if the control’s delegate implements this method, it is automatically registered to receive the notification. Use the key @"NSFieldEditor" to obtain the field editor from the userInfo dictionary of the notification object.  WarningIn some cases, such as when editing within an instance of NSOutlineView, this method may be invoked without a previous invocation of controlTextDidBeginEditing(_:). You will only get the controlTextDidBeginEditing: notification if the user actually types something, but you can get the controlTextDidEndEditing: notification if the user just double-clicks the field and then clicks outside the field, without typing.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1428847-controltextdidendediting
   */
  controlTextDidEndEditing(obj) {
  }

  /**
   * Processes a command  generated by user action such as typing certain keys or pressing the mouse button.
   * @access public
   * @param {!function} aSelector - The action associated with the key down event. The selector can be an action specified in the input method  dictionary of keys and actions (that is, an action specific to the input method) or one of the NSResponder action methods such as insertNewline: or deleteBackward:. By definition such action methods do not return a value.
   * @param {!Object} sender - The client object sending the key down event.
   * @returns {boolean} - 
   * @desc This method is called when the system binds a key down event to an action method. If you implement this method you should test if it is appropriate to call the action method before actually calling it, because calling the action method implies that you agree to handle the command. Suppose you have implemented a version of insertNewline:  that terminates the conversion session and sends the fully converted text to the client. However, if you conversion buffer is empty, you want the application to receive the return key that triggered the call to insertNewline:. In that case, when didCommandBySelector:client: is called you should test your buffer before calling your implementation of insertNewline:. If the buffer is empty, return false to indicate that the return key should be passed on to the application. If the buffer is not empty, call insertNewline: and then return true as the result of didCommandBySelector:client:.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385394-didcommand
   */
  didCommandByClient(aSelector, sender) {
    return false
  }

  /**
   * Called for every match found during a find operation.
   * @access public
   * @param {PDFSelection} instance - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436046-didmatchstring
   */
  didMatchString(instance) {
  }

  /**
   * Causes the receiver to discard any changes, restoring the previous values.
   * @access public
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458076-discardediting
   */
  discardEditing() {
  }

  /**
   * Called when the PDFDocumentDidBeginFindNotification notification is posted. 
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436080-documentdidbegindocumentfind
   */
  documentDidBeginDocumentFind(notification) {
  }

  /**
   * Called when the PDFDocumentDidBeginPageFindNotification notification is posted.
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436094-documentdidbeginpagefind
   */
  documentDidBeginPageFind(notification) {
  }

  /**
   * Called when the PDFDocumentDidEndFindNotification notification is posted.
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436068-documentdidenddocumentfind
   */
  documentDidEndDocumentFind(notification) {
  }

  /**
   * Called when the PDFDocumentDidEndPageFindNotification notification is posted. 
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436064-documentdidendpagefind
   */
  documentDidEndPageFind(notification) {
  }

  /**
   * Called when the PDFDocumentDidFindMatchNotification notification is posted.
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436044-documentdidfindmatch
   */
  documentDidFindMatch(notification) {
  }

  /**
   * Called when the PDFDocumentDidUnlockNotification notification is posted.
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1436029-documentdidunlock
   */
  documentDidUnlock(notification) {
  }

  /**
   * Returns a Boolean value that indicates whether the receiver contains a given object.
   * @access public
   * @param {Object} object - The object to search for in the receiver.
   * @returns {boolean} - 
   * @desc Currently, doesContain(_:) messages are never sent to any object from within Cocoa itself. The default implementation for this method provided by NSObject returns true if the receiver is actually an NSArray object and an indexOfObjectIdentical(to:) message sent to the same object would return something other than NSNotFound.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393848-doescontain
   */
  doesContain(object) {
    return false
  }

  /**
   * 
   * @access public
   * @param {!QLPreviewPanel} panel - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1505044-endpreviewpanelcontrol
   */
  endPreviewPanelControl(panel) {
  }

  /**
   * Implemented by the delegate to evaluate whether the delegating NSExceptionHandler instance should handle a given exception.
   * @access public
   * @param {!NSExceptionHandler} sender - The NSExceptionHandler object sending the message.
   * @param {!NSException} exception - An NSException object describing the exception to be evaluated.
   * @param {number} aMask - The bit mask indicating the types of exceptions handled by the NSExceptionHandler object. See Logging and Handling Constants and System Hang Constants for descriptions of the possible enum constants.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1489854-exceptionhandler
   */
  exceptionHandlerShouldHandleMask(sender, exception, aMask) {
    return false
  }

  /**
   * Implemented by the delegate to evaluate whether the delegating NSExceptionHandler instance should log a given exception.
   * @access public
   * @param {!NSExceptionHandler} sender - The NSExceptionHandler object sending the message.
   * @param {!NSException} exception - An NSException object describing the exception to be evaluated.
   * @param {number} aMask - The bit mask indicating the types of exceptions logged by the NSExceptionHandler object. See Logging and Handling Constants and System Hang Constants for descriptions of the possible enum constants.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1489856-exceptionhandler
   */
  exceptionHandlerShouldLogExceptionMask(sender, exception, aMask) {
    return false
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1430046-filetransferservicesabortcomplet
   */
  fileTransferServicesAbortCompleteError(inServices, inError) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1428872-filetransferservicesconnectionco
   */
  fileTransferServicesConnectionCompleteError(inServices, inError) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1432094-filetransferservicescopyremotefi
   */
  fileTransferServicesCopyRemoteFileCompleteError(inServices, inError) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {!Map<AnyHashable, Object>} inProgressDescription - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1431422-filetransferservicescopyremotefi
   */
  fileTransferServicesCopyRemoteFileProgressTransferProgress(inServices, inProgressDescription) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @param {!string} inFolderName - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1430913-filetransferservicescreatefolder
   */
  fileTransferServicesCreateFolderCompleteErrorFolder(inServices, inError, inFolderName) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1434806-filetransferservicesdisconnectio
   */
  fileTransferServicesDisconnectionCompleteError(inServices, inError) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1432086-filetransferservicesfilepreparat
   */
  fileTransferServicesFilePreparationCompleteError(inServices, inError) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @param {!string} inPath - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1432583-filetransferservicespathchangeco
   */
  fileTransferServicesPathChangeCompleteErrorFinalPath(inServices, inError, inPath) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @param {!string} inItemName - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1434702-filetransferservicesremoveitemco
   */
  fileTransferServicesRemoveItemCompleteErrorRemovedItem(inServices, inError, inItemName) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @param {!Object[]} inListing - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1434777-filetransferservicesretrievefold
   */
  fileTransferServicesRetrieveFolderListingCompleteErrorListing(inServices, inError, inListing) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {OBEXError} inError - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1434240-filetransferservicessendfilecomp
   */
  fileTransferServicesSendFileCompleteError(inServices, inError) {
  }

  /**
   * 
   * @access public
   * @param {!OBEXFileTransferServices} inServices - 
   * @param {!Map<AnyHashable, Object>} inProgressDescription - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1430365-filetransferservicessendfileprog
   */
  fileTransferServicesSendFileProgressTransferProgress(inServices, inProgressDescription) {
  }

  /**
   * Performs cleanup when the scripting environment is reset.
   * @access public
   * @returns {void}
   * @desc This method is invoked on objects exposed to the scripting environment just before the scripting environment is reset. After invocation, the receiving object will no longer be referenced by the scripting environment. Further references to WebScriptObject instances created by the exposed object will be invalid and may produce unpredictable results.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528546-finalizeforwebscript
   */
  finalizeForWebScript() {
  }

  /**
   * Requests permission from the Font panel delegate to display the given font name in the Font panel.
   * @deprecated
   * @access public
   * @param {Object} sender - 
   * @param {string} fontName - The full PostScript name of the font to display, such as Helvetica-BoldOblique or Helvetica-Narrow-Bold.
   * @returns {boolean} - 
   * @desc In macOS versions 10.2 and earlier, this method is invoked repeatedly as necessary whenever the Font panel needs updating, such as when the Font panel is first loaded, and when the user selects a family name to see which typefaces in that family are available. Your implementation should execute fairly quickly to ensure the responsiveness of the Font panel.Important

This delegate method is not called in macOS versions 10.3 and later.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1462359-fontmanager
   */
  fontManagerWillIncludeFont(sender, fontName) {
    return false
  }

  /**
   * Handles key down and mouse events.
   * @access public
   * @param {!NSEvent} event - The event to handle.
   * @param {!Object} sender - The client object sending the event.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385363-handle
   */
  handleClient(event, sender) {
    return false
  }

  /**
   * Performs custom tasks when the user right-clicks the image browser view background.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {!NSEvent} event - The event that invoked the method.
   * @returns {void}
   * @desc This method signals  that the user either right-clicked the background or left-clicked it with the Alt key pressed. You can implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503526-imagebrowser
   */
  imageBrowserBackgroundWasRightClickedWith(aBrowser, event) {
  }

  /**
   * Performs custom tasks when the user double-clicks an item in the image browser view.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {number} index - The index of the cell.
   * @returns {void}
   * @desc This method signals that the user double-clicked an item in the image browser view. You can implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504701-imagebrowser
   */
  imageBrowserCellWasDoubleClickedAt(aBrowser, index) {
  }

  /**
   * Performs custom tasks when the user right-clicks an item in the image browser view. 
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {number} index - The index of the cell.
   * @param {!NSEvent} event - The event that invoked the method.
   * @returns {void}
   * @desc This method signals that the user either right-clicked an item in the browser or left-clicked the item with the Alt key pressed. You can implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503802-imagebrowser
   */
  imageBrowserCellWasRightClickedAtWith(aBrowser, index, event) {
  }

  /**
   * Returns the group at the specified index.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {number} index - The index of the group you want to retrieve.
   * @returns {!Map<AnyHashable, Object>} - 
   * @desc This method is optional.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503488-imagebrowser
   */
  imageBrowserGroupAt(aBrowser, index) {
    return null
  }

  /**
   * Returns an object for the item in an image browser view that corresponds to the specified index.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {number} index - The index of the item you want to retrieve.
   * @returns {!Object} - 
   * @desc Your data source must implement this method. The returned object must implement the required methods of the IKImageBrowserItem protocol. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504064-imagebrowser
   */
  imageBrowserItemAt(aBrowser, index) {
    return null
  }

  /**
   * Signals that the specified items should be moved to the specified destination. 
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {!Set} indexes - The indexes of the items that should be reordered.
   * @param {number} destinationIndex - The starting index of the destination the items should be moved to.
   * @returns {boolean} - 
   * @desc This method is optional. It is invoked by the image browser view after  Image Kit determines  that a reordering operation should be applied. The data source should update itself by reordering its elements. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503616-imagebrowser
   */
  imageBrowserMoveItemsAtTo(aBrowser, indexes, destinationIndex) {
    return false
  }

  /**
   * Signals that a remove operation should be applied to the specified items.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {!Set} indexes - The indexes of the items that should be removed.
   * @returns {void}
   * @desc This method is optional. It is invoked by the image browser after  Image Kit determines  that a remove operation should be applied. In response, the data source should update itself by removing the specified items.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503834-imagebrowser
   */
  imageBrowserRemoveItemsAt(aBrowser, indexes) {
  }

  /**
   * Signals that a drag should begin.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @param {!Set} itemIndexes - The indexes of the items that should be dragged.
   * @param {!NSPasteboard} pasteboard - The pasteboard to copy the items to.
   * @returns {number} - 
   * @desc This method is optional. It is invoked after Image Kit determines that a drag should begin, but before the drag has been started. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504208-imagebrowser
   */
  imageBrowserWriteItemsAtTo(aBrowser, itemIndexes, pasteboard) {
    return 0
  }

  /**
   * Performs custom tasks when the selection changes.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @returns {void}
   * @desc This method signals that the user changes the selection in the image browser view. You can implement this method if you want to perform custom tasks at that time.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503765-imagebrowserselectiondidchange
   */
  imageBrowserSelectionDidChange(aBrowser) {
  }

  /**
   * Returns the image to display.
   * @access public
   * @returns {!Object} - 
   * @desc Your data source must implement this method. This method  is called frequently, so the receiver should cache the returned instance.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504801-imagerepresentation
   */
  imageRepresentation() {
    return null
  }

  /**
   * Returns the representation type of the image to display.
   * @access public
   * @returns {!string} - 
   * @desc Your data source must implement this method.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503547-imagerepresentationtype
   */
  imageRepresentationType() {
    return null
  }

  /**
   *  Returns the display subtitle of the image.
   * @access public
   * @returns {!string} - 
   * @desc This method is optional.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503725-imagesubtitle
   */
  imageSubtitle() {
    return null
  }

  /**
   * Returns the display title of the image. 
   * @access public
   * @returns {!string} - 
   * @desc This method is optional.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504080-imagetitle
   */
  imageTitle() {
    return null
  }

  /**
   * Returns a unique string that identifies the data source item.
   * @access public
   * @returns {!string} - 
   * @desc Your data source must implement this method. The image browser view uses this identifier to associate the data source item and  its cache.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503516-imageuid
   */
  imageUID() {
    return null
  }

  /**
   * Returns the version of the item. 
   * @access public
   * @returns {number} - 
   * @desc This method is optional. The receiver can return a new version to let the image browser know that it should not use its cache for the item.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504444-imageversion
   */
  imageVersion() {
    return 0
  }

  /**
   * Returns the indices of the specified container objects.
   * @access public
   * @param {NSScriptObjectSpecifier} specifier - An object specifier for the container objects for which to obtain the indices.
   * @returns {?number[]} - 
   * @desc  Containers that want to evaluate some specifiers on their own should implement this method. If this method returns nil, the object specifier will go on to do its own evaluation, so you should only return nil if that's the behavior you want, or if an error occurs. If this method returns an array, the object specifier will use the NSNumber objects in it as the indices. So, if you evaluate the specifier and there are no objects that match, you should return an empty array, not nil. If you find only one object, you should still return its index in an array. Returning an array with a single index where the index is – is interpreted to mean all the objects.For an example implementation, see "Implementing Object Specifiers" in Object Specifiers in Cocoa Scripting Guide
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1417806-indicesofobjects
   */
  indicesOfObjectsByEvaluatingObjectSpecifier(specifier) {
    return null
  }

  /**
   * Returns a dictionary describing the receiver’s binding.
   * @access public
   * @param {string} binding - The name of a binding.
   * @returns {?Map<string, Object>} - 
   * @desc This method is mostly for use by subclasses which want to analyze the existing bindings of an object.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458122-infoforbinding
   */
  infoForBinding(binding) {
    return null
  }

  /**
   * Handles key down events that do not map to an action method.
   * @access public
   * @param {!string} string - The key down event, which is the text input by the client.
   * @param {!Object} sender - The client object sending the key down events.
   * @returns {boolean} - 
   * @desc An input method should implement this method when using key binding (that is, it implements didCommand(by:client:)).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385446-inputtext
   */
  inputTextClient(string, sender) {
    return false
  }

  /**
   * Receives Unicode, the key code that generated it, and any modifier flags.
   * @access public
   * @param {!string} string - The text input by the client.
   * @param {number} keyCode - The key code for the associated Unicode.
   * @param {number} flags - The modifier flags.
   * @param {!Object} sender - The client object.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385436-inputtext
   */
  inputTextKeyModifiersClient(string, keyCode, flags, sender) {
    return false
  }

  /**
   * Inserts an object at the specified index in the collection specified by the passed key.
   * @access public
   * @param {Object} value - 
   * @param {number} index - 
   * @param {string} key - 
   * @returns {void}
   * @desc  The method insertIn<Key>:atIndex: is invoked if it exists. If no corresponding scripting-KVC-compliant method (insertIn<Key>:atIndex: ) is found, this method invokes mutableArrayValueForKey: and mutates the result.Note Prior to OS X version 10.4, this method did not invoke -mutableArrayValueForKey:.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1417619-insertvalue
   */
  insertValueAtInPropertyWithKey(value, index, key) {
  }

  /**
   * Inserts an object in the collection specified by the passed key.
   * @access public
   * @param {Object} value - 
   * @param {string} key - 
   * @returns {void}
   * @desc  The method insertIn<Key>: is used if it exists. Otherwise, raises an NSUndefinedKeyException. This is part of Cocoa’s scripting support for inserting newly-created objects into containers without explicitly specifying a location.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416203-insertvalue
   */
  insertValueInPropertyWithKey(value, key) {
  }

  /**
   * Executes when a script attempts to invoke a method on an exposed object directly.
   * @access public
   * @param {!Object[]} _arguments - 
   * @returns {!Object} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528543-invokedefaultmethod
   */
  invokeDefaultMethodWithArguments(_arguments) {
    return null
  }

  /**
   * Handles undefined method invocation from the scripting environment.
   * @access public
   * @param {!string} name - The name of the undefined method.
   * @param {!Object[]} _arguments - 
   * @returns {!Object} - 
   * @desc This method is invoked when a script attempts to invoke a method not directly exported to the scripting environment. You should return the result of the invocation, converted appropriately for the scripting environment.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528562-invokeundefinedmethod
   */
  invokeUndefinedMethodFromWebScriptWithArguments(name, _arguments) {
    return null
  }

  /**
   * Returns a Boolean value that indicates whether receiver is considered to be “like” a given string when the case of characters in the receiver is ignored.
   * @access public
   * @param {string} object - 
   * @returns {boolean} - 
   * @desc Currently, isCaseInsensitiveLike(_:) messages are never sent to any object from within Cocoa itself.The default implementation for this method provided by NSObject returns false. NSString also provides an implementation of this method, which returns true if the receiver matches a pattern described by aString, ignoring the case of the characters in the receiver.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393837-iscaseinsensitivelike
   */
  isCaseInsensitiveLike(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is equal to another given object.
   * @access public
   * @param {?Object} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc During the evaluation of an NSWhoseSpecifier object that contains a test whose operator is NSEqualToComparison, an isEqual(to:) message may be sent to each potentially specified object, if neither the potentially specified object nor the object being tested against implements a scriptingIsEqual(to:) method.The default implementation for this method provided by NSObject returns true if an isEqualTo: message sent to the same object would return true.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393823-isequal
   */
  isEqualTo(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is greater than another given object.
   * @access public
   * @param {?Object} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc During the evaluation of an NSWhoseSpecifier object that contains a test whose operator is NSGreaterThanComparison, an isGreaterThan(_:) message may be sent to each potentially specified object, if the potentially specified object does not implement a scriptingIsGreaterThan(_:) method and the object being tested against does not implement a scriptingIsLessThanOrEqual(to:) method.The default implementation for this method provided by NSObject returns true if a compare: message sent to the same object would return NSOrderedDescending.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393885-isgreaterthan
   */
  isGreaterThan(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is greater than or equal to another given object.
   * @access public
   * @param {?Object} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc During the evaluation of an NSWhoseSpecifier object that contains a test whose operator is NSGreaterThanOrEqualToComparison, anisGreaterThanOrEqual(to:) message may be sent to each potentially specified object, if the potentially specified object does not implement a scriptingIsGreaterThanOrEqual(to:) method and the object being tested against does not implement a scriptingIsLessThan(_:) method.The default implementation for this method provided by NSObject returns true if a compare: message sent to the same object would return NSOrderedSame or NSOrderedDescending.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393862-isgreaterthanorequal
   */
  isGreaterThanOrEqualTo(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is less than another given object.
   * @access public
   * @param {?Object} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc During the evaluation of an NSWhoseSpecifier object that contains a test whose operator is NSLessThanComparison, an isLessThan(_:) message may be sent to each potentially specified object, if the potentially specified object does not implement a scriptingIsLessThan(_:) method and the object being tested against does not implement a scriptingIsGreaterThanOrEqual(to:) method.The default implementation for this method provided by NSObject method returns true if a compare: message sent to the same object would return NSOrderedAscending.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393841-islessthan
   */
  isLessThan(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is less than or equal to another given object. 
   * @access public
   * @param {?Object} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc During the evaluation of an NSWhoseSpecifier object that contains a test whose operator is NSLessThanOrEqualToComparison, an isLessThanOrEqual(to:) message may be sent to each potentially specified object, if the potentially specified object does not implement a scriptingIsLessThanOrEqual(to:) method and the object being tested against does not implement a scriptingIsGreaterThan(_:) method.The default implementation for this method provided by NSObject method returns true if a compare: message sent to the same object would return NSOrderedAscending or NSOrderedSame.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393827-islessthanorequal
   */
  isLessThanOrEqualTo(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is "like" another given object.
   * @access public
   * @param {string} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc Currently, isLike(_:) messages are never sent to any object from within Cocoa itself.The default implementation for this method provided by NSObject method returns false. NSString also provides an implementation of this method, which returns true if the receiver matches a pattern described by object.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393866-islike
   */
  isLike(object) {
    return false
  }

  /**
   * Returns a Boolean value that indicates whether the receiver is not equal to another given object.
   * @access public
   * @param {?Object} object - The object with which to compare the receiver.
   * @returns {boolean} - 
   * @desc Currently, isNotEqual(to:) messages are never sent to any object from within Cocoa itself.The default implementation for this method provided by NSObject method returns true if an isEqual: message sent to the same object would return false.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393843-isnotequal
   */
  isNotEqualTo(object) {
    return false
  }

  /**
   * Invoked when a resolution changes occurs for the window that hosts the layer.
   * @access public
   * @param {CALayer} layer - The layer whose scale and content might need updating.
   * @param {number} newScale - The new scale of the window. 
   * @param {NSWindow} window - The window that hosts the layer.
   * @returns {boolean} - 
   * @desc When a resolution change occurs for a given window, the system traverses the layer trees in that window to decide what action, if any, to take for each layer. The system queries the layer’s delegate to determine whether to change the layer’s contentsScale property to the new scale (either 2.0 or 1.0). Note that you don’t need to manage NSImage contents and that this method is not called on the delegate of a layer whose content is an NSImage object.If the delegate returns true, it should make any corresponding changes to the layer’s properties, as required by the resolution change. For example, a layer whose contents contain a CGImage object needs to determine whether an alternate CGImage object is available for the new scale factor. If the delegate finds a suitable CGImage object, then in addition to returning true, it should set the appropriate CGImage object as the layer’s new contents.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1483574-layer
   */
  layerShouldInheritContentsScaleFrom(layer, newScale, window) {
    return false
  }

  /**
   * Returns the names of the files that the receiver promises to create at a specified location.
   * @deprecated
   * @access public
   * @param {string} dropDestination - A URL object that identifies the location at which the promised files will be created.
   * @returns {?string[]} - 
   * @desc This method is invoked when the drop has been accepted by the destination and the destination, in the case of another Cocoa application, invokes the NSDraggingInfo method namesOfPromisedFilesDropped(atDestination:). For long operations, you can cache dropDestination and defer the creation of the files until the draggedImage:endedAt:operation: method to avoid blocking the destination application.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1416082-namesofpromisedfilesdropped
   */
  namesOfPromisedFilesDroppedAtDestination(dropDestination) {
    return null
  }

  /**
   * Returns the number of groups in an image browser view.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @returns {number} - 
   * @desc This method is optional.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503514-numberofgroups
   */
  numberOfGroupsInImageBrowser(aBrowser) {
    return 0
  }

  /**
   * Returns the number of records managed by the data source object.
   * @access public
   * @param {!IKImageBrowserView} aBrowser - An image browser view.
   * @returns {number} - 
   * @desc Your data source must implement this method. An  IKImageView object uses this method to determine how many cells it should create and display.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503497-numberofitems
   */
  numberOfItemsInImageBrowser(aBrowser) {
    return 0
  }

  /**
   * This message should be sent to the receiver when editor has uncommitted changes that can affect the receiver.
   * @access public
   * @param {Object} editor - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458092-objectdidbeginediting
   */
  objectDidBeginEditing(editor) {
  }

  /**
   * This message should be sent to the receiver when editor has finished editing a property belonging to the receiver.
   * @access public
   * @param {Object} editor - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458187-objectdidendediting
   */
  objectDidEndEditing(editor) {
  }

  /**
   * Returns an array describing the options for the specified binding.
   * @access public
   * @param {string} binding - The name of a binding
   * @returns {NSAttributeDescription[]} - 
   * @desc The NSAttributeDescription instances in the array are used by Interface Builder to build the options editor user interface of the bindings inspector.The option name displayed for the option in the bindings inspector is based on the value of the NSAttributeDescription method name. The type of editor displayed for the option in the bindings inspector is based on the value of the  NSAttributeDescription method attributeType.The default value displayed in the bindings inspector for the option is based on the value of the NSAttributeDescription method defaultValue.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458174-optiondescriptionsforbinding
   */
  optionDescriptionsForBinding(binding) {
    return null
  }

  /**
   * Return the a string that consists of the precomposed unicode characters.
   * @access public
   * @param {!Object} sender - The client object requesting the original string.
   * @returns {!string} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1385400-originalstring
   */
  originalString(sender) {
    return null
  }

  /**
   * Implemented by an owner object to provide promised data.
   * @access public
   * @param {NSPasteboard} sender - The pasteboard that requires the specified data for a paste operation.
   * @param {string} type - The type of data the owner object must provide.
   * @returns {void}
   * @desc The receiver should have been previously declared in a declareTypes(_:owner:) message.The requested data should be written to sender using the setData(_:forType:), setPropertyList(_:forType:), or setString(_:forType:) method. The pasteboard(_:provideDataForType:) messages may also be sent to the owner when the application is shut down through an application’s terminate(_:) method. This is the method that is invoked in response to a Quit command. Thus the user can copy something to the pasteboard, quit the application, and still paste the data that was copied. A pasteboard(_:provideDataForType:) message is sent only if the specified type of data has not already been supplied to the pasteboard. Instead of writing all data types when the cut or copy operation is done, an application can choose to implement this method to provide the data for certain types only when they are requested.If an application writes data to the pasteboard in the richest, and therefore most preferred, type at the time of a cut or copy operation, its pasteboard(_:provideDataForType:) method can simply read that data from the pasteboard, convert it to the requested type, and write it back to the pasteboard as the new type.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1525907-pasteboard
   */
  pasteboardProvideDataForType(sender, type) {
  }

  /**
   * Notifies a prior owner of the specified pasteboard (and owners of representations on the pasteboard) that the pasteboard has changed owners.
   * @access public
   * @param {NSPasteboard} sender - The pasteboard object whose owner changed.
   * @returns {void}
   * @desc Pasteboard owners only need to implement this method if they need to know when they have lost ownership.The owner is not able to read the contents of the pasteboard when responding to this method. The owner should be prepared to receive this method at any time, even from within the declareTypes(_:owner:) method used to declare ownership.Once an owner has provided all of its data for declared types, it will not receive a pasteboardChangedOwner: message. If, therefore, you are maintaining an object just for the purpose of providing data lazily, rather than relying solely on receipt of a pasteboardChangedOwner: message you need to keep track of what types were promised and what types have been provided. When all the types have been provided, you may release the owner.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1532824-pasteboardchangedowner
   */
  pasteboardChangedOwner(sender) {
  }

  /**
   * Sent to the delegate to perform the action.
   * @access public
   * @param {!ABPerson} person - The person on which the action will be taken.
   * @param {!string} identifier - The unique identifier of the selected value.
   * @returns {void}
   * @desc If the property returned by actionProperty() is a multivalue property, identifier contains the unique identifier of the value selected. The person being displayed in the Address Book application’s card view when the rollover menu is accesses is passed as person.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411298-performaction
   */
  performActionFor(person, identifier) {
  }

  /**
   * Called when a designable object is created in Interface Builder.
   * @access public
   * @returns {void}
   * @desc When Interface Builder instantiates a class with the IB_DESIGNABLE attribute, it calls this method to let the resulting object know that it was created at design time. You can implement this method in your designable classes and use it to configure their design-time appearance. For example, you might use the method to configure a custom text control with a default string. The system does not call this method; only Interface Builder calls it.Interface Builder waits until all objects in a graph have been created and initialized before calling this method. So if your object’s runtime configuration relies on subviews or parent views, those objects should exist by the time this method is called.Your implementation of this method must call super at some point so that parent classes can perform their own custom setup.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1402908-prepareforinterfacebuilder
   */
  prepareForInterfaceBuilder() {
  }

  /**
   * Supplies data to a CIImage object.
   * @access public
   * @param {Object} data - A pointer to image data. Note that data[0] refers to the first byte of the requested subimage, not the larger image buffer.
   * @param {number} rowbytes - The number of bytes per row.
   * @param {number} x - The x origin of the image data.
   * @param {number} y - The y origin of the image data.
   * @param {number} width - The width of the image data.
   * @param {number} height - The height of the image data.
   * @param {?Object} info - User supplied data, which is optional.
   * @returns {void}
   * @desc  You can supply the image provider to these methods of the CIImage class: imageWithImageProvider:size::format:colorSpace:options: to create a CIImage object from image datainit(imageProvider:size:_:format:colorSpace:options:) to initialize an existing CIImage with dataYou initialize the given bitmap with the subregion specified by the arguments x, y, width, and height. The subregion uses the local coordinate space of the image, with the origin at the upper-left corner of the image. If you change the virtual memory mapping of the buffer specified by the data argument (such as by using vm_copy to modify it), the behavior is undefined.That this callback always requests the full image data regardless of what is actually visible. All of the image is loaded or none of it is. The exception is when you create a tiled image by specifying the kCIImageProviderTileSize option. In this case, only the needed tiles are requested.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1438175-provideimagedata
   */
  provideImageDataBytesPerRowOriginSizeUserInfo(data, rowbytes, x, y, width, height, info) {
  }

  /**
   * 
   * @access public
   * @param {!QuartzFilterManager} sender - 
   * @param {!QuartzFilter} filter - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1504951-quartzfiltermanager
   */
  quartzFilterManagerDidAdd(sender, filter) {
  }

  /**
   * 
   * @access public
   * @param {!QuartzFilterManager} sender - 
   * @param {!QuartzFilter} filter - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503494-quartzfiltermanager
   */
  quartzFilterManagerDidModifyFilter(sender, filter) {
  }

  /**
   * 
   * @access public
   * @param {!QuartzFilterManager} sender - 
   * @param {!QuartzFilter} filter - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503483-quartzfiltermanager
   */
  quartzFilterManagerDidRemove(sender, filter) {
  }

  /**
   * 
   * @access public
   * @param {!QuartzFilterManager} sender - 
   * @param {!QuartzFilter} filter - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503484-quartzfiltermanager
   */
  quartzFilterManagerDidSelect(sender, filter) {
  }

  /**
   * 
   * @access public
   * @param {!Object} controller - 
   * @param {!IOBluetoothDevice} device - 
   * @param {!UnsafeMutablePointer<BluetoothHCILinkQualityInfo>} info - 
   * @param {IOReturn} error - 
   * @returns {void}
   * @desc This delegate gets invoked when an read link quality command complete event occurs. This could occur because you invoked it by issuing an -readLinkQualityForDevice: command, or someone else did from another app on the same controller.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1430075-readlinkquality
   */
  readLinkQualityForDeviceComplete(controller, device, info, error) {
  }

  /**
   * 
   * @access public
   * @param {!Object} controller - 
   * @param {!IOBluetoothDevice} device - 
   * @param {!UnsafeMutablePointer<BluetoothHCIRSSIInfo>} info - 
   * @param {IOReturn} error - 
   * @returns {void}
   * @desc This delegate gets invoked when an RSSI command complete event occurs. This could occur because you invoked it by issuing an -readRSSIForDevice: command, or someone else did from another app on the same controller.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1428399-readrssi
   */
  readRSSIForDeviceComplete(controller, device, info, error) {
  }

  /**
   * Removes the object at the specified index from the collection specified by the passed key.
   * @access public
   * @param {number} index - 
   * @param {string} key - 
   * @returns {void}
   * @desc  The method removeFrom<Key>AtIndex: is invoked if it exists. If no corresponding scripting-KVC-compliant method (-removeFrom<Key>AtIndex:) is found, this method invokes -mutableArrayValueForKey: and mutates the result.Note Prior to OS X version 10.4, this method did not invoke -mutableArrayValueForKey:.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1408773-removevalue
   */
  removeValueAtFromPropertyWithKey(index, key) {
  }

  /**
   * Replaces the object at the specified index in the collection specified by the passed key.
   * @access public
   * @param {number} index - 
   * @param {string} key - 
   * @param {Object} value - 
   * @returns {void}
   * @desc  The method replaceIn<Key>:atIndex: is invoked if it exists. If no corresponding scripting-KVC-compliant method (-replaceIn<Key>atIndex:) is found, this method invokes -mutableArrayValueForKey: and mutates the result.Note Prior to OS X version 10.4, this method did not invoke -mutableArrayValueForKey:.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411225-replacevalue
   */
  replaceValueAtInPropertyWithKeyWithValue(index, key, value) {
  }

  /**
   * Called to determine if the specified uniform type identifier should be shown in the save panel.
   * @access public
   * @param {!IKSaveOptions} saveOptions - The IKSaveOptions instance that called the delegate.
   * @param {!string} utType - The uniform type identifier to test.
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1503501-saveoptions
   */
  saveOptionsShouldShowUTType(saveOptions, utType) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object matches the beginning of object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393858-scriptingbegins
   */
  scriptingBeginsWith(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object contains object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393821-scriptingcontains
   */
  scriptingContains(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object matches the end of object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393819-scriptingends
   */
  scriptingEndsWith(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object is equal to object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393835-scriptingisequal
   */
  scriptingIsEqualTo(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object is greater than object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393831-scriptingisgreaterthan
   */
  scriptingIsGreaterThan(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object is greater than or equal to object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393829-scriptingisgreaterthanorequal
   */
  scriptingIsGreaterThanOrEqualTo(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object is less than object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393887-scriptingislessthan
   */
  scriptingIsLessThan(object) {
    return false
  }

  /**
   * Returns true if, in a scripting comparison, the compared object is less than or equal to object. A default implementation is provided for NSString and NSAttributedString.
   * @access public
   * @param {Object} object - 
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1393825-scriptingislessthanorequal
   */
  scriptingIsLessThanOrEqualTo(object) {
    return false
  }

  /**
   * Sent to the delegate to determine whether the action should be enabled.
   * @access public
   * @param {!ABPerson} person - The person on which the action will be taken.
   * @param {!string} identifier - The unique identifier of the selected value.
   * @returns {boolean} - 
   * @desc If the property returned by actionProperty() is a multivalue property, identifier contains the unique identifier of the value selected.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411300-shouldenableaction
   */
  shouldEnableActionFor(person, identifier) {
    return false
  }

  /**
   * 
   * @deprecated
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1532645-textstoragedidprocessediting
   */
  textStorageDidProcessEditing(notification) {
  }

  /**
   * 
   * @deprecated
   * @access public
   * @param {Notification} notification - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1533957-textstoragewillprocessediting
   */
  textStorageWillProcessEditing(notification) {
  }

  /**
   * Sent to the delegate to request the title of the menu item for the action.
   * @access public
   * @param {!ABPerson} person - The person on which the action will be taken.
   * @param {!string} identifier - The unique identifier of the value for which the menu item will be displayed.
   * @returns {!string} - 
   * @desc If the property returned by actionProperty() is a multivalue property, identifier contains the unique identifier of the value selected.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1411304-title
   */
  titleFor(person, identifier) {
    return null
  }

  /**
   * Removes a given binding between the receiver and a controller.
   * @access public
   * @param {string} binding - The name of a binding.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458088-unbind
   */
  unbind(binding) {
  }

  /**
   * Returns the mode mask corresponding to the expected font panel mode.
   * @access public
   * @param {NSFontPanel} fontPanel - 
   * @returns {number} - 
   * @desc The mode masks are defined in Mode Masks. The Font Panel has the ability to hide elements that are not applicable for a given context by having the target respond to validModesForFontPanel(_:). If the target desires a font panel mode other than the standard mode mask, it must respond to this method.This message is sent up the responder chain to the first responder implementing the method. Ideally that object should be the first responder found that also implements changeFont(_:).
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1534415-validmodesforfontpanel
   */
  validModesForFontPanel(fontPanel) {
    return 0
  }

  /**
   * Implemented to override the default action of enabling or disabling a specific menu item.
   * @access public
   * @param {NSMenuItem} menuItem - An NSMenuItem object that represents the menu item.
   * @returns {boolean} - 
   * @desc The object implementing this method must be the target of menuItem. You can determine which menu item menuItem is by querying it for its tag or action. The following example disables the menu item associated with the nextRecord action method when the selected line in a table view is the last one; conversely, it disables the menu item with priorRecord as its action method when the selected row is the first one in the table view. (The countryKeys array contains names that appear in the table view.)- (BOOL)validateMenuItem:(NSMenuItem *)item {
    int row = [tableView selectedRow];
    if ([item action] == @selector(nextRecord) &&
        (row == [countryKeys indexOfObject:[countryKeys lastObject]])) {
        return NO;
    }
    if ([item action] == @selector(priorRecord) && row == 0) {
        return NO;
    }
    return YES;
}
- (BOOL)validateMenuItem:(NSMenuItem *)item {
    int row = [tableView selectedRow];
    if ([item action] == @selector(nextRecord) &&
        (row == [countryKeys indexOfObject:[countryKeys lastObject]])) {
        return NO;
    }
    if ([item action] == @selector(priorRecord) && row == 0) {
        return NO;
    }
    return YES;
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1518160-validatemenuitem
   */
  validateMenuItem(menuItem) {
    return false
  }

  /**
   * If this method is implemented and returns false, NSToolbar will disable theItem; returning true causes theItem to be enabled.
   * @access public
   * @param {NSToolbarItem} item - 
   * @returns {boolean} - 
   * @desc NSToolbar only calls this method for image items.Note
validateToolbarItem(_:) is called very frequently, so it must be efficient.If the receiver is the target for the actions of multiple toolbar items, it’s necessary to determine which toolbar item theItem refers to by testing the itemIdentifier.-(BOOL)validateToolbarItem:(NSToolbarItem *)toolbarItem
{
    BOOL enable = NO;
    if ([[toolbarItem itemIdentifier] isEqual:SaveDocToolbarItemIdentifier]) {
        // We will return YES (enable the save item)
        // only when the document is dirty and needs saving
        enable = [self isDocumentEdited];
    } else if ([[toolbarItem itemIdentifier] isEqual:NSToolbarPrintItemIdentifier]) {
        // always enable print for this window
        enable = YES;
    }
    return enable;
}
-(BOOL)validateToolbarItem:(NSToolbarItem *)toolbarItem
{
    BOOL enable = NO;
    if ([[toolbarItem itemIdentifier] isEqual:SaveDocToolbarItemIdentifier]) {
        // We will return YES (enable the save item)
        // only when the document is dirty and needs saving
        enable = [self isDocumentEdited];
    } else if ([[toolbarItem itemIdentifier] isEqual:NSToolbarPrintItemIdentifier]) {
        // always enable print for this window
        enable = YES;
    }
    return enable;
}

   * @see https://developer.apple.com/documentation/objectivec/nsobject/1524282-validatetoolbaritem
   */
  validateToolbarItem(item) {
    return false
  }

  /**
   * Retrieves an indexed object from the collection specified by the passed key.
   * @access public
   * @param {number} index - 
   * @param {string} key - 
   * @returns {?Object} - 
   * @desc  This actually works with a single-value key as well if index is 0. The method valueIn<Key>AtIndex: is used if it exists.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1407605-value
   */
  valueAtInPropertyWithKey(index, key) {
    return null
  }

  /**
   * Returns the class of the value that will be returned for the specified binding.
   * @access public
   * @param {string} binding - The name of a binding.
   * @returns {?Object} - 
   * @desc This method is used by Interface Builder to determine the appropriate transformers for a binding. Implementation of this method is optional.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458101-valueclassforbinding
   */
  valueClassForBinding(binding) {
    return null
  }

  /**
   * Retrieves a named object from the collection specified by the passed key.
   * @access public
   * @param {string} name - 
   * @param {string} key - 
   * @returns {?Object} - 
   * @desc  The method valueIn<Key>WithName: is used if it exists. Otherwise, raises an NSUndefinedKeyException.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418031-value
   */
  valueWithNameInPropertyWithKey(name, key) {
    return null
  }

  /**
   * Retrieves an object by ID from the collection specified by the passed key.
   * @access public
   * @param {Object} uniqueID - 
   * @param {string} key - 
   * @returns {?Object} - 
   * @desc  The method valueIn<Key>WithUniqueID: is invoked if it exists. Otherwise, raises an NSUndefinedKeyException. The declared type of uniqueID in the constructed method must be id, NSNumber *, NSString *, or one of the scalar types that can be encapsulated by NSNumber.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1407321-value
   */
  valueWithUniqueIDInPropertyWithKey(uniqueID, key) {
    return null
  }

  /**
   * Returns the tool tip string to be displayed due to the cursor pausing at location point within the tool tip rectangle identified by tag in the view view.
   * @access public
   * @param {NSView} view - 
   * @param {NSToolTipTag} tag - 
   * @param {CGPoint} point - 
   * @param {?Object} data - 
   * @returns {string} - 
   * @desc  userData is additional information provided by the creator of the tool tip rectangle.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1483693-view
   */
  viewStringForToolTipUserData(view, tag, point, data) {
    return ''
  }

  /**
   * Loads a URL into a web frame.
   * @access public
   * @param {!URLRequest} request - The request that specifies the URL.
   * @param {!string} target - The frame into which the URL is loaded.
   * @returns {void}
   * @desc If the frame specified by target is not found, a new window is opened, loaded with the URL request, and given the specified frame name. If target is nil, the frame enclosing the plug-in is loaded with the URL request.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536649-webplugincontainerload
   */
  webPlugInContainerLoadInFrame(request, target) {
  }

  /**
   * Tells the container to show a status message.
   * @access public
   * @param {!string} message - The status message to be displayed.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1537604-webplugincontainershowstatus
   */
  webPlugInContainerShowStatus(message) {
  }

  /**
   * Prepares the plug-in for deallocation.
   * @access public
   * @returns {void}
   * @desc Typically, this method frees the memory and other resources used by the plug-in. For example, if the plug-in had a copy of a WebPlugInContainer object, this method should relinquish ownership of that object. Do not send any other messages to the plug-in after invoking this method, because calling this method destroys the plug-in. No other methods in this interface may be called after the application has called this method.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536659-webplugindestroy
   */
  webPlugInDestroy() {
  }

  /**
   * Initializes the plug-in.
   * @access public
   * @returns {void}
   * @desc Tells the plug-in to perform one-time initialization. This method must be called only once per instance of the plug-in object, before any other methods in the protocol are called.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1537623-webplugininitialize
   */
  webPlugInInitialize() {
  }

  /**
   * Invoked when an error occurs loading the main resource.
   * @access public
   * @param {!Error} error - An error object containing details of why the connection failed to load the request successfully.
   * @returns {void}
   * @desc This message is invoked when the underlying NSURLConnection object for the main resource sends the connection:didFailWithError: message to its delegate.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536829-webpluginmainresourcedidfailwith
   */
  webPlugInMainResourceDidFailWithError(error) {
  }

  /**
   * Invoked when the connection successfully finishes loading data.
   * @access public
   * @returns {void}
   * @desc This message is invoked when the WebPlugInShouldLoadMainResourceKey plug-in command-line argument is set to false and the underlying NSURLConnection object for the main resource sends the connectionDidFinishLoading: message to its delegate.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1537693-webpluginmainresourcedidfinishlo
   */
  webPlugInMainResourceDidFinishLoading() {
  }

  /**
   * Invoked when the connection receives sufficient data to construct the URL response for its request.
   * @access public
   * @param {!URLResponse} response - The URL response for the connection's request.
   * @returns {void}
   * @desc This message is invoked when the WebPlugInShouldLoadMainResourceKey plug-in command-line argument is set to false and the underlying NSURLConnection object for the main resource sends the connection:didReceiveResponse: message to its delegate.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1537895-webpluginmainresourcedidreceive
   */
  webPlugInMainResourceDidReceive(response) {
  }

  /**
   * Controls plug-in behavior based on its selection.
   * @access public
   * @param {boolean} isSelected - If true, the plug-in is currently selected. Otherwise, it is not selected.
   * @returns {void}
   * @desc This may be used, for example, to change the plug-in’s appearance when it is selected by the user.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536477-webpluginsetisselected
   */
  webPlugInSetIsSelected(isSelected) {
  }

  /**
   * Tells the plug-in to start normal operation.
   * @access public
   * @returns {void}
   * @desc The plug-in usually begins its primary task (such as drawing, playing sounds, or animating) in this method. This method may be called more than once, provided that the application has already called webPlugInInitialize() and that each call to this method is followed later by a call to webPlugInStop().
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536197-webpluginstart
   */
  webPlugInStart() {
  }

  /**
   * Tells the plug-in to stop normal operation.
   * @access public
   * @returns {void}
   * @desc This method may be called more than once, provided that the application has already called webPlugInInitialize() and that each call to this method is preceded by a call to webPlugInStart().
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1536433-webpluginstop
   */
  webPlugInStop() {
  }

  /**
   * Invoked when the receiver's workflow encounters an error.
   * @access public
   * @param {AMWorkflowController} controller - The controller object sending the message.
   * @param {Error} error - If a workflow error occurs, upon return contains an instance of NSError that describes the problem.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1419652-workflowcontroller
   */
  workflowControllerDidError(controller, error) {
  }

  /**
   * Invoked when an action in the receiver's workflow is finished running.
   * @access public
   * @param {AMWorkflowController} controller - The controller object sending the message.
   * @param {AMAction} action - The workflow action that ran.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1419675-workflowcontroller
   */
  workflowControllerDidRun(controller, action) {
  }

  /**
   * Invoked when an action in the receiver's workflow is about to run.
   * @access public
   * @param {AMWorkflowController} controller - The controller object sending the message.
   * @param {AMAction} action - The workflow action that will run.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1419720-workflowcontroller
   */
  workflowControllerWillRun(controller, action) {
  }

  /**
   * Tells the delegate that the workflow controller object has stopped.
   * @access public
   * @param {AMWorkflowController} controller - The workflow controller object that stopped.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1419770-workflowcontrollerdidstop
   */
  workflowControllerDidStop(controller) {
  }

  /**
   * Tells the delegate that the workflow controller object is about to stop.
   * @access public
   * @param {AMWorkflowController} controller - The workflow controller object to be stopped.
   * @returns {void}
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1419598-workflowcontrollerwillstop
   */
  workflowControllerWillStop(controller) {
  }

  /**
   * Tells the element to activate itself and report the success or failure of the operation.
   * @access public
   * @returns {boolean} - 
   * @desc You can use this method to make complex controls more readily accessible to users. The accessibility system calls this method when a VoiceOver user double taps the selected element. Your implementation of this method should activate the element and perform whatever other tasks it deems appropriate. For example, you might use the method to activate a control that requires a complex gesture and would be difficult for VoiceOver users to perform, possibly because the gesture has a different meaning when VoiceOver is running.After performing any tasks, return an appropriate Boolean value to indicate success or failure.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615165-accessibilityactivate
   */
  accessibilityActivate() {
    return false
  }

  /**
   * 
   * @access public
   * @returns {?Set<String>} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615206-accessibilityassistivetechnology
   */
  accessibilityAssistiveTechnologyFocusedIdentifiers() {
    return null
  }

  /**
   * Tells the accessibility element to decrement the value of its content.
   * @access public
   * @returns {void}
   * @desc If your element has the UIAccessibilityTraitAdjustable trait, you must implement this method. Use this method to decrement the value of the element. For example, a UISlider object uses this method to decrement its value by an appropriate amount. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615169-accessibilitydecrement
   */
  accessibilityDecrement() {
  }

  /**
   * Returns the accessibility element at the specified index.
   * @access public
   * @param {number} index - The index of the accessibility element.
   * @returns {?Object} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615084-accessibilityelement
   */
  accessibilityElementAt(index) {
    return null
  }

  /**
   * Returns the number of accessibility elements in the container.
   * @access public
   * @returns {number} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615149-accessibilityelementcount
   */
  accessibilityElementCount() {
    return 0
  }

  /**
   * Sent after an assistive technology has set its virtual focus on the accessibility element.
   * @access public
   * @returns {void}
   * @desc Override accessibilityElementDidBecomeFocused if you need to know when an assistive technology has set its virtual focus on an accessibility element.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615183-accessibilityelementdidbecomefoc
   */
  accessibilityElementDidBecomeFocused() {
  }

  /**
   * Sent after an assistive technology has removed its virtual focus from an accessibility element.
   * @access public
   * @returns {void}
   * @desc Override accessibilityElementDidLoseFocus if you need to know when an assistive technology has removed its virtual focus from an accessibility element. Note that accessibilityElementDidLoseFocus is sent before accessibilityElementDidBecomeFocused().
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615082-accessibilityelementdidlosefocus
   */
  accessibilityElementDidLoseFocus() {
  }

  /**
   * Returns a Boolean value indicating whether an assistive technology is focused on the accessibility element.
   * @access public
   * @returns {boolean} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615190-accessibilityelementisfocused
   */
  accessibilityElementIsFocused() {
    return false
  }

  /**
   * Tells the accessibility element to increment the value of its content.
   * @access public
   * @returns {void}
   * @desc If your element has the UIAccessibilityTraitAdjustable trait, you must implement this method. Use this method to increment the value of the element. For example, a UISlider object uses this method to increment its value by an appropriate amount. 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615076-accessibilityincrement
   */
  accessibilityIncrement() {
  }

  /**
   * Dismisses a modal view and returns the success or failure of the action.
   * @access public
   * @returns {boolean} - 
   * @desc Implement this method on an element or containing view that can be revealed modally or in a hierarchy. When a VoiceOver user performs a dismiss action, this method dismisses the view. For example, you might implement this method for a popover in order to give users a deliberate dismiss action to perform that closes the popover.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615091-accessibilityperformescape
   */
  accessibilityPerformEscape() {
    return false
  }

  /**
   * Performs a salient action.
   * @access public
   * @returns {boolean} - 
   * @desc The exact action performed by this method depends your app, typically toggling the most important state of the app. For example, in the Phone app it answers and ends phone calls, in the Music app it plays and pauses playback, in the Clock app it starts and stops a timer, and in the Camera app it takes a picture.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615137-accessibilityperformmagictap
   */
  accessibilityPerformMagicTap() {
    return false
  }

  /**
   * Scrolls screen content in an application-specific way and returns the success or failure of the action.
   * @access public
   * @param {UIAccessibilityScrollDirection} direction - A constant that specifies the direction of the scrolling action. See UIAccessibilityScrollDirection for descriptions of valid constants.
   * @returns {boolean} - 
   * @desc Implement this method if a view in the view hierarchy supports a scroll by page action.If the scrolling action succeeds for the specified direction, return true and post the UIAccessibilityPageScrolledNotification notification. If the scrolling action fails, accessibilityScroll: is called on a parent view in the hierarchy.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615161-accessibilityscroll
   */
  accessibilityScroll(direction) {
    return false
  }

  /**
   * Returns the index of the specified accessibility element.
   * @access public
   * @param {Object} element - The accessibility element.
   * @returns {number} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1615078-index
   */
  indexOfAccessibilityElement(element) {
    return 0
  }

  // Type Methods

  /**
   * Returns a Boolean value that indicates whether the observed object supports automatic key-value observation for the given key.
   * @access public
   * @param {string} key - 
   * @returns {boolean} - 
   * @desc The default implementation returns true. Starting in OS X 10.5, the default implementation of this method searches the receiving class for a method whose name matches the pattern +automaticallyNotifiesObserversOf<Key>, and returns the result of invoking that method if it is found. Any found methods must return BOOL. If no such method is found true is returned.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1409370-automaticallynotifiesobservers
   */
  static automaticallyNotifiesObserversForKey(key) {
    return false
  }

  /**
   * 
   * @access public
   * @returns {string} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418711-debugdescription
   */
  static debugDescription() {
    return ''
  }

  /**
   * 
   * @access public
   * @returns {number} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1418561-hash
   */
  static hash() {
    return 0
  }

  /**
   * Returns a set of key paths for properties whose values affect the value of the specified key.
   * @access public
   * @param {string} key - The key whose value is affected by the key paths.
   * @returns {Set<String>} - 
   * @desc When an observer for the key is registered with an instance of the receiving class, key-value observing itself automatically observes all of the key paths for the same instance, and sends change notifications for the key to the observer when the value for any of those key paths changes.The default implementation of this method searches the receiving class for a method whose name matches the pattern +keyPathsForValuesAffecting<Key>, and returns the result of invoking that method if it is found. Any such method must return an NSSet. If no such method is found, an NSSet that is computed from information provided by previous invocations of the now-deprecated setKeys:triggerChangeNotificationsForDependentKey: method is returned, for backward binary compatibility.You can override this method when the getter method of one of your properties computes a value to return using the values of other properties, including those that are located by key paths. Your override should typically call super and return a set that includes any members in the set that result from doing that (so as not to interfere with overrides of this method in superclasses).NoteYou must not override this method when you add a computed property to an existing class using a category, overriding methods in categories is unsupported. In that case, implement a matching +keyPathsForValuesAffecting<Key> to take advantage of this mechanism.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1414299-keypathsforvaluesaffectingvalue
   */
  static keyPathsForValuesAffectingValueForKey(key) {
    return null
  }

  /**
   * Returns an object that will be used as the placeholder for the binding, when a key value coding compliant property of an instance of the receiving class returns the value specified by marker, and no other placeholder has been specified. 
   * @access public
   * @param {?Object} marker - 
   * @param {string} binding - 
   * @returns {?Object} - 
   * @desc The marker can be nil or one of the constants described in Selection Markers.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458203-defaultplaceholder
   */
  static defaultPlaceholderForMarkerWithBinding(marker, binding) {
    return null
  }

  /**
   * Exposes the specified binding, advertising its availability. 
   * @access public
   * @param {string} binding - The key path for the property to be exposed.
   * @returns {void}
   * @desc The bound property will be accessed using key-value-coding compliant methods. This method is typically invoked in the class’s initialize implementation.Bindings exposed using exposeBinding will be exposed automatically in exposedBindings unless that method explicitly filters them out, for example in subclasses.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458184-exposebinding
   */
  static exposeBinding(binding) {
  }

  /**
   * Returns whether a key should be hidden from the scripting environment.
   * @access public
   * @param {!UnsafePointer<Int8>} name - The name of the attribute.
   * @returns {boolean} - 
   * @desc The default value is true.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528545-iskeyexcluded
   */
  static isKeyExcludedFromWebScript(name) {
    return false
  }

  /**
   * Returns whether a selector should be hidden from the scripting environment.
   * @access public
   * @param {!function} selector - 
   * @returns {boolean} - 
   * @desc Only methods with valid parameters and return types are exported to the WebKit JavaScript environment. The valid types are Objective-C objects and scalars. The default value is true.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528532-isselectorexcluded
   */
  static isSelectorExcludedFromWebScript(selector) {
    return false
  }

  /**
   * Sets placeholder as the default placeholder for the binding, when a key value coding compliant property of an instance of the receiving class returns the value specified by marker, and no other placeholder has been specified.
   * @access public
   * @param {?Object} placeholder - 
   * @param {?Object} marker - 
   * @param {string} binding - 
   * @returns {void}
   * @desc The marker can be nil or one of the constants described in Selection Markers.
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1458194-setdefaultplaceholder
   */
  static setDefaultPlaceholderForMarkerWithBinding(placeholder, marker, binding) {
  }

  /**
   * Returns the scripting environment name for an attribute specified by a key.
   * @access public
   * @param {!UnsafePointer<Int8>} name - The name of the attribute.
   * @returns {!string} - 
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528541-webscriptname
   */
  static webScriptNameForKey(name) {
    return null
  }

  /**
   * Returns the scripting environment name for a selector.
   * @access public
   * @param {!function} selector - 
   * @returns {!string} - 
   * @desc It is your responsibility to ensure that the returned name is unique to the script invoking this method. If this method returns nil or you do not implement it, the default name for the selector is constructed as follows: A colon (“:”) in the Objective-C selector is replaced by an underscore (“_”).An underscore in the Objective-C selector is prefixed with a dollar sign (“$”).A dollar sign in the Objective-C selector is prefixed with another dollar sign.The following table shows examples of how the default name is constructed:Objective-C selectorDefault script name for selectorsetFlag:setFlag_setFlag:forKey:withAttributes:setFlag_forKey_withAttributes_propertiesForExample_Object:propertiesForExample$_Object_set_$_forKey:withDictionary:set$_$$_$_forKey_withDictionary_Since the default construction for a method name can be confusing depending on its Objective-C name, you should implement this method and return a more human-readable name.Objective-C selectorDefault script name for selectorsetFlag:setFlag_setFlag:forKey:withAttributes:setFlag_forKey_withAttributes_propertiesForExample_Object:propertiesForExample$_Object_set_$_forKey:withDictionary:set$_$$_$_forKey_withDictionary_
   * @see https://developer.apple.com/documentation/objectivec/nsobject/1528539-webscriptname
   */
  static webScriptNameFor(selector) {
    return null
  }

  static get supportsSecureCoding() {
    return true
  }

  static initWithCoder(coder) {
    //console.log('initWithCoder: ' + this.className)
    let propTypes = {}

    // check if all property names are registered
    for(const key of Object.keys(coder._refObj)){
      if(key.charAt(0) === '$'){
        continue
      }
      if(typeof this._propTypes[key] === 'undefined'){
        //console.warn(`unknown key ${key}`)
        if(this._propTypes.$unknownKey && this._propTypes.$unknownKey(key) !== null){
          propTypes[key] = this._propTypes.$unknownKey(key)
          //console.warn(`unknown key: ${key} => ${propTypes[key]}`)
        }else{
          console.error(`${this.className}: property ${key} not registered`)
          throw new Error(`${this.className}: property ${key} not registered`)
        }
      }else{
        propTypes[key] = this._propTypes[key]
      }
    }

    const props = this._loadProperties(coder, propTypes)
    const propNames = props.names
    const propValues = props.values
    
    let instance = null
    if(typeof this._propTypes.$constructor === 'function'){
      instance = this._propTypes.$constructor(propNames, propValues, coder)
    }else{
      instance = new this()
    }

    this._setProperties(instance, propNames, propValues, coder)
    
    return instance
  }

  /**
   * @access private
   * @param {NSCoder} coder -
   * @returns {Object} -
   */
  static _loadProperties(coder, propTypes) {
    const propNames = {}
    const propValues = {}

    for(const key of Object.keys(propTypes)){
      //console.log(`key: ${key}`)
      if(!coder.containsValueForKey(key)){
        console.log(`!coder.containsValueForKey ${key}`)
        continue
      }
      const def = propTypes[key]
      let type = ''
      let propName = key
      if(typeof def === 'string'){
        type = def
      }else if(Array.isArray(def)){
        type = def[0]
        if(def.length >= 2){
          propName = def[1]
        }
      }

      //console.log(`type: ${type}, propName: ${propName}`)
      let value = null
      switch(type){
        case 'boolean':
          value = coder.decodeBoolForKey(key)
          break
        case 'bytes':
          value = coder.decodeBytesForKeyReturnedLength(key, null)
          break
        case 'double':
          value = coder.decodeDoubleForKey(key)
          break
        case 'float':
          value = coder.decodeFloatForKey(key)
          break
        case 'integer':
          value = coder.decodeCIntForKey(key)
          break
        case 'int32':
          value = coder.decodeInt32ForKey(key)
          break
        case 'int64':
          value = coder.decodeInt64ForKey(key)
          break
        case 'point':
          value = coder.decodePointForKey(key)
          break
        case 'rect':
          value = coder.decodeRectForKey(key)
          break
        case 'size':
          value = coder.decodeSizeForKey(key)
          break
        case 'plist':
          value = coder.decodePropertyListForKey(key)
          break
        case 'string':
          value = coder.decodeObjectForKey(key)
          if(typeof value !== 'string'){
            //console.error(`${key}: value is not String type`)
            throw new Error(`${key}: value is not String type`)
          }
          break
        default: {
          const classObj = _ClassList.get(type)
          if(typeof classObj === 'undefined'){
            //console.error(`unknown class name: ${type}`)
            throw new Error(`unknown class name: ${type}`)
          }
          if(coder._refObj[key] instanceof Buffer){
            value = coder.decodeObjectOfTypeForKey(classObj, key)
            if(!(value instanceof classObj)){
              //console.error(`${key}: value is not an instance of ${type}`)
              throw new Error(`${key}: value is not an instance of ${type}`)
            }
          }else{
            value = coder.decodeObjectForKey(key)
            if(value === '$null'){
              value = null
            }else if(value instanceof Promise){
              // wait for loading
            }else if(!(value instanceof classObj)){
              const exception = [
                'NSData', 'NSMutableData', // => Buffer
                'NSArray', 'NSMutableArray', // => Array
                'NSDictionary', 'NSMutableDictionary', // => Object
                'NSColor', // => SKColor
                'NSURL' // => String
              ]
              if(exception.indexOf(classObj.className) < 0){
                //console.error(`${key}: value is not an instance of ${type}`)
                throw new Error(`${key}: value is not an instance of ${type}`)
              }
            }
          }
        }
      }
      //if(Array.isArray(value)){
      //  console.log(`value: Array[${value.length}]`)
      //}else if(typeof value === 'symbol'){
      //  console.log('value: Symbol()')
      //}else{
      //  console.log(`value: ${value}`)
      //}
      
      propValues[key] = value
      propNames[key] = propName
    }

    return { names: propNames, values: propValues }
  }

  /**
   * @access private
   * @param {Object} instance -
   * @param {string[]} propNames -
   * @param {Object[]} propValues -
   * @param {NSCoder} coder -
   * @returns {void}
   */
  static _setProperties(instance, propNames, propValues, coder) {
    for(const key of Object.keys(propValues)){
      this._setProperty(instance, propNames[key], propValues[key], key, coder)
    }
  }

  /**
   * @access private
   * @param {Object} instance -
   * @param {string[]} propName -
   * @param {Object[]} propValue -
   * @param {string} key -
   * @param {NSCoder} coder -
   * @returns {void}
   */
  static _setProperty(instance, propName, propValue, key, coder) {
    if(propValue instanceof Promise){
      propValue.then((loadedValue) => {
        this._setProperty(instance, propName, loadedValue, key, coder)
      })
    }else if(typeof propName === 'function'){
      propName(instance, propValue, key, coder)
    }else if(propName !== null){
      instance[propName] = propValue
    }
  }

  _destroy() {
    if(this._destroyed){
      throw new Error('_destroy() called twice')
    }
    this._destroyed = true
    this._execDestroy()
  }

  _execDestroy() {
    // destroy objects
  }
}
