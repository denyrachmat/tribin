<?php

namespace App\Traits;

use Illuminate\Http\Request;
use App\Models\T_TAX_MAP;
use App\Models\M_TAX;

trait taxesTraits
{

    protected function processTaxes($taxes, $request)
    {
        foreach ($taxes as $tax) {
            $calcTax = $tax->MTAX_TYPE == 'PERCENT'
                ? (float)$request->AMOUNT * ((float)$tax->MTAX_AMT / 100)
                : $tax->MTAX_AMT;

            T_TAX_MAP::updateOrCreate([
                'TTAXM_DOCNO' => $request->TTAXM_DOCNO,
                'TTAXM_CG' => $request->TTAXM_CG,
                'TTAXM_TYPE' => $tax->MTAX_CODE,
            ], [
                'TTAXM_DOCNO' => $request->TTAXM_DOCNO,
                'TTAXM_CG' => $request->TTAXM_CG,
                'TTAXM_TYPE' => $tax->MTAX_CODE,
                'TTAXM_AMTB4TAX' => $request->AMOUNT,
                'TTAXM_TAXAMT' => $calcTax,
                'TTAXM_AMTAFTAX' => $request->AMOUNT + $calcTax,
            ]);

            if ($tax->taxes) {
                $this->processTaxes($tax->taxes, $request);
            }
        }
    }

    public function storeTaxes(Request $request)
    {
        $getTaxes = M_TAX::where('MTAX_CODE', $request->MTAX_CODE)->with('taxes')->first();

        if ($getTaxes && $getTaxes->taxes) {
            $calcTax = $getTaxes->MTAX_TYPE == 'PERCENT'
                ? (float)$request->AMOUNT * ((float)$getTaxes->MTAX_AMT / 100)
                : $getTaxes->MTAX_AMT;

            T_TAX_MAP::updateOrCreate([
                'TTAXM_DOCNO' => $request->TTAXM_DOCNO,
                'TTAXM_CG' => $request->TTAXM_CG,
                'TTAXM_TYPE' => $getTaxes->MTAX_CODE,
            ], [
                'TTAXM_DOCNO' => $request->TTAXM_DOCNO,
                'TTAXM_CG' => $request->TTAXM_CG,
                'TTAXM_TYPE' => $getTaxes->MTAX_CODE,
                'TTAXM_AMTB4TAX' => $request->AMOUNT,
                'TTAXM_TAXAMT' => $calcTax,
                'TTAXM_AMTAFTAX' => $request->AMOUNT + $calcTax,
            ]);

            $this->processTaxes($getTaxes->taxes, $request);
        }

        return $getTaxes;
    }

    public function getTaxes($doc, $cg) {
        $data = T_TAX_MAP::where('TTAXM_DOCNO', $doc)
            ->join('M_TAX', 'M_TAX.MTAX_CODE', '=', 'T_TAX_MAP.TTAXM_TYPE')
            ->where('TTAXM_CG', $cg)
            ->get()
            ->toArray();

        return $data;
    }

    public function deleteTaxes($doc, $cg) {
        $data = T_TAX_MAP::where('TTAXM_DOCNO', $doc)
            ->where('TTAXM_CG', $cg)
            ->delete();

        return $data;
    }
}
