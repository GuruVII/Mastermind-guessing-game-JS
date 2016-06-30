$(document).ready(function() {

var coloursMasterList = ["red", "blue", "yellow", "orange", "brown", "green"]; //all the usable colors
var computerSelectedColours = [];
var numOfAttempts = 0;

//the computer selects the colours
function selectColour() {
	var colours = coloursMasterList ;
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



$("#try").click(function colourGuessing() {
	var guess = [];
	var currentResult = { // object that will be used to store current correct guesses
		correctColour: 0,
		correctPlace: 0

	};
	$(".colour").each(function() { //cycles though all dom elements with the class colour
	guess.push($(this).val()); //pushes the value of those elements into an array
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
		numOfAttempts++ // cunting the numbers of attemps
		if (numOfAttempts == 10){
			console.log("you have used all your attempts");
		}

	}
console.log(currentResult.correctColour);
console.log(currentResult.correctPlace)
})

});