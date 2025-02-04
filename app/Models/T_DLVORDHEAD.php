<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Crypt;

class T_DLVORDHEAD extends Model
{
    use HasFactory;
    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }
    protected $table = 'T_DLVORDHEAD';
    protected $fillable = [
        'TDLVORD_DLVCD',
        'TDLVORD_BRANCH',
        'TDLVORD_CUSCD',
        'TDLVORD_LINE',
        'TDLVORD_ISSUDT',
        'TDLVORD_REMARK',
        'TDLVORD_INVCD',
        'updated_by',
        'TDLVORD_MEKANIK',
        'TDLVORD_JALAN_COST',
        'TDLVORD_VEHICLE_REGNUM',
        'TDLVORD_REC_NO',
        'TDLVORD_CONDGRP',
        'TDLVOR_ISSPLITSJ',
        'TDLVORD_TYPE'
    ];

    public function dlvdet()
    {
        return $this->hasMany(T_DLVORDDETA::class, 'TDLVORDDETA_DLVCD', 'TDLVORD_DLVCD');
    }

    public function dlvdetAllData()
    {
        return $this->hasMany(T_DLVORDDETA::class);
    }

    public function dlvacc()
    {
        return $this->hasMany(T_DLVACCESSORY::class, 'TDLVACCESSORY_DLVCD', 'TDLVORD_DLVCD');
    }

    public function dlvsj()
    {
        return $this->hasOne(T_DLVSJDETA::class, 'TDLVSJDETA_DLVCD', 'TDLVORD_DLVCD');
    }

    public function payment()
    {
        $branchPaymentAccount = (new BranchPaymentAccount())->setConnection($this->dedicatedConnection);
        $tDlvpaydeta = (new T_DLVPAYDETA())->setConnection($this->dedicatedConnection);
        // return $this->hasMany(T_DLVPAYDETA::class, 'TDLVPAYDETA_DLVCD', 'TDLVORD_DLVCD');
        return $this->hasManyThrough(
            $branchPaymentAccount,
            $tDlvpaydeta,
            'TDLVPAYDETA_DLVCD',
            'id',
            'TDLVORD_DLVCD',
            'TDLVPAYDETA_IDPAY',
        );
    }

    public function condition()
    {
        return $this->hasMany(M_COND_GROUP::class, 'MCOND_GRPNM', 'TDLVORD_CONDGRP');
    }

    public function spk()
    {
        return $this->hasMany(C_SPK::class, 'CSPK_REFF_DOC', 'TDLVORD_DLVCD');
    }
}
