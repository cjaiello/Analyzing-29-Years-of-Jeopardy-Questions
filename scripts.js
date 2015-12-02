// By Christina Aiello

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
function validateForm(shouldNotBeEmpty) {
  var usersWord = document.getElementById(shouldNotBeEmpty).value;
  if (usersWord==null || usersWord== "" || usersWord.indexOf(" ") > -1) {
    alert("Please enter a singular word to search for.");
    return false;
  } else return true;
}

// When called, this will show or hide the loading image
function showLoadingImage(boolean){
  var loadingBoxImage = document.getElementById("loadingBoxImage");
  var directionsBox = document.getElementById("directionsBox");
  if(boolean == true) {
    loadingBoxImage.style.display = "block";
    directionsBox.style.display = "none";
  } else {
    loadingBoxImage.style.display = "none";
    directionsBox.style.display = "block";
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

  // First, load the data set
  d3.csv('data/jeopardy_questions_and_answers_preprocessed_groupingvalues.csv', function(err, data) {
    if(err) console.log(err);

    // Next, get the word we need from the screen
    var wordToSearchFor = document.getElementById('wordToSearchFor').value;
    // Array with number of matches
    var numberOfMatchesFound = findMatches(data, wordToSearchFor);
    
    // Now, build the visualization based on the data:
    buildWordMatchBarVis(numberOfMatchesFound, 50, 1, "Appearances of the Word \"" + wordToSearchFor + "\"");
  });
}


// Function to find the number of word matches in the data
// set. Finds number of matches in questions, answers, and categories
function findWordPairMatchesInDataSet(){
  // If form is invalid, don't do the search:
  if(!validateForm("wordToSearchFor1") || !validateForm("wordToSearchFor2")){
    return;
  }

  // Remove old visualization
  d3.selectAll(".countWordsVis")
        .remove();

  // Tell the user that something is loading
  showLoadingImage(true);

  // First, load the data set
  d3.csv('data/jeopardy_questions_and_answers_preprocessed_groupingvalues.csv', function(err, data) {
    if(err) console.log(err);

    // Next, get the word we need from the screen
    var wordToSearchFor1 = document.getElementById('wordToSearchFor1').value;
    // Array with number of matches
    var numberOfMatchesFound1 = findMatches(data, wordToSearchFor1);

    // Next, get the word we need from the screen
    var wordToSearchFor2 = document.getElementById('wordToSearchFor2').value;
    // Array with number of matches
    var numberOfMatchesFound2 = findMatches(data, wordToSearchFor2);
    
    // Now, build the visualization based on the data:
    buildWordMatchComparisonBarVis(numberOfMatchesFound1, 50, wordToSearchFor1);
    buildWordMatchComparisonBarVis(numberOfMatchesFound2, 50, wordToSearchFor2);
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
    var regex = new RegExp("(?:^|\\s)" + wordToFind.toLowerCase() + "(?=\\s|$)");

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

// If using calendar vis, we need to get all data points associated with the
// specific year that was clicked:
function getQuestionsFromCorrectYear(data, year) {
  // Parsing the year from the air date
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
  return arrayOfDataPointsFromCorrectYear;
}

// Actually counts words for word cloud construction:
function createWordCountsForWordCloud(data){
  var wordMap = {}; // Key is word, value is number of times seen

  if(data.length > 0){

    // These steps populate the above variable
    for(var counter = 0; counter < data.length; counter++){
      var question = data[counter].Question;
      var answer = data[counter].Answer;
      var category = data[counter].Category;

      // Split each string into an array of words
      var listOfQuestionWords = question.split(" ");
      var listOfAnswerWords = answer.split(" ");
      var listOfCategoryWords = category.split(" ");
      // Create a list of all words from question and answer and category
      var listOfWords = listOfQuestionWords.concat(listOfAnswerWords.concat(listOfCategoryWords));

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
            wordMap[currentWord] = 1;
          } else {
            wordMap[currentWord] += 1;
          }
        }
      }
    }
    return wordMap;
  } else {
    // You goofed
    return null;
  }
}





