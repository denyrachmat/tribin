<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Crypt;
use App\Models\M_GENCODE;

use App\Traits\gencodeTraits;

class gencodeController extends Controller
{
    use gencodeTraits;

    public function getGencodeList(Request $request, $branch = ''): JsonResponse
    {
        $data = $this->getGencode(base64_encode('GEN_LIST_SETUP'), '', $request->cg);

        $hasil = [];
        if (count($data) > 0) {
            foreach ($data as $item) {
                if (!empty($branch)) {
                    if ($item['MGECD_DESC2'] === $branch) {
                        $hasil[] = [
                            'code' => $item['MGECD_VALUE'],
                            'desc' => $item['MGECD_DESC'],
                            'data' => $this->getGencode(base64_encode($item['MGECD_VALUE']), '', $request->cg)
                        ];
                    }
                } else {
                    $hasil[] = [
                        'code' => $item['MGECD_VALUE'],
                        'desc' => $item['MGECD_DESC'],
                        'data' => $this->getGencode(base64_encode($item['MGECD_VALUE']), '', $request->cg)
                    ];
                }
            }
        }

        return response()->json([
            'success' => true,
            'data' => $hasil
        ]);
    }

    public function storeGencodeData(Request $request): JsonResponse
    {
        $rules = [
            'gencodeData' => 'required|array|min:1',
            'gencodeData.*.code' => 'required|string',
            'gencodeData.*.desc' => 'nullable|string',
            'gencodeData.*.data' => 'required|array|min:1',
            'gencodeData.*.data.*.MGECD_VALUE' => 'required|string',
            'gencodeData.*.data.*.MGECD_DESC' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_DESC2' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_DESC3' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_FLAG' => 'nullable|boolean',
            'gencodeData.*.data.*.MGECD_ACTIVE' => 'nullable|boolean',
        ];

        $validated = $request->validate($rules);

        foreach ($validated['gencodeData'] as $gencodeItem) {
            // Simpan kode utama ke GEN_LIST_SETUP
            M_GENCODE::updateOrCreate(
                [
                    'MGECD_CODE' => 'GEN_LIST_SETUP',
                    'MGECD_VALUE' => $gencodeItem['code'],
                    'MGECD_CG' => isset($request->cg) ? Crypt::decryptString($request->cg) : null,
                ],
                [
                    'MGECD_DESC' => $gencodeItem['desc'] ?? null,
                    'MGECD_DESC2' => $value['MGECD_DESC2'] ?? 1,
                    'MGECD_ACTIVE' => 1,
                ]
            );

            // Simpan data detail untuk setiap kode
            M_GENCODE::where('MGECD_CODE', 'like', $gencodeItem['code'] . '%')
                ->where('MGECD_CG', isset($request->cg) ? Crypt::decryptString($request->cg) : null)
                ->delete();

            foreach ($gencodeItem['data'] as $index => $value) {
                M_GENCODE::updateOrCreate(
                    [
                        'MGECD_CODE' => $gencodeItem['code'] . '_' . ($index + 1),
                        // 'MGECD_VALUE' => $value['MGECD_VALUE'],
                        'MGECD_CG' => isset($request->cg) ? Crypt::decryptString($request->cg) : null,
                    ],
                    [
                        'MGECD_VALUE' => $value['MGECD_VALUE'],
                        'MGECD_DESC' => $value['MGECD_DESC'] ?? null,
                        'MGECD_DESC2' => $value['MGECD_DESC2'] ?? null,
                        'MGECD_DESC3' => $value['MGECD_DESC3'] ?? null,
                        'MGECD_ACTIVE' => $value['MGECD_ACTIVE'] ?? 1,
                        'MGECD_FLAG' => $value['MGECD_FLAG'] ?? 0,
                    ]
                );
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Gencode data saved successfully',
        ]);
    }
}
