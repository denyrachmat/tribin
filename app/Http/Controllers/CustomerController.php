<?php

namespace App\Http\Controllers;

use App\Models\CompanyGroup;
use App\Models\M_CUS;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Validation\Rule;

class CustomerController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        if (isset($_COOKIE['CGID'])) {
            $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
        }
    }

    public function index()
    {
        // return view('tribinapp_layouts', ['routeApp' => 'customer']);
        return view('master.customer', [
            'companies' => CompanyGroup::select('*')->where('connection', '!=', $this->dedicatedConnection)->get(),
            'CurrentCompanies' => CompanyGroup::select('*')->where('connection', $this->dedicatedConnection)->get()
        ]);
    }

    public function importFromAnotherCompany(Request $request)
    {
        $currentDBName = DB::connection($this->dedicatedConnection)->getDatabaseName();
        $RS = DB::connection($request->fromConnection)->table('M_CUS AS A')
            ->select('A.*')
            // ->leftJoin(DB::raw($currentDBName . '.M_CUS AS B COLLATE utf8mb4_unicode_ci'), 'A.MCUS_CUSCD', '=', DB::raw('B.MCUS_CUSCD COLLATE utf8mb4_unicode_ci'))
            ->leftJoin($currentDBName . '.M_CUS as B', function ($join) {
                $join->on('A.MCUS_CUSCD', '=', DB::raw('B.MCUS_CUSCD COLLATE utf8mb4_unicode_ci'));
            })
            ->where('A.MCUS_BRANCH', Auth::user()->branch)
            // ->where('A.MCUS_CUSCD', 'COLLATE', 'utf8mb4_unicode_ci') // Apply COLLATE to A.MCUS_CUSCD in the WHERE clause
            ->whereNull('B.MCUS_CUSCD');

        $RSTosave = json_decode(json_encode($RS->get()), true);

        // return (clone $RS)->get();
        if (!empty($RSTosave)) {
            M_CUS::on($this->dedicatedConnection)->insert($RSTosave);
            return ['message' => 'Done, ' . count($RSTosave) . ' imported'];
        } else {
            return ['message' => 'no new data'];
        }
    }

    public function simpan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'MCUS_CUSCD' => 'required',
            'MCUS_CUSCD' => [
                Rule::unique($this->dedicatedConnection . '.M_CUS', 'MCUS_CUSCD')->where('MCUS_BRANCH', Auth::user()->branch)
            ],
            'MCUS_CUSNM' => 'required',
            'MCUS_CURCD' => 'required',
            'MCUS_TAXREG' => 'required',
            'MCUS_ADDR1' => 'required',
            'MCUS_TELNO' => 'required',
            'MCUS_TELNO' => [
                Rule::unique($this->dedicatedConnection . '.M_CUS', 'MCUS_TELNO')->where('MCUS_BRANCH', Auth::user()->branch)
            ],
            // 'MCUS_PIC_NAME' => 'required',
            // 'MCUS_PIC_TELNO' => 'required',
            'MCUS_TYPE' => 'required',
            // 'MCUS_KTP_FILE' => 'mimes:png,jpg,jpeg,pdf|max:2048',
            // 'MCUS_NPWP_FILE' => 'mimes:png,jpg,jpeg,pdf|max:2048',
        ], [
            'MCUS_CUSNM.required' => 'Customer Name cannot be empty !',
            'MCUS_CURCD.required' => 'Customer Curr cannot be empty !',
            'MCUS_TAXREG.required' => 'Customer NPWP cannot be empty !',
            'MCUS_ADDR1.required' => 'Customer Address cannot be empty !',
            'MCUS_TELNO.required' => 'Customer Phone cannot be empty !',
            // 'MCUS_PIC_NAME.required' => 'Customer PIC Name cannot be empty !',
            // 'MCUS_PIC_TELNO.required' => 'Customer PIC Phone cannot be empty !',
            'MCUS_TYPE.required' => 'Customer Type cannot be empty !',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        if ($request->MCUS_TYPE === '2') {
            $validator = Validator::make($request->all(), [
                'MCUS_NIB_FILE' => 'required|mimes:png,jpg,jpeg,pdf|max:2048',
            ]);
        }
        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $KTPfileName = null;
        $NPWPfileName = null;
        $NIBfileName = null;
        if ($request->file('MCUS_KTP_FILE')) {
            $file = $request->file('MCUS_KTP_FILE');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $KTPfileName = $fileName;
            $location = 'attachments/customer';
            $file->move(public_path($location), $fileName);
        }
        if ($request->file('MCUS_NPWP_FILE')) {
            $file = $request->file('MCUS_NPWP_FILE');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $NPWPfileName = $fileName;
            $location = 'attachments/customer';
            $file->move(public_path($location), $fileName);
        }
        if ($request->file('MCUS_NIB_FILE')) {
            $file = $request->file('MCUS_NIB_FILE');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $NIBfileName = $fileName;
            $location = 'attachments/customer';
            $file->move(public_path($location), $fileName);
        }

        $LastGENID = M_CUS::on($this->dedicatedConnection)->max('MCUS_GENID');
        $NEW_MCUS_CUSCD = NULL;
        $NewGENID = $LastGENID + 1;
        $NEW_MCUS_CUSCD = 'CUST-' . substr('0000' . $NewGENID, -4);

        M_CUS::on($this->dedicatedConnection)->updateOrCreate([
            'MCUS_CUSCD' => $NEW_MCUS_CUSCD,
        ], [
            'MCUS_CUSCD' => $NEW_MCUS_CUSCD,
            'MCUS_CUSNM' => $request->MCUS_CUSNM,
            'MCUS_CURCD' => $request->MCUS_CURCD,
            'MCUS_TAXREG' => $request->MCUS_TAXREG,
            'MCUS_ADDR1' => $request->MCUS_ADDR1,
            'MCUS_TELNO' => $request->MCUS_TELNO,
            'MCUS_CGCON' => $request->MCUS_CGCON,
            'created_by' => Auth::user()->nick_name,
            'MCUS_BRANCH' => Auth::user()->branch,
            'MCUS_TYPE' => $request->MCUS_TYPE,
            'MCUS_GROUP' => $request->MCUS_GROUP,
            'MCUS_REFF_MKT' => $request->MCUS_REFF_MKT,
            'MCUS_PIC_NAME' => $request->MCUS_PIC_NAME,
            'MCUS_PIC_TELNO' => $request->MCUS_PIC_TELNO,
            'MCUS_EMAIL' => $request->MCUS_EMAIL,
            'MCUS_KTP_FILE' => $KTPfileName,
            'MCUS_NPWP_FILE' => $NPWPfileName,
            'MCUS_NIB_FILE' => $NIBfileName,
            'MCUS_IDCARD' => $request->MCUS_IDCARD,
            'MCUS_GENID' => $NewGENID,
        ]);

        return [
            'msg' => 'OK',
            'MCUS_CUSCD' => $NEW_MCUS_CUSCD,
            'MCUS_KTP_FILE' => $KTPfileName,
            'MCUS_NPWP_FILE' => $NPWPfileName,
            'MCUS_NIB_FILE' => $NIBfileName,
        ];
    }

    function search(Request $request)
    {
        $columnMap = [
            'MCUS_CUSCD',
            'MCUS_CUSNM',
            'MCUS_ADDR1',
        ];

        $RS = M_CUS::on($this->dedicatedConnection)->select('*')
            ->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')
            ->where('MCUS_BRANCH', Auth::user()->branch)
            ->get();
        return ['data' => $RS];
    }

    function searchAPI(Request $request)
    {
        $RSTemp = M_CUS::on($this->dedicatedConnection)->select('*')
            ->where('MCUS_BRANCH', Auth::user()->branch);

        if ($request->has('type')) {
            $RSTemp->whereIn('MCUS_TYPE', $request->type);
        }

        if (!empty($request->searchValue)) {
            $RS = (clone $RSTemp)->where((
                !empty($request->searchCol)
                ? $request->searchCol
                : 'MCUS_CUSNM'), 'like', '%' . $request->searchValue . '%')
                ->get()->toArray();
        } else {
            $RS = (clone $RSTemp)->whereNull('MCUS_CGCON')->get()->toArray();
        }

        return ['data' => $RS];
    }

    function searchAPIMaster(Request $request)
    {
        $RSTemp = M_CUS::on($this->dedicatedConnection)->select('*')
            ->where('MCUS_BRANCH', Auth::user()->branch);

        if (isset($request->searchValue) && $request->searchValue !== "") {
            $RSTemp->where($request->searchBy, 'LIKE', "%{$request->searchValue}%");
        }

        $hasil = [];
        foreach ($RSTemp->get()->toArray() as $key => $value) {
            $hasil[] = array_merge(
                $value,
                [
                    'users' => Auth::user(),
                    'conn' => $this->dedicatedConnection
                ]
            );
        }

        return ['data' => $hasil];
    }

    function update(Request $request)
    {
        $affectedRow = M_CUS::on($this->dedicatedConnection)
            ->where('MCUS_CUSCD', base64_decode($request->id))
            ->where('MCUS_BRANCH', Auth::user()->branch)
            ->update([
                'MCUS_CUSNM' => $request->MCUS_CUSNM,
                'MCUS_CURCD' => $request->MCUS_CURCD,
                'MCUS_TAXREG' => $request->MCUS_TAXREG,
                'MCUS_ADDR1' => $request->MCUS_ADDR1,
                'MCUS_TELNO' => $request->MCUS_TELNO,
                'MCUS_CGCON' => $request->MCUS_CGCON,
                'MCUS_TYPE' => $request->MCUS_TYPE,
                'MCUS_GROUP' => $request->MCUS_GROUP,
                'MCUS_REFF_MKT' => $request->MCUS_REFF_MKT,
                'MCUS_PIC_NAME' => $request->MCUS_PIC_NAME,
                'MCUS_PIC_TELNO' => $request->MCUS_PIC_TELNO,
                'MCUS_EMAIL' => $request->MCUS_EMAIL,
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }

    function showFile(Request $request)
    {
        $doc = $request->id;
        if (File::exists(public_path('attachments/customer/' . $doc))) {
            return response()->file(public_path('attachments/customer/' . $doc));
        } else {
            return response()->json(['message' => 'not found'], 404);
        }
    }

    function newshowFile($id, $cols)
    {
        $checkData = M_CUS::on($this->dedicatedConnection)
            ->where('MCUS_CUSCD', $id)
            ->first()
            ->toArray();

        $doc = $checkData[(string) $cols];

        if (File::exists(public_path('storage/attachment/customer/' . $doc))) {
            $file = response()->file(public_path('storage/attachment/customer/' . $doc));
            // Convert the image data to base64
            $base64Image = base64_encode($file);

            // Determine the MIME type of the image
            $mimeType = mime_content_type(public_path('storage/attachment/customer/' . $doc));
            // return $file;
            return 'data:' . $mimeType . ';base64,' . $base64Image;
        } else {
            return response()->json(['message' => 'not found'], 404);
        }
    }

    function newUploadFile(Request $req)
    {
        ini_set('max_execution_time', '1200');
        // $nama_file = $req->file->hashName();
        $file = new File($req->file);
        $extNya = $req->file('file')->getClientOriginalExtension();

        // return $extNya;
        // $fileHash = str_replace('.' . $file->extension(), '', $file->hashName());
        // $nama_file = $fileHash . '.' . $extNya;

        // return $nama_file;
        $oriFileName = $req->file('file')->getClientOriginalName();

        $req->file->storeAs('/public/attachment/customer/', $oriFileName);

        $updated[(string) $req->col_name] = $oriFileName;

        $affectedRow = M_CUS::on($req->conn)
            ->where('MCUS_CUSCD', $req->id)
            ->where('MCUS_BRANCH', $req->branch)
            ->update($updated);

        return ['msg' => $affectedRow, 'FixedFileName' => $oriFileName, 'update' => $updated];
    }

    function changeFile(Request $request)
    {
        $affectedRow = 0;
        if ($request->file('MCUS_KTP_FILE')) {
            $file = $request->file('MCUS_KTP_FILE');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $location = 'attachments/customer';
            $file->move(public_path($location), $fileName);

            $affectedRow = M_CUS::on($this->dedicatedConnection)
                ->where('MCUS_CUSCD', base64_decode($request->id))
                ->where('MCUS_BRANCH', Auth::user()->branch)
                ->update([
                    'MCUS_KTP_FILE' => $fileName
                ]);
        }
        if ($request->file('MCUS_NPWP_FILE')) {
            $file = $request->file('MCUS_NPWP_FILE');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $location = 'attachments/customer';
            $file->move(public_path($location), $fileName);
            $affectedRow = M_CUS::on($this->dedicatedConnection)
                ->where('MCUS_CUSCD', base64_decode($request->id))
                ->where('MCUS_BRANCH', Auth::user()->branch)
                ->update([
                    'MCUS_NPWP_FILE' => $fileName
                ]);
        }
        if ($request->file('MCUS_NIB_FILE')) {
            $file = $request->file('MCUS_NIB_FILE');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $location = 'attachments/customer';
            $file->move(public_path($location), $fileName);

            $affectedRow = M_CUS::on($this->dedicatedConnection)
                ->where('MCUS_CUSCD', base64_decode($request->id))
                ->where('MCUS_BRANCH', Auth::user()->branch)
                ->update([
                    'MCUS_NIB_FILE' => $fileName
                ]);
        }
        return ['msg' => $affectedRow ? 'OK' : 'No changes', 'FixedFileName' => $fileName];
    }

    function getAllRegisteredCurr(Request $request) {
        $RSTemp = M_CUS::on($this->dedicatedConnection)->select('MCUS_CURCD')
            ->where('MCUS_BRANCH', Auth::user()->branch)
            ->groupBy('MCUS_CURCD');

        return $RSTemp->get()->pluck('MCUS_CURCD');
    }
}
