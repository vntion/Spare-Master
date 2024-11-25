<?php
include "./config.php";

class Connection
{
    public $host;
    public $user;
    public $pass;
    public $dbname;
    public $con;
    public $message;

    public function __construct()
    {
        return $this->db_connect();
    }

    public function db_connect()
    {
        $this->host = DBHOST;
        $this->user = DBUSER;
        $this->pass = DBPASS;
        $this->dbname = DBNAME;
        $this->con = new mysqli(
            $this->host,
            $this->user,
            $this->pass,
            $this->dbname
        );

        if (!$this->con->connect_error) {
            $this->message = "Some problem with connection...";
        } else {
            $this->message = "Connected Succesfully...";
        }
    }
}
?>
