<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class T_TAX_MAP extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'T_TAX_MAP';
    protected $fillable = [
        'TTAXM_DOCNO',
        'TTAXM_TYPE',
        'TTAXM_AMTB4TAX',
        'TTAXM_TAXAMT',
        'TTAXM_AMTAFTAX',
        'TTAXM_CG',
    ];
}
