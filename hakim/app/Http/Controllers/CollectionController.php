<?php

namespace App\Http\Controllers;

use App\Models\Collection;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Collection::withCount(['products' => function ($query) {
            $query->where('status', 'published');
        }])->get();

        return Inertia::render('Storefront/Collections/Index', [
            'collections' => $collections,
        ]);
    }

    public function show($slug)
    {
        $collection = Collection::where('slug', $slug)->firstOrFail();
        
        $products = $collection->products()
            ->where('status', 'published')
            ->with(['images'])
            ->orderBy('published_at', 'desc')
            ->paginate(12);

        return Inertia::render('Storefront/Collections/Show', [
            'collection' => $collection,
            'products' => $products,
        ]);
    }
}
