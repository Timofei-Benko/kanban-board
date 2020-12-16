// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/clamp.js":[function(require,module,exports) {
/*!
* Clamp.js 0.5.1
*
* Copyright 2011-2013, Joseph Schmitt http://joe.sh
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/
(function () {
  /**
   * Clamps a text node.
   * @param {HTMLElement} element. Element containing the text node to clamp.
   * @param {Object} options. Options to pass to the clamper.
   */
  function clamp(element, options) {
    options = options || {};
    var self = this,
        win = window,
        opt = {
      clamp: options.clamp || 2,
      useNativeClamp: typeof options.useNativeClamp != 'undefined' ? options.useNativeClamp : true,
      splitOnChars: options.splitOnChars || ['.', '-', '–', '—', ' '],
      //Split on sentences (periods), hypens, en-dashes, em-dashes, and words (spaces).
      animate: options.animate || false,
      truncationChar: options.truncationChar || '…',
      truncationHTML: options.truncationHTML
    },
        sty = element.style,
        originalText = element.innerHTML,
        supportsNativeClamp = typeof element.style.webkitLineClamp != 'undefined',
        clampValue = opt.clamp,
        isCSSValue = clampValue.indexOf && (clampValue.indexOf('px') > -1 || clampValue.indexOf('em') > -1),
        truncationHTMLContainer;

    if (opt.truncationHTML) {
      truncationHTMLContainer = document.createElement('span');
      truncationHTMLContainer.innerHTML = opt.truncationHTML;
    } // UTILITY FUNCTIONS __________________________________________________________

    /**
     * Return the current style for an element.
     * @param {HTMLElement} elem The element to compute.
     * @param {string} prop The style property.
     * @returns {number}
     */


    function computeStyle(elem, prop) {
      if (!win.getComputedStyle) {
        win.getComputedStyle = function (el, pseudo) {
          this.el = el;

          this.getPropertyValue = function (prop) {
            var re = /(\-([a-z]){1})/g;
            if (prop == 'float') prop = 'styleFloat';

            if (re.test(prop)) {
              prop = prop.replace(re, function () {
                return arguments[2].toUpperCase();
              });
            }

            return el.currentStyle && el.currentStyle[prop] ? el.currentStyle[prop] : null;
          };

          return this;
        };
      }

      return win.getComputedStyle(elem, null).getPropertyValue(prop);
    }
    /**
     * Returns the maximum number of lines of text that should be rendered based
     * on the current height of the element and the line-height of the text.
     */


    function getMaxLines(height) {
      var availHeight = height || element.clientHeight,
          lineHeight = getLineHeight(element);
      return Math.max(Math.floor(availHeight / lineHeight), 0);
    }
    /**
     * Returns the maximum height a given element should have based on the line-
     * height of the text and the given clamp value.
     */


    function getMaxHeight(clmp) {
      var lineHeight = getLineHeight(element);
      return lineHeight * clmp;
    }
    /**
     * Returns the line-height of an element as an integer.
     */


    function getLineHeight(elem) {
      var lh = computeStyle(elem, 'line-height');

      if (lh == 'normal') {
        // Normal line heights vary from browser to browser. The spec recommends
        // a value between 1.0 and 1.2 of the font size. Using 1.1 to split the diff.
        lh = parseInt(computeStyle(elem, 'font-size')) * 1.2;
      }

      return parseInt(lh);
    } // MEAT AND POTATOES (MMMM, POTATOES...) ______________________________________


    var splitOnChars = opt.splitOnChars.slice(0),
        splitChar = splitOnChars[0],
        chunks,
        lastChunk;
    /**
     * Gets an element's last child. That may be another node or a node's contents.
     */

    function getLastChild(elem) {
      //Current element has children, need to go deeper and get last child as a text node
      if (elem.lastChild.children && elem.lastChild.children.length > 0) {
        return getLastChild(Array.prototype.slice.call(elem.children).pop());
      } //This is the absolute last child, a text node, but something's wrong with it. Remove it and keep trying
      else if (!elem.lastChild || !elem.lastChild.nodeValue || elem.lastChild.nodeValue == '' || elem.lastChild.nodeValue == opt.truncationChar) {
          elem.lastChild.parentNode.removeChild(elem.lastChild);
          return getLastChild(element);
        } //This is the last child we want, return it
        else {
            return elem.lastChild;
          }
    }
    /**
     * Removes one character at a time from the text until its width or
     * height is beneath the passed-in max param.
     */


    function truncate(target, maxHeight) {
      if (!maxHeight) {
        return;
      }
      /**
       * Resets global variables.
       */


      function reset() {
        splitOnChars = opt.splitOnChars.slice(0);
        splitChar = splitOnChars[0];
        chunks = null;
        lastChunk = null;
      }

      var nodeValue = target.nodeValue.replace(opt.truncationChar, ''); //Grab the next chunks

      if (!chunks) {
        //If there are more characters to try, grab the next one
        if (splitOnChars.length > 0) {
          splitChar = splitOnChars.shift();
        } //No characters to chunk by. Go character-by-character
        else {
            splitChar = '';
          }

        chunks = nodeValue.split(splitChar);
      } //If there are chunks left to remove, remove the last one and see if
      // the nodeValue fits.


      if (chunks.length > 1) {
        // console.log('chunks', chunks);
        lastChunk = chunks.pop(); // console.log('lastChunk', lastChunk);

        applyEllipsis(target, chunks.join(splitChar));
      } //No more chunks can be removed using this character
      else {
          chunks = null;
        } //Insert the custom HTML before the truncation character


      if (truncationHTMLContainer) {
        target.nodeValue = target.nodeValue.replace(opt.truncationChar, '');
        element.innerHTML = target.nodeValue + ' ' + truncationHTMLContainer.innerHTML + opt.truncationChar;
      } //Search produced valid chunks


      if (chunks) {
        //It fits
        if (element.clientHeight <= maxHeight) {
          //There's still more characters to try splitting on, not quite done yet
          if (splitOnChars.length >= 0 && splitChar != '') {
            applyEllipsis(target, chunks.join(splitChar) + splitChar + lastChunk);
            chunks = null;
          } //Finished!
          else {
              return element.innerHTML;
            }
        }
      } //No valid chunks produced
      else {
          //No valid chunks even when splitting by letter, time to move
          //on to the next node
          if (splitChar == '') {
            applyEllipsis(target, '');
            target = getLastChild(element);
            reset();
          }
        } //If you get here it means still too big, let's keep truncating


      if (opt.animate) {
        setTimeout(function () {
          truncate(target, maxHeight);
        }, opt.animate === true ? 10 : opt.animate);
      } else {
        return truncate(target, maxHeight);
      }
    }

    function applyEllipsis(elem, str) {
      elem.nodeValue = str + opt.truncationChar;
    } // CONSTRUCTOR ________________________________________________________________


    if (clampValue == 'auto') {
      clampValue = getMaxLines();
    } else if (isCSSValue) {
      clampValue = getMaxLines(parseInt(clampValue));
    }

    var clampedText;

    if (supportsNativeClamp && opt.useNativeClamp) {
      sty.overflow = 'hidden';
      sty.textOverflow = 'ellipsis';
      sty.webkitBoxOrient = 'vertical';
      sty.display = '-webkit-box';
      sty.webkitLineClamp = clampValue;

      if (isCSSValue) {
        sty.height = opt.clamp + 'px';
      }
    } else {
      var height = getMaxHeight(clampValue);

      if (height <= element.clientHeight) {
        clampedText = truncate(getLastChild(element), height);
      }
    }

    return {
      'original': originalText,
      'clamped': clampedText
    };
  }

  window.$clamp = clamp;
})();
},{}],"js/svgVariables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.svgIcons = void 0;
var removeIcon = '<svg height="511.99998pt" viewBox="1 1 511.99998 511.99998" width="511.99998pt" xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.386719 0-256 114.613281-256 256s114.613281 256 256 256 256-114.613281 256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0 480c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.132812 123.65625-100.34375 223.867188-224 224zm0 0"/><path d="m380.449219 131.550781c-6.25-6.246093-16.378907-6.246093-22.625 0l-101.824219 101.824219-101.824219-101.824219c-6.140625-6.355469-16.269531-6.53125-22.625-.390625-6.355469 6.136719-6.53125 16.265625-.390625 22.621094.128906.132812.257813.265625.390625.394531l101.824219 101.824219-101.824219 101.824219c-6.355469 6.136719-6.53125 16.265625-.390625 22.625 6.136719 6.355469 16.265625 6.53125 22.621094.390625.132812-.128906.265625-.257813.394531-.390625l101.824219-101.824219 101.824219 101.824219c6.355469 6.136719 16.484375 5.960937 22.621093-.394531 5.988282-6.199219 5.988282-16.03125 0-22.230469l-101.820312-101.824219 101.824219-101.824219c6.246093-6.246093 6.246093-16.375 0-22.625zm0 0"/></svg>';
var moveIcon = "<svg version=\"1.1\" id=\"move-right\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\nwidth=\"612px\" height=\"612px\" viewBox=\"0 0 612 612\" style=\"enable-background:new 0 0 612 612;\" xml:space=\"preserve\">\n<g>\n<g id=\"_x35__2_\">\n   <g>\n       <path d=\"M431.001,289.189l-108.19-108.19c-7.478-7.478-19.583-7.478-27.042,0c-7.478,7.478-7.478,19.584,0,27.043l78.814,78.833\n           H172.125C161.568,286.875,153,295.443,153,306c0,10.557,8.568,19.125,19.125,19.125h202.457l-78.814,78.814\n           c-7.478,7.478-7.478,19.584,0,27.042c7.478,7.479,19.584,7.479,27.042,0l108.19-108.189c4.59-4.59,6.005-10.863,4.973-16.811\n           C437.006,300.071,435.572,293.779,431.001,289.189z M306,0C136.992,0,0,136.992,0,306s136.992,306,306,306s306-137.012,306-306\n           S475.008,0,306,0z M306,573.75C158.125,573.75,38.25,453.875,38.25,306C38.25,158.125,158.125,38.25,306,38.25\n           c147.875,0,267.75,119.875,267.75,267.75C573.75,453.875,453.875,573.75,306,573.75z\"/>\n   </g>\n</g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n<g>\n</g>\n</svg>";
var svgIcons = {
  remove: removeIcon,
  move: moveIcon
};
exports.svgIcons = svgIcons;
},{}],"js/cardCounter.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.countCards = void 0;
var column = document.body.querySelector('div[data-cards="cards-container"]');
var counterBlock = document.body.querySelector('.board__to-do-counter');
var counter = column.children.length;

