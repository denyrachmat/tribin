<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_LOC_REQ extends Model
{
    use HasFactory;
    protected $table = 'T_LOC_REQ';

    protected $fillable = [
        'TLOCREQ_DOCNO',
        'TLOCREQ_ITMCD',
        'TLOCREQ_QTY',
        'TLOCREQ_APPRVDT',
        'TLOCREQ_FRLOC',
        'TLOCREQ_TOLOC',
        'TLOCREQ_APPRVBY',
    ];
}
