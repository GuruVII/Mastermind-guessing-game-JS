

var colours = ["red", "blue", "yellow", "orange", "brown", "green"]; //all the usable colors

//the computer selects the colours
function selectColour(){
	var randomMultiplier = 6;
	var computerSelectedColours = [];

	for (var i = 0; i < 4; i++){
	var computerSelectColourIndex = Math.floor((Math.random() * randomMultiplier )); 
	computerSelectedColours.push(colours[computerSelectColourIndex]); //adding a colour from the colours array to the selected colours, using the randomly generated index
	colours.splice(computerSelectColourIndex, 1); // removing the randomly selected colour from the colours array
	randomMultiplier -- //reducing the randomMultiplier to account for the now smaller colours array
	}
	return computerSelectedColours
}
console.log(selectColour());


function colourGuessing(){

}