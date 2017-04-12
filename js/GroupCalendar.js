//get the username
var user = getParameterByName("username")

//create array to store the events, days is a [][] array
var btimeStart = []
var btimeEnd = []
var bdayStart = []
var bdayEnd = []

//Http 'get' method, store the data in 4 array, and draw box of calendar owner
get_Data("/QuickMeet/default/api/"+ user +".json",function(data){
    var jsonData = JSON.parse(data);
    for (var i = 0; i < jsonData.length; i++) {
        btimeStart.push(jsonData[i].startTime)
        btimeEnd.push(jsonData[i].endTime)
        bdayStart.push(jsonData[i].days[0])
        bdayEnd.push(jsonData[i].days[jsonData[i].days.length -1])
    }
    drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
} )

//generate the First name of Member which is calendar owner
$('#list').html('<li>' + user + '</li>');

//store all the user in this array
var groupMember = []







//the function to add member to group calendar
function add() {
          console.log('add memeber');
          var newUser = $('#member').val();
          console.log('new user is ', newUser);
          if($.inArray(newUser, groupMember) !== -1){
              alert("the user  " + newUser + "  is already in the group!");
              return
          }
//get the newUser's data, and store the data in temporary
          $.get("/QuickMeet/default/api/"+ newUser +".json", function(realData) {
            var newTimeStart = []
            var newTimeEnd = []
            var newdayStart = []
            var newdayEnd = []
            for (var i = 0; i < realData.length; i++) {
                newTimeStart.push(realData[i].startTime)
                newTimeEnd.push(realData[i].endTime)
                newdayStart.push(realData[i].days[0])
                newdayEnd.push(realData[i].days[realData[i].days.length -1])
            }
            drawBox(newTimeStart, newTimeEnd, newdayStart, newdayEnd);
            groupMember.push(newUser);
              console.log(groupMember)
//auto append all the name of group member
            var str = $('#list').html();
          $('#list').html(str + '<li>' + newUser + "<button type='button' onClick='deleteMember(this)'>delete</button>" + '</li>');
          })
      }


//after delete a member, refresh all the page then reload the data
function refresh(){
        ctx.clearRect(0,0,c.width,c.height);
        drawGrid();
        drawBox(btimeStart, btimeEnd, bdayStart, bdayEnd);
        $('li').empty();
        $('#list').html('<li>' + user + '</li>');
        for(var i = 0; i < groupMember.length; i++){
          $.get("/QuickMeet/default/api/"+ groupMember[i] +".json", function(realData) {
            var newTimeStart = []
            var newTimeEnd = []
            var newdayStart = []
            var newdayEnd = []
            for (var i = 0; i < realData.length; i++) {
                newTimeStart.push(realData[i].startTime)
                newTimeEnd.push(realData[i].endTime)
                newdayStart.push(realData[i].days[0])
                newdayEnd.push(realData[i].days[realData[i].days.length -1])
            }
            drawBox(newTimeStart, newTimeEnd, newdayStart, newdayEnd);
          })
          var str = $('#list').html();
          $('#list').html(str + '<li>' + groupMember[i] + "<button type='button' onClick='deleteMember(this)'>delete</button>" + '</li>');
    }
}


//delete the group member
function deleteMember(ele){
    var clone = $(ele).parent().clone();
    clone.children().remove();
    var message = clone.text();
    removeByValue(groupMember, message);
    refresh();
}

//function to remove certain value in array
function removeByValue(arr, val) {
  for(var i=0; i<arr.length; i++) {
    if(arr[i] == val) {
      arr.splice(i, 1);
      break;
    }
  }
}


//return the calendar owner's edit page
function returnEdit(){
        var user = getParameterByName("username")
        window.location.href = "http://127.0.0.1:8000/Quickmeet/default/index?"+"username="+user
}


//function the get the owner's name
function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

//http 'POST' method
function post_data(URL, tStart, tEnd, dStart, dEnd){
    var x = new XMLHttpRequest();
    x.open('POST', URL, false);
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    x.send("timeStart=" + tStart + "&timeEnd=" + tEnd + "&dayStart=" + dStart + "&dayEnd=" + dEnd);
    //alert(x.responseText);
}

//http 'GET' method
function get_Data(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}
