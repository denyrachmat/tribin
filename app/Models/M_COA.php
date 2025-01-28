<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_COA extends Model
{
    use HasFactory;
    protected $primaryKey = 'MCOA_COACD';
    public $incrementing = false;
    protected $table = 'M_COA';
    protected $fillable = [
        'MCOA_COACD',
        'MCOA_COANM',
        'MCOA_BRANCH',
        'MCOA_PARENT',
        'MCOA_TYPE',
        'MCOA_CURR'
    ];

    public function map() {
        return $this->hasMany(M_COA_MAP::class, 'MCOAM_H_COACD', 'MCOA_COACD');
    }
}
