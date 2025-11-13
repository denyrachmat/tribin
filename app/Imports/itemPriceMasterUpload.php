<?php

namespace App\Imports;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Crypt;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithStartRow;

use App\Http\Controllers\PriceBuyController;

class itemPriceMasterUpload implements ToCollection, WithStartRow
{
    /**
     * @param Collection $collection
     */
    private $cg;
    private $branch;
    private $created_by;
    private $is_preview;

    public $results;

    public function __construct($cg = '', $branch = '', $created_by = '', $is_preview = false, $results = [])
    {
        $this->cg = $cg;
        $this->branch = $branch;
        $this->created_by = $created_by;
        $this->is_preview = $is_preview;
        $this->results = $results;
    }

    public function startRow(): int
    {
        return 2;
    }

    public function collection(Collection $collection)
    {
        date_default_timezone_set('Asia/Jakarta');

        if ($this->is_preview == false) {
            // First run with preview mode
            $previewImport = new self($this->cg, $this->branch, $this->created_by, true, []);
            $previewImport->collection($collection);

            // Check if preview was successful
            if ($previewImport->results['status'] === 'success') {
                // Proceed to actual processing
            } else {
                // If preview failed, set the preview results
                $this->results = $previewImport->results;
                return;
            }
        }

        $priceBuyController = new PriceBuyController();

        $resultsPost = [];
        foreach ($collection as $row) {
            // $result = $priceBuyController->store(new Request([
            //         'MITMBPRC_ITMCD' => $row[0],
            //         'MITMBPRC_PRC' => (float) $row[1],
            //         'MITMSPRC_PRC' => is_string($row[2]) && !is_numeric($row[2]) ? (float) $row[1] : (float) ($row[2] ?? 0),
            //         'MITMBPRC_STARTDT' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[3])->format('Y-m-d'),
            //         'MITMBPRC_ENDDT' => !empty($row[4]) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[4])->format('Y-m-d') : null,
            //         'MITMSPRC_TYPE' => $row[5],
            //         'MITMBPRC_ACTIVE' => $row[6],
            //         'MITMBPRC_CG' => $this->cg,
            //         'MITMBPRC_BRANCH' => $this->branch,
            //         'created_by' => $this->created_by,
            //         'is_preview' => $this->is_preview,
            //     ]))->getOriginalContent();

            //     $resultsPost[] = array_merge(['status' => 'success'], $result);
            try {
                $result = $priceBuyController->store(new Request([
                    'MITMBPRC_ITMCD' => $row[0],
                    'MITMBPRC_PRC' => (float) $row[1],
                    'MITMSPRC_PRC' => is_string($row[2]) && !is_numeric($row[2]) ? (float) $row[1] : (float) ($row[2] ?? 0),
                    'MITMBPRC_STARTDT' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[3])->format('Y-m-d'),
                    'MITMBPRC_ENDDT' => !empty($row[4]) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[4])->format('Y-m-d') : null,
                    'MITMSPRC_TYPE' => $row[5],
                    'MITMBPRC_ACTIVE' => $row[6],
                    'MITMBPRC_CG' => $this->cg,
                    'MITMBPRC_BRANCH' => $this->branch,
                    'created_by' => $this->created_by,
                    'is_preview' => $this->is_preview,
                ]))->getOriginalContent();

                $resultsPost[] = array_merge(['status' => 'success'], $result);
            } catch (\Exception $e) {
                $resultsPost[] = [
                    'status' => 'error',
                    'message' => $e->getMessage(),
                    'row_data' => [
                        'MITMBPRC_ITMCD' => $row[0],
                        'MITMBPRC_PRC' => (float) $row[1],
                        'MITMSPRC_PRC' => is_string($row[2]) && !is_numeric($row[2]) ? (float) $row[1] : (float) ($row[2] ?? 0),
                        'MITMBPRC_STARTDT' => \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[3])->format('Y-m-d'),
                        'MITMBPRC_ENDDT' => !empty($row[4]) ? \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($row[4])->format('Y-m-d') : null,
                        'MITMSPRC_TYPE' => $row[5],
                        'MITMBPRC_ACTIVE' => $row[6],
                        'MITMBPRC_CG' => Crypt::decryptString($this->cg),
                        'MITMBPRC_BRANCH' => $this->branch,
                        'created_by' => $this->created_by,
                        'is_preview' => $this->is_preview,
                        'error' => $e->getMessage()
                    ]
                ];
            }
        }

        $this->results = [
            'status' => count(array_filter($resultsPost, function ($item) {
                return $item['status'] === 'success';
            })) === count($resultsPost) ? 'success' : 'failed',
            'message' => count(array_filter($resultsPost, function ($item) {
                return $item['status'] === 'success';
            })) === count($resultsPost) ? 'All data processed' : 'Some data failed to process, please check the details',
            'data' => $resultsPost,
            'is_preview' => $this->is_preview,
        ];
    }
}
