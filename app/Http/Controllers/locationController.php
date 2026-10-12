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

        # Guard against silently overwriting an existing location: the code is the
        # natural key, so a plain "create" whose code already exists must be refused
        # instead of renaming/replacing that row. The edit dialog (opened from a row)
        # sends is_update=1, which is the deliberate-edit signal that allows the write.
        $existing = M_LOC::on($this->dedicatedConnection)
            ->where('MLOC_LOCCD', $request->header['MLOC_LOCCD'])
            ->first();

        if ($existing && !$request->boolean('is_update')) {
            return response()->json([[
                "Location code '{$existing->MLOC_LOCCD}' already exists ({$existing->MLOC_LOCNM}). " .
                "Use a different code, or open that location and edit it."
            ]], 406);
        }

        # On a real update keep the original code/name owner: only the editable
        # fields are written, so created_by is not overwritten by the editor.
        $values = [
            'MLOC_LOCNM' => $request->header['MLOC_LOCNM'],
            'MLOC_LOCPRNTCD' => $request->header['MLOC_LOCPRNTCD'],
        ];

        if (empty($existing)) {
            $values['created_by'] = Auth::check() ? Auth::user()->nick_name : null;
        }

        $hasil = M_LOC::on($this->dedicatedConnection)->updateOrCreate([
            'MLOC_LOCCD' => $request->header['MLOC_LOCCD'],
        ], $values);

        return ['msg' => empty($existing) ? 'OK' : 'Updated', 'data' => $hasil];
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
        # The dialog nests the fields under `header` (same shape as store()), but
        # accept flat top-level fields too so direct API callers keep working.
        $payload = $request->input('header') ?: $request->all();

        $validator = Validator::make($payload, [
            'MLOC_LOCNM' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        # The row is identified by $id when it carries one, otherwise by the code
        # in the payload. Don't assume $id is base64 — a plain code is also valid.
        $code = $payload['MLOC_LOCCD'] ?? null;
        if (empty($code)) {
            $decoded = base64_decode($id, true);
            $code = ($decoded && ctype_print($decoded)) ? $decoded : $id;
        }

        $hasil = M_LOC::on($this->dedicatedConnection)->updateOrCreate(
            ['MLOC_LOCCD' => $code],
            [
                'MLOC_LOCNM' => $payload['MLOC_LOCNM'],
                'MLOC_LOCPRNTCD' => $payload['MLOC_LOCPRNTCD'] ?? null,
            ]
        );

        return ['msg' => 'Updated', 'data' => $hasil];
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

    public function searchAPIByCG(Request $request, $cg) {
        // The Transfer-Location screen puts the selected company alias straight
        // into the URL, so this receives a PLAIN connection name
        // ("connect_jos_jatpt"). Every other cross-CG path in the app passes the
        // plain name too. Only a value that is actually an encrypted payload is
        // decrypted, so both shapes work.
        $connection = $this->resolveCompanyConnection($cg);

        if (empty($connection)) {
            return response()->json([
                'status' => false,
                'error' => 'Unknown company connection: ' . $cg,
            ], 406);
        }

        $RS = M_LOC::on($connection);

        if (!empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        return ['data' => $RS->get()];
    }

    /**
     * Accept either a plain company alias or an encrypted payload and return a
     * usable connection name (null when neither resolves to a real connection).
     */
    private function resolveCompanyConnection($cg)
    {
        if (empty($cg)) {
            return null;
        }

        $candidates = [$cg];
        try {
            $candidates[] = Crypt::decryptString($cg);
        } catch (\Throwable $e) {
            // not an encrypted payload - the plain value is the intended one
        }

        foreach ($candidates as $candidate) {
            if ($candidate !== '' && array_key_exists($candidate, config('database.connections'))) {
                return $candidate;
            }
        }

        return null;
    }
}
