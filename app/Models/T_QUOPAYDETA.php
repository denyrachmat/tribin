<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_QUOPAYDETA extends Model
{
    use HasFactory;
    protected $table = 'T_QUOPAYDETA';

    protected $fillable = [
        'TQUOPAYDETA_QUOCD',
        'TQUOPAYDETA_IDPAY',
    ];
}
