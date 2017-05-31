//quickmeet2.0 public/db.js


var db = null;
var dataJSON = {"users":""};
/* input: void
   output: DB opened
   What it does: opens the USERTABLE
*/
function openUserDatabase(){
    db = openDatabase("users_group", "1.0", "Example", 200000);
}
/* input:void
   output: opened USERTABLE
   What it does: make USERTABLE if not already made
*/
function createUserTable(){
    db.transaction(function(tx){
        tx.executeSql("create table USERTABLE (userID REAL UNIQUE,  userName TEXT, bTimeStart TEXT, \
                                              bTimeEnd TEXT, bDayStart TEXT, bDayEnd TEXT, groupID TEXT)"
                      ,[],function(result){
        alert("created user table: "+ result);
    });
            
    });
}
/* input: takes input from text box on index.html
   output: edited USERTABLE
   What it does: creates a new user, makes sure the name is OK
*/
function createUser(){
    doAll();
    var userName = document.getElementById("name").value;
    //var link = window.location.href.split("username=");
    //var userName = link[1];
    var userID = genUserID();
    var bTimeStart ="";
    var bTimeEnd   ="";
    var bDayStart  ="";
    var bDayEnd    ="";
    var groupID    ="";
    if(userName.length < 4){
        alert("Username cannot be that short");
        return;
    }
    console.log("making new user:  " + userName);
    var length = 0;
    db.transaction(function(tx){
        tx.executeSql("SELECT userName FROM USERTABLE WHERE userName ='"+userName+"'", [], function(tx,result){
                length = result.rows.length;
                console.log(length);
                if(length > 0 ){
                    alert("Username: "+ userName +" already exists.\nIf you are "+userName+", click go to page.");
                }
        });

    });
    console.log(length);
        
    db.transaction(function(tx){
        if(length == 0){
            tx.executeSql("insert into USERTABLE values(?,?,?,?,?,?,?)", 
                          [userID, userName, bTimeStart,bTimeEnd, bDayStart, bDayEnd, groupID]);
            alert("New User: " +userName+ " has been made");
        }
    });
    showUsers();  
}
function loadUser(){
    doAll();
    console.log(loadedDB);
    var userName = loadedDB.users[0].userName;
    //var link = window.location.href.split("username=");
    //var userName = link[1];
    var userID     = loadedDB.users[0].userID;
    var bTimeStart = loadedDB.users[0].bTimeStart;
    var bTimeEnd   = loadedDB.users[0].bTimeEnd;
    var bDayStart  = loadedDB.users[0].bDayStart;
    var bDayEnd    = loadedDB.users[0].bDayEnd;
    var groupID    = loadedDB.users[0].groupID;
    db.transaction(function(tx){
        if(length == 0){
            tx.executeSql("insert into USERTABLE values(?,?,?,?,?,?,?)", 
                          [userID, userName, bTimeStart,bTimeEnd, bDayStart, bDayEnd, groupID]);
            alert("User: " +userName+ " has been loaded");
            userRedirect();
        }
    });
    showUsers();  
}
/* input: void
   output: uniqueID, extra field for identification
   What it does: generates a userID that is random and unique
*/
function genUserID(){
    var userID = Math.floor((Math.random() * 10000 ) + 1);

    db.transaction(function(tx){
        tx.executeSql("SELECT * userID FROM USERTABLE", [userID],function(tx,result){
    
            for(var i = 0; i < result.rows.length-1;i++){
                console.log("hello",i);
                var row = result.rows.item(i);
                if(row['userID'] == userID){
                    userID = Math.floor((Math.random() * 10000 ) + 1);
                    i=0;
                }
            }
        });
    });
    return userID;
}
/* input:void
   output: void
   What it does: displays USERTABLE to console
*/
function showUsers(){
    db.transaction(function(tx){
        tx.executeSql("SELECT userID, userName, bTimeStart, \
                       bTimeEnd, bDayStart, bDayEnd, groupID FROM USERTABLE", [], function(tx,result){
            for(var i = 0; i< result.rows.length;i++){
                var row = result.rows.item(i);
                console.log(row['userID'], row['userName'], row['bTimeStart'], row['bTimeEnd'], row['bDayStart'], row['bDayEnd'], row['groupID']);
            }
        });
    });
}
/* input:void
   output: wiped USERTABLE
   What it does: removes ALL users/their info
*/
function deleteAllUsers(){
    db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("DELETE FROM USERTABLE");
    });
    console.log("We are in deleteAllUsers");
    showUsers();

}
/* input:userName
   output: edited USERTABLE
   What it does: removes specific user from table
*/
function deleteUser(userName){
     db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("DELETE FROM USERTABLE WHERE userName = '"+userName+"'");
    });
        console.log("We are in deleteUser");
        showUsers();

}
/* input:userName,bTimeStart, bTimeEnd, bDayStart, bDayEnd
   output: edited USERTABLE
   What it does: adds specific timebox for specific user
*/
function addUserCal(username, bTimeStart, bTimeEnd, bDayStart, bDayEnd){
	db.transaction(function(tx){
			console.log(tx);
			tx.executeSql("SELECT bDayEnd FROM USERTABLE WHERE userName = '"+username+"'", [], function(tx,result){
                var row = result.rows.item(0);
                var times = row['bDayEnd'];
                console.log(times.length);
                
                if(times.length > 0 ){
                    bTimeStart =","   + bTimeStart;
                    bTimeEnd =	","   + bTimeEnd;
                    bDayStart = ","   + bDayStart;
                    bDayEnd = 	","   + bDayEnd;
                }else{
                    console.log("We see it is empty, and insert as normal");
                }
			});
			
		});
    db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET bTimeStart   = bTimeStart || '"+bTimeStart+"', \
                                            bTimeEnd     = bTimeEnd   || '"+bTimeEnd  +"', \
                                            bDayStart    = bDayStart  || '"+bDayStart +"', \
                                            bDayEnd      = bDayEnd    || '"+bDayEnd   +"'  \
                                            WHERE userName = '"+username+"'");
        });
        console.log("We are in addUsersCal");
        showUsers();
}
/* input:userName,groupID
   output: edited USERTABLE
   What it does: adds  specific group for specific user
*/
function addGroupToUser(userName,groupID){
    db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("SELECT groupID FROM USERTABLE WHERE userName = '"+userName+"'", [], function(tx,result){
                var row = result.rows.item(0);
                var group = row['groupID']
                console.log(group.length);
                if(group.length > 0){groupID ="," + groupID;}
        });
    });
    db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET groupID = groupID ||'"+groupID +"' WHERE userName = '"+ userName+"'");
    });
    showUsers();
}

