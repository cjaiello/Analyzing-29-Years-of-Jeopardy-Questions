
# Analyzing 29 Years of Jeopardy Questions

## Project Technologies
* Node + Express for the server https://expressjs.com/
* d3 for visualizations https://www.d3js.org/

## Local Setup
* Download Node https://nodejs.org/
* Open terminal
* `cd` into where you've downloaded and unzipped this code
* Run `npm init`
* Run `npm install`
* Run `node index.js`
* Go to http://localhost:5000/ in your browser
![Go to localhost:5000 in your browser](https://github.com/cjaiello/Analyzing-29-Years-of-Jeopardy-Questions/blob/master/public/images/localhost5000.png)

## Overview
https://analyzing-jeopardy-questions.herokuapp.com/

This data set of 216,931 data points contains every question, answer, and category for all Jeopardy questions from the year 1984 to 2012. Each row in the data set is a question, an answer, a category, the air date of the show where the question occurred, the round (Jeopardy, Double Jeopardy, Final Jeopardy, or Tiebreaker), and the question's value.

## Data Deep Dive

In the Data Deep-Dive page, you have the ability to break down the data (first by category, then by value the question was worth, and finally by air date of the show during which a question occurred), and you can then view a word cloud of all words from a specific combination of round + value + year of air date.
What does this let you do?
This part of this project can help trivia game fanatics discover trends in popular keywords/key topics found in questions.

![Data Deep Dive](https://github.com/cjaiello/Analyzing-29-Years-of-Jeopardy-Questions/blob/master/public/images/data-deep-dive.gif)


## Compare Word Frequencies

In the Comparing Word Frequencies page, you can compare the frequencies of two words of your choice throughout the entire data set (or if you only want to search for one word, you can do that as well). You are also able to see a calendar chart that shows when the words you searched appeared in shows over this 29-year timespan, and hovering over a date in the calendar chart lets you see what questions these words were featured in on that particular day.
What does this let you do?
This page allows to you see trends over time regarding the appearances of certain keywords. What can YOU discover?

![Compare Word Frequencies](https://github.com/cjaiello/Analyzing-29-Years-of-Jeopardy-Questions/blob/master/public/images/compare-word-frequencies.gif)
