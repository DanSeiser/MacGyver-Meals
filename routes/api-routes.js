// ***** DEPENDENCIES *****
var db = require("../models");

// ***** ROUTING *****

module.exports = function(app) {
	// previous searches
	app.get("/api/previous", function(req, res) {
		db.Query.findAll({}).then(function(dbQuery){
			res.json(dbQuery);
		});
	});
}