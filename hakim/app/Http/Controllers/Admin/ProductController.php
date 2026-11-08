<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use App\Models\Collection;
use App\Models\ShippingProfile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])
            ->orderBy('updated_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::all(),
            'collections' => Collection::all(),
            'shippingProfiles' => ShippingProfile::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_cents' => 'required|integer',
            'inventory' => 'required|integer',
            'category_id' => 'nullable|exists:categories,id',
            'collection_id' => 'nullable|exists:collections,id',
            'shipping_profile_id' => 'nullable|exists:shipping_profiles,id',
            'allow_customization' => 'boolean',
        ]);

        $slug = Str::slug($validated['title']);
        $count = Product::where('slug', 'LIKE', "{$slug}%")->count();
        if ($count > 0) {
            $slug .= '-' . ($count + 1);
        }
        $validated['slug'] = $slug;
        
        $product = Product::create($validated);

        return redirect()->route('admin.products.edit', $product->id);
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load(['category', 'collection', 'sizes', 'images', 'shippingProfile']),
            'categories' => Category::all(),
            'collections' => Collection::all(),
            'shippingProfiles' => ShippingProfile::all(),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price_cents' => 'required|integer',
            'inventory' => 'required|integer',
            'category_id' => 'nullable|exists:categories,id',
            'collection_id' => 'nullable|exists:collections,id',
            'shipping_profile_id' => 'nullable|exists:shipping_profiles,id',
            'allow_customization' => 'boolean',
            'status' => 'required|in:draft,review,published,sold',
        ]);

        if ($validated['title'] !== $product->title) {
             $slug = Str::slug($validated['title']);
             if (Product::where('slug', $slug)->where('id', '!=', $product->id)->exists()) {
                 $slug .= '-' . uniqid();
             }
             $validated['slug'] = $slug;
        }

        $product->update($validated);

        return back();
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('admin.products.index');
    }

    public function publish(Product $product)
    {
        // Placeholder for Stripe Logic
        // In a real implementation, we would create the Product and Price in Stripe here
        
        $product->update([
            'status' => 'published',
            'published_at' => now(),
        ]);

        return back()->with('success', 'Product published to storefront.');
    }
}
