<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Models\M_ITM;
use Illuminate\Support\Facades\DB;
use App\Traits\LocationTraits;
use Illuminate\Http\Request;
use App\Http\Controllers\PriceBuyController;
use App\Events\StockTakeProgress;
use Illuminate\Support\Facades\Cache;

class StockInventoryChunkJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, LocationTraits;

    public int $timeout = 900; // chunk bisa lebih lama, sesuaikan
    public int $tries = 3;

    private string $date;
    private string $id;
    private bool $isUpdateItem;
    private string $conn;
    private array $rows;
    private array $user;

    public function __construct($date, $id, $isUpdateItem, $conn, array $rows, array $user)
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->date = $date;
        $this->id = $id;
        $this->isUpdateItem = (bool) $isUpdateItem;
        $this->conn = $conn;
        $this->rows = $rows;
        $this->user = $user;
        logger('StockInventoryChunkJob - Processing chunk with ' . count($this->rows) . ' rows.');
    }

    public function handle(): void
    {
        try {
            logger('StockInventoryChunkJob - Started processing chunk. Date: ' . $this->date . ', ID: ' . $this->id . ', isUpdateItem: ' . ($this->isUpdateItem ? 'true' : 'false') . ', Connection: ' . $this->conn);

            $validRows = collect($this->rows)
                ->filter(fn($row) => !empty($row[0]) || !empty($row[1]))
                // dedupe: keep last row per (item, location) so the same pair nested-by-chunk
                // is not adjusted multiple times against the live V_STOCK_CHECK view
                ->reverse()
                ->unique(fn($row) => ($row[0] ?? '') . '|' . ($row[5] ?? ''))
                ->reverse()
                ->values();

            $totalRowsKey = 'stocktake_total_' . $this->id;
            $currentRowKey = 'stocktake_current_' . $this->id;
            $total = Cache::get($totalRowsKey, $validRows->count());
            $chunkTotal = $validRows->count();

            foreach ($validRows as $row) {
                $current = Cache::increment($currentRowKey);
                $itemCode = $row[0] ?? 'unknown';

                try {
                    // === STOCK-TAKE ADJUSTMENT (per row) ===
                    $itemCode = $row[0] ?? '';
                    $loc = $row[5] ?? '';
                    $targetQty = (float) ($row[2] ?? 0);
                    $price = (float) ($row[3] ?? 0);

                    if ($targetQty < 0) {
                        throw new \InvalidArgumentException('Qty cannot be negative');
                    }

                    $cekItem = M_ITM::on($this->conn)
                        ->where('MITM_ITMCD', $row[0])
                        ->first();

                    if ($this->isUpdateItem === true && empty($cekItem)) {
                        M_ITM::on($this->conn)->updateOrCreate([
                            'MITM_ITMCD' => $row[0]
                        ], [
                            'MITM_ITMCD' => $row[0],
                            'MITM_ITMNM' => $row[1] ?? '',
                            'MITM_STKUOM' => $row[6] ?? '',
                            'MITM_BRANCH' => $this->user['branch'] ?? ''
                        ]);
                        $cekItem = M_ITM::on($this->conn)->where('MITM_ITMCD', $row[0])->first();
                    }

                    if (empty($cekItem)) {
                        logger('StockInventoryChunkJob - Item code ' . $itemCode . ' not found in M_ITM. Skipping row.');
                        throw new \RuntimeException('Item not found in M_ITM');
                    }

                    // current stock for this item+location = SUM over ALL id_reff rows of V_STOCK_CHECK
                    $currentQty = (float) DB::connection($this->conn)
                        ->table('V_STOCK_CHECK')
                        ->where('CITRN_ITMCD', $itemCode)
                        ->where('CITRN_LOCCD', $loc)
                        ->sum('CITRN_ITMQT');

                    logger(sprintf('StockInventoryChunkJob - Item %s loc %s: current=%s target=%s', $itemCode, $loc, $currentQty, $targetQty));

                    // diff > 0 => surplus, remove from location; diff < 0 => deficit, add to location
                    $diff = $currentQty - $targetQty;

                    if (abs($diff) > 0.000001) {
                        $this->createBarcode(
                            $this->id,
                            $itemCode,
                            $this->date,
                            abs($diff),
                            $price,
                            $diff > 0 ? $loc : '',      // fr wh  (source when removing surplus)
                            $diff > 0 ? 'ADJ-OUT' : '', // fr loc
                            $diff < 0 ? $loc : '',      // to wh  (destination when adding deficit)
                            $diff < 0 ? 'ADJ-INC' : '', // to loc
                            $this->user,
                            $this->conn
                        );
                    }

                    // Update price beli per item jika ada harga di kolom price
                    if (!empty($row[3]) && $row[3] > 0) {
                        $priceData = [
                            'MITMBPRC_ITMCD' => $row[0],
                            'MITMBPRC_PRC' => (float) $row[3],
                            'MITMSPRC_PRC' => (float) $row[4],
                            'MITMSPRC_TYPE' => 'RTL',
                            'MITMBPRC_STARTDT' => $this->date,
                            'MITMBPRC_ENDDT' => '',
                            'MITMBPRC_ACTIVE' => 'Y',
                            'MITMBPRC_CG' => $this->conn,
                            'MITMBPRC_BRANCH' => $this->user['branch'] ?? '',
                            'created_by' => $this->user['nick_name'] ?? '',
                        ];

                        logger(json_encode($priceData));

                        $controller = new PriceBuyController();
                        $request = new Request($priceData);
                        $controller->store($request);
                    }

                    // === END logic per row ===

                    event(new StockTakeProgress(
                        (int) $this->id,
                        $current,
                        $total,
                        $itemCode,
                        'ok'
                    ));

                } catch (\Exception $rowEx) {
                    logger('StockInventoryChunkJob - Error processing item ' . $itemCode . ': ' . $rowEx->getMessage());

                    event(new StockTakeProgress(
                        (int) $this->id,
                        $current,
                        $total,
                        $itemCode,
                        'error',
                        $rowEx->getMessage()
                    ));
                }
            }
        } catch (\Exception $e) {
            logger('StockInventoryChunkJob - Error processing chunk. Date: ' . $this->date . ', ID: ' . $this->id . '. Error: ' . $e->getMessage());
            throw $e;
        }
    }

    public function failed(\Throwable $e): void
    {
        logger('StockInventoryChunkJob FAILED: ' . $e->getMessage());
    }
}
