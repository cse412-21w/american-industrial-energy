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
})({"jquery.onepage-scroll.js":[function(require,module,exports) {
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* ===========================================================
 * jquery-onepage-scroll.js v1.3.1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Create an Apple-like website that let user scroll
 * one page at a time
 *
 * Credit: Eike Send for the awesome swipe event
 * https://github.com/peachananr/onepage-scroll
 *
 * License: GPL v3
 *
 * ========================================================== */
!function ($) {
  var defaults = {
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: true,
    responsiveFallback: false,
    direction: 'vertical'
  };
  /*------------------------------------------------*/

  /*  Credit: Eike Send for the awesome swipe event */

  /*------------------------------------------------*/

  $.fn.swipeEvents = function () {
    return this.each(function () {
      var startX,
          startY,
          $this = $(this);
      $this.bind('touchstart', touchstart);

      function touchstart(event) {
        var touches = event.originalEvent.touches;

        if (touches && touches.length) {
          startX = touches[0].pageX;
          startY = touches[0].pageY;
          $this.bind('touchmove', touchmove);
        }
      }

      function touchmove(event) {
        var touches = event.originalEvent.touches;

        if (touches && touches.length) {
          var deltaX = startX - touches[0].pageX;
          var deltaY = startY - touches[0].pageY;

          if (deltaX >= 50) {
            $this.trigger("swipeLeft");
          }

          if (deltaX <= -50) {
            $this.trigger("swipeRight");
          }

          if (deltaY >= 50) {
            $this.trigger("swipeUp");
          }

          if (deltaY <= -50) {
            $this.trigger("swipeDown");
          }

          if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
            $this.unbind('touchmove', touchmove);
          }
        }
      }
    });
  };

  $.fn.onepage_scroll = function (options) {
    var settings = $.extend({}, defaults, options),
        el = $(this),
        sections = $(settings.sectionContainer);
    total = sections.length, status = "off", topPos = 0, leftPos = 0, lastAnimation = 0, quietPeriod = 500, paginationList = "";

    $.fn.transformPage = function (settings, pos, index) {
      if (typeof settings.beforeMove == 'function') settings.beforeMove(index); // Just a simple edit that makes use of modernizr to detect an IE8 browser and changes the transform method into
      // an top animate so IE8 users can also use this script.

      if ($('html').hasClass('ie8')) {
        if (settings.direction == 'horizontal') {
          var toppos = el.width() / 100 * pos;
          $(this).animate({
            left: toppos + 'px'
          }, settings.animationTime);
        } else {
          var toppos = el.height() / 100 * pos;
          $(this).animate({
            top: toppos + 'px'
          }, settings.animationTime);
        }
      } else {
        $(this).css({
          "-webkit-transform": settings.direction == 'horizontal' ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
          "-webkit-transition": "all " + settings.animationTime + "ms " + settings.easing,
          "-moz-transform": settings.direction == 'horizontal' ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
          "-moz-transition": "all " + settings.animationTime + "ms " + settings.easing,
          "-ms-transform": settings.direction == 'horizontal' ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
          "-ms-transition": "all " + settings.animationTime + "ms " + settings.easing,
          "transform": settings.direction == 'horizontal' ? "translate3d(" + pos + "%, 0, 0)" : "translate3d(0, " + pos + "%, 0)",
          "transition": "all " + settings.animationTime + "ms " + settings.easing
        });
      }

      $(this).one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function (e) {
        if (typeof settings.afterMove == 'function') settings.afterMove(index);
      });
    };

    $.fn.moveDown = function () {
      var el = $(this);
      index = $(settings.sectionContainer + ".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index + 1) + "']");

      if (next.length < 1) {
        if (settings.loop == true) {
          pos = 0;
          next = $(settings.sectionContainer + "[data-index='1']");
        } else {
          return;
        }
      } else {
        pos = index * 100 * -1;
      }

      if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
      current.removeClass("active");
      next.addClass("active");

      if (settings.pagination == true) {
        $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
      }

      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-" + next.data("index"));

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index + 1);
        history.pushState({}, document.title, href);
      }

      el.transformPage(settings, pos, next.data("index"));
    };

    $.fn.moveUp = function () {
      var el = $(this);
      index = $(settings.sectionContainer + ".active").data("index");
      current = $(settings.sectionContainer + "[data-index='" + index + "']");
      next = $(settings.sectionContainer + "[data-index='" + (index - 1) + "']");

      if (next.length < 1) {
        if (settings.loop == true) {
          pos = (total - 1) * 100 * -1;
          next = $(settings.sectionContainer + "[data-index='" + total + "']");
        } else {
          return;
        }
      } else {
        pos = (next.data("index") - 1) * 100 * -1;
      }

      if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
      current.removeClass("active");
      next.addClass("active");

      if (settings.pagination == true) {
        $(".onepage-pagination li a" + "[data-index='" + index + "']").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + next.data("index") + "']").addClass("active");
      }

      $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
      $("body").addClass("viewing-page-" + next.data("index"));

      if (history.replaceState && settings.updateURL == true) {
        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (index - 1);
        history.pushState({}, document.title, href);
      }

      el.transformPage(settings, pos, next.data("index"));
    };

    $.fn.moveTo = function (page_index) {
      current = $(settings.sectionContainer + ".active");
      next = $(settings.sectionContainer + "[data-index='" + page_index + "']");

      if (next.length > 0) {
        if (typeof settings.beforeMove == 'function') settings.beforeMove(next.data("index"));
        current.removeClass("active");
        next.addClass("active");
        $(".onepage-pagination li a" + ".active").removeClass("active");
        $(".onepage-pagination li a" + "[data-index='" + page_index + "']").addClass("active");
        $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
        $("body").addClass("viewing-page-" + next.data("index"));
        pos = (page_index - 1) * 100 * -1;

        if (history.replaceState && settings.updateURL == true) {
          var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (page_index - 1);
          history.pushState({}, document.title, href);
        }

        el.transformPage(settings, pos, page_index);
      }
    };

    function responsive() {
      //start modification
      var valForTest = false;

      var typeOfRF = _typeof(settings.responsiveFallback);

      if (typeOfRF == "number") {
        valForTest = $(window).width() < settings.responsiveFallback;
      }

      if (typeOfRF == "boolean") {
        valForTest = settings.responsiveFallback;
      }

      if (typeOfRF == "function") {
        valFunction = settings.responsiveFallback();
        valForTest = valFunction;
        typeOFv = _typeof(valForTest);

        if (typeOFv == "number") {
          valForTest = $(window).width() < valFunction;
        }
      } //end modification


      if (valForTest) {
        $("body").addClass("disabled-onepage-scroll");
        $(document).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        el.swipeEvents().unbind("swipeDown swipeUp");
      } else {
        if ($("body").hasClass("disabled-onepage-scroll")) {
          $("body").removeClass("disabled-onepage-scroll");
          $("html, body, .wrapper").animate({
            scrollTop: 0
          }, "fast");
        }

        el.swipeEvents().bind("swipeDown", function (event) {
          if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
          el.moveUp();
        }).bind("swipeUp", function (event) {
          if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
          el.moveDown();
        });
        $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
          event.preventDefault();
          var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
          init_scroll(event, delta);
        });
      }
    }

    function init_scroll(event, delta) {
      deltaOfInterest = delta;
      var timeNow = new Date().getTime(); // Cancel scroll if currently animating or within quiet period

      if (timeNow - lastAnimation < quietPeriod + settings.animationTime) {
        event.preventDefault();
        return;
      }

      if (deltaOfInterest < 0) {
        el.moveDown();
      } else {
        el.moveUp();
      }

      lastAnimation = timeNow;
    } // Prepare everything before binding wheel scroll


    el.addClass("onepage-wrapper").css("position", "relative");
    $.each(sections, function (i) {
      $(this).css({
        position: "absolute",
        top: topPos + "%"
      }).addClass("section").attr("data-index", i + 1);
      $(this).css({
        position: "absolute",
        left: settings.direction == 'horizontal' ? leftPos + "%" : 0,
        top: settings.direction == 'vertical' || settings.direction != 'horizontal' ? topPos + "%" : 0
      });
      if (settings.direction == 'horizontal') leftPos = leftPos + 100;else topPos = topPos + 100;

      if (settings.pagination == true) {
        paginationList += "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>";
      }
    });
    el.swipeEvents().bind("swipeDown", function (event) {
      if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveUp();
    }).bind("swipeUp", function (event) {
      if (!$("body").hasClass("disabled-onepage-scroll")) event.preventDefault();
      el.moveDown();
    }); // Create Pagination and Display Them

    if (settings.pagination == true) {
      if ($('ul.onepage-pagination').length < 1) $("<ul class='onepage-pagination'></ul>").prependTo("body");

      if (settings.direction == 'horizontal') {
        posLeft = el.find(".onepage-pagination").width() / 2 * -1;
        el.find(".onepage-pagination").css("margin-left", posLeft);
      } else {
        posTop = el.find(".onepage-pagination").height() / 2 * -1;
        el.find(".onepage-pagination").css("margin-top", posTop);
      }

      $('ul.onepage-pagination').html(paginationList);
    }

    if (window.location.hash != "" && window.location.hash != "#1") {
      init_index = window.location.hash.replace("#", "");

      if (parseInt(init_index) <= total && parseInt(init_index) > 0) {
        $(settings.sectionContainer + "[data-index='" + init_index + "']").addClass("active");
        $("body").addClass("viewing-page-" + init_index);
        if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");
        next = $(settings.sectionContainer + "[data-index='" + init_index + "']");

        if (next) {
          next.addClass("active");
          if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='" + init_index + "']").addClass("active");
          $("body")[0].className = $("body")[0].className.replace(/\bviewing-page-\d.*?\b/g, '');
          $("body").addClass("viewing-page-" + next.data("index"));

          if (history.replaceState && settings.updateURL == true) {
            var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + init_index;
            history.pushState({}, document.title, href);
          }
        }

        pos = (init_index - 1) * 100 * -1;
        el.transformPage(settings, pos, init_index);
      } else {
        $(settings.sectionContainer + "[data-index='1']").addClass("active");
        $("body").addClass("viewing-page-1");
        if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
      }
    } else {
      $(settings.sectionContainer + "[data-index='1']").addClass("active");
      $("body").addClass("viewing-page-1");
      if (settings.pagination == true) $(".onepage-pagination li a" + "[data-index='1']").addClass("active");
    }

    if (settings.pagination == true) {
      $(".onepage-pagination li a").click(function () {
        var page_index = $(this).data("index");
        el.moveTo(page_index);
      });
    }

    $(document).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function (event) {
      event.preventDefault();
      var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
      if (!$("body").hasClass("disabled-onepage-scroll")) init_scroll(event, delta);
    });

    if (settings.responsiveFallback != false) {
      $(window).resize(function () {
        responsive();
      });
      responsive();
    }

    if (settings.keyboard == true) {
      $(document).keydown(function (e) {
        var tag = e.target.tagName.toLowerCase();

        if (!$("body").hasClass("disabled-onepage-scroll")) {
          switch (e.which) {
            case 38:
              if (tag != 'input' && tag != 'textarea') el.moveUp();
              break;

            case 40:
              if (tag != 'input' && tag != 'textarea') el.moveDown();
              break;

            case 32:
              //spacebar
              if (tag != 'input' && tag != 'textarea') el.moveDown();
              break;

            case 33:
              //pageg up
              if (tag != 'input' && tag != 'textarea') el.moveUp();
              break;

            case 34:
              //page dwn
              if (tag != 'input' && tag != 'textarea') el.moveDown();
              break;

            case 36:
              //home
              el.moveTo(1);
              break;

            case 35:
              //end
              el.moveTo(total);
              break;

            default:
              return;
          }
        }
      });
    }

    return false;
  };
}(window.jQuery);
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63231" + '/');

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
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","jquery.onepage-scroll.js"], null)
//# sourceMappingURL=/jquery.onepage-scroll.da041b15.js.map