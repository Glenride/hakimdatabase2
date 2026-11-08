<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CollectionController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\ProductController as AdminProductController;

Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/about', function () {
    return Inertia::render('Storefront/About');
})->name('about');
Route::get('/collections', [CollectionController::class, 'index'])->name('collections.index');
Route::get('/collections/{slug}', [CollectionController::class, 'show'])->name('collections.show');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/products/{product:slug}/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
    Route::get('/checkout/success', [CheckoutController::class, 'success'])->name('checkout.success');

    // Customer account routes
    Route::get('dashboard', [AccountController::class, 'dashboard'])->name('dashboard');
    Route::get('orders', [OrderController::class, 'index'])->name('orders.index');
    Route::get('orders/{order}', [OrderController::class, 'show'])->name('orders.show');
});

Route::middleware(['auth', 'staff', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function() {
        return redirect()->route('admin.products.index');
    })->name('dashboard');
    
    Route::resource('products', AdminProductController::class);
    Route::post('products/{product}/publish', [AdminProductController::class, 'publish'])->name('products.publish');
});

require __DIR__.'/settings.php';
