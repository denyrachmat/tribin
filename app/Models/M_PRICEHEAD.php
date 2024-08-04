<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_PRICEHEAD extends Model
{
    use HasFactory;
    protected $table = 'M_PRICEHEAD';
    protected $fillable = [
        'name_price',
        'price_desc',
        'first_date',
        'end_date',
    ];
}
