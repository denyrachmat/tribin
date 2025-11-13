<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_ITMBPRICE extends Model
{
    use HasFactory;
    protected $table = 'M_ITMBPRICE';
    protected $fillable = [
        'MITMBPRC_ITMCD',
        'MITMBPRC_PRC',
        'MITMBPRC_STARTDT',
        'MITMBPRC_ENDDT',
        'MITMBPRC_ACTIVE',
        'MITMBPRC_CG',
        'MITMBPRC_BRANCH',
        'created_by',
    ];
}
