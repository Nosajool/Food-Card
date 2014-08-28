App.controller('random-recipe', function ($page) {
	var $textBox = $page.querySelector('#test-field');
	var $testButton = $page.querySelector('#test-button');
	$testButton.addEventListener('click', function () {
		console.log("Button Tapped");
		getOneRecipe(37859, function(data){
			if(data){
				var parsed = JSON.parse(data);
				console.log("YAY");
				console.log(parsed.recipe);
				$textBox.innerText = parsed.recipe.title;
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
});
