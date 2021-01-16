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
},{}],"js/variables.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.variables = void 0;
var removeIcon = "<svg class=\"board__card-remove-btn-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 414.298 414.299\">\n        <defs/>\n        <path d=\"M3.663 410.637c2.441 2.44 5.64 3.661 8.839 3.661 3.199 0 6.398-1.221 8.839-3.661l185.809-185.81 185.81 185.811c2.44 2.44 5.641 3.661 8.84 3.661 3.198 0 6.397-1.221 8.839-3.661 4.881-4.881 4.881-12.796 0-17.679l-185.811-185.81 185.811-185.81c4.881-4.882 4.881-12.796 0-17.678-4.882-4.882-12.796-4.882-17.679 0l-185.81 185.81L21.34 3.663c-4.882-4.882-12.796-4.882-17.678 0-4.882 4.881-4.882 12.796 0 17.678l185.81 185.809L3.663 392.959c-4.882 4.882-4.882 12.797 0 17.678z\"/>\n    </svg>";
var moveIcon = "<svg class=\"board__card-move-btn-icon\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512.002 512.002\">\n          <defs/>\n          <path d=\"M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061 3.883 3.89 8.97 5.835 14.057 5.835 5.074 0 10.141-1.932 14.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z\"/>\n      </svg>";
var moveToFirstColumnIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\">\n              <defs/>\n              <path d=\"M408.973 142.689c-40.86-40.86-95.188-63.363-152.973-63.363h-31.717l50.907-51.032L246.826 0 147.68 99.389l97.852 99.488 28.563-28.093-50.551-51.396H256c97.198 0 176.275 79.076 176.275 176.275S353.198 471.938 256 471.938 79.725 392.861 79.725 295.659v-20.031l-40.062.004v20.031c0 57.786 22.503 112.113 63.364 152.973C143.887 489.497 198.215 512 256 512c57.785 0 112.113-22.503 152.973-63.364 40.861-40.861 63.364-95.188 63.364-152.973s-22.503-112.113-63.364-152.974z\"/>\n        </svg>";
var variables = {
  editModal: document.body.querySelector('#edit-card-modal'),
  titleInputEM: document.body.querySelector('#edit-card-modal .modal__title--input'),
  descriptionInputEM: document.body.querySelector('#edit-card-modal .modal__description--input'),
  titleEM: document.body.querySelector('#title'),
  descriptionEM: document.body.querySelector('#description'),
  saveTitleBtn: document.body.querySelector('.modal__save-title-btn'),
  discardTitleBtn: document.body.querySelector('.modal__discard-title-btn'),
  saveDescriptionBtn: document.body.querySelector('.modal__description-save-btn'),
  discardDescriptionBtn: document.body.querySelector('.modal__description-discard-btn'),
  removeIcon: removeIcon,
  moveIcon: moveIcon,
  moveToFirstColumnIcon: moveToFirstColumnIcon,
  getCard: function getCard(cardObject) {
    var isLastColumn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (isLastColumn) {
      return "<div class=\"board__card\" data-card=\"card\" data-card_id=".concat(cardObject.id, ">\n                    <h3 class=\"board__card-title\">").concat(cardObject.title, "</h3>\n                    <p class=\"board__card-copy\">").concat(cardObject.description, "</p>\n                    <div class=\"board__card-footer\">\n                        <p class=\"board__card-date\">").concat(cardObject.date, "</p>\n                        <button class=\"board__card-move-btn\">").concat(this.moveToFirstColumnIcon, "</button>\n                        <button class=\"board__card-remove-btn\">").concat(this.removeIcon, "</button>\n                    </div>\n                </div>");
    }

    return "<div class=\"board__card\" data-card=\"card\" data-card_id=".concat(cardObject.id, ">\n                    <h3 class=\"board__card-title\">").concat(cardObject.title, "</h3>\n                    <p class=\"board__card-copy\">").concat(cardObject.description, "</p>\n                    <div class=\"board__card-footer\">\n                        <p class=\"board__card-date\">").concat(cardObject.date, "</p>\n                        <button class=\"board__card-move-btn\">").concat(this.moveIcon, "</button>\n                        <button class=\"board__card-remove-btn\">").concat(this.removeIcon, "</button>\n                    </div>\n                </div>");
  }
};
exports.variables = variables;
},{}],"js/methods.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Methods = void 0;

