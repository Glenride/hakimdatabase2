<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\ShippingProfile;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $profile = ShippingProfile::first();
        $categories = Category::all();
        
        $products = [
            [
                'title' => 'The Milano Silk Dress',
                'description' => 'Crafted from the finest Italian silk, this dress embodies elegance and comfort. Perfect for evening soirées or upscale gatherings.',
                'price_cents' => 45000,
                'image' => 'products/dress-1.jpg',
                'category' => 'summer',
            ],
            [
                'title' => 'Velvet Midnight Gown',
                'description' => 'A stunning velvet piece that captures the light and the attention of the room. Features a deep V-neck and a flowing silhouette.',
                'price_cents' => 62000,
                'image' => 'products/dress-2.jpg',
                'category' => 'winter',
            ],
            [
                'title' => 'Ethereal Chiffon Maxi',
                'description' => 'Light as air and beautifully constructed. This chiffon maxi dress moves with you, creating a dreamlike aesthetic.',
                'price_cents' => 38000,
                'image' => 'products/dress-3.jpg',
                'category' => 'spring',
            ],
            [
                'title' => 'Classic Linen Day Dress',
                'description' => 'Structured yet breathable, this white linen dress is the quintessential staple for your warm-weather wardrobe.',
                'price_cents' => 29500,
                'image' => 'products/dress-4.jpg',
                'category' => 'summer',
            ],
        ];

        foreach ($products as $data) {
            $cat = $categories->where('slug', $data['category'])->first();

            $product = Product::create([
                'title' => $data['title'],
                'description' => $data['description'],
                'status' => 'published',
                'price_cents' => $data['price_cents'],
                'currency' => 'USD',
                'inventory' => 10,
                'slug' => \Illuminate\Support\Str::slug($data['title']),
                'category_id' => $cat ? $cat->id : $categories->first()->id,
                'shipping_profile_id' => $profile ? $profile->id : null,
                'allow_customization' => true,
                'published_at' => now(),
            ]);

            ProductImage::create([
                'product_id' => $product->id,
                'path' => $data['image'],
                'sort_order' => 0,
                'alt_text' => $data['title'],
            ]);

            foreach (['XS', 'S', 'M', 'L', 'XL'] as $label) {
                ProductSize::create([
                    'product_id' => $product->id,
                    'label' => $label,
                    'available' => true,
                ]);
            }
        }
    }
}
