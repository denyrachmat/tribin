<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\DB;
use App\Traits\LocationTraits;
use Illuminate\Support\Facades\Crypt;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Illuminate\Support\Facades\Auth;
use App\Jobs\stockInventoryQueue;

use App\Models\M_ITM;

class importStockTake implements ToModel, WithStartRow
{
    use LocationTraits;
    private $date, $id, $isUpdateItem, $dedicatedConnection;

    public function __construct($date, $id, $isUpdateItem = false, $dedicatedConnection = '')
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->date = $date;
        $this->id = $id;
        $this->isUpdateItem = $isUpdateItem;
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    public function startRow(): int
    {
        return 2;
    }

    /**
     * @param Collection $collection
     */
    public function model(array $row)
    {
        ini_set("memory_limit", "3G");
        stockInventoryQueue::dispatch(
            $this->date,
            $this->id,
            $this->isUpdateItem,
            $this->dedicatedConnection,
            $row,
            [
                'branch' => Auth::User()->branch,
                'nick_name' => Auth::User()->nick_name
            ]
        )->onQueue('stockTake');
        // $cekItem = M_ITM::on($this->dedicatedConnection)
        //     ->where('MITM_ITMCD', $row[0])
        //     ->first();

        // if ($this->isUpdateItem === true) {
        //     if (empty($cekItem)) {
        //         M_ITM::on($this->dedicatedConnection)->updateOrCreate([
        //             'MITM_ITMCD' => $row[0]
        //         ],[
        //             'MITM_ITMCD' => $row[0],
        //             'MITM_ITMNM' => $row[1],
        //             'MITM_STKUOM' => 'UNIT',
        //             'MITM_BRANCH' => Auth::user()->branch
        //         ]);
        //     }

        //     $cekStock = DB::connection($this->dedicatedConnection)
        //         ->table('V_STOCK_CHECK')
        //         ->where('CITRN_ITMCD', $row[0])
        //         ->where('CITRN_LOCCD', $row[3])
        //         ->first();

        //     if (!empty($cekStock)) {
        //         if ($cekStock->CITRN_ITMQT > $row[2]) {
        //             $this->createBarcode(
        //                 $this->id,
        //                 $row[0],
        //                 $this->date,
        //                 $cekStock->CITRN_ITMQT - $row[2], //qty
        //                 $row[4], //price
        //                 $row[3], //fr wh
        //                 'ADJ-OUT', // fr loc
        //                 '', //to wh
        //                 '' // to loc
        //             );
        //         } elseif ($cekStock->CITRN_ITMQT < $row[2]) {
        //             $this->createBarcode(
        //                 $this->id,
        //                 $row[0],
        //                 $this->date,
        //                 $row[2] - $cekStock->CITRN_ITMQT, //qty
        //                 $row[4], //price
        //                 '', //fr wh
        //                 '', // fr loc
        //                 $row[3], //to wh
        //                 'ADJ-INC' // to loc
        //             );
        //         }
        //     } else {
        //         $this->createBarcode(
        //             $this->id,
        //             $row[0],
        //             $this->date,
        //             $row[2], //qty
        //             $row[4], //price
        //             '', //fr wh
        //             '', // fr loc
        //             $row[3], //to wh
        //             'SA' // to loc
        //         );
        //     }

        //     return collect($row);
        // } else {
        //     if (!empty($cekItem)) {
        //         $cekStock = DB::connection($this->dedicatedConnection)
        //             ->table('V_STOCK_CHECK')
        //             ->where('CITRN_ITMCD', $row[0])
        //             ->where('CITRN_LOCCD', $row[2])
        //             ->first();

        //         if (!empty($cekStock)) {
        //             if ($cekStock->CITRN_ITMQT > $row[1]) {
        //                 $this->createBarcode(
        //                     $this->id,
        //                     $row[0],
        //                     $this->date,
        //                     $cekStock->CITRN_ITMQT - $row[1], //qty
        //                     $row[3], //price
        //                     $row[2], //fr wh
        //                     'ADJ-OUT', // fr loc
        //                     '', //to wh
        //                     '' // to loc
        //                 );
        //             } elseif ($cekStock->CITRN_ITMQT < $row[1]) {
        //                 $this->createBarcode(
        //                     $this->id,
        //                     $row[0],
        //                     $this->date,
        //                     $row[1] - $cekStock->CITRN_ITMQT, //qty
        //                     $row[3], //price
        //                     '', //fr wh
        //                     '', // fr loc
        //                     $row[2], //to wh
        //                     'ADJ-INC' // to loc
        //                 );
        //             }
        //         } else {
        //             $this->createBarcode(
        //                 $this->id,
        //                 $row[0],
        //                 $this->date,
        //                 $row[1], //qty
        //                 $row[3], //price
        //                 '', //fr wh
        //                 '', // fr loc
        //                 $row[2], //to wh
        //                 'SA' // to loc
        //             );
        //         }
        //     }

        //     return collect([]);
        // }
    }
}
