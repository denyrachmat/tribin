<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\M_DISC;

/**
 * Master Discount (M_DISC, main database).
 *
 * The menu entry and the route already existed, but there was no SPA page, so
 * "disc" fell through the router's catch-all to ErrorNotFound. This fills in the
 * missing API surface; the page lives in tribinapp/src/pages/master/disc/.
 *
 * Route key is MDISC_CODE, matching how the tax master keys its resource.
 */
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
        $payload = $this->normalise($request);

        $validator = Validator::make($payload, $this->rules($payload));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 422);
        }

        $data = M_DISC::updateOrCreate(
            ['MDISC_CODE' => $payload['MDISC_CODE']],
            [
                'MDISC_DESC' => $payload['MDISC_DESC'],
                'MDISC_PERCENT' => $payload['MDISC_PERCENT'],
                'MDISC_AMT' => $payload['MDISC_AMT'],
            ]
        );

        return ['msg' => 'Discount master saved', 'data' => $data];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return M_DISC::where('MDISC_CODE', $id)->get();
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
        $payload = $this->normalise($request);
        $payload['MDISC_CODE'] = $id;

        $validator = Validator::make($payload, $this->rules($payload));

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 422);
        }

        $affected = M_DISC::where('MDISC_CODE', $id)->update([
            'MDISC_DESC' => $payload['MDISC_DESC'],
            'MDISC_PERCENT' => $payload['MDISC_PERCENT'],
            'MDISC_AMT' => $payload['MDISC_AMT'],
        ]);

        return ['msg' => $affected ? 'Discount master updated' : 'No changes'];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = M_DISC::where('MDISC_CODE', $id)->delete();

        return ['msg' => $data ? 'Discount master deleted' : 'Not found'];
    }

    /**
     * Listing for the table.
     */
    public function searchAPI(Request $request)
    {
        $query = M_DISC::query();

        if (!empty($request->searchValue)) {
            $column = $request->searchBy ?: 'MDISC_DESC';

            // Only filter on columns that exist; the search box sends a column name
            // straight from the table definition.
            if (in_array($column, ['MDISC_CODE', 'MDISC_DESC'], true)) {
                $query->where($column, 'like', '%' . $request->searchValue . '%');
            }
        }

        return ['data' => $query->orderBy('MDISC_CODE')->get()];
    }

    /**
     * Trim, and turn blank strings into null so a double column is not handed "".
     */
    private function normalise(Request $request): array
    {
        $clean = function ($value) {
            if ($value === null) {
                return null;
            }

            $value = trim((string) $value);

            return $value === '' ? null : $value;
        };

        return [
            'MDISC_CODE' => $clean($request->input('MDISC_CODE')),
            'MDISC_DESC' => $clean($request->input('MDISC_DESC')),
            'MDISC_PERCENT' => $clean($request->input('MDISC_PERCENT')),
            'MDISC_AMT' => $clean($request->input('MDISC_AMT')),
        ];
    }

    /**
     * Rules for a discount master.
     *
     * A discount is EITHER a percentage OR a fixed amount. Exactly one must be
     * supplied: with neither set there is nothing to apply, and with both set nothing
     * downstream could decide which wins, so both cases are rejected instead of being
     * stored ambiguously.
     */
    private function rules(array $payload): array
    {
        return [
            'MDISC_CODE' => 'required|string|max:255',
            'MDISC_DESC' => 'nullable|string|max:255',
            'MDISC_PERCENT' => 'nullable|numeric|min:0|max:100|required_without:MDISC_AMT',
            'MDISC_AMT' => 'nullable|numeric|min:0|required_without:MDISC_PERCENT|prohibits:MDISC_PERCENT',
        ];
    }
}
