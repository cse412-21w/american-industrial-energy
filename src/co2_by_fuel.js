import co2ByFuelData from '../static/co2_by_fuel.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var co2ByFuelArray = [];   // used to store data later

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
d3.csv(co2ByFuelData).then(function(data) {
  data.forEach(function(d){
    co2ByFuelArray.push(d);
  })
  drawBarVegaLite();
});


function drawBarVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
  // your visualization goes here
  vl.markBar({filled:true, color:'black'})
  .data(co2ByFuelArray)
  .encode(
      vl.x().fieldN('Fuel').sort('none'),
      vl.y().fieldQ('CO2'),
      vl.color().fieldQ('CO2').scale({scheme: 'greys'}),
      vl.tooltip('Tooltip'),
  )
  .width(700)
  .height(300)
  .render()
  .then(viewElement => {
    // render returns a promise to a DOM element containing the chart
    // viewElement.value contains the Vega View object instance
    document.getElementById('co2_by_fuel').appendChild(viewElement);
  });
}
  
