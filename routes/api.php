<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::delete('/product/delete/{id}', 'ProductController@deleteProductById');
Route::get('/product/get/{id}', 'ProductController@getProductById');
Route::post('/product/add', 'ProductController@addProduct');
Route::post('/product/update', 'ProductController@updateProduct');
Route::get('/product/all', 'ProductController@getAllProducts');
Route::get('/product/search/{name}', 'ProductController@searchProductByName');

