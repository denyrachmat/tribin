<?php

namespace App\Exports\acc;

use App\Models\CompanyGroup;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class glReportExport implements FromCollection, WithHeadings, WithEvents
{
    use Exportable, RegistersEventListeners;
    private $conn, $facc, $lacc, $fdate, $ldate, $getHeader;

    public function __construct($conn, $facc, $lacc, $fdate, $ldate)
    {
        $this->conn = $conn;
        $this->facc = $facc;
        $this->lacc = $lacc;
        $this->fdate = $fdate;
        $this->ldate = $ldate;
        $this->getHeader = CompanyGroup::where('connection', $this->conn)->first();
    }

    public function headings(): array
    {
        return [
            [
                $this->getHeader->name
            ],
            [
                'General Ledger'
            ],
            [
                date('d M Y')
            ],
            [
                'Date',
                'Acc Code',
                'Acc Code Desc',
                'Document Code',
                'Currency',
                'Debit',
                'Credit'
            ]
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $data = DB::connection($this->conn)->select("call RPT_ACCT_GL('".$this->facc."', '".$this->lacc."', '".$this->fdate."', '".$this->ldate."')");
        $hasil = [];
        foreach ($data as $key => $value) {
            $hasil[] = [
                'EFFDT' => $value->EFFDT,
                'ACC' => $key === 0 || $value->ACC !== $data[$key - 1]->ACC ? $value->ACC : '',
                'ACCDESC' => ($key === 0 || $value->ACC !== $data[$key - 1]->ACC) || str_contains($value->ACCDESC, 'Total') ? $value->ACCDESC : '',
                'DOCCD' => $value->DOCCD,
                'CURR' => $value->CURR,
                'DBAMNT' => $value->DBAMNT,
                'CRAMNT' => $value->CRAMNT,
            ];
        }

        return collect($hasil);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function (AfterSheet $event) {
                $highestRow = $event->sheet->getHighestRow();
                $highestColumn = $event->sheet->getHighestColumn();

                $event->sheet->getDelegate()->getPageSetup()
                    ->setOrientation(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::ORIENTATION_LANDSCAPE)
                    ->setPaperSize(\PhpOffice\PhpSpreadsheet\Worksheet\PageSetup::PAPERSIZE_A4);

                $event->sheet->getStyle('A1:'.$highestColumn.'4')->applyFromArray([
                    'font' => [
                        'size' => '12',
                        'bold' => true
                    ]
                ]);

                $event->sheet->getDelegate()->mergeCells('A1:'.$highestColumn.'1');
                $event->sheet->getDelegate()->mergeCells('A2:'.$highestColumn.'2');
                $event->sheet->getDelegate()->mergeCells('A3:'.$highestColumn.'3');

                $event->sheet->getStyle('A')->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_DATE_XLSX15);
                $event->sheet->getStyle('F')->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);
                $event->sheet->getStyle('G')->getNumberFormat()->setFormatCode(NumberFormat::FORMAT_NUMBER_COMMA_SEPARATED1);

                $event->sheet->getStyle('A4:'.$highestColumn.$highestRow)->applyFromArray([
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                            ],
                        ]
                    ]
                );

                foreach(range('A', $highestColumn) as $columnID) {
                    $event->sheet->getColumnDimension($columnID)->setAutoSize(true) ;
                }

                // $event->sheet->getDelegate()->mergeCells('A1:'.$highestColumn.'1');

                $event->sheet->getStyle('A1:'.$highestColumn.'3')->getAlignment()->setHorizontal('center');
            }
        ];
    }
}
