<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()
            ->orders()
            ->with('product.images')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Account/Orders/Index', [
            'orders' => $orders,
        ]);
    }

    public function show(Request $request, Order $order)
    {
        // Ensure user owns this order
        if ($order->user_id !== $request->user()->id) {
            abort(403);
        }

        $order->load('product.images');

        return Inertia::render('Account/Orders/Show', [
            'order' => $order,
        ]);
    }
}
