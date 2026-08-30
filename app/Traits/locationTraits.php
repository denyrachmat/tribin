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
use App\Models\M_GENCODE;

trait LocationTraits
{
    const FLAG_INC = 1;
    const FLAG_OUT = 3;

    public function routeByEvent($event, $cg = null, $branch = null)
    {
        $query = M_GENCODE::where('MGECD_CODE', $event)
            ->where('MGECD_ACTIVE', 1)
            ->orderBy('MGECD_ORDER', 'asc')
            ->orderBy('id', 'asc');

        if (!empty($cg)) {
            $query->where(function ($q) use ($cg) {
                $q->where('MGECD_CG', $cg)->orWhereNull('MGECD_CG');
            });
        }

        if (!empty($branch)) {
            $query->where('MGECD_BRANCH', $branch);
        }

        return $query->get()->toArray();
    }

    public function whFor($event, $flag, $cg = null, $branch = null)
    {
        $legs = $this->routeByEvent($event, $cg, $branch);
        foreach ($legs as $leg) {
            if ((int) $leg['MGECD_FLAG'] === (int) $flag) {
                return $leg;
            }
        }
        return null;
    }

    public function createStockRow($loc, $form, $data, $sign, $cg = null, $branch = null)
    {
        $conn = !empty($cg) ? $cg : $this->dedicatedConnection;
        $branch = $branch ?? (Auth::check() ? Auth::user()->branch : null);

        $price = 0;
        $cek = DB::connection($conn)->table('V_STOCK_CHECK')
            ->where('CITRN_ITMCD', $data['ITMCD'])
            ->where('CITRN_LOCCD', $loc);
        if (!empty($data['BC'])) {
            $cek->where('id_reff', $data['BC']);
        }
        $cek = $cek->first();
        $price = $cek->CITRN_PRCPER ?? 0;

        return C_ITRN::on($conn)->create([
            'CITRN_BRANCH' => $branch,
            'CITRN_LOCCD' => $loc,
            'CITRN_DOCNO' => $data['DOC'] ?? '',
            'CITRN_ISSUDT' => date('Y-m-d'),
            'CITRN_FORM' => $form,
            'CITRN_ITMCD' => $data['ITMCD'],
            'CITRN_ITMQT' => (float) $data['QTY'] * $sign,
            'CITRN_PRCPER' => $price,
            'CITRN_PRCAMT' => $price * abs((float) $data['QTY']),
            'created_by' => Auth::check() ? Auth::user()->nick_name : null,
            'id_reff' => $data['BC'] ?? null,
        ]);
    }

    public function upsertStockRow($loc, $form, $data, $sign, $cg = null, $branch = null)
    {
        $conn = !empty($cg) ? $cg : $this->dedicatedConnection;
        $branch = $branch ?? (Auth::check() ? Auth::user()->branch : null);

        $price = 0;
        $cek = DB::connection($conn)->table('V_STOCK_CHECK')
            ->where('CITRN_ITMCD', $data['ITMCD'])
            ->where('CITRN_LOCCD', $loc);
        if (!empty($data['BC'])) {
            $cek->where('id_reff', $data['BC']);
        }
        $cek = $cek->first();
        $price = $cek->CITRN_PRCPER ?? 0;

        $attrs = [
            'CITRN_BRANCH' => $branch,
            'CITRN_LOCCD' => $loc,
            'CITRN_DOCNO' => $data['DOC'] ?? '',
            'CITRN_FORM' => $form,
            'CITRN_ITMCD' => $data['ITMCD'],
        ];
        $values = array_merge($attrs, [
            'CITRN_ISSUDT' => date('Y-m-d'),
            'CITRN_ITMQT' => (float) $data['QTY'] * $sign,
            'CITRN_PRCPER' => $price,
            'CITRN_PRCAMT' => $price * abs((float) $data['QTY']),
            'created_by' => Auth::check() ? Auth::user()->nick_name : null,
            'id_reff' => $data['BC'] ?? null,
        ]);

        return C_ITRN::on($conn)->updateOrCreate($attrs, $values);
    }

