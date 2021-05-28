<?php

use Illuminate\Database\Seeder;
use \App\Product;

class ProductTableSeeder extends Seeder
{
    public function run()
    {
        DB::table((new Product())->getTable())->insert([
            [
                'name' => (string)'Iphone 11, 256 гб.',
                'description' => (string)'Смартфон имеет хорошую камеру, высокую производительность',
                'price' => (double)57000.99,
                'image' => (string)'product-images/6fuCYhirSG9nys1avYWtkG95mskSNslLr1PcUSPE.png',
                'quantity' => (int)150,
            ],
            [
                'name' => (string)'Ipad Pro 2021 г. на 512 гб.',
                'description' => (string)'Самый технологичный планшет от компании Apple.',
                'price' => (double)34000,
                'image' => (string)'product-images/6fuCYhirSG9nys1avYWtkG95mskSNslLr1PcUSPE.png',
                'quantity' => (int)25,
            ]
        ]);
    }
}
