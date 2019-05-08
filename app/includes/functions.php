<?php
// Checks if the given url exists, if it does, means that the YT channel name is valid
function checkURL($url){
        
    $headers = get_headers($url);
    return stripos($headers[0],"200 OK") ? true : false;
}