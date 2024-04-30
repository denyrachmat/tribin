<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_DLVSJDETA extends Model
{
    use HasFactory;
    protected $table = 'T_DLVSJDETA';

    protected $fillable = [
        'TDLVSJDETA_DLVCD',
        'TDLVSJDETA_TYPE',
        'TDLVSJDETA_CONDGRP',
        'TDLVSJDETA_STARTDT',
        'TDLVSJDETA_ENDDT',
    ];

    public function condition() {
        return $this->hasMany(M_Condition::class, 'TDLVSJDETA_CONDGRP', 'MCONDITION_RPT_STAT');
    }
}
