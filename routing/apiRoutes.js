var path = require('path');


var friends = require('../app/data/friends.js');

module.exports = function(app) {

app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;

		var userResponses = userInput.scores;

		var matchName = '';
		var matchImage = '';
		var totalDifference = 5000; // Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
      var diff = 0;
      
			for (var j = 0; j < userResponses.length; j++) {
				diff += Math.abs(friends[i].scores[j] - userResponses[j]);
			}
			if (diff < totalDifference) {

        totalDifference = diff;
				matchName = friends[i].name;
				matchImage = friends[i].photo;
			}
		}

		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
	});
};