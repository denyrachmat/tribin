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
    }
}
