<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class T_RCV_BC_DETAIL extends Model
{
    use HasFactory;
    protected $table = 'T_RCV_BC_DETAIL';
    protected $fillable = [
        'TRCVBC_BCCD',
        'TRCVBC_DOCNO',
        'TRCVBC_BCQT',
        'TRCVBC_DETID',
    ];

    public function det() {
        return $this->hasMany(T_RCV_DETAIL::class, 'id_header');
    }
}
