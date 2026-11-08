<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ShippingRate extends Model
{
    use HasFactory;

    protected $fillable = ['shipping_profile_id', 'country_code', 'amount_cents', 'currency'];

    public function profile()
    {
        return $this->belongsTo(ShippingProfile::class, 'shipping_profile_id');
    }
}
