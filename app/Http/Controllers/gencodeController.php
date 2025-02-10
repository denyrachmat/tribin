<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M_GENCODE;

class gencodeController extends Controller
{
    public function getGencode($code)
    {
        return M_GENCODE::where('MGECD_CODE', base64_decode($code))
            ->where('MGECD_ACTIVE', 1)
            ->get();
    }
}
