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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function computeStyles(node, styleElRules) {

	    if (!node) {
	        return;
	    }

	    var styleEls = document.querySelectorAll('style'),
	        rulesArr = void 0;

	    styleElRules = styleElRules || {};

	    [].forEach.call(styleEls, function (sheet) {
	        rulesArr = sheet.innerHTML.match(/{(.*?)}/g)[0].replace(/ /g, '').replace(/[:;{}]/g, ' ').trim().split(' ');

	        rulesArr = rulesArr.filter(function (prop) {
	            return prop !== '!important';
	        });

	        for (var i = 0; i < rulesArr.length; i += 2) {
	            styleElRules[rulesArr[i]] = true;
	        }
	    });

	    [].forEach.call(node.children, function (child) {
	        return computeStyles(child);
	    });

	    for (var prop in styleElRules) {
	        node.style[prop] = getComputedStyle(node)[prop];
	    }
	    return node.outerHTML;
	}

	function getInline() {
	    var inlineRaw = {};
	    if (node.getAttribute('style')) {
	        inlineRaw = node.getAttribute('style').replace(/ /g, '').replace(/[:;]/g, ' ').split(' ');
	    }
	    return inlineRaw;
	}

	exports.default = computeStyles;

/***/ }
/******/ ]);