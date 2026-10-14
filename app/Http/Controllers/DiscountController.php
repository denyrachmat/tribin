<?php

namespace App\Http\Controllers;

use App\Traits\DiscountScopingTraits;
use App\Traits\gencodeTraits;
use App\Traits\taxesTraits;
use App\Traits\accTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

/**
 * Discount attachment: customer-level and item-category-level, per company database.
 *
 * Kept separate from QuotationController because these are master-data operations on
 * M_CUS / M_ITM / M_DISC, not quotation edits.
 */
class DiscountController extends Controller
{
    use gencodeTraits, taxesTraits, accTraits, DiscountScopingTraits;

    protected $dedicatedConnection;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');

        if (isset($_COOKIE['CGID']) && $_COOKIE['CGID'] !== '-') {
            $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
        }
    }

    /** Customer discount screen. */
    public function customerForm()
    {
        return view('tribinapp_layouts', ['routeApp' => 'customerDiscount']);
    }

    /** Item category discount screen. */
    public function itemCategoryForm()
    {
        return view('tribinapp_layouts', ['routeApp' => 'itemCategoryDiscount']);
    }

    /**
     * The discount catalogue, for the pickers on both screens.
     */
    public function catalogue(Request $request)
    {
        $out = [];
        foreach ($this->discMasters() as $m) {
            $out[] = [
                'MDISC_CODE' => $m['code'],
                'MDISC_DESC' => $m['desc'],
                'type' => $m['type'],
                'value' => $m['value'],
            ];
        }

        return ['data' => $out];
    }

    /** What a specific quotation line would get - used by the quotation screen. */
    public function previewLine(Request $request)
    {
        $conn = $this->discConnection($request);
        $gross = (float) $request->input('gross', 0);
        $cuscd = (string) $request->input('MCUS_CUSCD', '');
        $itmcd = $request->input('MITM_ITMCD');
        $branch = $request->input('branch');

        $discounts = $this->discResolveForLine($conn, $cuscd, $itmcd, $branch);

        $cus = \Illuminate\Support\Facades\DB::connection($conn)->table('M_CUS')->where('MCUS_CUSCD', $cuscd)->first();
        [$mode, $dp] = \App\Support\DiscountCalculator::resolveRounding(
            $cus->MCUS_ROUNDMODE ?? null,
            $cus->MCUS_ROUNDDP ?? null
        );

        $result = \App\Support\DiscountCalculator::forLine($gross, $discounts, $mode, $dp);

        return [
            'gross' => $gross,
            'discount' => $result['total'],
            'net' => $result['net'],
            'parts' => $result['parts'],
            'rounding' => ['mode' => $mode, 'dp' => $dp],
        ];
    }

    // ---- thin passthroughs so the routes read like the rest of the app --------

    public function customerList(Request $request)
    {
        return $this->discCustomerList($request);
    }

    public function customerSave(Request $request)
    {
        return $this->discCustomerSave($request);
    }

    public function itemCategoryList(Request $request)
    {
        return $this->discItemCatList($request);
    }

    public function itemCategorySave(Request $request)
    {
        return $this->discItemCatSave($request);
    }
}
