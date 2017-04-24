/**
 * Created by dwagner6506 on 2/21/2017.
 */

var db;

function errorHandler(tx, error)
{
    console.error("SQL Error: " + tx + " (" + error.code + ") --"  + error.message);

}

function successTransaction(){

    console.info("Sucessful transaction");
}


//global database object
var DB = {


    //creates database
    DWCreateDatabase: function () {


        var shortName = "Poetry";
        var version = "1.0";
        var displayName = "David Wagner DB";
        var dbSize = 2 * 1024 *1024;

        console.info("Creating Database...");

        function dbCreateSuccess(){
            console.info("Database successfuly created");

        }


            db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);

    },


    //creates tables
    DWCreateTables: function () {

        function txFunction(tx) {
            console.info("Creating tables ...");




            var sqlPoem = "CREATE TABLE IF NOT EXISTS poem(" +
                "poemID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "title VARCHAR(30) NOT NULL," +
                "content MEMO(6000) NOT NULL,"+
                "date DATE NOT NULL," +
                "authorID INTEGER NOT NULL," +
                "FOREIGN KEY (authorID) REFERENCES author(authorID));";

            var sqlAuthor = "CREATE TABLE IF NOT EXISTS author(" +
                "authorID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "authorName VARCHAR(40) NOT NULL," +
                "isDefaultAuthor   VARCHAR(1));";


            var options = [];

            tx.executeSql(sqlPoem, options, successCreate, errorHandler);

            tx.executeSql(sqlAuthor, options, successCreate, errorHandler);

            if(localStorage.getItem('insertedAnonAuthor') == null) {
                var sqlInsertAnonAuthor = "INSERT INTO author VALUES(null, 'Anonymous', 'Y');";
                localStorage.setItem('insertedAnonAuthor', 'yes');

                tx.executeSql(sqlInsertAnonAuthor, options, successCreate, errorHandler);
            }


            function successCreate() {
                console.info("Success: Table creation successful");
            }






        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },
   DWDropTables: function () {

        function txFunction(tx) {
            console.info("Dropping tables ...");


            var sql = "DROP TABLE IF EXISTS poem;" ;
            var sql2 = "DROP TABLE IF EXISTS author;"
            var options = [];
            function successDrop() {
                console.info("Success: Dropping table successful");
                alert("Database successfully dropped!");
            }
            tx.executeSql(sql, options, successDrop, errorHandler);
            tx.executeSql(sql2, options, successDrop, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
   }
};