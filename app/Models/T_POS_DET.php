<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_POS_DET extends Model
{
    use HasFactory;

    protected $fillable = [
        'TPOSH_ID',
        'TPOSD_ITMCD',
        'TPOSD_QTY',
    ];
}
