<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Laravel\Cashier\Checkout;

class CheckoutController extends Controller
{
    public function store(Request $request, Product $product)
    {
        // Ensure user is logged in (handled by middleware usually, but good to check)
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // Validate size selection if product has sizes
        if ($product->sizes()->count() > 0 && !$request->input('size')) {
            return back()->with('error', 'Please select a size before purchasing.');
        }

        // Check product status
        if ($product->status === 'sold') {
            return back()->with('error', 'This item has already been sold.');
        }

        $priceId = $product->stripe_price_id;
        
        // Fallback for development/testing if no Stripe ID exists
        if (!$priceId) {
            return back()->with('error', 'This product is not yet available for purchase. Please contact us for more information.');
        }

        return $request->user()->checkout([$priceId => 1], [
            'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('products.show', $product->slug),
            'metadata' => [
                'product_id' => $product->id,
                'size' => $request->input('size'),
                'customization' => $request->input('customization'),
            ],
        ]);
    }

    public function success(Request $request)
    {
        return inertia('Storefront/Checkout/Success', [
            'sessionId' => $request->get('session_id'),
        ]);
    }
}
