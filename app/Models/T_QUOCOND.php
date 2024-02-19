<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_QUOCOND extends Model
{
    use HasFactory;
    protected $table = 'T_QUOCOND';
    protected $fillable = [
        'TQUOCOND_QUOCD',
        'deleted_at', 'deleted_by', 'TQUODETA_QUOCD',
        'TQUODETA_CONDI', 'created_by', 'updated_by', 'TQUOCOND_BRANCH',
        'TQUOCOND_GROUP', 'TQUOCOND_CONDI'
    ];
}
