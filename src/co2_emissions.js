import co2EmissionsData from '../static/full_co2_emit_3col.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var co2EmissionsArray = [];   // used to store data later

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
d3.csv(co2EmissionsData).then(function(data) {
  data.forEach(function(d){
    co2EmissionsArray.push(d);
  })
  drawLinesVegaLite();
});


function drawLinesVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markLine()
  .data(co2EmissionsArray)
  .encode(
      vl.x().fieldT('Year'),
      vl.y().fieldQ('CO2 (Pg/yr)'),
      vl.color().fieldN('Emissions path'),
      vl.tooltip('Emissions path'),
  )
  .width(450)
  .height(450)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('co2_emissions').appendChild(viewElement);
  });
}
  
