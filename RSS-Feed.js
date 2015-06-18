var Feed = require('feed');

var feed = new Feed({
	title: "Countdown Number Puzzle",
	description: "Your daily Countdown numbers puzzle!",
	link: "http://countdown.rocks/",
	author: [
		{
			name: "Joseph Billingsley",
			email: "jcb@josephbillingsley.co.uk",
			link: "http://www.josephbillingsley.co.uk"
		},
		{
			name: "ChelseaStats",
			email: "countdown@thechels.uk",
			link: "http://www.thechels.uk"
		}
	]
});

feed.addCategory("Daily");
feed.addCategory("Countdown");
feed.addCategory("Numbers");
feed.addCategory("Puzzle");

var Puzzles = require('PuzzlesRepo');

Puzzles.findPosts(function (err, puzzles) {
	if (err) {

	} else {
		puzzles.forEach(function (puzzle) {
			feed.item({
				title: "Today you must reach " + puzzle.target,
				description: "With the numbers " + puzzle.numbers
			});
		});

		writeRSSOut(feed);
	}
});

function writeRSSOut(feed) {
	var rss = feed.render('rss-2.0');

	var fs = require('fs');
	var config = require('./config.js');
	
	fs.writeFile(config.rssLoc, rss, function (err) {
		if (err) {
			return console.log(err);
		}
		
		console.log("The RSS feed was updated succesfully!");
	});
}