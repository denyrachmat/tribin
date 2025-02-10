<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_GENCODE extends Model
{
    use HasFactory;

    protected $table = 'M_GENCODE';
    protected $fillable = [
        'MGECD_CODE',
        'MGECD_VALUE',
        'MGECD_DESC',
        'MGECD_ACTIVE',
    ];
}
