<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\T_SRV_FIXDET;
class T_SRV_DET extends Model
{
    use HasFactory;

    protected $table = 'T_SRV_DET';
    protected $fillable = [
        'TSRVH_ID',
        'TSRVD_ITMCD',
        'TSRVD_LINE',
        'TSRVD_FLGSTS',
        'TSRVD_REMARK',
        'TSRVD_CUSTRMK',
        'TSRVD_QTY',
        'created_by',
    ];

    public function listFixDet() {
        return $this->hasMany(T_SRV_FIXDET::class, 'TSRVD_ID', 'id');
    }
}