    public function runRoute($event, $data = [], $cg = null, $branch = null, $mimic = false)
    {
        $legs = $this->routeByEvent($event, $cg, $branch);
        if (empty($legs)) {
            return ['status' => false, 'error' => "No route configured for event {$event}"];
        }

        $branch = $branch ?? (Auth::check() ? Auth::user()->branch : null);
        $results = [];
        $pendingOut = null;

        foreach ($legs as $leg) {
            $flag = (int) $leg['MGECD_FLAG'];

            if ($flag === self::FLAG_OUT) {
                $pendingOut = $leg;
                continue;
            }

            if ($flag === self::FLAG_INC) {
                if (!empty($pendingOut)) {
                    if ($mimic) {
                        $results[] = $this->upsertStockRow($pendingOut['MGECD_VALUE'], $pendingOut['MGECD_DESC'], $data, -1, $cg, $branch);
                        $results[] = $this->upsertStockRow($leg['MGECD_VALUE'], $leg['MGECD_DESC'], $data, 1, $cg, $branch);
                    } else {
                        $res = $this->transferLoc(new Request([
                            'LOCFROM' => $pendingOut['MGECD_VALUE'],
                            'LOCTO' => $leg['MGECD_VALUE'],
                            'OUTFORM' => $pendingOut['MGECD_DESC'],
                            'INCFORM' => $leg['MGECD_DESC'],
                            'ITMCD' => $data['ITMCD'],
                            'QTY' => $data['QTY'],
                            'DOC' => $data['DOC'] ?? null,
                            'BC' => $data['BC'] ?? null,
                            'cg' => $cg,
                            'branch' => $branch,
                        ]));
                        $results[] = $res;
                        if (is_object($res) && method_exists($res, 'getStatusCode') && $res->getStatusCode() >= 400) {
                            return ['status' => false, 'error' => $res->getData(true)['error'] ?? 'Transfer failed'];
                        }
                    }
                    $pendingOut = null;
                } else {
                    $results[] = $this->createStockRow($leg['MGECD_VALUE'], $leg['MGECD_DESC'], $data, 1, $cg, $branch);
                }
            }
        }

        if (!empty($pendingOut)) {
            $results[] = $this->createStockRow($pendingOut['MGECD_VALUE'], $pendingOut['MGECD_DESC'], $data, -1, $cg, $branch);
        }

        return ['status' => true, 'results' => $results];
    }

