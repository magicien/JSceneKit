var JSceneKit =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _NSObject = __webpack_require__(1);

	var _NSObject2 = _interopRequireDefault(_NSObject);

	var _SCNScene = __webpack_require__(2);

	var _SCNScene2 = _interopRequireDefault(_SCNScene);

	var _SCNView = __webpack_require__(3);

	var _SCNView2 = _interopRequireDefault(_SCNView);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*global exports*/
	exports.NSObject = _NSObject2.default;
	exports.SCNScene = _SCNScene2.default;
	exports.SCNView = _SCNView2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * NSObject class
	 * @access public
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var NSObject = function () {
	  /**
	   *
	   * @access public
	   * @constructor
	   */
	  function NSObject() {
	    _classCallCheck(this, NSObject);

	    /**
	     * @type {number}
	     * 
	     */
	    this.frameRate = 0;
	  }

	  _createClass(NSObject, null, [{
	    key: 'initialize',
	    value: function initialize() {}
	  }]);

	  return NSObject;
	}();

	exports.default = NSObject;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * SCNScene class
	 * @access public
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SCNScene = function () {
	  /**
	   *
	   * @access public
	   * @constructor
	   */
	  function SCNScene() {
	    _classCallCheck(this, SCNScene);

	    /**
	     * frameRate
	     * @type {number}
	     */
	    this.frameRate = 0;

	    /**
	     * @type {number}
	     *
	     */
	    this.endTime = 0;

	    /**
	     * @type {number}
	     *
	     */
	    this.startTime = 0;

	    /**
	     * @type {boolean}
	     *
	     */
	    this.isPaused = false;

	    /**
	     * @type {Color}
	     *
	     */
	    this.fogColor = null;

	    /**
	     * @type {number}
	     *
	     */
	    this.fogDensityExponent = 0;

	    /**
	     * @type {number}
	     *
	     */
	    this.fogEndDistance = 0;

	    /**
	     * @type {number}
	     *
	     */
	    this.fogStartDistance = 0;

	    /**
	     * @type {SCNMaterialProperty}
	     *
	     */
	    this.lightingEnvironment = null;

	    /**
	     * @type {SCNMaterialProperty}
	     *
	     */
	    this.background = null;

	    /**
	     * @type {SCNPhysicsWorld}
	     *
	     */
	    this.physicsWorld = null;

	    /**
	     * @type {SCNNode}
	     *
	     */
	    this.rootNode = null;

	    /**
	     * @type {array}
	     *
	     */
	    this.particleSystems = null;
	  }

	  /**
	   * Creates a scene from the specified Model I/O asset.
	   * @access public
	   * @param {MDLAsset} asset - A Model I/O asset object.
	   * @returns {SCNScene} - A new scene object.
	   * 
	   */


	  _createClass(SCNScene, [{
	    key: 'valueForKeyPath',
	    value: function valueForKeyPath(path) {
	      // TODO: implement
	    }
	  }, {
	    key: 'valueForKey',
	    value: function valueForKey(key) {
	      // TODO: implement
	    }
	  }, {
	    key: 'setValueForKey',
	    value: function setValueForKey(value, key) {
	      // TODO: implement
	    }
	  }, {
	    key: 'setValueForKeyPath',
	    value: function setValueForKeyPath(value, keyPath) {
	      // TODO: implement
	    }
	  }, {
	    key: 'writeToURLOptionsDelegateProgressHandler',
	    value: function writeToURLOptionsDelegateProgressHandler(url, options, delegate, progressHandler) {
	      // TODO: implement
	    }
	  }, {
	    key: 'setAttributeForKey',
	    value: function setAttributeForKey(attribute, key) {
	      // TODO: implement
	    }
	  }, {
	    key: 'attributeForKey',
	    value: function attributeForKey(key) {
	      // TODO: implement
	    }
	  }, {
	    key: 'removeParticleSystem',
	    value: function removeParticleSystem(particleSystem) {
	      // TODO: implement
	    }
	  }, {
	    key: 'removeAllParticleSystems',
	    value: function removeAllParticleSystems() {
	      // TODO: implement
	    }
	  }, {
	    key: 'addParticleSystemWithTransform',
	    value: function addParticleSystemWithTransform(particleSystem, transform) {
	      // TODO: implement
	    }
	  }], [{
	    key: 'sceneWithMDLAsset',
	    value: function sceneWithMDLAsset(asset) {
	      // TODO: implement
	    }
	  }, {
	    key: 'sceneWithURLOptionsError',
	    value: function sceneWithURLOptionsError(url, options, error) {
	      // TODO: implement
	    }
	  }, {
	    key: 'sceneNamedInDirectoryOptions',
	    value: function sceneNamedInDirectoryOptions(name, directory, options) {
	      // TODO: implement
	    }
	  }, {
	    key: 'sceneNamed',
	    value: function sceneNamed(name) {
	      // TODO: implement
	    }
	  }, {
	    key: 'scene',
	    value: function scene() {
	      return new SCNScene();
	    }
	  }]);

	  return SCNScene;
	}();

	exports.default = SCNScene;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * SCNView class
	 * A view for displaying 3D SceneKit content.
	 * @access public
	 */

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SCNView = function () {
	  /**
	   *
	   * @access public
	   * @constructor
	   */
	  function SCNView() {
	    _classCallCheck(this, SCNView);

	    /**
	     * @type {boolean}
	     */
	    this.showsStatistics = false;

	    this.pointOfView = null;

	    this.loops = false;

	    this.isPlaying = false;

	    this.delegate = null;

	    this.currentTime = 0;

	    /**
	     * @type {SCNAntialiasingMode}
	     * The antialiasing mode used for rendering the view’s scene.
	     */
	    this.antialiasingMode = 0;

	    /**
	     * @type {number}
	     * The animation frame rate that the view uses to render its scene.
	     */
	    this.preferredFramesPerSecond = 0;

	    /**
	     * @type {boolean}
	     * A Boolean value that determines whether the user can manipulate the current point of view that is used to render the scene.
	     */
	    this.allowsCameraControl = false;

	    /**
	     * @type {Color}
	     * The background color of the view.
	     */
	    this.backgroundColor = null;

	    /**
	     * @type {SCNScene}
	     * The scene to be displayed in the view.
	     */
	    this.scene = null;
	  }

	  /**
	   * 
	   * @access public
	   * @param {Object} sender - a
	   * @returns {void}
	   */


	  _createClass(SCNView, [{
	    key: 'stop',
	    value: function stop(sender) {}
	    // TODO: implement


	    /**
	     * Pauses playback of the view’s scene.
	     * @access public
	     * @param {Object} sender - The object requesting the action (used when connecting a control in Interface Builder).  SceneKit ignores this parameter.
	     * @returns {void}
	     * @desc This method has no effect if the scene is already paused.
	     */

	  }, {
	    key: 'pause',
	    value: function pause(sender) {}

	    /**
	     * Resumes playback of the view’s scene.
	     * @access public
	     * @param {Object} sender - The object requesting the action (used when connecting a control in Interface Builder). SceneKit ignores this parameter.
	     * @returns {void}
	     * @desc This method has no effect if the scene is not paused.
	     */

	  }, {
	    key: 'play',
	    value: function play(sender) {}

	    /**
	     * 
	     * @access public
	     * @returns {void}
	     */

	  }, {
	    key: 'snapshot',
	    value: function snapshot() {}
	  }]);

	  return SCNView;
	}();

	exports.default = SCNView;

/***/ }
/******/ ]);