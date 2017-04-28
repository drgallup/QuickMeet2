
//BoxGenerator.js
//draws a box given start and end times as well as the start and end days
//takes these times from the findLocation() function in coordinateTracker.js
//Isaac
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

function drawBox(tStart, tEnd, dStart, dEnd){
    
    /*NOTES FOR DB: tStart and tEnd are the FIRST and LAST indeces in the array hourTemp calculated in the findlocation() function in coordinateTracker.js. (example: if you click from 7:00am to 8:00am, hourTemp = [0,1,2,3,4,5,6,7])*/
    /* dStart and dEnd are simply the FIRST and LAST indeces of the array dayTemp from the findlocation() funciton in coordinateTracker.js. (example: if you click from Sunday to Tuesday, dayTemp = [0,1,2])*/

    
    //console.log("tStart is " + tStart);
    
    for(var i = 0; i < tStart.length; i++){
        
        
        
        //starting x coordinate is determined by the day first clicked on.
        var X_coordinate = dStart[i]*tileWidth+tileWidth;
        //starting y coordinate is determined by the time first clicked on.
        var Y_coordinate = (tStart[i]*height/84);
        //width is change in days times the width of the tile + 1
        var Width = ((dEnd[i]-dStart[i])*tileWidth)+tileWidth;
        //length is the difference in times
        var Length = ((tEnd[i]-tStart[i])*tileHeight/7);
        //console.log("Y coor" + Y_coordinate);

        ctx.fillStyle = "rgba(128,0,0,0.5)";
        ctx.fillRect(X_coordinate, Y_coordinate, Width, Length);

    }
    
}
