'use strict'

import NSObject from '../ObjectiveC/NSObject'

const _Name = {
  AVAudioEngineConfigurationChange: Symbol(),
  AVAudioSessionInterruption: Symbol(),
  AVAudioSessionMediaServicesWereLost: Symbol(),
  AVAudioSessionMediaServicesWereReset: Symbol(),
  AVAudioSessionRouteChange: Symbol(),
  AVAudioSessionSilenceSecondaryAudioHint: Symbol(),
  AVAudioUnitComponentTagsDidChange: Symbol(),
  CKAccountChanged: Symbol(),
  CLKComplicationServerActiveComplicationsDidChange: Symbol(),
  CNContactStoreDidChange: Symbol(),
  EKEventStoreChanged: Symbol(),
  HKUserPreferencesDidChange: Symbol(),
  HMCharacteristicPropertySupportsEvent: Symbol(),
  NSBundleResourceRequestLowDiskSpace: Symbol(),
  NSCalendarDayChanged: Symbol(),
  NSDidBecomeSingleThreaded: Symbol(),
  NSExtensionHostDidBecomeActive: Symbol(),
  NSExtensionHostDidEnterBackground: Symbol(),
  NSExtensionHostWillEnterForeground: Symbol(),
  NSExtensionHostWillResignActive: Symbol(),
  NSFileHandleConnectionAccepted: Symbol(),
  NSFileHandleDataAvailable: Symbol(),
  NSFileHandleReadToEndOfFileCompletion: Symbol(),
  NSHTTPCookieManagerAcceptPolicyChanged: Symbol(),
  NSHTTPCookieManagerCookiesChanged: Symbol(),
  NSManagedObjectContextDidSave: Symbol(),
  NSManagedObjectContextObjectsDidChange: Symbol(),
  NSManagedObjectContextWillSave: Symbol(),
  NSMetadataQueryDidFinishGathering: Symbol(),
  NSMetadataQueryDidStartGathering: Symbol(),
  NSMetadataQueryDidUpdate: Symbol(),
  NSMetadataQueryGatheringProgress: Symbol(),
  NSPersistentStoreCoordinatorStoresDidChange: Symbol(),
  NSPersistentStoreCoordinatorStoresWillChange: Symbol(),
  NSPersistentStoreCoordinatorWillRemoveStore: Symbol(),
  NSProcessInfoPowerStateDidChange: Symbol(),
  NSSystemClockDidChange: Symbol(),
  NSSystemTimeZoneDidChange: Symbol(),
  NSThreadWillExit: Symbol(),
  NSURLCredentialStorageChanged: Symbol(),
  NSUbiquityIdentityDidChange: Symbol(),
  NSUndoManagerCheckpoint: Symbol(),
  NSUndoManagerDidCloseUndoGroup: Symbol(),
  NSUndoManagerDidOpenUndoGroup: Symbol(),
  NSUndoManagerDidRedoChange: Symbol(),
  NSUndoManagerDidUndoChange: Symbol(),
  NSUndoManagerWillCloseUndoGroup: Symbol(),
  NSUndoManagerWillRedoChange: Symbol(),
  NSUndoManagerWillUndoChange: Symbol(),
  NSWillBecomeMultiThreaded: Symbol(),
  PKPassLibraryDidChange: Symbol(),
  PKPassLibraryRemotePaymentPassesDidChange: Symbol(),
  UIAccessibilityAnnouncementDidFinish: Symbol(),
  UIAccessibilityElementFocused: Symbol(),
  WKAudioFilePlayerItemDidPlayToEndTime: Symbol(),
  WKAudioFilePlayerItemFailedToPlayToEndTime: Symbol(),
  WKAudioFilePlayerItemTimeJumped: Symbol(),
  ABPeoplePickerDisplayedPropertyDidChange: Symbol(),
  ABPeoplePickerGroupSelectionDidChange: Symbol(),
  ABPeoplePickerNameSelectionDidChange: Symbol(),
  ABPeoplePickerValueSelectionDidChange: Symbol(),
  ACAccountStoreDidChange: Symbol(),
  AVAssetChapterMetadataGroupsDidChange: Symbol(),
  AVAssetContainsFragmentsDidChange: Symbol(),
  AVAssetDurationDidChange: Symbol(),
  AVAssetMediaSelectionGroupsDidChange: Symbol(),
  AVAssetTrackSegmentsDidChange: Symbol(),
  AVAssetTrackTimeRangeDidChange: Symbol(),
  AVAssetTrackTrackAssociationsDidChange: Symbol(),
  AVAssetWasDefragmented: Symbol(),
  AVCaptureDeviceWasConnected: Symbol(),
  AVCaptureDeviceWasDisconnected: Symbol(),
  AVCaptureInputPortFormatDescriptionDidChange: Symbol(),
  AVCaptureSessionDidStartRunning: Symbol(),
  AVCaptureSessionDidStopRunning: Symbol(),
  AVCaptureSessionRuntimeError: Symbol(),
  AVFragmentedMovieContainsMovieFragmentsDidChange: Symbol(),
  AVFragmentedMovieDurationDidChange: Symbol(),
  AVFragmentedMovieTrackSegmentsDidChange: Symbol(),
  AVFragmentedMovieTrackTimeRangeDidChange: Symbol(),
  AVFragmentedMovieTrackTotalSampleDataLengthDidChange: Symbol(),
  AVFragmentedMovieWasDefragmented: Symbol(),
  AVPlayerItemDidPlayToEndTime: Symbol(),
  AVPlayerItemFailedToPlayToEndTime: Symbol(),
  AVPlayerItemNewAccessLogEntry: Symbol(),
  AVPlayerItemNewErrorLogEntry: Symbol(),
  AVPlayerItemPlaybackStalled: Symbol(),
  AVPlayerItemTimeJumped: Symbol(),
  AVSampleBufferDisplayLayerFailedToDecode: Symbol(),
  CWBSSIDDidChange: Symbol(),
  CWCountryCodeDidChange: Symbol(),
  CWLinkDidChange: Symbol(),
  CWLinkQualityDidChange: Symbol(),
  CWModeDidChange: Symbol(),
  CWPowerDidChange: Symbol(),
  CWSSIDDidChange: Symbol(),
  CWScanCacheDidUpdate: Symbol(),
  GCControllerDidConnect: Symbol(),
  GCControllerDidDisconnect: Symbol(),
  IKFilterBrowserFilterDoubleClick: Symbol(),
  IKFilterBrowserFilterSelected: Symbol(),
  IKFilterBrowserWillPreviewFilter: Symbol(),
  IOBluetoothHostControllerPoweredOff: Symbol(),
  IOBluetoothHostControllerPoweredOn: Symbol(),
  IOBluetoothL2CAPChannelPublished: Symbol(),
  IOBluetoothL2CAPChannelTerminated: Symbol(),
  MKAnnotationCalloutInfoDidChange: Symbol(),
  NEFilterConfigurationDidChange: Symbol(),
  NEVPNConfigurationChange: Symbol(),
  NEVPNStatusDidChange: Symbol(),
  announcementRequested: Symbol(),
  applicationActivated: Symbol(),
  applicationDeactivated: Symbol(),
  applicationHidden: Symbol(),
  applicationShown: Symbol(),
  created: Symbol(),
  drawerCreated: Symbol(),
  focusedUIElementChanged: Symbol(),
  focusedWindowChanged: Symbol(),
  helpTagCreated: Symbol(),
  layoutChanged: Symbol(),
  mainWindowChanged: Symbol(),
  moved: Symbol(),
  resized: Symbol(),
  rowCollapsed: Symbol(),
  rowCountChanged: Symbol(),
  rowExpanded: Symbol(),
  selectedCellsChanged: Symbol(),
  selectedChildrenChanged: Symbol(),
  selectedChildrenMoved: Symbol(),
  selectedColumnsChanged: Symbol(),
  selectedRowsChanged: Symbol(),
  selectedTextChanged: Symbol(),
  sheetCreated: Symbol(),
  titleChanged: Symbol(),
  uiElementDestroyed: Symbol(),
  unitsChanged: Symbol(),
  valueChanged: Symbol(),
  windowCreated: Symbol(),
  windowDeminiaturized: Symbol(),
  windowMiniaturized: Symbol(),
  windowMoved: Symbol(),
  windowResized: Symbol(),
  progressMarkNotification: Symbol(),
  antialiasThresholdChangedNotification: Symbol(),
  NSAppleEventManagerWillProcessFirstEvent: Symbol(),
  didBecomeActiveNotification: Symbol(),
  didChangeOcclusionStateNotification: Symbol(),
  didChangeScreenParametersNotification: Symbol(),
  didFinishLaunchingNotification: Symbol(),
  didFinishRestoringWindowsNotification: Symbol(),
  didHideNotification: Symbol(),
  didResignActiveNotification: Symbol(),
  didUnhideNotification: Symbol(),
  didUpdateNotification: Symbol(),
  willBecomeActiveNotification: Symbol(),
  willFinishLaunchingNotification: Symbol(),
  willHideNotification: Symbol(),
  willResignActiveNotification: Symbol(),
  willTerminateNotification: Symbol(),
  willUnhideNotification: Symbol(),
  willUpdateNotification: Symbol(),
  columnConfigurationDidChangeNotification: Symbol(),
  NSClassDescriptionNeededForClass: Symbol(),
  didChangeNotification: Symbol(),
  colorDidChangeNotification: Symbol(),
  selectionDidChangeNotification: Symbol(),
  selectionIsChangingNotification: Symbol(),
  willDismissNotification: Symbol(),
  willPopUpNotification: Symbol(),
  contextHelpModeDidActivateNotification: Symbol(),
  contextHelpModeDidDeactivateNotification: Symbol(),
  textDidBeginEditingNotification: Symbol(),
  textDidChangeNotification: Symbol(),
  textDidEndEditingNotification: Symbol(),
  currentControlTintDidChangeNotification: Symbol(),
  didCloseNotification: Symbol(),
  didOpenNotification: Symbol(),
  willCloseNotification: Symbol(),
  willOpenNotification: Symbol(),
  fontSetChangedNotification: Symbol(),
  registryDidChangeNotification: Symbol(),
  didAddItemNotification: Symbol(),
  didBeginTrackingNotification: Symbol(),
  didChangeItemNotification: Symbol(),
  didEndTrackingNotification: Symbol(),
  didRemoveItemNotification: Symbol(),
  didSendActionNotification: Symbol(),
  willSendActionNotification: Symbol(),
  columnDidMoveNotification: Symbol(),
  columnDidResizeNotification: Symbol(),
  itemDidCollapseNotification: Symbol(),
  itemDidExpandNotification: Symbol(),
  itemWillCollapseNotification: Symbol(),
  itemWillExpandNotification: Symbol(),
  NSPersistentStoreDidImportUbiquitousContentChanges: Symbol(),
  didShowNotification: Symbol(),
  willShowNotification: Symbol(),
  preferredScrollerStyleDidChangeNotification: Symbol(),
  rowsDidChangeNotification: Symbol(),
  colorSpaceDidChangeNotification: Symbol(),
  didEndLiveMagnifyNotification: Symbol(),
  didEndLiveScrollNotification: Symbol(),
  didLiveScrollNotification: Symbol(),
  willStartLiveMagnifyNotification: Symbol(),
  willStartLiveScrollNotification: Symbol(),
  didChangeAutomaticCapitalizationNotification: Symbol(),
  didChangeAutomaticDashSubstitutionNotification: Symbol(),
  didChangeAutomaticPeriodSubstitutionNotification: Symbol(),
  didChangeAutomaticQuoteSubstitutionNotification: Symbol(),
  didChangeAutomaticSpellingCorrectionNotification: Symbol(),
  didChangeAutomaticTextReplacementNotification: Symbol(),
  didResizeSubviewsNotification: Symbol(),
  willResizeSubviewsNotification: Symbol(),
  systemColorsDidChangeNotification: Symbol(),
  selectedAlternativeStringNotification: Symbol(),
  didBeginEditingNotification: Symbol(),
  didEndEditingNotification: Symbol(),
  keyboardSelectionDidChangeNotification: Symbol(),
  NSTextStorageDidProcessEditing: Symbol(),
  NSTextStorageWillProcessEditing: Symbol(),
  didChangeSelectionNotification: Symbol(),
  didChangeTypingAttributesNotification: Symbol(),
  willChangeNotifyingTextViewNotification: Symbol(),
  willAddItemNotification: Symbol(),
  boundsDidChangeNotification: Symbol(),
  didUpdateTrackingAreasNotification: Symbol(),
  frameDidChangeNotification: Symbol(),
  globalFrameDidChangeNotification: Symbol(),
  didBecomeKeyNotification: Symbol(),
  didBecomeMainNotification: Symbol(),
  didChangeBackingPropertiesNotification: Symbol(),
  didChangeScreenNotification: Symbol(),
  didChangeScreenProfileNotification: Symbol(),
  didDeminiaturizeNotification: Symbol(),
  didEndLiveResizeNotification: Symbol(),
  didEndSheetNotification: Symbol(),
  didEnterFullScreenNotification: Symbol(),
  didEnterVersionBrowserNotification: Symbol(),
  didExitFullScreenNotification: Symbol(),
  didExitVersionBrowserNotification: Symbol(),
  didExposeNotification: Symbol(),
  didMiniaturizeNotification: Symbol(),
  didMoveNotification: Symbol(),
  didResignKeyNotification: Symbol(),
  didResignMainNotification: Symbol(),
  didResizeNotification: Symbol(),
  willBeginSheetNotification: Symbol(),
  willEnterFullScreenNotification: Symbol(),
  willEnterVersionBrowserNotification: Symbol(),
  willExitFullScreenNotification: Symbol(),
  willExitVersionBrowserNotification: Symbol(),
  willMiniaturizeNotification: Symbol(),
  willMoveNotification: Symbol(),
  willStartLiveResizeNotification: Symbol(),
  accessibilityDisplayOptionsDidChangeNotification: Symbol(),
  activeSpaceDidChangeNotification: Symbol(),
  didActivateApplicationNotification: Symbol(),
  didChangeFileLabelsNotification: Symbol(),
  didDeactivateApplicationNotification: Symbol(),
  didHideApplicationNotification: Symbol(),
  didLaunchApplicationNotification: Symbol(),
  didMountNotification: Symbol(),
  didPerformFileOperationNotification: Symbol(),
  didRenameVolumeNotification: Symbol(),
  didTerminateApplicationNotification: Symbol(),
  didUnhideApplicationNotification: Symbol(),
  didUnmountNotification: Symbol(),
  didWakeNotification: Symbol(),
  screensDidSleepNotification: Symbol(),
  screensDidWakeNotification: Symbol(),
  sessionDidBecomeActiveNotification: Symbol(),
  sessionDidResignActiveNotification: Symbol(),
  willLaunchApplicationNotification: Symbol(),
  willPowerOffNotification: Symbol(),
  willSleepNotification: Symbol(),
  willUnmountNotification: Symbol(),
  PDFDocumentDidBeginFind: Symbol(),
  PDFDocumentDidBeginPageFind: Symbol(),
  PDFDocumentDidBeginPageWrite: Symbol(),
  PDFDocumentDidBeginWrite: Symbol(),
  PDFDocumentDidEndFind: Symbol(),
  PDFDocumentDidEndPageFind: Symbol(),
  PDFDocumentDidEndPageWrite: Symbol(),
  PDFDocumentDidEndWrite: Symbol(),
  PDFDocumentDidFindMatch: Symbol(),
  PDFDocumentDidUnlock: Symbol(),
  PDFThumbnailViewDocumentEdited: Symbol(),
  PDFViewAnnotationHit: Symbol(),
  PDFViewAnnotationWillHit: Symbol(),
  PDFViewChangedHistory: Symbol(),
  PDFViewCopyPermission: Symbol(),
  PDFViewDisplayBoxChanged: Symbol(),
  PDFViewDisplayModeChanged: Symbol(),
  PDFViewDocumentChanged: Symbol(),
  PDFViewPageChanged: Symbol(),
  PDFViewPrintPermission: Symbol(),
  PDFViewScaleChanged: Symbol(),
  PDFViewSelectionChanged: Symbol(),
  PDFViewVisiblePagesChanged: Symbol(),
  QCCompositionPickerPanelDidSelectComposition: Symbol(),
  QCCompositionPickerViewDidSelectComposition: Symbol(),
  QCCompositionRepositoryDidUpdate: Symbol(),
  QCViewDidStartRendering: Symbol(),
  QCViewDidStopRendering: Symbol(),
  WebHistoryAllItemsRemoved: Symbol(),
  WebHistoryItemChanged: Symbol(),
  WebHistoryItemsAdded: Symbol(),
  WebHistoryItemsRemoved: Symbol(),
  WebHistoryLoaded: Symbol(),
  WebHistorySaved: Symbol(),
  WebPreferencesChanged: Symbol(),
  WebViewDidBeginEditing: Symbol(),
  WebViewDidChange: Symbol(),
  WebViewDidChangeSelection: Symbol(),
  WebViewDidChangeTypingStyle: Symbol(),
  WebViewDidEndEditing: Symbol(),
  WebViewProgressEstimateChanged: Symbol(),
  WebViewProgressFinished: Symbol(),
  WebViewProgressStarted: Symbol(),
  abDatabaseChanged: Symbol(),
  abDatabaseChangedExternally: Symbol(),
  quartzFilterManagerDidAddFilter: Symbol(),
  quartzFilterManagerDidModifyFilter: Symbol(),
  quartzFilterManagerDidRemoveFilter: Symbol(),
  quartzFilterManagerDidSelectFilter: Symbol(),
  EAAccessoryDidConnect: Symbol(),
  EAAccessoryDidDisconnect: Symbol(),
  MPMovieDurationAvailable: Symbol(),
  MPMovieMediaTypesAvailable: Symbol(),
  MPMovieNaturalSizeAvailable: Symbol(),
  MPMoviePlayerDidEnterFullscreen: Symbol(),
  MPMoviePlayerDidExitFullscreen: Symbol(),
  MPMoviePlayerIsAirPlayVideoActiveDidChange: Symbol(),
  MPMoviePlayerLoadStateDidChange: Symbol(),
  MPMoviePlayerNowPlayingMovieDidChange: Symbol(),
  MPMoviePlayerPlaybackDidFinish: Symbol(),
  MPMoviePlayerPlaybackStateDidChange: Symbol(),
  MPMoviePlayerReadyForDisplayDidChange: Symbol(),
  MPMoviePlayerScalingModeDidChange: Symbol(),
  MPMoviePlayerThumbnailImageRequestDidFinish: Symbol(),
  MPMoviePlayerTimedMetadataUpdated: Symbol(),
  MPMoviePlayerWillEnterFullscreen: Symbol(),
  MPMoviePlayerWillExitFullscreen: Symbol(),
  MPMovieSourceTypeAvailable: Symbol(),
  SKCloudServiceCapabilitiesDidChange: Symbol(),
  SKStorefrontIdentifierDidChange: Symbol(),
  TVTopShelfItemsDidChange: Symbol(),
  UIAccessibilityAssistiveTouchStatusDidChange: Symbol(),
  UIAccessibilityBoldTextStatusDidChange: Symbol(),
  UIAccessibilityClosedCaptioningStatusDidChange: Symbol(),
  UIAccessibilityDarkerSystemColorsStatusDidChange: Symbol(),
  UIAccessibilityGrayscaleStatusDidChange: Symbol(),
  UIAccessibilityGuidedAccessStatusDidChange: Symbol(),
  UIAccessibilityHearingDevicePairedEarDidChange: Symbol(),
  UIAccessibilityInvertColorsStatusDidChange: Symbol(),
  UIAccessibilityMonoAudioStatusDidChange: Symbol(),
  UIAccessibilityReduceMotionStatusDidChange: Symbol(),
  UIAccessibilityReduceTransparencyStatusDidChange: Symbol(),
  UIAccessibilityShakeToUndoDidChange: Symbol(),
  UIAccessibilitySpeakScreenStatusDidChange: Symbol(),
  UIAccessibilitySpeakSelectionStatusDidChange: Symbol(),
  UIAccessibilitySwitchControlStatusDidChange: Symbol(),
  UIApplicationDidBecomeActive: Symbol(),
  UIApplicationDidEnterBackground: Symbol(),
  UIApplicationDidFinishLaunching: Symbol(),
  UIApplicationDidReceiveMemoryWarning: Symbol(),
  UIApplicationSignificantTimeChange: Symbol(),
  UIApplicationUserDidTakeScreenshot: Symbol(),
  UIApplicationWillEnterForeground: Symbol(),
  UIApplicationWillResignActive: Symbol(),
  UIApplicationWillTerminate: Symbol(),
  UIContentSizeCategoryDidChange: Symbol(),
  UIDeviceProximityStateDidChange: Symbol(),
  UIScreenBrightnessDidChange: Symbol(),
  UIScreenDidConnect: Symbol(),
  UIScreenDidDisconnect: Symbol(),
  UIScreenModeDidChange: Symbol(),
  UITableViewSelectionDidChange: Symbol(),
  UITextFieldTextDidBeginEditing: Symbol(),
  UITextFieldTextDidChange: Symbol(),
  UITextFieldTextDidEndEditing: Symbol(),
  UITextInputCurrentInputModeDidChange: Symbol(),
  UITextViewTextDidBeginEditing: Symbol(),
  UITextViewTextDidChange: Symbol(),
  UITextViewTextDidEndEditing: Symbol(),
  UIViewControllerShowDetailTargetDidChange: Symbol(),
  UIWindowDidBecomeHidden: Symbol(),
  UIWindowDidBecomeKey: Symbol(),
  UIWindowDidBecomeVisible: Symbol(),
  UIWindowDidResignKey: Symbol(),
  ALAssetsLibraryChanged: Symbol(),
  AVCaptureDeviceSubjectAreaDidChange: Symbol(),
  AVCaptureSessionInterruptionEnded: Symbol(),
  AVCaptureSessionWasInterrupted: Symbol(),
  CTRadioAccessTechnologyDidChange: Symbol(),
  MFMessageComposeViewControllerTextMessageAvailabilityDidChange: Symbol(),
  MPMediaLibraryDidChange: Symbol(),
  MPMediaPlaybackIsPreparedToPlayDidChange: Symbol(),
  MPMusicPlayerControllerNowPlayingItemDidChange: Symbol(),
  MPMusicPlayerControllerPlaybackStateDidChange: Symbol(),
  MPMusicPlayerControllerVolumeDidChange: Symbol(),
  MPVolumeViewWirelessRouteActiveDidChange: Symbol(),
  MPVolumeViewWirelessRoutesAvailableDidChange: Symbol(),
  NKIssueDownloadCompleted: Symbol(),
  UIApplicationBackgroundRefreshStatusDidChange: Symbol(),
  UIApplicationDidChangeStatusBarFrame: Symbol(),
  UIApplicationDidChangeStatusBarOrientation: Symbol(),
  UIApplicationWillChangeStatusBarFrame: Symbol(),
  UIApplicationWillChangeStatusBarOrientation: Symbol(),
  UIDeviceBatteryLevelDidChange: Symbol(),
  UIDeviceBatteryStateDidChange: Symbol(),
  UIDeviceOrientationDidChange: Symbol(),
  UIDocumentStateChanged: Symbol(),
  UIKeyboardDidChangeFrame: Symbol(),
  UIKeyboardDidHide: Symbol(),
  UIKeyboardDidShow: Symbol(),
  UIKeyboardWillChangeFrame: Symbol(),
  UIKeyboardWillHide: Symbol(),
  UIKeyboardWillShow: Symbol(),
  UIMenuControllerDidHideMenu: Symbol(),
  UIMenuControllerDidShowMenu: Symbol(),
  UIMenuControllerMenuFrameDidChange: Symbol(),
  UIMenuControllerWillHideMenu: Symbol(),
  UIMenuControllerWillShowMenu: Symbol(),
  UIPasteboardChanged: Symbol(),
  UIPasteboardRemoved: Symbol(),
  UIApplicationProtectedDataDidBecomeAvailable: Symbol(),
  UIApplicationProtectedDataWillBecomeUnavailable: Symbol(),
  didChangeAutomaticTextCompletionNotification: Symbol(),
  MPMusicPlayerControllerQueueDidChange: Symbol(),
  GKPlayerAuthenticationDidChangeNotificationName: Symbol(),
  GKPlayerDidChangeNotificationName: Symbol(),
  NEDNSProxyConfigurationDidChange: Symbol(),
  SKStorefrontCountryCodeDidChange: Symbol(),
  UIAccessibilityVoiceOverStatusDidChange: Symbol(),
  UIFocusDidUpdate: Symbol(),
  UIFocusMovementDidFail: Symbol()
}


