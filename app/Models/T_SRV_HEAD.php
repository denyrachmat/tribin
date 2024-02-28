<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_SRV_HEAD extends Model
{
    use HasFactory;

    protected $table = 'T_SRV_HEAD';
    protected $fillable = [
        'SRVH_DOCNO',
        'SRVH_CUSCD',
        'SRVH_BRANCH',
        'SRVH_ISSDT',
        'created_by',
    ];
}
