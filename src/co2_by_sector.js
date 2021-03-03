import co2BySectorData from '../static/co2_by_sector.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var co2BySectorArray = [];   // used to store data later

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
d3.csv(co2BySectorData).then(function(data) {
  data.forEach(function(d){
    co2BySectorArray.push(d);
  })
  drawPieVegaLite();
});


function drawPieVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markArc()
  .data(co2BySectorArray)
  .encode(
      vl.theta().fieldQ('Contribution (%)').sort('none'),
      vl.color().fieldQ('Contribution (%)').sort('none'),
      vl.tooltip(['Sector','Contribution (%)']),
  )
  .width(300)
  .height(300)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('co2_by_sector').appendChild(viewElement);
  });
}
  
