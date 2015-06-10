var Immutable = require('immutable');

// Add and multiply are commutable so only evaluate one path
var add = {
	cost: 1,
	operation: '+',
	eval: function(a, b) {
		if(a < b)
			return false;
		
		return a + b;
	}
}

var multiply = {
	cost: 1.2,
	operation: '*',
	eval: function(a, b) {
		if(a < b)
			return false;
		
		return a * b;
	}
}

var minus = {
	cost: 1,
	operation: '-',
	eval: function(a, b) {
		var val = a-b;

		// Negative numbers are not permitted. Zeros are useless.
		if(val <= 0)
			return false;
		
		return val;
	}
}

var divide = {
	cost: 1.4,
	operation: '/',
	eval: function(a, b) {
		// Fractions are not permitted.
		if(a%b != 0)
			return false;
		
		return a / b;
	}
}

var funcs = [add, minus, multiply, divide];

function applyFunctions(valueOne, numbers, target) {
	for(var i = 0; i < numbers.size; i++) {
		
		var valueTwo = numbers.get(i);
		var aNumbers = numbers.remove(i);
		
		for(var j = 0; j < funcs.length; j++) {	
			var func = funcs[j];
            var result = func.eval(valueOne, valueTwo);

			if(result == target)
				return '(' + valueOne + ' ' + func.operation + ' ' + valueTwo + ')';
            
			if(result != false && numbers.size > 0) {
				
				var bNumbers = aNumbers.push(result);
				
				var recurse = applyAll(bNumbers, target);
				
				if(recurse != undefined) {
					return valueOne + " " + func.operation + " " + recurse;
				}
			}
		}
	}
}

function applyAll(numbers, target) {
	for (var i = 0; i < numbers.size; i++) {
		var seed = numbers.get(i);
		var solution = applyFunctions(seed, numbers.remove(i), target);
			
		if(solution != undefined)
			return solution;
	}
}

module.exports = {
	solve : function (puzzle) {
		var numbers = Immutable.List(puzzle.numbers);
		
		return applyAll(numbers, puzzle.target);
	}
}