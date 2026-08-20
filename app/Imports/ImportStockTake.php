<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use App\Jobs\StockInventoryChunkJob;

class ImportStockTake implements ToCollection, WithStartRow, WithChunkReading
{
    public function __construct(
        private string $date,
        private string $id,
        private bool $isUpdateItem = false,
        private string $dedicatedConnection = '',
        private array $meta = []
    ) {
        date_default_timezone_set('Asia/Jakarta');
    }

    public function startRow(): int
    {
        return 2;
    }

    public function chunkSize(): int
    {
        return 200; // bisa 200/500 tergantung load
    }

    public function collection(Collection $rows): void
    {
        ini_set('memory_limit', '3G'); // atau 2048M
        logger('ImportStockTake - Dispatching chunk job with ' . $rows->count() . ' rows.');
        StockInventoryChunkJob::dispatch(
            $this->date,
            $this->id,
            $this->isUpdateItem,
            $this->dedicatedConnection,
            $rows->values()->all(),
            $this->meta
        )->onQueue('stockTake');
    }
}
