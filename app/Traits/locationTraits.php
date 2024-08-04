<?php

namespace App\Traits;

use App\Models\C_ITRN;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\Models\T_RCV_BC_DETAIL;
use App\Models\T_RCV_DETAIL;
use App\Models\T_RCV_HEAD;

trait LocationTraits
{
    function transferLoc(Request $request)
    {
        # data quotation detail item
        $validator = Validator::make($request->all(), [
            'LOCFROM' => 'required',
            'ITMCD' => 'required',
            'QTY' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $cekStock = DB::connection($this->dedicatedConnection)->table('V_STOCK_CHECK')
            ->where('CITRN_ITMCD', $request->ITMCD)
            ->where('CITRN_LOCCD', $request->LOCFROM)
            ->first();

        if ($cekStock === null || (!empty($cekStock) && $cekStock->CITRN_ITMQT < $request->QTY)) {
            return response([
                'STOK' => ['Stock less than inputed qty or stock not exists!!']
            ], 406);
        } else {
            $cekLatestTrf = C_ITRN::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)', date('Y')))
                ->where('CITRN_FORM', 'INC-TRF-LOC')
                ->where('CITRN_DOCNO', 'like', 'TRF%')
                ->first();

            if (empty($cekLatestTrf)) {
                $TRFCODE = 'TRF' . date('Y') . '0001';
            } else {
                $TRFCODE = 'TRF' . date('Y') . sprintf('%04d', (int) substr($cekLatestTrf->CITRN_DOCNO, -3) + 1);
            }

            // Issue Stock
            $iss = C_ITRN::on($this->dedicatedConnection)->create([
                'CITRN_BRANCH' => Auth::user()->branch,
                'CITRN_LOCCD' => $request->LOCFROM,
                'CITRN_DOCNO' => $request->has('DOC') && !empty($request->DOC) ? $request->DOC : $TRFCODE,
                'CITRN_ISSUDT' => date('Y-m-d'),
                'CITRN_FORM' => 'OUT-TRF-LOC',
                'CITRN_ITMCD' => $request->ITMCD,
                'CITRN_ITMQT' => $request->QTY * -1,
                'CITRN_PRCPER' => $cekStock->CITRN_PRCPER,
                'CITRN_PRCAMT' => $request->QTY * $cekStock->CITRN_PRCPER,
                'created_by' => Auth::user()->nick_name,
            ]);

            $rcv = null;
            if ($request->has('LOCTO') && !empty($request->LOCTO)) {
                // Receive Stock
                $rcv = C_ITRN::on($this->dedicatedConnection)->create([
                    'CITRN_BRANCH' => Auth::user()->branch,
                    'CITRN_LOCCD' => $request->LOCTO,
                    'CITRN_DOCNO' => $request->has('DOC') && !empty($request->DOC) ? $request->DOC : $TRFCODE,
                    'CITRN_ISSUDT' => date('Y-m-d'),
                    'CITRN_FORM' => 'INC-TRF-LOC',
                    'CITRN_ITMCD' => $request->ITMCD,
                    'CITRN_ITMQT' => $request->QTY,
                    'CITRN_PRCPER' => $cekStock->CITRN_PRCPER,
                    'CITRN_PRCAMT' => $request->QTY * $cekStock->CITRN_PRCPER,
                    'created_by' => Auth::user()->nick_name,
                ]);
            }

            return [
                'msg' => 'OK',
                'DATA' => [
                    'ISS' => $iss,
                    'RCV' => $rcv
                ]
            ];
        }
    }
    // Test
    function createBarcode($idHeader, $item, $date, $qty, $price, $frWH = '', $formout = '', $toWH = '', $forminc = '', $user = null)
    {
        $bc = '';
        $cekLatestBarcode = T_RCV_BC_DETAIL::on($this->dedicatedConnection)
            ->whereBetween('created_at', [date('Y-m-d 00:00:00'), date('Y-m-d 23:59:59')])
            ->first();

        if (empty($cekLatestBarcode)) {
            $bc = 'BC' . date('Ymd') . '0001';
        } else {
            $bc = 'BC' . date('Ymd') . sprintf('%04d', (int) substr($cekLatestBarcode->TRCVBC_BCCD, -3) + 1);
        }

        $header = T_RCV_HEAD::on($this->dedicatedConnection)->where('id', $idHeader)->first();

        $cekStock = DB::connection($this->dedicatedConnection)
            ->table('V_STOCK_CHECK')
            ->where('CITRN_ITMCD', $item)
            ->where('CITRN_DOCNO', $header->TRCV_DOCNO)
            ->first();

        if (!empty($frWH)) {
            C_ITRN::on($this->dedicatedConnection)->create([
                'CITRN_BRANCH' => empty($user) ? Auth::user()->branch : $user->branch,
                'CITRN_LOCCD' => $frWH,
                'CITRN_DOCNO' => $header->TRCV_DOCNO,
                'CITRN_ISSUDT' => $date,
                'CITRN_FORM' => $formout,
                'CITRN_ITMCD' => $item,
                'CITRN_ITMQT' => $qty * -1,
                'CITRN_PRCPER' => $price,
                'CITRN_PRCAMT' => $price * $qty,
                'created_by' => empty($user) ? Auth::user()->nick_name : $user->nick_name,
                'created_at' => date('Y-m-d H:i:s'),
                'id_reff' => empty($cekStock) ? $bc : $cekStock->id_reff,
            ]);
        }

        if (!empty($toWH)) {
            C_ITRN::on($this->dedicatedConnection)->create([
                'CITRN_BRANCH' => empty($user) ? Auth::user()->branch : $user->branch,
                'CITRN_LOCCD' => $toWH,
                'CITRN_DOCNO' => $header->TRCV_DOCNO,
                'CITRN_ISSUDT' => $date,
                'CITRN_FORM' => $forminc,
                'CITRN_ITMCD' => $item,
                'CITRN_ITMQT' => $qty,
                'CITRN_PRCPER' => $price,
                'CITRN_PRCAMT' => $price * $qty,
                'created_by' => empty($user) ? Auth::user()->nick_name : $user->nick_name,
                'created_at' => date('Y-m-d H:i:s'),
                'id_reff' => empty($cekStock) ? $bc : $cekStock->id_reff,
            ]);
        }

        $createDet = T_RCV_DETAIL::on($this->dedicatedConnection)->updateOrCreate([
            'id_header' => $idHeader,
            'item_code' => $item,
        ], [
            'id_header' => $idHeader,
            'item_code' => $item,
            'quantity' => $qty,
            'unit_price' => $price,
            'created_by' => empty($user) ? Auth::user()->nick_name : $user->nick_name,
            'created_at' => date('Y-m-d H:i:s'),
            'branch' => empty($user) ? Auth::user()->branch : $user->branch,
            'po_number' => ''
        ]);

        // Save to be incoming barcode
        T_RCV_BC_DETAIL::on($this->dedicatedConnection)->updateOrCreate([
            'TRCVBC_DOCNO' => $header->TRCV_DOCNO,
            'TRCVBC_BCCD' => empty($cekStock) ? $bc : $cekStock->id_reff,
        ], [
            'TRCVBC_DOCNO' => $header->TRCV_DOCNO,
            'TRCVBC_BCQT' => $qty,
            'TRCVBC_DETID' => $createDet->id
        ]);
    }
}
