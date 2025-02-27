<?php

namespace App\Exports\warehouse;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;
use App\Models\CompanyGroup;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithEvents;


class incomingBarcodeExport implements FromCollection, WithHeadings, WithEvents
{
    use Exportable, RegistersEventListeners;
    private $conn, $getHeader, $data;

    public function __construct($conn, $data)
    {
        $this->conn = $conn;
        $this->data = $data;
        $this->getHeader = CompanyGroup::where('connection', $this->conn)->first();
    }

    public function headings(): array
    {
        return [
            [
                $this->getHeader->name
            ],
            [
                'Incoming barcode list'
            ],
            [
                date('d M Y')
            ],
            [
                'Barcode',
                'Item Code',
                'Item Name',
                'Qty',
            ]
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        foreach ($this->data as $key => $value) {
            $hasil[] = [
                'TRCVBC_BCCD' => $value['TRCVBC_BCCD'],
                'MITM_ITMCD' => $value['item_code'],
                'MITM_ITMNM' => $value['MITM_ITMNM'],
                'TRCVBC_BCQT' => $value['TRCVBC_BCQT'],
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
