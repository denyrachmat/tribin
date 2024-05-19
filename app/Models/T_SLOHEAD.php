<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_SLOHEAD extends Model
{
    use HasFactory;
    protected $table = 'T_SLOHEAD';
    protected $primaryKey = 'TSLO_SLOCD';

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'TSLO_SLOCD', 'TSLO_CUSCD', 'TSLO_LINE', 'TSLO_ATTN', 'TSLO_QUOCD',
        'TSLO_POCD', 'TSLO_ISSUDT', 'TSLO_PLAN_DLVDT', 'TSLO_APPRVBY', 'TSLO_APPRVDT', 'TSLO_ADDRESS_NAME', 'TSLO_ADDRESS_DESCRIPTION',
        'created_by', 'updated_by', 'TSLO_BRANCH', 'TSLO_TYPE', 'TSLO_SERVTRANS_COST', 'TSLO_PERIOD_FR', 'TSLO_PERIOD_TO', 'TSLO_USAGE_DESCRIPTION',
        'TSLO_MAP_URL', 'TSLO_ISCON'
    ];

    public function det() {
        return $this->hasMany(T_SLODETA::class, 'TSLODETA_SLOCD', 'TSLO_SLOCD');
    }

    public function cust() {
        return $this->hasOne(M_CUS::class, 'MCUS_CUSCD', 'TQUO_CUSCD');
    }

    public function quot() {
        return $this->hasOne(T_QUOHEAD::class, 'TQUO_QUOCD', 'TSLO_QUOCD');
    }

    public function dlv() {
        return $this->hasMany(T_DLVORDDETA::class, 'TDLVORDDETA_SLOCD', 'TSLO_SLOCD');
    }
}
