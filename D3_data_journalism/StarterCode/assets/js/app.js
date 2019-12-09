
// @TODO: YOUR CODE HERE!
// SVG container
var svgHeight =450;
var svgWidth = 600;

//margins & width,height
var margin = {top: 10, left:60, bottom:80,right:30},

chartwidth = svgWidth - margin.left - margin.right,
chartheight = svgHeight - margin.top - margin.bottom;   

console.log("chartheight: " + chartheight + ", chartwidth: " + chartwidth);

// create svg container,adjust svg area & shift

var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", chartwidth + margin.left + margin.right)
    .attr("height", chartheight + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//load csv file

d3.csv("assets/data/data.csv", function(data) {
    console.log(data);

      data.forEach(function(d){
        d.smokes = +d.smokes
        d.age = +d.age;
        console.log("smokers", d.smokes);
        console.log("age", d.age);
    });
  
    x_extent = d3.extent(data, d => d.age);
    console.log("X value" + x_extent);
  min_x_value = x_extent[0] * 0.9 ;
  max_x_value = x_extent[1] * 1.1 ;
    console.log("min x value" + min_x_value);
    console.log("max x value" + max_x_value);

  // Add X axis
  var x = d3.scaleLinear()
    .domain([min_x_value, max_x_value])
    .range([ 0, chartwidth ]);
  svg.append("g")
    .attr("transform", "translate(0," + chartheight + ")")
    .call(d3.axisBottom(x));

  svg.append("text")  
    .attr("x", 260 )
    .attr("y", 390 )
    .style("text-anchor", "middle")
    .text("Age");
    
  // Add Y axis
  y_extent = d3.extent(data, d => d.smokes);
    console.log("Y value" + y_extent);
  min_y_value = y_extent[0] * 0.9 ;
  max_y_value = y_extent[1] * 1.1 ;
  console.log("min y value" + min_y_value);
  console.log("max y value" + max_y_value);

  var y = d3.scaleLinear()
    .domain([min_y_value, max_y_value])
    .range([ chartheight, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", 0 -(chartheight /2 ))
    .attr("y", 0 - margin.left )
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .text("Smokers");

  svg.selectAll(".dot")
    .data(data)
    .enter().append("circle")
    .attr("class", "dot")
    .attr("cx", function (d) { return x(d.age); } )
    .attr("cy", function (d) { return y(d.smokes); } )
    .attr("r", 15)
    .style("fill","pink");
  
  // Add dots
  var gdots =svg.selectAll("g.dot")
    .data(data)
    .enter().append('g');

  gdots.append("circle")
      .attr("class", "dot")
      .attr("cx", function (d) { return x(d.age); } )
      .attr("cy", function (d) { return y(d.smokes); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2");

  gdots.append("text").text(function(d){
    return d.abbr;
  })
  .attr("x", function (d) { return x(d.age)-8; } )
  .attr("y", function (d) { return y(d.smokes)+5; } )
  .attr("font-size", "11px" );

});



