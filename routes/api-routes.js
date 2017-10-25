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
	app.get("/api/recipes/:id", function(req, res) {
		var query = {};
		query.QueryId = req.params.id;
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


	// GET route for getting all of the posts
	app.get("/api/recipes/", function(req, res) {
		db.Recipe.findAll({}).then(function(recipeResults) {
			res.json(recipeResults);

		});
	});

	app.post("/api/recipes", function(req, res) {
		console.log(req.body.recipes);
		db.Recipe.bulkCreate(req.body.recipes, {});
		// db.Recipe.create()
	});


}
