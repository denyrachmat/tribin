<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M_DISC;

class DiscController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'disc']);
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
        $data = M_DISC::updateOrCreate([
            'MDISC_CODE' => $request->MDISC_CODE
        ], $request->all());

        return $data;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = M_DISC::where('MDISC_CODE', $id)->get();

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
        //
    }
}
