<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class M_GENCODE extends Model
{
    use HasFactory;

    protected $table = 'M_GENCODE';
    protected $fillable = [
        'MGECD_CODE',
        'MGECD_VALUE',
        'MGECD_ACTIVE',
        'MGECD_DESC',
        'MGECD_DESC2',
        'MGECD_DESC3',
        'MGECD_CG',
        'MGECD_FLAG',
        'MGECD_BRANCH',
        'MGECD_PARENT'
    ];

    public function parent()
    {
        return $this->belongsTo(M_GENCODE::class, 'MGECD_PARENT', 'MGECD_CODE');
    }

    public function childrenOne()
    {
        return $this->hasMany(M_GENCODE::class, 'MGECD_PARENT', 'id');
    }

    public function children()
    {
        return $this->childrenOne()->with('children');
    }

    
}
