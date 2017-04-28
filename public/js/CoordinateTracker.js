// --------------------------------------------------------------------
// //  CoordinateTracker.js
// //  Track the x,y coordinate when mouse click event happen on canvas
// //
// //  Version 0.8 - Nathan, 2/20/17
// //  -Add event listener on Canvas for click
// //  -Detects the day, added CSS file and moved some things.
// //  -Detects and alerts day and time range that the user has selected
// //  -Fixed dragging issues for box
// //
// //  Version 1.1 - Dylan, 2/23/17
// //  - Added tooltips
// //  - Added 10 minute interval on time
// // --------------------------------------------------------------------

// ~~~~~~~~~~~~~~~~
// Variables

var day = [ 100, 200,
            300, 400,
            500, 600,
            700, 800 ];

// will be filled with the pixel locations of the intervals used (currently 10 minutes)
var hour = [];

var currentDataSet = [];

var canvas, startX, endX, startY, endY, maxX, maxY;
var mouseIsDown = false;

var can = document.getElementById('myCanvas'),
    canLeft = can.offsetLeft,
    canTop = can.offsetTop,
    context = can.getContext('2d');

//get the calendar owner's name
/*if (getParameterByName("username") != null) {
    user = getParameterByName("username");
    console.log(user);
}*/

//create these 4 array to store calendar's events data
//Already defined in setup
var btimeStart = [];
var btimeEnd = [];
var bdayStart = [];
var bdayEnd = [];

doAll();
var currentUser = window.location.href.split("username=");
var allData = getCalbyUser(currentUser[1],startUpload);
console.log("all data: "+    allData); 
//drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
console.log(btimeEnd);

//xdrawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
//get the calendar owner's all events, and then draw the box
function startUpload(allData){

    btimeStart = allData[0].split(',');
    btimeEnd   = allData[1].split(',');
    bdayStart  = allData[2].split(',');
    bdayEnd    = allData[3].split(',');
    
    console.log(btimeEnd);
    console.log(btimeStart);


    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);

}
//console.log(jsonData);




// ~~~~~~~~~~~~~~~~
can.addEventListener('mousedown', mouseDown, false);
can.addEventListener('mousemove', mouseMove, false);
can.addEventListener('mouseup', mouseUp, false);


//Continue off from the setup script, load the user's data and draw


// tooltip
// http://stackoverflow.com/questions/15702867/html-tooltip-position-relative-to-mouse-pointer
var tooltipSpan = document.getElementById('tooltip-span');

/*window.onmousemove = function (e) {
    var x = e.clientX,
        y = e.clientY;
    tooltipSpan.style.top = (y + 20) + 'px';
    tooltipSpan.style.left = (x + 20) + 'px';
};*/

hourChange();
// hourChange generates the pixel area of each hour
function hourChange(){
  var tempHeight = 400/(rows*7);
  for(var i=0; i<=(rows*7); i++){
    hour.push( i*tempHeight );
  }
}


// Updates coordinates to generate box
function mouseUp(eve) {
	//var deletion = document.getElementById('deleteswitch').checked;
    if (mouseIsDown != false) {
        mouseIsDown = false;
        //var pos = getMousePos(canvas, eve);
        //endX = pos.x;
        //endY = pos.y;
        //drawSquare(); 
    }
    //console.log("Inside mouseup");
    ctx.clearRect(0,0,c.width,c.height);
    drawGrid();
   // if(deletion==false){
      findLocation();
    /*}
    if(deletion==true){
      findDeletion();
    }*/
    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
}

// Tracks user's initial click
function mouseDown(eve) {
    
    mouseIsDown = true;
    var pos = getMousePos(canvas, eve);
    startX = endX = pos.x;
    startY = endY = pos.y;
    maxX = startX;
    maxY = startY;
}

