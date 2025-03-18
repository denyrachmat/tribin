<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M_TAX;

class TaxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'tax']);
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
        $data = M_TAX::updateOrCreate([
            'MTAX_CODE' => $request->MTAX_CODE
        ], $request->all());

        return $data;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = M_TAX::where('MTAX_CODE', $id)->get();

        return $data;
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
        $data = M_TAX::where('MTAX_CODE', $id)->delete();

        return $data;
    }

    public function searchAPI(Request $request) {
        $RS = new M_TAX;

        if (!empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        return ['data' => $RS->get()];
    }

    public function listTaxes() {
        $RS = new M_TAX;

        $hasil = [];
        foreach ($RS->get() as $key => $value) {
            $hasil[] = [
                'value' => $value->MTAX_CODE,
                'label' => $value->MTAX_DESC
            ];
        }

        return $hasil;
    }
}
