/**
 * Created by dwagner6506 on 2/21/2017.
 */
$( document ).ready(function() {


    initDB();

    validateInputs();

    saveEmail();



    $('#DWWritePoem').on('pageshow', function(){

        DWGetDate();
        DWUpdateAuthorsDropdown();

    });
    $('#DWViewOnePoem').on('pageshow', function(){

        DWGetPoem();
    });

    $('#DWViewPoems').on('pageshow', function(){

        DWGetPoems();
    });

    $('#DWEditPoems').on('pageshow', function(){

        DWUpdateAuthorsDropdown();
    });

    $('#DWSave').on('click', function(){

        DWAddPoem();
        $.mobile.changePage('#DWViewPoems');
        window.location.reload();
    });

    $('#DWSaveEdit').on('click', function(){

        DWUpdatePoem();
        $.mobile.changePage('#DWViewOnePoem');
        window.location.reload();


    });

    $('#DWToAuthors').on('click', function(){

        $.mobile.changePage('#DWAuthorPage');
        window.location.reload();


    });

    $('#DWSaveAuth').on('click', function(){

        DWCreateAuthor();

        $.mobile.changePage('#DWHomePage');
        window.location.reload();


    });


    $('#DWClearDB').on('click', function(){

        DWClearDatabase();
        $.mobile.changePage('#DWHomePage');
        window.location.reload();


    });





});



function initDB() {


        console.info("Creating database ...");
        try {

                DB.DWCreateDatabase();

            if (db) {
                console.info("Creating tables ...");
                DB.DWCreateTables();
            }

        } catch (e) {
            console.error("Error: (Fatal) Error in initDB, can not proceed" + e.toString());
        }

}