var _variables = require("./variables.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Methods = /*#__PURE__*/function () {
  function Methods() {
    _classCallCheck(this, Methods);

    _defineProperty(this, "getCards", function (column) {
      return document.body.querySelector("div[data-column=".concat(column, "]")).querySelectorAll('.board__card');
    });

    _defineProperty(this, "generateID", function () {
      return "c_".concat(Date.now());
    });

    _defineProperty(this, "showErrorMessage", function () {
      for (var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++) {
        inputs[_key] = arguments[_key];
      }

      return inputs.forEach(function (input) {
        var modal = input.parentElement,
            inputType = input.dataset.input_type,
            errorMessage = modal.querySelector("span[data-input_type=\"".concat(inputType, "\"]"));
        errorMessage.classList.add('active');
      });
    });

    _defineProperty(this, "hideErrorMessage", function () {
      for (var _len2 = arguments.length, inputs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        inputs[_key2] = arguments[_key2];
      }

      return inputs.forEach(function (input) {
        var modal = input.parentElement,
            inputType = input.dataset.input_type,
            errorMessage = modal.querySelector("span[data-input_type=\"".concat(inputType, "\"]"));
        errorMessage.classList.remove('active');
      });
    });
  }

  _createClass(Methods, [{
    key: "toggle",
    value: function toggle() {
      for (var _len3 = arguments.length, el = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        el[_key3] = arguments[_key3];
      }

      el.forEach(function (el) {
        el.classList.toggle('active');
      });
    }
  }, {
    key: "countCards",
    value: function countCards() {
      var columns = document.body.querySelectorAll('.board__cards-container[data-column]');

      for (var i = 0; i < columns.length; i++) {
        var cardNumber = void 0,
            cards = this.getCards(columns[i].dataset.column),
            counter = document.body.querySelector("div[data-counter=\"".concat(columns[i].dataset.column, "\"]"));
        cards ? cardNumber = cards.length : cardNumber = 0;
        counter.innerHTML = cardNumber;
      }
    }
  }, {
    key: "deleteCard",
    value: function deleteCard(card) {
      var column = event.target.closest('div[data-column]').dataset.column;
      this.removeFromLocalStorage(column, card.dataset.card_id);
      card.remove();
      this.countCards();
    }
  }, {
    key: "deleteAllCards",
    value: function deleteAllCards(column) {
      var cards = this.getCards(column);

      for (var i = 0; i < cards.length; i++) {
        this.removeFromLocalStorage(column, cards[i].dataset.card_id);
      }

      var cardContainer = document.body.querySelector("div[data-column=".concat(column, "]"));
      cardContainer.innerHTML = '';
      this.countCards();
    }
  }, {
    key: "clampText",
    value: function clampText() {
      var cardBodies = document.body.querySelectorAll('.board__card-copy');

      for (var i = 0; i < cardBodies.length; i++) {
        $clamp(cardBodies[i], {
          clamp: 2
        });
      }
    }
  }, {
    key: "clearInput",
    value: function clearInput(modal) {
      if (modal) {
        // else browser will throw an error cause it is unable to run qs on null
        var inputs = [modal.querySelector('textarea[data-input_type="description"]'), modal.querySelector('input[data-input_type="title"]')];
        inputs.forEach(function (input) {
          return input.value = '';
        });
      }
    }
  }, {
    key: "getDate",
    value: function getDate() {
      return new Date(Date.now()).toLocaleDateString();
    }
  }, {
    key: "putInLocalStorage",
    value: function putInLocalStorage(cardObject, column) {
      var storage = JSON.parse(localStorage.getItem(column));
      storage.push(cardObject);
      localStorage.setItem(column, JSON.stringify(storage));
    }
  }, {
    key: "updateLocalStorage",
    value: function updateLocalStorage(column, id, fieldToUpdate, value) {
      var storage = JSON.parse(localStorage.getItem(column));
      var card = storage.find(function (card) {
        return card.id === id;
      });
      card["".concat(fieldToUpdate)] = value;
      storage.splice(storage.indexOf(card), 1, card);
      localStorage.setItem(column, JSON.stringify(storage));
    }
  }, {
    key: "removeFromLocalStorage",
    value: function removeFromLocalStorage(column, id) {
      var storage = JSON.parse(localStorage.getItem(column));
      storage.forEach(function (card) {
        if (card.id === id) {
          storage.splice(storage.indexOf(card), 1);
        }
      });
      localStorage.setItem(column, JSON.stringify(storage));
    }
  }, {
    key: "getCardFromLocalStorage",
    value: function getCardFromLocalStorage(column, id) {
      var storage = JSON.parse(localStorage.getItem(column));
      return storage.find(function (card) {
        return card.id === id;
      });
    }
  }, {
    key: "checkIfEmpty",
    value: function checkIfEmpty() {
      var _this = this;

      var isEmpty = false;

      for (var _len4 = arguments.length, inputs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        inputs[_key4] = arguments[_key4];
      }

      inputs.forEach(function (input) {
        if (!input.value) {
          _this.showErrorMessage(input);

          return isEmpty = true;
        }
      });
      return isEmpty;
    }
  }, {
    key: "toggleEdit",
    value: function toggleEdit() {
      var _this2 = this;

      for (var _len5 = arguments.length, inputs = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        inputs[_key5] = arguments[_key5];
      }

      inputs.forEach(function (input) {
        if (input === 'title') {
          _this2.toggle(_variables.variables.titleEM, _variables.variables.titleInputEM, _variables.variables.saveTitleBtn, _variables.variables.discardTitleBtn);

          _variables.variables.titleInputEM.focus();
        } else if (input === 'description') {
          _this2.toggle(_variables.variables.descriptionEM, _variables.variables.descriptionInputEM, _variables.variables.saveDescriptionBtn, _variables.variables.discardDescriptionBtn);

          _variables.variables.descriptionInputEM.focus();
        }
      });
    }
  }]);

  return Methods;
}(); // TODO:
//  - unify show/hide error message methods


