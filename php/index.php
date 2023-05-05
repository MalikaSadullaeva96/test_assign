<?php

require_once "./controllers/ProductController.php";

$method = $_SERVER["REQUEST_METHOD"];
$uri = $_SERVER["REQUEST_URI"];

$routes = [
    "GET" => [
        "method" => "index",
        "redirect" => false
    ],
    "POST" => [
        "method" => "add",
        "redirect" => true
    ],
    "DELETE" => [
        "method" => "delete",
        "redirect" => false
    ]
];



if (isset($routes[$method])) 
{
    $route = $routes[$method];
    $data = $_REQUEST;
    if (empty($data)) 
    {
        $data = file_get_contents("php://input");
    }
    $response = call_user_func(["ProductController", $route["method"]], $data);
    if ($route["redirect"]) 
    {
        if ($response["status"] === "success") 
        {
            header("Location: ../index.html");
            die();
        } 
        else {
            echo json_encode($response);
            die();
        }
    } 
    else 
    {
        echo json_encode($response);
        die();
    }
} 
else 
{
    return "Method Error!";
}


