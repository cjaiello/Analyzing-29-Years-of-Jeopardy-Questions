// Function to build a wordcloud for rows in the data set
// @data: The data from the csv
function buildWordCloudVis(data, year){
  console.log("Building word cloud");
  // Hide loading image
  showLoadingImage(false);

  var re = new RegExp("^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](" + year + "))$"), key;
  var arrayOfDataPointsFromCorrectYear = [];

  // The "data" object has all data from this round -> value, so
  // we need to separate it by year. Find all data points that have
  // a year that matches "year," the year we're currently hovering
  // over in the calendar chart.
  for (key in data){
    // If this key in the object has the correct year
    if (re.test(key)){
      // Add it to our list of objects (data points) from the
      // correct year
      arrayOfDataPointsFromCorrectYear.push(data[key][0])
    }
  }

  // If this year actually has data in it, let them click it:
  if(arrayOfDataPointsFromCorrectYear.length > 0){

    var wordMap = {}; // Key is word, value is number of times seen
    var wordMapList = []; // Just a list of all words (so, all keys)

    // These steps populate the above two variables
    for(var counter = 0; counter < arrayOfDataPointsFromCorrectYear.length; counter++){
      // Set 'question' equal to each data point's question
      var question = arrayOfDataPointsFromCorrectYear[counter].Question;
      // Set 'answer' equal to each data point's answer
      var answer = arrayOfDataPointsFromCorrectYear[counter].Answer;

      // Split each string into an array of words
      var listOfQuestionWords = question.split(" ");
      var listOfAnswerWords = answer.split(" ");
      // Create a list of all words from question and answer
      var listOfWords = listOfQuestionWords.concat(listOfAnswerWords);

      // For each word in the question or answer
      for(var innerCounter = 0; innerCounter < listOfWords.length; innerCounter++){
        var currentWord = listOfWords[innerCounter];
        // Trim away any commas and periods
        currentWord = currentWord.replace(/,$/, "");
        currentWord = currentWord.replace(/\)/, "");
        currentWord = currentWord.replace(/\(/, "");
        currentWord = currentWord.replace(/\""/, "");
        // And make it lowercase:
        currentWord = currentWord.toLowerCase();
        // If it's not an empty word or a period (or what I've deemed a plain word):
        var arrayOfPlainWords = ["\s", "\.", "a", "but", "an", "and", "the", "was", "this", "had", "its", "only", "now", "were", "has", "can", "the", "too", "to", "for", "of", "is", "by", "on", "if", "like", "i", "\&", "it\'s", "from", "or", "with", "at", "as", "that", "these", "be", "it", "are", "in"];
        // If this word isn't in arrayOfPlainWords:
        if(arrayOfPlainWords.indexOf(currentWord) < 0){
          // If we haven't seen this word yet
          if (!(currentWord in wordMap)){
            wordMapList.push(currentWord);
            wordMap[currentWord] = 1;
          } else {
            wordMap[currentWord] += 1;
          }
        }
      }
    }

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
                .attr("class", "wordCloud")
                .style("background-color", "#000000")
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
        .text("Questions from " + arrayOfDataPointsFromCorrectYear[0].Round + " Round in the Year " + year + " With a Value of $" + arrayOfDataPointsFromCorrectYear[0].Value);

        console.log("Test!");
  }
}