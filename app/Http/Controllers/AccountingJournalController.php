<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\Models\T_GLHIST;
use App\Models\M_COA;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AccountingJournalController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'journalInput']);
    }

    public function searchAPI(Request $request): array
    {
        $data = T_GLHIST::on($this->dedicatedConnection)
            ->from('T_GLHIST as a')
            ->select(
                'a.GLHIST_DOC',
                'a.GLHIST_CURR',
                'a.GLHIST_EFFDT',
                DB::raw('MAX(MCOA_TYPE) AS MCOA_TYPE'),
                DB::raw("COALESCE((
                    SELECT SUM(b.GLHIST_AMT)
                    FROM T_GLHIST b
                    WHERE b.GLHIST_DOCTYPE = 'INC-JRN'
                    AND b.GLHIST_DOC = a.GLHIST_DOC
                ), 0) as GLHIST_AMT_DB"),
                DB::raw("COALESCE((
                    SELECT SUM(b.GLHIST_AMT) * -1
                    FROM T_GLHIST b
                    WHERE b.GLHIST_DOCTYPE = 'OUT-JRN'
                    AND b.GLHIST_DOC = a.GLHIST_DOC
                ), 0) as GLHIST_AMT_CR"),
            )
            ->where('GLHIST_DOCTYPE', 'like', '%JRN')
            ->leftjoin('M_COA', 'GLHIST_ACC', 'MCOA_COACD')
            ->groupBy(
                'GLHIST_DOC',
                'GLHIST_CURR',
                'GLHIST_EFFDT'
            );

        if (!empty($request->searchValue)) {
            $data = (clone $data)->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $hasil = [];
        foreach ($data->get()->toArray() as $key => $value) {
            $hasil[] = array_merge($value, [
                'det' => T_GLHIST::on($this->dedicatedConnection)
                    ->select(
                        'GLHIST_ACC',
                        'GLHIST_DOC',
                        DB::raw("CASE WHEN MCOA_TYPE = 'INC'
                            THEN GLHIST_AMT
                            ELSE GLHIST_AMT * -1
                        END AS GLHIST_AMT"),
                        'GLHIST_DESC',
                        'GLHIST_EFFDT',
                        'GLHIST_CURR',
                        'MCOA_TYPE',
                    )
                    ->join('M_COA', 'GLHIST_ACC', 'MCOA_COACD')
                    ->where('GLHIST_DOC', $value['GLHIST_DOC'])
                    ->get()
                    ->toArray()
            ]);
        }

        return ['data' => $hasil];
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
            'MCOA_TYPE' => 'required',
            'GLHIST_EFFDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $cek = T_GLHIST::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
            ->where('GLHIST_DOCTYPE', 'like', '%JRN')
            ->orderBy('created_at', 'desc')
            ->first();

        $DOCJournal = 'JRN/' . date('d/m/y') . '/' . (empty($cek) ? '0000001' : sprintf('%07d', (int) substr($cek->GLHIST_DOC, -6) + 1));

        $insertedData = [];
        foreach ($request->det as $key => $value) {
            M_COA::on($this->dedicatedConnection)->where('MCOA_COACD', $value['GLHIST_ACC'])
                ->update([
                    'MCOA_TYPE' => $request->MCOA_TYPE,
                    'MCOA_CURR' => $value['GLHIST_CURR']
                ]);

            $insertedData = T_GLHIST::on(($this->dedicatedConnection))->updateOrCreate([
                'GLHIST_ACC' => $value['GLHIST_ACC'],
                'GLHIST_AMT' => $request->MCOA_TYPE === 'INC' ? $value['GLHIST_AMT'] : $value['GLHIST_AMT'] * -1,
                'GLHIST_CURR' => $value['GLHIST_CURR'],
                'GLHIST_DESC' => $value['GLHIST_DESC'],
                'GLHIST_DOC' => $DOCJournal,
                'GLHIST_EFFDT' => $request->GLHIST_EFFDT,
                'GLHIST_CRDT' => date('Y-m-d'),
                'GLHIST_DOCTYPE' => $request->MCOA_TYPE . '-JRN',
                'GLHIST_ITMCD' => ''
            ]);
        }

        return [
            'msg' => 'OK',
            'data' => $insertedData,
        ];
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
        $validator = Validator::make($request->all(), [
            'MCOA_TYPE' => 'required',
            'GLHIST_EFFDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        T_GLHIST::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
            ->where('GLHIST_DOCTYPE', 'like', '%JRN')
            ->where('GLHIST_DOC', base64_decode($id))
            ->delete();

        foreach ($request->det as $key => $value) {
            M_COA::on($this->dedicatedConnection)->where('MCOA_COACD', $value['GLHIST_ACC'])
                ->update([
                    'MCOA_TYPE' => $request->MCOA_TYPE,
                    'MCOA_CURR' => $value['GLHIST_CURR']
                ]);

            $insertedData = T_GLHIST::on(($this->dedicatedConnection))->create([
                'GLHIST_ACC' => $value['GLHIST_ACC'],
                'GLHIST_AMT' => $request->MCOA_TYPE === 'INC' ? $value['GLHIST_AMT'] : $value['GLHIST_AMT'] * -1,
                'GLHIST_CURR' => $value['GLHIST_CURR'],
                'GLHIST_DESC' => $value['GLHIST_DESC'],
                'GLHIST_DOC' => $request->GLHIST_DOC,
                'GLHIST_EFFDT' => $request->GLHIST_EFFDT,
                'GLHIST_CRDT' => date('Y-m-d'),
                'GLHIST_DOCTYPE' => $request->MCOA_TYPE . '-JRN',
                'GLHIST_ITMCD' => ''
            ]);
        }

        return [
            'msg' => 'OK',
            'data' => $insertedData,
        ];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $delete = T_GLHIST::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
            ->where('GLHIST_DOCTYPE', 'like', '%JRN')
            ->where('GLHIST_DOC', base64_decode($id))
            ->delete();

        return [
            'msg' => 'OK',
            'data' => $delete
        ];
    }
}
