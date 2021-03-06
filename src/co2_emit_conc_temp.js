import co2TempData from '../static/co2_emit_conc_temp.csv'    // import dataset
"use strict";     // the code should be executed in "strict mode".
                  // With strict mode, you can not, for example, use undeclared variables

var co2TempArray = [];   // used to store data later

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
d3.csv(co2TempData).then(function(data) {
  data.forEach(function(d){
    co2TempArray.push(d);
  })
  drawLinesVegaLite();
});


function drawLinesVegaLite() {
  // var sunshine = add_data(vl, sunshine.csv, format_type = NULL);
    // your visualization goes here
    const co2vars = vl.markLine({strokeWidth:3})        
          .encode(
              vl.x().fieldT('Year'),
              vl.y().fieldQ(vl.repeat('column')),
              vl.color().fieldN('Emissions path').sort('none'),
              vl.tooltip('Emissions path'),
          )
          .width(300)
          .height(300)
          .repeat({
              column: ['CO2 emissions (Pg/yr)', 'CO2 concentrations (ppm)']
          })
    
    const tempvar = vl.layer(
        vl.markLine({strokeWidth:3})        
            .encode(
                vl.x().fieldT('Year'),
                vl.y().fieldQ(vl.repeat('column')),
                vl.color().fieldN('Emissions path').sort('none'),
                vl.tooltip('Emissions path'),
            ),
        vl.markRule({stroke:'red'})
            .data([{'Temperature':2.0}])
            .encode(
                vl.y().fieldQ('Temperature')
            ),
        vl.markText({
            align: 'center',
            dx: 0,
            dy: -10,
            fontSize: 14,
            color: "firebrick"
        })
            .data([0])
            .encode( vl.text().datum("Paris Agreement limit: 2˚C") )
    )
  .width(300)
  .height(300)
  .repeat({
      column: ['Temperature']
  })

    vl.data(co2TempArray)
        .hconcat(co2vars,tempvar)
        .render()
        .then(viewElement => {
            // render returns a promise to a DOM element containing the chart
            // viewElement.value contains the Vega View object instance
            document.getElementById('co2_temp').appendChild(viewElement);
        });
}
  
