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

            let data = JSON.parse(xmlhttp.responseText);
            
            displayData(data);
        }
    }

    // send the data
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function displayData(data){

    // If there is no error, it means that we got the data
    if(data.error === false)
    {
        // first remove any existing elements ( div.result )
        if(document.querySelector(".result") !== null)
        {
            document.getElementsByClassName("result")[0].remove();
        }
        // Also remove errors (div.errorText), if there is any
        if(document.querySelector(".errorText") !== null)
        {
            document.getElementsByClassName("errorText")[0].remove();
        }

        // create section for displaying received results
        let resultSection = document.createElement("section");
        resultSection.setAttribute("class","result");

         // append to main element
        document.getElementsByTagName("main")[0].appendChild(resultSection);


    }else{
       
        if(data.errorCode == 2){

            // first remove any existing errors, div.errorText
            if(document.querySelector(".errorText") !== null)
            {
                document.getElementsByClassName("errorText")[0].remove();
            }
            // Also remove results, if there are any
            if(document.querySelector(".result") !== null)
            {
                document.getElementsByClassName("result")[0].remove();
            }

            // create the error text
            let errorText = document.createElement("div");

            // add error message 
            errorText.innerHTML = "Please check again. Name does not match any YT channel";

            // set class for the div element
            errorText.setAttribute("class","errorText");

            // add the div element at the beginning of the main element
            document.getElementsByTagName("main")[0].prepend(errorText);
        }

    }
    
    
    
}