/* input:userName,bTimeStart, bTimeEnd, bDayStart, bDayEnd
   output: edited USERTABLE
   What it does: removes  specific timeframe for specific user
*/
function removeUserCal(userName, bTimeStart, bTimeEnd, bDayStart, bDayEnd){
	var upbts;
	var upbte;
	var upbds;
	var upbde;
    db.transaction(function(tx){
    console.log(tx);
    tx.executeSql("SELECT userName, bTimeStart, \
                   bTimeEnd, bDayStart, bDayEnd \
                   FROM USERTABLE WHERE userName = '"+ userName+"'", [], function(tx,result){

            var row = result.rows.item(0);
            upbts = row['bTimeStart'].split(",");
            upbte = row['bTimeEnd'].split(",");
            upbds = row['bDayStart'].split(",");
            upbde = row['bDayEnd'].split(",");

            for(var i = 0; i < upbts.length; i++){
                if(upbts[i] == bTimeStart && upbte[i] == bTimeEnd && upbds[i] == bDayStart && upbde[i] == bDayEnd){
                    upbts.splice(i,1);//splice deletes index i
                    upbte.splice(i,1);
                    upbds.splice(i,1);
                    upbde.splice(i,1);

                }// looks like no need for edge cases
            }
        });
        
    });
	console.log(upbts,upbte,upbds,upbde);
	db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET bTimeStart   = '"+upbts  +"', \
                                            bTimeEnd     = '"+upbte  +"', \
                                            bDayStart    = '"+upbds  +"', \
                                            bDayEnd      = '"+upbde  +"'  \
                                            WHERE userName = '"+ userName+"'");
    });
    
    showUsers();
}