    function transferLoc(Request $request)
    {
        $event = $request->has('EVENT') && !empty($request->EVENT) ? $request->EVENT : null;
        $cg = !empty($request->cg) ? $request->cg : $this->dedicatedConnection;
        $branch = !empty($request->branch) ? $request->branch : (Auth::check() ? Auth::user()->branch : null);

        $outLeg = !empty($event) ? $this->whFor($event, self::FLAG_OUT, $cg, $branch) : null;
        $incLeg = !empty($event) ? $this->whFor($event, self::FLAG_INC, $cg, $branch) : null;

        $OUTFORM = !empty($request->OUTFORM) ? $request->OUTFORM : (!empty($outLeg) ? $outLeg['MGECD_DESC'] : 'OUT-TRF-LOC');
        $INCFORM = !empty($request->INCFORM) ? $request->INCFORM : (!empty($incLeg) ? $incLeg['MGECD_DESC'] : 'INC-TRF-LOC');

        # data quotation detail item
        $validator = Validator::make($request->all(), [
            'LOCFROM' => 'required',
            'ITMCD' => 'required',
            'QTY' => 'required|numeric',
            'BC' => 'nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $cekStockQuery = DB::connection($this->dedicatedConnection)->table('V_STOCK_CHECK')
            ->select(
                'CITRN_ITMCD',
                'CITRN_LOCCD',
                DB::raw('SUM(CITRN_ITMQT) as STOCK'),
                'id_reff',
                DB::raw('MAX(CITRN_PRCPER) as CITRN_PRCPER')
            )
            ->where('CITRN_ITMCD', $request->ITMCD)
            ->where('CITRN_LOCCD', $request->LOCFROM)
            ->groupBy('CITRN_ITMCD', 'CITRN_LOCCD', 'id_reff');

        $docFrom = !empty($request->DOCFROM) ? $request->DOCFROM : (!empty($request->DOC) ? $request->DOC : null);
        $bcFrom = !empty($request->BC) ? $request->BC : null;

        // Check the "From" stock first: same source doc + source warehouse + barcode (when given)
        $cekStock = (clone $cekStockQuery)
            ->when($docFrom, fn($q) => $q->where('CITRN_DOCNO', $docFrom))
            ->when($bcFrom, fn($q) => $q->where('id_reff', $bcFrom))
            ->first();

        // If the doc-specific batch is empty or not enough, fall back to the overall source warehouse stock
        if ($cekStock === null || (!empty($cekStock) && $cekStock->STOCK < $request->QTY)) {
            $cekStock = (clone $cekStockQuery)
                ->when($bcFrom, fn($q) => $q->where('id_reff', $bcFrom))
                ->first();
        }

        if ($cekStock === null || (!empty($cekStock) && $cekStock->STOCK < $request->QTY)) {
            return response([
                'status' => false,
                'error' => 'Stock less than inputed qty or stock not exists!!',
                'data' => $cekStock,
                'params' => [
                    'LOCFROM' => $request->LOCFROM,
                    'LOCTO' => $request->LOCTO,
                    'ITMCD' => $request->ITMCD,
                    'QTY' => $request->QTY,
                    'BC' => $request->BC ?? null,
                    'STOCK' => $cekStock ? $cekStock->STOCK : 0
                ]
            ], 406);
        } else {
            $cekLatestTrf = C_ITRN::on($this->dedicatedConnection)
                ->whereYear('created_at', '=', date('Y'))
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
                'CITRN_FORM' => $OUTFORM,
                'CITRN_ITMCD' => $request->ITMCD,
                'CITRN_ITMQT' => $request->QTY * -1,
                'CITRN_PRCPER' => $cekStock->CITRN_PRCPER,
                'CITRN_PRCAMT' => $request->QTY * $cekStock->CITRN_PRCPER,
                'created_by' => Auth::user()->nick_name,
                'id_reff' => $request->has('BC') && !empty($request->BC) ? $request->BC : null,
            ]);

            $rcv = null;
            if ($request->has('LOCTO') && !empty($request->LOCTO)) {
                // Receive Stock
                $rcv = C_ITRN::on($this->dedicatedConnection)->create([
                    'CITRN_BRANCH' => Auth::user()->branch,
                    'CITRN_LOCCD' => $request->LOCTO,
                    'CITRN_DOCNO' => !empty($request->DOCFROM) ? $request->DOCFROM : ($request->has('DOC') && !empty($request->DOC) ? $request->DOC : $TRFCODE),
                    'CITRN_ISSUDT' => date('Y-m-d'),
                    'CITRN_FORM' => $INCFORM,
                    'CITRN_ITMCD' => $request->ITMCD,
                    'CITRN_ITMQT' => $request->QTY,
                    'CITRN_PRCPER' => $cekStock->CITRN_PRCPER,
                    'CITRN_PRCAMT' => $request->QTY * $cekStock->CITRN_PRCPER,
                    'created_by' => Auth::user()->nick_name,
                    'id_reff' => $request->has('BC') && !empty($request->BC) ? $request->BC : null,
                ]);
            }

            return [
                'status' => true,
                'msg' => 'OK',
                'DATA' => [
                    'ISS' => $iss,
                    'RCV' => $rcv
                ]
            ];
        }
    }
    // Test
    function createBarcode($idHeader, $item, $date, $qty, $price, $frWH = '', $formout = '', $toWH = '', $forminc = '', $userHead = [], $conn = null, $createBarcode = false)
    {
        $bc = '';
        $cekLatestBarcode = T_RCV_BC_DETAIL::on(!empty($conn) ? $conn : $this->dedicatedConnection)
            ->whereBetween('created_at', [date('Y-m-d 00:00:00'), date('Y-m-d 23:59:59')])
            ->orderBy('id', 'desc')
            ->first();

        if (empty($cekLatestBarcode)) {
            $bc = 'BC' . date('Ymd') . '0001';
        } else {
            $bc = 'BC' . date('Ymd') . sprintf('%04d', (int) substr($cekLatestBarcode->TRCVBC_BCCD, -4) + 1);
        }

        $header = T_RCV_HEAD::on(!empty($conn) ? $conn : $this->dedicatedConnection)->where('id', $idHeader)->first();

        $cekStock = DB::connection(!empty($conn) ? $conn : $this->dedicatedConnection)
            ->table('V_STOCK_CHECK')
            ->where('CITRN_ITMCD', $item)
            ->where('CITRN_DOCNO', $header->TRCV_DOCNO)
            ->first();

        if ($qty > 0) {
            if (!empty($frWH)) {
                C_ITRN::on(!empty($conn) ? $conn : $this->dedicatedConnection)->create([
                    'CITRN_BRANCH' => $userHead['branch'],
                    'CITRN_LOCCD' => $frWH,
                    'CITRN_DOCNO' => $header->TRCV_DOCNO,
                    'CITRN_ISSUDT' => $date,
                    'CITRN_FORM' => $formout,
                    'CITRN_ITMCD' => $item,
                    'CITRN_ITMQT' => (float) $qty * -1,
                    'CITRN_PRCPER' => (float) $price,
                    'CITRN_PRCAMT' => (float) $price * (float) $qty,
                    'created_by' => $userHead['nick_name'],
                    'created_at' => date('Y-m-d H:i:s'),
                    'id_reff' => empty($cekStock) ? $bc : $cekStock->id_reff,
                ]);
            }

            if (!empty($toWH)) {
                C_ITRN::on(!empty($conn) ? $conn : $this->dedicatedConnection)->create([
                    'CITRN_BRANCH' => $userHead['branch'],
                    'CITRN_LOCCD' => $toWH,
                    'CITRN_DOCNO' => $header->TRCV_DOCNO,
                    'CITRN_ISSUDT' => $date,
                    'CITRN_FORM' => $forminc,
                    'CITRN_ITMCD' => $item,
                    'CITRN_ITMQT' => (float) $qty,
                    'CITRN_PRCPER' => (float) $price,
                    'CITRN_PRCAMT' => (float) $price * (float) $qty,
                    'created_by' => $userHead['nick_name'],
                    'created_at' => date('Y-m-d H:i:s'),
                    'id_reff' => empty($cekStock) ? $bc : $cekStock->id_reff,
                ]);
            }

            $createDet = T_RCV_DETAIL::on(!empty($conn) ? $conn : $this->dedicatedConnection)->updateOrCreate([
                'id_header' => $idHeader,
                'item_code' => $item,
            ], [
                'id_header' => $idHeader,
                'item_code' => $item,
                'quantity' => (float) $qty,
                'unit_price' => (float) $price,
                'created_by' => $userHead['nick_name'],
                'created_at' => date('Y-m-d H:i:s'),
                'branch' => $userHead['branch'],
                'po_number' => ''
            ]);

            // Save to be incoming barcode
            T_RCV_BC_DETAIL::on(!empty($conn) ? $conn : $this->dedicatedConnection)->updateOrCreate([
                'TRCVBC_DOCNO' => $header->TRCV_DOCNO,
                'TRCVBC_BCCD' => empty($cekStock) ? $bc : $cekStock->id_reff,
            ], [
                'TRCVBC_DOCNO' => $header->TRCV_DOCNO,
                'TRCVBC_BCQT' => (float) $qty,
                'TRCVBC_DETID' => $createDet->id
            ]);
        }
    }
}
