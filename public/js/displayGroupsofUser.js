/*
Input: nothing, just call this
Output: table appended to body
This how to generate a list of groups the user is part of
*/
function displayGroups()
{
    var link = window.location.href.split("username=");
    var userName = link[1];
    var x = getGroupForUser(userName, displayArrayAsTable);
}


/*
Input: an array of group id's
Output: list of group id's formatted to add to the html body
This how to add a list of groups to html body 
*/
function displayArrayAsTable( groupArray) {
        
    var table = document.createElement('table');
    var row = document.createElement('row');
    console.log(groupArray);
    var td = document.createElement('td');
    td.innerHTML = "Group(s): ";
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