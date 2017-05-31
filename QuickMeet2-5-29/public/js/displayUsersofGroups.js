/*
Input: nothing, just call this
Output: table appended to body
This how to generate a list of users the group has
*/
function displayUsers()
{
    var link = window.location.href.split("groupName=");
    var groupName = link[1];
    var x = getUsersInGroup(groupName, displayArrayAsTable);
}


/*
Input: an array of user id's
Output: list of user id's formatted to add to the html body
This how to add a list of users to html body 
*/
function displayArrayAsTable( groupArray) {
        
    var table = document.createElement('table');
    var row = document.createElement('row');
    console.log(groupArray);
    var td = document.createElement('td');
    td.innerHTML = "Users: ";
    row.appendChild(td);
    for ( var x = 0; x < groupArray.length; x++ ) 
    {
        var td = document.createElement('td');
        td.innerHTML = groupArray[x];
        row.appendChild(td);
    }

    table.appendChild(row);
    table.align = "center";
    table.border = .5;
    //table.style.borderStyle = solid;
    //table.style.borderColor = "FF0000 blue";
    document.body.appendChild(table);
    return table;
}