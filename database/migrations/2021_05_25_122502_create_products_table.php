<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use \App\Product;

class CreateProductsTable extends Migration
{
    public function up()
    {
        Schema::create((new Product())->getTable(), function (Blueprint $table) {
            $table->bigIncrements('product_id');
            $table->string('name', 35)->comment('Название продукта');
            $table->string('description', 500)->comment('Описание');
            $table->string('image')->comment('Путь к фото');
            $table->float('price')->comment('Цена за 1 ед.');
            $table->integer('quantity')->comment('Количество');
        });
    }

    public function down()
    {
        Schema::dropIfExists((new Product())->getTable());
    }
}
