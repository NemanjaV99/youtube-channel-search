
/* This function is used to check the user input*/
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


/* This function is used for getting the data from back */
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


/* Functions below are used for displaying data */
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

        // create the main object (represents the channel);
        let channel = data.data;

        // call function author(), which displays info about the channel author
        author(channel);

        // call function entry(), which displays all the entries/videos
        entry(channel);

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

function author(channel){

    // get the main info 
    let authorName = channel.author.name
    let dateJoined = channel.published;

    // format the date, to get year
    dateJoined = dateJoined.split("-");
    yearJoined = dateJoined[0];

    // create the div for displaying author info
    let authorInfo = document.createElement("div");
    authorInfo.setAttribute("class","author-info");
    authorInfo.innerHTML = "<div class='author-name'>"+ authorName +"</div>";
    authorInfo.innerHTML += "<div class='date'>"+ yearJoined +"</div>";

    // append it to the result section
    document.getElementsByClassName("result")[0].appendChild(authorInfo);
}

function entry(channel){

    // define the entry
    let video = channel.entry

    for(i = 0; i < video.length; i++)
    {
        // create div to display video/entry
        let entryInfo = document.createElement("div");
        entryInfo.setAttribute("class","entry-info");

        // get the video id
        let videoID = video[i].id;
        videoID = videoID.split(":");
        videoID = videoID[2];

        // get the video title and add it to the entryInfo section
        let videoTitle = video[i].title;
        entryInfo.innerHTML += "<h2 class='video-title'>"+ videoTitle +"</h2>"

        // get the publish date
        let videoPublished = video[i].published;
        videoPublished = videoPublished.split("-");

        // get the year and add it to the entryInfo section
        let yearPublished = videoPublished[0];
        entryInfo.innerHTML += "<div class='date'>"+ yearPublished +"</div>";
    

        // embed the video
        let iframe = document.createElement("iframe");
        iframe.setAttribute("class","video-window");
        
        // video link
        let videoLink = "https://www.youtube.com/embed/" + videoID;
        
        // add video link to iframe
        iframe.setAttribute("src",videoLink);
        
        // append the iframe to entryInfo
        entryInfo.appendChild(iframe);

        // append the entryInfo to the result section
        document.getElementsByClassName("result")[0].appendChild(entryInfo);
        
    }
}