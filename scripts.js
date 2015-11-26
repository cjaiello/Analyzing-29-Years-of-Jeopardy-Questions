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

// This prevents the user from leaving the box blank
// and prevents them from entering more than one word
function validateForm() {
  var usersWord = document.getElementById("wordToSearchFor").value;
  if (usersWord==null || usersWord== "" || usersWord.indexOf(" ") > -1) {
    alert("Please enter a singular word to search for.");
    return false;
  } else return true;
}

// When called, this will show or hide the loading image
function showLoadingImage(boolean){
  var loadingBox = document.getElementById("loadingBoxImage");
  if(boolean == true) {
    loadingBox.style.display = "block";
  } else {
    loadingBox.style.display = "none";
  }
}

// Function to find the number of word matches in the data
// set. Finds number of matches in questions, answers, and categories
function findWordMatchesInDataSet(){
  // If form is invalid, don't do the search:
  if(!validateForm()){
    return;
  }

  // Remove old visualization
  d3.select(".countWordsVis")
        .remove();

  // Tell the user that something is loading
  showLoadingImage(true);

  console.log("Starting now...");
  // First, load the data set
  d3.csv('data/jeopardy_questions_and_answers_preprocessed_groupingvalues.csv', function(err, data) {
    if(err) console.log(err);

    // Next, get the word we need from the screen
    var wordToSearchFor = document.getElementById('wordToSearchFor').value;
    console.log("Searching for: " + wordToSearchFor);
    // Array with number of matches
    var numberOfMatchesFound = findMatches(data, wordToSearchFor);
    console.log(numberOfMatchesFound);
    console.log("Matches found. Question: " + numberOfMatchesFound.Questions + " | Answer: " + numberOfMatchesFound.Answers + " | Category: " + numberOfMatchesFound.Categories);

    // Now, build the visualization based on the data:
    buildWordMatchBarVis(numberOfMatchesFound, 50, 1, "Appearances of the Word \"" + wordToSearchFor + "\"");
  });
}



// This function will find matches for a specific word in a given
// array of input.
// @input: An array of strings
// @ wordToFind: The word you want to find in the given input
function findMatches(input, wordToFind){
  // Holds number of matches in entire data set:
  var numberOfQuestionMatches = 0; 
  var numberOfAnswerMatches = 0; 
  var numberOfCategoryMatches = 0; 

  // Loop through the data set:
  for(var counter = 0; counter < input.length; counter++){
    var dataPoint = input[counter];
    var currentQuestion = dataPoint.Question;
    var currentAnswer = dataPoint.Answer;
    var currentCategory = dataPoint.Category;

    // Remove commas and parentheses
    currentQuestion = currentQuestion.replace(/,/, "");
    currentQuestion = currentQuestion.replace(/\)/, "");
    currentQuestion = currentQuestion.replace(/\(/, "");
    currentQuestion = currentQuestion.replace(/\""/, "");
    currentAnswer = currentAnswer.replace(/,/, "");
    currentAnswer = currentAnswer.replace(/\)/, "");
    currentAnswer = currentAnswer.replace(/\(/, "");
    currentAnswer = currentAnswer.replace(/\""/, "");
    currentCategory = currentCategory.replace(/,/, "");
    currentCategory = currentCategory.replace(/\)/, "");
    currentCategory = currentCategory.replace(/\(/, "");
    currentCategory = currentCategory.replace(/\""/, "");

    // Regex to find how many matches for a particular word there are:
    var regex = new RegExp("(?:^|\\s)" + wordToFind + "(?=\\s|$)");

    // Compare this word to the current question
    var matches = currentQuestion.toLowerCase().match(regex);
    if(matches != null){
      numberOfQuestionMatches += matches.length;
    }

    // Compare this word to the current answer
    var matches = currentAnswer.toLowerCase().match(regex);
    if(matches != null){
      numberOfAnswerMatches += matches.length;
    }

    // Compare this word to the current category
    var matches = currentCategory.toLowerCase().match(regex);
    if(matches != null){
      numberOfCategoryMatches += matches.length;
    }

    // Now, for this data point (in regards to the question, answer, and category)
    // we have the number of matches in numberOfMatches. Continue looping through
    // the entire data set, and return the final counts.

  }

  // This will hold the number of matches for each attribute
  var returnedArrayOfMatches = {};
  returnedArrayOfMatches["Questions"] = numberOfQuestionMatches;
  returnedArrayOfMatches["Answers"] = numberOfAnswerMatches;
  returnedArrayOfMatches["Categories"] = numberOfCategoryMatches;
  return returnedArrayOfMatches;
}





