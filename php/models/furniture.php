<?php

require_once "product.php";

class Furniture extends Product 
{
    public $width;
    public $length;
    public $height;

    public function __construct($sku, $name, $price, $width, $length, $height) 
    {
        parent:: __construct($sku, $name, $price);
        $this->width = $width;
        $this->height = $length;
        $this->length = $height;
    }

    public function getExtraColumns()
    {
        return [
            "width" => $this->width,
            "length" => $this->length,
            "height" => $this->height
        ];
    }
}
?>