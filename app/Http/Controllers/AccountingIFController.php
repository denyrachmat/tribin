<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\T_SLOHEAD;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

class AccountingIFController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    public function listUnRegisteredData() : Object {
        return DB::connection($this->dedicatedConnection)->table('V_UNREG_ACCT_DATA')
            ->get();
    }
}
