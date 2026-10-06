<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ITEM_MAPPING extends Model
{
    use HasFactory;

    protected $table = 'ITEM_MAPPINGS';

    protected $fillable = [
        'created_by', 'updated_by',
        'MAP_ROLE', 'MAP_CG', 'MAP_BRANCH', 'MAP_ITMCD', 'MAP_LOCCD', 'MAP_ACTIVE',
    ];
}
