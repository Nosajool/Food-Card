App.controller('random-recipe', function (page) {

	$(page).find('#random-recipe-button').on('click', function () {
		console.log("Button Tapped");
		getOneRecipe(getRandomRecipeID(), function(data){
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
	});

	$(page).find('#kik-recipe-button').on('click', function(){
		var content_title = $('#recipe-title').text();
		kik.send({
			title: content_title
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
