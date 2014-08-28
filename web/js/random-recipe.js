App.controller('random-recipe', function ($page) {
	var recipe_title = $page.querySelector('#recipe-title');
	var recipe_button = $page.querySelector('#random-recipe-button');

	recipe_button.addEventListener('click', function () {
		console.log("Button Tapped");
		getOneRecipe(getRandomRecipeID(), function(data){
			if(data){
				var parsed = JSON.parse(data);
				$('#recipe-image').attr('src', parsed.recipe.image_url);
				recipe_title.innerText = parsed.recipe.title;
			}			
		});	
	});


	function getOneRecipe(id, callback){
		API.getRecipe(id, function(data){
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

	function getRandomRecipeID(){
		return Math.floor((Math.random() * 50000) + 517);
	}
});
