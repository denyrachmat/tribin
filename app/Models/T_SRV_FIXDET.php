<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_SRV_FIXDET extends Model
{
    use HasFactory;
    protected $table = 'T_SRV_FIXDET';
    protected $fillable = [
        'TSRVD_ID',
        'TSRVF_ITMCD',
        'TSRVF_PRC',
        'TSRVF_QTY',
        'created_by',
    ];
}