/**
 * An object containing information broadcast to registered observers that bridges to Notification; use NSNotification when you need reference semantics or other Foundation-specific behavior. 
 * @access public
 * @extends {NSObject}
 * @see https://developer.apple.com/documentation/foundation/nsnotification
 */
export default class NSNotification extends NSObject {

  // Creating Notifications

  /**
   * Initializes a notification with the data from an unarchiver.
   * @access public
   * @param {NSCoder} aDecoder - 
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nsnotification/1412464-init
   */
  initCoder(aDecoder) {
  }

  /**
   * Returns a new notification object with a specified name and object.
   * @access public
   * @param {NSNotification.Name} aName - The name for the new notification. May not be nil.
   * @param {?Object} anObject - The object for the new notification.
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nsnotification/1417440-init
   */
  initNameObject(aName, anObject) {
  }

  /**
   * Initializes a notification with a specified name, object, and user information.
   * @access public
   * @param {NSNotification.Name} name - 
   * @param {?Object} object - The object for the new notification.
   * @param {?Map<AnyHashable, Object>} [userInfo = null] - The user information dictionary for the new notification. May be nil.
   * @returns {void}
   * @see https://developer.apple.com/documentation/foundation/nsnotification/1415764-init
   */
  constructor(name, object, userInfo = null) {
    super()

    // Getting Notification Information

    this._name = name
    this._object = object
    this._userInfo = userInfo
  }

