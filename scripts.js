d3.csv('data/jeopardy_questions_and_answers_preprocessed_groupingvalues.csv', function(err, data) {
  if(err) console.log(err);

  // Aggregate data set
  data = aggregateByRound(data);

  //buildBarVis(data, 85, 1, "Round");
  buildBarVis(data, 85, 1, "Round");
});

/*
* Helper for aggregating data
* @data: The data from the csv to aggregate
*/
function aggregateByRound(data){

  var arrayOfJeopardyQuestions = d3.nest()
  arrayOfJeopardyQuestions = d3.nest()
  .key(function(data) { 
    return data.Round; 
  })
  .entries(data);

  return arrayOfJeopardyQuestions;
}

/*
* Helper for aggregating data
* @data: The data from the csv to aggregate
*/
function aggregateByYear(data){

  var arrayOfJeopardyQuestions = d3.nest()
  arrayOfJeopardyQuestions = d3.nest()
  .key(function(data) { 
    return data.Year; 
  })
  .entries(data);

  return arrayOfJeopardyQuestions;
}

/*
* Helper for aggregating data
* @data: The data from the csv to aggregate
*/
function aggregateByValue(data){

  var arrayOfJeopardyQuestions = d3.nest()
  arrayOfJeopardyQuestions = d3.nest()
  .key(function(data) { 
    return data.Value; 
  })
  .entries(data);

  return arrayOfJeopardyQuestions;
}

// Tells the name of the viz based on its number.
// @vizNumber: the number of the visualization,
// which is either 1, 2, or 3
function getVizName(vizNumber){
  vizNumber = parseInt(vizNumber);
  if(vizNumber == 1){
    return "firstChart";
  } else if(vizNumber == 2){
    return "secondChart";
  } else if(vizNumber == 3){
    return "thirdChart";
  } else return "fourthChart";
}



// This function will find matches for a specific word in a given
// array of input.
// @input: An array of strings
// @ wordToFind: The word you want to find in the given input
function findMatches(input, wordToFind){
  var numberOfMatches = 0; 
  console.log(input);
  // Go through all questions in this piece of data:
  for(var counter = 0; counter < input.length; counter++){
    var currentQuestion = input[counter];
    currentQuestion = currentQuestion.replace(/,/, "");
    currentQuestion = currentQuestion.replace(/\)/, "");
    currentQuestion = currentQuestion.replace(/\(/, "");
    currentQuestion = currentQuestion.replace(/\""/, "");
    // And find how many matches for a particular word there are:
    var regex = new RegExp("(?:^|\\s)" + wordToFind + "(?=\\s|$)");
    var matches = currentQuestion.toLowerCase().match(regex);
    if(matches != null){
      numberOfMatches += matches.length;
    }
  }
  return numberOfMatches;
}





