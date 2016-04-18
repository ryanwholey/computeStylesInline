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
	var fixture = document.querySelector('.fixture');
	computeStyles(fixture);

	function computeStyles(node, styleElRules) {

	    if (!node) {
	        return;
	    }

	    var styleEls = document.querySelectorAll('style'),
	        cssSheets = void 0,
	        cssRules = void 0,
	        stylesRules = void 0;

	    styleElRules = styleElRules || {};

	    [].forEach.call(styleEls, function (sheet) {
	        stylesRules = sheet.innerHTML.match(/{(.*?)}/g)[0].replace(/ /g, '').replace(/[:;{}]/g, ' ').trim().split(' ');

	        stylesRules = stylesRules.filter(function (prop) {
	            return prop !== '!important';
	        });

	        for (var i = 0; i < stylesRules.length; i += 2) {
	            styleElRules[stylesRules[i]] = true;
	        }
	    });

	    try {
	        cssRules = [].map.call(document.styleSheets, function (sheet) {
	            return [].map.call(sheet.cssRules, function (rule) {
	                return rule.cssText;
	            });
	        }).reduce(function (obj, piece) {
	            var piece = piece.map(function (rule) {
	                return rule.match(/{(.*?)}/g)[0].replace(/ /g, '').replace(/[:;{}]/g, ' ').trim().split(' ');
	            })[0];
	            piece = piece.filter(function (item) {
	                return item !== '!important';
	            });

	            for (var i = 0; i < piece.length; i += 2) {
	                obj[piece[i]] = true;
	            }

	            return obj;
	        }, {});
	    } catch (e) {
	        console.log('you got an error');
	        console.log(e);
	    }

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