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
    return false;
  } else return true;
}

// When called, this will show or hide the loading image
function showLoadingImage(boolean){
  var loadingBoxImage = document.getElementById("loadingBoxImage");
  var directionsBox = document.getElementById("directionsBox");
  if(boolean) {
    loadingBoxImage.style.display = "block";
    directionsBox.style.display = "none";
  } else {
    loadingBoxImage.style.display = "none";
    directionsBox.style.display = "block";
  }
}

// Function to find the number of word matches in the data
// set. Finds number of matches in questions, answers, and categories
function findWordPairMatchesInDataSet(){
  // If form is invalid, don't do the search:
  if(!validateForm("wordToSearchFor1") && !validateForm("wordToSearchFor2")){
    alert("Please enter a singular word to search for.");
    return;
  } 

  // Remove old visualization
  d3.selectAll(".calendarBoxSVG1")
    .remove();
  d3.selectAll(".calendarBoxSVG2")
    .remove();
  d3.selectAll(".countWordsVis")
    .remove();
  d3.selectAll(".barChartLabel")
    .remove();
  d3.selectAll(".calendarLabel")
    .remove();
  d3.selectAll(".locationOfJustOneCalendar-calendarBoxSVG")
    .remove();

  // Tell the user that something is loading
  showLoadingImage(true);

  // First, load the data set
  d3.csv('data/jeopardy_questions_and_answers_preprocessed_groupingvalues.csv', function(err, data) {
    if(err) console.log(err);

    // Next, get the word we need from the screen
    var wordToSearchFor1 = document.getElementById('wordToSearchFor1').value;
    // Array with number of matches
    var numberOfMatchesFound1 = findMatchesAggregatedByAirDate(data, wordToSearchFor1);
    // Next, get the word we need from the screen
    var wordToSearchFor2 = document.getElementById('wordToSearchFor2').value;
    // Array with number of matches
    var numberOfMatchesFound2 = findMatchesAggregatedByAirDate(data, wordToSearchFor2);

    var topBoundForGraphs = (numberOfMatchesFound1["LargestSeen"] > numberOfMatchesFound2["LargestSeen"]) ? numberOfMatchesFound1["LargestSeen"] : numberOfMatchesFound2["LargestSeen"];

    // How many words did they search for, one or two?
    if(!validateForm("wordToSearchFor1")) {
      // Just build one visualization
      buildWordMatchComparisonBarVis(numberOfMatchesFound2, 50, wordToSearchFor2, 3);
    } else if(!validateForm("wordToSearchFor2")) {
      // Just build one visualization
      buildWordMatchComparisonBarVis(numberOfMatchesFound1, 50, wordToSearchFor1, 3);
    } else {
      // Build both visualizations based on the data:
      buildWordMatchComparisonBarVis(numberOfMatchesFound1, 50, wordToSearchFor1, 1, topBoundForGraphs);
      buildWordMatchComparisonBarVis(numberOfMatchesFound2, 50, wordToSearchFor2, 2, topBoundForGraphs);
    }
  });
}


// Combines the question, answer, and category hashmaps into one
function combineHashmapsAndTotalUpCountsInHashmap(questionHashmap, answerHashmap, categoryHashmap){
  var finalResult = {};
  var combinedHashmap = {};
  var questionRunningTotal = 0;
  var answerRunningTotal = 0;
  var categoryRunningTotal = 0;

  for(key in questionHashmap){
    if(combinedHashmap[key] != null){
      combinedHashmap[key] += questionHashmap[key];
      questionRunningTotal += questionHashmap[key];
    } else {
      combinedHashmap[key] = questionHashmap[key];
      questionRunningTotal += questionHashmap[key];
    }
  }

  for(key in answerHashmap){
    if(combinedHashmap[key] != null){
      combinedHashmap[key] += answerHashmap[key];
      answerRunningTotal += answerHashmap[key];
    } else {
      combinedHashmap[key] = answerHashmap[key];
      answerRunningTotal += answerHashmap[key];
    }
  }

  for(key in categoryHashmap){
    if(combinedHashmap[key] != null){
      combinedHashmap[key] += categoryHashmap[key];
      categoryRunningTotal += categoryHashmap[key];
    } else {
      combinedHashmap[key] = categoryHashmap[key];
      categoryRunningTotal += categoryHashmap[key];
    }
  }

  finalResult = [combinedHashmap, questionRunningTotal, answerRunningTotal, categoryRunningTotal];
  return finalResult;
}



