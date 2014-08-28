var unirest = require('unirest');

var BASE_URL = 'https://community-food2fork.p.mashape.com/';
var API_KEY = 'eecad8d62ca3d75d36ad67ec857c7aa5';
var MASHAPE_KEY = "q1pdezvn0umsh1vGAGcUx1XLRAYrp12r9EJjsnBEA0WJZbyhLd";

exports.getRecipe = function(recipeID, callback){
	unirest.get("https://community-food2fork.p.mashape.com/get?key=eecad8d62ca3d75d36ad67ec857c7aa5&rId=37859")
	.header("X-Mashape-Key", "q1pdezvn0umsh1vGAGcUx1XLRAYrp12r9EJjsnBEA0WJZbyhLd")
	.end(function (result) {
	  console.log(result.status, result.headers, result.body);
	  callback(result.body);
	});
}