  // Getting Notification Information

  /**
   * The name of the notification.
   * @type {NSNotification.Name}
   * @desc Typically you use this property to find out what kind of notification you are dealing with when you receive a notification.Special ConsiderationsNotification names can be any string. To avoid name collisions, you might want to use a prefix that’s specific to your application.
   * @see https://developer.apple.com/documentation/foundation/nsnotification/1416472-name
   */
  get name() {
    return this._name
  }

  /**
   * The object associated with the notification.
   * @type {?Object}
   * @desc This is often the object that posted this notification. It may be nil.Typically you use this method to find out what object a notification applies to when you receive a notification.
   * @see https://developer.apple.com/documentation/foundation/nsnotification/1414469-object
   */
  get object() {
    return this._object
  }
  /**
   * The user information dictionary associated with the receiver.
   * @type {?Map<AnyHashable, Object>}
   * @desc May be nil.The user information dictionary stores any additional objects that objects receiving the notification might use.For example, in the Application Kit, NSControl objects post the NSControlTextDidChangeNotification whenever the field editor (an NSText object) changes text inside the NSControl. This notification provides the NSControl object as the notification's associated object. In order to provide access to the field editor, the NSControl object posting the notification adds the field editor to the notification's user information dictionary. Objects receiving the notification can access the field editor and the NSControl object posting the notification as follows:- (void)controlTextDidBeginEditing:(NSNotification *)notification
{
    NSText *fieldEditor = [notification.userInfo
        objectForKey:@"NSFieldEditor"];               // the field editor
    NSControl *postingObject = notification.object;   // the object that posted the notification
    ...
}
- (void)controlTextDidBeginEditing:(NSNotification *)notification
{
    NSText *fieldEditor = [notification.userInfo
        objectForKey:@"NSFieldEditor"];               // the field editor
    NSControl *postingObject = notification.object;   // the object that posted the notification
    ...
}

   * @see https://developer.apple.com/documentation/foundation/nsnotification/1409222-userinfo
   */
  get userInfo() {
    return this._userInfo
  }

