// --------------------------------------------------------------------
//  Undo.js
//  detects ctrl z and deletes previous addition
//
//  created 2/1/17, 6pm by Dylan
// --------------------------------------------------------------------

var control = false;

// detects pressing of a key.
// can be used to add functions for other keys.
document.onkeydown = function(evt) {
  switch(evt.keyCode){
    case 17:
      // ctrl pressed
      control = true;
      break;
    case 90:
      // z pressed, is ctrl still pressed?
      if(control){
        // delete the last element,
        var a = btimeStart.pop();
        var b = btimeEnd.pop();
        var c = bdayStart.pop();
        var d = bdayEnd.pop();
        
        // push delete
        var link = window.location.href.split("username=");
        var userName = link[1];
        removeUserCal(userName, a, b, c, d)
        
        // redraw the calendar
        ctx.clearRect(0,0,c.width,c.height);
        drawGrid();
        drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
      }
      break;
  }
}

// removes control boolean on release
document.onkeyup = function(evt) {
  switch(evt.keyCode){
    case 17:
      control = false;
      break;
  }
}
