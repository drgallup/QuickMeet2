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
// Global Variables

// array filled with pixel locations of days used.
var day = [ 100, 200,
            300, 400,
            500, 600,
            700, 800 ];

// will be filled with the pixel locations of the intervals used (currently 10 minutes)
var hour = [];

var currentDataSet = [];

var startX, endX, startY, endY, maxX, maxY;
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
//to associate each index in the  array with a user
var colornumarr = [];
var userNum = 0;// differentiate users
doAll();
var currentUser = window.location.href.split("username=");
var allData = getCalbyUser(currentUser[1],startUpload);
console.log("all data: "+    allData); 
//drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
console.log(btimeEnd);

//xdrawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
//get the calendar owner's all events, and then draw the box
function startUpload(allData){
	if(allData == 0 || allData == undefined){
		return;
	}
    btimeStart = btimeStart.concat(allData[0].split(','));
    btimeEnd   = btimeEnd.concat(allData[1].split(','));
    bdayStart  = bdayStart.concat(allData[2].split(','));
    bdayEnd    = bdayEnd.concat(allData[3].split(','));
	for(var userNumIndex = 0; userNumIndex < btimeStart.length; userNumIndex ++){
		colornumarr.push(userNum);
		console.log(userNum);
	}
    //colornumarr.push(bdayEnd.length);
	userNum++;
    console.log(btimeEnd);
    //console.log(btimeStart);

    setTimeout( drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd,colornumarr),100);


}

function resetData(){
	btimeStart = [];
    btimeEnd   = [];
    bdayStart  = [];
    bdayEnd    = [];
	colornumarr = [];
	userNum = 0;
	
}

function startGroupUpload(groupUserData){
	console.log("in callback");
	var usersInGroup = groupUserData.split(',');
	for(var m = 0; m < usersInGroup.length; m++){
		getCalbyUser(usersInGroup[m],startUpload);
		
	}
	userNum = 0;
}
//console.log(jsonData);


// ~~~~~~~~~~~~~~~~
can.addEventListener('mousedown', mouseDown, false);
can.addEventListener('mousemove', mouseMove, false);
can.addEventListener('mouseup', mouseUp, false);


//Continue off from the setup script, load the user's data and draw

// hourChange()
// input:  global rows (hours in calendar)
// output: global hour[] (initialized to pixel location of 1/7 each hour in calendar)
// generates the pixel area of each time
hourChange();
function hourChange(){
  var tempHeight = 400/(rows*7);
  for(var i=0; i<=(rows*7); i++){
    hour.push( i*tempHeight );
  }
}

// mouseUp()
// input:  local eve (mouse event)
//         global btimeStart, btimeEnd, bdayStart, bdayEnd
//                (arrays for current busy blocks)
//                mouseIsDown (tells function if mouse is down)
// output: global mouseIsDown (turns to false)
//                canvas updated with new time blocks
// Updates coordinates to generate box
function mouseUp(eve) {
	//var deletion = document.getElementById('deleteswitch').checked;
    if (mouseIsDown != false) {
        mouseIsDown = false;
        //var pos = getMousePos(canvas, eve);
        //endX = pos.x;
        //endY = pos.y;
        //drawSelector(); 
    }
	colornumarr.push(0);
    //console.log("Inside mouseup");
    ctx.clearRect(0,0,c.width,c.height);
    drawGrid();
    // test for the delete switch
   if(angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().data.cb1==false){
      findLocation();
   } else
    if(angular.element(document.querySelector('[ng-controller="AppCtrl"]')).scope().data.cb1==true){
      findDeletion();
    }
    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd,colornumarr);
}

// mouseDown(eve)
// input:   local eve (mouse event)
// output:  global startX, startY, endX, endY,
//          maxX, maxY. All set to mouse position at call time
// Tracks user's initial click
function mouseDown(eve) {
    
    mouseIsDown = true;
    var pos = getMousePos(can, eve);
    maxX = startX = endX = pos.x;
    maxY = startY = endY = pos.y;
}

// global tooltip variables used in drawTooltip (coordinateHelper.js)
var toolX;
var toolY;

/*  mouseMove(eve)
    
    input:  local eve (mouse move event), 
            global btimeStart, btimeEnd, bdayStart, bdayEnd 
                  (arrays for current busy blocks)
                  
    output: void, tooltip, live rendering selection box
    
    functions called: drawGrid, drawBox, drawSelector, 
                      drawTooltip, getMousePos
                      
    Tracks user's drag                                        */
function mouseMove(eve) {
    ctx.clearRect(0,0,c.width,c.height);
    drawGrid();
    // mouse position 
    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd,colornumarr);

    var pos = getMousePos(can, eve);

    // do drag box
    if (mouseIsDown !== false) {
        endX = pos.x;
        endY = pos.y;
        if(endX>maxX || endY>maxY){
        	ctx.clearRect(0,0,c.width,c.height);
    		drawGrid(); 
            drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd,colornumarr);
        	maxX=endX;
        	maxY=endY;
        }
        if(endX<maxX || endY<maxY){
   	 	ctx.clearRect(0,0,c.width,c.height);
    	drawGrid();
            drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd, colornumarr);
        	maxX = endX;
        	maxY = endY;

        }
        drawSelector();
    }
    drawTooltip(pos);
}

// input:  mouse out of canvas
// output: redraw canvas without tooltip
// removes tooltip when user navigates away from canvas
can.onmouseout = function () {
  ctx.clearRect(0,0,c.width,c.height);
  drawGrid();
  drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd, colornumarr);
}

// findDeletion()
// input:   global variables startX, startY, endX, endY (mouse pos)
//          day[] (pixel map for days), hour[] (pixel map for times)
// output:  local void, global updates to database
// Maps the location of the mouse to a set of days and times
// then removes that data from the server and calendar.
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
            //// push delete
            var link = window.location.href.split("username=");
            var userName = link[1];
            removeUserCal(userName, btimeStart[a], btimeEnd[a], bdayStart[a], bdayEnd[a]);
            //post_data("/QuickMeet/default/api/" + user + "/1/" + ".json", btimeStart[a], btimeEnd[a], bdayStart[a], bdayEnd[a]);

            
            btimeStart.splice(a,1);
            btimeEnd.splice(a,1);
            bdayStart.splice(a,1);
            bdayEnd.splice(a,1);
            counter = counter + 1;
            ctx.clearRect(0,0,c.width,c.height);
            drawGrid();
            console.log("Deleted");
            return btimeStart, btimeEnd, bdayStart, bdayEnd; 
        }
    }
}

// input:   global variables startX, startY, endX, endY (mouse pos)
//          day[] (pixel map for days), hour[] (pixel map for times)
// output:  local void, global updates to database
// Maps the location of the mouse to a set of days and times
// then pushes that data to the server and calendar.
// NOTE: could combine findLocation and findDeletion
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
  
  setTimeout(USERtoJSON,100);
  setTimeout(writeUserData, 200);
  
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


