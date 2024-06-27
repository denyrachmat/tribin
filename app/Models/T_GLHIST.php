<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_GLHIST extends Model
{
    use HasFactory;
    protected $table = 'T_GLHIST';

    protected $fillable = [
        'GLHIST_ACC',
        'GLHIST_AMT',
        'GLHIST_CURR',
        'GLHIST_DESC',
        'GLHIST_DOC',
        'GLHIST_EFFDT',
        'GLHIST_CRDT',
        'GLHIST_DOCTYPE',
        'GLHIST_ITMCD'
    ];
}
