<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_POS extends Model
{
    use HasFactory;

    protected $fillable = [
        'TPOS_DOCNO',
        'TPOS_CUSTCD',
        'created_by',
    ];
}
