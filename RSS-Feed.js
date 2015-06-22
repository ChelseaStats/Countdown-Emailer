var Config = require('./config.js');
var Puzzles = require('./PuzzleRepo.js');

module.exports = {
	writeFeed: function () {

		var feed = getFeed();

		Puzzles.getAll(function (err, puzzles) {
			if (err) {
				console.log(err);
			} else {
				puzzles.forEach(function (puzzle) {
					feed.addItem({
						title: "Today you must reach " + puzzle.target + "...",
						description: "Reach " + puzzle.target + " with the numbers " + puzzle.numbers
					});
				});

				writeRSSOut(feed);
			}
		});
	}
};

var Feed = require('feed');

function getFeed() {
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
				email: "cde@thechels.uk",
				link: "http://www.thechels.co.uk"
			}
		]
	});

	feed.addCategory("Daily");
	feed.addCategory("Countdown");
	feed.addCategory("Numbers");
	feed.addCategory("Puzzle");

	return feed;
}

function writeRSSOut(feed) {

	var fs = require('fs');
	var rss = feed.render('rss-2.0');
	
	fs.writeFile(Config.rssDest, rss, function (err) {
		if (err) {
			return console.log(err);
		}

		console.log("The RSS feed was updated succesfully!");
	});
}