// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] != array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

$(document).ready(function() {

var coloursMasterList = ["red", "blue", "yellow", "orange", "brown", "green"]; //all the usable colors
var computerSelectedColours = [];
var numOfAttempts = 0;
var allGuesses = [];
var duplicate = false; //this variable will be used to test, if you entered a duplicate combination

function attempts(){ //tells us the number of attept you had
	$("#attempts").text(numOfAttempts);
}

attempts();

$("#try").prop("disabled", false ); //if the try button is disabled, this enables it

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
	var guess = []; // array that stores your current guess
	var currentResult = { // object that will be used to store current correct guesses
		correctColour: 0,
		correctPlace: 0

	};
	$(".colour").each(function() { //cycles though all dom elements with the class colour
	guess.push($(this).text()); //pushes the value of those elements into an array
	});
	console.log(guess);

	for (var i = 0; i < 4; i++) { //check, if the the computer selected colours match with the guess
		for (var j = 0; j < 4; j++) {
			if ((computerSelectedColours[i] == guess[j]) && (j == i)) { //checks if you guessed both the colour and position
				currentResult.correctPlace++;
				break;
			};
			if (computerSelectedColours[i] == guess[j]) { //checks if you guessed the colour but not the position
				currentResult.correctColour++;
				break;
			}
		}
		if ( currentResult.correctPlace == 4){ //testing if you gussed all the colours corectly
			numOfAttempts++ //adds an attempt becuase attempts are normally counted elsewhere
			alert("congratulations, you've deduced the pattern, it took you " + numOfAttempts + " attempt(s)")
			$("#try").prop("disabled", true );
		}
}

allGuesses.forEach(function(array) {
	if (array.equals(guess)){//equals is a new method added using prototype, which is preseint in the all.js or if looking at src folder in the newPrototype.js
		duplicate = true;
	alert("you've are trying an existing combination")

	};
});

function check() {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if ( (guess[i] == guess[j]) && (i != j)){ //checking if there are any duplicates inside the array
				alert("You've used duplicate colours in your guess, try again")
				return true
			};
		};
	};
	return false
};


if ((duplicate == false) && (check() == false)){ //check, if the guess is a duplciate, if not, then it proceeds with the code
	guess.forEach(function(currentValue, index){ //adds your current guess to the page
		if (index == 0){ //each guess should have its own row
			$( "#results" ).append("<div class='row'>")
			$( "#results" ).append( "<div class='col-xs-offset-4 col-xs-1 rounded-border unselectable' style='background-color:"+currentValue+"; color:"+currentValue+"'>"+ currentValue + "</div>" );
		};
		if (index !=0){
		$( "#results" ).append( "<div class='col-xs-1 rounded-border unselectable' style='background-color:"+currentValue+"; color:"+currentValue+"'>"+ currentValue + "</div>" );
		}

	});
	$( "#results" ).append("<div class='col-xs-3'><div class='col-xs-12' style='border-top: 1px solid black;'>correct positions: " +currentResult.correctPlace + "</div><div class='col-xs-12'>correct colors: " + currentResult.correctColour + "</div></div>" )

	numOfAttempts++ // cunting the numbers of attemps
	attempts(); //calls function that inputs the new number of attempts
	console.log(numOfAttempts);


	if (numOfAttempts == 10){
		alert("You've used all your attempts, the correct combination was " + computerSelectedColours[0] + ", " + computerSelectedColours[1] + ", " + computerSelectedColours[2] + ", "  + computerSelectedColours[3] );
		$("#try").prop("disabled", true );
		}
	allGuesses.push(guess);//pushes this rounds gusses into a single array

console.log(currentResult.correctColour);
console.log(currentResult.correctPlace);
console.log(allGuesses);
};
duplicate = false;
});

$("#start").click(function() { //reloads the page

	location.reload(); 
});


});