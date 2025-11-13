<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_ITMSPRICE extends Model
{
    use HasFactory;
    protected $table = 'M_ITMSPRICE';
    protected $fillable = [
        'id',
        'MITMSPRC_ITMCD',
        'MITMSPRC_TYPE',
        'MITMSPRC_PRC',
        'MITMSPRC_STARTDT',
        'MITMSPRC_ENDDT',
        'MITMSPRC_ACTIVE',
        'MITMSPRC_CG',
        'MITMSPRC_BRANCH',
        'created_by'
    ];
}
