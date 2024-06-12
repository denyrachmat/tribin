<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_DLVPAYDETA extends Model
{
    use HasFactory;
    protected $table = 'T_DLVPAYDETA';

    protected $fillable = [
        'TDLVPAYDETA_DLVCD',
        'TDLVPAYDETA_IDPAY',
    ];

    public function paysdetail () {
        return $this->hasOne(BranchPaymentAccount::class, 'id', 'TDLVPAYDETA_IDPAY');
    }
}
