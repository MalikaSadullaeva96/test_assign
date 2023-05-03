<?php
class Database {
    private $servername = "localhost";
    private $username = "scandi";
    private $password = "070722";
    private $dbname = "items";
    public $conn;

    public function __construct() {
        $this->conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }
}
?>