var toolX;
var toolY;
// Tracks user's drag
function mouseMove(eve) {
    ctx.clearRect(0,0,c.width,c.height);
    drawGrid();
    // mouse position 
    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
    var pos = getMousePos(canvas, eve);

    // do drag box
    if (mouseIsDown !== false) {
        endX = pos.x;
        endY = pos.y;
        if(endX>maxX || endY>maxY){
        	ctx.clearRect(0,0,c.width,c.height);
    		drawGrid(); 
            drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
        	maxX=endX;
        	maxY=endY;
        }
        if(endX<maxX || endY<maxY){
   	 	ctx.clearRect(0,0,c.width,c.height);
    	drawGrid();
            drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
        	maxX = endX;
        	maxY = endY;

        }
        drawSquare();
    }
    
    // tooltip:
    
    // current time
    // figure out which hours were selected
    var tipDisplay;
    for (var i = 0; i<hour.length-1; i++){
      if( hour[i] <= pos.y && pos.y < hour[i+1] ){
        tipDisplay = timeCalc(i);
      }
    }
    
    // change tipDisplay to standard time
    if(tipDisplay > 1250){
      tipDisplay -= 1200;
    }else if(!tipDisplay){
      tipDisplay = 700;
    }
    
    // change the size of the tooltip based on the length of the string
    if(tipDisplay >= 1000){
      toolX = [pos.x - 50, pos.x - 8];
    }else if (tipDisplay < 1000){
      toolX = [pos.x - 44, pos.x - 8];
    }
    toolY = [pos.y, pos.y+20];
    if(toolY[1] > 350){
      toolY[0] -= 20;
      toolY[1] -= 20;
    }
    
    // box
    //ctx.fillStyle = "rgba(30,30,30,1)";
    //roundRect(ctx, toolX[0], toolY[0], toolX[1]-toolX[0], toolY[1]-toolY[0], 2, true, false)
    ctx.beginPath();
    ctx.fillStyle = "rgba(30,30,30,1)";
    ctx.fillRect(toolX[0], toolY[0], toolX[1]-toolX[0], toolY[1]-toolY[0]);
    ctx.lineWidth = 1;
    
    // add the colon
    tipDisplay = addColon(tipDisplay);
    
    // text
		ctx.font = "14px Palatino";
		ctx.fillStyle = 'white';
		ctx.fillText(tipDisplay,toolX[0]+4,toolY[1]-5);
    
    
}

// Draws live rendering box
function drawSquare() {
    // creating a square
    var w = maxX - startX;
    var h = maxY - startY;
    var offsetX = (w < 0) ? w : 0;
    var offsetY = (h < 0) ? h : 0;
    var width = Math.abs(w);
    var height = Math.abs(h);
               
    ctx.beginPath();
    ctx.fillStyle = "rgba(128,0,0,1)";
    ctx.fillRect(startX + offsetX, startY + offsetY, width, height);
    ctx.lineWidth = 1;
   
}

function getMousePos(canvas, evt) {
    var rect = can.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function findDeletion(){
    
  var dayTemp = [];
  var hourTemp = [];  
    
  for (var i = 0; i<day.length-1; i++){
    if( day[i] < startX && startX < day[i+1] ){
      dayTemp.push(i);
    }else if( startX < day[i] && day[i+1] < endX ){
      dayTemp.push(i);
    }else if( day[i] < endX && endX < day[i+1] ){
      dayTemp.push(i);
    }
  }

  for (var i = 0; i<hour.length-1; i++){
    if( hour[i] < startY && startY < hour[i+1] ){
      hourTemp.push(i);
    }else if( startY < hour[i] && hour[i+1] < endY ){
      hourTemp.push(i);
    }else if( hour[i] < endY && endY < hour[i+1] ){
      hourTemp.push(i);
    }
  }
    
  var timeStart = hourTemp[0];
  var timeEnd = hourTemp[hourTemp.length-1];

    
  var dayStart = dayTemp[0];
  var dayEnd = dayTemp[dayTemp.length-1];
  var counter = 0;

  for (a = btimeStart.length-1; a>=0; a--) {
        if((btimeStart[a]<=timeStart) && (timeEnd<=btimeEnd[a]) && (bdayStart[a]<=dayStart) && (dayEnd<=bdayEnd[a])){

            //alert(a + " true");
            post_data("/QuickMeet/default/api/" + user + "/1/" + ".json", btimeStart[a], btimeEnd[a], bdayStart[a], bdayEnd[a]);


            btimeStart.splice(a,1);
            btimeEnd.splice(a,1);
            bdayStart.splice(a,1);
            bdayEnd.splice(a,1);
            counter = counter + 1;
            ctx.clearRect(0,0,c.width,c.height);
            drawGrid();
            drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd); 
            console.log("Deleted");
            break;
        } 
    }
}

