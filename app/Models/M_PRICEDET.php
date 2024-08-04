<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_PRICEDET extends Model
{
    use HasFactory;
    protected $table = 'M_PRICEDET';
    protected $fillable = [
        'name_price_head',
        'item_code',
        'item_name',
        'price',
        'per_qty',
        'vat',
        'vat_id',
    ];
}
