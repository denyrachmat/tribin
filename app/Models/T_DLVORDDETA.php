<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_DLVORDDETA extends Model
{
    use HasFactory;
    protected $table = 'T_DLVORDDETA';
    protected $fillable = [
        'created_by', 'deleted_at', 'deleted_by', 'TDLVORDDETA_DLVCD', 'TDLVORDDETA_BRANCH',
        'TDLVORDDETA_ITMCD', 'TDLVORDDETA_ITMQT', 'TDLVORDDETA_PRC', 'updated_by', 'TDLVORDDETA_ITMCD_ACT', 'TDLVSJDETA_CONDGRP'
    ];

    public function sloHead() {
        return $this->hasOne(T_SLOHEAD::class, 'TSLO_SLOCD', 'TDLVORDDETA_SLOCD');
    }

    public function condition() {
        return $this->hasMain(M_Condition::class, 'MCOND_GRPNM', 'TDLVSJDETA_CONDGRP');
    }
}
