<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M_LOC;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class locationController extends Controller
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
        return view('tribinapp_layouts', ['routeApp' => 'location']);
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
            // 'MITM_ITMCD' => 'required',
            // 'MLOC_LOCCD' => [
            //     Rule::unique($this->dedicatedConnection . '.M_ITM', 'MITM_ITMCD')->where('MITM_BRANCH', Auth::user()->branch)
            // ],
            'header.MLOC_LOCCD' => 'required',
            'header.MLOC_LOCNM' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $hasil = M_LOC::on($this->dedicatedConnection)->updateOrCreate([
            'MLOC_LOCCD' => $request->header['MLOC_LOCCD'],
        ],[
            'MLOC_LOCCD' => $request->header['MLOC_LOCCD'],
            'MLOC_LOCNM' => $request->header['MLOC_LOCNM'],
            'MLOC_LOCPRNTCD' => $request->header['MLOC_LOCPRNTCD'],
            'created_by' => Auth::user()->username,
        ]);

        return ['msg' => 'OK', 'data' => $hasil];
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
            'MLOC_LOCNM' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $hasil = M_LOC::on($this->dedicatedConnection)->updateOrCreate([
            'MLOC_LOCCD' => $request->header['MLOC_LOCCD'],
        ],[
            'MLOC_LOCCD' => $request->header['MLOC_LOCCD'],
            'MLOC_LOCNM' => $request->header['MLOC_LOCNM'],
            'MLOC_LOCPRNTCD' => $request->header['MLOC_LOCPRNTCD'],
            'created_by' => $request->header['created_by'],
        ]);

        return ['msg' => 'OK', 'data' => $hasil];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function searchAPI(Request $request) {
        $RS = M_LOC::on($this->dedicatedConnection);

        if (!empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        return ['data' => $RS->get()];
    }
}
