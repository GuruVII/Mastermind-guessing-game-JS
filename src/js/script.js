$(document).ready(function() {

var coloursMasterList = ["red", "blue", "yellow", "orange", "brown", "green"]; //all the usable colors
var computerSelectedColours = [];
var numOfAttempts = 0;
var allGuesses = [];

//the computer selects the colours
function selectColour() {
	var colours = coloursMasterList.slice(0); //clone the array
	var randomMultiplier = 6;

	for (var i = 0; i < 4; i++){
		var computerSelectColourIndex = Math.floor((Math.random() * randomMultiplier )); 
		computerSelectedColours.push(colours[computerSelectColourIndex]); //adding a colour from the colours array to the selected colours, using the randomly generated index
		colours.splice(computerSelectColourIndex, 1); // removing the randomly selected colour from the colours array
		randomMultiplier--; //reducing the randomMultiplier to account for the now smaller colours array
	}
	console.log("Computer has selected his colours, they are " + computerSelectedColours);
}

selectColour();

$(".colour").each(function(){ // selecting the default value for our input fields
	$(".colour").css({
		"background-color": coloursMasterList[0],
		"color": coloursMasterList[0]
	});
	$(".colour").text(coloursMasterList[0])
});

$(".colour").click(function(){ // this function individually moves colours in the input fields
	var colorIndex;
	colorIndex = coloursMasterList.indexOf("" + $(this).text() + ""); //determening the index of the colour inside the clicked div

	if ((colorIndex + 1) == coloursMasterList.length){ //if the end of the array is reached set the cyclying index back to 0
		colorIndex = 0;
	}
	else {
		colorIndex++ //if not, move one field forward
	}

	$(this).css({ //set background colour, colour of text and the text inside the field
		"background-color": coloursMasterList[colorIndex],
		"color": coloursMasterList[colorIndex ]
	});
	$(this).text(coloursMasterList[colorIndex ])


});


$("#try").click(function() {
	var guess = [];
	var currentResult = { // object that will be used to store current correct guesses
		correctColour: 0,
		correctPlace: 0

	};
	$(".colour").each(function() { //cycles though all dom elements with the class colour
	guess.push($(this).text()); //pushes the value of those elements into an array
	});
	console.log(guess);

	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ((computerSelectedColours[i] == guess[j]) && (j == i)) {
				currentResult.correctPlace++;
				break;
			};
			if (computerSelectedColours[i] == guess[j]) {
				currentResult.correctColour++;
				break;
			}
		}

		if ( currentResult.correctPlace == 4){ //testing if you gussed all the colours corectly
			console.log("congratulations, you've deduced the pattern")
		}

		



	}

	guess.forEach(function(currentValue){
		$( "#results" ).append( "<div class='col-xs-1 rounded-border unselectable' style='background-color:"+currentValue+"; color:"+currentValue+"'>"+ currentValue + "</div>" );
	});

	numOfAttempts++ // cunting the numbers of attemps
	console.log(numOfAttempts);
	if (numOfAttempts == 10){
		console.log("you have used all your attempts");
		}
	allGuesses.push(guess);//pushes this rounds gusses into a single array

console.log(currentResult.correctColour);
console.log(currentResult.correctPlace);
console.log(allGuesses);
})

});