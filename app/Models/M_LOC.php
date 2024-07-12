<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_LOC extends Model
{
    use HasFactory;
    protected $table = 'M_LOC';
    protected $fillable = [
        'MLOC_LOCCD',
        'MLOC_LOCNM',
        'MLOC_LOCPRNTCD',
        'created_by',
    ];
}
