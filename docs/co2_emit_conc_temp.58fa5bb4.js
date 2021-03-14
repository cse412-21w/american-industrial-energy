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
})({"GXD6":[function(require,module,exports) {
module.exports = "https://cse412-21w.github.io/american-industrial-energy/co2_emit_conc_temp.872d1a29.csv";
},{}],"eBXs":[function(require,module,exports) {
"use strict";

var _co2_emit_conc_temp = _interopRequireDefault(require("../static/co2_emit_conc_temp.csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import dataset
"use strict"; // the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables


var co2TempArray = []; // used to store data later

var options = {
  config: {// Vega-Lite default configuration
  },
  init: function init(view) {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    //   loader: vega.loader({
    //     baseURL: "",
    //   }),
    renderer: "canvas"
  }
};
vl.register(vega, vegaLite, options); // Again, We use d3.csv() to process data

d3.csv(_co2_emit_conc_temp.default).then(function (data) {
  data.forEach(function (d) {
    co2TempArray.push(d);
  });
  drawLinesVegaLite();
});

function drawLinesVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  var co2vars = vl.markLine({
    strokeWidth: 3
  }).encode(vl.x().fieldT('Year'), vl.y().fieldQ(vl.repeat('column')), vl.color().fieldN('Emissions path').sort('none'), vl.tooltip('Emissions path')).width(300).height(300).repeat({
    column: ['CO2 emissions (Pg/yr)', 'CO2 concentrations (ppm)']
  });
  var tempvar = vl.layer(vl.markLine({
    strokeWidth: 3
  }).encode(vl.x().fieldT('Year'), vl.y().fieldQ(vl.repeat('column')), vl.color().fieldN('Emissions path').sort('none'), vl.tooltip('Emissions path')), vl.markRule({
    stroke: 'red'
  }).data([{
    'Temperature': 2.0
  }]).encode(vl.y().fieldQ('Temperature')), vl.markText({
    align: 'center',
    dx: 0,
    dy: -10,
    fontSize: 14,
    color: "firebrick"
  }).data([0]).encode(vl.text().datum("Paris Agreement limit: 2˚C"))).width(300).height(300).repeat({
    column: ['Temperature']
  });
  vl.data(co2TempArray).hconcat(co2vars, tempvar).render().then(function (viewElement) {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('co2_temp').appendChild(viewElement);
  });
}
},{"../static/co2_emit_conc_temp.csv":"GXD6"}]},{},["eBXs"], null)
//# sourceMappingURL=https://cse412-21w.github.io/american-industrial-energy/co2_emit_conc_temp.58fa5bb4.js.map