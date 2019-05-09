function userInput(){

    // get user input
    let input = document.getElementById('search-input');
    let search = input.value;

    if(search == '' || typeof(search) == undefined){

        input.style.border = "2px solid red";
        input.setAttribute("placeholder","Channel name is required.");

    }else{

        input.style.border = "none";

        // it's not empty, so call function fetchData()

        fetchData(search);
    }
}

function fetchData(info){

    // create XMLHttpRequest
    const xmlhttp = new XMLHttpRequest();

    // create url for server request
    let url = "app/index.php?search-info=" + info;

    // checking if the status == 4, if so, data has arrived
    xmlhttp.onreadystatechange = function(){

        if(xmlhttp.readyState == 4 && xmlhttp.status == 200){

            // TODO: display received data
            console.log(xmlhttp.responseText);
        }
    }

    // send the data
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}