// This function will find matches for a specific word in a given
// array of input.
// @input: An array of strings
// @wordToFind: The word you want to find in the given input
function findMatchesAggregatedByAirDate(input, wordToFind){
  // Creating an object to hold match data
  var returnedMapOfMatches = {};
  returnedMapOfMatches['QuestionCounter'] = 0;
  returnedMapOfMatches['AnswerCounter'] = 0;
  returnedMapOfMatches['CategoryCounter'] = 0;
  // Map that will have strings for dates as the key
  // and the value is an array of question/answer/category combos:
  matchesByDateMap = {};
  // Yo dawg, I heard you like maps,
  // So we put a map in your map
  // So you can map while you map:
  returnedMapOfMatches['MatchesMap'] = matchesByDateMap;

  // Loop through the data set:
  for(var counter = 0; counter < input.length; counter++){
    // Getting our current data point, aka a row in the data
    var dataPoint = input[counter];

    // Prepending those zeroes since they're getting stripped somehow
    //var newDate = prependZeroToNumbersLessThanTen(dataPoint.Date);
    //console.log(newDate);

    // Adding data to each map:
    returnedMapOfMatches = putDataIntoMapBasedOnDate(dataPoint, wordToFind, returnedMapOfMatches);
  }

  // Pulling out these counts to get the largest seen
  var questionCount = returnedMapOfMatches['QuestionCounter'];
  var answerCount = returnedMapOfMatches['AnswerCounter'];
  var categoryCount = returnedMapOfMatches['CategoryCounter'];
  returnedMapOfMatches["LargestSeen"] = (questionCount > answerCount) ? ((questionCount > categoryCount) ? questionCount : categoryCount) : ((answerCount > categoryCount) ? answerCount : categoryCount);
  return returnedMapOfMatches;
}

// Function will turn a string to all lowercase, count matches
// of a word, and put them in the map based on the date
function putDataIntoMapBasedOnDate(dataPoint, wordToFind, mapOfMatchesByDate){
  // Regex to find how many matches for a particular word there are:
  var regex = new RegExp("(?:^|\\s)" + wordToFind.toLowerCase() + "(?=\\s|$)");
  var questionMatchCount = 0;
  var answerMatchCount = 0;
  var categoryMatchCount = 0;

  // Compare this word to the current question, answer, and category:
  var questionMatches = removeSpecialCharacters(dataPoint["Question"]).toLowerCase().match(regex);
  var answerMatches = removeSpecialCharacters(dataPoint["Answer"]).toLowerCase().match(regex);
  var categoryMatches = removeSpecialCharacters(dataPoint["Category"]).toLowerCase().match(regex);

  // Seeing if we got any matches, and if so, how many:
  if(questionMatches != null){
    questionMatchCount = questionMatches.length;
  }
  if(answerMatches != null){
    answerMatchCount = answerMatches.length;
  }
  if(categoryMatches != null){
    categoryMatchCount = categoryMatches.length;
  }

  // Totaling up all matches for this data point:
  var matches = questionMatchCount + answerMatchCount + categoryMatchCount;

  // If this data point had any sort of match:
  if(matches != 0){
    // Track the count for matches for each question, answer, or category:
    mapOfMatchesByDate['QuestionCounter'] = mapOfMatchesByDate['QuestionCounter'] + questionMatchCount;
    mapOfMatchesByDate['AnswerCounter'] = mapOfMatchesByDate['AnswerCounter'] + answerMatchCount;
    mapOfMatchesByDate['CategoryCounter'] = mapOfMatchesByDate['CategoryCounter'] + categoryMatchCount;
    // Will hold the questions already stored here:
    var tempDataArray = [];
    // If key (date) already exists:
    if(mapOfMatchesByDate["MatchesMap"][dataPoint.Date] != null){
      // Getting previous array
      tempDataArray = mapOfMatchesByDate["MatchesMap"][dataPoint.Date];
      // Add this current data attribute
      tempDataArray.push(dataPoint.Question + ": <i>" + dataPoint.Answer + "</i> (" + dataPoint.Category + ")")
      mapOfMatchesByDate["MatchesMap"][dataPoint.Date] = tempDataArray;
    } else {
      tempDataArray.push(dataPoint.Question + ": <i>" + dataPoint.Answer + "</i> (" + dataPoint.Category + ")")
      mapOfMatchesByDate["MatchesMap"][dataPoint.Date] = tempDataArray;
    }
  }

  return mapOfMatchesByDate;
}


