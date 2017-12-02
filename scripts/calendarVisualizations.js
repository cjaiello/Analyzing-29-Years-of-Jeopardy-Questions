// By Christina Aiello

// Reference: User mbostock, November 13, 2012,
// http://bl.ocks.org/mbostock/4063318
function buildCalendarViewVisForWordComparisons(data, translateXCoordinate, vizNumber, vizLabel, word){
  console.log("buildCalendarViewVisForWordComparisons");

  // Hide loading image
  showLoadingImage(false);

  var width = 320,
  height = 42,
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
      .domain([1, 11])
      .range(d3.range(11).map(function(d) {
        return "q" + d + "-11"; }));

  var svg;
  var tip;

  if(vizNumber == 3){

  var tip = d3.tip()
    .attr('class', 'd3-tip-smaller')
    .offset([-10, 0])
    .html(function(d) {
            return makeToolTipText(data, d);
          });

    d3.select("#locationOfJustOneCalendar")
      .append("div")
      .attr("width", 650)
      .style("padding-bottom", "15px")
      .style("padding-top", "10px")
      .attr("height", 1300)
      .style("background-color", "#3b6c88")
      .attr("class", "locationOfJustOneCalendar-calendarBoxSVG");

    var svg = d3.select(".locationOfJustOneCalendar-calendarBoxSVG").selectAll("svg")
        .data(d3.range(1984, 2013))
      .enter().append("svg")
        .attr("fill", "#CFF09E")
        .style("padding-left", "5px")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "RdYlGn")
      .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    // If there's only one, always set it to be just above
    tip.direction('n');

  } else {

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
            return makeToolTipText(data, d);
          });

    d3.select(".calendarBoxWordComparisons" + vizNumber)
        .append("svg")
        .attr("class", "calendarLabel")
        .style("background-color", "#3b6c88")
        .attr("width", 650)
        .attr("height", 30).append("text")
        .attr("x", 110)
        .attr("y", height - 20)
        .style("font-size","18px")
        .style("font-weight","bold")
        .attr("fill", "#CFF09E")
        .text(vizLabel);

    d3.select(".calendarBoxWordComparisons" + vizNumber)
      .append("div")
      .attr("width", 650)
      .style("padding-bottom", "15px")
      .style("padding-top", "10px")
      .attr("height", 1300)
      .style("background-color", "#3b6c88")
      .attr("class", "calendarBoxSVG" + vizNumber);

    var svg = d3.select(".calendarBoxSVG" + vizNumber).selectAll("svg")
        .data(d3.range(1984, 2013))
      .enter().append("svg")
        .attr("fill", "#CFF09E")
        .style("padding-left", "5px")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "RdYlGn")
      .append("g")
        .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

    // Setting direction of the tooltip based on if it's the left
    // chart, right chard, or just one chart from one word search
    tip.direction(function(d) {
      console.log(d);
      return chooseToolTipDirection(d, word);
    });
  }

  svg.call(tip);

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

  // No longer needed since we have the tooltip
  /*rect.append("title")
      .text(function(d) { return d; })*/

  svg.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
    .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);

    rect.filter(function(d) {
      return d in data; })
        .attr("class", function(d) { return "day " + color(data[d].length); })
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

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

}

// Reference: User mbostock, November 13, 2012,
// http://bl.ocks.org/mbostock/4063318
function buildCalendarViewVis(data, translateXCoordinate, vizNumber, vizLabel){

  console.log(data);

  // Hide loading image
  showLoadingImage(false);

  var width = 320,
  height = 44,
  cellSize = 5.5;

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
      .domain([1, 11])
      .range(d3.range(11).map(function(d) {
        return "q" + d + "-11"; }));

  d3.select(".calendarBoxIndex").append("div").attr("width", 450).style("padding-top", "10px").attr("height", 1200)
      .style("background-color", "#ffffff").attr("class", "calendarBoxSVG");

  var svg = d3.select(".calendarBoxSVG").selectAll("svg")
      .data(d3.range(1984, 2013))
    .enter().append("svg")
      .attr("fill", "#ffffff")
      .style("padding-left", "5px")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "RdYlGn")
      .on("click", function(d, i) {
          showLoadingImage(true);
          setTimeout(function(){
            // First remove old word cloud:
            d3.select(".wordCloud").remove();
            // Remove its old label too:
            d3.select(".wordCloudLabel").remove();
            buildWordCloudVis(data, d);
          }, 10);
        })
    .append("g")
      .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

  var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      console.log(d);
      console.log(data[d]);
            return (data[d].length > 0) ? ((data[d].length > 1) ? ("<h3>" + d + ": " + (data[d].length) + " Questions</h3>" + createStringForAllQuestionsAndAnswersDrilldownCharts(data[d])) : (d + ": " + (data[d].length) + " question: " + createStringForAllQuestionsAndAnswersDrilldownCharts(data[d]))) : (d); });

  tip.direction('w');

  svg.call(tip);

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
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);

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


  d3.select(".calendarBoxIndex")
      .append("svg")
      .attr("class", "calendarLabel")
      .style("background-color", "#3b6c88")
      .attr("width", 650)
      .attr("height", 30).append("text")
      .attr("x", 275)
      .attr("y", height - 20)
      .style("font-size","15px")
      .style("font-weight","bold")
      .attr("fill", "white")
      .text(vizLabel);



}

// Constructs text for tool tip
function makeToolTipText(data, d){
  return (data[d].length > 0) ? ((data[d].length > 1) ? ("<h3>" + d + ": " + (data[d].length) + " Questions </h3>" + createStringForAllQuestionsAndAnswersComparisonCharts(data[d])) : ("<h3>" + d + ": " + (data[d].length) + " Question </h3>" + createStringForAllQuestionsAndAnswersComparisonCharts(data[d]))) : (d);
}

// Chooses where to place tool tip
function chooseToolTipDirection(date, word){
    // This will hold our final direction string
    var directionString = "";

    // Find the year of the tool tip for positioning:
    var dateRegex = new RegExp("^(0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/]([0-9]+)$");
    var matches = dateRegex.exec(date);
    var year = matches[3];

    // First, choose if the tooltip is north or south
    // based on the year of the data
    if(year > 1999){
      directionString += 'n';
    } else directionString += 's';

    // Getting the words searched for:
    var wordToSearchFor1 = document.getElementById('wordToSearchFor1').value;
    var wordToSearchFor2 = document.getElementById('wordToSearchFor2').value;
    // If we're the chart on the left, put it to the right:
    if(word == wordToSearchFor1){
      directionString += 'e';
    } else if(word == wordToSearchFor2){
      // We're the chart on the right, so put it to the left
      directionString += 'w';
    }

    return directionString;
}
