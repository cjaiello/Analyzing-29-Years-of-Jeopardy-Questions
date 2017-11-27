CS573 Final Project Proposal:

“29 Years of Jeopardy Questions”

[“29 Years of Jeopardy Questions” - Main Page](http://cjaiello.github.io/DataVisFinal/index.html)


[“29 Years of Jeopardy Questions” - Process Book](http://cjaiello.github.io/DataVisFinal/processBook.html)


[“29 Years of Jeopardy Questions” - Word Frequencies](http://cjaiello.github.io/DataVisFinal/compareWordFrequencies.html)


[“29 Years of Jeopardy Questions” - Data Breakdown](http://cjaiello.github.io/DataVisFinal/dataBreakdown.html)



----------------------------------------------------

Basic Info

“29 Years of Jeopardy Questions”

Christina Aiello

Email: cjaiello@wpi.edu

Github: cjaiello

http://www.christinaaiello.com/DataVisFinal/




----------------------------------------------------

Project Objectives

I would like to give users the ability to view the frequency of categories, to potentially show which are most likely to appear in a Jeopardy game. In addition, I want to let the user see which categories end up being in the Double Jeopardy and Final Jeopardy rounds most frequently. This could help a user target his or her knowledge to categories that end up in these rounds.

While I do have these goals, I also plan on letting the user explore the data himself or herself, meaning that the user will be able to sort the data first by one attribute (for example, “category”) and display the counts for that data, then sort the data by a second attribute (for example, “air date”) and display the counts, and finally sort by a third attribute (for example, “round”) and display the counts for each attribute.  

What I need to specifically disallow (to prevent gigantic and unreadable graphs)unless I can find visualizations that can support them is the ability to count based on the “question,” “air date,” “answer,” “category,” and the “show number” attributes due to there being 216,930 questions in the file. While some may be duplicates, sorting the data by question (or by these other aforementioned attributes) would create an enormous and useless graph. I could also do preprocessing to modify the data to allow some of these attributes to be used.





----------------------------------------------------

Data

Data was compiled by the user “trexmatt” of the website reddit.com. The user writes, “Questions were obtained by crawling www.j-archive.com. According to j-archive, the total number of Jeopardy! questions over the show's span (as of [January 11th, 2014]) is 252,583 - so this is approximately 83% of them. In particular, around the last two years of game play are missing.” 

The categories are described as,

•	“'category' : the question category, e.g. "HISTORY"

•	'value' : $ value of the question as string, e.g. "$200.” 

		o	Note: This is "None" for Final Jeopardy! and Tiebreaker questions

•	'question' : text of question

		o	Note: This sometimes contains hyperlinks and other things messy text such as when there's a picture or video question

•	‘answer’: answer to question

•	'round' : one of "Jeopardy!","Double Jeopardy!","Final Jeopardy!" or "Tiebreaker"

		o	Note: Tiebreaker questions do happen but they're very rare (like once every 20 years)

•	'show_number' : string of show number, e.g '4680'

•	'air_date' : the show air date in format YYYY-MM-DD”

Link to Reddit post:

https://www.reddit.com/r/datasets/comments/1uyd0t/200000_jeopardy_questions_in_a_json_file/

Link to location of data:

https://docs.google.com/uc?id=0BwT5wj_P7BKXUl9tOUJWYzVvUjA&export=download







