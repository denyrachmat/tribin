<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_DLVORDHEAD extends Model
{
    use HasFactory;
    protected $table = 'T_DLVORDHEAD';
    protected $fillable = [
        'TDLVORD_DLVCD', 'TDLVORD_BRANCH', 'TDLVORD_CUSCD', 'TDLVORD_LINE',
        'TDLVORD_ISSUDT', 'TDLVORD_REMARK', 'TDLVORD_INVCD', 'updated_by', 'TDLVORD_MEKANIK', 'TDLVORD_JALAN_COST',
        'TDLVORD_VEHICLE_REGNUM','TDLVORD_REC_NO'
    ];

    public function dlvdet() {
        return $this->hasMany(T_DLVORDDETA::class, 'TDLVORDDETA_DLVCD', 'TDLVORD_DLVCD');
    }

    public function dlvacc() {
        return $this->hasMany(T_DLVACCESSORY::class, 'TDLVACCESSORY_DLVCD', 'TDLVORD_DLVCD');
    }
}
