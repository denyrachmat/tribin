<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_COND_GROUP extends Model
{
    use HasFactory;
    protected $table = 'M_COND_GROUP';
    protected $fillable = [
        'MCOND_GRPNM',
        'MCOND_ID',
    ];
}
