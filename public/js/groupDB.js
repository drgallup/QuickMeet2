


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
    var groupName = document.getElementById("name").value;
    db.transaction(function(tx){
        tx.executeSql("insert into GROUPTABLE values(?)", 
                      [groupName]);
        alert("New Group: " +groupName+ " has been made");

    });
    showUsers();
}
