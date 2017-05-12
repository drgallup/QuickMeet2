


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

function getUserTimesInGroup(groupname){
    
}

function removeUserFromGroup(username){
    
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