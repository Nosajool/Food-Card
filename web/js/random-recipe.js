App.controller('random-recipe', function ($page) {
	var $textBox = $page.querySelector('#test-field');
	var $testButton = $page.querySelector('#test-button');
	$testButton.addEventListener('click', function () {
		
		$textBox.innerText = "hello";
	});
});
