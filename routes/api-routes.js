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


	// GET route for getting all of the posts
	app.get("/api/recpies/:id", function(req, res) {
		var query = {};
		
		query.QueryId = req.params.id;
		
		// 1. Add a join here to include all of the Authors to these posts
		db.Recipe.findAll({
		where: query,
		include: [
			{ 
			model: db.Query, 
			required: false
			}
		]
		}).then(function(recipeResults) {
		res.json(recipeResults);
		});
	});



}

