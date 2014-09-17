var unirest = require('unirest');

var BASE_URL = 'https://community-food2fork.p.mashape.com/';
var API_KEY = 'eecad8d62ca3d75d36ad67ec857c7aa5';
var MASHAPE_KEY = "q1pdezvn0umsh1vGAGcUx1XLRAYrp12r9EJjsnBEA0WJZbyhLd";

var getRecipeById = function(recipeID, callback){
	unirest.get(BASE_URL + "get?key=" + API_KEY + "&rId=" + recipeID)
	.header("X-Mashape-Key", MASHAPE_KEY)
	.end(function (result) {
	  console.log(result.status, result.headers, result.body);
	  callback(result.body);
	});
}

var getRecipesBySearch = function(query, callback){
	unirest.get(BASE_URL + "search?key=" + API_KEY + "&q=" + query)
	.header("X-Mashape-Key", "q1pdezvn0umsh1vGAGcUx1XLRAYrp12r9EJjsnBEA0WJZbyhLd")
	.end(function (result) {
	  console.log(result.status, result.headers, result.body);
	  callback(result.body);
	});
}

exports.getRecipeById = getRecipeById;
exports.getRecipesBySearch = getRecipesBySearch;
