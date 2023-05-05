<?php

include_once(__DIR__ . "/../models/dvd.php");
include_once(__DIR__ . "/../models/book.php");
include_once(__DIR__ . "/../models/furniture.php");

class ProductController
{
    public static function index()
    {
        
        $products = Product::GetAll();
        return $products;
    }

    public static function add($data)
    {
        $sku = $data['sku'];
        $name = $data['name'];
        $price = $data['price'];
        $productType = $data['productType'];

        switch ($productType) {
            case 'DVD':
                $size = $data['size'];
                $product = new DVD($sku, $name, $price, $size);
                break;
            case 'Book':
                $weight = $data['weight'];
                $product = new Book($sku, $name, $price, $weight);
                break;
            case 'Furniture':
                $width = $data['width'];
                $length = $data['length'];
                $height = $data['height'];
                $product = new Furniture($sku, $name, $price, $width, $length, $height);
                break;
            default:
                echo "Invalid product type";
                break;
        }

        if (empty($product)) {
            return ["status" => "error"];
        }

        
        $response = $product->Save();
        return $response;
    }

    public static function delete($ids)
    {
        if (is_string($ids)) {
            $skuList = json_decode($ids, true);
        } elseif (is_array($ids)) {
            $skuList = $ids;
        } else {
            return ["status" => "error", "message" => "Invalid input"];
        }
        
        $result = Product::DeleteProducts($skuList);
        if ($result['status'] === 'success') {
            return ["status" => "success"];
        } else {
            return ["status" => "error", "message" => $result];
        }
    }

    public static function handlePost($data)
    {
        if (isset($data['action'])) {
            if ($data['action'] === 'add') {
                return self::add($data);
            } elseif ($data['action'] === 'delete') {
                if (isset($data['skuList'])) {
                    return self::delete($data['skuList']);
                } else {
                    return [
                        "status" => "error",
                        "message" => "Missing SKU list"
                    ];
                }
            } else {
                return [
                    "status" => "error",
                    "message" => "Invalid action"
                ];
            }
        } else {
            return [
                "status" => "error",
                "message" => "Missing action"
            ];
        }
    }
}