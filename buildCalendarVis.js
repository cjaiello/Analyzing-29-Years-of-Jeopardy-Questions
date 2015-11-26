function buildCalendarViewVis(data, translateXCoordinate, vizNumber, vizLabel){
  var width = 325,
  height = 45,
  cellSize = 5;

  var percent = d3.format(".1%"),
      format = d3.time.format("%m/%d/%Y");
      /* Note to preserve one's sanity later:
       * d3 expects dates in mm/dd/yyyy format according
       * to what's written above. If you have m/dd/yyyy
       * (so, for example, 8/23/2007), that piece of
       * data won't work in the d3 calendar view.
       * It specifically needs to be 08/23/2007, with two
       * digits for the month. */

  var color = d3.scale.quantize()
      .domain([1, 10])
      .range(d3.range(11).map(function(d) {
        return "q" + d + "-11"; }));

  d3.select(".calendarBox").append("div").attr("width", 300).style("padding-top", "10px").attr("height", 900).attr("class", "calendarBoxSVG");

  var svg = d3.select(".calendarBoxSVG").selectAll("svg")
      .data(d3.range(1984, 2013))
    .enter().append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "RdYlGn")
      .on("click", function(d, i) {
          // First remove old word cloud:
          d3.select(".wordCloud").remove();
          // Remove its old label too:
          d3.select(".wordCloudLabel").remove();
          buildWordCloudVis(data, d);
          // Turn blue to confirm it's loaded
          d3.select(this)
            .attr("fill", "#399DB1")
            .style("font-weight", "bold");
       })
      .on("mouseout", function(d, i) {
          d3.select(this)
            .attr("fill", "#000000")
            .style("font-weight", "normal");
       })
    .append("g")
      .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

  svg.append("text")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .style("text-anchor", "middle")
      .text(function(d) { return d; });

  var rect = svg.selectAll(".day")
      .data(function(d) { 
        return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("rect")
      .attr("class", "day")
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("x", function(d) { return d3.time.weekOfYear(d) * cellSize; })
      .attr("y", function(d) { return d.getDay() * cellSize; })
      .datum(format);

  rect.append("title")
      .text(function(d) { return d; });

  svg.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);

    var data = d3.nest()
      .key(function(d) {
        return d.Date; })/*
      .rollup(function(d) { 
        return d.length; })*/
      .map(data[0].values);

    rect.filter(function(d) {
      return d in data; })
        .attr("class", function(d) { return "day " + color(data[d].length); })
      .select("title")
        .text(function(d) { 
          return (data[d].length > 0) ? ((data[d].length > 1) ? (d + ": " + (data[d].length) + " questions") : d + ": " + (data[d].length) + " question") : (d); });


  function monthPath(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = t0.getDay(), w0 = d3.time.weekOfYear(t0),
        d1 = t1.getDay(), w1 = d3.time.weekOfYear(t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
  }

  d3.select(self.frameElement).style("height", "2910px");


  d3.select(".calendarBox")
      .append("svg")
      .attr("class", "calendarLabel")
      .attr("width", 675)
      .attr("height", 40).append("text")
      .attr("x", 275)
      .attr("y", height - 25)
      .style("font-size","15px")
      .style("font-weight","bold")
      .attr("fill", "black")
      .text(vizLabel);

}