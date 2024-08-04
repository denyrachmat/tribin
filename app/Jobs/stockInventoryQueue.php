<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Auth;

use App\Models\M_ITM;

use Illuminate\Support\Facades\DB;
use App\Traits\LocationTraits;
use Illuminate\Support\Facades\Crypt;

class stockInventoryQueue implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, LocationTraits;

    private $date, $id, $isUpdateItem, $conn, $row, $user;
    protected $dedicatedConnection;

    public function __construct($date, $id, $isUpdateItem, $conn, $row, $user)
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->date = $date;
        $this->id = $id;
        $this->isUpdateItem = $isUpdateItem;
        $this->conn = $conn;
        $this->dedicatedConnection = $conn;
        $this->row = $row;
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $cekItem = M_ITM::on($this->conn)
            ->where('MITM_ITMCD', $this->row[0])
            ->first();

        if ($this->isUpdateItem == true) {
            if (empty($cekItem)) {
                M_ITM::on($this->conn)->updateOrCreate([
                    'MITM_ITMCD' => $this->row[0]
                ],[
                    'MITM_ITMCD' => $this->row[0],
                    'MITM_ITMNM' => $this->row[1],
                    'MITM_STKUOM' => 'UNIT',
                    'MITM_BRANCH' => $this->user->branch
                ]);
            }

            $cekStock = DB::connection($this->conn)
                ->table('V_STOCK_CHECK')
                ->where('CITRN_ITMCD', $this->row[0])
                ->where('CITRN_LOCCD', $this->row[3])
                ->first();

            if (!empty($cekStock)) {
                if ($cekStock->CITRN_ITMQT > $this->row[2]) {
                    $this->createBarcode(
                        $this->id,
                        $this->row[0],
                        $this->date,
                        $cekStock->CITRN_ITMQT - $this->row[2], //qty
                        $this->row[4], //price
                        $this->row[3], //fr wh
                        'ADJ-OUT', // fr loc
                        '', //to wh
                        '', // to loc
                        $this->user,
                        $this->conn
                    );
                } elseif ($cekStock->CITRN_ITMQT < $this->row[2]) {
                    $this->createBarcode(
                        $this->id,
                        $this->row[0],
                        $this->date,
                        $this->row[2] - $cekStock->CITRN_ITMQT, //qty
                        $this->row[4], //price
                        '', //fr wh
                        '', // fr loc
                        $this->row[3], //to wh
                        'ADJ-INC', // to loc
                        $this->user,
                        $this->conn
                    );
                }
            } else {
                $this->createBarcode(
                    $this->id,
                    $this->row[0],
                    $this->date,
                    $this->row[2], //qty
                    $this->row[4], //price
                    '', //fr wh
                    '', // fr loc
                    $this->row[3], //to wh
                    'SA', // to loc
                    $this->user,
                    $this->conn
                );
            }
        } else {
            if (!empty($cekItem)) {
                $cekStock = DB::connection($this->conn)
                    ->table('V_STOCK_CHECK')
                    ->where('CITRN_ITMCD', $this->row[0])
                    ->where('CITRN_LOCCD', $this->row[2])
                    ->first();

                if (!empty($cekStock)) {
                    if ($cekStock->CITRN_ITMQT > $this->row[1]) {
                        $this->createBarcode(
                            $this->id,
                            $this->row[0],
                            $this->date,
                            $cekStock->CITRN_ITMQT - $this->row[1], //qty
                            $this->row[3], //price
                            $this->row[2], //fr wh
                            'ADJ-OUT', // fr loc
                            '', //to wh
                            '', // to loc
                            $this->user,
                            $this->conn
                        );
                    } elseif ($cekStock->CITRN_ITMQT < $this->row[1]) {
                        $this->createBarcode(
                            $this->id,
                            $this->row[0],
                            $this->date,
                            $this->row[1] - $cekStock->CITRN_ITMQT, //qty
                            $this->row[3], //price
                            '', //fr wh
                            '', // fr loc
                            $this->row[2], //to wh
                            'ADJ-INC', // to loc
                            $this->user,
                            $this->conn
                        );
                    }
                } else {
                    $this->createBarcode(
                        $this->id,
                        $this->row[0],
                        $this->date,
                        $this->row[1], //qty
                        $this->row[3], //price
                        '', //fr wh
                        '', // fr loc
                        $this->row[2], //to wh
                        'SA', // to loc
                        $this->user,
                        $this->conn
                    );
                }
            }
        }
    }
}
