<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Cashier\Billable;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'status',
        'price_cents',
        'currency',
        'inventory',
        'slug',
        'category_id',
        'collection_id',
        'shipping_profile_id',
        'published_at',
        'stripe_product_id',
        'stripe_price_id',
        'allow_customization',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'allow_customization' => 'boolean',
        'inventory' => 'integer',
        'price_cents' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function collection()
    {
        return $this->belongsTo(Collection::class);
    }

    public function shippingProfile()
    {
        return $this->belongsTo(ShippingProfile::class);
    }

    public function sizes()
    {
        return $this->hasMany(ProductSize::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class)->orderBy('sort_order');
    }
    
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
