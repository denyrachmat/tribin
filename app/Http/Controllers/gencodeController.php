<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Crypt;
use App\Models\M_GENCODE;

use App\Traits\gencodeTraits;
use function PHPUnit\Framework\isArray;

class gencodeController extends Controller
{
    use gencodeTraits;

    public function getGencodeList(Request $request, $branch = '')
    {
        $data = $this->getGencode(
            base64_encode($request->has('code') ? $request->code : 'GEN_LIST_SETUP'),
            $request->has('value') ? base64_encode($request->value): '',
            $request->cg,
            $branch,
            $request->has('exactSearch') ? $request->exactSearch : false,
            $request->has('includeChild') ? $request->includeChild : false
        );

        // return $data;

        // $data = is_array($data) ? $data: [$data];

        $hasil = [];
        if (!empty($data) && count($data) > 0) {
            $parental = function($data, $cg) use (&$parental) {
                $parent = [
                    'idx'  => $data['id'],
                    'code' => $data['MGECD_VALUE'],
                    'desc' => $data['MGECD_DESC'],
                    'desc2' => $data['MGECD_DESC2'],
                    'desc3' => $data['MGECD_DESC3'],
                    'data' => $this->getGencode(base64_encode($data['MGECD_VALUE']), '', $cg),
                ];

                if (isset($data['children']) && is_array($data['children'])) {
                    $parent['children'] = array_map(function ($child) use ($cg, $parental) {
                        return $parental($child, $cg);
                    }, $data['children']);
                }

                return $parent;
            };

            foreach ($data as $item) {
                $parent = [
                    'idx'  => $item['id'],
                    'code' => $item['MGECD_VALUE'],
                    'desc' => $item['MGECD_DESC'],
                    'desc2' => $item['MGECD_DESC2'],
                    'desc3' => $item['MGECD_DESC3'],
                    'data' => $this->getGencode(base64_encode($item['MGECD_VALUE']), '', $request->cg),
                ];

                if ($request->has('includeChild')) {
                    $parent['children'] = $parental($item, $request->cg)['children'] ?? [];
                }

                $hasil[] = $parent;
            }
        }

        return response()->json([
            'success' => count($hasil) > 0,
            'data' => $hasil
        ]);
    }

    public function storeGencodeData(Request $request): JsonResponse
    {
        $rules = [
            'gencodeData' => 'required|array|min:1',
            'cg' => 'nullable|string',
            'branch' => 'nullable|string',
            'gencodeData.*.id' => 'nullable|string',
            'gencodeData.*.code' => 'required|string',
            'gencodeData.*.desc' => 'nullable|string',
            'gencodeData.*.data' => 'nullable|array|min:1',
            'gencodeData.*.data.*.MGECD_VALUE' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_DESC' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_DESC2' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_DESC3' => 'nullable|string',
            'gencodeData.*.data.*.MGECD_FLAG' => 'nullable|boolean',
            'gencodeData.*.data.*.MGECD_ACTIVE' => 'nullable|boolean',
        ];

        $validated = $request->validate($rules);

        $hasil = [];
        foreach ($validated['gencodeData'] as $gencodeItem) {
            // Simpan kode utama ke GEN_LIST_SETUP
            M_GENCODE::updateOrCreate(
                [
                    'MGECD_CODE' => $gencodeItem['id'] ?? 'GEN_LIST_SETUP',
                    'MGECD_VALUE' => $gencodeItem['code'],
                    'MGECD_CG' => isset($validated['cg']) ? Crypt::decryptString($validated['cg']) : null,
                ],
                [
                    'MGECD_CODE' => $gencodeItem['id'] ?? 'GEN_LIST_SETUP',
                    'MGECD_VALUE' => $gencodeItem['code'],
                    'MGECD_CG' => isset($validated['cg']) ? Crypt::decryptString($validated['cg']) : null,
                    'MGECD_DESC' => $gencodeItem['desc'] ?? null,
                    'MGECD_DESC2' => $gencodeItem['desc2'] ?? null,
                    'MGECD_DESC3' => $gencodeItem['desc3'] ?? null,
                    'MGECD_ACTIVE' => 1,
                    'MGECD_BRANCH' => $validated['branch'] ?? null,
                ]
            );

            if ($request->has('withOutDetail') && $request->withOutDetail === true) {
                continue;
            }

            if ($request->has('unique') && is_array($request->unique)) {
                foreach ($request->unique as $uniqueField) {
                    if (isset($gencodeItem['data']) && is_array($gencodeItem['data'])) {
                        // Validate if unique field values already exist in database
                        $existingValues = M_GENCODE::where('MGECD_CODE', 'like', $gencodeItem['code'] . '%')
                            ->where('MGECD_CG', isset($request->cg) ? Crypt::decryptString($request->cg) : null)
                            ->pluck($uniqueField)
                            ->filter()
                            ->toArray();

                        $newValues = array_filter(array_map(function ($item) use ($uniqueField) {
                            return $item[$uniqueField] ?? null;
                        }, $gencodeItem['data']));

                        $duplicates = array_intersect($existingValues, $newValues);

                        if (!empty($duplicates)) {
                            return response()->json([
                                'success' => false,
                                'message' => "Duplicate values found for {$uniqueField}: " . implode(', ', $duplicates),
                            ], 422);
                        }
                    }
                }
            }

            // Simpan data detail untuk setiap kode

            $cekData = M_GENCODE::where('MGECD_CODE', 'like', $gencodeItem['code'] . '%')->count();

            if ($cekData > 0) {
                M_GENCODE::where('MGECD_CODE', 'like', $gencodeItem['code'] . '%')
                    ->where('MGECD_CG', isset($request->cg) ? Crypt::decryptString($request->cg) : null)
                    ->where('MGECD_BRANCH', $request->branch ?? null)
                    ->delete();
            }

            foreach ($gencodeItem['data'] as $index => $value) {
                $hasil[$gencodeItem['code']][] = M_GENCODE::create([
                    'MGECD_CODE' => $gencodeItem['code'] . '_' . ($index + 1),
                    'MGECD_CG' => isset($request->cg) ? Crypt::decryptString($request->cg) : null,
                    'MGECD_VALUE' => $value['MGECD_VALUE'] ?? null,
                    'MGECD_DESC' => $value['MGECD_DESC'] ?? null,
                    'MGECD_DESC2' => $value['MGECD_DESC2'] ?? null,
                    'MGECD_DESC3' => $value['MGECD_DESC3'] ?? null,
                    'MGECD_ACTIVE' => $value['MGECD_ACTIVE'] ?? 1,
                    'MGECD_FLAG' => $value['MGECD_FLAG'] ?? 0,
                    'MGECD_BRANCH' => $request->branch ?? null,
                ]);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Gencode data saved successfully',
            'data' => $hasil,
        ]);
    }

    public function deleteGencodeData(Request $request)
    {
        $rules = [
            'code' => 'required|string',
            'cols' => 'nullable|array',
            'cg' => 'nullable|string',
        ];

        $validated = $request->validate($rules);

        $q = M_GENCODE::where('MGECD_CODE', $validated['code']);

        if (!empty($validated['cg'])) {
            $q->where('MGECD_CG', isset($validated['cg']) ? Crypt::decryptString($validated['cg']) : null);
        }

        foreach ($validated['cols'] as $col) {
            if ($col['props'] === 'and') {
                $q->where($col['col'], $col['value']);
            } else {
                $q->orWhere($col['col'], $col['value']);
            }
        }

        $q->delete();

        return response()->json([
            'success' => true,
            'message' => 'Gencode data deleted successfully',
        ]);
    }
}
