<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BranchPaymentAccount extends Model
{
    use HasFactory,SoftDeletes;
    protected $fillable = [
        'bank_name', 'bank_account_name', 'connection', 'bank_account_number', 'created_by', 'updated_by',
        'BRANCH', 'deleted_at', 'deleted_by'
    ];

    public function coa() {
        return $this->hasOne(M_COA::class, 'MCOA_COACD', 'bank_account_number');
    }
}
