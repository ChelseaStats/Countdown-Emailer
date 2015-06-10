_fs = require('fs');

module.exports = {
    getAll : function () {
        
        var config = require("./config.js")

		var filename = config.receivers;
		var file = _fs.readFileSync(filename, "utf8");
		
		return JSON.parse(file);
	}
}