function findLocation (){
  // figures out which hours on the calendar have been selected
  var dayTemp = [];
  var hourTemp = [];
  // figure out which days were selected
  for (var i = 0; i<day.length-1; i++){
    if( day[i] < startX && startX < day[i+1] ){
      dayTemp.push(i);
    }else if( startX < day[i] && day[i+1] < endX ){
      dayTemp.push(i);
    }else if( day[i] < endX && endX < day[i+1] ){
      dayTemp.push(i);
    }
  }
    
  // figure out which hours were selected
  for (var i = 0; i<hour.length-1; i++){
    if( hour[i] < startY && startY < hour[i+1] ){
      hourTemp.push(i);
    }else if( startY < hour[i] && hour[i+1] < endY ){
      hourTemp.push(i);
    }else if( hour[i] < endY && endY < hour[i+1] ){
      hourTemp.push(i);
    }
  }

  //setting variables for one instance of drawBox()
  var timeStart = hourTemp[0];
  var timeEnd = hourTemp[hourTemp.length-1];

      
  var timeCalcStart = (hourTemp[0]);
  var timeCalcEnd = (hourTemp[hourTemp.length-1]);
    
  var dayStart = dayTemp[0];
  var dayEnd = dayTemp[dayTemp.length-1];
    
  
  console.log("Busy from " + timeCalc(timeStart) + " to " + timeCalc(timeEnd)+ " " + dayMap(dayStart) + " through " + dayMap(dayEnd));
  //post
  //console.log("Before posting"); 
  //post_data("/QuickMeet/default/api/"+ user +".json", timeStart, timeEnd, dayStart, dayEnd);
  //post_data("/QuickMeet/default/api/"+ user + "/0" +".json", timeStart, timeEnd, dayStart, dayEnd);
  
  //test add to database
  //drawBox([3], [80], [3],[4]);
  doAll();
  currentUser = window.location.href.split("username=");
    
  console.log(currentUser[1]);
    
  addUserCal(currentUser[1], timeCalcStart, timeCalcEnd, dayStart, dayEnd);

  console.log("Posted data");
  showUsers();
  
  //passing variables from local to global for use in drawBox()
    
  if(timeStart == null){
      btimeStart.push(0);
  }else{
      btimeStart.push(timeStart);
  }
  if(timeEnd == null){
      btimeEnd.push(0);
  }else{
      btimeEnd.push(timeEnd);
  }
  bdayStart.push(dayStart);
  bdayEnd.push(dayEnd);
  return btimeStart, btimeEnd, bdayStart, bdayEnd;

}

// maps the hour selected to the time displayed
function timeCalc(x){
  return (Math.floor(x/7)*100 + (x%7 < 6 ? x%7 : 10)*10 + 700);
}

// adds a colon on to a time, returns a string
function addColon(x){
  var temp = x.toString();
  var tempArray = [];
  // walk through each number and separate them into the array
  for (var i = 0, len = temp.length; i < len; i ++) {
    tempArray.push(+temp.charAt(i));
  }
  var output = '';
  if(tempArray.length===3){
    output += tempArray[0];
    output += ':';
    output += tempArray[1];
    output += tempArray[2];
  }else if(tempArray.length===4){
    output += tempArray[0];
    output += tempArray[1];
    output += ':';
    output += tempArray[2];
    output += tempArray[3];
  }
  //console.log(output);
  return output;
}

// maps the days to strings
function dayMap(x){
  switch(x){
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Error: Invalid Day";
  }
}

/*
//link the 'CREATE GROUP' button in the main page, redirect user to group calendar
function group(){
        window.location.href = "/QuickMeet/default/group?"+"username="+user
}*/

