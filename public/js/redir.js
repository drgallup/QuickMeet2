//link the 'CREATE GROUP' button in the main page, redirect user to group calendar
function groupRedirect(){
        console.log("fubar");
        var groupName = GLOBALGroupName;
        //good for LOCAL 
        window.location.href ="/group.html?"+"groupName="+groupName;
        //good for live version
        //window.location.href = "/group.html?"+"groupName="+groupName;
        setTimeout(getUserTimesInGroup(groupName, startGroupUpload),time10);
        setTimeout(getUserTimesInGroup(groupName, startGroupUpload),time20);
}
function userRedirect(){
        
        var username = GLOBALUserName;
        doAll();
        //createUser();
        //var link = window.location.href.split("username=");
        //var username = link[1];
        //good for LOCAL HOSTING
        console.log(username);
        setTimeout(
            function(){
                window.location.href = "/index.html?"+"username="+username;
                doAll();
                console.log("we are in it: "+username);}
            ,time1);
        console.log("fu bard"); 
        //good for REMOTE HOSTING
        //window.location.href = "/index.html?"+"username="+username;
        //doAll();
       // setTimeout(1000);
       // readUserData();
        //JSONtoUSER();
        //showUsers();
          
}
