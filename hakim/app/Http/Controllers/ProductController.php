<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::published()
            ->with(['category', 'images'])
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('Storefront/Products/Index', [
            'products' => $products,
        ]);
    }

    public function show($slug)
    {
        $product = Product::published()
            ->where('slug', $slug)
            ->with(['category', 'collection', 'images', 'sizes', 'shippingProfile.rates'])
            ->firstOrFail();

        return Inertia::render('Storefront/Products/Show', [
            'product' => $product,
        ]);
    }
}
