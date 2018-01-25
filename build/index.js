module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (process.env.NODE_ENV === 'production') {
  module.exports = __webpack_require__(44);
} else {
  module.exports = __webpack_require__(45);
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Utility functions
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function typeOf(obj) {
  return Object.prototype.toString.call(obj);
}

function isString(obj) {
  return typeOf(obj) === '[object String]';
}

var hasOwn = Object.prototype.hasOwnProperty;

function has(object, key) {
  return object ? hasOwn.call(object, key) : false;
}

// Extend objects
//
function assign(obj /*from1, from2, from3, ...*/) {
  var sources = [].slice.call(arguments, 1);

  sources.forEach(function (source) {
    if (!source) {
      return;
    }

    if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object') {
      throw new TypeError(source + 'must be object');
    }

    Object.keys(source).forEach(function (key) {
      obj[key] = source[key];
    });
  });

  return obj;
}

////////////////////////////////////////////////////////////////////////////////

var UNESCAPE_MD_RE = /\\([\\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

function unescapeMd(str) {
  if (str.indexOf('\\') < 0) {
    return str;
  }
  return str.replace(UNESCAPE_MD_RE, '$1');
}

////////////////////////////////////////////////////////////////////////////////

function isValidEntityCode(c) {
  /*eslint no-bitwise:0*/
  // broken sequence
  if (c >= 0xD800 && c <= 0xDFFF) {
    return false;
  }
  // never used
  if (c >= 0xFDD0 && c <= 0xFDEF) {
    return false;
  }
  if ((c & 0xFFFF) === 0xFFFF || (c & 0xFFFF) === 0xFFFE) {
    return false;
  }
  // control codes
  if (c >= 0x00 && c <= 0x08) {
    return false;
  }
  if (c === 0x0B) {
    return false;
  }
  if (c >= 0x0E && c <= 0x1F) {
    return false;
  }
  if (c >= 0x7F && c <= 0x9F) {
    return false;
  }
  // out of range
  if (c > 0x10FFFF) {
    return false;
  }
  return true;
}

function fromCodePoint(c) {
  /*eslint no-bitwise:0*/
  if (c > 0xffff) {
    c -= 0x10000;
    var surrogate1 = 0xd800 + (c >> 10),
        surrogate2 = 0xdc00 + (c & 0x3ff);

    return String.fromCharCode(surrogate1, surrogate2);
  }
  return String.fromCharCode(c);
}

var NAMED_ENTITY_RE = /&([a-z#][a-z0-9]{1,31});/gi;
var DIGITAL_ENTITY_TEST_RE = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i;
var entities = __webpack_require__(24);

function replaceEntityPattern(match, name) {
  var code = 0;

  if (has(entities, name)) {
    return entities[name];
  } else if (name.charCodeAt(0) === 0x23 /* # */ && DIGITAL_ENTITY_TEST_RE.test(name)) {
    code = name[1].toLowerCase() === 'x' ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
    if (isValidEntityCode(code)) {
      return fromCodePoint(code);
    }
  }
  return match;
}

function replaceEntities(str) {
  if (str.indexOf('&') < 0) {
    return str;
  }

  return str.replace(NAMED_ENTITY_RE, replaceEntityPattern);
}

////////////////////////////////////////////////////////////////////////////////

var HTML_ESCAPE_TEST_RE = /[&<>"]/;
var HTML_ESCAPE_REPLACE_RE = /[&<>"]/g;
var HTML_REPLACEMENTS = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;'
};

function replaceUnsafeChar(ch) {
  return HTML_REPLACEMENTS[ch];
}

function escapeHtml(str) {
  if (HTML_ESCAPE_TEST_RE.test(str)) {
    return str.replace(HTML_ESCAPE_REPLACE_RE, replaceUnsafeChar);
  }
  return str;
}

////////////////////////////////////////////////////////////////////////////////

exports.assign = assign;
exports.isString = isString;
exports.has = has;
exports.unescapeMd = unescapeMd;
exports.isValidEntityCode = isValidEntityCode;
exports.fromCodePoint = fromCodePoint;
exports.replaceEntities = replaceEntities;
exports.escapeHtml = escapeHtml;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol.for && Symbol.for('react.element') || 0xeac7;

  var isValidElement = function isValidElement(object) {
    return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(98)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(99)();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _remarkable = __webpack_require__(46);

var _remarkable2 = _interopRequireDefault(_remarkable);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

var MarkdownRenderer = function MarkdownRenderer(_ref) {
  var markdown = _ref.markdown,
      _ref$options = _ref.options;
  _ref$options = _ref$options === undefined ? {} : _ref$options;

  var preset = _ref$options.preset,
      options = _objectWithoutProperties(_ref$options, ['preset']),
      props = _objectWithoutProperties(_ref, ['markdown', 'options']);

  var remarkable = new _remarkable2.default(preset || 'default', options);
  var html = remarkable.render(markdown);

  return _react2.default.createElement('div', _extends({}, props, { dangerouslySetInnerHTML: { __html: html } }));
};

MarkdownRenderer.propTypes = {
  markdown: __webpack_require__(2).string.isRequired,
  options: __webpack_require__(2).shape({
    preset: __webpack_require__(2).oneOf(['default', 'commonmark', 'full']),
    html: __webpack_require__(2).bool,
    xhtmlOut: __webpack_require__(2).bool,
    breaks: __webpack_require__(2).bool,
    langPrefix: __webpack_require__(2).string,
    linkify: __webpack_require__(2).bool,
    typographer: __webpack_require__(2).bool,
    quotes: __webpack_require__(2).string,
    highlight: __webpack_require__(2).func
  })
};
exports.default = MarkdownRenderer;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var DevSection = function (_React$Component) {
  _inherits(DevSection, _React$Component);

  function DevSection(props) {
    _classCallCheck(this, DevSection);

    return _possibleConstructorReturn(this, (DevSection.__proto__ || Object.getPrototypeOf(DevSection)).call(this, props));
  }

  _createClass(DevSection, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "dev-section " + this.props.className },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "dev-section__label-wrapper" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "dev-section__label-text" },
            this.props.label
          )
        ),
        this.props.children
      );
    }
  }]);

  return DevSection;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["a"] = (DevSection);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Ruler is a helper class for building responsibility chains from
 * parse rules. It allows:
 *
 *   - easy stack rules chains
 *   - getting main chain and named chains content (as arrays of functions)
 *
 * Helper methods, should not be used directly.
 * @api private
 */

function Ruler() {
  // List of added rules. Each element is:
  //
  // { name: XXX,
  //   enabled: Boolean,
  //   fn: Function(),
  //   alt: [ name2, name3 ] }
  //
  this.__rules__ = [];

  // Cached rule chains.
  //
  // First level - chain name, '' for default.
  // Second level - digital anchor for fast filtering by charcodes.
  //
  this.__cache__ = null;
}

/**
 * Find the index of a rule by `name`.
 *
 * @param  {String} `name`
 * @return {Number} Index of the given `name`
 * @api private
 */

Ruler.prototype.__find__ = function (name) {
  var len = this.__rules__.length;
  var i = -1;

  while (len--) {
    if (this.__rules__[++i].name === name) {
      return i;
    }
  }
  return -1;
};

/**
 * Build the rules lookup cache
 *
 * @api private
 */

Ruler.prototype.__compile__ = function () {
  var self = this;
  var chains = [''];

  // collect unique names
  self.__rules__.forEach(function (rule) {
    if (!rule.enabled) {
      return;
    }

    rule.alt.forEach(function (altName) {
      if (chains.indexOf(altName) < 0) {
        chains.push(altName);
      }
    });
  });

  self.__cache__ = {};

  chains.forEach(function (chain) {
    self.__cache__[chain] = [];
    self.__rules__.forEach(function (rule) {
      if (!rule.enabled) {
        return;
      }

      if (chain && rule.alt.indexOf(chain) < 0) {
        return;
      }
      self.__cache__[chain].push(rule.fn);
    });
  });
};

/**
 * Ruler public methods
 * ------------------------------------------------
 */

/**
 * Replace rule function
 *
 * @param  {String} `name` Rule name
 * @param  {Function `fn`
 * @param  {Object} `options`
 * @api private
 */

Ruler.prototype.at = function (name, fn, options) {
  var idx = this.__find__(name);
  var opt = options || {};

  if (idx === -1) {
    throw new Error('Parser rule not found: ' + name);
  }

  this.__rules__[idx].fn = fn;
  this.__rules__[idx].alt = opt.alt || [];
  this.__cache__ = null;
};

/**
 * Add a rule to the chain before given the `ruleName`.
 *
 * @param  {String}   `beforeName`
 * @param  {String}   `ruleName`
 * @param  {Function} `fn`
 * @param  {Object}   `options`
 * @api private
 */

Ruler.prototype.before = function (beforeName, ruleName, fn, options) {
  var idx = this.__find__(beforeName);
  var opt = options || {};

  if (idx === -1) {
    throw new Error('Parser rule not found: ' + beforeName);
  }

  this.__rules__.splice(idx, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Add a rule to the chain after the given `ruleName`.
 *
 * @param  {String}   `afterName`
 * @param  {String}   `ruleName`
 * @param  {Function} `fn`
 * @param  {Object}   `options`
 * @api private
 */

Ruler.prototype.after = function (afterName, ruleName, fn, options) {
  var idx = this.__find__(afterName);
  var opt = options || {};

  if (idx === -1) {
    throw new Error('Parser rule not found: ' + afterName);
  }

  this.__rules__.splice(idx + 1, 0, {
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Add a rule to the end of chain.
 *
 * @param  {String}   `ruleName`
 * @param  {Function} `fn`
 * @param  {Object}   `options`
 * @return {String}
 */

Ruler.prototype.push = function (ruleName, fn, options) {
  var opt = options || {};

  this.__rules__.push({
    name: ruleName,
    enabled: true,
    fn: fn,
    alt: opt.alt || []
  });

  this.__cache__ = null;
};

/**
 * Enable a rule or list of rules.
 *
 * @param  {String|Array} `list` Name or array of rule names to enable
 * @param  {Boolean} `strict` If `true`, all non listed rules will be disabled.
 * @api private
 */

Ruler.prototype.enable = function (list, strict) {
  list = !Array.isArray(list) ? [list] : list;

  // In strict mode disable all existing rules first
  if (strict) {
    this.__rules__.forEach(function (rule) {
      rule.enabled = false;
    });
  }

  // Search by name and enable
  list.forEach(function (name) {
    var idx = this.__find__(name);
    if (idx < 0) {
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = true;
  }, this);

  this.__cache__ = null;
};

/**
 * Disable a rule or list of rules.
 *
 * @param  {String|Array} `list` Name or array of rule names to disable
 * @api private
 */

Ruler.prototype.disable = function (list) {
  list = !Array.isArray(list) ? [list] : list;

  // Search by name and disable
  list.forEach(function (name) {
    var idx = this.__find__(name);
    if (idx < 0) {
      throw new Error('Rules manager: invalid rule name ' + name);
    }
    this.__rules__[idx].enabled = false;
  }, this);

  this.__cache__ = null;
};

/**
 * Get a rules list as an array of functions.
 *
 * @param  {String} `chainName`
 * @return {Object}
 * @api private
 */

Ruler.prototype.getRules = function (chainName) {
  if (this.__cache__ === null) {
    this.__compile__();
  }
  return this.__cache__[chainName] || [];
};

/**
 * Expose `Ruler`
 */

module.exports = Ruler;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Parse link labels
 *
 * This function assumes that first character (`[`) already matches;
 * returns the end of the label.
 *
 * @param  {Object} state
 * @param  {Number} start
 * @api private
 */

module.exports = function parseLinkLabel(state, start) {
  var level,
      found,
      marker,
      labelEnd = -1,
      max = state.posMax,
      oldPos = state.pos,
      oldFlag = state.isInLabel;

  if (state.isInLabel) {
    return -1;
  }

  if (state.labelUnmatchedScopes) {
    state.labelUnmatchedScopes--;
    return -1;
  }

  state.pos = start + 1;
  state.isInLabel = true;
  level = 1;

  while (state.pos < max) {
    marker = state.src.charCodeAt(state.pos);
    if (marker === 0x5B /* [ */) {
        level++;
      } else if (marker === 0x5D /* ] */) {
        level--;
        if (level === 0) {
          found = true;
          break;
        }
      }

    state.parser.skipToken(state);
  }

  if (found) {
    labelEnd = state.pos;
    state.labelUnmatchedScopes = 0;
  } else {
    state.labelUnmatchedScopes = level - 1;
  }

  // restore old state
  state.pos = oldPos;
  state.isInLabel = oldFlag;

  return labelEnd;
};

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Icon__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iconSvgBank__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "iconSvgBank", function() { return __WEBPACK_IMPORTED_MODULE_1__iconSvgBank__["default"]; });




/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__Icon__["default"]);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iconSvgBank__ = __webpack_require__(12);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Icon = function (_React$Component) {
  _inherits(Icon, _React$Component);

  function Icon(props) {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, props));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var type = this.props.type;
      var icon = __WEBPACK_IMPORTED_MODULE_2__iconSvgBank__["default"][type] ? __WEBPACK_IMPORTED_MODULE_2__iconSvgBank__["default"][type] : __WEBPACK_IMPORTED_MODULE_2__iconSvgBank__["default"]['column'];
      var styles = { overflow: 'hidden' };
      var width = this.props.width;
      var height = this.props.height;

      if (width) {
        styles.width = width;
      } else {
        styles.height = height;
      }

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'icon-wrapper' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'svg',
          {
            viewBox: icon.viewBox,
            style: styles,
            version: '1.1',
            xmlns: 'http://www.w3.org/2000/svg' },
          icon.svg
        )
      );
    }
  }]);

  return Icon;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Icon.defaultProps = { type: 'column' };
Icon.propTypes = {
  width: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  height: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  type: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
};

/* harmony default export */ __webpack_exports__["default"] = (Icon);

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);


var bank = {
  stream: {
    viewBox: '0 0 2048 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M1152,1152v128H512v-128H1152z M1152,384v640H512V384H1152z M1792,1152v128h-512v-128H1792z M1792,896v128h-512V896H1792z M1792,640v128h-512V640H1792z M1792,384v128h-512V384H1792z M256,1344V384H128v960c0,17.3,6.3,32.3,19,45s27.7,19,45,19s32.3-6.3,45-19S256,1361.3,256,1344z M1920,1344V256H384v1088c0,22-3.7,43.3-11,64h1483c17.3,0,32.3-6.3,45-19 S1920,1361.3,1920,1344z M2048,128v1216c0,53.3-18.7,98.7-56,136s-82.7,56-136,56H192c-53.3,0-98.7-18.7-136-56s-56-82.7-56-136V256 h256V128H2048z' })
    )
  },

  orders: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M704 1536q0 52-38 90t-90 38-90-38-38-90 38-90 90-38 90 38 38 90zm896 0q0 52-38 90t-90 38-90-38-38-90 38-90 90-38 90 38 38 90zm128-1088v512q0 24-16.5 42.5t-40.5 21.5l-1044 122q13 60 13 70 0 16-24 64h920q26 0 45 19t19 45-19 45-45 19h-1024q-26 0-45-19t-19-45q0-11 8-31.5t16-36 21.5-40 15.5-29.5l-177-823h-204q-26 0-45-19t-19-45 19-45 45-19h256q16 0 28.5 6.5t19.5 15.5 13 24.5 8 26 5.5 29.5 4.5 26h1201q26 0 45 19t19 45z' })
    )
  },

  watchlist: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M704 320v768q0 26-19 45t-45 19v576q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-512l249-873q7-23 31-23h424zm320 0v704h-256v-704h256zm768 896v512q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-576q-26 0-45-19t-19-45v-768h424q24 0 31 23zm-1056-1184v224h-352v-224q0-14 9-23t23-9h288q14 0 23 9t9 23zm672 0v224h-352v-224q0-14 9-23t23-9h288q14 0 23 9t9 23z' })
    )
  },

  inventory: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M402 707l494 305-342 285-490-319zm986 555v108l-490 293v1l-1-1-1 1v-1l-489-293v-108l147 96 342-284v-2l1 1 1-1v2l343 284zm-834-1144l342 285-494 304-338-270zm836 589l338 271-489 319-343-285zm-151-589l489 319-338 270-494-304z' })
    )
  },

  trends: {
    viewBox: '0 0 2048 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M2048 1536v128h-2048v-1536h128v1408h1920zm-128-1248v435q0 21-19.5 29.5t-35.5-7.5l-121-121-633 633q-10 10-23 10t-23-10l-233-233-416 416-192-192 585-585q10-10 23-10t23 10l233 233 464-464-121-121q-16-16-7.5-35.5t29.5-19.5h435q14 0 23 9t9 23z' })
    )
  },

  profit: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M1362 1185q0 153-99.5 263.5t-258.5 136.5v175q0 14-9 23t-23 9h-135q-13 0-22.5-9.5t-9.5-22.5v-175q-66-9-127.5-31t-101.5-44.5-74-48-46.5-37.5-17.5-18q-17-21-2-41l103-135q7-10 23-12 15-2 24 9l2 2q113 99 243 125 37 8 74 8 81 0 142.5-43t61.5-122q0-28-15-53t-33.5-42-58.5-37.5-66-32-80-32.5q-39-16-61.5-25t-61.5-26.5-62.5-31-56.5-35.5-53.5-42.5-43.5-49-35.5-58-21-66.5-8.5-78q0-138 98-242t255-134v-180q0-13 9.5-22.5t22.5-9.5h135q14 0 23 9t9 23v176q57 6 110.5 23t87 33.5 63.5 37.5 39 29 15 14q17 18 5 38l-81 146q-8 15-23 16-14 3-27-7-3-3-14.5-12t-39-26.5-58.5-32-74.5-26-85.5-11.5q-95 0-155 43t-60 111q0 26 8.5 48t29.5 41.5 39.5 33 56 31 60.5 27 70 27.5q53 20 81 31.5t76 35 75.5 42.5 62 50 53 63.5 31.5 76.5 13 94z' })
    )
  },

  settings: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M480 1408v128h-352v-128h352zm352-128q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h256zm160-384v128h-864v-128h864zm-640-512v128h-224v-128h224zm1312 1024v128h-736v-128h736zm-960-1152q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h256zm640 512q26 0 45 19t19 45v256q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-256q0-26 19-45t45-19h256zm320 128v128h-224v-128h224zm0-512v128h-864v-128h864z' })
    )
  },

  dashboard: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M384 1152q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm192-448q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm428 481l101-382q6-26-7.5-48.5t-38.5-29.5-48 6.5-30 39.5l-101 382q-60 5-107 43.5t-63 98.5q-20 77 20 146t117 89 146-20 89-117q16-60-6-117t-72-91zm660-33q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm-640-640q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm448 192q0-53-37.5-90.5t-90.5-37.5-90.5 37.5-37.5 90.5 37.5 90.5 90.5 37.5 90.5-37.5 37.5-90.5zm320 448q0 261-141 483-19 29-54 29h-1402q-35 0-54-29-141-221-141-483 0-182 71-348t191-286 286-191 348-71 348 71 286 191 191 286 71 348z' })
    )
  },

  user: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M896 0q182 0 348 71t286 191 191 286 71 348q0 181-70.5 347t-190.5 286-286 191.5-349 71.5-349-71-285.5-191.5-190.5-286-71-347.5 71-348 191-286 286-191 348-71zm619 1351q149-205 149-455 0-156-61-298t-164-245-245-164-298-61-298 61-245 164-164 245-61 298q0 250 149 455 66-327 306-327 131 128 313 128t313-128q240 0 306 327zm-235-647q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5z' })
    )
  },

  trash: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M704 736v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm256 0v576q0 14-9 23t-23 9h-64q-14 0-23-9t-9-23v-576q0-14 9-23t23-9h64q14 0 23 9t9 23zm128 724v-948h-896v948q0 22 7 40.5t14.5 27 10.5 8.5h832q3 0 10.5-8.5t14.5-27 7-40.5zm-672-1076h448l-48-117q-7-9-17-11h-317q-10 2-17 11zm928 32v64q0 14-9 23t-23 9h-96v948q0 83-47 143.5t-113 60.5h-832q-66 0-113-58.5t-47-141.5v-952h-96q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h309l70-167q15-37 54-63t79-26h320q40 0 79 26t54 63l70 167h309q14 0 23 9t9 23z' })
    )
  },

  submit: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z' })
    )
  },

  ellipsis: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M576 736v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z' })
    )
  },

  download: {
    viewBox: '0 0 2048 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M1344 928q0-14-9-23t-23-9h-224v-352q0-13-9.5-22.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 22.5v352h-224q-13 0-22.5 9.5t-9.5 22.5q0 14 9 23l352 352q9 9 23 9t23-9l351-351q10-12 10-24zm640 224q0 159-112.5 271.5t-271.5 112.5h-1088q-185 0-316.5-131.5t-131.5-316.5q0-130 70-240t188-165q-2-30-2-43 0-212 150-362t362-150q156 0 285.5 87t188.5 231q71-62 166-62 106 0 181 75t75 181q0 76-41 138 130 31 213.5 135.5t83.5 238.5z' })
    )
  },

  growth: {
    viewBox: '0 0 1792 1792',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M522 883q-74-162-74-371h-256v96q0 78 94.5 162t235.5 113zm1078-275v-96h-256q0 209-74 371 141-29 235.5-113t94.5-162zm128-128v128q0 71-41.5 143t-112 130-173 97.5-215.5 44.5q-42 54-95 95-38 34-52.5 72.5t-14.5 89.5q0 54 30.5 91t97.5 37q75 0 133.5 45.5t58.5 114.5v64q0 14-9 23t-23 9h-832q-14 0-23-9t-9-23v-64q0-69 58.5-114.5t133.5-45.5q67 0 97.5-37t30.5-91q0-51-14.5-89.5t-52.5-72.5q-53-41-95-95-113-5-215.5-44.5t-173-97.5-112-130-41.5-143v-128q0-40 28-68t68-28h288v-96q0-66 47-113t113-47h576q66 0 113 47t47 113v96h288q40 0 68 28t28 68z' })
    )
  },

  loading: {
    viewBox: '0 0 40 40',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { opacity: '0.2', d: 'M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z' }),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'path',
        { d: 'M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('animateTransform', { attributeType: 'xml',
          attributeName: 'transform',
          type: 'rotate',
          from: '0 20 20',
          to: '360 20 20',
          dur: '0.5s',
          repeatCount: 'indefinite' })
      )
    )
  },
  image: {
    viewBox: '0 0 1024 896',
    svg: __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'g',
      null,
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('path', { d: 'M1024,576V896H0V704L192,512,320,640,704,256ZM192,384q-80,0-136-56T0,192Q0,112,56,56T192,0q80,0,136,56t56,136q0,80-56,136T192,384Z' })
    )
  }
};

/* harmony default export */ __webpack_exports__["default"] = (bank);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(6);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Inline parser state



function StateInline(src, parserInline, options, env, outTokens) {
  this.src = src;
  this.env = env;
  this.options = options;
  this.parser = parserInline;
  this.tokens = outTokens;
  this.pos = 0;
  this.posMax = this.src.length;
  this.level = 0;
  this.pending = '';
  this.pendingLevel = 0;

  this.cache = []; // Stores { start: end } pairs. Useful for backtrack
  // optimization of pairs parse (emphasis, strikes).

  // Link parser state vars

  this.isInLabel = false; // Set true when seek link label - we should disable
  // "paired" rules (emphasis, strikes) to not skip
  // tailing `]`

  this.linkLevel = 0; // Increment for each nesting link. Used to prevent
  // nesting in definitions

  this.linkContent = ''; // Temporary storage for link url

  this.labelUnmatchedScopes = 0; // Track unpaired `[` for link labels
  // (backtrack optimization)
}

// Flush pending text
//
StateInline.prototype.pushPending = function () {
  this.tokens.push({
    type: 'text',
    content: this.pending,
    level: this.pendingLevel
  });
  this.pending = '';
};

// Push new token to "stream".
// If pending text exists - flush it as text token
//
StateInline.prototype.push = function (token) {
  if (this.pending) {
    this.pushPending();
  }

  this.tokens.push(token);
  this.pendingLevel = this.level;
};

// Store value to cache.
// !!! Implementation has parser-specific optimizations
// !!! keys MUST be integer, >= 0; values MUST be integer, > 0
//
StateInline.prototype.cacheSet = function (key, val) {
  for (var i = this.cache.length; i <= key; i++) {
    this.cache.push(0);
  }

  this.cache[key] = val;
};

// Get cache value
//
StateInline.prototype.cacheGet = function (key) {
  return key < this.cache.length ? this.cache[key] : 0;
};

module.exports = StateInline;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icons__ = __webpack_require__(10);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props) {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));
  }

  _createClass(Button, [{
    key: 'getDefaultButton',
    value: function getDefaultButton(label, onClick) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'button default-button', onClick: onClick },
        label,
        '?'
      );
    }
  }, {
    key: 'getIconButton',
    value: function getIconButton(icon, onClick) {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          className: 'button icon-button',
          onClick: onClick },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__icons__["default"], { type: icon })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          onClick = _props.onClick,
          type = _props.type,
          icon = _props.icon;

      var button = this.getDefaultButton(label, onClick);

      if (type === 'icon') {
        button = this.getIconButton(icon, onClick);
      }

      return button;
    }
  }]);

  return Button;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Button.defaultProps = {
  label: 'Click me!',
  onClick: function onClick() {},
  type: 'default',
  icon: 'submit'
};

/* harmony default export */ __webpack_exports__["default"] = (Button);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prop_types__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var Input = function (_React$Component) {
  _inherits(Input, _React$Component);

  function Input(props) {
    _classCallCheck(this, Input);

    var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

    _this.state = {
      active: false
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    _this.selectValue = _this.selectValue.bind(_this);
    return _this;
  }

  _createClass(Input, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autofocus) {
        this.onFocus();
      }
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          DOMEvent = _ref.DOMEvent,
          activeStatus = _ref.activeStatus;

      var value = DOMEvent.target.value;
      var name = this.props.name;
      var output = {
        DOMEvent: DOMEvent,
        value: value,
        active: activeStatus,
        name: name
      };

      return output;
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var output = this.getOutput({
        DOMEvent: e,
        activeStatus: true
      });

      this.props.onChange(output);
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      this.input.focus();
      this.setState({ active: true });
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      var output = this.getOutput({
        DOMEvent: e,
        activityStatus: true
      });
      this.props.onKeyUp(output);
    }
  }, {
    key: 'onBlur',
    value: function onBlur(e) {
      var output = this.getOutput({
        DOMEvent: e,
        activeStatus: false
      });

      this.props.onChange(output);
      this.setState({ active: false });
    }
  }, {
    key: 'selectValue',
    value: function selectValue() {
      var input = this.input;
      input.setSelectionRange(0, input.value.length);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var suffix = this.props.suffix;
      var scopeClass = this.props.scopeClass;
      var placeholder = this.props.placeholder;
      var classNames = __WEBPACK_IMPORTED_MODULE_1_classnames___default()('input', { 'active': this.state.active });

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: classNames, onDoubleClick: this.selectValue, onClick: this.onFocus },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'input__input-carriage' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
            className: 'input__input',
            ref: function ref(input) {
              _this2.input = input;
            },
            value: this.props.value,
            onChange: this.onChange,
            onBlur: this.onBlur,
            onKeyUp: this.onKeyUp,
            placeholder: placeholder
          }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'span',
            { className: 'input__suffix' },
            suffix
          )
        )
      );
    }
  }]);

  return Input;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

;

Input.defaultProps = {
  onChange: function onChange(val) {
    return val;
  },
  onKeyUp: function onKeyUp() {
    return true;
  },
  outputTest: function outputTest() {
    return true;
  },
  onBlur: function onBlur() {
    return true;
  }
};

Input.defaultProps = {
  onChange: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onKeyUp: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func,
  onBlur: __WEBPACK_IMPORTED_MODULE_2_prop_types___default.a.func
};

/* harmony default export */ __webpack_exports__["default"] = (Input);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icons__ = __webpack_require__(10);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var ImagePlaceholder = function (_React$Component) {
  _inherits(ImagePlaceholder, _React$Component);

  function ImagePlaceholder(props) {
    _classCallCheck(this, ImagePlaceholder);

    return _possibleConstructorReturn(this, (ImagePlaceholder.__proto__ || Object.getPrototypeOf(ImagePlaceholder)).call(this, props));
  }

  _createClass(ImagePlaceholder, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'image-placeholder' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__icons__["default"], { type: 'image' }),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'image-placeholder__label' },
          'Image Not Available'
        )
      );
    }
  }]);

  return ImagePlaceholder;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ImagePlaceholder);

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "devComponents", function() { return devComponents; });
var prodComponents = {};
var devComponentsTmp = {};

// if you don't know what these lines are about are check
// this out https://webpack.js.org/guides/dependency-management/
var prodModules = __webpack_require__(43);
var devModules = __webpack_require__(118);

prodModules.keys().forEach(function (key) {
  var name = key.split('/').slice(-1)[0].replace('.js', '');
  if (!prodComponents[name] && name !== 'index') {
    prodComponents[name] = prodModules(key).default;
  }
});

devModules.keys().forEach(function (key) {
  var name = key.split('/').slice(-1)[0].replace('.js', '').replace('.dev', 'Dev');
  if (!devComponentsTmp[name] && name !== 'index') {
    devComponentsTmp[name] = devModules(key).default;
  }
});

var devComponents = devComponentsTmp;
/* harmony default export */ __webpack_exports__["default"] = (prodComponents);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_markdown_renderer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__LoadingIndicator__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guide_md__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__guide_md__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var LoadingIndicatorDev = function (_React$Component) {
  _inherits(LoadingIndicatorDev, _React$Component);

  function LoadingIndicatorDev(props) {
    _classCallCheck(this, LoadingIndicatorDev);

    return _possibleConstructorReturn(this, (LoadingIndicatorDev.__proto__ || Object.getPrototypeOf(LoadingIndicatorDev)).call(this, props));
  }

  _createClass(LoadingIndicatorDev, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Loading Indicator' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__LoadingIndicator__["default"], null)
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_4__guide_md___default.a })
        )
      );
    }
  }]);

  return LoadingIndicatorDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (LoadingIndicatorDev);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyObject = {};

if (process.env.NODE_ENV !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(7);
  var warning = __webpack_require__(14);
  var ReactPropTypesSecret = __webpack_require__(15);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, _typeof(typeSpecs[typeSpecName]));
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error === 'undefined' ? 'undefined' : _typeof(error));
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// List of valid entities
//
// Generate with ./support/entities.js script
//


/*eslint quotes:0*/

module.exports = {
  "Aacute": "\xC1",
  "aacute": "\xE1",
  "Abreve": "\u0102",
  "abreve": "\u0103",
  "ac": "\u223E",
  "acd": "\u223F",
  "acE": "\u223E\u0333",
  "Acirc": "\xC2",
  "acirc": "\xE2",
  "acute": "\xB4",
  "Acy": "\u0410",
  "acy": "\u0430",
  "AElig": "\xC6",
  "aelig": "\xE6",
  "af": "\u2061",
  "Afr": "\uD835\uDD04",
  "afr": "\uD835\uDD1E",
  "Agrave": "\xC0",
  "agrave": "\xE0",
  "alefsym": "\u2135",
  "aleph": "\u2135",
  "Alpha": "\u0391",
  "alpha": "\u03B1",
  "Amacr": "\u0100",
  "amacr": "\u0101",
  "amalg": "\u2A3F",
  "AMP": "&",
  "amp": "&",
  "And": "\u2A53",
  "and": "\u2227",
  "andand": "\u2A55",
  "andd": "\u2A5C",
  "andslope": "\u2A58",
  "andv": "\u2A5A",
  "ang": "\u2220",
  "ange": "\u29A4",
  "angle": "\u2220",
  "angmsd": "\u2221",
  "angmsdaa": "\u29A8",
  "angmsdab": "\u29A9",
  "angmsdac": "\u29AA",
  "angmsdad": "\u29AB",
  "angmsdae": "\u29AC",
  "angmsdaf": "\u29AD",
  "angmsdag": "\u29AE",
  "angmsdah": "\u29AF",
  "angrt": "\u221F",
  "angrtvb": "\u22BE",
  "angrtvbd": "\u299D",
  "angsph": "\u2222",
  "angst": "\xC5",
  "angzarr": "\u237C",
  "Aogon": "\u0104",
  "aogon": "\u0105",
  "Aopf": "\uD835\uDD38",
  "aopf": "\uD835\uDD52",
  "ap": "\u2248",
  "apacir": "\u2A6F",
  "apE": "\u2A70",
  "ape": "\u224A",
  "apid": "\u224B",
  "apos": "'",
  "ApplyFunction": "\u2061",
  "approx": "\u2248",
  "approxeq": "\u224A",
  "Aring": "\xC5",
  "aring": "\xE5",
  "Ascr": "\uD835\uDC9C",
  "ascr": "\uD835\uDCB6",
  "Assign": "\u2254",
  "ast": "*",
  "asymp": "\u2248",
  "asympeq": "\u224D",
  "Atilde": "\xC3",
  "atilde": "\xE3",
  "Auml": "\xC4",
  "auml": "\xE4",
  "awconint": "\u2233",
  "awint": "\u2A11",
  "backcong": "\u224C",
  "backepsilon": "\u03F6",
  "backprime": "\u2035",
  "backsim": "\u223D",
  "backsimeq": "\u22CD",
  "Backslash": "\u2216",
  "Barv": "\u2AE7",
  "barvee": "\u22BD",
  "Barwed": "\u2306",
  "barwed": "\u2305",
  "barwedge": "\u2305",
  "bbrk": "\u23B5",
  "bbrktbrk": "\u23B6",
  "bcong": "\u224C",
  "Bcy": "\u0411",
  "bcy": "\u0431",
  "bdquo": "\u201E",
  "becaus": "\u2235",
  "Because": "\u2235",
  "because": "\u2235",
  "bemptyv": "\u29B0",
  "bepsi": "\u03F6",
  "bernou": "\u212C",
  "Bernoullis": "\u212C",
  "Beta": "\u0392",
  "beta": "\u03B2",
  "beth": "\u2136",
  "between": "\u226C",
  "Bfr": "\uD835\uDD05",
  "bfr": "\uD835\uDD1F",
  "bigcap": "\u22C2",
  "bigcirc": "\u25EF",
  "bigcup": "\u22C3",
  "bigodot": "\u2A00",
  "bigoplus": "\u2A01",
  "bigotimes": "\u2A02",
  "bigsqcup": "\u2A06",
  "bigstar": "\u2605",
  "bigtriangledown": "\u25BD",
  "bigtriangleup": "\u25B3",
  "biguplus": "\u2A04",
  "bigvee": "\u22C1",
  "bigwedge": "\u22C0",
  "bkarow": "\u290D",
  "blacklozenge": "\u29EB",
  "blacksquare": "\u25AA",
  "blacktriangle": "\u25B4",
  "blacktriangledown": "\u25BE",
  "blacktriangleleft": "\u25C2",
  "blacktriangleright": "\u25B8",
  "blank": "\u2423",
  "blk12": "\u2592",
  "blk14": "\u2591",
  "blk34": "\u2593",
  "block": "\u2588",
  "bne": "=\u20E5",
  "bnequiv": "\u2261\u20E5",
  "bNot": "\u2AED",
  "bnot": "\u2310",
  "Bopf": "\uD835\uDD39",
  "bopf": "\uD835\uDD53",
  "bot": "\u22A5",
  "bottom": "\u22A5",
  "bowtie": "\u22C8",
  "boxbox": "\u29C9",
  "boxDL": "\u2557",
  "boxDl": "\u2556",
  "boxdL": "\u2555",
  "boxdl": "\u2510",
  "boxDR": "\u2554",
  "boxDr": "\u2553",
  "boxdR": "\u2552",
  "boxdr": "\u250C",
  "boxH": "\u2550",
  "boxh": "\u2500",
  "boxHD": "\u2566",
  "boxHd": "\u2564",
  "boxhD": "\u2565",
  "boxhd": "\u252C",
  "boxHU": "\u2569",
  "boxHu": "\u2567",
  "boxhU": "\u2568",
  "boxhu": "\u2534",
  "boxminus": "\u229F",
  "boxplus": "\u229E",
  "boxtimes": "\u22A0",
  "boxUL": "\u255D",
  "boxUl": "\u255C",
  "boxuL": "\u255B",
  "boxul": "\u2518",
  "boxUR": "\u255A",
  "boxUr": "\u2559",
  "boxuR": "\u2558",
  "boxur": "\u2514",
  "boxV": "\u2551",
  "boxv": "\u2502",
  "boxVH": "\u256C",
  "boxVh": "\u256B",
  "boxvH": "\u256A",
  "boxvh": "\u253C",
  "boxVL": "\u2563",
  "boxVl": "\u2562",
  "boxvL": "\u2561",
  "boxvl": "\u2524",
  "boxVR": "\u2560",
  "boxVr": "\u255F",
  "boxvR": "\u255E",
  "boxvr": "\u251C",
  "bprime": "\u2035",
  "Breve": "\u02D8",
  "breve": "\u02D8",
  "brvbar": "\xA6",
  "Bscr": "\u212C",
  "bscr": "\uD835\uDCB7",
  "bsemi": "\u204F",
  "bsim": "\u223D",
  "bsime": "\u22CD",
  "bsol": "\\",
  "bsolb": "\u29C5",
  "bsolhsub": "\u27C8",
  "bull": "\u2022",
  "bullet": "\u2022",
  "bump": "\u224E",
  "bumpE": "\u2AAE",
  "bumpe": "\u224F",
  "Bumpeq": "\u224E",
  "bumpeq": "\u224F",
  "Cacute": "\u0106",
  "cacute": "\u0107",
  "Cap": "\u22D2",
  "cap": "\u2229",
  "capand": "\u2A44",
  "capbrcup": "\u2A49",
  "capcap": "\u2A4B",
  "capcup": "\u2A47",
  "capdot": "\u2A40",
  "CapitalDifferentialD": "\u2145",
  "caps": "\u2229\uFE00",
  "caret": "\u2041",
  "caron": "\u02C7",
  "Cayleys": "\u212D",
  "ccaps": "\u2A4D",
  "Ccaron": "\u010C",
  "ccaron": "\u010D",
  "Ccedil": "\xC7",
  "ccedil": "\xE7",
  "Ccirc": "\u0108",
  "ccirc": "\u0109",
  "Cconint": "\u2230",
  "ccups": "\u2A4C",
  "ccupssm": "\u2A50",
  "Cdot": "\u010A",
  "cdot": "\u010B",
  "cedil": "\xB8",
  "Cedilla": "\xB8",
  "cemptyv": "\u29B2",
  "cent": "\xA2",
  "CenterDot": "\xB7",
  "centerdot": "\xB7",
  "Cfr": "\u212D",
  "cfr": "\uD835\uDD20",
  "CHcy": "\u0427",
  "chcy": "\u0447",
  "check": "\u2713",
  "checkmark": "\u2713",
  "Chi": "\u03A7",
  "chi": "\u03C7",
  "cir": "\u25CB",
  "circ": "\u02C6",
  "circeq": "\u2257",
  "circlearrowleft": "\u21BA",
  "circlearrowright": "\u21BB",
  "circledast": "\u229B",
  "circledcirc": "\u229A",
  "circleddash": "\u229D",
  "CircleDot": "\u2299",
  "circledR": "\xAE",
  "circledS": "\u24C8",
  "CircleMinus": "\u2296",
  "CirclePlus": "\u2295",
  "CircleTimes": "\u2297",
  "cirE": "\u29C3",
  "cire": "\u2257",
  "cirfnint": "\u2A10",
  "cirmid": "\u2AEF",
  "cirscir": "\u29C2",
  "ClockwiseContourIntegral": "\u2232",
  "CloseCurlyDoubleQuote": "\u201D",
  "CloseCurlyQuote": "\u2019",
  "clubs": "\u2663",
  "clubsuit": "\u2663",
  "Colon": "\u2237",
  "colon": ":",
  "Colone": "\u2A74",
  "colone": "\u2254",
  "coloneq": "\u2254",
  "comma": ",",
  "commat": "@",
  "comp": "\u2201",
  "compfn": "\u2218",
  "complement": "\u2201",
  "complexes": "\u2102",
  "cong": "\u2245",
  "congdot": "\u2A6D",
  "Congruent": "\u2261",
  "Conint": "\u222F",
  "conint": "\u222E",
  "ContourIntegral": "\u222E",
  "Copf": "\u2102",
  "copf": "\uD835\uDD54",
  "coprod": "\u2210",
  "Coproduct": "\u2210",
  "COPY": "\xA9",
  "copy": "\xA9",
  "copysr": "\u2117",
  "CounterClockwiseContourIntegral": "\u2233",
  "crarr": "\u21B5",
  "Cross": "\u2A2F",
  "cross": "\u2717",
  "Cscr": "\uD835\uDC9E",
  "cscr": "\uD835\uDCB8",
  "csub": "\u2ACF",
  "csube": "\u2AD1",
  "csup": "\u2AD0",
  "csupe": "\u2AD2",
  "ctdot": "\u22EF",
  "cudarrl": "\u2938",
  "cudarrr": "\u2935",
  "cuepr": "\u22DE",
  "cuesc": "\u22DF",
  "cularr": "\u21B6",
  "cularrp": "\u293D",
  "Cup": "\u22D3",
  "cup": "\u222A",
  "cupbrcap": "\u2A48",
  "CupCap": "\u224D",
  "cupcap": "\u2A46",
  "cupcup": "\u2A4A",
  "cupdot": "\u228D",
  "cupor": "\u2A45",
  "cups": "\u222A\uFE00",
  "curarr": "\u21B7",
  "curarrm": "\u293C",
  "curlyeqprec": "\u22DE",
  "curlyeqsucc": "\u22DF",
  "curlyvee": "\u22CE",
  "curlywedge": "\u22CF",
  "curren": "\xA4",
  "curvearrowleft": "\u21B6",
  "curvearrowright": "\u21B7",
  "cuvee": "\u22CE",
  "cuwed": "\u22CF",
  "cwconint": "\u2232",
  "cwint": "\u2231",
  "cylcty": "\u232D",
  "Dagger": "\u2021",
  "dagger": "\u2020",
  "daleth": "\u2138",
  "Darr": "\u21A1",
  "dArr": "\u21D3",
  "darr": "\u2193",
  "dash": "\u2010",
  "Dashv": "\u2AE4",
  "dashv": "\u22A3",
  "dbkarow": "\u290F",
  "dblac": "\u02DD",
  "Dcaron": "\u010E",
  "dcaron": "\u010F",
  "Dcy": "\u0414",
  "dcy": "\u0434",
  "DD": "\u2145",
  "dd": "\u2146",
  "ddagger": "\u2021",
  "ddarr": "\u21CA",
  "DDotrahd": "\u2911",
  "ddotseq": "\u2A77",
  "deg": "\xB0",
  "Del": "\u2207",
  "Delta": "\u0394",
  "delta": "\u03B4",
  "demptyv": "\u29B1",
  "dfisht": "\u297F",
  "Dfr": "\uD835\uDD07",
  "dfr": "\uD835\uDD21",
  "dHar": "\u2965",
  "dharl": "\u21C3",
  "dharr": "\u21C2",
  "DiacriticalAcute": "\xB4",
  "DiacriticalDot": "\u02D9",
  "DiacriticalDoubleAcute": "\u02DD",
  "DiacriticalGrave": "`",
  "DiacriticalTilde": "\u02DC",
  "diam": "\u22C4",
  "Diamond": "\u22C4",
  "diamond": "\u22C4",
  "diamondsuit": "\u2666",
  "diams": "\u2666",
  "die": "\xA8",
  "DifferentialD": "\u2146",
  "digamma": "\u03DD",
  "disin": "\u22F2",
  "div": "\xF7",
  "divide": "\xF7",
  "divideontimes": "\u22C7",
  "divonx": "\u22C7",
  "DJcy": "\u0402",
  "djcy": "\u0452",
  "dlcorn": "\u231E",
  "dlcrop": "\u230D",
  "dollar": "$",
  "Dopf": "\uD835\uDD3B",
  "dopf": "\uD835\uDD55",
  "Dot": "\xA8",
  "dot": "\u02D9",
  "DotDot": "\u20DC",
  "doteq": "\u2250",
  "doteqdot": "\u2251",
  "DotEqual": "\u2250",
  "dotminus": "\u2238",
  "dotplus": "\u2214",
  "dotsquare": "\u22A1",
  "doublebarwedge": "\u2306",
  "DoubleContourIntegral": "\u222F",
  "DoubleDot": "\xA8",
  "DoubleDownArrow": "\u21D3",
  "DoubleLeftArrow": "\u21D0",
  "DoubleLeftRightArrow": "\u21D4",
  "DoubleLeftTee": "\u2AE4",
  "DoubleLongLeftArrow": "\u27F8",
  "DoubleLongLeftRightArrow": "\u27FA",
  "DoubleLongRightArrow": "\u27F9",
  "DoubleRightArrow": "\u21D2",
  "DoubleRightTee": "\u22A8",
  "DoubleUpArrow": "\u21D1",
  "DoubleUpDownArrow": "\u21D5",
  "DoubleVerticalBar": "\u2225",
  "DownArrow": "\u2193",
  "Downarrow": "\u21D3",
  "downarrow": "\u2193",
  "DownArrowBar": "\u2913",
  "DownArrowUpArrow": "\u21F5",
  "DownBreve": "\u0311",
  "downdownarrows": "\u21CA",
  "downharpoonleft": "\u21C3",
  "downharpoonright": "\u21C2",
  "DownLeftRightVector": "\u2950",
  "DownLeftTeeVector": "\u295E",
  "DownLeftVector": "\u21BD",
  "DownLeftVectorBar": "\u2956",
  "DownRightTeeVector": "\u295F",
  "DownRightVector": "\u21C1",
  "DownRightVectorBar": "\u2957",
  "DownTee": "\u22A4",
  "DownTeeArrow": "\u21A7",
  "drbkarow": "\u2910",
  "drcorn": "\u231F",
  "drcrop": "\u230C",
  "Dscr": "\uD835\uDC9F",
  "dscr": "\uD835\uDCB9",
  "DScy": "\u0405",
  "dscy": "\u0455",
  "dsol": "\u29F6",
  "Dstrok": "\u0110",
  "dstrok": "\u0111",
  "dtdot": "\u22F1",
  "dtri": "\u25BF",
  "dtrif": "\u25BE",
  "duarr": "\u21F5",
  "duhar": "\u296F",
  "dwangle": "\u29A6",
  "DZcy": "\u040F",
  "dzcy": "\u045F",
  "dzigrarr": "\u27FF",
  "Eacute": "\xC9",
  "eacute": "\xE9",
  "easter": "\u2A6E",
  "Ecaron": "\u011A",
  "ecaron": "\u011B",
  "ecir": "\u2256",
  "Ecirc": "\xCA",
  "ecirc": "\xEA",
  "ecolon": "\u2255",
  "Ecy": "\u042D",
  "ecy": "\u044D",
  "eDDot": "\u2A77",
  "Edot": "\u0116",
  "eDot": "\u2251",
  "edot": "\u0117",
  "ee": "\u2147",
  "efDot": "\u2252",
  "Efr": "\uD835\uDD08",
  "efr": "\uD835\uDD22",
  "eg": "\u2A9A",
  "Egrave": "\xC8",
  "egrave": "\xE8",
  "egs": "\u2A96",
  "egsdot": "\u2A98",
  "el": "\u2A99",
  "Element": "\u2208",
  "elinters": "\u23E7",
  "ell": "\u2113",
  "els": "\u2A95",
  "elsdot": "\u2A97",
  "Emacr": "\u0112",
  "emacr": "\u0113",
  "empty": "\u2205",
  "emptyset": "\u2205",
  "EmptySmallSquare": "\u25FB",
  "emptyv": "\u2205",
  "EmptyVerySmallSquare": "\u25AB",
  "emsp": "\u2003",
  "emsp13": "\u2004",
  "emsp14": "\u2005",
  "ENG": "\u014A",
  "eng": "\u014B",
  "ensp": "\u2002",
  "Eogon": "\u0118",
  "eogon": "\u0119",
  "Eopf": "\uD835\uDD3C",
  "eopf": "\uD835\uDD56",
  "epar": "\u22D5",
  "eparsl": "\u29E3",
  "eplus": "\u2A71",
  "epsi": "\u03B5",
  "Epsilon": "\u0395",
  "epsilon": "\u03B5",
  "epsiv": "\u03F5",
  "eqcirc": "\u2256",
  "eqcolon": "\u2255",
  "eqsim": "\u2242",
  "eqslantgtr": "\u2A96",
  "eqslantless": "\u2A95",
  "Equal": "\u2A75",
  "equals": "=",
  "EqualTilde": "\u2242",
  "equest": "\u225F",
  "Equilibrium": "\u21CC",
  "equiv": "\u2261",
  "equivDD": "\u2A78",
  "eqvparsl": "\u29E5",
  "erarr": "\u2971",
  "erDot": "\u2253",
  "Escr": "\u2130",
  "escr": "\u212F",
  "esdot": "\u2250",
  "Esim": "\u2A73",
  "esim": "\u2242",
  "Eta": "\u0397",
  "eta": "\u03B7",
  "ETH": "\xD0",
  "eth": "\xF0",
  "Euml": "\xCB",
  "euml": "\xEB",
  "euro": "\u20AC",
  "excl": "!",
  "exist": "\u2203",
  "Exists": "\u2203",
  "expectation": "\u2130",
  "ExponentialE": "\u2147",
  "exponentiale": "\u2147",
  "fallingdotseq": "\u2252",
  "Fcy": "\u0424",
  "fcy": "\u0444",
  "female": "\u2640",
  "ffilig": "\uFB03",
  "fflig": "\uFB00",
  "ffllig": "\uFB04",
  "Ffr": "\uD835\uDD09",
  "ffr": "\uD835\uDD23",
  "filig": "\uFB01",
  "FilledSmallSquare": "\u25FC",
  "FilledVerySmallSquare": "\u25AA",
  "fjlig": "fj",
  "flat": "\u266D",
  "fllig": "\uFB02",
  "fltns": "\u25B1",
  "fnof": "\u0192",
  "Fopf": "\uD835\uDD3D",
  "fopf": "\uD835\uDD57",
  "ForAll": "\u2200",
  "forall": "\u2200",
  "fork": "\u22D4",
  "forkv": "\u2AD9",
  "Fouriertrf": "\u2131",
  "fpartint": "\u2A0D",
  "frac12": "\xBD",
  "frac13": "\u2153",
  "frac14": "\xBC",
  "frac15": "\u2155",
  "frac16": "\u2159",
  "frac18": "\u215B",
  "frac23": "\u2154",
  "frac25": "\u2156",
  "frac34": "\xBE",
  "frac35": "\u2157",
  "frac38": "\u215C",
  "frac45": "\u2158",
  "frac56": "\u215A",
  "frac58": "\u215D",
  "frac78": "\u215E",
  "frasl": "\u2044",
  "frown": "\u2322",
  "Fscr": "\u2131",
  "fscr": "\uD835\uDCBB",
  "gacute": "\u01F5",
  "Gamma": "\u0393",
  "gamma": "\u03B3",
  "Gammad": "\u03DC",
  "gammad": "\u03DD",
  "gap": "\u2A86",
  "Gbreve": "\u011E",
  "gbreve": "\u011F",
  "Gcedil": "\u0122",
  "Gcirc": "\u011C",
  "gcirc": "\u011D",
  "Gcy": "\u0413",
  "gcy": "\u0433",
  "Gdot": "\u0120",
  "gdot": "\u0121",
  "gE": "\u2267",
  "ge": "\u2265",
  "gEl": "\u2A8C",
  "gel": "\u22DB",
  "geq": "\u2265",
  "geqq": "\u2267",
  "geqslant": "\u2A7E",
  "ges": "\u2A7E",
  "gescc": "\u2AA9",
  "gesdot": "\u2A80",
  "gesdoto": "\u2A82",
  "gesdotol": "\u2A84",
  "gesl": "\u22DB\uFE00",
  "gesles": "\u2A94",
  "Gfr": "\uD835\uDD0A",
  "gfr": "\uD835\uDD24",
  "Gg": "\u22D9",
  "gg": "\u226B",
  "ggg": "\u22D9",
  "gimel": "\u2137",
  "GJcy": "\u0403",
  "gjcy": "\u0453",
  "gl": "\u2277",
  "gla": "\u2AA5",
  "glE": "\u2A92",
  "glj": "\u2AA4",
  "gnap": "\u2A8A",
  "gnapprox": "\u2A8A",
  "gnE": "\u2269",
  "gne": "\u2A88",
  "gneq": "\u2A88",
  "gneqq": "\u2269",
  "gnsim": "\u22E7",
  "Gopf": "\uD835\uDD3E",
  "gopf": "\uD835\uDD58",
  "grave": "`",
  "GreaterEqual": "\u2265",
  "GreaterEqualLess": "\u22DB",
  "GreaterFullEqual": "\u2267",
  "GreaterGreater": "\u2AA2",
  "GreaterLess": "\u2277",
  "GreaterSlantEqual": "\u2A7E",
  "GreaterTilde": "\u2273",
  "Gscr": "\uD835\uDCA2",
  "gscr": "\u210A",
  "gsim": "\u2273",
  "gsime": "\u2A8E",
  "gsiml": "\u2A90",
  "GT": ">",
  "Gt": "\u226B",
  "gt": ">",
  "gtcc": "\u2AA7",
  "gtcir": "\u2A7A",
  "gtdot": "\u22D7",
  "gtlPar": "\u2995",
  "gtquest": "\u2A7C",
  "gtrapprox": "\u2A86",
  "gtrarr": "\u2978",
  "gtrdot": "\u22D7",
  "gtreqless": "\u22DB",
  "gtreqqless": "\u2A8C",
  "gtrless": "\u2277",
  "gtrsim": "\u2273",
  "gvertneqq": "\u2269\uFE00",
  "gvnE": "\u2269\uFE00",
  "Hacek": "\u02C7",
  "hairsp": "\u200A",
  "half": "\xBD",
  "hamilt": "\u210B",
  "HARDcy": "\u042A",
  "hardcy": "\u044A",
  "hArr": "\u21D4",
  "harr": "\u2194",
  "harrcir": "\u2948",
  "harrw": "\u21AD",
  "Hat": "^",
  "hbar": "\u210F",
  "Hcirc": "\u0124",
  "hcirc": "\u0125",
  "hearts": "\u2665",
  "heartsuit": "\u2665",
  "hellip": "\u2026",
  "hercon": "\u22B9",
  "Hfr": "\u210C",
  "hfr": "\uD835\uDD25",
  "HilbertSpace": "\u210B",
  "hksearow": "\u2925",
  "hkswarow": "\u2926",
  "hoarr": "\u21FF",
  "homtht": "\u223B",
  "hookleftarrow": "\u21A9",
  "hookrightarrow": "\u21AA",
  "Hopf": "\u210D",
  "hopf": "\uD835\uDD59",
  "horbar": "\u2015",
  "HorizontalLine": "\u2500",
  "Hscr": "\u210B",
  "hscr": "\uD835\uDCBD",
  "hslash": "\u210F",
  "Hstrok": "\u0126",
  "hstrok": "\u0127",
  "HumpDownHump": "\u224E",
  "HumpEqual": "\u224F",
  "hybull": "\u2043",
  "hyphen": "\u2010",
  "Iacute": "\xCD",
  "iacute": "\xED",
  "ic": "\u2063",
  "Icirc": "\xCE",
  "icirc": "\xEE",
  "Icy": "\u0418",
  "icy": "\u0438",
  "Idot": "\u0130",
  "IEcy": "\u0415",
  "iecy": "\u0435",
  "iexcl": "\xA1",
  "iff": "\u21D4",
  "Ifr": "\u2111",
  "ifr": "\uD835\uDD26",
  "Igrave": "\xCC",
  "igrave": "\xEC",
  "ii": "\u2148",
  "iiiint": "\u2A0C",
  "iiint": "\u222D",
  "iinfin": "\u29DC",
  "iiota": "\u2129",
  "IJlig": "\u0132",
  "ijlig": "\u0133",
  "Im": "\u2111",
  "Imacr": "\u012A",
  "imacr": "\u012B",
  "image": "\u2111",
  "ImaginaryI": "\u2148",
  "imagline": "\u2110",
  "imagpart": "\u2111",
  "imath": "\u0131",
  "imof": "\u22B7",
  "imped": "\u01B5",
  "Implies": "\u21D2",
  "in": "\u2208",
  "incare": "\u2105",
  "infin": "\u221E",
  "infintie": "\u29DD",
  "inodot": "\u0131",
  "Int": "\u222C",
  "int": "\u222B",
  "intcal": "\u22BA",
  "integers": "\u2124",
  "Integral": "\u222B",
  "intercal": "\u22BA",
  "Intersection": "\u22C2",
  "intlarhk": "\u2A17",
  "intprod": "\u2A3C",
  "InvisibleComma": "\u2063",
  "InvisibleTimes": "\u2062",
  "IOcy": "\u0401",
  "iocy": "\u0451",
  "Iogon": "\u012E",
  "iogon": "\u012F",
  "Iopf": "\uD835\uDD40",
  "iopf": "\uD835\uDD5A",
  "Iota": "\u0399",
  "iota": "\u03B9",
  "iprod": "\u2A3C",
  "iquest": "\xBF",
  "Iscr": "\u2110",
  "iscr": "\uD835\uDCBE",
  "isin": "\u2208",
  "isindot": "\u22F5",
  "isinE": "\u22F9",
  "isins": "\u22F4",
  "isinsv": "\u22F3",
  "isinv": "\u2208",
  "it": "\u2062",
  "Itilde": "\u0128",
  "itilde": "\u0129",
  "Iukcy": "\u0406",
  "iukcy": "\u0456",
  "Iuml": "\xCF",
  "iuml": "\xEF",
  "Jcirc": "\u0134",
  "jcirc": "\u0135",
  "Jcy": "\u0419",
  "jcy": "\u0439",
  "Jfr": "\uD835\uDD0D",
  "jfr": "\uD835\uDD27",
  "jmath": "\u0237",
  "Jopf": "\uD835\uDD41",
  "jopf": "\uD835\uDD5B",
  "Jscr": "\uD835\uDCA5",
  "jscr": "\uD835\uDCBF",
  "Jsercy": "\u0408",
  "jsercy": "\u0458",
  "Jukcy": "\u0404",
  "jukcy": "\u0454",
  "Kappa": "\u039A",
  "kappa": "\u03BA",
  "kappav": "\u03F0",
  "Kcedil": "\u0136",
  "kcedil": "\u0137",
  "Kcy": "\u041A",
  "kcy": "\u043A",
  "Kfr": "\uD835\uDD0E",
  "kfr": "\uD835\uDD28",
  "kgreen": "\u0138",
  "KHcy": "\u0425",
  "khcy": "\u0445",
  "KJcy": "\u040C",
  "kjcy": "\u045C",
  "Kopf": "\uD835\uDD42",
  "kopf": "\uD835\uDD5C",
  "Kscr": "\uD835\uDCA6",
  "kscr": "\uD835\uDCC0",
  "lAarr": "\u21DA",
  "Lacute": "\u0139",
  "lacute": "\u013A",
  "laemptyv": "\u29B4",
  "lagran": "\u2112",
  "Lambda": "\u039B",
  "lambda": "\u03BB",
  "Lang": "\u27EA",
  "lang": "\u27E8",
  "langd": "\u2991",
  "langle": "\u27E8",
  "lap": "\u2A85",
  "Laplacetrf": "\u2112",
  "laquo": "\xAB",
  "Larr": "\u219E",
  "lArr": "\u21D0",
  "larr": "\u2190",
  "larrb": "\u21E4",
  "larrbfs": "\u291F",
  "larrfs": "\u291D",
  "larrhk": "\u21A9",
  "larrlp": "\u21AB",
  "larrpl": "\u2939",
  "larrsim": "\u2973",
  "larrtl": "\u21A2",
  "lat": "\u2AAB",
  "lAtail": "\u291B",
  "latail": "\u2919",
  "late": "\u2AAD",
  "lates": "\u2AAD\uFE00",
  "lBarr": "\u290E",
  "lbarr": "\u290C",
  "lbbrk": "\u2772",
  "lbrace": "{",
  "lbrack": "[",
  "lbrke": "\u298B",
  "lbrksld": "\u298F",
  "lbrkslu": "\u298D",
  "Lcaron": "\u013D",
  "lcaron": "\u013E",
  "Lcedil": "\u013B",
  "lcedil": "\u013C",
  "lceil": "\u2308",
  "lcub": "{",
  "Lcy": "\u041B",
  "lcy": "\u043B",
  "ldca": "\u2936",
  "ldquo": "\u201C",
  "ldquor": "\u201E",
  "ldrdhar": "\u2967",
  "ldrushar": "\u294B",
  "ldsh": "\u21B2",
  "lE": "\u2266",
  "le": "\u2264",
  "LeftAngleBracket": "\u27E8",
  "LeftArrow": "\u2190",
  "Leftarrow": "\u21D0",
  "leftarrow": "\u2190",
  "LeftArrowBar": "\u21E4",
  "LeftArrowRightArrow": "\u21C6",
  "leftarrowtail": "\u21A2",
  "LeftCeiling": "\u2308",
  "LeftDoubleBracket": "\u27E6",
  "LeftDownTeeVector": "\u2961",
  "LeftDownVector": "\u21C3",
  "LeftDownVectorBar": "\u2959",
  "LeftFloor": "\u230A",
  "leftharpoondown": "\u21BD",
  "leftharpoonup": "\u21BC",
  "leftleftarrows": "\u21C7",
  "LeftRightArrow": "\u2194",
  "Leftrightarrow": "\u21D4",
  "leftrightarrow": "\u2194",
  "leftrightarrows": "\u21C6",
  "leftrightharpoons": "\u21CB",
  "leftrightsquigarrow": "\u21AD",
  "LeftRightVector": "\u294E",
  "LeftTee": "\u22A3",
  "LeftTeeArrow": "\u21A4",
  "LeftTeeVector": "\u295A",
  "leftthreetimes": "\u22CB",
  "LeftTriangle": "\u22B2",
  "LeftTriangleBar": "\u29CF",
  "LeftTriangleEqual": "\u22B4",
  "LeftUpDownVector": "\u2951",
  "LeftUpTeeVector": "\u2960",
  "LeftUpVector": "\u21BF",
  "LeftUpVectorBar": "\u2958",
  "LeftVector": "\u21BC",
  "LeftVectorBar": "\u2952",
  "lEg": "\u2A8B",
  "leg": "\u22DA",
  "leq": "\u2264",
  "leqq": "\u2266",
  "leqslant": "\u2A7D",
  "les": "\u2A7D",
  "lescc": "\u2AA8",
  "lesdot": "\u2A7F",
  "lesdoto": "\u2A81",
  "lesdotor": "\u2A83",
  "lesg": "\u22DA\uFE00",
  "lesges": "\u2A93",
  "lessapprox": "\u2A85",
  "lessdot": "\u22D6",
  "lesseqgtr": "\u22DA",
  "lesseqqgtr": "\u2A8B",
  "LessEqualGreater": "\u22DA",
  "LessFullEqual": "\u2266",
  "LessGreater": "\u2276",
  "lessgtr": "\u2276",
  "LessLess": "\u2AA1",
  "lesssim": "\u2272",
  "LessSlantEqual": "\u2A7D",
  "LessTilde": "\u2272",
  "lfisht": "\u297C",
  "lfloor": "\u230A",
  "Lfr": "\uD835\uDD0F",
  "lfr": "\uD835\uDD29",
  "lg": "\u2276",
  "lgE": "\u2A91",
  "lHar": "\u2962",
  "lhard": "\u21BD",
  "lharu": "\u21BC",
  "lharul": "\u296A",
  "lhblk": "\u2584",
  "LJcy": "\u0409",
  "ljcy": "\u0459",
  "Ll": "\u22D8",
  "ll": "\u226A",
  "llarr": "\u21C7",
  "llcorner": "\u231E",
  "Lleftarrow": "\u21DA",
  "llhard": "\u296B",
  "lltri": "\u25FA",
  "Lmidot": "\u013F",
  "lmidot": "\u0140",
  "lmoust": "\u23B0",
  "lmoustache": "\u23B0",
  "lnap": "\u2A89",
  "lnapprox": "\u2A89",
  "lnE": "\u2268",
  "lne": "\u2A87",
  "lneq": "\u2A87",
  "lneqq": "\u2268",
  "lnsim": "\u22E6",
  "loang": "\u27EC",
  "loarr": "\u21FD",
  "lobrk": "\u27E6",
  "LongLeftArrow": "\u27F5",
  "Longleftarrow": "\u27F8",
  "longleftarrow": "\u27F5",
  "LongLeftRightArrow": "\u27F7",
  "Longleftrightarrow": "\u27FA",
  "longleftrightarrow": "\u27F7",
  "longmapsto": "\u27FC",
  "LongRightArrow": "\u27F6",
  "Longrightarrow": "\u27F9",
  "longrightarrow": "\u27F6",
  "looparrowleft": "\u21AB",
  "looparrowright": "\u21AC",
  "lopar": "\u2985",
  "Lopf": "\uD835\uDD43",
  "lopf": "\uD835\uDD5D",
  "loplus": "\u2A2D",
  "lotimes": "\u2A34",
  "lowast": "\u2217",
  "lowbar": "_",
  "LowerLeftArrow": "\u2199",
  "LowerRightArrow": "\u2198",
  "loz": "\u25CA",
  "lozenge": "\u25CA",
  "lozf": "\u29EB",
  "lpar": "(",
  "lparlt": "\u2993",
  "lrarr": "\u21C6",
  "lrcorner": "\u231F",
  "lrhar": "\u21CB",
  "lrhard": "\u296D",
  "lrm": "\u200E",
  "lrtri": "\u22BF",
  "lsaquo": "\u2039",
  "Lscr": "\u2112",
  "lscr": "\uD835\uDCC1",
  "Lsh": "\u21B0",
  "lsh": "\u21B0",
  "lsim": "\u2272",
  "lsime": "\u2A8D",
  "lsimg": "\u2A8F",
  "lsqb": "[",
  "lsquo": "\u2018",
  "lsquor": "\u201A",
  "Lstrok": "\u0141",
  "lstrok": "\u0142",
  "LT": "<",
  "Lt": "\u226A",
  "lt": "<",
  "ltcc": "\u2AA6",
  "ltcir": "\u2A79",
  "ltdot": "\u22D6",
  "lthree": "\u22CB",
  "ltimes": "\u22C9",
  "ltlarr": "\u2976",
  "ltquest": "\u2A7B",
  "ltri": "\u25C3",
  "ltrie": "\u22B4",
  "ltrif": "\u25C2",
  "ltrPar": "\u2996",
  "lurdshar": "\u294A",
  "luruhar": "\u2966",
  "lvertneqq": "\u2268\uFE00",
  "lvnE": "\u2268\uFE00",
  "macr": "\xAF",
  "male": "\u2642",
  "malt": "\u2720",
  "maltese": "\u2720",
  "Map": "\u2905",
  "map": "\u21A6",
  "mapsto": "\u21A6",
  "mapstodown": "\u21A7",
  "mapstoleft": "\u21A4",
  "mapstoup": "\u21A5",
  "marker": "\u25AE",
  "mcomma": "\u2A29",
  "Mcy": "\u041C",
  "mcy": "\u043C",
  "mdash": "\u2014",
  "mDDot": "\u223A",
  "measuredangle": "\u2221",
  "MediumSpace": "\u205F",
  "Mellintrf": "\u2133",
  "Mfr": "\uD835\uDD10",
  "mfr": "\uD835\uDD2A",
  "mho": "\u2127",
  "micro": "\xB5",
  "mid": "\u2223",
  "midast": "*",
  "midcir": "\u2AF0",
  "middot": "\xB7",
  "minus": "\u2212",
  "minusb": "\u229F",
  "minusd": "\u2238",
  "minusdu": "\u2A2A",
  "MinusPlus": "\u2213",
  "mlcp": "\u2ADB",
  "mldr": "\u2026",
  "mnplus": "\u2213",
  "models": "\u22A7",
  "Mopf": "\uD835\uDD44",
  "mopf": "\uD835\uDD5E",
  "mp": "\u2213",
  "Mscr": "\u2133",
  "mscr": "\uD835\uDCC2",
  "mstpos": "\u223E",
  "Mu": "\u039C",
  "mu": "\u03BC",
  "multimap": "\u22B8",
  "mumap": "\u22B8",
  "nabla": "\u2207",
  "Nacute": "\u0143",
  "nacute": "\u0144",
  "nang": "\u2220\u20D2",
  "nap": "\u2249",
  "napE": "\u2A70\u0338",
  "napid": "\u224B\u0338",
  "napos": "\u0149",
  "napprox": "\u2249",
  "natur": "\u266E",
  "natural": "\u266E",
  "naturals": "\u2115",
  "nbsp": "\xA0",
  "nbump": "\u224E\u0338",
  "nbumpe": "\u224F\u0338",
  "ncap": "\u2A43",
  "Ncaron": "\u0147",
  "ncaron": "\u0148",
  "Ncedil": "\u0145",
  "ncedil": "\u0146",
  "ncong": "\u2247",
  "ncongdot": "\u2A6D\u0338",
  "ncup": "\u2A42",
  "Ncy": "\u041D",
  "ncy": "\u043D",
  "ndash": "\u2013",
  "ne": "\u2260",
  "nearhk": "\u2924",
  "neArr": "\u21D7",
  "nearr": "\u2197",
  "nearrow": "\u2197",
  "nedot": "\u2250\u0338",
  "NegativeMediumSpace": "\u200B",
  "NegativeThickSpace": "\u200B",
  "NegativeThinSpace": "\u200B",
  "NegativeVeryThinSpace": "\u200B",
  "nequiv": "\u2262",
  "nesear": "\u2928",
  "nesim": "\u2242\u0338",
  "NestedGreaterGreater": "\u226B",
  "NestedLessLess": "\u226A",
  "NewLine": "\n",
  "nexist": "\u2204",
  "nexists": "\u2204",
  "Nfr": "\uD835\uDD11",
  "nfr": "\uD835\uDD2B",
  "ngE": "\u2267\u0338",
  "nge": "\u2271",
  "ngeq": "\u2271",
  "ngeqq": "\u2267\u0338",
  "ngeqslant": "\u2A7E\u0338",
  "nges": "\u2A7E\u0338",
  "nGg": "\u22D9\u0338",
  "ngsim": "\u2275",
  "nGt": "\u226B\u20D2",
  "ngt": "\u226F",
  "ngtr": "\u226F",
  "nGtv": "\u226B\u0338",
  "nhArr": "\u21CE",
  "nharr": "\u21AE",
  "nhpar": "\u2AF2",
  "ni": "\u220B",
  "nis": "\u22FC",
  "nisd": "\u22FA",
  "niv": "\u220B",
  "NJcy": "\u040A",
  "njcy": "\u045A",
  "nlArr": "\u21CD",
  "nlarr": "\u219A",
  "nldr": "\u2025",
  "nlE": "\u2266\u0338",
  "nle": "\u2270",
  "nLeftarrow": "\u21CD",
  "nleftarrow": "\u219A",
  "nLeftrightarrow": "\u21CE",
  "nleftrightarrow": "\u21AE",
  "nleq": "\u2270",
  "nleqq": "\u2266\u0338",
  "nleqslant": "\u2A7D\u0338",
  "nles": "\u2A7D\u0338",
  "nless": "\u226E",
  "nLl": "\u22D8\u0338",
  "nlsim": "\u2274",
  "nLt": "\u226A\u20D2",
  "nlt": "\u226E",
  "nltri": "\u22EA",
  "nltrie": "\u22EC",
  "nLtv": "\u226A\u0338",
  "nmid": "\u2224",
  "NoBreak": "\u2060",
  "NonBreakingSpace": "\xA0",
  "Nopf": "\u2115",
  "nopf": "\uD835\uDD5F",
  "Not": "\u2AEC",
  "not": "\xAC",
  "NotCongruent": "\u2262",
  "NotCupCap": "\u226D",
  "NotDoubleVerticalBar": "\u2226",
  "NotElement": "\u2209",
  "NotEqual": "\u2260",
  "NotEqualTilde": "\u2242\u0338",
  "NotExists": "\u2204",
  "NotGreater": "\u226F",
  "NotGreaterEqual": "\u2271",
  "NotGreaterFullEqual": "\u2267\u0338",
  "NotGreaterGreater": "\u226B\u0338",
  "NotGreaterLess": "\u2279",
  "NotGreaterSlantEqual": "\u2A7E\u0338",
  "NotGreaterTilde": "\u2275",
  "NotHumpDownHump": "\u224E\u0338",
  "NotHumpEqual": "\u224F\u0338",
  "notin": "\u2209",
  "notindot": "\u22F5\u0338",
  "notinE": "\u22F9\u0338",
  "notinva": "\u2209",
  "notinvb": "\u22F7",
  "notinvc": "\u22F6",
  "NotLeftTriangle": "\u22EA",
  "NotLeftTriangleBar": "\u29CF\u0338",
  "NotLeftTriangleEqual": "\u22EC",
  "NotLess": "\u226E",
  "NotLessEqual": "\u2270",
  "NotLessGreater": "\u2278",
  "NotLessLess": "\u226A\u0338",
  "NotLessSlantEqual": "\u2A7D\u0338",
  "NotLessTilde": "\u2274",
  "NotNestedGreaterGreater": "\u2AA2\u0338",
  "NotNestedLessLess": "\u2AA1\u0338",
  "notni": "\u220C",
  "notniva": "\u220C",
  "notnivb": "\u22FE",
  "notnivc": "\u22FD",
  "NotPrecedes": "\u2280",
  "NotPrecedesEqual": "\u2AAF\u0338",
  "NotPrecedesSlantEqual": "\u22E0",
  "NotReverseElement": "\u220C",
  "NotRightTriangle": "\u22EB",
  "NotRightTriangleBar": "\u29D0\u0338",
  "NotRightTriangleEqual": "\u22ED",
  "NotSquareSubset": "\u228F\u0338",
  "NotSquareSubsetEqual": "\u22E2",
  "NotSquareSuperset": "\u2290\u0338",
  "NotSquareSupersetEqual": "\u22E3",
  "NotSubset": "\u2282\u20D2",
  "NotSubsetEqual": "\u2288",
  "NotSucceeds": "\u2281",
  "NotSucceedsEqual": "\u2AB0\u0338",
  "NotSucceedsSlantEqual": "\u22E1",
  "NotSucceedsTilde": "\u227F\u0338",
  "NotSuperset": "\u2283\u20D2",
  "NotSupersetEqual": "\u2289",
  "NotTilde": "\u2241",
  "NotTildeEqual": "\u2244",
  "NotTildeFullEqual": "\u2247",
  "NotTildeTilde": "\u2249",
  "NotVerticalBar": "\u2224",
  "npar": "\u2226",
  "nparallel": "\u2226",
  "nparsl": "\u2AFD\u20E5",
  "npart": "\u2202\u0338",
  "npolint": "\u2A14",
  "npr": "\u2280",
  "nprcue": "\u22E0",
  "npre": "\u2AAF\u0338",
  "nprec": "\u2280",
  "npreceq": "\u2AAF\u0338",
  "nrArr": "\u21CF",
  "nrarr": "\u219B",
  "nrarrc": "\u2933\u0338",
  "nrarrw": "\u219D\u0338",
  "nRightarrow": "\u21CF",
  "nrightarrow": "\u219B",
  "nrtri": "\u22EB",
  "nrtrie": "\u22ED",
  "nsc": "\u2281",
  "nsccue": "\u22E1",
  "nsce": "\u2AB0\u0338",
  "Nscr": "\uD835\uDCA9",
  "nscr": "\uD835\uDCC3",
  "nshortmid": "\u2224",
  "nshortparallel": "\u2226",
  "nsim": "\u2241",
  "nsime": "\u2244",
  "nsimeq": "\u2244",
  "nsmid": "\u2224",
  "nspar": "\u2226",
  "nsqsube": "\u22E2",
  "nsqsupe": "\u22E3",
  "nsub": "\u2284",
  "nsubE": "\u2AC5\u0338",
  "nsube": "\u2288",
  "nsubset": "\u2282\u20D2",
  "nsubseteq": "\u2288",
  "nsubseteqq": "\u2AC5\u0338",
  "nsucc": "\u2281",
  "nsucceq": "\u2AB0\u0338",
  "nsup": "\u2285",
  "nsupE": "\u2AC6\u0338",
  "nsupe": "\u2289",
  "nsupset": "\u2283\u20D2",
  "nsupseteq": "\u2289",
  "nsupseteqq": "\u2AC6\u0338",
  "ntgl": "\u2279",
  "Ntilde": "\xD1",
  "ntilde": "\xF1",
  "ntlg": "\u2278",
  "ntriangleleft": "\u22EA",
  "ntrianglelefteq": "\u22EC",
  "ntriangleright": "\u22EB",
  "ntrianglerighteq": "\u22ED",
  "Nu": "\u039D",
  "nu": "\u03BD",
  "num": "#",
  "numero": "\u2116",
  "numsp": "\u2007",
  "nvap": "\u224D\u20D2",
  "nVDash": "\u22AF",
  "nVdash": "\u22AE",
  "nvDash": "\u22AD",
  "nvdash": "\u22AC",
  "nvge": "\u2265\u20D2",
  "nvgt": ">\u20D2",
  "nvHarr": "\u2904",
  "nvinfin": "\u29DE",
  "nvlArr": "\u2902",
  "nvle": "\u2264\u20D2",
  "nvlt": "<\u20D2",
  "nvltrie": "\u22B4\u20D2",
  "nvrArr": "\u2903",
  "nvrtrie": "\u22B5\u20D2",
  "nvsim": "\u223C\u20D2",
  "nwarhk": "\u2923",
  "nwArr": "\u21D6",
  "nwarr": "\u2196",
  "nwarrow": "\u2196",
  "nwnear": "\u2927",
  "Oacute": "\xD3",
  "oacute": "\xF3",
  "oast": "\u229B",
  "ocir": "\u229A",
  "Ocirc": "\xD4",
  "ocirc": "\xF4",
  "Ocy": "\u041E",
  "ocy": "\u043E",
  "odash": "\u229D",
  "Odblac": "\u0150",
  "odblac": "\u0151",
  "odiv": "\u2A38",
  "odot": "\u2299",
  "odsold": "\u29BC",
  "OElig": "\u0152",
  "oelig": "\u0153",
  "ofcir": "\u29BF",
  "Ofr": "\uD835\uDD12",
  "ofr": "\uD835\uDD2C",
  "ogon": "\u02DB",
  "Ograve": "\xD2",
  "ograve": "\xF2",
  "ogt": "\u29C1",
  "ohbar": "\u29B5",
  "ohm": "\u03A9",
  "oint": "\u222E",
  "olarr": "\u21BA",
  "olcir": "\u29BE",
  "olcross": "\u29BB",
  "oline": "\u203E",
  "olt": "\u29C0",
  "Omacr": "\u014C",
  "omacr": "\u014D",
  "Omega": "\u03A9",
  "omega": "\u03C9",
  "Omicron": "\u039F",
  "omicron": "\u03BF",
  "omid": "\u29B6",
  "ominus": "\u2296",
  "Oopf": "\uD835\uDD46",
  "oopf": "\uD835\uDD60",
  "opar": "\u29B7",
  "OpenCurlyDoubleQuote": "\u201C",
  "OpenCurlyQuote": "\u2018",
  "operp": "\u29B9",
  "oplus": "\u2295",
  "Or": "\u2A54",
  "or": "\u2228",
  "orarr": "\u21BB",
  "ord": "\u2A5D",
  "order": "\u2134",
  "orderof": "\u2134",
  "ordf": "\xAA",
  "ordm": "\xBA",
  "origof": "\u22B6",
  "oror": "\u2A56",
  "orslope": "\u2A57",
  "orv": "\u2A5B",
  "oS": "\u24C8",
  "Oscr": "\uD835\uDCAA",
  "oscr": "\u2134",
  "Oslash": "\xD8",
  "oslash": "\xF8",
  "osol": "\u2298",
  "Otilde": "\xD5",
  "otilde": "\xF5",
  "Otimes": "\u2A37",
  "otimes": "\u2297",
  "otimesas": "\u2A36",
  "Ouml": "\xD6",
  "ouml": "\xF6",
  "ovbar": "\u233D",
  "OverBar": "\u203E",
  "OverBrace": "\u23DE",
  "OverBracket": "\u23B4",
  "OverParenthesis": "\u23DC",
  "par": "\u2225",
  "para": "\xB6",
  "parallel": "\u2225",
  "parsim": "\u2AF3",
  "parsl": "\u2AFD",
  "part": "\u2202",
  "PartialD": "\u2202",
  "Pcy": "\u041F",
  "pcy": "\u043F",
  "percnt": "%",
  "period": ".",
  "permil": "\u2030",
  "perp": "\u22A5",
  "pertenk": "\u2031",
  "Pfr": "\uD835\uDD13",
  "pfr": "\uD835\uDD2D",
  "Phi": "\u03A6",
  "phi": "\u03C6",
  "phiv": "\u03D5",
  "phmmat": "\u2133",
  "phone": "\u260E",
  "Pi": "\u03A0",
  "pi": "\u03C0",
  "pitchfork": "\u22D4",
  "piv": "\u03D6",
  "planck": "\u210F",
  "planckh": "\u210E",
  "plankv": "\u210F",
  "plus": "+",
  "plusacir": "\u2A23",
  "plusb": "\u229E",
  "pluscir": "\u2A22",
  "plusdo": "\u2214",
  "plusdu": "\u2A25",
  "pluse": "\u2A72",
  "PlusMinus": "\xB1",
  "plusmn": "\xB1",
  "plussim": "\u2A26",
  "plustwo": "\u2A27",
  "pm": "\xB1",
  "Poincareplane": "\u210C",
  "pointint": "\u2A15",
  "Popf": "\u2119",
  "popf": "\uD835\uDD61",
  "pound": "\xA3",
  "Pr": "\u2ABB",
  "pr": "\u227A",
  "prap": "\u2AB7",
  "prcue": "\u227C",
  "prE": "\u2AB3",
  "pre": "\u2AAF",
  "prec": "\u227A",
  "precapprox": "\u2AB7",
  "preccurlyeq": "\u227C",
  "Precedes": "\u227A",
  "PrecedesEqual": "\u2AAF",
  "PrecedesSlantEqual": "\u227C",
  "PrecedesTilde": "\u227E",
  "preceq": "\u2AAF",
  "precnapprox": "\u2AB9",
  "precneqq": "\u2AB5",
  "precnsim": "\u22E8",
  "precsim": "\u227E",
  "Prime": "\u2033",
  "prime": "\u2032",
  "primes": "\u2119",
  "prnap": "\u2AB9",
  "prnE": "\u2AB5",
  "prnsim": "\u22E8",
  "prod": "\u220F",
  "Product": "\u220F",
  "profalar": "\u232E",
  "profline": "\u2312",
  "profsurf": "\u2313",
  "prop": "\u221D",
  "Proportion": "\u2237",
  "Proportional": "\u221D",
  "propto": "\u221D",
  "prsim": "\u227E",
  "prurel": "\u22B0",
  "Pscr": "\uD835\uDCAB",
  "pscr": "\uD835\uDCC5",
  "Psi": "\u03A8",
  "psi": "\u03C8",
  "puncsp": "\u2008",
  "Qfr": "\uD835\uDD14",
  "qfr": "\uD835\uDD2E",
  "qint": "\u2A0C",
  "Qopf": "\u211A",
  "qopf": "\uD835\uDD62",
  "qprime": "\u2057",
  "Qscr": "\uD835\uDCAC",
  "qscr": "\uD835\uDCC6",
  "quaternions": "\u210D",
  "quatint": "\u2A16",
  "quest": "?",
  "questeq": "\u225F",
  "QUOT": "\"",
  "quot": "\"",
  "rAarr": "\u21DB",
  "race": "\u223D\u0331",
  "Racute": "\u0154",
  "racute": "\u0155",
  "radic": "\u221A",
  "raemptyv": "\u29B3",
  "Rang": "\u27EB",
  "rang": "\u27E9",
  "rangd": "\u2992",
  "range": "\u29A5",
  "rangle": "\u27E9",
  "raquo": "\xBB",
  "Rarr": "\u21A0",
  "rArr": "\u21D2",
  "rarr": "\u2192",
  "rarrap": "\u2975",
  "rarrb": "\u21E5",
  "rarrbfs": "\u2920",
  "rarrc": "\u2933",
  "rarrfs": "\u291E",
  "rarrhk": "\u21AA",
  "rarrlp": "\u21AC",
  "rarrpl": "\u2945",
  "rarrsim": "\u2974",
  "Rarrtl": "\u2916",
  "rarrtl": "\u21A3",
  "rarrw": "\u219D",
  "rAtail": "\u291C",
  "ratail": "\u291A",
  "ratio": "\u2236",
  "rationals": "\u211A",
  "RBarr": "\u2910",
  "rBarr": "\u290F",
  "rbarr": "\u290D",
  "rbbrk": "\u2773",
  "rbrace": "}",
  "rbrack": "]",
  "rbrke": "\u298C",
  "rbrksld": "\u298E",
  "rbrkslu": "\u2990",
  "Rcaron": "\u0158",
  "rcaron": "\u0159",
  "Rcedil": "\u0156",
  "rcedil": "\u0157",
  "rceil": "\u2309",
  "rcub": "}",
  "Rcy": "\u0420",
  "rcy": "\u0440",
  "rdca": "\u2937",
  "rdldhar": "\u2969",
  "rdquo": "\u201D",
  "rdquor": "\u201D",
  "rdsh": "\u21B3",
  "Re": "\u211C",
  "real": "\u211C",
  "realine": "\u211B",
  "realpart": "\u211C",
  "reals": "\u211D",
  "rect": "\u25AD",
  "REG": "\xAE",
  "reg": "\xAE",
  "ReverseElement": "\u220B",
  "ReverseEquilibrium": "\u21CB",
  "ReverseUpEquilibrium": "\u296F",
  "rfisht": "\u297D",
  "rfloor": "\u230B",
  "Rfr": "\u211C",
  "rfr": "\uD835\uDD2F",
  "rHar": "\u2964",
  "rhard": "\u21C1",
  "rharu": "\u21C0",
  "rharul": "\u296C",
  "Rho": "\u03A1",
  "rho": "\u03C1",
  "rhov": "\u03F1",
  "RightAngleBracket": "\u27E9",
  "RightArrow": "\u2192",
  "Rightarrow": "\u21D2",
  "rightarrow": "\u2192",
  "RightArrowBar": "\u21E5",
  "RightArrowLeftArrow": "\u21C4",
  "rightarrowtail": "\u21A3",
  "RightCeiling": "\u2309",
  "RightDoubleBracket": "\u27E7",
  "RightDownTeeVector": "\u295D",
  "RightDownVector": "\u21C2",
  "RightDownVectorBar": "\u2955",
  "RightFloor": "\u230B",
  "rightharpoondown": "\u21C1",
  "rightharpoonup": "\u21C0",
  "rightleftarrows": "\u21C4",
  "rightleftharpoons": "\u21CC",
  "rightrightarrows": "\u21C9",
  "rightsquigarrow": "\u219D",
  "RightTee": "\u22A2",
  "RightTeeArrow": "\u21A6",
  "RightTeeVector": "\u295B",
  "rightthreetimes": "\u22CC",
  "RightTriangle": "\u22B3",
  "RightTriangleBar": "\u29D0",
  "RightTriangleEqual": "\u22B5",
  "RightUpDownVector": "\u294F",
  "RightUpTeeVector": "\u295C",
  "RightUpVector": "\u21BE",
  "RightUpVectorBar": "\u2954",
  "RightVector": "\u21C0",
  "RightVectorBar": "\u2953",
  "ring": "\u02DA",
  "risingdotseq": "\u2253",
  "rlarr": "\u21C4",
  "rlhar": "\u21CC",
  "rlm": "\u200F",
  "rmoust": "\u23B1",
  "rmoustache": "\u23B1",
  "rnmid": "\u2AEE",
  "roang": "\u27ED",
  "roarr": "\u21FE",
  "robrk": "\u27E7",
  "ropar": "\u2986",
  "Ropf": "\u211D",
  "ropf": "\uD835\uDD63",
  "roplus": "\u2A2E",
  "rotimes": "\u2A35",
  "RoundImplies": "\u2970",
  "rpar": ")",
  "rpargt": "\u2994",
  "rppolint": "\u2A12",
  "rrarr": "\u21C9",
  "Rrightarrow": "\u21DB",
  "rsaquo": "\u203A",
  "Rscr": "\u211B",
  "rscr": "\uD835\uDCC7",
  "Rsh": "\u21B1",
  "rsh": "\u21B1",
  "rsqb": "]",
  "rsquo": "\u2019",
  "rsquor": "\u2019",
  "rthree": "\u22CC",
  "rtimes": "\u22CA",
  "rtri": "\u25B9",
  "rtrie": "\u22B5",
  "rtrif": "\u25B8",
  "rtriltri": "\u29CE",
  "RuleDelayed": "\u29F4",
  "ruluhar": "\u2968",
  "rx": "\u211E",
  "Sacute": "\u015A",
  "sacute": "\u015B",
  "sbquo": "\u201A",
  "Sc": "\u2ABC",
  "sc": "\u227B",
  "scap": "\u2AB8",
  "Scaron": "\u0160",
  "scaron": "\u0161",
  "sccue": "\u227D",
  "scE": "\u2AB4",
  "sce": "\u2AB0",
  "Scedil": "\u015E",
  "scedil": "\u015F",
  "Scirc": "\u015C",
  "scirc": "\u015D",
  "scnap": "\u2ABA",
  "scnE": "\u2AB6",
  "scnsim": "\u22E9",
  "scpolint": "\u2A13",
  "scsim": "\u227F",
  "Scy": "\u0421",
  "scy": "\u0441",
  "sdot": "\u22C5",
  "sdotb": "\u22A1",
  "sdote": "\u2A66",
  "searhk": "\u2925",
  "seArr": "\u21D8",
  "searr": "\u2198",
  "searrow": "\u2198",
  "sect": "\xA7",
  "semi": ";",
  "seswar": "\u2929",
  "setminus": "\u2216",
  "setmn": "\u2216",
  "sext": "\u2736",
  "Sfr": "\uD835\uDD16",
  "sfr": "\uD835\uDD30",
  "sfrown": "\u2322",
  "sharp": "\u266F",
  "SHCHcy": "\u0429",
  "shchcy": "\u0449",
  "SHcy": "\u0428",
  "shcy": "\u0448",
  "ShortDownArrow": "\u2193",
  "ShortLeftArrow": "\u2190",
  "shortmid": "\u2223",
  "shortparallel": "\u2225",
  "ShortRightArrow": "\u2192",
  "ShortUpArrow": "\u2191",
  "shy": "\xAD",
  "Sigma": "\u03A3",
  "sigma": "\u03C3",
  "sigmaf": "\u03C2",
  "sigmav": "\u03C2",
  "sim": "\u223C",
  "simdot": "\u2A6A",
  "sime": "\u2243",
  "simeq": "\u2243",
  "simg": "\u2A9E",
  "simgE": "\u2AA0",
  "siml": "\u2A9D",
  "simlE": "\u2A9F",
  "simne": "\u2246",
  "simplus": "\u2A24",
  "simrarr": "\u2972",
  "slarr": "\u2190",
  "SmallCircle": "\u2218",
  "smallsetminus": "\u2216",
  "smashp": "\u2A33",
  "smeparsl": "\u29E4",
  "smid": "\u2223",
  "smile": "\u2323",
  "smt": "\u2AAA",
  "smte": "\u2AAC",
  "smtes": "\u2AAC\uFE00",
  "SOFTcy": "\u042C",
  "softcy": "\u044C",
  "sol": "/",
  "solb": "\u29C4",
  "solbar": "\u233F",
  "Sopf": "\uD835\uDD4A",
  "sopf": "\uD835\uDD64",
  "spades": "\u2660",
  "spadesuit": "\u2660",
  "spar": "\u2225",
  "sqcap": "\u2293",
  "sqcaps": "\u2293\uFE00",
  "sqcup": "\u2294",
  "sqcups": "\u2294\uFE00",
  "Sqrt": "\u221A",
  "sqsub": "\u228F",
  "sqsube": "\u2291",
  "sqsubset": "\u228F",
  "sqsubseteq": "\u2291",
  "sqsup": "\u2290",
  "sqsupe": "\u2292",
  "sqsupset": "\u2290",
  "sqsupseteq": "\u2292",
  "squ": "\u25A1",
  "Square": "\u25A1",
  "square": "\u25A1",
  "SquareIntersection": "\u2293",
  "SquareSubset": "\u228F",
  "SquareSubsetEqual": "\u2291",
  "SquareSuperset": "\u2290",
  "SquareSupersetEqual": "\u2292",
  "SquareUnion": "\u2294",
  "squarf": "\u25AA",
  "squf": "\u25AA",
  "srarr": "\u2192",
  "Sscr": "\uD835\uDCAE",
  "sscr": "\uD835\uDCC8",
  "ssetmn": "\u2216",
  "ssmile": "\u2323",
  "sstarf": "\u22C6",
  "Star": "\u22C6",
  "star": "\u2606",
  "starf": "\u2605",
  "straightepsilon": "\u03F5",
  "straightphi": "\u03D5",
  "strns": "\xAF",
  "Sub": "\u22D0",
  "sub": "\u2282",
  "subdot": "\u2ABD",
  "subE": "\u2AC5",
  "sube": "\u2286",
  "subedot": "\u2AC3",
  "submult": "\u2AC1",
  "subnE": "\u2ACB",
  "subne": "\u228A",
  "subplus": "\u2ABF",
  "subrarr": "\u2979",
  "Subset": "\u22D0",
  "subset": "\u2282",
  "subseteq": "\u2286",
  "subseteqq": "\u2AC5",
  "SubsetEqual": "\u2286",
  "subsetneq": "\u228A",
  "subsetneqq": "\u2ACB",
  "subsim": "\u2AC7",
  "subsub": "\u2AD5",
  "subsup": "\u2AD3",
  "succ": "\u227B",
  "succapprox": "\u2AB8",
  "succcurlyeq": "\u227D",
  "Succeeds": "\u227B",
  "SucceedsEqual": "\u2AB0",
  "SucceedsSlantEqual": "\u227D",
  "SucceedsTilde": "\u227F",
  "succeq": "\u2AB0",
  "succnapprox": "\u2ABA",
  "succneqq": "\u2AB6",
  "succnsim": "\u22E9",
  "succsim": "\u227F",
  "SuchThat": "\u220B",
  "Sum": "\u2211",
  "sum": "\u2211",
  "sung": "\u266A",
  "Sup": "\u22D1",
  "sup": "\u2283",
  "sup1": "\xB9",
  "sup2": "\xB2",
  "sup3": "\xB3",
  "supdot": "\u2ABE",
  "supdsub": "\u2AD8",
  "supE": "\u2AC6",
  "supe": "\u2287",
  "supedot": "\u2AC4",
  "Superset": "\u2283",
  "SupersetEqual": "\u2287",
  "suphsol": "\u27C9",
  "suphsub": "\u2AD7",
  "suplarr": "\u297B",
  "supmult": "\u2AC2",
  "supnE": "\u2ACC",
  "supne": "\u228B",
  "supplus": "\u2AC0",
  "Supset": "\u22D1",
  "supset": "\u2283",
  "supseteq": "\u2287",
  "supseteqq": "\u2AC6",
  "supsetneq": "\u228B",
  "supsetneqq": "\u2ACC",
  "supsim": "\u2AC8",
  "supsub": "\u2AD4",
  "supsup": "\u2AD6",
  "swarhk": "\u2926",
  "swArr": "\u21D9",
  "swarr": "\u2199",
  "swarrow": "\u2199",
  "swnwar": "\u292A",
  "szlig": "\xDF",
  "Tab": "\t",
  "target": "\u2316",
  "Tau": "\u03A4",
  "tau": "\u03C4",
  "tbrk": "\u23B4",
  "Tcaron": "\u0164",
  "tcaron": "\u0165",
  "Tcedil": "\u0162",
  "tcedil": "\u0163",
  "Tcy": "\u0422",
  "tcy": "\u0442",
  "tdot": "\u20DB",
  "telrec": "\u2315",
  "Tfr": "\uD835\uDD17",
  "tfr": "\uD835\uDD31",
  "there4": "\u2234",
  "Therefore": "\u2234",
  "therefore": "\u2234",
  "Theta": "\u0398",
  "theta": "\u03B8",
  "thetasym": "\u03D1",
  "thetav": "\u03D1",
  "thickapprox": "\u2248",
  "thicksim": "\u223C",
  "ThickSpace": "\u205F\u200A",
  "thinsp": "\u2009",
  "ThinSpace": "\u2009",
  "thkap": "\u2248",
  "thksim": "\u223C",
  "THORN": "\xDE",
  "thorn": "\xFE",
  "Tilde": "\u223C",
  "tilde": "\u02DC",
  "TildeEqual": "\u2243",
  "TildeFullEqual": "\u2245",
  "TildeTilde": "\u2248",
  "times": "\xD7",
  "timesb": "\u22A0",
  "timesbar": "\u2A31",
  "timesd": "\u2A30",
  "tint": "\u222D",
  "toea": "\u2928",
  "top": "\u22A4",
  "topbot": "\u2336",
  "topcir": "\u2AF1",
  "Topf": "\uD835\uDD4B",
  "topf": "\uD835\uDD65",
  "topfork": "\u2ADA",
  "tosa": "\u2929",
  "tprime": "\u2034",
  "TRADE": "\u2122",
  "trade": "\u2122",
  "triangle": "\u25B5",
  "triangledown": "\u25BF",
  "triangleleft": "\u25C3",
  "trianglelefteq": "\u22B4",
  "triangleq": "\u225C",
  "triangleright": "\u25B9",
  "trianglerighteq": "\u22B5",
  "tridot": "\u25EC",
  "trie": "\u225C",
  "triminus": "\u2A3A",
  "TripleDot": "\u20DB",
  "triplus": "\u2A39",
  "trisb": "\u29CD",
  "tritime": "\u2A3B",
  "trpezium": "\u23E2",
  "Tscr": "\uD835\uDCAF",
  "tscr": "\uD835\uDCC9",
  "TScy": "\u0426",
  "tscy": "\u0446",
  "TSHcy": "\u040B",
  "tshcy": "\u045B",
  "Tstrok": "\u0166",
  "tstrok": "\u0167",
  "twixt": "\u226C",
  "twoheadleftarrow": "\u219E",
  "twoheadrightarrow": "\u21A0",
  "Uacute": "\xDA",
  "uacute": "\xFA",
  "Uarr": "\u219F",
  "uArr": "\u21D1",
  "uarr": "\u2191",
  "Uarrocir": "\u2949",
  "Ubrcy": "\u040E",
  "ubrcy": "\u045E",
  "Ubreve": "\u016C",
  "ubreve": "\u016D",
  "Ucirc": "\xDB",
  "ucirc": "\xFB",
  "Ucy": "\u0423",
  "ucy": "\u0443",
  "udarr": "\u21C5",
  "Udblac": "\u0170",
  "udblac": "\u0171",
  "udhar": "\u296E",
  "ufisht": "\u297E",
  "Ufr": "\uD835\uDD18",
  "ufr": "\uD835\uDD32",
  "Ugrave": "\xD9",
  "ugrave": "\xF9",
  "uHar": "\u2963",
  "uharl": "\u21BF",
  "uharr": "\u21BE",
  "uhblk": "\u2580",
  "ulcorn": "\u231C",
  "ulcorner": "\u231C",
  "ulcrop": "\u230F",
  "ultri": "\u25F8",
  "Umacr": "\u016A",
  "umacr": "\u016B",
  "uml": "\xA8",
  "UnderBar": "_",
  "UnderBrace": "\u23DF",
  "UnderBracket": "\u23B5",
  "UnderParenthesis": "\u23DD",
  "Union": "\u22C3",
  "UnionPlus": "\u228E",
  "Uogon": "\u0172",
  "uogon": "\u0173",
  "Uopf": "\uD835\uDD4C",
  "uopf": "\uD835\uDD66",
  "UpArrow": "\u2191",
  "Uparrow": "\u21D1",
  "uparrow": "\u2191",
  "UpArrowBar": "\u2912",
  "UpArrowDownArrow": "\u21C5",
  "UpDownArrow": "\u2195",
  "Updownarrow": "\u21D5",
  "updownarrow": "\u2195",
  "UpEquilibrium": "\u296E",
  "upharpoonleft": "\u21BF",
  "upharpoonright": "\u21BE",
  "uplus": "\u228E",
  "UpperLeftArrow": "\u2196",
  "UpperRightArrow": "\u2197",
  "Upsi": "\u03D2",
  "upsi": "\u03C5",
  "upsih": "\u03D2",
  "Upsilon": "\u03A5",
  "upsilon": "\u03C5",
  "UpTee": "\u22A5",
  "UpTeeArrow": "\u21A5",
  "upuparrows": "\u21C8",
  "urcorn": "\u231D",
  "urcorner": "\u231D",
  "urcrop": "\u230E",
  "Uring": "\u016E",
  "uring": "\u016F",
  "urtri": "\u25F9",
  "Uscr": "\uD835\uDCB0",
  "uscr": "\uD835\uDCCA",
  "utdot": "\u22F0",
  "Utilde": "\u0168",
  "utilde": "\u0169",
  "utri": "\u25B5",
  "utrif": "\u25B4",
  "uuarr": "\u21C8",
  "Uuml": "\xDC",
  "uuml": "\xFC",
  "uwangle": "\u29A7",
  "vangrt": "\u299C",
  "varepsilon": "\u03F5",
  "varkappa": "\u03F0",
  "varnothing": "\u2205",
  "varphi": "\u03D5",
  "varpi": "\u03D6",
  "varpropto": "\u221D",
  "vArr": "\u21D5",
  "varr": "\u2195",
  "varrho": "\u03F1",
  "varsigma": "\u03C2",
  "varsubsetneq": "\u228A\uFE00",
  "varsubsetneqq": "\u2ACB\uFE00",
  "varsupsetneq": "\u228B\uFE00",
  "varsupsetneqq": "\u2ACC\uFE00",
  "vartheta": "\u03D1",
  "vartriangleleft": "\u22B2",
  "vartriangleright": "\u22B3",
  "Vbar": "\u2AEB",
  "vBar": "\u2AE8",
  "vBarv": "\u2AE9",
  "Vcy": "\u0412",
  "vcy": "\u0432",
  "VDash": "\u22AB",
  "Vdash": "\u22A9",
  "vDash": "\u22A8",
  "vdash": "\u22A2",
  "Vdashl": "\u2AE6",
  "Vee": "\u22C1",
  "vee": "\u2228",
  "veebar": "\u22BB",
  "veeeq": "\u225A",
  "vellip": "\u22EE",
  "Verbar": "\u2016",
  "verbar": "|",
  "Vert": "\u2016",
  "vert": "|",
  "VerticalBar": "\u2223",
  "VerticalLine": "|",
  "VerticalSeparator": "\u2758",
  "VerticalTilde": "\u2240",
  "VeryThinSpace": "\u200A",
  "Vfr": "\uD835\uDD19",
  "vfr": "\uD835\uDD33",
  "vltri": "\u22B2",
  "vnsub": "\u2282\u20D2",
  "vnsup": "\u2283\u20D2",
  "Vopf": "\uD835\uDD4D",
  "vopf": "\uD835\uDD67",
  "vprop": "\u221D",
  "vrtri": "\u22B3",
  "Vscr": "\uD835\uDCB1",
  "vscr": "\uD835\uDCCB",
  "vsubnE": "\u2ACB\uFE00",
  "vsubne": "\u228A\uFE00",
  "vsupnE": "\u2ACC\uFE00",
  "vsupne": "\u228B\uFE00",
  "Vvdash": "\u22AA",
  "vzigzag": "\u299A",
  "Wcirc": "\u0174",
  "wcirc": "\u0175",
  "wedbar": "\u2A5F",
  "Wedge": "\u22C0",
  "wedge": "\u2227",
  "wedgeq": "\u2259",
  "weierp": "\u2118",
  "Wfr": "\uD835\uDD1A",
  "wfr": "\uD835\uDD34",
  "Wopf": "\uD835\uDD4E",
  "wopf": "\uD835\uDD68",
  "wp": "\u2118",
  "wr": "\u2240",
  "wreath": "\u2240",
  "Wscr": "\uD835\uDCB2",
  "wscr": "\uD835\uDCCC",
  "xcap": "\u22C2",
  "xcirc": "\u25EF",
  "xcup": "\u22C3",
  "xdtri": "\u25BD",
  "Xfr": "\uD835\uDD1B",
  "xfr": "\uD835\uDD35",
  "xhArr": "\u27FA",
  "xharr": "\u27F7",
  "Xi": "\u039E",
  "xi": "\u03BE",
  "xlArr": "\u27F8",
  "xlarr": "\u27F5",
  "xmap": "\u27FC",
  "xnis": "\u22FB",
  "xodot": "\u2A00",
  "Xopf": "\uD835\uDD4F",
  "xopf": "\uD835\uDD69",
  "xoplus": "\u2A01",
  "xotime": "\u2A02",
  "xrArr": "\u27F9",
  "xrarr": "\u27F6",
  "Xscr": "\uD835\uDCB3",
  "xscr": "\uD835\uDCCD",
  "xsqcup": "\u2A06",
  "xuplus": "\u2A04",
  "xutri": "\u25B3",
  "xvee": "\u22C1",
  "xwedge": "\u22C0",
  "Yacute": "\xDD",
  "yacute": "\xFD",
  "YAcy": "\u042F",
  "yacy": "\u044F",
  "Ycirc": "\u0176",
  "ycirc": "\u0177",
  "Ycy": "\u042B",
  "ycy": "\u044B",
  "yen": "\xA5",
  "Yfr": "\uD835\uDD1C",
  "yfr": "\uD835\uDD36",
  "YIcy": "\u0407",
  "yicy": "\u0457",
  "Yopf": "\uD835\uDD50",
  "yopf": "\uD835\uDD6A",
  "Yscr": "\uD835\uDCB4",
  "yscr": "\uD835\uDCCE",
  "YUcy": "\u042E",
  "yucy": "\u044E",
  "Yuml": "\u0178",
  "yuml": "\xFF",
  "Zacute": "\u0179",
  "zacute": "\u017A",
  "Zcaron": "\u017D",
  "zcaron": "\u017E",
  "Zcy": "\u0417",
  "zcy": "\u0437",
  "Zdot": "\u017B",
  "zdot": "\u017C",
  "zeetrf": "\u2128",
  "ZeroWidthSpace": "\u200B",
  "Zeta": "\u0396",
  "zeta": "\u03B6",
  "Zfr": "\u2128",
  "zfr": "\uD835\uDD37",
  "ZHcy": "\u0416",
  "zhcy": "\u0436",
  "zigrarr": "\u21DD",
  "Zopf": "\u2124",
  "zopf": "\uD835\uDD6B",
  "Zscr": "\uD835\uDCB5",
  "zscr": "\uD835\uDCCF",
  "zwj": "\u200D",
  "zwnj": "\u200C"
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalizeLink = __webpack_require__(26);
var unescapeMd = __webpack_require__(1).unescapeMd;

/**
 * Parse link destination
 *
 *   - on success it returns a string and updates state.pos;
 *   - on failure it returns null
 *
 * @param  {Object} state
 * @param  {Number} pos
 * @api private
 */

module.exports = function parseLinkDestination(state, pos) {
  var code,
      level,
      link,
      start = pos,
      max = state.posMax;

  if (state.src.charCodeAt(pos) === 0x3C /* < */) {
      pos++;
      while (pos < max) {
        code = state.src.charCodeAt(pos);
        if (code === 0x0A /* \n */) {
            return false;
          }
        if (code === 0x3E /* > */) {
            link = normalizeLink(unescapeMd(state.src.slice(start + 1, pos)));
            if (!state.parser.validateLink(link)) {
              return false;
            }
            state.pos = pos + 1;
            state.linkContent = link;
            return true;
          }
        if (code === 0x5C /* \ */ && pos + 1 < max) {
          pos += 2;
          continue;
        }

        pos++;
      }

      // no closing '>'
      return false;
    }

  // this should be ... } else { ... branch

  level = 0;
  while (pos < max) {
    code = state.src.charCodeAt(pos);

    if (code === 0x20) {
      break;
    }

    if (code > 0x08 && code < 0x0e) {
      break;
    }

    if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos += 2;
      continue;
    }

    if (code === 0x28 /* ( */) {
        level++;
        if (level > 1) {
          break;
        }
      }

    if (code === 0x29 /* ) */) {
        level--;
        if (level < 0) {
          break;
        }
      }

    pos++;
  }

  if (start === pos) {
    return false;
  }

  link = unescapeMd(state.src.slice(start, pos));
  if (!state.parser.validateLink(link)) {
    return false;
  }

  state.linkContent = link;
  state.pos = pos;
  return true;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replaceEntities = __webpack_require__(1).replaceEntities;

module.exports = function normalizeLink(url) {
  var normalized = replaceEntities(url);
  // We shouldn't care about the result of malformed URIs,
  // and should not throw an exception.
  try {
    normalized = decodeURI(normalized);
  } catch (err) {}
  return encodeURI(normalized);
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var unescapeMd = __webpack_require__(1).unescapeMd;

/**
 * Parse link title
 *
 *   - on success it returns a string and updates state.pos;
 *   - on failure it returns null
 *
 * @param  {Object} state
 * @param  {Number} pos
 * @api private
 */

module.exports = function parseLinkTitle(state, pos) {
  var code,
      start = pos,
      max = state.posMax,
      marker = state.src.charCodeAt(pos);

  if (marker !== 0x22 /* " */ && marker !== 0x27 /* ' */ && marker !== 0x28 /* ( */) {
      return false;
    }

  pos++;

  // if opening marker is "(", switch it to closing marker ")"
  if (marker === 0x28) {
    marker = 0x29;
  }

  while (pos < max) {
    code = state.src.charCodeAt(pos);
    if (code === marker) {
      state.pos = pos + 1;
      state.linkContent = unescapeMd(state.src.slice(start + 1, pos));
      return true;
    }
    if (code === 0x5C /* \ */ && pos + 1 < max) {
      pos += 2;
      continue;
    }

    pos++;
  }

  return false;
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function normalizeReference(str) {
  // use .toUpperCase() instead of .toLowerCase()
  // here to avoid a conflict with Object.prototype
  // members (most notably, `__proto__`)
  return str.trim().replace(/\s+/g, ' ').toUpperCase();
};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__icons__ = __webpack_require__(10);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var LoadingIndicator = function (_React$Component) {
  _inherits(LoadingIndicator, _React$Component);

  function LoadingIndicator(props) {
    _classCallCheck(this, LoadingIndicator);

    return _possibleConstructorReturn(this, (LoadingIndicator.__proto__ || Object.getPrototypeOf(LoadingIndicator)).call(this, props));
  }

  _createClass(LoadingIndicator, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'loading-indicator' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1__icons__["default"], { type: 'loading' })
      );
    }
  }]);

  return LoadingIndicator;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (LoadingIndicator);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Button__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Buttons = function (_React$Component) {
  _inherits(Buttons, _React$Component);

  function Buttons(props) {
    _classCallCheck(this, Buttons);

    return _possibleConstructorReturn(this, (Buttons.__proto__ || Object.getPrototypeOf(Buttons)).call(this, props));
  }

  _createClass(Buttons, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { key: 'default', label: 'Default Button' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Button__["default"], { label: 'I am button' })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { key: 'icon', label: 'Icon Button' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Button__["default"], { type: 'icon', icon: 'trash' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Button__["default"], { type: 'icon', icon: 'download' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Button__["default"], { type: 'icon', icon: 'trends' }),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Button__["default"], { type: 'icon', icon: 'watchlist' })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_3__guide_md___default.a })
        )
      );
    }
  }]);

  return Buttons;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (Buttons);

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Form__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var FormDev = function (_React$Component) {
  _inherits(FormDev, _React$Component);

  function FormDev(props) {
    _classCallCheck(this, FormDev);

    return _possibleConstructorReturn(this, (FormDev.__proto__ || Object.getPrototypeOf(FormDev)).call(this, props));
  }

  _createClass(FormDev, [{
    key: 'render',
    value: function render() {

      var inputsConfig = [{
        name: 'productIdentifier',
        defaultValue: '',
        suffix: '',
        placeholder: 'Enter an ASIN',
        characterLimit: 10,
        optional: false,
        submitOnEnter: true,
        tests: []
      }, {
        name: 'email',
        defaultValue: '',
        suffix: '',
        placeholder: 'email',
        characterLimit: 10,
        optional: false,
        submitOnEnter: true,
        tests: []
      }, {
        name: 'name',
        defaultValue: '',
        suffix: '',
        placeholder: 'name',
        characterLimit: 10,
        optional: false,
        submitOnEnter: true,
        tests: []
      }];

      var buttonsConfig = [{
        name: 'submit',
        type: 'icon',
        label: 'submit',
        action: 'submit'
      }];

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Default Form' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Form__["default"], { inputsConfig: inputsConfig, buttonsConfig: buttonsConfig, onSubmit: this.onSubmit })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_3__guide_md___default.a })
        )
      );
    }
  }]);

  return FormDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (FormDev);

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_deepmerge__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_clone__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_clone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_clone__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__input_Input__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__buttons_Button__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__icons_Icon__ = __webpack_require__(11);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      isSubmittable: false,
      submitted: false,
      inputs: {},
      buttons: {}
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyUp = _this.onKeyUp.bind(_this);
    _this.onSubmit = _this.onSubmit.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // create an object to act as a temporary store to manage input state
      var inputManagementState = {};
      var buttonManagementState = {};

      // populate the store object with values from the config and a few not in the config.
      this.props.inputsConfig.forEach(function (input) {
        // this is to check whether to enforce a value on an input that does not have a default value.
        var defaultError = input.defaultValue === '' && input.optional;
        inputManagementState[input.name] = input;
        inputManagementState[input.name].value = input.defaultValue;
        inputManagementState[input.name].active = false;
        inputManagementState[input.name].errors = defaultError ? [] : ['This field is required'];
      });

      this.props.buttonsConfig.forEach(function (button) {
        buttonManagementState[button.name] = button;
        buttonManagementState[button.name].enabled = true;
      });

      // merge the olde state with the new input management object.
      var newState = { inputs: inputManagementState, buttons: buttonManagementState };
      this.setState(Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(this.state, newState));
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(e) {
      if (e.DOMEvent.key === 'Enter') {
        this.onSubmit();
      }
    }
  }, {
    key: 'testInput',
    value: function testInput(name, value) {
      var input = this.state.inputs[name];
      var errors = [];
      var passedTest = true;

      // this is set in the input config
      var inputIsOptional = input.optional;

      if (!inputIsOptional) {
        var valueIsEmpty = value === '';

        if (valueIsEmpty) {
          passedTest = false;
          errors.push('This field is required');
        }
      }

      // if there are tests, then loop through, calling the methods, pushing
      // the messages into the respective input objects if the tests fail

      if (input.tests.length > 0) {
        input.tests.forEach(function (test) {
          var method = test.method,
              message = test.message;

          var methodReturnsFalse = !method(value);
          if (methodReturnsFalse) {
            passedTest = false;
            errors.push(message);
          }
        });
      }

      return { passedTest: passedTest, errors: errors };
    }
  }, {
    key: 'limitChar',
    value: function limitChar(name, value) {
      var limit = this.state.inputs[name].characterLimit;

      if (value.length > limit) {
        return true;
      }

      return false;
    }
  }, {
    key: 'onChange',
    value: function onChange(inputValues) {
      var name = inputValues.name;
      var value = inputValues.value;
      var inputTest = this.testInput(name, value);
      var passedTest = inputTest.passedTest,
          errors = inputTest.errors;


      var valueExceededLimit = this.limitChar(name, value);

      if (valueExceededLimit) {
        return;
      }

      if (passedTest) {
        var oldState = this.state;
        var clonedState = __WEBPACK_IMPORTED_MODULE_2_clone___default()(oldState);
        clonedState.inputs[name].value = value;
        var newState = Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(oldState, clonedState);
        this.setState(newState);
      }

      var inputs = __WEBPACK_IMPORTED_MODULE_2_clone___default()(this.state.inputs);

      inputs[name].value = value;
      inputs[name].errors = errors;

      this.setState(_extends({}, this.state, { inputs: inputs }));
    }
  }, {
    key: 'getInputs',
    value: function getInputs(inputs, submitted, scopeClass) {
      var _this2 = this;

      return Object.keys(inputs).map(function (inputKey) {
        var input = inputs[inputKey];

        var label = input.label;
        var tests = input.tests;
        var active = input.active;
        var autofocus = input.autofocus;
        var submitOnEnter = input.submitOnEnter;
        var errors = input.errors;

        // if there is no label, don't render the label container
        var labelDisplay = !label ? null : __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'form__input-container-label' },
          label
        );

        var onKeyUp = submitOnEnter ? _this2.onKeyUp : function () {
          return null;
        };
        var errorsDisplay = submitted && input.errors.length >= 1 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          ' ',
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5__icons_Icon__["default"], { type: 'attention' }),
          ' ',
          input.errors[0],
          ' '
        ) : null;
        // const errorsDisplay = null;

        console.log(input.errors, _this2.state);

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { key: 'input-' + input.name, className: 'form__input-container' },
          labelDisplay,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form__input-wrapper' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__input_Input__["default"], {
              key: input.name,
              value: input.value,
              name: input.name,
              suffix: input.suffix,
              onKeyUp: onKeyUp,
              active: active,
              autofocus: autofocus,
              placeholder: input.placeholder,
              ref: function ref(input) {
                return _this2[inputKey] = input;
              },
              onChange: _this2.onChange
            })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'form__input-container-errors' },
            errorsDisplay
          )
        );
      });
    }
  }, {
    key: 'getButtons',
    value: function getButtons(buttons, scopeClass) {
      var _this3 = this;

      return Object.keys(buttons).map(function (buttonKey) {
        var button = buttons[buttonKey];
        var label = button.label,
            type = button.type;

        var action = button.action === 'submit' ? _this3.onSubmit : button.action;

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4__buttons_Button__["default"], {
          key: button.label + '-button',
          label: label,
          type: type,
          onClick: action
        });
      });
    }
  }, {
    key: 'getOutput',
    value: function getOutput() {
      // get data and instantiate holder objects
      var stateInputs = this.state.inputs;
      var formExportObject = {};

      // populate holder object
      Object.keys(stateInputs).forEach(function (inputKey) {
        var input = stateInputs[inputKey];
        var inputExportObject = {};

        inputExportObject.value = input.value;
        inputExportObject.name = input.name;
        inputExportObject.errors = input.errors;

        // put the input holder object into the form holder object
        formExportObject[input.name] = inputExportObject;
      });

      return formExportObject;
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      var errors = false;
      var state = this.state;
      var stateInputs = state.inputs;

      Object.keys(stateInputs).forEach(function (inputKey) {
        var input = stateInputs[inputKey];
        if (input.errors.length > 0) {
          errors = true;
        }
      });

      if (errors) {
        this.setState(Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(state, { submitted: true }));
        return null;
      }

      this.setState(Object(__WEBPACK_IMPORTED_MODULE_1_deepmerge__["a" /* default */])(state, { submitted: true }));

      var output = this.getOutput();
      this.props.onSubmit(output);
    }
  }, {
    key: 'render',
    value: function render() {
      var submitted = this.state.submitted;
      var inputs = this.state.inputs;
      var buttons = this.state.buttons;
      var scopeClass = this.props.scopeClass + '____form';
      var inputsDisplay = this.getInputs(inputs, submitted, scopeClass);
      var buttonsDisplay = this.getButtons(buttons, scopeClass);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'form' },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'form__inputs' },
          inputsDisplay
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'form__buttons' },
          buttonsDisplay
        )
      );
    }
  }]);

  return Form;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Form.defaultProps = {
  scopeClass: 'default',
  buttonsConfig: []
};

/* harmony default export */ __webpack_exports__["default"] = (Form);

/***/ }),
/* 33 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Icon__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__iconSvgBank__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guide_md__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var IconDev = function (_React$Component) {
  _inherits(IconDev, _React$Component);

  function IconDev(props) {
    _classCallCheck(this, IconDev);

    return _possibleConstructorReturn(this, (IconDev.__proto__ || Object.getPrototypeOf(IconDev)).call(this, props));
  }

  _createClass(IconDev, [{
    key: 'displayAllIcons',
    value: function displayAllIcons(icons) {
      return Object.keys(icons).map(function (iconName) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'icon-box' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'icon-title' },
            iconName
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Icon__["default"], { type: iconName })
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var allIcons = this.displayAllIcons(__WEBPACK_IMPORTED_MODULE_3__iconSvgBank__["default"]);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Icons' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'icon-rows' },
            allIcons
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_4__guide_md___default.a })
        )
      );
    }
  }]);

  return IconDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (IconDev);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Input__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var InputDev = function (_React$Component) {
  _inherits(InputDev, _React$Component);

  function InputDev(props) {
    _classCallCheck(this, InputDev);

    return _possibleConstructorReturn(this, (InputDev.__proto__ || Object.getPrototypeOf(InputDev)).call(this, props));
  }

  _createClass(InputDev, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Default Input' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Input__["default"], null)
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_3__guide_md___default.a })
        )
      );
    }
  }]);

  return InputDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (InputDev);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modal_Modal__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__confirmationModal_ConfirmationModal__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guide_md__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var ModalDev = function (_React$Component) {
  _inherits(ModalDev, _React$Component);

  function ModalDev(props) {
    _classCallCheck(this, ModalDev);

    var _this = _possibleConstructorReturn(this, (ModalDev.__proto__ || Object.getPrototypeOf(ModalDev)).call(this, props));

    _this.state = {
      confirmationModalOpen: true
    };

    _this.confirmationModalClose = _this.confirmationModalClose.bind(_this);
    return _this;
  }

  _createClass(ModalDev, [{
    key: 'confirmationModalClose',
    value: function confirmationModalClose() {
      this.setState(_extends({}, this.state, { confirmationModalOpen: false }));
    }
  }, {
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { key: 'default', className: 'modal-dev', label: 'Modal' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            __WEBPACK_IMPORTED_MODULE_2__modal_Modal__["default"],
            { open: 'true' },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              null,
              ' I am in a modal! '
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { key: 'confirmation', className: 'modal-dev', label: 'Confirmation Modal' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__confirmationModal_ConfirmationModal__["default"], {
            open: this.state.confirmationModalOpen,
            onConfirm: this.confirmationModalClose,
            onClose: this.confirmationModalClose,
            message: 'Are you sure you want to close the Confirmation Modal'
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_4__guide_md___default.a })
        )
      );
    }
  }]);

  return ModalDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (ModalDev);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Modal = function (_React$Component) {
  _inherits(Modal, _React$Component);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.onConfirm = _this.onConfirm.bind(_this);
    _this.onClose = _this.onClose.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: "onConfirm",
    value: function onConfirm() {
      this.props.onConfirm();
      this.props.onClose();
    }
  }, {
    key: "onClose",
    value: function onClose() {
      this.props.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.open) {

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "modal" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div", { className: "modal__overlay", onClick: this.onClose }),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "modal__content" },
              this.props.children
            )
          )
        );
      } else {

        return null;
      }
    }
  }]);

  return Modal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Modal.defaultProps = {
  onConfirm: function onConfirm() {
    console.log('this was confirmed');
  },
  onClose: function onClose() {
    console.log('this was closed');
  },
  open: false
};

// Modal.propTypes = {
//   onConfirm: React.PropTypes.func,
//   onClose: React.PropTypes.func,
//   open: React.PropTypes.bool,
// };

/* harmony default export */ __webpack_exports__["default"] = (Modal);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var ConfirmationModal = function (_React$Component) {
  _inherits(ConfirmationModal, _React$Component);

  function ConfirmationModal(props) {
    _classCallCheck(this, ConfirmationModal);

    var _this = _possibleConstructorReturn(this, (ConfirmationModal.__proto__ || Object.getPrototypeOf(ConfirmationModal)).call(this, props));

    _this.onConfirm = _this.onConfirm.bind(_this);
    return _this;
  }

  _createClass(ConfirmationModal, [{
    key: "onConfirm",
    value: function onConfirm() {
      this.props.onConfirm();
      this.props.onClose();
    }
  }, {
    key: "render",
    value: function render() {
      var message = this.props.message;
      if (this.props.open) {

        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          "div",
          { className: "confirmation-modal" },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "confirmation-modal__message" },
            message
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            "div",
            { className: "confirmation-modal__buttons" },
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "confirmation-modal__button", onClick: this.onConfirm },
              "Yes"
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              "div",
              { className: "confirmation-modal__button", onClick: this.props.onClose },
              "No"
            )
          )
        );
      } else {

        return null;
      }
    }
  }]);

  return ConfirmationModal;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

ConfirmationModal.defaultProps = {
  onConfirm: function onConfirm() {
    console.log('Modal Confirmed');
  },
  onClose: function onClose() {
    console.log('Modal Confirmed');
  },
  message: 'This is the message'
};

// ConfirmationModal.propTypes = {
//   onConfirm: React.PropTypes.func,
//   onClose: React.PropTypes.func,
//   message: React.PropTypes.string,
// };

/* harmony default export */ __webpack_exports__["default"] = (ConfirmationModal);

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ImagePlaceholder__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var PlaceholdersDev = function (_React$Component) {
  _inherits(PlaceholdersDev, _React$Component);

  function PlaceholdersDev(props) {
    _classCallCheck(this, PlaceholdersDev);

    return _possibleConstructorReturn(this, (PlaceholdersDev.__proto__ || Object.getPrototypeOf(PlaceholdersDev)).call(this, props));
  }

  _createClass(PlaceholdersDev, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Image Placeholder' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__ImagePlaceholder__["default"], null)
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_3__guide_md___default.a })
        )
      );
    }
  }]);

  return PlaceholdersDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (PlaceholdersDev);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Table__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var testTableData = {
  'Key_one': 'value_one',
  'key_two': 'value_two'
};

var testTableConfig = {
  keyFormatter: function keyFormatter(val) {
    return val;
  },
  valueFormatter: function valueFormatter(val) {
    return val;
  }
};

var TableDev = function (_React$Component) {
  _inherits(TableDev, _React$Component);

  function TableDev(props) {
    _classCallCheck(this, TableDev);

    return _possibleConstructorReturn(this, (TableDev.__proto__ || Object.getPrototypeOf(TableDev)).call(this, props));
  }

  _createClass(TableDev, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Table' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Table__["default"], {
            data: testTableData,
            config: testTableConfig
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_3__guide_md___default.a })
        )
      );
    }
  }]);

  return TableDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (TableDev);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Table = function (_React$Component) {
  _inherits(Table, _React$Component);

  function Table(props) {
    _classCallCheck(this, Table);

    return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));
  }

  _createClass(Table, [{
    key: 'getRows',
    value: function getRows(dataObject, scopeClass) {
      var _this2 = this;

      return Object.keys(dataObject).map(function (key, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'table__row ', key: 'table-row-' + i },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'table__cell key' },
            _this2.props.config.keyFormatter(key)
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            { className: 'table__cell  value' },
            _this2.getValue(dataObject[key])
          )
        );
      });
    }
  }, {
    key: 'getValue',
    value: function getValue(value) {
      try {
        if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          return value.component;
        } else {
          return this.props.config.valueFormatter(value);
        }
      } catch (e) {
        return '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var scopeClass = this.props.scopeClass;
      var data = this.props.data;
      var rows = this.getRows(data, scopeClass);

      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { className: 'table', key: 'I love cows' },
        rows
      );
    }
  }]);

  return Table;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Table.defaultProps = {};

/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Modal", function() { return Modal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmationModal", function() { return ConfirmationModal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Icon", function() { return Icon; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingIndicator", function() { return LoadingIndicator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImagePlaceholder", function() { return ImagePlaceholder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Form", function() { return Form; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Card", function() { return Card; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components__ = __webpack_require__(20);


var Button = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Button;
var Modal = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Modal;
var ConfirmationModal = __WEBPACK_IMPORTED_MODULE_0__components__["default"].ConfirmationModal;
var Icon = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Icon;
var LoadingIndicator = __WEBPACK_IMPORTED_MODULE_0__components__["default"].LoadingIndicator;
var ImagePlaceholder = __WEBPACK_IMPORTED_MODULE_0__components__["default"].ImagePlaceholder;
var Table = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Table;
var Input = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Input;
var Form = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Form;
var Card = __WEBPACK_IMPORTED_MODULE_0__components__["default"].Card;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./LoadingIndicator/LoadingIndicator.dev.js": 21,
	"./LoadingIndicator/LoadingIndicator.js": 29,
	"./buttons/Button.js": 17,
	"./buttons/Buttons.dev.js": 30,
	"./card/Card.dev.js": 119,
	"./card/Card.js": 120,
	"./form/Form.dev.js": 31,
	"./form/Form.js": 32,
	"./icons/Icon.dev.js": 34,
	"./icons/Icon.js": 11,
	"./icons/iconSvgBank.js": 12,
	"./icons/index.js": 10,
	"./index.js": 20,
	"./input/Input.dev.js": 35,
	"./input/Input.js": 18,
	"./modals/Modal.dev.js": 36,
	"./modals/confirmationModal/ConfirmationModal.js": 38,
	"./modals/modal/Modal.js": 37,
	"./placeholders/ImagePlaceholder.js": 19,
	"./placeholders/Placeholders.dev.js": 39,
	"./placeholders/index.js": 116,
	"./table/Table.dev.js": 40,
	"./table/Table.js": 41
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 43;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.2.0
 * react.production.min.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var m = __webpack_require__(13),
    n = __webpack_require__(22),
    p = __webpack_require__(6),
    q = "function" === typeof Symbol && Symbol["for"],
    r = q ? Symbol["for"]("react.element") : 60103,
    t = q ? Symbol["for"]("react.call") : 60104,
    u = q ? Symbol["for"]("react.return") : 60105,
    v = q ? Symbol["for"]("react.portal") : 60106,
    w = q ? Symbol["for"]("react.fragment") : 60107,
    x = "function" === typeof Symbol && Symbol.iterator;
function y(a) {
  for (var b = arguments.length - 1, e = "Minified React error #" + a + "; visit http://facebook.github.io/react/docs/error-decoder.html?invariant\x3d" + a, c = 0; c < b; c++) {
    e += "\x26args[]\x3d" + encodeURIComponent(arguments[c + 1]);
  }b = Error(e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.");b.name = "Invariant Violation";b.framesToPop = 1;throw b;
}
var z = { isMounted: function isMounted() {
    return !1;
  }, enqueueForceUpdate: function enqueueForceUpdate() {}, enqueueReplaceState: function enqueueReplaceState() {}, enqueueSetState: function enqueueSetState() {} };function A(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}A.prototype.isReactComponent = {};A.prototype.setState = function (a, b) {
  "object" !== (typeof a === "undefined" ? "undefined" : _typeof(a)) && "function" !== typeof a && null != a ? y("85") : void 0;this.updater.enqueueSetState(this, a, b, "setState");
};A.prototype.forceUpdate = function (a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function B(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}function C() {}C.prototype = A.prototype;var D = B.prototype = new C();D.constructor = B;m(D, A.prototype);D.isPureReactComponent = !0;function E(a, b, e) {
  this.props = a;this.context = b;this.refs = n;this.updater = e || z;
}var F = E.prototype = new C();F.constructor = E;m(F, A.prototype);F.unstable_isAsyncReactComponent = !0;F.render = function () {
  return this.props.children;
};var G = { current: null },
    H = Object.prototype.hasOwnProperty,
    I = { key: !0, ref: !0, __self: !0, __source: !0 };
function J(a, b, e) {
  var c,
      d = {},
      g = null,
      k = null;if (null != b) for (c in void 0 !== b.ref && (k = b.ref), void 0 !== b.key && (g = "" + b.key), b) {
    H.call(b, c) && !I.hasOwnProperty(c) && (d[c] = b[c]);
  }var f = arguments.length - 2;if (1 === f) d.children = e;else if (1 < f) {
    for (var h = Array(f), l = 0; l < f; l++) {
      h[l] = arguments[l + 2];
    }d.children = h;
  }if (a && a.defaultProps) for (c in f = a.defaultProps, f) {
    void 0 === d[c] && (d[c] = f[c]);
  }return { $$typeof: r, type: a, key: g, ref: k, props: d, _owner: G.current };
}function K(a) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && a.$$typeof === r;
}
function escape(a) {
  var b = { "\x3d": "\x3d0", ":": "\x3d2" };return "$" + ("" + a).replace(/[=:]/g, function (a) {
    return b[a];
  });
}var L = /\/+/g,
    M = [];function N(a, b, e, c) {
  if (M.length) {
    var d = M.pop();d.result = a;d.keyPrefix = b;d.func = e;d.context = c;d.count = 0;return d;
  }return { result: a, keyPrefix: b, func: e, context: c, count: 0 };
}function O(a) {
  a.result = null;a.keyPrefix = null;a.func = null;a.context = null;a.count = 0;10 > M.length && M.push(a);
}
function P(a, b, e, c) {
  var d = typeof a === "undefined" ? "undefined" : _typeof(a);if ("undefined" === d || "boolean" === d) a = null;var g = !1;if (null === a) g = !0;else switch (d) {case "string":case "number":
      g = !0;break;case "object":
      switch (a.$$typeof) {case r:case t:case u:case v:
          g = !0;}}if (g) return e(c, a, "" === b ? "." + Q(a, 0) : b), 1;g = 0;b = "" === b ? "." : b + ":";if (Array.isArray(a)) for (var k = 0; k < a.length; k++) {
    d = a[k];var f = b + Q(d, k);g += P(d, f, e, c);
  } else if (null === a || "undefined" === typeof a ? f = null : (f = x && a[x] || a["@@iterator"], f = "function" === typeof f ? f : null), "function" === typeof f) for (a = f.call(a), k = 0; !(d = a.next()).done;) {
    d = d.value, f = b + Q(d, k++), g += P(d, f, e, c);
  } else "object" === d && (e = "" + a, y("31", "[object Object]" === e ? "object with keys {" + Object.keys(a).join(", ") + "}" : e, ""));return g;
}function Q(a, b) {
  return "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) && null !== a && null != a.key ? escape(a.key) : b.toString(36);
}function R(a, b) {
  a.func.call(a.context, b, a.count++);
}
function S(a, b, e) {
  var c = a.result,
      d = a.keyPrefix;a = a.func.call(a.context, b, a.count++);Array.isArray(a) ? T(a, c, e, p.thatReturnsArgument) : null != a && (K(a) && (b = d + (!a.key || b && b.key === a.key ? "" : ("" + a.key).replace(L, "$\x26/") + "/") + e, a = { $$typeof: r, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner }), c.push(a));
}function T(a, b, e, c, d) {
  var g = "";null != e && (g = ("" + e).replace(L, "$\x26/") + "/");b = N(b, g, c, d);null == a || P(a, "", S, b);O(b);
}
var U = { Children: { map: function map(a, b, e) {
      if (null == a) return a;var c = [];T(a, c, null, b, e);return c;
    }, forEach: function forEach(a, b, e) {
      if (null == a) return a;b = N(null, null, b, e);null == a || P(a, "", R, b);O(b);
    }, count: function count(a) {
      return null == a ? 0 : P(a, "", p.thatReturnsNull, null);
    }, toArray: function toArray(a) {
      var b = [];T(a, b, null, p.thatReturnsArgument);return b;
    }, only: function only(a) {
      K(a) ? void 0 : y("143");return a;
    } }, Component: A, PureComponent: B, unstable_AsyncComponent: E, Fragment: w, createElement: J, cloneElement: function cloneElement(a, b, e) {
    var c = m({}, a.props),
        d = a.key,
        g = a.ref,
        k = a._owner;if (null != b) {
      void 0 !== b.ref && (g = b.ref, k = G.current);void 0 !== b.key && (d = "" + b.key);if (a.type && a.type.defaultProps) var f = a.type.defaultProps;for (h in b) {
        H.call(b, h) && !I.hasOwnProperty(h) && (c[h] = void 0 === b[h] && void 0 !== f ? f[h] : b[h]);
      }
    }var h = arguments.length - 2;if (1 === h) c.children = e;else if (1 < h) {
      f = Array(h);for (var l = 0; l < h; l++) {
        f[l] = arguments[l + 2];
      }c.children = f;
    }return { $$typeof: r, type: a.type, key: d, ref: g, props: c, _owner: k };
  }, createFactory: function createFactory(a) {
    var b = J.bind(null, a);b.type = a;return b;
  },
  isValidElement: K, version: "16.2.0", __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: { ReactCurrentOwner: G, assign: m } },
    V = Object.freeze({ default: U }),
    W = V && U || V;module.exports = W["default"] ? W["default"] : W;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/** @license React v16.2.0
 * react.development.js
 *
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (process.env.NODE_ENV !== "production") {
  (function () {
    'use strict';

    var _assign = __webpack_require__(13);
    var emptyObject = __webpack_require__(22);
    var invariant = __webpack_require__(7);
    var warning = __webpack_require__(14);
    var emptyFunction = __webpack_require__(6);
    var checkPropTypes = __webpack_require__(23);

    // TODO: this is special because it gets imported during build.

    var ReactVersion = '16.2.0';

    // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
    // nor polyfill, then a plain number is used for performance.
    var hasSymbol = typeof Symbol === 'function' && Symbol['for'];

    var REACT_ELEMENT_TYPE = hasSymbol ? Symbol['for']('react.element') : 0xeac7;
    var REACT_CALL_TYPE = hasSymbol ? Symbol['for']('react.call') : 0xeac8;
    var REACT_RETURN_TYPE = hasSymbol ? Symbol['for']('react.return') : 0xeac9;
    var REACT_PORTAL_TYPE = hasSymbol ? Symbol['for']('react.portal') : 0xeaca;
    var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol['for']('react.fragment') : 0xeacb;

    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable === 'undefined') {
        return null;
      }
      var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
      if (typeof maybeIterator === 'function') {
        return maybeIterator;
      }
      return null;
    }

    /**
     * WARNING: DO NOT manually require this module.
     * This is a replacement for `invariant(...)` used by the error code system
     * and will _only_ be required by the corresponding babel pass.
     * It always throws.
     */

    /**
     * Forked from fbjs/warning:
     * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
     *
     * Only change is we use console.warn instead of console.error,
     * and do nothing when 'console' is not supported.
     * This really simplifies the code.
     * ---
     * Similar to invariant but only logs a warning if the condition is not met.
     * This can be used to log issues in development environments in critical
     * paths. Removing the logging code for production environments will keep the
     * same logic and follow the same code paths.
     */

    var lowPriorityWarning = function lowPriorityWarning() {};

    {
      var printWarning = function printWarning(format) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        var argIndex = 0;
        var message = 'Warning: ' + format.replace(/%s/g, function () {
          return args[argIndex++];
        });
        if (typeof console !== 'undefined') {
          console.warn(message);
        }
        try {
          // --- Welcome to debugging React ---
          // This error was thrown as a convenience so that you can use this stack
          // to find the callsite that caused this warning to fire.
          throw new Error(message);
        } catch (x) {}
      };

      lowPriorityWarning = function lowPriorityWarning(condition, format) {
        if (format === undefined) {
          throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
        }
        if (!condition) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          printWarning.apply(undefined, [format].concat(args));
        }
      };
    }

    var lowPriorityWarning$1 = lowPriorityWarning;

    var didWarnStateUpdateForUnmountedComponent = {};

    function warnNoop(publicInstance, callerName) {
      {
        var constructor = publicInstance.constructor;
        var componentName = constructor && (constructor.displayName || constructor.name) || 'ReactClass';
        var warningKey = componentName + '.' + callerName;
        if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
          return;
        }
        warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op.\n\nPlease check the code for the %s component.', callerName, callerName, componentName);
        didWarnStateUpdateForUnmountedComponent[warningKey] = true;
      }
    }

    /**
     * This is the abstract API for an update queue.
     */
    var ReactNoopUpdateQueue = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function isMounted(publicInstance) {
        return false;
      },

      /**
       * Forces an update. This should only be invoked when it is known with
       * certainty that we are **not** in a DOM transaction.
       *
       * You may want to call this when you know that some deeper aspect of the
       * component's state has changed but `setState` was not called.
       *
       * This will not invoke `shouldComponentUpdate`, but it will invoke
       * `componentWillUpdate` and `componentDidUpdate`.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueForceUpdate: function enqueueForceUpdate(publicInstance, callback, callerName) {
        warnNoop(publicInstance, 'forceUpdate');
      },

      /**
       * Replaces all of the state. Always use this or `setState` to mutate state.
       * You should treat `this.state` as immutable.
       *
       * There is no guarantee that `this.state` will be immediately updated, so
       * accessing `this.state` after calling this method may return the old value.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} completeState Next state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} callerName name of the calling function in the public API.
       * @internal
       */
      enqueueReplaceState: function enqueueReplaceState(publicInstance, completeState, callback, callerName) {
        warnNoop(publicInstance, 'replaceState');
      },

      /**
       * Sets a subset of the state. This only exists because _pendingState is
       * internal. This provides a merging strategy that is not available to deep
       * properties which is confusing. TODO: Expose pendingState or don't use it
       * during the merge.
       *
       * @param {ReactClass} publicInstance The instance that should rerender.
       * @param {object} partialState Next partial state to be merged with state.
       * @param {?function} callback Called after component is updated.
       * @param {?string} Name of the calling function in the public API.
       * @internal
       */
      enqueueSetState: function enqueueSetState(publicInstance, partialState, callback, callerName) {
        warnNoop(publicInstance, 'setState');
      }
    };

    /**
     * Base class helpers for the updating state of a component.
     */
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    Component.prototype.isReactComponent = {};

    /**
     * Sets a subset of the state. Always use this to mutate
     * state. You should treat `this.state` as immutable.
     *
     * There is no guarantee that `this.state` will be immediately updated, so
     * accessing `this.state` after calling this method may return the old value.
     *
     * There is no guarantee that calls to `setState` will run synchronously,
     * as they may eventually be batched together.  You can provide an optional
     * callback that will be executed when the call to setState is actually
     * completed.
     *
     * When a function is provided to setState, it will be called at some point in
     * the future (not synchronously). It will be called with the up to date
     * component arguments (state, props, context). These values can be different
     * from this.* because your function may be called after receiveProps but before
     * shouldComponentUpdate, and this new state, props, and context will not yet be
     * assigned to this.
     *
     * @param {object|function} partialState Next partial state or function to
     *        produce next partial state to be merged with current state.
     * @param {?function} callback Called after state is updated.
     * @final
     * @protected
     */
    Component.prototype.setState = function (partialState, callback) {
      !((typeof partialState === 'undefined' ? 'undefined' : _typeof(partialState)) === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
      this.updater.enqueueSetState(this, partialState, callback, 'setState');
    };

    /**
     * Forces an update. This should only be invoked when it is known with
     * certainty that we are **not** in a DOM transaction.
     *
     * You may want to call this when you know that some deeper aspect of the
     * component's state has changed but `setState` was not called.
     *
     * This will not invoke `shouldComponentUpdate`, but it will invoke
     * `componentWillUpdate` and `componentDidUpdate`.
     *
     * @param {?function} callback Called after update is complete.
     * @final
     * @protected
     */
    Component.prototype.forceUpdate = function (callback) {
      this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
    };

    /**
     * Deprecated APIs. These APIs used to exist on classic React classes but since
     * we would like to deprecate them, we're not going to move them over to this
     * modern base class. Instead, we define a getter that warns if it's accessed.
     */
    {
      var deprecatedAPIs = {
        isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
        replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
      };
      var defineDeprecationWarning = function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
          get: function get() {
            lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
            return undefined;
          }
        });
      };
      for (var fnName in deprecatedAPIs) {
        if (deprecatedAPIs.hasOwnProperty(fnName)) {
          defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        }
      }
    }

    /**
     * Base class helpers for the updating state of a component.
     */
    function PureComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    function ComponentDummy() {}
    ComponentDummy.prototype = Component.prototype;
    var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
    pureComponentPrototype.constructor = PureComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(pureComponentPrototype, Component.prototype);
    pureComponentPrototype.isPureReactComponent = true;

    function AsyncComponent(props, context, updater) {
      // Duplicated from Component.
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      // We initialize the default updater but the real one gets injected by the
      // renderer.
      this.updater = updater || ReactNoopUpdateQueue;
    }

    var asyncComponentPrototype = AsyncComponent.prototype = new ComponentDummy();
    asyncComponentPrototype.constructor = AsyncComponent;
    // Avoid an extra prototype jump for these methods.
    _assign(asyncComponentPrototype, Component.prototype);
    asyncComponentPrototype.unstable_isAsyncReactComponent = true;
    asyncComponentPrototype.render = function () {
      return this.props.children;
    };

    /**
     * Keeps track of the current owner.
     *
     * The current owner is the component who should own any components that are
     * currently being constructed.
     */
    var ReactCurrentOwner = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var RESERVED_PROPS = {
      key: true,
      ref: true,
      __self: true,
      __source: true
    };

    var specialPropKeyWarningShown;
    var specialPropRefWarningShown;

    function hasValidRef(config) {
      {
        if (hasOwnProperty.call(config, 'ref')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.ref !== undefined;
    }

    function hasValidKey(config) {
      {
        if (hasOwnProperty.call(config, 'key')) {
          var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
          if (getter && getter.isReactWarning) {
            return false;
          }
        }
      }
      return config.key !== undefined;
    }

    function defineKeyPropWarningGetter(props, displayName) {
      var warnAboutAccessingKey = function warnAboutAccessingKey() {
        if (!specialPropKeyWarningShown) {
          specialPropKeyWarningShown = true;
          warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, 'key', {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }

    function defineRefPropWarningGetter(props, displayName) {
      var warnAboutAccessingRef = function warnAboutAccessingRef() {
        if (!specialPropRefWarningShown) {
          specialPropRefWarningShown = true;
          warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
        }
      };
      warnAboutAccessingRef.isReactWarning = true;
      Object.defineProperty(props, 'ref', {
        get: warnAboutAccessingRef,
        configurable: true
      });
    }

    /**
     * Factory method to create a new React element. This no longer adheres to
     * the class pattern, so do not use new to call it. Also, no instanceof check
     * will work. Instead test $$typeof field against Symbol.for('react.element') to check
     * if something is a React Element.
     *
     * @param {*} type
     * @param {*} key
     * @param {string|object} ref
     * @param {*} self A *temporary* helper to detect places where `this` is
     * different from the `owner` when React.createElement is called, so that we
     * can warn. We want to get rid of owner and replace string `ref`s with arrow
     * functions, and as long as `this` and owner are the same, there will be no
     * change in behavior.
     * @param {*} source An annotation object (added by a transpiler or otherwise)
     * indicating filename, line number, and/or other information.
     * @param {*} owner
     * @param {*} props
     * @internal
     */
    var ReactElement = function ReactElement(type, key, ref, self, source, owner, props) {
      var element = {
        // This tag allow us to uniquely identify this as a React Element
        $$typeof: REACT_ELEMENT_TYPE,

        // Built-in properties that belong on the element
        type: type,
        key: key,
        ref: ref,
        props: props,

        // Record the component responsible for creating this element.
        _owner: owner
      };

      {
        // The validation flag is currently mutative. We put it on
        // an external backing store so that we can freeze the whole object.
        // This can be replaced with a WeakMap once they are implemented in
        // commonly used development environments.
        element._store = {};

        // To make comparing ReactElements easier for testing purposes, we make
        // the validation flag non-enumerable (where possible, which should
        // include every environment we run tests in), so the test framework
        // ignores it.
        Object.defineProperty(element._store, 'validated', {
          configurable: false,
          enumerable: false,
          writable: true,
          value: false
        });
        // self and source are DEV only properties.
        Object.defineProperty(element, '_self', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: self
        });
        // Two elements created in two different places should be considered
        // equal for testing purposes and therefore we hide it from enumeration.
        Object.defineProperty(element, '_source', {
          configurable: false,
          enumerable: false,
          writable: false,
          value: source
        });
        if (Object.freeze) {
          Object.freeze(element.props);
          Object.freeze(element);
        }
      }

      return element;
    };

    /**
     * Create and return a new ReactElement of the given type.
     * See https://reactjs.org/docs/react-api.html#createelement
     */
    function createElement(type, config, children) {
      var propName;

      // Reserved names are extracted
      var props = {};

      var key = null;
      var ref = null;
      var self = null;
      var source = null;

      if (config != null) {
        if (hasValidRef(config)) {
          ref = config.ref;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        self = config.__self === undefined ? null : config.__self;
        source = config.__source === undefined ? null : config.__source;
        // Remaining properties are added to a new props object
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            props[propName] = config[propName];
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        {
          if (Object.freeze) {
            Object.freeze(childArray);
          }
        }
        props.children = childArray;
      }

      // Resolve default props
      if (type && type.defaultProps) {
        var defaultProps = type.defaultProps;
        for (propName in defaultProps) {
          if (props[propName] === undefined) {
            props[propName] = defaultProps[propName];
          }
        }
      }
      {
        if (key || ref) {
          if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
            var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
        }
      }
      return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
    }

    /**
     * Return a function that produces ReactElements of a given type.
     * See https://reactjs.org/docs/react-api.html#createfactory
     */

    function cloneAndReplaceKey(oldElement, newKey) {
      var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

      return newElement;
    }

    /**
     * Clone and return a new ReactElement using element as the starting point.
     * See https://reactjs.org/docs/react-api.html#cloneelement
     */
    function cloneElement(element, config, children) {
      var propName;

      // Original props are copied
      var props = _assign({}, element.props);

      // Reserved names are extracted
      var key = element.key;
      var ref = element.ref;
      // Self is preserved since the owner is preserved.
      var self = element._self;
      // Source is preserved since cloneElement is unlikely to be targeted by a
      // transpiler, and the original source is probably a better indicator of the
      // true owner.
      var source = element._source;

      // Owner will be preserved, unless ref is overridden
      var owner = element._owner;

      if (config != null) {
        if (hasValidRef(config)) {
          // Silently steal the ref from the parent.
          ref = config.ref;
          owner = ReactCurrentOwner.current;
        }
        if (hasValidKey(config)) {
          key = '' + config.key;
        }

        // Remaining properties override existing props
        var defaultProps;
        if (element.type && element.type.defaultProps) {
          defaultProps = element.type.defaultProps;
        }
        for (propName in config) {
          if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
            if (config[propName] === undefined && defaultProps !== undefined) {
              // Resolve default props
              props[propName] = defaultProps[propName];
            } else {
              props[propName] = config[propName];
            }
          }
        }
      }

      // Children can be more than one argument, and those are transferred onto
      // the newly allocated props object.
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1) {
        props.children = children;
      } else if (childrenLength > 1) {
        var childArray = Array(childrenLength);
        for (var i = 0; i < childrenLength; i++) {
          childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
      }

      return ReactElement(element.type, key, ref, self, source, owner, props);
    }

    /**
     * Verifies the object is a ReactElement.
     * See https://reactjs.org/docs/react-api.html#isvalidelement
     * @param {?object} object
     * @return {boolean} True if `object` is a valid component.
     * @final
     */
    function isValidElement(object) {
      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }

    var ReactDebugCurrentFrame = {};

    {
      // Component that is being worked on
      ReactDebugCurrentFrame.getCurrentStack = null;

      ReactDebugCurrentFrame.getStackAddendum = function () {
        var impl = ReactDebugCurrentFrame.getCurrentStack;
        if (impl) {
          return impl();
        }
        return null;
      };
    }

    var SEPARATOR = '.';
    var SUBSEPARATOR = ':';

    /**
     * Escape and wrap key so it is safe to use as a reactid
     *
     * @param {string} key to be escaped.
     * @return {string} the escaped key.
     */
    function escape(key) {
      var escapeRegex = /[=:]/g;
      var escaperLookup = {
        '=': '=0',
        ':': '=2'
      };
      var escapedString = ('' + key).replace(escapeRegex, function (match) {
        return escaperLookup[match];
      });

      return '$' + escapedString;
    }

    /**
     * TODO: Test that a single child and an array with one item have the same key
     * pattern.
     */

    var didWarnAboutMaps = false;

    var userProvidedKeyEscapeRegex = /\/+/g;
    function escapeUserProvidedKey(text) {
      return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
    }

    var POOL_SIZE = 10;
    var traverseContextPool = [];
    function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
      if (traverseContextPool.length) {
        var traverseContext = traverseContextPool.pop();
        traverseContext.result = mapResult;
        traverseContext.keyPrefix = keyPrefix;
        traverseContext.func = mapFunction;
        traverseContext.context = mapContext;
        traverseContext.count = 0;
        return traverseContext;
      } else {
        return {
          result: mapResult,
          keyPrefix: keyPrefix,
          func: mapFunction,
          context: mapContext,
          count: 0
        };
      }
    }

    function releaseTraverseContext(traverseContext) {
      traverseContext.result = null;
      traverseContext.keyPrefix = null;
      traverseContext.func = null;
      traverseContext.context = null;
      traverseContext.count = 0;
      if (traverseContextPool.length < POOL_SIZE) {
        traverseContextPool.push(traverseContext);
      }
    }

    /**
     * @param {?*} children Children tree container.
     * @param {!string} nameSoFar Name of the key path so far.
     * @param {!function} callback Callback to invoke with each child found.
     * @param {?*} traverseContext Used to pass information throughout the traversal
     * process.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
      var type = typeof children === 'undefined' ? 'undefined' : _typeof(children);

      if (type === 'undefined' || type === 'boolean') {
        // All of the above are perceived as null.
        children = null;
      }

      var invokeCallback = false;

      if (children === null) {
        invokeCallback = true;
      } else {
        switch (type) {
          case 'string':
          case 'number':
            invokeCallback = true;
            break;
          case 'object':
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_CALL_TYPE:
              case REACT_RETURN_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
            }
        }
      }

      if (invokeCallback) {
        callback(traverseContext, children,
        // If it's the only child, treat the name as if it was wrapped in an array
        // so that it's consistent if the number of children grows.
        nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
        return 1;
      }

      var child;
      var nextName;
      var subtreeCount = 0; // Count of children found in the current subtree.
      var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

      if (Array.isArray(children)) {
        for (var i = 0; i < children.length; i++) {
          child = children[i];
          nextName = nextNamePrefix + getComponentKey(child, i);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        var iteratorFn = getIteratorFn(children);
        if (typeof iteratorFn === 'function') {
          {
            // Warn about using Maps as children
            if (iteratorFn === children.entries) {
              warning(didWarnAboutMaps, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.%s', ReactDebugCurrentFrame.getStackAddendum());
              didWarnAboutMaps = true;
            }
          }

          var iterator = iteratorFn.call(children);
          var step;
          var ii = 0;
          while (!(step = iterator.next()).done) {
            child = step.value;
            nextName = nextNamePrefix + getComponentKey(child, ii++);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        } else if (type === 'object') {
          var addendum = '';
          {
            addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
          }
          var childrenString = '' + children;
          invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
        }
      }

      return subtreeCount;
    }

    /**
     * Traverses children that are typically specified as `props.children`, but
     * might also be specified through attributes:
     *
     * - `traverseAllChildren(this.props.children, ...)`
     * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
     *
     * The `traverseContext` is an optional argument that is passed through the
     * entire traversal. It can be used to store accumulations or anything else that
     * the callback might find relevant.
     *
     * @param {?*} children Children tree object.
     * @param {!function} callback To invoke upon traversing each child.
     * @param {?*} traverseContext Context for traversal.
     * @return {!number} The number of children in this subtree.
     */
    function traverseAllChildren(children, callback, traverseContext) {
      if (children == null) {
        return 0;
      }

      return traverseAllChildrenImpl(children, '', callback, traverseContext);
    }

    /**
     * Generate a key string that identifies a component within a set.
     *
     * @param {*} component A component that could contain a manual key.
     * @param {number} index Index that is used if a manual key is not provided.
     * @return {string}
     */
    function getComponentKey(component, index) {
      // Do some typechecking here since we call this blindly. We want to ensure
      // that we don't block potential future ES APIs.
      if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object' && component !== null && component.key != null) {
        // Explicit key
        return escape(component.key);
      }
      // Implicit key determined by the index in the set
      return index.toString(36);
    }

    function forEachSingleChild(bookKeeping, child, name) {
      var func = bookKeeping.func,
          context = bookKeeping.context;

      func.call(context, child, bookKeeping.count++);
    }

    /**
     * Iterates through children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.foreach
     *
     * The provided forEachFunc(child, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} forEachFunc
     * @param {*} forEachContext Context for forEachContext.
     */
    function forEachChildren(children, forEachFunc, forEachContext) {
      if (children == null) {
        return children;
      }
      var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
      traverseAllChildren(children, forEachSingleChild, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    function mapSingleChildIntoContext(bookKeeping, child, childKey) {
      var result = bookKeeping.result,
          keyPrefix = bookKeeping.keyPrefix,
          func = bookKeeping.func,
          context = bookKeeping.context;

      var mappedChild = func.call(context, child, bookKeeping.count++);
      if (Array.isArray(mappedChild)) {
        mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
      } else if (mappedChild != null) {
        if (isValidElement(mappedChild)) {
          mappedChild = cloneAndReplaceKey(mappedChild,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
        }
        result.push(mappedChild);
      }
    }

    function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
      var escapedPrefix = '';
      if (prefix != null) {
        escapedPrefix = escapeUserProvidedKey(prefix) + '/';
      }
      var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
      traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
      releaseTraverseContext(traverseContext);
    }

    /**
     * Maps children that are typically specified as `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.map
     *
     * The provided mapFunction(child, key, index) will be called for each
     * leaf child.
     *
     * @param {?*} children Children tree container.
     * @param {function(*, int)} func The map function.
     * @param {*} context Context for mapFunction.
     * @return {object} Object containing the ordered map of results.
     */
    function mapChildren(children, func, context) {
      if (children == null) {
        return children;
      }
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, func, context);
      return result;
    }

    /**
     * Count the number of children that are typically specified as
     * `props.children`.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.count
     *
     * @param {?*} children Children tree container.
     * @return {number} The number of children.
     */
    function countChildren(children, context) {
      return traverseAllChildren(children, emptyFunction.thatReturnsNull, null);
    }

    /**
     * Flatten a children object (typically specified as `props.children`) and
     * return an array with appropriately re-keyed children.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.toarray
     */
    function toArray(children) {
      var result = [];
      mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
      return result;
    }

    /**
     * Returns the first child in a collection of children and verifies that there
     * is only one child in the collection.
     *
     * See https://reactjs.org/docs/react-api.html#react.children.only
     *
     * The current implementation of this function assumes that a single child gets
     * passed without a wrapper, but the purpose of this helper function is to
     * abstract away the particular structure of children.
     *
     * @param {?object} children Child collection structure.
     * @return {ReactElement} The first and only `ReactElement` contained in the
     * structure.
     */
    function onlyChild(children) {
      !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
      return children;
    }

    var describeComponentFrame = function describeComponentFrame(name, source, ownerName) {
      return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
    };

    function getComponentName(fiber) {
      var type = fiber.type;

      if (typeof type === 'string') {
        return type;
      }
      if (typeof type === 'function') {
        return type.displayName || type.name;
      }
      return null;
    }

    /**
     * ReactElementValidator provides a wrapper around a element factory
     * which validates the props passed to the element. This is intended to be
     * used only in DEV and could be replaced by a static type checker for languages
     * that support it.
     */

    {
      var currentlyValidatingElement = null;

      var propTypesMisspellWarningShown = false;

      var getDisplayName = function getDisplayName(element) {
        if (element == null) {
          return '#empty';
        } else if (typeof element === 'string' || typeof element === 'number') {
          return '#text';
        } else if (typeof element.type === 'string') {
          return element.type;
        } else if (element.type === REACT_FRAGMENT_TYPE) {
          return 'React.Fragment';
        } else {
          return element.type.displayName || element.type.name || 'Unknown';
        }
      };

      var getStackAddendum = function getStackAddendum() {
        var stack = '';
        if (currentlyValidatingElement) {
          var name = getDisplayName(currentlyValidatingElement);
          var owner = currentlyValidatingElement._owner;
          stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner));
        }
        stack += ReactDebugCurrentFrame.getStackAddendum() || '';
        return stack;
      };

      var VALID_FRAGMENT_PROPS = new Map([['children', true], ['key', true]]);
    }

    function getDeclarationErrorAddendum() {
      if (ReactCurrentOwner.current) {
        var name = getComponentName(ReactCurrentOwner.current);
        if (name) {
          return '\n\nCheck the render method of `' + name + '`.';
        }
      }
      return '';
    }

    function getSourceInfoErrorAddendum(elementProps) {
      if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
        var source = elementProps.__source;
        var fileName = source.fileName.replace(/^.*[\\\/]/, '');
        var lineNumber = source.lineNumber;
        return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
      }
      return '';
    }

    /**
     * Warn if there's no key explicitly set on dynamic arrays of children or
     * object keys are not valid. This allows us to keep track of children between
     * updates.
     */
    var ownerHasKeyUseWarning = {};

    function getCurrentComponentErrorInfo(parentType) {
      var info = getDeclarationErrorAddendum();

      if (!info) {
        var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
        if (parentName) {
          info = '\n\nCheck the top-level render call using <' + parentName + '>.';
        }
      }
      return info;
    }

    /**
     * Warn if the element doesn't have an explicit key assigned to it.
     * This element is in an array. The array could grow and shrink or be
     * reordered. All children that haven't already been validated are required to
     * have a "key" property assigned to it. Error statuses are cached so a warning
     * will only be shown once.
     *
     * @internal
     * @param {ReactElement} element Element that requires a key.
     * @param {*} parentType element's parent's type.
     */
    function validateExplicitKey(element, parentType) {
      if (!element._store || element._store.validated || element.key != null) {
        return;
      }
      element._store.validated = true;

      var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
      if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
        return;
      }
      ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

      // Usually the current owner is the offender, but if it accepts children as a
      // property, it may be the creator of the child that's responsible for
      // assigning it a key.
      var childOwner = '';
      if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
        // Give the component that originally created this child.
        childOwner = ' It was passed a child from ' + getComponentName(element._owner) + '.';
      }

      currentlyValidatingElement = element;
      {
        warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, getStackAddendum());
      }
      currentlyValidatingElement = null;
    }

    /**
     * Ensure that every element either is passed in a static location, in an
     * array with an explicit keys property defined, or in an object literal
     * with valid key property.
     *
     * @internal
     * @param {ReactNode} node Statically passed child of any type.
     * @param {*} parentType node's parent's type.
     */
    function validateChildKeys(node, parentType) {
      if ((typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object') {
        return;
      }
      if (Array.isArray(node)) {
        for (var i = 0; i < node.length; i++) {
          var child = node[i];
          if (isValidElement(child)) {
            validateExplicitKey(child, parentType);
          }
        }
      } else if (isValidElement(node)) {
        // This element was passed in a valid location.
        if (node._store) {
          node._store.validated = true;
        }
      } else if (node) {
        var iteratorFn = getIteratorFn(node);
        if (typeof iteratorFn === 'function') {
          // Entry iterators used to provide implicit keys,
          // but now we print a separate warning for them later.
          if (iteratorFn !== node.entries) {
            var iterator = iteratorFn.call(node);
            var step;
            while (!(step = iterator.next()).done) {
              if (isValidElement(step.value)) {
                validateExplicitKey(step.value, parentType);
              }
            }
          }
        }
      }
    }

    /**
     * Given an element, validate that its props follow the propTypes definition,
     * provided by the type.
     *
     * @param {ReactElement} element
     */
    function validatePropTypes(element) {
      var componentClass = element.type;
      if (typeof componentClass !== 'function') {
        return;
      }
      var name = componentClass.displayName || componentClass.name;
      var propTypes = componentClass.propTypes;
      if (propTypes) {
        currentlyValidatingElement = element;
        checkPropTypes(propTypes, element.props, 'prop', name, getStackAddendum);
        currentlyValidatingElement = null;
      } else if (componentClass.PropTypes !== undefined && !propTypesMisspellWarningShown) {
        propTypesMisspellWarningShown = true;
        warning(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
      }
      if (typeof componentClass.getDefaultProps === 'function') {
        warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
      }
    }

    /**
     * Given a fragment, validate that it can only be provided with fragment props
     * @param {ReactElement} fragment
     */
    function validateFragmentProps(fragment) {
      currentlyValidatingElement = fragment;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(fragment.props)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (!VALID_FRAGMENT_PROPS.has(key)) {
            warning(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.%s', key, getStackAddendum());
            break;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      if (fragment.ref !== null) {
        warning(false, 'Invalid attribute `ref` supplied to `React.Fragment`.%s', getStackAddendum());
      }

      currentlyValidatingElement = null;
    }

    function createElementWithValidation(type, props, children) {
      var validType = typeof type === 'string' || typeof type === 'function' || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' || typeof type === 'number';
      // We warn in this case but don't throw. We expect the element creation to
      // succeed and there will likely be errors in render.
      if (!validType) {
        var info = '';
        if (type === undefined || (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
        }

        var sourceInfo = getSourceInfoErrorAddendum(props);
        if (sourceInfo) {
          info += sourceInfo;
        } else {
          info += getDeclarationErrorAddendum();
        }

        info += getStackAddendum() || '';

        warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type === 'undefined' ? 'undefined' : _typeof(type), info);
      }

      var element = createElement.apply(this, arguments);

      // The result can be nullish if a mock or a custom function is used.
      // TODO: Drop this when these are no longer allowed as the type argument.
      if (element == null) {
        return element;
      }

      // Skip key warning if the type isn't valid since our key validation logic
      // doesn't expect a non-string/function type and can throw confusing errors.
      // We don't want exception behavior to differ between dev and prod.
      // (Rendering will throw with a helpful message and as soon as the type is
      // fixed, the key warnings will appear.)
      if (validType) {
        for (var i = 2; i < arguments.length; i++) {
          validateChildKeys(arguments[i], type);
        }
      }

      if ((typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'symbol' && type === REACT_FRAGMENT_TYPE) {
        validateFragmentProps(element);
      } else {
        validatePropTypes(element);
      }

      return element;
    }

    function createFactoryWithValidation(type) {
      var validatedFactory = createElementWithValidation.bind(null, type);
      // Legacy hook TODO: Warn if this is accessed
      validatedFactory.type = type;

      {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function get() {
            lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }

      return validatedFactory;
    }

    function cloneElementWithValidation(element, props, children) {
      var newElement = cloneElement.apply(this, arguments);
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], newElement.type);
      }
      validatePropTypes(newElement);
      return newElement;
    }

    var React = {
      Children: {
        map: mapChildren,
        forEach: forEachChildren,
        count: countChildren,
        toArray: toArray,
        only: onlyChild
      },

      Component: Component,
      PureComponent: PureComponent,
      unstable_AsyncComponent: AsyncComponent,

      Fragment: REACT_FRAGMENT_TYPE,

      createElement: createElementWithValidation,
      cloneElement: cloneElementWithValidation,
      createFactory: createFactoryWithValidation,
      isValidElement: isValidElement,

      version: ReactVersion,

      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        ReactCurrentOwner: ReactCurrentOwner,
        // Used by renderers to avoid bundling object-assign twice in UMD bundles:
        assign: _assign
      }
    };

    {
      _assign(React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
        // These should not be included in production.
        ReactDebugCurrentFrame: ReactDebugCurrentFrame,
        // Shim for React DOM 16.0.0 which still destructured (but not used) this.
        // TODO: remove in React 17.0.
        ReactComponentTreeHook: {}
      });
    }

    var React$2 = Object.freeze({
      default: React
    });

    var React$3 = React$2 && React || React$2;

    // TODO: decide on the top-level export form.
    // This is hacky but makes it work with both Rollup and Jest.
    var react = React$3['default'] ? React$3['default'] : React$3;

    module.exports = react;
  })();
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(47);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */

var assign = __webpack_require__(1).assign;
var Renderer = __webpack_require__(48);
var ParserCore = __webpack_require__(50);
var ParserBlock = __webpack_require__(61);
var ParserInline = __webpack_require__(76);
var Ruler = __webpack_require__(8);

/**
 * Preset configs
 */

var config = {
  'default': __webpack_require__(95),
  'full': __webpack_require__(96),
  'commonmark': __webpack_require__(97)
};

/**
 * The `StateCore` class manages state.
 *
 * @param {Object} `instance` Remarkable instance
 * @param {String} `str` Markdown string
 * @param {Object} `env`
 */

function StateCore(instance, str, env) {
  this.src = str;
  this.env = env;
  this.options = instance.options;
  this.tokens = [];
  this.inlineMode = false;

  this.inline = instance.inline;
  this.block = instance.block;
  this.renderer = instance.renderer;
  this.typographer = instance.typographer;
}

/**
 * The main `Remarkable` class. Create an instance of
 * `Remarkable` with a `preset` and/or `options`.
 *
 * @param {String} `preset` If no preset is given, `default` is used.
 * @param {Object} `options`
 */

function Remarkable(preset, options) {
  if (typeof preset !== 'string') {
    options = preset;
    preset = 'default';
  }

  this.inline = new ParserInline();
  this.block = new ParserBlock();
  this.core = new ParserCore();
  this.renderer = new Renderer();
  this.ruler = new Ruler();

  this.options = {};
  this.configure(config[preset]);
  this.set(options || {});
}

/**
 * Set options as an alternative to passing them
 * to the constructor.
 *
 * ```js
 * md.set({typographer: true});
 * ```
 * @param {Object} `options`
 * @api public
 */

Remarkable.prototype.set = function (options) {
  assign(this.options, options);
};

/**
 * Batch loader for components rules states, and options
 *
 * @param  {Object} `presets`
 */

Remarkable.prototype.configure = function (presets) {
  var self = this;

  if (!presets) {
    throw new Error('Wrong `remarkable` preset, check name/content');
  }
  if (presets.options) {
    self.set(presets.options);
  }
  if (presets.components) {
    Object.keys(presets.components).forEach(function (name) {
      if (presets.components[name].rules) {
        self[name].ruler.enable(presets.components[name].rules, true);
      }
    });
  }
};

/**
 * Use a plugin.
 *
 * ```js
 * var md = new Remarkable();
 *
 * md.use(plugin1)
 *   .use(plugin2, opts)
 *   .use(plugin3);
 * ```
 *
 * @param  {Function} `plugin`
 * @param  {Object} `options`
 * @return {Object} `Remarkable` for chaining
 */

Remarkable.prototype.use = function (plugin, options) {
  plugin(this, options);
  return this;
};

/**
 * Parse the input `string` and return a tokens array.
 * Modifies `env` with definitions data.
 *
 * @param  {String} `string`
 * @param  {Object} `env`
 * @return {Array} Array of tokens
 */

Remarkable.prototype.parse = function (str, env) {
  var state = new StateCore(this, str, env);
  this.core.process(state);
  return state.tokens;
};

/**
 * The main `.render()` method that does all the magic :)
 *
 * @param  {String} `string`
 * @param  {Object} `env`
 * @return {String} Rendered HTML.
 */

Remarkable.prototype.render = function (str, env) {
  env = env || {};
  return this.renderer.render(this.parse(str, env), this.options, env);
};

/**
 * Parse the given content `string` as a single string.
 *
 * @param  {String} `string`
 * @param  {Object} `env`
 * @return {Array} Array of tokens
 */

Remarkable.prototype.parseInline = function (str, env) {
  var state = new StateCore(this, str, env);
  state.inlineMode = true;
  this.core.process(state);
  return state.tokens;
};

/**
 * Render a single content `string`, without wrapping it
 * to paragraphs
 *
 * @param  {String} `str`
 * @param  {Object} `env`
 * @return {String}
 */

Remarkable.prototype.renderInline = function (str, env) {
  env = env || {};
  return this.renderer.render(this.parseInline(str, env), this.options, env);
};

/**
 * Expose `Remarkable`
 */

module.exports = Remarkable;

/**
 * Expose `utils`, Useful helper functions for custom
 * rendering.
 */

module.exports.utils = __webpack_require__(1);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */

var utils = __webpack_require__(1);
var rules = __webpack_require__(49);

/**
 * Expose `Renderer`
 */

module.exports = Renderer;

/**
 * Renderer class. Renders HTML and exposes `rules` to allow
 * local modifications.
 */

function Renderer() {
  this.rules = utils.assign({}, rules);

  // exported helper, for custom rules only
  this.getBreak = rules.getBreak;
}

/**
 * Render a string of inline HTML with the given `tokens` and
 * `options`.
 *
 * @param  {Array} `tokens`
 * @param  {Object} `options`
 * @param  {Object} `env`
 * @return {String}
 * @api public
 */

Renderer.prototype.renderInline = function (tokens, options, env) {
  var _rules = this.rules;
  var len = tokens.length,
      i = 0;
  var result = '';

  while (len--) {
    result += _rules[tokens[i].type](tokens, i++, options, env, this);
  }

  return result;
};

/**
 * Render a string of HTML with the given `tokens` and
 * `options`.
 *
 * @param  {Array} `tokens`
 * @param  {Object} `options`
 * @param  {Object} `env`
 * @return {String}
 * @api public
 */

Renderer.prototype.render = function (tokens, options, env) {
  var _rules = this.rules;
  var len = tokens.length,
      i = -1;
  var result = '';

  while (++i < len) {
    if (tokens[i].type === 'inline') {
      result += this.renderInline(tokens[i].children, options, env);
    } else {
      result += _rules[tokens[i].type](tokens, i, options, env, this);
    }
  }
  return result;
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */

var has = __webpack_require__(1).has;
var unescapeMd = __webpack_require__(1).unescapeMd;
var replaceEntities = __webpack_require__(1).replaceEntities;
var escapeHtml = __webpack_require__(1).escapeHtml;

/**
 * Renderer rules cache
 */

var rules = {};

/**
 * Blockquotes
 */

rules.blockquote_open = function () /* tokens, idx, options, env */{
  return '<blockquote>\n';
};

rules.blockquote_close = function (tokens, idx /*, options, env */) {
  return '</blockquote>' + getBreak(tokens, idx);
};

/**
 * Code
 */

rules.code = function (tokens, idx /*, options, env */) {
  if (tokens[idx].block) {
    return '<pre><code>' + escapeHtml(tokens[idx].content) + '</code></pre>' + getBreak(tokens, idx);
  }
  return '<code>' + escapeHtml(tokens[idx].content) + '</code>';
};

/**
 * Fenced code blocks
 */

rules.fence = function (tokens, idx, options, env, instance) {
  var token = tokens[idx];
  var langClass = '';
  var langPrefix = options.langPrefix;
  var langName = '',
      fences,
      fenceName;
  var highlighted;

  if (token.params) {

    //
    // ```foo bar
    //
    // Try custom renderer "foo" first. That will simplify overwrite
    // for diagrams, latex, and any other fenced block with custom look
    //

    fences = token.params.split(/\s+/g);
    fenceName = fences.join(' ');

    if (has(instance.rules.fence_custom, fences[0])) {
      return instance.rules.fence_custom[fences[0]](tokens, idx, options, env, instance);
    }

    langName = escapeHtml(replaceEntities(unescapeMd(fenceName)));
    langClass = ' class="' + langPrefix + langName + '"';
  }

  if (options.highlight) {
    highlighted = options.highlight.apply(options.highlight, [token.content].concat(fences)) || escapeHtml(token.content);
  } else {
    highlighted = escapeHtml(token.content);
  }

  return '<pre><code' + langClass + '>' + highlighted + '</code></pre>' + getBreak(tokens, idx);
};

rules.fence_custom = {};

/**
 * Headings
 */

rules.heading_open = function (tokens, idx /*, options, env */) {
  return '<h' + tokens[idx].hLevel + '>';
};
rules.heading_close = function (tokens, idx /*, options, env */) {
  return '</h' + tokens[idx].hLevel + '>\n';
};

/**
 * Horizontal rules
 */

rules.hr = function (tokens, idx, options /*, env */) {
  return (options.xhtmlOut ? '<hr />' : '<hr>') + getBreak(tokens, idx);
};

/**
 * Bullets
 */

rules.bullet_list_open = function () /* tokens, idx, options, env */{
  return '<ul>\n';
};
rules.bullet_list_close = function (tokens, idx /*, options, env */) {
  return '</ul>' + getBreak(tokens, idx);
};

/**
 * List items
 */

rules.list_item_open = function () /* tokens, idx, options, env */{
  return '<li>';
};
rules.list_item_close = function () /* tokens, idx, options, env */{
  return '</li>\n';
};

/**
 * Ordered list items
 */

rules.ordered_list_open = function (tokens, idx /*, options, env */) {
  var token = tokens[idx];
  var order = token.order > 1 ? ' start="' + token.order + '"' : '';
  return '<ol' + order + '>\n';
};
rules.ordered_list_close = function (tokens, idx /*, options, env */) {
  return '</ol>' + getBreak(tokens, idx);
};

/**
 * Paragraphs
 */

rules.paragraph_open = function (tokens, idx /*, options, env */) {
  return tokens[idx].tight ? '' : '<p>';
};
rules.paragraph_close = function (tokens, idx /*, options, env */) {
  var addBreak = !(tokens[idx].tight && idx && tokens[idx - 1].type === 'inline' && !tokens[idx - 1].content);
  return (tokens[idx].tight ? '' : '</p>') + (addBreak ? getBreak(tokens, idx) : '');
};

/**
 * Links
 */

rules.link_open = function (tokens, idx, options /* env */) {
  var title = tokens[idx].title ? ' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"' : '';
  var target = options.linkTarget ? ' target="' + options.linkTarget + '"' : '';
  return '<a href="' + escapeHtml(tokens[idx].href) + '"' + title + target + '>';
};
rules.link_close = function () /* tokens, idx, options, env */{
  return '</a>';
};

/**
 * Images
 */

rules.image = function (tokens, idx, options /*, env */) {
  var src = ' src="' + escapeHtml(tokens[idx].src) + '"';
  var title = tokens[idx].title ? ' title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '"' : '';
  var alt = ' alt="' + (tokens[idx].alt ? escapeHtml(replaceEntities(unescapeMd(tokens[idx].alt))) : '') + '"';
  var suffix = options.xhtmlOut ? ' /' : '';
  return '<img' + src + alt + title + suffix + '>';
};

/**
 * Tables
 */

rules.table_open = function () /* tokens, idx, options, env */{
  return '<table>\n';
};
rules.table_close = function () /* tokens, idx, options, env */{
  return '</table>\n';
};
rules.thead_open = function () /* tokens, idx, options, env */{
  return '<thead>\n';
};
rules.thead_close = function () /* tokens, idx, options, env */{
  return '</thead>\n';
};
rules.tbody_open = function () /* tokens, idx, options, env */{
  return '<tbody>\n';
};
rules.tbody_close = function () /* tokens, idx, options, env */{
  return '</tbody>\n';
};
rules.tr_open = function () /* tokens, idx, options, env */{
  return '<tr>';
};
rules.tr_close = function () /* tokens, idx, options, env */{
  return '</tr>\n';
};
rules.th_open = function (tokens, idx /*, options, env */) {
  var token = tokens[idx];
  return '<th' + (token.align ? ' style="text-align:' + token.align + '"' : '') + '>';
};
rules.th_close = function () /* tokens, idx, options, env */{
  return '</th>';
};
rules.td_open = function (tokens, idx /*, options, env */) {
  var token = tokens[idx];
  return '<td' + (token.align ? ' style="text-align:' + token.align + '"' : '') + '>';
};
rules.td_close = function () /* tokens, idx, options, env */{
  return '</td>';
};

/**
 * Bold
 */

rules.strong_open = function () /* tokens, idx, options, env */{
  return '<strong>';
};
rules.strong_close = function () /* tokens, idx, options, env */{
  return '</strong>';
};

/**
 * Italicize
 */

rules.em_open = function () /* tokens, idx, options, env */{
  return '<em>';
};
rules.em_close = function () /* tokens, idx, options, env */{
  return '</em>';
};

/**
 * Strikethrough
 */

rules.del_open = function () /* tokens, idx, options, env */{
  return '<del>';
};
rules.del_close = function () /* tokens, idx, options, env */{
  return '</del>';
};

/**
 * Insert
 */

rules.ins_open = function () /* tokens, idx, options, env */{
  return '<ins>';
};
rules.ins_close = function () /* tokens, idx, options, env */{
  return '</ins>';
};

/**
 * Highlight
 */

rules.mark_open = function () /* tokens, idx, options, env */{
  return '<mark>';
};
rules.mark_close = function () /* tokens, idx, options, env */{
  return '</mark>';
};

/**
 * Super- and sub-script
 */

rules.sub = function (tokens, idx /*, options, env */) {
  return '<sub>' + escapeHtml(tokens[idx].content) + '</sub>';
};
rules.sup = function (tokens, idx /*, options, env */) {
  return '<sup>' + escapeHtml(tokens[idx].content) + '</sup>';
};

/**
 * Breaks
 */

rules.hardbreak = function (tokens, idx, options /*, env */) {
  return options.xhtmlOut ? '<br />\n' : '<br>\n';
};
rules.softbreak = function (tokens, idx, options /*, env */) {
  return options.breaks ? options.xhtmlOut ? '<br />\n' : '<br>\n' : '\n';
};

/**
 * Text
 */

rules.text = function (tokens, idx /*, options, env */) {
  return escapeHtml(tokens[idx].content);
};

/**
 * Content
 */

rules.htmlblock = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};
rules.htmltag = function (tokens, idx /*, options, env */) {
  return tokens[idx].content;
};

/**
 * Abbreviations, initialism
 */

rules.abbr_open = function (tokens, idx /*, options, env */) {
  return '<abbr title="' + escapeHtml(replaceEntities(tokens[idx].title)) + '">';
};
rules.abbr_close = function () /* tokens, idx, options, env */{
  return '</abbr>';
};

/**
 * Footnotes
 */

rules.footnote_ref = function (tokens, idx) {
  var n = Number(tokens[idx].id + 1).toString();
  var id = 'fnref' + n;
  if (tokens[idx].subId > 0) {
    id += ':' + tokens[idx].subId;
  }
  return '<sup class="footnote-ref"><a href="#fn' + n + '" id="' + id + '">[' + n + ']</a></sup>';
};
rules.footnote_block_open = function (tokens, idx, options) {
  var hr = options.xhtmlOut ? '<hr class="footnotes-sep" />\n' : '<hr class="footnotes-sep">\n';
  return hr + '<section class="footnotes">\n<ol class="footnotes-list">\n';
};
rules.footnote_block_close = function () {
  return '</ol>\n</section>\n';
};
rules.footnote_open = function (tokens, idx) {
  var id = Number(tokens[idx].id + 1).toString();
  return '<li id="fn' + id + '"  class="footnote-item">';
};
rules.footnote_close = function () {
  return '</li>\n';
};
rules.footnote_anchor = function (tokens, idx) {
  var n = Number(tokens[idx].id + 1).toString();
  var id = 'fnref' + n;
  if (tokens[idx].subId > 0) {
    id += ':' + tokens[idx].subId;
  }
  return ' <a href="#' + id + '" class="footnote-backref">↩</a>';
};

/**
 * Definition lists
 */

rules.dl_open = function () {
  return '<dl>\n';
};
rules.dt_open = function () {
  return '<dt>';
};
rules.dd_open = function () {
  return '<dd>';
};
rules.dl_close = function () {
  return '</dl>\n';
};
rules.dt_close = function () {
  return '</dt>\n';
};
rules.dd_close = function () {
  return '</dd>\n';
};

/**
 * Helper functions
 */

function nextToken(tokens, idx) {
  if (++idx >= tokens.length - 2) {
    return idx;
  }
  if (tokens[idx].type === 'paragraph_open' && tokens[idx].tight && tokens[idx + 1].type === 'inline' && tokens[idx + 1].content.length === 0 && tokens[idx + 2].type === 'paragraph_close' && tokens[idx + 2].tight) {
    return nextToken(tokens, idx + 2);
  }
  return idx;
}

/**
 * Check to see if `\n` is needed before the next token.
 *
 * @param  {Array} `tokens`
 * @param  {Number} `idx`
 * @return {String} Empty string or newline
 * @api private
 */

var getBreak = rules.getBreak = function getBreak(tokens, idx) {
  idx = nextToken(tokens, idx);
  if (idx < tokens.length && tokens[idx].type === 'list_item_close') {
    return '';
  }
  return '\n';
};

/**
 * Expose `rules`
 */

module.exports = rules;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */

var Ruler = __webpack_require__(8);

/**
 * Core parser `rules`
 */

var _rules = [['block', __webpack_require__(51)], ['abbr', __webpack_require__(52)], ['references', __webpack_require__(53)], ['inline', __webpack_require__(54)], ['footnote_tail', __webpack_require__(55)], ['abbr2', __webpack_require__(56)], ['replacements', __webpack_require__(57)], ['smartquotes', __webpack_require__(58)], ['linkify', __webpack_require__(59)]];

/**
 * Class for top level (`core`) parser rules
 *
 * @api private
 */

function Core() {
  this.options = {};
  this.ruler = new Ruler();
  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }
}

/**
 * Process rules with the given `state`
 *
 * @param  {Object} `state`
 * @api private
 */

Core.prototype.process = function (state) {
  var i, l, rules;
  rules = this.ruler.getRules('');
  for (i = 0, l = rules.length; i < l; i++) {
    rules[i](state);
  }
};

/**
 * Expose `Core`
 */

module.exports = Core;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function block(state) {

  if (state.inlineMode) {
    state.tokens.push({
      type: 'inline',
      content: state.src.replace(/\n/g, ' ').trim(),
      level: 0,
      lines: [0, 1],
      children: []
    });
  } else {
    state.block.parse(state.src, state.options, state.env, state.tokens);
  }
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parse abbreviation definitions, i.e. `*[abbr]: description`
//



var StateInline = __webpack_require__(16);
var parseLinkLabel = __webpack_require__(9);

function parseAbbr(str, parserInline, options, env) {
  var state, labelEnd, pos, max, label, title;

  if (str.charCodeAt(0) !== 0x2A /* * */) {
      return -1;
    }
  if (str.charCodeAt(1) !== 0x5B /* [ */) {
      return -1;
    }

  if (str.indexOf(']:') === -1) {
    return -1;
  }

  state = new StateInline(str, parserInline, options, env, []);
  labelEnd = parseLinkLabel(state, 1);

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A /* : */) {
      return -1;
    }

  max = state.posMax;

  // abbr title is always one line, so looking for ending "\n" here
  for (pos = labelEnd + 2; pos < max; pos++) {
    if (state.src.charCodeAt(pos) === 0x0A) {
      break;
    }
  }

  label = str.slice(2, labelEnd);
  title = str.slice(labelEnd + 2, pos).trim();
  if (title.length === 0) {
    return -1;
  }
  if (!env.abbreviations) {
    env.abbreviations = {};
  }
  // prepend ':' to avoid conflict with Object.prototype members
  if (typeof env.abbreviations[':' + label] === 'undefined') {
    env.abbreviations[':' + label] = title;
  }

  return pos;
}

module.exports = function abbr(state) {
  var tokens = state.tokens,
      i,
      l,
      content,
      pos;

  if (state.inlineMode) {
    return;
  }

  // Parse inlines
  for (i = 1, l = tokens.length - 1; i < l; i++) {
    if (tokens[i - 1].type === 'paragraph_open' && tokens[i].type === 'inline' && tokens[i + 1].type === 'paragraph_close') {

      content = tokens[i].content;
      while (content.length) {
        pos = parseAbbr(content, state.inline, state.options, state.env);
        if (pos < 0) {
          break;
        }
        content = content.slice(pos).trim();
      }

      tokens[i].content = content;
      if (!content.length) {
        tokens[i - 1].tight = true;
        tokens[i + 1].tight = true;
      }
    }
  }
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var StateInline = __webpack_require__(16);
var parseLinkLabel = __webpack_require__(9);
var parseLinkDestination = __webpack_require__(25);
var parseLinkTitle = __webpack_require__(27);
var normalizeReference = __webpack_require__(28);

function parseReference(str, parser, options, env) {
  var state, labelEnd, pos, max, code, start, href, title, label;

  if (str.charCodeAt(0) !== 0x5B /* [ */) {
      return -1;
    }

  if (str.indexOf(']:') === -1) {
    return -1;
  }

  state = new StateInline(str, parser, options, env, []);
  labelEnd = parseLinkLabel(state, 0);

  if (labelEnd < 0 || str.charCodeAt(labelEnd + 1) !== 0x3A /* : */) {
      return -1;
    }

  max = state.posMax;

  // [label]:   destination   'title'
  //         ^^^ skip optional whitespace here
  for (pos = labelEnd + 2; pos < max; pos++) {
    code = state.src.charCodeAt(pos);
    if (code !== 0x20 && code !== 0x0A) {
      break;
    }
  }

  // [label]:   destination   'title'
  //            ^^^^^^^^^^^ parse this
  if (!parseLinkDestination(state, pos)) {
    return -1;
  }
  href = state.linkContent;
  pos = state.pos;

  // [label]:   destination   'title'
  //                       ^^^ skipping those spaces
  start = pos;
  for (pos = pos + 1; pos < max; pos++) {
    code = state.src.charCodeAt(pos);
    if (code !== 0x20 && code !== 0x0A) {
      break;
    }
  }

  // [label]:   destination   'title'
  //                          ^^^^^^^ parse this
  if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
    title = state.linkContent;
    pos = state.pos;
  } else {
    title = '';
    pos = start;
  }

  // ensure that the end of the line is empty
  while (pos < max && state.src.charCodeAt(pos) === 0x20 /* space */) {
    pos++;
  }
  if (pos < max && state.src.charCodeAt(pos) !== 0x0A) {
    return -1;
  }

  label = normalizeReference(str.slice(1, labelEnd));
  if (typeof env.references[label] === 'undefined') {
    env.references[label] = { title: title, href: href };
  }

  return pos;
}

module.exports = function references(state) {
  var tokens = state.tokens,
      i,
      l,
      content,
      pos;

  state.env.references = state.env.references || {};

  if (state.inlineMode) {
    return;
  }

  // Scan definitions in paragraph inlines
  for (i = 1, l = tokens.length - 1; i < l; i++) {
    if (tokens[i].type === 'inline' && tokens[i - 1].type === 'paragraph_open' && tokens[i + 1].type === 'paragraph_close') {

      content = tokens[i].content;
      while (content.length) {
        pos = parseReference(content, state.inline, state.options, state.env);
        if (pos < 0) {
          break;
        }
        content = content.slice(pos).trim();
      }

      tokens[i].content = content;
      if (!content.length) {
        tokens[i - 1].tight = true;
        tokens[i + 1].tight = true;
      }
    }
  }
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function inline(state) {
  var tokens = state.tokens,
      tok,
      i,
      l;

  // Parse inlines
  for (i = 0, l = tokens.length; i < l; i++) {
    tok = tokens[i];
    if (tok.type === 'inline') {
      state.inline.parse(tok.content, state.options, state.env, tok.children);
    }
  }
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function footnote_block(state) {
  var i,
      l,
      j,
      t,
      lastParagraph,
      list,
      tokens,
      current,
      currentLabel,
      level = 0,
      insideRef = false,
      refTokens = {};

  if (!state.env.footnotes) {
    return;
  }

  state.tokens = state.tokens.filter(function (tok) {
    if (tok.type === 'footnote_reference_open') {
      insideRef = true;
      current = [];
      currentLabel = tok.label;
      return false;
    }
    if (tok.type === 'footnote_reference_close') {
      insideRef = false;
      // prepend ':' to avoid conflict with Object.prototype members
      refTokens[':' + currentLabel] = current;
      return false;
    }
    if (insideRef) {
      current.push(tok);
    }
    return !insideRef;
  });

  if (!state.env.footnotes.list) {
    return;
  }
  list = state.env.footnotes.list;

  state.tokens.push({
    type: 'footnote_block_open',
    level: level++
  });
  for (i = 0, l = list.length; i < l; i++) {
    state.tokens.push({
      type: 'footnote_open',
      id: i,
      level: level++
    });

    if (list[i].tokens) {
      tokens = [];
      tokens.push({
        type: 'paragraph_open',
        tight: false,
        level: level++
      });
      tokens.push({
        type: 'inline',
        content: '',
        level: level,
        children: list[i].tokens
      });
      tokens.push({
        type: 'paragraph_close',
        tight: false,
        level: --level
      });
    } else if (list[i].label) {
      tokens = refTokens[':' + list[i].label];
    }

    state.tokens = state.tokens.concat(tokens);
    if (state.tokens[state.tokens.length - 1].type === 'paragraph_close') {
      lastParagraph = state.tokens.pop();
    } else {
      lastParagraph = null;
    }

    t = list[i].count > 0 ? list[i].count : 1;
    for (j = 0; j < t; j++) {
      state.tokens.push({
        type: 'footnote_anchor',
        id: i,
        subId: j,
        level: level
      });
    }

    if (lastParagraph) {
      state.tokens.push(lastParagraph);
    }

    state.tokens.push({
      type: 'footnote_close',
      level: --level
    });
  }
  state.tokens.push({
    type: 'footnote_block_close',
    level: --level
  });
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Enclose abbreviations in <abbr> tags
//


var PUNCT_CHARS = ' \n()[]\'".,!?-';

// from Google closure library
// http://closure-library.googlecode.com/git-history/docs/local_closure_goog_string_string.js.source.html#line1021
function regEscape(s) {
  return s.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1');
}

module.exports = function abbr2(state) {
  var i,
      j,
      l,
      tokens,
      token,
      text,
      nodes,
      pos,
      level,
      reg,
      m,
      regText,
      blockTokens = state.tokens;

  if (!state.env.abbreviations) {
    return;
  }
  if (!state.env.abbrRegExp) {
    regText = '(^|[' + PUNCT_CHARS.split('').map(regEscape).join('') + '])' + '(' + Object.keys(state.env.abbreviations).map(function (x) {
      return x.substr(1);
    }).sort(function (a, b) {
      return b.length - a.length;
    }).map(regEscape).join('|') + ')' + '($|[' + PUNCT_CHARS.split('').map(regEscape).join('') + '])';
    state.env.abbrRegExp = new RegExp(regText, 'g');
  }
  reg = state.env.abbrRegExp;

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline') {
      continue;
    }
    tokens = blockTokens[j].children;

    // We scan from the end, to keep position when new tags added.
    for (i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];
      if (token.type !== 'text') {
        continue;
      }

      pos = 0;
      text = token.content;
      reg.lastIndex = 0;
      level = token.level;
      nodes = [];

      while (m = reg.exec(text)) {
        if (reg.lastIndex > pos) {
          nodes.push({
            type: 'text',
            content: text.slice(pos, m.index + m[1].length),
            level: level
          });
        }

        nodes.push({
          type: 'abbr_open',
          title: state.env.abbreviations[':' + m[2]],
          level: level++
        });
        nodes.push({
          type: 'text',
          content: m[2],
          level: level
        });
        nodes.push({
          type: 'abbr_close',
          level: --level
        });
        pos = reg.lastIndex - m[3].length;
      }

      if (!nodes.length) {
        continue;
      }

      if (pos < text.length) {
        nodes.push({
          type: 'text',
          content: text.slice(pos),
          level: level
        });
      }

      // replace current node
      blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
    }
  }
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Simple typographical replacements
//


// TODO:
// - fractionals 1/2, 1/4, 3/4 -> ½, ¼, ¾
// - miltiplication 2 x 4 -> 2 × 4

var RARE_RE = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/;

var SCOPED_ABBR_RE = /\((c|tm|r|p)\)/ig;
var SCOPED_ABBR = {
  'c': '©',
  'r': '®',
  'p': '§',
  'tm': '™'
};

function replaceScopedAbbr(str) {
  if (str.indexOf('(') < 0) {
    return str;
  }

  return str.replace(SCOPED_ABBR_RE, function (match, name) {
    return SCOPED_ABBR[name.toLowerCase()];
  });
}

module.exports = function replace(state) {
  var i, token, text, inlineTokens, blkIdx;

  if (!state.options.typographer) {
    return;
  }

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') {
      continue;
    }

    inlineTokens = state.tokens[blkIdx].children;

    for (i = inlineTokens.length - 1; i >= 0; i--) {
      token = inlineTokens[i];
      if (token.type === 'text') {
        text = token.content;

        text = replaceScopedAbbr(text);

        if (RARE_RE.test(text)) {
          text = text.replace(/\+-/g, '±')
          // .., ..., ....... -> …
          // but ?..... & !..... -> ?.. & !..
          .replace(/\.{2,}/g, '…').replace(/([?!])…/g, '$1..').replace(/([?!]){4,}/g, '$1$1$1').replace(/,{2,}/g, ',')
          // em-dash
          .replace(/(^|[^-])---([^-]|$)/mg, '$1\u2014$2')
          // en-dash
          .replace(/(^|\s)--(\s|$)/mg, '$1\u2013$2').replace(/(^|[^-\s])--([^-\s]|$)/mg, '$1\u2013$2');
        }

        token.content = text;
      }
    }
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Convert straight quotation marks to typographic ones
//


var QUOTE_TEST_RE = /['"]/;
var QUOTE_RE = /['"]/g;
var PUNCT_RE = /[-\s()\[\]]/;
var APOSTROPHE = '’';

// This function returns true if the character at `pos`
// could be inside a word.
function isLetter(str, pos) {
  if (pos < 0 || pos >= str.length) {
    return false;
  }
  return !PUNCT_RE.test(str[pos]);
}

function replaceAt(str, index, ch) {
  return str.substr(0, index) + ch + str.substr(index + 1);
}

module.exports = function smartquotes(state) {
  /*eslint max-depth:0*/
  var i, token, text, t, pos, max, thisLevel, lastSpace, nextSpace, item, canOpen, canClose, j, isSingle, blkIdx, tokens, stack;

  if (!state.options.typographer) {
    return;
  }

  stack = [];

  for (blkIdx = state.tokens.length - 1; blkIdx >= 0; blkIdx--) {

    if (state.tokens[blkIdx].type !== 'inline') {
      continue;
    }

    tokens = state.tokens[blkIdx].children;
    stack.length = 0;

    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];

      if (token.type !== 'text' || QUOTE_TEST_RE.test(token.text)) {
        continue;
      }

      thisLevel = tokens[i].level;

      for (j = stack.length - 1; j >= 0; j--) {
        if (stack[j].level <= thisLevel) {
          break;
        }
      }
      stack.length = j + 1;

      text = token.content;
      pos = 0;
      max = text.length;

      /*eslint no-labels:0,block-scoped-var:0*/
      OUTER: while (pos < max) {
        QUOTE_RE.lastIndex = pos;
        t = QUOTE_RE.exec(text);
        if (!t) {
          break;
        }

        lastSpace = !isLetter(text, t.index - 1);
        pos = t.index + 1;
        isSingle = t[0] === "'";
        nextSpace = !isLetter(text, pos);

        if (!nextSpace && !lastSpace) {
          // middle of word
          if (isSingle) {
            token.content = replaceAt(token.content, t.index, APOSTROPHE);
          }
          continue;
        }

        canOpen = !nextSpace;
        canClose = !lastSpace;

        if (canClose) {
          // this could be a closing quote, rewind the stack to get a match
          for (j = stack.length - 1; j >= 0; j--) {
            item = stack[j];
            if (stack[j].level < thisLevel) {
              break;
            }
            if (item.single === isSingle && stack[j].level === thisLevel) {
              item = stack[j];
              if (isSingle) {
                tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[2]);
                token.content = replaceAt(token.content, t.index, state.options.quotes[3]);
              } else {
                tokens[item.token].content = replaceAt(tokens[item.token].content, item.pos, state.options.quotes[0]);
                token.content = replaceAt(token.content, t.index, state.options.quotes[1]);
              }
              stack.length = j;
              continue OUTER;
            }
          }
        }

        if (canOpen) {
          stack.push({
            token: i,
            pos: t.index,
            single: isSingle,
            level: thisLevel
          });
        } else if (canClose && isSingle) {
          token.content = replaceAt(token.content, t.index, APOSTROPHE);
        }
      }
    }
  }
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Replace link-like texts with link nodes.
//
// Currently restricted by `inline.validateLink()` to http/https/ftp
//


var Autolinker = __webpack_require__(60);

var LINK_SCAN_RE = /www|@|\:\/\//;

function isLinkOpen(str) {
  return (/^<a[>\s]/i.test(str)
  );
}
function isLinkClose(str) {
  return (/^<\/a\s*>/i.test(str)
  );
}

// Stupid fabric to avoid singletons, for thread safety.
// Required for engines like Nashorn.
//
function createLinkifier() {
  var links = [];
  var autolinker = new Autolinker({
    stripPrefix: false,
    url: true,
    email: true,
    twitter: false,
    replaceFn: function replaceFn(linker, match) {
      // Only collect matched strings but don't change anything.
      switch (match.getType()) {
        /*eslint default-case:0*/
        case 'url':
          links.push({
            text: match.matchedText,
            url: match.getUrl()
          });
          break;
        case 'email':
          links.push({
            text: match.matchedText,
            // normalize email protocol
            url: 'mailto:' + match.getEmail().replace(/^mailto:/i, '')
          });
          break;
      }
      return false;
    }
  });

  return {
    links: links,
    autolinker: autolinker
  };
}

module.exports = function linkify(state) {
  var i,
      j,
      l,
      tokens,
      token,
      text,
      nodes,
      ln,
      pos,
      level,
      htmlLinkLevel,
      blockTokens = state.tokens,
      linkifier = null,
      links,
      autolinker;

  if (!state.options.linkify) {
    return;
  }

  for (j = 0, l = blockTokens.length; j < l; j++) {
    if (blockTokens[j].type !== 'inline') {
      continue;
    }
    tokens = blockTokens[j].children;

    htmlLinkLevel = 0;

    // We scan from the end, to keep position when new tags added.
    // Use reversed logic in links start/end match
    for (i = tokens.length - 1; i >= 0; i--) {
      token = tokens[i];

      // Skip content of markdown links
      if (token.type === 'link_close') {
        i--;
        while (tokens[i].level !== token.level && tokens[i].type !== 'link_open') {
          i--;
        }
        continue;
      }

      // Skip content of html tag links
      if (token.type === 'htmltag') {
        if (isLinkOpen(token.content) && htmlLinkLevel > 0) {
          htmlLinkLevel--;
        }
        if (isLinkClose(token.content)) {
          htmlLinkLevel++;
        }
      }
      if (htmlLinkLevel > 0) {
        continue;
      }

      if (token.type === 'text' && LINK_SCAN_RE.test(token.content)) {

        // Init linkifier in lazy manner, only if required.
        if (!linkifier) {
          linkifier = createLinkifier();
          links = linkifier.links;
          autolinker = linkifier.autolinker;
        }

        text = token.content;
        links.length = 0;
        autolinker.link(text);

        if (!links.length) {
          continue;
        }

        // Now split string to nodes
        nodes = [];
        level = token.level;

        for (ln = 0; ln < links.length; ln++) {

          if (!state.inline.validateLink(links[ln].url)) {
            continue;
          }

          pos = text.indexOf(links[ln].text);

          if (pos) {
            level = level;
            nodes.push({
              type: 'text',
              content: text.slice(0, pos),
              level: level
            });
          }
          nodes.push({
            type: 'link_open',
            href: links[ln].url,
            title: '',
            level: level++
          });
          nodes.push({
            type: 'text',
            content: links[ln].text,
            level: level
          });
          nodes.push({
            type: 'link_close',
            level: --level
          });
          text = text.slice(pos + links[ln].text.length);
        }
        if (text.length) {
          nodes.push({
            type: 'text',
            content: text,
            level: level
          });
        }

        // replace current node
        blockTokens[j].children = tokens = [].concat(tokens.slice(0, i), nodes, tokens.slice(i + 1));
      }
    }
  }
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (root, factory) {
	if (true) {
		// AMD. Register as an anonymous module unless amdModuleId is set
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return root['Autolinker'] = factory();
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory();
	} else {
		root['Autolinker'] = factory();
	}
})(this, function () {

	/*!
  * Autolinker.js
  * 0.15.3
  *
  * Copyright(c) 2015 Gregory Jacobs <greg@greg-jacobs.com>
  * MIT Licensed. http://www.opensource.org/licenses/mit-license.php
  *
  * https://github.com/gregjacobs/Autolinker.js
  */
	/**
  * @class Autolinker
  * @extends Object
  * 
  * Utility class used to process a given string of text, and wrap the URLs, email addresses, and Twitter handles in 
  * the appropriate anchor (&lt;a&gt;) tags to turn them into links.
  * 
  * Any of the configuration options may be provided in an Object (map) provided to the Autolinker constructor, which
  * will configure how the {@link #link link()} method will process the links.
  * 
  * For example:
  * 
  *     var autolinker = new Autolinker( {
  *         newWindow : false,
  *         truncate  : 30
  *     } );
  *     
  *     var html = autolinker.link( "Joe went to www.yahoo.com" );
  *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
  * 
  * 
  * The {@link #static-link static link()} method may also be used to inline options into a single call, which may
  * be more convenient for one-off uses. For example:
  * 
  *     var html = Autolinker.link( "Joe went to www.yahoo.com", {
  *         newWindow : false,
  *         truncate  : 30
  *     } );
  *     // produces: 'Joe went to <a href="http://www.yahoo.com">yahoo.com</a>'
  * 
  * 
  * ## Custom Replacements of Links
  * 
  * If the configuration options do not provide enough flexibility, a {@link #replaceFn} may be provided to fully customize
  * the output of Autolinker. This function is called once for each URL/Email/Twitter handle match that is encountered.
  * 
  * For example:
  * 
  *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
  *     
  *     var linkedText = Autolinker.link( input, {
  *         replaceFn : function( autolinker, match ) {
  *             console.log( "href = ", match.getAnchorHref() );
  *             console.log( "text = ", match.getAnchorText() );
  *         
  *             switch( match.getType() ) {
  *                 case 'url' : 
  *                     console.log( "url: ", match.getUrl() );
  *                     
  *                     if( match.getUrl().indexOf( 'mysite.com' ) === -1 ) {
  *                         var tag = autolinker.getTagBuilder().build( match );  // returns an `Autolinker.HtmlTag` instance, which provides mutator methods for easy changes
  *                         tag.setAttr( 'rel', 'nofollow' );
  *                         tag.addClass( 'external-link' );
  *                         
  *                         return tag;
  *                         
  *                     } else {
  *                         return true;  // let Autolinker perform its normal anchor tag replacement
  *                     }
  *                     
  *                 case 'email' :
  *                     var email = match.getEmail();
  *                     console.log( "email: ", email );
  *                     
  *                     if( email === "my@own.address" ) {
  *                         return false;  // don't auto-link this particular email address; leave as-is
  *                     } else {
  *                         return;  // no return value will have Autolinker perform its normal anchor tag replacement (same as returning `true`)
  *                     }
  *                 
  *                 case 'twitter' :
  *                     var twitterHandle = match.getTwitterHandle();
  *                     console.log( twitterHandle );
  *                     
  *                     return '<a href="http://newplace.to.link.twitter.handles.to/">' + twitterHandle + '</a>';
  *             }
  *         }
  *     } );
  * 
  * 
  * The function may return the following values:
  * 
  * - `true` (Boolean): Allow Autolinker to replace the match as it normally would.
  * - `false` (Boolean): Do not replace the current match at all - leave as-is.
  * - Any String: If a string is returned from the function, the string will be used directly as the replacement HTML for
  *   the match.
  * - An {@link Autolinker.HtmlTag} instance, which can be used to build/modify an HTML tag before writing out its HTML text.
  * 
  * @constructor
  * @param {Object} [config] The configuration options for the Autolinker instance, specified in an Object (map).
  */
	var Autolinker = function Autolinker(cfg) {
		Autolinker.Util.assign(this, cfg); // assign the properties of `cfg` onto the Autolinker instance. Prototype properties will be used for missing configs.
	};

	Autolinker.prototype = {
		constructor: Autolinker, // fix constructor property

		/**
   * @cfg {Boolean} urls
   * 
   * `true` if miscellaneous URLs should be automatically linked, `false` if they should not be.
   */
		urls: true,

		/**
   * @cfg {Boolean} email
   * 
   * `true` if email addresses should be automatically linked, `false` if they should not be.
   */
		email: true,

		/**
   * @cfg {Boolean} twitter
   * 
   * `true` if Twitter handles ("@example") should be automatically linked, `false` if they should not be.
   */
		twitter: true,

		/**
   * @cfg {Boolean} newWindow
   * 
   * `true` if the links should open in a new window, `false` otherwise.
   */
		newWindow: true,

		/**
   * @cfg {Boolean} stripPrefix
   * 
   * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped from the beginning of URL links' text, 
   * `false` otherwise.
   */
		stripPrefix: true,

		/**
   * @cfg {Number} truncate
   * 
   * A number for how many characters long URLs/emails/twitter handles should be truncated to inside the text of 
   * a link. If the URL/email/twitter is over this number of characters, it will be truncated to this length by 
   * adding a two period ellipsis ('..') to the end of the string.
   * 
   * For example: A url like 'http://www.yahoo.com/some/long/path/to/a/file' truncated to 25 characters might look
   * something like this: 'yahoo.com/some/long/pat..'
   */
		truncate: undefined,

		/**
   * @cfg {String} className
   * 
   * A CSS class name to add to the generated links. This class will be added to all links, as well as this class
   * plus url/email/twitter suffixes for styling url/email/twitter links differently.
   * 
   * For example, if this config is provided as "myLink", then:
   * 
   * - URL links will have the CSS classes: "myLink myLink-url"
   * - Email links will have the CSS classes: "myLink myLink-email", and
   * - Twitter links will have the CSS classes: "myLink myLink-twitter"
   */
		className: "",

		/**
   * @cfg {Function} replaceFn
   * 
   * A function to individually process each URL/Email/Twitter match found in the input string.
   * 
   * See the class's description for usage.
   * 
   * This function is called with the following parameters:
   * 
   * @cfg {Autolinker} replaceFn.autolinker The Autolinker instance, which may be used to retrieve child objects from (such
   *   as the instance's {@link #getTagBuilder tag builder}).
   * @cfg {Autolinker.match.Match} replaceFn.match The Match instance which can be used to retrieve information about the
   *   {@link Autolinker.match.Url URL}/{@link Autolinker.match.Email email}/{@link Autolinker.match.Twitter Twitter}
   *   match that the `replaceFn` is currently processing.
   */

		/**
   * @private
   * @property {Autolinker.htmlParser.HtmlParser} htmlParser
   * 
   * The HtmlParser instance used to skip over HTML tags, while finding text nodes to process. This is lazily instantiated
   * in the {@link #getHtmlParser} method.
   */
		htmlParser: undefined,

		/**
   * @private
   * @property {Autolinker.matchParser.MatchParser} matchParser
   * 
   * The MatchParser instance used to find URL/email/Twitter matches in the text nodes of an input string passed to
   * {@link #link}. This is lazily instantiated in the {@link #getMatchParser} method.
   */
		matchParser: undefined,

		/**
   * @private
   * @property {Autolinker.AnchorTagBuilder} tagBuilder
   * 
   * The AnchorTagBuilder instance used to build the URL/email/Twitter replacement anchor tags. This is lazily instantiated
   * in the {@link #getTagBuilder} method.
   */
		tagBuilder: undefined,

		/**
   * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
   * Does not link URLs found within HTML tags.
   * 
   * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
   * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
   * 
   * This method finds the text around any HTML elements in the input `textOrHtml`, which will be the text that is processed.
   * Any original HTML elements will be left as-is, as well as the text that is already wrapped in anchor (&lt;a&gt;) tags.
   * 
   * @param {String} textOrHtml The HTML or text to link URLs, email addresses, and Twitter handles within (depending on if
   *   the {@link #urls}, {@link #email}, and {@link #twitter} options are enabled).
   * @return {String} The HTML, with URLs/emails/Twitter handles automatically linked.
   */
		link: function link(textOrHtml) {
			var htmlParser = this.getHtmlParser(),
			    htmlNodes = htmlParser.parse(textOrHtml),
			    anchorTagStackCount = 0,
			    // used to only process text around anchor tags, and any inner text/html they may have
			resultHtml = [];

			for (var i = 0, len = htmlNodes.length; i < len; i++) {
				var node = htmlNodes[i],
				    nodeType = node.getType(),
				    nodeText = node.getText();

				if (nodeType === 'element') {
					// Process HTML nodes in the input `textOrHtml`
					if (node.getTagName() === 'a') {
						if (!node.isClosing()) {
							// it's the start <a> tag
							anchorTagStackCount++;
						} else {
							// it's the end </a> tag
							anchorTagStackCount = Math.max(anchorTagStackCount - 1, 0); // attempt to handle extraneous </a> tags by making sure the stack count never goes below 0
						}
					}
					resultHtml.push(nodeText); // now add the text of the tag itself verbatim
				} else if (nodeType === 'entity') {
					resultHtml.push(nodeText); // append HTML entity nodes (such as '&nbsp;') verbatim
				} else {
					// Process text nodes in the input `textOrHtml`
					if (anchorTagStackCount === 0) {
						// If we're not within an <a> tag, process the text node to linkify
						var linkifiedStr = this.linkifyStr(nodeText);
						resultHtml.push(linkifiedStr);
					} else {
						// `text` is within an <a> tag, simply append the text - we do not want to autolink anything 
						// already within an <a>...</a> tag
						resultHtml.push(nodeText);
					}
				}
			}

			return resultHtml.join("");
		},

		/**
   * Process the text that lies in between HTML tags, performing the anchor tag replacements for matched 
   * URLs/emails/Twitter handles, and returns the string with the replacements made. 
   * 
   * This method does the actual wrapping of URLs/emails/Twitter handles with anchor tags.
   * 
   * @private
   * @param {String} str The string of text to auto-link.
   * @return {String} The text with anchor tags auto-filled.
   */
		linkifyStr: function linkifyStr(str) {
			return this.getMatchParser().replace(str, this.createMatchReturnVal, this);
		},

		/**
   * Creates the return string value for a given match in the input string, for the {@link #processTextNode} method.
   * 
   * This method handles the {@link #replaceFn}, if one was provided.
   * 
   * @private
   * @param {Autolinker.match.Match} match The Match object that represents the match.
   * @return {String} The string that the `match` should be replaced with. This is usually the anchor tag string, but
   *   may be the `matchStr` itself if the match is not to be replaced.
   */
		createMatchReturnVal: function createMatchReturnVal(match) {
			// Handle a custom `replaceFn` being provided
			var replaceFnResult;
			if (this.replaceFn) {
				replaceFnResult = this.replaceFn.call(this, this, match); // Autolinker instance is the context, and the first arg
			}

			if (typeof replaceFnResult === 'string') {
				return replaceFnResult; // `replaceFn` returned a string, use that
			} else if (replaceFnResult === false) {
				return match.getMatchedText(); // no replacement for the match
			} else if (replaceFnResult instanceof Autolinker.HtmlTag) {
				return replaceFnResult.toString();
			} else {
				// replaceFnResult === true, or no/unknown return value from function
				// Perform Autolinker's default anchor tag generation
				var tagBuilder = this.getTagBuilder(),
				    anchorTag = tagBuilder.build(match); // returns an Autolinker.HtmlTag instance

				return anchorTag.toString();
			}
		},

		/**
   * Lazily instantiates and returns the {@link #htmlParser} instance for this Autolinker instance.
   * 
   * @protected
   * @return {Autolinker.htmlParser.HtmlParser}
   */
		getHtmlParser: function getHtmlParser() {
			var htmlParser = this.htmlParser;

			if (!htmlParser) {
				htmlParser = this.htmlParser = new Autolinker.htmlParser.HtmlParser();
			}

			return htmlParser;
		},

		/**
   * Lazily instantiates and returns the {@link #matchParser} instance for this Autolinker instance.
   * 
   * @protected
   * @return {Autolinker.matchParser.MatchParser}
   */
		getMatchParser: function getMatchParser() {
			var matchParser = this.matchParser;

			if (!matchParser) {
				matchParser = this.matchParser = new Autolinker.matchParser.MatchParser({
					urls: this.urls,
					email: this.email,
					twitter: this.twitter,
					stripPrefix: this.stripPrefix
				});
			}

			return matchParser;
		},

		/**
   * Returns the {@link #tagBuilder} instance for this Autolinker instance, lazily instantiating it
   * if it does not yet exist.
   * 
   * This method may be used in a {@link #replaceFn} to generate the {@link Autolinker.HtmlTag HtmlTag} instance that 
   * Autolinker would normally generate, and then allow for modifications before returning it. For example:
   * 
   *     var html = Autolinker.link( "Test google.com", {
   *         replaceFn : function( autolinker, match ) {
   *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
   *             tag.setAttr( 'rel', 'nofollow' );
   *             
   *             return tag;
   *         }
   *     } );
   *     
   *     // generated html:
   *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
   * 
   * @return {Autolinker.AnchorTagBuilder}
   */
		getTagBuilder: function getTagBuilder() {
			var tagBuilder = this.tagBuilder;

			if (!tagBuilder) {
				tagBuilder = this.tagBuilder = new Autolinker.AnchorTagBuilder({
					newWindow: this.newWindow,
					truncate: this.truncate,
					className: this.className
				});
			}

			return tagBuilder;
		}

	};

	/**
  * Automatically links URLs, email addresses, and Twitter handles found in the given chunk of HTML. 
  * Does not link URLs found within HTML tags.
  * 
  * For instance, if given the text: `You should go to http://www.yahoo.com`, then the result
  * will be `You should go to &lt;a href="http://www.yahoo.com"&gt;http://www.yahoo.com&lt;/a&gt;`
  * 
  * Example:
  * 
  *     var linkedText = Autolinker.link( "Go to google.com", { newWindow: false } );
  *     // Produces: "Go to <a href="http://google.com">google.com</a>"
  * 
  * @static
  * @param {String} textOrHtml The HTML or text to find URLs, email addresses, and Twitter handles within (depending on if
  *   the {@link #urls}, {@link #email}, and {@link #twitter} options are enabled).
  * @param {Object} [options] Any of the configuration options for the Autolinker class, specified in an Object (map).
  *   See the class description for an example call.
  * @return {String} The HTML text, with URLs automatically linked
  */
	Autolinker.link = function (textOrHtml, options) {
		var autolinker = new Autolinker(options);
		return autolinker.link(textOrHtml);
	};

	// Autolinker Namespaces
	Autolinker.match = {};
	Autolinker.htmlParser = {};
	Autolinker.matchParser = {};
	/*global Autolinker */
	/*jshint eqnull:true, boss:true */
	/**
  * @class Autolinker.Util
  * @singleton
  * 
  * A few utility methods for Autolinker.
  */
	Autolinker.Util = {

		/**
   * @property {Function} abstractMethod
   * 
   * A function object which represents an abstract method.
   */
		abstractMethod: function abstractMethod() {
			throw "abstract";
		},

		/**
   * Assigns (shallow copies) the properties of `src` onto `dest`.
   * 
   * @param {Object} dest The destination object.
   * @param {Object} src The source object.
   * @return {Object} The destination object (`dest`)
   */
		assign: function assign(dest, src) {
			for (var prop in src) {
				if (src.hasOwnProperty(prop)) {
					dest[prop] = src[prop];
				}
			}

			return dest;
		},

		/**
   * Extends `superclass` to create a new subclass, adding the `protoProps` to the new subclass's prototype.
   * 
   * @param {Function} superclass The constructor function for the superclass.
   * @param {Object} protoProps The methods/properties to add to the subclass's prototype. This may contain the
   *   special property `constructor`, which will be used as the new subclass's constructor function.
   * @return {Function} The new subclass function.
   */
		extend: function extend(superclass, protoProps) {
			var superclassProto = superclass.prototype;

			var F = function F() {};
			F.prototype = superclassProto;

			var subclass;
			if (protoProps.hasOwnProperty('constructor')) {
				subclass = protoProps.constructor;
			} else {
				subclass = function subclass() {
					superclassProto.constructor.apply(this, arguments);
				};
			}

			var subclassProto = subclass.prototype = new F(); // set up prototype chain
			subclassProto.constructor = subclass; // fix constructor property
			subclassProto.superclass = superclassProto;

			delete protoProps.constructor; // don't re-assign constructor property to the prototype, since a new function may have been created (`subclass`), which is now already there
			Autolinker.Util.assign(subclassProto, protoProps);

			return subclass;
		},

		/**
   * Truncates the `str` at `len - ellipsisChars.length`, and adds the `ellipsisChars` to the
   * end of the string (by default, two periods: '..'). If the `str` length does not exceed 
   * `len`, the string will be returned unchanged.
   * 
   * @param {String} str The string to truncate and add an ellipsis to.
   * @param {Number} truncateLen The length to truncate the string at.
   * @param {String} [ellipsisChars=..] The ellipsis character(s) to add to the end of `str`
   *   when truncated. Defaults to '..'
   */
		ellipsis: function ellipsis(str, truncateLen, ellipsisChars) {
			if (str.length > truncateLen) {
				ellipsisChars = ellipsisChars == null ? '..' : ellipsisChars;
				str = str.substring(0, truncateLen - ellipsisChars.length) + ellipsisChars;
			}
			return str;
		},

		/**
   * Supports `Array.prototype.indexOf()` functionality for old IE (IE8 and below).
   * 
   * @param {Array} arr The array to find an element of.
   * @param {*} element The element to find in the array, and return the index of.
   * @return {Number} The index of the `element`, or -1 if it was not found.
   */
		indexOf: function indexOf(arr, element) {
			if (Array.prototype.indexOf) {
				return arr.indexOf(element);
			} else {
				for (var i = 0, len = arr.length; i < len; i++) {
					if (arr[i] === element) return i;
				}
				return -1;
			}
		},

		/**
   * Performs the functionality of what modern browsers do when `String.prototype.split()` is called
   * with a regular expression that contains capturing parenthesis.
   * 
   * For example:
   * 
   *     // Modern browsers: 
   *     "a,b,c".split( /(,)/ );  // --> [ 'a', ',', 'b', ',', 'c' ]
   *     
   *     // Old IE (including IE8):
   *     "a,b,c".split( /(,)/ );  // --> [ 'a', 'b', 'c' ]
   *     
   * This method emulates the functionality of modern browsers for the old IE case.
   * 
   * @param {String} str The string to split.
   * @param {RegExp} splitRegex The regular expression to split the input `str` on. The splitting
   *   character(s) will be spliced into the array, as in the "modern browsers" example in the 
   *   description of this method. 
   *   Note #1: the supplied regular expression **must** have the 'g' flag specified.
   *   Note #2: for simplicity's sake, the regular expression does not need 
   *   to contain capturing parenthesis - it will be assumed that any match has them.
   * @return {String[]} The split array of strings, with the splitting character(s) included.
   */
		splitAndCapture: function splitAndCapture(str, splitRegex) {
			if (!splitRegex.global) throw new Error("`splitRegex` must have the 'g' flag set");

			var result = [],
			    lastIdx = 0,
			    match;

			while (match = splitRegex.exec(str)) {
				result.push(str.substring(lastIdx, match.index));
				result.push(match[0]); // push the splitting char(s)

				lastIdx = match.index + match[0].length;
			}
			result.push(str.substring(lastIdx));

			return result;
		}

	};
	/*global Autolinker */
	/*jshint boss:true */
	/**
  * @class Autolinker.HtmlTag
  * @extends Object
  * 
  * Represents an HTML tag, which can be used to easily build/modify HTML tags programmatically.
  * 
  * Autolinker uses this abstraction to create HTML tags, and then write them out as strings. You may also use
  * this class in your code, especially within a {@link Autolinker#replaceFn replaceFn}.
  * 
  * ## Examples
  * 
  * Example instantiation:
  * 
  *     var tag = new Autolinker.HtmlTag( {
  *         tagName : 'a',
  *         attrs   : { 'href': 'http://google.com', 'class': 'external-link' },
  *         innerHtml : 'Google'
  *     } );
  *     
  *     tag.toString();  // <a href="http://google.com" class="external-link">Google</a>
  *     
  *     // Individual accessor methods
  *     tag.getTagName();                 // 'a'
  *     tag.getAttr( 'href' );            // 'http://google.com'
  *     tag.hasClass( 'external-link' );  // true
  * 
  * 
  * Using mutator methods (which may be used in combination with instantiation config properties):
  * 
  *     var tag = new Autolinker.HtmlTag();
  *     tag.setTagName( 'a' );
  *     tag.setAttr( 'href', 'http://google.com' );
  *     tag.addClass( 'external-link' );
  *     tag.setInnerHtml( 'Google' );
  *     
  *     tag.getTagName();                 // 'a'
  *     tag.getAttr( 'href' );            // 'http://google.com'
  *     tag.hasClass( 'external-link' );  // true
  *     
  *     tag.toString();  // <a href="http://google.com" class="external-link">Google</a>
  *     
  * 
  * ## Example use within a {@link Autolinker#replaceFn replaceFn}
  * 
  *     var html = Autolinker.link( "Test google.com", {
  *         replaceFn : function( autolinker, match ) {
  *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance, configured with the Match's href and anchor text
  *             tag.setAttr( 'rel', 'nofollow' );
  *             
  *             return tag;
  *         }
  *     } );
  *     
  *     // generated html:
  *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
  *     
  *     
  * ## Example use with a new tag for the replacement
  * 
  *     var html = Autolinker.link( "Test google.com", {
  *         replaceFn : function( autolinker, match ) {
  *             var tag = new Autolinker.HtmlTag( {
  *                 tagName : 'button',
  *                 attrs   : { 'title': 'Load URL: ' + match.getAnchorHref() },
  *                 innerHtml : 'Load URL: ' + match.getAnchorText()
  *             } );
  *             
  *             return tag;
  *         }
  *     } );
  *     
  *     // generated html:
  *     //   Test <button title="Load URL: http://google.com">Load URL: google.com</button>
  */
	Autolinker.HtmlTag = Autolinker.Util.extend(Object, {

		/**
   * @cfg {String} tagName
   * 
   * The tag name. Ex: 'a', 'button', etc.
   * 
   * Not required at instantiation time, but should be set using {@link #setTagName} before {@link #toString}
   * is executed.
   */

		/**
   * @cfg {Object.<String, String>} attrs
   * 
   * An key/value Object (map) of attributes to create the tag with. The keys are the attribute names, and the
   * values are the attribute values.
   */

		/**
   * @cfg {String} innerHtml
   * 
   * The inner HTML for the tag. 
   * 
   * Note the camel case name on `innerHtml`. Acronyms are camelCased in this utility (such as not to run into the acronym 
   * naming inconsistency that the DOM developers created with `XMLHttpRequest`). You may alternatively use {@link #innerHTML}
   * if you prefer, but this one is recommended.
   */

		/**
   * @cfg {String} innerHTML
   * 
   * Alias of {@link #innerHtml}, accepted for consistency with the browser DOM api, but prefer the camelCased version
   * for acronym names.
   */

		/**
   * @protected
   * @property {RegExp} whitespaceRegex
   * 
   * Regular expression used to match whitespace in a string of CSS classes.
   */
		whitespaceRegex: /\s+/,

		/**
   * @constructor
   * @param {Object} [cfg] The configuration properties for this class, in an Object (map)
   */
		constructor: function constructor(cfg) {
			Autolinker.Util.assign(this, cfg);

			this.innerHtml = this.innerHtml || this.innerHTML; // accept either the camelCased form or the fully capitalized acronym
		},

		/**
   * Sets the tag name that will be used to generate the tag with.
   * 
   * @param {String} tagName
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		setTagName: function setTagName(tagName) {
			this.tagName = tagName;
			return this;
		},

		/**
   * Retrieves the tag name.
   * 
   * @return {String}
   */
		getTagName: function getTagName() {
			return this.tagName || "";
		},

		/**
   * Sets an attribute on the HtmlTag.
   * 
   * @param {String} attrName The attribute name to set.
   * @param {String} attrValue The attribute value to set.
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		setAttr: function setAttr(attrName, attrValue) {
			var tagAttrs = this.getAttrs();
			tagAttrs[attrName] = attrValue;

			return this;
		},

		/**
   * Retrieves an attribute from the HtmlTag. If the attribute does not exist, returns `undefined`.
   * 
   * @param {String} name The attribute name to retrieve.
   * @return {String} The attribute's value, or `undefined` if it does not exist on the HtmlTag.
   */
		getAttr: function getAttr(attrName) {
			return this.getAttrs()[attrName];
		},

		/**
   * Sets one or more attributes on the HtmlTag.
   * 
   * @param {Object.<String, String>} attrs A key/value Object (map) of the attributes to set.
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		setAttrs: function setAttrs(attrs) {
			var tagAttrs = this.getAttrs();
			Autolinker.Util.assign(tagAttrs, attrs);

			return this;
		},

		/**
   * Retrieves the attributes Object (map) for the HtmlTag.
   * 
   * @return {Object.<String, String>} A key/value object of the attributes for the HtmlTag.
   */
		getAttrs: function getAttrs() {
			return this.attrs || (this.attrs = {});
		},

		/**
   * Sets the provided `cssClass`, overwriting any current CSS classes on the HtmlTag.
   * 
   * @param {String} cssClass One or more space-separated CSS classes to set (overwrite).
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		setClass: function setClass(cssClass) {
			return this.setAttr('class', cssClass);
		},

		/**
   * Convenience method to add one or more CSS classes to the HtmlTag. Will not add duplicate CSS classes.
   * 
   * @param {String} cssClass One or more space-separated CSS classes to add.
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		addClass: function addClass(cssClass) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,
			    // to support IE8 and below
			classes = !classAttr ? [] : classAttr.split(whitespaceRegex),
			    newClasses = cssClass.split(whitespaceRegex),
			    newClass;

			while (newClass = newClasses.shift()) {
				if (indexOf(classes, newClass) === -1) {
					classes.push(newClass);
				}
			}

			this.getAttrs()['class'] = classes.join(" ");
			return this;
		},

		/**
   * Convenience method to remove one or more CSS classes from the HtmlTag.
   * 
   * @param {String} cssClass One or more space-separated CSS classes to remove.
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		removeClass: function removeClass(cssClass) {
			var classAttr = this.getClass(),
			    whitespaceRegex = this.whitespaceRegex,
			    indexOf = Autolinker.Util.indexOf,
			    // to support IE8 and below
			classes = !classAttr ? [] : classAttr.split(whitespaceRegex),
			    removeClasses = cssClass.split(whitespaceRegex),
			    removeClass;

			while (classes.length && (removeClass = removeClasses.shift())) {
				var idx = indexOf(classes, removeClass);
				if (idx !== -1) {
					classes.splice(idx, 1);
				}
			}

			this.getAttrs()['class'] = classes.join(" ");
			return this;
		},

		/**
   * Convenience method to retrieve the CSS class(es) for the HtmlTag, which will each be separated by spaces when
   * there are multiple.
   * 
   * @return {String}
   */
		getClass: function getClass() {
			return this.getAttrs()['class'] || "";
		},

		/**
   * Convenience method to check if the tag has a CSS class or not.
   * 
   * @param {String} cssClass The CSS class to check for.
   * @return {Boolean} `true` if the HtmlTag has the CSS class, `false` otherwise.
   */
		hasClass: function hasClass(cssClass) {
			return (' ' + this.getClass() + ' ').indexOf(' ' + cssClass + ' ') !== -1;
		},

		/**
   * Sets the inner HTML for the tag.
   * 
   * @param {String} html The inner HTML to set.
   * @return {Autolinker.HtmlTag} This HtmlTag instance, so that method calls may be chained.
   */
		setInnerHtml: function setInnerHtml(html) {
			this.innerHtml = html;

			return this;
		},

		/**
   * Retrieves the inner HTML for the tag.
   * 
   * @return {String}
   */
		getInnerHtml: function getInnerHtml() {
			return this.innerHtml || "";
		},

		/**
   * Override of superclass method used to generate the HTML string for the tag.
   * 
   * @return {String}
   */
		toString: function toString() {
			var tagName = this.getTagName(),
			    attrsStr = this.buildAttrsStr();

			attrsStr = attrsStr ? ' ' + attrsStr : ''; // prepend a space if there are actually attributes

			return ['<', tagName, attrsStr, '>', this.getInnerHtml(), '</', tagName, '>'].join("");
		},

		/**
   * Support method for {@link #toString}, returns the string space-separated key="value" pairs, used to populate 
   * the stringified HtmlTag.
   * 
   * @protected
   * @return {String} Example return: `attr1="value1" attr2="value2"`
   */
		buildAttrsStr: function buildAttrsStr() {
			if (!this.attrs) return ""; // no `attrs` Object (map) has been set, return empty string

			var attrs = this.getAttrs(),
			    attrsArr = [];

			for (var prop in attrs) {
				if (attrs.hasOwnProperty(prop)) {
					attrsArr.push(prop + '="' + attrs[prop] + '"');
				}
			}
			return attrsArr.join(" ");
		}

	});
	/*global Autolinker */
	/*jshint sub:true */
	/**
  * @protected
  * @class Autolinker.AnchorTagBuilder
  * @extends Object
  * 
  * Builds anchor (&lt;a&gt;) tags for the Autolinker utility when a match is found.
  * 
  * Normally this class is instantiated, configured, and used internally by an {@link Autolinker} instance, but may 
  * actually be retrieved in a {@link Autolinker#replaceFn replaceFn} to create {@link Autolinker.HtmlTag HtmlTag} instances
  * which may be modified before returning from the {@link Autolinker#replaceFn replaceFn}. For example:
  * 
  *     var html = Autolinker.link( "Test google.com", {
  *         replaceFn : function( autolinker, match ) {
  *             var tag = autolinker.getTagBuilder().build( match );  // returns an {@link Autolinker.HtmlTag} instance
  *             tag.setAttr( 'rel', 'nofollow' );
  *             
  *             return tag;
  *         }
  *     } );
  *     
  *     // generated html:
  *     //   Test <a href="http://google.com" target="_blank" rel="nofollow">google.com</a>
  */
	Autolinker.AnchorTagBuilder = Autolinker.Util.extend(Object, {

		/**
   * @cfg {Boolean} newWindow
   * @inheritdoc Autolinker#newWindow
   */

		/**
   * @cfg {Number} truncate
   * @inheritdoc Autolinker#truncate
   */

		/**
   * @cfg {String} className
   * @inheritdoc Autolinker#className
   */

		/**
   * @constructor
   * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
   */
		constructor: function constructor(cfg) {
			Autolinker.Util.assign(this, cfg);
		},

		/**
   * Generates the actual anchor (&lt;a&gt;) tag to use in place of the matched URL/email/Twitter text,
   * via its `match` object.
   * 
   * @param {Autolinker.match.Match} match The Match instance to generate an anchor tag from.
   * @return {Autolinker.HtmlTag} The HtmlTag instance for the anchor tag.
   */
		build: function build(match) {
			var tag = new Autolinker.HtmlTag({
				tagName: 'a',
				attrs: this.createAttrs(match.getType(), match.getAnchorHref()),
				innerHtml: this.processAnchorText(match.getAnchorText())
			});

			return tag;
		},

		/**
   * Creates the Object (map) of the HTML attributes for the anchor (&lt;a&gt;) tag being generated.
   * 
   * @protected
   * @param {"url"/"email"/"twitter"} matchType The type of match that an anchor tag is being generated for.
   * @param {String} href The href for the anchor tag.
   * @return {Object} A key/value Object (map) of the anchor tag's attributes. 
   */
		createAttrs: function createAttrs(matchType, anchorHref) {
			var attrs = {
				'href': anchorHref // we'll always have the `href` attribute
			};

			var cssClass = this.createCssClass(matchType);
			if (cssClass) {
				attrs['class'] = cssClass;
			}
			if (this.newWindow) {
				attrs['target'] = "_blank";
			}

			return attrs;
		},

		/**
   * Creates the CSS class that will be used for a given anchor tag, based on the `matchType` and the {@link #className}
   * config.
   * 
   * @private
   * @param {"url"/"email"/"twitter"} matchType The type of match that an anchor tag is being generated for.
   * @return {String} The CSS class string for the link. Example return: "myLink myLink-url". If no {@link #className}
   *   was configured, returns an empty string.
   */
		createCssClass: function createCssClass(matchType) {
			var className = this.className;

			if (!className) return "";else return className + " " + className + "-" + matchType; // ex: "myLink myLink-url", "myLink myLink-email", or "myLink myLink-twitter"
		},

		/**
   * Processes the `anchorText` by truncating the text according to the {@link #truncate} config.
   * 
   * @private
   * @param {String} anchorText The anchor tag's text (i.e. what will be displayed).
   * @return {String} The processed `anchorText`.
   */
		processAnchorText: function processAnchorText(anchorText) {
			anchorText = this.doTruncate(anchorText);

			return anchorText;
		},

		/**
   * Performs the truncation of the `anchorText`, if the `anchorText` is longer than the {@link #truncate} option.
   * Truncates the text to 2 characters fewer than the {@link #truncate} option, and adds ".." to the end.
   * 
   * @private
   * @param {String} text The anchor tag's text (i.e. what will be displayed).
   * @return {String} The truncated anchor text.
   */
		doTruncate: function doTruncate(anchorText) {
			return Autolinker.Util.ellipsis(anchorText, this.truncate || Number.POSITIVE_INFINITY);
		}

	});
	/*global Autolinker */
	/**
  * @private
  * @class Autolinker.htmlParser.HtmlParser
  * @extends Object
  * 
  * An HTML parser implementation which simply walks an HTML string and returns an array of 
  * {@link Autolinker.htmlParser.HtmlNode HtmlNodes} that represent the basic HTML structure of the input string.
  * 
  * Autolinker uses this to only link URLs/emails/Twitter handles within text nodes, effectively ignoring / "walking
  * around" HTML tags.
  */
	Autolinker.htmlParser.HtmlParser = Autolinker.Util.extend(Object, {

		/**
   * @private
   * @property {RegExp} htmlRegex
   * 
   * The regular expression used to pull out HTML tags from a string. Handles namespaced HTML tags and
   * attribute names, as specified by http://www.w3.org/TR/html-markup/syntax.html.
   * 
   * Capturing groups:
   * 
   * 1. The "!DOCTYPE" tag name, if a tag is a &lt;!DOCTYPE&gt; tag.
   * 2. If it is an end tag, this group will have the '/'.
   * 3. The tag name for all tags (other than the &lt;!DOCTYPE&gt; tag)
   */
		htmlRegex: function () {
			var tagNameRegex = /[0-9a-zA-Z][0-9a-zA-Z:]*/,
			    attrNameRegex = /[^\s\0"'>\/=\x01-\x1F\x7F]+/,
			    // the unicode range accounts for excluding control chars, and the delete char
			attrValueRegex = /(?:"[^"]*?"|'[^']*?'|[^'"=<>`\s]+)/,
			    // double quoted, single quoted, or unquoted attribute values
			nameEqualsValueRegex = attrNameRegex.source + '(?:\\s*=\\s*' + attrValueRegex.source + ')?'; // optional '=[value]'

			return new RegExp([
			// for <!DOCTYPE> tag. Ex: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">) 
			'(?:', '<(!DOCTYPE)', // *** Capturing Group 1 - If it's a doctype tag

			// Zero or more attributes following the tag name
			'(?:', '\\s+', // one or more whitespace chars before an attribute

			// Either:
			// A. attr="value", or 
			// B. "value" alone (To cover example doctype tag: <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">) 
			'(?:', nameEqualsValueRegex, '|', attrValueRegex.source + ')', ')*', '>', ')', '|',

			// All other HTML tags (i.e. tags that are not <!DOCTYPE>)
			'(?:', '<(/)?', // Beginning of a tag. Either '<' for a start tag, or '</' for an end tag. 
			// *** Capturing Group 2: The slash or an empty string. Slash ('/') for end tag, empty string for start or self-closing tag.

			// *** Capturing Group 3 - The tag name
			'(' + tagNameRegex.source + ')',

			// Zero or more attributes following the tag name
			'(?:', '\\s+', // one or more whitespace chars before an attribute
			nameEqualsValueRegex, // attr="value" (with optional ="value" part)
			')*', '\\s*/?', // any trailing spaces and optional '/' before the closing '>'
			'>', ')'].join(""), 'gi');
		}(),

		/**
   * @private
   * @property {RegExp} htmlCharacterEntitiesRegex
   *
   * The regular expression that matches common HTML character entities.
   * 
   * Ignoring &amp; as it could be part of a query string -- handling it separately.
   */
		htmlCharacterEntitiesRegex: /(&nbsp;|&#160;|&lt;|&#60;|&gt;|&#62;|&quot;|&#34;|&#39;)/gi,

		/**
   * Parses an HTML string and returns a simple array of {@link Autolinker.htmlParser.HtmlNode HtmlNodes} to represent
   * the HTML structure of the input string. 
   * 
   * @param {String} html The HTML to parse.
   * @return {Autolinker.htmlParser.HtmlNode[]}
   */
		parse: function parse(html) {
			var htmlRegex = this.htmlRegex,
			    currentResult,
			    lastIndex = 0,
			    textAndEntityNodes,
			    nodes = []; // will be the result of the method

			while ((currentResult = htmlRegex.exec(html)) !== null) {
				var tagText = currentResult[0],
				    tagName = currentResult[1] || currentResult[3],
				    // The <!DOCTYPE> tag (ex: "!DOCTYPE"), or another tag (ex: "a" or "img") 
				isClosingTag = !!currentResult[2],
				    inBetweenTagsText = html.substring(lastIndex, currentResult.index);

				// Push TextNodes and EntityNodes for any text found between tags
				if (inBetweenTagsText) {
					textAndEntityNodes = this.parseTextAndEntityNodes(inBetweenTagsText);
					nodes.push.apply(nodes, textAndEntityNodes);
				}

				// Push the ElementNode
				nodes.push(this.createElementNode(tagText, tagName, isClosingTag));

				lastIndex = currentResult.index + tagText.length;
			}

			// Process any remaining text after the last HTML element. Will process all of the text if there were no HTML elements.
			if (lastIndex < html.length) {
				var text = html.substring(lastIndex);

				// Push TextNodes and EntityNodes for any text found between tags
				if (text) {
					textAndEntityNodes = this.parseTextAndEntityNodes(text);
					nodes.push.apply(nodes, textAndEntityNodes);
				}
			}

			return nodes;
		},

		/**
   * Parses text and HTML entity nodes from a given string. The input string should not have any HTML tags (elements)
   * within it.
   * 
   * @private
   * @param {String} text The text to parse.
   * @return {Autolinker.htmlParser.HtmlNode[]} An array of HtmlNodes to represent the 
   *   {@link Autolinker.htmlParser.TextNode TextNodes} and {@link Autolinker.htmlParser.EntityNode EntityNodes} found.
   */
		parseTextAndEntityNodes: function parseTextAndEntityNodes(text) {
			var nodes = [],
			    textAndEntityTokens = Autolinker.Util.splitAndCapture(text, this.htmlCharacterEntitiesRegex); // split at HTML entities, but include the HTML entities in the results array

			// Every even numbered token is a TextNode, and every odd numbered token is an EntityNode
			// For example: an input `text` of "Test &quot;this&quot; today" would turn into the 
			//   `textAndEntityTokens`: [ 'Test ', '&quot;', 'this', '&quot;', ' today' ]
			for (var i = 0, len = textAndEntityTokens.length; i < len; i += 2) {
				var textToken = textAndEntityTokens[i],
				    entityToken = textAndEntityTokens[i + 1];

				if (textToken) nodes.push(this.createTextNode(textToken));
				if (entityToken) nodes.push(this.createEntityNode(entityToken));
			}
			return nodes;
		},

		/**
   * Factory method to create an {@link Autolinker.htmlParser.ElementNode ElementNode}.
   * 
   * @private
   * @param {String} tagText The full text of the tag (element) that was matched, including its attributes.
   * @param {String} tagName The name of the tag. Ex: An &lt;img&gt; tag would be passed to this method as "img".
   * @param {Boolean} isClosingTag `true` if it's a closing tag, false otherwise.
   * @return {Autolinker.htmlParser.ElementNode}
   */
		createElementNode: function createElementNode(tagText, tagName, isClosingTag) {
			return new Autolinker.htmlParser.ElementNode({
				text: tagText,
				tagName: tagName.toLowerCase(),
				closing: isClosingTag
			});
		},

		/**
   * Factory method to create a {@link Autolinker.htmlParser.EntityNode EntityNode}.
   * 
   * @private
   * @param {String} text The text that was matched for the HTML entity (such as '&amp;nbsp;').
   * @return {Autolinker.htmlParser.EntityNode}
   */
		createEntityNode: function createEntityNode(text) {
			return new Autolinker.htmlParser.EntityNode({ text: text });
		},

		/**
   * Factory method to create a {@link Autolinker.htmlParser.TextNode TextNode}.
   * 
   * @private
   * @param {String} text The text that was matched.
   * @return {Autolinker.htmlParser.TextNode}
   */
		createTextNode: function createTextNode(text) {
			return new Autolinker.htmlParser.TextNode({ text: text });
		}

	});
	/*global Autolinker */
	/**
  * @abstract
  * @class Autolinker.htmlParser.HtmlNode
  * 
  * Represents an HTML node found in an input string. An HTML node is one of the following:
  * 
  * 1. An {@link Autolinker.htmlParser.ElementNode ElementNode}, which represents HTML tags.
  * 2. A {@link Autolinker.htmlParser.TextNode TextNode}, which represents text outside or within HTML tags.
  * 3. A {@link Autolinker.htmlParser.EntityNode EntityNode}, which represents one of the known HTML
  *    entities that Autolinker looks for. This includes common ones such as &amp;quot; and &amp;nbsp;
  */
	Autolinker.htmlParser.HtmlNode = Autolinker.Util.extend(Object, {

		/**
   * @cfg {String} text (required)
   * 
   * The original text that was matched for the HtmlNode. 
   * 
   * - In the case of an {@link Autolinker.htmlParser.ElementNode ElementNode}, this will be the tag's
   *   text.
   * - In the case of a {@link Autolinker.htmlParser.TextNode TextNode}, this will be the text itself.
   * - In the case of a {@link Autolinker.htmlParser.EntityNode EntityNode}, this will be the text of
   *   the HTML entity.
   */
		text: "",

		/**
   * @constructor
   * @param {Object} cfg The configuration properties for the Match instance, specified in an Object (map).
   */
		constructor: function constructor(cfg) {
			Autolinker.Util.assign(this, cfg);
		},

		/**
   * Returns a string name for the type of node that this class represents.
   * 
   * @abstract
   * @return {String}
   */
		getType: Autolinker.Util.abstractMethod,

		/**
   * Retrieves the {@link #text} for the HtmlNode.
   * 
   * @return {String}
   */
		getText: function getText() {
			return this.text;
		}

	});
	/*global Autolinker */
	/**
  * @class Autolinker.htmlParser.ElementNode
  * @extends Autolinker.htmlParser.HtmlNode
  * 
  * Represents an HTML element node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
  * 
  * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more details.
  */
	Autolinker.htmlParser.ElementNode = Autolinker.Util.extend(Autolinker.htmlParser.HtmlNode, {

		/**
   * @cfg {String} tagName (required)
   * 
   * The name of the tag that was matched.
   */
		tagName: '',

		/**
   * @cfg {Boolean} closing (required)
   * 
   * `true` if the element (tag) is a closing tag, `false` if its an opening tag.
   */
		closing: false,

		/**
   * Returns a string name for the type of node that this class represents.
   * 
   * @return {String}
   */
		getType: function getType() {
			return 'element';
		},

		/**
   * Returns the HTML element's (tag's) name. Ex: for an &lt;img&gt; tag, returns "img".
   * 
   * @return {String}
   */
		getTagName: function getTagName() {
			return this.tagName;
		},

		/**
   * Determines if the HTML element (tag) is a closing tag. Ex: &lt;div&gt; returns
   * `false`, while &lt;/div&gt; returns `true`.
   * 
   * @return {Boolean}
   */
		isClosing: function isClosing() {
			return this.closing;
		}

	});
	/*global Autolinker */
	/**
  * @class Autolinker.htmlParser.EntityNode
  * @extends Autolinker.htmlParser.HtmlNode
  * 
  * Represents a known HTML entity node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
  * Ex: '&amp;nbsp;', or '&amp#160;' (which will be retrievable from the {@link #getText} method.
  * 
  * Note that this class will only be returned from the HtmlParser for the set of checked HTML entity nodes 
  * defined by the {@link Autolinker.htmlParser.HtmlParser#htmlCharacterEntitiesRegex}.
  * 
  * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more details.
  */
	Autolinker.htmlParser.EntityNode = Autolinker.Util.extend(Autolinker.htmlParser.HtmlNode, {

		/**
   * Returns a string name for the type of node that this class represents.
   * 
   * @return {String}
   */
		getType: function getType() {
			return 'entity';
		}

	});
	/*global Autolinker */
	/**
  * @class Autolinker.htmlParser.TextNode
  * @extends Autolinker.htmlParser.HtmlNode
  * 
  * Represents a text node that has been parsed by the {@link Autolinker.htmlParser.HtmlParser}.
  * 
  * See this class's superclass ({@link Autolinker.htmlParser.HtmlNode}) for more details.
  */
	Autolinker.htmlParser.TextNode = Autolinker.Util.extend(Autolinker.htmlParser.HtmlNode, {

		/**
   * Returns a string name for the type of node that this class represents.
   * 
   * @return {String}
   */
		getType: function getType() {
			return 'text';
		}

	});
	/*global Autolinker */
	/**
  * @private
  * @class Autolinker.matchParser.MatchParser
  * @extends Object
  * 
  * Used by Autolinker to parse {@link #urls URLs}, {@link #emails email addresses}, and {@link #twitter Twitter handles}, 
  * given an input string of text.
  * 
  * The MatchParser is fed a non-HTML string in order to search out URLs, email addresses and Twitter handles. Autolinker
  * first uses the {@link HtmlParser} to "walk around" HTML tags, and then the text around the HTML tags is passed into
  * the MatchParser in order to find the actual matches.
  */
	Autolinker.matchParser.MatchParser = Autolinker.Util.extend(Object, {

		/**
   * @cfg {Boolean} urls
   * 
   * `true` if miscellaneous URLs should be automatically linked, `false` if they should not be.
   */
		urls: true,

		/**
   * @cfg {Boolean} email
   * 
   * `true` if email addresses should be automatically linked, `false` if they should not be.
   */
		email: true,

		/**
   * @cfg {Boolean} twitter
   * 
   * `true` if Twitter handles ("@example") should be automatically linked, `false` if they should not be.
   */
		twitter: true,

		/**
   * @cfg {Boolean} stripPrefix
   * 
   * `true` if 'http://' or 'https://' and/or the 'www.' should be stripped from the beginning of URL links' text
   * in {@link Autolinker.match.Url URL matches}, `false` otherwise.
   * 
   * TODO: Handle this before a URL Match object is instantiated.
   */
		stripPrefix: true,

		/**
   * @private
   * @property {RegExp} matcherRegex
   * 
   * The regular expression that matches URLs, email addresses, and Twitter handles.
   * 
   * This regular expression has the following capturing groups:
   * 
   * 1. Group that is used to determine if there is a Twitter handle match (i.e. \@someTwitterUser). Simply check for its 
   *    existence to determine if there is a Twitter handle match. The next couple of capturing groups give information 
   *    about the Twitter handle match.
   * 2. The whitespace character before the \@sign in a Twitter handle. This is needed because there are no lookbehinds in
   *    JS regular expressions, and can be used to reconstruct the original string in a replace().
   * 3. The Twitter handle itself in a Twitter match. If the match is '@someTwitterUser', the handle is 'someTwitterUser'.
   * 4. Group that matches an email address. Used to determine if the match is an email address, as well as holding the full 
   *    address. Ex: 'me@my.com'
   * 5. Group that matches a URL in the input text. Ex: 'http://google.com', 'www.google.com', or just 'google.com'.
   *    This also includes a path, url parameters, or hash anchors. Ex: google.com/path/to/file?q1=1&q2=2#myAnchor
   * 6. Group that matches a protocol URL (i.e. 'http://google.com'). This is used to match protocol URLs with just a single
   *    word, like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
   * 7. A protocol-relative ('//') match for the case of a 'www.' prefixed URL. Will be an empty string if it is not a 
   *    protocol-relative match. We need to know the character before the '//' in order to determine if it is a valid match
   *    or the // was in a string we don't want to auto-link.
   * 8. A protocol-relative ('//') match for the case of a known TLD prefixed URL. Will be an empty string if it is not a 
   *    protocol-relative match. See #6 for more info. 
   */
		matcherRegex: function () {
			var twitterRegex = /(^|[^\w])@(\w{1,15})/,
			    // For matching a twitter handle. Ex: @gregory_jacobs

			emailRegex = /(?:[\-;:&=\+\$,\w\.]+@)/,
			    // something@ for email addresses (a.k.a. local-part)

			protocolRegex = /(?:[A-Za-z][-.+A-Za-z0-9]+:(?![A-Za-z][-.+A-Za-z0-9]+:\/\/)(?!\d+\/?)(?:\/\/)?)/,
			    // match protocol, allow in format "http://" or "mailto:". However, do not match the first part of something like 'link:http://www.google.com' (i.e. don't match "link:"). Also, make sure we don't interpret 'google.com:8000' as if 'google.com' was a protocol here (i.e. ignore a trailing port number in this regex)
			wwwRegex = /(?:www\.)/,
			    // starting with 'www.'
			domainNameRegex = /[A-Za-z0-9\.\-]*[A-Za-z0-9\-]/,
			    // anything looking at all like a domain, non-unicode domains, not ending in a period
			tldRegex = /\.(?:international|construction|contractors|enterprises|photography|productions|foundation|immobilien|industries|management|properties|technology|christmas|community|directory|education|equipment|institute|marketing|solutions|vacations|bargains|boutique|builders|catering|cleaning|clothing|computer|democrat|diamonds|graphics|holdings|lighting|partners|plumbing|supplies|training|ventures|academy|careers|company|cruises|domains|exposed|flights|florist|gallery|guitars|holiday|kitchen|neustar|okinawa|recipes|rentals|reviews|shiksha|singles|support|systems|agency|berlin|camera|center|coffee|condos|dating|estate|events|expert|futbol|kaufen|luxury|maison|monash|museum|nagoya|photos|repair|report|social|supply|tattoo|tienda|travel|viajes|villas|vision|voting|voyage|actor|build|cards|cheap|codes|dance|email|glass|house|mango|ninja|parts|photo|shoes|solar|today|tokyo|tools|watch|works|aero|arpa|asia|best|bike|blue|buzz|camp|club|cool|coop|farm|fish|gift|guru|info|jobs|kiwi|kred|land|limo|link|menu|mobi|moda|name|pics|pink|post|qpon|rich|ruhr|sexy|tips|vote|voto|wang|wien|wiki|zone|bar|bid|biz|cab|cat|ceo|com|edu|gov|int|kim|mil|net|onl|org|pro|pub|red|tel|uno|wed|xxx|xyz|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mm|mn|mo|mp|mq|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|za|zm|zw)\b/,
			    // match our known top level domains (TLDs)

			// Allow optional path, query string, and hash anchor, not ending in the following characters: "?!:,.;"
			// http://blog.codinghorror.com/the-problem-with-urls/
			urlSuffixRegex = /[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]?!:,.;]*[\-A-Za-z0-9+&@#\/%=~_()|'$*\[\]]/;

			return new RegExp(['(', // *** Capturing group $1, which can be used to check for a twitter handle match. Use group $3 for the actual twitter handle though. $2 may be used to reconstruct the original string in a replace() 
			// *** Capturing group $2, which matches the whitespace character before the '@' sign (needed because of no lookbehinds), and 
			// *** Capturing group $3, which matches the actual twitter handle
			twitterRegex.source, ')', '|', '(', // *** Capturing group $4, which is used to determine an email match
			emailRegex.source, domainNameRegex.source, tldRegex.source, ')', '|', '(', // *** Capturing group $5, which is used to match a URL
			'(?:', // parens to cover match for protocol (optional), and domain
			'(', // *** Capturing group $6, for a protocol-prefixed url (ex: http://google.com)
			protocolRegex.source, domainNameRegex.source, ')', '|', '(?:', // non-capturing paren for a 'www.' prefixed url (ex: www.google.com)
			'(.?//)?', // *** Capturing group $7 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character
			wwwRegex.source, domainNameRegex.source, ')', '|', '(?:', // non-capturing paren for known a TLD url (ex: google.com)
			'(.?//)?', // *** Capturing group $8 for an optional protocol-relative URL. Must be at the beginning of the string or start with a non-word character
			domainNameRegex.source, tldRegex.source, ')', ')', '(?:' + urlSuffixRegex.source + ')?', // match for path, query string, and/or hash anchor - optional
			')'].join(""), 'gi');
		}(),

		/**
   * @private
   * @property {RegExp} charBeforeProtocolRelMatchRegex
   * 
   * The regular expression used to retrieve the character before a protocol-relative URL match.
   * 
   * This is used in conjunction with the {@link #matcherRegex}, which needs to grab the character before a protocol-relative
   * '//' due to the lack of a negative look-behind in JavaScript regular expressions. The character before the match is stripped
   * from the URL.
   */
		charBeforeProtocolRelMatchRegex: /^(.)?\/\//,

		/**
   * @private
   * @property {Autolinker.MatchValidator} matchValidator
   * 
   * The MatchValidator object, used to filter out any false positives from the {@link #matcherRegex}. See
   * {@link Autolinker.MatchValidator} for details.
   */

		/**
   * @constructor
   * @param {Object} [cfg] The configuration options for the AnchorTagBuilder instance, specified in an Object (map).
   */
		constructor: function constructor(cfg) {
			Autolinker.Util.assign(this, cfg);

			this.matchValidator = new Autolinker.MatchValidator();
		},

		/**
   * Parses the input `text` to search for URLs/emails/Twitter handles, and calls the `replaceFn`
   * to allow replacements of the matches. Returns the `text` with matches replaced.
   * 
   * @param {String} text The text to search and repace matches in.
   * @param {Function} replaceFn The iterator function to handle the replacements. The function takes a
   *   single argument, a {@link Autolinker.match.Match} object, and should return the text that should
   *   make the replacement.
   * @param {Object} [contextObj=window] The context object ("scope") to run the `replaceFn` in.
   * @return {String}
   */
		replace: function replace(text, replaceFn, contextObj) {
			var me = this; // for closure

			return text.replace(this.matcherRegex, function (matchStr, $1, $2, $3, $4, $5, $6, $7, $8) {
				var matchDescObj = me.processCandidateMatch(matchStr, $1, $2, $3, $4, $5, $6, $7, $8); // "match description" object

				// Return out with no changes for match types that are disabled (url, email, twitter), or for matches that are 
				// invalid (false positives from the matcherRegex, which can't use look-behinds since they are unavailable in JS).
				if (!matchDescObj) {
					return matchStr;
				} else {
					// Generate replacement text for the match from the `replaceFn`
					var replaceStr = replaceFn.call(contextObj, matchDescObj.match);
					return matchDescObj.prefixStr + replaceStr + matchDescObj.suffixStr;
				}
			});
		},

		/**
   * Processes a candidate match from the {@link #matcherRegex}. 
   * 
   * Not all matches found by the regex are actual URL/email/Twitter matches, as determined by the {@link #matchValidator}. In
   * this case, the method returns `null`. Otherwise, a valid Object with `prefixStr`, `match`, and `suffixStr` is returned.
   * 
   * @private
   * @param {String} matchStr The full match that was found by the {@link #matcherRegex}.
   * @param {String} twitterMatch The matched text of a Twitter handle, if the match is a Twitter match.
   * @param {String} twitterHandlePrefixWhitespaceChar The whitespace char before the @ sign in a Twitter handle match. This 
   *   is needed because of no lookbehinds in JS regexes, and is need to re-include the character for the anchor tag replacement.
   * @param {String} twitterHandle The actual Twitter user (i.e the word after the @ sign in a Twitter match).
   * @param {String} emailAddressMatch The matched email address for an email address match.
   * @param {String} urlMatch The matched URL string for a URL match.
   * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to match
   *   something like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
   * @param {String} wwwProtocolRelativeMatch The '//' for a protocol-relative match from a 'www' url, with the character that 
   *   comes before the '//'.
   * @param {String} tldProtocolRelativeMatch The '//' for a protocol-relative match from a TLD (top level domain) match, with 
   *   the character that comes before the '//'.
   *   
   * @return {Object} A "match description object". This will be `null` if the match was invalid, or if a match type is disabled.
   *   Otherwise, this will be an Object (map) with the following properties:
   * @return {String} return.prefixStr The char(s) that should be prepended to the replacement string. These are char(s) that
   *   were needed to be included from the regex match that were ignored by processing code, and should be re-inserted into 
   *   the replacement stream.
   * @return {String} return.suffixStr The char(s) that should be appended to the replacement string. These are char(s) that
   *   were needed to be included from the regex match that were ignored by processing code, and should be re-inserted into 
   *   the replacement stream.
   * @return {Autolinker.match.Match} return.match The Match object that represents the match that was found.
   */
		processCandidateMatch: function processCandidateMatch(matchStr, twitterMatch, twitterHandlePrefixWhitespaceChar, twitterHandle, emailAddressMatch, urlMatch, protocolUrlMatch, wwwProtocolRelativeMatch, tldProtocolRelativeMatch) {
			// Note: The `matchStr` variable wil be fixed up to remove characters that are no longer needed (which will 
			// be added to `prefixStr` and `suffixStr`).

			var protocolRelativeMatch = wwwProtocolRelativeMatch || tldProtocolRelativeMatch,
			    match,
			    // Will be an Autolinker.match.Match object

			prefixStr = "",
			    // A string to use to prefix the anchor tag that is created. This is needed for the Twitter handle match
			suffixStr = ""; // A string to suffix the anchor tag that is created. This is used if there is a trailing parenthesis that should not be auto-linked.


			// Return out with `null` for match types that are disabled (url, email, twitter), or for matches that are 
			// invalid (false positives from the matcherRegex, which can't use look-behinds since they are unavailable in JS).
			if (twitterMatch && !this.twitter || emailAddressMatch && !this.email || urlMatch && !this.urls || !this.matchValidator.isValidMatch(urlMatch, protocolUrlMatch, protocolRelativeMatch)) {
				return null;
			}

			// Handle a closing parenthesis at the end of the match, and exclude it if there is not a matching open parenthesis
			// in the match itself. 
			if (this.matchHasUnbalancedClosingParen(matchStr)) {
				matchStr = matchStr.substr(0, matchStr.length - 1); // remove the trailing ")"
				suffixStr = ")"; // this will be added after the generated <a> tag
			}

			if (emailAddressMatch) {
				match = new Autolinker.match.Email({ matchedText: matchStr, email: emailAddressMatch });
			} else if (twitterMatch) {
				// fix up the `matchStr` if there was a preceding whitespace char, which was needed to determine the match 
				// itself (since there are no look-behinds in JS regexes)
				if (twitterHandlePrefixWhitespaceChar) {
					prefixStr = twitterHandlePrefixWhitespaceChar;
					matchStr = matchStr.slice(1); // remove the prefixed whitespace char from the match
				}
				match = new Autolinker.match.Twitter({ matchedText: matchStr, twitterHandle: twitterHandle });
			} else {
				// url match
				// If it's a protocol-relative '//' match, remove the character before the '//' (which the matcherRegex needed
				// to match due to the lack of a negative look-behind in JavaScript regular expressions)
				if (protocolRelativeMatch) {
					var charBeforeMatch = protocolRelativeMatch.match(this.charBeforeProtocolRelMatchRegex)[1] || "";

					if (charBeforeMatch) {
						// fix up the `matchStr` if there was a preceding char before a protocol-relative match, which was needed to determine the match itself (since there are no look-behinds in JS regexes)
						prefixStr = charBeforeMatch;
						matchStr = matchStr.slice(1); // remove the prefixed char from the match
					}
				}

				match = new Autolinker.match.Url({
					matchedText: matchStr,
					url: matchStr,
					protocolUrlMatch: !!protocolUrlMatch,
					protocolRelativeMatch: !!protocolRelativeMatch,
					stripPrefix: this.stripPrefix
				});
			}

			return {
				prefixStr: prefixStr,
				suffixStr: suffixStr,
				match: match
			};
		},

		/**
   * Determines if a match found has an unmatched closing parenthesis. If so, this parenthesis will be removed
   * from the match itself, and appended after the generated anchor tag in {@link #processTextNode}.
   * 
   * A match may have an extra closing parenthesis at the end of the match because the regular expression must include parenthesis
   * for URLs such as "wikipedia.com/something_(disambiguation)", which should be auto-linked. 
   * 
   * However, an extra parenthesis *will* be included when the URL itself is wrapped in parenthesis, such as in the case of
   * "(wikipedia.com/something_(disambiguation))". In this case, the last closing parenthesis should *not* be part of the URL 
   * itself, and this method will return `true`.
   * 
   * @private
   * @param {String} matchStr The full match string from the {@link #matcherRegex}.
   * @return {Boolean} `true` if there is an unbalanced closing parenthesis at the end of the `matchStr`, `false` otherwise.
   */
		matchHasUnbalancedClosingParen: function matchHasUnbalancedClosingParen(matchStr) {
			var lastChar = matchStr.charAt(matchStr.length - 1);

			if (lastChar === ')') {
				var openParensMatch = matchStr.match(/\(/g),
				    closeParensMatch = matchStr.match(/\)/g),
				    numOpenParens = openParensMatch && openParensMatch.length || 0,
				    numCloseParens = closeParensMatch && closeParensMatch.length || 0;

				if (numOpenParens < numCloseParens) {
					return true;
				}
			}

			return false;
		}

	});
	/*global Autolinker */
	/*jshint scripturl:true */
	/**
  * @private
  * @class Autolinker.MatchValidator
  * @extends Object
  * 
  * Used by Autolinker to filter out false positives from the {@link Autolinker#matcherRegex}.
  * 
  * Due to the limitations of regular expressions (including the missing feature of look-behinds in JS regular expressions),
  * we cannot always determine the validity of a given match. This class applies a bit of additional logic to filter out any
  * false positives that have been matched by the {@link Autolinker#matcherRegex}.
  */
	Autolinker.MatchValidator = Autolinker.Util.extend(Object, {

		/**
   * @private
   * @property {RegExp} invalidProtocolRelMatchRegex
   * 
   * The regular expression used to check a potential protocol-relative URL match, coming from the 
   * {@link Autolinker#matcherRegex}. A protocol-relative URL is, for example, "//yahoo.com"
   * 
   * This regular expression checks to see if there is a word character before the '//' match in order to determine if 
   * we should actually autolink a protocol-relative URL. This is needed because there is no negative look-behind in 
   * JavaScript regular expressions. 
   * 
   * For instance, we want to autolink something like "Go to: //google.com", but we don't want to autolink something 
   * like "abc//google.com"
   */
		invalidProtocolRelMatchRegex: /^[\w]\/\//,

		/**
   * Regex to test for a full protocol, with the two trailing slashes. Ex: 'http://'
   * 
   * @private
   * @property {RegExp} hasFullProtocolRegex
   */
		hasFullProtocolRegex: /^[A-Za-z][-.+A-Za-z0-9]+:\/\//,

		/**
   * Regex to find the URI scheme, such as 'mailto:'.
   * 
   * This is used to filter out 'javascript:' and 'vbscript:' schemes.
   * 
   * @private
   * @property {RegExp} uriSchemeRegex
   */
		uriSchemeRegex: /^[A-Za-z][-.+A-Za-z0-9]+:/,

		/**
   * Regex to determine if at least one word char exists after the protocol (i.e. after the ':')
   * 
   * @private
   * @property {RegExp} hasWordCharAfterProtocolRegex
   */
		hasWordCharAfterProtocolRegex: /:[^\s]*?[A-Za-z]/,

		/**
   * Determines if a given match found by {@link Autolinker#processTextNode} is valid. Will return `false` for:
   * 
   * 1) URL matches which do not have at least have one period ('.') in the domain name (effectively skipping over 
   *    matches like "abc:def"). However, URL matches with a protocol will be allowed (ex: 'http://localhost')
   * 2) URL matches which do not have at least one word character in the domain name (effectively skipping over
   *    matches like "git:1.0").
   * 3) A protocol-relative url match (a URL beginning with '//') whose previous character is a word character 
   *    (effectively skipping over strings like "abc//google.com")
   * 
   * Otherwise, returns `true`.
   * 
   * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
   * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to match
   *   something like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
   * @param {String} protocolRelativeMatch The protocol-relative string for a URL match (i.e. '//'), possibly with a preceding
   *   character (ex, a space, such as: ' //', or a letter, such as: 'a//'). The match is invalid if there is a word character
   *   preceding the '//'.
   * @return {Boolean} `true` if the match given is valid and should be processed, or `false` if the match is invalid and/or 
   *   should just not be processed.
   */
		isValidMatch: function isValidMatch(urlMatch, protocolUrlMatch, protocolRelativeMatch) {
			if (protocolUrlMatch && !this.isValidUriScheme(protocolUrlMatch) || this.urlMatchDoesNotHaveProtocolOrDot(urlMatch, protocolUrlMatch) || // At least one period ('.') must exist in the URL match for us to consider it an actual URL, *unless* it was a full protocol match (like 'http://localhost')
			this.urlMatchDoesNotHaveAtLeastOneWordChar(urlMatch, protocolUrlMatch) || // At least one letter character must exist in the domain name after a protocol match. Ex: skip over something like "git:1.0"
			this.isInvalidProtocolRelativeMatch(protocolRelativeMatch) // A protocol-relative match which has a word character in front of it (so we can skip something like "abc//google.com")
			) {
					return false;
				}

			return true;
		},

		/**
   * Determines if the URI scheme is a valid scheme to be autolinked. Returns `false` if the scheme is 
   * 'javascript:' or 'vbscript:'
   * 
   * @private
   * @param {String} uriSchemeMatch The match URL string for a full URI scheme match. Ex: 'http://yahoo.com' 
   *   or 'mailto:a@a.com'.
   * @return {Boolean} `true` if the scheme is a valid one, `false` otherwise.
   */
		isValidUriScheme: function isValidUriScheme(uriSchemeMatch) {
			var uriScheme = uriSchemeMatch.match(this.uriSchemeRegex)[0].toLowerCase();

			return uriScheme !== 'javascript:' && uriScheme !== 'vbscript:';
		},

		/**
   * Determines if a URL match does not have either:
   * 
   * a) a full protocol (i.e. 'http://'), or
   * b) at least one dot ('.') in the domain name (for a non-full-protocol match).
   * 
   * Either situation is considered an invalid URL (ex: 'git:d' does not have either the '://' part, or at least one dot
   * in the domain name. If the match was 'git:abc.com', we would consider this valid.)
   * 
   * @private
   * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
   * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to match
   *   something like 'http://localhost', where we won't double check that the domain name has at least one '.' in it.
   * @return {Boolean} `true` if the URL match does not have a full protocol, or at least one dot ('.') in a non-full-protocol
   *   match.
   */
		urlMatchDoesNotHaveProtocolOrDot: function urlMatchDoesNotHaveProtocolOrDot(urlMatch, protocolUrlMatch) {
			return !!urlMatch && (!protocolUrlMatch || !this.hasFullProtocolRegex.test(protocolUrlMatch)) && urlMatch.indexOf('.') === -1;
		},

		/**
   * Determines if a URL match does not have at least one word character after the protocol (i.e. in the domain name).
   * 
   * At least one letter character must exist in the domain name after a protocol match. Ex: skip over something 
   * like "git:1.0"
   * 
   * @private
   * @param {String} urlMatch The matched URL, if there was one. Will be an empty string if the match is not a URL match.
   * @param {String} protocolUrlMatch The match URL string for a protocol match. Ex: 'http://yahoo.com'. This is used to
   *   know whether or not we have a protocol in the URL string, in order to check for a word character after the protocol
   *   separator (':').
   * @return {Boolean} `true` if the URL match does not have at least one word character in it after the protocol, `false`
   *   otherwise.
   */
		urlMatchDoesNotHaveAtLeastOneWordChar: function urlMatchDoesNotHaveAtLeastOneWordChar(urlMatch, protocolUrlMatch) {
			if (urlMatch && protocolUrlMatch) {
				return !this.hasWordCharAfterProtocolRegex.test(urlMatch);
			} else {
				return false;
			}
		},

		/**
   * Determines if a protocol-relative match is an invalid one. This method returns `true` if there is a `protocolRelativeMatch`,
   * and that match contains a word character before the '//' (i.e. it must contain whitespace or nothing before the '//' in
   * order to be considered valid).
   * 
   * @private
   * @param {String} protocolRelativeMatch The protocol-relative string for a URL match (i.e. '//'), possibly with a preceding
   *   character (ex, a space, such as: ' //', or a letter, such as: 'a//'). The match is invalid if there is a word character
   *   preceding the '//'.
   * @return {Boolean} `true` if it is an invalid protocol-relative match, `false` otherwise.
   */
		isInvalidProtocolRelativeMatch: function isInvalidProtocolRelativeMatch(protocolRelativeMatch) {
			return !!protocolRelativeMatch && this.invalidProtocolRelMatchRegex.test(protocolRelativeMatch);
		}

	});
	/*global Autolinker */
	/**
  * @abstract
  * @class Autolinker.match.Match
  * 
  * Represents a match found in an input string which should be Autolinked. A Match object is what is provided in a 
  * {@link Autolinker#replaceFn replaceFn}, and may be used to query for details about the match.
  * 
  * For example:
  * 
  *     var input = "...";  // string with URLs, Email Addresses, and Twitter Handles
  *     
  *     var linkedText = Autolinker.link( input, {
  *         replaceFn : function( autolinker, match ) {
  *             console.log( "href = ", match.getAnchorHref() );
  *             console.log( "text = ", match.getAnchorText() );
  *         
  *             switch( match.getType() ) {
  *                 case 'url' : 
  *                     console.log( "url: ", match.getUrl() );
  *                     
  *                 case 'email' :
  *                     console.log( "email: ", match.getEmail() );
  *                     
  *                 case 'twitter' :
  *                     console.log( "twitter: ", match.getTwitterHandle() );
  *             }
  *         }
  *     } );
  *     
  * See the {@link Autolinker} class for more details on using the {@link Autolinker#replaceFn replaceFn}.
  */
	Autolinker.match.Match = Autolinker.Util.extend(Object, {

		/**
   * @cfg {String} matchedText (required)
   * 
   * The original text that was matched.
   */

		/**
   * @constructor
   * @param {Object} cfg The configuration properties for the Match instance, specified in an Object (map).
   */
		constructor: function constructor(cfg) {
			Autolinker.Util.assign(this, cfg);
		},

		/**
   * Returns a string name for the type of match that this class represents.
   * 
   * @abstract
   * @return {String}
   */
		getType: Autolinker.Util.abstractMethod,

		/**
   * Returns the original text that was matched.
   * 
   * @return {String}
   */
		getMatchedText: function getMatchedText() {
			return this.matchedText;
		},

		/**
   * Returns the anchor href that should be generated for the match.
   * 
   * @abstract
   * @return {String}
   */
		getAnchorHref: Autolinker.Util.abstractMethod,

		/**
   * Returns the anchor text that should be generated for the match.
   * 
   * @abstract
   * @return {String}
   */
		getAnchorText: Autolinker.Util.abstractMethod

	});
	/*global Autolinker */
	/**
  * @class Autolinker.match.Email
  * @extends Autolinker.match.Match
  * 
  * Represents a Email match found in an input string which should be Autolinked.
  * 
  * See this class's superclass ({@link Autolinker.match.Match}) for more details.
  */
	Autolinker.match.Email = Autolinker.Util.extend(Autolinker.match.Match, {

		/**
   * @cfg {String} email (required)
   * 
   * The email address that was matched.
   */

		/**
   * Returns a string name for the type of match that this class represents.
   * 
   * @return {String}
   */
		getType: function getType() {
			return 'email';
		},

		/**
   * Returns the email address that was matched.
   * 
   * @return {String}
   */
		getEmail: function getEmail() {
			return this.email;
		},

		/**
   * Returns the anchor href that should be generated for the match.
   * 
   * @return {String}
   */
		getAnchorHref: function getAnchorHref() {
			return 'mailto:' + this.email;
		},

		/**
   * Returns the anchor text that should be generated for the match.
   * 
   * @return {String}
   */
		getAnchorText: function getAnchorText() {
			return this.email;
		}

	});
	/*global Autolinker */
	/**
  * @class Autolinker.match.Twitter
  * @extends Autolinker.match.Match
  * 
  * Represents a Twitter match found in an input string which should be Autolinked.
  * 
  * See this class's superclass ({@link Autolinker.match.Match}) for more details.
  */
	Autolinker.match.Twitter = Autolinker.Util.extend(Autolinker.match.Match, {

		/**
   * @cfg {String} twitterHandle (required)
   * 
   * The Twitter handle that was matched.
   */

		/**
   * Returns the type of match that this class represents.
   * 
   * @return {String}
   */
		getType: function getType() {
			return 'twitter';
		},

		/**
   * Returns a string name for the type of match that this class represents.
   * 
   * @return {String}
   */
		getTwitterHandle: function getTwitterHandle() {
			return this.twitterHandle;
		},

		/**
   * Returns the anchor href that should be generated for the match.
   * 
   * @return {String}
   */
		getAnchorHref: function getAnchorHref() {
			return 'https://twitter.com/' + this.twitterHandle;
		},

		/**
   * Returns the anchor text that should be generated for the match.
   * 
   * @return {String}
   */
		getAnchorText: function getAnchorText() {
			return '@' + this.twitterHandle;
		}

	});
	/*global Autolinker */
	/**
  * @class Autolinker.match.Url
  * @extends Autolinker.match.Match
  * 
  * Represents a Url match found in an input string which should be Autolinked.
  * 
  * See this class's superclass ({@link Autolinker.match.Match}) for more details.
  */
	Autolinker.match.Url = Autolinker.Util.extend(Autolinker.match.Match, {

		/**
   * @cfg {String} url (required)
   * 
   * The url that was matched.
   */

		/**
   * @cfg {Boolean} protocolUrlMatch (required)
   * 
   * `true` if the URL is a match which already has a protocol (i.e. 'http://'), `false` if the match was from a 'www' or
   * known TLD match.
   */

		/**
   * @cfg {Boolean} protocolRelativeMatch (required)
   * 
   * `true` if the URL is a protocol-relative match. A protocol-relative match is a URL that starts with '//',
   * and will be either http:// or https:// based on the protocol that the site is loaded under.
   */

		/**
   * @cfg {Boolean} stripPrefix (required)
   * @inheritdoc Autolinker#stripPrefix
   */

		/**
   * @private
   * @property {RegExp} urlPrefixRegex
   * 
   * A regular expression used to remove the 'http://' or 'https://' and/or the 'www.' from URLs.
   */
		urlPrefixRegex: /^(https?:\/\/)?(www\.)?/i,

		/**
   * @private
   * @property {RegExp} protocolRelativeRegex
   * 
   * The regular expression used to remove the protocol-relative '//' from the {@link #url} string, for purposes
   * of {@link #getAnchorText}. A protocol-relative URL is, for example, "//yahoo.com"
   */
		protocolRelativeRegex: /^\/\//,

		/**
   * @private
   * @property {Boolean} protocolPrepended
   * 
   * Will be set to `true` if the 'http://' protocol has been prepended to the {@link #url} (because the
   * {@link #url} did not have a protocol)
   */
		protocolPrepended: false,

		/**
   * Returns a string name for the type of match that this class represents.
   * 
   * @return {String}
   */
		getType: function getType() {
			return 'url';
		},

		/**
   * Returns the url that was matched, assuming the protocol to be 'http://' if the original
   * match was missing a protocol.
   * 
   * @return {String}
   */
		getUrl: function getUrl() {
			var url = this.url;

			// if the url string doesn't begin with a protocol, assume 'http://'
			if (!this.protocolRelativeMatch && !this.protocolUrlMatch && !this.protocolPrepended) {
				url = this.url = 'http://' + url;

				this.protocolPrepended = true;
			}

			return url;
		},

		/**
   * Returns the anchor href that should be generated for the match.
   * 
   * @return {String}
   */
		getAnchorHref: function getAnchorHref() {
			var url = this.getUrl();

			return url.replace(/&amp;/g, '&'); // any &amp;'s in the URL should be converted back to '&' if they were displayed as &amp; in the source html 
		},

		/**
   * Returns the anchor text that should be generated for the match.
   * 
   * @return {String}
   */
		getAnchorText: function getAnchorText() {
			var anchorText = this.getUrl();

			if (this.protocolRelativeMatch) {
				// Strip off any protocol-relative '//' from the anchor text
				anchorText = this.stripProtocolRelativePrefix(anchorText);
			}
			if (this.stripPrefix) {
				anchorText = this.stripUrlPrefix(anchorText);
			}
			anchorText = this.removeTrailingSlash(anchorText); // remove trailing slash, if there is one

			return anchorText;
		},

		// ---------------------------------------

		// Utility Functionality

		/**
   * Strips the URL prefix (such as "http://" or "https://") from the given text.
   * 
   * @private
   * @param {String} text The text of the anchor that is being generated, for which to strip off the
   *   url prefix (such as stripping off "http://")
   * @return {String} The `anchorText`, with the prefix stripped.
   */
		stripUrlPrefix: function stripUrlPrefix(text) {
			return text.replace(this.urlPrefixRegex, '');
		},

		/**
   * Strips any protocol-relative '//' from the anchor text.
   * 
   * @private
   * @param {String} text The text of the anchor that is being generated, for which to strip off the
   *   protocol-relative prefix (such as stripping off "//")
   * @return {String} The `anchorText`, with the protocol-relative prefix stripped.
   */
		stripProtocolRelativePrefix: function stripProtocolRelativePrefix(text) {
			return text.replace(this.protocolRelativeRegex, '');
		},

		/**
   * Removes any trailing slash from the given `anchorText`, in preparation for the text to be displayed.
   * 
   * @private
   * @param {String} anchorText The text of the anchor that is being generated, for which to remove any trailing
   *   slash ('/') that may exist.
   * @return {String} The `anchorText`, with the trailing slash removed.
   */
		removeTrailingSlash: function removeTrailingSlash(anchorText) {
			if (anchorText.charAt(anchorText.length - 1) === '/') {
				anchorText = anchorText.slice(0, -1);
			}
			return anchorText;
		}

	});
	return Autolinker;
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */

var Ruler = __webpack_require__(8);
var StateBlock = __webpack_require__(62);

/**
 * Parser rules
 */

var _rules = [['code', __webpack_require__(63)], ['fences', __webpack_require__(64), ['paragraph', 'blockquote', 'list']], ['blockquote', __webpack_require__(65), ['paragraph', 'blockquote', 'list']], ['hr', __webpack_require__(66), ['paragraph', 'blockquote', 'list']], ['list', __webpack_require__(67), ['paragraph', 'blockquote']], ['footnote', __webpack_require__(68), ['paragraph']], ['heading', __webpack_require__(69), ['paragraph', 'blockquote']], ['lheading', __webpack_require__(70)], ['htmlblock', __webpack_require__(71), ['paragraph', 'blockquote']], ['table', __webpack_require__(73), ['paragraph']], ['deflist', __webpack_require__(74), ['paragraph']], ['paragraph', __webpack_require__(75)]];

/**
 * Block Parser class
 *
 * @api private
 */

function ParserBlock() {
  this.ruler = new Ruler();
  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1], {
      alt: (_rules[i][2] || []).slice()
    });
  }
}

/**
 * Generate tokens for the given input range.
 *
 * @param  {Object} `state` Has properties like `src`, `parser`, `options` etc
 * @param  {Number} `startLine`
 * @param  {Number} `endLine`
 * @api private
 */

ParserBlock.prototype.tokenize = function (state, startLine, endLine) {
  var rules = this.ruler.getRules('');
  var len = rules.length;
  var line = startLine;
  var hasEmptyLines = false;
  var ok, i;

  while (line < endLine) {
    state.line = line = state.skipEmptyLines(line);
    if (line >= endLine) {
      break;
    }

    // Termination condition for nested calls.
    // Nested calls currently used for blockquotes & lists
    if (state.tShift[line] < state.blkIndent) {
      break;
    }

    // Try all possible rules.
    // On success, rule should:
    //
    // - update `state.line`
    // - update `state.tokens`
    // - return true

    for (i = 0; i < len; i++) {
      ok = rules[i](state, line, endLine, false);
      if (ok) {
        break;
      }
    }

    // set state.tight iff we had an empty line before current tag
    // i.e. latest empty line should not count
    state.tight = !hasEmptyLines;

    // paragraph might "eat" one newline after it in nested lists
    if (state.isEmpty(state.line - 1)) {
      hasEmptyLines = true;
    }

    line = state.line;

    if (line < endLine && state.isEmpty(line)) {
      hasEmptyLines = true;
      line++;

      // two empty lines should stop the parser in list mode
      if (line < endLine && state.parentType === 'list' && state.isEmpty(line)) {
        break;
      }
      state.line = line;
    }
  }
};

var TABS_SCAN_RE = /[\n\t]/g;
var NEWLINES_RE = /\r[\n\u0085]|[\u2424\u2028\u0085]/g;
var SPACES_RE = /\u00a0/g;

/**
 * Tokenize the given `str`.
 *
 * @param  {String} `str` Source string
 * @param  {Object} `options`
 * @param  {Object} `env`
 * @param  {Array} `outTokens`
 * @api private
 */

ParserBlock.prototype.parse = function (str, options, env, outTokens) {
  var state,
      lineStart = 0,
      lastTabPos = 0;
  if (!str) {
    return [];
  }

  // Normalize spaces
  str = str.replace(SPACES_RE, ' ');

  // Normalize newlines
  str = str.replace(NEWLINES_RE, '\n');

  // Replace tabs with proper number of spaces (1..4)
  if (str.indexOf('\t') >= 0) {
    str = str.replace(TABS_SCAN_RE, function (match, offset) {
      var result;
      if (str.charCodeAt(offset) === 0x0A) {
        lineStart = offset + 1;
        lastTabPos = 0;
        return match;
      }
      result = '    '.slice((offset - lineStart - lastTabPos) % 4);
      lastTabPos = offset - lineStart + 1;
      return result;
    });
  }

  state = new StateBlock(str, this, options, env, outTokens);
  this.tokenize(state, state.line, state.lineMax);
};

/**
 * Expose `ParserBlock`
 */

module.exports = ParserBlock;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parser state class



function StateBlock(src, parser, options, env, tokens) {
  var ch, s, start, pos, len, indent, indent_found;

  this.src = src;

  // Shortcuts to simplify nested calls
  this.parser = parser;

  this.options = options;

  this.env = env;

  //
  // Internal state vartiables
  //

  this.tokens = tokens;

  this.bMarks = []; // line begin offsets for fast jumps
  this.eMarks = []; // line end offsets for fast jumps
  this.tShift = []; // indent for each line

  // block parser variables
  this.blkIndent = 0; // required block content indent
  // (for example, if we are in list)
  this.line = 0; // line index in src
  this.lineMax = 0; // lines count
  this.tight = false; // loose/tight mode for lists
  this.parentType = 'root'; // if `list`, block parser stops on two newlines
  this.ddIndent = -1; // indent of the current dd block (-1 if there isn't any)

  this.level = 0;

  // renderer
  this.result = '';

  // Create caches
  // Generate markers.
  s = this.src;
  indent = 0;
  indent_found = false;

  for (start = pos = indent = 0, len = s.length; pos < len; pos++) {
    ch = s.charCodeAt(pos);

    if (!indent_found) {
      if (ch === 0x20 /* space */) {
          indent++;
          continue;
        } else {
        indent_found = true;
      }
    }

    if (ch === 0x0A || pos === len - 1) {
      if (ch !== 0x0A) {
        pos++;
      }
      this.bMarks.push(start);
      this.eMarks.push(pos);
      this.tShift.push(indent);

      indent_found = false;
      indent = 0;
      start = pos + 1;
    }
  }

  // Push fake entry to simplify cache bounds checks
  this.bMarks.push(s.length);
  this.eMarks.push(s.length);
  this.tShift.push(0);

  this.lineMax = this.bMarks.length - 1; // don't count last fake line
}

StateBlock.prototype.isEmpty = function isEmpty(line) {
  return this.bMarks[line] + this.tShift[line] >= this.eMarks[line];
};

StateBlock.prototype.skipEmptyLines = function skipEmptyLines(from) {
  for (var max = this.lineMax; from < max; from++) {
    if (this.bMarks[from] + this.tShift[from] < this.eMarks[from]) {
      break;
    }
  }
  return from;
};

// Skip spaces from given position.
StateBlock.prototype.skipSpaces = function skipSpaces(pos) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== 0x20 /* space */) {
        break;
      }
  }
  return pos;
};

// Skip char codes from given position
StateBlock.prototype.skipChars = function skipChars(pos, code) {
  for (var max = this.src.length; pos < max; pos++) {
    if (this.src.charCodeAt(pos) !== code) {
      break;
    }
  }
  return pos;
};

// Skip char codes reverse from given position - 1
StateBlock.prototype.skipCharsBack = function skipCharsBack(pos, code, min) {
  if (pos <= min) {
    return pos;
  }

  while (pos > min) {
    if (code !== this.src.charCodeAt(--pos)) {
      return pos + 1;
    }
  }
  return pos;
};

// cut lines range from source.
StateBlock.prototype.getLines = function getLines(begin, end, indent, keepLastLF) {
  var i,
      first,
      last,
      queue,
      shift,
      line = begin;

  if (begin >= end) {
    return '';
  }

  // Opt: don't use push queue for single line;
  if (line + 1 === end) {
    first = this.bMarks[line] + Math.min(this.tShift[line], indent);
    last = keepLastLF ? this.eMarks[line] + 1 : this.eMarks[line];
    return this.src.slice(first, last);
  }

  queue = new Array(end - begin);

  for (i = 0; line < end; line++, i++) {
    shift = this.tShift[line];
    if (shift > indent) {
      shift = indent;
    }
    if (shift < 0) {
      shift = 0;
    }

    first = this.bMarks[line] + shift;

    if (line + 1 < end || keepLastLF) {
      // No need for bounds check because we have fake entry on tail.
      last = this.eMarks[line] + 1;
    } else {
      last = this.eMarks[line];
    }

    queue[i] = this.src.slice(first, last);
  }

  return queue.join('');
};

module.exports = StateBlock;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Code block (4 spaces padded)



module.exports = function code(state, startLine, endLine /*, silent*/) {
  var nextLine, last;

  if (state.tShift[startLine] - state.blkIndent < 4) {
    return false;
  }

  last = nextLine = startLine + 1;

  while (nextLine < endLine) {
    if (state.isEmpty(nextLine)) {
      nextLine++;
      continue;
    }
    if (state.tShift[nextLine] - state.blkIndent >= 4) {
      nextLine++;
      last = nextLine;
      continue;
    }
    break;
  }

  state.line = nextLine;
  state.tokens.push({
    type: 'code',
    content: state.getLines(startLine, last, 4 + state.blkIndent, true),
    block: true,
    lines: [startLine, state.line],
    level: state.level
  });

  return true;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// fences (``` lang, ~~~ lang)



module.exports = function fences(state, startLine, endLine, silent) {
  var marker,
      len,
      params,
      nextLine,
      mem,
      haveEndMarker = false,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  if (pos + 3 > max) {
    return false;
  }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x7E /* ~ */ && marker !== 0x60 /* ` */) {
      return false;
    }

  // scan marker length
  mem = pos;
  pos = state.skipChars(pos, marker);

  len = pos - mem;

  if (len < 3) {
    return false;
  }

  params = state.src.slice(pos, max).trim();

  if (params.indexOf('`') >= 0) {
    return false;
  }

  // Since start is found, we can report success here in validation mode
  if (silent) {
    return true;
  }

  // search end of block
  nextLine = startLine;

  for (;;) {
    nextLine++;
    if (nextLine >= endLine) {
      // unclosed block should be autoclosed by end of document.
      // also block seems to be autoclosed by end of parent
      break;
    }

    pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos < max && state.tShift[nextLine] < state.blkIndent) {
      // non-empty line with negative indent should stop the list:
      // - ```
      //  test
      break;
    }

    if (state.src.charCodeAt(pos) !== marker) {
      continue;
    }

    if (state.tShift[nextLine] - state.blkIndent >= 4) {
      // closing fence should be indented less than 4 spaces
      continue;
    }

    pos = state.skipChars(pos, marker);

    // closing code fence must be at least as long as the opening one
    if (pos - mem < len) {
      continue;
    }

    // make sure tail has spaces only
    pos = state.skipSpaces(pos);

    if (pos < max) {
      continue;
    }

    haveEndMarker = true;
    // found!
    break;
  }

  // If a fence has heading spaces, they should be removed from its inner block
  len = state.tShift[startLine];

  state.line = nextLine + (haveEndMarker ? 1 : 0);
  state.tokens.push({
    type: 'fence',
    params: params,
    content: state.getLines(startLine + 1, nextLine, len, true),
    lines: [startLine, state.line],
    level: state.level
  });

  return true;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Block quotes



module.exports = function blockquote(state, startLine, endLine, silent) {
  var nextLine,
      lastLineEmpty,
      oldTShift,
      oldBMarks,
      oldIndent,
      oldParentType,
      lines,
      terminatorRules,
      i,
      l,
      terminate,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  if (pos > max) {
    return false;
  }

  // check the block quote marker
  if (state.src.charCodeAt(pos++) !== 0x3E /* > */) {
      return false;
    }

  if (state.level >= state.options.maxNesting) {
    return false;
  }

  // we know that it's going to be a valid blockquote,
  // so no point trying to find the end of it in silent mode
  if (silent) {
    return true;
  }

  // skip one optional space after '>'
  if (state.src.charCodeAt(pos) === 0x20) {
    pos++;
  }

  oldIndent = state.blkIndent;
  state.blkIndent = 0;

  oldBMarks = [state.bMarks[startLine]];
  state.bMarks[startLine] = pos;

  // check if we have an empty blockquote
  pos = pos < max ? state.skipSpaces(pos) : pos;
  lastLineEmpty = pos >= max;

  oldTShift = [state.tShift[startLine]];
  state.tShift[startLine] = pos - state.bMarks[startLine];

  terminatorRules = state.parser.ruler.getRules('blockquote');

  // Search the end of the block
  //
  // Block ends with either:
  //  1. an empty line outside:
  //     ```
  //     > test
  //
  //     ```
  //  2. an empty line inside:
  //     ```
  //     >
  //     test
  //     ```
  //  3. another tag
  //     ```
  //     > test
  //      - - -
  //     ```
  for (nextLine = startLine + 1; nextLine < endLine; nextLine++) {
    pos = state.bMarks[nextLine] + state.tShift[nextLine];
    max = state.eMarks[nextLine];

    if (pos >= max) {
      // Case 1: line is not inside the blockquote, and this line is empty.
      break;
    }

    if (state.src.charCodeAt(pos++) === 0x3E /* > */) {
        // This line is inside the blockquote.

        // skip one optional space after '>'
        if (state.src.charCodeAt(pos) === 0x20) {
          pos++;
        }

        oldBMarks.push(state.bMarks[nextLine]);
        state.bMarks[nextLine] = pos;

        pos = pos < max ? state.skipSpaces(pos) : pos;
        lastLineEmpty = pos >= max;

        oldTShift.push(state.tShift[nextLine]);
        state.tShift[nextLine] = pos - state.bMarks[nextLine];
        continue;
      }

    // Case 2: line is not inside the blockquote, and the last line was empty.
    if (lastLineEmpty) {
      break;
    }

    // Case 3: another tag found.
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }

    oldBMarks.push(state.bMarks[nextLine]);
    oldTShift.push(state.tShift[nextLine]);

    // A negative number means that this is a paragraph continuation;
    //
    // Any negative number will do the job here, but it's better for it
    // to be large enough to make any bugs obvious.
    state.tShift[nextLine] = -1337;
  }

  oldParentType = state.parentType;
  state.parentType = 'blockquote';
  state.tokens.push({
    type: 'blockquote_open',
    lines: lines = [startLine, 0],
    level: state.level++
  });
  state.parser.tokenize(state, startLine, nextLine);
  state.tokens.push({
    type: 'blockquote_close',
    level: --state.level
  });
  state.parentType = oldParentType;
  lines[1] = state.line;

  // Restore original tShift; this might not be necessary since the parser
  // has already been here, but just to make sure we can do that.
  for (i = 0; i < oldTShift.length; i++) {
    state.bMarks[i + startLine] = oldBMarks[i];
    state.tShift[i + startLine] = oldTShift[i];
  }
  state.blkIndent = oldIndent;

  return true;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Horizontal rule



module.exports = function hr(state, startLine, endLine, silent) {
  var marker,
      cnt,
      ch,
      pos = state.bMarks[startLine],
      max = state.eMarks[startLine];

  pos += state.tShift[startLine];

  if (pos > max) {
    return false;
  }

  marker = state.src.charCodeAt(pos++);

  // Check hr marker
  if (marker !== 0x2A /* * */ && marker !== 0x2D /* - */ && marker !== 0x5F /* _ */) {
      return false;
    }

  // markers can be mixed with spaces, but there should be at least 3 one

  cnt = 1;
  while (pos < max) {
    ch = state.src.charCodeAt(pos++);
    if (ch !== marker && ch !== 0x20 /* space */) {
        return false;
      }
    if (ch === marker) {
      cnt++;
    }
  }

  if (cnt < 3) {
    return false;
  }

  if (silent) {
    return true;
  }

  state.line = startLine + 1;
  state.tokens.push({
    type: 'hr',
    lines: [startLine, state.line],
    level: state.level
  });

  return true;
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Lists



// Search `[-+*][\n ]`, returns next pos arter marker on success
// or -1 on fail.

function skipBulletListMarker(state, startLine) {
  var marker, pos, max;

  pos = state.bMarks[startLine] + state.tShift[startLine];
  max = state.eMarks[startLine];

  if (pos >= max) {
    return -1;
  }

  marker = state.src.charCodeAt(pos++);
  // Check bullet
  if (marker !== 0x2A /* * */ && marker !== 0x2D /* - */ && marker !== 0x2B /* + */) {
      return -1;
    }

  if (pos < max && state.src.charCodeAt(pos) !== 0x20) {
    // " 1.test " - is not a list item
    return -1;
  }

  return pos;
}

// Search `\d+[.)][\n ]`, returns next pos arter marker on success
// or -1 on fail.
function skipOrderedListMarker(state, startLine) {
  var ch,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  if (pos + 1 >= max) {
    return -1;
  }

  ch = state.src.charCodeAt(pos++);

  if (ch < 0x30 /* 0 */ || ch > 0x39 /* 9 */) {
      return -1;
    }

  for (;;) {
    // EOL -> fail
    if (pos >= max) {
      return -1;
    }

    ch = state.src.charCodeAt(pos++);

    if (ch >= 0x30 /* 0 */ && ch <= 0x39 /* 9 */) {
        continue;
      }

    // found valid marker
    if (ch === 0x29 /* ) */ || ch === 0x2e /* . */) {
        break;
      }

    return -1;
  }

  if (pos < max && state.src.charCodeAt(pos) !== 0x20 /* space */) {
      // " 1.test " - is not a list item
      return -1;
    }
  return pos;
}

function markTightParagraphs(state, idx) {
  var i,
      l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].tight = true;
      state.tokens[i].tight = true;
      i += 2;
    }
  }
}

module.exports = function list(state, startLine, endLine, silent) {
  var nextLine,
      indent,
      oldTShift,
      oldIndent,
      oldTight,
      oldParentType,
      start,
      posAfterMarker,
      max,
      indentAfterMarker,
      markerValue,
      markerCharCode,
      isOrdered,
      contentStart,
      listTokIdx,
      prevEmptyEnd,
      listLines,
      itemLines,
      tight = true,
      terminatorRules,
      i,
      l,
      terminate;

  // Detect list type and position after marker
  if ((posAfterMarker = skipOrderedListMarker(state, startLine)) >= 0) {
    isOrdered = true;
  } else if ((posAfterMarker = skipBulletListMarker(state, startLine)) >= 0) {
    isOrdered = false;
  } else {
    return false;
  }

  if (state.level >= state.options.maxNesting) {
    return false;
  }

  // We should terminate list on style change. Remember first one to compare.
  markerCharCode = state.src.charCodeAt(posAfterMarker - 1);

  // For validation mode we can terminate immediately
  if (silent) {
    return true;
  }

  // Start list
  listTokIdx = state.tokens.length;

  if (isOrdered) {
    start = state.bMarks[startLine] + state.tShift[startLine];
    markerValue = Number(state.src.substr(start, posAfterMarker - start - 1));

    state.tokens.push({
      type: 'ordered_list_open',
      order: markerValue,
      lines: listLines = [startLine, 0],
      level: state.level++
    });
  } else {
    state.tokens.push({
      type: 'bullet_list_open',
      lines: listLines = [startLine, 0],
      level: state.level++
    });
  }

  //
  // Iterate list items
  //

  nextLine = startLine;
  prevEmptyEnd = false;
  terminatorRules = state.parser.ruler.getRules('list');

  while (nextLine < endLine) {
    contentStart = state.skipSpaces(posAfterMarker);
    max = state.eMarks[nextLine];

    if (contentStart >= max) {
      // trimming space in "-    \n  3" case, indent is 1 here
      indentAfterMarker = 1;
    } else {
      indentAfterMarker = contentStart - posAfterMarker;
    }

    // If we have more than 4 spaces, the indent is 1
    // (the rest is just indented code block)
    if (indentAfterMarker > 4) {
      indentAfterMarker = 1;
    }

    // If indent is less than 1, assume that it's one, example:
    //  "-\n  test"
    if (indentAfterMarker < 1) {
      indentAfterMarker = 1;
    }

    // "  -  test"
    //  ^^^^^ - calculating total length of this thing
    indent = posAfterMarker - state.bMarks[nextLine] + indentAfterMarker;

    // Run subparser & write tokens
    state.tokens.push({
      type: 'list_item_open',
      lines: itemLines = [startLine, 0],
      level: state.level++
    });

    oldIndent = state.blkIndent;
    oldTight = state.tight;
    oldTShift = state.tShift[startLine];
    oldParentType = state.parentType;
    state.tShift[startLine] = contentStart - state.bMarks[startLine];
    state.blkIndent = indent;
    state.tight = true;
    state.parentType = 'list';

    state.parser.tokenize(state, startLine, endLine, true);

    // If any of list item is tight, mark list as tight
    if (!state.tight || prevEmptyEnd) {
      tight = false;
    }
    // Item become loose if finish with empty line,
    // but we should filter last element, because it means list finish
    prevEmptyEnd = state.line - startLine > 1 && state.isEmpty(state.line - 1);

    state.blkIndent = oldIndent;
    state.tShift[startLine] = oldTShift;
    state.tight = oldTight;
    state.parentType = oldParentType;

    state.tokens.push({
      type: 'list_item_close',
      level: --state.level
    });

    nextLine = startLine = state.line;
    itemLines[1] = nextLine;
    contentStart = state.bMarks[startLine];

    if (nextLine >= endLine) {
      break;
    }

    if (state.isEmpty(nextLine)) {
      break;
    }

    //
    // Try to check if list is terminated or continued.
    //
    if (state.tShift[nextLine] < state.blkIndent) {
      break;
    }

    // fail if terminating block found
    terminate = false;
    for (i = 0, l = terminatorRules.length; i < l; i++) {
      if (terminatorRules[i](state, nextLine, endLine, true)) {
        terminate = true;
        break;
      }
    }
    if (terminate) {
      break;
    }

    // fail if list has another type
    if (isOrdered) {
      posAfterMarker = skipOrderedListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
    } else {
      posAfterMarker = skipBulletListMarker(state, nextLine);
      if (posAfterMarker < 0) {
        break;
      }
    }

    if (markerCharCode !== state.src.charCodeAt(posAfterMarker - 1)) {
      break;
    }
  }

  // Finilize list
  state.tokens.push({
    type: isOrdered ? 'ordered_list_close' : 'bullet_list_close',
    level: --state.level
  });
  listLines[1] = nextLine;

  state.line = nextLine;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process footnote reference list



module.exports = function footnote(state, startLine, endLine, silent) {
  var oldBMark,
      oldTShift,
      oldParentType,
      pos,
      label,
      start = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  // line should be at least 5 chars - "[^x]:"
  if (start + 4 > max) {
    return false;
  }

  if (state.src.charCodeAt(start) !== 0x5B /* [ */) {
      return false;
    }
  if (state.src.charCodeAt(start + 1) !== 0x5E /* ^ */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  for (pos = start + 2; pos < max; pos++) {
    if (state.src.charCodeAt(pos) === 0x20) {
      return false;
    }
    if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
  }

  if (pos === start + 2) {
    return false;
  } // no empty footnote labels
  if (pos + 1 >= max || state.src.charCodeAt(++pos) !== 0x3A /* : */) {
      return false;
    }
  if (silent) {
    return true;
  }
  pos++;

  if (!state.env.footnotes) {
    state.env.footnotes = {};
  }
  if (!state.env.footnotes.refs) {
    state.env.footnotes.refs = {};
  }
  label = state.src.slice(start + 2, pos - 2);
  state.env.footnotes.refs[':' + label] = -1;

  state.tokens.push({
    type: 'footnote_reference_open',
    label: label,
    level: state.level++
  });

  oldBMark = state.bMarks[startLine];
  oldTShift = state.tShift[startLine];
  oldParentType = state.parentType;
  state.tShift[startLine] = state.skipSpaces(pos) - pos;
  state.bMarks[startLine] = pos;
  state.blkIndent += 4;
  state.parentType = 'footnote';

  if (state.tShift[startLine] < state.blkIndent) {
    state.tShift[startLine] += state.blkIndent;
    state.bMarks[startLine] -= state.blkIndent;
  }

  state.parser.tokenize(state, startLine, endLine, true);

  state.parentType = oldParentType;
  state.blkIndent -= 4;
  state.tShift[startLine] = oldTShift;
  state.bMarks[startLine] = oldBMark;

  state.tokens.push({
    type: 'footnote_reference_close',
    level: --state.level
  });

  return true;
};

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// heading (#, ##, ...)



module.exports = function heading(state, startLine, endLine, silent) {
  var ch,
      level,
      tmp,
      pos = state.bMarks[startLine] + state.tShift[startLine],
      max = state.eMarks[startLine];

  if (pos >= max) {
    return false;
  }

  ch = state.src.charCodeAt(pos);

  if (ch !== 0x23 /* # */ || pos >= max) {
    return false;
  }

  // count heading level
  level = 1;
  ch = state.src.charCodeAt(++pos);
  while (ch === 0x23 /* # */ && pos < max && level <= 6) {
    level++;
    ch = state.src.charCodeAt(++pos);
  }

  if (level > 6 || pos < max && ch !== 0x20 /* space */) {
    return false;
  }

  if (silent) {
    return true;
  }

  // Let's cut tails like '    ###  ' from the end of string

  max = state.skipCharsBack(max, 0x20, pos); // space
  tmp = state.skipCharsBack(max, 0x23, pos); // #
  if (tmp > pos && state.src.charCodeAt(tmp - 1) === 0x20 /* space */) {
      max = tmp;
    }

  state.line = startLine + 1;

  state.tokens.push({ type: 'heading_open',
    hLevel: level,
    lines: [startLine, state.line],
    level: state.level
  });

  // only if header is not empty
  if (pos < max) {
    state.tokens.push({
      type: 'inline',
      content: state.src.slice(pos, max).trim(),
      level: state.level + 1,
      lines: [startLine, state.line],
      children: []
    });
  }
  state.tokens.push({ type: 'heading_close', hLevel: level, level: state.level });

  return true;
};

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// lheading (---, ===)



module.exports = function lheading(state, startLine, endLine /*, silent*/) {
  var marker,
      pos,
      max,
      next = startLine + 1;

  if (next >= endLine) {
    return false;
  }
  if (state.tShift[next] < state.blkIndent) {
    return false;
  }

  // Scan next line

  if (state.tShift[next] - state.blkIndent > 3) {
    return false;
  }

  pos = state.bMarks[next] + state.tShift[next];
  max = state.eMarks[next];

  if (pos >= max) {
    return false;
  }

  marker = state.src.charCodeAt(pos);

  if (marker !== 0x2D /* - */ && marker !== 0x3D /* = */) {
      return false;
    }

  pos = state.skipChars(pos, marker);

  pos = state.skipSpaces(pos);

  if (pos < max) {
    return false;
  }

  pos = state.bMarks[startLine] + state.tShift[startLine];

  state.line = next + 1;
  state.tokens.push({
    type: 'heading_open',
    hLevel: marker === 0x3D /* = */ ? 1 : 2,
    lines: [startLine, state.line],
    level: state.level
  });
  state.tokens.push({
    type: 'inline',
    content: state.src.slice(pos, state.eMarks[startLine]).trim(),
    level: state.level + 1,
    lines: [startLine, state.line - 1],
    children: []
  });
  state.tokens.push({
    type: 'heading_close',
    hLevel: marker === 0x3D /* = */ ? 1 : 2,
    level: state.level
  });

  return true;
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// HTML block



var block_names = __webpack_require__(72);

var HTML_TAG_OPEN_RE = /^<([a-zA-Z]{1,15})[\s\/>]/;
var HTML_TAG_CLOSE_RE = /^<\/([a-zA-Z]{1,15})[\s>]/;

function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return lc >= 0x61 /* a */ && lc <= 0x7a /* z */;
}

module.exports = function htmlblock(state, startLine, endLine, silent) {
  var ch,
      match,
      nextLine,
      pos = state.bMarks[startLine],
      max = state.eMarks[startLine],
      shift = state.tShift[startLine];

  pos += shift;

  if (!state.options.html) {
    return false;
  }

  if (shift > 3 || pos + 2 >= max) {
    return false;
  }

  if (state.src.charCodeAt(pos) !== 0x3C /* < */) {
      return false;
    }

  ch = state.src.charCodeAt(pos + 1);

  if (ch === 0x21 /* ! */ || ch === 0x3F /* ? */) {
      // Directive start / comment start / processing instruction start
      if (silent) {
        return true;
      }
    } else if (ch === 0x2F /* / */ || isLetter(ch)) {

    // Probably start or end of tag
    if (ch === 0x2F /* \ */) {
        // closing tag
        match = state.src.slice(pos, max).match(HTML_TAG_CLOSE_RE);
        if (!match) {
          return false;
        }
      } else {
      // opening tag
      match = state.src.slice(pos, max).match(HTML_TAG_OPEN_RE);
      if (!match) {
        return false;
      }
    }
    // Make sure tag name is valid
    if (block_names[match[1].toLowerCase()] !== true) {
      return false;
    }
    if (silent) {
      return true;
    }
  } else {
    return false;
  }

  // If we are here - we detected HTML block.
  // Let's roll down till empty line (block end).
  nextLine = startLine + 1;
  while (nextLine < state.lineMax && !state.isEmpty(nextLine)) {
    nextLine++;
  }

  state.line = nextLine;
  state.tokens.push({
    type: 'htmlblock',
    level: state.level,
    lines: [startLine, state.line],
    content: state.getLines(startLine, nextLine, 0, true)
  });

  return true;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// List of valid html blocks names, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#html-blocks



var html_blocks = {};

['article', 'aside', 'button', 'blockquote', 'body', 'canvas', 'caption', 'col', 'colgroup', 'dd', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'iframe', 'li', 'map', 'object', 'ol', 'output', 'p', 'pre', 'progress', 'script', 'section', 'style', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'tr', 'thead', 'ul', 'video'].forEach(function (name) {
  html_blocks[name] = true;
});

module.exports = html_blocks;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// GFM table, non-standard



function getLine(state, line) {
  var pos = state.bMarks[line] + state.blkIndent,
      max = state.eMarks[line];

  return state.src.substr(pos, max - pos);
}

module.exports = function table(state, startLine, endLine, silent) {
  var ch, lineText, pos, i, nextLine, rows, cell, aligns, t, tableLines, tbodyLines;

  // should have at least three lines
  if (startLine + 2 > endLine) {
    return false;
  }

  nextLine = startLine + 1;

  if (state.tShift[nextLine] < state.blkIndent) {
    return false;
  }

  // first character of the second line should be '|' or '-'

  pos = state.bMarks[nextLine] + state.tShift[nextLine];
  if (pos >= state.eMarks[nextLine]) {
    return false;
  }

  ch = state.src.charCodeAt(pos);
  if (ch !== 0x7C /* | */ && ch !== 0x2D /* - */ && ch !== 0x3A /* : */) {
      return false;
    }

  lineText = getLine(state, startLine + 1);
  if (!/^[-:| ]+$/.test(lineText)) {
    return false;
  }

  rows = lineText.split('|');
  if (rows <= 2) {
    return false;
  }
  aligns = [];
  for (i = 0; i < rows.length; i++) {
    t = rows[i].trim();
    if (!t) {
      // allow empty columns before and after table, but not in between columns;
      // e.g. allow ` |---| `, disallow ` ---||--- `
      if (i === 0 || i === rows.length - 1) {
        continue;
      } else {
        return false;
      }
    }

    if (!/^:?-+:?$/.test(t)) {
      return false;
    }
    if (t.charCodeAt(t.length - 1) === 0x3A /* : */) {
        aligns.push(t.charCodeAt(0) === 0x3A /* : */ ? 'center' : 'right');
      } else if (t.charCodeAt(0) === 0x3A /* : */) {
        aligns.push('left');
      } else {
      aligns.push('');
    }
  }

  lineText = getLine(state, startLine).trim();
  if (lineText.indexOf('|') === -1) {
    return false;
  }
  rows = lineText.replace(/^\||\|$/g, '').split('|');
  if (aligns.length !== rows.length) {
    return false;
  }
  if (silent) {
    return true;
  }

  state.tokens.push({
    type: 'table_open',
    lines: tableLines = [startLine, 0],
    level: state.level++
  });
  state.tokens.push({
    type: 'thead_open',
    lines: [startLine, startLine + 1],
    level: state.level++
  });

  state.tokens.push({
    type: 'tr_open',
    lines: [startLine, startLine + 1],
    level: state.level++
  });
  for (i = 0; i < rows.length; i++) {
    state.tokens.push({
      type: 'th_open',
      align: aligns[i],
      lines: [startLine, startLine + 1],
      level: state.level++
    });
    state.tokens.push({
      type: 'inline',
      content: rows[i].trim(),
      lines: [startLine, startLine + 1],
      level: state.level,
      children: []
    });
    state.tokens.push({ type: 'th_close', level: --state.level });
  }
  state.tokens.push({ type: 'tr_close', level: --state.level });
  state.tokens.push({ type: 'thead_close', level: --state.level });

  state.tokens.push({
    type: 'tbody_open',
    lines: tbodyLines = [startLine + 2, 0],
    level: state.level++
  });

  for (nextLine = startLine + 2; nextLine < endLine; nextLine++) {
    if (state.tShift[nextLine] < state.blkIndent) {
      break;
    }

    lineText = getLine(state, nextLine).trim();
    if (lineText.indexOf('|') === -1) {
      break;
    }
    rows = lineText.replace(/^\||\|$/g, '').split('|');

    state.tokens.push({ type: 'tr_open', level: state.level++ });
    for (i = 0; i < rows.length; i++) {
      state.tokens.push({ type: 'td_open', align: aligns[i], level: state.level++ });
      // 0x7c === '|'
      cell = rows[i].substring(rows[i].charCodeAt(0) === 0x7c ? 1 : 0, rows[i].charCodeAt(rows[i].length - 1) === 0x7c ? rows[i].length - 1 : rows[i].length).trim();
      state.tokens.push({
        type: 'inline',
        content: cell,
        level: state.level,
        children: []
      });
      state.tokens.push({ type: 'td_close', level: --state.level });
    }
    state.tokens.push({ type: 'tr_close', level: --state.level });
  }
  state.tokens.push({ type: 'tbody_close', level: --state.level });
  state.tokens.push({ type: 'table_close', level: --state.level });

  tableLines[1] = tbodyLines[1] = nextLine;
  state.line = nextLine;
  return true;
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Definition lists



// Search `[:~][\n ]`, returns next pos after marker on success
// or -1 on fail.

function skipMarker(state, line) {
  var pos,
      marker,
      start = state.bMarks[line] + state.tShift[line],
      max = state.eMarks[line];

  if (start >= max) {
    return -1;
  }

  // Check bullet
  marker = state.src.charCodeAt(start++);
  if (marker !== 0x7E /* ~ */ && marker !== 0x3A /* : */) {
      return -1;
    }

  pos = state.skipSpaces(start);

  // require space after ":"
  if (start === pos) {
    return -1;
  }

  // no empty definitions, e.g. "  : "
  if (pos >= max) {
    return -1;
  }

  return pos;
}

function markTightParagraphs(state, idx) {
  var i,
      l,
      level = state.level + 2;

  for (i = idx + 2, l = state.tokens.length - 2; i < l; i++) {
    if (state.tokens[i].level === level && state.tokens[i].type === 'paragraph_open') {
      state.tokens[i + 2].tight = true;
      state.tokens[i].tight = true;
      i += 2;
    }
  }
}

module.exports = function deflist(state, startLine, endLine, silent) {
  var contentStart, ddLine, dtLine, itemLines, listLines, listTokIdx, nextLine, oldIndent, oldDDIndent, oldParentType, oldTShift, oldTight, prevEmptyEnd, tight;

  if (silent) {
    // quirk: validation mode validates a dd block only, not a whole deflist
    if (state.ddIndent < 0) {
      return false;
    }
    return skipMarker(state, startLine) >= 0;
  }

  nextLine = startLine + 1;
  if (state.isEmpty(nextLine)) {
    if (++nextLine > endLine) {
      return false;
    }
  }

  if (state.tShift[nextLine] < state.blkIndent) {
    return false;
  }
  contentStart = skipMarker(state, nextLine);
  if (contentStart < 0) {
    return false;
  }

  if (state.level >= state.options.maxNesting) {
    return false;
  }

  // Start list
  listTokIdx = state.tokens.length;

  state.tokens.push({
    type: 'dl_open',
    lines: listLines = [startLine, 0],
    level: state.level++
  });

  //
  // Iterate list items
  //

  dtLine = startLine;
  ddLine = nextLine;

  // One definition list can contain multiple DTs,
  // and one DT can be followed by multiple DDs.
  //
  // Thus, there is two loops here, and label is
  // needed to break out of the second one
  //
  /*eslint no-labels:0,block-scoped-var:0*/
  OUTER: for (;;) {
    tight = true;
    prevEmptyEnd = false;

    state.tokens.push({
      type: 'dt_open',
      lines: [dtLine, dtLine],
      level: state.level++
    });
    state.tokens.push({
      type: 'inline',
      content: state.getLines(dtLine, dtLine + 1, state.blkIndent, false).trim(),
      level: state.level + 1,
      lines: [dtLine, dtLine],
      children: []
    });
    state.tokens.push({
      type: 'dt_close',
      level: --state.level
    });

    for (;;) {
      state.tokens.push({
        type: 'dd_open',
        lines: itemLines = [nextLine, 0],
        level: state.level++
      });

      oldTight = state.tight;
      oldDDIndent = state.ddIndent;
      oldIndent = state.blkIndent;
      oldTShift = state.tShift[ddLine];
      oldParentType = state.parentType;
      state.blkIndent = state.ddIndent = state.tShift[ddLine] + 2;
      state.tShift[ddLine] = contentStart - state.bMarks[ddLine];
      state.tight = true;
      state.parentType = 'deflist';

      state.parser.tokenize(state, ddLine, endLine, true);

      // If any of list item is tight, mark list as tight
      if (!state.tight || prevEmptyEnd) {
        tight = false;
      }
      // Item become loose if finish with empty line,
      // but we should filter last element, because it means list finish
      prevEmptyEnd = state.line - ddLine > 1 && state.isEmpty(state.line - 1);

      state.tShift[ddLine] = oldTShift;
      state.tight = oldTight;
      state.parentType = oldParentType;
      state.blkIndent = oldIndent;
      state.ddIndent = oldDDIndent;

      state.tokens.push({
        type: 'dd_close',
        level: --state.level
      });

      itemLines[1] = nextLine = state.line;

      if (nextLine >= endLine) {
        break OUTER;
      }

      if (state.tShift[nextLine] < state.blkIndent) {
        break OUTER;
      }
      contentStart = skipMarker(state, nextLine);
      if (contentStart < 0) {
        break;
      }

      ddLine = nextLine;

      // go to the next loop iteration:
      // insert DD tag and repeat checking
    }

    if (nextLine >= endLine) {
      break;
    }
    dtLine = nextLine;

    if (state.isEmpty(dtLine)) {
      break;
    }
    if (state.tShift[dtLine] < state.blkIndent) {
      break;
    }

    ddLine = dtLine + 1;
    if (ddLine >= endLine) {
      break;
    }
    if (state.isEmpty(ddLine)) {
      ddLine++;
    }
    if (ddLine >= endLine) {
      break;
    }

    if (state.tShift[ddLine] < state.blkIndent) {
      break;
    }
    contentStart = skipMarker(state, ddLine);
    if (contentStart < 0) {
      break;
    }

    // go to the next loop iteration:
    // insert DT and DD tags and repeat checking
  }

  // Finilize list
  state.tokens.push({
    type: 'dl_close',
    level: --state.level
  });
  listLines[1] = nextLine;

  state.line = nextLine;

  // mark paragraphs tight if needed
  if (tight) {
    markTightParagraphs(state, listTokIdx);
  }

  return true;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Paragraph



module.exports = function paragraph(state, startLine /*, endLine*/) {
  var endLine,
      content,
      terminate,
      i,
      l,
      nextLine = startLine + 1,
      terminatorRules;

  endLine = state.lineMax;

  // jump line-by-line until empty one or EOF
  if (nextLine < endLine && !state.isEmpty(nextLine)) {
    terminatorRules = state.parser.ruler.getRules('paragraph');

    for (; nextLine < endLine && !state.isEmpty(nextLine); nextLine++) {
      // this would be a code block normally, but after paragraph
      // it's considered a lazy continuation regardless of what's there
      if (state.tShift[nextLine] - state.blkIndent > 3) {
        continue;
      }

      // Some tags can terminate paragraph without empty line.
      terminate = false;
      for (i = 0, l = terminatorRules.length; i < l; i++) {
        if (terminatorRules[i](state, nextLine, endLine, true)) {
          terminate = true;
          break;
        }
      }
      if (terminate) {
        break;
      }
    }
  }

  content = state.getLines(startLine, nextLine, state.blkIndent, false).trim();

  state.line = nextLine;
  if (content.length) {
    state.tokens.push({
      type: 'paragraph_open',
      tight: false,
      lines: [startLine, state.line],
      level: state.level
    });
    state.tokens.push({
      type: 'inline',
      content: content,
      level: state.level + 1,
      lines: [startLine, state.line],
      children: []
    });
    state.tokens.push({
      type: 'paragraph_close',
      tight: false,
      level: state.level
    });
  }

  return true;
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Local dependencies
 */

var Ruler = __webpack_require__(8);
var StateInline = __webpack_require__(16);
var utils = __webpack_require__(1);

/**
 * Inline Parser `rules`
 */

var _rules = [['text', __webpack_require__(77)], ['newline', __webpack_require__(78)], ['escape', __webpack_require__(79)], ['backticks', __webpack_require__(80)], ['del', __webpack_require__(81)], ['ins', __webpack_require__(82)], ['mark', __webpack_require__(83)], ['emphasis', __webpack_require__(84)], ['sub', __webpack_require__(85)], ['sup', __webpack_require__(86)], ['links', __webpack_require__(87)], ['footnote_inline', __webpack_require__(88)], ['footnote_ref', __webpack_require__(89)], ['autolink', __webpack_require__(90)], ['htmltag', __webpack_require__(92)], ['entity', __webpack_require__(94)]];

/**
 * Inline Parser class. Note that link validation is stricter
 * in Remarkable than what is specified by CommonMark. If you
 * want to change this you can use a custom validator.
 *
 * @api private
 */

function ParserInline() {
  this.ruler = new Ruler();
  for (var i = 0; i < _rules.length; i++) {
    this.ruler.push(_rules[i][0], _rules[i][1]);
  }

  // Can be overridden with a custom validator
  this.validateLink = validateLink;
}

/**
 * Skip a single token by running all rules in validation mode.
 * Returns `true` if any rule reports success.
 *
 * @param  {Object} `state`
 * @api privage
 */

ParserInline.prototype.skipToken = function (state) {
  var rules = this.ruler.getRules('');
  var len = rules.length;
  var pos = state.pos;
  var i, cached_pos;

  if ((cached_pos = state.cacheGet(pos)) > 0) {
    state.pos = cached_pos;
    return;
  }

  for (i = 0; i < len; i++) {
    if (rules[i](state, true)) {
      state.cacheSet(pos, state.pos);
      return;
    }
  }

  state.pos++;
  state.cacheSet(pos, state.pos);
};

/**
 * Generate tokens for the given input range.
 *
 * @param  {Object} `state`
 * @api private
 */

ParserInline.prototype.tokenize = function (state) {
  var rules = this.ruler.getRules('');
  var len = rules.length;
  var end = state.posMax;
  var ok, i;

  while (state.pos < end) {

    // Try all possible rules.
    // On success, the rule should:
    //
    // - update `state.pos`
    // - update `state.tokens`
    // - return true
    for (i = 0; i < len; i++) {
      ok = rules[i](state, false);

      if (ok) {
        break;
      }
    }

    if (ok) {
      if (state.pos >= end) {
        break;
      }
      continue;
    }

    state.pending += state.src[state.pos++];
  }

  if (state.pending) {
    state.pushPending();
  }
};

/**
 * Parse the given input string.
 *
 * @param  {String} `str`
 * @param  {Object} `options`
 * @param  {Object} `env`
 * @param  {Array} `outTokens`
 * @api private
 */

ParserInline.prototype.parse = function (str, options, env, outTokens) {
  var state = new StateInline(str, this, options, env, outTokens);
  this.tokenize(state);
};

/**
 * Validate the given `url` by checking for bad protocols.
 *
 * @param  {String} `url`
 * @return {Boolean}
 */

function validateLink(url) {
  var BAD_PROTOCOLS = ['vbscript', 'javascript', 'file', 'data'];
  var str = url.trim().toLowerCase();
  // Care about digital entities "javascript&#x3A;alert(1)"
  str = utils.replaceEntities(str);
  if (str.indexOf(':') !== -1 && BAD_PROTOCOLS.indexOf(str.split(':')[0]) !== -1) {
    return false;
  }
  return true;
}

/**
 * Expose `ParserInline`
 */

module.exports = ParserInline;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Skip text characters for text token, place those to pending buffer
// and increment current pos



// Rule to skip pure text
// '{}$%@~+=:' reserved for extentions

function isTerminatorChar(ch) {
  switch (ch) {
    case 0x0A /* \n */:
    case 0x5C /* \ */:
    case 0x60 /* ` */:
    case 0x2A /* * */:
    case 0x5F /* _ */:
    case 0x5E /* ^ */:
    case 0x5B /* [ */:
    case 0x5D /* ] */:
    case 0x21 /* ! */:
    case 0x26 /* & */:
    case 0x3C /* < */:
    case 0x3E /* > */:
    case 0x7B /* { */:
    case 0x7D /* } */:
    case 0x24 /* $ */:
    case 0x25 /* % */:
    case 0x40 /* @ */:
    case 0x7E /* ~ */:
    case 0x2B /* + */:
    case 0x3D /* = */:
    case 0x3A /* : */:
      return true;
    default:
      return false;
  }
}

module.exports = function text(state, silent) {
  var pos = state.pos;

  while (pos < state.posMax && !isTerminatorChar(state.src.charCodeAt(pos))) {
    pos++;
  }

  if (pos === state.pos) {
    return false;
  }

  if (!silent) {
    state.pending += state.src.slice(state.pos, pos);
  }

  state.pos = pos;

  return true;
};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Proceess '\n'



module.exports = function newline(state, silent) {
  var pmax,
      max,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x0A /* \n */) {
      return false;
    }

  pmax = state.pending.length - 1;
  max = state.posMax;

  // '  \n' -> hardbreak
  // Lookup in pending chars is bad practice! Don't copy to other rules!
  // Pending string is stored in concat mode, indexed lookups will cause
  // convertion to flat mode.
  if (!silent) {
    if (pmax >= 0 && state.pending.charCodeAt(pmax) === 0x20) {
      if (pmax >= 1 && state.pending.charCodeAt(pmax - 1) === 0x20) {
        // Strip out all trailing spaces on this line.
        for (var i = pmax - 2; i >= 0; i--) {
          if (state.pending.charCodeAt(i) !== 0x20) {
            state.pending = state.pending.substring(0, i + 1);
            break;
          }
        }
        state.push({
          type: 'hardbreak',
          level: state.level
        });
      } else {
        state.pending = state.pending.slice(0, -1);
        state.push({
          type: 'softbreak',
          level: state.level
        });
      }
    } else {
      state.push({
        type: 'softbreak',
        level: state.level
      });
    }
  }

  pos++;

  // skip heading spaces for next line
  while (pos < max && state.src.charCodeAt(pos) === 0x20) {
    pos++;
  }

  state.pos = pos;
  return true;
};

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Proceess escaped chars and hardbreaks



var ESCAPED = [];

for (var i = 0; i < 256; i++) {
  ESCAPED.push(0);
}

'\\!"#$%&\'()*+,./:;<=>?@[]^_`{|}~-'.split('').forEach(function (ch) {
  ESCAPED[ch.charCodeAt(0)] = 1;
});

module.exports = function escape(state, silent) {
  var ch,
      pos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x5C /* \ */) {
      return false;
    }

  pos++;

  if (pos < max) {
    ch = state.src.charCodeAt(pos);

    if (ch < 256 && ESCAPED[ch] !== 0) {
      if (!silent) {
        state.pending += state.src[pos];
      }
      state.pos += 2;
      return true;
    }

    if (ch === 0x0A) {
      if (!silent) {
        state.push({
          type: 'hardbreak',
          level: state.level
        });
      }

      pos++;
      // skip leading whitespaces from next line
      while (pos < max && state.src.charCodeAt(pos) === 0x20) {
        pos++;
      }

      state.pos = pos;
      return true;
    }
  }

  if (!silent) {
    state.pending += '\\';
  }
  state.pos++;
  return true;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Parse backticks



module.exports = function backticks(state, silent) {
  var start,
      max,
      marker,
      matchStart,
      matchEnd,
      pos = state.pos,
      ch = state.src.charCodeAt(pos);

  if (ch !== 0x60 /* ` */) {
      return false;
    }

  start = pos;
  pos++;
  max = state.posMax;

  while (pos < max && state.src.charCodeAt(pos) === 0x60 /* ` */) {
    pos++;
  }

  marker = state.src.slice(start, pos);

  matchStart = matchEnd = pos;

  while ((matchStart = state.src.indexOf('`', matchEnd)) !== -1) {
    matchEnd = matchStart + 1;

    while (matchEnd < max && state.src.charCodeAt(matchEnd) === 0x60 /* ` */) {
      matchEnd++;
    }

    if (matchEnd - matchStart === marker.length) {
      if (!silent) {
        state.push({
          type: 'code',
          content: state.src.slice(pos, matchStart).replace(/[ \n]+/g, ' ').trim(),
          block: false,
          level: state.level
        });
      }
      state.pos = matchEnd;
      return true;
    }
  }

  if (!silent) {
    state.pending += marker;
  }
  state.pos += marker.length;
  return true;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ~~deleted text~~



module.exports = function del(state, silent) {
  var found,
      pos,
      stack,
      max = state.posMax,
      start = state.pos,
      lastChar,
      nextChar;

  if (state.src.charCodeAt(start) !== 0x7E /* ~ */) {
      return false;
    }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 4 >= max) {
    return false;
  }
  if (state.src.charCodeAt(start + 1) !== 0x7E /* ~ */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
  nextChar = state.src.charCodeAt(start + 2);

  if (lastChar === 0x7E /* ~ */) {
      return false;
    }
  if (nextChar === 0x7E /* ~ */) {
      return false;
    }
  if (nextChar === 0x20 || nextChar === 0x0A) {
    return false;
  }

  pos = start + 2;
  while (pos < max && state.src.charCodeAt(pos) === 0x7E /* ~ */) {
    pos++;
  }
  if (pos > start + 3) {
    // sequence of 4+ markers taking as literal, same as in a emphasis
    state.pos += pos - start;
    if (!silent) {
      state.pending += state.src.slice(start, pos);
    }
    return true;
  }

  state.pos = start + 2;
  stack = 1;

  while (state.pos + 1 < max) {
    if (state.src.charCodeAt(state.pos) === 0x7E /* ~ */) {
        if (state.src.charCodeAt(state.pos + 1) === 0x7E /* ~ */) {
            lastChar = state.src.charCodeAt(state.pos - 1);
            nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
            if (nextChar !== 0x7E /* ~ */ && lastChar !== 0x7E /* ~ */) {
                if (lastChar !== 0x20 && lastChar !== 0x0A) {
                  // closing '~~'
                  stack--;
                } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
                  // opening '~~'
                  stack++;
                } // else {
                //  // standalone ' ~~ ' indented with spaces
                // }
                if (stack <= 0) {
                  found = true;
                  break;
                }
              }
          }
      }

    state.parser.skipToken(state);
  }

  if (!found) {
    // parser failed to find ending tag, so it's not valid emphasis
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 2;

  if (!silent) {
    state.push({ type: 'del_open', level: state.level++ });
    state.parser.tokenize(state);
    state.push({ type: 'del_close', level: --state.level });
  }

  state.pos = state.posMax + 2;
  state.posMax = max;
  return true;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ++inserted text++



module.exports = function ins(state, silent) {
  var found,
      pos,
      stack,
      max = state.posMax,
      start = state.pos,
      lastChar,
      nextChar;

  if (state.src.charCodeAt(start) !== 0x2B /* + */) {
      return false;
    }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 4 >= max) {
    return false;
  }
  if (state.src.charCodeAt(start + 1) !== 0x2B /* + */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
  nextChar = state.src.charCodeAt(start + 2);

  if (lastChar === 0x2B /* + */) {
      return false;
    }
  if (nextChar === 0x2B /* + */) {
      return false;
    }
  if (nextChar === 0x20 || nextChar === 0x0A) {
    return false;
  }

  pos = start + 2;
  while (pos < max && state.src.charCodeAt(pos) === 0x2B /* + */) {
    pos++;
  }
  if (pos !== start + 2) {
    // sequence of 3+ markers taking as literal, same as in a emphasis
    state.pos += pos - start;
    if (!silent) {
      state.pending += state.src.slice(start, pos);
    }
    return true;
  }

  state.pos = start + 2;
  stack = 1;

  while (state.pos + 1 < max) {
    if (state.src.charCodeAt(state.pos) === 0x2B /* + */) {
        if (state.src.charCodeAt(state.pos + 1) === 0x2B /* + */) {
            lastChar = state.src.charCodeAt(state.pos - 1);
            nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
            if (nextChar !== 0x2B /* + */ && lastChar !== 0x2B /* + */) {
                if (lastChar !== 0x20 && lastChar !== 0x0A) {
                  // closing '++'
                  stack--;
                } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
                  // opening '++'
                  stack++;
                } // else {
                //  // standalone ' ++ ' indented with spaces
                // }
                if (stack <= 0) {
                  found = true;
                  break;
                }
              }
          }
      }

    state.parser.skipToken(state);
  }

  if (!found) {
    // parser failed to find ending tag, so it's not valid emphasis
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 2;

  if (!silent) {
    state.push({ type: 'ins_open', level: state.level++ });
    state.parser.tokenize(state);
    state.push({ type: 'ins_close', level: --state.level });
  }

  state.pos = state.posMax + 2;
  state.posMax = max;
  return true;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ==highlighted text==



module.exports = function del(state, silent) {
  var found,
      pos,
      stack,
      max = state.posMax,
      start = state.pos,
      lastChar,
      nextChar;

  if (state.src.charCodeAt(start) !== 0x3D /* = */) {
      return false;
    }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 4 >= max) {
    return false;
  }
  if (state.src.charCodeAt(start + 1) !== 0x3D /* = */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;
  nextChar = state.src.charCodeAt(start + 2);

  if (lastChar === 0x3D /* = */) {
      return false;
    }
  if (nextChar === 0x3D /* = */) {
      return false;
    }
  if (nextChar === 0x20 || nextChar === 0x0A) {
    return false;
  }

  pos = start + 2;
  while (pos < max && state.src.charCodeAt(pos) === 0x3D /* = */) {
    pos++;
  }
  if (pos !== start + 2) {
    // sequence of 3+ markers taking as literal, same as in a emphasis
    state.pos += pos - start;
    if (!silent) {
      state.pending += state.src.slice(start, pos);
    }
    return true;
  }

  state.pos = start + 2;
  stack = 1;

  while (state.pos + 1 < max) {
    if (state.src.charCodeAt(state.pos) === 0x3D /* = */) {
        if (state.src.charCodeAt(state.pos + 1) === 0x3D /* = */) {
            lastChar = state.src.charCodeAt(state.pos - 1);
            nextChar = state.pos + 2 < max ? state.src.charCodeAt(state.pos + 2) : -1;
            if (nextChar !== 0x3D /* = */ && lastChar !== 0x3D /* = */) {
                if (lastChar !== 0x20 && lastChar !== 0x0A) {
                  // closing '=='
                  stack--;
                } else if (nextChar !== 0x20 && nextChar !== 0x0A) {
                  // opening '=='
                  stack++;
                } // else {
                //  // standalone ' == ' indented with spaces
                // }
                if (stack <= 0) {
                  found = true;
                  break;
                }
              }
          }
      }

    state.parser.skipToken(state);
  }

  if (!found) {
    // parser failed to find ending tag, so it's not valid emphasis
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 2;

  if (!silent) {
    state.push({ type: 'mark_open', level: state.level++ });
    state.parser.tokenize(state);
    state.push({ type: 'mark_close', level: --state.level });
  }

  state.pos = state.posMax + 2;
  state.posMax = max;
  return true;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process *this* and _that_



function isAlphaNum(code) {
  return code >= 0x30 /* 0 */ && code <= 0x39 /* 9 */ || code >= 0x41 /* A */ && code <= 0x5A /* Z */ || code >= 0x61 /* a */ && code <= 0x7A /* z */;
}

// parse sequence of emphasis markers,
// "start" should point at a valid marker
function scanDelims(state, start) {
  var pos = start,
      lastChar,
      nextChar,
      count,
      can_open = true,
      can_close = true,
      max = state.posMax,
      marker = state.src.charCodeAt(start);

  lastChar = start > 0 ? state.src.charCodeAt(start - 1) : -1;

  while (pos < max && state.src.charCodeAt(pos) === marker) {
    pos++;
  }
  if (pos >= max) {
    can_open = false;
  }
  count = pos - start;

  if (count >= 4) {
    // sequence of four or more unescaped markers can't start/end an emphasis
    can_open = can_close = false;
  } else {
    nextChar = pos < max ? state.src.charCodeAt(pos) : -1;

    // check whitespace conditions
    if (nextChar === 0x20 || nextChar === 0x0A) {
      can_open = false;
    }
    if (lastChar === 0x20 || lastChar === 0x0A) {
      can_close = false;
    }

    if (marker === 0x5F /* _ */) {
        // check if we aren't inside the word
        if (isAlphaNum(lastChar)) {
          can_open = false;
        }
        if (isAlphaNum(nextChar)) {
          can_close = false;
        }
      }
  }

  return {
    can_open: can_open,
    can_close: can_close,
    delims: count
  };
}

module.exports = function emphasis(state, silent) {
  var startCount,
      count,
      found,
      oldCount,
      newCount,
      stack,
      res,
      max = state.posMax,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (marker !== 0x5F /* _ */ && marker !== 0x2A /* * */) {
      return false;
    }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode

  res = scanDelims(state, start);
  startCount = res.delims;
  if (!res.can_open) {
    state.pos += startCount;
    if (!silent) {
      state.pending += state.src.slice(start, state.pos);
    }
    return true;
  }

  if (state.level >= state.options.maxNesting) {
    return false;
  }

  state.pos = start + startCount;
  stack = [startCount];

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === marker) {
      res = scanDelims(state, state.pos);
      count = res.delims;
      if (res.can_close) {
        oldCount = stack.pop();
        newCount = count;

        while (oldCount !== newCount) {
          if (newCount < oldCount) {
            stack.push(oldCount - newCount);
            break;
          }

          // assert(newCount > oldCount)
          newCount -= oldCount;

          if (stack.length === 0) {
            break;
          }
          state.pos += oldCount;
          oldCount = stack.pop();
        }

        if (stack.length === 0) {
          startCount = oldCount;
          found = true;
          break;
        }
        state.pos += count;
        continue;
      }

      if (res.can_open) {
        stack.push(count);
      }
      state.pos += count;
      continue;
    }

    state.parser.skipToken(state);
  }

  if (!found) {
    // parser failed to find ending tag, so it's not valid emphasis
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + startCount;

  if (!silent) {
    if (startCount === 2 || startCount === 3) {
      state.push({ type: 'strong_open', level: state.level++ });
    }
    if (startCount === 1 || startCount === 3) {
      state.push({ type: 'em_open', level: state.level++ });
    }

    state.parser.tokenize(state);

    if (startCount === 1 || startCount === 3) {
      state.push({ type: 'em_close', level: --state.level });
    }
    if (startCount === 2 || startCount === 3) {
      state.push({ type: 'strong_close', level: --state.level });
    }
  }

  state.pos = state.posMax + startCount;
  state.posMax = max;
  return true;
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ~subscript~



// same as UNESCAPE_MD_RE plus a space

var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

module.exports = function sub(state, silent) {
  var found,
      content,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x7E /* ~ */) {
      return false;
    }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x7E /* ~ */) {
        found = true;
        break;
      }

    state.parser.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  if (!silent) {
    state.push({
      type: 'sub',
      level: state.level,
      content: content.replace(UNESCAPE_RE, '$1')
    });
  }

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process ^superscript^



// same as UNESCAPE_MD_RE plus a space

var UNESCAPE_RE = /\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;

module.exports = function sup(state, silent) {
  var found,
      content,
      max = state.posMax,
      start = state.pos;

  if (state.src.charCodeAt(start) !== 0x5E /* ^ */) {
      return false;
    }
  if (silent) {
    return false;
  } // don't run any pairs in validation mode
  if (start + 2 >= max) {
    return false;
  }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  state.pos = start + 1;

  while (state.pos < max) {
    if (state.src.charCodeAt(state.pos) === 0x5E /* ^ */) {
        found = true;
        break;
      }

    state.parser.skipToken(state);
  }

  if (!found || start + 1 === state.pos) {
    state.pos = start;
    return false;
  }

  content = state.src.slice(start + 1, state.pos);

  // don't allow unescaped spaces/newlines inside
  if (content.match(/(^|[^\\])(\\\\)*\s/)) {
    state.pos = start;
    return false;
  }

  // found!
  state.posMax = state.pos;
  state.pos = start + 1;

  if (!silent) {
    state.push({
      type: 'sup',
      level: state.level,
      content: content.replace(UNESCAPE_RE, '$1')
    });
  }

  state.pos = state.posMax + 1;
  state.posMax = max;
  return true;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process [links](<to> "stuff")



var parseLinkLabel = __webpack_require__(9);
var parseLinkDestination = __webpack_require__(25);
var parseLinkTitle = __webpack_require__(27);
var normalizeReference = __webpack_require__(28);

module.exports = function links(state, silent) {
  var labelStart,
      labelEnd,
      label,
      href,
      title,
      pos,
      ref,
      code,
      isImage = false,
      oldPos = state.pos,
      max = state.posMax,
      start = state.pos,
      marker = state.src.charCodeAt(start);

  if (marker === 0x21 /* ! */) {
      isImage = true;
      marker = state.src.charCodeAt(++start);
    }

  if (marker !== 0x5B /* [ */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  labelStart = start + 1;
  labelEnd = parseLinkLabel(state, start);

  // parser failed to find ']', so it's not a valid link
  if (labelEnd < 0) {
    return false;
  }

  pos = labelEnd + 1;
  if (pos < max && state.src.charCodeAt(pos) === 0x28 /* ( */) {
      //
      // Inline link
      //

      // [link](  <href>  "title"  )
      //        ^^ skipping these spaces
      pos++;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) {
          break;
        }
      }
      if (pos >= max) {
        return false;
      }

      // [link](  <href>  "title"  )
      //          ^^^^^^ parsing link destination
      start = pos;
      if (parseLinkDestination(state, pos)) {
        href = state.linkContent;
        pos = state.pos;
      } else {
        href = '';
      }

      // [link](  <href>  "title"  )
      //                ^^ skipping these spaces
      start = pos;
      for (; pos < max; pos++) {
        code = state.src.charCodeAt(pos);
        if (code !== 0x20 && code !== 0x0A) {
          break;
        }
      }

      // [link](  <href>  "title"  )
      //                  ^^^^^^^ parsing link title
      if (pos < max && start !== pos && parseLinkTitle(state, pos)) {
        title = state.linkContent;
        pos = state.pos;

        // [link](  <href>  "title"  )
        //                         ^^ skipping these spaces
        for (; pos < max; pos++) {
          code = state.src.charCodeAt(pos);
          if (code !== 0x20 && code !== 0x0A) {
            break;
          }
        }
      } else {
        title = '';
      }

      if (pos >= max || state.src.charCodeAt(pos) !== 0x29 /* ) */) {
          state.pos = oldPos;
          return false;
        }
      pos++;
    } else {
    //
    // Link reference
    //

    // do not allow nested reference links
    if (state.linkLevel > 0) {
      return false;
    }

    // [foo]  [bar]
    //      ^^ optional whitespace (can include newlines)
    for (; pos < max; pos++) {
      code = state.src.charCodeAt(pos);
      if (code !== 0x20 && code !== 0x0A) {
        break;
      }
    }

    if (pos < max && state.src.charCodeAt(pos) === 0x5B /* [ */) {
        start = pos + 1;
        pos = parseLinkLabel(state, pos);
        if (pos >= 0) {
          label = state.src.slice(start, pos++);
        } else {
          pos = start - 1;
        }
      }

    // covers label === '' and label === undefined
    // (collapsed reference link and shortcut reference link respectively)
    if (!label) {
      if (typeof label === 'undefined') {
        pos = labelEnd + 1;
      }
      label = state.src.slice(labelStart, labelEnd);
    }

    ref = state.env.references[normalizeReference(label)];
    if (!ref) {
      state.pos = oldPos;
      return false;
    }
    href = ref.href;
    title = ref.title;
  }

  //
  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    state.pos = labelStart;
    state.posMax = labelEnd;

    if (isImage) {
      state.push({
        type: 'image',
        src: href,
        title: title,
        alt: state.src.substr(labelStart, labelEnd - labelStart),
        level: state.level
      });
    } else {
      state.push({
        type: 'link_open',
        href: href,
        title: title,
        level: state.level++
      });
      state.linkLevel++;
      state.parser.tokenize(state);
      state.linkLevel--;
      state.push({ type: 'link_close', level: --state.level });
    }
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process inline footnotes (^[...])



var parseLinkLabel = __webpack_require__(9);

module.exports = function footnote_inline(state, silent) {
  var labelStart,
      labelEnd,
      footnoteId,
      oldLength,
      max = state.posMax,
      start = state.pos;

  if (start + 2 >= max) {
    return false;
  }
  if (state.src.charCodeAt(start) !== 0x5E /* ^ */) {
      return false;
    }
  if (state.src.charCodeAt(start + 1) !== 0x5B /* [ */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  labelStart = start + 2;
  labelEnd = parseLinkLabel(state, start + 1);

  // parser failed to find ']', so it's not a valid note
  if (labelEnd < 0) {
    return false;
  }

  // We found the end of the link, and know for a fact it's a valid link;
  // so all that's left to do is to call tokenizer.
  //
  if (!silent) {
    if (!state.env.footnotes) {
      state.env.footnotes = {};
    }
    if (!state.env.footnotes.list) {
      state.env.footnotes.list = [];
    }
    footnoteId = state.env.footnotes.list.length;

    state.pos = labelStart;
    state.posMax = labelEnd;

    state.push({
      type: 'footnote_ref',
      id: footnoteId,
      level: state.level
    });
    state.linkLevel++;
    oldLength = state.tokens.length;
    state.parser.tokenize(state);
    state.env.footnotes.list[footnoteId] = { tokens: state.tokens.splice(oldLength) };
    state.linkLevel--;
  }

  state.pos = labelEnd + 1;
  state.posMax = max;
  return true;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process footnote references ([^...])



module.exports = function footnote_ref(state, silent) {
  var label,
      pos,
      footnoteId,
      footnoteSubId,
      max = state.posMax,
      start = state.pos;

  // should be at least 4 chars - "[^x]"
  if (start + 3 > max) {
    return false;
  }

  if (!state.env.footnotes || !state.env.footnotes.refs) {
    return false;
  }
  if (state.src.charCodeAt(start) !== 0x5B /* [ */) {
      return false;
    }
  if (state.src.charCodeAt(start + 1) !== 0x5E /* ^ */) {
      return false;
    }
  if (state.level >= state.options.maxNesting) {
    return false;
  }

  for (pos = start + 2; pos < max; pos++) {
    if (state.src.charCodeAt(pos) === 0x20) {
      return false;
    }
    if (state.src.charCodeAt(pos) === 0x0A) {
      return false;
    }
    if (state.src.charCodeAt(pos) === 0x5D /* ] */) {
        break;
      }
  }

  if (pos === start + 2) {
    return false;
  } // no empty footnote labels
  if (pos >= max) {
    return false;
  }
  pos++;

  label = state.src.slice(start + 2, pos - 1);
  if (typeof state.env.footnotes.refs[':' + label] === 'undefined') {
    return false;
  }

  if (!silent) {
    if (!state.env.footnotes.list) {
      state.env.footnotes.list = [];
    }

    if (state.env.footnotes.refs[':' + label] < 0) {
      footnoteId = state.env.footnotes.list.length;
      state.env.footnotes.list[footnoteId] = { label: label, count: 0 };
      state.env.footnotes.refs[':' + label] = footnoteId;
    } else {
      footnoteId = state.env.footnotes.refs[':' + label];
    }

    footnoteSubId = state.env.footnotes.list[footnoteId].count;
    state.env.footnotes.list[footnoteId].count++;

    state.push({
      type: 'footnote_ref',
      id: footnoteId,
      subId: footnoteSubId,
      level: state.level
    });
  }

  state.pos = pos;
  state.posMax = max;
  return true;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process autolinks '<protocol:...>'



var url_schemas = __webpack_require__(91);
var normalizeLink = __webpack_require__(26);

/*eslint max-len:0*/
var EMAIL_RE = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
var AUTOLINK_RE = /^<([a-zA-Z.\-]{1,25}):([^<>\x00-\x20]*)>/;

module.exports = function autolink(state, silent) {
  var tail,
      linkMatch,
      emailMatch,
      url,
      fullUrl,
      pos = state.pos;

  if (state.src.charCodeAt(pos) !== 0x3C /* < */) {
      return false;
    }

  tail = state.src.slice(pos);

  if (tail.indexOf('>') < 0) {
    return false;
  }

  linkMatch = tail.match(AUTOLINK_RE);

  if (linkMatch) {
    if (url_schemas.indexOf(linkMatch[1].toLowerCase()) < 0) {
      return false;
    }

    url = linkMatch[0].slice(1, -1);
    fullUrl = normalizeLink(url);
    if (!state.parser.validateLink(url)) {
      return false;
    }

    if (!silent) {
      state.push({
        type: 'link_open',
        href: fullUrl,
        level: state.level
      });
      state.push({
        type: 'text',
        content: url,
        level: state.level + 1
      });
      state.push({ type: 'link_close', level: state.level });
    }

    state.pos += linkMatch[0].length;
    return true;
  }

  emailMatch = tail.match(EMAIL_RE);

  if (emailMatch) {

    url = emailMatch[0].slice(1, -1);

    fullUrl = normalizeLink('mailto:' + url);
    if (!state.parser.validateLink(fullUrl)) {
      return false;
    }

    if (!silent) {
      state.push({
        type: 'link_open',
        href: fullUrl,
        level: state.level
      });
      state.push({
        type: 'text',
        content: url,
        level: state.level + 1
      });
      state.push({ type: 'link_close', level: state.level });
    }

    state.pos += emailMatch[0].length;
    return true;
  }

  return false;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// List of valid url schemas, accorting to commonmark spec
// http://jgm.github.io/CommonMark/spec.html#autolinks



module.exports = ['coap', 'doi', 'javascript', 'aaa', 'aaas', 'about', 'acap', 'cap', 'cid', 'crid', 'data', 'dav', 'dict', 'dns', 'file', 'ftp', 'geo', 'go', 'gopher', 'h323', 'http', 'https', 'iax', 'icap', 'im', 'imap', 'info', 'ipp', 'iris', 'iris.beep', 'iris.xpc', 'iris.xpcs', 'iris.lwz', 'ldap', 'mailto', 'mid', 'msrp', 'msrps', 'mtqp', 'mupdate', 'news', 'nfs', 'ni', 'nih', 'nntp', 'opaquelocktoken', 'pop', 'pres', 'rtsp', 'service', 'session', 'shttp', 'sieve', 'sip', 'sips', 'sms', 'snmp', 'soap.beep', 'soap.beeps', 'tag', 'tel', 'telnet', 'tftp', 'thismessage', 'tn3270', 'tip', 'tv', 'urn', 'vemmi', 'ws', 'wss', 'xcon', 'xcon-userid', 'xmlrpc.beep', 'xmlrpc.beeps', 'xmpp', 'z39.50r', 'z39.50s', 'adiumxtra', 'afp', 'afs', 'aim', 'apt', 'attachment', 'aw', 'beshare', 'bitcoin', 'bolo', 'callto', 'chrome', 'chrome-extension', 'com-eventbrite-attendee', 'content', 'cvs', 'dlna-playsingle', 'dlna-playcontainer', 'dtn', 'dvb', 'ed2k', 'facetime', 'feed', 'finger', 'fish', 'gg', 'git', 'gizmoproject', 'gtalk', 'hcp', 'icon', 'ipn', 'irc', 'irc6', 'ircs', 'itms', 'jar', 'jms', 'keyparc', 'lastfm', 'ldaps', 'magnet', 'maps', 'market', 'message', 'mms', 'ms-help', 'msnim', 'mumble', 'mvn', 'notes', 'oid', 'palm', 'paparazzi', 'platform', 'proxy', 'psyc', 'query', 'res', 'resource', 'rmi', 'rsync', 'rtmp', 'secondlife', 'sftp', 'sgn', 'skype', 'smb', 'soldat', 'spotify', 'ssh', 'steam', 'svn', 'teamspeak', 'things', 'udp', 'unreal', 'ut2004', 'ventrilo', 'view-source', 'webcal', 'wtai', 'wyciwyg', 'xfire', 'xri', 'ymsgr'];

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process html tags



var HTML_TAG_RE = __webpack_require__(93).HTML_TAG_RE;

function isLetter(ch) {
  /*eslint no-bitwise:0*/
  var lc = ch | 0x20; // to lower case
  return lc >= 0x61 /* a */ && lc <= 0x7a /* z */;
}

module.exports = function htmltag(state, silent) {
  var ch,
      match,
      max,
      pos = state.pos;

  if (!state.options.html) {
    return false;
  }

  // Check start
  max = state.posMax;
  if (state.src.charCodeAt(pos) !== 0x3C /* < */ || pos + 2 >= max) {
    return false;
  }

  // Quick fail on second char
  ch = state.src.charCodeAt(pos + 1);
  if (ch !== 0x21 /* ! */ && ch !== 0x3F /* ? */ && ch !== 0x2F /* / */ && !isLetter(ch)) {
    return false;
  }

  match = state.src.slice(pos).match(HTML_TAG_RE);
  if (!match) {
    return false;
  }

  if (!silent) {
    state.push({
      type: 'htmltag',
      content: state.src.slice(pos, pos + match[0].length),
      level: state.level
    });
  }
  state.pos += match[0].length;
  return true;
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Regexps to match html elements



function replace(regex, options) {
  regex = regex.source;
  options = options || '';

  return function self(name, val) {
    if (!name) {
      return new RegExp(regex, options);
    }
    val = val.source || val;
    regex = regex.replace(name, val);
    return self;
  };
}

var attr_name = /[a-zA-Z_:][a-zA-Z0-9:._-]*/;

var unquoted = /[^"'=<>`\x00-\x20]+/;
var single_quoted = /'[^']*'/;
var double_quoted = /"[^"]*"/;

/*eslint no-spaced-func:0*/
var attr_value = replace(/(?:unquoted|single_quoted|double_quoted)/)('unquoted', unquoted)('single_quoted', single_quoted)('double_quoted', double_quoted)();

var attribute = replace(/(?:\s+attr_name(?:\s*=\s*attr_value)?)/)('attr_name', attr_name)('attr_value', attr_value)();

var open_tag = replace(/<[A-Za-z][A-Za-z0-9]*attribute*\s*\/?>/)('attribute', attribute)();

var close_tag = /<\/[A-Za-z][A-Za-z0-9]*\s*>/;
var comment = /<!--([^-]+|[-][^-]+)*-->/;
var processing = /<[?].*?[?]>/;
var declaration = /<![A-Z]+\s+[^>]*>/;
var cdata = /<!\[CDATA\[([^\]]+|\][^\]]|\]\][^>])*\]\]>/;

var HTML_TAG_RE = replace(/^(?:open_tag|close_tag|comment|processing|declaration|cdata)/)('open_tag', open_tag)('close_tag', close_tag)('comment', comment)('processing', processing)('declaration', declaration)('cdata', cdata)();

module.exports.HTML_TAG_RE = HTML_TAG_RE;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Process html entity - &#123;, &#xAF;, &quot;, ...



var entities = __webpack_require__(24);
var has = __webpack_require__(1).has;
var isValidEntityCode = __webpack_require__(1).isValidEntityCode;
var fromCodePoint = __webpack_require__(1).fromCodePoint;

var DIGITAL_RE = /^&#((?:x[a-f0-9]{1,8}|[0-9]{1,8}));/i;
var NAMED_RE = /^&([a-z][a-z0-9]{1,31});/i;

module.exports = function entity(state, silent) {
  var ch,
      code,
      match,
      pos = state.pos,
      max = state.posMax;

  if (state.src.charCodeAt(pos) !== 0x26 /* & */) {
      return false;
    }

  if (pos + 1 < max) {
    ch = state.src.charCodeAt(pos + 1);

    if (ch === 0x23 /* # */) {
        match = state.src.slice(pos).match(DIGITAL_RE);
        if (match) {
          if (!silent) {
            code = match[1][0].toLowerCase() === 'x' ? parseInt(match[1].slice(1), 16) : parseInt(match[1], 10);
            state.pending += isValidEntityCode(code) ? fromCodePoint(code) : fromCodePoint(0xFFFD);
          }
          state.pos += match[0].length;
          return true;
        }
      } else {
      match = state.src.slice(pos).match(NAMED_RE);
      if (match) {
        if (has(entities, match[1])) {
          if (!silent) {
            state.pending += entities[match[1]];
          }
          state.pos += match[0].length;
          return true;
        }
      }
    }
  }

  if (!silent) {
    state.pending += '&';
  }
  state.pos++;
  return true;
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Remarkable default options



module.exports = {
  options: {
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />)
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks
    linkify: false, // autoconvert URL-like texts to links
    linkTarget: '', // set target to open link in

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting: 20 // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: ['block', 'inline', 'references', 'replacements', 'linkify', 'smartquotes', 'references', 'abbr2', 'footnote_tail']
    },

    block: {
      rules: ['blockquote', 'code', 'fences', 'footnote', 'heading', 'hr', 'htmlblock', 'lheading', 'list', 'paragraph', 'table']
    },

    inline: {
      rules: ['autolink', 'backticks', 'del', 'emphasis', 'entity', 'escape', 'footnote_ref', 'htmltag', 'links', 'newline', 'text']
    }
  }
};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Remarkable default options



module.exports = {
  options: {
    html: false, // Enable HTML tags in source
    xhtmlOut: false, // Use '/' to close single tags (<br />)
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks
    linkify: false, // autoconvert URL-like texts to links
    linkTarget: '', // set target to open link in

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting: 20 // Internal protection, recursion limit
  },

  components: {
    // Don't restrict core/block/inline rules
    core: {},
    block: {},
    inline: {}
  }
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Commonmark default options



module.exports = {
  options: {
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />)
    breaks: false, // Convert '\n' in paragraphs into <br>
    langPrefix: 'language-', // CSS language prefix for fenced blocks
    linkify: false, // autoconvert URL-like texts to links
    linkTarget: '', // set target to open link in

    // Enable some language-neutral replacements + quotes beautification
    typographer: false,

    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
    quotes: '“”‘’',

    // Highlighter function. Should return escaped HTML,
    // or '' if input not changed
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,

    maxNesting: 20 // Internal protection, recursion limit
  },

  components: {

    core: {
      rules: ['block', 'inline', 'references', 'abbr2']
    },

    block: {
      rules: ['blockquote', 'code', 'fences', 'heading', 'hr', 'htmlblock', 'lheading', 'list', 'paragraph']
    },

    inline: {
      rules: ['autolink', 'backticks', 'emphasis', 'entity', 'escape', 'htmltag', 'links', 'newline', 'text']
    }
  }
};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var warning = __webpack_require__(14);
var assign = __webpack_require__(13);

var ReactPropTypesSecret = __webpack_require__(15);
var checkPropTypes = __webpack_require__(23);

module.exports = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use `PropTypes.checkPropTypes()` to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (!manualPropTypeCallCache[cacheKey] &&
          // Avoid spamming the console because they are often not actionable except for lib authors
          manualPropTypeWarningCount < 3) {
            warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will throw in the standalone `prop-types` package. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName);
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(false, 'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' + 'received %s at index %s.', getPostfixForTypeWarning(checker), i);
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' + '\nBad object: ' + JSON.stringify(props[propName], null, '  ') + '\nValid keys: ' + JSON.stringify(Object.keys(shapeTypes), null, '  '));
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue)) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue === 'undefined' ? 'undefined' : _typeof(propValue);
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(6);
var invariant = __webpack_require__(7);
var ReactPropTypesSecret = __webpack_require__(15);

module.exports = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(false, 'Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = "# LoadingIndicator\n\n### Import\n```\n  import { LoadingIndicator } from '@monsoon_inc/monsoon-components';\n```\n\n### Render Example\n\n```\n  <LoadingIndicator />\n```\n### Props\n- N/A\n"

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = "### Import\n\n```\nimport { Button } from '@monsoon_inc/monsoon-components';\n```\n\n# Buttons\n\n```\n  <button type=\"icon\" size=\"small\" />\n```\n\n### Props\n  - ##### Type\n    - A string that the component uses to figure out which button to render.\n    - Options include:\n      - icon\n      - default\n\n  - ##### Icon\n    - For Icon buttons this will determine the icon in the button.\n"

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var isMergeableObject = function isMergeableObject(value) {
	return isNonNullObject(value) && !isSpecial(value);
};

function isNonNullObject(value) {
	return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

function isSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue === '[object RegExp]' || stringValue === '[object Date]' || isReactElement(value);
}

// see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

function isReactElement(value) {
	return value.$$typeof === REACT_ELEMENT_TYPE;
}

function emptyTarget(val) {
	return Array.isArray(val) ? [] : {};
}

function cloneUnlessOtherwiseSpecified(value, optionsArgument) {
	var clone = !optionsArgument || optionsArgument.clone !== false;

	return clone && isMergeableObject(value) ? deepmerge(emptyTarget(value), value, optionsArgument) : value;
}

function defaultArrayMerge(target, source, optionsArgument) {
	return target.concat(source).map(function (element) {
		return cloneUnlessOtherwiseSpecified(element, optionsArgument);
	});
}

function mergeObject(target, source, optionsArgument) {
	var destination = {};
	if (isMergeableObject(target)) {
		Object.keys(target).forEach(function (key) {
			destination[key] = cloneUnlessOtherwiseSpecified(target[key], optionsArgument);
		});
	}
	Object.keys(source).forEach(function (key) {
		if (!isMergeableObject(source[key]) || !target[key]) {
			destination[key] = cloneUnlessOtherwiseSpecified(source[key], optionsArgument);
		} else {
			destination[key] = deepmerge(target[key], source[key], optionsArgument);
		}
	});
	return destination;
}

function deepmerge(target, source, optionsArgument) {
	var sourceIsArray = Array.isArray(source);
	var targetIsArray = Array.isArray(target);
	var options = optionsArgument || { arrayMerge: defaultArrayMerge };
	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

	if (!sourceAndTargetTypesMatch) {
		return cloneUnlessOtherwiseSpecified(source, optionsArgument);
	} else if (sourceIsArray) {
		var arrayMerge = options.arrayMerge || defaultArrayMerge;
		return arrayMerge(target, source, optionsArgument);
	} else {
		return mergeObject(target, source, optionsArgument);
	}
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
	if (!Array.isArray(array)) {
		throw new Error('first argument should be an array');
	}

	return array.reduce(function (prev, next) {
		return deepmerge(prev, next, optionsArgument);
	}, {});
};

var deepmerge_1 = deepmerge;

/* harmony default export */ __webpack_exports__["a"] = (deepmerge_1);

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer, module) {var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var clone = function () {
  'use strict';

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
  */

  function clone(parent, circular, depth, prototype) {
    var filter;
    if ((typeof circular === 'undefined' ? 'undefined' : _typeof(circular)) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      filter = circular.filter;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];

    var useBuffer = typeof Buffer != 'undefined';

    if (typeof circular == 'undefined') circular = true;

    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;

      if (depth == 0) return parent;

      var child;
      var proto;
      if ((typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) != 'object') {
        return parent;
      }

      if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        child = new Buffer(parent.length);
        parent.copy(child);
        return child;
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }

      if (circular) {
        var index = allParents.indexOf(parent);

        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }

      for (var i in parent) {
        var attrs;
        if (proto) {
          attrs = Object.getOwnPropertyDescriptor(proto, i);
        }

        if (attrs && attrs.set == null) {
          continue;
        }
        child[i] = _clone(parent[i], depth - 1);
      }

      return child;
    }

    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;

    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  };
  clone.__objToStr = __objToStr;

  function __isDate(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Date]';
  };
  clone.__isDate = __isDate;

  function __isArray(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Array]';
  };
  clone.__isArray = __isArray;

  function __isRegExp(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object RegExp]';
  };
  clone.__isRegExp = __isRegExp;

  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  };
  clone.__getRegExpFlags = __getRegExpFlags;

  return clone;
}();

if (( false ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
  module.exports = clone;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(104).Buffer, __webpack_require__(109)(module)))

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(106);
var ieee754 = __webpack_require__(107);
var isArray = __webpack_require__(108);

exports.Buffer = Buffer;
exports.SlowBuffer = SlowBuffer;
exports.INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined ? global.TYPED_ARRAY_SUPPORT : typedArraySupport();

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength();

function typedArraySupport() {
  try {
    var arr = new Uint8Array(1);
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function foo() {
        return 42;
      } };
    return arr.foo() === 42 && // typed array instances can be augmented
    typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
    arr.subarray(1, 1).byteLength === 0; // ie10 has broken `subarray`
  } catch (e) {
    return false;
  }
}

function kMaxLength() {
  return Buffer.TYPED_ARRAY_SUPPORT ? 0x7fffffff : 0x3fffffff;
}

function createBuffer(that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length');
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length);
    }
    that.length = length;
  }

  return that;
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer(arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length);
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error('If encoding is specified then the first argument must be a string');
    }
    return allocUnsafe(this, arg);
  }
  return from(this, arg, encodingOrOffset, length);
}

Buffer.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype;
  return arr;
};

function from(that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number');
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length);
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset);
  }

  return fromObject(that, value);
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length);
};

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  if (typeof Symbol !== 'undefined' && Symbol.species && Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    });
  }
}

function assertSize(size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number');
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative');
  }
}

function alloc(that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size);
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string' ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
  }
  return createBuffer(that, size);
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding);
};

function allocUnsafe(that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that;
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size);
};

function fromString(that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding');
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that;
}

function fromArrayLike(that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that;
}

function fromArrayBuffer(that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds');
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds');
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that;
}

function fromObject(that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that;
    }

    obj.copy(that, 0, 0, len);
    return that;
  }

  if (obj) {
    if (typeof ArrayBuffer !== 'undefined' && obj.buffer instanceof ArrayBuffer || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0);
      }
      return fromArrayLike(that, obj);
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data);
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.');
}

function checked(length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + kMaxLength().toString(16) + ' bytes');
  }
  return length | 0;
}

function SlowBuffer(length) {
  if (+length != length) {
    // eslint-disable-line eqeqeq
    length = 0;
  }
  return Buffer.alloc(+length);
}

Buffer.isBuffer = function isBuffer(b) {
  return !!(b != null && b._isBuffer);
};

Buffer.compare = function compare(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers');
  }

  if (a === b) return 0;

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

Buffer.isEncoding = function isEncoding(encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true;
    default:
      return false;
  }
};

Buffer.concat = function concat(list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers');
  }

  if (list.length === 0) {
    return Buffer.alloc(0);
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers');
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer;
};

function byteLength(string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length;
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength;
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0;

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len;
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length;
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2;
      case 'hex':
        return len >>> 1;
      case 'base64':
        return base64ToBytes(string).length;
      default:
        if (loweredCase) return utf8ToBytes(string).length; // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer.byteLength = byteLength;

function slowToString(encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return '';
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return '';
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return '';
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end);

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end);

      case 'ascii':
        return asciiSlice(this, start, end);

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end);

      case 'base64':
        return base64Slice(this, start, end);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true;

function swap(b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer.prototype.swap16 = function swap16() {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits');
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this;
};

Buffer.prototype.swap32 = function swap32() {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits');
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this;
};

Buffer.prototype.swap64 = function swap64() {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits');
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this;
};

Buffer.prototype.toString = function toString() {
  var length = this.length | 0;
  if (length === 0) return '';
  if (arguments.length === 0) return utf8Slice(this, 0, length);
  return slowToString.apply(this, arguments);
};

Buffer.prototype.equals = function equals(b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
  if (this === b) return true;
  return Buffer.compare(this, b) === 0;
};

Buffer.prototype.inspect = function inspect() {
  var str = '';
  var max = exports.INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>';
};

Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer');
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index');
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0;
  }
  if (thisStart >= thisEnd) {
    return -1;
  }
  if (start >= end) {
    return 1;
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0;

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break;
    }
  }

  if (x < y) return -1;
  if (y < x) return 1;
  return 0;
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1;

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset; // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1;else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;else return -1;
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1;
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
  }

  throw new TypeError('val must be string, number or Buffer');
}

function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1;
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read(buf, i) {
    if (indexSize === 1) {
      return buf[i];
    } else {
      return buf.readUInt16BE(i * indexSize);
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break;
        }
      }
      if (found) return i;
    }
  }

  return -1;
}

Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1;
};

Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};

Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};

function hexWrite(buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string');

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i;
    buf[offset + i] = parsed;
  }
  return i;
}

function utf8Write(buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
}

function asciiWrite(buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length);
}

function latin1Write(buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length);
}

function base64Write(buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length);
}

function ucs2Write(buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
}

Buffer.prototype.write = function write(string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
    // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
    // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds');
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length);

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length);

      case 'ascii':
        return asciiWrite(this, string, offset, length);

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length);

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length);

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length);

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer.prototype.toJSON = function toJSON() {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  };
};

function base64Slice(buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf);
  } else {
    return base64.fromByteArray(buf.slice(start, end));
  }
}

function utf8Slice(buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break;
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break;
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res);
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray(codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints); // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
  }
  return res;
}

function asciiSlice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret;
}

function latin1Slice(buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret;
}

function hexSlice(buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out;
}

function utf16leSlice(buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res;
}

Buffer.prototype.slice = function slice(start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf;
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset(offset, ext, length) {
  if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
}

Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val;
};

Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val;
};

Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset];
};

Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | this[offset + 1] << 8;
};

Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] << 8 | this[offset + 1];
};

Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};

Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};

Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val;
};

Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return this[offset];
  return (0xff - this[offset] + 1) * -1;
};

Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | this[offset + 1] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | this[offset] << 8;
  return val & 0x8000 ? val | 0xFFFF0000 : val;
};

Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};

Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};

Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, true, 23, 4);
};

Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return ieee754.read(this, offset, false, 23, 4);
};

Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, true, 52, 8);
};

Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return ieee754.read(this, offset, false, 52, 8);
};

function checkInt(buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
}

Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = value / mul & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = value & 0xff;
  return offset + 1;
};

function objectWriteUInt16(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

function objectWriteUInt32(buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = (value / mul >> 0) - sub & 0xFF;
  }

  return offset + byteLength;
};

Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = value & 0xff;
  return offset + 1;
};

Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2;
};

Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2;
};

Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4;
};

Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4;
};

function checkIEEE754(buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range');
  if (offset < 0) throw new RangeError('Index out of range');
}

function writeFloat(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4;
}

Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert);
};

Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert);
};

function writeDouble(buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8;
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert);
};

Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert);
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy(target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0;
  if (target.length === 0 || this.length === 0) return 0;

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds');
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds');
  if (end < 0) throw new RangeError('sourceEnd out of bounds');

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
  }

  return len;
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill(val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string');
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding);
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index');
  }

  if (end <= start) {
    return this;
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = Buffer.isBuffer(val) ? val : utf8ToBytes(new Buffer(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this;
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean(str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return '';
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str;
}

function stringtrim(str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
}

function toHex(n) {
  if (n < 16) return '0' + n.toString(16);
  return n.toString(16);
}

function utf8ToBytes(string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue;
        }

        // valid lead
        leadSurrogate = codePoint;

        continue;
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue;
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break;
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break;
      bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break;
      bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break;
      bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
    } else {
      throw new Error('Invalid code point');
    }
  }

  return bytes;
}

function asciiToBytes(str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray;
}

function utf16leToBytes(str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break;

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray;
}

function base64ToBytes(str) {
  return base64.toByteArray(base64clean(str));
}

function blitBuffer(src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if (i + offset >= dst.length || i >= src.length) break;
    dst[i + offset] = src[i];
  }
  return i;
}

function isnan(val) {
  return val !== val; // eslint-disable-line no-self-compare
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(105)))

/***/ }),
/* 105 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}

revLookup['-'.charCodeAt(0)] = 62;
revLookup['_'.charCodeAt(0)] = 63;

function placeHoldersCount(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4');
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;
}

function byteLength(b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64);
}

function toByteArray(b64) {
  var i, l, tmp, placeHolders, arr;
  var len = b64.length;
  placeHolders = placeHoldersCount(b64);

  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0; i < l; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = tmp >> 16 & 0xFF;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[L++] = tmp >> 8 & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr;
}

function tripletToBase64(num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}

function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
    output.push(tripletToBase64(tmp));
  }
  return output.join('');
}

function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[tmp << 4 & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    output += lookup[tmp >> 10];
    output += lookup[tmp >> 4 & 0x3F];
    output += lookup[tmp << 2 & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('');
}

/***/ }),
/* 107 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
};

/***/ }),
/* 108 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames() {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg === 'undefined' ? 'undefined' : _typeof(arg);

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if ("function" === 'function' && _typeof(__webpack_require__(33)) === 'object' && __webpack_require__(33)) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
})();

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = "# Form\n\n### Import\n```\nimport { Form } from '@monsoon_inc/monsoon-components';\n```\n\n\n### Props\n```\nexport const letterTest = {\n  method:  (val) => { return val.match(/[a-zA-Z]/) ? false : true; },\n  message: 'No Letters Please'\n};\n\nconst inputsConfig = [\n    {\n      name: 'productIdentifier',\n      defaultValue: '',\n      suffix: '',\n      placeholder: 'Enter an ASIN',\n      characterLimit: 10,\n      optional: false,\n      submitOnEnter: true,\n      tests: [],\n    }\n  ];\n\n  const buttonsConfig = [\n    {\n      name: 'submit',\n      type: 'icon',\n      label: 'submit',\n      action: 'submit'\n    },\n  ];\n\n```\n\n### Render\n```\n  <Form inputsConfig={inputsConfig} buttonsConfig={buttonsConfig} onSubmit={this.onSubmit} />\n```\n\n### Props\n  - #### inputsConfig\n    - name: <string> : name of the input\n    - defaultValue: <string> <int> <float> : the default value of the input\n    - suffix: <string> : this is appear to the right of the input\n    - placeholder: <string> : this is the placeholder of the input\n    - characterLimit: <int> : the inclusive limit of characters that the input will hold\n    - optional: <boolean> : if this option is set to true than the form can be submitted without any value in this input\n    - submitOnEnter: <boolean> : if the user presses enter while the form is in focus than the form will submit\n    - tests: <array> : the are objects with two function that are passed the input value and return true or false to determine whether the input has errors.\n\n  - #### buttonsConfig\n    - name: <string> : name of button\n    - type: <string> : type of button (see button options)\n    - label: <string> : label of the button\n    - action: <string> :\n      - submit (to submit the form)\n"

/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = "# Icon Reference\n\n```\n  <Icon\n    type=\"icon\"\n    height={20}\n    width={30}\n  />\n```\n### props:\n- type: string\n- height: number (optional)\n- width: number (optional)\n\n### TODO\n  - ### Replace height and width with size prop\n"

/***/ }),
/* 113 */
/***/ (function(module, exports) {

module.exports = "### Import\n```\nimport { Input } from '@monsoon_inc/monsoon-components';\n```\n\n# Buttons\n\n```\n  <Input />\n```\n\n### Props\n  - N/A"

/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = "------\n\n### Import\n\n```\nimport { Modal, ConfirmationModal } from '@monsoon_inc/monsoon-components';\n```\n&nbsp;\n\n-------\n\n### Examples:\n```\n<Modal open='true'>\n  <div> I am in a modal! </div>\n</Modal>\n\n<ConfirmationModal\n  open={this.state.confirmationModalOpen}\n  onConfirm={this.confirmationModalClose}\n  onClose={this.confirmationModalClose}\n  message={'Are you sure you want to close the Confirmation Modal'}\n/>\n```\n&nbsp;\n\n-------\n\n### props:\n- open: Boolean that determines whether the modal displays or not\n- onConfirm: Function triggered when user clicks on \"Yes\"\n- onConfirm: Function triggered when user clicks on \"No\"\n- message: String displayed to the user in the modal\n"

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = "------\n\n### Import\n\n```\nimport { ImagePlaceholder } from '@monsoon_inc/monsoon-components';\n```\n&nbsp;\n\n-------\n\n### Examples:\n```\n<ImagePlaceholder />\n```\n&nbsp;\n\n-------\n\n### Props:\n  N/A\n"

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ImagePlaceholder__ = __webpack_require__(19);


/* harmony default export */ __webpack_exports__["default"] = (__WEBPACK_IMPORTED_MODULE_0__ImagePlaceholder__["default"]);

/***/ }),
/* 117 */
/***/ (function(module, exports) {

module.exports = "------\n\n### Import\n\n```\nimport { Table } from '@monsoon_inc/monsoon-components';\n```\n&nbsp;\n\n-------\n\n### Examples:\n```\nconst testTableData = {\n  'key_one': 'value_one',\n  'key_two': 'value_two',\n};\n\nconst testTableConfig = {\n  keyFormatter: (val) => val,\n  valueFormatter: (val) => val,\n};\n\n\n<Table\n  data={testTableData}\n  config={testTableConfig}\n/>\n```\n&nbsp;\n\n-------\n\n### props:\n- data: An object where the key and values will represent the table's key and value\n- config: An object with\n  - keyFormatter: function that receives the data object key. Needs to return a string, number or element.\n  - valueFormatter: function that receives the data object value. Needs to return a string, number or element.\n"

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./LoadingIndicator/LoadingIndicator.dev.js": 21,
	"./buttons/Buttons.dev.js": 30,
	"./card/Card.dev.js": 119,
	"./form/Form.dev.js": 31,
	"./icons/Icon.dev.js": 34,
	"./input/Input.dev.js": 35,
	"./modals/Modal.dev.js": 36,
	"./placeholders/Placeholders.dev.js": 39,
	"./table/Table.dev.js": 40
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 118;

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Card__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guide_md___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__guide_md__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var CardDev = function (_React$Component) {
  _inherits(CardDev, _React$Component);

  function CardDev(props) {
    _classCallCheck(this, CardDev);

    return _possibleConstructorReturn(this, (CardDev.__proto__ || Object.getPrototypeOf(CardDev)).call(this, props));
  }

  _createClass(CardDev, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_1__development_devComponents_DisplaySection_dev_js__["a" /* default */],
          { label: 'Default Card' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'h1',
            null,
            'Card'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'markdown-body' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_react_markdown_renderer___default.a, { markdown: __WEBPACK_IMPORTED_MODULE_3__guide_md___default.a })
        )
      );
    }
  }]);

  return CardDev;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

/* harmony default export */ __webpack_exports__["default"] = (CardDev);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var Card = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card(props) {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this, props));
  }

  _createClass(Card, [{
    key: "render",
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "div",
        { className: "Card-wrapper" },
        "Hello, I am Card"
      );
    }
  }]);

  return Card;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Card.defaultProps = {};
Card.propTypes = {};

/* harmony default export */ __webpack_exports__["default"] = (Card);

/***/ }),
/* 121 */
/***/ (function(module, exports) {

module.exports = "# Card\n\n### Import\n```\nimport { Card } from '@monsoon_inc/component-library';\n```\n\n### Render Example\n```\n  <Card />\n```\n\n### Props\n  - N/A\n"

/***/ })
/******/ ]);