/**
 * Created by dwagner6506 on 4/12/2017.
**/

function DWUpdatePoem(){


    var title = document.getElementById('titleEdit').value;
    var poem = document.getElementById('contentEdit').value;
    var date = document.getElementById('dateEdit').innerHTML.toString();
    var id = localStorage.getItem('id');

    if(title != "" && poem != "" && date != "" && date != null)
    {

        try{
            var options = [title, poem, date, id];

            Poem.DWupdate(options);


        }
        catch(e)
        {
            alert("Error: " + e.toString());
        }


    }
    else
    {
        alert("Error. Could not add poem. \nPlease check that all required fields are entered.\n");
    }



}

function DWClearDatabase(){
    DB.DWDropTables();

    $.mobile.pageContainer.pagecontainer("change", "#DWViewPoems");
}


function DWCreateAuthor(){


    var authorName = document.getElementById('authorName').value;
    var isDefault = "";

    if(document.getElementById('isDefault').checked == true)
    {
        isDefault = "Y";

    }
    else
    {
        isDefault = "N";
    }

    console.log(document.getElementById('isDefault').checked);

    if(isDefault != "" && authorName )
    {

        try{
            var options = [authorName, isDefault];
            var defOptions = [isDefault, authorName];




            Author.DWinsert(options);

            if(isDefault == "Y") {
                Author.DWUpdateDefault(defOptions);
            }


        }
        catch(e)
        {
            alert("Error: " + e.toString());
        }


    }
    else
    {
        alert("Error. Could not add poem. \nPlease check that all required fields are entered.\n");
    }





}


//updates author drop down in create poem and edit poem
var edit = false;


var counter = 0;

function DWUpdateAuthorsDropdown(){

    var sel;

    if($.mobile.activePage.attr('id') == "DWWritePoem") {
        sel = document.getElementById('DWAuthor');
        edit = false;

    }

    if($.mobile.activePage.attr('id') == "DWEditPoems")
    {
        sel = document.getElementById('DWAuthorEdit');
        edit = true;

    }






        var authors = [];

        function successSelectAll(tx, results) {


            var isDefaultAuth = "";

                for (var i = 0; i < results.rows.length; i++) {

                    var row = results.rows[i];


                    authors.push(row['authorName']);

                    if (row['isDefaultAuthor'] == 'Y') {
                        isDefaultAuth = row['authorName'];
                    }


                }


                for (var i = 0; i < authors.length; i++) {


                    var opt = document.createElement('option');
                    opt.innerHTML = authors[i];


                    opt.value = authors[i];
                    sel.append(opt);


                }


                for (var i = 0; i < sel.options.length; i++) {

                    if (isDefaultAuth == sel.options[i].innerHTML) {
                        sel.options[i].selected = true;
                        sel.selectedIndex = i;


                    }

                }



                if (edit == false) {
                    $("#DWAuthor").selectmenu('refresh', true);
                }
                else {
                    $("#DWAuthorEdit").selectmenu('refresh', true);
                }


            }



    Author.DWselectAll(successSelectAll);

}

//add a poem function, connects to DAL
function DWAddPoem(){


    var poem = document.getElementById('content').value;
    var author = document.getElementById('DWAuthor').selectedIndex + 1;
    var title = document.getElementById('title').value;
    var date = document.getElementById('date').innerHTML.toString();




    if(title != "" && poem != "" && date != "" && date != null && author != null)
    {

        try{
            var options = [title, poem, date, author];

            Poem.DWinsert(options);




        }
        catch(e)
        {
            alert("Error: " + e.toString());
        }


    }
    else
    {
        alert("Error. Could not add poem. \nPlease check that all required fields are entered.\n");
    }



}



function DWGetPoem() {


    var options = [];
    var id = localStorage.getItem('id');
    options.push(id);
    function successSelectOne(tx, results) {




        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];


            var titleSpots = document.getElementsByClassName('poemName');

            for (var i = 0; i < titleSpots.length; i++) {

                titleSpots[i].innerHTML = row['title'];
            }



            var authorID = row['authorID'];

            //sets local storage item to retrieve name
            DWGetAuthorName(authorID);

            var authorName = "By: " + localStorage.getItem(authorID);

            document.getElementById('authorNameView').innerHTML = authorName;
            document.getElementById('poemDate').innerHTML = row['date'];
            document.getElementById('poemContent').innerHTML = row['content'];

        }
    }

    Poem.DWselect(options, successSelectOne);
}


