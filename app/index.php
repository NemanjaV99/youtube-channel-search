<?php require("includes/functions.php");?>
<?php require("classes/response.class.php");?>
<?php


// check if there is a get param with the necessary search info
if(isset($_GET["search-info"])){

    $search = trim($_GET["search-info"]);

    if(!empty($search))
    {
        // Add the search param on to the url for the videos.xml file that containt the info
        $url = "https://www.youtube.com/feeds/videos.xml?user=" . $search;

        // Check if the given search param combined with the url exists
        // If checkURL returns true, it means that the YT channel exists
        if(checkURL($url)){

            // Return the data as a json to front with AJAX
            $data = (simplexml_load_file($url));

            // check if YT user has allowed videos / has videos to display
            
            if (isset($data->entry)) {

                // no errors, set data to received data from .xml file, set errorCode to 0, and error to false

                checkError(false, 0, $data); 

            } else {
        
                // videos aren't available, leave data value as null, set errorCode to 3, and set error to true

                checkError(true, 3);
            }

        }else{

            // if the url does not exists, leave data value as null,  set errorCode to 2, and set error to true
            checkError(true, 2);
        }

    }else{
            // if the search param is empty, leave data value as null,  set errorCode to 1, and set error to true
            checkError(true, 1);
    }


    // create a new response object
    $response = new Response($data,$error,$errorCode);

    echo json_encode($response);
}