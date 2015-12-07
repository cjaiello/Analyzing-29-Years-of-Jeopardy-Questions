// By Christina Aiello

// Function to build a wordcloud for rows in the data set
// @data: The data from the csv
// @year: The specific year of data you're looking at
// (Only used when clicking from Calendar vis)
function buildWordCloudVis(data, year){
  // Remove old word cloud:
  d3.select(".wordCloud").remove();
  // Remove its old label too:
  d3.select(".wordCloudLabel").remove();

  // Hide loading image
  showLoadingImage(false);

  // If we need to filter by year:
  // (Only when clicking from Calendar vis)
  if(!isNaN(year)){
    data = getQuestionsFromCorrectYear(data, year);
  }
  // Now, count the number of times every word appears:
  var returnedArray = createWordCountsForWordCloud(data);
  // Map with every word and every count for that word:
  var wordMap = returnedArray;
  // List of words:
  var wordMapList = Object.keys(wordMap);
  

  // Colors to choose from for the words
  var color = d3.scale.linear()
          .domain([0,1,2,3,4,5,6,7, 8, 9, 10, 11, 12])
          .range(["#fa2d74", "#1e63e9", "#008547", "#785e94", "#3b0576", "#58011c", "#458b00", "#e93f1e", "#002849", "#16d79c", "#ff8d00", "#0000ff"]);


  // Actually building the word cloud
  d3.layout.cloud().size([1200, 600])
      .words(wordMapList.map(function(d) {
        // wordMap[d] gets the count for each 'd', so each word.
        // I'm adding 15 so we don't have a font size of 1.
        return {text: d, size: wordMap[d] + 15};
      }))
      .rotate(function() { return (~~(Math.random() * 6) - 3) * 30; })
      .fontSize(function(d) { return d.size; })
      .on("end", draw)
      .start();
    
    function draw(words) {
      d3.select("#locationOfWordCloud").append("svg")
              .attr("width", 1200)
              .attr("height", 600)
              .style("margin-top", "25px")
              .attr("class", "wordCloud")
              .style("background-color", "#ffffff")
              .append("g")
              .attr("transform", "translate(600,300)")
              .selectAll("text")
              .data(words)
              .enter().append("text")
              .style("font-size", function(d) { return d.size + "px"; })
              .style("fill", function(d, i) { 
                return color(Math.random() * 12); })
              .style("font-family", "\"Century Gothic\",CenturyGothic,AppleGothic,sans-serif")
              .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .text(function(d) { return d.text; })
              .append("svg:title")
              .text(function(d) { 
                // Added 15 previously, so subtract that to get the true number
                return ((d.size - 15) > 1) ? (d.size - 15 + " occurrences of " + d.text) : ("1 occurrence of " + d.text); 
              });
      } 
  // Lastly, label the word
  d3.select("#locationOfWordCloudLabel").append("text")
      .attr("class", "wordCloudLabel")
      .attr("x", 300)
      .attr("y", 300)
      .style("font-size","25px")
      .style("font-weight","bold")
      .attr("fill", "black")
      .text(createWordCloudLabel(data[0], year));

}

// This function is used to create the label for the word cloud vis
function createWordCloudLabel(dataPoint, year){
  if(!isNaN(year)){
    if(dataPoint.Value == "None") {
      return ("Questions from " + dataPoint.Round + " Round in the Year " + year + " With a Value of " + dataPoint.Value);
    } else {
      return ("Questions from " + dataPoint.Round + " Round in the Year " + year + " With a Value of $" + dataPoint.Value);
    }
  } else if (year == "Value") {
    if(dataPoint.Value == "None") {
      return ("Questions from " + dataPoint.Round + " With a Value of " + dataPoint.Value);
    } else {
      return ("Questions from " + dataPoint.Round + " With a Value of $" + dataPoint.Value);
    }
  } else {
    return ("Questions from " + dataPoint.Round);
  }
}
