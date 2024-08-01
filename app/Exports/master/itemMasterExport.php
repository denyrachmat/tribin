<?php

namespace App\Exports\master;

use App\Models\CompanyGroup;
use App\Models\M_ITM;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Events\AfterSheet;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithEvents;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;

class itemMasterExport implements FromCollection, WithHeadings, WithEvents
{
    use Exportable, RegistersEventListeners;
    private $conn, $getHeader;

    public function __construct($conn)
    {
        $this->conn = $conn;
        $this->getHeader = CompanyGroup::where('connection', $this->conn)->first();
    }

    public function headings(): array
    {
        return [
            [
                $this->getHeader->name
            ],
            [
                'Item Master'
            ],
            [
                date('d M Y')
            ],
            [
                'Item Code',
                'Item Desc',
                'Item Type',
                'UOM',
                'Brand',
                'Model',
                'Spec',
                'Category',
                'COA'
            ]
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $data = M_ITM::on($this->conn)->get();
        $hasil = [];
        foreach ($data as $key => $value) {
            $hasil[] = [
                'MITM_ITMCD' => $value->MITM_ITMCD,
                'MITM_ITMNM' => $value->MITM_ITMNM,
                'MITM_ITMTYPE' => $value->MITM_ITMTYPE,
                'MITM_STKUOM' => $value->MITM_STKUOM,
                'MITM_BRAND' => $value->MITM_BRAND,
                'MITM_MODEL' => $value->MITM_MODEL,
                'MITM_SPEC' => $value->MITM_SPEC,
                'MITM_ITMCAT' => $value->MITM_ITMCAT,
                'MITM_COACD' => $value->MITM_COACD,
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
