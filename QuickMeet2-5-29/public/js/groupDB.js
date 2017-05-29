


function createGroupTable(){
    db.transaction(function(tx){
        tx.executeSql("create table GROUPTABLE (groupName TEXT UNIQUE, users TEXT)"
                      ,[],function(result){
        alert("created group table: "+ result);
        });    
    });
}


function createGroup(){
    doAll();
    var users = " ";
    var groupName = document.getElementById("name").value;
    db.transaction(function(tx){
        tx.executeSql("insert into GROUPTABLE values(?,?)", 
                      [groupName,users]);
        alert("New Group: " +groupName+ " has been made");

    });
    showGroups();
}
/* Expected to return string of users. must be split(',') elsewhere
Usage: getUserTimesInGroup("group3",startGroupUpload);
Output: Draw boxes for all user times.
Problem: as soon as you hover over box, it disapears.
*/ 
function getUserTimesInGroup(groupname,callback){
    var result;
 	var userArray;
     db.transaction(function(tx){
         console.log(tx);
         tx.executeSql("SELECT users FROM GROUPTABLE WHERE groupName = '"+groupname+"'", [], function(tx,result){
 							
 				var length = result.rows.length;
				if(length > 0)
				{
					var row = result.rows.item(0);
					userArray = row['users'];
				}
 				
				if(callback){
					userArray =  callback(userArray);
/* 					console.log("here");
					console.log(userArray); */
					return userArray;
				}
  
         });
 
 		
     });  
}
/*
Usage: remove userName from groupName in table
Input: removeUserFromGroup("userName","groupName")
Output: removes userName from field of users of that groupName in table
*/
function removeUserFromGroup(userName,groupName){
	
	var realUsers;
	var updatedUsers;
	    db.transaction(function(tx){
        tx.executeSql("SELECT users FROM GROUPTABLE WHERE groupName = '"+groupName+"'", [], function(tx,result){
				
				var rlength = result.rows.length;
				if(rlength > 0){
					var row = result.rows.item(0);
					updatedUsers = row['users'].split(',');
					
					for(var x = 0; x < updatedUsers.length; x++){

						if(userName == updatedUsers[x]){
							realUsers = updatedUsers.splice(x,1);
						}
/* 						console.log(updatedUsers + "    her2\n");
						console.log(realUsers + "       real2\n"); */
					}
					
				}

        });
    });
	db.transaction(function(tx){
        tx.executeSql("UPDATE GROUPTABLE SET users   = '"+ updatedUsers +"' \
                                            WHERE groupName ='"+ groupName+"'");
        });
		showGroups();
}
function deleteGroup(groupname){
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM GROUPTABLE WHERE groupName = '"+groupname+"'");
    });
        console.log("We are in delete group");
        showGroups();
}
function deleteAllGroups(){
    db.transaction(function(tx){
        tx.executeSql("DELETE FROM GROUPTABLE");
    });
    console.log("Group table cleared");
    showGroups();
}
function addUserToGroup(username,groupname){
    var flag = 0;
    var moduser = username;
    db.transaction(function(tx){
			tx.executeSql("SELECT users FROM GROUPTABLE WHERE groupName = '"+groupname+"'", [], function(tx,result){
                var row = result.rows.item(0);
                var times = row['users'].split(",");
                console.log(times.length);
                if(times.length != 0){
                    moduser = ","+username;
                }
                console.log(times.length);
                
                for(var i = 0; i < times.length; i++){
                    if(times[i] == username){
                        flag = 1;
                        alert("user:"+username+" already added to "+ groupname);
                        return; 
                    }
                }
                db.transaction(function(tx){
                    tx.executeSql("UPDATE GROUPTABLE SET users = users || '"+moduser+"' \
                                                        WHERE groupName = '"+groupname+"'");
                });
			});
			
		});
    

    showGroups();
}

function getUsersInGroup(groupname, callback){
	var userArray;
	db.transaction(function(tx){
         console.log(tx);
         result = tx.executeSql("SELECT users FROM GROUPTABLE WHERE groupName = '"+groupname+"'", [], function(tx,result){
 							
 				var length = result.rows.length;
				if(length > 0)
				{
					var row = result.rows.item(0);
					userArray = row['users'].split(',');
				}
 				
				if(callback){
					userArray =  callback(userArray);
					return userArray;
				}
  
         });
 
 		
     });  
}

function showGroups(){
    db.transaction(function(tx){
        tx.executeSql("SELECT groupName, users FROM GROUPTABLE", [], function(tx,result){
            for(var i = 0; i< result.rows.length;i++){
                var row = result.rows.item(i);
                console.log(row['groupName']+"  "+row['users']);
            }
        });
    });
}


function doGroup(){
    openUserDatabase();
    createGroupTable();
    createGroup("group2");
    showGroups();
}