  // Structures
  /**
   * @type {Object} Name
   * @property {Symbol} AVAudioEngineConfigurationChange Posted when the audio engine configuration changes.
   * @property {Symbol} AVAudioSessionInterruption Posted when an audio interruption occurs.
   * @property {Symbol} AVAudioSessionMediaServicesWereLost Posted when the media server is terminated.
   * @property {Symbol} AVAudioSessionMediaServicesWereReset Posted when the media server restarts.
   * @property {Symbol} AVAudioSessionRouteChange Posted when the system’s audio route changes.
   * @property {Symbol} AVAudioSessionSilenceSecondaryAudioHint Posted when the primary audio from other applications starts and stops.
   * @property {Symbol} AVAudioUnitComponentTagsDidChange The component tags changed.
   * @property {Symbol} CKAccountChanged Notification posted when the status of the signed-in iCloud account may have changed.
   * @property {Symbol} CLKComplicationServerActiveComplicationsDidChange Posted went the set of active complications changes.
   * @property {Symbol} CNContactStoreDidChange Posted notifications when changes occur in another CNContactStore.

   * @property {Symbol} EKEventStoreChanged Posted whenever changes are made to the Calendar database, including adding, removing, and changing events or reminders. Individual changes are not described. When you receive this notification, you should refetch all EKEvent and EKReminder objects you have accessed, as they are considered stale. If you are actively editing an event and do not wish to refetch it unless it is absolutely necessary to do so, you can call the refresh method on it. If the method returns true, you do not need to refetch the event.
   * @property {Symbol} HKUserPreferencesDidChange Notifies observers whenever the user changes his or her preferred units.
   * @property {Symbol} HMCharacteristicPropertySupportsEvent The characteristic supports notifications using the event connection established by the controller. The event connection provides unidirectional communication from the accessory to the controller.
   * @property {Symbol} NSBundleResourceRequestLowDiskSpace Posted after the system detects that the amount of available disk space is getting low. The notification is posted to the default notification center.
   * @property {Symbol} NSCalendarDayChanged A notification that is posted whenever the calendar day of the system changes, as determined by the system calendar, locale, and time zone.
   * @property {Symbol} NSDidBecomeSingleThreaded Not implemented.
   * @property {Symbol} NSExtensionHostDidBecomeActive Posted when the extension’s host app moves from the inactive to the active state.
   * @property {Symbol} NSExtensionHostDidEnterBackground Posted when the extension’s host app begins running in the background.
   * @property {Symbol} NSExtensionHostWillEnterForeground Posted when the extension’s host app begins running in the foreground.
   * @property {Symbol} NSExtensionHostWillResignActive Posted when the extension’s host app moves from the active to the inactive state.
   * @property {Symbol} NSFileHandleConnectionAccepted This notification is posted when an NSFileHandle object establishes a socket connection between two processes, creates an NSFileHandle object for one end of the connection, and makes this object available to observers by putting it in the userInfo dictionary.
   * @property {Symbol} NSFileHandleDataAvailable This notification is posted when the file handle determines that data is currently available for reading in a file or at a communications channel.
   * @property {Symbol} NSFileHandleReadToEndOfFileCompletion This notification is posted when the file handle reads all data in the file or, if a communications channel, until the other process signals the end of data.
   * @property {Symbol} NSHTTPCookieManagerAcceptPolicyChanged This notification is posted when the acceptance policy of the NSHTTPCookieStorage instance has changed.
   * @property {Symbol} NSHTTPCookieManagerCookiesChanged This notification is posted when the cookies stored in the NSHTTPCookieStorage instance have changed.
   * @property {Symbol} NSManagedObjectContextDidSave A notification that the context completed a save.
   * @property {Symbol} NSManagedObjectContextObjectsDidChange A notification of changes made to managed objects associated with this context.
   * @property {Symbol} NSManagedObjectContextWillSave A notification that the context is about to save.
   * @property {Symbol} NSMetadataQueryDidFinishGathering Posted when the receiver has finished with the initial result-gathering phase of the query.
   * @property {Symbol} NSMetadataQueryDidStartGathering Posted when the receiver begins with the initial result-gathering phase of the query.
   * @property {Symbol} NSMetadataQueryDidUpdate Posted when the receiver’s results have changed during the live-update phase of the query.
   * @property {Symbol} NSMetadataQueryGatheringProgress Posted as the receiver is collecting results during the initial result-gathering phase of the query.
   * @property {Symbol} NSPersistentStoreCoordinatorStoresDidChange Posted whenever persistent stores are added to or removed from a persistent store coordinator, or when store UUIDs change.
   * @property {Symbol} NSPersistentStoreCoordinatorStoresWillChange Posted before the list of open persistent stores changes.
   * @property {Symbol} NSPersistentStoreCoordinatorWillRemoveStore Posted whenever a persistent store is removed from a persistent store coordinator.
   * @property {Symbol} NSProcessInfoPowerStateDidChange Posted when the power state (Low Power Mode is enabled or disabled) of an iOS device changes. 
   * @property {Symbol} NSSystemClockDidChange A notification posted whenever the system clock is changed. 
   * @property {Symbol} NSSystemTimeZoneDidChange A notification posted when the time zone changes.
   * @property {Symbol} NSThreadWillExit An NSThread object posts this notification when it receives the exit() message, before the thread exits. Observer methods invoked to receive this notification execute in the exiting thread, before it exits.
   * @property {Symbol} NSURLCredentialStorageChanged This notification is posted when the set of stored credentials changes.
   * @property {Symbol} NSUbiquityIdentityDidChange Sent after the iCloud (“ubiquity”) identity has changed.
   * @property {Symbol} NSUndoManagerCheckpoint Posted whenever an NSUndoManager object opens or closes an undo group (except when it opens a top-level group) and when checking the redo stack in canRedo. 
   * @property {Symbol} NSUndoManagerDidCloseUndoGroup Posted after an NSUndoManager object closes an undo group, which occurs in the implementation of the endUndoGrouping() method.
   * @property {Symbol} NSUndoManagerDidOpenUndoGroup Posted whenever an NSUndoManager object opens an undo group, which occurs in the implementation of the beginUndoGrouping() method. 
   * @property {Symbol} NSUndoManagerDidRedoChange Posted just after an NSUndoManager object performs a redo operation (redo()).
   * @property {Symbol} NSUndoManagerDidUndoChange Posted just after an NSUndoManager object performs an undo operation.
   * @property {Symbol} NSUndoManagerWillCloseUndoGroup Posted before an NSUndoManager object closes an undo group, which occurs in the implementation of the endUndoGrouping() method.
   * @property {Symbol} NSUndoManagerWillRedoChange Posted just before an NSUndoManager object performs a redo operation (redo()).
   * @property {Symbol} NSUndoManagerWillUndoChange Posted just before an NSUndoManager object performs an undo operation.
   * @property {Symbol} NSWillBecomeMultiThreaded Posted when the first thread is detached from the current thread. The NSThread class posts this notification at most once—the first time a thread is detached using detachNewThreadSelector(_:toTarget:with:) or the start() method. Subsequent invocations of those methods do not post this notification. Observers of this notification have their notification method invoked in the main thread, not the new thread. The observer notification methods always execute before the new thread begins executing.
   * @property {Symbol} PKPassLibraryDidChange Posted after the pass library has been changed.
   * @property {Symbol} PKPassLibraryRemotePaymentPassesDidChange Posted when an Apple Pay card is added to or removed from a device that is paired with the current iOS device (for example, Apple Watch). 
   * @property {Symbol} UIAccessibilityAnnouncementDidFinish Posted by UIKit when the system has finished reading an announcement.
   * @property {Symbol} UIAccessibilityElementFocused 
   * @property {Symbol} WKAudioFilePlayerItemDidPlayToEndTime Posted when the item has played successfully to its end time.
   * @property {Symbol} WKAudioFilePlayerItemFailedToPlayToEndTime Posted when the item failed to play to its end time.
   * @property {Symbol} WKAudioFilePlayerItemTimeJumped Posted when the item’s current time has changed discontinuously. 
   * @property {Symbol} ABPeoplePickerDisplayedPropertyDidChange Posted when the displayed property in the record list is changed.
   * @property {Symbol} ABPeoplePickerGroupSelectionDidChange Posted when the selection in the group list is changed.
   * @property {Symbol} ABPeoplePickerNameSelectionDidChange Posted when the selection in the name list is changed.
   * @property {Symbol} ABPeoplePickerValueSelectionDidChange Posted when the selection in a multivalue property is changed.
   * @property {Symbol} ACAccountStoreDidChange Posted when the accounts managed by this account store changed in the database. There is no userInfo dictionary associated with this notification.
   * @property {Symbol} AVAssetChapterMetadataGroupsDidChange 
   * @property {Symbol} AVAssetContainsFragmentsDidChange 
   * @property {Symbol} AVAssetDurationDidChange 
   * @property {Symbol} AVAssetMediaSelectionGroupsDidChange 
   * @property {Symbol} AVAssetTrackSegmentsDidChange 
   * @property {Symbol} AVAssetTrackTimeRangeDidChange 
   * @property {Symbol} AVAssetTrackTrackAssociationsDidChange 
   * @property {Symbol} AVAssetWasDefragmented 
   * @property {Symbol} AVCaptureDeviceWasConnected Posted when a new device becomes available.
   * @property {Symbol} AVCaptureDeviceWasDisconnected Posted when an existing device becomes unavailable.
   * @property {Symbol} AVCaptureInputPortFormatDescriptionDidChange Posted if the value of the capture input port’sformatDescription property changes.
   * @property {Symbol} AVCaptureSessionDidStartRunning Posted when a capture session starts.
   * @property {Symbol} AVCaptureSessionDidStopRunning Posted when a capture session stops.
   * @property {Symbol} AVCaptureSessionRuntimeError Posted if an error occurred during a capture session.
   * @property {Symbol} AVFragmentedMovieContainsMovieFragmentsDidChange 
   * @property {Symbol} AVFragmentedMovieDurationDidChange 
   * @property {Symbol} AVFragmentedMovieTrackSegmentsDidChange 
   * @property {Symbol} AVFragmentedMovieTrackTimeRangeDidChange 
   * @property {Symbol} AVFragmentedMovieTrackTotalSampleDataLengthDidChange 
   * @property {Symbol} AVFragmentedMovieWasDefragmented 
   * @property {Symbol} AVPlayerItemDidPlayToEndTime Posted when the item has played to its end time.
   * @property {Symbol} AVPlayerItemFailedToPlayToEndTime Posted when the item failed to play to its end time.
   * @property {Symbol} AVPlayerItemNewAccessLogEntry Posted when a new access log entry has been added.
   * @property {Symbol} AVPlayerItemNewErrorLogEntry Posted when a new error log entry has been added.
   * @property {Symbol} AVPlayerItemPlaybackStalled Posted when some media did not arrive in time to continue playback.
   * @property {Symbol} AVPlayerItemTimeJumped Posted when the item’s current time has changed discontinuously.
   * @property {Symbol} AVSampleBufferDisplayLayerFailedToDecode Posted when a buffer display layer failed to decode.
   * @property {Symbol} CWBSSIDDidChange 
   * @property {Symbol} CWCountryCodeDidChange 
   * @property {Symbol} CWLinkDidChange 
   * @property {Symbol} CWLinkQualityDidChange 
   * @property {Symbol} CWModeDidChange 
   * @property {Symbol} CWPowerDidChange 
   * @property {Symbol} CWSSIDDidChange 
   * @property {Symbol} CWScanCacheDidUpdate 
   * @property {Symbol} GCControllerDidConnect Posted immediately after a new controller is connected to the device.
   * @property {Symbol} GCControllerDidDisconnect Posted immediately after a controller is disconnected from the device.
   * @property {Symbol} IKFilterBrowserFilterDoubleClick Posted when the user double-clicks a filter in the filter browser. 
   * @property {Symbol} IKFilterBrowserFilterSelected Posted when the user clicks a filter name in the filter browser. 
   * @property {Symbol} IKFilterBrowserWillPreviewFilter Posted before showing a filter preview, allowing an application to set the parameters of a filter.
   * @property {Symbol} IOBluetoothHostControllerPoweredOff 
   * @property {Symbol} IOBluetoothHostControllerPoweredOn 
   * @property {Symbol} IOBluetoothL2CAPChannelPublished 
   * @property {Symbol} IOBluetoothL2CAPChannelTerminated 
   * @property {Symbol} MKAnnotationCalloutInfoDidChange Notifies observers that the title or subtitle information of an annotation object changed.
   * @property {Symbol} NEFilterConfigurationDidChange Posted after the filter configuration stored in the Network Extension preferences changes.
   * @property {Symbol} NEVPNConfigurationChange Posted after the VPN configuration stored in the Network Extension preferences changes.
   * @property {Symbol} NEVPNStatusDidChange Posted when the status of the VPN connection changes.
   * @property {Symbol} announcementRequested This notification is posted whenever an accessibility element needs to make an announcement to the user. This notification requires a userInfo dictionary with the key announcement and a localized string containing the announcement. To help an assistive app determine the importance of the announcement, add the appropriate priority to the userInfo dictionary.
   * @property {Symbol} applicationActivated This notification is posted after the app has been activated. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} applicationDeactivated This notification is posted after the app has been deactivated.  Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} applicationHidden This notification is posted after the app is hidden. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} applicationShown This notification is posted after the app is shown. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} created This notification is posted after an accessibility element is created. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} drawerCreated This notification is posted after a drawer appears. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} focusedUIElementChanged This notification is posted after an accessibility element gains focus. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} focusedWindowChanged This notification is posted after the key window changes. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} helpTagCreated This notification is posted after a help tag appears. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} layoutChanged This notification is posted after the UI changes in a way that requires the attention of an accessibility client. This notification should be accompanied by a userInfo dictionary with the key uiElements and an array containing the UI elements that have been added or changed. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} mainWindowChanged This notification is posted after the main window changes. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} moved This notification is posted after an accessibility element moves. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} resized This notification is posted after an accessibility element’s size changes. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} rowCollapsed This notification is posted after a row collapses. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} rowCountChanged This notification is posted after a row is added or deleted. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} rowExpanded This notification is posted after a row expands. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} selectedCellsChanged This notification is posted after one or more cells in a cell-based table are selected or deselected. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} selectedChildrenChanged This notification is posted after one or more child elements are selected or deselected. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} selectedChildrenMoved This notification is posted after the selected items in a layout area move. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} selectedColumnsChanged This notification is posted after one or more columns are selected or deselected. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} selectedRowsChanged This notification is posted after one or more rows are selected or deselected. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} selectedTextChanged This notification is posted after text is selected or deselected.  Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} sheetCreated This notification is posted after a sheet appears.  Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} titleChanged This notification is posted after an accessibility element’s title changes. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} uiElementDestroyed This notification is posted after an accessibility element is destroyed. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} unitsChanged This notification is posted after the units in a layout area change. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} valueChanged This notification is posted after an accessibility element’s value changes. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} windowCreated This notification is posted after a new window appears. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} windowDeminiaturized This notification is posted after a window is restored to full size from the Dock.  Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} windowMiniaturized This notification is posted after a window is put in the Dock. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} windowMoved This notification is posted after a window moves.  Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} windowResized This notification is posted after a window’s size changes. Post this notification using the NSAccessibilityPostNotification(_:_:) function instead of an NSNotificationCenter instance.
   * @property {Symbol} progressMarkNotification Posted when the current progress of a running animation reaches one of its progress marks.
   * @property {Symbol} antialiasThresholdChangedNotification Posted after the threshold for anti-aliasing changes.
   * @property {Symbol} NSAppleEventManagerWillProcessFirstEvent Posted by NSAppleEventManager before it first dispatches an Apple event. Your application can use this notification to avoid registering any Apple event handlers until the first time at which they may be needed.
   * @property {Symbol} didBecomeActiveNotification Posted immediately after the app becomes active.
   * @property {Symbol} didChangeOcclusionStateNotification Posted when the app’s occlusion state changes.
   * @property {Symbol} didChangeScreenParametersNotification Posted when the configuration of the displays attached to the computer is changed.
   * @property {Symbol} didFinishLaunchingNotification Posted at the end of the finishLaunching() method to indicate that the app has completed launching and is ready to run.
   * @property {Symbol} didFinishRestoringWindowsNotification Posted when the app is finished restoring windows.
   * @property {Symbol} didHideNotification Posted at the end of the hide(_:) method to indicate that the app is now hidden.
   * @property {Symbol} didResignActiveNotification Posted immediately after the app gives up its active status to another app.
   * @property {Symbol} didUnhideNotification Posted at the end of the unhideWithoutActivation() method to indicate that the app is now visible.
   * @property {Symbol} didUpdateNotification Posted at the end of the updateWindows() method to indicate that the app has finished updating its windows.
   * @property {Symbol} willBecomeActiveNotification Posted immediately before the app becomes active.
   * @property {Symbol} willFinishLaunchingNotification Posted at the start of the finishLaunching() method to indicate that the app has completed its initialization process and is about to finish launching.
   * @property {Symbol} willHideNotification Posted at the start of the hide(_:) method to indicate that the app is about to be hidden.
   * @property {Symbol} willResignActiveNotification Posted immediately before the app gives up its active status to another app.
   * @property {Symbol} willTerminateNotification Posted by the terminate(_:) method to indicate that the app will terminate.
   * @property {Symbol} willUnhideNotification Posted at the start of the unhideWithoutActivation() method to indicate that the app is about to become visible.
   * @property {Symbol} willUpdateNotification Posted at the start of the updateWindows() method to indicate that the app is about to update its windows.
   * @property {Symbol} columnConfigurationDidChangeNotification Notifies the delegate when the width of a browser column has changed.
   * @property {Symbol} NSClassDescriptionNeededForClass Posted by init(for:) when a class description cannot be found for a class.
   * @property {Symbol} didChangeNotification 
   * @property {Symbol} colorDidChangeNotification Posted when the color of the NSColorPanel is set, as when NSColorPanel is invoked.
   * @property {Symbol} selectionDidChangeNotification Posted after the pop-up list selection of the NSComboBox changes. 
   * @property {Symbol} selectionIsChangingNotification Posted whenever the pop-up list selection of the NSComboBox is changing. 
   * @property {Symbol} willDismissNotification Posted whenever the pop-up list of the NSComboBox is about to be dismissed.
   * @property {Symbol} willPopUpNotification Posted whenever the pop-up list of the NSComboBox is going to be displayed. 
   * @property {Symbol} contextHelpModeDidActivateNotification Posted when the application enters context-sensitive help mode. This typically happens when the user holds down the Help key.
   * @property {Symbol} contextHelpModeDidDeactivateNotification Posted when the application exits context-sensitive help mode. This happens when the user clicks the mouse button while the cursor is anywhere on the screen after displaying a context-sensitive help topic.
   * @property {Symbol} textDidBeginEditingNotification Sent when a control with editable cells begins an edit session. 
   * @property {Symbol} textDidChangeNotification Sent when the text in the receiving control changes. 
   * @property {Symbol} textDidEndEditingNotification Sent when a control with editable cells ends an editing session. 
   * @property {Symbol} currentControlTintDidChangeNotification Sent after the user changes control tint preference.
   * @property {Symbol} didCloseNotification Posted whenever the drawer is closed. 
   * @property {Symbol} didOpenNotification Posted whenever the drawer is opened. 
   * @property {Symbol} willCloseNotification Posted whenever the drawer is about to close. 
   * @property {Symbol} willOpenNotification Posted whenever the drawer is about to open.
   * @property {Symbol} didChangeNotification Posted whenever a font collection is changed.
   * @property {Symbol} fontSetChangedNotification Posted after the the currently-set font changes.
   * @property {Symbol} registryDidChangeNotification Posted whenever the NSImageRep class registry changes.
   * @property {Symbol} didAddItemNotification Posted after a menu item is added to the menu.
   * @property {Symbol} didBeginTrackingNotification Posted when menu tracking begins.
   * @property {Symbol} didChangeItemNotification Posted after a menu item in the menu changes appearance.
   * @property {Symbol} didEndTrackingNotification Posted when menu tracking ends, even if no action is sent.
   * @property {Symbol} didRemoveItemNotification Posted after a menu item is removed from the menu.
   * @property {Symbol} didSendActionNotification Posted just after the application dispatches a menu item’s action method to the menu item’s target.
   * @property {Symbol} willSendActionNotification Posted just before the application dispatches a menu item’s action method to the menu item’s target.
   * @property {Symbol} columnDidMoveNotification Posted whenever a column is moved by user action in an NSOutlineView object.
   * @property {Symbol} columnDidResizeNotification Posted whenever a column is resized in an NSOutlineView object.
   * @property {Symbol} itemDidCollapseNotification Posted whenever an item is collapsed in an NSOutlineView object.
   * @property {Symbol} itemDidExpandNotification Posted whenever an item is expanded in an NSOutlineView object.
   * @property {Symbol} itemWillCollapseNotification Posted before an item is collapsed (after the user clicks the arrow but before the item is collapsed).
   * @property {Symbol} itemWillExpandNotification Posted before an item is expanded (after the user clicks the arrow but before the item is collapsed).
   * @property {Symbol} selectionDidChangeNotification Posted after the outline view's selection changes.
   * @property {Symbol} selectionIsChangingNotification Posted as the outline view’s selection changes (while the mouse button is still down).
   * @property {Symbol} NSPersistentStoreDidImportUbiquitousContentChanges Posted after records are imported from the ubiquitous content store.
   * @property {Symbol} willPopUpNotification This notification is posted just before an pop-up menu is attached to its window frame.
   * @property {Symbol} willPopUpNotification Posted when an NSPopUpButton object receives a mouse-down event—that is, when the user is about to select an item from the menu.
   * @property {Symbol} didCloseNotification Sent after the popover has finished animating offscreen.
   * @property {Symbol} didShowNotification Sent after the popover has finished animating onscreen.
   * @property {Symbol} willCloseNotification Sent before the popover is closed.
   * @property {Symbol} willShowNotification Sent before the popover is shown.
   * @property {Symbol} preferredScrollerStyleDidChangeNotification Posted if the preferred scroller style changes.
   * @property {Symbol} rowsDidChangeNotification This notification is posted to the default notification center whenever the view's rows change.
   * @property {Symbol} colorSpaceDidChangeNotification Posted when the color space of the screen has changed.
   * @property {Symbol} didEndLiveMagnifyNotification Posted at the end of a magnify gesture.
   * @property {Symbol} didEndLiveScrollNotification Posted on the main thread at the end of live scroll tracking.
   * @property {Symbol} didLiveScrollNotification Posted on the main thread after changing the clipview bounds origin due to a user-initiated event.
   * @property {Symbol} willStartLiveMagnifyNotification Posted at the beginning of a magnify gesture.
   * @property {Symbol} willStartLiveScrollNotification Posted on the main thread at the beginning of user-initiated live scroll tracking (gesture scroll or scroller tracking, for example, thumb dragging).
   * @property {Symbol} didChangeAutomaticCapitalizationNotification 
   * @property {Symbol} didChangeAutomaticDashSubstitutionNotification 
   * @property {Symbol} didChangeAutomaticPeriodSubstitutionNotification 
   * @property {Symbol} didChangeAutomaticQuoteSubstitutionNotification 
   * @property {Symbol} didChangeAutomaticSpellingCorrectionNotification This notification is posted when the spell checker did change text using automatic spell checking correction. The are posted to the application’s default notification center.
   * @property {Symbol} didChangeAutomaticTextReplacementNotification Posted when the spell checker changed text using automatic text replacement.  This notification is posted to the app’s default notification center. 
   * @property {Symbol} didResizeSubviewsNotification Posted after an NSSplitView changes the sizes of some or all of its subviews. 
   * @property {Symbol} willResizeSubviewsNotification Posted before an NSSplitView changes the sizes of some or all of its subviews.
   * @property {Symbol} systemColorsDidChangeNotification Sent when the system colors have been changed (such as through a system control panel interface).
   * @property {Symbol} columnDidMoveNotification Posted whenever a column is moved by user action in an NSTableView object.
   * @property {Symbol} columnDidResizeNotification Posted whenever a column is resized in an NSTableView object.
   * @property {Symbol} selectionDidChangeNotification Posted after an NSTableView object's selection changes.
   * @property {Symbol} selectionIsChangingNotification Posted as an NSTableView object's selection changes (while the mouse button is still down).
   * @property {Symbol} selectedAlternativeStringNotification Posted when the user selects an alternate string.
   * @property {Symbol} didBeginEditingNotification Posted when an NSText object begins any operation that changes characters or formatting attributes.
   * @property {Symbol} didChangeNotification Posted after an NSText object performs any operation that changes characters or formatting attributes.
   * @property {Symbol} didEndEditingNotification Posted when focus leaves an NSText object, whether or not any operation has changed characters or formatting attributes.
   * @property {Symbol} keyboardSelectionDidChangeNotification Posted after the selected text input source changes.
   * @property {Symbol} NSTextStorageDidProcessEditing Posted after a text storage finishes processing edits in processEditing().
   * @property {Symbol} NSTextStorageWillProcessEditing Posted before a text storage finishes processing edits in processEditing().
   * @property {Symbol} didChangeSelectionNotification Posted when the selected range of characters changes.
   * @property {Symbol} didChangeTypingAttributesNotification Posted when there is a change in the typing attributes within a text view.
   * @property {Symbol} willChangeNotifyingTextViewNotification Posted when a new text view is established as the text view that sends notifications.
   * @property {Symbol} didRemoveItemNotification Posted after an item is removed from a toolbar.
   * @property {Symbol} willAddItemNotification Posted before a new item is added to the toolbar.
   * @property {Symbol} boundsDidChangeNotification Posted whenever the NSView’s bounds rectangle changes to a new value independently of the frame rectangle, but only when the view’s postsBoundsChangedNotifications property is true.  
   * @property {Symbol} didUpdateTrackingAreasNotification Posted whenever an NSView object recalculates its tracking areas.
   * @property {Symbol} frameDidChangeNotification Posted whenever the view’s frame rectangle changes to a new value, but only when the view’s postsFrameChangedNotifications property is true.
   * @property {Symbol} globalFrameDidChangeNotification Posted whenever an NSView object that has attached surfaces (that is, NSOpenGLContext objects) moves to a different screen, or other cases where the NSOpenGLContext object needs to be updated. 
   * @property {Symbol} didBecomeKeyNotification Posted whenever an NSWindow object becomes the key window.
   * @property {Symbol} didBecomeMainNotification Posted whenever an NSWindow object becomes the main window.
   * @property {Symbol} didChangeBackingPropertiesNotification Posted when the window backing properties change.
   * @property {Symbol} didChangeOcclusionStateNotification Posted when the window’s occlusion state changes.
   * @property {Symbol} didChangeScreenNotification Posted whenever a portion of an NSWindow object’s frame moves onto or off of a screen.
   * @property {Symbol} didChangeScreenProfileNotification Posted whenever the display profile for the screen containing the window changes.
   * @property {Symbol} didDeminiaturizeNotification Posted whenever an NSWindow object is deminimized.
   * @property {Symbol} didEndLiveResizeNotification Posted after the user resizes a window.
   * @property {Symbol} didEndSheetNotification Posted whenever an NSWindow object closes an attached sheet.
   * @property {Symbol} didEnterFullScreenNotification Posted when the window entered full screen mode.
   * @property {Symbol} didEnterVersionBrowserNotification Posted when the window will enter version browser mode.
   * @property {Symbol} didExitFullScreenNotification Posted when the window did exit full screen mode.
   * @property {Symbol} didExitVersionBrowserNotification Posted when the window did exit version browser mode.
   * @property {Symbol} didExposeNotification Posted whenever a portion of a nonretained NSWindow object is exposed, whether by being ordered in front of other windows or by other windows being removed from in front of it.
   * @property {Symbol} didMiniaturizeNotification Posted whenever an NSWindow object is minimized.
   * @property {Symbol} didMoveNotification Posted whenever an NSWindow object is moved.
   * @property {Symbol} didResignKeyNotification Posted whenever an NSWindow object resigns its status as key window.
   * @property {Symbol} didResignMainNotification Posted whenever an NSWindow object resigns its status as main window.
   * @property {Symbol} didResizeNotification Posted whenever an NSWindow object’s size changes.
   * @property {Symbol} didUpdateNotification Posted whenever an NSWindow object receives an update() message.
   * @property {Symbol} willBeginSheetNotification Posted whenever an NSWindow object is about to open a sheet.
   * @property {Symbol} willCloseNotification Posted whenever an NSWindow object is about to close.
   * @property {Symbol} willEnterFullScreenNotification Posted when the window will enter full screen mode.
   * @property {Symbol} willEnterVersionBrowserNotification Posted when the window will enter version browser mode.
   * @property {Symbol} willExitFullScreenNotification Posted when the window will exit full screen mode.
   * @property {Symbol} willExitVersionBrowserNotification Posted when the window will exit version browser mode.
   * @property {Symbol} willMiniaturizeNotification Posted whenever an NSWindow object is about to be minimized.
   * @property {Symbol} willMoveNotification Posted whenever an NSWindow object is about to move.
   * @property {Symbol} willStartLiveResizeNotification Posted before the user resizes a window.
   * @property {Symbol} accessibilityDisplayOptionsDidChangeNotification Posted when any of the accessibility display options change.
   * @property {Symbol} activeSpaceDidChangeNotification Posted when a Spaces change has occurred.
   * @property {Symbol} didActivateApplicationNotification Posted when the Finder is about to activate an app.
   * @property {Symbol} didChangeFileLabelsNotification Posted when the Finder file labels or colors change.
   * @property {Symbol} didDeactivateApplicationNotification Posted when the Finder deactivated an app.
   * @property {Symbol} didHideApplicationNotification Posted when the Finder hid an app.
   * @property {Symbol} didLaunchApplicationNotification Posted when a new app has started up.
   * @property {Symbol} didMountNotification Posted when a new device has been mounted.
   * @property {Symbol} didPerformFileOperationNotification Posted when a file operation has been performed in the receiving app.
   * @property {Symbol} didRenameVolumeNotification Posted when a volume changes its name and/or mount path.  These typically change simultaneously, in which case only one notification is posted.
   * @property {Symbol} didTerminateApplicationNotification Posted when an app finishes executing.
   * @property {Symbol} didUnhideApplicationNotification Posted when the Finder unhid an app.
   * @property {Symbol} didUnmountNotification Posted when the Finder did unmount a device.
   * @property {Symbol} didWakeNotification Posted when the machine wakes from sleep.
   * @property {Symbol} screensDidSleepNotification Posted when the machine’s screen goes to sleep.
   * @property {Symbol} screensDidWakeNotification Posted when the machine’s screens wake.
   * @property {Symbol} sessionDidBecomeActiveNotification Posted after a user session is switched in.
   * @property {Symbol} sessionDidResignActiveNotification Posted before a user session is switched out.
   * @property {Symbol} willLaunchApplicationNotification Posted when the Finder is about to launch an app.
   * @property {Symbol} willPowerOffNotification Posted when the user has requested a logout or that the machine be powered off.
   * @property {Symbol} willSleepNotification Posted before the machine goes to sleep.
   * @property {Symbol} willUnmountNotification Posted when the Finder is about to unmount a device.
   * @property {Symbol} PDFDocumentDidBeginFind Posted when the beginFindString(_:withOptions:) or findString(_:withOptions:) method begins finding.
   * @property {Symbol} PDFDocumentDidBeginPageFind Posted each time a find operation begins working on a new page of a document.
   * @property {Symbol} PDFDocumentDidBeginPageWrite Posted each time a write operation begins working on a page in a document.
   * @property {Symbol} PDFDocumentDidBeginWrite Posted each time a write operation begins working on a document.
   * @property {Symbol} PDFDocumentDidEndFind Posted when the beginFindString(_:withOptions:) or findString(_:withOptions:) method returns.
   * @property {Symbol} PDFDocumentDidEndPageFind Posted each time a find operation finishes working on a page in a document.
   * @property {Symbol} PDFDocumentDidEndPageWrite Posted each time a write operation finishes working on a page in a document.
   * @property {Symbol} PDFDocumentDidEndWrite Posted each time a write operation finishes working on a document.
   * @property {Symbol} PDFDocumentDidFindMatch Posted each time a string match is found in a document.
   * @property {Symbol} PDFDocumentDidUnlock Posted when a document unlocks after a unlock(withPassword:) message.
   * @property {Symbol} PDFThumbnailViewDocumentEdited 
   * @property {Symbol} PDFViewAnnotationHit Posted when the user clicks on an annotation. 
   * @property {Symbol} PDFViewAnnotationWillHit Posted before the user clicks an annotation.
   * @property {Symbol} PDFViewChangedHistory Posted when the page history changes.
   * @property {Symbol} PDFViewCopyPermission Posted when the user attempts to copy to the pasteboard without the appropriate permissions. 
   * @property {Symbol} PDFViewDisplayBoxChanged Posted when the display box has changed.
   * @property {Symbol} PDFViewDisplayModeChanged Posted when the display mode has changed.
   * @property {Symbol} PDFViewDocumentChanged Posted when a new document is associated with the view.
   * @property {Symbol} PDFViewPageChanged Posted when a new page becomes the current page.
   * @property {Symbol} PDFViewPrintPermission Posted when the user attempts to print without the appropriate permissions. 
   * @property {Symbol} PDFViewScaleChanged Posted when the scale factor changes. 
   * @property {Symbol} PDFViewSelectionChanged Posted when the current selection has changed.
   * @property {Symbol} PDFViewVisiblePagesChanged 
   * @property {Symbol} QCCompositionPickerPanelDidSelectComposition Posted when the user chooses a composition.
   * @property {Symbol} QCCompositionPickerViewDidSelectComposition Posted when the user selects a composition in the picker view.
   * @property {Symbol} QCCompositionRepositoryDidUpdate Posted whenever the list of compositions in the composition repository is updated.
   * @property {Symbol} QCViewDidStartRendering Posted when the view starts rendering.
   * @property {Symbol} QCViewDidStopRendering Posted when the view stops rendering.
   * @property {Symbol} WebHistoryAllItemsRemoved Posted when all history items have been removed from the web history.
   * @property {Symbol} WebHistoryItemChanged Posted by a WebHistoryItem object when the value of the history item’s title, alternate title, URL strings, or last visited interval changes.
   * @property {Symbol} WebHistoryItemsAdded Posted when history items have been added to a web history.
   * @property {Symbol} WebHistoryItemsRemoved Posted when items have been removed from the web history.
   * @property {Symbol} WebHistoryLoaded Posted when web history items have been loaded from a URL.
   * @property {Symbol} WebHistorySaved Posted when web history items have been saved to a URL.
   * @property {Symbol} WebPreferencesChanged Posted when the web preference settings are changed. 
   * @property {Symbol} WebViewDidBeginEditing Posted when a web view begins any operation that changes its contents in response to user editing.
   * @property {Symbol} WebViewDidChange Posted when a web view performs any operation that changes its contents in response to user editing.
   * @property {Symbol} WebViewDidChangeSelection Posted when a web view changes its typing selection.
   * @property {Symbol} WebViewDidChangeTypingStyle Posted when a web view changes its typing style.
   * @property {Symbol} WebViewDidEndEditing Posted when a web view ends any operation that changes its contents in response to user editing.
   * @property {Symbol} WebViewProgressEstimateChanged Posted by a WebView object when the estimated progress value of a load changes.
   * @property {Symbol} WebViewProgressFinished Posted by a WebView object when the load has finished.
   * @property {Symbol} WebViewProgressStarted Posted by a WebView object when a load begins, including a load that is initiated in a subframe.
   * @property {Symbol} abDatabaseChanged Posted when this process has changed the Address Book database.
   * @property {Symbol} abDatabaseChangedExternally Posted when a process other than the current one has changed the Address Book database.
   * @property {Symbol} quartzFilterManagerDidAddFilter 
   * @property {Symbol} quartzFilterManagerDidModifyFilter 
   * @property {Symbol} quartzFilterManagerDidRemoveFilter 
   * @property {Symbol} quartzFilterManagerDidSelectFilter 
   * @property {Symbol} EAAccessoryDidConnect Posted when an accessory becomes connected and available for your application to use.
   * @property {Symbol} EAAccessoryDidDisconnect Posted when an accessory is disconnected and no longer available for your application to use.
   * @property {Symbol} MPMovieDurationAvailable Posted when the duration of a movie has been determined. There is no userInfo dictionary.
   * @property {Symbol} MPMovieMediaTypesAvailable Posted when the available media types in a movie are determined. There is no userInfo dictionary.
   * @property {Symbol} MPMovieNaturalSizeAvailable Posted when the natural frame size of a movie is first determined or subsequently changes. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerDidEnterFullscreen Posted when a movie player has entered full-screen mode. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerDidExitFullscreen Posted when a movie player has exited full-screen mode. There is no userInfo dictionary.  
   * @property {Symbol} MPMoviePlayerIsAirPlayVideoActiveDidChange Posted when a movie player has started or ended playing a movie via AirPlay. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerLoadStateDidChange Posted when a movie player’s network buffering state has changed. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerNowPlayingMovieDidChange Posted when the currently playing movie has changed. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerPlaybackDidFinish Posted when a movie has finished playing. The userInfo dictionary of this notification contains the MPMoviePlayerPlaybackDidFinishReasonUserInfoKey key, which indicates the reason that playback finished. This notification is also sent when playback fails because of an error.
   * @property {Symbol} MPMoviePlayerPlaybackStateDidChange Posted when a movie player’s playback state has changed. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerReadyForDisplayDidChange Posted when the ready for display state changes.
   * @property {Symbol} MPMoviePlayerScalingModeDidChange Posted when the scaling mode of a movie player has changed. There is no userInfo dictionary.
   * @property {Symbol} MPMoviePlayerThumbnailImageRequestDidFinish Posted when a request to capture a thumbnail from a movie has finished whether the request succeeded or failed. Upon successful capture of a thumbnail, the userInfo dictionary contains values for the following keys:
   * @property {Symbol} MPMoviePlayerTimedMetadataUpdated Posted when new timed metadata arrives.
   * @property {Symbol} MPMoviePlayerWillEnterFullscreen Posted when a movie player is about to enter full-screen mode. The userInfo dictionary contains keys whose values describe the transition animation used to enter full-screen mode. See Fullscreen Notification Keys.
   * @property {Symbol} MPMoviePlayerWillExitFullscreen Posted when a movie player is about to exit full-screen mode. The userInfo dictionary contains keys whose values describe the transition animation used to exit full-screen mode. See Fullscreen Notification Keys.
   * @property {Symbol} MPMovieSourceTypeAvailable Posted when the source type of a movie was previously unknown and is newly available. There is no userInfo dictionary.
   * @property {Symbol} SKCloudServiceCapabilitiesDidChange Called when the capabilities associated with the music library on the device change.
   * @property {Symbol} SKStorefrontIdentifierDidChange Called when the storefront identifier associated with the device changes.
   * @property {Symbol} TVTopShelfItemsDidChange A notification to post when your app’s Top Shelf content has changed.
   * @property {Symbol} UIAccessibilityAssistiveTouchStatusDidChange 
   * @property {Symbol} UIAccessibilityBoldTextStatusDidChange Posted by UIKit when the system’s Bold Text setting has changed. 
   * @property {Symbol} UIAccessibilityClosedCaptioningStatusDidChange Posted by UIKit when the setting for closed captioning has changed.
   * @property {Symbol} UIAccessibilityDarkerSystemColorsStatusDidChange Posted by UIKit when the system’s Darken Colors setting has changed.
   * @property {Symbol} UIAccessibilityGrayscaleStatusDidChange Posted by UIKit when the system’s Grayscale setting has changed.
   * @property {Symbol} UIAccessibilityGuidedAccessStatusDidChange Posted by UIKit when a Guided Access session starts or ends.  
   * @property {Symbol} UIAccessibilityHearingDevicePairedEarDidChange 
   * @property {Symbol} UIAccessibilityInvertColorsStatusDidChange Posted by UIKit when the setting for inverted colors has changed.  
   * @property {Symbol} UIAccessibilityMonoAudioStatusDidChange Posted by UIKit when system audio changes from stereo to mono.
   * @property {Symbol} UIAccessibilityReduceMotionStatusDidChange Posted by UIKit when the system’s Reduce Motion setting has changed.
   * @property {Symbol} UIAccessibilityReduceTransparencyStatusDidChange Posted by UIKit when the system’s Reduce Transparency system setting has changed.
   * @property {Symbol} UIAccessibilityShakeToUndoDidChange 
   * @property {Symbol} UIAccessibilitySpeakScreenStatusDidChange Posted by UIKit when the system’s Speak Screen setting has changed.
   * @property {Symbol} UIAccessibilitySpeakSelectionStatusDidChange Posted by UIKit when the system’s Speak Selection setting has changed.
   * @property {Symbol} UIAccessibilitySwitchControlStatusDidChange Posted by UIKit when the system’s Switch Control setting has changed.
   * @property {Symbol} UIApplicationDidBecomeActive Posted when the app becomes active. 
   * @property {Symbol} UIApplicationDidEnterBackground Posted when the app enters the background.
   * @property {Symbol} UIApplicationDidFinishLaunching Posted immediately after the app finishes launching.
   * @property {Symbol} UIApplicationDidReceiveMemoryWarning Posted when the app receives a warning from the operating system about low memory availability.
   * @property {Symbol} UIApplicationSignificantTimeChange Posted when there is a significant change in time, for example, change to a new day (midnight), carrier time update, and change to or from daylight savings time.
   * @property {Symbol} UIApplicationUserDidTakeScreenshot Posted when the user presses the Home and Lock buttons to take a screenshot. 
   * @property {Symbol} UIApplicationWillEnterForeground Posted shortly before an app leaves the background state on its way to becoming the active app.
   * @property {Symbol} UIApplicationWillResignActive Posted when the app is no longer active and loses focus.
   * @property {Symbol} UIApplicationWillTerminate Posted when the app is about to terminate.
   * @property {Symbol} UIContentSizeCategoryDidChange Posted when the user changes the preferred content size setting. 
   * @property {Symbol} UIDeviceProximityStateDidChange Posted when the state of the proximity sensor changes.
   * @property {Symbol} UIScreenBrightnessDidChange This notification is posted when the brightness of a screen changes. The object of the notification is the UIScreen object whose brightness property changed. There is no userInfo dictionary. 
   * @property {Symbol} UIScreenDidConnect This notification is posted when a new screen is connected to the device. The object of the notification is the UIScreen object representing the new screen. There is no userInfo dictionary. 
   * @property {Symbol} UIScreenDidDisconnect This notification is posted when a screen is disconnected from the device. The object of the notification is the UIScreen object that represented the now disconnected screen. There is no userInfo dictionary. 
   * @property {Symbol} UIScreenModeDidChange This notification is posted when the current mode of a screen changes. The object of the notification is the UIScreen object whose currentMode property changed. There is no userInfo dictionary. 
   * @property {Symbol} UITableViewSelectionDidChange Posted when the selected row in the posting table view changes.
   * @property {Symbol} UITextFieldTextDidBeginEditing Notifies observers that an editing session began in a text field. The affected text field is stored in the object parameter of the notification. The userInfo dictionary is not used.
   * @property {Symbol} UITextFieldTextDidChange Notifies observers that the text in a text field changed. The affected text field is stored in the object parameter of the notification. 
   * @property {Symbol} UITextFieldTextDidEndEditing Notifies observers that the editing session ended for a text field. The affected text field is stored in the object parameter of the notification. The userInfo dictionary is not used.
   * @property {Symbol} UITextInputCurrentInputModeDidChange Posted when the current input mode changes.
   * @property {Symbol} UITextViewTextDidBeginEditing Notifies observers that an editing session began in a text view. The affected view is stored in the object parameter of the notification. The userInfo dictionary is not used.
   * @property {Symbol} UITextViewTextDidChange Notifies observers that the text in a text view changed. The affected view is stored in the object parameter of the notification. The userInfo dictionary is not used.
   * @property {Symbol} UITextViewTextDidEndEditing Notifies observers that the editing session ended for a text view. The affected view is stored in the object parameter of the notification. The userInfo dictionary is not used.
   * @property {Symbol} UIViewControllerShowDetailTargetDidChange Posted when a split view controller is expanded or collapsed.
   * @property {Symbol} UIWindowDidBecomeHidden Posted when an UIWindow object becomes hidden.
   * @property {Symbol} UIWindowDidBecomeKey Posted whenever a UIWindow object becomes the key window.
   * @property {Symbol} UIWindowDidBecomeVisible Posted when an UIWindow object becomes visible.
   * @property {Symbol} UIWindowDidResignKey Posted whenever a UIWindow object resigns its status as main window.
   * @property {Symbol} ALAssetsLibraryChanged Sent when the contents of the assets library have changed from under the app that is using the data.
   * @property {Symbol} AVCaptureDeviceSubjectAreaDidChange Posted when the instance of AVCaptureDevice has detected a substantial change to the video subject area.
   * @property {Symbol} AVCaptureSessionInterruptionEnded Posted if an interruption to a capture session finishes.
   * @property {Symbol} AVCaptureSessionWasInterrupted Posted if a capture session is interrupted.
   * @property {Symbol} CTRadioAccessTechnologyDidChange 
   * @property {Symbol} MFMessageComposeViewControllerTextMessageAvailabilityDidChange Posted when the value returned by the canSendText() class method has changed.
   * @property {Symbol} MPMediaLibraryDidChange Indicates the media library has changed.
   * @property {Symbol} MPMediaPlaybackIsPreparedToPlayDidChange Indicates that the prepared to play status of the media player has changed.
   * @property {Symbol} MPMusicPlayerControllerNowPlayingItemDidChange Posted when the currently playing media item has changed.
   * @property {Symbol} MPMusicPlayerControllerPlaybackStateDidChange Posted when the playback state has been changed programmatically or by user action.
   * @property {Symbol} MPMusicPlayerControllerVolumeDidChange Posted when the audio playback volume for the music player has changed.
   * @property {Symbol} MPVolumeViewWirelessRouteActiveDidChange Indicates the active wireless route changed.
   * @property {Symbol} MPVolumeViewWirelessRoutesAvailableDidChange Indicates the available wireless routes changed.
   * @property {Symbol} NKIssueDownloadCompleted Posted when all assets of the issue have been downloaded.
   * @property {Symbol} UIApplicationBackgroundRefreshStatusDidChange Posted when the app’s status for downloading content in the background changes.
   * @property {Symbol} UIApplicationDidChangeStatusBarFrame Posted when the frame of the status bar changes.
   * @property {Symbol} UIApplicationDidChangeStatusBarOrientation Posted when the orientation of the app’s user interface changes.
   * @property {Symbol} UIApplicationWillChangeStatusBarFrame Posted when the app is about to change the frame of the status bar.
   * @property {Symbol} UIApplicationWillChangeStatusBarOrientation Posted when the app is about to change the orientation of its interface.
   * @property {Symbol} UIDeviceBatteryLevelDidChange Posted when the battery level changes.
   * @property {Symbol} UIDeviceBatteryStateDidChange Posted when battery state changes.
   * @property {Symbol} UIDeviceOrientationDidChange Posted when the orientation of the device changes.
   * @property {Symbol} UIDocumentStateChanged Posted by the document object when there is a change in the state of the document.
   * @property {Symbol} UIKeyboardDidChangeFrame Posted immediately after a change in the keyboard’s frame.
   * @property {Symbol} UIKeyboardDidHide Posted immediately after the dismissal of the keyboard.
   * @property {Symbol} UIKeyboardDidShow Posted immediately after the display of the keyboard.
   * @property {Symbol} UIKeyboardWillChangeFrame Posted immediately prior to a change in the keyboard’s frame.
   * @property {Symbol} UIKeyboardWillHide Posted immediately prior to the dismissal of the keyboard.
   * @property {Symbol} UIKeyboardWillShow Posted immediately prior to the display of the keyboard.
   * @property {Symbol} UIMenuControllerDidHideMenu Posted by the menu controller just after it hides the menu.
   * @property {Symbol} UIMenuControllerDidShowMenu Posted by the menu controller just after it shows the menu.
   * @property {Symbol} UIMenuControllerMenuFrameDidChange Posted when the frame of a visible menu changes.
   * @property {Symbol} UIMenuControllerWillHideMenu Posted by the menu controller just before it hides the menu.
   * @property {Symbol} UIMenuControllerWillShowMenu Posted by the menu controller just before it shows the menu.
   * @property {Symbol} UIPasteboardChanged Posted by a pasteboard object when its contents change.
   * @property {Symbol} UIPasteboardRemoved Posted by a pasteboard object just before an app removes it.
   * @property {Symbol} UIApplicationProtectedDataDidBecomeAvailable Posted when the protected files become available for your code to access.
   * @property {Symbol} UIApplicationProtectedDataWillBecomeUnavailable Posted shortly before protected files are locked down and become inaccessible.
   * @property {Symbol} didChangeAutomaticTextCompletionNotification 
   * @property {Symbol} MPMusicPlayerControllerQueueDidChange Indicates the music player's queue changed.
   * @property {Symbol} GKPlayerAuthenticationDidChangeNotificationName Posted after the isAuthenticated property of the shared local player object changes. The object property for this notification is a GKLocalPlayer object. Passing nil provides standard Notification Center behavior which is to receive the notification for any object.
   * @property {Symbol} GKPlayerDidChangeNotificationName Posted when a player object’s data changes.
   * @property {Symbol} NEDNSProxyConfigurationDidChange 
   * @property {Symbol} SKStorefrontCountryCodeDidChange 
   * @property {Symbol} UIAccessibilityVoiceOverStatusDidChange 
   * @property {Symbol} UIFocusDidUpdate 
   * @property {Symbol} UIFocusMovementDidFail 
   * @property {Symbol} init 
   * @property {Symbol} initrawValue 
   * @property {Symbol} initnameobjectuserInfo Initializes a new notification.
   * @property {Symbol} Notification.Name An alias for a type used to represent the name of a notification.
   * @see https://developer.apple.com/documentation/foundation/nsnotification.name
   */
  static get Name() {
    return _Name
  }
}
