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

    public function saveGencode(Request $request)
    {
        foreach ($request as $key => $value) {
            $gencode = new M_GENCODE;
            $gencode->MGECD_CODE = $value['MGECD_CODE'];
            $gencode->MGECD_VALUE = $value['MGECD_VALUE'];
            $gencode->MGECD_DESC = $value['MGECD_DESC'];
            $gencode->MGECD_ACTIVE = $value['MGECD_ACTIVE'];

            $gencode->save();
        }

        return "Data Berhasil Disimpan";
    }
}
