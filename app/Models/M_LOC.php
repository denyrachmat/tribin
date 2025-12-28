<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class M_LOC extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'M_LOC';
    protected $fillable = [
        'MLOC_LOCCD',
        'MLOC_LOCNM',
        'MLOC_LEVEL',
        'MLOC_PARENTID',
        'MLOC_CAPA',
        'MLOC_ISACTIVE',
        'MLOC_CG',
        'MLOC_BRANCH',
        'created_by',
    ];
}
