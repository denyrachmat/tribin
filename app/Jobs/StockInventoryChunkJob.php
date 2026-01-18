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
    }

    public function handle(): void
    {
        foreach ($this->rows as $row) {
            // skip row invalid
            if (!is_array($row) || empty($row) || empty($row[0])) {
                continue;
            }

            logger($this->date);
            logger($this->id);
            logger($this->isUpdateItem);
            logger($this->conn);
            logger($this->user);
            logger('Processing row:'.$this->row[0]);
            // logger(json_encode($row));

            // === COPAS LOGIC LAMA (per row) ===
            $cekItem = M_ITM::on($this->conn)
                ->where('MITM_ITMCD', $row[0])
                ->first();

            if ($this->isUpdateItem === true) {
                if (empty($cekItem)) {
                    M_ITM::on($this->conn)->updateOrCreate([
                        'MITM_ITMCD' => $row[0]
                    ], [
                        'MITM_ITMCD' => $row[0],
                        'MITM_ITMNM' => $row[1] ?? '',
                        'MITM_STKUOM' => $row[6] ?? '',
                        'MITM_BRANCH' => $this->user['branch'] ?? ''
                    ]);
                }

                $cekStock = DB::connection($this->conn)
                    ->table('V_STOCK_CHECK')
                    ->where('CITRN_ITMCD', $row[0])
                    ->where('CITRN_LOCCD', $row[5] ?? '')
                    ->first();

                if (($row[2] ?? 0) > 0) {
                    if (!empty($cekStock)) {
                        if ($cekStock->CITRN_ITMQT > $row[2]) {
                            $this->createBarcode(
                                $this->id,
                                $row[0],
                                $this->date,
                                $cekStock->CITRN_ITMQT - $row[2], // qty
                                $row[4] ?? 0, // price
                                $row[5] ?? '', // fr wh
                                'ADJ-OUT', // fr loc
                                '', // to wh
                                '', // to loc
                                $this->user,
                                $this->conn
                            );
                        } elseif ($cekStock->CITRN_ITMQT < $row[2]) {
                            $this->createBarcode(
                                $this->id,
                                $row[0],
                                $this->date,
                                $row[2] - $cekStock->CITRN_ITMQT, // qty
                                $row[4] ?? 0, // price
                                '', // fr wh
                                '', // fr loc
                                $row[5] ?? '', // to wh
                                'ADJ-INC', // to loc
                                $this->user,
                                $this->conn
                            );
                        }
                    } else {
                        $this->createBarcode(
                            $this->id,
                            $row[0],
                            $this->date,
                            $row[2], // qty
                            $row[4] ?? 0, // price
                            '', // fr wh
                            '', // fr loc
                            $row[5] ?? '', // to wh
                            'SA', // to loc
                            $this->user,
                            $this->conn
                        );
                    }
                }
            } else {
                if (($row[2] ?? 0) > 0) {
                    if (!empty($cekItem)) {
                        $cekStock = DB::connection($this->conn)
                            ->table('V_STOCK_CHECK')
                            ->where('CITRN_ITMCD', $row[0])
                            ->where('CITRN_LOCCD', $row[5] ?? '')
                            ->first();

                        if (!empty($cekStock)) {
                            if ($cekStock->CITRN_ITMQT > $row[2]) {
                                $this->createBarcode(
                                    $this->id,
                                    $row[0],
                                    $this->date,
                                    $cekStock->CITRN_ITMQT - $row[2], // qty
                                    $row[3] ?? 0, // price
                                    $row[5] ?? '', // fr wh
                                    'ADJ-OUT', // fr loc
                                    '', // to wh
                                    '', // to loc
                                    $this->user,
                                    $this->conn
                                );
                            } elseif ($cekStock->CITRN_ITMQT < $row[2]) {
                                $this->createBarcode(
                                    $this->id,
                                    $row[0],
                                    $this->date,
                                    $row[2] - $cekStock->CITRN_ITMQT, // qty
                                    $row[3] ?? 0, // price
                                    '', // fr wh
                                    '', // fr loc
                                    $row[2], // ⚠️ ini dari kode kamu (tapi ini qty, bukan wh) — cek lagi
                                    'ADJ-INC', // to loc
                                    $this->user,
                                    $this->conn
                                );
                            }
                        } else {
                            $this->createBarcode(
                                $this->id,
                                $row[0],
                                $this->date,
                                $row[2], // qty
                                $row[3] ?? 0, // price
                                '', // fr wh
                                '', // fr loc
                                $row[2], // ⚠️ ini dari kode kamu (tapi ini qty, bukan wh) — cek lagi
                                'SA', // to loc
                                $this->user,
                                $this->conn
                            );
                        }
                    }
                }
            }
            // === END logic per row ===
        }
    }
}
