<?php
include_once(__DIR__ . "/../connection.php");

abstract class Product
{
    public $sku;
    public $name;
    public $price;

    public function __construct($sku, $name, $price)
    {
        $this->sku = $sku;
        $this->name = $name;
        $this->price = $price;
    }

    private function isUniqueSku()
    {
        $db = new Database();
        $conn = $db->conn;

        $query = $conn->prepare("SELECT COUNT(*) FROM items WHERE sku = ?");
        if ($query === false) {
            error_log("Error preparing the query: " . $conn->connect_error);
            echo 'error: Error preparing the query';
            return;
        }
        $query->bind_param("s", $this->sku);

        $result = $query->execute();
        if ($result === false) {
            error_log("Error executing the query: " . $query->error);
            echo 'error: Error executing the query';
            return;
        }
        $query->bind_result($count);
        $query->fetch();
        return $count == 0;
    }

    public static function GetAll()
    {
        $db = new Database();
        $conn = $db->conn;

        $stmt = $conn->prepare("SELECT * FROM items");
        $stmt->execute();

        $result = $stmt->get_result();
        $products = $result->fetch_all(MYSQLI_ASSOC);

        $stmt->close();
        $db->conn->close();

        return $products;
    }

    public function Save()
    {
        $response = [];
        if ($this->isUniqueSku()) {
            $extraAttributes = $this->getExtraColumns();
            $columnNames = join(", ", array_keys($extraAttributes));
            $columnValues = join(", ", array_values($extraAttributes));
            $query = "INSERT INTO items (sku, name, price, $columnNames) VALUES ('$this->sku', '$this->name', $this->price, $columnValues)";

            $db = new Database();
            $conn = $db->conn;

            if ($conn->query($query) === TRUE) {
                $response["status"] = "success";
                $response["message"] = "New record created successfully";
            } else {
                $response["status"] = "error";
                $response["message"] = "Error: " . $query . "<br>" . $conn->error;
            }
            $conn->close();
        } else {
            $response["status"] = "error";
            $response["message"] = "SKU Already exist";
        }
         return json_encode($response);
    }


    public static function DeleteProducts($skus)
    {
        $db = new Database();
        $conn = $db->conn;
        $placeholders = implode(',', array_fill(0, count($skus), '?'));
        $query = $conn->prepare("DELETE FROM items WHERE sku IN ($placeholders)");


        if ($query === false) {
            error_log("Error preparing the query: " . implode(" ", $conn->errorInfo()));
            return ["status" => "error", "message" => "Error preparing the query"];
        }
    
        $params = str_repeat("s", count($skus));
        $query->bind_param($params, ...array_values($skus));
    
        $result = $query->execute();
        if ($result === false) {
            error_log("Error executing the query: " . $query->error);
            return ["status" => "error", "message" => "Error executing the query"];
        }
        $affectedRows = $query->affected_rows;
        if ($affectedRows > 0) {
            return ["status" => "success", "message" => "Deleted $affectedRows rows."];
        } else {
            return ["status" => "warning", "message" => "No rows were deleted."];
        }
    }
    
    abstract public function getExtraColumns();
}
