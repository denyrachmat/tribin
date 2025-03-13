<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Models\M_GENCODE;

trait gencodeTraits
{
    public function getGencode($code, $type = '=')
    {
        return M_GENCODE::select('mg.*', 'mg2.MGECD_VALUE as CODE_VALUE')
            ->from('M_GENCODE as mg')
            ->leftjoin('M_GENCODE as mg2', 'mg.MGECD_VALUE', '=', 'mg2.MGECD_CODE')
            ->where('mg.MGECD_CODE',$type,  base64_decode($code).($type === 'like' ? '%' : null))
            ->where('mg.MGECD_ACTIVE', 1)
            ->get();
    }

    public function getDynamicsGencode(Request $request) {
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
            $gencode = M_GENCODE::updateOrCreate([
                'MGECD_CODE' => $value['MGECD_CODE'],
                'MGECD_VALUE' => $value['MGECD_VALUE'],
            ],[
                'MGECD_CODE' => $value['MGECD_CODE'],
                'MGECD_VALUE' => $value['MGECD_VALUE'],
                'MGECD_DESC' => $value['MGECD_DESC'],
                'MGECD_ACTIVE' => $value['MGECD_ACTIVE'],
            ]);
        }

        return "Data Berhasil Disimpan";
    }
}
