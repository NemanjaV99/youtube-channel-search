<?php require("includes/functions.php") ?>
<?php
// check if there is a get param with the necessary search info
if(isset($_GET["search-info"])){

    $search = trim($_GET["search-info"]);

    // Add the search param on to the url for the videos.xml file that containt the info
    $url = "https://www.youtube.com/feeds/videos.xml?user=" . $search;

    // Check if the given search param combined with the url exists
    // If checkURL returns true, it means that the YT channel exists
    if(checkURL($url)){

        // Return the data as a json to front with AJAX
        echo json_encode(simplexml_load_file($url));

    }else{

        // Return empty object if 
        echo json_encode(array());
    }

}