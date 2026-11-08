<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AccountController extends Controller
{
    public function dashboard(Request $request)
    {
        $user = $request->user();
        
        $recentOrders = $user->orders()
            ->with('product.images')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        $orderStats = [
            'total' => $user->orders()->count(),
            'pending' => $user->orders()->where('status', 'pending')->count(),
            'processing' => $user->orders()->whereIn('status', ['confirmed', 'processing'])->count(),
            'shipped' => $user->orders()->whereIn('status', ['shipped', 'delivered'])->count(),
        ];

        return Inertia::render('Account/Dashboard', [
            'recentOrders' => $recentOrders,
            'orderStats' => $orderStats,
        ]);
    }
}
