<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M_ITMSPRICE;
use Illuminate\Support\Facades\Crypt;

class PriceSellController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $validatedData = $request->validate([
            'MITMSPRC_ITMCD' => 'required|string|max:50',
            'MITMSPRC_TYPE' => [
                'required',
                'string',
                'max:20',
                function ($attribute, $value, $fail) use ($request) {
                    $exists = \App\Models\M_GENCODE::where('MGECD_CODE', 'MPRC_TYPE')
                        ->where('MGECD_CG', Crypt::decryptString($request->MITMSPRC_CG))
                        ->where('MGECD_BRANCH', $request->MITMSPRC_BRANCH)
                        ->where('MGECD_VALUE', $value)
                        ->exists();

                    if (!$exists) {
                        $fail('The selected type is invalid for the given CG and branch.');
                    }
                },
            ],
            'MITMSPRC_PRC' => 'required|numeric',
            'MITMSPRC_STARTDT' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($request) {
                    $startDate = $value;
                    $endDate = $request->MITMSPRC_ENDDT;

                    $overlap = M_ITMSPRICE::where('MITMSPRC_ITMCD', $request->MITMSPRC_ITMCD)
                        ->where('MITMSPRC_CG', Crypt::decryptString($request->MITMSPRC_CG))
                        ->where('MITMSPRC_BRANCH', $request->MITMSPRC_BRANCH)
                        ->where('MITMSPRC_TYPE', $request->MITMSPRC_TYPE)
                        ->where(function ($query) use ($startDate, $endDate) {
                            $query->where(function ($q) use ($startDate, $endDate) {
                                $q->where('MITMSPRC_STARTDT', '<=', $startDate)
                                    ->where(function ($q2) use ($startDate) {
                                        $q2->whereNull('MITMSPRC_ENDDT')
                                            ->orWhere('MITMSPRC_ENDDT', '>=', $startDate);
                                    });
                            })
                                ->orWhere(function ($q) use ($startDate, $endDate) {
                                    if ($endDate) {
                                        $q->where('MITMSPRC_STARTDT', '<=', $endDate)
                                            ->where(function ($q2) use ($endDate) {
                                                $q2->whereNull('MITMSPRC_ENDDT')
                                                    ->orWhere('MITMSPRC_ENDDT', '>=', $endDate);
                                            });
                                    }
                                })
                                ->orWhere(function ($q) use ($startDate, $endDate) {
                                    if ($endDate) {
                                        $q->where('MITMSPRC_STARTDT', '>=', $startDate)
                                            ->where('MITMSPRC_STARTDT', '<=', $endDate);
                                    }
                                });
                        })
                        ->exists();

                    if ($overlap) {
                        $fail('The date range overlaps with an existing price record.');
                    }
                },
            ],
            'MITMSPRC_ENDDT' => [
                'nullable',
                'date',
                'after_or_equal:MITMSPRC_STARTDT',
                function ($attribute, $value, $fail) use ($request) {
                    $startDate = $request->MITMSPRC_STARTDT;
                    $endDate = $value;

                    $overlap = M_ITMSPRICE::where('MITMSPRC_ITMCD', $request->MITMSPRC_ITMCD)
                        ->where('MITMSPRC_CG', Crypt::decryptString($request->MITMSPRC_CG))
                        ->where('MITMSPRC_BRANCH', $request->MITMSPRC_BRANCH)
                        ->where('MITMSPRC_TYPE', $request->MITMSPRC_TYPE)
                        ->where(function ($query) use ($startDate, $endDate) {
                            $query->where(function ($q) use ($startDate, $endDate) {
                                $q->where('MITMSPRC_STARTDT', '<=', $startDate)
                                    ->where(function ($q2) use ($startDate) {
                                        $q2->whereNull('MITMSPRC_ENDDT')
                                            ->orWhere('MITMSPRC_ENDDT', '>=', $startDate);
                                    });
                            })
                                ->orWhere(function ($q) use ($startDate, $endDate) {
                                    if ($endDate) {
                                        $q->where('MITMSPRC_STARTDT', '<=', $endDate)
                                            ->where(function ($q2) use ($endDate) {
                                                $q2->whereNull('MITMSPRC_ENDDT')
                                                    ->orWhere('MITMSPRC_ENDDT', '>=', $endDate);
                                            });
                                    }
                                })
                                ->orWhere(function ($q) use ($startDate, $endDate) {
                                    if ($endDate) {
                                        $q->where('MITMSPRC_STARTDT', '>=', $startDate)
                                            ->where('MITMSPRC_STARTDT', '<=', $endDate);
                                    }
                                });
                        })
                        ->exists();

                    if ($overlap) {
                        $fail('The date range overlaps with an existing price record.');
                    }
                },
            ],
            'MITMSPRC_ACTIVE' => 'required|boolean',
            'MITMSPRC_CG' => 'nullable|string',
            'created_by' => 'required|string|max:50',
            'MITMSPRC_BRANCH' => 'required|numeric',
            'MITMBPRC_ID' => 'required|numeric',
        ]);

        $validatedData['MITMSPRC_CG'] = Crypt::decryptString($validatedData['MITMSPRC_CG']);

        // Check if item code exists and deactivate existing records
        M_ITMSPRICE::where('MITMSPRC_ITMCD', $validatedData['MITMSPRC_ITMCD'])
            ->where('MITMSPRC_ACTIVE', true)
            ->where('MITMSPRC_TYPE', $validatedData['MITMSPRC_TYPE'])
            ->update(['MITMSPRC_ACTIVE' => false]);
        
        // Create new price record
        M_ITMSPRICE::create($validatedData);

        return response()->json(['message' => 'Selling price created successfully'], 201);
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
