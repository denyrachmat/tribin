<?php

namespace App\Http\Controllers;
use App\Traits\LocationTraits;
use Validator;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;

use App\Models\T_POS;
use App\Models\T_POS_DET;

USE App\Models\CompanyGroup;

class POSController extends Controller
{
    use LocationTraits;

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
        return view('tribinapp_layouts', ['routeApp' => 'pos']);
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
            'TPOS_CUSTCD' => 'required',
            'det.*.TPOSD_ITMCD' => 'required',
            'det.*.TPOSD_QTY' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }
        $cekCG = CompanyGroup::where('connection', $this->dedicatedConnection)->first();
        $cek = T_POS::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
                ->orderBy('created_at', 'desc')
                ->first();

        if ($request->has('TPOS_DOCNO')) {
            $IDPOS = $request->TPOS_DOCNO;
        } else {
            $IDPOS = 'POS/'.$cekCG->alias_code.'/'.date('Y/m/d').'/'. (empty($cek) ? '0001' : sprintf('%07d', (int) substr($cek->TPOS_DOCNO, -4) + 1));
        }


        T_POS::on($this->dedicatedConnection)->updateOrCreate([
            'TPOS_DOCNO' => $IDPOS,
            'TPOS_CUSTCD' => $request->TPOS_CUSTCD
        ],[
            'TPOS_DOCNO' => $IDPOS,
            'TPOS_CUSTCD' => $request->TPOS_CUSTCD
        ]);

        foreach ($request->det as $key => $value) {
            T_POS_DET::updateOrCreate([
                'TPOSH_ID' => $IDPOS,
                'TPOSD_ITMCD' => $value['TPOSD_ITMCD']
            ],[
                'TPOSH_ID' => $IDPOS,
                'TPOSD_ITMCD' => $value['TPOSD_ITMCD'],
                'TPOSD_QTY' => $value['TPOSD_QTY']
            ]);
        }
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
}
