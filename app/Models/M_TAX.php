<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_TAX extends Model
{
    use HasFactory;
    protected $table = 'M_TAX';
    protected $fillable = [
        'MTAX_CODE',
        'MTAX_DESC',
        'MTAX_CODEH',
        'MTAX_TYPE',
        'MTAX_AMT',
        'MTAX_EFFDT',
        'MTAX_TAXMIN',
        'MTAX_TAXMAX',
    ];

    public function childTaxes()
    {
        return $this->hasMany(M_TAX::class, 'MTAX_CODEH', 'MTAX_CODE');
    }

    public function taxes()
    {
        return $this->childTaxes()->with('taxes');
    }
}
