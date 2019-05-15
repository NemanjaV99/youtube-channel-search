<?php
// Checks if the given url exists, if it does, means that the YT channel name is valid
function checkURL($url)
{
        
    $headers = get_headers($url);
    return stripos($headers[0],"200 OK") ? true : false;
}

// Used for setting the errors when sending data to front
function checkError($setError, $setErrorCode, $setData = null)
{
     // response variables
    global $error;
    global $errorCode;
    global $data;

    $error = $setError;
    $errorCode = $setErrorCode;
    $data = $setData;
}