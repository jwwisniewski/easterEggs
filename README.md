easterEggs
==========

A simple AngularJS, node.js and CSS3 showcase. 

Install Instructions 
-------
* run *npm install* to get the required node packages 
* run *node basketgenerator.js* to run the backend server
* access *index.html* file in the **Chrome** browser

Scenario
--------
Imagine a universe with:
* an infinite amount of balls, each of them with a number ( from 1 to 999 ) on it (so we have an infinite amount of balls #1, an infinite amount of balls #2 etc.)
* 30 baskets, each with a space for 10 balls 
* our dear user has his own, special, basket with space for 100 balls

Now, what happens is:
* we fill each basket with a random amount (no higher than the basket’s capacity, higher than zero) of unique balls (so there is no basket with two balls #8, but ball #8 can be in many baskets)
* the user also fills his basket with a random amount of unique balls (same rules apply)

Task
----
* recreate the above scenario
* find baskets, that have only balls owned by the user
* find baskets, that have only and exactly one ball owned by the user