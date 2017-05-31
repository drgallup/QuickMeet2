/*
Input: nothing, just call this
Output: table appended to body
This how to generate a list of groups the user is part of
*/
var listGroups;
function displayGroups()
{
    var link = window.location.href.split("username=");
    var userName = link[1];
    var x = getGroupForUser(userName, setGroupList);
}
/*
Input: nothing 
Output: list of group id's 
Needed because callbacks
*/
function getGroupList()
{
    return listGroups;
}

/*
Input: an array of group id's
Output: list of group id's 
Needed to add list of groups 
*/
function setGroupList(groupArray) 
{
    listGroups = groupArray;
}

