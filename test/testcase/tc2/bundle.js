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

	var _application = __webpack_require__(1);

	var _application2 = _interopRequireDefault(_application);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_application2.default.initialize(); /**
	                                     * Created by frankrwu on 2016/12/17.
	                                     */

	_application2.default.start();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _marionette = __webpack_require__(2);

	var _layout_view = __webpack_require__(7);

	var _layout_view2 = _interopRequireDefault(_layout_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by frankrwu on 2016/12/17.
	 */
	var App = new (_marionette.Application.extend({
	    initialize: function initialize() {
	        this.layout = new _layout_view2.default();
	        this.layout.render();
	    },

	    onStart: function onStart() {}
	}))();

	exports.default = App;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// MarionetteJS (Backbone.Marionette)
	// ----------------------------------
	// v3.1.0
	//
	// Copyright (c)2016 Derick Bailey, Muted Solutions, LLC.
	// Distributed under MIT license
	//
	// http://marionettejs.com


	(function (global, factory) {
		( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(3), __webpack_require__(4), __webpack_require__(6)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(3), __webpack_require__(4), __webpack_require__(6)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Marionette = global['Mn'] = factory(global.Backbone, global._, global.Backbone.Radio);
	})(undefined, function (Backbone, _, Radio) {
		'use strict';

		Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;
		_ = 'default' in _ ? _['default'] : _;
		Radio = 'default' in Radio ? Radio['default'] : Radio;

		var version = "3.1.0";

		//Internal utility for creating context style global utils
		var proxy = function proxy(method) {
			return function (context) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				return method.apply(context, args);
			};
		};

		// Borrow the Backbone `extend` method so we can use it as needed
		var extend = Backbone.Model.extend;

		var deprecate = function deprecate(message, test) {
			if (_.isObject(message)) {
				message = message.prev + ' is going to be removed in the future. ' + 'Please use ' + message.next + ' instead.' + (message.url ? ' See: ' + message.url : '');
			}

			if (!Marionette.DEV_MODE) {
				return;
			}

			if ((test === undefined || !test) && !deprecate._cache[message]) {
				deprecate._warn('Deprecation warning: ' + message);
				deprecate._cache[message] = true;
			}
		};

		deprecate._console = typeof console !== 'undefined' ? console : {};
		deprecate._warn = function () {
			var warn = deprecate._console.warn || deprecate._console.log || _.noop;
			return warn.apply(deprecate._console, arguments);
		};
		deprecate._cache = {};

		// Determine if `el` is a child of the document
		var isNodeAttached = function isNodeAttached(el) {
			return Backbone.$.contains(document.documentElement, el);
		};

		// Merge `keys` from `options` onto `this`
		var mergeOptions = function mergeOptions(options, keys) {
			var _this = this;

			if (!options) {
				return;
			}

			_.each(keys, function (key) {
				var option = options[key];
				if (option !== undefined) {
					_this[key] = option;
				}
			});
		};

		// Marionette.getOption
		// --------------------

		// Retrieve an object, function or other value from the
		// object or its `options`, with `options` taking precedence.
		var getOption = function getOption(optionName) {
			if (!optionName) {
				return;
			}
			if (this.options && this.options[optionName] !== undefined) {
				return this.options[optionName];
			} else {
				return this[optionName];
			}
		};

		// Marionette.normalizeMethods
		// ----------------------

		// Pass in a mapping of events => functions or function names
		// and return a mapping of events => functions
		var normalizeMethods = function normalizeMethods(hash) {
			var _this = this;

			return _.reduce(hash, function (normalizedHash, method, name) {
				if (!_.isFunction(method)) {
					method = _this[method];
				}
				if (method) {
					normalizedHash[name] = method;
				}
				return normalizedHash;
			}, {});
		};

		// split the event name on the ":"
		var splitter = /(^|:)(\w)/gi;

		// take the event section ("section1:section2:section3")
		// and turn it in to uppercase name onSection1Section2Section3
		function getEventName(match, prefix, eventName) {
			return eventName.toUpperCase();
		}

		var getOnMethodName = _.memoize(function (event) {
			return 'on' + event.replace(splitter, getEventName);
		});

		// Trigger an event and/or a corresponding method name. Examples:
		//
		// `this.triggerMethod("foo")` will trigger the "foo" event and
		// call the "onFoo" method.
		//
		// `this.triggerMethod("foo:bar")` will trigger the "foo:bar" event and
		// call the "onFooBar" method.
		function triggerMethod(event) {
			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			// get the method name from the event name
			var methodName = getOnMethodName(event);
			var method = getOption.call(this, methodName);
			var result = void 0;

			// call the onMethodName if it exists
			if (_.isFunction(method)) {
				// pass all args, except the event name
				result = method.apply(this, args);
			}

			// trigger the event
			this.trigger.apply(this, arguments);

			return result;
		}

		// triggerMethodOn invokes triggerMethod on a specific context
		//
		// e.g. `Marionette.triggerMethodOn(view, 'show')`
		// will trigger a "show" event or invoke onShow the view.
		function triggerMethodOn(context) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			if (_.isFunction(context.triggerMethod)) {
				return context.triggerMethod.apply(context, args);
			}

			return triggerMethod.apply(context, args);
		}

		// Trigger method on children unless a pure Backbone.View
		function triggerMethodChildren(view, event, shouldTrigger) {
			if (!view._getImmediateChildren) {
				return;
			}
			_.each(view._getImmediateChildren(), function (child) {
				if (!shouldTrigger(child)) {
					return;
				}
				triggerMethodOn(child, event, child);
			});
		}

		function shouldTriggerAttach(view) {
			return !view._isAttached;
		}

		function shouldAttach(view) {
			if (!shouldTriggerAttach(view)) {
				return false;
			}
			view._isAttached = true;
			return true;
		}

		function shouldTriggerDetach(view) {
			return view._isAttached;
		}

		function shouldDetach(view) {
			if (!shouldTriggerDetach(view)) {
				return false;
			}
			view._isAttached = false;
			return true;
		}

		function triggerDOMRefresh(view) {
			if (view._isAttached && view._isRendered) {
				triggerMethodOn(view, 'dom:refresh', view);
			}
		}

		function handleBeforeAttach() {
			triggerMethodChildren(this, 'before:attach', shouldTriggerAttach);
		}

		function handleAttach() {
			triggerMethodChildren(this, 'attach', shouldAttach);
			triggerDOMRefresh(this);
		}

		function handleBeforeDetach() {
			triggerMethodChildren(this, 'before:detach', shouldTriggerDetach);
		}

		function handleDetach() {
			triggerMethodChildren(this, 'detach', shouldDetach);
		}

		function handleRender() {
			triggerDOMRefresh(this);
		}

		// Monitor a view's state, propagating attach/detach events to children and firing dom:refresh
		// whenever a rendered view is attached or an attached view is rendered.
		function monitorViewEvents(view) {
			if (view._areViewEventsMonitored) {
				return;
			}

			view._areViewEventsMonitored = true;

			view.on({
				'before:attach': handleBeforeAttach,
				'attach': handleAttach,
				'before:detach': handleBeforeDetach,
				'detach': handleDetach,
				'render': handleRender
			});
		}

		var errorProps = ['description', 'fileName', 'lineNumber', 'name', 'message', 'number'];

		var MarionetteError = extend.call(Error, {
			urlRoot: 'http://marionettejs.com/docs/v' + version + '/',

			constructor: function constructor(message, options) {
				if (_.isObject(message)) {
					options = message;
					message = options.message;
				} else if (!options) {
					options = {};
				}

				var error = Error.call(this, message);
				_.extend(this, _.pick(error, errorProps), _.pick(options, errorProps));

				this.captureStackTrace();

				if (options.url) {
					this.url = this.urlRoot + options.url;
				}
			},
			captureStackTrace: function captureStackTrace() {
				if (Error.captureStackTrace) {
					Error.captureStackTrace(this, MarionetteError);
				}
			},
			toString: function toString() {
				return this.name + ': ' + this.message + (this.url ? ' See: ' + this.url : '');
			}
		});

		MarionetteError.extend = extend;

		// Bind/unbind the event to handlers specified as a string of
		// handler names on the target object
		function bindFromStrings(target, entity, evt, methods, actionName) {
			var methodNames = methods.split(/\s+/);

			_.each(methodNames, function (methodName) {
				var method = target[methodName];
				if (!method) {
					throw new MarionetteError('Method "' + methodName + '" was configured as an event handler, but does not exist.');
				}

				target[actionName](entity, evt, method);
			});
		}

		// generic looping function
		function iterateEvents(target, entity, bindings, actionName) {
			if (!entity || !bindings) {
				return;
			}

			// type-check bindings
			if (!_.isObject(bindings)) {
				throw new MarionetteError({
					message: 'Bindings must be an object.',
					url: 'marionette.functions.html#marionettebindevents'
				});
			}

			// iterate the bindings and bind/unbind them
			_.each(bindings, function (method, evt) {

				// allow for a list of method names as a string
				if (_.isString(method)) {
					bindFromStrings(target, entity, evt, method, actionName);
					return;
				}

				target[actionName](entity, evt, method);
			});
		}

		function bindEvents(entity, bindings) {
			iterateEvents(this, entity, bindings, 'listenTo');
			return this;
		}

		function unbindEvents(entity, bindings) {
			iterateEvents(this, entity, bindings, 'stopListening');
			return this;
		}

		function iterateReplies(target, channel, bindings, actionName) {
			if (!channel || !bindings) {
				return;
			}

			// type-check bindings
			if (!_.isObject(bindings)) {
				throw new MarionetteError({
					message: 'Bindings must be an object.',
					url: 'marionette.functions.html#marionettebindrequests'
				});
			}

			var normalizedRadioRequests = normalizeMethods.call(target, bindings);

			channel[actionName](normalizedRadioRequests, target);
		}

		function bindRequests(channel, bindings) {
			iterateReplies(this, channel, bindings, 'reply');
			return this;
		}

		function unbindRequests(channel, bindings) {
			iterateReplies(this, channel, bindings, 'stopReplying');
			return this;
		}

		// Internal utility for setting options consistently across Mn
		var setOptions = function setOptions() {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}

			this.options = _.extend.apply(_, [{}, _.result(this, 'options')].concat(args));
		};

		var CommonMixin = {

			// Imports the "normalizeMethods" to transform hashes of
			// events=>function references/names to a hash of events=>function references
			normalizeMethods: normalizeMethods,

			_setOptions: setOptions,

			// A handy way to merge passed-in options onto the instance
			mergeOptions: mergeOptions,

			// Enable getting options from this or this.options by name.
			getOption: getOption,

			// Enable binding view's events from another entity.
			bindEvents: bindEvents,

			// Enable unbinding view's events from another entity.
			unbindEvents: unbindEvents
		};

		// MixinOptions
		// - channelName
		// - radioEvents
		// - radioRequests

		var RadioMixin = {
			_initRadio: function _initRadio() {
				var channelName = _.result(this, 'channelName');

				if (!channelName) {
					return;
				}

				/* istanbul ignore next */
				if (!Radio) {
					throw new MarionetteError({
						name: 'BackboneRadioMissing',
						message: 'The dependency "backbone.radio" is missing.'
					});
				}

				var channel = this._channel = Radio.channel(channelName);

				var radioEvents = _.result(this, 'radioEvents');
				this.bindEvents(channel, radioEvents);

				var radioRequests = _.result(this, 'radioRequests');
				this.bindRequests(channel, radioRequests);

				this.on('destroy', this._destroyRadio);
			},
			_destroyRadio: function _destroyRadio() {
				this._channel.stopReplying(null, null, this);
			},
			getChannel: function getChannel() {
				return this._channel;
			},

			// Proxy `bindEvents`
			bindEvents: bindEvents,

			// Proxy `unbindEvents`
			unbindEvents: unbindEvents,

			// Proxy `bindRequests`
			bindRequests: bindRequests,

			// Proxy `unbindRequests`
			unbindRequests: unbindRequests

		};

		var ClassOptions = ['channelName', 'radioEvents', 'radioRequests'];

		// A Base Class that other Classes should descend from.
		// Object borrows many conventions and utilities from Backbone.
		var MarionetteObject = function MarionetteObject(options) {
			this._setOptions(options);
			this.mergeOptions(options, ClassOptions);
			this.cid = _.uniqueId(this.cidPrefix);
			this._initRadio();
			this.initialize.apply(this, arguments);
		};

		MarionetteObject.extend = extend;

		// Object Methods
		// --------------

		// Ensure it can trigger events with Backbone.Events
		_.extend(MarionetteObject.prototype, Backbone.Events, CommonMixin, RadioMixin, {
			cidPrefix: 'mno',

			// for parity with Marionette.AbstractView lifecyle
			_isDestroyed: false,

			isDestroyed: function isDestroyed() {
				return this._isDestroyed;
			},

			//this is a noop method intended to be overridden by classes that extend from this base
			initialize: function initialize() {},
			destroy: function destroy() {
				if (this._isDestroyed) {
					return this;
				}

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				this.triggerMethod.apply(this, ['before:destroy', this].concat(args));

				this._isDestroyed = true;
				this.triggerMethod.apply(this, ['destroy', this].concat(args));
				this.stopListening();

				return this;
			},

			triggerMethod: triggerMethod
		});

		// Manage templates stored in `<script>` blocks,
		// caching them for faster access.
		var TemplateCache = function TemplateCache(templateId) {
			this.templateId = templateId;
		};

		// TemplateCache object-level methods. Manage the template
		// caches from these method calls instead of creating
		// your own TemplateCache instances
		_.extend(TemplateCache, {
			templateCaches: {},

			// Get the specified template by id. Either
			// retrieves the cached version, or loads it
			// from the DOM.
			get: function get(templateId, options) {
				var cachedTemplate = this.templateCaches[templateId];

				if (!cachedTemplate) {
					cachedTemplate = new TemplateCache(templateId);
					this.templateCaches[templateId] = cachedTemplate;
				}

				return cachedTemplate.load(options);
			},

			// Clear templates from the cache. If no arguments
			// are specified, clears all templates:
			// `clear()`
			//
			// If arguments are specified, clears each of the
			// specified templates from the cache:
			// `clear("#t1", "#t2", "...")`
			clear: function clear() {
				var i = void 0;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				var length = args.length;

				if (length > 0) {
					for (i = 0; i < length; i++) {
						delete this.templateCaches[args[i]];
					}
				} else {
					this.templateCaches = {};
				}
			}
		});

		// TemplateCache instance methods, allowing each
		// template cache object to manage its own state
		// and know whether or not it has been loaded
		_.extend(TemplateCache.prototype, {

			// Internal method to load the template
			load: function load(options) {
				// Guard clause to prevent loading this template more than once
				if (this.compiledTemplate) {
					return this.compiledTemplate;
				}

				// Load the template and compile it
				var template = this.loadTemplate(this.templateId, options);
				this.compiledTemplate = this.compileTemplate(template, options);

				return this.compiledTemplate;
			},

			// Load a template from the DOM, by default. Override
			// this method to provide your own template retrieval
			// For asynchronous loading with AMD/RequireJS, consider
			// using a template-loader plugin as described here:
			// https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
			loadTemplate: function loadTemplate(templateId, options) {
				var $template = Backbone.$(templateId);

				if (!$template.length) {
					throw new MarionetteError({
						name: 'NoTemplateError',
						message: 'Could not find template: "' + templateId + '"'
					});
				}
				return $template.html();
			},

			// Pre-compile the template before caching it. Override
			// this method if you do not need to pre-compile a template
			// (JST / RequireJS for example) or if you want to change
			// the template engine used (Handebars, etc).
			compileTemplate: function compileTemplate(rawTemplate, options) {
				return _.template(rawTemplate, options);
			}
		});

		var _invoke = _.invokeMap || _.invoke;

		function _toConsumableArray(arr) {
			if (Array.isArray(arr)) {
				for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
					arr2[i] = arr[i];
				}return arr2;
			} else {
				return Array.from(arr);
			}
		}

		// MixinOptions
		// - behaviors

		// Takes care of getting the behavior class
		// given options and a key.
		// If a user passes in options.behaviorClass
		// default to using that.
		// If a user passes in a Behavior Class directly, use that
		// Otherwise delegate the lookup to the users `behaviorsLookup` implementation.
		function getBehaviorClass(options, key) {
			if (options.behaviorClass) {
				return options.behaviorClass;
				//treat functions as a Behavior constructor
			} else if (_.isFunction(options)) {
				return options;
			}

			// behaviorsLookup can be either a flat object or a method
			if (_.isFunction(Marionette.Behaviors.behaviorsLookup)) {
				return Marionette.Behaviors.behaviorsLookup(options, key)[key];
			}

			return Marionette.Behaviors.behaviorsLookup[key];
		}

		// Iterate over the behaviors object, for each behavior
		// instantiate it and get its grouped behaviors.
		// This accepts a list of behaviors in either an object or array form
		function parseBehaviors(view, behaviors) {
			return _.chain(behaviors).map(function (options, key) {
				var BehaviorClass = getBehaviorClass(options, key);
				//if we're passed a class directly instead of an object
				var _options = options === BehaviorClass ? {} : options;
				var behavior = new BehaviorClass(_options, view);
				var nestedBehaviors = parseBehaviors(view, _.result(behavior, 'behaviors'));

				return [behavior].concat(nestedBehaviors);
			}).flatten().value();
		}

		var BehaviorsMixin = {
			_initBehaviors: function _initBehaviors() {
				var behaviors = _.result(this, 'behaviors');

				// Behaviors defined on a view can be a flat object literal
				// or it can be a function that returns an object.
				this._behaviors = _.isObject(behaviors) ? parseBehaviors(this, behaviors) : {};
			},
			_getBehaviorTriggers: function _getBehaviorTriggers() {
				var triggers = _invoke(this._behaviors, 'getTriggers');
				return _.extend.apply(_, [{}].concat(_toConsumableArray(triggers)));
			},
			_getBehaviorEvents: function _getBehaviorEvents() {
				var events = _invoke(this._behaviors, 'getEvents');
				return _.extend.apply(_, [{}].concat(_toConsumableArray(events)));
			},

			// proxy behavior $el to the view's $el.
			_proxyBehaviorViewProperties: function _proxyBehaviorViewProperties() {
				_invoke(this._behaviors, 'proxyViewProperties');
			},

			// delegate modelEvents and collectionEvents
			_delegateBehaviorEntityEvents: function _delegateBehaviorEntityEvents() {
				_invoke(this._behaviors, 'delegateEntityEvents');
			},

			// undelegate modelEvents and collectionEvents
			_undelegateBehaviorEntityEvents: function _undelegateBehaviorEntityEvents() {
				_invoke(this._behaviors, 'undelegateEntityEvents');
			},
			_destroyBehaviors: function _destroyBehaviors(args) {
				// Call destroy on each behavior after
				// destroying the view.
				// This unbinds event listeners
				// that behaviors have registered for.
				_invoke.apply(undefined, [this._behaviors, 'destroy'].concat(_toConsumableArray(args)));
			},
			_bindBehaviorUIElements: function _bindBehaviorUIElements() {
				_invoke(this._behaviors, 'bindUIElements');
			},
			_unbindBehaviorUIElements: function _unbindBehaviorUIElements() {
				_invoke(this._behaviors, 'unbindUIElements');
			},
			_triggerEventOnBehaviors: function _triggerEventOnBehaviors() {
				var behaviors = this._behaviors;
				// Use good ol' for as this is a very hot function
				for (var i = 0, length = behaviors && behaviors.length; i < length; i++) {
					triggerMethod.apply(behaviors[i], arguments);
				}
			}
		};

		// MixinOptions
		// - collectionEvents
		// - modelEvents

		var DelegateEntityEventsMixin = {
			// Handle `modelEvents`, and `collectionEvents` configuration
			_delegateEntityEvents: function _delegateEntityEvents(model, collection) {
				this._undelegateEntityEvents(model, collection);

				var modelEvents = _.result(this, 'modelEvents');
				bindEvents.call(this, model, modelEvents);

				var collectionEvents = _.result(this, 'collectionEvents');
				bindEvents.call(this, collection, collectionEvents);
			},
			_undelegateEntityEvents: function _undelegateEntityEvents(model, collection) {
				var modelEvents = _.result(this, 'modelEvents');
				unbindEvents.call(this, model, modelEvents);

				var collectionEvents = _.result(this, 'collectionEvents');
				unbindEvents.call(this, collection, collectionEvents);
			}
		};

		// Borrow event splitter from Backbone
		var delegateEventSplitter = /^(\S+)\s*(.*)$/;

		function uniqueName(eventName, selector) {
			return [eventName + _.uniqueId('.evt'), selector].join(' ');
		}

		// Set event name to be namespaced using a unique index
		// to generate a non colliding event namespace
		// http://api.jquery.com/event.namespace/
		var getUniqueEventName = function getUniqueEventName(eventName) {
			var match = eventName.match(delegateEventSplitter);
			return uniqueName(match[1], match[2]);
		};

		// Internal method to create an event handler for a given `triggerDef` like
		// 'click:foo'
		function buildViewTrigger(view, triggerDef) {
			if (_.isString(triggerDef)) {
				triggerDef = { event: triggerDef };
			}

			var eventName = triggerDef.event;
			var shouldPreventDefault = triggerDef.preventDefault !== false;
			var shouldStopPropagation = triggerDef.stopPropagation !== false;

			return function (e) {
				if (shouldPreventDefault) {
					e.preventDefault();
				}

				if (shouldStopPropagation) {
					e.stopPropagation();
				}

				view.triggerMethod(eventName, view);
			};
		}

		var TriggersMixin = {

			// Configure `triggers` to forward DOM events to view
			// events. `triggers: {"click .foo": "do:foo"}`
			_getViewTriggers: function _getViewTriggers(view, triggers) {
				// Configure the triggers, prevent default
				// action and stop propagation of DOM events
				return _.reduce(triggers, function (events, value, key) {
					key = getUniqueEventName(key);
					events[key] = buildViewTrigger(view, value);
					return events;
				}, {});
			}
		};

		// allows for the use of the @ui. syntax within
		// a given key for triggers and events
		// swaps the @ui with the associated selector.
		// Returns a new, non-mutated, parsed events hash.
		var _normalizeUIKeys = function _normalizeUIKeys(hash, ui) {
			return _.reduce(hash, function (memo, val, key) {
				var normalizedKey = _normalizeUIString(key, ui);
				memo[normalizedKey] = val;
				return memo;
			}, {});
		};

		// utility method for parsing @ui. syntax strings
		// into associated selector
		var _normalizeUIString = function _normalizeUIString(uiString, ui) {
			return uiString.replace(/@ui\.[a-zA-Z-_$0-9]*/g, function (r) {
				return ui[r.slice(4)];
			});
		};

		// allows for the use of the @ui. syntax within
		// a given value for regions
		// swaps the @ui with the associated selector
		var _normalizeUIValues = function _normalizeUIValues(hash, ui, properties) {
			_.each(hash, function (val, key) {
				if (_.isString(val)) {
					hash[key] = _normalizeUIString(val, ui);
				} else if (_.isObject(val) && _.isArray(properties)) {
					_.extend(val, _normalizeUIValues(_.pick(val, properties), ui));
					/* Value is an object, and we got an array of embedded property names to normalize. */
					_.each(properties, function (property) {
						var propertyVal = val[property];
						if (_.isString(propertyVal)) {
							val[property] = _normalizeUIString(propertyVal, ui);
						}
					});
				}
			});
			return hash;
		};

		var UIMixin = {

			// normalize the keys of passed hash with the views `ui` selectors.
			// `{"@ui.foo": "bar"}`
			normalizeUIKeys: function normalizeUIKeys(hash) {
				var uiBindings = this._getUIBindings();
				return _normalizeUIKeys(hash, uiBindings);
			},

			// normalize the passed string with the views `ui` selectors.
			// `"@ui.bar"`
			normalizeUIString: function normalizeUIString(uiString) {
				var uiBindings = this._getUIBindings();
				return _normalizeUIString(uiString, uiBindings);
			},

			// normalize the values of passed hash with the views `ui` selectors.
			// `{foo: "@ui.bar"}`
			normalizeUIValues: function normalizeUIValues(hash, properties) {
				var uiBindings = this._getUIBindings();
				return _normalizeUIValues(hash, uiBindings, properties);
			},
			_getUIBindings: function _getUIBindings() {
				var uiBindings = _.result(this, '_uiBindings');
				var ui = _.result(this, 'ui');
				return uiBindings || ui;
			},

			// This method binds the elements specified in the "ui" hash inside the view's code with
			// the associated jQuery selectors.
			_bindUIElements: function _bindUIElements() {
				var _this = this;

				if (!this.ui) {
					return;
				}

				// store the ui hash in _uiBindings so they can be reset later
				// and so re-rendering the view will be able to find the bindings
				if (!this._uiBindings) {
					this._uiBindings = this.ui;
				}

				// get the bindings result, as a function or otherwise
				var bindings = _.result(this, '_uiBindings');

				// empty the ui so we don't have anything to start with
				this._ui = {};

				// bind each of the selectors
				_.each(bindings, function (selector, key) {
					_this._ui[key] = _this.$(selector);
				});

				this.ui = this._ui;
			},
			_unbindUIElements: function _unbindUIElements() {
				var _this2 = this;

				if (!this.ui || !this._uiBindings) {
					return;
				}

				// delete all of the existing ui bindings
				_.each(this.ui, function ($el, name) {
					delete _this2.ui[name];
				});

				// reset the ui element to the original bindings configuration
				this.ui = this._uiBindings;
				delete this._uiBindings;
				delete this._ui;
			},
			_getUI: function _getUI(name) {
				return this._ui[name];
			}
		};

		// MixinOptions
		// - behaviors
		// - childViewEventPrefix
		// - childViewEvents
		// - childViewTriggers
		// - collectionEvents
		// - modelEvents
		// - triggers
		// - ui


		var ViewMixin = {
			supportsRenderLifecycle: true,
			supportsDestroyLifecycle: true,

			_isDestroyed: false,

			isDestroyed: function isDestroyed() {
				return !!this._isDestroyed;
			},

			_isRendered: false,

			isRendered: function isRendered() {
				return !!this._isRendered;
			},

			_isAttached: false,

			isAttached: function isAttached() {
				return !!this._isAttached;
			},

			// Overriding Backbone.View's `delegateEvents` to handle
			// `events` and `triggers`
			delegateEvents: function delegateEvents(eventsArg) {

				this._proxyBehaviorViewProperties();
				this._buildEventProxies();

				var viewEvents = this._getEvents(eventsArg);

				if (typeof eventsArg === 'undefined') {
					this.events = viewEvents;
				}

				var combinedEvents = _.extend({}, this._getBehaviorEvents(), viewEvents, this._getBehaviorTriggers(), this.getTriggers());

				Backbone.View.prototype.delegateEvents.call(this, combinedEvents);

				return this;
			},
			_getEvents: function _getEvents(eventsArg) {
				var events = eventsArg || this.events;

				if (_.isFunction(events)) {
					return this.normalizeUIKeys(events.call(this));
				}

				return this.normalizeUIKeys(events);
			},

			// Configure `triggers` to forward DOM events to view
			// events. `triggers: {"click .foo": "do:foo"}`
			getTriggers: function getTriggers() {
				if (!this.triggers) {
					return;
				}

				// Allow `triggers` to be configured as a function
				var triggers = this.normalizeUIKeys(_.result(this, 'triggers'));

				// Configure the triggers, prevent default
				// action and stop propagation of DOM events
				return this._getViewTriggers(this, triggers);
			},

			// Handle `modelEvents`, and `collectionEvents` configuration
			delegateEntityEvents: function delegateEntityEvents() {
				this._delegateEntityEvents(this.model, this.collection);

				// bind each behaviors model and collection events
				this._delegateBehaviorEntityEvents();

				return this;
			},

			// Handle unbinding `modelEvents`, and `collectionEvents` configuration
			undelegateEntityEvents: function undelegateEntityEvents() {
				this._undelegateEntityEvents(this.model, this.collection);

				// unbind each behaviors model and collection events
				this._undelegateBehaviorEntityEvents();

				return this;
			},

			// Internal helper method to verify whether the view hasn't been destroyed
			_ensureViewIsIntact: function _ensureViewIsIntact() {
				if (this._isDestroyed) {
					throw new MarionetteError({
						name: 'ViewDestroyedError',
						message: 'View (cid: "' + this.cid + '") has already been destroyed and cannot be used.'
					});
				}
			},

			// Handle destroying the view and its children.
			destroy: function destroy() {
				if (this._isDestroyed) {
					return this;
				}
				var shouldTriggerDetach = !!this._isAttached;

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				this.triggerMethod.apply(this, ['before:destroy', this].concat(args));
				if (shouldTriggerDetach) {
					this.triggerMethod('before:detach', this);
				}

				// unbind UI elements
				this.unbindUIElements();

				// remove the view from the DOM
				// https://github.com/jashkenas/backbone/blob/1.2.3/backbone.js#L1235
				this._removeElement();

				if (shouldTriggerDetach) {
					this._isAttached = false;
					this.triggerMethod('detach', this);
				}

				// remove children after the remove to prevent extra paints
				this._removeChildren();

				this._destroyBehaviors(args);

				this._isDestroyed = true;
				this._isRendered = false;
				this.triggerMethod.apply(this, ['destroy', this].concat(args));

				this.stopListening();

				return this;
			},
			bindUIElements: function bindUIElements() {
				this._bindUIElements();
				this._bindBehaviorUIElements();

				return this;
			},

			// This method unbinds the elements specified in the "ui" hash
			unbindUIElements: function unbindUIElements() {
				this._unbindUIElements();
				this._unbindBehaviorUIElements();

				return this;
			},
			getUI: function getUI(name) {
				this._ensureViewIsIntact();
				return this._getUI(name);
			},

			// used as the prefix for child view events
			// that are forwarded through the layoutview
			childViewEventPrefix: 'childview',

			// import the `triggerMethod` to trigger events with corresponding
			// methods if the method exists
			triggerMethod: function triggerMethod$$() {
				var ret = triggerMethod.apply(this, arguments);

				this._triggerEventOnBehaviors.apply(this, arguments);
				this._triggerEventOnParentLayout.apply(this, arguments);

				return ret;
			},

			// Cache `childViewEvents` and `childViewTriggers`
			_buildEventProxies: function _buildEventProxies() {
				this._childViewEvents = _.result(this, 'childViewEvents');
				this._childViewTriggers = _.result(this, 'childViewTriggers');
			},
			_triggerEventOnParentLayout: function _triggerEventOnParentLayout() {
				var layoutView = this._parentView();
				if (!layoutView) {
					return;
				}

				layoutView._childViewEventHandler.apply(layoutView, arguments);
			},

			// Walk the _parent tree until we find a view (if one exists).
			// Returns the parent view hierarchically closest to this view.
			_parentView: function _parentView() {
				var parent = this._parent;

				while (parent) {
					if (parent instanceof View) {
						return parent;
					}
					parent = parent._parent;
				}
			},
			_childViewEventHandler: function _childViewEventHandler(eventName) {
				var childViewEvents = this.normalizeMethods(this._childViewEvents);

				// call collectionView childViewEvent if defined

				for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
					args[_key2 - 1] = arguments[_key2];
				}

				if (typeof childViewEvents !== 'undefined' && _.isFunction(childViewEvents[eventName])) {
					childViewEvents[eventName].apply(this, args);
				}

				// use the parent view's proxyEvent handlers
				var childViewTriggers = this._childViewTriggers;

				// Call the event with the proxy name on the parent layout
				if (childViewTriggers && _.isString(childViewTriggers[eventName])) {
					this.triggerMethod.apply(this, [childViewTriggers[eventName]].concat(args));
				}

				var prefix = _.result(this, 'childViewEventPrefix');

				if (prefix !== false) {
					var childEventName = prefix + ':' + eventName;

					this.triggerMethod.apply(this, [childEventName].concat(args));
				}
			}
		};

		_.extend(ViewMixin, BehaviorsMixin, CommonMixin, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

		function destroyBackboneView(view) {
			if (!view.supportsDestroyLifecycle) {
				triggerMethodOn(view, 'before:destroy', view);
			}

			var shouldTriggerDetach = !!view._isAttached;

			if (shouldTriggerDetach) {
				triggerMethodOn(view, 'before:detach', view);
			}

			view.remove();

			if (shouldTriggerDetach) {
				view._isAttached = false;
				triggerMethodOn(view, 'detach', view);
			}

			view._isDestroyed = true;

			if (!view.supportsDestroyLifecycle) {
				triggerMethodOn(view, 'destroy', view);
			}
		}

		var ClassOptions$2 = ['allowMissingEl', 'parentEl', 'replaceElement'];

		var Region = MarionetteObject.extend({
			cidPrefix: 'mnr',
			replaceElement: false,
			_isReplaced: false,

			constructor: function constructor(options) {
				this._setOptions(options);

				this.mergeOptions(options, ClassOptions$2);

				// getOption necessary because options.el may be passed as undefined
				this._initEl = this.el = this.getOption('el');

				// Handle when this.el is passed in as a $ wrapped element.
				this.el = this.el instanceof Backbone.$ ? this.el[0] : this.el;

				if (!this.el) {
					throw new MarionetteError({
						name: 'NoElError',
						message: 'An "el" must be specified for a region.'
					});
				}

				this.$el = this.getEl(this.el);
				MarionetteObject.call(this, options);
			},

			// Displays a backbone view instance inside of the region. Handles calling the `render`
			// method for you. Reads content directly from the `el` attribute. The `preventDestroy`
			// option can be used to prevent a view from the old view being destroyed on show.
			show: function show(view, options) {
				if (!this._ensureElement(options)) {
					return;
				}
				this._ensureView(view);
				if (view === this.currentView) {
					return this;
				}

				this.triggerMethod('before:show', this, view, options);

				monitorViewEvents(view);

				this.empty(options);

				// We need to listen for if a view is destroyed in a way other than through the region.
				// If this happens we need to remove the reference to the currentView since once a view
				// has been destroyed we can not reuse it.
				view.on('destroy', this._empty, this);

				// Make this region the view's parent.
				// It's important that this parent binding happens before rendering so that any events
				// the child may trigger during render can also be triggered on the child's ancestor views.
				view._parent = this;

				this._renderView(view);

				this._attachView(view, options);

				this.triggerMethod('show', this, view, options);
				return this;
			},
			_renderView: function _renderView(view) {
				if (view._isRendered) {
					return;
				}

				if (!view.supportsRenderLifecycle) {
					triggerMethodOn(view, 'before:render', view);
				}

				view.render();

				if (!view.supportsRenderLifecycle) {
					view._isRendered = true;
					triggerMethodOn(view, 'render', view);
				}
			},
			_attachView: function _attachView(view) {
				var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var shouldTriggerAttach = !view._isAttached && isNodeAttached(this.el);
				var shouldReplaceEl = typeof options.replaceElement === 'undefined' ? !!_.result(this, 'replaceElement') : !!options.replaceElement;

				if (shouldTriggerAttach) {
					triggerMethodOn(view, 'before:attach', view);
				}

				if (shouldReplaceEl) {
					this._replaceEl(view);
				} else {
					this.attachHtml(view);
				}

				if (shouldTriggerAttach) {
					view._isAttached = true;
					triggerMethodOn(view, 'attach', view);
				}

				this.currentView = view;
			},
			_ensureElement: function _ensureElement() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				if (!_.isObject(this.el)) {
					this.$el = this.getEl(this.el);
					this.el = this.$el[0];
				}

				if (!this.$el || this.$el.length === 0) {
					var allowMissingEl = typeof options.allowMissingEl === 'undefined' ? !!_.result(this, 'allowMissingEl') : !!options.allowMissingEl;

					if (allowMissingEl) {
						return false;
					} else {
						throw new MarionetteError('An "el" must exist in DOM for this region ' + this.cid);
					}
				}
				return true;
			},
			_ensureView: function _ensureView(view) {
				if (!view) {
					throw new MarionetteError({
						name: 'ViewNotValid',
						message: 'The view passed is undefined and therefore invalid. You must pass a view instance to show.'
					});
				}

				if (view._isDestroyed) {
					throw new MarionetteError({
						name: 'ViewDestroyedError',
						message: 'View (cid: "' + view.cid + '") has already been destroyed and cannot be used.'
					});
				}
			},

			// Override this method to change how the region finds the DOM element that it manages. Return
			// a jQuery selector object scoped to a provided parent el or the document if none exists.
			getEl: function getEl(el) {
				return Backbone.$(el, _.result(this, 'parentEl'));
			},
			_replaceEl: function _replaceEl(view) {
				// always restore the el to ensure the regions el is present before replacing
				this._restoreEl();

				var parent = this.el.parentNode;

				parent.replaceChild(view.el, this.el);
				this._isReplaced = true;
			},

			// Restore the region's element in the DOM.
			_restoreEl: function _restoreEl() {
				// There is nothing to replace
				if (!this._isReplaced) {
					return;
				}

				var view = this.currentView;

				if (!view) {
					return;
				}

				var parent = view.el.parentNode;

				if (!parent) {
					return;
				}

				parent.replaceChild(this.el, view.el);
				this._isReplaced = false;
			},

			// Check to see if the region's el was replaced.
			isReplaced: function isReplaced() {
				return !!this._isReplaced;
			},

			// Override this method to change how the new view is appended to the `$el` that the
			// region is managing
			attachHtml: function attachHtml(view) {
				this.el.appendChild(view.el);
			},

			// Destroy the current view, if there is one. If there is no current view, it does
			// nothing and returns immediately.
			empty: function empty() {
				var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { allowMissingEl: true };

				var view = this.currentView;

				// If there is no view in the region we should only detach current html
				if (!view) {
					if (this._ensureElement(options)) {
						this.detachHtml();
					}
					return this;
				}

				var shouldDestroy = !options.preventDestroy;

				if (!shouldDestroy) {
					deprecate('The preventDestroy option is deprecated. Use Region#detachView');
				}

				this._empty(view, shouldDestroy);
				return this;
			},
			_empty: function _empty(view, shouldDestroy) {
				view.off('destroy', this._empty, this);
				this.triggerMethod('before:empty', this, view);

				this._restoreEl();

				delete this.currentView;

				if (!view._isDestroyed) {
					this._removeView(view, shouldDestroy);
					delete view._parent;
				}

				this.triggerMethod('empty', this, view);
			},
			_removeView: function _removeView(view, shouldDestroy) {
				if (!shouldDestroy) {
					this._detachView(view);
					return;
				}

				if (view.destroy) {
					view.destroy();
				} else {
					destroyBackboneView(view);
				}
			},
			detachView: function detachView() {
				var view = this.currentView;

				if (!view) {
					return;
				}

				this._empty(view);

				return view;
			},
			_detachView: function _detachView(view) {
				var shouldTriggerDetach = !!view._isAttached;
				if (shouldTriggerDetach) {
					triggerMethodOn(view, 'before:detach', view);
				}

				this.detachHtml();

				if (shouldTriggerDetach) {
					view._isAttached = false;
					triggerMethodOn(view, 'detach', view);
				}
			},

			// Override this method to change how the region detaches current content
			detachHtml: function detachHtml() {
				this.$el.contents().detach();
			},

			// Checks whether a view is currently present within the region. Returns `true` if there is
			// and `false` if no view is present.
			hasView: function hasView() {
				return !!this.currentView;
			},

			// Reset the region by destroying any existing view and clearing out the cached `$el`.
			// The next time a view is shown via this region, the region will re-query the DOM for
			// the region's `el`.
			reset: function reset(options) {
				this.empty(options);

				if (this.$el) {
					this.el = this._initEl;
				}

				delete this.$el;
				return this;
			},
			destroy: function destroy(options) {
				this.reset(options);
				return MarionetteObject.prototype.destroy.apply(this, arguments);
			}
		});

		// return the region instance from the definition
		function buildRegion(definition, defaults) {
			if (definition instanceof Region) {
				return definition;
			}

			return buildRegionFromDefinition(definition, defaults);
		}

		function buildRegionFromDefinition(definition, defaults) {
			var opts = _.extend({}, defaults);

			if (_.isString(definition)) {
				_.extend(opts, { el: definition });

				return buildRegionFromObject(opts);
			}

			if (_.isFunction(definition)) {
				_.extend(opts, { regionClass: definition });

				return buildRegionFromObject(opts);
			}

			if (_.isObject(definition)) {
				if (definition.selector) {
					deprecate('The selector option on a Region definition object is deprecated. Use el to pass a selector string');
				}

				_.extend(opts, { el: definition.selector }, definition);

				return buildRegionFromObject(opts);
			}

			throw new MarionetteError({
				message: 'Improper region configuration type.',
				url: 'marionette.region.html#region-configuration-types'
			});
		}

		function buildRegionFromObject(definition) {
			var RegionClass = definition.regionClass;

			var options = _.omit(definition, 'regionClass');

			return new RegionClass(options);
		}

		// MixinOptions
		// - regions
		// - regionClass

		var RegionsMixin = {
			regionClass: Region,

			// Internal method to initialize the regions that have been defined in a
			// `regions` attribute on this View.
			_initRegions: function _initRegions() {

				// init regions hash
				this.regions = this.regions || {};
				this._regions = {};

				this.addRegions(_.result(this, 'regions'));
			},

			// Internal method to re-initialize all of the regions by updating
			// the `el` that they point to
			_reInitRegions: function _reInitRegions() {
				_invoke(this._regions, 'reset');
			},

			// Add a single region, by name, to the View
			addRegion: function addRegion(name, definition) {
				var regions = {};
				regions[name] = definition;
				return this.addRegions(regions)[name];
			},

			// Add multiple regions as a {name: definition, name2: def2} object literal
			addRegions: function addRegions(regions) {
				// If there's nothing to add, stop here.
				if (_.isEmpty(regions)) {
					return;
				}

				// Normalize region selectors hash to allow
				// a user to use the @ui. syntax.
				regions = this.normalizeUIValues(regions, ['selector', 'el']);

				// Add the regions definitions to the regions property
				this.regions = _.extend({}, this.regions, regions);

				return this._addRegions(regions);
			},

			// internal method to build and add regions
			_addRegions: function _addRegions(regionDefinitions) {
				var _this = this;

				var defaults = {
					regionClass: this.regionClass,
					parentEl: _.partial(_.result, this, 'el')
				};

				return _.reduce(regionDefinitions, function (regions, definition, name) {
					regions[name] = buildRegion(definition, defaults);
					_this._addRegion(regions[name], name);
					return regions;
				}, {});
			},
			_addRegion: function _addRegion(region, name) {
				this.triggerMethod('before:add:region', this, name, region);

				region._parent = this;

				this._regions[name] = region;

				this.triggerMethod('add:region', this, name, region);
			},

			// Remove a single region from the View, by name
			removeRegion: function removeRegion(name) {
				var region = this._regions[name];

				this._removeRegion(region, name);

				return region;
			},

			// Remove all regions from the View
			removeRegions: function removeRegions() {
				var regions = this.getRegions();

				_.each(this._regions, _.bind(this._removeRegion, this));

				return regions;
			},
			_removeRegion: function _removeRegion(region, name) {
				this.triggerMethod('before:remove:region', this, name, region);

				region.destroy();

				delete this.regions[name];
				delete this._regions[name];

				this.triggerMethod('remove:region', this, name, region);
			},

			// Empty all regions in the region manager, but
			// leave them attached
			emptyRegions: function emptyRegions() {
				var regions = this.getRegions();
				_invoke(regions, 'empty');
				return regions;
			},

			// Checks to see if view contains region
			// Accepts the region name
			// hasRegion('main')
			hasRegion: function hasRegion(name) {
				return !!this.getRegion(name);
			},

			// Provides access to regions
			// Accepts the region name
			// getRegion('main')
			getRegion: function getRegion(name) {
				return this._regions[name];
			},

			// Get all regions
			getRegions: function getRegions() {
				return _.clone(this._regions);
			},
			showChildView: function showChildView(name, view) {
				var region = this.getRegion(name);

				for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
					args[_key - 2] = arguments[_key];
				}

				return region.show.apply(region, [view].concat(args));
			},
			detachChildView: function detachChildView(name) {
				return this.getRegion(name).detachView();
			},
			getChildView: function getChildView(name) {
				return this.getRegion(name).currentView;
			}
		};

		// Render a template with data by passing in the template
		// selector and the data to render.
		var Renderer = {

			// Render a template with data. The `template` parameter is
			// passed to the `TemplateCache` object to retrieve the
			// template function. Override this method to provide your own
			// custom rendering and template handling for all of Marionette.
			render: function render(template, data) {
				if (!template) {
					throw new MarionetteError({
						name: 'TemplateNotFoundError',
						message: 'Cannot render the template since its false, null or undefined.'
					});
				}

				var templateFunc = _.isFunction(template) ? template : TemplateCache.get(template);

				return templateFunc(data);
			}
		};

		var ClassOptions$1 = ['behaviors', 'childViewEventPrefix', 'childViewEvents', 'childViewTriggers', 'collectionEvents', 'events', 'modelEvents', 'regionClass', 'regions', 'template', 'templateContext', 'triggers', 'ui'];

		// The standard view. Includes view events, automatic rendering
		// of Underscore templates, nested views, and more.
		var View = Backbone.View.extend({
			constructor: function constructor(options) {
				this.render = _.bind(this.render, this);

				this._setOptions(options);

				this.mergeOptions(options, ClassOptions$1);

				monitorViewEvents(this);

				this._initBehaviors();
				this._initRegions();

				var args = Array.prototype.slice.call(arguments);
				args[0] = this.options;
				Backbone.View.prototype.constructor.apply(this, args);

				this.delegateEntityEvents();
			},

			// Serialize the view's model *or* collection, if
			// it exists, for the template
			serializeData: function serializeData() {
				if (!this.model && !this.collection) {
					return {};
				}

				// If we have a model, we serialize that
				if (this.model) {
					return this.serializeModel();
				}

				// Otherwise, we serialize the collection,
				// making it available under the `items` property
				return {
					items: this.serializeCollection()
				};
			},

			// Prepares the special `model` property of a view
			// for being displayed in the template. By default
			// we simply clone the attributes. Override this if
			// you need a custom transformation for your view's model
			serializeModel: function serializeModel() {
				if (!this.model) {
					return {};
				}
				return _.clone(this.model.attributes);
			},

			// Serialize a collection by cloning each of
			// its model's attributes
			serializeCollection: function serializeCollection() {
				if (!this.collection) {
					return {};
				}
				return this.collection.map(function (model) {
					return _.clone(model.attributes);
				});
			},

			// Overriding Backbone.View's `setElement` to handle
			// if an el was previously defined. If so, the view might be
			// rendered or attached on setElement.
			setElement: function setElement() {
				var hasEl = !!this.el;

				Backbone.View.prototype.setElement.apply(this, arguments);

				if (hasEl) {
					this._isRendered = !!this.$el.length;
					this._isAttached = isNodeAttached(this.el);
				}

				if (this._isRendered) {
					this.bindUIElements();
				}

				return this;
			},

			// Render the view, defaulting to underscore.js templates.
			// You can override this in your view definition to provide
			// a very specific rendering for your view. In general, though,
			// you should override the `Marionette.Renderer` object to
			// change how Marionette renders views.
			// Subsequent renders after the first will re-render all nested
			// views.
			render: function render() {
				this._ensureViewIsIntact();

				this.triggerMethod('before:render', this);

				// If this is not the first render call, then we need to
				// re-initialize the `el` for each region
				if (this._isRendered) {
					this._reInitRegions();
				}

				this._renderTemplate();
				this.bindUIElements();

				this._isRendered = true;
				this.triggerMethod('render', this);

				return this;
			},

			// Internal method to render the template with the serialized data
			// and template context via the `Marionette.Renderer` object.
			_renderTemplate: function _renderTemplate() {
				var template = this.getTemplate();

				// Allow template-less views
				if (template === false) {
					return;
				}

				// Add in entity data and template context
				var data = this.mixinTemplateContext(this.serializeData());

				// Render and add to el
				var html = Renderer.render(template, data, this);
				this.attachElContent(html);
			},

			// Get the template for this view
			// instance. You can set a `template` attribute in the view
			// definition or pass a `template: "whatever"` parameter in
			// to the constructor options.
			getTemplate: function getTemplate() {
				return this.template;
			},

			// Mix in template context methods. Looks for a
			// `templateContext` attribute, which can either be an
			// object literal, or a function that returns an object
			// literal. All methods and attributes from this object
			// are copies to the object passed in.
			mixinTemplateContext: function mixinTemplateContext() {
				var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

				var templateContext = _.result(this, 'templateContext');
				return _.extend(target, templateContext);
			},

			// Attaches the content of a given view.
			// This method can be overridden to optimize rendering,
			// or to render in a non standard way.
			//
			// For example, using `innerHTML` instead of `$el.html`
			//
			// ```js
			// attachElContent(html) {
			//   this.el.innerHTML = html;
			//   return this;
			// }
			// ```
			attachElContent: function attachElContent(html) {
				this.$el.html(html);

				return this;
			},

			// called by ViewMixin destroy
			_removeChildren: function _removeChildren() {
				this.removeRegions();
			},
			_getImmediateChildren: function _getImmediateChildren() {
				return _.chain(this.getRegions()).map('currentView').compact().value();
			}
		});

		_.extend(View.prototype, ViewMixin, RegionsMixin);

		var methods = ['forEach', 'each', 'map', 'find', 'detect', 'filter', 'select', 'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke', 'toArray', 'first', 'initial', 'rest', 'last', 'without', 'isEmpty', 'pluck', 'reduce'];

		var emulateCollection = function emulateCollection(object, listProperty) {
			_.each(methods, function (method) {
				object[method] = function () {
					var list = _.values(_.result(this, listProperty));
					var args = [list].concat(_.toArray(arguments));
					return _[method].apply(_, args);
				};
			});
		};

		// Provide a container to store, retrieve and
		// shut down child views.
		var Container = function Container(views) {
			this._views = {};
			this._indexByModel = {};
			this._indexByCustom = {};
			this._updateLength();

			_.each(views, _.bind(this.add, this));
		};

		emulateCollection(Container.prototype, '_views');

		// Container Methods
		// -----------------

		_.extend(Container.prototype, {

			// Add a view to this container. Stores the view
			// by `cid` and makes it searchable by the model
			// cid (and model itself). Optionally specify
			// a custom key to store an retrieve the view.
			add: function add(view, customIndex) {
				return this._add(view, customIndex)._updateLength();
			},

			// To be used when avoiding call _updateLength
			// When you are done adding all your new views
			// call _updateLength
			_add: function _add(view, customIndex) {
				var viewCid = view.cid;

				// store the view
				this._views[viewCid] = view;

				// index it by model
				if (view.model) {
					this._indexByModel[view.model.cid] = viewCid;
				}

				// index by custom
				if (customIndex) {
					this._indexByCustom[customIndex] = viewCid;
				}

				return this;
			},

			// Find a view by the model that was attached to
			// it. Uses the model's `cid` to find it.
			findByModel: function findByModel(model) {
				return this.findByModelCid(model.cid);
			},

			// Find a view by the `cid` of the model that was attached to
			// it. Uses the model's `cid` to find the view `cid` and
			// retrieve the view using it.
			findByModelCid: function findByModelCid(modelCid) {
				var viewCid = this._indexByModel[modelCid];
				return this.findByCid(viewCid);
			},

			// Find a view by a custom indexer.
			findByCustom: function findByCustom(index) {
				var viewCid = this._indexByCustom[index];
				return this.findByCid(viewCid);
			},

			// Find by index. This is not guaranteed to be a
			// stable index.
			findByIndex: function findByIndex(index) {
				return _.values(this._views)[index];
			},

			// retrieve a view by its `cid` directly
			findByCid: function findByCid(cid) {
				return this._views[cid];
			},

			// Remove a view
			remove: function remove(view) {
				return this._remove(view)._updateLength();
			},

			// To be used when avoiding call _updateLength
			// When you are done adding all your new views
			// call _updateLength
			_remove: function _remove(view) {
				var viewCid = view.cid;

				// delete model index
				if (view.model) {
					delete this._indexByModel[view.model.cid];
				}

				// delete custom index
				_.some(this._indexByCustom, _.bind(function (cid, key) {
					if (cid === viewCid) {
						delete this._indexByCustom[key];
						return true;
					}
				}, this));

				// remove the view from the container
				delete this._views[viewCid];

				return this;
			},

			// Update the `.length` attribute on this container
			_updateLength: function _updateLength() {
				this.length = _.size(this._views);

				return this;
			}
		});

		var ClassOptions$3 = ['behaviors', 'childView', 'childViewEventPrefix', 'childViewEvents', 'childViewOptions', 'childViewTriggers', 'collectionEvents', 'events', 'filter', 'emptyView', 'emptyViewOptions', 'modelEvents', 'reorderOnSort', 'sort', 'triggers', 'ui', 'viewComparator'];

		// A view that iterates over a Backbone.Collection
		// and renders an individual child view for each model.
		var CollectionView = Backbone.View.extend({

			// flag for maintaining the sorted order of the collection
			sort: true,

			// constructor
			// option to pass `{sort: false}` to prevent the `CollectionView` from
			// maintaining the sorted order of the collection.
			// This will fallback onto appending childView's to the end.
			//
			// option to pass `{viewComparator: compFunction()}` to allow the `CollectionView`
			// to use a custom sort order for the collection.
			constructor: function constructor(options) {
				this.render = _.bind(this.render, this);

				this._setOptions(options);

				this.mergeOptions(options, ClassOptions$3);

				monitorViewEvents(this);

				this._initBehaviors();
				this.once('render', this._initialEvents);
				this._initChildViewStorage();
				this._bufferedChildren = [];

				var args = Array.prototype.slice.call(arguments);
				args[0] = this.options;
				Backbone.View.prototype.constructor.apply(this, args);

				this.delegateEntityEvents();
			},

			// Instead of inserting elements one by one into the page, it's much more performant to insert
			// elements into a document fragment and then insert that document fragment into the page
			_startBuffering: function _startBuffering() {
				this._isBuffering = true;
			},
			_endBuffering: function _endBuffering() {
				var shouldTriggerAttach = !!this._isAttached;
				var triggerOnChildren = shouldTriggerAttach ? this._getImmediateChildren() : [];

				this._isBuffering = false;

				_.each(triggerOnChildren, function (child) {
					triggerMethodOn(child, 'before:attach', child);
				});

				this.attachBuffer(this, this._createBuffer());

				_.each(triggerOnChildren, function (child) {
					child._isAttached = true;
					triggerMethodOn(child, 'attach', child);
				});

				this._bufferedChildren = [];
			},
			_getImmediateChildren: function _getImmediateChildren() {
				return _.values(this.children._views);
			},

			// Configured the initial events that the collection view binds to.
			_initialEvents: function _initialEvents() {
				if (this.collection) {
					this.listenTo(this.collection, 'add', this._onCollectionAdd);
					this.listenTo(this.collection, 'update', this._onCollectionUpdate);
					this.listenTo(this.collection, 'reset', this.render);

					if (this.sort) {
						this.listenTo(this.collection, 'sort', this._sortViews);
					}
				}
			},

			// Handle a child added to the collection
			_onCollectionAdd: function _onCollectionAdd(child, collection, opts) {
				// `index` is present when adding with `at` since BB 1.2; indexOf fallback for < 1.2
				var index = opts.at !== undefined && (opts.index || collection.indexOf(child));

				// When filtered or when there is no initial index, calculate index.
				if (this.filter || index === false) {
					index = _.indexOf(this._filteredSortedModels(index), child);
				}

				if (this._shouldAddChild(child, index)) {
					this._destroyEmptyView();
					this._addChild(child, index);
				}
			},

			// Handle collection update model removals
			_onCollectionUpdate: function _onCollectionUpdate(collection, options) {
				var changes = options.changes;
				this._removeChildModels(changes.removed);
			},

			// Remove the child views and destroy them.
			// This function also updates the indices of later views
			// in the collection in order to keep the children in sync with the collection.
			// "models" is an array of models and the corresponding views
			// will be removed and destroyed from the CollectionView
			_removeChildModels: function _removeChildModels(models) {
				var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var checkEmpty = _ref.checkEmpty;

				var shouldCheckEmpty = checkEmpty !== false;

				// Used to determine where to update the remaining
				// sibling view indices after these views are removed.
				var removedViews = this._getRemovedViews(models);

				if (!removedViews.length) {
					return;
				}

				this.children._updateLength();

				// decrement the index of views after this one
				this._updateIndices(removedViews, false);

				if (shouldCheckEmpty) {
					this._checkEmpty();
				}
			},

			// Returns the views that will be used for re-indexing
			// through CollectionView#_updateIndices.
			_getRemovedViews: function _getRemovedViews(models) {
				var _this = this;

				// Returning a view means something was removed.
				return _.reduce(models, function (removingViews, model) {
					var view = _this.children.findByModel(model);

					if (!view || view._isDestroyed) {
						return removingViews;
					}

					_this._removeChildView(view);

					removingViews.push(view);

					return removingViews;
				}, []);
			},
			_findGreatestIndexedView: function _findGreatestIndexedView(views) {

				return _.reduce(views, function (greatestIndexedView, view) {
					// Even if the index is `undefined`, a view will get returned.
					if (!greatestIndexedView || greatestIndexedView._index < view._index) {
						return view;
					}

					return greatestIndexedView;
				}, undefined);
			},
			_removeChildView: function _removeChildView(view) {
				this.triggerMethod('before:remove:child', this, view);

				this.children._remove(view);
				if (view.destroy) {
					view.destroy();
				} else {
					destroyBackboneView(view);
				}

				delete view._parent;
				this.stopListening(view);
				this.triggerMethod('remove:child', this, view);
			},

			// Overriding Backbone.View's `setElement` to handle
			// if an el was previously defined. If so, the view might be
			// attached on setElement.
			setElement: function setElement() {
				var hasEl = !!this.el;

				Backbone.View.prototype.setElement.apply(this, arguments);

				if (hasEl) {
					this._isAttached = isNodeAttached(this.el);
				}

				return this;
			},

			// Render children views. Override this method to provide your own implementation of a
			// render function for the collection view.
			render: function render() {
				this._ensureViewIsIntact();
				this.triggerMethod('before:render', this);
				this._renderChildren();
				this._isRendered = true;
				this.triggerMethod('render', this);
				return this;
			},

			// An efficient rendering used for filtering. Instead of modifying the whole DOM for the
			// collection view, we are only adding or removing the related childrenViews.
			setFilter: function setFilter(filter) {
				var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

				var preventRender = _ref2.preventRender;

				var canBeRendered = this._isRendered && !this._isDestroyed;
				var filterChanged = this.filter !== filter;
				var shouldRender = canBeRendered && filterChanged && !preventRender;

				if (shouldRender) {
					var previousModels = this._filteredSortedModels();
					this.filter = filter;
					var models = this._filteredSortedModels();
					this._applyModelDeltas(models, previousModels);
				} else {
					this.filter = filter;
				}

				return this;
			},

			// `removeFilter` is actually an alias for removing filters.
			removeFilter: function removeFilter(options) {
				return this.setFilter(null, options);
			},

			// Calculate and apply difference by cid between `models` and `previousModels`.
			_applyModelDeltas: function _applyModelDeltas(models, previousModels) {
				var _this2 = this;

				var currentIds = {};
				_.each(models, function (model, index) {
					var addedChildNotExists = !_this2.children.findByModel(model);
					if (addedChildNotExists) {
						_this2._onCollectionAdd(model, _this2.collection, { at: index });
					}
					currentIds[model.cid] = true;
				});

				var removeModels = _.filter(previousModels, function (prevModel) {
					return !currentIds[prevModel.cid] && _this2.children.findByModel(prevModel);
				});

				this._removeChildModels(removeModels);
			},

			// Reorder DOM after sorting. When your element's rendering do not use their index,
			// you can pass reorderOnSort: true to only reorder the DOM after a sort instead of
			// rendering all the collectionView.
			reorder: function reorder() {
				var _this3 = this;

				var children = this.children;
				var models = this._filteredSortedModels();

				if (!models.length && this._showingEmptyView) {
					return this;
				}

				var anyModelsAdded = _.some(models, function (model) {
					return !children.findByModel(model);
				});

				// If there are any new models added due to filtering we need to add child views,
				// so render as normal.
				if (anyModelsAdded) {
					this.render();
				} else {
					(function () {

						var filteredOutModels = [];

						// Get the DOM nodes in the same order as the models and
						// find the model that were children before but aren't in this new order.
						var elsToReorder = children.reduce(function (viewEls, view) {
							var index = _.indexOf(models, view.model);

							if (index === -1) {
								filteredOutModels.push(view.model);
								return viewEls;
							}

							view._index = index;

							viewEls[index] = view.el;

							return viewEls;
						}, new Array(models.length));

						_this3.triggerMethod('before:reorder', _this3);

						// Since append moves elements that are already in the DOM, appending the elements
						// will effectively reorder them.
						_this3._appendReorderedChildren(elsToReorder);

						// remove any views that have been filtered out
						_this3._removeChildModels(filteredOutModels);

						_this3.triggerMethod('reorder', _this3);
					})();
				}
				return this;
			},

			// Render view after sorting. Override this method to change how the view renders
			// after a `sort` on the collection.
			resortView: function resortView() {
				if (this.reorderOnSort) {
					this.reorder();
				} else {
					this._renderChildren();
				}
				return this;
			},

			// Internal method. This checks for any changes in the order of the collection.
			// If the index of any view doesn't match, it will render.
			_sortViews: function _sortViews() {
				var _this4 = this;

				var models = this._filteredSortedModels();

				// check for any changes in sort order of views
				var orderChanged = _.find(models, function (item, index) {
					var view = _this4.children.findByModel(item);
					return !view || view._index !== index;
				});

				if (orderChanged) {
					this.resortView();
				}
			},

			// Internal reference to what index a `emptyView` is.
			_emptyViewIndex: -1,

			// Internal method. Separated so that CompositeView can append to the childViewContainer
			// if necessary
			_appendReorderedChildren: function _appendReorderedChildren(children) {
				this.$el.append(children);
			},

			// Internal method. Separated so that CompositeView can have more control over events
			// being triggered, around the rendering process
			_renderChildren: function _renderChildren() {
				if (this._isRendered) {
					this._destroyEmptyView();
					this._destroyChildren({ checkEmpty: false });
				}

				var models = this._filteredSortedModels();
				if (this.isEmpty({ processedModels: models })) {
					this._showEmptyView();
				} else {
					this.triggerMethod('before:render:children', this);
					this._startBuffering();
					this._showCollection(models);
					this._endBuffering();
					this.triggerMethod('render:children', this);
				}
			},
			_createView: function _createView(model, index) {
				var ChildView = this._getChildView(model);
				var childViewOptions = this._getChildViewOptions(model, index);
				var view = this.buildChildView(model, ChildView, childViewOptions);
				return view;
			},
			_setupChildView: function _setupChildView(view, index) {
				view._parent = this;

				monitorViewEvents(view);

				// set up the child view event forwarding
				this._proxyChildEvents(view);

				if (this.sort) {
					view._index = index;
				}
			},

			// Internal method to loop through collection and show each child view.
			_showCollection: function _showCollection(models) {
				_.each(models, _.bind(this._addChild, this));
				this.children._updateLength();
			},

			// Allow the collection to be sorted by a custom view comparator
			_filteredSortedModels: function _filteredSortedModels(addedAt) {
				if (!this.collection || !this.collection.length) {
					return [];
				}

				var viewComparator = this.getViewComparator();
				var models = this.collection.models;
				addedAt = Math.min(Math.max(addedAt, 0), models.length - 1);

				if (viewComparator) {
					var addedModel = void 0;
					// Preserve `at` location, even for a sorted view
					if (addedAt) {
						addedModel = models[addedAt];
						models = models.slice(0, addedAt).concat(models.slice(addedAt + 1));
					}
					models = this._sortModelsBy(models, viewComparator);
					if (addedModel) {
						models.splice(addedAt, 0, addedModel);
					}
				}

				// Filter after sorting in case the filter uses the index
				models = this._filterModels(models);

				return models;
			},
			getViewComparator: function getViewComparator() {
				return this.viewComparator;
			},

			// Filter an array of models, if a filter exists
			_filterModels: function _filterModels(models) {
				var _this5 = this;

				if (this.filter) {
					models = _.filter(models, function (model, index) {
						return _this5._shouldAddChild(model, index);
					});
				}
				return models;
			},
			_sortModelsBy: function _sortModelsBy(models, comparator) {
				if (typeof comparator === 'string') {
					return _.sortBy(models, function (model) {
						return model.get(comparator);
					});
				} else if (comparator.length === 1) {
					return _.sortBy(models, _.bind(comparator, this));
				} else {
					return models.sort(_.bind(comparator, this));
				}
			},

			// Internal method to show an empty view in place of a collection of child views,
			// when the collection is empty
			_showEmptyView: function _showEmptyView() {
				var EmptyView = this._getEmptyView();

				if (EmptyView && !this._showingEmptyView) {
					this._showingEmptyView = true;

					var model = new Backbone.Model();
					var emptyViewOptions = this.emptyViewOptions || this.childViewOptions;
					if (_.isFunction(emptyViewOptions)) {
						emptyViewOptions = emptyViewOptions.call(this, model, this._emptyViewIndex);
					}

					var view = this.buildChildView(model, EmptyView, emptyViewOptions);

					this.triggerMethod('before:render:empty', this, view);
					this.addChildView(view, 0);
					this.triggerMethod('render:empty', this, view);
				}
			},

			// Internal method to destroy an existing emptyView instance if one exists. Called when
			// a collection view has been rendered empty, and then a child is added to the collection.
			_destroyEmptyView: function _destroyEmptyView() {
				if (this._showingEmptyView) {
					this.triggerMethod('before:remove:empty', this);

					this._destroyChildren();
					delete this._showingEmptyView;

					this.triggerMethod('remove:empty', this);
				}
			},

			// Retrieve the empty view class
			_getEmptyView: function _getEmptyView() {
				var emptyView = this.emptyView;

				if (!emptyView) {
					return;
				}

				return this._getView(emptyView);
			},

			// Retrieve the `childView` class
			// The `childView` property can be either a view class or a function that
			// returns a view class. If it is a function, it will receive the model that
			// will be passed to the view instance (created from the returned view class)
			_getChildView: function _getChildView(child) {
				var childView = this.childView;

				if (!childView) {
					throw new MarionetteError({
						name: 'NoChildViewError',
						message: 'A "childView" must be specified'
					});
				}

				childView = this._getView(childView, child);

				if (!childView) {
					throw new MarionetteError({
						name: 'InvalidChildViewError',
						message: '"childView" must be a view class or a function that returns a view class'
					});
				}

				return childView;
			},

			// First check if the `view` is a view class (the common case)
			// Then check if it's a function (which we assume that returns a view class)
			_getView: function _getView(view, child) {
				if (view.prototype instanceof Backbone.View || view === Backbone.View) {
					return view;
				} else if (_.isFunction(view)) {
					return view.call(this, child);
				}
			},

			// Internal method for building and adding a child view
			_addChild: function _addChild(child, index) {
				var view = this._createView(child, index);
				this.addChildView(view, index);

				return view;
			},
			_getChildViewOptions: function _getChildViewOptions(child, index) {
				if (_.isFunction(this.childViewOptions)) {
					return this.childViewOptions(child, index);
				}

				return this.childViewOptions;
			},

			// Render the child's view and add it to the HTML for the collection view at a given index.
			// This will also update the indices of later views in the collection in order to keep the
			// children in sync with the collection.
			addChildView: function addChildView(view, index) {
				this.triggerMethod('before:add:child', this, view);
				this._setupChildView(view, index);

				// Store the child view itself so we can properly remove and/or destroy it later
				if (this._isBuffering) {
					// Add to children, but don't update children's length.
					this.children._add(view);
				} else {
					// increment indices of views after this one
					this._updateIndices(view, true);
					this.children.add(view);
				}

				this._renderView(view);

				this._attachView(view, index);

				this.triggerMethod('add:child', this, view);

				return view;
			},

			// Internal method. This decrements or increments the indices of views after the added/removed
			// view to keep in sync with the collection.
			_updateIndices: function _updateIndices(views, increment) {
				if (!this.sort) {
					return;
				}

				var view = _.isArray(views) ? this._findGreatestIndexedView(views) : views;

				// update the indexes of views after this one
				this.children.each(function (laterView) {
					if (laterView._index >= view._index) {
						laterView._index += increment ? 1 : -1;
					}
				});
			},
			_renderView: function _renderView(view) {
				if (view._isRendered) {
					return;
				}

				if (!view.supportsRenderLifecycle) {
					triggerMethodOn(view, 'before:render', view);
				}

				view.render();

				if (!view.supportsRenderLifecycle) {
					view._isRendered = true;
					triggerMethodOn(view, 'render', view);
				}
			},
			_attachView: function _attachView(view, index) {
				// Only trigger attach if already attached and not buffering,
				// otherwise _endBuffering() or Region#show() handles this.
				var shouldTriggerAttach = !view._isAttached && !this._isBuffering && this._isAttached;

				if (shouldTriggerAttach) {
					triggerMethodOn(view, 'before:attach', view);
				}

				this.attachHtml(this, view, index);

				if (shouldTriggerAttach) {
					view._isAttached = true;
					triggerMethodOn(view, 'attach', view);
				}
			},

			// Build a `childView` for a model in the collection.
			buildChildView: function buildChildView(child, ChildViewClass, childViewOptions) {
				var options = _.extend({ model: child }, childViewOptions);
				return new ChildViewClass(options);
			},

			// Remove the child view and destroy it. This function also updates the indices of later views
			// in the collection in order to keep the children in sync with the collection.
			removeChildView: function removeChildView(view) {
				if (!view || view._isDestroyed) {
					return view;
				}

				this._removeChildView(view);
				this.children._updateLength();
				// decrement the index of views after this one
				this._updateIndices(view, false);
				return view;
			},

			// check if the collection is empty or optionally whether an array of pre-processed models is empty
			isEmpty: function isEmpty(options) {
				var models = void 0;
				if (_.result(options, 'processedModels')) {
					models = options.processedModels;
				} else {
					models = this.collection ? this.collection.models : [];
					models = this._filterModels(models);
				}
				return models.length === 0;
			},

			// If empty, show the empty view
			_checkEmpty: function _checkEmpty() {
				if (this.isEmpty()) {
					this._showEmptyView();
				}
			},

			// You might need to override this if you've overridden attachHtml
			attachBuffer: function attachBuffer(collectionView, buffer) {
				collectionView.$el.append(buffer);
			},

			// Create a fragment buffer from the currently buffered children
			_createBuffer: function _createBuffer() {
				var elBuffer = document.createDocumentFragment();
				_.each(this._bufferedChildren, function (b) {
					elBuffer.appendChild(b.el);
				});
				return elBuffer;
			},

			// Append the HTML to the collection's `el`. Override this method to do something other
			// than `.append`.
			attachHtml: function attachHtml(collectionView, childView, index) {
				if (collectionView._isBuffering) {
					// buffering happens on reset events and initial renders
					// in order to reduce the number of inserts into the
					// document, which are expensive.
					collectionView._bufferedChildren.splice(index, 0, childView);
				} else {
					// If we've already rendered the main collection, append
					// the new child into the correct order if we need to. Otherwise
					// append to the end.
					if (!collectionView._insertBefore(childView, index)) {
						collectionView._insertAfter(childView);
					}
				}
			},

			// Internal method. Check whether we need to insert the view into the correct position.
			_insertBefore: function _insertBefore(childView, index) {
				var currentView = void 0;
				var findPosition = this.sort && index < this.children.length - 1;
				if (findPosition) {
					// Find the view after this one
					currentView = this.children.find(function (view) {
						return view._index === index + 1;
					});
				}

				if (currentView) {
					currentView.$el.before(childView.el);
					return true;
				}

				return false;
			},

			// Internal method. Append a view to the end of the $el
			_insertAfter: function _insertAfter(childView) {
				this.$el.append(childView.el);
			},

			// Internal method to set up the `children` object for storing all of the child views
			_initChildViewStorage: function _initChildViewStorage() {
				this.children = new Container();
			},

			// called by ViewMixin destroy
			_removeChildren: function _removeChildren() {
				this._destroyChildren({ checkEmpty: false });
			},

			// Destroy the child views that this collection view is holding on to, if any
			_destroyChildren: function _destroyChildren(options) {
				if (!this.children.length) {
					return;
				}

				this.triggerMethod('before:destroy:children', this);
				var childModels = this.children.map('model');
				this._removeChildModels(childModels, options);
				this.triggerMethod('destroy:children', this);
			},

			// Return true if the given child should be shown. Return false otherwise.
			// The filter will be passed (child, index, collection), where
			//  'child' is the given model
			//  'index' is the index of that model in the collection
			//  'collection' is the collection referenced by this CollectionView
			_shouldAddChild: function _shouldAddChild(child, index) {
				var filter = this.filter;
				return !_.isFunction(filter) || filter.call(this, child, index, this.collection);
			},

			// Set up the child view event forwarding. Uses a "childview:" prefix in front of all forwarded events.
			_proxyChildEvents: function _proxyChildEvents(view) {
				this.listenTo(view, 'all', this._childViewEventHandler);
			}
		});

		_.extend(CollectionView.prototype, ViewMixin);

		var ClassOptions$4 = ['childViewContainer', 'template', 'templateContext'];

		// Used for rendering a branch-leaf, hierarchical structure.
		// Extends directly from CollectionView
		// @deprecated
		var CompositeView = CollectionView.extend({

			// Setting up the inheritance chain which allows changes to
			// Marionette.CollectionView.prototype.constructor which allows overriding
			// option to pass '{sort: false}' to prevent the CompositeView from
			// maintaining the sorted order of the collection.
			// This will fallback onto appending childView's to the end.
			constructor: function constructor(options) {
				deprecate('CompositeView is deprecated. Convert to View at your earliest convenience');

				this.mergeOptions(options, ClassOptions$4);

				CollectionView.prototype.constructor.apply(this, arguments);
			},

			// Configured the initial events that the composite view
			// binds to. Override this method to prevent the initial
			// events, or to add your own initial events.
			_initialEvents: function _initialEvents() {

				// Bind only after composite view is rendered to avoid adding child views
				// to nonexistent childViewContainer

				if (this.collection) {
					this.listenTo(this.collection, 'add', this._onCollectionAdd);
					this.listenTo(this.collection, 'update', this._onCollectionUpdate);
					this.listenTo(this.collection, 'reset', this.renderChildren);

					if (this.sort) {
						this.listenTo(this.collection, 'sort', this._sortViews);
					}
				}
			},

			// Retrieve the `childView` to be used when rendering each of
			// the items in the collection. The default is to return
			// `this.childView` or Marionette.CompositeView if no `childView`
			// has been defined. As happens in CollectionView, `childView` can
			// be a function (which should return a view class).
			_getChildView: function _getChildView(child) {
				var childView = this.childView;

				// for CompositeView, if `childView` is not specified, we'll get the same
				// composite view class rendered for each child in the collection
				// then check if the `childView` is a view class (the common case)
				// finally check if it's a function (which we assume that returns a view class)
				if (!childView) {
					return this.constructor;
				}

				childView = this._getView(childView, child);

				if (!childView) {
					throw new MarionetteError({
						name: 'InvalidChildViewError',
						message: '"childView" must be a view class or a function that returns a view class'
					});
				}

				return childView;
			},

			// Return the serialized model
			serializeData: function serializeData() {
				return this.serializeModel();
			},

			// Renders the model and the collection.
			render: function render() {
				this._ensureViewIsIntact();
				this._isRendering = true;
				this.resetChildViewContainer();

				this.triggerMethod('before:render', this);

				this._renderTemplate();
				this.bindUIElements();
				this.renderChildren();

				this._isRendering = false;
				this._isRendered = true;
				this.triggerMethod('render', this);
				return this;
			},
			renderChildren: function renderChildren() {
				if (this._isRendered || this._isRendering) {
					CollectionView.prototype._renderChildren.call(this);
				}
			},

			// You might need to override this if you've overridden attachHtml
			attachBuffer: function attachBuffer(compositeView, buffer) {
				var $container = this.getChildViewContainer(compositeView);
				$container.append(buffer);
			},

			// Internal method. Append a view to the end of the $el.
			// Overidden from CollectionView to ensure view is appended to
			// childViewContainer
			_insertAfter: function _insertAfter(childView) {
				var $container = this.getChildViewContainer(this, childView);
				$container.append(childView.el);
			},

			// Internal method. Append reordered childView'.
			// Overidden from CollectionView to ensure reordered views
			// are appended to childViewContainer
			_appendReorderedChildren: function _appendReorderedChildren(children) {
				var $container = this.getChildViewContainer(this);
				$container.append(children);
			},

			// Internal method to ensure an `$childViewContainer` exists, for the
			// `attachHtml` method to use.
			getChildViewContainer: function getChildViewContainer(containerView, childView) {
				if (!!containerView.$childViewContainer) {
					return containerView.$childViewContainer;
				}

				var container = void 0;
				var childViewContainer = containerView.childViewContainer;
				if (childViewContainer) {

					var selector = _.result(containerView, 'childViewContainer');

					if (selector.charAt(0) === '@' && containerView.ui) {
						container = containerView.ui[selector.substr(4)];
					} else {
						container = containerView.$(selector);
					}

					if (container.length <= 0) {
						throw new MarionetteError({
							name: 'ChildViewContainerMissingError',
							message: 'The specified "childViewContainer" was not found: ' + containerView.childViewContainer
						});
					}
				} else {
					container = containerView.$el;
				}

				containerView.$childViewContainer = container;
				return container;
			},

			// Internal method to reset the `$childViewContainer` on render
			resetChildViewContainer: function resetChildViewContainer() {
				if (this.$childViewContainer) {
					this.$childViewContainer = undefined;
				}
			}
		});

		// To prevent duplication but allow the best View organization
		// Certain View methods are mixed directly into the deprecated CompositeView
		var MixinFromView = _.pick(View.prototype, 'serializeModel', 'getTemplate', '_renderTemplate', 'mixinTemplateContext', 'attachElContent');
		_.extend(CompositeView.prototype, MixinFromView);

		var ClassOptions$5 = ['collectionEvents', 'events', 'modelEvents', 'triggers', 'ui'];

		var Behavior = MarionetteObject.extend({
			cidPrefix: 'mnb',

			constructor: function constructor(options, view) {
				// Setup reference to the view.
				// this comes in handle when a behavior
				// wants to directly talk up the chain
				// to the view.
				this.view = view;
				this.defaults = _.clone(_.result(this, 'defaults', {}));
				this._setOptions(this.defaults, options);
				this.mergeOptions(this.options, ClassOptions$5);

				// Construct an internal UI hash using
				// the behaviors UI hash and then the view UI hash.
				// This allows the user to use UI hash elements
				// defined in the parent view as well as those
				// defined in the given behavior.
				// This order will help the reuse and share of a behavior
				// between multiple views, while letting a view override a
				// selector under an UI key.
				this.ui = _.extend({}, _.result(this, 'ui'), _.result(view, 'ui'));

				MarionetteObject.apply(this, arguments);
			},

			// proxy behavior $ method to the view
			// this is useful for doing jquery DOM lookups
			// scoped to behaviors view.
			$: function $() {
				return this.view.$.apply(this.view, arguments);
			},

			// Stops the behavior from listening to events.
			// Overrides Object#destroy to prevent additional events from being triggered.
			destroy: function destroy() {
				this.stopListening();

				return this;
			},
			proxyViewProperties: function proxyViewProperties() {
				this.$el = this.view.$el;
				this.el = this.view.el;

				return this;
			},
			bindUIElements: function bindUIElements() {
				this._bindUIElements();

				return this;
			},
			unbindUIElements: function unbindUIElements() {
				this._unbindUIElements();

				return this;
			},
			getUI: function getUI(name) {
				this.view._ensureViewIsIntact();
				return this._getUI(name);
			},

			// Handle `modelEvents`, and `collectionEvents` configuration
			delegateEntityEvents: function delegateEntityEvents() {
				this._delegateEntityEvents(this.view.model, this.view.collection);

				return this;
			},
			undelegateEntityEvents: function undelegateEntityEvents() {
				this._undelegateEntityEvents(this.view.model, this.view.collection);

				return this;
			},
			getEvents: function getEvents() {
				var _this = this;

				// Normalize behavior events hash to allow
				// a user to use the @ui. syntax.
				var behaviorEvents = this.normalizeUIKeys(_.result(this, 'events'));

				// binds the handler to the behavior and builds a unique eventName
				return _.reduce(behaviorEvents, function (events, behaviorHandler, key) {
					if (!_.isFunction(behaviorHandler)) {
						behaviorHandler = _this[behaviorHandler];
					}
					if (!behaviorHandler) {
						return;
					}
					key = getUniqueEventName(key);
					events[key] = _.bind(behaviorHandler, _this);
					return events;
				}, {});
			},

			// Internal method to build all trigger handlers for a given behavior
			getTriggers: function getTriggers() {
				if (!this.triggers) {
					return;
				}

				// Normalize behavior triggers hash to allow
				// a user to use the @ui. syntax.
				var behaviorTriggers = this.normalizeUIKeys(_.result(this, 'triggers'));

				return this._getViewTriggers(this.view, behaviorTriggers);
			}
		});

		_.extend(Behavior.prototype, DelegateEntityEventsMixin, TriggersMixin, UIMixin);

		var ClassOptions$6 = ['region', 'regionClass'];

		// A container for a Marionette application.
		var Application = MarionetteObject.extend({
			cidPrefix: 'mna',

			constructor: function constructor(options) {
				this._setOptions(options);

				this.mergeOptions(options, ClassOptions$6);

				this._initRegion();

				MarionetteObject.prototype.constructor.apply(this, arguments);
			},

			regionClass: Region,

			_initRegion: function _initRegion() {
				var region = this.region;

				if (!region) {
					return;
				}

				var defaults = {
					regionClass: this.regionClass
				};

				this._region = buildRegion(region, defaults);
			},
			getRegion: function getRegion() {
				return this._region;
			},
			showView: function showView(view) {
				var region = this.getRegion();

				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				return region.show.apply(region, [view].concat(args));
			},
			getView: function getView() {
				return this.getRegion().currentView;
			},

			// kick off all of the application's processes.
			start: function start(options) {
				this.triggerMethod('before:start', this, options);
				this.triggerMethod('start', this, options);
				return this;
			}
		});

		var ClassOptions$7 = ['appRoutes', 'controller'];

		var AppRouter = Backbone.Router.extend({
			constructor: function constructor(options) {
				this._setOptions(options);

				this.mergeOptions(options, ClassOptions$7);

				Backbone.Router.apply(this, arguments);

				var appRoutes = this.appRoutes;
				var controller = this._getController();
				this.processAppRoutes(controller, appRoutes);
				this.on('route', this._processOnRoute, this);
			},

			// Similar to route method on a Backbone Router but
			// method is called on the controller
			appRoute: function appRoute(route, methodName) {
				var controller = this._getController();
				this._addAppRoute(controller, route, methodName);
				return this;
			},

			// process the route event and trigger the onRoute
			// method call, if it exists
			_processOnRoute: function _processOnRoute(routeName, routeArgs) {
				// make sure an onRoute before trying to call it
				if (_.isFunction(this.onRoute)) {
					// find the path that matches the current route
					var routePath = _.invert(this.appRoutes)[routeName];
					this.onRoute(routeName, routePath, routeArgs);
				}
			},

			// Internal method to process the `appRoutes` for the
			// router, and turn them in to routes that trigger the
			// specified method on the specified `controller`.
			processAppRoutes: function processAppRoutes(controller, appRoutes) {
				var _this = this;

				if (!appRoutes) {
					return this;
				}

				var routeNames = _.keys(appRoutes).reverse(); // Backbone requires reverted order of routes

				_.each(routeNames, function (route) {
					_this._addAppRoute(controller, route, appRoutes[route]);
				});

				return this;
			},
			_getController: function _getController() {
				return this.controller;
			},
			_addAppRoute: function _addAppRoute(controller, route, methodName) {
				var method = controller[methodName];

				if (!method) {
					throw new MarionetteError('Method "' + methodName + '" was not found on the controller');
				}

				this.route(route, methodName, _.bind(method, controller));
			},

			triggerMethod: triggerMethod
		});

		_.extend(AppRouter.prototype, CommonMixin);

		// Placeholder method to be extended by the user.
		// The method should define the object that stores the behaviors.
		// i.e.
		//
		// ```js
		// Marionette.Behaviors.behaviorsLookup: function() {
		//   return App.Behaviors
		// }
		// ```
		function behaviorsLookup() {
			throw new MarionetteError({
				message: 'You must define where your behaviors are stored.',
				url: 'marionette.behaviors.md#behaviorslookup'
			});
		}

		// Add Feature flags here
		// e.g. 'class' => false
		var FEATURES = {};

		function isEnabled(name) {
			return !!FEATURES[name];
		}

		function setEnabled(name, state) {
			return FEATURES[name] = state;
		}

		var previousMarionette = Backbone.Marionette;
		var Marionette = Backbone.Marionette = {};

		// This allows you to run multiple instances of Marionette on the same
		// webapp. After loading the new version, call `noConflict()` to
		// get a reference to it. At the same time the old version will be
		// returned to Backbone.Marionette.
		Marionette.noConflict = function () {
			Backbone.Marionette = previousMarionette;
			return this;
		};

		// Utilities
		Marionette.bindEvents = proxy(bindEvents);
		Marionette.unbindEvents = proxy(unbindEvents);
		Marionette.bindRequests = proxy(bindRequests);
		Marionette.unbindRequests = proxy(unbindRequests);
		Marionette.mergeOptions = proxy(mergeOptions);
		Marionette.getOption = proxy(getOption);
		Marionette.normalizeMethods = proxy(normalizeMethods);
		Marionette.extend = extend;
		Marionette.isNodeAttached = isNodeAttached;
		Marionette.deprecate = deprecate;
		Marionette.triggerMethod = proxy(triggerMethod);
		Marionette.triggerMethodOn = triggerMethodOn;
		Marionette.isEnabled = isEnabled;
		Marionette.setEnabled = setEnabled;
		Marionette.monitorViewEvents = monitorViewEvents;

		Marionette.Behaviors = {};
		Marionette.Behaviors.behaviorsLookup = behaviorsLookup;

		// Classes
		Marionette.Application = Application;
		Marionette.AppRouter = AppRouter;
		Marionette.Renderer = Renderer;
		Marionette.TemplateCache = TemplateCache;
		Marionette.View = View;
		Marionette.CollectionView = CollectionView;
		Marionette.CompositeView = CompositeView;
		Marionette.Behavior = Behavior;
		Marionette.Region = Region;
		Marionette.Error = MarionetteError;
		Marionette.Object = MarionetteObject;

		// Configuration
		Marionette.DEV_MODE = false;
		Marionette.FEATURES = FEATURES;
		Marionette.VERSION = version;

		return Marionette;
	});

	//# sourceMappingURL=backbone.marionette.js.map

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	//     Backbone.js 1.3.3

	//     (c) 2010-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Backbone may be freely distributed under the MIT license.
	//     For all details and documentation:
	//     http://backbonejs.org

	(function (factory) {

	  // Establish the root object, `window` (`self`) in the browser, or `global` on the server.
	  // We use `self` instead of `window` for `WebWorker` support.
	  var root = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) == 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global.global === global && global;

	  // Set up Backbone appropriately for the environment. Start with AMD.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(5), exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (_, $, exports) {
	      // Export global even in AMD case in case this script is loaded with
	      // others that may still expect a global Backbone.
	      root.Backbone = factory(root, exports, _, $);
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	    // Next for Node.js or CommonJS. jQuery may not be needed as a module.
	  } else if (typeof exports !== 'undefined') {
	    var _ = require('underscore'),
	        $;
	    try {
	      $ = require('jquery');
	    } catch (e) {}
	    factory(root, exports, _, $);

	    // Finally, as a browser global.
	  } else {
	    root.Backbone = factory(root, {}, root._, root.jQuery || root.Zepto || root.ender || root.$);
	  }
	})(function (root, Backbone, _, $) {

	  // Initial Setup
	  // -------------

	  // Save the previous value of the `Backbone` variable, so that it can be
	  // restored later on, if `noConflict` is used.
	  var previousBackbone = root.Backbone;

	  // Create a local reference to a common array method we'll want to use later.
	  var _slice = Array.prototype.slice;

	  // Current version of the library. Keep in sync with `package.json`.
	  Backbone.VERSION = '1.3.3';

	  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
	  // the `$` variable.
	  Backbone.$ = $;

	  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
	  // to its previous owner. Returns a reference to this Backbone object.
	  Backbone.noConflict = function () {
	    root.Backbone = previousBackbone;
	    return this;
	  };

	  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
	  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
	  // set a `X-Http-Method-Override` header.
	  Backbone.emulateHTTP = false;

	  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
	  // `application/json` requests ... this will encode the body as
	  // `application/x-www-form-urlencoded` instead and will send the model in a
	  // form param named `model`.
	  Backbone.emulateJSON = false;

	  // Proxy Backbone class methods to Underscore functions, wrapping the model's
	  // `attributes` object or collection's `models` array behind the scenes.
	  //
	  // collection.filter(function(model) { return model.get('age') > 10 });
	  // collection.each(this.addView);
	  //
	  // `Function#apply` can be slow so we use the method's arg count, if we know it.
	  var addMethod = function addMethod(length, method, attribute) {
	    switch (length) {
	      case 1:
	        return function () {
	          return _[method](this[attribute]);
	        };
	      case 2:
	        return function (value) {
	          return _[method](this[attribute], value);
	        };
	      case 3:
	        return function (iteratee, context) {
	          return _[method](this[attribute], cb(iteratee, this), context);
	        };
	      case 4:
	        return function (iteratee, defaultVal, context) {
	          return _[method](this[attribute], cb(iteratee, this), defaultVal, context);
	        };
	      default:
	        return function () {
	          var args = _slice.call(arguments);
	          args.unshift(this[attribute]);
	          return _[method].apply(_, args);
	        };
	    }
	  };
	  var addUnderscoreMethods = function addUnderscoreMethods(Class, methods, attribute) {
	    _.each(methods, function (length, method) {
	      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
	    });
	  };

	  // Support `collection.sortBy('attr')` and `collection.findWhere({id: 1})`.
	  var cb = function cb(iteratee, instance) {
	    if (_.isFunction(iteratee)) return iteratee;
	    if (_.isObject(iteratee) && !instance._isModel(iteratee)) return modelMatcher(iteratee);
	    if (_.isString(iteratee)) return function (model) {
	      return model.get(iteratee);
	    };
	    return iteratee;
	  };
	  var modelMatcher = function modelMatcher(attrs) {
	    var matcher = _.matches(attrs);
	    return function (model) {
	      return matcher(model.attributes);
	    };
	  };

	  // Backbone.Events
	  // ---------------

	  // A module that can be mixed in to *any object* in order to provide it with
	  // a custom event channel. You may bind a callback to an event with `on` or
	  // remove with `off`; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  var Events = Backbone.Events = {};

	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;

	  // Iterates over the standard `event, callback` (as well as the fancy multiple
	  // space-separated events `"change blur", callback` and jQuery-style event
	  // maps `{event: callback}`).
	  var eventsApi = function eventsApi(iteratee, events, name, callback, opts) {
	    var i = 0,
	        names;
	    if (name && (typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	      // Handle event maps.
	      if (callback !== void 0 && 'context' in opts && opts.context === void 0) opts.context = callback;
	      for (names = _.keys(name); i < names.length; i++) {
	        events = eventsApi(iteratee, events, names[i], name[names[i]], opts);
	      }
	    } else if (name && eventSplitter.test(name)) {
	      // Handle space-separated event names by delegating them individually.
	      for (names = name.split(eventSplitter); i < names.length; i++) {
	        events = iteratee(events, names[i], callback, opts);
	      }
	    } else {
	      // Finally, standard events.
	      events = iteratee(events, name, callback, opts);
	    }
	    return events;
	  };

	  // Bind an event to a `callback` function. Passing `"all"` will bind
	  // the callback to all events fired.
	  Events.on = function (name, callback, context) {
	    return internalOn(this, name, callback, context);
	  };

	  // Guard the `listening` argument from the public API.
	  var internalOn = function internalOn(obj, name, callback, context, listening) {
	    obj._events = eventsApi(onApi, obj._events || {}, name, callback, {
	      context: context,
	      ctx: obj,
	      listening: listening
	    });

	    if (listening) {
	      var listeners = obj._listeners || (obj._listeners = {});
	      listeners[listening.id] = listening;
	    }

	    return obj;
	  };

	  // Inversion-of-control versions of `on`. Tell *this* object to listen to
	  // an event in another object... keeping track of what it's listening to
	  // for easier unbinding later.
	  Events.listenTo = function (obj, name, callback) {
	    if (!obj) return this;
	    var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
	    var listeningTo = this._listeningTo || (this._listeningTo = {});
	    var listening = listeningTo[id];

	    // This object is not listening to any other events on `obj` yet.
	    // Setup the necessary references to track the listening callbacks.
	    if (!listening) {
	      var thisId = this._listenId || (this._listenId = _.uniqueId('l'));
	      listening = listeningTo[id] = { obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0 };
	    }

	    // Bind callbacks on obj, and keep track of them on listening.
	    internalOn(obj, name, callback, this, listening);
	    return this;
	  };

	  // The reducing API that adds a callback to the `events` object.
	  var onApi = function onApi(events, name, callback, options) {
	    if (callback) {
	      var handlers = events[name] || (events[name] = []);
	      var context = options.context,
	          ctx = options.ctx,
	          listening = options.listening;
	      if (listening) listening.count++;

	      handlers.push({ callback: callback, context: context, ctx: context || ctx, listening: listening });
	    }
	    return events;
	  };

	  // Remove one or many callbacks. If `context` is null, removes all
	  // callbacks with that function. If `callback` is null, removes all
	  // callbacks for the event. If `name` is null, removes all bound
	  // callbacks for all events.
	  Events.off = function (name, callback, context) {
	    if (!this._events) return this;
	    this._events = eventsApi(offApi, this._events, name, callback, {
	      context: context,
	      listeners: this._listeners
	    });
	    return this;
	  };

	  // Tell this object to stop listening to either specific events ... or
	  // to every object it's currently listening to.
	  Events.stopListening = function (obj, name, callback) {
	    var listeningTo = this._listeningTo;
	    if (!listeningTo) return this;

	    var ids = obj ? [obj._listenId] : _.keys(listeningTo);

	    for (var i = 0; i < ids.length; i++) {
	      var listening = listeningTo[ids[i]];

	      // If listening doesn't exist, this object is not currently
	      // listening to obj. Break out early.
	      if (!listening) break;

	      listening.obj.off(name, callback, this);
	    }

	    return this;
	  };

	  // The reducing API that removes a callback from the `events` object.
	  var offApi = function offApi(events, name, callback, options) {
	    if (!events) return;

	    var i = 0,
	        listening;
	    var context = options.context,
	        listeners = options.listeners;

	    // Delete all events listeners and "drop" events.
	    if (!name && !callback && !context) {
	      var ids = _.keys(listeners);
	      for (; i < ids.length; i++) {
	        listening = listeners[ids[i]];
	        delete listeners[listening.id];
	        delete listening.listeningTo[listening.objId];
	      }
	      return;
	    }

	    var names = name ? [name] : _.keys(events);
	    for (; i < names.length; i++) {
	      name = names[i];
	      var handlers = events[name];

	      // Bail out if there are no events stored.
	      if (!handlers) break;

	      // Replace events if there are any remaining.  Otherwise, clean up.
	      var remaining = [];
	      for (var j = 0; j < handlers.length; j++) {
	        var handler = handlers[j];
	        if (callback && callback !== handler.callback && callback !== handler.callback._callback || context && context !== handler.context) {
	          remaining.push(handler);
	        } else {
	          listening = handler.listening;
	          if (listening && --listening.count === 0) {
	            delete listeners[listening.id];
	            delete listening.listeningTo[listening.objId];
	          }
	        }
	      }

	      // Update tail event if the list has any events.  Otherwise, clean up.
	      if (remaining.length) {
	        events[name] = remaining;
	      } else {
	        delete events[name];
	      }
	    }
	    return events;
	  };

	  // Bind an event to only be triggered a single time. After the first time
	  // the callback is invoked, its listener will be removed. If multiple events
	  // are passed in using the space-separated syntax, the handler will fire
	  // once for each event, not once for a combination of all events.
	  Events.once = function (name, callback, context) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.off, this));
	    if (typeof name === 'string' && context == null) callback = void 0;
	    return this.on(events, callback, context);
	  };

	  // Inversion-of-control versions of `once`.
	  Events.listenToOnce = function (obj, name, callback) {
	    // Map the event into a `{event: once}` object.
	    var events = eventsApi(onceMap, {}, name, callback, _.bind(this.stopListening, this, obj));
	    return this.listenTo(obj, events);
	  };

	  // Reduces the event callbacks into a map of `{event: onceWrapper}`.
	  // `offer` unbinds the `onceWrapper` after it has been called.
	  var onceMap = function onceMap(map, name, callback, offer) {
	    if (callback) {
	      var once = map[name] = _.once(function () {
	        offer(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	    }
	    return map;
	  };

	  // Trigger one or many events, firing all bound callbacks. Callbacks are
	  // passed the same arguments as `trigger` is, apart from the event name
	  // (unless you're listening on `"all"`, which will cause your callback to
	  // receive the true name of the event as the first argument).
	  Events.trigger = function (name) {
	    if (!this._events) return this;

	    var length = Math.max(0, arguments.length - 1);
	    var args = Array(length);
	    for (var i = 0; i < length; i++) {
	      args[i] = arguments[i + 1];
	    }eventsApi(triggerApi, this._events, name, void 0, args);
	    return this;
	  };

	  // Handles triggering the appropriate event callbacks.
	  var triggerApi = function triggerApi(objEvents, name, callback, args) {
	    if (objEvents) {
	      var events = objEvents[name];
	      var allEvents = objEvents.all;
	      if (events && allEvents) allEvents = allEvents.slice();
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, [name].concat(args));
	    }
	    return objEvents;
	  };

	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function triggerEvents(events, args) {
	    var ev,
	        i = -1,
	        l = events.length,
	        a1 = args[0],
	        a2 = args[1],
	        a3 = args[2];
	    switch (args.length) {
	      case 0:
	        while (++i < l) {
	          (ev = events[i]).callback.call(ev.ctx);
	        }return;
	      case 1:
	        while (++i < l) {
	          (ev = events[i]).callback.call(ev.ctx, a1);
	        }return;
	      case 2:
	        while (++i < l) {
	          (ev = events[i]).callback.call(ev.ctx, a1, a2);
	        }return;
	      case 3:
	        while (++i < l) {
	          (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
	        }return;
	      default:
	        while (++i < l) {
	          (ev = events[i]).callback.apply(ev.ctx, args);
	        }return;
	    }
	  };

	  // Aliases for backwards compatibility.
	  Events.bind = Events.on;
	  Events.unbind = Events.off;

	  // Allow the `Backbone` object to serve as a global event bus, for folks who
	  // want global "pubsub" in a convenient place.
	  _.extend(Backbone, Events);

	  // Backbone.Model
	  // --------------

	  // Backbone **Models** are the basic data object in the framework --
	  // frequently representing a row in a table in a database on your server.
	  // A discrete chunk of data and a bunch of useful, related methods for
	  // performing computations and transformations on that data.

	  // Create a new model with the specified attributes. A client id (`cid`)
	  // is automatically generated and assigned for you.
	  var Model = Backbone.Model = function (attributes, options) {
	    var attrs = attributes || {};
	    options || (options = {});
	    this.cid = _.uniqueId(this.cidPrefix);
	    this.attributes = {};
	    if (options.collection) this.collection = options.collection;
	    if (options.parse) attrs = this.parse(attrs, options) || {};
	    var defaults = _.result(this, 'defaults');
	    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
	    this.set(attrs, options);
	    this.changed = {};
	    this.initialize.apply(this, arguments);
	  };

	  // Attach all inheritable methods to the Model prototype.
	  _.extend(Model.prototype, Events, {

	    // A hash of attributes whose current and previous value differ.
	    changed: null,

	    // The value returned during the last failed validation.
	    validationError: null,

	    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
	    // CouchDB users may want to set this to `"_id"`.
	    idAttribute: 'id',

	    // The prefix is used to create the client id which is used to identify models locally.
	    // You may want to override this if you're experiencing name clashes with model ids.
	    cidPrefix: 'c',

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function initialize() {},

	    // Return a copy of the model's `attributes` object.
	    toJSON: function toJSON(options) {
	      return _.clone(this.attributes);
	    },

	    // Proxy `Backbone.sync` by default -- but override this if you need
	    // custom syncing semantics for *this* particular model.
	    sync: function sync() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Get the value of an attribute.
	    get: function get(attr) {
	      return this.attributes[attr];
	    },

	    // Get the HTML-escaped value of an attribute.
	    escape: function escape(attr) {
	      return _.escape(this.get(attr));
	    },

	    // Returns `true` if the attribute contains a value that is not null
	    // or undefined.
	    has: function has(attr) {
	      return this.get(attr) != null;
	    },

	    // Special-cased proxy to underscore's `_.matches` method.
	    matches: function matches(attrs) {
	      return !!_.iteratee(attrs, this)(this.attributes);
	    },

	    // Set a hash of model attributes on the object, firing `"change"`. This is
	    // the core primitive operation of a model, updating the data and notifying
	    // anyone who needs to know about the change in state. The heart of the beast.
	    set: function set(key, val, options) {
	      if (key == null) return this;

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});

	      // Run validation.
	      if (!this._validate(attrs, options)) return false;

	      // Extract attributes and options.
	      var unset = options.unset;
	      var silent = options.silent;
	      var changes = [];
	      var changing = this._changing;
	      this._changing = true;

	      if (!changing) {
	        this._previousAttributes = _.clone(this.attributes);
	        this.changed = {};
	      }

	      var current = this.attributes;
	      var changed = this.changed;
	      var prev = this._previousAttributes;

	      // For each `set` attribute, update or delete the current value.
	      for (var attr in attrs) {
	        val = attrs[attr];
	        if (!_.isEqual(current[attr], val)) changes.push(attr);
	        if (!_.isEqual(prev[attr], val)) {
	          changed[attr] = val;
	        } else {
	          delete changed[attr];
	        }
	        unset ? delete current[attr] : current[attr] = val;
	      }

	      // Update the `id`.
	      if (this.idAttribute in attrs) this.id = this.get(this.idAttribute);

	      // Trigger all relevant attribute changes.
	      if (!silent) {
	        if (changes.length) this._pending = options;
	        for (var i = 0; i < changes.length; i++) {
	          this.trigger('change:' + changes[i], this, current[changes[i]], options);
	        }
	      }

	      // You might be wondering why there's a `while` loop here. Changes can
	      // be recursively nested within `"change"` events.
	      if (changing) return this;
	      if (!silent) {
	        while (this._pending) {
	          options = this._pending;
	          this._pending = false;
	          this.trigger('change', this, options);
	        }
	      }
	      this._pending = false;
	      this._changing = false;
	      return this;
	    },

	    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
	    // if the attribute doesn't exist.
	    unset: function unset(attr, options) {
	      return this.set(attr, void 0, _.extend({}, options, { unset: true }));
	    },

	    // Clear all attributes on the model, firing `"change"`.
	    clear: function clear(options) {
	      var attrs = {};
	      for (var key in this.attributes) {
	        attrs[key] = void 0;
	      }return this.set(attrs, _.extend({}, options, { unset: true }));
	    },

	    // Determine if the model has changed since the last `"change"` event.
	    // If you specify an attribute name, determine if that attribute has changed.
	    hasChanged: function hasChanged(attr) {
	      if (attr == null) return !_.isEmpty(this.changed);
	      return _.has(this.changed, attr);
	    },

	    // Return an object containing all the attributes that have changed, or
	    // false if there are no changed attributes. Useful for determining what
	    // parts of a view need to be updated and/or what attributes need to be
	    // persisted to the server. Unset attributes will be set to undefined.
	    // You can also pass an attributes object to diff against the model,
	    // determining if there *would be* a change.
	    changedAttributes: function changedAttributes(diff) {
	      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
	      var old = this._changing ? this._previousAttributes : this.attributes;
	      var changed = {};
	      for (var attr in diff) {
	        var val = diff[attr];
	        if (_.isEqual(old[attr], val)) continue;
	        changed[attr] = val;
	      }
	      return _.size(changed) ? changed : false;
	    },

	    // Get the previous value of an attribute, recorded at the time the last
	    // `"change"` event was fired.
	    previous: function previous(attr) {
	      if (attr == null || !this._previousAttributes) return null;
	      return this._previousAttributes[attr];
	    },

	    // Get all of the attributes of the model at the time of the previous
	    // `"change"` event.
	    previousAttributes: function previousAttributes() {
	      return _.clone(this._previousAttributes);
	    },

	    // Fetch the model from the server, merging the response with the model's
	    // local attributes. Any changed attributes will trigger a "change" event.
	    fetch: function fetch(options) {
	      options = _.extend({ parse: true }, options);
	      var model = this;
	      var success = options.success;
	      options.success = function (resp) {
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (!model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Set a hash of model attributes, and sync the model to the server.
	    // If the server returns an attributes hash that differs, the model's
	    // state will be `set` again.
	    save: function save(key, val, options) {
	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if (key == null || (typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options = _.extend({ validate: true, parse: true }, options);
	      var wait = options.wait;

	      // If we're not waiting and attributes exist, save acts as
	      // `set(attr).save(null, opts)` with validation. Otherwise, check if
	      // the model will be valid when the attributes, if any, are set.
	      if (attrs && !wait) {
	        if (!this.set(attrs, options)) return false;
	      } else if (!this._validate(attrs, options)) {
	        return false;
	      }

	      // After a successful server-side save, the client is (optionally)
	      // updated with the server-side state.
	      var model = this;
	      var success = options.success;
	      var attributes = this.attributes;
	      options.success = function (resp) {
	        // Ensure attributes are restored during synchronous saves.
	        model.attributes = attributes;
	        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
	        if (wait) serverAttrs = _.extend({}, attrs, serverAttrs);
	        if (serverAttrs && !model.set(serverAttrs, options)) return false;
	        if (success) success.call(options.context, model, resp, options);
	        model.trigger('sync', model, resp, options);
	      };
	      wrapError(this, options);

	      // Set temporary attributes if `{wait: true}` to properly find new ids.
	      if (attrs && wait) this.attributes = _.extend({}, attributes, attrs);

	      var method = this.isNew() ? 'create' : options.patch ? 'patch' : 'update';
	      if (method === 'patch' && !options.attrs) options.attrs = attrs;
	      var xhr = this.sync(method, this, options);

	      // Restore attributes.
	      this.attributes = attributes;

	      return xhr;
	    },

	    // Destroy this model on the server if it was already persisted.
	    // Optimistically removes the model from its collection, if it has one.
	    // If `wait: true` is passed, waits for the server to respond before removal.
	    destroy: function destroy(options) {
	      options = options ? _.clone(options) : {};
	      var model = this;
	      var success = options.success;
	      var wait = options.wait;

	      var destroy = function destroy() {
	        model.stopListening();
	        model.trigger('destroy', model, model.collection, options);
	      };

	      options.success = function (resp) {
	        if (wait) destroy();
	        if (success) success.call(options.context, model, resp, options);
	        if (!model.isNew()) model.trigger('sync', model, resp, options);
	      };

	      var xhr = false;
	      if (this.isNew()) {
	        _.defer(options.success);
	      } else {
	        wrapError(this, options);
	        xhr = this.sync('delete', this, options);
	      }
	      if (!wait) destroy();
	      return xhr;
	    },

	    // Default URL for the model's representation on the server -- if you're
	    // using Backbone's restful methods, override this to change the endpoint
	    // that will be called.
	    url: function url() {
	      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
	      if (this.isNew()) return base;
	      var id = this.get(this.idAttribute);
	      return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id);
	    },

	    // **parse** converts a response into the hash of attributes to be `set` on
	    // the model. The default implementation is just to pass the response along.
	    parse: function parse(resp, options) {
	      return resp;
	    },

	    // Create a new model with identical attributes to this one.
	    clone: function clone() {
	      return new this.constructor(this.attributes);
	    },

	    // A model is new if it has never been saved to the server, and lacks an id.
	    isNew: function isNew() {
	      return !this.has(this.idAttribute);
	    },

	    // Check if the model is currently in a valid state.
	    isValid: function isValid(options) {
	      return this._validate({}, _.extend({}, options, { validate: true }));
	    },

	    // Run validation against the next complete set of model attributes,
	    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
	    _validate: function _validate(attrs, options) {
	      if (!options.validate || !this.validate) return true;
	      attrs = _.extend({}, this.attributes, attrs);
	      var error = this.validationError = this.validate(attrs, options) || null;
	      if (!error) return true;
	      this.trigger('invalid', this, error, _.extend(options, { validationError: error }));
	      return false;
	    }

	  });

	  // Underscore methods that we want to implement on the Model, mapped to the
	  // number of arguments they take.
	  var modelMethods = { keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
	    omit: 0, chain: 1, isEmpty: 1 };

	  // Mix in each Underscore method as a proxy to `Model#attributes`.
	  addUnderscoreMethods(Model, modelMethods, 'attributes');

	  // Backbone.Collection
	  // -------------------

	  // If models tend to represent a single row of data, a Backbone Collection is
	  // more analogous to a table full of data ... or a small slice or page of that
	  // table, or a collection of rows that belong together for a particular reason
	  // -- all of the messages in this particular folder, all of the documents
	  // belonging to this particular author, and so on. Collections maintain
	  // indexes of their models, both in order, and for lookup by `id`.

	  // Create a new **Collection**, perhaps to contain a specific type of `model`.
	  // If a `comparator` is specified, the Collection will maintain
	  // its models in sort order, as they're added and removed.
	  var Collection = Backbone.Collection = function (models, options) {
	    options || (options = {});
	    if (options.model) this.model = options.model;
	    if (options.comparator !== void 0) this.comparator = options.comparator;
	    this._reset();
	    this.initialize.apply(this, arguments);
	    if (models) this.reset(models, _.extend({ silent: true }, options));
	  };

	  // Default options for `Collection#set`.
	  var setOptions = { add: true, remove: true, merge: true };
	  var addOptions = { add: true, remove: false };

	  // Splices `insert` into `array` at index `at`.
	  var splice = function splice(array, insert, at) {
	    at = Math.min(Math.max(at, 0), array.length);
	    var tail = Array(array.length - at);
	    var length = insert.length;
	    var i;
	    for (i = 0; i < tail.length; i++) {
	      tail[i] = array[i + at];
	    }for (i = 0; i < length; i++) {
	      array[i + at] = insert[i];
	    }for (i = 0; i < tail.length; i++) {
	      array[i + length + at] = tail[i];
	    }
	  };

	  // Define the Collection's inheritable methods.
	  _.extend(Collection.prototype, Events, {

	    // The default model for a collection is just a **Backbone.Model**.
	    // This should be overridden in most cases.
	    model: Model,

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function initialize() {},

	    // The JSON representation of a Collection is an array of the
	    // models' attributes.
	    toJSON: function toJSON(options) {
	      return this.map(function (model) {
	        return model.toJSON(options);
	      });
	    },

	    // Proxy `Backbone.sync` by default.
	    sync: function sync() {
	      return Backbone.sync.apply(this, arguments);
	    },

	    // Add a model, or list of models to the set. `models` may be Backbone
	    // Models or raw JavaScript objects to be converted to Models, or any
	    // combination of the two.
	    add: function add(models, options) {
	      return this.set(models, _.extend({ merge: false }, options, addOptions));
	    },

	    // Remove a model, or a list of models from the set.
	    remove: function remove(models, options) {
	      options = _.extend({}, options);
	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();
	      var removed = this._removeModels(models, options);
	      if (!options.silent && removed.length) {
	        options.changes = { added: [], merged: [], removed: removed };
	        this.trigger('update', this, options);
	      }
	      return singular ? removed[0] : removed;
	    },

	    // Update a collection by `set`-ing a new list of models, adding new ones,
	    // removing models that are no longer present, and merging models that
	    // already exist in the collection, as necessary. Similar to **Model#set**,
	    // the core operation for updating the data contained by the collection.
	    set: function set(models, options) {
	      if (models == null) return;

	      options = _.extend({}, setOptions, options);
	      if (options.parse && !this._isModel(models)) {
	        models = this.parse(models, options) || [];
	      }

	      var singular = !_.isArray(models);
	      models = singular ? [models] : models.slice();

	      var at = options.at;
	      if (at != null) at = +at;
	      if (at > this.length) at = this.length;
	      if (at < 0) at += this.length + 1;

	      var set = [];
	      var toAdd = [];
	      var toMerge = [];
	      var toRemove = [];
	      var modelMap = {};

	      var add = options.add;
	      var merge = options.merge;
	      var remove = options.remove;

	      var sort = false;
	      var sortable = this.comparator && at == null && options.sort !== false;
	      var sortAttr = _.isString(this.comparator) ? this.comparator : null;

	      // Turn bare objects into model references, and prevent invalid models
	      // from being added.
	      var model, i;
	      for (i = 0; i < models.length; i++) {
	        model = models[i];

	        // If a duplicate is found, prevent it from being added and
	        // optionally merge it into the existing model.
	        var existing = this.get(model);
	        if (existing) {
	          if (merge && model !== existing) {
	            var attrs = this._isModel(model) ? model.attributes : model;
	            if (options.parse) attrs = existing.parse(attrs, options);
	            existing.set(attrs, options);
	            toMerge.push(existing);
	            if (sortable && !sort) sort = existing.hasChanged(sortAttr);
	          }
	          if (!modelMap[existing.cid]) {
	            modelMap[existing.cid] = true;
	            set.push(existing);
	          }
	          models[i] = existing;

	          // If this is a new, valid model, push it to the `toAdd` list.
	        } else if (add) {
	          model = models[i] = this._prepareModel(model, options);
	          if (model) {
	            toAdd.push(model);
	            this._addReference(model, options);
	            modelMap[model.cid] = true;
	            set.push(model);
	          }
	        }
	      }

	      // Remove stale models.
	      if (remove) {
	        for (i = 0; i < this.length; i++) {
	          model = this.models[i];
	          if (!modelMap[model.cid]) toRemove.push(model);
	        }
	        if (toRemove.length) this._removeModels(toRemove, options);
	      }

	      // See if sorting is needed, update `length` and splice in new models.
	      var orderChanged = false;
	      var replace = !sortable && add && remove;
	      if (set.length && replace) {
	        orderChanged = this.length !== set.length || _.some(this.models, function (m, index) {
	          return m !== set[index];
	        });
	        this.models.length = 0;
	        splice(this.models, set, 0);
	        this.length = this.models.length;
	      } else if (toAdd.length) {
	        if (sortable) sort = true;
	        splice(this.models, toAdd, at == null ? this.length : at);
	        this.length = this.models.length;
	      }

	      // Silently sort the collection if appropriate.
	      if (sort) this.sort({ silent: true });

	      // Unless silenced, it's time to fire all appropriate add/sort/update events.
	      if (!options.silent) {
	        for (i = 0; i < toAdd.length; i++) {
	          if (at != null) options.index = at + i;
	          model = toAdd[i];
	          model.trigger('add', model, this, options);
	        }
	        if (sort || orderChanged) this.trigger('sort', this, options);
	        if (toAdd.length || toRemove.length || toMerge.length) {
	          options.changes = {
	            added: toAdd,
	            removed: toRemove,
	            merged: toMerge
	          };
	          this.trigger('update', this, options);
	        }
	      }

	      // Return the added (or merged) model (or models).
	      return singular ? models[0] : models;
	    },

	    // When you have more items than you want to add or remove individually,
	    // you can reset the entire set with a new list of models, without firing
	    // any granular `add` or `remove` events. Fires `reset` when finished.
	    // Useful for bulk operations and optimizations.
	    reset: function reset(models, options) {
	      options = options ? _.clone(options) : {};
	      for (var i = 0; i < this.models.length; i++) {
	        this._removeReference(this.models[i], options);
	      }
	      options.previousModels = this.models;
	      this._reset();
	      models = this.add(models, _.extend({ silent: true }, options));
	      if (!options.silent) this.trigger('reset', this, options);
	      return models;
	    },

	    // Add a model to the end of the collection.
	    push: function push(model, options) {
	      return this.add(model, _.extend({ at: this.length }, options));
	    },

	    // Remove a model from the end of the collection.
	    pop: function pop(options) {
	      var model = this.at(this.length - 1);
	      return this.remove(model, options);
	    },

	    // Add a model to the beginning of the collection.
	    unshift: function unshift(model, options) {
	      return this.add(model, _.extend({ at: 0 }, options));
	    },

	    // Remove a model from the beginning of the collection.
	    shift: function shift(options) {
	      var model = this.at(0);
	      return this.remove(model, options);
	    },

	    // Slice out a sub-array of models from the collection.
	    slice: function slice() {
	      return _slice.apply(this.models, arguments);
	    },

	    // Get a model from the set by id, cid, model object with id or cid
	    // properties, or an attributes object that is transformed through modelId.
	    get: function get(obj) {
	      if (obj == null) return void 0;
	      return this._byId[obj] || this._byId[this.modelId(obj.attributes || obj)] || obj.cid && this._byId[obj.cid];
	    },

	    // Returns `true` if the model is in the collection.
	    has: function has(obj) {
	      return this.get(obj) != null;
	    },

	    // Get the model at the given index.
	    at: function at(index) {
	      if (index < 0) index += this.length;
	      return this.models[index];
	    },

	    // Return models with matching attributes. Useful for simple cases of
	    // `filter`.
	    where: function where(attrs, first) {
	      return this[first ? 'find' : 'filter'](attrs);
	    },

	    // Return the first model with matching attributes. Useful for simple cases
	    // of `find`.
	    findWhere: function findWhere(attrs) {
	      return this.where(attrs, true);
	    },

	    // Force the collection to re-sort itself. You don't need to call this under
	    // normal circumstances, as the set will maintain sort order as each item
	    // is added.
	    sort: function sort(options) {
	      var comparator = this.comparator;
	      if (!comparator) throw new Error('Cannot sort a set without a comparator');
	      options || (options = {});

	      var length = comparator.length;
	      if (_.isFunction(comparator)) comparator = _.bind(comparator, this);

	      // Run sort based on type of `comparator`.
	      if (length === 1 || _.isString(comparator)) {
	        this.models = this.sortBy(comparator);
	      } else {
	        this.models.sort(comparator);
	      }
	      if (!options.silent) this.trigger('sort', this, options);
	      return this;
	    },

	    // Pluck an attribute from each model in the collection.
	    pluck: function pluck(attr) {
	      return this.map(attr + '');
	    },

	    // Fetch the default set of models for this collection, resetting the
	    // collection when they arrive. If `reset: true` is passed, the response
	    // data will be passed through the `reset` method instead of `set`.
	    fetch: function fetch(options) {
	      options = _.extend({ parse: true }, options);
	      var success = options.success;
	      var collection = this;
	      options.success = function (resp) {
	        var method = options.reset ? 'reset' : 'set';
	        collection[method](resp, options);
	        if (success) success.call(options.context, collection, resp, options);
	        collection.trigger('sync', collection, resp, options);
	      };
	      wrapError(this, options);
	      return this.sync('read', this, options);
	    },

	    // Create a new instance of a model in this collection. Add the model to the
	    // collection immediately, unless `wait: true` is passed, in which case we
	    // wait for the server to agree.
	    create: function create(model, options) {
	      options = options ? _.clone(options) : {};
	      var wait = options.wait;
	      model = this._prepareModel(model, options);
	      if (!model) return false;
	      if (!wait) this.add(model, options);
	      var collection = this;
	      var success = options.success;
	      options.success = function (m, resp, callbackOpts) {
	        if (wait) collection.add(m, callbackOpts);
	        if (success) success.call(callbackOpts.context, m, resp, callbackOpts);
	      };
	      model.save(null, options);
	      return model;
	    },

	    // **parse** converts a response into a list of models to be added to the
	    // collection. The default implementation is just to pass it through.
	    parse: function parse(resp, options) {
	      return resp;
	    },

	    // Create a new collection with an identical list of models as this one.
	    clone: function clone() {
	      return new this.constructor(this.models, {
	        model: this.model,
	        comparator: this.comparator
	      });
	    },

	    // Define how to uniquely identify models in the collection.
	    modelId: function modelId(attrs) {
	      return attrs[this.model.prototype.idAttribute || 'id'];
	    },

	    // Private method to reset all internal state. Called when the collection
	    // is first initialized or reset.
	    _reset: function _reset() {
	      this.length = 0;
	      this.models = [];
	      this._byId = {};
	    },

	    // Prepare a hash of attributes (or other model) to be added to this
	    // collection.
	    _prepareModel: function _prepareModel(attrs, options) {
	      if (this._isModel(attrs)) {
	        if (!attrs.collection) attrs.collection = this;
	        return attrs;
	      }
	      options = options ? _.clone(options) : {};
	      options.collection = this;
	      var model = new this.model(attrs, options);
	      if (!model.validationError) return model;
	      this.trigger('invalid', this, model.validationError, options);
	      return false;
	    },

	    // Internal method called by both remove and set.
	    _removeModels: function _removeModels(models, options) {
	      var removed = [];
	      for (var i = 0; i < models.length; i++) {
	        var model = this.get(models[i]);
	        if (!model) continue;

	        var index = this.indexOf(model);
	        this.models.splice(index, 1);
	        this.length--;

	        // Remove references before triggering 'remove' event to prevent an
	        // infinite loop. #3693
	        delete this._byId[model.cid];
	        var id = this.modelId(model.attributes);
	        if (id != null) delete this._byId[id];

	        if (!options.silent) {
	          options.index = index;
	          model.trigger('remove', model, this, options);
	        }

	        removed.push(model);
	        this._removeReference(model, options);
	      }
	      return removed;
	    },

	    // Method for checking whether an object should be considered a model for
	    // the purposes of adding to the collection.
	    _isModel: function _isModel(model) {
	      return model instanceof Model;
	    },

	    // Internal method to create a model's ties to a collection.
	    _addReference: function _addReference(model, options) {
	      this._byId[model.cid] = model;
	      var id = this.modelId(model.attributes);
	      if (id != null) this._byId[id] = model;
	      model.on('all', this._onModelEvent, this);
	    },

	    // Internal method to sever a model's ties to a collection.
	    _removeReference: function _removeReference(model, options) {
	      delete this._byId[model.cid];
	      var id = this.modelId(model.attributes);
	      if (id != null) delete this._byId[id];
	      if (this === model.collection) delete model.collection;
	      model.off('all', this._onModelEvent, this);
	    },

	    // Internal method called every time a model in the set fires an event.
	    // Sets need to update their indexes when models change ids. All other
	    // events simply proxy through. "add" and "remove" events that originate
	    // in other collections are ignored.
	    _onModelEvent: function _onModelEvent(event, model, collection, options) {
	      if (model) {
	        if ((event === 'add' || event === 'remove') && collection !== this) return;
	        if (event === 'destroy') this.remove(model, options);
	        if (event === 'change') {
	          var prevId = this.modelId(model.previousAttributes());
	          var id = this.modelId(model.attributes);
	          if (prevId !== id) {
	            if (prevId != null) delete this._byId[prevId];
	            if (id != null) this._byId[id] = model;
	          }
	        }
	      }
	      this.trigger.apply(this, arguments);
	    }

	  });

	  // Underscore methods that we want to implement on the Collection.
	  // 90% of the core usefulness of Backbone Collections is actually implemented
	  // right here:
	  var collectionMethods = { forEach: 3, each: 3, map: 3, collect: 3, reduce: 0,
	    foldl: 0, inject: 0, reduceRight: 0, foldr: 0, find: 3, detect: 3, filter: 3,
	    select: 3, reject: 3, every: 3, all: 3, some: 3, any: 3, include: 3, includes: 3,
	    contains: 3, invoke: 0, max: 3, min: 3, toArray: 1, size: 1, first: 3,
	    head: 3, take: 3, initial: 3, rest: 3, tail: 3, drop: 3, last: 3,
	    without: 0, difference: 0, indexOf: 3, shuffle: 1, lastIndexOf: 3,
	    isEmpty: 1, chain: 1, sample: 3, partition: 3, groupBy: 3, countBy: 3,
	    sortBy: 3, indexBy: 3, findIndex: 3, findLastIndex: 3 };

	  // Mix in each Underscore method as a proxy to `Collection#models`.
	  addUnderscoreMethods(Collection, collectionMethods, 'models');

	  // Backbone.View
	  // -------------

	  // Backbone Views are almost more convention than they are actual code. A View
	  // is simply a JavaScript object that represents a logical chunk of UI in the
	  // DOM. This might be a single item, an entire list, a sidebar or panel, or
	  // even the surrounding frame which wraps your whole app. Defining a chunk of
	  // UI as a **View** allows you to define your DOM events declaratively, without
	  // having to worry about render order ... and makes it easy for the view to
	  // react to specific changes in the state of your models.

	  // Creating a Backbone.View creates its initial element outside of the DOM,
	  // if an existing element is not provided...
	  var View = Backbone.View = function (options) {
	    this.cid = _.uniqueId('view');
	    _.extend(this, _.pick(options, viewOptions));
	    this._ensureElement();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regex to split keys for `delegate`.
	  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

	  // List of view options to be set as properties.
	  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

	  // Set up all inheritable **Backbone.View** properties and methods.
	  _.extend(View.prototype, Events, {

	    // The default `tagName` of a View's element is `"div"`.
	    tagName: 'div',

	    // jQuery delegate for element lookup, scoped to DOM elements within the
	    // current view. This should be preferred to global lookups where possible.
	    $: function $(selector) {
	      return this.$el.find(selector);
	    },

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function initialize() {},

	    // **render** is the core function that your view should override, in order
	    // to populate its element (`this.el`), with the appropriate HTML. The
	    // convention is for **render** to always return `this`.
	    render: function render() {
	      return this;
	    },

	    // Remove this view by taking the element out of the DOM, and removing any
	    // applicable Backbone.Events listeners.
	    remove: function remove() {
	      this._removeElement();
	      this.stopListening();
	      return this;
	    },

	    // Remove this view's element from the document and all event listeners
	    // attached to it. Exposed for subclasses using an alternative DOM
	    // manipulation API.
	    _removeElement: function _removeElement() {
	      this.$el.remove();
	    },

	    // Change the view's element (`this.el` property) and re-delegate the
	    // view's events on the new element.
	    setElement: function setElement(element) {
	      this.undelegateEvents();
	      this._setElement(element);
	      this.delegateEvents();
	      return this;
	    },

	    // Creates the `this.el` and `this.$el` references for this view using the
	    // given `el`. `el` can be a CSS selector or an HTML string, a jQuery
	    // context or an element. Subclasses can override this to utilize an
	    // alternative DOM manipulation API and are only required to set the
	    // `this.el` property.
	    _setElement: function _setElement(el) {
	      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
	      this.el = this.$el[0];
	    },

	    // Set callbacks, where `this.events` is a hash of
	    //
	    // *{"event selector": "callback"}*
	    //
	    //     {
	    //       'mousedown .title':  'edit',
	    //       'click .button':     'save',
	    //       'click .open':       function(e) { ... }
	    //     }
	    //
	    // pairs. Callbacks will be bound to the view, with `this` set properly.
	    // Uses event delegation for efficiency.
	    // Omitting the selector binds the event to `this.el`.
	    delegateEvents: function delegateEvents(events) {
	      events || (events = _.result(this, 'events'));
	      if (!events) return this;
	      this.undelegateEvents();
	      for (var key in events) {
	        var method = events[key];
	        if (!_.isFunction(method)) method = this[method];
	        if (!method) continue;
	        var match = key.match(delegateEventSplitter);
	        this.delegate(match[1], match[2], _.bind(method, this));
	      }
	      return this;
	    },

	    // Add a single event listener to the view's element (or a child element
	    // using `selector`). This only works for delegate-able events: not `focus`,
	    // `blur`, and not `change`, `submit`, and `reset` in Internet Explorer.
	    delegate: function delegate(eventName, selector, listener) {
	      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Clears all callbacks previously bound to the view by `delegateEvents`.
	    // You usually don't need to use this, but may wish to if you have multiple
	    // Backbone views attached to the same DOM element.
	    undelegateEvents: function undelegateEvents() {
	      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
	      return this;
	    },

	    // A finer-grained `undelegateEvents` for removing a single delegated event.
	    // `selector` and `listener` are both optional.
	    undelegate: function undelegate(eventName, selector, listener) {
	      this.$el.off(eventName + '.delegateEvents' + this.cid, selector, listener);
	      return this;
	    },

	    // Produces a DOM element to be assigned to your view. Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _createElement: function _createElement(tagName) {
	      return document.createElement(tagName);
	    },

	    // Ensure that the View has a DOM element to render into.
	    // If `this.el` is a string, pass it through `$()`, take the first
	    // matching element, and re-assign it to `el`. Otherwise, create
	    // an element from the `id`, `className` and `tagName` properties.
	    _ensureElement: function _ensureElement() {
	      if (!this.el) {
	        var attrs = _.extend({}, _.result(this, 'attributes'));
	        if (this.id) attrs.id = _.result(this, 'id');
	        if (this.className) attrs['class'] = _.result(this, 'className');
	        this.setElement(this._createElement(_.result(this, 'tagName')));
	        this._setAttributes(attrs);
	      } else {
	        this.setElement(_.result(this, 'el'));
	      }
	    },

	    // Set attributes from a hash on this view's element.  Exposed for
	    // subclasses using an alternative DOM manipulation API.
	    _setAttributes: function _setAttributes(attributes) {
	      this.$el.attr(attributes);
	    }

	  });

	  // Backbone.sync
	  // -------------

	  // Override this function to change the manner in which Backbone persists
	  // models to the server. You will be passed the type of request, and the
	  // model in question. By default, makes a RESTful Ajax request
	  // to the model's `url()`. Some possible customizations could be:
	  //
	  // * Use `setTimeout` to batch rapid-fire updates into a single request.
	  // * Send up the models as XML instead of JSON.
	  // * Persist models via WebSockets instead of Ajax.
	  //
	  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
	  // as `POST`, with a `_method` parameter containing the true HTTP method,
	  // as well as all requests with the body as `application/x-www-form-urlencoded`
	  // instead of `application/json` with the model in a param named `model`.
	  // Useful when interfacing with server-side languages like **PHP** that make
	  // it difficult to read the body of `PUT` requests.
	  Backbone.sync = function (method, model, options) {
	    var type = methodMap[method];

	    // Default options, unless specified.
	    _.defaults(options || (options = {}), {
	      emulateHTTP: Backbone.emulateHTTP,
	      emulateJSON: Backbone.emulateJSON
	    });

	    // Default JSON-request options.
	    var params = { type: type, dataType: 'json' };

	    // Ensure that we have a URL.
	    if (!options.url) {
	      params.url = _.result(model, 'url') || urlError();
	    }

	    // Ensure that we have the appropriate request data.
	    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
	      params.contentType = 'application/json';
	      params.data = JSON.stringify(options.attrs || model.toJSON(options));
	    }

	    // For older servers, emulate JSON by encoding the request into an HTML-form.
	    if (options.emulateJSON) {
	      params.contentType = 'application/x-www-form-urlencoded';
	      params.data = params.data ? { model: params.data } : {};
	    }

	    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
	    // And an `X-HTTP-Method-Override` header.
	    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
	      params.type = 'POST';
	      if (options.emulateJSON) params.data._method = type;
	      var beforeSend = options.beforeSend;
	      options.beforeSend = function (xhr) {
	        xhr.setRequestHeader('X-HTTP-Method-Override', type);
	        if (beforeSend) return beforeSend.apply(this, arguments);
	      };
	    }

	    // Don't process data on a non-GET request.
	    if (params.type !== 'GET' && !options.emulateJSON) {
	      params.processData = false;
	    }

	    // Pass along `textStatus` and `errorThrown` from jQuery.
	    var error = options.error;
	    options.error = function (xhr, textStatus, errorThrown) {
	      options.textStatus = textStatus;
	      options.errorThrown = errorThrown;
	      if (error) error.call(options.context, xhr, textStatus, errorThrown);
	    };

	    // Make the request, allowing the user to override any Ajax options.
	    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
	    model.trigger('request', model, xhr, options);
	    return xhr;
	  };

	  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	  var methodMap = {
	    'create': 'POST',
	    'update': 'PUT',
	    'patch': 'PATCH',
	    'delete': 'DELETE',
	    'read': 'GET'
	  };

	  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
	  // Override this if you'd like to use a different library.
	  Backbone.ajax = function () {
	    return Backbone.$.ajax.apply(Backbone.$, arguments);
	  };

	  // Backbone.Router
	  // ---------------

	  // Routers map faux-URLs to actions, and fire events when routes are
	  // matched. Creating a new one sets its `routes` hash, if not set statically.
	  var Router = Backbone.Router = function (options) {
	    options || (options = {});
	    if (options.routes) this.routes = options.routes;
	    this._bindRoutes();
	    this.initialize.apply(this, arguments);
	  };

	  // Cached regular expressions for matching named param parts and splatted
	  // parts of route strings.
	  var optionalParam = /\((.*?)\)/g;
	  var namedParam = /(\(\?)?:\w+/g;
	  var splatParam = /\*\w+/g;
	  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#\s]/g;

	  // Set up all inheritable **Backbone.Router** properties and methods.
	  _.extend(Router.prototype, Events, {

	    // Initialize is an empty function by default. Override it with your own
	    // initialization logic.
	    initialize: function initialize() {},

	    // Manually bind a single named route to a callback. For example:
	    //
	    //     this.route('search/:query/p:num', 'search', function(query, num) {
	    //       ...
	    //     });
	    //
	    route: function route(_route, name, callback) {
	      if (!_.isRegExp(_route)) _route = this._routeToRegExp(_route);
	      if (_.isFunction(name)) {
	        callback = name;
	        name = '';
	      }
	      if (!callback) callback = this[name];
	      var router = this;
	      Backbone.history.route(_route, function (fragment) {
	        var args = router._extractParameters(_route, fragment);
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route:' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	      return this;
	    },

	    // Execute a route handler with the provided parameters.  This is an
	    // excellent place to do pre-route setup or post-route cleanup.
	    execute: function execute(callback, args, name) {
	      if (callback) callback.apply(this, args);
	    },

	    // Simple proxy to `Backbone.history` to save a fragment into the history.
	    navigate: function navigate(fragment, options) {
	      Backbone.history.navigate(fragment, options);
	      return this;
	    },

	    // Bind all defined routes to `Backbone.history`. We have to reverse the
	    // order of the routes here to support behavior where the most general
	    // routes can be defined at the bottom of the route map.
	    _bindRoutes: function _bindRoutes() {
	      if (!this.routes) return;
	      this.routes = _.result(this, 'routes');
	      var route,
	          routes = _.keys(this.routes);
	      while ((route = routes.pop()) != null) {
	        this.route(route, this.routes[route]);
	      }
	    },

	    // Convert a route string into a regular expression, suitable for matching
	    // against the current location hash.
	    _routeToRegExp: function _routeToRegExp(route) {
	      route = route.replace(escapeRegExp, '\\$&').replace(optionalParam, '(?:$1)?').replace(namedParam, function (match, optional) {
	        return optional ? match : '([^/?]+)';
	      }).replace(splatParam, '([^?]*?)');
	      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
	    },

	    // Given a route, and a URL fragment that it matches, return the array of
	    // extracted decoded parameters. Empty or unmatched parameters will be
	    // treated as `null` to normalize cross-browser behavior.
	    _extractParameters: function _extractParameters(route, fragment) {
	      var params = route.exec(fragment).slice(1);
	      return _.map(params, function (param, i) {
	        // Don't decode the search params.
	        if (i === params.length - 1) return param || null;
	        return param ? decodeURIComponent(param) : null;
	      });
	    }

	  });

	  // Backbone.History
	  // ----------------

	  // Handles cross-browser history management, based on either
	  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
	  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
	  // and URL fragments. If the browser supports neither (old IE, natch),
	  // falls back to polling.
	  var History = Backbone.History = function () {
	    this.handlers = [];
	    this.checkUrl = _.bind(this.checkUrl, this);

	    // Ensure that `History` can be used outside of the browser.
	    if (typeof window !== 'undefined') {
	      this.location = window.location;
	      this.history = window.history;
	    }
	  };

	  // Cached regex for stripping a leading hash/slash and trailing space.
	  var routeStripper = /^[#\/]|\s+$/g;

	  // Cached regex for stripping leading and trailing slashes.
	  var rootStripper = /^\/+|\/+$/g;

	  // Cached regex for stripping urls of hash.
	  var pathStripper = /#.*$/;

	  // Has the history handling already been started?
	  History.started = false;

	  // Set up all inheritable **Backbone.History** properties and methods.
	  _.extend(History.prototype, Events, {

	    // The default interval to poll for hash changes, if necessary, is
	    // twenty times a second.
	    interval: 50,

	    // Are we at the app root?
	    atRoot: function atRoot() {
	      var path = this.location.pathname.replace(/[^\/]$/, '$&/');
	      return path === this.root && !this.getSearch();
	    },

	    // Does the pathname match the root?
	    matchRoot: function matchRoot() {
	      var path = this.decodeFragment(this.location.pathname);
	      var rootPath = path.slice(0, this.root.length - 1) + '/';
	      return rootPath === this.root;
	    },

	    // Unicode characters in `location.pathname` are percent encoded so they're
	    // decoded for comparison. `%25` should not be decoded since it may be part
	    // of an encoded parameter.
	    decodeFragment: function decodeFragment(fragment) {
	      return decodeURI(fragment.replace(/%25/g, '%2525'));
	    },

	    // In IE6, the hash fragment and search params are incorrect if the
	    // fragment contains `?`.
	    getSearch: function getSearch() {
	      var match = this.location.href.replace(/#.*/, '').match(/\?.+/);
	      return match ? match[0] : '';
	    },

	    // Gets the true hash value. Cannot use location.hash directly due to bug
	    // in Firefox where location.hash will always be decoded.
	    getHash: function getHash(window) {
	      var match = (window || this).location.href.match(/#(.*)$/);
	      return match ? match[1] : '';
	    },

	    // Get the pathname and search params, without the root.
	    getPath: function getPath() {
	      var path = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
	      return path.charAt(0) === '/' ? path.slice(1) : path;
	    },

	    // Get the cross-browser normalized URL fragment from the path or hash.
	    getFragment: function getFragment(fragment) {
	      if (fragment == null) {
	        if (this._usePushState || !this._wantsHashChange) {
	          fragment = this.getPath();
	        } else {
	          fragment = this.getHash();
	        }
	      }
	      return fragment.replace(routeStripper, '');
	    },

	    // Start the hash change handling, returning `true` if the current URL matches
	    // an existing route, and `false` otherwise.
	    start: function start(options) {
	      if (History.started) throw new Error('Backbone.history has already been started');
	      History.started = true;

	      // Figure out the initial configuration. Do we need an iframe?
	      // Is pushState desired ... is it available?
	      this.options = _.extend({ root: '/' }, this.options, options);
	      this.root = this.options.root;
	      this._wantsHashChange = this.options.hashChange !== false;
	      this._hasHashChange = 'onhashchange' in window && (document.documentMode === void 0 || document.documentMode > 7);
	      this._useHashChange = this._wantsHashChange && this._hasHashChange;
	      this._wantsPushState = !!this.options.pushState;
	      this._hasPushState = !!(this.history && this.history.pushState);
	      this._usePushState = this._wantsPushState && this._hasPushState;
	      this.fragment = this.getFragment();

	      // Normalize root to always include a leading and trailing slash.
	      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

	      // Transition from hashChange to pushState or vice versa if both are
	      // requested.
	      if (this._wantsHashChange && this._wantsPushState) {

	        // If we've started off with a route from a `pushState`-enabled
	        // browser, but we're currently in a browser that doesn't support it...
	        if (!this._hasPushState && !this.atRoot()) {
	          var rootPath = this.root.slice(0, -1) || '/';
	          this.location.replace(rootPath + '#' + this.getPath());
	          // Return immediately as browser will do redirect to new url
	          return true;

	          // Or if we've started out with a hash-based route, but we're currently
	          // in a browser where it could be `pushState`-based instead...
	        } else if (this._hasPushState && this.atRoot()) {
	          this.navigate(this.getHash(), { replace: true });
	        }
	      }

	      // Proxy an iframe to handle location events if the browser doesn't
	      // support the `hashchange` event, HTML5 history, or the user wants
	      // `hashChange` but not `pushState`.
	      if (!this._hasHashChange && this._wantsHashChange && !this._usePushState) {
	        this.iframe = document.createElement('iframe');
	        this.iframe.src = 'javascript:0';
	        this.iframe.style.display = 'none';
	        this.iframe.tabIndex = -1;
	        var body = document.body;
	        // Using `appendChild` will throw on IE < 9 if the document is not ready.
	        var iWindow = body.insertBefore(this.iframe, body.firstChild).contentWindow;
	        iWindow.document.open();
	        iWindow.document.close();
	        iWindow.location.hash = '#' + this.fragment;
	      }

	      // Add a cross-platform `addEventListener` shim for older browsers.
	      var addEventListener = window.addEventListener || function (eventName, listener) {
	        return attachEvent('on' + eventName, listener);
	      };

	      // Depending on whether we're using pushState or hashes, and whether
	      // 'onhashchange' is supported, determine how we check the URL state.
	      if (this._usePushState) {
	        addEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        addEventListener('hashchange', this.checkUrl, false);
	      } else if (this._wantsHashChange) {
	        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
	      }

	      if (!this.options.silent) return this.loadUrl();
	    },

	    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
	    // but possibly useful for unit testing Routers.
	    stop: function stop() {
	      // Add a cross-platform `removeEventListener` shim for older browsers.
	      var removeEventListener = window.removeEventListener || function (eventName, listener) {
	        return detachEvent('on' + eventName, listener);
	      };

	      // Remove window listeners.
	      if (this._usePushState) {
	        removeEventListener('popstate', this.checkUrl, false);
	      } else if (this._useHashChange && !this.iframe) {
	        removeEventListener('hashchange', this.checkUrl, false);
	      }

	      // Clean up the iframe if necessary.
	      if (this.iframe) {
	        document.body.removeChild(this.iframe);
	        this.iframe = null;
	      }

	      // Some environments will throw when clearing an undefined interval.
	      if (this._checkUrlInterval) clearInterval(this._checkUrlInterval);
	      History.started = false;
	    },

	    // Add a route to be tested when the fragment changes. Routes added later
	    // may override previous routes.
	    route: function route(_route2, callback) {
	      this.handlers.unshift({ route: _route2, callback: callback });
	    },

	    // Checks the current URL to see if it has changed, and if it has,
	    // calls `loadUrl`, normalizing across the hidden iframe.
	    checkUrl: function checkUrl(e) {
	      var current = this.getFragment();

	      // If the user pressed the back button, the iframe's hash will have
	      // changed and we should use that for comparison.
	      if (current === this.fragment && this.iframe) {
	        current = this.getHash(this.iframe.contentWindow);
	      }

	      if (current === this.fragment) return false;
	      if (this.iframe) this.navigate(current);
	      this.loadUrl();
	    },

	    // Attempt to load the current URL fragment. If a route succeeds with a
	    // match, returns `true`. If no defined routes matches the fragment,
	    // returns `false`.
	    loadUrl: function loadUrl(fragment) {
	      // If the root doesn't match, no routes can match either.
	      if (!this.matchRoot()) return false;
	      fragment = this.fragment = this.getFragment(fragment);
	      return _.some(this.handlers, function (handler) {
	        if (handler.route.test(fragment)) {
	          handler.callback(fragment);
	          return true;
	        }
	      });
	    },

	    // Save a fragment into the hash history, or replace the URL state if the
	    // 'replace' option is passed. You are responsible for properly URL-encoding
	    // the fragment in advance.
	    //
	    // The options object can contain `trigger: true` if you wish to have the
	    // route callback be fired (not usually desirable), or `replace: true`, if
	    // you wish to modify the current URL without adding an entry to the history.
	    navigate: function navigate(fragment, options) {
	      if (!History.started) return false;
	      if (!options || options === true) options = { trigger: !!options };

	      // Normalize the fragment.
	      fragment = this.getFragment(fragment || '');

	      // Don't include a trailing slash on the root.
	      var rootPath = this.root;
	      if (fragment === '' || fragment.charAt(0) === '?') {
	        rootPath = rootPath.slice(0, -1) || '/';
	      }
	      var url = rootPath + fragment;

	      // Strip the hash and decode for matching.
	      fragment = this.decodeFragment(fragment.replace(pathStripper, ''));

	      if (this.fragment === fragment) return;
	      this.fragment = fragment;

	      // If pushState is available, we use it to set the fragment as a real URL.
	      if (this._usePushState) {
	        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

	        // If hash changes haven't been explicitly disabled, update the hash
	        // fragment to store history.
	      } else if (this._wantsHashChange) {
	        this._updateHash(this.location, fragment, options.replace);
	        if (this.iframe && fragment !== this.getHash(this.iframe.contentWindow)) {
	          var iWindow = this.iframe.contentWindow;

	          // Opening and closing the iframe tricks IE7 and earlier to push a
	          // history entry on hash-tag change.  When replace is true, we don't
	          // want this.
	          if (!options.replace) {
	            iWindow.document.open();
	            iWindow.document.close();
	          }

	          this._updateHash(iWindow.location, fragment, options.replace);
	        }

	        // If you've told us that you explicitly don't want fallback hashchange-
	        // based history, then `navigate` becomes a page refresh.
	      } else {
	        return this.location.assign(url);
	      }
	      if (options.trigger) return this.loadUrl(fragment);
	    },

	    // Update the hash location, either replacing the current entry, or adding
	    // a new one to the browser history.
	    _updateHash: function _updateHash(location, fragment, replace) {
	      if (replace) {
	        var href = location.href.replace(/(javascript:|#).*$/, '');
	        location.replace(href + '#' + fragment);
	      } else {
	        // Some browsers require that `hash` contains a leading #.
	        location.hash = '#' + fragment;
	      }
	    }

	  });

	  // Create the default Backbone.history.
	  Backbone.history = new History();

	  // Helpers
	  // -------

	  // Helper function to correctly set up the prototype chain for subclasses.
	  // Similar to `goog.inherits`, but uses a hash of prototype properties and
	  // class properties to be extended.
	  var extend = function extend(protoProps, staticProps) {
	    var parent = this;
	    var child;

	    // The constructor function for the new subclass is either defined by you
	    // (the "constructor" property in your `extend` definition), or defaulted
	    // by us to simply call the parent constructor.
	    if (protoProps && _.has(protoProps, 'constructor')) {
	      child = protoProps.constructor;
	    } else {
	      child = function child() {
	        return parent.apply(this, arguments);
	      };
	    }

	    // Add static properties to the constructor function, if supplied.
	    _.extend(child, parent, staticProps);

	    // Set the prototype chain to inherit from `parent`, without calling
	    // `parent`'s constructor function and add the prototype properties.
	    child.prototype = _.create(parent.prototype, protoProps);
	    child.prototype.constructor = child;

	    // Set a convenience property in case the parent's prototype is needed
	    // later.
	    child.__super__ = parent.prototype;

	    return child;
	  };

	  // Set up inheritance for the model, collection, router, view and history.
	  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

	  // Throw an error when a URL is needed, and none is supplied.
	  var urlError = function urlError() {
	    throw new Error('A "url" property or function must be specified');
	  };

	  // Wrap an optional error callback with a fallback error event.
	  var wrapError = function wrapError(model, options) {
	    var error = options.error;
	    options.error = function (resp) {
	      if (error) error.call(options.context, model, resp, options);
	      model.trigger('error', model, resp, options);
	    };
	  };

	  return Backbone;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	//     Underscore.js 1.8.3
	//     http://underscorejs.org
	//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	//     Underscore may be freely distributed under the MIT license.

	(function () {

	  // Baseline setup
	  // --------------

	  // Establish the root object, `window` in the browser, or `exports` on the server.
	  var root = this;

	  // Save the previous value of the `_` variable.
	  var previousUnderscore = root._;

	  // Save bytes in the minified (but not gzipped) version:
	  var ArrayProto = Array.prototype,
	      ObjProto = Object.prototype,
	      FuncProto = Function.prototype;

	  // Create quick reference variables for speed access to core prototypes.
	  var push = ArrayProto.push,
	      slice = ArrayProto.slice,
	      toString = ObjProto.toString,
	      hasOwnProperty = ObjProto.hasOwnProperty;

	  // All **ECMAScript 5** native function implementations that we hope to use
	  // are declared here.
	  var nativeIsArray = Array.isArray,
	      nativeKeys = Object.keys,
	      nativeBind = FuncProto.bind,
	      nativeCreate = Object.create;

	  // Naked function reference for surrogate-prototype-swapping.
	  var Ctor = function Ctor() {};

	  // Create a safe reference to the Underscore object for use below.
	  var _ = function _(obj) {
	    if (obj instanceof _) return obj;
	    if (!(this instanceof _)) return new _(obj);
	    this._wrapped = obj;
	  };

	  // Export the Underscore object for **Node.js**, with
	  // backwards-compatibility for the old `require()` API. If we're in
	  // the browser, add `_` as a global object.
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = _;
	    }
	    exports._ = _;
	  } else {
	    root._ = _;
	  }

	  // Current version.
	  _.VERSION = '1.8.3';

	  // Internal function that returns an efficient (for current engines) version
	  // of the passed-in callback, to be repeatedly applied in other Underscore
	  // functions.
	  var optimizeCb = function optimizeCb(func, context, argCount) {
	    if (context === void 0) return func;
	    switch (argCount == null ? 3 : argCount) {
	      case 1:
	        return function (value) {
	          return func.call(context, value);
	        };
	      case 2:
	        return function (value, other) {
	          return func.call(context, value, other);
	        };
	      case 3:
	        return function (value, index, collection) {
	          return func.call(context, value, index, collection);
	        };
	      case 4:
	        return function (accumulator, value, index, collection) {
	          return func.call(context, accumulator, value, index, collection);
	        };
	    }
	    return function () {
	      return func.apply(context, arguments);
	    };
	  };

	  // A mostly-internal function to generate callbacks that can be applied
	  // to each element in a collection, returning the desired result — either
	  // identity, an arbitrary callback, a property matcher, or a property accessor.
	  var cb = function cb(value, context, argCount) {
	    if (value == null) return _.identity;
	    if (_.isFunction(value)) return optimizeCb(value, context, argCount);
	    if (_.isObject(value)) return _.matcher(value);
	    return _.property(value);
	  };
	  _.iteratee = function (value, context) {
	    return cb(value, context, Infinity);
	  };

	  // An internal function for creating assigner functions.
	  var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
	    return function (obj) {
	      var length = arguments.length;
	      if (length < 2 || obj == null) return obj;
	      for (var index = 1; index < length; index++) {
	        var source = arguments[index],
	            keys = keysFunc(source),
	            l = keys.length;
	        for (var i = 0; i < l; i++) {
	          var key = keys[i];
	          if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
	        }
	      }
	      return obj;
	    };
	  };

	  // An internal function for creating a new object that inherits from another.
	  var baseCreate = function baseCreate(prototype) {
	    if (!_.isObject(prototype)) return {};
	    if (nativeCreate) return nativeCreate(prototype);
	    Ctor.prototype = prototype;
	    var result = new Ctor();
	    Ctor.prototype = null;
	    return result;
	  };

	  var property = function property(key) {
	    return function (obj) {
	      return obj == null ? void 0 : obj[key];
	    };
	  };

	  // Helper for collection methods to determine whether a collection
	  // should be iterated as an array or as an object
	  // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	  // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
	  var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
	  var getLength = property('length');
	  var isArrayLike = function isArrayLike(collection) {
	    var length = getLength(collection);
	    return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
	  };

	  // Collection Functions
	  // --------------------

	  // The cornerstone, an `each` implementation, aka `forEach`.
	  // Handles raw objects in addition to array-likes. Treats all
	  // sparse array-likes as if they were dense.
	  _.each = _.forEach = function (obj, iteratee, context) {
	    iteratee = optimizeCb(iteratee, context);
	    var i, length;
	    if (isArrayLike(obj)) {
	      for (i = 0, length = obj.length; i < length; i++) {
	        iteratee(obj[i], i, obj);
	      }
	    } else {
	      var keys = _.keys(obj);
	      for (i = 0, length = keys.length; i < length; i++) {
	        iteratee(obj[keys[i]], keys[i], obj);
	      }
	    }
	    return obj;
	  };

	  // Return the results of applying the iteratee to each element.
	  _.map = _.collect = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length,
	        results = Array(length);
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      results[index] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Create a reducing function iterating left or right.
	  function createReduce(dir) {
	    // Optimized iterator function as using arguments.length
	    // in the main function will deoptimize the, see #1991.
	    function iterator(obj, iteratee, memo, keys, index, length) {
	      for (; index >= 0 && index < length; index += dir) {
	        var currentKey = keys ? keys[index] : index;
	        memo = iteratee(memo, obj[currentKey], currentKey, obj);
	      }
	      return memo;
	    }

	    return function (obj, iteratee, memo, context) {
	      iteratee = optimizeCb(iteratee, context, 4);
	      var keys = !isArrayLike(obj) && _.keys(obj),
	          length = (keys || obj).length,
	          index = dir > 0 ? 0 : length - 1;
	      // Determine the initial value if none is provided.
	      if (arguments.length < 3) {
	        memo = obj[keys ? keys[index] : index];
	        index += dir;
	      }
	      return iterator(obj, iteratee, memo, keys, index, length);
	    };
	  }

	  // **Reduce** builds up a single result from a list of values, aka `inject`,
	  // or `foldl`.
	  _.reduce = _.foldl = _.inject = createReduce(1);

	  // The right-associative version of reduce, also known as `foldr`.
	  _.reduceRight = _.foldr = createReduce(-1);

	  // Return the first value which passes a truth test. Aliased as `detect`.
	  _.find = _.detect = function (obj, predicate, context) {
	    var key;
	    if (isArrayLike(obj)) {
	      key = _.findIndex(obj, predicate, context);
	    } else {
	      key = _.findKey(obj, predicate, context);
	    }
	    if (key !== void 0 && key !== -1) return obj[key];
	  };

	  // Return all the elements that pass a truth test.
	  // Aliased as `select`.
	  _.filter = _.select = function (obj, predicate, context) {
	    var results = [];
	    predicate = cb(predicate, context);
	    _.each(obj, function (value, index, list) {
	      if (predicate(value, index, list)) results.push(value);
	    });
	    return results;
	  };

	  // Return all the elements for which a truth test fails.
	  _.reject = function (obj, predicate, context) {
	    return _.filter(obj, _.negate(cb(predicate)), context);
	  };

	  // Determine whether all of the elements match a truth test.
	  // Aliased as `all`.
	  _.every = _.all = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (!predicate(obj[currentKey], currentKey, obj)) return false;
	    }
	    return true;
	  };

	  // Determine if at least one element in the object matches a truth test.
	  // Aliased as `any`.
	  _.some = _.any = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = !isArrayLike(obj) && _.keys(obj),
	        length = (keys || obj).length;
	    for (var index = 0; index < length; index++) {
	      var currentKey = keys ? keys[index] : index;
	      if (predicate(obj[currentKey], currentKey, obj)) return true;
	    }
	    return false;
	  };

	  // Determine if the array or object contains a given item (using `===`).
	  // Aliased as `includes` and `include`.
	  _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
	    if (!isArrayLike(obj)) obj = _.values(obj);
	    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
	    return _.indexOf(obj, item, fromIndex) >= 0;
	  };

	  // Invoke a method (with arguments) on every item in a collection.
	  _.invoke = function (obj, method) {
	    var args = slice.call(arguments, 2);
	    var isFunc = _.isFunction(method);
	    return _.map(obj, function (value) {
	      var func = isFunc ? method : value[method];
	      return func == null ? func : func.apply(value, args);
	    });
	  };

	  // Convenience version of a common use case of `map`: fetching a property.
	  _.pluck = function (obj, key) {
	    return _.map(obj, _.property(key));
	  };

	  // Convenience version of a common use case of `filter`: selecting only objects
	  // containing specific `key:value` pairs.
	  _.where = function (obj, attrs) {
	    return _.filter(obj, _.matcher(attrs));
	  };

	  // Convenience version of a common use case of `find`: getting the first object
	  // containing specific `key:value` pairs.
	  _.findWhere = function (obj, attrs) {
	    return _.find(obj, _.matcher(attrs));
	  };

	  // Return the maximum element (or element-based computation).
	  _.max = function (obj, iteratee, context) {
	    var result = -Infinity,
	        lastComputed = -Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value > result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Return the minimum element (or element-based computation).
	  _.min = function (obj, iteratee, context) {
	    var result = Infinity,
	        lastComputed = Infinity,
	        value,
	        computed;
	    if (iteratee == null && obj != null) {
	      obj = isArrayLike(obj) ? obj : _.values(obj);
	      for (var i = 0, length = obj.length; i < length; i++) {
	        value = obj[i];
	        if (value < result) {
	          result = value;
	        }
	      }
	    } else {
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index, list) {
	        computed = iteratee(value, index, list);
	        if (computed < lastComputed || computed === Infinity && result === Infinity) {
	          result = value;
	          lastComputed = computed;
	        }
	      });
	    }
	    return result;
	  };

	  // Shuffle a collection, using the modern version of the
	  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
	  _.shuffle = function (obj) {
	    var set = isArrayLike(obj) ? obj : _.values(obj);
	    var length = set.length;
	    var shuffled = Array(length);
	    for (var index = 0, rand; index < length; index++) {
	      rand = _.random(0, index);
	      if (rand !== index) shuffled[index] = shuffled[rand];
	      shuffled[rand] = set[index];
	    }
	    return shuffled;
	  };

	  // Sample **n** random values from a collection.
	  // If **n** is not specified, returns a single random element.
	  // The internal `guard` argument allows it to work with `map`.
	  _.sample = function (obj, n, guard) {
	    if (n == null || guard) {
	      if (!isArrayLike(obj)) obj = _.values(obj);
	      return obj[_.random(obj.length - 1)];
	    }
	    return _.shuffle(obj).slice(0, Math.max(0, n));
	  };

	  // Sort the object's values by a criterion produced by an iteratee.
	  _.sortBy = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    return _.pluck(_.map(obj, function (value, index, list) {
	      return {
	        value: value,
	        index: index,
	        criteria: iteratee(value, index, list)
	      };
	    }).sort(function (left, right) {
	      var a = left.criteria;
	      var b = right.criteria;
	      if (a !== b) {
	        if (a > b || a === void 0) return 1;
	        if (a < b || b === void 0) return -1;
	      }
	      return left.index - right.index;
	    }), 'value');
	  };

	  // An internal function used for aggregate "group by" operations.
	  var group = function group(behavior) {
	    return function (obj, iteratee, context) {
	      var result = {};
	      iteratee = cb(iteratee, context);
	      _.each(obj, function (value, index) {
	        var key = iteratee(value, index, obj);
	        behavior(result, value, key);
	      });
	      return result;
	    };
	  };

	  // Groups the object's values by a criterion. Pass either a string attribute
	  // to group by, or a function that returns the criterion.
	  _.groupBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key].push(value);else result[key] = [value];
	  });

	  // Indexes the object's values by a criterion, similar to `groupBy`, but for
	  // when you know that your index values will be unique.
	  _.indexBy = group(function (result, value, key) {
	    result[key] = value;
	  });

	  // Counts instances of an object that group by a certain criterion. Pass
	  // either a string attribute to count by, or a function that returns the
	  // criterion.
	  _.countBy = group(function (result, value, key) {
	    if (_.has(result, key)) result[key]++;else result[key] = 1;
	  });

	  // Safely create a real, live array from anything iterable.
	  _.toArray = function (obj) {
	    if (!obj) return [];
	    if (_.isArray(obj)) return slice.call(obj);
	    if (isArrayLike(obj)) return _.map(obj, _.identity);
	    return _.values(obj);
	  };

	  // Return the number of elements in an object.
	  _.size = function (obj) {
	    if (obj == null) return 0;
	    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
	  };

	  // Split a collection into two arrays: one whose elements all satisfy the given
	  // predicate, and one whose elements all do not satisfy the predicate.
	  _.partition = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var pass = [],
	        fail = [];
	    _.each(obj, function (value, key, obj) {
	      (predicate(value, key, obj) ? pass : fail).push(value);
	    });
	    return [pass, fail];
	  };

	  // Array Functions
	  // ---------------

	  // Get the first element of an array. Passing **n** will return the first N
	  // values in the array. Aliased as `head` and `take`. The **guard** check
	  // allows it to work with `_.map`.
	  _.first = _.head = _.take = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[0];
	    return _.initial(array, array.length - n);
	  };

	  // Returns everything but the last entry of the array. Especially useful on
	  // the arguments object. Passing **n** will return all the values in
	  // the array, excluding the last N.
	  _.initial = function (array, n, guard) {
	    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
	  };

	  // Get the last element of an array. Passing **n** will return the last N
	  // values in the array.
	  _.last = function (array, n, guard) {
	    if (array == null) return void 0;
	    if (n == null || guard) return array[array.length - 1];
	    return _.rest(array, Math.max(0, array.length - n));
	  };

	  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
	  // Especially useful on the arguments object. Passing an **n** will return
	  // the rest N values in the array.
	  _.rest = _.tail = _.drop = function (array, n, guard) {
	    return slice.call(array, n == null || guard ? 1 : n);
	  };

	  // Trim out all falsy values from an array.
	  _.compact = function (array) {
	    return _.filter(array, _.identity);
	  };

	  // Internal implementation of a recursive `flatten` function.
	  var flatten = function flatten(input, shallow, strict, startIndex) {
	    var output = [],
	        idx = 0;
	    for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
	      var value = input[i];
	      if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
	        //flatten current level of array or arguments object
	        if (!shallow) value = flatten(value, shallow, strict);
	        var j = 0,
	            len = value.length;
	        output.length += len;
	        while (j < len) {
	          output[idx++] = value[j++];
	        }
	      } else if (!strict) {
	        output[idx++] = value;
	      }
	    }
	    return output;
	  };

	  // Flatten out an array, either recursively (by default), or just one level.
	  _.flatten = function (array, shallow) {
	    return flatten(array, shallow, false);
	  };

	  // Return a version of the array that does not contain the specified value(s).
	  _.without = function (array) {
	    return _.difference(array, slice.call(arguments, 1));
	  };

	  // Produce a duplicate-free version of the array. If the array has already
	  // been sorted, you have the option of using a faster algorithm.
	  // Aliased as `unique`.
	  _.uniq = _.unique = function (array, isSorted, iteratee, context) {
	    if (!_.isBoolean(isSorted)) {
	      context = iteratee;
	      iteratee = isSorted;
	      isSorted = false;
	    }
	    if (iteratee != null) iteratee = cb(iteratee, context);
	    var result = [];
	    var seen = [];
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var value = array[i],
	          computed = iteratee ? iteratee(value, i, array) : value;
	      if (isSorted) {
	        if (!i || seen !== computed) result.push(value);
	        seen = computed;
	      } else if (iteratee) {
	        if (!_.contains(seen, computed)) {
	          seen.push(computed);
	          result.push(value);
	        }
	      } else if (!_.contains(result, value)) {
	        result.push(value);
	      }
	    }
	    return result;
	  };

	  // Produce an array that contains the union: each distinct element from all of
	  // the passed-in arrays.
	  _.union = function () {
	    return _.uniq(flatten(arguments, true, true));
	  };

	  // Produce an array that contains every item shared between all the
	  // passed-in arrays.
	  _.intersection = function (array) {
	    var result = [];
	    var argsLength = arguments.length;
	    for (var i = 0, length = getLength(array); i < length; i++) {
	      var item = array[i];
	      if (_.contains(result, item)) continue;
	      for (var j = 1; j < argsLength; j++) {
	        if (!_.contains(arguments[j], item)) break;
	      }
	      if (j === argsLength) result.push(item);
	    }
	    return result;
	  };

	  // Take the difference between one array and a number of other arrays.
	  // Only the elements present in just the first array will remain.
	  _.difference = function (array) {
	    var rest = flatten(arguments, true, true, 1);
	    return _.filter(array, function (value) {
	      return !_.contains(rest, value);
	    });
	  };

	  // Zip together multiple lists into a single array -- elements that share
	  // an index go together.
	  _.zip = function () {
	    return _.unzip(arguments);
	  };

	  // Complement of _.zip. Unzip accepts an array of arrays and groups
	  // each array's elements on shared indices
	  _.unzip = function (array) {
	    var length = array && _.max(array, getLength).length || 0;
	    var result = Array(length);

	    for (var index = 0; index < length; index++) {
	      result[index] = _.pluck(array, index);
	    }
	    return result;
	  };

	  // Converts lists into objects. Pass either a single array of `[key, value]`
	  // pairs, or two parallel arrays of the same length -- one of keys, and one of
	  // the corresponding values.
	  _.object = function (list, values) {
	    var result = {};
	    for (var i = 0, length = getLength(list); i < length; i++) {
	      if (values) {
	        result[list[i]] = values[i];
	      } else {
	        result[list[i][0]] = list[i][1];
	      }
	    }
	    return result;
	  };

	  // Generator function to create the findIndex and findLastIndex functions
	  function createPredicateIndexFinder(dir) {
	    return function (array, predicate, context) {
	      predicate = cb(predicate, context);
	      var length = getLength(array);
	      var index = dir > 0 ? 0 : length - 1;
	      for (; index >= 0 && index < length; index += dir) {
	        if (predicate(array[index], index, array)) return index;
	      }
	      return -1;
	    };
	  }

	  // Returns the first index on an array-like that passes a predicate test
	  _.findIndex = createPredicateIndexFinder(1);
	  _.findLastIndex = createPredicateIndexFinder(-1);

	  // Use a comparator function to figure out the smallest index at which
	  // an object should be inserted so as to maintain order. Uses binary search.
	  _.sortedIndex = function (array, obj, iteratee, context) {
	    iteratee = cb(iteratee, context, 1);
	    var value = iteratee(obj);
	    var low = 0,
	        high = getLength(array);
	    while (low < high) {
	      var mid = Math.floor((low + high) / 2);
	      if (iteratee(array[mid]) < value) low = mid + 1;else high = mid;
	    }
	    return low;
	  };

	  // Generator function to create the indexOf and lastIndexOf functions
	  function createIndexFinder(dir, predicateFind, sortedIndex) {
	    return function (array, item, idx) {
	      var i = 0,
	          length = getLength(array);
	      if (typeof idx == 'number') {
	        if (dir > 0) {
	          i = idx >= 0 ? idx : Math.max(idx + length, i);
	        } else {
	          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
	        }
	      } else if (sortedIndex && idx && length) {
	        idx = sortedIndex(array, item);
	        return array[idx] === item ? idx : -1;
	      }
	      if (item !== item) {
	        idx = predicateFind(slice.call(array, i, length), _.isNaN);
	        return idx >= 0 ? idx + i : -1;
	      }
	      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
	        if (array[idx] === item) return idx;
	      }
	      return -1;
	    };
	  }

	  // Return the position of the first occurrence of an item in an array,
	  // or -1 if the item is not included in the array.
	  // If the array is large and already in sort order, pass `true`
	  // for **isSorted** to use binary search.
	  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
	  _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

	  // Generate an integer Array containing an arithmetic progression. A port of
	  // the native Python `range()` function. See
	  // [the Python documentation](http://docs.python.org/library/functions.html#range).
	  _.range = function (start, stop, step) {
	    if (stop == null) {
	      stop = start || 0;
	      start = 0;
	    }
	    step = step || 1;

	    var length = Math.max(Math.ceil((stop - start) / step), 0);
	    var range = Array(length);

	    for (var idx = 0; idx < length; idx++, start += step) {
	      range[idx] = start;
	    }

	    return range;
	  };

	  // Function (ahem) Functions
	  // ------------------

	  // Determines whether to execute a function as a constructor
	  // or a normal function with the provided arguments
	  var executeBound = function executeBound(sourceFunc, boundFunc, context, callingContext, args) {
	    if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
	    var self = baseCreate(sourceFunc.prototype);
	    var result = sourceFunc.apply(self, args);
	    if (_.isObject(result)) return result;
	    return self;
	  };

	  // Create a function bound to a given object (assigning `this`, and arguments,
	  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
	  // available.
	  _.bind = function (func, context) {
	    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
	    if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
	    var args = slice.call(arguments, 2);
	    var bound = function bound() {
	      return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
	    };
	    return bound;
	  };

	  // Partially apply a function by creating a version that has had some of its
	  // arguments pre-filled, without changing its dynamic `this` context. _ acts
	  // as a placeholder, allowing any combination of arguments to be pre-filled.
	  _.partial = function (func) {
	    var boundArgs = slice.call(arguments, 1);
	    var bound = function bound() {
	      var position = 0,
	          length = boundArgs.length;
	      var args = Array(length);
	      for (var i = 0; i < length; i++) {
	        args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
	      }
	      while (position < arguments.length) {
	        args.push(arguments[position++]);
	      }return executeBound(func, bound, this, this, args);
	    };
	    return bound;
	  };

	  // Bind a number of an object's methods to that object. Remaining arguments
	  // are the method names to be bound. Useful for ensuring that all callbacks
	  // defined on an object belong to it.
	  _.bindAll = function (obj) {
	    var i,
	        length = arguments.length,
	        key;
	    if (length <= 1) throw new Error('bindAll must be passed function names');
	    for (i = 1; i < length; i++) {
	      key = arguments[i];
	      obj[key] = _.bind(obj[key], obj);
	    }
	    return obj;
	  };

	  // Memoize an expensive function by storing its results.
	  _.memoize = function (func, hasher) {
	    var memoize = function memoize(key) {
	      var cache = memoize.cache;
	      var address = '' + (hasher ? hasher.apply(this, arguments) : key);
	      if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
	      return cache[address];
	    };
	    memoize.cache = {};
	    return memoize;
	  };

	  // Delays a function for the given number of milliseconds, and then calls
	  // it with the arguments supplied.
	  _.delay = function (func, wait) {
	    var args = slice.call(arguments, 2);
	    return setTimeout(function () {
	      return func.apply(null, args);
	    }, wait);
	  };

	  // Defers a function, scheduling it to run after the current call stack has
	  // cleared.
	  _.defer = _.partial(_.delay, _, 1);

	  // Returns a function, that, when invoked, will only be triggered at most once
	  // during a given window of time. Normally, the throttled function will run
	  // as much as it can, without ever going more than once per `wait` duration;
	  // but if you'd like to disable the execution on the leading edge, pass
	  // `{leading: false}`. To disable execution on the trailing edge, ditto.
	  _.throttle = function (func, wait, options) {
	    var context, args, result;
	    var timeout = null;
	    var previous = 0;
	    if (!options) options = {};
	    var later = function later() {
	      previous = options.leading === false ? 0 : _.now();
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    };
	    return function () {
	      var now = _.now();
	      if (!previous && options.leading === false) previous = now;
	      var remaining = wait - (now - previous);
	      context = this;
	      args = arguments;
	      if (remaining <= 0 || remaining > wait) {
	        if (timeout) {
	          clearTimeout(timeout);
	          timeout = null;
	        }
	        previous = now;
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      } else if (!timeout && options.trailing !== false) {
	        timeout = setTimeout(later, remaining);
	      }
	      return result;
	    };
	  };

	  // Returns a function, that, as long as it continues to be invoked, will not
	  // be triggered. The function will be called after it stops being called for
	  // N milliseconds. If `immediate` is passed, trigger the function on the
	  // leading edge, instead of the trailing.
	  _.debounce = function (func, wait, immediate) {
	    var timeout, args, context, timestamp, result;

	    var later = function later() {
	      var last = _.now() - timestamp;

	      if (last < wait && last >= 0) {
	        timeout = setTimeout(later, wait - last);
	      } else {
	        timeout = null;
	        if (!immediate) {
	          result = func.apply(context, args);
	          if (!timeout) context = args = null;
	        }
	      }
	    };

	    return function () {
	      context = this;
	      args = arguments;
	      timestamp = _.now();
	      var callNow = immediate && !timeout;
	      if (!timeout) timeout = setTimeout(later, wait);
	      if (callNow) {
	        result = func.apply(context, args);
	        context = args = null;
	      }

	      return result;
	    };
	  };

	  // Returns the first function passed as an argument to the second,
	  // allowing you to adjust arguments, run code before and after, and
	  // conditionally execute the original function.
	  _.wrap = function (func, wrapper) {
	    return _.partial(wrapper, func);
	  };

	  // Returns a negated version of the passed-in predicate.
	  _.negate = function (predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  };

	  // Returns a function that is the composition of a list of functions, each
	  // consuming the return value of the function that follows.
	  _.compose = function () {
	    var args = arguments;
	    var start = args.length - 1;
	    return function () {
	      var i = start;
	      var result = args[start].apply(this, arguments);
	      while (i--) {
	        result = args[i].call(this, result);
	      }return result;
	    };
	  };

	  // Returns a function that will only be executed on and after the Nth call.
	  _.after = function (times, func) {
	    return function () {
	      if (--times < 1) {
	        return func.apply(this, arguments);
	      }
	    };
	  };

	  // Returns a function that will only be executed up to (but not including) the Nth call.
	  _.before = function (times, func) {
	    var memo;
	    return function () {
	      if (--times > 0) {
	        memo = func.apply(this, arguments);
	      }
	      if (times <= 1) func = null;
	      return memo;
	    };
	  };

	  // Returns a function that will be executed at most one time, no matter how
	  // often you call it. Useful for lazy initialization.
	  _.once = _.partial(_.before, 2);

	  // Object Functions
	  // ----------------

	  // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
	  var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
	  var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

	  function collectNonEnumProps(obj, keys) {
	    var nonEnumIdx = nonEnumerableProps.length;
	    var constructor = obj.constructor;
	    var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;

	    // Constructor is a special case.
	    var prop = 'constructor';
	    if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);

	    while (nonEnumIdx--) {
	      prop = nonEnumerableProps[nonEnumIdx];
	      if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
	        keys.push(prop);
	      }
	    }
	  }

	  // Retrieve the names of an object's own properties.
	  // Delegates to **ECMAScript 5**'s native `Object.keys`
	  _.keys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    if (nativeKeys) return nativeKeys(obj);
	    var keys = [];
	    for (var key in obj) {
	      if (_.has(obj, key)) keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve all the property names of an object.
	  _.allKeys = function (obj) {
	    if (!_.isObject(obj)) return [];
	    var keys = [];
	    for (var key in obj) {
	      keys.push(key);
	    } // Ahem, IE < 9.
	    if (hasEnumBug) collectNonEnumProps(obj, keys);
	    return keys;
	  };

	  // Retrieve the values of an object's properties.
	  _.values = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var values = Array(length);
	    for (var i = 0; i < length; i++) {
	      values[i] = obj[keys[i]];
	    }
	    return values;
	  };

	  // Returns the results of applying the iteratee to each element of the object
	  // In contrast to _.map it returns an object
	  _.mapObject = function (obj, iteratee, context) {
	    iteratee = cb(iteratee, context);
	    var keys = _.keys(obj),
	        length = keys.length,
	        results = {},
	        currentKey;
	    for (var index = 0; index < length; index++) {
	      currentKey = keys[index];
	      results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
	    }
	    return results;
	  };

	  // Convert an object into a list of `[key, value]` pairs.
	  _.pairs = function (obj) {
	    var keys = _.keys(obj);
	    var length = keys.length;
	    var pairs = Array(length);
	    for (var i = 0; i < length; i++) {
	      pairs[i] = [keys[i], obj[keys[i]]];
	    }
	    return pairs;
	  };

	  // Invert the keys and values of an object. The values must be serializable.
	  _.invert = function (obj) {
	    var result = {};
	    var keys = _.keys(obj);
	    for (var i = 0, length = keys.length; i < length; i++) {
	      result[obj[keys[i]]] = keys[i];
	    }
	    return result;
	  };

	  // Return a sorted list of the function names available on the object.
	  // Aliased as `methods`
	  _.functions = _.methods = function (obj) {
	    var names = [];
	    for (var key in obj) {
	      if (_.isFunction(obj[key])) names.push(key);
	    }
	    return names.sort();
	  };

	  // Extend a given object with all the properties in passed-in object(s).
	  _.extend = createAssigner(_.allKeys);

	  // Assigns a given object with all the own properties in the passed-in object(s)
	  // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
	  _.extendOwn = _.assign = createAssigner(_.keys);

	  // Returns the first key on an object that passes a predicate test
	  _.findKey = function (obj, predicate, context) {
	    predicate = cb(predicate, context);
	    var keys = _.keys(obj),
	        key;
	    for (var i = 0, length = keys.length; i < length; i++) {
	      key = keys[i];
	      if (predicate(obj[key], key, obj)) return key;
	    }
	  };

	  // Return a copy of the object only containing the whitelisted properties.
	  _.pick = function (object, oiteratee, context) {
	    var result = {},
	        obj = object,
	        iteratee,
	        keys;
	    if (obj == null) return result;
	    if (_.isFunction(oiteratee)) {
	      keys = _.allKeys(obj);
	      iteratee = optimizeCb(oiteratee, context);
	    } else {
	      keys = flatten(arguments, false, false, 1);
	      iteratee = function iteratee(value, key, obj) {
	        return key in obj;
	      };
	      obj = Object(obj);
	    }
	    for (var i = 0, length = keys.length; i < length; i++) {
	      var key = keys[i];
	      var value = obj[key];
	      if (iteratee(value, key, obj)) result[key] = value;
	    }
	    return result;
	  };

	  // Return a copy of the object without the blacklisted properties.
	  _.omit = function (obj, iteratee, context) {
	    if (_.isFunction(iteratee)) {
	      iteratee = _.negate(iteratee);
	    } else {
	      var keys = _.map(flatten(arguments, false, false, 1), String);
	      iteratee = function iteratee(value, key) {
	        return !_.contains(keys, key);
	      };
	    }
	    return _.pick(obj, iteratee, context);
	  };

	  // Fill in a given object with default properties.
	  _.defaults = createAssigner(_.allKeys, true);

	  // Creates an object that inherits from the given prototype object.
	  // If additional properties are provided then they will be added to the
	  // created object.
	  _.create = function (prototype, props) {
	    var result = baseCreate(prototype);
	    if (props) _.extendOwn(result, props);
	    return result;
	  };

	  // Create a (shallow-cloned) duplicate of an object.
	  _.clone = function (obj) {
	    if (!_.isObject(obj)) return obj;
	    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
	  };

	  // Invokes interceptor with the obj, and then returns obj.
	  // The primary purpose of this method is to "tap into" a method chain, in
	  // order to perform operations on intermediate results within the chain.
	  _.tap = function (obj, interceptor) {
	    interceptor(obj);
	    return obj;
	  };

	  // Returns whether an object has a given set of `key:value` pairs.
	  _.isMatch = function (object, attrs) {
	    var keys = _.keys(attrs),
	        length = keys.length;
	    if (object == null) return !length;
	    var obj = Object(object);
	    for (var i = 0; i < length; i++) {
	      var key = keys[i];
	      if (attrs[key] !== obj[key] || !(key in obj)) return false;
	    }
	    return true;
	  };

	  // Internal recursive comparison function for `isEqual`.
	  var eq = function eq(a, b, aStack, bStack) {
	    // Identical objects are equal. `0 === -0`, but they aren't identical.
	    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
	    if (a === b) return a !== 0 || 1 / a === 1 / b;
	    // A strict comparison is necessary because `null == undefined`.
	    if (a == null || b == null) return a === b;
	    // Unwrap any wrapped objects.
	    if (a instanceof _) a = a._wrapped;
	    if (b instanceof _) b = b._wrapped;
	    // Compare `[[Class]]` names.
	    var className = toString.call(a);
	    if (className !== toString.call(b)) return false;
	    switch (className) {
	      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
	      case '[object RegExp]':
	      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
	      case '[object String]':
	        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
	        // equivalent to `new String("5")`.
	        return '' + a === '' + b;
	      case '[object Number]':
	        // `NaN`s are equivalent, but non-reflexive.
	        // Object(NaN) is equivalent to NaN
	        if (+a !== +a) return +b !== +b;
	        // An `egal` comparison is performed for other numeric values.
	        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
	      case '[object Date]':
	      case '[object Boolean]':
	        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
	        // millisecond representations. Note that invalid dates with millisecond representations
	        // of `NaN` are not equivalent.
	        return +a === +b;
	    }

	    var areArrays = className === '[object Array]';
	    if (!areArrays) {
	      if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) != 'object' || (typeof b === 'undefined' ? 'undefined' : _typeof(b)) != 'object') return false;

	      // Objects with different constructors are not equivalent, but `Object`s or `Array`s
	      // from different frames are.
	      var aCtor = a.constructor,
	          bCtor = b.constructor;
	      if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && 'constructor' in a && 'constructor' in b) {
	        return false;
	      }
	    }
	    // Assume equality for cyclic structures. The algorithm for detecting cyclic
	    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.

	    // Initializing stack of traversed objects.
	    // It's done here since we only need them for objects and arrays comparison.
	    aStack = aStack || [];
	    bStack = bStack || [];
	    var length = aStack.length;
	    while (length--) {
	      // Linear search. Performance is inversely proportional to the number of
	      // unique nested structures.
	      if (aStack[length] === a) return bStack[length] === b;
	    }

	    // Add the first object to the stack of traversed objects.
	    aStack.push(a);
	    bStack.push(b);

	    // Recursively compare objects and arrays.
	    if (areArrays) {
	      // Compare array lengths to determine if a deep comparison is necessary.
	      length = a.length;
	      if (length !== b.length) return false;
	      // Deep compare the contents, ignoring non-numeric properties.
	      while (length--) {
	        if (!eq(a[length], b[length], aStack, bStack)) return false;
	      }
	    } else {
	      // Deep compare objects.
	      var keys = _.keys(a),
	          key;
	      length = keys.length;
	      // Ensure that both objects contain the same number of properties before comparing deep equality.
	      if (_.keys(b).length !== length) return false;
	      while (length--) {
	        // Deep compare each member
	        key = keys[length];
	        if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
	      }
	    }
	    // Remove the first object from the stack of traversed objects.
	    aStack.pop();
	    bStack.pop();
	    return true;
	  };

	  // Perform a deep comparison to check if two objects are equal.
	  _.isEqual = function (a, b) {
	    return eq(a, b);
	  };

	  // Is a given array, string, or object empty?
	  // An "empty" object has no enumerable own-properties.
	  _.isEmpty = function (obj) {
	    if (obj == null) return true;
	    if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
	    return _.keys(obj).length === 0;
	  };

	  // Is a given value a DOM element?
	  _.isElement = function (obj) {
	    return !!(obj && obj.nodeType === 1);
	  };

	  // Is a given value an array?
	  // Delegates to ECMA5's native Array.isArray
	  _.isArray = nativeIsArray || function (obj) {
	    return toString.call(obj) === '[object Array]';
	  };

	  // Is a given variable an object?
	  _.isObject = function (obj) {
	    var type = typeof obj === 'undefined' ? 'undefined' : _typeof(obj);
	    return type === 'function' || type === 'object' && !!obj;
	  };

	  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
	  _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function (name) {
	    _['is' + name] = function (obj) {
	      return toString.call(obj) === '[object ' + name + ']';
	    };
	  });

	  // Define a fallback version of the method in browsers (ahem, IE < 9), where
	  // there isn't any inspectable "Arguments" type.
	  if (!_.isArguments(arguments)) {
	    _.isArguments = function (obj) {
	      return _.has(obj, 'callee');
	    };
	  }

	  // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
	  // IE 11 (#1621), and in Safari 8 (#1929).
	  if (typeof /./ != 'function' && (typeof Int8Array === 'undefined' ? 'undefined' : _typeof(Int8Array)) != 'object') {
	    _.isFunction = function (obj) {
	      return typeof obj == 'function' || false;
	    };
	  }

	  // Is a given object a finite number?
	  _.isFinite = function (obj) {
	    return isFinite(obj) && !isNaN(parseFloat(obj));
	  };

	  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
	  _.isNaN = function (obj) {
	    return _.isNumber(obj) && obj !== +obj;
	  };

	  // Is a given value a boolean?
	  _.isBoolean = function (obj) {
	    return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
	  };

	  // Is a given value equal to null?
	  _.isNull = function (obj) {
	    return obj === null;
	  };

	  // Is a given variable undefined?
	  _.isUndefined = function (obj) {
	    return obj === void 0;
	  };

	  // Shortcut function for checking if an object has a given property directly
	  // on itself (in other words, not on a prototype).
	  _.has = function (obj, key) {
	    return obj != null && hasOwnProperty.call(obj, key);
	  };

	  // Utility Functions
	  // -----------------

	  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
	  // previous owner. Returns a reference to the Underscore object.
	  _.noConflict = function () {
	    root._ = previousUnderscore;
	    return this;
	  };

	  // Keep the identity function around for default iteratees.
	  _.identity = function (value) {
	    return value;
	  };

	  // Predicate-generating functions. Often useful outside of Underscore.
	  _.constant = function (value) {
	    return function () {
	      return value;
	    };
	  };

	  _.noop = function () {};

	  _.property = property;

	  // Generates a function for a given object that returns a given property.
	  _.propertyOf = function (obj) {
	    return obj == null ? function () {} : function (key) {
	      return obj[key];
	    };
	  };

	  // Returns a predicate for checking whether an object has a given set of
	  // `key:value` pairs.
	  _.matcher = _.matches = function (attrs) {
	    attrs = _.extendOwn({}, attrs);
	    return function (obj) {
	      return _.isMatch(obj, attrs);
	    };
	  };

	  // Run a function **n** times.
	  _.times = function (n, iteratee, context) {
	    var accum = Array(Math.max(0, n));
	    iteratee = optimizeCb(iteratee, context, 1);
	    for (var i = 0; i < n; i++) {
	      accum[i] = iteratee(i);
	    }return accum;
	  };

	  // Return a random integer between min and max (inclusive).
	  _.random = function (min, max) {
	    if (max == null) {
	      max = min;
	      min = 0;
	    }
	    return min + Math.floor(Math.random() * (max - min + 1));
	  };

	  // A (possibly faster) way to get the current timestamp as an integer.
	  _.now = Date.now || function () {
	    return new Date().getTime();
	  };

	  // List of HTML entities for escaping.
	  var escapeMap = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#x27;',
	    '`': '&#x60;'
	  };
	  var unescapeMap = _.invert(escapeMap);

	  // Functions for escaping and unescaping strings to/from HTML interpolation.
	  var createEscaper = function createEscaper(map) {
	    var escaper = function escaper(match) {
	      return map[match];
	    };
	    // Regexes for identifying a key that needs to be escaped
	    var source = '(?:' + _.keys(map).join('|') + ')';
	    var testRegexp = RegExp(source);
	    var replaceRegexp = RegExp(source, 'g');
	    return function (string) {
	      string = string == null ? '' : '' + string;
	      return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	    };
	  };
	  _.escape = createEscaper(escapeMap);
	  _.unescape = createEscaper(unescapeMap);

	  // If the value of the named `property` is a function then invoke it with the
	  // `object` as context; otherwise, return it.
	  _.result = function (object, property, fallback) {
	    var value = object == null ? void 0 : object[property];
	    if (value === void 0) {
	      value = fallback;
	    }
	    return _.isFunction(value) ? value.call(object) : value;
	  };

	  // Generate a unique integer id (unique within the entire client session).
	  // Useful for temporary DOM ids.
	  var idCounter = 0;
	  _.uniqueId = function (prefix) {
	    var id = ++idCounter + '';
	    return prefix ? prefix + id : id;
	  };

	  // By default, Underscore uses ERB-style template delimiters, change the
	  // following template settings to use alternative delimiters.
	  _.templateSettings = {
	    evaluate: /<%([\s\S]+?)%>/g,
	    interpolate: /<%=([\s\S]+?)%>/g,
	    escape: /<%-([\s\S]+?)%>/g
	  };

	  // When customizing `templateSettings`, if you don't want to define an
	  // interpolation, evaluation or escaping regex, we need one that is
	  // guaranteed not to match.
	  var noMatch = /(.)^/;

	  // Certain characters need to be escaped so that they can be put into a
	  // string literal.
	  var escapes = {
	    "'": "'",
	    '\\': '\\',
	    '\r': 'r',
	    '\n': 'n',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

	  var escapeChar = function escapeChar(match) {
	    return '\\' + escapes[match];
	  };

	  // JavaScript micro-templating, similar to John Resig's implementation.
	  // Underscore templating handles arbitrary delimiters, preserves whitespace,
	  // and correctly escapes quotes within interpolated code.
	  // NB: `oldSettings` only exists for backwards compatibility.
	  _.template = function (text, settings, oldSettings) {
	    if (!settings && oldSettings) settings = oldSettings;
	    settings = _.defaults({}, settings, _.templateSettings);

	    // Combine delimiters into one regular expression via alternation.
	    var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');

	    // Compile the template source, escaping string literals appropriately.
	    var index = 0;
	    var source = "__p+='";
	    text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
	      source += text.slice(index, offset).replace(escaper, escapeChar);
	      index = offset + match.length;

	      if (escape) {
	        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
	      } else if (interpolate) {
	        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
	      } else if (evaluate) {
	        source += "';\n" + evaluate + "\n__p+='";
	      }

	      // Adobe VMs need the match returned to produce the correct offest.
	      return match;
	    });
	    source += "';\n";

	    // If a variable is not specified, place data values in local scope.
	    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

	    source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + source + 'return __p;\n';

	    try {
	      var render = new Function(settings.variable || 'obj', '_', source);
	    } catch (e) {
	      e.source = source;
	      throw e;
	    }

	    var template = function template(data) {
	      return render.call(this, data, _);
	    };

	    // Provide the compiled source as a convenience for precompilation.
	    var argument = settings.variable || 'obj';
	    template.source = 'function(' + argument + '){\n' + source + '}';

	    return template;
	  };

	  // Add a "chain" function. Start chaining a wrapped Underscore object.
	  _.chain = function (obj) {
	    var instance = _(obj);
	    instance._chain = true;
	    return instance;
	  };

	  // OOP
	  // ---------------
	  // If Underscore is called as a function, it returns a wrapped object that
	  // can be used OO-style. This wrapper holds altered versions of all the
	  // underscore functions. Wrapped objects may be chained.

	  // Helper function to continue chaining intermediate results.
	  var result = function result(instance, obj) {
	    return instance._chain ? _(obj).chain() : obj;
	  };

	  // Add your own custom functions to the Underscore object.
	  _.mixin = function (obj) {
	    _.each(_.functions(obj), function (name) {
	      var func = _[name] = obj[name];
	      _.prototype[name] = function () {
	        var args = [this._wrapped];
	        push.apply(args, arguments);
	        return result(this, func.apply(_, args));
	      };
	    });
	  };

	  // Add all of the Underscore functions to the wrapper object.
	  _.mixin(_);

	  // Add all mutator Array functions to the wrapper.
	  _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      var obj = this._wrapped;
	      method.apply(obj, arguments);
	      if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
	      return result(this, obj);
	    };
	  });

	  // Add all accessor Array functions to the wrapper.
	  _.each(['concat', 'join', 'slice'], function (name) {
	    var method = ArrayProto[name];
	    _.prototype[name] = function () {
	      return result(this, method.apply(this._wrapped, arguments));
	    };
	  });

	  // Extracts the result from a wrapped and chained object.
	  _.prototype.value = function () {
	    return this._wrapped;
	  };

	  // Provide unwrapping proxy for some methods used in engine operations
	  // such as arithmetic and JSON stringification.
	  _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;

	  _.prototype.toString = function () {
	    return '' + this._wrapped;
	  };

	  // AMD registration happens at the end for compatibility with AMD loaders
	  // that may not enforce next-turn semantics on modules. Even though general
	  // practice for AMD registration is to be anonymous, underscore registers
	  // as a named module because, like jQuery, it is a base library that is
	  // popular enough to be bundled in a third party lib, but not be part of
	  // an AMD load request. Those cases could generate an error when an
	  // anonymous define() is called outside of a loader request.
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	      return _;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	}).call(undefined);

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = window.$;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// Backbone.Radio v2.0.0

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof2(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(__webpack_require__(4), __webpack_require__(3)) :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(3)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : (global.Backbone = global.Backbone || {}, global.Backbone.Radio = factory(global._, global.Backbone));
	})(undefined, function (_, Backbone) {
	  'use strict';

	  _ = 'default' in _ ? _['default'] : _;
	  Backbone = 'default' in Backbone ? Backbone['default'] : Backbone;

	  var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
	    return typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	  } : function (obj) {
	    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === 'undefined' ? 'undefined' : _typeof2(obj);
	  };

	  var previousRadio = Backbone.Radio;

	  var Radio = Backbone.Radio = {};

	  Radio.VERSION = '2.0.0';

	  // This allows you to run multiple instances of Radio on the same
	  // webapp. After loading the new version, call `noConflict()` to
	  // get a reference to it. At the same time the old version will be
	  // returned to Backbone.Radio.
	  Radio.noConflict = function () {
	    Backbone.Radio = previousRadio;
	    return this;
	  };

	  // Whether or not we're in DEBUG mode or not. DEBUG mode helps you
	  // get around the issues of lack of warnings when events are mis-typed.
	  Radio.DEBUG = false;

	  // Format debug text.
	  Radio._debugText = function (warning, eventName, channelName) {
	    return warning + (channelName ? ' on the ' + channelName + ' channel' : '') + ': "' + eventName + '"';
	  };

	  // This is the method that's called when an unregistered event was called.
	  // By default, it logs warning to the console. By overriding this you could
	  // make it throw an Error, for instance. This would make firing a nonexistent event
	  // have the same consequence as firing a nonexistent method on an Object.
	  Radio.debugLog = function (warning, eventName, channelName) {
	    if (Radio.DEBUG && console && console.warn) {
	      console.warn(Radio._debugText(warning, eventName, channelName));
	    }
	  };

	  var eventSplitter = /\s+/;

	  // An internal method used to handle Radio's method overloading for Requests.
	  // It's borrowed from Backbone.Events. It differs from Backbone's overload
	  // API (which is used in Backbone.Events) in that it doesn't support space-separated
	  // event names.
	  Radio._eventsApi = function (obj, action, name, rest) {
	    if (!name) {
	      return false;
	    }

	    var results = {};

	    // Handle event maps.
	    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
	      for (var key in name) {
	        var result = obj[action].apply(obj, [key, name[key]].concat(rest));
	        eventSplitter.test(key) ? _.extend(results, result) : results[key] = result;
	      }
	      return results;
	    }

	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	      var names = name.split(eventSplitter);
	      for (var i = 0, l = names.length; i < l; i++) {
	        results[names[i]] = obj[action].apply(obj, [names[i]].concat(rest));
	      }
	      return results;
	    }

	    return false;
	  };

	  // An optimized way to execute callbacks.
	  Radio._callHandler = function (callback, context, args) {
	    var a1 = args[0],
	        a2 = args[1],
	        a3 = args[2];
	    switch (args.length) {
	      case 0:
	        return callback.call(context);
	      case 1:
	        return callback.call(context, a1);
	      case 2:
	        return callback.call(context, a1, a2);
	      case 3:
	        return callback.call(context, a1, a2, a3);
	      default:
	        return callback.apply(context, args);
	    }
	  };

	  // A helper used by `off` methods to the handler from the store
	  function removeHandler(store, name, callback, context) {
	    var event = store[name];
	    if ((!callback || callback === event.callback || callback === event.callback._callback) && (!context || context === event.context)) {
	      delete store[name];
	      return true;
	    }
	  }

	  function removeHandlers(store, name, callback, context) {
	    store || (store = {});
	    var names = name ? [name] : _.keys(store);
	    var matched = false;

	    for (var i = 0, length = names.length; i < length; i++) {
	      name = names[i];

	      // If there's no event by this name, log it and continue
	      // with the loop
	      if (!store[name]) {
	        continue;
	      }

	      if (removeHandler(store, name, callback, context)) {
	        matched = true;
	      }
	    }

	    return matched;
	  }

	  /*
	   * tune-in
	   * -------
	   * Get console logs of a channel's activity
	   *
	   */

	  var _logs = {};

	  // This is to produce an identical function in both tuneIn and tuneOut,
	  // so that Backbone.Events unregisters it.
	  function _partial(channelName) {
	    return _logs[channelName] || (_logs[channelName] = _.bind(Radio.log, Radio, channelName));
	  }

	  _.extend(Radio, {

	    // Log information about the channel and event
	    log: function log(channelName, eventName) {
	      if (typeof console === 'undefined') {
	        return;
	      }
	      var args = _.toArray(arguments).slice(2);
	      console.log('[' + channelName + '] "' + eventName + '"', args);
	    },

	    // Logs all events on this channel to the console. It sets an
	    // internal value on the channel telling it we're listening,
	    // then sets a listener on the Backbone.Events
	    tuneIn: function tuneIn(channelName) {
	      var channel = Radio.channel(channelName);
	      channel._tunedIn = true;
	      channel.on('all', _partial(channelName));
	      return this;
	    },

	    // Stop logging all of the activities on this channel to the console
	    tuneOut: function tuneOut(channelName) {
	      var channel = Radio.channel(channelName);
	      channel._tunedIn = false;
	      channel.off('all', _partial(channelName));
	      delete _logs[channelName];
	      return this;
	    }
	  });

	  /*
	   * Backbone.Radio.Requests
	   * -----------------------
	   * A messaging system for requesting data.
	   *
	   */

	  function makeCallback(callback) {
	    return _.isFunction(callback) ? callback : function () {
	      return callback;
	    };
	  }

	  Radio.Requests = {

	    // Make a request
	    request: function request(name) {
	      var args = _.toArray(arguments).slice(1);
	      var results = Radio._eventsApi(this, 'request', name, args);
	      if (results) {
	        return results;
	      }
	      var channelName = this.channelName;
	      var requests = this._requests;

	      // Check if we should log the request, and if so, do it
	      if (channelName && this._tunedIn) {
	        Radio.log.apply(this, [channelName, name].concat(args));
	      }

	      // If the request isn't handled, log it in DEBUG mode and exit
	      if (requests && (requests[name] || requests['default'])) {
	        var handler = requests[name] || requests['default'];
	        args = requests[name] ? args : arguments;
	        return Radio._callHandler(handler.callback, handler.context, args);
	      } else {
	        Radio.debugLog('An unhandled request was fired', name, channelName);
	      }
	    },

	    // Set up a handler for a request
	    reply: function reply(name, callback, context) {
	      if (Radio._eventsApi(this, 'reply', name, [callback, context])) {
	        return this;
	      }

	      this._requests || (this._requests = {});

	      if (this._requests[name]) {
	        Radio.debugLog('A request was overwritten', name, this.channelName);
	      }

	      this._requests[name] = {
	        callback: makeCallback(callback),
	        context: context || this
	      };

	      return this;
	    },

	    // Set up a handler that can only be requested once
	    replyOnce: function replyOnce(name, callback, context) {
	      if (Radio._eventsApi(this, 'replyOnce', name, [callback, context])) {
	        return this;
	      }

	      var self = this;

	      var once = _.once(function () {
	        self.stopReplying(name);
	        return makeCallback(callback).apply(this, arguments);
	      });

	      return this.reply(name, once, context);
	    },

	    // Remove handler(s)
	    stopReplying: function stopReplying(name, callback, context) {
	      if (Radio._eventsApi(this, 'stopReplying', name)) {
	        return this;
	      }

	      // Remove everything if there are no arguments passed
	      if (!name && !callback && !context) {
	        delete this._requests;
	      } else if (!removeHandlers(this._requests, name, callback, context)) {
	        Radio.debugLog('Attempted to remove the unregistered request', name, this.channelName);
	      }

	      return this;
	    }
	  };

	  /*
	   * Backbone.Radio.channel
	   * ----------------------
	   * Get a reference to a channel by name.
	   *
	   */

	  Radio._channels = {};

	  Radio.channel = function (channelName) {
	    if (!channelName) {
	      throw new Error('You must provide a name for the channel.');
	    }

	    if (Radio._channels[channelName]) {
	      return Radio._channels[channelName];
	    } else {
	      return Radio._channels[channelName] = new Radio.Channel(channelName);
	    }
	  };

	  /*
	   * Backbone.Radio.Channel
	   * ----------------------
	   * A Channel is an object that extends from Backbone.Events,
	   * and Radio.Requests.
	   *
	   */

	  Radio.Channel = function (channelName) {
	    this.channelName = channelName;
	  };

	  _.extend(Radio.Channel.prototype, Backbone.Events, Radio.Requests, {

	    // Remove all handlers from the messaging systems of this channel
	    reset: function reset() {
	      this.off();
	      this.stopListening();
	      this.stopReplying();
	      return this;
	    }
	  });

	  /*
	   * Top-level API
	   * -------------
	   * Supplies the 'top-level API' for working with Channels directly
	   * from Backbone.Radio.
	   *
	   */

	  var channel;
	  var args;
	  var systems = [Backbone.Events, Radio.Requests];
	  _.each(systems, function (system) {
	    _.each(system, function (method, methodName) {
	      Radio[methodName] = function (channelName) {
	        args = _.toArray(arguments).slice(1);
	        channel = this.channel(channelName);
	        return channel[methodName].apply(channel, args);
	      };
	    });
	  });

	  Radio.reset = function (channelName) {
	    var channels = !channelName ? this._channels : [this._channels[channelName]];
	    _.each(channels, function (channel) {
	      channel.reset();
	    });
	  };

	  return Radio;
	});
	//# sourceMappingURL=./backbone.radio.js.map

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _marionette = __webpack_require__(2);

	var _layout = __webpack_require__(8);

	var _layout2 = _interopRequireDefault(_layout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Created by frankrwu on 2016/12/17.
	 */
	exports.default = _marionette.LayoutView.extend({
	    el: '#app-layout',
	    template: _layout2.default,

	    regions: {
	        region1: 'div.region1',
	        region2: 'div.region1'
	    }
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Handlebars = __webpack_require__(9);
	function __default(obj) { return obj && (obj.__esModule ? obj["default"] : obj); }
	module.exports = (Handlebars["default"] || Handlebars).template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
	    return "<div class=\"region1\"></div>\n<div class=\"region2\"></div>";
	},"useData":true});

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// Create a simple path alias to allow browserify to resolve
	// the runtime on a supported path.
	module.exports = __webpack_require__(10)['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	// istanbul ignore next

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj['default'] = obj;return newObj;
	  }
	}

	var _handlebarsBase = __webpack_require__(11);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(25);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(13);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(12);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(26);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(27);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utils = __webpack_require__(12);

	var _exception = __webpack_require__(13);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(14);

	var _decorators = __webpack_require__(22);

	var _logger = __webpack_require__(24);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.5';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function isFunction(value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  try {
	    if (loc) {
	      this.lineNumber = line;

	      // Work around issue under safari where we can't directly set the column value
	      /* istanbul ignore next */
	      if (Object.defineProperty) {
	        Object.defineProperty(this, 'column', { value: column });
	      } else {
	        this.column = column;
	      }
	    }
	  } catch (nop) {
	    /* Ignore if the browser is very particular */
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _helpersBlockHelperMissing = __webpack_require__(15);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(16);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(17);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(18);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(19);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(20);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(21);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(12);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _utils = __webpack_require__(12);

	var _exception = __webpack_require__(13);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && (typeof context === 'undefined' ? 'undefined' : _typeof(context)) === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _exception = __webpack_require__(13);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(12);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(12);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _decoratorsInline = __webpack_require__(23);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(12);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function ret(context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(12);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;
	// istanbul ignore next

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	// istanbul ignore next

	function _interopRequireWildcard(obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }newObj['default'] = obj;return newObj;
	  }
	}

	var _utils = __webpack_require__(12);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(13);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(11);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + (typeof templateSpec === 'undefined' ? 'undefined' : _typeof(templateSpec)));
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context != options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context != depths[0]) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      var data = options.data;
	      while (data['partial-block'] === noop) {
	        data = data._parent;
	      }
	      partial = data['partial-block'];
	      data['partial-block'] = noop;
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;

	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
	    }
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

/***/ },
/* 27 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);