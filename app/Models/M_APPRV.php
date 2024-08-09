<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_APPRV extends Model
{
    use HasFactory;
    protected $fillable = [
        'MAPPRV_USERID',
        'MAPPRV_SEC',
        'MAPPRV_RPTNM',
        'MAPPRV_SIGNPATH',
        'MAPPRV_CG',
        'MAPPRV_BRANCH',
    ];
}
