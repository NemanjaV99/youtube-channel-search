<?php require("includes/functions.php");?>
<?php require("classes/response.class.php");?>
<?php
// response variables
$error = false;
$errorCode = 0;
$data = null;

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

        }else{

            // if the url does not exists, set error code to 2, and set error to true
            $error = true;
            $errorCode = 2;
        }

    }else{
            // if the search param is empty, set error code to 1, and set error to true
            $error = true;
            $errorCode = 1;
    }


    // create a new response object
    $response = new Response($data,$error,$errorCode);

    echo json_encode($response);
}