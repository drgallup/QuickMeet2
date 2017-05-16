//link the 'CREATE GROUP' button in the main page, redirect user to group calendar
function group(){
        var groupName = document.getElementById("name").value;
        createGroup(groupName);
        window.location.href = "/public/group.html?"+"groupName="+groupName;
        
}
function userRedirect(){
        var username = document.getElementById("name").value;
        //good for LOCAL HOSTING
        window.location.href = "/public/index.html?"+"username="+username;
        //good for REMOTE HOSTING
        //window.location.href = "/index.html?"+"username="+username;

        console.log(username);
        
}