var countCards = function countCards(column, counterBlock) {
  column.children ? counter = column.children.length : counter = 0;
  counterBlock.innerHTML = counter;
};

exports.countCards = countCards;
countCards(column, counterBlock); // running the function on page load
// to do: add listener for it
},{}],"js/clampCardBody.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clampCardBody = clampCardBody;

// const cardBody = document.body.querySelector('.board__card-copy')
// $clamp(cardBody, {clamp: 2})
function clampCardBody() {
  var cardBodies = document.body.querySelectorAll('.board__card-copy');

  for (var i = 0; i < cardBodies.length; i++) {
    $clamp(cardBodies[i], {
      clamp: 2
    });
  }
}
},{}],"js/addCard.js":[function(require,module,exports) {
'use strict'; // Variables

var _svgVariables = require("./svgVariables.js");

var _cardCounter = require("./cardCounter.js");

var _clampCardBody = require("./clampCardBody.js");

var addCardBtn = document.body.querySelector('.board__add-new-btn');
var toDoColumn = document.body.querySelector('.board__to-do-cards-container');
var column = document.body.querySelector('div[data-cards="cards-container"]');
var counterBlock = document.body.querySelector('.board__to-do-counter');
var modal = document.body.querySelector('.add-card-modal');
var titleInput = document.body.querySelector('.add-card-modal__title-input');
var descriptionInput = document.body.querySelector('.add-card-modal__description-input');
var today = new Date(Date.now());
var todayFormated = today.toLocaleDateString();
var card = "<div class=\"board__card\">\n            <h3 class=\"board__card-title\"></h3>\n            <p class=\"board__card-copy\"></p>\n            <p class=\"board__card-date\"></p>\n            </div>"; // Functions

var toggle = function toggle(token) {
  return token.classList.toggle('active');
};

var showErrorMessage = function showErrorMessage(input) {
  return input.nextElementSibling.classList.add('active');
};

var hideErrorMessage = function hideErrorMessage(input) {
  return input.nextElementSibling.classList.remove('active');
};

var clearInput = function clearInput() {
  for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
    inputs[_key] = arguments[_key];
  }

  return inputs.forEach(function (input) {
    return input.value = '';
  });
};

function checkIfEmpty() {
  var isEmpty = false;

  for (var _len2 = arguments.length, inputs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    inputs[_key2] = arguments[_key2];
  }

  inputs.forEach(function (input) {
    if (!input.value) {
      showErrorMessage(input);
      return isEmpty = true;
    }
  });
  return isEmpty;
} // Listeners
// opens the modal window


addCardBtn.addEventListener('click', function () {
  return toggle(modal);
}); // listens to events in modal window

modal.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-card-modal__close-btn')) {
    toggle(modal); // closes the modal
  }

  if (event.target.classList.contains('add-card-modal__save-btn')) {
    // makes the necessary checks, shows error if empty, else adds a card 
    if (checkIfEmpty(titleInput, descriptionInput)) {
      return;
    } else {
      var _card = "<div class=\"board__card\">\n                            <h3 class=\"board__card-title\">".concat(titleInput.value, "</h3>\n                            <p class=\"board__card-copy\">").concat(descriptionInput.value, "</p>\n                            <div class=\"board__card-footer\">\n                                <p class=\"board__card-date\">").concat(todayFormated, "</p>\n                                <button class=\"board__card-move-btn\">\n                                    ").concat(_svgVariables.svgIcons.move, "\n                                </button>\n                                <button class=\"board__card-remove-btn\">\n                                    ").concat(_svgVariables.svgIcons.remove, "\n                                </button>\n                            </div>\n                        </div>");

      toDoColumn.innerHTML += _card;
      clearInput(titleInput, descriptionInput); // clears inputs so that there are no previously entered values

      toggle(modal);
      (0, _cardCounter.countCards)(column, counterBlock);
      (0, _clampCardBody.clampCardBody)();
    }
  }
});
modal.addEventListener('keyup', function (event) {
  // removes error message when user starts to type into the input
  if (event.target.classList.contains('add-card-modal__title-input') || event.target.classList.contains('add-card-modal__description-input')) {
    hideErrorMessage(event.target);
  }
});
},{"./svgVariables.js":"js/svgVariables.js","./cardCounter.js":"js/cardCounter.js","./clampCardBody.js":"js/clampCardBody.js"}],"js/deleteCards.js":[function(require,module,exports) {
'use strict';

var _cardCounter = require("./cardCounter.js");

var clearBtn = document.body.querySelector('.board__to-do-clear-btn');
var counterBlock = document.body.querySelector('.board__to-do-counter');
var cards = document.body.querySelector('.board__to-do-cards-container');
clearBtn.addEventListener('click', function () {
  if (cards) {
    cards.innerHTML = '';
    (0, _cardCounter.countCards)(cards, counterBlock);
  }
});
cards.addEventListener('click', function (event) {
  if (event.target.classList.contains('board__card-remove-btn') || event.target.closest('.board__card-remove-btn')) {
    var card = event.target.closest('.board__card');
    card.remove();
    (0, _cardCounter.countCards)(cards, counterBlock); // recount the amount of cards to display on the counter
  }
});
clearBtn.addEventListener('mouseover', function () {
  return clearBtn.innerHTML = 'X';
}); // shows X while mouse is on the button

clearBtn.addEventListener('mouseout', function () {
  return (0, _cardCounter.countCards)(cards, counterBlock);
}); // turns back to showing the actual number of cards
},{"./cardCounter.js":"js/cardCounter.js"}],"js/main.js":[function(require,module,exports) {
'use strict';

require("./clamp.js");

require("./addCard.js");

require("./cardCounter.js");

require("./clampCardBody.js");

require("./deleteCards.js");
},{"./clamp.js":"js/clamp.js","./addCard.js":"js/addCard.js","./cardCounter.js":"js/cardCounter.js","./clampCardBody.js":"js/clampCardBody.js","./deleteCards.js":"js/deleteCards.js"}]