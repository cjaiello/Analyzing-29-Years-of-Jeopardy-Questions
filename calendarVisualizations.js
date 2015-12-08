// By Christina Aiello

// Reference: User mbostock, November 13, 2012, 
// http://bl.ocks.org/mbostock/4063318
function buildCalendarViewVisForWordComparisons(data, translateXCoordinate, vizNumber, vizLabel){
  // Hide loading image
  showLoadingImage(false);
  /*var secondCalendarBox = document.getElementById("calendarBoxWordComparisons2");
  var secondWordToSearchFor = document.getElementById("wordToSearchFor2").innerHTML;
  var firstWordToSearchFor = document.getElementById("wordToSearchFor1").innerHTML;

  console.log(firstWordToSearchFor);
  console.log(secondWordToSearchFor);
  
  // Remove other calendar viz box if they only searched for one word
  if(firstWordToSearchFor.length>0 && secondWordToSearchFor.length>0){
    secondCalendarBox.style.display = "block";
  } else {
    secondCalendarBox.style.display = "none";
  }*/
  

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

    rect.filter(function(d) {
      return d in data; })
        .attr("class", function(d) { return "day " + color(data[d]); })
      .select("title")
        .text(function(d) { 
          return (data[d] > 0) ? ((data[d] > 1) ? (d + ": " + (data[d]) + " questions") : (d + ": " + (data[d]) + " question")) : data[d]; 
        });

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
      .style("background-color", "#3b6c88").attr("class", "calendarBoxSVG");

  var svg = d3.select(".calendarBoxSVG").selectAll("svg")
      .data(d3.range(1984, 2013))
    .enter().append("svg")
      .attr("fill", "#ffffff")
      .style("padding-left", "5px")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "RdYlGn")
      .on("click", function(d, i) {
            // First remove old word cloud:
            d3.select(".wordCloud").remove();
            // Remove its old label too:
            d3.select(".wordCloudLabel").remove();
            /*console.log(data[0]);
            // Now make a new one:
            console.log(data);
            console.log(d);
            console.log(data[d]);*/
            buildWordCloudVis(data, d);
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
          return (data[d].length > 0) ? ((data[d].length > 1) ? (d + ": " + (data[d].length) + " questions: " + createStringForAllQuestionsAndAnswers(data[d])) : (d + ": " + (data[d].length) + " question: " + createStringForAllQuestionsAndAnswers(data[d]))) : (d); });

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

// This function can be used to create a string for all questions
// and answers in an object
function createStringForAllQuestionsAndAnswers(object){
  var finalString = "\n";
  // For each data point in this object, which is a list of data points for this day
  for(counter = 0; counter < object.length; counter++){
    // Get the question and its answer
    finalString += "- " + object[counter].Question + " (" + object[counter].Answer + ")\n";
  }
  return finalString;
}