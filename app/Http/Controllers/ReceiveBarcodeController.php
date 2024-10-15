<?php

namespace App\Http\Controllers;

use App\Models\C_ITRN;
use App\Models\T_PCHORDDETA;
use App\Models\T_RCV_BC_DETAIL;
use App\Models\T_RCV_DETAIL;
use App\Models\T_RCV_HEAD;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Barryvdh\DomPDF\Facade\Pdf;
use charlieuki\ReceiptPrinter\ReceiptPrinter as ReceiptPrinter;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Mike42\Escpos\CapabilityProfile;
use Mike42\Escpos\Printer;

class ReceiveBarcodeController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'incomingBC']);
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
        //
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
        $cekDB = DB::connection($this->dedicatedConnection)->table('V_STOCK_CHECK')
            ->where('id_reff', $id)
            ->first();

        if (!empty($cekDB)) {
            T_RCV_BC_DETAIL::on($this->dedicatedConnection)->where('TRCVBC_BCCD', $id)->delete();
            C_ITRN::on($this->dedicatedConnection)->where('id_reff', $id)->delete();
        }

        return 'Delete Success';
    }

    function searchApi(Request $request)
    {
        $RS = T_RCV_BC_DETAIL::on($this->dedicatedConnection)
            ->select(
                'TRCVBC_BCCD',
                'TRCV_RCVCD',
                'TRCVBC_DOCNO',
                'TRCVBC_BCQT',
                'MSUP_SUPNM',
                'item_code',
                'MITM_ITMNM',
                DB::raw("COALESCE((
                    SELECT SUM(CITRN_ITMQT)
                    FROM C_ITRN WHERE id_reff = TRCVBC_BCCD
                    AND CITRN_LOCCD = 'WH1'
                ), 0) AS STOCK_QTY")
            )
            ->join('T_RCV_DETAIL', 'TRCVBC_DETID', 'T_RCV_DETAIL.id')
            ->join('T_RCV_HEAD', 'T_RCV_HEAD.id', 'T_RCV_DETAIL.id_header')
            ->join(DB::raw("(SELECT * FROM M_ITM) itm"), 'MITM_ITMCD', 'item_code')
            ->leftjoin('M_SUP', 'MSUP_SUPCD', 'TRCV_SUPCD');

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%{ $request->searchValue }%');
        }

        return ['data' => $RS->orderBy('T_RCV_BC_DETAIL.created_at', 'desc')->get()];
    }

    public function printBarcode(Request $request)
    {
        // return view('pdf.barcode', ['data' => $request->data]);
        $pdf = Pdf::loadView('pdf.barcode', ['data' => $request->data])->setPaper('a4');

        return base64_encode($pdf->stream('barcode.pdf'));
    }

    public function newPrintBarcode(Request $request)
    {
        $profile = CapabilityProfile::load("simple");
        // $connector = new WindowsPrintConnector(config('receiptprinter.connector_descriptor'));
        $connector = new WindowsPrintConnector('ZPLRongtaPrint');
        $printer = new Printer($connector);

        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT | Printer::MODE_DOUBLE_WIDTH);
        // $printer->text("Height and bar width\n");
        // $printer->selectPrintMode();
        // $heights = array(1, 2, 4, 8, 16, 32);
        // $widths = array(1, 2, 3, 4, 5, 6, 7, 8);
        // $printer->text("Default look\n");
        // $printer->barcode("ABC", Printer::BARCODE_CODE39);

        // foreach ($heights as $height) {
        //     $printer->text("\nHeight $height\n");
        //     $printer->setBarcodeHeight($height);
        //     $printer->barcode("ABC", Printer::BARCODE_CODE39);
        // }
        // foreach ($widths as $width) {
        //     $printer->text("\nWidth $width\n");
        //     $printer->setBarcodeWidth($width);
        //     $printer->barcode("ABC", Printer::BARCODE_CODE39);
        // }

        // $printer->feed();
        // // Set to something sensible for the rest of the examples
        // $printer->setBarcodeHeight(12);
        // $printer->setBarcodeWidth(58);

        // /* Text position */
        // $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT | Printer::MODE_DOUBLE_WIDTH);
        // $printer->text("Text position\n");
        // $printer->selectPrintMode();
        // $hri = array(
        //     Printer::BARCODE_TEXT_NONE => "No text",
        //     Printer::BARCODE_TEXT_ABOVE => "Above",
        //     Printer::BARCODE_TEXT_BELOW => "Below",
        //     Printer::BARCODE_TEXT_ABOVE | Printer::BARCODE_TEXT_BELOW => "Both"
        // );
        // foreach ($hri as $position => $caption) {
        //     $printer->text($caption . "\n");
        //     $printer->setBarcodeTextPosition($position);
        //     $printer->barcode("012345678901", Printer::BARCODE_JAN13);
        //     $printer->feed();
        // }

        // /* Barcode types */
        // $standards = array(
        //     Printer::BARCODE_UPCA => array(
        //         "title" => "UPC-A",
        //         "caption" => "Fixed-length numeric product barcodes.",
        //         "example" => array(
        //             array(
        //                 "caption" => "12 char numeric including (wrong) check digit.",
        //                 "content" => "012345678901"
        //             ),
        //             array(
        //                 "caption" => "Send 11 chars to add check digit automatically.",
        //                 "content" => "01234567890"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_UPCE => array(
        //         "title" => "UPC-E",
        //         "caption" => "Fixed-length numeric compact product barcodes.",
        //         "example" => array(
        //             array(
        //                 "caption" => "6 char numeric - auto check digit & NSC",
        //                 "content" => "123456"
        //             ),
        //             array(
        //                 "caption" => "7 char numeric - auto check digit",
        //                 "content" => "0123456"
        //             ),
        //             array(
        //                 "caption" => "8 char numeric",
        //                 "content" => "01234567"
        //             ),
        //             array(
        //                 "caption" => "11 char numeric - auto check digit",
        //                 "content" => "01234567890"
        //             ),
        //             array(
        //                 "caption" => "12 char numeric including (wrong) check digit",
        //                 "content" => "012345678901"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_JAN13 => array(
        //         "title" => "JAN13/EAN13",
        //         "caption" => "Fixed-length numeric barcodes.",
        //         "example" => array(
        //             array(
        //                 "caption" => "12 char numeric - auto check digit",
        //                 "content" => "012345678901"
        //             ),
        //             array(
        //                 "caption" => "13 char numeric including (wrong) check digit",
        //                 "content" => "0123456789012"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_JAN8 => array(
        //         "title" => "JAN8/EAN8",
        //         "caption" => "Fixed-length numeric barcodes.",
        //         "example" => array(
        //             array(
        //                 "caption" => "7 char numeric - auto check digit",
        //                 "content" => "0123456"
        //             ),
        //             array(
        //                 "caption" => "8 char numeric including (wrong) check digit",
        //                 "content" => "01234567"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_CODE39 => array(
        //         "title" => "Code39",
        //         "caption" => "Variable length alphanumeric w/ some special chars.",
        //         "example" => array(
        //             array(
        //                 "caption" => "Text, numbers, spaces",
        //                 "content" => "ABC 012"
        //             ),
        //             array(
        //                 "caption" => "Special characters",
        //                 "content" => "$%+-./"
        //             ),
        //             array(
        //                 "caption" => "Extra char (*) Used as start/stop",
        //                 "content" => "*TEXT*"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_ITF => array(
        //         "title" => "ITF",
        //         "caption" => "Variable length numeric w/even number of digits,\nas they are encoded in pairs.",
        //         "example" => array(
        //             array(
        //                 "caption" => "Numeric- even number of digits",
        //                 "content" => "0123456789"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_CODABAR => array(
        //         "title" => "Codabar",
        //         "caption" => "Varaible length numeric with some allowable\nextra characters. ABCD/abcd must be used as\nstart/stop characters (one at the start, one\nat the end) to distinguish between barcode\napplications.",
        //         "example" => array(
        //             array(
        //                 "caption" => "Numeric w/ A A start/stop. ",
        //                 "content" => "A012345A"
        //             ),
        //             array(
        //                 "caption" => "Extra allowable characters",
        //                 "content" => "A012$+-./:A"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_CODE93 => array(
        //         "title" => "Code93",
        //         "caption" => "Variable length- any ASCII is available",
        //         "example" => array(
        //             array(
        //                 "caption" => "Text",
        //                 "content" => "012abcd"
        //             )
        //         )
        //     ),
        //     Printer::BARCODE_CODE128 => array(
        //         "title" => "Code128",
        //         "caption" => "Variable length- any ASCII is available",
        //         "example" => array(
        //             array(
        //                 "caption" => "Code set A uppercase & symbols",
        //                 "content" => "{A" . "012ABCD"
        //             ),
        //             array(
        //                 "caption" => "Code set B general text",
        //                 "content" => "{B" . "012ABCDabcd"
        //             ),
        //             array(
        //                 "caption" => "Code set C compact numbers\n Sending chr(21) chr(32) chr(43)",
        //                 "content" => "{C" . chr(21) . chr(32) . chr(43)
        //             )
        //         )
        //     )
        // );
        // $printer->setBarcodeTextPosition(Printer::BARCODE_TEXT_BELOW);
        // foreach ($standards as $type => $standard) {
        //     $printer->selectPrintMode(Printer::MODE_DOUBLE_HEIGHT | Printer::MODE_DOUBLE_WIDTH);
        //     $printer->text($standard["title"] . "\n");
        //     $printer->selectPrintMode();
        //     $printer->text($standard["caption"] . "\n\n");
        //     foreach ($standard["example"] as $id => $barcode) {
        //         $printer->setEmphasis(true);
        //         $printer->text($barcode["caption"] . "\n");
        //         $printer->setEmphasis(false);
        //         $printer->text("Content: " . $barcode["content"] . "\n");
        //         $printer->barcode($barcode["content"], $type);
        //         $printer->feed();
        //     }
        // }
        // $printer->cut();
        // $printer->close();

        // $printer->text('
        //     ^XA

        //     ^FX Top section with logo, name and address.
        //     ^CF0,60
        //     ^FO50,50^GB100,100,100^FS
        //     ^FO75,75^FR^GB100,100,100^FS
        //     ^FO93,93^GB40,40,40^FS
        //     ^FO220,50^FDIntershipping, Inc.^FS
        //     ^CF0,30

        //     ^XZ
        // ');
        foreach ($request->data as $key => $value) {
            $printer->setBarcodeHeight(32);
            $printer->setBarcodeWidth(10);
            $printer->barcode($value['TRCVBC_BCCD'], Printer::BARCODE_CODE39);
        }

        $printer->cut();

        $printer->close();
    }

    public function getUnbarcodedItemStock(): array
    {
        return [];
    }
}
