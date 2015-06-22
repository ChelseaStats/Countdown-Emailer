var fileLoc = require('./config.js').puzzleSrc;
var fs = require('fs');

module.exports = {
	getAll: function (callback) {
		var parse = require('csv-parse');

		fs.readFile(fileLoc, function (err, input) {
			if (err) {
				console.log("Error getting puzzles " + err);
				return;
			}

			parse(input, function (err, output) {
				if (err) {
					console.log(err);
					return;
				}

				var puzzles = output.map(function (data) {
					return {
						target: data[0],
						numbers: data.slice(1).join()
					};
				});

				callback(null, puzzles);
			});
		});
	},
	addPuzzle: function (puzzle) {
		var data = puzzle.target + ',' + puzzle.numbers.join() + '\n';

		fs.appendFile(fileLoc, data, function (err) {
			if (err)
				console.log("Error adding puzzle " + err);
		});
	}
};