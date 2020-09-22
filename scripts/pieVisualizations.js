// Function will build a pie visualization for the data
/*function buildPieVis(data, translateXCoordinate, vizNumber, vizLabel) {
  var color = d3.scale.ordinal()
  .range(["#73a8d8", "#abe7e6" , "#509795", "#67afae", "#73d8d6", "#b2e7d6", "#d8f3ea" , "#8ccfdc", "#53b7ca", "#399db1", "#2c7a89", "#205762", "#8fc1cb", "#5f8187", "#64bfd0"]);

// Width, height, and radius for pie chart
var width = 550,
height = 800,
radius = Math.min(width, height) / 2;

var centerPlacement = width / 2;

// Outer and inner radii
var outerRadius = 195;
var innerRadius = 0;    

// Adding svg element to body, setting its width and height,
// and moving it to a certain location on the screen
var vis = d3.select("#locationOfSVGs")
      .append("svg")
      .attr("class", getVizName(vizNumber))
      .data([data])
      .attr("width", width)
      .attr("height", height)
      .append("svg:g") 
      .attr("transform", "translate(" + 300 + "," + 300 + ")");

// Setting inner and outer radii for each arc piece
var arc = d3.svg.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius);

// Selecting a pie chart
var pie = d3.layout.pie()
      .value(function(d) { return d.values.length; }); // Getting length of values array

/* Selects all slices in g, associates pie data, 
 * makes g elements for each item in the array,
 * creates groups to hold each slice,
 * and adds the class "slice" to each slice 
 * for styling purposes
 */ /*
 var arcs = vis.selectAll("g.slice") 
 .data(pie)
 .enter()
 .append("svg:g")
 .attr("class", "slice")
 .on("mouseover", function(d, i) {
    if(vizNumber == 1){
    // First, remove the old second and third charts
    d3.select("svg.secondChart")
    .remove();
    d3.select("svg.thirdChart")
      .remove();
      buildPieVis(aggregateByYear(data[i].values), 25, vizNumber + 1, "Year");
    } else if (vizNumber == 2) {
      d3.select("svg.thirdChart")
        .remove();
      buildPieVis(aggregateByValue(data[i].values), 25, vizNumber + 1, "Value");
    }
    d3.select(this)
      .attr("fill", "#399DB1");
   })
  .on("click", function(d, i) {
    if(vizNumber == 3){
      // First remove old word cloud:
      d3.select(".wordCloud").remove();
      // Remove its old label too:
      d3.select(".wordCloudLabel").remove();
      // Now make a new one:
      buildWordCloudVis(data[i], data[i].key);
      d3.select(this)
        .attr("fill", "#6dbd6f");
    }})
  .on("mouseout", function() {
    d3.select(this)
      .attr("fill", "#000000");
    });

    // Setting slice colors and creating SVG path
    arcs.append("svg:path")
    .attr("fill", function(d, i) { 
      return color(i); } )
    .attr("d", arc);

    // Labeling each slice and placing label
    arcs.append("svg:text")
      .attr("class", "labels")
      .attr("transform", function(d, i) {
        var c = arc.centroid(d),
        x = c[0],
        y = c[1],
        // pythagorean theorem for hypotenuse
        h = Math.sqrt(x*x + y*y);
        return "translate(" + (x/h * 200) +  ',' + (y/h * 200) + ")rotate(" + angle(d) + ")"})
      // Centering text on origin
      .style("font-size", "10.5px")
      .attr("text-anchor", function(d) {
        // are we past the center?
        return (d.endAngle + d.startAngle)/2 > Math.PI ? "end" : "start";})
      .text(function(d, i) { 
        console.log(getVizName(vizNumber));
        return data[i].key + ": " + data[i].values.length; 
      });

    var polyline = svg.select(".lines").selectAll("polyline")
      .data(pie(data), key);
    
    polyline.enter()
      .append("polyline");

    polyline.transition().duration(1000)
      .attrTween("points", function(d){
        this._current = this._current || d;
        var interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          var d2 = interpolate(t);
          var pos = outerArc.centroid(d2);
          pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
          return [arc.centroid(d2), outerArc.centroid(d2), pos];
        };      
      });
    
    polyline.exit()
      .remove();

    // Labeling each pie chart
    d3.select("." + getVizName(vizNumber)).append("text")
        .attr("x", 175 )
        .attr("y", 550)
        .attr("class", "pieLabel")
        .style("font-size","15px")
        .style("font-weight","bold")
        .attr("fill", "black")
        .text(vizLabel);
    }

// Computes the angle of an arc, converting from radians to degrees.
// Source: http://bl.ocks.org/Guerino1/2295263
// User Guerino1, posted on April 3, 2012
function angle(d) {
  var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
  return a > 90 ? a - 180 : a;
}*/
