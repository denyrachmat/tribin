<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BranchPaymentAccount extends Model
{
    use HasFactory;
    protected $fillable = [
        'bank_name', 'bank_account_name', 'connection', 'bank_account_number', 'created_by', 'updated_by',
        'BRANCH', 'deleted_at', 'deleted_by'
    ];

    public function coa() {
        return $this->hasOne(M_COA::class, 'MCOA_COACD', 'bank_account_number');
    }
}
