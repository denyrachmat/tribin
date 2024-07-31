<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\C_ITRN;
use Illuminate\Support\Facades\DB;
use App\Traits\LocationTraits;
use Illuminate\Support\Facades\Crypt;
use Maatwebsite\Excel\Concerns\WithStartRow;

class importStockTake implements ToModel, WithStartRow
{
    use LocationTraits;
    private $date, $id;

    public function __construct($date, $id)
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->date = $date;
        $this->id = $id;
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
        $cekStock = DB::connection($this->dedicatedConnection)
            ->table('V_STOCK_CHECK')
            ->where('CITRN_ITMCD', $row[0])
            ->where('CITRN_LOCCD', $row[2])
            ->first();

        if (!empty($cekStock)) {
            if ($cekStock->CITRN_ITMQT > $row[1]) {
                $this->createBarcode(
                    $this->id,
                    $row[0],
                    $this->date,
                    $cekStock->CITRN_ITMQT - $row[1], //qty
                    $row[3], //price
                    $row[2], //fr wh
                    'ADJ-OUT', // fr loc
                    '', //to wh
                    '' // to loc
                );
            } elseif ($cekStock->CITRN_ITMQT < $row[1]) {
                $this->createBarcode(
                    $this->id,
                    $row[0],
                    $this->date,
                    $row[1] - $cekStock->CITRN_ITMQT, //qty
                    $row[3], //price
                    '', //fr wh
                    '', // fr loc
                    $row[2], //to wh
                    'ADJ-INC' // to loc
                );
            }
        } else {
            $this->createBarcode(
                $this->id,
                $row[0],
                $this->date,
                $row[1], //qty
                $row[3], //price
                '', //fr wh
                '', // fr loc
                $row[2], //to wh
                'SA' // to loc
            );
        }
        //
    }
}
