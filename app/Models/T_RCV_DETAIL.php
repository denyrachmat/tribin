<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class T_RCV_DETAIL extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'T_RCV_DETAIL';
    protected $fillable = [
        'deleted_at', 'deleted_by',
        'id_header',  'branch', 'po_number', 'item_code', 'quantity', 'unit_price',
        'created_by', 'updated_by'
    ];

    public function ithLine() {
        return $this->hasMany(C_ITRN::class, 'id', 'id_reff');
    }
}
