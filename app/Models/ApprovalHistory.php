<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ApprovalHistory extends Model
{
    use HasFactory;
    protected $table = 'approval_histories';
    protected $fillable = [
        'form', 'code', 'type', 'action', 'remark', 'note', 'meta', 'branch',  'created_by', 'updated_by', 'deleted_at', 'deleted_by'
    ];
}
