<?php

namespace App\Http\Controllers;

use App\Product;
use http\Env\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getAllProducts()
    {
        $products = Product::all();
        return response()->json($products, 200);
    }

    public function addProduct(Request $request)
    {
        $product = new Product();
        $imgPath = $request->file('image')->store('product-images', 'public');

        $product->name = (string)$request->name;
        $product->description = (string)$request->description;
        $product->image = $imgPath;
        $product->price = (double)$request->price;
        $product->quantity = (int)$request->quantity;
        $product->save();
        $product->product_id = $product->id;
        return response()->json($product, 201);
    }

    public function deleteProductById(int $id)
    {
        $product = Product::where('product_id', $id)->delete();
        return response()->json($product, 204);
    }

    public function searchProductByName(string $name)
    {
        $products = Product::query()->where('name', 'like', "%{$name}%")->get();
        return response()->json($products, 200);
    }

    public function getProductById(int $id)
    {
        $product = Product::query()->where('product_id', $id)->get()->first();
        return response()->json($product, 200);
    }

    public function updateProduct(Request $request)
    {
        if ($request->hasFile('image')) {
            $img = $request->file('image')->store('product-images', 'public');
        } else {
            $img = $request->image;
        }
        $product = Product::where('product_id', $request->product_id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'image' => $img,
        ]);
        if ($product) {
            $product = $this->getProductById($request->product_id);
            return $product;
        }
        return response()->json($product, 400);
    }
}