// Removing special characters from strings
function removeSpecialCharacters(string){
  // Remove commas and parentheses
  string = string.replace(/,/, "");
  string = string.replace(/\)/, "");
  string = string.replace(/\(/, "");
  string = string.replace(/\""/, "");

  return string;
}


// Puts zeroes in front of any parts of a date that are less than ten
function prependZeroToNumbersLessThanTen(date){
  // Prepending those zeroes since they're getting stripped somehow
  var dateRegex = new RegExp("^(0?[1-9]|1[012])[/](0?[1-9]|[12][0-9]|3[01])[/]([0-9]+)$");
  var matches = dateRegex.exec(date);

  var newDate; // Will hold new date with zeroes
  if(matches != null){
    var month =  (matches[1] < 10 ? '0' : '') + matches[1];
    var day =  (matches[2] < 10 ? '0' : '') + matches[2];
    var year =  matches[3];
    newDate = month + "/" + day + "/" + year;
  }

  return newDate;
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
    var currentQuestion = removeSpecialCharacters(dataPoint.Question);
    var currentAnswer = removeSpecialCharacters(dataPoint.Answer);
    var currentCategory = removeSpecialCharacters(dataPoint.Category);

    // Count the number of matches for this word in this data point's
    // question, answer, and category
    numberOfQuestionMatches = putDataIntoMap(dataPoint.Question, currentQuestion, wordToFind);
    numberOfAnswerMatches = putDataIntoMap(dataPoint.Answer, currentAnswer, wordToFind);
    numberOfCategoryMatches = putDataIntoMap(dataPoint.Category, currentCategory, wordToFind);

  }

  // This will hold the number of matches for each attribute
  var returnedMapOfMatches = {};
  returnedMapOfMatches["Questions"] = numberOfQuestionMatches;
  returnedMapOfMatches["Answers"] = numberOfAnswerMatches;
  returnedMapOfMatches["Categories"] = numberOfCategoryMatches;
  return returnedMapOfMatches;
}

// Counts number of matches in an attribute, in addition to 
// turning a data point to all lowercase
function putDataIntoMap(dataAttribute, counter, wordToFind){
  // Regex to find how many matches for a particular word there are:
    var regex = new RegExp("(?:^|\\s)" + wordToFind.toLowerCase() + "(?=\\s|$)");

    // Compare this word to the current question
    var matches = dataAttribute.toLowerCase().match(regex);
    if(matches != null){
      counter += matches.length;
    }

  return counter;
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



// Creates a string for all question/answer/category groups
// in an entry in the hashmap
function createStringForAllQuestionsAndAnswersDrilldownCharts(object){
  var finalString = "<ul>";
  // For each data point in this object, which is a list of data points for this day
  for(counter = 0; counter < object.length; counter++){
    // Get the question and its answer
    finalString += "<li>" + object[counter].Question + "? <i>" + object[counter].Answer + "</i> (" + object[counter].Category + ")</li>";
  }
  return finalString + "</ul>";
}

// Creates a string for all question/answer/category groups
// in an entry in the hashmap
function createStringForAllQuestionsAndAnswersComparisonCharts(object){
  var finalString = "<ul>";
  // For each data point in this object, which is a list of data points for this day
  for(counter = 0; counter < object.length; counter++){
    // Get the question and its answer
    finalString += "<li>" + object[counter] + "</li>";
  }
  return finalString + "</ul>";
}