/* input:userName,groupID to delete
   output: edited USERTABLE
   What it does: removes  specific groupID from user table
*/
function removeGroupFromUser(userName,groupID){
	var upgroupID;
    var newGroupList;
	    db.transaction(function(tx){
        tx.executeSql("SELECT groupID FROM USERTABLE WHERE userName ='"+userName+"'", [], function(tx,result){
				
                var row = result.rows.item(0);
				upgroupID = row['groupID'].split(",");
				for(var i = 0; i < upgroupID.length; i++){
					if(upgroupID[i] == groupID){
				        newGroupList = upgroupID.splice(i,1);//splice deletes index i
                        console.log("items to remove",  newGroupList );
					}// looks like no need for edge cases
				}
                


        });
    });
	console.log(upgroupID);//this prints empty
	db.transaction(function(tx){
        console.log("set to", upgroupID);  
        tx.executeSql("UPDATE USERTABLE SET groupID   = '"+ upgroupID +"' \
                                            WHERE userName ='"+ userName+"'");
        });
    showUsers();
}




/* input:userName,groupID to delete
   output: editted USERTABLE
   What it does: removes  specific groupID from user table
   Special callback EX: getCalbyUser("username",getdata);
*/

function getCalbyUser(username, callback){
 	var result;
 	var arra;
     db.transaction(function(tx){
         console.log(tx);
         result = tx.executeSql("SELECT userName, bTimeStart, bTimeEnd, bDayStart, bdayEnd \
 						FROM USERTABLE \
 						WHERE userName ='"+username+"'", [], function(tx,result){
 							
 				var length = result.rows.length;
				if(length > 0)
				{
					var row = result.rows.item(0);
					arra = [row['bTimeStart']
						  , row['bTimeEnd']
						  , row['bDayStart']
						  , row['bDayEnd'] ] 
				}
 				
				if(callback){
					arra =  callback(arra);
					console.log("here");
					console.log(arra);
					return arra;
				}
  
         });
 
 		
     });  
 		
 }
 /*
 Input: Username and callback function that needs the list of groups the user is in
 OUtput: and array of strings showing the groups the user is in
 Example: getGroupForUser("Petar", getdata );
 */
function getGroupForUser(username, callback){
	var groupArray;
	db.transaction(function(tx){
         console.log(tx);
         result = tx.executeSql("SELECT groupID, bdayEnd FROM USERTABLE WHERE userName ='"+username+"'", [], function(tx,result){
 							
 				var length = result.rows.length;
				if(length > 0)
				{
					var row = result.rows.item(0);
					groupArray = row['groupID'].split(',');
				}
 				
				if(callback){
					groupArray =  callback(groupArray);
					return groupArray;
				}
  
         });
 
 		
     });  
}

function USERtoJSON(){

    var link = window.location.href.split("username=");
    var userName = link[1];
    
    db.transaction(function(tx){
        result = tx.executeSql("SELECT * FROM USERTABLE WHERE userName = '"+userName+"'" ,[],function(tx,result){
             var row = result.rows;
             dataJSON.users = row;
             console.log(dataJSON);
        });
    });
}
function JSONtoUSER(){
    console.log(dataJSON.users);
    loadUser(dataJSON);
}
/* input:data
   output: data
   What it does: callback for some operations
*/
function getdata(data){
	console.log(data);
	return data;
}
/* input:void
   output: sets up tables so we can edit it
   What it does: calls other functions to make sure table is ready to edit
*/
function doAll(){
    openUserDatabase();
    createUserTable();
	showUsers();
}