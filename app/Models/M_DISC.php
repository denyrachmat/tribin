<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_DISC extends Model
{
    use HasFactory;

    protected $table = 'M_DISC';
    protected $fillable = [
        'MDISC_CODE',
        'MDISC_DESC',
        'MDISC_PERCENT',
        'MDISC_AMT',
    ];
}
