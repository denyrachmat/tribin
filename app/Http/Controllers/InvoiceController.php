<?php

namespace App\Http\Controllers;

use App\Models\C_ITRN;
use App\Models\T_SLODETA;
use Illuminate\Http\Request;
use App\Models\T_DLVORDHEAD;
use App\Models\T_DLVORDDETA;
use App\Models\T_QUOHEAD;
use App\Models\T_SLOHEAD;
use App\Models\User;
use App\Models\M_BRANCH;
use Illuminate\Log\Logger;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\COMPANY_BRANCH;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Codedge\Fpdf\Fpdf\Fpdf;
use App\Models\T_DLVSJDETA;
use App\Models\CompanyGroup;
use App\Models\T_DLVPAYDETA;
use App\Models\T_DLVACCESSORY;
use App\Models\M_COND_GROUP;
use App\Models\C_SPK;
use App\Traits\taxesTraits;
use App\Traits\accTraits;

use Illuminate\Pagination\LengthAwarePaginator;
class InvoiceController extends Controller
{
    use taxesTraits, accTraits;
    protected $dedicatedConnection;

    protected $fpdf;
    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        ini_set('max_execution_time', 300);
        ini_set('memory_limit', '512M');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
        $this->fpdf = new Fpdf;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'invoice']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TDLVSJDETA_DLVCD' => 'required',
            'TDLVSJDETA_TYPE' => 'required',
            'TDLVSJDETA_CONDGRP' => 'required',
            // 'TDLVSJDETA_STARTDT' => 'required|date',
            // 'TDLVSJDETA_ENDDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        // T_DLVORDHEAD::on($this->dedicatedConnection)->where('TDLVORD_DLVCD', 'LIKE', $request->TDLVSJDETA_DLVCD . '%')->update([
        //     'TDLVORD_CONDGRP' => count($request->condition) > 0 ? $request->condition[0]['MCOND_GRPNM'] : ''
        // ]);

        $updatedRecordsHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->where('TDLVORD_DLVCD', 'LIKE', $request->TDLVSJDETA_DLVCD . '%')
            ->tap(function ($query) use ($request) {
                $query->update([
                    'TDLVORD_CONDGRP' => count($request->condition) > 0 ? $request->condition[0]['MCOND_GRPNM'] : ''
                ]);
            })
            ->get();

        foreach ($updatedRecordsHeader as $key => $valueHead) {

            T_DLVSJDETA::on($this->dedicatedConnection)->updateOrCreate([
                'TDLVSJDETA_DLVCD' => $valueHead->TDLVORD_DLVCD,
            ], [
                'TDLVSJDETA_DLVCD' => $valueHead->TDLVORD_DLVCD,
                'TDLVSJDETA_TYPE' => $request->TDLVSJDETA_TYPE,
                'TDLVSJDETA_CONDGRP' => $request->TDLVSJDETA_CONDGRP,
                'TDLVSJDETA_STARTDT' => $request->TDLVSJDETA_STARTDT,
                'TDLVSJDETA_ENDDT' => $request->TDLVSJDETA_ENDDT,
                'TDLVSJDETA_COND_GRP' => $request->has('condition') && !empty($request->condition) ? $request->condition[0]['MCOND_GRPNM'] : '',
                'TDLVSJDETA_ISSPLITSJ' => $request->TDLVSJDETA_ISSPLITSJ
            ]);

            T_DLVPAYDETA::on($this->dedicatedConnection)->where('TDLVPAYDETA_DLVCD', $valueHead->TDLVORD_DLVCD)->delete();

            foreach ($request->payment as $key => $valuePays) {
                if ($valueHead->TDLVORD_REMARK == 'SERVICE-INTERNAL') {
                    $dlvCD = $valueHead->TDLVORD_DLVCD;
                } else {
                    $dataOrd = explode('/', $valueHead->TDLVORD_DLVCD);
                    $dlvCD = count($dataOrd) > 0 ? $dataOrd[0] : $valueHead->TDLVORD_DLVCD;
                }

                T_DLVPAYDETA::on($this->dedicatedConnection)->updateOrCreate([
                    'TDLVPAYDETA_DLVCD' => $dlvCD,
                    'TDLVPAYDETA_IDPAY' => $valuePays['TDLVPAYDETA_IDPAY'],
                ]);
            }
        }

        return ['msg' => 'SJ Detail Saved !'];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function search(Request $request)
    {

        $data = DB::connection($this->dedicatedConnection)->table('V_INVOICE_DATA')
            ->select('V_INVOICE_DATA.*')->orderBy('TDLVORD_DLVCD', 'desc');

        if ($request->has('rcv') && $request->rcv === 1) {
            $data->leftjoin(DB::raw('(
                SELECT SUM(quantity) as RCV_QT, TRCV_REFFNO
                FROM T_RCV_HEAD
                INNER JOIN T_RCV_DETAIL ON T_RCV_HEAD.id = T_RCV_DETAIL.id_header
                group by T_RCV_HEAD.id, TRCV_REFFNO, T_RCV_DETAIL.id_header
            ) as rcv'
            ), function ($join) {
                $join->on(DB::raw("CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                    THEN TDLVORD_DLVCD
                    ELSE substring_index(TDLVORD_DLVCD, '/', 1)
                END"), '=', 'rcv.TRCV_REFFNO');
            })
                ->where(DB::raw('COALESCE(RCV_QT, 0)'), '<', DB::raw('COALESCE(TOT_DLV, 0)'));
        }

        if (!empty($request->searchBy)) {
            $data->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        if ($request->has('pagination') && !empty($request->pagination)) {
            $listData = $data->paginate($request->pagination['rowsPerPage'], ['*'], 'page', $request->pagination['page']);

            $listData->getCollection()->transform(function ($dlv) {
                $data = $this->dataDetail(
                    base64_encode($dlv->TDLVORD_DLVCD),
                    base64_encode($dlv->TDLVORDDETA_SLOCD),
                    base64_encode($dlv->TDLVORD_CONDGRP),
                    [
                        'isDlvDet' => false,
                        'isDlvAcc' => true,
                        'isPayment' => true,
                        'isCond' => true,
                        'isSPK' => true,
                        'isDlvSJ' => true,
                        'isSlo' => true
                    ]
                );

                $dlv->dlvacc = $data['dlvacc'];
                $dlv->payment = $data['payment'];
                $dlv->condition = $data['condition'];
                $dlv->spk = $data['spk'];
                $dlv->dlvsj = $data['dlvsj'];

                $dlv->dlvdet = [];

                $dlv->sloDet = $data['sloDet'];

                return $dlv;
            });
        } else {
            return $data->get()->map(function ($dlv) {
                $data = $this->dataDetail(
                    base64_encode($dlv->TDLVORD_DLVCD),
                    base64_encode($dlv->TDLVORDDETA_SLOCD),
                    base64_encode($dlv->TDLVORD_CONDGRP),
                    [
                        'isDlvDet' => false,
                        'isDlvAcc' => false,
                        'isPayment' => false,
                        'isCond' => false,
                        'isSPK' => false,
                        'isDlvSJ' => false,
                        'isSlo' => false
                    ]
                );
                $dlv->dlvacc = $data['dlvacc'];
                $dlv->payment = $data['payment'];
                $dlv->condition = $data['condition'];
                $dlv->spk = $data['spk'];
                $dlv->dlvsj = $data['dlvsj'];

                $dlv->dlvdet = [];

                $dlv->sloDet = $data['sloDet'];

                return $dlv;
            });
        }

        return $listData;
    }

    public function searchUpdate(Request $request)
    {
        $conn = $this->dedicatedConnection;

        $page = max(1, (int) data_get($request, 'pagination.page', 1));
        $perPage = max(1, (int) data_get($request, 'pagination.rowsPerPage', 20));

        $searchBy = strtoupper((string) $request->input('searchBy', ''));
        $searchValue = trim((string) $request->input('searchValue', ''));

        // ekspresi parent (gabung /1,/2,/3 jadi induk)
        $parentExpr = "
            CASE
                WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5 THEN TDLVORD_DLVCD
                ELSE SUBSTRING_INDEX(TDLVORD_DLVCD,'/',1)
            END
            ";

        // =========================
        // STEP-1: query parent list
        // =========================
        $parentQuery = DB::connection($conn)
            ->table('T_DLVORDHEAD as h')
            ->selectRaw("$parentExpr AS parent_dlvcd")
            ->selectRaw("MAX(h.TDLVORD_DLVCD) AS sort_dlvcd")
            ->selectRaw("MAX(h.TDLVORD_ISSUDT) AS sort_issudt")
            ->selectRaw("MAX(h.TDLVORD_CONDGRP) AS sort_condgrp")
            ->selectRaw("MAX(h.TDLVORD_INVCD) AS sort_invcd")
            ->selectRaw("MAX(h.TDLVORD_TYPE) AS sort_type") // buat DLV_TYPE_DESC
            // join customer untuk sort MCUS_CUSNM
            ->leftJoin('M_CUS as c', function ($join) {
                $join->on('c.MCUS_CUSCD', '=', 'h.TDLVORD_CUSCD')
                    ->on('c.MCUS_BRANCH', '=', 'h.TDLVORD_BRANCH');
            })
            ->selectRaw("MAX(c.MCUS_CUSNM) AS sort_cusnm")
            // join ke DETA + SLO untuk sort TSLO_*
            ->leftJoin('T_DLVORDDETA as d', DB::raw('SUBSTRING_INDEX(d.TDLVORDDETA_DLVCD,\'/\',1)'), '=', DB::raw("$parentExpr"))
            ->leftJoin('T_SLOHEAD as s', 's.TSLO_SLOCD', '=', 'd.TDLVORDDETA_SLOCD')
            ->selectRaw("MAX(s.TSLO_QUOCD) AS sort_quocd")
            ->selectRaw("MAX(s.TSLO_SLOCD) AS sort_slocd")
            ->groupBy('parent_dlvcd');

        if ($request->has('pagination') && !empty($request->pagination['sortBy'])) {
            $dir = !empty($request->pagination['descending']) ? 'desc' : 'asc';
            $sortBy = strtoupper($request->pagination['sortBy']);

            $sortMap = [
                'TDLVORD_DLVCD' => 'sort_dlvcd',
                'TDLVORD_ISSUDT' => 'sort_issudt',
                'TSLO_QUOCD' => 'sort_quocd',
                'TSLO_SLOCD' => 'sort_slocd',
                'TDLVORD_CONDGRP' => 'sort_condgrp',
                'TDLVORD_INVCD' => 'sort_invcd',
                'MCUS_CUSNM' => 'sort_cusnm',
                // DLV_TYPE_DESC itu label; sort pakai type numeriknya
                'DLV_TYPE_DESC' => 'sort_type',
            ];

            if (isset($sortMap[$sortBy])) {
                $parentQuery->orderBy($sortMap[$sortBy], $dir);
            } else {
                $parentQuery->orderByDesc('sort_dlvcd'); // fallback
            }
        } else {
            $parentQuery->orderByDesc('sort_dlvcd');
        }

        // OPTIONAL: kalau kamu selalu filter branch/user
        // $parentQuery->where('h.TDLVORD_BRANCH', $request->user()->branch);

        // =========================
        // APPLY SEARCH (whitelist)
        // =========================
        $allowed = [
            'TDLVORD_DLVCD',
            'TSLO_QUOCD',
            'TSLO_SLOCD',
            'TDLVORD_CONDGRP',
            'TDLVORD_INVCD',
            'MCUS_CUSNM',
            'DLV_TYPE_DESC',
            'TDLVORDDETA_ITMCD'
        ];

        if ($searchValue !== '' && in_array($searchBy, $allowed, true)) {
            switch ($searchBy) {

                case 'TDLVORD_DLVCD':
                    // prefix search agar cepat (SP-26-0107%)
                    $parentQuery->where(DB::raw($parentExpr), 'like', $searchValue . '%');
                    break;

                case 'TDLVORD_CONDGRP':
                    $parentQuery->where('h.TDLVORD_CONDGRP', 'like', '%' . $searchValue . '%');
                    break;

                case 'TDLVORD_INVCD':
                    $parentQuery->where('h.TDLVORD_INVCD', 'like', '%' . $searchValue . '%');
                    break;

                case 'DLV_TYPE_DESC':
                    // map text -> type
                    $map = [
                        'sales' => 1,
                        'return po' => 3,
                        'internal service' => 4,
                        'susulan' => 2,
                    ];
                    $sv = strtolower($searchValue);

                    if (isset($map[$sv])) {
                        $parentQuery->where('h.TDLVORD_TYPE', '=', $map[$sv]);
                    } elseif (ctype_digit($searchValue)) {
                        $parentQuery->where('h.TDLVORD_TYPE', '=', (int) $searchValue);
                    } else {
                        // optional fallback: cari via CASE (kalau inputnya bukan angka/text map)
                        $parentQuery->whereRaw("(
                      CASE
                        WHEN h.TDLVORD_TYPE = 1 THEN 'Sales'
                        WHEN h.TDLVORD_TYPE = 2 THEN 'Combined'
                        WHEN h.TDLVORD_TYPE = 3 THEN 'Return PO'
                        WHEN h.TDLVORD_TYPE = 4 THEN 'Internal Service'
                        WHEN h.TDLVORD_TYPE = 5 THEN 'POS'
                        ELSE 'Other'
                      END
                    ) LIKE ?", ['%' . $searchValue . '%']);
                    }
                    break;

                case 'MCUS_CUSNM':
                    // tetap di step-1 pakai EXISTS (lebih aman daripada join)
                    $parentQuery->whereExists(function ($q) use ($searchValue) {
                        $q->selectRaw('1')
                            ->from('M_CUS as c')
                            ->whereRaw('c.MCUS_CUSCD = h.TDLVORD_CUSCD')
                            ->whereRaw('c.MCUS_BRANCH = h.TDLVORD_BRANCH')
                            ->where('c.MCUS_CUSNM', 'like', '%' . $searchValue . '%');
                    });
                    break;

                case 'TSLO_QUOCD':
                    // filter via DETA->QUO, tetap di step-1 (EXISTS)
                    $parentQuery->whereExists(function ($q) use ($searchBy, $searchValue, $parentExpr) {
                        $q->selectRaw('1')
                            ->from('T_DLVORDDETA as d')
                            ->join('T_SLOHEAD as s', 's.TSLO_SLOCD', '=', 'd.TDLVORDDETA_SLOCD')
                            ->whereRaw("SUBSTRING_INDEX(d.TDLVORDDETA_DLVCD,'/',1) = $parentExpr")
                            ->where("s.$searchBy", 'like', '%' . $searchValue . '%');
                    });
                    break;
                case 'TSLO_SLOCD':
                    // filter via DETA->SLO, tetap di step-1 (EXISTS)
                    $parentQuery->whereExists(function ($q) use ($searchBy, $searchValue, $parentExpr) {
                        $q->selectRaw('1')
                            ->from('T_DLVORDDETA as d')
                            ->join('T_SLOHEAD as s', 's.TSLO_SLOCD', '=', 'd.TDLVORDDETA_SLOCD')
                            ->whereRaw("SUBSTRING_INDEX(d.TDLVORDDETA_DLVCD,'/',1) = $parentExpr")
                            ->where("s.$searchBy", 'like', '%' . $searchValue . '%');
                    });
                    break;
                case 'TDLVORDDETA_ITMCD':
                    // filter via DETA->ITM, tetap di step-1 (EXISTS)
                    $parentQuery->whereExists(function ($q) use ($searchBy, $searchValue, $parentExpr) {
                        $q->selectRaw('1')
                            ->from('T_DLVORDDETA as d')
                            ->whereRaw("SUBSTRING_INDEX(d.TDLVORDDETA_DLVCD,'/',1) = $parentExpr")
                            ->where("d.$searchBy", 'like', '%' . $searchValue . '%');
                    });
                    break;
            }
        }

        // total parent (kalau mau cepat tanpa total, pakai simplePaginate)
        $total = DB::connection($conn)
            ->table(DB::raw("({$parentQuery->toSql()}) AS t"))
            ->mergeBindings($parentQuery)
            ->count();

        // ambil parent codes page ini
        $parents = $parentQuery
            // ->orderByDesc('sort_key')
            ->forPage($page, $perPage)
            ->pluck('parent_dlvcd')
            ->toArray();

        if (!$parents) {
            return new LengthAwarePaginator([], $total, $perPage, $page, [
                'path' => $request->url(),
                'query' => $request->query(),
            ]);
        }

        // =========================
        // STEP-2: ambil data list
        // =========================
        $rowsQ = DB::connection($conn)
            ->table('T_DLVORDHEAD as h')
            ->selectRaw("$parentExpr AS TDLVORD_DLVCD")
            ->selectRaw("ANY_VALUE(s.TSLO_QUOCD) AS TSLO_QUOCD")
            ->selectRaw("ANY_VALUE(s.TSLO_SLOCD) AS TSLO_SLOCD")
            ->selectRaw("ANY_VALUE(h.TDLVORD_CONDGRP) AS TDLVORD_CONDGRP")
            ->selectRaw("ANY_VALUE(h.TDLVORD_INVCD) AS TDLVORD_INVCD")
            ->selectRaw("ANY_VALUE(c.MCUS_CUSNM) AS MCUS_CUSNM")
            ->selectRaw("
        CASE 
            WHEN ANY_VALUE(h.TDLVORD_TYPE) = 1 THEN 'Sales'
            WHEN ANY_VALUE(h.TDLVORD_TYPE) = 2 THEN 'Combined'
            WHEN ANY_VALUE(h.TDLVORD_TYPE) = 3 THEN 'Return PO'
            WHEN ANY_VALUE(h.TDLVORD_TYPE) = 4 THEN 'Internal Service'
            WHEN ANY_VALUE(h.TDLVORD_TYPE) = 5 THEN 'POS'
            ELSE 'Other'
        END AS DLV_TYPE_DESC
    ")
            ->selectRaw("ANY_VALUE(h.TDLVORD_ISSUDT) AS TDLVORD_ISSUDT")
            ->selectRaw("ANY_VALUE(h.TDLVORD_TYPE) AS TDLVORD_TYPE")
            ->selectRaw("ANY_VALUE(qh.TQUO_ATTN) AS TQUO_ATTN")
            ->selectRaw("ANY_VALUE(qh.TQUO_SBJCT) AS TQUO_SBJCT")
            ->selectRaw("ANY_VALUE(c.MCUS_TELNO) AS MCUS_TELNO")
            ->selectRaw("ANY_VALUE(s.TSLO_POCD) AS TSLO_POCD")
            ->leftJoin('T_DLVORDDETA as d', DB::raw("SUBSTRING_INDEX(d.TDLVORDDETA_DLVCD,'/',1)"), '=', DB::raw($parentExpr))
            ->leftJoin('T_SLOHEAD as s', 's.TSLO_SLOCD', '=', 'd.TDLVORDDETA_SLOCD')
            ->leftJoin('M_CUS as c', function ($join) {
                $join->on('c.MCUS_CUSCD', '=', 'h.TDLVORD_CUSCD')
                    ->on('c.MCUS_BRANCH', '=', 'h.TDLVORD_BRANCH');
            })
            ->leftJoin('T_QUOHEAD as qh', 'qh.TQUO_QUOCD', '=', 's.TSLO_QUOCD')
            ->whereIn(DB::raw($parentExpr), $parents)
            ->groupBy(DB::raw($parentExpr));

        $orderParents = implode(',', array_map(fn($p) => "'" . addslashes($p) . "'", $parents));

        $rows = $rowsQ
            ->orderByRaw("FIELD($parentExpr, $orderParents)")
            ->get();

        $keys = $rows->map(fn($r) => [
            'dlvcd' => $r->TDLVORD_DLVCD,
            'slocd' => $r->TSLO_SLOCD ?? null,
            'cond' => $r->TDLVORD_CONDGRP ?? null,
        ])->all();

        $details = $this->dataDetailBulk($keys, [
            'isDlvAcc' => true,
            'isPayment' => true,
            'isCond' => true,
            'isSPK' => true,
            'isDlvSJ' => true,
            'isSlo' => true,
        ]);

        // return $details;

        $rows->transform(function ($r) use ($details) {
            $key = $r->TDLVORD_DLVCD;

            $r->dlvsj = $details['dlvsj'][$key] ?? [];
            $r->payment = $details['payment'][$key] ?? [];
            $r->dlvacc = $details['dlvacc'][$key] ?? [];
            $r->condition = $details['condition'][$r->TDLVORD_CONDGRP] ?? [];
            $r->spk = $details['spk'][$key] ?? [];
            $r->sloDet = $details['sloDet'][$r->TSLO_SLOCD] ?? [];

            return $r;
        });

        if ($request->has('pagination') && !empty($request->pagination)) {
            return new LengthAwarePaginator($rows->values(), $total, $perPage, $page, [
                'path' => $request->url(),
                'query' => $request->query(),
            ]);
        } else {
            return $rows;
        }
    }

    public function getDetailDatabyDlvcd(Request $request)
    {
        $data = $this->dataDetailBulk(
            [
                [
                    'dlvcd' => $request->input('dlvcd'),
                    'slocd' => $request->input('slocd'),
                    'cond' => $request->input('cond')
                ]
            ],
            [
                'isDlvDet' => $request->input('opt.isDlvDet', false),
                'isDlvAcc' => $request->input('opt.isDlvAcc', false),
                'isPayment' => $request->input('opt.isPayment', false),
                'isCond' => $request->input('opt.isCond', false),
                'isSPK' => $request->input('opt.isSPK', false),
                'isDlvSJ' => $request->input('opt.isDlvSJ', false),
                'isSlo' => $request->input('opt.isSlo', false)
            ]
        );

        return $data;
    }

    public function dataDetailBulk(array $rows, array $opt): array
    {
        $conn = $this->dedicatedConnection;

        // Normalize keys (decode sekali)
        $dlvcds = collect($rows)->pluck('dlvcd')->filter()->unique()->values()->all();
        $slocds = collect($rows)->pluck('slocd')->filter()->unique()->values()->all();
        $condgrps = collect($rows)->pluck('cond')->filter()->unique()->values()->all();

        $out = [
            'dlvdet' => [],
            'dlvacc' => [],
            'payment' => [],
            'condition' => [],
            'spk' => [],
            'dlvsj' => [],
            'sloDet' => [],
        ];

        if (!empty($opt['isDlvDet'])) {
            $out['dlvdet'] = T_DLVORDDETA::on($this->dedicatedConnection)->select(
                'T_DLVORDDETA.id',
                'T_DLVORDDETA.TDLVORDDETA_DLVCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT',
                'T_DLVORDDETA.TDLVORDDETA_ITMQT',
                'T_DLVORDDETA.TDLVORDDETA_PRC',
                'M_ITM_GRP.MITM_ITMNM',
                'M_ITM_GRP.MITM_ITMNMREAL',
                'M_ITM.MITM_BRAND',
                'M_ITM.MITM_MODEL',
                'TDLVORD_REMARK'
            )->groupBy(
                    'T_DLVORDDETA.id',
                    'T_DLVORDDETA.TDLVORDDETA_DLVCD',
                    'T_DLVORDDETA.TDLVORDDETA_ITMCD',
                    'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT',
                    'T_DLVORDDETA.TDLVORDDETA_ITMQT',
                    'T_DLVORDDETA.TDLVORDDETA_PRC',
                    'M_ITM_GRP.MITM_ITMNM',
                    'M_ITM_GRP.MITM_ITMNMREAL',
                    'M_ITM.MITM_BRAND',
                    'M_ITM.MITM_MODEL',
                    'TDLVORD_REMARK'
                )
                ->join(
                    'T_DLVORDHEAD',
                    DB::raw(
                        "case
                    when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                                then TDLVORD_DLVCD
                                else substr(TDLVORD_DLVCD, 1, (length(TDLVORD_DLVCD) - locate('/', reverse(TDLVORD_DLVCD))))
                        end"
                    ),
                    '=',
                    DB::raw(
                        "case
                        when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                                then TDLVORDDETA_DLVCD
                            else substr(TDLVORDDETA_DLVCD, 1, (length(TDLVORDDETA_DLVCD) - locate('/', reverse(TDLVORDDETA_DLVCD))))
                    end"
                    )
                )
                ->leftJoin("M_ITM_GRP", function ($join) {
                    $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMNM')
                        ->on('TDLVORDDETA_BRANCH', '=', 'M_ITM_GRP.MITM_BRANCH');
                })
                ->leftJoin("M_ITM", function ($join) {
                    $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')
                        ->on('TDLVORDDETA_BRANCH', '=', 'M_ITM.MITM_BRANCH');
                })
                // ->leftJoin(DB::raw("(SELECT SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1) as TDLVORD_DLVCD, TDLVORD_BRANCH FROM T_DLVORDHEAD) as TDLVORDHEAD_ALIAS"), function ($join) {
                //     $join->on('T_DLVORDDETA.TDLVORDDETA_DLVCD', '=', 'TDLVORDHEAD_ALIAS.TDLVORD_DLVCD')
                //         ->on('T_DLVORDDETA.TDLVORDDETA_BRANCH', '=', 'TDLVORDHEAD_ALIAS.TDLVORD_BRANCH');
                // })
                ->whereIn(DB::raw("case
                        when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                        then TDLVORDDETA_DLVCD
                        else substr(TDLVORDDETA_DLVCD, 1, (length(TDLVORDDETA_DLVCD) - locate('/', reverse(TDLVORDDETA_DLVCD))))
                end"), $dlvcds)
                ->get();
        }

        if (!empty($opt['isDlvAcc'])) {
            $out['dlvacc'] = T_DLVACCESSORY::on($conn)
                ->whereIn('TDLVACCESSORY_DLVCD', $dlvcds)
                ->get()
                ->groupBy('TDLVACCESSORY_DLVCD')
                ->toArray();
        }

        if (!empty($opt['isPayment'])) {
            $paymentsRows = T_DLVPAYDETA::on($this->dedicatedConnection)
                ->select(
                    'branch_payment_accounts.*',
                    DB::raw('branch_payment_accounts.id as TDLVPAYDETA_IDPAY'),
                    DB::raw('SUBSTRING_INDEX(TDLVPAYDETA_DLVCD, "/", 1) as TDLVPAYDETA_DLVCD')
                )
                ->join('branch_payment_accounts', 'branch_payment_accounts.id', 'TDLVPAYDETA_IDPAY')
                ->whereIn('TDLVPAYDETA_DLVCD', $dlvcds)
                ->get()
                ->toArray();

            $paymentsMap = [];
            foreach ($paymentsRows as $row) {
                $k = $row['TDLVPAYDETA_DLVCD'];
                $paymentsMap[$k][] = $row;
            }

            $out['payment'] = $paymentsMap;
        }

        if (!empty($opt['isCond']) && !empty($condgrps)) {
            $conds = M_COND_GROUP::on($conn)
                ->select('M_COND_GROUP.*', 'M_CONDITIONS.MCONDITION_DESCRIPTION')
                ->join('M_CONDITIONS', 'M_COND_GROUP.MCOND_ID', '=', 'M_CONDITIONS.id')
                ->whereIn('MCOND_GRPNM', $condgrps)
                ->get()
                ->groupBy('MCOND_GRPNM')
                ->toArray();

            $out['condition'] = $conds;
        }

        if (!empty($opt['isSPK'])) {
            $out['spk'] = C_SPK::on($conn)
                ->whereIn('CSPK_REFF_DOC', $dlvcds)
                ->where('CSPK_BRANCH', Auth::user()->branch)
                ->where('CSPK_PIC_AS', 'DRIVER')
                ->get()
                ->groupBy('CSPK_REFF_DOC')
                ->toArray();
        }

        if (!empty($opt['isSlo']) && !empty($slocds)) {
            $out['sloDet'] = T_SLODETA::on($conn)
                ->join('M_USAGE', 'M_USAGE.id', '=', 'TSLODETA_USAGE_DESCRIPTION')
                ->whereIn('TSLODETA_SLOCD', $slocds)
                ->get()
                ->groupBy('TSLODETA_SLOCD')
                ->toArray();
        }

        // dlvsj bulk bisa, tapi tergantung struktur tabelmu (kunci join). Bisa kita susun belakangan.

        if (!empty($opt['isDlvSJ']) && !empty($dlvcds)) {

            // Ambil semua SJ rows yang match parent codes (prefix match)
            $sjRows = T_DLVSJDETA::on($conn)
                ->select(
                    'T_DLVSJDETA.*',
                    // key untuk mapping balik ke parent dlvcd
                    DB::raw("SUBSTRING_INDEX(T_DLVSJDETA.TDLVSJDETA_DLVCD,'/',1) AS parent_dlvcd"),
                    // optional: kalau mau lihat “full” dlvcd aslinya
                    DB::raw("T_DLVSJDETA.TDLVSJDETA_DLVCD AS sj_dlvcd")
                )
                ->where(function ($q) use ($dlvcds) {
                    foreach ($dlvcds as $p) {
                        // cocok untuk SP-26-0107 (match SP-26-0107, SP-26-0107/1, /2 dst)
                        $q->orWhere('T_DLVSJDETA.TDLVSJDETA_DLVCD', 'like', $p . '%');
                    }
                })
                // kalau kamu punya kolom tanggal/ID untuk menentukan "yang paling baru", tambahkan orderBy di sini
                ->orderByDesc('T_DLVSJDETA.id')
                ->get();

            /**
             * Karena single kamu pakai ->first(),
             * kita ambil 1 SJ row per parent_dlvcd.
             */
            $dlvsjMap = [];
            foreach ($sjRows as $row) {
                $k = $row->parent_dlvcd;
                if (!isset($dlvsjMap[$k])) {
                    $dlvsjMap[$k] = $row; // ambil yang pertama (karena sudah orderByDesc id)
                }
            }

            $out['dlvsj'] = $dlvsjMap;
        }


        return $out;
    }


    public function printInvoice(Request $request)
    {
        $getCompGroups = CompanyGroup::where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->first();
        $RSCG = COMPANY_BRANCH::on(empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->select('name', 'address', 'phone', 'fax', 'letter_head')
            ->where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Subject = T_QUOHEAD::on($this->dedicatedConnection)
            ->where('TQUO_QUOCD', $request->TSLO_QUOCD)
            ->where('TQUO_BRANCH', Auth::user()->branch)
            ->first();

        $total = 0;
        $dlvDetParse = [];
        $cek = [];
        $getSLOByItem = [];


        $taxes = $this->getTaxes($request->TSLO_SLOCD, $this->dedicatedConnection);
        $total = 0;

        if ($request->has('dlvdet') && count($request->dlvdet) > 0) {
            $dataDet = $request->dlvdet;
        } else {
            $dataDet = $this->dataDetail(
                base64_encode($request->TDLVORD_DLVCD),
                base64_encode($request->TSLO_SLOCD),
                base64_encode($request->TDLVORD_CONDGRP),
                [
                    'isDlvDet' => true,
                    'isDlvAcc' => false,
                    'isPayment' => false,
                    'isCond' => false,
                    'isSPK' => false,
                    'isDlvSJ' => false,
                    'isSlo' => false
                ]
            )['dlvdet'];
        }

        // return $dataDet;

        foreach ($dataDet as $key => $value) {
            if ($value['TDLVORD_REMARK'] == 'SERVICE-INTERNAL' || $value['TDLVORD_REMARK'] == 'POS') {
                $getTotalPrice = ($value['TDLVORDDETA_ITMQT'] * $value['TDLVORDDETA_PRC']);
                $total += $getTotalPrice;
                $dlvDetParse[] = array_merge($value, ['totPRCSLO' => $getTotalPrice]);
            } else {
                if ($request->TDLVORD_TYPE == 1) {
                    $getSLOByItem = array_values(array_filter($request->sloDet, function ($f) use ($value) {
                        return $f['TSLODETA_ITMCD'] == $value['TDLVORDDETA_ITMCD'] && $f['TSLODETA_PRC'] == $value['TDLVORDDETA_PRC'];
                    }));
                } elseif ($request->TDLVORD_TYPE == 2 || $request->TDLVORD_TYPE == 3) {
                    $getSLOByItemX = json_decode(json_encode($this->search(new Request([
                        'searchBy' => 'TDLVORD_INVCD',
                        'searchValue' => $request->TDLVORD_INVCD
                    ]))['data']), true);

                    $getSLOByItemxx = $getSLOByItemX[count($getSLOByItemX) - 1];
                    $getSLOByItem = array_values(array_filter($getSLOByItemxx['sloDet'], function ($f) use ($value) {
                        return $f['TSLODETA_ITMCD'] == $value['TDLVORDDETA_ITMCD'];
                    }));
                }

                $cek[] = $getSLOByItem;
                if (count($getSLOByItem) > 0) {
                    if ($request->TDLVORD_TYPE == 1) {
                        $getTotalPrice = ($getSLOByItem[0]['TSLODETA_PRC'] * $value['TDLVORDDETA_ITMQT']) + $getSLOByItem[0]['TSLODETA_OPRPRC'] + $getSLOByItem[0]['TSLODETA_MOBDEMOB'];
                    } else {
                        $getTotalPrice = ($value['TDLVORDDETA_ITMQT'] * $value['TDLVORDDETA_PRC']) + $getSLOByItem[0]['TSLODETA_OPRPRC'] + $getSLOByItem[0]['TSLODETA_MOBDEMOB'];
                    }

                    $total += $getTotalPrice;
                    $dlvDetParse[] = array_merge($value, ['dataSLO' => $getSLOByItem[0], 'totPRCSLO' => $getTotalPrice]);
                }
            }
        }

        // return $taxes;

        $ppn = $total * 0.11;

        $totalTax = 0;
        foreach ($taxes as $key => $valueTaxes) {
            $totalTax += $valueTaxes['TTAXM_TAXAMT'];
        }

        $getApproval = $this->getGencode(
            base64_encode('APPROVAL_SETUP'),
            base64_encode('proforma_invoice'),
            empty($conn) ? $_COOKIE['CGID'] : base64_decode($conn)
        );

        $hasilApproval = [];
        foreach (json_decode($getApproval['MGECD_DESC'], true) as $key => $value) {
            $hasilApproval[] = [
                'name' => User::where('id', $value['username'])->first()->name,
                'remarks' => $value['remarks'],
            ];
        }

        // return $dlvDetParse;

        $pdf = Pdf::loadView(
            'pdf.invoiceDlv',
            array_merge(
                [
                    'header' => $RSCG->letter_head,
                    'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
                    'addr' => $RSCG->address,
                    'telp' => $RSCG->phone,
                    'isPPN' => $getCompGroups->flg_ppn,
                    'total' => $total,
                    'totalAll' => $total + $totalTax,
                    'taxes' => $taxes,
                    'terbilang' => $this->numberToSentence($total + $totalTax),
                    'ppn' => $ppn,
                    'dlvDetNew' => $dlvDetParse,
                    'payment' => $request->payment,
                    'subject' => $Subject,
                    'approvalList' => $hasilApproval,
                ],
                $request->all()
            )
        );

        return base64_encode($pdf->output());
    }

    public function postDataDetail(Request $request)
    {
        $data = $this->dataDetail(
            base64_encode($request->TDLVORD_DLVCD),
            base64_encode($request->TSLO_SLOCD),
            base64_encode($request->TDLVORD_CONDGRP),
            $request->opt
        );

        return $data;
    }

    public function dataDetail(
        $id,
        $slo = '',
        $condGroup = '',
        $opt = [
            'isDlvDet' => false,
            'isDlvAcc' => false,
            'isPayment' => false,
            'isCond' => false,
            'isSPK' => false,
            'isDlvSJ' => false,
            'isSlo' => false,
            'osRcvOnly' => false
        ]
    ) {
        $dlvdetInit = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'T_DLVORDDETA.id',
            'T_DLVORDDETA.TDLVORDDETA_DLVCD',
            'T_DLVORDDETA.TDLVORDDETA_ITMCD',
            'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT',
            'T_DLVORDDETA.TDLVORDDETA_ITMQT',
            'T_DLVORDDETA.TDLVORDDETA_PRC',
            'M_ITM_GRP.MITM_ITMNM',
            'M_ITM_GRP.MITM_ITMNMREAL',
            'M_ITM.MITM_BRAND',
            'M_ITM.MITM_MODEL',
            'TDLVORD_REMARK'
        )->groupBy(
                'T_DLVORDDETA.id',
                'T_DLVORDDETA.TDLVORDDETA_DLVCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT',
                'T_DLVORDDETA.TDLVORDDETA_ITMQT',
                'T_DLVORDDETA.TDLVORDDETA_PRC',
                'M_ITM_GRP.MITM_ITMNM',
                'M_ITM_GRP.MITM_ITMNMREAL',
                'M_ITM.MITM_BRAND',
                'M_ITM.MITM_MODEL',
                'TDLVORD_REMARK'
            )
            ->join(
                'T_DLVORDHEAD',
                DB::raw(
                    "case
                    when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                                then TDLVORD_DLVCD
                                else substr(TDLVORD_DLVCD, 1, (length(TDLVORD_DLVCD) - locate('/', reverse(TDLVORD_DLVCD))))
                        end"
                ),
                '=',
                DB::raw(
                    "case
                        when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                                then TDLVORDDETA_DLVCD
                            else substr(TDLVORDDETA_DLVCD, 1, (length(TDLVORDDETA_DLVCD) - locate('/', reverse(TDLVORDDETA_DLVCD))))
                    end"
                )
            )
            ->leftJoin("M_ITM_GRP", function ($join) {
                $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMNM')
                    ->on('TDLVORDDETA_BRANCH', '=', 'M_ITM_GRP.MITM_BRANCH');
            })
            ->leftJoin("M_ITM", function ($join) {
                $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')
                    ->on('TDLVORDDETA_BRANCH', '=', 'M_ITM.MITM_BRANCH');
            })
            // ->leftJoin(DB::raw("(SELECT SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1) as TDLVORD_DLVCD, TDLVORD_BRANCH FROM T_DLVORDHEAD) as TDLVORDHEAD_ALIAS"), function ($join) {
            //     $join->on('T_DLVORDDETA.TDLVORDDETA_DLVCD', '=', 'TDLVORDHEAD_ALIAS.TDLVORD_DLVCD')
            //         ->on('T_DLVORDDETA.TDLVORDDETA_BRANCH', '=', 'TDLVORDHEAD_ALIAS.TDLVORD_BRANCH');
            // })
            ->where(DB::raw("case
                    when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                    then TDLVORDDETA_DLVCD
                    else substr(TDLVORDDETA_DLVCD, 1, (length(TDLVORDDETA_DLVCD) - locate('/', reverse(TDLVORDDETA_DLVCD))))
            end"), '=', base64_decode($id));

        if (isset($opt['osRcvOnly']) && $opt['osRcvOnly'] === true) {
            $dlvdet = $dlvdetInit->leftJoin(DB::raw('(
                SELECT
                    trd.item_code,
                    trh.TRCV_REFFNO,
                    SUM(trd.quantity) as TOT_RCV_QTY
                FROM T_RCV_DETAIL trd
                inner join T_RCV_HEAD trh ON trd.id_header = trh.id
                GROUP BY
                    trd.item_code,
                    trh.TRCV_REFFNO
            ) RCV'), function ($join) {
                $join->on('RCV.TRCV_REFFNO', '=', DB::raw("case
                    when (TDLVOR_ISSPLITSJ <> 1) OR (TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5)
                    then TDLVORDDETA_DLVCD
                    else substr(TDLVORDDETA_DLVCD, 1, (length(TDLVORDDETA_DLVCD) - locate('/', reverse(TDLVORDDETA_DLVCD))))
            end"))
                    ->on('RCV.item_code', '=', 'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT');
            })
                ->where(DB::raw('COALESCE(TOT_RCV_QTY, 0)'), '<', DB::raw('T_DLVORDDETA.TDLVORDDETA_ITMQT'))
                ->get()
                ->toArray();
        } else {
            $dlvdet = isset($opt['isDlvDet']) && $opt['isDlvDet'] == true ? $dlvdetInit->get()->toArray() : [];
        }

        $dlvacc = isset($opt['isDlvAcc']) && $opt['isDlvAcc'] === true
            ? T_DLVACCESSORY::on($this->dedicatedConnection)->where('TDLVACCESSORY_DLVCD', base64_decode($id))->get()
            : [];
        $payment = isset($opt['isPayment']) && $opt['isPayment'] === true
            ? T_DLVPAYDETA::on($this->dedicatedConnection)
                ->select(
                    'branch_payment_accounts.*',
                    DB::raw('branch_payment_accounts.id as TDLVPAYDETA_IDPAY'),
                    DB::raw('SUBSTRING_INDEX(TDLVPAYDETA_DLVCD, "/", 1) as TDLVPAYDETA_DLVCD')
                )
                ->join('branch_payment_accounts', 'branch_payment_accounts.id', 'TDLVPAYDETA_IDPAY')
                ->where('TDLVPAYDETA_DLVCD', base64_decode($id))
                ->get()
            : [];

        $condition = !empty($condGroup) && isset($opt['isCond']) && $opt['isCond'] === true
            ? M_COND_GROUP::on($this->dedicatedConnection)->select(
                'M_COND_GROUP.*',
                'M_CONDITIONS.MCONDITION_DESCRIPTION'
            )->where('MCOND_GRPNM', base64_decode($condGroup))
                ->join('M_CONDITIONS', 'M_COND_GROUP.MCOND_ID', 'M_CONDITIONS.id')
                ->get()
            : [];

        $spk = isset($opt['isSPK']) && $opt['isSPK'] === true
            ? C_SPK::on($this->dedicatedConnection)
                ->where('CSPK_REFF_DOC', base64_decode($id))
                ->where('CSPK_BRANCH', Auth::user()->branch)
                ->where('CSPK_PIC_AS', 'DRIVER')
                ->get()
            : [];

        $dlvsj = isset($opt['isDlvSJ']) && $opt['isDlvSJ'] === true
            ? T_DLVSJDETA::on($this->dedicatedConnection)
                ->join(
                    'T_DLVORDHEAD',
                    DB::raw(
                        "CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                                    THEN TDLVORD_DLVCD
                                    ELSE SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)
                                END"
                    ),
                    DB::raw(
                        "CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                                    THEN TDLVSJDETA_DLVCD
                                    ELSE SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)
                                END"
                    )
                )
                ->where(DB::raw("CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                    THEN TDLVSJDETA_DLVCD
                    ELSE SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)
                END"), '=', base64_decode($id))
                ->first()
            : [];

        $sloDet = !empty($slo) && isset($opt['isSlo']) && $opt['isSlo'] === true
            ? T_SLODETA::on($this->dedicatedConnection)
                ->where('TSLODETA_SLOCD', base64_decode($slo))
                ->join('M_USAGE', 'M_USAGE.id', 'TSLODETA_USAGE_DESCRIPTION')
                ->get()
            : [];

        return [
            'dlvdet' => $dlvdet,
            'dlvacc' => $dlvacc,
            'payment' => $payment,
            'condition' => $condition,
            'spk' => $spk,
            'dlvsj' => $dlvsj,
            'sloDet' => $sloDet
        ];
    }

    public function numberToSentence($nilai)
    {
        $nilai = round(abs($nilai));
        $huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
        $temp = "";

        if ($nilai < 12) {
            $temp = " " . $huruf[$nilai];
        } else if ($nilai < 20) {
            $temp = $this->numberToSentence($nilai - 10) . " belas";
        } else if ($nilai < 100) {
            $temp = $this->numberToSentence(floor($nilai / 10)) . " puluh" . $this->numberToSentence($nilai % 10);
        } else if ($nilai < 200) {
            $temp = " seratus" . $this->numberToSentence($nilai - 100);
        } else if ($nilai < 1000) {
            $temp = $this->numberToSentence(floor($nilai / 100)) . " ratus" . $this->numberToSentence($nilai % 100);
        } else if ($nilai < 2000) {
            $temp = " seribu" . $this->numberToSentence($nilai - 1000);
        } else if ($nilai < 1000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000)) . " ribu" . $this->numberToSentence($nilai % 1000);
        } else if ($nilai < 1000000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000000)) . " juta" . $this->numberToSentence($nilai % 1000000);
        } else if ($nilai < 1000000000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000000000)) . " milyar" . $this->numberToSentence($nilai % 1000000000);
        } else if ($nilai < 1000000000000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000000000000)) . " trilyun" . $this->numberToSentence($nilai % 1000000000000);
        }

        return $temp;
    }

    public function printKwitansi($doc)
    {
        $doc = base64_decode($doc);
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select('TDLVORD_ISSUDT', 'MCUS_CUSNM', 'MCUS_ADDR1', 'TDLVORD_REMARK', 'MCUS_TELNO', 'TDLVORD_INVCD', 'TDLVORD_LINE', 'TDLVORD_REC_NO')
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->with('condition')
            ->where(DB::raw("CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                    THEN TDLVORD_DLVCD
                    ELSE SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)
                END"), $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->first();

        // return $RSHeader;

        $RSDetail = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'TDLVORDDETA_ITMCD',
            'TDLVORDDETA_ITMQT',
            'MITM_ITMNM',
            'MITM_STKUOM',
            'created_by',
            'TDLVORDDETA_SLOCD',
            'MITM_ITMNM',
            'MITM_MODEL',
            'MITM_BRAND',
            'TDLVORDDETA_PRC',
            'TDLVORD_REMARK'
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMCD')->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->join(
                'T_DLVORDHEAD',
                'TDLVORD_DLVCD',
                'TDLVORDDETA_DLVCD'
            )
            ->where(DB::raw("CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                    THEN TDLVORDDETA_DLVCD
                    ELSE SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)
                END"), $doc)
            ->where('TDLVORDDETA_BRANCH', Auth::user()->branch)
            ->get();

        $Company = COMPANY_BRANCH::on($this->dedicatedConnection)->select(
            'name',
            'COMPANY_BRANCHES.address',
            'COMPANY_BRANCHES.phone',
            'invoice_letter_id'
        )
            ->where('connection', $this->dedicatedConnection)
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Branch = M_BRANCH::select('MBRANCH_NM')->where('MBRANCH_CD', Auth::user()->branch)->first();

        $Dibuat = NULL;
        $Attn = NULL;
        $Subject = NULL;

        $Usage = NULL;
        $HargaSewa = NULL;

        // return $RSDetail;
        foreach ($RSDetail as $r) {
            $Dibuat = User::where('nick_name', $r->created_by)->select('name')->first();
            $Attn = T_SLOHEAD::on($this->dedicatedConnection)->select('TSLO_ATTN', 'TSLO_QUOCD', 'TSLO_POCD', 'TSLO_ADDRESS_DESCRIPTION')
                ->where('TSLO_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLO_BRANCH', Auth::user()->branch)
                ->first();

            if (!empty($Attn)) {
                $Subject = T_QUOHEAD::on($this->dedicatedConnection)
                    ->where('TQUO_QUOCD', $Attn->TSLO_QUOCD)
                    ->where('TQUO_BRANCH', Auth::user()->branch)
                    ->first();
            }

            break;
        }

        $totalHargaSewa = 0;

        $PeriodFrom = '';
        $PeriodTo = '';
        foreach ($RSDetail as $r) {
            $Usage = T_SLODETA::on($this->dedicatedConnection)->select(
                'TSLODETA_USAGE_DESCRIPTION',
                'TSLODETA_PRC',
                'TSLODETA_OPRPRC',
                'TSLODETA_MOBDEMOB',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'MITM_ITMTYPE',
                'TSLODETA_ITMCD'
            )
                ->leftjoin('M_ITM_GRP', 'MITM_ITMNM', 'like', DB::raw("CONCAT('%', T_SLODETA.TSLODETA_ITMCD, '%')"))
                ->where('TSLODETA_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLODETA_ITMCD', $r->TDLVORDDETA_ITMCD)
                ->where('TSLODETA_BRANCH', Auth::user()->branch)
                // ->where('MITM_ITMTYPE', 1)
                ->first();

            // return $Usage;

            if (!empty($Usage)) {
                $HargaSewa = ($r->TDLVORDDETA_PRC * $r->TDLVORDDETA_ITMQT) + $Usage->TSLODETA_OPRPRC + $Usage->TSLODETA_MOBDEMOB;
            } else {
                $HargaSewa = 0;
                if ($r->TDLVORD_REMARK == 'SERVICE-INTERNAL' || $r->TDLVORD_REMARK == 'POS') {
                    $HargaSewa = ($r->TDLVORDDETA_PRC * $r->TDLVORDDETA_ITMQT);
                }
            }

            if ($r->TDLVORD_REMARK !== 'SERVICE-INTERNAL' && $r->TDLVORD_REMARK !== 'POS') {
                if ($Usage->MITM_ITMTYPE == 1 || $Usage->MITM_ITMTYPE == 2) {
                    $PeriodFrom = date_format(date_create($Usage->TSLODETA_PERIOD_FR), 'd-M-Y');
                    $PeriodTo = date_format(date_create($Usage->TSLODETA_PERIOD_TO), 'd-M-Y');
                }
            } else {
                $PeriodFrom = '-';
                $PeriodTo = '-';
            }

            $totalHargaSewa += $HargaSewa;
            $DOIssuDate = date_format(date_create($RSHeader->TDLVORD_ISSUDT), 'd-M-Y');
        }

        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $PPNAmount = 0;
        } else {
            $PPNAmount = $totalHargaSewa * 11 / 100;
        }

        if ($RSHeader->TDLVORD_REMARK == 'SERVICE-INTERNAL') {
            $subjek = 'Service Internal';
        } else {
            $subjek = !empty($Subject) ? ucwords(trim(str_replace('penawaran', '', strtolower($Subject->TQUO_SBJCT)))) . ' Periode ' . $PeriodFrom . ' s/d ' . $PeriodTo : '';
        }

        $terbilang = ucwords(rtrim($this->numberToSentence($PPNAmount + $totalHargaSewa)));

        $this->fpdf->AddPage("P", 'A4');
        $this->fpdf->SetFont('Arial', 'B', 10);
        $this->fpdf->SetXY(7, 5);
        $this->fpdf->Cell(0, 8, $Company->name, 0, 0, 'L');
        $this->fpdf->SetXY(150, 5);
        $this->fpdf->Cell(7, 5, $RSHeader->TDLVORD_REC_NO, 0, 0, 'L');
        $this->fpdf->SetFont('Arial', '', 10);
        $this->fpdf->SetXY(7, 12);
        $this->fpdf->MultiCell(95, 4, $Company->address, 0, 'L');
        $this->fpdf->SetFont('Arial', 'B', 14);
        $this->fpdf->SetXY(7, 20);
        $this->fpdf->Cell(0, 8, 'K W I T A N S I', 0, 0, 'C');
        $this->fpdf->SetFont('Arial', '', 10);
        $this->fpdf->SetXY(7, 30);
        $this->fpdf->Cell(25, 5, 'Nomor Invoice', 0, 0, 'L');
        $this->fpdf->Cell(15, 5, ': ' . $RSHeader->TDLVORD_INVCD, 0, 0, 'L');
        // $this->fpdf->SetXY(150, 30);
        // $this->fpdf->Cell(25, 5, 'Proj. Location:', 0, 0, 'L');
        // $this->fpdf->Cell(15, 5, ': ' . $Subject->TQUO_PROJECT_LOCATION, 0, 0, 'L');
        $this->fpdf->SetXY(7, 35);
        $this->fpdf->Cell(195, 115, '', 1, 0, 'L');
        $this->fpdf->SetXY(10, 40);
        $this->fpdf->Cell(50, 5, 'Sudah terima dari', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': ' . $RSHeader->MCUS_CUSNM, 0, 0, 'L');
        $this->fpdf->Line(63, 46, 180, 46);
        $this->fpdf->SetXY(10, 50);
        $this->fpdf->Cell(50, 5, 'Alamat', 0, 0, 'L');
        $this->fpdf->Cell(2, 5, ':');
        $this->fpdf->MultiCell(138, 5, $RSHeader->MCUS_ADDR1);
        $this->fpdf->Line(63, $this->fpdf->GetY() + 2, 180, $this->fpdf->GetY() + 2);
        $Yfocus = $this->fpdf->GetY() + 5;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Terbilang', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': ' . $terbilang . ' Rupiah', 0, 0, 'L');
        $this->fpdf->Line(63, $Yfocus + 7, 180, $Yfocus + 7);

        $Yfocus += 10;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Untuk Pembayaran', 0, 0, 'L');
        $this->fpdf->Cell(2, 5, ':');
        $this->fpdf->MultiCell(138, 5, $subjek);
        $Yfocus = $this->fpdf->GetY() + 5;
        $this->fpdf->Line(63, $Yfocus - 3, 180, $Yfocus - 3);

        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, '', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, ' Total', 0, 0, 'L');
        $this->fpdf->Cell(10, 5, ' : Rp. ', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, number_format($totalHargaSewa), 0, 0, 'R');
        $Yfocus += 5;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, '', 0, 0, 'L');
        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $this->fpdf->Cell(40, 5, ' PPN 0%', 0, 0, 'L');
        } else {
            $this->fpdf->Cell(40, 5, ' PPN 11%', 0, 0, 'L');
        }
        $this->fpdf->Cell(10, 5, ' : Rp. ', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, number_format($PPNAmount), 0, 0, 'R');
        $this->fpdf->Line(62, $Yfocus + 5, 100, $Yfocus + 5);
        $this->fpdf->Line(110, $Yfocus + 5, 150, $Yfocus + 5);
        $Yfocus += 6;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, '', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, ' Total Yang Dibayar', 0, 0, 'L');
        $this->fpdf->Cell(10, 5, ' : Rp. ', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, number_format($PPNAmount + $totalHargaSewa), 0, 0, 'R');
        $Yfocus += 6;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Lokasi', 0, 0, 'L');
        $this->fpdf->Cell(2, 5, ':');
        $this->fpdf->MultiCell(138, 5, (!empty($Subject) ? $Subject->TQUO_PROJECT_LOCATION : '-'));
        $this->fpdf->Line(63, $this->fpdf->GetY() + 2, 180, $this->fpdf->GetY() + 2);
        $Yfocus = $this->fpdf->GetY() + 5;
        // $Yfocus += 5;
        $this->fpdf->SetXY(110, $Yfocus);
        $this->fpdf->Cell(50, 5, $Branch->MBRANCH_NM . ', ' . $DOIssuDate, 0, 0, 'L');
        $Yfocus = $this->fpdf->GetY() + 10;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Jumlah', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': Rp. ' . number_format($PPNAmount + $totalHargaSewa), 0, 0, 'L');
        $Yfocus = $this->fpdf->GetY() + 15;
        $this->fpdf->SetXY(120, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Syapril, S.T', 0, 0, 'L');
        // $Yfocus += 9;
        $this->fpdf->SetXY(6, 150);
        $this->fpdf->SetFont('Arial', '', 8);
        $this->fpdf->Cell(50, 5, 'Note: Pembayaran dengan Giro/Cheque/Transfer dianggap sah apabila dan sudah masuk ke rekening kami', 0, 0, 'L');

        $pdfFile = $this->fpdf->Output("", "S");

        return base64_encode($pdfFile);
        // $this->fpdf->Output('delivery documents ' . $doc . '.pdf', 'I');
        // exit;
    }

    public function printSJ($doc, $type = 'out')
    {
        $doc = base64_decode($doc);

        $getCompGroups = CompanyGroup::where('connection', $this->dedicatedConnection)->first();
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_TYPE',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                DB::raw('MIN(TSLODETA_PERIOD_FR) AS TSLODETA_PERIOD_FR'),
                DB::raw('MAX(TSLODETA_PERIOD_TO) AS TSLODETA_PERIOD_TO'),
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                DB::raw(
                    "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORD_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVORD_DLVCD) - LOCATE('/', REVERSE(TDLVORD_DLVCD)))
                    END as TDLVORD_DLVCD"
                ),
                'TDLVOR_ISSPLITSJ',
                'TQUO_QUOCD',
                'TRCV_ISSUDT'
            )
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin(DB::raw('(SELECT * FROM T_RCV_HEAD WHERE deleted_at is NULL) T_RCV_HEAD'), DB::raw(
                "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORD_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVORD_DLVCD) - LOCATE('/', REVERSE(TDLVORD_DLVCD)))
                    END"
            ), '=', 'TRCV_REFFNO')
            ->leftJoin(
                'T_DLVORDDETA',
                DB::raw(
                    "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORDDETA_DLVCD
                        ELSE SUBSTRING(TDLVORDDETA_DLVCD, 1, LENGTH(TDLVORDDETA_DLVCD) - LOCATE('/', REVERSE(TDLVORDDETA_DLVCD)))
                    END"
                ),
                DB::raw(
                    "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORD_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVORD_DLVCD) - LOCATE('/', REVERSE(TDLVORD_DLVCD)))
                    END"
                )
            )
            ->leftJoin('T_SLOHEAD', 'TDLVORDDETA_SLOCD', 'TSLO_SLOCD')
            ->leftJoin('T_SLODETA', 'TSLO_SLOCD', 'TSLODETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TSLO_QUOCD', 'TQUO_QUOCD')
            ->leftJoin('T_DLVSJDETA', DB::raw(
                "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVSJDETA_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVSJDETA_DLVCD) - LOCATE('/', REVERSE(TDLVSJDETA_DLVCD)))
                    END"
            ), DB::raw("SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)"), DB::raw(
                        "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORD_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVORD_DLVCD) - LOCATE('/', REVERSE(TDLVORD_DLVCD)))
                    END"
                    ))
            ->where(DB::raw(
                "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORD_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVORD_DLVCD) - LOCATE('/', REVERSE(TDLVORD_DLVCD)))
                    END"
            ), $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->with([
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                },
                'spk' => function ($f) {
                    $f->where('CSPK_PIC_AS', 'DRIVER');
                },
                'dlvsj'
            ])
            ->groupBy(
                DB::raw(
                    "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                        THEN TDLVORD_DLVCD
                        ELSE SUBSTRING(TDLVORD_DLVCD, 1, LENGTH(TDLVORD_DLVCD) - LOCATE('/', REVERSE(TDLVORD_DLVCD)))
                    END"
                ),
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_TYPE',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                'TDLVOR_ISSPLITSJ',
                'TQUO_QUOCD',
                'TRCV_ISSUDT'
            )
            ->first();

        // return $RSHeader;

        $RSDetail = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'TDLVORDDETA_ITMCD',
            'TDLVORDDETA_DLVCD',
            'TDLVORDDETA_ITMCD_ACT',
            'TDLVORDDETA_ITMQT',
            'MITM_ITMNM',
            'MITM_STKUOM',
            'T_DLVORDDETA.created_by',
            'TDLVORDDETA_SLOCD',
            'MITM_ITMNM',
            'MITM_MODEL',
            'MITM_BRAND',
            'MITM_ITMCAT',
            'TDLVORD_REMARK',
            'TDLVORD_TYPE',
            DB::raw('MIN(TSLODETA_PERIOD_FR) AS TSLODETA_PERIOD_FR'),
            DB::raw('MAX(TSLODETA_PERIOD_TO) AS TSLODETA_PERIOD_TO')
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->join(
                'T_DLVORDHEAD',
                'TDLVORD_DLVCD',
                'TDLVORDDETA_DLVCD'
            )
            ->where(DB::raw(
                "CASE WHEN TDLVOR_ISSPLITSJ <> 1
                    THEN TDLVORD_DLVCD
                    ELSE SUBSTRING(TDLVORDDETA_DLVCD, 1, LENGTH(TDLVORDDETA_DLVCD) - LOCATE('/', REVERSE(TDLVORDDETA_DLVCD)))
                END"
            ), $doc)
            ->where('TDLVORDDETA_BRANCH', Auth::user()->branch)
            ->leftjoin('T_SLODETA', function ($j) {
                $j->on('TDLVORDDETA_SLOCD', 'TSLODETA_SLOCD');
                $j->on('TDLVORDDETA_ITMCD', 'TSLODETA_ITMCD');
            })
            ->groupBy(
                'TDLVORDDETA_ITMCD',
                'TDLVORDDETA_DLVCD',
                'TDLVORDDETA_ITMCD_ACT',
                'TDLVORDDETA_ITMQT',
                'MITM_ITMNM',
                'MITM_STKUOM',
                'T_DLVORDDETA.created_by',
                'TDLVORDDETA_SLOCD',
                'MITM_ITMNM',
                'MITM_MODEL',
                'MITM_BRAND',
                'MITM_ITMCAT',
                'TDLVORD_REMARK',
                'TDLVORD_TYPE',
            )
            ->get();

        $Company = COMPANY_BRANCH::on($this->dedicatedConnection)->select(
            'name',
            'COMPANY_BRANCHES.address',
            'COMPANY_BRANCHES.phone',
            'invoice_letter_id'
        )
            ->where('connection', $this->dedicatedConnection)
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Branch = M_BRANCH::select('MBRANCH_NM')->where('MBRANCH_CD', Auth::user()->branch)->first();

        $Dibuat = NULL;
        $Attn = NULL;
        $Subject = NULL;

        $Usage = NULL;
        $HargaSewa = NULL;

        foreach ($RSDetail as $r) {
            $Dibuat = User::where('nick_name', $r->created_by)->select('name')->first();
            $Attn = T_SLOHEAD::on($this->dedicatedConnection)->select('TSLO_ATTN', 'TSLO_QUOCD', 'TSLO_POCD', 'TSLO_ADDRESS_DESCRIPTION')
                ->where('TSLO_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLO_BRANCH', Auth::user()->branch)
                ->first();

            if (!empty($Attn)) {
                $Subject = T_QUOHEAD::on($this->dedicatedConnection)
                    ->where('TQUO_QUOCD', $Attn->TSLO_QUOCD)
                    ->where('TQUO_BRANCH', Auth::user()->branch)
                    ->first();
            }
            break;
        }

        $totalHargaSewa = 0;
        $totalQty = 0;
        $DOIssuDate = date_format(date_create($RSHeader->TDLVORD_ISSUDT), 'd-M-Y');
        foreach ($RSDetail as $r) {
            $Usage = T_SLODETA::on($this->dedicatedConnection)->select(
                'TSLODETA_USAGE_DESCRIPTION',
                'TSLODETA_PRC',
                'TSLODETA_OPRPRC',
                'TSLODETA_MOBDEMOB',
            )
                ->where('TSLODETA_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLODETA_ITMCD', $r->TDLVORDDETA_ITMCD)
                ->where('TSLODETA_BRANCH', Auth::user()->branch)
                ->groupBy(
                    'TSLODETA_USAGE_DESCRIPTION',
                    'TSLODETA_PRC',
                    'TSLODETA_OPRPRC',
                    'TSLODETA_MOBDEMOB'
                )
                ->first();

            // return $r;
            if ($r->TDLVORD_TYPE < 3) {
                $HargaSewa = ($Usage->TSLODETA_PRC * $r->TDLVORDDETA_ITMQT) + $Usage->TSLODETA_OPRPRC + $Usage->TSLODETA_MOBDEMOB;
                $PeriodFrom = date_format(date_create($Usage->TSLODETA_PERIOD_FR), 'd-M-Y');
                $PeriodTo = date_format(date_create($Usage->TSLODETA_PERIOD_TO), 'd-M-Y');
            } else {
                $HargaSewa = ($r->TDLVORDDETA_PRC * $r->TDLVORDDETA_ITMQT);
            }
            $totalHargaSewa += $HargaSewa;

            $totalQty += $r->TDLVORDDETA_ITMQT;
        }
        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $PPNAmount = 0;
        } else {
            $PPNAmount = $totalHargaSewa * 11 / 100;
        }

        $subjek = ucwords(trim(str_replace('penawaran', '', strtolower(empty($Subject) || $RSHeader->TDLVORD_REMARK == 'SERVICE-INTERNAL' ? 'Internal Service' : $Subject->TQUO_SBJCT))));
        $terbilang = ucwords(rtrim($this->numberToSentence($PPNAmount + $totalHargaSewa)));

        $perulangan = 1;
        $getDO = $doc;
        if (!empty($RSHeader->TDLVORD_TYPE) && $RSHeader->TDLVOR_ISSPLITSJ == 1) {
            $perulangan = count($RSDetail);
        }

        for ($i = 0; $i < $perulangan; $i++) {
            if (!empty($RSHeader->TDLVORD_TYPE) && $RSHeader->TDLVOR_ISSPLITSJ == 1) {
                $getDO = $RSDetail[$i]->TDLVORDDETA_DLVCD;
            }

            $this->fpdf->AddPage("L", 'A5');
            $this->fpdf->SetAutoPageBreak(true, 0);
            $this->fpdf->SetFont('Arial', 'B', 12);
            $this->fpdf->SetXY(3, 5);
            $this->fpdf->Cell(45, 5, $Company->name, 0, 0, 'L');
            $this->fpdf->SetFont('Arial', '', 10);
            $this->fpdf->SetXY(3, 10);
            $this->fpdf->MultiCell(70, 4, $Company->address . ' Telp.' . $Company->phone, 0, 'L');

            $this->fpdf->SetFont('Arial', '', 8);
            $this->fpdf->SetXY(150, 5);
            $this->fpdf->Cell(45, 5, $Branch->MBRANCH_NM . ', ' . ($type === 'inc' ? date('d-M-Y', strtotime($RSHeader->TRCV_ISSUDT)) : $DOIssuDate), 0, 0, 'L');
            $this->fpdf->SetFont('Arial', '', 8);
            $this->fpdf->SetXY(150, 10);
            $this->fpdf->MultiCell(55, 4, 'Kepada ' . $RSHeader->MCUS_CUSNM, 0, 'L');
            $this->fpdf->SetFont('Arial', '', 5);
            $this->fpdf->SetXY(150, 17);
            $this->fpdf->MultiCell(55, 4, $RSHeader->MCUS_ADDR1, 0, 'L');
            $this->fpdf->SetFont('Arial', '', 8);
            $this->fpdf->SetXY(150, 20);
            $this->fpdf->MultiCell(55, 4, $RSHeader->MCUS_REFF_MKT, 0, 'L');
            $this->fpdf->SetXY(150, 30);
            $this->fpdf->MultiCell(55, 4, $RSHeader->MCUS_TELNO, 0, 'L');

            $this->fpdf->SetFont('Arial', 'U', 10);
            $this->fpdf->SetXY(90, 15);
            $this->fpdf->Cell(29, 5, 'SURAT JALAN', 0, 0, 'C');
            $this->fpdf->SetFont('Arial', '', 10);
            $this->fpdf->SetXY(90, 20);
            $this->fpdf->Cell(29, 5, 'NO : ' . $getDO, 0, 0, 'C');

            $this->fpdf->SetFont('Arial', '', 9);
            $this->fpdf->SetXY(3, 30);
            $this->fpdf->Cell(29, 5, 'Dengan kendaraan No. Pol: ' . (count($RSHeader->spk) > 0 ? $RSHeader->spk[0]->CSPK_VEHICLE_REGNUM . ', kami ' . ($type == 'out' ? 'kirimkan' : 'ambil') . ' barang-barang di bawah ini :' : ''), 0, 0, 'L');
            if (count($RSHeader->spk) == 0) {
                $this->fpdf->SetXY(70, 30);
                $this->fpdf->Cell(29, 5, ', kami ' . ($type == 'out' ? 'kirimkan' : 'ambil') . ' barang-barang di bawah ini :', 0, 0, 'L');
            }
            $this->fpdf->SetXY(150, 30);
            // $this->fpdf->Cell(25, 5, date('d M Y H:i:s'), 0, 0, 'L');
            $this->fpdf->Line(3, 35, 205, 35);
            $this->fpdf->Line(3, 36, 205, 36);
            $this->fpdf->Line(3, 42, 205, 42);
            $this->fpdf->Line(3, 43, 205, 43);

            // Isi Header
            $this->fpdf->SetXY(3, 36.5);
            $this->fpdf->Cell(29, 5, 'No', 0, 0, 'L');
            $this->fpdf->SetXY(15, 36.5);
            $this->fpdf->Cell(29, 5, 'Part Number', 0, 0, 'L');
            $this->fpdf->SetXY(45, 36.5);
            $this->fpdf->Cell(29, 5, 'Nama Barang', 0, 0, 'L');
            $this->fpdf->SetXY(100, 36.5);
            $this->fpdf->Cell(29, 5, 'Qty', 0, 0, 'L');
            if ($RSHeader->TDLVORD_TYPE != 4) {
                $this->fpdf->SetXY(120, 36.5);
                $this->fpdf->Cell(29, 5, 'Tanggal Awal', 0, 0, 'L');
                $this->fpdf->SetXY(145, 36.5);
                $this->fpdf->Cell(29, 5, 'Tanggal Akhir', 0, 0, 'L');
            }
            $this->fpdf->SetXY(170, 36.5);
            $this->fpdf->Cell(29, 5, 'Keterangan', 0, 0, 'L');

            # body
            $nomor = 1;
            $Y = 45;

            $listDetail = $RSDetail;

            // Jika split SJ
            if ($RSHeader->TDLVOR_ISSPLITSJ == 1) {
                $listDetail = [$RSDetail[$i]];
            }

            foreach ($listDetail as $r) {
                if ($Y > 130) {
                    $this->fpdf->AddPage("L", 'A5');
                    $this->fpdf->SetAutoPageBreak(true, 0);

                    $Y = 10;
                }

                $qtyNya = $r->TDLVORDDETA_ITMQT;

                $this->fpdf->SetXY(3, $Y);
                $this->fpdf->Cell(29, 5, $nomor++, 0, 0, 'L');
                $this->fpdf->SetXY(15, $Y);
                $this->fpdf->Cell(29, 5, $r->TDLVORDDETA_ITMCD_ACT, 0, 0, 'L');
                $this->fpdf->SetXY(45, $Y);
                $this->fpdf->Cell(29, 5, $r->MITM_ITMNM, 0, 0, 'L');
                $this->fpdf->SetXY(100, $Y);
                $this->fpdf->Cell(29, 5, "{$qtyNya} {$r->MITM_STKUOM}", 0, 0, 'L');
                $this->fpdf->SetXY(120, $Y);
                $this->fpdf->Cell(29, 5, empty($RSDetail[$i]->TSLODETA_PERIOD_FR) ? '-' : date('d M Y', strtotime($RSDetail[$i]->TSLODETA_PERIOD_FR)), 0, 0, 'L');
                $this->fpdf->SetXY(145, $Y);
                $this->fpdf->Cell(29, 5, empty($RSDetail[$i]->TSLODETA_PERIOD_TO) ? '-' : date('d M Y', strtotime($RSDetail[$i]->TSLODETA_PERIOD_TO)), 0, 0, 'L');
                if ($RSHeader->TDLVORD_TYPE != 4) {
                    if (str_contains($RSHeader->TDLVSJDETA_TYPE, 'forklift')) {
                        $this->fpdf->SetXY(170, $Y);
                        $this->fpdf->Cell(29, 5, 'Jam Keluar :' . date('H:i', strtotime($RSHeader->TDLVSJDETA_STARTDT)), 0, 0, 'L');
                        $this->fpdf->SetXY(170, $Y + 5);
                        $this->fpdf->Cell(29, 5, 'Jam Masuk :' . date('H:i', strtotime($RSHeader->TDLVSJDETA_ENDDT)), 0, 0, 'L');
                    } else {
                        $this->fpdf->SetXY(170, $Y);
                        $this->fpdf->Cell(29, 5, $r['MITM_ITMCAT'], 0, 0, 'L');
                        $Y += 5;
                        $this->fpdf->SetXY(170, $Y);
                        $this->fpdf->Cell(29, 5, 'HM :', 0, 0, 'L');
                        $Y += 5;
                        $this->fpdf->SetXY(170, $Y);
                        $this->fpdf->Cell(29, 5, 'Solar :', 0, 0, 'L');
                    }
                }

                if ($RSHeader->TDLVSJDETA_TYPE == 'forklift') {
                    $Y += 10;
                } else {
                    $Y += 10;
                }
            }

            # baris bawah
            $this->fpdf->Line(3, 90, 205, 90);
            $this->fpdf->Line(3, 91, 205, 91);
            $this->fpdf->Line(3, 97, 205, 97);
            $this->fpdf->Line(3, 98, 205, 98);

            $this->fpdf->SetXY(3, 91.5);
            // $this->fpdf->Cell(29, 5, 'Ket:' . $RSHeader->TDLVORD_REMARK, 0, 0, 'L');
            $this->fpdf->Cell(29, 5, "Lokasi : {$RSHeader->TQUO_PROJECT_LOCATION}", 0, 0, 'L');
            $this->fpdf->SetXY(170, 91.5);
            $this->fpdf->Cell(29, 5, date('d M Y H:i:s'), 0, 0, 'L');
            $this->fpdf->SetFont('Arial', 'B', 10);
            // $this->fpdf->SetXY(3, 100);
            // $this->fpdf->Cell(29, 5, "Terbilang : {$this->numberToSentence($RSHeader->TSLODETA_ITMQT * $RSHeader->TSLODETA_PRC)}", 0, 0, 'L');

            $this->fpdf->SetFont('Arial', '', 7);

            if (count($RSHeader->condition) > 0) {
                $startCond = 98.5;
                foreach ($RSHeader->condition as $keyCond => $valueCond) {
                    if (!isset($startCond) || !is_numeric($startCond)) {
                        $startCond = 98;
                    }
                    $this->fpdf->SetXY(1, $startCond);
                    $cond = str_replace("\n", '', $valueCond->MCONDITION_DESCRIPTION);

                    $desc = wordwrap("- " . $cond, 210, "\n", false);
                    $this->fpdf->MultiCell(210, 3, $desc, 0, 'L');
                    $startCond = $this->fpdf->GetY();
                }
            } else {
                $startCond = 100;
                $this->fpdf->SetXY(3, $startCond);
                $this->fpdf->Cell(29, 5, '- Jam Kerja (08:00-16:00), di luar jam kerja ditambah biaya lembur 50%', 0, 0, 'L');
                $startCond += 3;
                $this->fpdf->SetXY(3, $startCond);
                $this->fpdf->Cell(29, 5, '- Bila terjadi sesuatu kecelakaan/kerusakan barang di waktu kerja, semuanya ditanggung oleh penyewa', 0, 0, 'L');
                $startCond += 3;
            }

            $getApproval = $this->getGencode(
                base64_encode('APPROVAL_SETUP'),
                base64_encode('sj'),
                empty($conn) ? $_COOKIE['CGID'] : base64_decode($conn)
            );

            $getApprovalForklift = $this->getGencode(
                base64_encode('APPROVAL_SETUP'),
                base64_encode('sj_forklift'),
                empty($conn) ? $_COOKIE['CGID'] : base64_decode($conn)
            );

            $hasilApproval = [];
            foreach (json_decode($getApproval['MGECD_DESC'], true) as $key => $value) {
                $hasilApproval[] = [
                    'name' => $value['isOwnApproval']
                        ? $Dibuat->name : (
                            $value['isSupplierOrCustApproval']
                            ? $RSHeader->MCUS_CUSNM
                            : ''
                        ),
                    'remarks' => $value['remarks'],
                ];
            }

            $hasilApprovalForklift = [];
            foreach (json_decode($getApprovalForklift['MGECD_DESC'], true) as $key => $value) {
                $hasilApprovalForklift[] = [
                    'name' => $value['isOwnApproval']
                        ? $Dibuat->name : (
                            $value['isSupplierOrCustApproval']
                            ? $RSHeader->MCUS_CUSNM
                            : ''
                        ),
                    'remarks' => $value['remarks'],
                ];
            }

            $this->fpdf->SetFont('Arial', '', 9);
            $this->fpdf->SetXY(15, $startCond + 3);
            if (str_contains($RSHeader->TDLVSJDETA_TYPE, 'forklift')) {
                $startCountF = 52;
                foreach ($hasilApprovalForklift as $key => $valueRemarksForklift) {
                    $this->fpdf->Cell($startCountF, 5, 'Penerima', 0, 0, 'L');
                }
                $this->fpdf->SetXY(13, 135);
                foreach ($hasilApprovalForklift as $key => $valueRemarksForklift) {
                    if (!empty($valueRemarksForklift['name'])) {
                        $this->fpdf->Cell($startCountF, 5, '(' . $valueRemarksForklift['name'] . ')', 0, 0, 'L');
                    } else {
                        $this->fpdf->Cell($startCountF, 5, '(                   )', 0, 0, 'L');
                    }
                }
                // $this->fpdf->Cell(52, 5, 'Penerima', 0, 0, 'L');
                // $this->fpdf->Cell(48, 5, 'Sopir', 0, 0, 'L');
                // $this->fpdf->Cell(50, 5, 'Ks. Gudang', 0, 0, 'L');
                // $this->fpdf->Cell(50, 5, 'Dibuat Oleh', 0, 0, 'L');
                // $this->fpdf->Cell(50, 2, '(                   )', 0, 0, 'L');
                // $this->fpdf->Cell(50, 2, '(                   )', 0, 0, 'L');
                // $this->fpdf->Cell(52, 2, '(                   )', 0, 0, 'L');
                // $this->fpdf->Cell(50, 2, '(' . $Dibuat->name . ')', 0, 0, 'L');
            } else {
                // $this->fpdf->Cell(40, 5, 'Penerima', 0, 0, 'L');
                // $this->fpdf->Cell(40, 5, 'Sopir', 0, 0, 'L');
                // $this->fpdf->Cell(40, 5, 'Operator', 0, 0, 'L');
                // $this->fpdf->Cell(40, 5, 'Adm. Stok', 0, 0, 'L');
                // $this->fpdf->Cell(40, 5, 'Dibuat Oleh', 0, 0, 'L');

                $startCount = 40;
                foreach ($hasilApproval as $key => $valueRemarks) {
                    $this->fpdf->Cell($startCount, 5, $valueRemarks['remarks'], 0, 0, 'L');
                }
                $this->fpdf->SetXY(13, 135);
                foreach ($hasilApproval as $key => $valueRemarks) {
                    if (!empty($valueRemarks['name'])) {
                        $this->fpdf->Cell($startCount, 5, '(' . $valueRemarks['name'] . ')', 0, 0, 'L');
                    } else {
                        $this->fpdf->Cell($startCount, 5, '(                   )', 0, 0, 'L');
                    }
                }
            }

            $this->fpdf->SetXY(5, 140);
            $this->fpdf->Cell(45, 5, 'Putih : Penyewa', 0, 0, 'L');
            $this->fpdf->Cell(45, 5, 'Merah : Supir / Operator', 0, 0, 'L');
            $this->fpdf->Cell(45, 5, 'Kuning : Penyewa', 0, 0, 'L');
            $this->fpdf->Cell(40, 5, 'Hijau : Lap. Harian', 0, 0, 'L');
            $this->fpdf->Cell(45, 5, 'Biru : Arsip', 0, 0, 'L');
        }

        $pdfFile = $this->fpdf->Output("", "S");

        return base64_encode($pdfFile);
    }

    public function printGensetHarian($doc)
    {
        $doc = base64_decode($doc);
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                DB::raw("TDLVORD_DLVCD"),
                'TDLVOR_ISSPLITSJ'
            )
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_DLVORDDETA', DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"))
            ->leftJoin('T_SLOHEAD', 'TDLVORDDETA_SLOCD', 'TSLO_SLOCD')
            ->leftJoin('T_SLODETA', 'TSLO_SLOCD', 'TSLODETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TSLO_QUOCD', 'TQUO_QUOCD')
            ->leftJoin('T_DLVSJDETA', DB::raw("SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"))
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->with([
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                },
                'spk' => function ($f) {
                    $f->where('CSPK_PIC_AS', 'DRIVER');
                },
                'dlvsj'
            ])
            ->groupBy(
                'TDLVORD_DLVCD',
                DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"),
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                'TDLVOR_ISSPLITSJ'
            )
            ->first();

        $RSDetail = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'TDLVORDDETA_ITMCD',
            'TDLVORDDETA_DLVCD',
            'TDLVORDDETA_ITMCD_ACT',
            'TDLVORDDETA_ITMQT',
            'MITM_ITMNM',
            'MITM_STKUOM',
            'T_DLVORDDETA.created_by',
            'TDLVORDDETA_SLOCD',
            'MITM_ITMNM',
            'MITM_MODEL',
            'MITM_BRAND',
            'MITM_ITMCAT',
            'name',
            DB::raw('MIN(TSLODETA_PERIOD_FR) AS TSLODETA_PERIOD_FR'),
            DB::raw('MAX(TSLODETA_PERIOD_TO) AS TSLODETA_PERIOD_TO'),
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')
                    ->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->leftJoin('T_SLODETA', function ($join) {
                $join->on('TSLODETA_SLOCD', '=', 'TDLVORDDETA_SLOCD')
                    ->on('TDLVORDDETA_ITMCD', '=', 'TSLODETA_ITMCD');
            })
            ->join(DB::raw('jatpower_tribin.users'), 'nick_name', 'T_SLODETA.created_by')
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORDDETA_BRANCH', Auth::user()->branch)
            // ->where('MITM_ITMCAT', 'GENSET')
            ->groupBy(
                'TDLVORDDETA_ITMCD',
                'TDLVORDDETA_DLVCD',
                'TDLVORDDETA_ITMCD_ACT',
                'TDLVORDDETA_ITMQT',
                'MITM_ITMNM',
                'MITM_STKUOM',
                'T_DLVORDDETA.created_by',
                'TDLVORDDETA_SLOCD',
                'MITM_ITMNM',
                'MITM_MODEL',
                'MITM_BRAND',
                'MITM_ITMCAT',
                'name',
            )
            ->get();

        $Company = COMPANY_BRANCH::on($this->dedicatedConnection)->select(
            'name',
            'COMPANY_BRANCHES.address',
            'COMPANY_BRANCHES.phone',
            'invoice_letter_id'
        )
            ->where('connection', $this->dedicatedConnection)
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Branch = M_BRANCH::select('MBRANCH_NM')->where('MBRANCH_CD', Auth::user()->branch)->first();
        $DOIssuDate = date_format(date_create($RSHeader->TDLVORD_ISSUDT), 'd-M-Y');

        // return $RSHeader;
        foreach ($RSDetail as $key => $valueDet) {
            $this->fpdf->AddPage("L", 'A5');
            $pageWidth = $this->fpdf->GetPageWidth() - 10;

            $this->fpdf->SetAutoPageBreak(true, 0);
            $this->fpdf->SetFont('Arial', 'B', 12);
            $this->fpdf->Cell($pageWidth, 5, 'FORM OPERASI GENSET HARIAN', 0, 1, 'C');
            $this->fpdf->SetFont('Arial', 'B', 10);
            $this->fpdf->Cell($pageWidth, 5, "No. SJ : {$doc}", 0, 1, 'C');

            $getOperator = count($RSHeader->spk) > 0
                ? array_values(array_filter($RSHeader->spk, function ($f) {
                    return $f['CSPK_PIC_AS'] == 'OPERATOR';
                }))[0]['CSPK_PIC_NAME']
                : '-';

            $getDriver = count($RSHeader->spk) > 0
                ? array_values(array_filter($RSHeader->spk, function ($f) {
                    return $f['CSPK_PIC_AS'] == 'OPERATOR';
                }))[0]['CSPK_PIC_NAME']
                : '-';

            $getKordinator = count($RSHeader->spk) > 0
                ? array_values(array_filter($RSHeader->spk, function ($f) {
                    return $f['CSPK_PIC_AS'] == 'KOORDINATOR';
                }))[0]['CSPK_PIC_NAME']
                : '-';

            $listHeader = [
                [
                    'left_label' => 'Nama Penyewa',
                    'left_value' => $RSHeader->MCUS_CUSNM,
                    'right_label' => 'Period Sewa',
                    'right_value' => date('d M Y', strtotime($valueDet->TSLODETA_PERIOD_FR)) . " - " . date('d M Y', strtotime($valueDet->TSLODETA_PERIOD_TO))
                ],
                [
                    'left_label' => 'No Telp.',
                    'left_value' => $RSHeader->MCUS_TELNO,
                    'right_label' => 'Nama Operator',
                    'right_value' => $getOperator
                ],
                [
                    'left_label' => 'Genset',
                    'left_value' => $valueDet->MITM_ITMNM . ' (' . $valueDet->TDLVORDDETA_ITMCD_ACT . ')',
                    'right_label' => 'Sales',
                    'right_value' => $valueDet->name
                ],
                [
                    'left_label' => 'Lokasi',
                    // 'left_value' => $RSHeader->MCUS_ADDR1,
                    'left_value' => $RSHeader->TDLVORD_REMARK,
                    'right_label' => 'Supir',
                    'right_value' => $getDriver
                ],
                [
                    'left_label' => '',
                    'left_value' => '',
                    'right_label' => 'Koor. Lap',
                    'right_value' => $getKordinator
                ],
            ];

            $Y = 25;
            foreach ($listHeader as $keyListHead => $valueListHead) {
                $this->fpdf->SetXY(3, $Y);
                $this->fpdf->SetFont('Arial', '', 9);
                $this->fpdf->Cell(10, 5, $valueListHead['left_label'], 0, 1, 'L');
                $this->fpdf->SetXY(30, $Y);
                $this->fpdf->Cell(10, 5, !empty($valueListHead['left_label']) ? ":" : "", 0, 1, 'L');
                $this->fpdf->SetXY(35, $Y);
                $this->fpdf->MultiCell(70, 5, $valueListHead['left_value'], 0, 'L');

                $this->fpdf->SetXY(120, $Y);
                $this->fpdf->Cell(10, 5, $valueListHead['right_label'], 0, 1, 'L');
                $this->fpdf->SetXY(145, $Y);
                $this->fpdf->Cell(10, 5, ":", 0, 1, 'L');
                $this->fpdf->SetXY(150, $Y);
                $this->fpdf->MultiCell(70, 5, $valueListHead['right_value'], 0, 'L');

                $Y += 5;
            }

            $Y += 5;
            $this->fpdf->SetXY(3, $Y);
            $this->fpdf->SetFont('Arial', '', 9);

            $listHeader = [
                'Tanggal',
                'Hour Awal',
                'Hour Akhir',
                'HM Pemakaian',
                'AMP',
                'Solar Awal',
                'Solar Akhir',
                'Keterangan',
            ];

            $W_Awal = 3;
            $tinggiTable = 110;
            foreach ($listHeader as $keylistHeader => $valuelistHeader) {
                $this->fpdf->SetXY($W_Awal, $Y);
                $this->fpdf->Cell(25, 5, $valuelistHeader, 1, 1, 'C');

                // Tinggi Table 120
                $this->fpdf->Line($W_Awal, $Y, $W_Awal, $tinggiTable);
                $this->fpdf->Line($W_Awal, $tinggiTable, $W_Awal + 25, $tinggiTable);

                $W_Awal += 25;
            }

            // Line kolom terakhir
            $this->fpdf->Line($W_Awal, $Y, $W_Awal, $tinggiTable);

            $Y = $tinggiTable + 5;

            $listTTD = [
                [
                    'mark' => 'Marketing',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Sopir',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Operator',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Adm. Stok',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Penyewa',
                    'markVal' => '(' . $RSHeader->MCUS_CUSNM . ')',
                ],
            ];

            $startXTTD = 10;
            $panjangTTD = 37;
            foreach ($listTTD as $keylistTTD => $valuelistTTD) {
                $this->fpdf->SetXY($startXTTD, $Y);
                $this->fpdf->Cell($panjangTTD, 5, $valuelistTTD['mark'], 0, 1, 'C');


                $this->fpdf->SetXY($startXTTD, $Y + 20);
                $this->fpdf->Cell($panjangTTD, 5, $valuelistTTD['markVal'], 0, 1, 'C');
                // $this->fpdf->SetXY($startXTTD * $keylistTTD + 1, $Y + 25);
                // $this->fpdf->Cell(40, 2, '(                   )', 0, 0, 'L');
                $startXTTD += $panjangTTD;
            }


            $this->fpdf->SetXY(5, 140);
            $this->fpdf->Cell(45, 5, 'Putih : Marketing', 0, 0, 'R');
            $this->fpdf->Cell(45, 5, 'Merah : Operator', 0, 0, 'R');
            $this->fpdf->Cell(45, 5, 'Kuning : Adm. Sparepart', 0, 0, 'R');
            $this->fpdf->Cell(40, 5, 'Hijau : Penyewa', 0, 0, 'R');
        }

        $pdfFile = $this->fpdf->Output("", "S");

        return base64_encode($pdfFile);
    }

    public function cekKwitansiNo()
    {
        $cek = T_DLVORDHEAD::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
            ->orderBy(DB::raw('MAX(created_at)'), 'desc')
            ->first();

        return $cek;
    }

    function searchAPIForInvoice(Request $request)
    {
        $RS = T_SLOHEAD::on($this->dedicatedConnection)->select([
            // "TSLO_SLOCD",
            "TSLO_QUOCD",
            "TSLO_CUSCD",
            "MCUS_CUSNM",
            "TSLO_ISSUDT",
            'TQUO_ATTN'
        ])
            ->join('M_CUS', function ($join) {
                $join->on('TSLO_CUSCD', '=', 'MCUS_CUSCD')->on('TSLO_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_QUOHEAD', 'TQUO_QUOCD', 'TSLO_QUOCD')
            ->groupBy(
                // "TSLO_SLOCD",
                "TSLO_QUOCD",
                "TSLO_CUSCD",
                "MCUS_CUSNM",
                "TSLO_ISSUDT",
                'TQUO_ATTN'
            );

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $hasil = [];
        foreach ($RS->get()->toArray() as $key => $value) {
            $salesOrd = T_SLOHEAD::on($this->dedicatedConnection)->where('TSLO_QUOCD', '=', $value['TSLO_QUOCD'])
                ->get()
                ->toArray();

            $hasilSO = [];
            foreach ($salesOrd as $key => $valueSO) {
                $APISLO = $this->searchAPIBySLO($valueSO['TSLO_SLOCD']);
                foreach ($APISLO as $keyDetSO => $valueDetSO) {
                    $hasilSO[] = $valueDetSO;
                }
            }

            if (count($hasilSO) > 0) {
                $hasil[] = array_merge($value, [
                    'dlv' => $hasilSO
                ]);
            }
        }

        return ['data' => $hasil];
        // return ['data' => $RS->get()->toArray()];
    }

    function searchAPIBySLO($sloCD)
    {
        $data = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                DB::raw("CONCAT(TDLVORD_DLVCD, ' (', MCUS_CUSNM, ' - ', TQUO_ATTN, ')') AS LABEL"),
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
                'TDLVORDDETA_SLOCD',
                'TDLVORD_CUSCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN'
            )
            ->with([
                'dlvdet' => function ($f) {
                    $f->on($this->dedicatedConnection)->join('M_ITM', 'TDLVORDDETA_ITMCD_ACT', 'MITM_ITMCD');
                },
                'dlvacc',
                'dlvsj',
                'payment' => function ($f) {
                    $f->select('*', DB::raw('branch_payment_accounts.id as TDLVPAYDETA_IDPAY'));
                },
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                }
            ])
            ->join('T_DLVORDDETA', 'TDLVORD_DLVCD', 'TDLVORDDETA_DLVCD')
            ->join('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_SLOHEAD', 'TSLO_SLOCD', 'TDLVORDDETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TQUO_QUOCD', 'TSLO_QUOCD')
            ->where(DB::raw('RTRIM(TDLVORDDETA_ITMCD_ACT)'), '<>', '')
            ->groupBy(
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
                'TDLVORD_CUSCD',
                'TDLVORDDETA_SLOCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN'
            );

        $data->where('TDLVORDDETA_SLOCD', '=', $sloCD);

        $hasil = [];
        foreach ($data->get()->toArray() as $key => $value) {
            $hasil[] = array_merge(
                $value,
                [
                    'sloDet' => T_SLODETA::on($this->dedicatedConnection)
                        ->where('TSLODETA_SLOCD', $value['TDLVORDDETA_SLOCD'])
                        ->join('M_USAGE', 'M_USAGE.id', 'TSLODETA_USAGE_DESCRIPTION')
                        ->get()
                ]
            );
        }

        return $hasil;
    }

    function cancelInvoice($doc)
    {
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->where(DB::raw("CASE WHEN TDLVORD_TYPE = 4 OR TDLVORD_TYPE = 5
                    THEN TDLVORD_DLVCD
                    ELSE substring_index(TDLVORD_DLVCD, '/', 1)
                END"), base64_decode($doc))
            ->first();

        if ($RSHeader) {
            if (in_array($RSHeader->TDLVORD_TYPE, ['1', '2', '3'])) {
                T_DLVORDHEAD::on($this->dedicatedConnection)
                    ->where(DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), base64_decode($doc))
                    ->update([
                        'TDLVORD_REC_NO' => ''
                    ]);

                T_DLVORDDETA::on($this->dedicatedConnection)
                    ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), base64_decode($doc))
                    ->update([
                        'TDLVORDDETA_ITMCD_ACT' => ''
                    ]);

                if ($RSHeader->TDLVORD_TYPE == 3) {
                    C_ITRN::on($this->dedicatedConnection)
                        ->where(DB::raw("CITRN_DOCNO"), base64_decode($doc))
                        ->delete();
                    T_DLVORDDETA::on($this->dedicatedConnection)
                        ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), base64_decode($doc))->delete();
                    T_DLVORDHEAD::on($this->dedicatedConnection)
                        ->where(DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), base64_decode($doc))->delete();
                }
            } else {
                T_DLVORDHEAD::on($this->dedicatedConnection)
                    ->where('TDLVORD_DLVCD', base64_decode($doc))
                    ->delete();

                T_DLVORDDETA::on($this->dedicatedConnection)
                    ->where('TDLVORDDETA_DLVCD', base64_decode($doc))
                    ->delete();
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Invoice is canceled',
            'data' => $RSHeader,
            'conn' => $this->dedicatedConnection
        ]);
    }
}
