<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_SRV_DET extends Model
{
    use HasFactory;

    protected $table = 'T_SRV_DET';
    protected $fillable = [
        'TSRVH_ID',
        'TSRVD_ITMCD',
        'TSRVD_LINE',
        'TSRVD_FLGSTS',
        'TSRVD_REMARK',
        'TSRVD_CUSTRMK',
        'TSRVD_QTY',
        'created_by',
    ];
}
