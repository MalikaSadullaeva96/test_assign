<?php

require_once "product.php";

class DVD extends Product 
{
    public $size;

    public function __construct($sku, $name, $price, $size) 
    {
        parent::__construct($sku, $name, $price);
        $this->size = $size;
    }

    public function getExtraColumns() 
    {
        return ["size" => $this->size];
    }

}
?>