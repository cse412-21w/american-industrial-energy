import oldCO2ConcData from '../static/old_co2_conc.csv'    // import dataset
import newCO2ConcData from '../static/new_co2_conc.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var old2ConcArray = [];   // used to store data later
var new2ConcArray = [];   // used to store data later

const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    //   loader: vega.loader({
    //     baseURL: "",
    //   }),
    renderer: "canvas",
  },
};

vl.register(vega, vegaLite, options);

// Again, We use d3.csv() to process data
d3.csv(newCO2ConcData).then(function(data) {
  data.forEach(function(d){
    newCO2ConcArray.push(d);
  })
});

d3.csv(oldCO2ConcData).then(function(data) {
  data.forEach(function(d){
    oldCO2ConcArray.push(d);
  })
  drawLineVegaLite();
});


function drawLineVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markLine()
  .data(co2ConcArray)
  .encode(
      vl.x().fieldT('Year'),
      vl.y().fieldQ('CO2 (ppm)'),
      vl.color().fieldN('Emissions path'),
      vl.tooltip('Emissions path')
  )
  .width(450)
  .height(450)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('co2_conc').appendChild(viewElement);
  });
}
  
