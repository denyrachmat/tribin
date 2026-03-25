<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class T_POS extends Model
{
    use HasFactory;
    protected $table = 'T_POS';

    protected $fillable = [
        'TPOS_DOCNO',
        'TPOS_CUSTCD',
        'TPOS_PAY',
        'created_by',
    ];

    public function det(){
        return $this->hasMany(T_POS_Det::class, 'TPOSH_ID', 'id');
    }
}
