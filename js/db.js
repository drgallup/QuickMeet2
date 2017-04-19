var db = null;
function openUserDatabase(){
    db = openDatabase("test1", "1.0", "Example", 200000);
}
function createUserTable(){
    db.transaction(function(tx){
        tx.executeSql("create table USERTABLE (userID REAL UNIQUE,  userName TEXT, bTimeStart TEXT, \
                                              bTimeEnd TEXT, bDayStart TEXT, bDayEnd TEXT, groupID TEXT)"
                      ,[],function(result){
        alert("created notes table: "+ result);
    });
            
    });
}
function createUser(userID, userName, bTimeStart, bTimeEnd, bDayStart, bDayEnd, groupID){
    db.transaction(function(tx){
        tx.executeSql("insert into USERTABLE values(?,?,?,?,?,?,?)", [userID, userName, bTimeStart, 
                                                                    bTimeEnd, bDayStart, bDayEnd, groupID]);
    });
        console.log("We are in createUser");
        showUsers();    

}
function showUsers(){
    db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("SELECT userID, userName, bTimeStart, \
                       bTimeEnd, bDayStart, bDayEnd, groupID FROM USERTABLE", [], function(tx,result){
            
            for(var i = 0; i< result.rows.length;i++){
                var row = result.rows.item(i);
                console.log(row['userID'], row['userName'], row['bTimeStart'], row['bTimeEnd'], row['bDayStart'], row['bDayEnd'], row['groupID']);
            }
        });
        
    });
    
}
function deleteAllUsers(){
    db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("DELETE FROM USERTABLE");
    });
    console.log("We are in deleteAllUsers");
    showUsers();

}

function deleteUser(userID){
     db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("DELETE FROM USERTABLE WHERE userID = "+userID);
    });
        console.log("We are in deleteUser");
        showUsers();

}
// the || is used as a concatenation operator in sqlite
function addUserCal(userID, bTimeStart, bTimeEnd, bDayStart, bDayEnd){
	bTimeStart = "" + "," + bTimeStart;
	bTimeEnd = "" + ","   + bTimeEnd;
	bDayStart = "" + ","  + bDayStart;
	bDayEnd = "" + ","    + bDayEnd;
    db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET bTimeStart   = bTimeStart || '"+bTimeStart+"', \
                                            bTimeEnd     = bTimeEnd   || '"+bTimeEnd  +"', \
                                            bDayStart    = bDayStart  || '"+bDayStart +"', \
                                            bDayEnd      = bDayEnd || '"+bDayEnd   +"'  \
                                            WHERE userID = "+ userID);
        });
        console.log("We are in addUsersCal");
        showUsers();

}


function addUserGroups(userID,groupID){
    db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET groupID = groupID ||'"+groupID +"' WHERE userID = "+ userID);
    });
    console.log("We are in addUsersGroup");
    showUsers();
}
//this does not remove the commas that seperates the data
function removeUserCal(userID, bTimeStart, bTimeEnd, bDayStart, bDayEnd){
	var upbts = "";
	var upbte = "";
	var upbds = "";
	var upbde = "";
	    db.transaction(function(tx){
        console.log(tx);
        tx.executeSql("SELECT userID, userName, bTimeStart, \
                       bTimeEnd, bDayStart, bDayEnd, groupID FROM USERTABLE", [], function(tx,result){
            
            for(var i = 0; i< result.rows.length;i++){
                var row = result.rows.item(i);
				upbts = row['bTimeStart'].replace(bTimeStart,"");
				upbte = row['bTimeEnd'].replace(bTimeEnd,"");
				upbds = row['bDayStart'].replace(bDayStart,"");
				upbde = row['bDayEnd'].replace(bDayEnd,"");
				

            }
        });
        
    });
	console.log(upbts,upbte,upbds,upbde);
	db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET bTimeStart   = '"+upbts  +"', \
                                            bTimeEnd     = '"+upbte  +"', \
                                            bDayStart    = '"+upbds  +"', \
                                            bDayEnd      = '"+upbde  +"'  \
                                            WHERE userID = "+ userID);
        });
}
function doAll(){
    openUserDatabase();
    createUserTable();
    createUser(1234,"afhenry","a","b","c","d","e");
    
    addUserCal(1234,"bts","bte","bds","bde");
	
    removeUserCal(1234,"a","b","c","d");
	showUsers();
    addUserGroups(1234,"poobar");
    deleteUser(1234);
}