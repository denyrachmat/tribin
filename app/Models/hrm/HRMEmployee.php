<?php

namespace App\Models\hrm;

use Illuminate\Database\Eloquent\Model;

class HRMEmployee extends Model
{
    protected $connection = 'payroll_jos';
    protected $table = 'employees';
    protected $primaryKey = 'employee_id';
    
    protected $fillable = [
        'employee_id',
        'full_name',
        'email',
        'gender',
        'date_of_birth',
        'martial_status',
        'id_type',
        'national_id_no',
        'start_contract_date',
        'end_contract_date',
        'job_position',
        'bpjs_tk_no',
        'bpjs_health_no',
        'tax_id',
        'medical_insurance',
        'work_status',
        'currency',
        'payroll_type',
        'salary',
        'daily_salary',
        'craft_incentives',
        'meal_allowance',
        'address',
        'branch_office_id',
        'department_id',
        'bank_id',
        'bank_account_name',
        'bank_account_number',
        'use_gps_location',
        'password',
        'photo',
        'device_id',
        'token_fcm',
        'reset_token',
    ];
}

