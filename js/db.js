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
function addUserCal(userID, bTimeStart, bTimeEnd, bDayStart, bDayEnd){
    db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET bTimeStart   = '"+bTimeStart+"', \
                                            bTimeEnd     = '"+bTimeEnd  +"', \
                                            bDayStart    = '"+bDayStart +"', \
                                            bDayEnd      = '"+bDayEnd   +"'  \
                                            WHERE userID = "+ userID);
        });
        console.log("We are in addUsersCal");
        showUsers();

}
function addUserGroups(userID,groupID){
    db.transaction(function(tx){
        tx.executeSql("UPDATE USERTABLE SET groupID = '"+groupID +"' WHERE userID = "+ userID);
    });
    console.log("We are in addUsersGroup");
    showUsers();
}

function doAll(){
    openUserDatabase();
    createUserTable();
    createUser(1234,"afhenry","a","b","c","d","e");
    
    var newBtimeStart = "foo";
    addUserCal(1234,newBtimeStart,2,2,2);
    addUserGroups(1234,"poobar");
    deleteUser(1234);
}