#!/usr/bin/env node

// Generate the puzzle
var puzzleGen = require('./Generator.js');
var puzzle = puzzleGen.generate();

var solver = require('./Solver.js');

var solution;

while(solution == undefined) {
	puzzle = puzzleGen.generate();
	solution = solver.solve(puzzle);
}

var subject = "Your daily countdown puzzle!";
var body = "Morning all! \r\n\n" + 
		   "Today you must try and reach " + puzzle.target + " with the numbers " + puzzle.numbers + ". \r\n" +
		   "Best of luck!";

var receivers = require('./ReceiversRepo.js').getAll().receivers;

// Config contains sensitive information or information that may change on different environments
var config = require('./config.js');

// Send the email
var Mailer = require('./Emailer.js');
var mailer = new Mailer(config.username, config.password);

receivers.forEach(function(receiver) {
	mailer.sendMessage(subject, body, receiver);
});
