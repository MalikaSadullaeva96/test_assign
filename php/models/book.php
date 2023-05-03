<?php

require_once "product.php";

class Book extends Product 
{
    public $weight;

    public function __construct($sku, $name, $price, $weight) 
    {
        parent:: __construct($sku, $name, $price);
        $this->weight = $weight;
    }

    public function getExtraColumns() 
    {
        return ["weight" => $this->weight];
    }

}
?>