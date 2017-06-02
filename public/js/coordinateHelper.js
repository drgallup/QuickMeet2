// coordinateHelper.js
// Takes functions from coordinateTracker that shouldn't change
// and stores them for use.

/**********************************************************************

                        Functions for Drawing

***********************************************************************/

// drawTooltip()
// input:  local pos (position of mouse)
//         global hour[], toolX, toolY
// output: void, tooltip displayed on canvas
// draws the tooltip with time hovered over in it
function drawTooltip(pos){     
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

// input: global startX, startY, maxX, maxY.
// output: void, rectangle from start point to current point
//         on canvas
// Draws live rendering selection box.
function drawSelector() {
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

/**********************************************************************

                  Functions for Altering Data

***********************************************************************/

// input:  null
// output: new user, redirection to user page
// necessary for calling both functions at once on login submit.
function newUserCreation(){
  GLOBALUserName = document.getElementById("name").value;
  setTimeout(createUser,100);
  setTimeout(userRedirect,200);
}
//working properly, finally
function returningUserCreation(){
    setTimeout(readUserData,100);
    setTimeout(JSONtoUSER,200);
    setTimeout(userRedirect,300);
}

function newGroupCreation(){
  GLOBALGroupName = document.getElementById("name").value;
  setTimeout(createGroup,100);
  setTimeout(groupRedirect,200);
  setTimeout(GROUPtoJSON,300)
  setTimeout(writeGroupData,400);
}

function returningGroupCreation(){
    console.log("returning group creation");
    setTimeout(readGroupData,100);
    setTimeout(JSONtoGROUP,200);
    setTimeout(function(){
        var link = window.location.href.split("groupName=");
            var groupName = link[1];
            console.log("groupname:"+ groupName);
            getUsersInGroup(groupName, loadGroupAnew);
            resetData();
            console.log();
        
    },1000);
    setTimeout( function(){
                           getUserTimesInGroup(groupName, startGroupUpload);
                          }, 2000);
    /*
    setTimeout(readGroupData,100);
    setTimeout(JSONtoGROUP,200);
    setTimeout(function(){
            var link = window.location.href.split("groupName=");
            var groupName = link[1];
            getUserTimesInGroup(groupName, startGroupUpload)
                    
    },300);*/
    //setTimeout(groupRedirect,300);
}

// input: day, 0-6
// output: String of the day eg. 1 = "Monday"
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

// input: pixel location in y.
// output: hour in int eg. 600 for 6:00
// maps the hour selected to the time displayed
function timeCalc(x){
  return (Math.floor(x/7)*100 + (x%7 < 6 ? x%7 : 10)*10 + 700);
}

// input: integer representation of military time, eg. 600
// output: string with colon inserted, eg. 6:00
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

// input: local canvas object, mouse event
// output: x and y positions of the mouse on the canvas
// gets the position of the mouse and returns it
function getMousePos(can, evt) {
    var rect = can.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}