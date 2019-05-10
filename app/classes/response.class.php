<?php

class Response implements JsonSerializable{

    private $data; // empty array - no data; on success data from api
    private $error; // true - error happened; false - no errors
    private $errorCode; // values: 0 - no error; 1 - empty search param; >= 2 - server / api code; 

    public function __construct($data, $error, $errorCode)
    {
        $this->data = $data;
        $this->error = $error;
        $this->errorCode = $errorCode;
    }

    public function getProp($property){

        return $this->$property;
    }

    public function jsonSerialize()
    {
        return [

            'data' => $this->getProp("data"),
            'error' => $this->getProp("error"),
            'errorCode' => $this->getProp("errorCode")
        ];
    }
}