//sets local storage author name  to retrieve name in views
function DWGetAuthorName(id){

    var options = [];
    options.push(id);


    function successSelectOne(tx, results) {


        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];

             var name = row['authorName'];
            var id = row['authorID'];
            localStorage.setItem(id.toString(), name);



        }
    }


    Author.DWselect(options, successSelectOne);

}


var noPoemMessageAdded = false;
var added = [];
function DWGetPoems(){

    function successSelectAll(tx, results) {


        var listView = document.getElementById('poems');
        var listItem;
        var wasAdded = false;

        if(results.rows.length > 0) {
            noPoemMessageAdded = false;
            for (var i = 0; i < results.rows.length; i++) {


                var row = results.rows[i];
                var id = row['poemID'];
                for (var j = 0; j < added.length; j++) {

                    if (added[j] == id) {
                        wasAdded = true;
                    }


                }

                if (wasAdded == false) {
                    id = row['poemID'];
                    added.push(id);

                    //setting up layout and classes of list-view elements
                    var link = document.createElement('a');
                    listItem = document.createElement('li');
                    listItem.className = "list";

                    link.href = "#DWViewOnePoem";
                    link.className = "viewPoems";

                    var title = document.createElement('h1');
                    title.innerHTML = row['title'];


                    //author name
                    var author = document.createElement('p');
                    author.style.fontStyle = 'italic';
                    var authorID = row['authorID'];

                    //sets local storage item to retrieve name
                    DWGetAuthorName(authorID);



                    var authorName = "By: " + localStorage.getItem(authorID);

                    author.innerHTML = authorName;



                    var poemSection = document.createElement('div');
                    poemSection.className = "poemSection";

                    var content = document.createElement('p');
                    content.innerHTML = row['content'];
                    content.className = "poemContent";


                    var date = document.createElement('p');
                    date.className = "date";
                    date.innerHTML = row['date'];

                    var hrTop = document.createElement('hr');
                    var hrBot = document.createElement('hr');

                    listItem.appendChild(hrTop);
                    listItem.appendChild(title);
                    listItem.appendChild(author);
                    listItem.appendChild(date);


                    poemSection.appendChild(content);
                    listItem.appendChild(poemSection);
                    listItem.appendChild(link);
                    listItem.appendChild(hrBot);


                    listView.appendChild(listItem);

                    $(link).attr('data-role', 'button');
                    $(link).attr('id', id);
                    link.className = "ui-btn ui-icon-arrow-r ui-btn-icon-right";

                    link.addEventListener('click', function (e) {
                        saveID(e)
                    });


                }
            }
        }
        else
        {

            if( noPoemMessageAdded == false) {

                var message = document.createElement('p');

                message.innerHTML = "You haven't written any poetry!";

                var linky = document.createElement('input');
                linky.addEventListener('click', function(){$.mobile.changePage('#DWWritePoem');});
                linky.value = "Write a poem!";


                $(linky).attr('type', 'button');

                linky.className = "ui-btn ui-icon-arrow-r ui-btn-icon-right";
                var emptyDiv = document.getElementById('emptyMessage');


                emptyDiv.appendChild(message);
                emptyDiv.appendChild(linky);
                $(linky).attr('data-icon', 'plus');

            }
            noPoemMessageAdded = true;

        }
    }

    Poem.DWselectAll(successSelectAll);


}

function DWDeletePoem(){

    var options = [];
    var id = localStorage.getItem('id');
    options.push(id);
    Poem.DWdelete(options);
    $.mobile.pageContainer.pagecontainer("change", "#DWViewPoems");
    window.location.reload();





}

function saveID(e){
    localStorage.setItem('id', $(e.target).attr('id'));
}


function DWSetUpEdit(){
    $.mobile.pageContainer.pagecontainer("change", "#DWEditPoems");

    var options = [];
    var id = localStorage.getItem('id');
    options.push(id);
    function successSelectOne(tx, results) {




        for (var i = 0; i < results.rows.length; i++) {
            var row = results.rows[i];


            var titleSpots = document.getElementsByClassName('poemName');

            for (var i = 0; i < titleSpots.length; i++) {

                titleSpots[i].innerHTML = row['title'];
            }

            document.getElementById('dateEdit').innerHTML = row['date'];
            document.getElementById('titleEdit').value = row['title'];
            document.getElementById('contentEdit').value = row['content'];

        }
    }

    Poem.DWselect(options, successSelectOne);

}