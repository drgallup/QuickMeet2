//link the 'CREATE GROUP' button in the main page, redirect user to group calendar
function group(){
        console.log("fubar");
        var groupName = document.getElementById("name").value;
        createGroup(groupName);
        //good for LOCAL HOSTING
        window.location.href = "/public/group.html?"+"groupName="+groupName;
        //good for live version
        //window.location.href = "/group.html?"+"groupName="+groupName;
        
}
function userRedirect(){
        console.log("fubar");

        var username = document.getElementById("name").value;
    
        doAll();
        createUser();
        //var link = window.location.href.split("username=");
        //var username = link[1];
        //good for LOCAL HOSTING
        console.log(username);
        setTimeout(
            function(){
                window.location.href = "/public/index.html?"+"username="+username;
                doAll();
                console.log("we are in it: "+username);}
            ,1000);
        
        //good for REMOTE HOSTING
        //window.location.href = "/index.html?"+"username="+username;
        //doAll();
       // setTimeout(1000);
       // readUserData();
        //JSONtoUSER();
        //showUsers();
          
}
