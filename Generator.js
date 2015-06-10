function getRandomInRange(min, max) {	
	return Math.floor(Math.random() * ((max - min) + 1) + min)
}

function getRandomSubset(array, length) {
	var buffer = [];
		
	for(var i = 0; i < length; i++) {
		var s = getRandomInRange(0, array.length - 1);
		var r = array.splice(s, 1)[0];
		
		buffer.push(r);
	}
	
	return buffer;
}

module.exports = {
	generate : function() {		
		// Small numbers are all numbers from 1 - 10 twice
		var smallNumbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];
		var largeNumbers = [25, 50, 75, 100];
		
		// You can choose 0 to 4 of the large numbers
		var largeNumberQuota = getRandomInRange(0, 4);
		
		var largeNumbers = getRandomSubset(largeNumbers, largeNumberQuota);
		var smallNumbers = getRandomSubset(smallNumbers, 6 - largeNumberQuota);
		
		var selection = 
		{
			target : getRandomInRange(101, 999),
			numbers : largeNumbers.concat(smallNumbers)
		};
		
		return selection;
	}
}
