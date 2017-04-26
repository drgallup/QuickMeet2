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
        post_data("/QuickMeet/default/api/"+ user +"/1" +".json", a, b, c, d);
        // do sql push
        //delete_data("/QuickMeet/default/api/username.json", btimeStart.pop(), btimeEnd.pop(), bdayStart.pop(), bdayEnd.pop());
        //get_data("/QuickMeet/default/api/username.json");
        
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
