<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\M_ITMBPRICE;
use App\Models\M_ITMSPRICE;

use App\Http\Controllers\PriceSellController;
use Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\DB;
use App\Models\CompanyGroup;

use App\Imports\itemPriceMasterUpload;
use Maatwebsite\Excel\Facades\Excel;

class PriceBuyController extends Controller
{
    public function getDB($connection)
    {
        return CompanyGroup::where('connection', $connection)->first();
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'price']);
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
            'MITMBPRC_ITMCD' => 'required|string|max:50',
            'MITMBPRC_PRC' => 'required|numeric',
            'MITMSPRC_PRC' => 'required|numeric',
            'MITMSPRC_TYPE' => [
                'required',
                'string',
                'max:20',
                function ($attribute, $value, $fail) use ($request) {
                    $exists = \App\Models\M_GENCODE::where('MGECD_CODE', 'MPRC_TYPE')
                        ->where('MGECD_CG', $this->decryptIfEncrypted($request->MITMBPRC_CG))
                        ->where('MGECD_BRANCH', $request->MITMBPRC_BRANCH)
                        ->where('MGECD_VALUE', $value)
                        ->exists();

                    if (!$exists) {
                        $fail('The selected type is invalid for the given CG and branch.');
                    }
                },
            ],
            'MITMBPRC_STARTDT' => [
                'required',
                'date',
                // function ($attribute, $value, $fail) use ($request) {
                //     $startDate = $value;
                //     $endDate = $request->MITMBPRC_ENDDT;

                //     $overlap = M_ITMBPRICE::join('M_ITMSPRICE', function ($join) {
                //         $join->on('M_ITMBPRICE.id', '=', 'M_ITMSPRICE.MITMBPRC_ID');
                //     })
                //         ->where('MITMSPRC_TYPE', $request->MITMSPRC_TYPE)
                //         ->where('MITMBPRC_ITMCD', $request->MITMBPRC_ITMCD)
                //         ->where('MITMBPRC_CG', $this->decryptIfEncrypted($request->MITMBPRC_CG))
                //         ->where('MITMBPRC_BRANCH', $request->MITMBPRC_BRANCH)
                //         ->where(function ($query) use ($startDate, $endDate) {
                //             $query->where(function ($q) use ($startDate, $endDate) {
                //                 $q->where('MITMBPRC_STARTDT', '<=', $startDate)
                //                     ->where(function ($q2) use ($startDate) {
                //                         $q2->whereNull('MITMBPRC_ENDDT')
                //                             ->orWhere('MITMBPRC_ENDDT', '>=', $startDate);
                //                     });
                //             })
                //                 ->orWhere(function ($q) use ($startDate, $endDate) {
                //                     if ($endDate) {
                //                         $q->where('MITMBPRC_STARTDT', '<=', $endDate)
                //                             ->where(function ($q2) use ($endDate) {
                //                                 $q2->whereNull('MITMBPRC_ENDDT')
                //                                     ->orWhere('MITMBPRC_ENDDT', '>=', $endDate);
                //                             });
                //                     }
                //                 })
                //                 ->orWhere(function ($q) use ($startDate, $endDate) {
                //                     if ($endDate) {
                //                         $q->where('MITMBPRC_STARTDT', '>=', $startDate)
                //                             ->where('MITMBPRC_STARTDT', '<=', $endDate);
                //                     }
                //                 });
                //         })
                //         ->exists();

                //     if ($overlap) {
                //         $fail('The date range overlaps with an existing price record.');
                //     }
                // },
            ],
            'MITMBPRC_ENDDT' => [
                'nullable',
                'date',
                'after_or_equal:MITMBPRC_STARTDT',
                // function ($attribute, $value, $fail) use ($request) {
                //     $startDate = $request->input('MITMBPRC_STARTDT');
                //     $endDate = $value;

                //     $overlap = M_ITMBPRICE::join('M_ITMSPRICE', function ($join) {
                //         $join->on('M_ITMBPRICE.id', '=', 'M_ITMSPRICE.MITMBPRC_ID');
                //     })
                //         ->where('MITMSPRC_TYPE', $request->MITMSPRC_TYPE)
                //         ->where('MITMBPRC_ITMCD', $request->MITMBPRC_ITMCD)
                //         ->where('MITMBPRC_CG', $this->decryptIfEncrypted($request->MITMBPRC_CG))
                //         ->where('MITMBPRC_BRANCH', $request->MITMBPRC_BRANCH)
                //         ->where(function ($query) use ($startDate, $endDate) {
                //             $query->where(function ($q) use ($startDate, $endDate) {
                //                 $q->where('MITMBPRC_STARTDT', '<=', $startDate)
                //                     ->where(function ($q2) use ($startDate) {
                //                         $q2->whereNull('MITMBPRC_ENDDT')
                //                             ->orWhere('MITMBPRC_ENDDT', '>=', $startDate);
                //                     });
                //             })
                //                 ->orWhere(function ($q) use ($startDate, $endDate) {
                //                     if ($endDate) {
                //                         $q->where('MITMBPRC_STARTDT', '<=', $endDate)
                //                             ->where(function ($q2) use ($endDate) {
                //                                 $q2->whereNull('MITMBPRC_ENDDT')
                //                                     ->orWhere('MITMBPRC_ENDDT', '>=', $endDate);
                //                             });
                //                     }
                //                 })
                //                 ->orWhere(function ($q) use ($startDate, $endDate) {
                //                     if ($endDate) {
                //                         $q->where('MITMBPRC_STARTDT', '>=', $startDate)
                //                             ->where('MITMBPRC_STARTDT', '<=', $endDate);
                //                     }
                //                 });
                //         })
                //         ->exists();

                //     if ($overlap) {
                //         $fail('The date range overlaps with an existing price record.');
                //     }
                // },
            ],
            'MITMBPRC_ACTIVE' => 'required|in:Y,N',
            'MITMBPRC_CG' => 'nullable|string',
            'MITMBPRC_BRANCH' => 'required|numeric',
            'created_by' => 'nullable|string|max:50',
            'is_preview' => 'nullable|boolean',
        ]);

        if (!$validatedData) {
            \Log::error('Validation failed for store method', [
                'request_data' => $request->all(),
                'user' => Auth::user()->email ?? $validatedData['created_by'],
            ]);
        }

        $validatedData['status'] = true;
        $validatedData['MITMBPRC_ACTIVE'] = $validatedData['MITMBPRC_ACTIVE'] === 'Y' ? 1 : 0;
        $validatedData['created_by'] = Auth::user()->email ?? $validatedData['created_by'];
        $validatedData['MITMBPRC_CG'] = $this->decryptIfEncrypted($validatedData['MITMBPRC_CG']);

        // Check if item code exists and deactivate existing records
        M_ITMBPRICE::where('MITMBPRC_ITMCD', $validatedData['MITMBPRC_ITMCD'])
            ->where('MITMBPRC_CG', $validatedData['MITMBPRC_CG'])
            ->where('MITMBPRC_BRANCH', $validatedData['MITMBPRC_BRANCH'])
            ->update(['MITMBPRC_ACTIVE' => 0]);

        // Create new price record
        $bprice = M_ITMBPRICE::create([
            'MITMBPRC_ITMCD' => $validatedData['MITMBPRC_ITMCD'],
            'MITMBPRC_PRC' => $validatedData['MITMBPRC_PRC'],
            'MITMBPRC_STARTDT' => $validatedData['MITMBPRC_STARTDT'],
            'MITMBPRC_ENDDT' => !empty($validatedData['MITMBPRC_ENDDT']) ? $validatedData['MITMBPRC_ENDDT'] : null,
            'MITMBPRC_ACTIVE' => $validatedData['MITMBPRC_ACTIVE'],
            'MITMBPRC_CG' => $validatedData['MITMBPRC_CG'],
            'MITMBPRC_BRANCH' => $validatedData['MITMBPRC_BRANCH'],
            'created_by' => $validatedData['created_by'],
        ]);

        if (!empty($request->is_preview) && $request->is_preview) {
            return response()->json(['message' => 'Preview successful', 'data' => $validatedData], 200);
        }
        // return $validatedData;

        if ($validatedData['MITMSPRC_PRC'] > 0) {
            $priceSellController = new PriceSellController();
            $sellPriceResponse = $priceSellController->store(new Request([
                'MITMSPRC_ITMCD' => $validatedData['MITMBPRC_ITMCD'],
                'MITMSPRC_TYPE' => $validatedData['MITMSPRC_TYPE'],
                'MITMSPRC_PRC' => $validatedData['MITMSPRC_PRC'],
                'MITMSPRC_STARTDT' => $validatedData['MITMBPRC_STARTDT'],
                'MITMSPRC_ENDDT' => $validatedData['MITMBPRC_ENDDT'],
                'MITMSPRC_ACTIVE' => $validatedData['MITMBPRC_ACTIVE'],
                'MITMSPRC_CG' => $validatedData['MITMBPRC_CG'],
                'MITMSPRC_BRANCH' => $validatedData['MITMBPRC_BRANCH'],
                'created_by' => $validatedData['created_by'],
                'MITMBPRC_ID' => $bprice->id,
            ]));

            if ($sellPriceResponse->status() == 422) {
                return $sellPriceResponse;
            }
        }

        return response()->json(['message' => 'Purchase price created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $data = $this->search(new Request([
            'cg' => $request->cg,
            'filter' => ['id' => $id],
        ]));

        if (count($data->original['data']) == 0) {
            return response()->json(['message' => 'Price not found'], 404);
        }

        return response()->json(['data' => $data->original['data'][0]], 200);
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
        $buyPrice = M_ITMBPRICE::findOrFail($id);

        // Delete related sell price first
        M_ITMSPRICE::where('MITMSPRC_ITMCD', $buyPrice->MITMBPRC_ITMCD)
            ->where('MITMSPRC_CG', $buyPrice->MITMBPRC_CG)
            ->where('MITMSPRC_BRANCH', $buyPrice->MITMBPRC_BRANCH)
            ->where('MITMSPRC_STARTDT', $buyPrice->MITMBPRC_STARTDT)
            ->delete();

        // Delete buy price
        $buyPrice->delete();

        return response()->json(['message' => 'Price deleted successfully'], 200);
    }

    public function search(Request $request)
    {
        $conn = $this->getDB(Crypt::decryptString($request->cg))->db;

        $query = M_ITMBPRICE::select(
            'M_ITMSPRICE.id as id',
            'MITMBPRC_ITMCD',
            'MITMBPRC_PRC',
            'MITMBPRC_STARTDT',
            'MITMBPRC_ENDDT',
            'MITMBPRC_ACTIVE',
            'MITMBPRC_CG',
            'MITMBPRC_BRANCH',
            'M_ITMSPRICE.MITMSPRC_PRC',
            'M_ITMSPRICE.MITMSPRC_TYPE',
            'M_ITM.MITM_ITMNM',
            'typeCode.MGECD_DESC as MITMSPRC_TYPEDESC'
        )
            ->leftJoin($conn . '.M_ITM', function ($join) use ($conn) {
                $join->on('M_ITMBPRICE.MITMBPRC_ITMCD', '=', 'MITM_ITMCD');
            })
            ->leftJoin('M_ITMSPRICE', function ($join) {
                $join->on('M_ITMBPRICE.id', '=', 'M_ITMSPRICE.MITMBPRC_ID');
            })
            ->leftJoin(DB::raw('M_GENCODE as typeCode'), function ($join) {
                $join->on('M_ITMSPRICE.MITMSPRC_TYPE', '=', 'MGECD_VALUE')
                    ->where('MGECD_CODE', '=', 'MPRC_TYPE');
            })
            ->where('M_ITMBPRICE.MITMBPRC_CG', '=', Crypt::decryptString($request->cg))
            ->where('MITMBPRC_ACTIVE', '=', 1)
            ->groupBy(
                'M_ITMSPRICE.id',
                'MITMBPRC_ITMCD',
                'MITMBPRC_PRC',
                'MITMBPRC_STARTDT',
                'MITMBPRC_ENDDT',
                'MITMBPRC_ACTIVE',
                'MITMBPRC_CG',
                'M_ITMSPRICE.MITMSPRC_PRC',
                'M_ITMSPRICE.MITMSPRC_TYPE',
                'MITMBPRC_BRANCH',
                'M_ITM.MITM_ITMNM',
                'typeCode.MGECD_DESC'
            );

        if ($request->has('filter') && !empty($request->filter)) {
            foreach ($request->filter as $key => $valueFilter) {
                $query->where("$key", 'like', "%$valueFilter%");
            }
        }

        $results = $query->get()->map(function ($item) use ($request) {
            $getMargin = \App\Models\M_GENCODE::where('MGECD_CODE', 'MPRC_TYPE')
                        ->where('MGECD_CG', Crypt::decryptString($request->cg))
                        ->where('MGECD_BRANCH', $item->MITMBPRC_BRANCH)
                        ->where('MGECD_CODE', 'PRICE_SET_GLOBAL')
                        ->first();

            $salesPrice = $item->MITMSPRC_PRC > 0 ? $item->MITMSPRC_PRC : (
                !empty($getMargin) ? ($item->MITMBPRC_PRC + $item->MITMBPRC_PRC * (1 + ($getMargin->MGECD_DESC / 100)) ): $item->MITMBPRC_PRC
            );
            return [
                'id' => $item->id,
                'MITMBPRC_ITMCD' => $item->MITMBPRC_ITMCD,
                'MITMBPRC_PRC' => $item->MITMBPRC_PRC,
                'MITMBPRC_STARTDT' => $item->MITMBPRC_STARTDT,
                'MITMBPRC_ENDDT' => $item->MITMBPRC_ENDDT,
                'MITMBPRC_ACTIVE' => $item->MITMBPRC_ACTIVE,
                'MITMBPRC_CG' => $item->MITMBPRC_CG,
                'MITMBPRC_BRANCH' => $item->MITMBPRC_BRANCH,
                'MITMSPRC_PRC' => $salesPrice,
                'MITMSPRC_TYPE' => $item->MITMSPRC_TYPE,
                'MITM_ITMNM' => $item->MITM_ITMNM,
                'MITMSPRC_TYPEDESC' => $item->MITMSPRC_TYPEDESC,
            ];
        });
        return response()->json(['data' => $results]);
    }

    public function bulkUpload(Request $request)
    {
        $validatedData = $request->validate([
            'cg' => 'required|string',
            'branch' => 'required|numeric',
            'is_preview' => 'nullable|string',
            'file' => 'required|file|mimes:xlsx,xls',
        ]);

        if (!$request->hasFile('file')) {
            return response()->json(['message' => 'No file uploaded'], 400);
        }

        $uploadedFile = $request->file('file');

        // Ensure is_preview is a boolean
        $isPreview = $validatedData['is_preview'] == 'true' ? true : false;

        $import = new itemPriceMasterUpload(
            $validatedData['cg'],
            $validatedData['branch'],
            Auth::user()->email,
            $isPreview
        );

        // Pass the actual uploaded file instance to the importer
        Excel::import($import, $uploadedFile);

        $results = $import->results;

        if (isset($results['status']) && $results['status'] === 'failed') {
            return response()->json($results, 422);
        }

        return response()->json($results, 200);
    }

    public function decryptIfEncrypted($value)
    {
        if ($value === null)
            return null;

        // biar kalau numeric (id biasa) langsung lewat
        if (is_int($value) || is_float($value))
            return $value;

        $value = is_string($value) ? trim($value) : $value;

        if (!is_string($value) || $value === '')
            return $value;

        try {
            return Crypt::decryptString($value);
        } catch (DecryptException $e) {
            // bukan payload encrypt Laravel / payload rusak -> fallback plain
            return $value;
        }
    }
}
