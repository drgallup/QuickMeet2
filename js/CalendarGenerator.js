// --------------------------------------------------------------------
//  CalendarGenerator.js
//  generates the calendar for quick calendar
//
//  Version 0.4 - Nathan, 10am, 2/3/17
//  - Loads canvas from index.html
//  - Makes it 2d
//  - Draws grid
//  - Indents Calendar for room for times
//  - Fixed time colors
// --------------------------------------------------------------------

// get the canvas we are working on
// it's global so it can be called in functions
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Gets canvas width and height
var width = myCanvas.width-100,
    height = myCanvas.height;

//Predefined number of rows and columns
var columns = 7,
	rows = 12;

//Gets size of each cell
var tileWidth = width / columns,
	tileHeight = height / rows;

function findTime(test){
	var foo = Math.round(test / tileHeight)+8;
	if(foo<12){		
		return foo +"AM";
	}
	if(foo == 12){
		return foo + "PM";
	}
	else{
		return foo-12 + "PM";
	}
}

//Draws grid
function drawGrid(){
	for (var x = 0; x-1<=width; x+=tileWidth){
		ctx.moveTo(x+100,0);
		ctx.lineTo(x+100,height);
	}

	for (var y = 0; y-1<=height; y+=tileHeight){
		ctx.moveTo(100,y);
		ctx.lineTo(width+100,y);
		ctx.font = "14px Palatino";
		ctx.fillStyle = 'black';
		ctx.fillText(findTime(y),0,y+tileHeight);
	}
	ctx.strokeStyle = "black";
	ctx.stroke();
}

drawGrid();
