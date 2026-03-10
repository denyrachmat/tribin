<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_POS_DET extends Model
{
    use HasFactory;
    protected $table = 'T_POS_DET';

    protected $fillable = [
        'TPOSH_ID',
        'TPOSD_ITMCD',
        'TPOSD_QTY',
        'TPOSD_BC',
        'TPOSD_PRC'
    ];
}
