<?php

namespace App\Http\Controllers\payroll;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\payroll\Deduction;
use App\Models\payroll\Position;
use Response;
use App\Models\User;

class DashboardController extends Controller
{
    private $folder = "payroll.";

    public function dashboard()
    {
    	return View($this->folder."dashboard.dashboard",[
    		'deductions'=> Deduction::latest('id')->get(),
    		'total_deduction' => Deduction::sum('amount'),
    		'positions'=> Position::inRandomOrder()->get(),
            'counts' => [
                'employees' => User::count(),
                'on_time_perc' => 0,
                'on_time_attendance' => 0,
                'late_attendance' => 0
            ]
    	]);
    }
}
