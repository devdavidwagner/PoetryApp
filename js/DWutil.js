/**
 * Created by dwagner6506 on 2/21/2017.
 */

//validate function using jquery validation plugin
function validateInputs()
{

    $('#DWAddPoemForm').validate({
       errorElement: 'label',
        rules:{

           title: {
               required: true,
               maxlength: 30
           },
            content:{
               required: true
            }


        },
        messages:{

           title: {
               required: "Your poem must have a title!",
               maxlength: "Your title can't be longer than 30 characters."
           },
            content: {
               required :"You must include some poetry!"
           }

        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }

    });

    $('#DWEditPoem').validate({
        errorElement: 'label',
        rules:{

            title: {
                required: true,
                maxlength: 30
            },
            content:{
                required: true
            }


        },
        messages:{

            title: {
                required: "Your poem must have a title!",
                maxlength: "Your title can't be longer than 30 characters."
            },
            content: {
                required :"You must include some poetry!"
            }

        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }

    });

    $('#createAuthorForm').validate({
        errorElement: 'label',
        rules:{

            authorName: {
                required: true,
                maxlength: 30
            }



        },
        messages:{

            authorName: {
                required: "Your poem must have a title!",
                maxlength: "Your title can't be longer than 30 characters."
            }

        },
        errorPlacement: function (error, element) {
            error.appendTo(element.parent());
        }

    });



}


//gets date and fills in on form
function DWGetDate(){


        var day = new Date();
        day = day.toString();
        day = day.substr(0, 21);

        var dates = document.getElementsByClassName('todayDate');

    for (var i = 0; i < dates.length; i++) {

        dates[i].innerHTML = day;

    }


}
//saves default reviewer email to local storage and alerts user it was saved
function saveEmail(){

    $('#DWSettingsForm').on('submit', function () {


       var email =  document.getElementById('DWDefaultRevEmail').value;

       alert(email + " saved as default reviewer email.")
       localStorage.setItem("DefaultEmail", email);


    });


}


//maintains format of textarea
function DWFormatContent(){


    var content = document.getElementById('content').value;


    $("#content").on('keyup', function (e) {
        if (e.keyCode == 13) {
         document.getElementById('content').value = content + "<br>";
            content = document.getElementById('content').value;
            document.getElementById('content').value = content + "\n";

        }
    });


}

//maintains format of textarea
function DWFormatContentEdit(){


    var content = document.getElementById('contentEdit').value;


    $("#contentEdit").on('keyup', function (e) {
        if (e.keyCode == 13) {
            document.getElementById('contentEdit').value = content + "<br>";
            content = document.getElementById('contentEdit').value;
            document.getElementById('contentEdit').value = content + "\n";

        }
    });


}


//Changes title dynamically when changed
function changeTitlePoemAdd(){


    document.getElementById('addPoemTitle').innerHTML = document.getElementById('title').value;

}

function changeTitlePoemEdit(){

    document.getElementById('titleEditHeader').innerHTML = document.getElementById('titleEdit').value;


}





