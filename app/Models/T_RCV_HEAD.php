<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class T_RCV_HEAD extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'T_RCV_HEAD';
    protected $fillable = [
        'deleted_at', 'deleted_by',
        'TRCV_RCVCD',  'TRCV_BRANCH', 'TRCV_SUPCD', 'TRCV_ISSUDT',
        'created_by', 'updated_by',
        'TRCV_DOCNO', 
        'TRCV_REFFNO'
    ];

    public function det() {
        return $this->hasMany(T_RCV_DETAIL::class, 'id_header');
    }

    public function bc() {
        return $this->hasMany(T_RCV_BC_DETAIL::class, 'TRCVBC_DOCNO', 'TRCV_RCVCD');
    }
}