exports.Methods = Methods;
},{"./variables.js":"js/variables.js"}],"js/addCard.js":[function(require,module,exports) {
'use strict'; // Variables

var _variables = require("./variables.js");

var _methods = require("./methods.js");

var toDoColumn = document.body.querySelector('div[data-column="toDo"]'),
    modal = document.body.querySelector('#add-card-modal'),
    saveBtn = modal.querySelector('.modal__save-btn'),
    titleInput = modal.querySelector('#add-card-modal input[data-input_type="title"]'),
    descriptionInput = modal.querySelector('#add-card-modal textarea[data-input_type="description"]'); // Methods

var methods = new _methods.Methods(); // Card creation functionality

saveBtn.addEventListener('click', function (event) {
  if (methods.checkIfEmpty(titleInput, descriptionInput)) {
    return;
  } else {
    var cardObject = {
      id: methods.generateID(),
      title: titleInput.value,
      description: descriptionInput.value,
      date: methods.getDate()
    };
    methods.putInLocalStorage(cardObject, 'toDo');
    toDoColumn.innerHTML += _variables.variables.getCard(cardObject);
    setTimeout(function () {
      return methods.clearInput(modal);
    }, 500);
    methods.countCards();
    methods.clampText();
    methods.toggle(modal);
  }
});
},{"./variables.js":"js/variables.js","./methods.js":"js/methods.js"}],"js/editCard.js":[function(require,module,exports) {
'use strict';

var _methods = require("./methods.js");

var _variables = require("./variables.js");

var methods = new _methods.Methods();
var columns = document.body.querySelectorAll('.board__column');
var lastColumn = columns[columns.length - 1].dataset.column;
var currentTitleValue, currentDescriptionValue;

_variables.variables.editModal.addEventListener('click', function (event) {
  var cardId = _variables.variables.editModal.dataset.edit_card_id,
      card = document.body.querySelector("div[data-card_id=\"".concat(cardId, "\"]")),
      column = card.closest('div[data-column]').dataset.column,
      cardTitleUI = card.querySelector('.board__card-title'),
      cardDescriptionUI = card.querySelector('.board__card-copy');

  if (event.target.classList.contains('modal__save-title-btn') || event.target.closest('.modal__save-title-btn')) {
    if (!methods.checkIfEmpty(_variables.variables.titleInputEM)) {
      _variables.variables.titleEM.innerHTML = _variables.variables.titleInputEM.value;
      methods.updateLocalStorage(column, cardId, 'title', _variables.variables.titleInputEM.value);
      cardTitleUI.innerHTML = _variables.variables.titleInputEM.value;
      methods.toggleEdit('title');
    }
  }

  if (event.target.classList.contains('modal__discard-title-btn') || event.target.closest('.modal__discard-title-btn')) {
    _variables.variables.titleEM.innerHTML = currentTitleValue;
    methods.toggleEdit('title');
  }

  if (event.target.classList.contains('modal__description-save-btn') || event.target.closest('.modal__description-save-btn')) {
    if (!methods.checkIfEmpty(_variables.variables.descriptionInputEM)) {
      _variables.variables.descriptionEM.innerHTML = _variables.variables.descriptionInputEM.value;
      methods.updateLocalStorage(column, cardId, 'description', _variables.variables.descriptionInputEM.value);
      cardDescriptionUI.innerHTML = _variables.variables.descriptionInputEM.value;
      methods.toggleEdit('description');
    }
  }

  if (event.target.classList.contains('modal__description-discard-btn') || event.target.closest('.modal__description-discard-btn')) {
    _variables.variables.descriptionEM.innerHTML = currentDescriptionValue;
    methods.toggleEdit('description');
  }
});

_variables.variables.editModal.addEventListener('dblclick', function (event) {
  var cardId = _variables.variables.editModal.dataset.edit_card_id,
      card = document.body.querySelector("div[data-card_id=\"".concat(cardId, "\"]")),
      column = card.closest('div[data-column]').dataset.column;

  if (column === lastColumn) {
    return;
  }

  if (event.target.classList.contains('modal__title--activate-input') && !_variables.variables.descriptionInputEM.classList.contains('active')) {
    methods.toggleEdit('title');
    currentTitleValue = _variables.variables.titleEM.innerHTML;
    _variables.variables.titleInputEM.value = currentTitleValue;
  } else if (event.target.classList.contains('modal__description--activate-input') && !_variables.variables.titleInputEM.classList.contains('active')) {
    methods.toggleEdit('description');
    currentDescriptionValue = _variables.variables.descriptionEM.innerHTML;
    _variables.variables.descriptionInputEM.value = currentDescriptionValue;
  }
});
},{"./methods.js":"js/methods.js","./variables.js":"js/variables.js"}],"js/deleteCards.js":[function(require,module,exports) {
'use strict';

var _methods = require("./methods.js");

var methods = new _methods.Methods();
var clearBtns = document.body.querySelectorAll('.board__header-clear-btn svg');
var cards = document.body.querySelectorAll('div[data-column]');

for (var i = 0; i < clearBtns.length; i++) {
  clearBtns[i].addEventListener('click', function (event) {
    var column = event.target.closest('button[data-column]').dataset.column;
    methods.deleteAllCards(column);
  });
}

for (var _i = 0; _i < cards.length; _i++) {
  cards[_i].addEventListener('click', function (event) {
    if (event.target.closest('.board__card-remove-btn')) {
      var card = event.target.closest('.board__card');
      methods.deleteCard(card);
    }
  });
}
},{"./methods.js":"js/methods.js"}],"js/pageLoad.js":[function(require,module,exports) {
'use strict';

var _variables = require("./variables.js");

var _methods = require("./methods.js");

var methods = new _methods.Methods();
window.addEventListener('load', function () {
  // creates local storage structure on first page load or after LS was cleared
  // then it renders the cards if there are any
  if (!localStorage.getItem('toDo')) {
    localStorage.setItem('toDo', JSON.stringify([]));
  } else {
    var toDoStorage = JSON.parse(localStorage.getItem('toDo'));
    toDoStorage.forEach(function (cardObject) {
      document.querySelector('div[data-column="toDo"]').innerHTML += _variables.variables.getCard(cardObject);
    });
  }

  if (!localStorage.getItem('inProgress')) {
    localStorage.setItem('inProgress', JSON.stringify([]));
  } else {
    var inProgress = JSON.parse(localStorage.getItem('inProgress'));
    inProgress.forEach(function (cardObject) {
      document.querySelector('div[data-column="inProgress"]').innerHTML += _variables.variables.getCard(cardObject);
    });
  }

  if (!localStorage.getItem('done')) {
    localStorage.setItem('done', JSON.stringify([]));
  } else {
    var doneStorage = JSON.parse(localStorage.getItem('done'));
    doneStorage.forEach(function (cardObject) {
      document.querySelector('div[data-column="done"]').innerHTML += _variables.variables.getCard(cardObject, true);
    });
  }

  methods.countCards();
  methods.clampText();
});
},{"./variables.js":"js/variables.js","./methods.js":"js/methods.js"}],"js/keyUpHideError.js":[function(require,module,exports) {
'use strict';

var _methods = require("./methods.js");

var modalWindows = document.body.querySelectorAll('.modal');
var methods = new _methods.Methods();

for (var i = 0; i < modalWindows.length; i++) {
  modalWindows[i].addEventListener('keyup', function (event) {
    // removes error message when user starts to type into the input
    if (event.target.classList.contains('modal__title--input') || event.target.classList.contains('modal__description--input')) {
      methods.hideErrorMessage(event.target);
    }
  });
}
},{"./methods.js":"js/methods.js"}],"js/modalDisplay.js":[function(require,module,exports) {
'use strict';

var _variables = require("./variables.js");

var _methods = require("./methods.js");

var methods = new _methods.Methods();
var editCardModal = document.body.querySelector('#edit-card-modal'),
    addCardModal = document.body.querySelector('#add-card-modal'),
    modalWindows = document.body.querySelectorAll('.modal'),
    cardsContainers = document.body.querySelectorAll('.board__cards-container'),
    addCardBtn = document.body.querySelector('.board__add-new-btn'),
    columns = document.body.querySelectorAll('.board__column'),
    lastColumn = columns[columns.length - 1].dataset.column,
    tip = document.body.querySelector('.modal__header-tip-copy'); // Open modal window

addCardBtn.addEventListener('click', function () {
  return methods.toggle(addCardModal);
});

for (var i = 0; i < cardsContainers.length; i++) {
  cardsContainers[i].addEventListener('click', function (event) {
    var column = event.target.closest('div[data-column]').dataset.column;

    if (event.target.classList.contains('board__card-remove-btn') || event.target.closest('.board__card-remove-btn') || event.target.classList.contains('board__card-move-btn') || event.target.closest('.board__card-move-btn')) {
      return;
    } else if (event.target.classList.contains('.board__card') || event.target.closest('.board__card')) {
      if (column === lastColumn) {
        _variables.variables.titleEM.classList.remove('modal__element-hover');

        _variables.variables.descriptionEM.classList.remove('modal__element-hover');

        tip.innerHTML = "you can't edit cards that are in done :(";
      } else if (column !== lastColumn && !_variables.variables.titleEM.classList.contains('modal__element-hover') || !_variables.variables.descriptionEM.classList.contains('modal__element-hover')) {
        _variables.variables.titleEM.classList.add('modal__element-hover');

        _variables.variables.descriptionEM.classList.add('modal__element-hover');

        tip.innerHTML = "you can edit cards by double clicking the text!";
      }

      var card = event.target.closest('.board__card'),
          cardId = card.dataset.card_id,
          cardObject = methods.getCardFromLocalStorage(column, cardId);
      _variables.variables.editModal.dataset.edit_card_id = card.dataset.card_id;
      _variables.variables.titleEM.innerHTML = cardObject.title;
      _variables.variables.descriptionEM.innerHTML = cardObject.description;
      methods.toggle(editCardModal);
    }
  });
} // Close modal window


var _loop = function _loop(_i) {
  var titleInput = modalWindows[_i].querySelector('input[data-input_type="title"]'),
      descriptionInput = modalWindows[_i].querySelector('textarea[data-input_type="description"]');

  modalWindows[_i].addEventListener('click', function (event) {
    if (event.target.classList.contains('modal__header-close-btn')) {
      methods.toggle(modalWindows[_i]);
      setTimeout(function () {
        if (modalWindows[_i].id === 'edit-card-modal') {
          if (modalWindows[_i].querySelector('.modal__title--input').classList.contains('active')) {
            methods.toggleEdit('title');
          } else if (modalWindows[_i].querySelector('.modal__description--input').classList.contains('active')) {
            methods.toggleEdit('description');
          }
        }

        methods.clearInput(modalWindows[_i]);
        methods.hideErrorMessage(titleInput, descriptionInput);
      }, 500); // timeout is needed so that all the things altering the DOM
      // weren't visible while the window fades away
    }
  });
};

for (var _i = 0; _i < modalWindows.length; _i++) {
  _loop(_i);
}
},{"./variables.js":"js/variables.js","./methods.js":"js/methods.js"}],"js/moveCard.js":[function(require,module,exports) {
'use strict';

var _variables = require("./variables.js");

var _methods = require("./methods.js");

var methods = new _methods.Methods();
var board = document.body.querySelector('.board__column-container'),
    columns = Array.from(document.body.querySelectorAll('.board__cards-container')),
    lastColumn = board.children[board.children.length - 1];
board.addEventListener('click', function (event) {
  if (event.target.classList.contains('.board__card-move-btn') || event.target.closest('.board__card-move-btn')) {
    var cardUI = event.target.closest('.board__card'),
        cardId = cardUI.dataset.card_id,
        columnString = cardUI.parentElement.dataset.column,
        card = methods.getCardFromLocalStorage(columnString, cardId);
    var nextColumn;

    for (var i = 0; i < columns.length; i++) {
      if (columnString === columns[i].dataset.column) {
        columns.indexOf(columns[i]) === columns.length - 1 ? nextColumn = columns[0] : nextColumn = columns[columns.indexOf(columns[i]) + 1];
      }
    }

    if (nextColumn.dataset.column === lastColumn.dataset.column) {
      nextColumn.innerHTML += _variables.variables.getCard(card, true);
    } else {
      nextColumn.innerHTML += _variables.variables.getCard(card);
    }

    methods.clampText();
    cardUI.remove();
    methods.putInLocalStorage(card, nextColumn.dataset.column);
    methods.removeFromLocalStorage(columnString, cardId);
    methods.countCards();
  }
});
},{"./variables.js":"js/variables.js","./methods.js":"js/methods.js"}],"js/slider.js":[function(require,module,exports) {
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    loop: false,
    margin: 20,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2
      },
      800: {
        items: 3
      }
    }
  });
});
$('.board__next').click(function () {
  $(".owl-carousel").trigger('next.owl.carousel');
});
$('.board__prev').click(function () {
  $(".owl-carousel").trigger('prev.owl.carousel');
});
},{}],"js/main.js":[function(require,module,exports) {
'use strict';

require("./clamp.js");

require("./addCard.js");

require("./editCard.js");

require("./deleteCards.js");

require("./pageLoad.js");

require("./keyUpHideError.js");

require("./modalDisplay.js");

require("./moveCard.js");

require("./slider.js");
},{"./clamp.js":"js/clamp.js","./addCard.js":"js/addCard.js","./editCard.js":"js/editCard.js","./deleteCards.js":"js/deleteCards.js","./pageLoad.js":"js/pageLoad.js","./keyUpHideError.js":"js/keyUpHideError.js","./modalDisplay.js":"js/modalDisplay.js","./moveCard.js":"js/moveCard.js","./slider.js":"js/slider.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52353" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map