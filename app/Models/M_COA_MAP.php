<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_COA_MAP extends Model
{
    use HasFactory;
    protected $table = 'M_COA_MAP';
    protected $fillable = [
        'MCOAM_H_COACD',
        'MCOAM_CR_COACD',
        'MCOAM_DB_COACD',
        'MCOAM_DESC',
    ];
}
