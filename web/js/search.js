App.controller('search', function (page) {
	$(document).ready(function(){
		$("#recipe-section").hide();
	});


	$(page).find('#search-button').on('click', function () {
		var search_term = $(page).find('#search-term').attr('value');
		searchForRecipe(search_term, function(data){
			if(data){
				// Grab top search result
				var parsed = JSON.parse(data);
				var numResults = parsed.count;
				var recipeIndex = randomID(numResults);
				if(parsed.recipes.length == 0){
					$('#error-text').text("No Results for the query: " + search_term);
				}
				else {
					var recipeID = parsed.recipes[recipeIndex].recipe_id;
					console.log(numResults + " chosen:" + recipeIndex);
					console.log(parsed.recipes[recipeIndex]);
					console.log(recipeID);

					getOneRecipe(recipeID, function(data){
						$("#recipe-section").show();
						if(data){
							var parsed = JSON.parse(data);
							$('#recipe-image').attr('src', parsed.recipe.image_url);
							$('#recipe-title').text(parsed.recipe.title);
							$('#ingredients').empty();
							for(var i = 0; i < parsed.recipe.ingredients.length; i ++){
								$('#ingredients').append('<li>' + parsed.recipe.ingredients[i] + '</li>');
							}
						}			
					});	
				}
			}		
		});
	});

	function searchForRecipe(query, callback){
		API.getRecipesBySearch(query, function(data){
			console.log("Search for Recipe Callback: " + data);
			if (!data | data.err){
				console.log("No data or data error");
				App.dialog({
					title			: 	"Connection Error",
					text 			: 	"Please check your connection before trying again.",
					okButton		: 	"Try Again",
					cancelButton	: 	"Cancel"
				}, function (retry){
					if(retry){
						searchForRecipe(query, callback);
					}
					else {
						callback();
					}
				});
			}
			else {
				console.log("Successful search");
				callback(data);
			}
		});
	}

	function getOneRecipe(id, callback){
		API.getRecipeById(id, function(data){
			console.log("Get One Recipe Callback: " + data);
			if (!data | data.err){
				App.dialog({
					title			: 	"Connection Error",
					text 			: 	"Please check your connection before trying again.",
					okButton		: 	"Try Again",
					cancelButton	: 	"Cancel"
				}, function (retry){
					if(retry){
						getOneRecipe(id, callback);
					}
					else {
						callback();
					}
				});
			}
			else {
				callback(data);
			}
		});
	}

	function randomID(numRecipes){
		return Math.floor((Math.random() * numRecipes));
	}
});
