// ***** LOAD DATA *****
var recipeData = require("../data/recipeData");

// ***** ROUTING *****

module.exports = function(app) {

	// previous searches
	app.get("api/previous", function(req, res) {
		res.json(recipeData);
	});
}