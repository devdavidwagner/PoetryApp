/**
 * Created by dwagner6506 on 2/21/2017.
 */
/**
 * Created by David on 3/13/2017.
 */

//CRUD operations for table author
var Author = {

    DWselectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM author;";
            var options = [];

            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DWselect: function (options, successSelectOne) {
        function txFunction(tx) {
            var sql = "SELECT * FROM author WHERE authorID=?;";


            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DWinsert: function (options){

        function txFunction(tx) {

            var sql = "INSERT INTO author(authorID, authorName, isDefaultAuthor) " +
                "VALUES(null, ?, ?);";

            function successInsert() {
                console.info("Success: insert successful");
                alert("New record added");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);



    },
    DWUpdateDefault : function (options) {
        function txFunction(tx) {
            var sql = "";

            sql = "UPDATE author SET isDefaultAuthor = ?"+
                "WHERE authorName != ?;";


            function successUpdate() {
                console.info("Success: Update successful");
                alert("Record updated successfully");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    }


};

//CRUD operations for table poem
var Poem ={

    DWinsert: function (options){

        function txFunction(tx) {

            var sql = "INSERT INTO poem(poemID,title,content,date,authorID) " +
                    "VALUES(null, ?, ?, ?, ?);";

            function successInsert() {
                console.info("Success: insert successful");
                alert("New record added");
            }

            tx.executeSql(sql, options, successInsert, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);



    },
    DWselectAll: function (successSelectAll) {
        function txFunction(tx) {
            var sql = "SELECT * FROM poem;";
            var options = [];

            tx.executeSql(sql, options, successSelectAll, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DWselect: function (options, successSelectOne) {
        function txFunction(tx) {
            var sql = "SELECT * FROM poem WHERE poemID=?;";


            tx.executeSql(sql, options, successSelectOne, errorHandler);
        }
        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DWupdate: function (options) {
        function txFunction(tx) {
            var sql = "";

                sql = "UPDATE poem SET title = ?, content=?, date =? "+
                    "WHERE poemID=?;";


            function successUpdate() {
                console.info("Success: Update successful");
                alert("Record updated successfully");
            }

            tx.executeSql(sql, options, successUpdate, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);
    },

    DWdelete: function (options) {
        function txFunction(tx) {
            var sql = "DELETE FROM poem WHERE poemID=?;";

            function successDelete() {
                console.info("Success: Delete successful");
                alert ("Poem deleted successfully");
            }

            tx.executeSql(sql, options, successDelete, errorHandler);
        }

        db.transaction(txFunction, errorHandler, successTransaction);









    }
};