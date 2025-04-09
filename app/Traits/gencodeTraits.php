<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Models\M_GENCODE;
use Illuminate\Support\Facades\Crypt;
use DB;

trait gencodeTraits
{
    public function getGencode($code, $value = '', $cg = '')
    {
        $dataHead = M_GENCODE::select('mg.*', DB::raw('(
                SELECT MGECD_VALUE FROM M_GENCODE
                WHERE MGECD_CODE = mg.MGECD_VALUE
                AND (MGECD_CG = mg.MGECD_CG OR MGECD_CG IS NULL)
            ) as CODE_VALUE'))
            ->from('M_GENCODE as mg')
            // ->leftjoin('M_GENCODE as mg2', 'mg.MGECD_VALUE', '=', 'mg2.MGECD_CODE')
            ->where('mg.MGECD_CODE', base64_decode($code))
            ->where('mg.MGECD_ACTIVE', 1);

        if (!empty($value)) {
            $hasil = (clone $dataHead)->where('mg.MGECD_VALUE', base64_decode($value))->whereNull('mg.MGECD_CG')->first();
            if ($cg != '') {
                $conn = Crypt::decryptString($cg);
                $dataByCG = (clone $dataHead)->where('mg.MGECD_CG', $conn)->first();
                $hasil = $dataByCG;
            }
        } else {
            $hasil = (clone $dataHead)->whereNull('mg.MGECD_CG')->get()->toArray();

            if ($cg != '') {
                $conn = Crypt::decryptString($cg);
                $dataByCG = (clone $dataHead)->where('mg.MGECD_CG', $conn)->get()->toArray();
                if (count($dataByCG) > 0)
                    $hasil = array_merge($hasil, $dataByCG);
            }
        }

        return $hasil;
    }

    public function getDynamicsGencode(Request $request)
    {
        $select = $request->has('select') ? $request->select : 'mg.*';
        $data = M_GENCODE::select($select, 'mg2.MGECD_VALUE as CODE_VALUE')
            ->from('M_GENCODE as mg')
            ->leftjoin('M_GENCODE as mg2', 'mg.MGECD_VALUE', '=', 'mg2.MGECD_CODE');

        if ($request->has('where') && count($request->where) > 0) {
            foreach ($request->where as $key => $valueWhere) {
                $data->where($valueWhere['col'], $valueWhere['opr'], $valueWhere['val']);
            }
        }

        if ($request->has('group')) {
            $data->groupBy($request->group);
        }

        return $data->get();
    }

    public function saveGencode(Request $request)
    {
        foreach ($request->data as $key => $value) {
            if (!empty($value['MGECD_VALUE'])) {

                $gencode = M_GENCODE::updateOrCreate([
                    'MGECD_CODE' => $value['MGECD_CODE'],
                    'MGECD_VALUE' => $value['MGECD_VALUE'],
                    'MGECD_CG' => isset($value['MGECD_CG']) ? Crypt::decryptString($value['MGECD_CG']) : null,
                ], [
                    'MGECD_CODE' => $value['MGECD_CODE'],
                    'MGECD_VALUE' => $value['MGECD_VALUE'],
                    'MGECD_DESC' => $value['MGECD_DESC'],
                    'MGECD_DESC2' => isset($value['MGECD_DESC2']) ? $value['MGECD_DESC2'] : null,
                    'MGECD_ACTIVE' => $value['MGECD_ACTIVE'],
                    'MGECD_CG' => isset($value['MGECD_CG']) ? Crypt::decryptString($value['MGECD_CG']) : null,
                ]);
            } else {
                $gencode = M_GENCODE::where('MGECD_CODE', $value['MGECD_CODE'])
                    ->delete();
            }
        }

        return "Data Berhasil Disimpan";
    }
}
